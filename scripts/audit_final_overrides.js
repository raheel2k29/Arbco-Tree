const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/suburbOverrides.json', 'utf8'));
const slugs = Object.keys(data);

console.log(`Auditing generated JSON for ${slugs.length} suburbs...\n`);

let titleFails = 0;
let metaFails = 0;
let processFails = 0;
let faqFails = 0;
let ctaFails = 0;

for (const slug of slugs) {
  const item = data[slug];

  if (!item.seoTitle || item.seoTitle.length > 60) {
    console.log(`❌ [${slug}] Title issue: "${item.seoTitle}" (${item.seoTitle?.length})`);
    titleFails++;
  }

  if (!item.metaDescription || item.metaDescription.length < 40) {
    console.log(`❌ [${slug}] Meta desc issue: "${item.metaDescription}"`);
    metaFails++;
  }

  if (!item.processSteps || item.processSteps.length !== 4) {
    console.log(`❌ [${slug}] Process steps count: ${item.processSteps?.length}`);
    processFails++;
  }

  if (!item.faqs || item.faqs.length !== 5) {
    console.log(`❌ [${slug}] FAQs count: ${item.faqs?.length}`);
    faqFails++;
  }

  if (!item.quoteCtaSection || !item.quoteCtaSection.heading) {
    console.log(`❌ [${slug}] Missing Quote CTA section`);
    ctaFails++;
  }
}

console.log('\n--- AUDIT RESULTS ---');
console.log(`Total Suburbs Audited: ${slugs.length}`);
console.log(`Title Fails (>60 chars or empty): ${titleFails}`);
console.log(`Meta Description Fails: ${metaFails}`);
console.log(`Process Step Fails (!= 4): ${processFails}`);
console.log(`FAQ Fails (!= 5): ${faqFails}`);
console.log(`Quote CTA Fails: ${ctaFails}`);

if (titleFails === 0 && metaFails === 0 && processFails === 0 && faqFails === 0 && ctaFails === 0) {
  console.log('\n🎉 ALL 83 SUBURB OVERRIDES ARE 100% COMPLETE AND COMPLIANT!');
}
