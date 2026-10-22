import { slugify, services, allSuburbs } from './locationData';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arbco.com.au';
export const BUSINESS_NAME = 'Arbco Tree Services';
export const BUSINESS_PHONE = '0456 579 811';
export const BUSINESS_PHONE_INTL = '0456 579 811';
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
  features?: { title: string; desc: string; icon: string }[];
  faqs: { question: string; answer: string }[];
}

/**
 * Standard Townsville geo-coordinates and postal address
 */
const TOWNSVILLE_GEO = {
  '@type': 'GeoCoordinates',
  latitude: -19.2589635,
  longitude: 146.8169483,
};

const TOWNSVILLE_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Townsville',
  addressRegion: 'QLD',
  postalCode: '4810',
  addressCountry: 'AU',
};

const STANDARD_OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday'],
    opens: '00:00',
    closes: '23:59',
    description: '24/7 Emergency Storm, Cyclone & Fallen Tree Response',
  },
];

/**
 * Generates Schema.org JSON-LD structured data for suburb service pages.
 * Returns an array containing LocalBusiness/TreeService, Service, FAQPage, and BreadcrumbList schemas.
 * Exactly matches the visible content, breadcrumbs, and qualifications on the page.
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
    '@id': `${pageUrl}#business`,
    name: `${BUSINESS_NAME} - ${title}`,
    alternateName: `${title} by ${BUSINESS_NAME}`,
    url: pageUrl,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    image: `${SITE_URL}${serviceData.localImage || '/Tree Removal.png'}`,
    description: content.heroDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: suburbName,
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
    geo: TOWNSVILLE_GEO,
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
    openingHoursSpecification: STANDARD_OPENING_HOURS,
    parentOrganization: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
    },
  };

  // 2. Service Schema (Dedicated entity for this service offering)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${serviceData.name} in ${suburbName}`,
    serviceType: serviceData.name,
    description: content.heroDescription,
    provider: {
      '@type': 'TreeService',
      name: BUSINESS_NAME,
      url: SITE_URL,
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
      image: `${SITE_URL}/logo.png`,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${suburbName}, QLD`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceData.name} Inclusions & Standards`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fully Insured Work ($20M Public Liability)',
            description: 'Comprehensive public liability coverage with qualified operators insured under WorkCover Queensland.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Level 5 Certified Arborist Supervision',
            description: 'All operations guided by qualified arborists adhering strictly to Australian Standard AS4373-2007.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Townsville City Council (TCC) Planning Compliance',
            description: 'Expert verification of local planning scheme overlays, riparian corridors, and vegetation exemptions.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Complete Site Clean & Free On-Site Quote',
            description: 'On-site wood chipping, thorough rake-out cleanup, and transparent fixed quotes with zero hidden fees.',
          },
        },
      ],
    },
    termsOfService: `${SITE_URL}/terms`,
  };

  // 3. FAQPage Schema
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

  // 4. BreadcrumbList Schema (Exact 5-tier trail matching visible UI)
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
        name: serviceData.name,
        item: `${SITE_URL}/services/${serviceData.id}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Service Areas',
        item: `${SITE_URL}/service-areas`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: suburbName,
        item: pageUrl,
      },
    ],
  };

  return [businessSchema, serviceSchema, faqSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org JSON-LD structured data for the 7 core service pages.
 * Returns an array containing LocalBusiness/TreeService, Service, FAQPage, and BreadcrumbList schemas.
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
    '@id': `${pageUrl}#business`,
    name: `${BUSINESS_NAME} - ${service.name} Townsville`,
    alternateName: `${service.name} Townsville`,
    url: pageUrl,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    image: `${SITE_URL}${service.localImage || '/Tree Removal.png'}`,
    description: details.subheading || service.description,
    address: TOWNSVILLE_ADDRESS,
    geo: TOWNSVILLE_GEO,
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
        name: 'Townsville City Council Jurisdiction',
      },
    ],
    openingHoursSpecification: STANDARD_OPENING_HOURS,
    parentOrganization: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
    },
  };

  // 2. Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${service.name} Townsville`,
    serviceType: service.name,
    description: details.subheading || service.description,
    provider: {
      '@type': 'TreeService',
      name: BUSINESS_NAME,
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
      url: SITE_URL,
      image: `${SITE_URL}/logo.png`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Townsville',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Inclusions & Capabilities`,
      itemListElement: (details.features || []).map((f) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: f.title,
          description: f.desc,
        },
      })),
    },
    termsOfService: `${SITE_URL}/terms`,
  };

  // 3. FAQPage Schema
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

  // 4. BreadcrumbList Schema (3-tier trail matching visible UI)
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

  return [businessSchema, serviceSchema, faqSchema, breadcrumbSchema];
}

/**
 * Generates Schema.org JSON-LD structured data for the Homepage.
 * Returns TreeService/LocalBusiness with 7-service OfferCatalog and WebSite schemas.
 */
