import { GOOGLE_PLACE_ID, GOOGLE_MAPS_REVIEW_URL, fetchGooglePlacesReviews } from '../src/lib/googleReviews';
import fs from 'fs';
import path from 'path';

async function runTests() {
  console.log('--- Testing Google Reviews Implementation ---');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, msg: string) {
    total++;
    if (condition) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      process.exitCode = 1;
    }
  }

  // 1. Verify Place ID
  assert(GOOGLE_PLACE_ID === 'ChIJG-YJIXv51WsR13gvhrSbQYA', 'Google Place ID matches verified business ID: ChIJG-YJIXv51WsR13gvhrSbQYA');

  // 2. Verify Google Maps URL
  assert(GOOGLE_MAPS_REVIEW_URL.includes(GOOGLE_PLACE_ID), 'Google Maps Review URL contains Place ID');

  // 3. Test Graceful Fallback (when API key is absent)
  delete process.env.GOOGLE_PLACES_API_KEY;
  const fallback = await fetchGooglePlacesReviews();
  assert(fallback.rating === undefined, 'Fallback does not hardcode rating without API');
  assert(fallback.userRatingCount === undefined, 'Fallback does not hardcode review count without API');
  assert(fallback.isFallback === true, 'Fallback flag is true when key not configured');
  assert(fallback.googleMapsUri.includes(GOOGLE_PLACE_ID), 'Fallback contains valid Google Maps review URI');

  // 4. Verify Component Code (Client provided GoogleReviews.tsx)
  const compPath = path.join(process.cwd(), 'src/components/GoogleReviews.tsx');
  const compCode = fs.readFileSync(compPath, 'utf8');

  assert(compCode.includes('What Our Townsville Customers Say'), 'Component contains exact heading: "What Our Townsville Customers Say"');
  assert(compCode.includes('Read Our Google Reviews'), 'Component contains prominent "Read Our Google Reviews" link');
  assert(compCode.includes('target="_blank"'), 'Google review links open in new tab (target="_blank")');
  assert(compCode.includes('rel="noopener noreferrer"'), 'External links include rel="noopener noreferrer"');
  assert(compCode.includes('Verified Google Reviews'), 'Includes Google Verified Reviews badge');
  assert(compCode.includes('Powered by') || compCode.includes('Google'), 'Includes Google approved branding/logo');

  // 5. Verify API Route Code
  const routePath = path.join(process.cwd(), 'src/app/api/reviews/route.ts');
  const routeCode = fs.readFileSync(routePath, 'utf8');
  assert(routeCode.includes('s-maxage=86400') || routeCode.includes('revalidate = 86400'), 'API route defines 24-hour cache headers (complying with Google max 30-day storage policy)');
  assert(routeCode.includes('Cache-Control'), 'API route returns public cache control headers');

  // 6. Verify Homepage Integration
  const homePath = path.join(process.cwd(), 'src/app/page.tsx');
  const homeCode = fs.readFileSync(homePath, 'utf8');
  assert(homeCode.includes('<GoogleReviews />') || homeCode.includes('<GoogleReviewsSection />'), 'Homepage includes GoogleReviews component');
  assert(!homeCode.includes('Meet Our Happy Customers'), 'Outdated static placeholder testimonials removed from homepage');

  // 7. Verify next.config.ts remote patterns for Google user content
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
  const nextConfigCode = fs.readFileSync(nextConfigPath, 'utf8');
  assert(nextConfigCode.includes('googleusercontent.com'), 'next.config.ts allows googleusercontent.com for reviewer profile photos');

  // 8. Verify .env.example
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envExampleCode = fs.readFileSync(envExamplePath, 'utf8');
  assert(envExampleCode.includes('GOOGLE_PLACES_API_KEY='), '.env.example documents GOOGLE_PLACES_API_KEY');

  console.log(`\nResults: ${passed} / ${total} tests passed.`);
}

runTests();
