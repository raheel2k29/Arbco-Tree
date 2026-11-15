const fs = require('fs');

function extractFaqs(content) {
  const faqs = [];
  const sections = content.split(/(?=(?:^|\n)\s*\d+\.\s+)/);
  for (const sec of sections) {
    if (!/^\s*\d+\.\s+Replace[\s\S]*?FAQ/i.test(sec)) continue;
    
    // Check if KEEP THE QUESTION is present
    let q = '';
    const keepQMatch = sec.match(/KEEP (?:THE )?QUESTION:[\s\n]*([^\n]+)/i);
    if (keepQMatch) {
      q = keepQMatch[1].replace(/\s+/g, ' ').trim();
    }
    
    // Check if REMOVE THE QUESTION ... Keep this question unchanged is present
    if (!q) {
      const keepUnchangedMatch = sec.match(/REMOVE (?:THE )?QUESTION:[\s\S]*?"([^"]+)"[\s\S]*?Keep (?:this )?question unchanged/i);
      if (keepUnchangedMatch) {
        q = keepUnchangedMatch[1].replace(/\s+/g, ' ').trim();
      }
    }
    
    const repMatch = sec.match(/REPLACE WITH[^\n:]*:[\s\n]*([\s\S]*)$/i);
    if (repMatch) {
      const block = repMatch[1].trim();
      if (q) {
        const a = block.replace(/\s+/g, ' ').trim();
        if (a) faqs.push({ question: q, answer: a });
      } else {
        const qMatch = block.match(/^([\s\S]*?\?)\s*([\s\S]*)$/);
        if (qMatch) {
          const parsedQ = qMatch[1].replace(/\s+/g, ' ').trim();
          const parsedA = qMatch[2].replace(/\s+/g, ' ').trim();
          if (parsedQ && parsedA) faqs.push({ question: parsedQ, answer: parsedA });
        }
      }
    }
  }

  // Fallback for Aitkenvale style
  if (faqs.length === 0) {
    const blockMatch = content.match(/4\.\s+Replace the five specified FAQ answers[\s\S]*?(?=\n\s*5\.\s+Add|\n\s*\d+\.|$)/i);
    if (blockMatch) {
      const lines = blockMatch[0].split('\n').map(l => l.trim()).filter(Boolean);
      let curQ = '';
      let curA = [];
      for (const l of lines) {
        if (l.endsWith('?') && !l.includes('Where these questions')) {
          if (curQ && curA.length > 0) {
            faqs.push({ question: curQ.replace(/\s+/g, ' ').trim(), answer: curA.join(' ').replace(/\s+/g, ' ').trim() });
            curA = [];
          }
          curQ = l;
        } else if (curQ) {
          curA.push(l);
        }
      }
      if (curQ && curA.length > 0) {
        faqs.push({ question: curQ.replace(/\s+/g, ' ').trim(), answer: curA.join(' ').replace(/\s+/g, ' ').trim() });
      }
    }
  }

  return faqs;
}

const dir = 'scripts/extracted_texts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));
let perfectCount = 0;
const fails = [];

for (const f of files) {
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  const faqs = extractFaqs(c);
  if (faqs.length === 5) {
    perfectCount++;
  } else {
    fails.push({ file: f, count: faqs.length });
  }
}

console.log('=== RESULTS ACROSS ALL 84 FILES ===');
console.log('Perfect 5/5 FAQs:', perfectCount, '/', files.length);
if (fails.length > 0) {
  console.log('Fails:', fails);
}
