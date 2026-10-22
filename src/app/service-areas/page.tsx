import React from 'react';
import ServiceAreasClient from '@/components/ServiceAreasClient';
import { generateServiceAreasIndexJsonLd } from '@/lib/schemaStructuredData';
import { SITE_CANONICAL_DOMAIN } from '@/lib/seoMetadata';

export const metadata = {
  title: 'Townsville Service Areas | Arbco Tree Services',
  description:
    'Explore all 97 Greater Townsville suburbs serviced by Arbco Tree Services. Local Level 5 arborists providing tree removal, stump grinding, and palm cleaning.',
  alternates: {
    canonical: `${SITE_CANONICAL_DOMAIN}/service-areas`,
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceAreasIndexJsonLd()) }}
      />
      <ServiceAreasClient />
    </>
  );
}
