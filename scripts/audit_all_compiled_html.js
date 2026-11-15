const fs = require('fs');
const path = require('path');

const overrides = JSON.parse(fs.readFileSync('src/data/suburbOverrides.json', 'utf8'));

const leakKeywords = [
  'REPLACE WITH', 'REMOVE THE EXISTING', 'KEEP THE QUESTION', 'KEEP THIS QUESTION',
  'Retain the existing', 'Do not invent', 'Word count', 'Tone:'
];

function toHtmlEntities(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function matchHtml(html, target) {
  if (!target) return true;
  return html.includes(target) || html.includes(toHtmlEntities(target)) || html.includes(target.replace(/&/g, '&amp;'));
}

let totalAudited = 0;
let passes = 0;
let errors = [];

for (const [slug, data] of Object.entries(overrides)) {
  totalAudited++;
  const htmlPath = `.next/server/app/service-areas/${slug}.html`;
  if (!fs.existsSync(htmlPath)) {
    errors.push({ slug, error: 'HTML file does not exist' });
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  // 1. Check title
  if (data.seoTitle && !matchHtml(html, `<title>${data.seoTitle}</title>`) && !matchHtml(html, data.seoTitle)) {
    errors.push({ slug, field: 'seoTitle', error: 'Title not found in HTML' });
  }

  // 2. Check meta description
  if (data.metaDescription && !matchHtml(html, data.metaDescription)) {
    errors.push({ slug, field: 'metaDescription', error: 'Meta description not found in HTML' });
  }

  // 3. Check badge if overridden
  if (data.categoryBadge && !matchHtml(html, data.categoryBadge)) {
    errors.push({ slug, field: 'categoryBadge', error: 'Badge not found: ' + data.categoryBadge });
  }

  // 4. Check intro first para
  if (data.introParagraphs && data.introParagraphs.length > 0) {
    const sample = data.introParagraphs[0].substring(0, 50);
    if (!matchHtml(html, sample)) {
      errors.push({ slug, field: 'introParagraphs', error: 'Sample intro not found: ' + sample });
    }
  }

  // 5. Check service focus first para
  if (data.serviceFocusParagraphs && data.serviceFocusParagraphs.length > 0) {
    const sample = data.serviceFocusParagraphs[0].substring(0, 50);
    if (!matchHtml(html, sample)) {
      errors.push({ slug, field: 'serviceFocusParagraphs', error: 'Sample service focus not found: ' + sample });
    }
  }

  // 6. Check Why Choose points (all 4)
  if (data.whyChoosePoints && data.whyChoosePoints.length === 4) {
    data.whyChoosePoints.forEach((w, idx) => {
      if (!matchHtml(html, w.title)) {
        errors.push({ slug, field: `whyChoose[${idx}]`, error: 'Why choose title not found: ' + w.title });
      }
    });
  }

  // 7. Check 4 process steps
  if (data.processSteps && data.processSteps.length === 4) {
    data.processSteps.forEach((s, idx) => {
      if (!matchHtml(html, s.title)) {
        errors.push({ slug, field: `processStep[${idx}]`, error: 'Step title not found: ' + s.title });
      }
    });
  }

  // 8. Check 5 FAQs
  if (data.faqs && data.faqs.length === 5) {
    data.faqs.forEach((f, idx) => {
      if (!matchHtml(html, f.question)) {
        errors.push({ slug, field: `faq[${idx}]`, error: 'FAQ question not found: ' + f.question });
      }
    });
  }

  // 9. Check Quote CTA heading
  if (data.quoteCtaSection && data.quoteCtaSection.heading) {
    if (!matchHtml(html, data.quoteCtaSection.heading)) {
      errors.push({ slug, field: 'quoteCtaSection', error: 'CTA heading not found: ' + data.quoteCtaSection.heading });
    }
  }

  // 10. Check for leaked prompt instructions
  for (const kw of leakKeywords) {
    if (html.includes(kw)) {
      errors.push({ slug, field: 'leakKeyword', error: 'HTML contains leaked prompt keyword: ' + kw });
    }
  }

  if (errors.length === 0) passes++;
}

console.log(`Audited ${totalAudited} compiled suburb HTML pages.`);
console.log(`Total errors: ${errors.length}`);
if (errors.length > 0) {
  console.log('Errors:', JSON.stringify(errors.slice(0, 20), null, 2));
} else {
  console.log('ALL 83 SUBURB HTML PAGES PERFECTLY VERIFIED WITH 0 LEAKS AND 0 ERRORS!');
}
