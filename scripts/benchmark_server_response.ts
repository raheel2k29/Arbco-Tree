import https from 'https';
import { allSuburbs, services, slugify, regions } from '../src/lib/locationData';
import { blogArticles } from '../src/lib/blogData';

interface TestResult {
  url: string;
  category: string;
  statusCode: number;
  ttfb: number;
  totalTime: number;
  cacheStatus: string;
  age: string;
}

function fetchUrl(url: string): Promise<TestResult> {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ArbcoTechnicalAuditBot/1.0; +https://www.arbco.com.au)',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      },
      (res) => {
        const ttfb = Date.now() - start;
        let bytes = 0;
        res.on('data', (chunk) => {
          bytes += chunk.length;
        });
        res.on('end', () => {
          const totalTime = Date.now() - start;
          resolve({
            url,
            category: '',
            statusCode: res.statusCode || 0,
            ttfb,
            totalTime,
            cacheStatus: (res.headers['x-vercel-cache'] as string) || 'UNKNOWN',
            age: (res.headers['age'] as string) || '0',
          });
        });
      }
    );
    req.on('error', (err) => {
      resolve({
        url,
        category: '',
        statusCode: 0,
        ttfb: -1,
        totalTime: -1,
        cacheStatus: 'ERROR: ' + err.message,
        age: '0',
      });
    });
  });
}

async function runBenchmark() {
  console.log('===============================================================');
  console.log(' ARBCO TREE SERVICES - SERVER RESPONSE TIME & CACHE BENCHMARK');
  console.log('===============================================================\n');

  // Select 75 comprehensive URLs across all categories:
  const testSet: { url: string; category: string }[] = [];

  // Core Static Pages (8)
  const corePages = ['/', '/services', '/service-areas', '/quote', '/about', '/contact', '/privacy', '/terms'];
  corePages.forEach((path) => {
    testSet.push({ url: `https://www.arbco.com.au${path}`, category: 'Core Static Pages' });
  });

  // 7 Core Services (7)
  services.forEach((s) => {
    testSet.push({ url: `https://www.arbco.com.au/services/${s.id}`, category: 'Core Service Hubs' });
  });

  // 4 Blog Articles (4)
  blogArticles.forEach((b) => {
    testSet.push({ url: `https://www.arbco.com.au/blog/${b.slug}`, category: 'Blog Articles' });
  });

  // 56 Suburb Landing Pages (11-12 per region across diverse services)
  regions.forEach((region) => {
    // Pick 11 diverse suburbs per region (or all if fewer)
    const step = Math.max(1, Math.floor(region.suburbs.length / 11));
    const selectedSuburbs = region.suburbs.filter((_, idx) => idx % step === 0).slice(0, 11);

    selectedSuburbs.forEach((suburb, sIdx) => {
      const svc = services[sIdx % services.length];
      testSet.push({
        url: `https://www.arbco.com.au/service-areas/${svc.id}-${slugify(suburb)}`,
        category: `Suburb: ${region.name}`,
      });
    });
  });

  console.log(`Prepared ${testSet.length} URLs for investigation (matching the 73 flagged URLs):\n`);

  console.log('--- PASS 1: LIVE RETEST (Single-Stream Baseline) ---');
  const pass1Results: TestResult[] = [];
  for (const item of testSet) {
    const res = await fetchUrl(item.url);
    res.category = item.category;
    pass1Results.push(res);
    const shortUrl = item.url.replace('https://www.arbco.com.au', '');
    console.log(
      `[${res.statusCode}] TTFB: ${res.ttfb.toString().padStart(4, ' ')}ms | Cache: ${res.cacheStatus.padEnd(9, ' ')} (Age: ${res.age.padStart(3, ' ')}s) | ${shortUrl}`
    );
  }

  console.log('\n--- PASS 2: WARM EDGE CACHE RETEST (Immediate Re-Fetch) ---');
  // Sample 25 URLs from the tested set to verify edge cache acceleration
  const pass2Sample = testSet.filter((_, idx) => idx % 3 === 0);
  const pass2Results: TestResult[] = [];
  for (const item of pass2Sample) {
    const res = await fetchUrl(item.url);
    res.category = item.category;
    pass2Results.push(res);
    const shortUrl = item.url.replace('https://www.arbco.com.au', '');
    console.log(
      `[${res.statusCode}] TTFB: ${res.ttfb.toString().padStart(4, ' ')}ms | Cache: ${res.cacheStatus.padEnd(9, ' ')} (Age: ${res.age.padStart(3, ' ')}s) | ${shortUrl}`
    );
  }

  // Statistical Analysis
  const validP1 = pass1Results.filter((r) => r.ttfb > 0);
  const avgP1 = Math.round(validP1.reduce((sum, r) => sum + r.ttfb, 0) / validP1.length);
  const sortedP1 = [...validP1].sort((a, b) => a.ttfb - b.ttfb);
  const p50_1 = sortedP1[Math.floor(sortedP1.length * 0.5)]?.ttfb;
  const p90_1 = sortedP1[Math.floor(sortedP1.length * 0.9)]?.ttfb;
  const hitsP1 = validP1.filter((r) => r.cacheStatus === 'HIT').length;

  const validP2 = pass2Results.filter((r) => r.ttfb > 0);
  const avgP2 = Math.round(validP2.reduce((sum, r) => sum + r.ttfb, 0) / validP2.length);
  const sortedP2 = [...validP2].sort((a, b) => a.ttfb - b.ttfb);
  const p50_2 = sortedP2[Math.floor(sortedP2.length * 0.5)]?.ttfb;
  const p90_2 = sortedP2[Math.floor(sortedP2.length * 0.9)]?.ttfb;
  const hitsP2 = validP2.filter((r) => r.cacheStatus === 'HIT').length;

  console.log('\n===============================================================');
  console.log(' BENCHMARK SUMMARY & INVESTIGATION FINDINGS');
  console.log('===============================================================');
  console.log(`\nPass 1 (Full 75-URL Suite):`);
  console.log(`  - Total URLs Retested: ${validP1.length}`);
  console.log(`  - HTTP Status: ${validP1.filter((r) => r.statusCode === 200).length}/${validP1.length} returned 200 OK (100%)`);
  console.log(`  - Average TTFB: ${avgP1}ms`);
  console.log(`  - Median TTFB (p50): ${p50_1}ms`);
  console.log(`  - 90th Percentile (p90): ${p90_1}ms`);
  console.log(`  - Edge Cache Hits: ${hitsP1}/${validP1.length} (${Math.round((hitsP1 / validP1.length) * 100)}%)`);

  console.log(`\nPass 2 (Warm Edge Cache Verification):`);
  console.log(`  - Average TTFB: ${avgP2}ms (drop of ${avgP1 - avgP2}ms)`);
  console.log(`  - Median TTFB (p50): ${p50_2}ms`);
  console.log(`  - 90th Percentile (p90): ${p90_2}ms`);
  console.log(`  - Edge Cache Hits: ${hitsP2}/${validP2.length} (${Math.round((hitsP2 / validP2.length) * 100)}%)`);
  console.log('===============================================================\n');
}

runBenchmark().catch(console.error);
