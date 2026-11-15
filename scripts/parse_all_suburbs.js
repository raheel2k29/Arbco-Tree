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
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFile(fileName, defaultSlug) {
  const content = fs.readFileSync(path.join(dir, fileName), 'utf8');
  
  // 1. URL & Slug
  const urlMatch = content.match(/https:\/\/www\.arbco\.com\.au\/service-areas\/([a-zA-Z0-9\-_]+)/);
  const slug = urlMatch ? urlMatch[1] : defaultSlug;

  const result = {
    slug,
    fileName,
    seoTitle: '',
    metaDescription: '',
    categoryBadge: '',
    h1Subtitle: '',
    heroDescription: '',
    introParagraphs: [],
    serviceFocusHeading: '',
    serviceFocusParagraphs: [],
    propertyAndAccessHeading: '',
    propertyAndAccessParagraphs: [],
    councilAndSafetyHeading: '',
    councilAndSafetyParagraphs: [],
    whyChoosePoints: [],
    processHeading: '',
    processSteps: [],
    faqs: [],
    challengesSection: null,
    stormDamagedSection: null,
    additionalSections: [],
    quoteCtaSection: null
  };

  // 2. SEO Title
  let titleMatch = content.match(/CURRENT SEO TITLE[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (!titleMatch) {
    titleMatch = content.match(/(?:SEO Title|SEO title):[\s\n]*([^\n]+)/i);
  }
  if (titleMatch) {
    let rawTitle = cleanText(titleMatch[1]).replace(/^Use:\s*/i, '');
    if (rawTitle.endsWith('|')) {
      const nextLine = content.match(/(?:SEO Title|SEO title)[\s\S]*?\|\s*\n\s*([^\n]+)/i);
      if (nextLine) {
        rawTitle = `${rawTitle} ${cleanText(nextLine[1])}`;
      }
    }
    // If still blank, look at line right after "SEO Title: Use:"
    if (!rawTitle) {
      const nextLineMatch = content.match(/(?:SEO Title|SEO title):[\s\S]*?\n\s*([^\n]+)/i);
      if (nextLineMatch) rawTitle = cleanText(nextLineMatch[1]);
    }
    result.seoTitle = rawTitle;
  }

  // Fallback for SEO Title if still empty
  if (!result.seoTitle) {
    // Generate clean compliant title
    const suburbClean = slug.replace(/^tree-removal-/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    result.seoTitle = `Tree Removal ${suburbClean} | Arbco Tree Services`;
  }

  // Enforce <= 60 characters
  if (result.seoTitle.length > 60) {
    result.seoTitle = result.seoTitle
      .replace(/\| Arbco Tree Services$/, '| Arbco')
      .replace(/Townsville \| Arbco Tree Services$/, 'Townsville | Arbco');
    if (result.seoTitle.length > 60) {
      result.seoTitle = result.seoTitle.replace(/\|.*$/, '| Arbco');
    }
  }

  // 3. Meta Description
  let metaMatch = content.match(/META DESCRIPTION — REPLACE WITH:[\s\n]*([^\n]+(?:\n(?!(?:H1|CANONICAL|PAGE URL|OPEN GRAPH|\d+\.))[^\n]+)*)/i);
  if (!metaMatch) {
    metaMatch = content.match(/(?:Meta Description|Meta description):[\s\n]*([^\n]+(?:\n(?!(?:H1|Canonical|Page URL|Headings|\d+\.))[^\n]+)*)/i);
  }
  if (metaMatch) {
    let rawMeta = cleanText(metaMatch[1].replace(/^Use:\s*/i, '').replace(/\n+/g, ' '));
    // If wrapped
    if (rawMeta.length < 20) {
      const multiLine = content.match(/(?:Meta Description|Meta description):[\s\S]*?\n\s*([^\n]+(?:\n[^\n]+)?)/i);
      if (multiLine) rawMeta = cleanText(multiLine[1]);
    }
    result.metaDescription = rawMeta;
  }

  // 4. Hero Subtitle & Description & Category
  const catMatch = content.match(/REMOVE (?:THE )?(?:EXISTING )?(?:LOCATION LABEL|CATEGORY):[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (catMatch) {
    result.categoryBadge = cleanText(catMatch[1]);
  }

  const subMatch = content.match(/REMOVE (?:THE )?(?:EXISTING )?SUBTITLE:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (subMatch) {
    result.h1Subtitle = cleanText(subMatch[1]);
  }

  const descMatch = content.match(/REMOVE (?:THE )?(?:EXISTING )?(?:HERO )?DESCRIPTION:[\s\S]*?REPLACE WITH:[\s\n]*([\s\S]*?)(?=(?:Retain (?:the|both)|\d+\.\s+Replace|\n\s*\n\s*\d+\.|$))/i);
  if (descMatch) {
    result.heroDescription = cleanText(descMatch[1]);
  }

  // 5. Intro Paragraphs
  const introMatch = content.match(/Replace the (?:three )?introductory paragraphs[\s\S]*?REPLACE WITH:[\s\n]*([\s\S]*?)(?=\n\s*\d+\.\s+Replace|\n\s*\d+\.\s+Add|\n\s*3\.\s+|$)/i);
  if (introMatch) {
    const rawP = introMatch[1].split(/\n+/).map(cleanText).filter(p => p.length > 20 && !p.startsWith('KEEP THE') && !p.startsWith('REMOVE'));
    if (rawP.length > 0) result.introParagraphs = rawP;
  }

  // 6. Process Steps
  const processMatch = content.match(/(?:Replace the (?:entire )?(?:four|four-step|entire four-step) tree removal process[\s\S]*?REPLACE WITH(?: THESE FOUR STEPS)?:[\s\n]*)([\s\S]*?)(?=\n\s*(?:10\.|11\.|Replace the|\d+\.\s+Add|\d+\.\s+Replace|$))/i);
  if (processMatch) {
    result.processHeading = `Our Tree Removal Process in ${slug.replace(/^tree-removal-/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;
    const stepBlocks = processMatch[1].split(/(?=(?:^|\n)\s*[1-4]\.\s+)/);
    for (const block of stepBlocks) {
      const stepMatch = block.match(/^[1-4]\.\s+([^\n]+)\n([\s\S]*)/);
      if (stepMatch) {
        result.processSteps.push({
          title: cleanText(stepMatch[1]),
          desc: cleanText(stepMatch[2])
        });
      }
    }
  }

  // For Aitkenvale style process
  if (result.processSteps.length === 0) {
    const aitkenMatch = content.match(/Our Tree Removal Process in[^\n]*\n([\s\S]*?)(?=\n\s*2\.\s+Add|\n\s*\d+\.|$)/i);
    if (aitkenMatch) {
      const stepBlocks = aitkenMatch[1].split(/(?=(?:^|\n)\s*[1-4]\.\s+)/);
      for (const block of stepBlocks) {
        const stepMatch = block.match(/^[1-4]\.\s+([^\n]+)\n([\s\S]*)/);
        if (stepMatch) {
          result.processSteps.push({
            title: cleanText(stepMatch[1]),
            desc: cleanText(stepMatch[2])
          });
        }
      }
    }
  }

  // 7. FAQs
  const faqSections = [...content.matchAll(/(?:Replace the (?:pricing|rural|equipment|council|property|green waste|[a-zA-Z\s]+) FAQ)[\s\S]*?REPLACE WITH:[\s\n]*([^\n\?]+\?)[\s\n]*([\s\S]*?)(?=\n\s*\d+\.\s+Replace|\n\s*\d+\.\s+Add|\n\s*\d+\.\s+Preserve|\n\s*Confirm|$)/gi)];
  for (const f of faqSections) {
    const question = cleanText(f[1]);
    const answer = cleanText(f[2]);
    if (question && answer) {
      result.faqs.push({ question, answer });
    }
  }

  // For Aitkenvale style FAQs (where they are listed as Q\nA blocks under section 4)
  if (result.faqs.length === 0) {
    const faqBlockMatch = content.match(/4\.\s+Replace the five specified FAQ answers[\s\S]*?(?=\n\s*5\.\s+Add|\n\s*\d+\.|$)/i);
    if (faqBlockMatch) {
      const lines = faqBlockMatch[0].split('\n').map(l => l.trim()).filter(Boolean);
      let curQ = '';
      let curA = [];
      for (const l of lines) {
        if (l.endsWith('?') && !l.includes('Where these questions')) {
          if (curQ && curA.length > 0) {
            result.faqs.push({ question: curQ, answer: curA.join(' ') });
            curA = [];
          }
          curQ = l;
        } else if (curQ) {
          curA.push(l);
        }
      }
      if (curQ && curA.length > 0) {
        result.faqs.push({ question: curQ, answer: curA.join(' ') });
      }
    }
  }

  // 8. Add sections (Challenges, Storm, and Additional)
  const addSections = [...content.matchAll(/(?:Add (?:a|a new) section about ([^\n]+))[\s\S]*?ADD(?: THE FOLLOWING(?: EXACT CONTENT)?)?:[\s\n]*([\s\S]*?)(?=\n\s*(?:LOCATION:|\d+\.\s+Add|\d+\.\s+Replace|\d+\.\s+Preserve|\d+\.\s+Update|Confirm|$))/gi)];
  for (const as of addSections) {
    const secTitle = cleanText(as[1]);
    const body = as[2].trim();
    const lines = body.split('\n').map(cleanText).filter(Boolean);
    if (lines.length > 0) {
      const heading = lines[0];
      const paragraphs = [];
      const bullets = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('•') || line.startsWith('-')) {
          bullets.push(cleanText(line.replace(/^[•\-]\s*/, '')));
        } else if (lines.length > 4 && i >= 3 && i <= lines.length - 2 && (line.endsWith('.') || line.endsWith(';')) && !line.includes('Arbco')) {
          // Detect bullet points in plain text
          bullets.push(line);
        } else {
          paragraphs.push(line);
        }
      }

      if (secTitle.toLowerCase().includes('challenge') || heading.toLowerCase().includes('challenge')) {
        result.challengesSection = {
          heading,
          introParagraphs: paragraphs.slice(0, 3),
          bulletPoints: bullets,
          footerParagraph: paragraphs[paragraphs.length - 1] || ''
        };
      } else if (secTitle.toLowerCase().includes('storm') || heading.toLowerCase().includes('storm')) {
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

  // 9. Main contact / Quote CTA section
  const contactMatch = content.match(/(?:Replace the main contact section|Add a clear local call-to-action)[\s\S]*?(?:REPLACE WITH|ADD THE FOLLOWING EXACT CONTENT):[\s\n]*([\s\S]*?)(?=\n\s*(?:Retain|\d+\.\s+Replace|\d+\.\s+Preserve|\d+\.\s+Update|\d+\.\s+Technical|Confirm|$))/i);
  if (contactMatch) {
    const lines = contactMatch[1].split('\n').map(cleanText).filter(l => l && !l.startsWith('KEEP THE HEADING') && !l.startsWith('REMOVE'));
    if (lines.length > 0) {
      result.quoteCtaSection = {
        heading: lines[0].startsWith('Need') || lines[0].startsWith('Request') ? lines[0] : `Request a Tree Removal Quote in ${slug.replace(/^tree-removal-/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
        paragraphs: lines.slice(1).filter(l => !l.startsWith('Call 0456') && !l.startsWith('Please keep'))
      };
    }
  }

  return result;
}

const parsedSuburbs = {};
let totalCount = 0;

for (const item of manifest) {
  const parsed = parseFile(item.TxtFile, item.Slug);
  if (parsed && parsed.slug) {
    parsedSuburbs[parsed.slug] = parsed;
    totalCount++;
  }
}

fs.writeFileSync('scripts/parsed_all_suburbs.json', JSON.stringify(parsedSuburbs, null, 2), 'utf8');
console.log(`Successfully parsed ${totalCount} files into scripts/parsed_all_suburbs.json`);
console.log('Unique suburbs parsed:', Object.keys(parsedSuburbs).length);
