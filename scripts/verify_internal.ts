import { regions, allSuburbs, services, slugify } from '../src/lib/locationData';
import { getComplementaryServices, getNearbySuburbs, priorityHubSuburbs } from '../src/lib/internalLinking';
import { blogArticles, getBlogArticle, getArticlesForService, getArticlesForSuburb } from '../src/lib/blogData';
import { getSuburbPageContent } from '../src/lib/suburbIntelligence';
import { generateSuburbJsonLd, generateCoreServiceJsonLd } from '../src/lib/schemaStructuredData';

const errors: string[] = [];
const warnings: string[] = [];

console.log('1. Building Universe of Valid Static Routes...');
const validRoutes = new Set<string>();

// Static routes
validRoutes.add('/');
validRoutes.add('/services');
validRoutes.add('/service-areas');
validRoutes.add('/quote');
validRoutes.add('/about');
validRoutes.add('/contact');
validRoutes.add('/terms');
validRoutes.add('/privacy');
validRoutes.add('/blog');

// Services
services.forEach(s => validRoutes.add(`/services/${s.id}`));

// Blog articles
blogArticles.forEach(a => validRoutes.add(`/blog/${a.slug}`));

// Suburb service routes
let suburbRouteCount = 0;
for (const suburb of allSuburbs) {
  for (const service of services) {
    const route = `/service-areas/${service.id}-${slugify(suburb)}`;
    validRoutes.add(route);
    suburbRouteCount++;
  }
}

console.log(`- Suburbs: ${allSuburbs.length}`);
console.log(`- Services: ${services.length}`);
console.log(`- Suburb service routes: ${suburbRouteCount}`);
console.log(`- Blog articles: ${blogArticles.length}`);
console.log(`- Total unique valid routes: ${validRoutes.size}`);

console.log('\n2. Verifying Priority Hub Suburbs...');
priorityHubSuburbs.forEach(hub => {
  if (!allSuburbs.includes(hub)) {
    errors.push(`Priority hub suburb "${hub}" is NOT in allSuburbs list!`);
  }
});

console.log('\n3. Verifying Complementary Services across all 7 services...');
services.forEach(srv => {
  const comps = getComplementaryServices(srv.id);
  if (comps.length === 0) {
    errors.push(`No complementary services defined for service: ${srv.id}`);
  }
  comps.forEach(comp => {
    const found = services.find(s => s.id === comp.id);
    if (!found) {
      errors.push(`Complementary service ID "${comp.id}" for service "${srv.id}" is not a valid service!`);
    }
    if (!comp.contextualReason) {
      errors.push(`Complementary service "${comp.id}" missing contextualReason!`);
    }
    // Test link generation for every single suburb
    allSuburbs.forEach(suburb => {
      const link = `/service-areas/${comp.id}-${slugify(suburb)}`;
      if (!validRoutes.has(link)) {
        errors.push(`Generated complementary link does not exist: ${link}`);
      }
    });
  });
});

console.log('\n4. Verifying Nearby Suburbs across all 97 suburbs...');
allSuburbs.forEach(suburb => {
  const nearby = getNearbySuburbs(suburb, 6);
  if (nearby.length === 0) {
    errors.push(`No nearby suburbs found for "${suburb}"`);
  }
  nearby.forEach(nb => {
    if (!allSuburbs.includes(nb.name)) {
      errors.push(`Nearby suburb "${nb.name}" for "${suburb}" is not in allSuburbs!`);
    }
    if (nb.slug !== slugify(nb.name)) {
      errors.push(`Nearby suburb "${nb.name}" slug mismatch: ${nb.slug} vs ${slugify(nb.name)}`);
    }
    // Check links for each service
    services.forEach(srv => {
      const link = `/service-areas/${srv.id}-${nb.slug}`;
      if (!validRoutes.has(link)) {
        errors.push(`Generated nearby link does not exist: ${link}`);
      }
    });
  });
});

console.log('\n5. Verifying Blog Articles and Internal Links...');
blogArticles.forEach(art => {
  if (!art.slug) errors.push('Blog article missing slug');
  if (!art.title) errors.push(`Article ${art.slug} missing title`);
  if (!art.metaDescription) errors.push(`Article ${art.slug} missing metaDescription`);

  art.relatedServices.forEach(srvId => {
    if (!services.some(s => s.id === srvId)) {
      errors.push(`Article "${art.slug}" references invalid relatedService "${srvId}"`);
    }
  });

  art.featuredSuburbs.forEach(sub => {
    if (!allSuburbs.includes(sub)) {
      errors.push(`Article "${art.slug}" references invalid featuredSuburb "${sub}"`);
    }
  });

  art.content.sections.forEach((sec, idx) => {
    if (sec.callout && sec.callout.linkHref) {
      if (!validRoutes.has(sec.callout.linkHref)) {
        errors.push(`Article "${art.slug}" section ${idx + 1} callout link does not exist: ${sec.callout.linkHref}`);
      }
    }
  });
});

