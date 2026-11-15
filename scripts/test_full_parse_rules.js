const fs = require('fs');
const path = require('path');

const dir = 'scripts/extracted_texts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractProcess(content) {
  const m = content.match(/(?:Replace the (?:entire )?(?:four|four-step|entire four-step|Tree Removal Process)?\s*(?:tree\s*)?(?:removal\s*)?process(?:\s+section)?[\s\S]*?REPLACE WITH[^\n:]*:[\s\n]*)([\s\S]*?)(?=\n\s*(?:(?:[12]\d|[89])\.\s+Replace|\d+\.\s+Add|\d+\.\s+Preserve|$))/i);
  if (!m) return [];
  const stepMatches = [...m[1].matchAll(/(?:^|\n)\s*([1-4])\.\s+([^\n]+)\n([\s\S]*?)(?=(?:\n\s*[1-4]\.\s+)|$)/g)];
  return stepMatches.map(sm => ({
    num: sm[1],
    title: cleanText(sm[2]),
    desc: cleanText(sm[3])
  }));
}

function extractFaqs(content) {
  const faqs = [];
  // Pattern 1: Separate numbered FAQ sections (10..14)
  const faqSections = [...content.matchAll(/(?:Replace (?:the |FAQ \d+ [—\-] )?[a-zA-Z0-9\s\-—]+FAQ[\s\S]*?REPLACE WITH:[\s\n]*)([\s\S]*?)(?=\n\s*(?:(?:1[1-9]|20)\.\s+Replace|\d+\.\s+Add|\d+\.\s+Preserve|\d+\.\s+Update|Confirm|$))/gi)];
  for (const f of faqSections) {
    const block = f[1].trim();
    const qMatch = block.match(/^([\s\S]*?\?)\s*([\s\S]*)$/);
    if (qMatch) {
      const q = cleanText(qMatch[1]);
      const a = cleanText(qMatch[2]);
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // Pattern 2: Single block of FAQs (e.g. Aitkenvale style)
  if (faqs.length === 0) {
    const blockMatch = content.match(/4\.\s+Replace the five specified FAQ answers[\s\S]*?(?=\n\s*5\.\s+Add|\n\s*\d+\.|$)/i);
    if (blockMatch) {
      const lines = blockMatch[0].split('\n').map(l => l.trim()).filter(Boolean);
      let curQ = '';
      let curA = [];
      for (const l of lines) {
        if (l.endsWith('?') && !l.includes('Where these questions')) {
          if (curQ && curA.length > 0) {
            faqs.push({ question: cleanText(curQ), answer: cleanText(curA.join(' ')) });
            curA = [];
          }
          curQ = l;
        } else if (curQ) {
          curA.push(l);
        }
      }
      if (curQ && curA.length > 0) {
        faqs.push({ question: cleanText(curQ), answer: cleanText(curA.join(' ')) });
      }
    }
  }

  return faqs;
}

let processOk = 0;
let faqOk = 0;
const processFails = [];
const faqFails = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const steps = extractProcess(content);
  const faqs = extractFaqs(content);

  if (steps.length === 4) processOk++;
  else processFails.push({ file: f, count: steps.length });

  if (faqs.length === 5) faqOk++;
  else faqFails.push({ file: f, count: faqs.length });
}

console.log(`\n=== RESULTS ACROSS ALL ${files.length} FILES ===`);
console.log(`Process Steps 4/4: ${processOk} / ${files.length}`);
if (processFails.length > 0) {
  console.log('Process fails:', processFails);
}
console.log(`FAQs 5/5: ${faqOk} / ${files.length}`);
if (faqFails.length > 0) {
  console.log('FAQ fails:', faqFails);
}
