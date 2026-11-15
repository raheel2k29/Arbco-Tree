const fs = require('fs');
const path = require('path');

const dir = 'scripts/extracted_texts';
const manifestRaw = fs.readFileSync('scripts/manifest.json', 'utf8').replace(/^\uFEFF/, '');
const manifest = JSON.parse(manifestRaw);

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/^["'“”‘’]|["'“”‘’]$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractParagraphs(block) {
  if (!block) return [];
  const lines = block.split('\n').map(cleanText).filter(Boolean);
  return lines.filter(l => {
    if (l.length < 25) return false;
    if (/^(?:KEEP|REMOVE|Retain|Do not|Please|Ensure|LOCATION:|ADD:)/i.test(l)) return false;
    if (l.includes('internal links') && l.includes('Retain')) return false;
    return true;
  });
}

function parseWhyChoose(sec) {
  if (!sec) return [];

  // Pattern A: `REMOVE (?:BOX|CARD) [1-4]: ... REPLACE WITH:\nTitle\nDesc`
  const cardMatchesA = [...sec.matchAll(/REMOVE (?:BOX|CARD) [1-4]:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)\n([\s\S]*?)(?=(?:REMOVE (?:BOX|CARD) [1-4]:|$))/gi)];
  if (cardMatchesA.length === 4) {
    return cardMatchesA.map(m => {
      const descLines = m[2].split('\n').map(cleanText).filter(l => l && !/^(?:REMOVE|REPLACE|Card|Box)/i.test(l));
      return {
        title: cleanText(m[1]),
        desc: cleanText(descLines.join(' '))
      };
    });
  }

  // Pattern B: `(?:Box|Card)\s*[1-4][\s\S]*?REMOVE:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)\n([\s\S]*?)(?=(?:(?:Box|Card)\s*[1-4]|$))/gi`
  const cardMatchesB = [...sec.matchAll(/(?:Box|Card)\s*[1-4][\s\S]*?REMOVE:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)\n([\s\S]*?)(?=(?:(?:Box|Card)\s*[1-4]|$))/gi)];
  if (cardMatchesB.length === 4) {
    return cardMatchesB.map(m => {
      const descLines = m[2].split('\n').map(cleanText).filter(l => l && !/^(?:REMOVE|REPLACE|Card|Box)/i.test(l));
      return {
        title: cleanText(m[1]),
        desc: cleanText(descLines.join(' '))
      };
    });
  }

  // Pattern C: `REPLACE WITH: ... 1. Title\nDesc ...`
  const repMatch = sec.match(/REPLACE WITH[^\n:]*:[\s\n]*([\s\S]*)$/i);
  if (repMatch) {
    const block = repMatch[1].trim();
    const numMatches = [...block.matchAll(/(?:^|\n)\s*([1-4])\.\s+([^\n]+)\n([\s\S]*?)(?=(?:\n\s*[1-4]\.\s+)|$)/g)];
    if (numMatches.length === 4) {
      return numMatches.map(m => {
        const descLines = m[3].split('\n').map(cleanText).filter(l => l && !/^(?:REMOVE|REPLACE|Card|Box)/i.test(l));
        return {
          title: cleanText(m[2]),
          desc: cleanText(descLines.join(' '))
        };
      });
    }
    const boxMatches = [...block.matchAll(/(?:^|\n)\s*(?:Box|Card)\s*[1-4][\s\n]+([^\n]+)\n([\s\S]*?)(?=(?:\n\s*(?:Box|Card)\s*[1-4])|$)/gi)];
    if (boxMatches.length === 4) {
      return boxMatches.map(m => {
        const descLines = m[2].split('\n').map(cleanText).filter(l => l && !/^(?:REMOVE|REPLACE|Card|Box)/i.test(l));
        return {
          title: cleanText(m[1]),
          desc: cleanText(descLines.join(' '))
        };
      });
    }
  }

  return [];
}

