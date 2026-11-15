const { execSync } = require('child_process');
const fs = require('fs');

const sampleFiles = [
  'alligator-creek Service Page.docx',
  'arcadia Service Page.docx',
  'balgal-beach Service Page.docx',
  'CastleHill Service Page.docx',
  'Douglas Service Page.docx',
  'Garbutt Service Page.docx'
];

for (const file of sampleFiles) {
  console.log(`\n================== ${file} ==================`);
  const text = execSync(`powershell -ExecutionPolicy Bypass -File scripts/read_docx.ps1 "Arbco Service Pages Changes/${file}"`, { encoding: 'utf8' });
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const headings = lines.filter(l => /^\d+\.\s+[A-Z]/.test(l));
  console.log('Total lines:', lines.length);
  console.log('Numbered sections count:', headings.length);
  console.log('Numbered sections:', headings.slice(0, 10));
}
