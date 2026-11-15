const fs = require('fs');
const path = require('path');

function cleanText(t) {
  if (!t) return '';
  return t.replace(/\r/g, '').replace(/\u00a0/g, ' ').trim();
}

function parseFile(fileName) {
  const content = fs.readFileSync(path.join('scripts/extracted_texts', fileName), 'utf8');
  const result = {
    file: fileName,
    slug: '',
    seoTitle: '',
    metaDescription: '',
    h1Subtitle: '',
    heroDescription: '',
    processSteps: [],
    faqs: [],
    challengesSection: null,
    stormDamagedSection: null,
    quoteCtaSection: null,
    additionalSections: []
  };

  // 1. Slug
  const urlMatch = content.match(/https:\/\/www\.arbco\.com\.au\/service-areas\/([a-zA-Z0-9\-_]+)/);
  if (urlMatch) {
    result.slug = urlMatch[1];
  }

  // 2. SEO Title
  const titleA = content.match(/(?:SEO Title|SEO title):[\s\n]*([^\n]+)/i);
  const titleB = content.match(/CURRENT SEO TITLE[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (titleB) {
    result.seoTitle = cleanText(titleB[1]);
  } else if (titleA) {
    const raw = cleanText(titleA[1]);
    result.seoTitle = raw.replace(/^Use:\s*/i, '');
  }

  // If wrapped over lines (like "Tree Removal Belgian Gardens |\nArbco Tree Services")
  if (result.seoTitle && result.seoTitle.endsWith('|')) {
    const afterPipe = content.match(/(?:SEO Title|SEO title)[\s\S]*?\|\s*\n\s*([^\n]+)/i);
    if (afterPipe) {
      result.seoTitle = `${result.seoTitle} ${cleanText(afterPipe[1])}`;
    }
  }

  // 3. Meta Description
  const metaA = content.match(/(?:Meta Description|Meta description):[\s\n]*([^\n]+(?:\n(?!(?:H1|Canonical|Page URL|Headings|\d+\.))[^\n]+)*)/i);
  const metaB = content.match(/META DESCRIPTION — REPLACE WITH:[\s\n]*([^\n]+(?:\n(?!(?:H1|CANONICAL|PAGE URL|OPEN GRAPH|\d+\.))[^\n]+)*)/i);
  if (metaB) {
    result.metaDescription = cleanText(metaB[1].replace(/\n+/g, ' '));
  } else if (metaA) {
    const raw = cleanText(metaA[1].replace(/^Use:\s*/i, '').replace(/\n+/g, ' '));
    result.metaDescription = raw;
  }

  // 4. Hero Subtitle & Description
  const subMatch = content.match(/REMOVE THE EXISTING SUBTITLE:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (subMatch) {
    result.h1Subtitle = cleanText(subMatch[1].replace(/^["']|["']$/g, ''));
  }

  const descMatch = content.match(/REMOVE THE EXISTING HERO DESCRIPTION:[\s\S]*?REPLACE WITH:[\s\n]*([\s\S]*?)(?=(?:Retain the existing|\d+\.\s+Replace|\n\s*\n\s*\d+\.|$))/i);
  if (descMatch) {
    result.heroDescription = cleanText(descMatch[1].replace(/^["']|["']$/g, '').replace(/\n+/g, ' '));
  }

  return result;
}

const testFiles = [
  'Aitkenvale Service Page Changes.txt',
  'alligator-creek Service Page.txt',
  'annandale service page.txt',
  'arcadia Service Page.txt',
  'Black River  Service Page.txt'
];

for (const tf of testFiles) {
  console.log(`\n=== Testing ${tf} ===`);
  const res = parseFile(tf);
  console.log('Slug:', res.slug);
  console.log('SEO Title:', res.seoTitle, `(${res.seoTitle.length} chars)`);
  console.log('Meta Desc:', res.metaDescription.substring(0, 80) + '...', `(${res.metaDescription.length} chars)`);
  console.log('Subtitle:', res.h1Subtitle);
  console.log('Hero Desc:', res.heroDescription ? res.heroDescription.substring(0, 80) + '...' : 'NONE');
}
