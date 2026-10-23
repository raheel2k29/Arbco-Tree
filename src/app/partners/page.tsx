import React from 'react';
import Link from 'next/link';
import { SITE_CANONICAL_DOMAIN } from '@/lib/seoMetadata';
import { SITE_URL, BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/schemaStructuredData';

export const metadata = {
  title: 'Our Partners & Affiliations | Arbco Tree Services',
  description:
    'Explore Arbco Tree Services\' trusted industry partners, insurance networks, civil contractors, and commercial affiliations in Townsville.',
  alternates: {
    canonical: `${SITE_CANONICAL_DOMAIN}/partners`,
  },
};

export default function PartnersPage() {
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
        name: 'Partners',
        item: `${SITE_URL}/partners`,
      },
    ],
  };

  const partnersJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['CollectionPage', 'Organization'],
    '@id': `${SITE_URL}/partners#page`,
    name: `${BUSINESS_NAME} - Partners & Affiliations`,
    url: `${SITE_URL}/partners`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    description:
      'Arbco Tree Services works alongside national insurance networks, civil contractors, commercial asset managers, and leading equipment manufacturers across Greater Townsville.',
  };

  const partnerCategories = [
    {
      category: 'Emergency Insurance & Disaster Recovery',
      badge: 'Rapid Response Networks',
      desc: 'We are trusted by major Australian insurance providers to perform urgent make-safe arboricultural interventions, storm-felled timber removal, and comprehensive photographic hazard reporting.',
      partners: [
        { name: 'RACQ Insurance Network', role: 'Emergency Make-Safe Tree Dispatch' },
        { name: 'Suncorp Group', role: 'Storm Damage Assessment & Clearance' },
        { name: 'Allianz Australia', role: 'Structural Hazard Mitigation' },
        { name: 'IAG Disaster Recovery', role: 'Cyclone Impact Rapid Mobilisation' },
      ],
    },
    {
      category: 'Civil & Commercial Property Partners',
      badge: 'Infrastructure & Strata',
      desc: 'Partnering with commercial developers, body corporate management firms, and civil earthworks teams across North Queensland to maintain compliant green assets.',
      partners: [
        { name: 'Townsville Civil Contractors', role: 'Subdivision & Roadway Tree Clearing' },
        { name: 'Regional Body Corporate Networks', role: 'Strata Canopy & Palm Maintenance' },
        { name: 'Commercial Property Managers', role: 'Annual Hazard Audits & Setbacks' },
        { name: 'Industrial Estate Facilities', role: 'Acreage Firebreaks & Boundary Buffers' },
      ],
    },
    {
      category: 'Professional Arboricultural Associations',
      badge: 'Industry Accreditations',
      desc: 'Committed to upholding the highest safety and ecological standards in Australian arboriculture through active industry participation.',
      partners: [
        { name: 'Queensland Arboricultural Association (QAA)', role: 'Professional Member Body' },
        { name: 'Arboriculture Australia (AA)', role: 'Certified Tree Care Best Practices' },
        { name: 'Master Builders Queensland', role: 'Trade Contractor Compliance' },
        { name: 'Workplace Health & Safety QLD', role: 'Zero-Harm Work Safety Protocol' },
      ],
    },
    {
      category: 'Specialist Machinery & Equipment Suppliers',
      badge: 'Heavy Fleet Technology',
      desc: 'Our operations are powered by world-class machinery engineered specifically for high-capacity tropical tree management and tight-access residential dismantling.',
      partners: [
        { name: 'Vermeer Australia', role: 'Commercial Brush Chippers & Heavy Grinders' },
        { name: 'Bandit Industries', role: 'High-Volume Biomass Chipping Systems' },
        { name: 'CMC Aerial Lifts', role: 'Narrow-Chassis Tracked Spider Platforms' },
        { name: 'Stihl & Husqvarna Professional', role: 'Low-Emission Precision Rigging Chainsaws' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersJsonLd) }}
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
            <span className="text-[#7cc043] font-bold">Partners</span>
          </div>

          <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading">
            INDUSTRY COLLABORATION & TRUST
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
            Our Partners & Affiliations
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Collaborating with leading insurers, civil contractors, industry regulatory bodies, and heavy machinery partners to set the benchmark for tree care in Townsville. Backed by Level 5 qualified arborists and $20M public liability protection.
          </p>
        </div>
      </section>

      {/* Partner Pillars Grid */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 lg:px-8 space-y-16">
        {partnerCategories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#036829] bg-emerald-50 px-3 py-1 rounded-full font-heading">
                  {cat.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
                  {cat.category}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                {cat.desc}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {cat.partners.map((partner, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-[#7cc043] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-lg bg-[#036829]/10 text-[#036829] flex items-center justify-center text-sm font-bold mb-3 font-heading">
                      ✓
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm font-heading">{partner.name}</h3>
                    <p className="text-xs text-slate-500 leading-snug">{partner.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Commercial SLA & Partnership Invitation */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-[#051c0e] to-[#036829] rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7cc043] font-heading">
                Commercial Partnerships
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
                Partner with Arbco Tree Services
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
                Are you a local civil engineering firm, body corporate manager, or insurer seeking a certified, dependable tree service partner in North Queensland? Led by Level 5 qualified arborists, we offer dedicated Service Level Agreements (SLAs), priority storm response mobilization, and comprehensive compliance documentation.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-200 pt-2 font-medium">
                <li className="flex items-center gap-2"><span>✦</span> AQF Level 5 Certified Arborists</li>
                <li className="flex items-center gap-2"><span>✦</span> $20M Public Liability Insurance</li>
                <li className="flex items-center gap-2"><span>✦</span> Rapid 2-Hour Emergency Mobilization</li>
                <li className="flex items-center gap-2"><span>✦</span> Comprehensive SWMS & Safety Plans</li>
              </ul>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <Link
                href="/quote"
                className="bg-[#7cc043] hover:bg-[#6eb235] text-[#051c0e] font-extrabold px-8 py-4 rounded-xl shadow-md text-center text-sm font-heading transition-colors"
              >
                Inquire About Partnerships →
              </Link>
              <a
                href="tel:0456579811"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold px-8 py-4 rounded-xl text-center text-sm font-heading backdrop-blur-sm transition-colors"
              >
                Call 0456 579 811
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-linking Section */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Explore Related Resources</div>
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs font-bold text-[#036829] font-heading">
            <Link href="/about" className="hover:underline">About Arbco Tree Services →</Link>
            <span className="text-slate-300">•</span>
            <Link href="/other-local-directories" className="hover:underline">Other Local Directories & Trade Resources →</Link>
            <span className="text-slate-300">•</span>
            <Link href="/service-areas" className="hover:underline">All 97 Service Areas →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