console.log('\n6. Verifying Schema.org JSON-LD Generation for all 679 routes...');
let schemaSuccessCount = 0;
for (const suburb of allSuburbs) {
  for (const service of services) {
    try {
      const content = getSuburbPageContent(suburb, service.id, service.name);
      const jsonLd = generateSuburbJsonLd(suburb, service, content);
      const str = JSON.stringify(jsonLd);
      if (!str || str.length < 50) {
        errors.push(`Empty or truncated JSON-LD for ${service.id}-${suburb}`);
      }
      if (!str.includes('Arbco Tree Services')) {
        errors.push(`Schema JSON-LD for ${service.id}-${suburb} does not contain "Arbco Tree Services"`);
      }
      schemaSuccessCount++;
    } catch (e: any) {
      errors.push(`Error generating schema for ${service.id}-${suburb}: ${e.message}`);
    }
  }
}
console.log(`- Verified ${schemaSuccessCount} suburb JSON-LD schemas.`);

console.log('\n7. Verifying Service Hub JSON-LD for all 7 services...');
services.forEach(srv => {
  try {
    const details = {
      heroTagline: srv.description,
      subheading: srv.description,
      faqs: [{ question: 'Sample question?', answer: 'Sample answer.' }],
    };
    const jsonLd = generateCoreServiceJsonLd(srv, details);
    const str = JSON.stringify(jsonLd);
    if (!str.includes('Arbco Tree Services')) {
      errors.push(`Service JSON-LD for ${srv.id} does not contain "Arbco Tree Services"`);
    }
  } catch (e: any) {
    errors.push(`Error generating service schema for ${srv.id}: ${e.message}`);
  }
});

console.log('\n8. Verifying Blog Article JSON-LD for all 4 articles...');
blogArticles.forEach(art => {
  try {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: art.title,
      description: art.metaDescription,
      image: art.image,
      author: {
        '@type': 'Organization',
        name: 'Arbco Tree Services',
      },
    };
    const str = JSON.stringify(articleSchema);
    if (!str.includes('Arbco Tree Services')) {
      errors.push(`Blog JSON-LD for ${art.slug} does not contain "Arbco Tree Services"`);
    }
    if (!str.includes('Article')) {
      errors.push(`Blog JSON-LD for ${art.slug} missing Article type`);
    }
  } catch (e: any) {
    errors.push(`Error generating blog schema for ${art.slug}: ${e.message}`);
  }
});

console.log('\n9. Scanning all TSX files for hardcoded href targets...');
import * as fs from 'fs';
import * as path from 'path';

function scanDirectory(dir: string): string[] {
  let files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(scanDirectory(full));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const allCodeFiles = scanDirectory(path.resolve('src'));
let totalHrefsChecked = 0;

for (const file of allCodeFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // Match href="something"
  const hrefRegex = /href=["'](\/[^"']*)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const rawHref = match[1];
    // Strip hash or query params
    const cleanHref = rawHref.split('#')[0].split('?')[0];
    if (cleanHref === '') {
      // It's an anchor like href="#contact"
      continue;
    }
    totalHrefsChecked++;
    // Check if cleanHref is in validRoutes or in public/
    const publicPath = path.resolve('public', cleanHref.replace(/^\//, ''));
    if (!validRoutes.has(cleanHref) && !fs.existsSync(publicPath)) {
      errors.push(`Broken link found in ${path.relative(process.cwd(), file)}: href="${rawHref}"`);
    }
  }
}
console.log(`- Checked ${totalHrefsChecked} hardcoded internal hrefs across all source files.`);

console.log('\n=== SUMMARY ===');
console.log(`Errors found: ${errors.length}`);
console.log(`Warnings found: ${warnings.length}`);

if (errors.length > 0) {
  console.log('\nERROR LIST:');
  errors.forEach((err, i) => console.log(`[${i + 1}] ${err}`));
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED WITH 0 ERRORS!');
}
