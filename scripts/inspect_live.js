fetch('https://www.arbco.com.au/service-areas/tree-removal-aitkenvale')
  .then(r => r.text())
  .then(html => {
    console.log('--- HEAD ---');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    console.log('Meta Desc:', descMatch ? descMatch[1] : 'NONE');

    console.log('\n--- HEADINGS (H1, H2, H3) ---');
    const regex = /<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const tag = match[1].toUpperCase();
      const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      console.log(`${tag}: ${text}`);
    }
  })
  .catch(err => console.error(err));