function parseProcessSteps(secText) {
  if (!secText) return [];

  // Pattern A: REMOVE STEP / STEP X — REMOVE
  if (/(?:REMOVE STEP|STEP\s*[1-4]\s*—\s*REMOVE)/i.test(secText)) {
    const steps = [];
    for (let i = 1; i <= 4; i++) {
      const nextPattern = i < 4 ? `(?:REMOVE STEP ${i+1}|STEP\\s*${i+1}\\s*—\\s*REMOVE|$)` : `$`;
      const stepRegex = new RegExp(`(?:REMOVE STEP ${i}|STEP\\s*${i}\\s*—\\s*REMOVE)[\\s\\S]*?REPLACE WITH:[\\s\\n]*([\\s\\S]*?)(?=${nextPattern})`, 'i');
      const m = secText.match(stepRegex);
      if (m) {
        const lines = m[1].split('\n').map(cleanText).filter(Boolean);
        if (lines.length > 0) {
          const rawTitle = lines[0].replace(/^(?:Step\s*\d+:?|[1-4]\.\s*)/i, '').trim();
          const desc = lines.slice(1).filter(l => !/^(?:REMOVE|REPLACE|STEP)/i.test(l)).join(' ');
          steps.push({ title: cleanText(rawTitle), desc: cleanText(desc) });
        }
      }
    }
    if (steps.length === 4) return steps;
  }

  // Pattern B: Standard REPLACE WITH: 1. Title\nDesc ... 4. Title\nDesc
  const repMatch = secText.match(/REPLACE WITH[^\n:]*:[\s\n]*([\s\S]*)$/i);
  const block = repMatch ? repMatch[1] : secText;
  const stepMatches = [...block.matchAll(/(?:^|\n)\s*([1-4])\.\s+([^\n]+)\n([\s\S]*?)(?=(?:\n\s*[1-4]\.\s+)|$)/g)];
  if (stepMatches.length === 4) {
    return stepMatches.map(m => {
      const lines = m[3].split('\n').map(cleanText).filter(l => l && !/^(?:REMOVE|REPLACE|STEP)/i.test(l));
      return {
        title: cleanText(m[2]),
        desc: cleanText(lines.join(' '))
      };
    });
  }

  return [];
}

