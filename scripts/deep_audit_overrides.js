const fs = require('fs');
const path = require('path');

const overrides = JSON.parse(fs.readFileSync('src/data/suburbOverrides.json', 'utf8'));

console.log('Total suburbs in overrides:', Object.keys(overrides).length);

const leakKeywords = [
  'REPLACE WITH', 'REMOVE', 'KEEP THE QUESTION', 'KEEP THIS', 'Retain the existing', 
  'Retain existing', 'Please ensure', 'Do not invent', 'Word count', 'Tone:',
  'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Box 1', 'Box 2', 'Box 3', 'Box 4',
  'Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5', 'Section 6', 'Section 7', 'Section 8',
  'H2:', 'H3:', 'FAQ 1', 'FAQ 2', 'FAQ 3', 'FAQ 4', 'FAQ 5'
];

let issues = [];
let stats = {
  total: 0,
  hasSeoTitle: 0,
  hasMetaDesc: 0,
  hasCategoryBadge: 0,
  hasH1Subtitle: 0,
  hasHeroDescription: 0,
  hasIntro: 0,
  hasServiceFocus: 0,
  hasPropertyAccess: 0,
  hasCouncilSafety: 0,
  hasWhyChoose: 0,
  hasProcessSteps: 0,
  hasFaqs: 0,
  hasAdditionalSections: 0,
  hasQuoteCTA: 0
};

