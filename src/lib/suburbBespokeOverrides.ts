import rawOverrides from '../data/suburbOverrides.json';

export interface SuburbServiceOverride {
  seoTitle?: string;
  metaDescription?: string;
  categoryBadge?: string;
  h1Subtitle?: string;
  heroDescription?: string;
  processHeading?: string;
  processSteps?: { title: string; desc: string }[];
  faqs?: { question: string; answer: string }[];
  challengesSection?: {
    heading: string;
    introParagraphs: string[];
    bulletPoints: string[];
    footerParagraph?: string;
  };
  stormDamagedSection?: {
    heading: string;
    paragraphs: string[];
  };
  additionalSections?: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  quoteCtaSection?: {
    heading: string;
    paragraphs: string[];
  };
}

export const suburbServiceOverrides: Record<string, SuburbServiceOverride> = rawOverrides as unknown as Record<
  string,
  SuburbServiceOverride
>;
