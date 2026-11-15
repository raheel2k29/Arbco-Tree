async function auditLivePage() {
  console.log('Fetching live page from https://www.arbco.com.au/service-areas/tree-removal-aitkenvale...');
  const res = await fetch('https://www.arbco.com.au/service-areas/tree-removal-aitkenvale', {
    headers: { 'Cache-Control': 'no-cache' }
  });
  
  if (res.status !== 200) {
    console.error('HTTP Status Error:', res.status);
    return;
  }
  const html = await res.text();
  // Cleaned text for content verification (strips HTML tags and comments)
  const textContent = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

  const results = [];

  function check(category, item, pass, details = '') {
    results.push({ category, item, pass, details });
    const mark = pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${mark} [${category}] ${item} ${details ? '(' + details + ')' : ''}`);
  }

  // 1. Technical SEO & Meta
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const actualTitle = titleMatch ? titleMatch[1] : '';
  const expectedTitle = 'Tree Removal Aitkenvale | Arbco Tree Services';
  check('SEO', 'Page Title', actualTitle === expectedTitle, `Actual: "${actualTitle}", Length: ${actualTitle.length}`);
  check('SEO', 'Page Title Length <= 60', actualTitle.length <= 60, `${actualTitle.length} characters`);

  const metaDescMatch = html.match(/<meta name="description" content="([^"]+)"/);
  const actualDesc = metaDescMatch ? metaDescMatch[1] : '';
  const expectedDesc = 'Need tree removal in Aitkenvale? Arbco provides professional tree removal, storm-damaged tree assessments and stump grinding options. Call 0456 579 811.';
  check('SEO', 'Meta Description', actualDesc === expectedDesc, `Length: ${actualDesc.length}`);

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  const actualCanonical = canonicalMatch ? canonicalMatch[1] : '';
  const expectedCanonical = 'https://www.arbco.com.au/service-areas/tree-removal-aitkenvale';
  check('SEO', 'Canonical URL', actualCanonical === expectedCanonical, `Actual: ${actualCanonical}`);

  const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/);
  const actualRobots = robotsMatch ? robotsMatch[1] : 'index, follow (default)';
  check('SEO', 'Robots Indexable', !actualRobots.includes('noindex'), actualRobots);

  // 2. Heading Structure
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  check('Headings', 'H1 Count is Exactly 1', h1Matches.length === 1, `Count: ${h1Matches.length}`);
  check('Headings', 'H1 Contains "Tree Removal Aitkenvale"', h1Matches[0]?.includes('Tree Removal Aitkenvale'), `H1: "${h1Matches[0]}"`);

  check('Headings', 'H2 "Tree Removal Challenges in Aitkenvale"', textContent.includes('Tree Removal Challenges in Aitkenvale'));
  check('Headings', 'H2 "Storm-Damaged Tree Removal in Aitkenvale"', textContent.includes('Storm-Damaged Tree Removal in Aitkenvale'));
  check('Headings', 'H2 "Our Tree Removal Process in Aitkenvale"', textContent.includes('Our Tree Removal Process in Aitkenvale'));
  check('Headings', 'H2 "Request a Tree Removal Quote in Aitkenvale"', textContent.includes('Request a Tree Removal Quote in Aitkenvale'));

  // 3. Process Steps Content & H3
  const step1Title = 'Tree Inspection and Risk Assessment';
  const step1Desc = 'Before removing a tree in Aitkenvale, we assess its size, condition, location and proximity to surrounding structures';
  const step2Title = 'Property Access and Equipment Planning';
  const step2Desc = 'We assess the available working space and determine which equipment and removal methods are suitable for the property';
  const step3Title = 'Controlled Tree Removal';
  const step3Desc = "Depending on the tree's condition and location, removal may involve cutting branches and trunk sections in a planned sequence";
  const step4Title = 'Site Cleanup and Green Waste Management';
  const step4Desc = 'Following tree removal, our team completes the cleanup included in the agreed scope of work';

  check('Process', 'Step 1 Title & Desc', textContent.includes(step1Title) && textContent.includes(step1Desc));
  check('Process', 'Step 2 Title & Desc', textContent.includes(step2Title) && textContent.includes(step2Desc));
  check('Process', 'Step 3 Title & Desc', textContent.includes(step3Title) && textContent.includes(step3Desc));
  check('Process', 'Step 4 Title & Desc', textContent.includes(step4Title) && textContent.includes(step4Desc));

  // 4. Challenges Section Content & Bullets
  const bullets = [
    'Large trees growing close to residential buildings.',
    'Branches extending over roofs, fences or neighbouring properties.',
    'Restricted access through side gates and narrow driveways.',
    'Trees with storm-damaged limbs or structural defects.',
    'Root systems located near paving, driveways or underground services.',
    'Green waste handling and stump grinding following removal.'
  ];
  let allBullets = true;
  bullets.forEach(b => {
    if (!textContent.includes(b)) allBullets = false;
  });
  check('Challenges', 'All 6 Bullets Present', allBullets);
  check('Challenges', 'Challenges Footer Paragraph', textContent.includes('Arbco Tree Services assesses each property individually to determine an appropriate removal method'));

  // 5. Storm Damaged Section Content
  const stormTexts = [
    "Townsville's tropical storm season can expose trees to strong winds, heavy rainfall and changing ground conditions.",
    'Trees with split trunks, broken branches, damaged root systems or significant structural defects',
    'Arbco Tree Services can assess enquiries involving storm-damaged and hazardous trees in Aitkenvale.',
    'Customers should avoid approaching fallen trees or branches near electrical infrastructure'
  ];
  let allStorm = true;
  stormTexts.forEach(s => {
    if (!textContent.includes(s)) allStorm = false;
  });
  check('Storm Section', 'All 5 Storm Paragraphs', allStorm);

  // 6. FAQs Content & Matching Schema.org JSON-LD
  const faqs = [
    'How much does tree removal cost in Aitkenvale?',
    'Can you remove trees close to houses and fences?',
    'Do I need council approval to remove a tree in Aitkenvale?',
    'Can you remove the stump after cutting down a tree?',
    'What happens to the branches and timber after tree removal?'
  ];
  let allFaqs = true;
  faqs.forEach(f => {
    if (!textContent.includes(f)) allFaqs = false;
  });
  check('FAQs', 'All 5 FAQ Questions in HTML', allFaqs);

  // Extract JSON-LD
  const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let foundFaqSchema = false;
  let schemaFaqMatchesVisible = false;

  for (const m of jsonLdMatches) {
    try {
      const data = JSON.parse(m[1]);
      const entities = Array.isArray(data) ? data : (data['@graph'] || [data]);
      const faqEntity = entities.find(item => item['@type'] === 'FAQPage');
      if (faqEntity) {
        foundFaqSchema = true;
        const mainEntity = faqEntity.mainEntity || [];
        const schemaQuestions = mainEntity.map(q => q.name);
        if (schemaQuestions.length === 5 && schemaQuestions.includes(faqs[0]) && schemaQuestions.includes(faqs[1])) {
          schemaFaqMatchesVisible = true;
        }
      }
    } catch (e) {}
  }
  check('Schema', 'FAQPage Schema Present in JSON-LD', foundFaqSchema);
  check('Schema', 'FAQPage Schema Matches Visible FAQs Exactly', schemaFaqMatchesVisible);

  // 7. Preserved Elements
  check('Preserved', 'Phone Number (0456 579 811)', textContent.includes('0456 579 811'));
  check('Preserved', 'tel:0456579811 Link', html.includes('tel:0456579811'));
  check('Preserved', 'Free Quote CTA Button', textContent.includes('Free Quote') || textContent.includes('Request a Free Quote'));
  check('Preserved', 'Sidebar Other Services in Aitkenvale', textContent.includes('Other Services in Aitkenvale'));
  check('Preserved', 'Helpful Arborist Guides Section', textContent.includes('Helpful Arborist Guides for Aitkenvale Property Owners'));

  console.log('\n--- AUDIT SUMMARY ---');
  const failed = results.filter(r => !r.pass);
  if (failed.length === 0) {
    console.log(`🎉 ALL ${results.length} CHECKS PASSED PERFECTLY ON PRODUCTION!`);
  } else {
    console.log(`⚠️ ${failed.length} checks failed!`);
  }
}

auditLivePage();
