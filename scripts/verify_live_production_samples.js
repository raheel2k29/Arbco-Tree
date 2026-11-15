const sampleSlugs = [
  'tree-removal-alligator-creek',
  'tree-removal-arcadia',
  'tree-removal-belgian-gardens',
  'tree-removal-black-river',
  'tree-removal-castle-hill',
  'tree-removal-aitkenvale'
];

async function verifyLiveProduction() {
  console.log('Verifying live production suburb pages on https://www.arbco.com.au ...\n');
  
  for (const slug of sampleSlugs) {
    const url = `https://www.arbco.com.au/service-areas/${slug}?v=${Date.now()}`;
    const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
    if (res.status !== 200) {
      console.log(`❌ [${slug}] HTTP Status ${res.status}`);
      continue;
    }
    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'NONE';
    const hasProcess = html.includes('Our Tree Removal Process in');
    const hasFaq = html.includes('Frequently Asked Questions About');
    const hasQuote = html.includes('Request a Tree Removal Quote in') || html.includes('Need Professional Tree Removal in');
    const hasSchema = html.includes('"@type":"FAQPage"');

    console.log(`✅ [${slug}] HTTP 200`);
    console.log(`   Title: "${title}" (${title.length} chars)`);
    console.log(`   Process Section: ${hasProcess ? '✓' : '✗'}`);
    console.log(`   FAQ Section: ${hasFaq ? '✓' : '✗'}`);
    console.log(`   FAQPage Schema: ${hasSchema ? '✓' : '✗'}`);
    console.log(`   Quote CTA: ${hasQuote ? '✓' : '✗'}\n`);
  }
}

verifyLiveProduction();
