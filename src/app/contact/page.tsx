import React from 'react';
import Link from 'next/link';
import { SITE_CANONICAL_DOMAIN } from '@/lib/seoMetadata';
import { SITE_URL, BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/schemaStructuredData';
import ServiceQuoteForm from '@/components/ServiceQuoteForm';

export const metadata = {
  title: 'Contact Us | Arbco Tree Services Townsville',
  description:
    'Contact Arbco Tree Services in Townsville. Call 0456 579 811 for free upfront tree quotes or 24/7 emergency storm damage assistance.',
  alternates: {
    canonical: `${SITE_CANONICAL_DOMAIN}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
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
        name: 'Contact Us',
        item: `${SITE_URL}/contact`,
      },
    ],
  };

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ContactPage', 'LocalBusiness', 'TreeService'],
    '@id': `${SITE_URL}/contact#page`,
    name: `${BUSINESS_NAME} - Contact Details`,
    url: `${SITE_URL}/contact`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    description:
      'Contact our Level 5 certified arborist team in Townsville for upfront free quotes, emergency storm response, or commercial tree maintenance inquiries.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Townsville',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -19.2589635,
      longitude: 146.8169483,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '07:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        description: '24/7 Emergency Storm Service by Callout',
        opens: '00:00',
        closes: '23:59',
      },
    ],
  };

  const contactCards = [
    {
      title: 'Telephone Dispatch',
      value: '0456 579 811',
      sub: 'Mon-Sat 6:30am - 6:00pm | 24/7 Storm Response',
      href: 'tel:0456579811',
      btnText: 'Call 0456 579 811',
      icon: '📞',
    },
    {
      title: 'Email Enquiries',
      value: 'info@arbco.com.au',
      sub: 'Rapid email response within 2 business hours',
      href: 'mailto:info@arbco.com.au',
      btnText: 'Send Email',
      icon: '✉️',
    },
    {
      title: 'Regional Coverage',
      value: 'All 97 Greater Townsville Suburbs',
      sub: 'Townsville City, Thuringowa, Acreage & Magnetic Island',
      href: '/service-areas',
      btnText: 'View Service Areas',
      icon: '📍',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-[#051c0e] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        
        <div className="max-w-[1440px] mx-auto relative z-10 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-xs text-slate-400 gap-2 mb-4 font-medium">
            <Link href="/" className="hover:text-[#7cc043] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7cc043] font-bold">Contact Us</span>
          </div>

          <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading">
            TOWNSVILLE TREE SERVICE DISPATCH
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
            Contact Arbco Tree Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Need an upfront free quote, tree risk assessment, or urgent storm damage clearance? Our team is on call across all 97 Greater Townsville suburbs.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-16 max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-3xl block">{card.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading block">
                  {card.title}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  {card.value}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.sub}
                </p>
              </div>

              <div>
                {card.href.startsWith('http') || card.href.startsWith('/') ? (
                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-center w-full rounded-xl bg-slate-100 hover:bg-[#036829] hover:text-white text-slate-800 text-xs font-bold py-3 transition-colors font-heading"
                  >
                    {card.btnText} →
                  </Link>
                ) : (
                  <a
                    href={card.href}
                    className="inline-flex items-center justify-center w-full rounded-xl bg-[#036829] hover:bg-[#025220] text-white text-xs font-bold py-3 shadow-sm transition-colors font-heading"
                  >
                    {card.btnText} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Contact & Quote Form Section */}
      <section className="py-12 max-w-4xl mx-auto px-4 lg:px-8 pb-24">
        <div className="bg-[#051c0e] rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 text-white">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7cc043] font-heading">
              Online Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Request Your Free Upfront Quote
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Fill in your details below and a qualified arborist will contact you within 2 business hours.
            </p>
          </div>

          <ServiceQuoteForm serviceName="Arborist Work" />
        </div>
      </section>
    </main>
  );
}
