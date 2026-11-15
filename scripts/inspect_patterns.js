const fs = require('fs');
const path = require('path');

const sampleFiles = [
  'alligator-creek Service Page.txt',
  'arcadia Service Page.txt',
  'balgal-beach Service Page.txt',
  'Barringha Service Page.txt',
  'Beach Holm Service Page.txt',
  'Currajong Service Page.txt',
  'Douglas Service Page.txt',
  'Garbutt Service Page.txt',
  'Magnetic Island  Service Page.txt',
  'North Ward Service Page.txt'
];

for (const file of sampleFiles) {
  const content = fs.readFileSync(path.join('scripts/extracted_texts', file), 'utf8');
  console.log(`\n================== ${file} ==================`);
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  const numbered = lines.filter(l => /^\d+\.\s+[A-Z]/.test(l));
  console.log('Numbered lines count:', numbered.length);
  console.log('Top 12 numbered lines:');
  numbered.slice(0, 12).forEach(l => console.log('  ' + l));
}
