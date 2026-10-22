import type { Metadata } from 'next';
import { SITE_CANONICAL_DOMAIN } from '@/lib/seoMetadata';

export const metadata: Metadata = {
  title: 'Request a Free Quote | Arbco Tree Services Townsville',
  description:
    'Get an upfront, fixed-price quote for tree removal, stump grinding, palm pruning, or emergency arborist work in Townsville. Fully insured ($20M) with prompt response.',
  alternates: {
    canonical: `${SITE_CANONICAL_DOMAIN}/quote`,
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