function parseFile(fileName, defaultSlug) {
  const content = fs.readFileSync(path.join(dir, fileName), 'utf8');

  // Slug
  const urlMatch = content.match(/https:\/\/www\.arbco\.com\.au\/service-areas\/([a-zA-Z0-9\-_]+)/);
  const slug = urlMatch ? urlMatch[1] : defaultSlug;

  const suburbClean = slug
    .replace(/^tree-removal-/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const result = {
    seoTitle: '',
    metaDescription: '',
    categoryBadge: '',
    h1Subtitle: '',
    heroDescription: '',
    introParagraphs: [],
    serviceFocusParagraphs: [],
    propertyAndAccessParagraphs: [],
    councilAndSafetyParagraphs: [],
    whyChoosePoints: [],
    processHeading: `Our Tree Removal Process in ${suburbClean}`,
    processSteps: [],
    faqs: [],
    challengesSection: null,
    stormDamagedSection: null,
    additionalSections: [],
    quoteCtaSection: null
  };

  // 1. SEO Title
  let titleMatch = content.match(/REPLACE WITH THIS SEO TITLE:[\s\n]*([\s\S]*?)(?=\n\s*(?:Meta|H1|CANONICAL|Page URL|\d+\.))/i);
  if (!titleMatch) {
    titleMatch = content.match(/CURRENT SEO TITLE[\s\S]*?REPLACE WITH:[\s\n]*([\s\S]*?)(?=\n\s*(?:Meta|H1|CANONICAL|Page URL|\d+\.))/i);
  }
  if (!titleMatch) {
    titleMatch = content.match(/(?:SEO Title|SEO title):[\s\n]*([\s\S]*?)(?=\n\s*(?:Meta|H1|CANONICAL|Page URL|\d+\.))/i);
  }
  if (titleMatch) {
    let rawTitle = cleanText(titleMatch[1]).replace(/^Use:\s*/i, '');
    result.seoTitle = rawTitle;
  }
  if (!result.seoTitle) {
    result.seoTitle = `Tree Removal ${suburbClean} | Arbco Tree Services`;
  }
  // Enforce <= 60 chars
  if (result.seoTitle.length > 60) {
    result.seoTitle = result.seoTitle
      .replace(/\| Arbco Tree Services$/, '| Arbco')
      .replace(/Townsville \| Arbco Tree Services$/, 'Townsville | Arbco')
      .replace(/\| Mountain Property Tree Services \| Arbco$/, '| Mountain Tree Services | Arbco');
    if (result.seoTitle.length > 60) {
      result.seoTitle = result.seoTitle.replace(/\|.*$/, '| Arbco');
    }
  }

  // 2. Meta Description
  let metaMatch = content.match(/META DESCRIPTION — REPLACE WITH:[\s\n]*([^\n]+(?:\n(?!(?:H1|CANONICAL|PAGE URL|OPEN GRAPH|\d+\.))[^\n]+)*)/i);
  if (!metaMatch) {
    metaMatch = content.match(/(?:Meta Description|Meta description):[\s\n]*([^\n]+(?:\n(?!(?:H1|Canonical|Page URL|Headings|\d+\.))[^\n]+)*)/i);
  }
  if (metaMatch) {
    let rawMeta = cleanText(metaMatch[1].replace(/^Use:\s*/i, '').replace(/\n+/g, ' '));
    if (rawMeta.length < 20) {
      const multiLine = content.match(/(?:Meta Description|Meta description):[\s\S]*?\n\s*([^\n]+(?:\n[^\n]+)?)/i);
      if (multiLine) rawMeta = cleanText(multiLine[1]);
    }
    result.metaDescription = rawMeta;
  }

  // 3. Category Badge, Subtitle & Hero Description
  let catMatch = content.match(/(?:REMOVE (?:THE )?(?:EXISTING )?(?:LOCATION LABEL|CATEGORY LABEL|CATEGORY|LABEL):|replace the small category label above the H1:[\s\S]*?REMOVE:)[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (!catMatch) {
    catMatch = content.match(/Remove the existing hero location label:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  }
  if (catMatch) result.categoryBadge = cleanText(catMatch[1]);

  const subMatch = content.match(/REMOVE (?:THE )?(?:EXISTING )?SUBTITLE:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (subMatch) result.h1Subtitle = cleanText(subMatch[1]);

  const descMatch = content.match(/REMOVE (?:THE )?(?:EXISTING )?(?:HERO )?DESCRIPTION:[\s\S]*?REPLACE WITH:[\s\n]*([\s\S]*?)(?=\n\s*(?:(?:[1-9]|\d{2})\.\s+Replace|Also replace|Please retain|Retain|$))/i);
  if (descMatch) {
    result.heroDescription = cleanText(descMatch[1])
      .replace(/(?:Please retain|Retain the existing|Retain)[^.]*\.?/gi, '')
      .trim();
  }

  // Special case for Oak Valley style
  if (!result.h1Subtitle) {
    const heroBlock = content.match(/1\.\s+Replace the hero section[\s\S]*?(?=2\.\s+Replace)/i);
    if (heroBlock) {
      const rwMatches = [...heroBlock[0].matchAll(/REPLACE WITH:[\s\n]*([\s\S]*?)(?=\n\s*(?:REMOVE|\d+\.|$))/gi)];
      if (rwMatches.length >= 3) {
        result.categoryBadge = cleanText(rwMatches[0][1]);
        result.h1Subtitle = cleanText(rwMatches[1][1]);
        result.heroDescription = cleanText(rwMatches[2][1])
          .replace(/(?:Please retain|Retain the existing|Retain)[^.]*\.?/gi, '')
          .trim();
      }
    }
  }

  // 4. Intro Paragraphs (Section 2)
  const introMatch = content.match(/(?:(?:[1-9]|\d{2})\.\s+(?:Replace\s+(?:all\s+|the\s+)?(?:three\s+)?introduct[a-z\s]+|Introduction)[\s\S]*?REPLACE[^\n:]*WITH:[\s\n]*)([\s\S]*?)(?=\n\s*(?:(?:[1-9]|\d{2})\.\s+Replace|\d+\.\s+Add|\d+\.\s+Check|$))/i);
  if (introMatch) {
    const paragraphs = extractParagraphs(introMatch[1]);
    if (paragraphs.length > 0) result.introParagraphs = paragraphs;
  }

  // 5. Service Focus Paragraphs (Section 5)
  const sfMatch = content.match(/(?:(?:[1-9]|\d{2})\.\s+Replace[^\n]*Safe,?\s*Precision[\s\S]*?REPLACE[^\n:]*WITH:[\s\n]*)([\s\S]*?)(?=\n\s*(?:(?:[1-9]|\d{2})\.\s+Replace|\d+\.\s+Add|$))/i);
  if (sfMatch) {
    const paragraphs = extractParagraphs(sfMatch[1]);
    if (paragraphs.length > 0) result.serviceFocusParagraphs = paragraphs;
  }

  // 6. Property Access Paragraphs (Section 6)
  const paMatch = content.match(/(?:(?:[1-9]|\d{2})\.\s+Replace[^\n]*Property\s*Access[\s\S]*?REPLACE[^\n:]*WITH:[\s\n]*)([\s\S]*?)(?=\n\s*(?:(?:[1-9]|\d{2})\.\s+Replace|\d+\.\s+Add|$))/i);
  if (paMatch) {
    const paragraphs = extractParagraphs(paMatch[1]);
    if (paragraphs.length > 0) result.propertyAndAccessParagraphs = paragraphs;
  }

  // 7. Council & Safety Paragraphs (Section 7)
  const cMatch = content.match(/(?:(?:[1-9]|\d{2})\.\s+Replace[^\n]*(?:council|Townsville City Council)[\s\S]*?REPLACE[^\n:]*WITH:[\s\n]*)([\s\S]*?)(?=\n\s*(?:(?:[1-9]|\d{2})\.\s+Replace|\d+\.\s+Add|$))/i);
  if (cMatch) {
    const paragraphs = extractParagraphs(cMatch[1]);
    if (paragraphs.length > 0) result.councilAndSafetyParagraphs = paragraphs;
  }

  // 8. Why Choose Benefit Cards (Section 8)
  const secMatch = content.match(/(?:(?:[1-9]|\d{2})\.\s+(?:Replace[^\n]*Why Choose|Why Choose[^\n]*replace)[\s\S]*?)(?=\n\s*(?:(?:[1-9]|\d{2})\.\s+Replace|\d+\.\s+Add|$))/i);
  const wcPts = parseWhyChoose(secMatch ? secMatch[0] : '');
  if (wcPts.length === 4) {
    result.whyChoosePoints = wcPts;
  }

  // 9. Process Steps (4 steps)
  const procMatch = content.match(/(?:Replace the (?:entire )?(?:four|four-step|entire four-step|Tree Removal Process)?\s*(?:tree\s*)?(?:removal\s*)?process(?:\s+section)?[\s\S]*?)(?=\n\s*(?:(?:[12]\d|[89])\.\s+Replace|\d+\.\s+Add|\d+\.\s+Preserve|$))/i);
  if (procMatch) {
    result.processSteps = parseProcessSteps(procMatch[0]);
  }

  // Fallback for Aitkenvale style
  if (result.processSteps.length === 0) {
    const aitkenMatch = content.match(/Our Tree Removal Process in[^\n]*\n([\s\S]*?)(?=\n\s*2\.\s+Add|\n\s*\d+\.|$)/i);
    if (aitkenMatch) {
      result.processSteps = parseProcessSteps(aitkenMatch[0]);
    }
  }

  // 10. FAQs (5 FAQs)
  const sections = content.split(/(?=(?:^|\n)\s*\d+\.\s+)/);
  for (const sec of sections) {
    if (!/^\s*\d+\.\s+Replace[\s\S]*?FAQ/i.test(sec)) continue;
    let q = '';
    const keepQMatch = sec.match(/KEEP (?:THE )?QUESTION:[\s\n]*([^\n]+)/i);
    if (keepQMatch) {
      q = keepQMatch[1].replace(/\s+/g, ' ').trim();
    }
    if (!q) {
      const keepUnchangedMatch = sec.match(/REMOVE (?:THE )?QUESTION:[\s\S]*?"([^"]+)"[\s\S]*?Keep (?:this )?question unchanged/i);
      if (keepUnchangedMatch) {
        q = keepUnchangedMatch[1].replace(/\s+/g, ' ').trim();
      }
    }
    const repMatch = sec.match(/REPLACE WITH[^\n:]*:[\s\n]*([\s\S]*)$/i);
    if (repMatch) {
      const block = repMatch[1].trim();
      if (q) {
        const a = block.replace(/\s+/g, ' ').trim();
        if (a) result.faqs.push({ question: q, answer: a });
      } else {
        const qMatch = block.match(/^([\s\S]*?\?)\s*([\s\S]*)$/);
        if (qMatch) {
          const parsedQ = qMatch[1].replace(/\s+/g, ' ').trim();
          const parsedA = qMatch[2].replace(/\s+/g, ' ').trim();
          if (parsedQ && parsedA) result.faqs.push({ question: parsedQ, answer: parsedA });
        }
      }
    }
  }

  // Fallback for Aitkenvale style FAQs
  if (result.faqs.length === 0) {
    const blockMatch = content.match(/4\.\s+Replace the five specified FAQ answers[\s\S]*?(?=\n\s*5\.\s+Add|\n\s*\d+\.|$)/i);
    if (blockMatch) {
      const lines = blockMatch[0].split('\n').map(l => l.trim()).filter(Boolean);
      let curQ = '';
      let curA = [];
      for (const l of lines) {
        if (l.endsWith('?') && !l.includes('Where these questions')) {
          if (curQ && curA.length > 0) {
            result.faqs.push({ question: curQ.replace(/\s+/g, ' ').trim(), answer: curA.join(' ').replace(/\s+/g, ' ').trim() });
            curA = [];
          }
          curQ = l;
        } else if (curQ) {
          curA.push(l);
        }
      }
      if (curQ && curA.length > 0) {
        result.faqs.push({ question: curQ.replace(/\s+/g, ' ').trim(), answer: curA.join(' ').replace(/\s+/g, ' ').trim() });
      }
    }
  }

  // 11. Additional Sections (Challenges, Storm, and Custom)
  for (const sec of sections) {
    if (!/^\s*\d+\.\s+Add\s+/i.test(sec)) continue;
    const titleMatch = sec.match(/^\s*\d+\.\s+Add\s+(?:a\s+|a\s+new\s+|an\s+)?(?:section\s+about\s+)?([^\n]+)/i);
    const repMatch = sec.match(/ADD[^\n:]*:[\s\n]*([\s\S]*)$/i);
    if (repMatch) {
      const block = repMatch[1].trim();
      const lines = block.split('\n').map(cleanText).filter(Boolean);
      if (lines.length > 0) {
        const heading = lines[0];

        // Filter out internal reviewer/SEO notes
        const hLower = heading.toLowerCase();
        if (hLower.includes('seo') || 
            hLower.includes('technical') || 
            hLower.includes('checklist') || 
            hLower.includes('schema') || 
            hLower.includes('audit') || 
            hLower.includes('the authorised site')) {
          continue;
        }

        const paragraphs = [];
        const bullets = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('•') || line.startsWith('-')) {
            bullets.push(cleanText(line.replace(/^[•\-]\s*/, '')));
          } else if (lines.length > 4 && i >= 3 && i <= lines.length - 2 && (line.endsWith('.') || line.endsWith(';')) && !line.includes('Arbco') && line.length < 120) {
            bullets.push(line);
          } else {
            paragraphs.push(line);
          }
        }

        const secName = titleMatch ? cleanText(titleMatch[1]) : heading;
        if (secName.toLowerCase().includes('challenge') || heading.toLowerCase().includes('challenge')) {
          result.challengesSection = {
            heading,
            introParagraphs: paragraphs.slice(0, 3),
            bulletPoints: bullets,
            footerParagraph: paragraphs[paragraphs.length - 1] || ''
          };
        } else if (secName.toLowerCase().includes('storm') || heading.toLowerCase().includes('storm')) {
          result.stormDamagedSection = {
            heading,
            paragraphs: lines.slice(1)
          };
        } else {
          result.additionalSections.push({
            heading,
            paragraphs: paragraphs.length > 0 ? paragraphs : lines.slice(1),
            bulletPoints: bullets
          });
        }
      }
    }
  }

  // 12. Quote CTA Section
  const contactMatch = content.match(/(?:Replace the main contact section|Add a clear local call-to-action)[\s\S]*?(?:REPLACE WITH|ADD THE FOLLOWING EXACT CONTENT|ADD:):[\s\n]*([\s\S]*?)(?=\n\s*(?:Retain|\d+\.\s+Replace|\d+\.\s+Preserve|\d+\.\s+Update|\d+\.\s+Technical|Confirm|$))/i);
  if (contactMatch) {
    const lines = contactMatch[1].split('\n').map(cleanText).filter(l => l && !l.startsWith('KEEP THE HEADING') && !l.startsWith('REMOVE'));
    if (lines.length > 0) {
      result.quoteCtaSection = {
        heading: lines[0].startsWith('Need') || lines[0].startsWith('Request') ? lines[0] : `Request a Tree Removal Quote in ${suburbClean}`,
        paragraphs: lines.slice(1).filter(l => !l.startsWith('Call 0456') && !l.startsWith('Please keep'))
      };
    }
  }

  return result;
}

// Build map
const overrides = {};
for (const item of manifest) {
  const parsed = parseFile(item.TxtFile, item.Slug);
  if (parsed && item.Slug) {
    overrides[item.Slug] = parsed;
  }
}

// Ensure Aitkenvale is preserved with its high quality bespoke structure
if (overrides['tree-removal-aitkenvale']) {
  overrides['tree-removal-aitkenvale'].seoTitle = 'Tree Removal Aitkenvale | Arbco Tree Services';
  overrides['tree-removal-aitkenvale'].metaDescription = 'Need tree removal in Aitkenvale? Arbco provides professional tree removal, storm-damaged tree assessments and stump grinding options. Call 0456 579 811.';
}

const outDir = 'src/data';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'suburbOverrides.json'), JSON.stringify(overrides, null, 2), 'utf8');
console.log(`Generated enhanced overrides for ${Object.keys(overrides).length} suburbs in src/data/suburbOverrides.json`);
