import React from 'react';
import Link from 'next/link';
import { SITE_CANONICAL_DOMAIN } from '@/lib/seoMetadata';
import { SITE_URL, BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/schemaStructuredData';

export const metadata = {
  title: 'Local Directories & Trade Resources | Arbco',
  description:
    'Directory of trusted Townsville trade partners, regional emergency resources, and Queensland arboricultural business listings.',
  alternates: {
    canonical: `${SITE_CANONICAL_DOMAIN}/other-local-directories`,
  },
};

export default function OtherLocalDirectoriesPage() {
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
        name: 'Other Local Directories',
        item: `${SITE_URL}/other-local-directories`,
      },
    ],
  };

  const directoriesJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['CollectionPage', 'Organization'],
    '@id': `${SITE_URL}/other-local-directories#page`,
    name: `${BUSINESS_NAME} - Local Directories & Resources`,
    url: `${SITE_URL}/other-local-directories`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    description:
      'Curated directory of Townsville trade partners, regional emergency resources, and Queensland arboricultural business listings.',
  };

  const directoryCategories = [
    {
      title: 'Townsville & Regional Queensland Trade Directories',
      badge: 'Verified Trade Listings',
      desc: 'Browse trusted Australian business directories where Arbco Tree Services is featured with verified Level 5 arborist credentials, insurance details, and customer reviews.',
      items: [
        {
          name: 'True Local Townsville',
          category: 'Local Arborists & Tree Services',
          desc: 'Verified listing of certified arborists serving the Townsville region with customer ratings and service breakdowns.',
        },
        {
          name: 'Localsearch Townsville',
          category: 'North Queensland Trade Directory',
          desc: 'Comprehensive regional directory for Townsville tree lopping, stump grinding, and palm maintenance providers.',
        },
        {
          name: 'Yellow Pages Australia (Townsville)',
          category: 'Commercial & Domestic Tree Works',
          desc: 'Official directory for licensed tree contractors, emergency cyclone response teams, and mulch suppliers in QLD 4810-4818.',
        },
        {
          name: 'HiPages North Queensland',
          category: 'On-Demand Verified Trades',
          desc: 'Australian trade marketplace connecting Townsville property owners with insured and certified arborist professionals.',
        },
        {
          name: 'Oneflare Townsville',
          category: 'Specialist Tree Care Quotes',
          desc: 'Transparent pricing portal for residential tree removal, confined-space crane dismantling, and block clearing.',
        },
        {
          name: 'Word of Mouth Online (WOMO)',
          category: 'Independent Customer Reviews',
          desc: 'Authentic customer feedback and reputation profiles for local trades and emergency services across Greater Townsville.',
        },
      ],
    },
    {
      title: 'Local Council, Safety & Disaster Planning Resources',
      badge: 'Civic & Emergency Authority',
      desc: 'Essential municipal and state resources for Townsville residents navigating tree protection bylaws, cyclone preparation, and powerline clearances.',
      items: [
        {
          name: 'Townsville City Council (TCC) Planning Overlays',
          category: 'Local Government Bylaws',
          desc: 'Official guidelines on the TCC Natural Assets overlay, protected vegetation mapping, and street tree permit requirements.',
        },
        {
          name: 'Queensland Disaster Management Portal',
          category: 'Severe Weather & Storm Tracking',
          desc: 'Live tropical cyclone advisories, monsoonal flood updates, and storm preparation checklists for North Queensland.',
        },
        {
          name: 'Queensland State Emergency Service (SES)',
          category: 'Emergency Assistance (132 500)',
          desc: 'Community emergency assistance for storm-felled trees threatening residential dwellings and access roads.',
        },
        {
          name: 'Ergon Energy Safety & Tree Clearances',
          category: 'Electrical Safety Network',
          desc: 'Mandatory minimum setbacks and safety guidelines for trees growing near overhead powerlines and service mains.',
        },
      ],
    },
    {
      title: 'Complementary Local Trades & Property Specialists',
      badge: 'Recommended Trade Network',
      desc: 'Trusted local specialists providing complementary earthworks, landscaping, and structural protection across North Queensland.',
      items: [
        {
          name: 'Townsville Civil Earthmoving Contractors',
          category: 'Site Prep & Bulk Scrapes',
          desc: 'Excavation and civil earthworks teams collaborating on block clearing and acreage drainage.',
        },
        {
          name: 'North Queensland Turf & Soil Suppliers',
          category: 'Lawn Reinstatement',
          desc: 'Topsoil, turf, and landscape suppliers for lawn restoration following deep stump grinding and tree extraction.',
        },
        {
          name: 'Structural Termite Inspection Specialists',
          category: 'Pest Eradication',
          desc: 'Licensed pest technicians inspecting subterranean termite colonies exposed during stump grinding and root removal.',
        },
        {
          name: 'Fencing & Retaining Wall Contractors',
          category: 'Boundary Reinstatement',
          desc: 'Contractors repairing or building boundary fences following the removal of intrusive fence-line trees and palms.',
        },
      ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directoriesJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-[#051c0e] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        
        <div className="max-w-[1440px] mx-auto relative z-10 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-xs text-slate-400 gap-2 mb-4 font-medium">
            <Link href="/" className="hover:text-[#7cc043] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[#7cc043] transition-colors">About Us</Link>
            <span>/</span>
            <span className="text-[#7cc043] font-bold">Other Local Directories</span>
          </div>

          <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading">
            TOWNSVILLE TRADE DIRECTORY & RESOURCES
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
            Other Local Directories & Resources
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive reference guide connecting Townsville property owners with verified local business directories, emergency council resources, and trusted regional trade partners.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="tel:0456579811"
              className="inline-flex items-center justify-center rounded-xl bg-[#7cc043] text-slate-950 font-extrabold px-6 py-3.5 shadow-lg hover:bg-[#6eb137] transition-colors text-xs font-heading gap-2"
            >
              <svg className="w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Direct Dispatch: 0456 579 811
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-3.5 border border-white/20 transition-colors text-xs font-heading"
            >
              Request Free Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* Directory Categories Section */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 lg:px-8 space-y-16">
        {directoryCategories.map((group, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#036829] bg-emerald-50 px-3 py-1 rounded-full font-heading">
                {group.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
                {group.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
                {group.desc}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-[#7cc043] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#036829] block font-heading">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base font-heading">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Local Citation & Directory Notice */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-3xl block">📋</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Are You a Local Townsville Trade Directory or Directory Publisher?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Arbco Tree Services maintains active, verified listings across all major Australian business registers. If you operate an accredited Townsville directory or regional trade portal and wish to update or exchange verified business information, please reach out to our administration team.
            </p>
            <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
              <a
                href="tel:0456579811"
                className="inline-flex items-center justify-center rounded-xl bg-[#7cc043] text-slate-950 font-extrabold px-6 py-3.5 shadow-md hover:bg-[#6eb137] transition-colors text-xs font-heading gap-1.5"
              >
                Call: 0456 579 811
              </a>
              <a
                href="mailto:info@arbco.com.au"
                className="inline-flex items-center justify-center rounded-xl bg-[#036829] text-white font-extrabold px-6 py-3.5 shadow-md hover:bg-[#025220] transition-colors text-xs font-heading"
              >
                Email: info@arbco.com.au
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-800 font-extrabold px-6 py-3.5 shadow-xs hover:bg-slate-100 transition-colors text-xs font-heading"
              >
                About Our Company →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-linking Section */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Arbco Information Hubs</div>
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs font-bold text-[#036829] font-heading">
            <Link href="/about" className="hover:underline">About Us →</Link>
            <span className="text-slate-300">•</span>
            <Link href="/partners" className="hover:underline">Our Partners & Affiliations →</Link>
            <span className="text-slate-300">•</span>
            <Link href="/service-areas" className="hover:underline">Explore 97 Greater Townsville Suburbs →</Link>
            <span className="text-slate-300">•</span>
            <Link href="/quote" className="hover:underline">Request a Free Quote →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
