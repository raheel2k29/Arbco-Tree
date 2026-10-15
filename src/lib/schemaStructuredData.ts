import { slugify } from './locationData';

export const SITE_URL = 'https://arbco-tree.vercel.app';
export const BUSINESS_NAME = 'Arbco Tree Solutions';
export const BUSINESS_PHONE = '0456 579 811';
export const BUSINESS_PHONE_INTL = '+61456579811';
export const BUSINESS_EMAIL = 'info@arbco.com.au';

export interface ServiceData {
  id: string;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  localImage?: string;
  heroImage?: string;
}

export interface SuburbContent {
  heroDescription: string;
  faqs: { question: string; answer: string }[];
  environmentalProfile?: {
    zoneName: string;
    soilType: string;
    windExposure: string;
    accessConstraint: string;
  };
}

export interface CoreServiceDetails {
  heroTagline: string;
  subheading: string;
  faqs: { question: string; answer: string }[];
}

/**
 * Generates Schema.org JSON-LD structured data for suburb service pages.
 * Returns an array containing LocalBusiness/TreeService, FAQPage, and BreadcrumbList schemas.
 */
export function generateSuburbJsonLd(
  suburbName: string,
  serviceData: ServiceData,
  content: SuburbContent
) {
  const pageUrl = `${SITE_URL}/service-areas/${serviceData.id}-${slugify(suburbName)}`;
  const title = `${serviceData.name} ${suburbName}`;

  // 1. LocalBusiness / TreeService Schema
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TreeService'],
    '@id': `${pageUrl}#service`,
    name: `${BUSINESS_NAME} - ${title}`,
    alternateName: `${title} by ${BUSINESS_NAME}`,
    url: pageUrl,
    telephone: BUSINESS_PHONE_INTL,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    image: `${SITE_URL}${serviceData.localImage || '/logo.png'}`,
    description: content.heroDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: suburbName,
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -19.2589635,
      longitude: 146.8169483,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: `${suburbName}, QLD`,
      },
      {
        '@type': 'City',
        name: 'Townsville',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      telephone: BUSINESS_PHONE_INTL,
      email: BUSINESS_EMAIL,
    },
  };

  // 2. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${SITE_URL}/service-areas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${serviceData.name} ${suburbName}`,
        item: pageUrl,
      },
    ],
  };

  return [businessSchema, faqSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org JSON-LD structured data for the 7 core service pages.
 * Returns an array containing LocalBusiness/TreeService, FAQPage, and BreadcrumbList schemas.
 */
export function generateCoreServiceJsonLd(
  service: ServiceData,
  details: CoreServiceDetails
) {
  const pageUrl = `${SITE_URL}/services/${service.id}`;

  // 1. LocalBusiness / TreeService Schema
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TreeService'],
    '@id': `${pageUrl}#service`,
    name: `${BUSINESS_NAME} - ${service.name} Townsville`,
    alternateName: `${service.name} Townsville`,
    url: pageUrl,
    telephone: BUSINESS_PHONE_INTL,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    image: `${SITE_URL}${service.localImage || '/logo.png'}`,
    description: details.subheading || service.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Townsville',
      addressRegion: 'QLD',
      postalCode: '4810',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -19.2589635,
      longitude: 146.8169483,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Townsville',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Greater Townsville',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'City of Thuringowa',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      telephone: BUSINESS_PHONE_INTL,
      email: BUSINESS_EMAIL,
    },
  };

  // 2. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: details.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: pageUrl,
      },
    ],
  };

  return [businessSchema, faqSchema, breadcrumbSchema];
}