for (const [slug, data] of Object.entries(overrides)) {
  stats.total++;
  if (data.seoTitle) stats.hasSeoTitle++;
  if (data.metaDescription) stats.hasMetaDesc++;
  if (data.categoryBadge) stats.hasCategoryBadge++;
  if (data.h1Subtitle) stats.hasH1Subtitle++;
  if (data.heroDescription) stats.hasHeroDescription++;
  if (data.introParagraphs && data.introParagraphs.length > 0) stats.hasIntro++;
  if (data.serviceFocusParagraphs && data.serviceFocusParagraphs.length > 0) stats.hasServiceFocus++;
  if (data.propertyAndAccessParagraphs && data.propertyAndAccessParagraphs.length > 0) stats.hasPropertyAccess++;
  if (data.councilAndSafetyParagraphs && data.councilAndSafetyParagraphs.length > 0) stats.hasCouncilSafety++;
  if (data.whyChoosePoints && data.whyChoosePoints.length > 0) stats.hasWhyChoose++;
  if (data.processSteps && data.processSteps.length > 0) stats.hasProcessSteps++;
  if (data.faqs && data.faqs.length > 0) stats.hasFaqs++;
  if (data.additionalSections && data.additionalSections.length > 0) stats.hasAdditionalSections++;
  if (data.quoteCtaSection) stats.hasQuoteCTA++;

  // Check title
  if (!data.seoTitle) {
    // Only aitkenvale doesn't have an override title if the client said to retain, but let's check
    issues.push({ slug, field: 'seoTitle', error: 'Missing seoTitle' });
  } else if (data.seoTitle.length > 60) {
    issues.push({ slug, field: 'seoTitle', error: 'seoTitle > 60 chars: ' + data.seoTitle.length + ' (' + data.seoTitle + ')' });
  }
  
  // Check metaDescription
  if (!data.metaDescription) {
    issues.push({ slug, field: 'metaDescription', error: 'Missing metaDescription' });
  }
  
  // Check processSteps
  if (!data.processSteps || data.processSteps.length !== 4) {
    issues.push({ slug, field: 'processSteps', error: 'Count is ' + (data.processSteps ? data.processSteps.length : 0) });
  } else {
    data.processSteps.forEach((s, idx) => {
      if (!s.title || s.title.trim().length === 0) issues.push({ slug, field: 'processSteps[' + idx + '].title', error: 'Empty step title' });
      if (!s.desc || s.desc.trim().length === 0) issues.push({ slug, field: 'processSteps[' + idx + '].desc', error: 'Empty step desc' });
    });
  }
  
  // Check faqs
  if (!data.faqs || data.faqs.length !== 5) {
    issues.push({ slug, field: 'faqs', error: 'Count is ' + (data.faqs ? data.faqs.length : 0) });
  } else {
    data.faqs.forEach((faq, idx) => {
      if (!faq.question || faq.question.trim().length === 0) issues.push({ slug, field: 'faqs[' + idx + '].question', error: 'Empty question' });
      if (!faq.answer || faq.answer.trim().length === 0) issues.push({ slug, field: 'faqs[' + idx + '].answer', error: 'Empty answer' });
    });
  }

  // Check whyChoosePoints
  if (data.whyChoosePoints) {
    if (data.whyChoosePoints.length !== 4 && data.whyChoosePoints.length !== 0) {
      issues.push({ slug, field: 'whyChoosePoints', error: 'Count is ' + data.whyChoosePoints.length });
    } else {
      data.whyChoosePoints.forEach((w, idx) => {
        if (!w.title || w.title.trim().length === 0) issues.push({ slug, field: 'whyChoosePoints[' + idx + '].title', error: 'Empty whyChoose title' });
        if (!w.desc || w.desc.trim().length === 0) issues.push({ slug, field: 'whyChoosePoints[' + idx + '].desc', error: 'Empty whyChoose desc' });
      });
    }
  }

  // Check for leaked instructions in strings
  const checkText = (text, fieldName) => {
    if (typeof text !== 'string') return;
    for (const kw of leakKeywords) {
      if (text.includes(kw)) {
        issues.push({ slug, field: fieldName, error: 'Contains keyword: ' + kw, sample: text.substring(0, 100) });
      }
    }
  };

  checkText(data.seoTitle, 'seoTitle');
  checkText(data.metaDescription, 'metaDescription');
  checkText(data.categoryBadge, 'categoryBadge');
  checkText(data.h1Subtitle, 'h1Subtitle');
  checkText(data.heroDescription, 'heroDescription');
  
  if (data.introParagraphs) data.introParagraphs.forEach((p, i) => checkText(p, 'introParagraphs[' + i + ']'));
  if (data.serviceFocusParagraphs) data.serviceFocusParagraphs.forEach((p, i) => checkText(p, 'serviceFocusParagraphs[' + i + ']'));
  if (data.propertyAndAccessParagraphs) data.propertyAndAccessParagraphs.forEach((p, i) => checkText(p, 'propertyAndAccessParagraphs[' + i + ']'));
  if (data.councilAndSafetyParagraphs) data.councilAndSafetyParagraphs.forEach((p, i) => checkText(p, 'councilAndSafetyParagraphs[' + i + ']'));
  if (data.whyChoosePoints) data.whyChoosePoints.forEach((w, i) => {
    checkText(w.title, 'whyChoosePoints[' + i + '].title');
    checkText(w.desc, 'whyChoosePoints[' + i + '].desc');
  });
  if (data.processSteps) data.processSteps.forEach((s, i) => {
    checkText(s.title, 'processSteps[' + i + '].title');
    checkText(s.desc, 'processSteps[' + i + '].desc');
  });
  if (data.faqs) data.faqs.forEach((f, i) => {
    checkText(f.question, 'faqs[' + i + '].question');
    checkText(f.answer, 'faqs[' + i + '].answer');
  });
  if (data.additionalSections) data.additionalSections.forEach((s, i) => {
    checkText(s.heading, 'additionalSections[' + i + '].heading');
    if (s.paragraphs) s.paragraphs.forEach((p, pi) => checkText(p, 'additionalSections[' + i + '].paragraphs[' + pi + ']'));
    if (s.bulletPoints) s.bulletPoints.forEach((b, bi) => checkText(b, 'additionalSections[' + i + '].bulletPoints[' + bi + ']'));
  });
}

console.log('Stats:', JSON.stringify(stats, null, 2));
console.log('Total issues found:', issues.length);
if (issues.length > 0) {
  console.log('Issues found:', JSON.stringify(issues, null, 2));
}