export function generateHomepageJsonLd() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TreeService'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    legalName: BUSINESS_NAME,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    image: `${SITE_URL}/Tree Removal.png`,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Specialising in safe tree removal, stump grinding, palm tree maintenance, tree pruning, 24/7 storm emergency response, and commercial land clearing across all 97 Greater Townsville suburbs. Fully insured Level 5 qualified arborists.',
    address: TOWNSVILLE_ADDRESS,
    geo: TOWNSVILLE_GEO,
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
        name: 'Townsville City Council Area',
      },
    ],
    openingHoursSpecification: STANDARD_OPENING_HOURS,
    knowsAbout: [
      'Tree Removal',
      'Stump Grinding',
      'Palm Tree Removal & De-Nutting',
      'AS4373 Australian Standard Tree Pruning',
      '24/7 Emergency Storm Tree Clearance',
      'Commercial Wood Chipping & Mulch Delivery',
      'Acreage Land Clearing & Forestry Mulching',
      'Townsville City Council (TCC) Planning Overlays',
      'Level 5 Arborist Risk Assessments',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Comprehensive Tree & Arborist Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          url: `${SITE_URL}/services/${s.id}`,
        },
      })),
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#business`,
    },
  };

  return [businessSchema, websiteSchema];
}

/**
 * Generates Schema.org JSON-LD structured data for the Services index page.
 */
export function generateServicesIndexJsonLd() {
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
    ],
  };

  const catalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Arbco Tree Services - Professional Tree Services Directory',
    itemListElement: services.map((s, idx) => ({
      '@type': 'Offer',
      position: idx + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        url: `${SITE_URL}/services/${s.id}`,
      },
    })),
  };

  return [breadcrumbSchema, catalogSchema];
}

/**
 * Generates Schema.org JSON-LD structured data for the Service Areas directory page.
 */
export function generateServiceAreasIndexJsonLd() {
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
    ],
  };

  const coverageSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TreeService'],
    '@id': `${SITE_URL}/service-areas#coverage`,
    name: `${BUSINESS_NAME} - Service Areas Directory`,
    url: `${SITE_URL}/service-areas`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    description: `Professional arborist coverage across all ${allSuburbs.length} Greater Townsville suburbs.`,
    areaServed: allSuburbs.map((suburb) => ({
      '@type': 'AdministrativeArea',
      name: `${suburb}, QLD`,
    })),
  };

  return [breadcrumbSchema, coverageSchema];
}

/**
 * Generates Schema.org JSON-LD structured data for the Blog index page.
 */
export function generateBlogIndexJsonLd() {
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
        name: 'Arborist Guides',
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'Townsville Tree Care & Arborist Guides',
    description:
      'Practical advice from qualified North Queensland arborists on cyclone readiness, Townsville City Council vegetation regulations, stump removal, and tropical palm care.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };

  return [breadcrumbSchema, blogSchema];
}
