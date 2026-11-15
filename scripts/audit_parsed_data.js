const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/parsed_all_suburbs.json', 'utf8'));
const slugs = Object.keys(data);

console.log(`Auditing ${slugs.length} parsed suburbs...\n`);

let titleIssues = 0;
let descIssues = 0;
let processIssues = 0;
let faqIssues = 0;

for (const slug of slugs) {
  const item = data[slug];

  // 1. Title audit
  if (!item.seoTitle || item.seoTitle.length === 0) {
    console.log(`❌ [${slug}] Empty SEO Title!`);
    titleIssues++;
  } else if (item.seoTitle.length > 60) {
    console.log(`❌ [${slug}] Title > 60 chars: "${item.seoTitle}" (${item.seoTitle.length})`);
    titleIssues++;
  }

  // 2. Meta description audit
  if (!item.metaDescription || item.metaDescription.length < 50) {
    console.log(`❌ [${slug}] Short/Empty Meta Description: "${item.metaDescription}"`);
    descIssues++;
  }

  // 3. Process steps audit
  if (item.processSteps.length !== 4) {
    console.log(`⚠️ [${slug}] Process steps count: ${item.processSteps.length}`);
    processIssues++;
  }

  // 4. FAQs audit
  if (item.faqs.length !== 5) {
    console.log(`⚠️ [${slug}] FAQs count: ${item.faqs.length}`);
    faqIssues++;
  }
}

console.log('\n--- AUDIT SUMMARY ---');
console.log(`Total Suburbs: ${slugs.length}`);
console.log(`Title Issues: ${titleIssues}`);
console.log(`Description Issues: ${descIssues}`);
console.log(`Process Step Issues: ${processIssues}`);
console.log(`FAQ Count Issues: ${faqIssues}`);
