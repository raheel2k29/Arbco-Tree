import { getSuburbPageContent } from '../src/lib/suburbIntelligence';
import { generateSuburbJsonLd } from '../src/lib/schemaStructuredData';
import { services } from '../src/lib/locationData';
import { generateSuburbSeoTitle, generateSuburbMetaDescription, generateSuburbCanonical } from '../src/lib/seoMetadata';

console.log('Testing Aitkenvale Tree Removal page data...\n');

const treeRemovalService = services.find(s => s.id === 'tree-removal')!;
const content = getSuburbPageContent('Aitkenvale', 'tree-removal', 'Tree Removal');

console.log('1. SEO Title:');
console.log(generateSuburbSeoTitle('Aitkenvale', 'tree-removal', 'Tree Removal', content.zoneKey));

console.log('\n2. Meta Description:');
console.log(generateSuburbMetaDescription('Aitkenvale', 'tree-removal', 'Tree Removal', content.environmentalProfile, null, content.zoneKey));

console.log('\n3. Canonical URL:');
console.log(generateSuburbCanonical('tree-removal', 'Aitkenvale'));

console.log('\n4. Process Heading & Steps:');
console.log('Heading:', content.processHeading);
content.processSteps.forEach((s, idx) => console.log(`  Step ${idx + 1}: ${s.title}`));

console.log('\n5. Challenges Section:');
console.log('Heading:', content.challengesSection?.heading);
console.log('Bullets count:', content.challengesSection?.bulletPoints.length);

console.log('\n6. Storm Damaged Section:');
console.log('Heading:', content.stormDamagedSection?.heading);

console.log('\n7. FAQs count & first question:');
console.log('Total FAQs:', content.faqs.length);
content.faqs.forEach((f, idx) => console.log(`  Q${idx + 1}: ${f.question}`));

console.log('\n8. Local Quote CTA Section:');
console.log('Heading:', content.quoteCtaSection?.heading);

const schemas = generateSuburbJsonLd('Aitkenvale', treeRemovalService, content);
const faqSchema: any = schemas.find((s: any) => s['@type'] === 'FAQPage');
console.log('\n9. Schema.org FAQPage questions:');
if (faqSchema && faqSchema.mainEntity) {
  faqSchema.mainEntity.forEach((q: any, idx: number) => console.log(`  Schema Q${idx + 1}: ${q.name}`));
}

console.log('\nVerification complete!');
