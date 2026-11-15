const { execSync } = require('child_process');
const fs = require('fs');

const files = fs.readdirSync('Arbco Service Pages Changes').filter(f => f.endsWith('.docx'));
const stats = {
  shortFormat: [], // Aitkenvale style (5-9 sections)
  comprehensiveFormat: [], // Alligator Creek / Belgian Gardens style (15-30+ sections)
  other: []
};

for (const file of files) {
  const text = execSync(`powershell -ExecutionPolicy Bypass -File scripts/read_docx.ps1 "Arbco Service Pages Changes/${file}"`, { encoding: 'utf8' });
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const headings = lines.filter(l => /^\d+\.\s+[A-Z]/.test(l));
  
  if (headings.length <= 10) {
    stats.shortFormat.push({ file, count: headings.length });
  } else {
    stats.comprehensiveFormat.push({ file, count: headings.length });
  }
}

console.log(`Short format (<10 sections): ${stats.shortFormat.length}`);
stats.shortFormat.forEach(s => console.log(`  - ${s.file} (${s.count} sections)`));

console.log(`\nComprehensive format (>10 sections): ${stats.comprehensiveFormat.length}`);
stats.comprehensiveFormat.slice(0, 10).forEach(s => console.log(`  - ${s.file} (${s.count} sections)`));
