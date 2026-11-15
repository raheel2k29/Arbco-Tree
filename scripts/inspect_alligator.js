const { execSync } = require('child_process');
const text = execSync('powershell -ExecutionPolicy Bypass -File scripts/read_docx.ps1 "Arbco Service Pages Changes/alligator-creek Service Page.docx"', { encoding: 'utf8' });
const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

lines.forEach((l, i) => {
  if (/^\d+\.\s+[A-Z]/.test(l) || l.startsWith('SEO Title:') || l.startsWith('Page URL:')) {
    console.log(`${i}: ${l}`);
  }
});
