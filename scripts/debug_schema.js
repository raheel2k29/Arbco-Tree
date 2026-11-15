async function debug() {
  const r = await fetch('https://www.arbco.com.au/service-areas/tree-removal-aitkenvale');
  const html = await r.text();
  
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  console.log('JSON-LD scripts found count:', scripts.length);
  scripts.forEach((s, idx) => {
    console.log(`\n--- SCRIPT ${idx} ---`);
    console.log(s[1]);
  });

  console.log('\n--- TEXT CHECKS ---');
  console.log('Other Services in Aitkenvale:', html.indexOf('Other Services in Aitkenvale'));
  console.log('Helpful Arborist Guides for Aitkenvale Property Owners:', html.indexOf('Helpful Arborist Guides for Aitkenvale Property Owners'));
}

debug();
