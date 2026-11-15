const fs = require('fs');
const path = require('path');

const dir = 'scripts/extracted_texts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));

const summary = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const urlMatch = content.match(/https:\/\/www\.arbco\.com\.au\/service-areas\/([a-zA-Z0-9\-_]+)/);
  const slug = urlMatch ? urlMatch[1] : 'UNKNOWN';

  // Match SEO Title
  const titleMatch = content.match(/SEO Title:[\s\r\n]*([^\r\n]+)/i);
  const seoTitle = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : 'MISSING';

  // Match Meta Description
  const metaMatch = content.match(/Meta Description:[\s\r\n]*([^\r\n]+)/i);
  const metaDesc = metaMatch ? metaMatch[1].replace(/\s+/g, ' ').trim() : 'MISSING';

  summary.push({
    file,
    slug,
    titleLen: seoTitle.length,
    seoTitle,
    descLen: metaDesc.length,
    metaDesc: metaDesc.substring(0, 60) + '...'
  });
}

console.log(`Total files inspected: ${summary.length}`);
const missingTitles = summary.filter(s => s.seoTitle === 'MISSING');
console.log(`Missing titles: ${missingTitles.length}`);
const over60Titles = summary.filter(s => s.titleLen > 60);
console.log(`Titles over 60 chars: ${over60Titles.length}`);
if (over60Titles.length > 0) {
  console.log('Sample over 60 titles:', over60Titles.slice(0, 5));
}
console.log('\nSample summary (first 5):', summary.slice(0, 5));
