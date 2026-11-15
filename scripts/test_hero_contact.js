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

const dir = 'scripts/extracted_texts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));

let subFound = 0;
let descFound = 0;
let quoteFound = 0;

for (const f of files) {
  const content = fs.readFileSync(dir + '/' + f, 'utf8');

  // Hero Subtitle
  const subMatch = content.match(/REMOVE (?:THE )?(?:EXISTING )?SUBTITLE:[\s\S]*?REPLACE WITH:[\s\n]*([^\n]+)/i);
  if (subMatch && cleanText(subMatch[1]).length > 5) subFound++;

  // Hero Description
  const descMatch = content.match(/REMOVE (?:THE )?(?:EXISTING )?(?:HERO )?DESCRIPTION:[\s\S]*?REPLACE WITH:[\s\n]*([\s\S]*?)(?=(?:Retain|\d+\.\s+Replace|\n\s*\n\s*\d+\.|$))/i);
  if (descMatch && cleanText(descMatch[1]).length > 20) descFound++;

  // Quote CTA
  const contactMatch = content.match(/(?:Replace the main contact section|Add a clear local call-to-action)[\s\S]*?(?:REPLACE WITH|ADD THE FOLLOWING EXACT CONTENT|ADD:):[\s\n]*([\s\S]*?)(?=\n\s*(?:Retain|\d+\.\s+Replace|\d+\.\s+Preserve|\d+\.\s+Update|\d+\.\s+Technical|Confirm|$))/i);
  if (contactMatch && cleanText(contactMatch[1]).length > 20) quoteFound++;
}

console.log(`Hero Subtitles found: ${subFound} / ${files.length}`);
console.log(`Hero Descriptions found: ${descFound} / ${files.length}`);
console.log(`Quote CTA found: ${quoteFound} / ${files.length}`);
