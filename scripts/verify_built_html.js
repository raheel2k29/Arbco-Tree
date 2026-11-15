const fs = require('fs');

const sampleSlugs = [
  'tree-removal-alligator-creek',
  'tree-removal-belgian-gardens',
  'tree-removal-arcadia',
  'tree-removal-black-river',
  'tree-removal-castle-hill'
];

for (const slug of sampleSlugs) {
  const filePath = '.next/server/app/service-areas/' + slug + '.html';
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  console.log('\n=== ' + slug + ' ===');
  const title = html.match(/<title>([^<]+)<\/title>/);
  console.log('Title:', title ? title[1] : 'NONE');
  const desc = html.match(/<meta name="description" content="([^"]+)"/);
  console.log('Meta Desc:', desc ? desc[1].substring(0, 70) + '...' : 'NONE');
  console.log('Has 4-step process:', html.includes('Our Tree Removal Process in'));
  console.log('Has FAQs:', html.includes('Frequently Asked Questions About Tree Removal in'));
  console.log('Has Quote CTA:', html.includes('Request a Tree Removal Quote in') || html.includes('Need Professional Tree Removal in'));
}
