const fs = require('fs');
const { execSync } = require('child_process');

function extractDocxText(filePath) {
  return execSync(`powershell -ExecutionPolicy Bypass -File scripts/read_docx.ps1 "${filePath}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
}

function parseDocxContent(rawText) {
  const result = {};

  // 1. URL & Slug
  const urlMatch = rawText.match(/https:\/\/www\.arbco\.com\.au\/service-areas\/([a-zA-Z0-9\-_]+)/);
  if (urlMatch) {
    result.pageUrl = urlMatch[0];
    result.slug = urlMatch[1];
  }

  // 2. SEO Title
  const titleMatch = rawText.match(/SEO Title:[\s\r\n]*([^\r\n]+)/i);
  if (titleMatch) {
    result.seoTitle = titleMatch[1].replace(/\s+/g, ' ').trim();
  }

  // 3. Meta Description
  const metaMatch = rawText.match(/Meta Description:[\s\r\n]*([^\r\n]+(?:[\r\n]+(?![A-Z0-9\.\s]+:)[^\r\n]+)*)/i);
  if (metaMatch) {
    result.metaDescription = metaMatch[1].replace(/\s+/g, ' ').trim();
  }

  // 4. Hero Subtitle & Description
  const subMatch = rawText.match(/REMOVE THE EXISTING SUBTITLE:[\s\S]*?REPLACE WITH:[\s\r\n]*([^\r\n]+)/i);
  if (subMatch) {
    result.h1Subtitle = subMatch[1].replace(/\s+/g, ' ').trim();
  }

  const heroDescMatch = rawText.match(/REMOVE THE EXISTING HERO DESCRIPTION:[\s\S]*?REPLACE WITH:[\s\r\n]*([\s\S]*?)(?=Retain the existing|\d+\.\s+Replace|\n\s*\n\s*\d+\.|$)/i);
  if (heroDescMatch) {
    result.heroDescription = heroDescMatch[1].replace(/\s+/g, ' ').trim();
  }

  return result;
}

const rawText = fs.readFileSync('scripts/alligator_sample.txt', 'utf8');
const parsed = parseDocxContent(rawText);
console.log('Parsed sample:', parsed);
