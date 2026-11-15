const fs = require('fs');

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractAddSections(content) {
  const sections = content.split(/(?=(?:^|\n)\s*\d+\.\s+)/);
  const result = [];
  
  for (const sec of sections) {
    if (!/^\s*\d+\.\s+Add/i.test(sec)) continue;
    // Check if it's "Add a section about..." or "Add a new section about..." or "Add an ... section"
    const titleMatch = sec.match(/^\s*\d+\.\s+Add\s+(?:a\s+|a\s+new\s+|an\s+)?(?:section\s+about\s+)?([^\n]+)/i);
    const repMatch = sec.match(/ADD[^\n:]*:[\s\n]*([\s\S]*)$/i);
    
    if (repMatch) {
      const block = repMatch[1].trim();
      const lines = block.split('\n').map(cleanText).filter(Boolean);
      if (lines.length > 0) {
        // First line is usually the H2 heading
        const heading = lines[0];
        const paragraphs = [];
        const bullets = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('•') || line.startsWith('-')) {
            bullets.push(cleanText(line.replace(/^[•\-]\s*/, '')));
          } else if (lines.length > 4 && i >= 3 && i <= lines.length - 2 && (line.endsWith('.') || line.endsWith(';')) && !line.includes('Arbco') && line.length < 120) {
            bullets.push(line);
          } else {
            paragraphs.push(line);
          }
        }
        result.push({
          sectionName: titleMatch ? cleanText(titleMatch[1]) : heading,
          heading,
          paragraphs,
          bullets
        });
      }
    }
  }
  return result;
}

const dir = 'scripts/extracted_texts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));
let totalSectionsFound = 0;
const countsPerFile = [];

for (const f of files) {
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  const addSecs = extractAddSections(c);
  totalSectionsFound += addSecs.length;
  countsPerFile.push({ file: f, count: addSecs.length });
}

console.log(`Total Add-Sections found across 84 files: ${totalSectionsFound}`);
console.log('Sample counts per file:', countsPerFile.slice(0, 10));
const zeroCount = countsPerFile.filter(c => c.count === 0);
console.log('Files with 0 add-sections:', zeroCount);
