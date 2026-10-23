import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CANONICAL_DOMAIN } from '@/lib/seoMetadata';
import { SITE_URL, BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/schemaStructuredData';

export const metadata = {
  title: 'About Us | Arbco Tree Services Townsville',
  description:
    'Meet Arbco Tree Services: Level 5 certified arborists with 15+ yrs experience and $20M insurance protecting Townsville homes and trees.',
  alternates: {
    canonical: `${SITE_CANONICAL_DOMAIN}/about`,
  },
};

export default function AboutPage() {
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
        name: 'About Us',
        item: `${SITE_URL}/about`,
      },
    ],
  };

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['AboutPage', 'TreeService', 'LocalBusiness'],
    '@id': `${SITE_URL}/about#page`,
    name: `${BUSINESS_NAME} - About Us`,
    url: `${SITE_URL}/about`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: '$$',
    image: `${SITE_URL}/Tree Removal.png`,
    description:
      'Professional Level 5 certified arborists providing precision tree removal, stump grinding, palm maintenance, and 24/7 cyclone emergency storm dispatch across all 97 Greater Townsville suburbs.',
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
    areaServed: {
      '@type': 'City',
      name: 'Townsville',
    },
  };

  const stats = [
    { value: '15+', label: 'Years Serving Townsville', sub: 'Tropical arboriculture specialists' },
    { value: '$20M', label: 'Public Liability Cover', sub: 'Full peace of mind for every job' },
    { value: 'Level 5', label: 'Certified Arborists', sub: 'AQF qualified consulting & climbers' },
    { value: '97', label: 'Greater Townsville Suburbs', sub: 'Fast daily regional dispatch' },
  ];

  const standards = [
    {
      title: 'AS4373-2007 Australian Standards',
      desc: 'All pruning, crown thinning, and hazard reduction strictly adheres to the Australian Standard for Pruning of Amenity Trees (AS4373-2007) to protect tree health and structural stability.',
      icon: '📐',
    },
    {
      title: 'Townsville City Council (TCC) Compliance',
      desc: 'We assist residential and commercial clients with TCC Natural Assets planning overlays, local vegetation laws, and permit guidance before undertaking regulated works.',
      icon: '🏛️',
    },
    {
      title: 'Tropical Weather & Cyclone Preparedness',
      desc: 'We understand North Queensland monsoons. Our pre-cyclone assessments identify root rot, canopy wind drag, and hollow trunks to prevent catastrophic storm damage.',
      icon: '🌀',
    },
    {
      title: 'Zero Property Damage Guarantee',
      desc: 'With advanced high-angle rigging, friction bollards, and crane-assisted sectional dismantles, we safely lower massive limbs within inches of roofs, pools, and fences.',
      icon: '🛡️',
    },
  ];

  const equipmentFleet = [
    {
      name: 'Commercial Wood Chippers',
      specs: '15-inch & 18-inch heavy capacity',
      desc: 'Rapidly reduces tonnes of dense hardwood into rich, weed-free organic mulch on-site for immediate garden reuse or complete haul-away.',
    },
    {
      name: 'Tight-Access Tracked Stump Grinders',
      specs: 'Passes through 800mm gates',
      desc: 'High-torque carbide-tipped cutting wheels grind stumps 300mm+ below turf without tearing lawns, pool pavers, or underground utilities.',
    },
    {
      name: 'Aerial Spider Lifts & Elevated Platforms',
      specs: 'Up to 20m vertical reach',
      desc: 'Compact rubber-tracked chassis accesses narrow side paths and compact master-planned yards with zero lot line boundaries in Burdell and Kirwan.',
    },
    {
      name: '4x4 Tip Trucks & Heavy Haulage',
      specs: 'Heavy all-terrain dispatch',
      desc: 'Equipped to mobilize across rocky Castle Hill slopes, muddy alluvial floodplains in Aitkenvale, and rural acreage in Alligator Creek.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-[#051c0e] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        
        <div className="max-w-[1440px] mx-auto relative z-10 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-xs text-slate-400 gap-2 mb-4 font-medium">
            <Link href="/" className="hover:text-[#7cc043] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7cc043] font-bold">About Us</span>
          </div>

          <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading">
            TOWNSVILLE&apos;S QUALIFIED LEVEL 5 ARBORISTS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
            About Arbco Tree Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Delivering safe, precision tree management, deep root stump grinding, and rapid cyclone response across Greater Townsville with $20M insurance and authentic local arborist experience.
          </p>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#036829] font-heading">{s.value}</div>
                <div className="text-sm font-bold text-slate-900 mt-1 font-heading">{s.label}</div>
                <div className="text-xs text-slate-500 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#036829] bg-emerald-50 px-3 py-1 rounded-full">
              <span>Local Roots, Proven Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
              Dedicated to Protecting Townsville Homes & Urban Canopies
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At <strong>Arbco Tree Services</strong>, we combine genuine botanical understanding with heavy-duty mechanical capability. North Queensland presents unique challenges—extreme wet season downpours, monsoonal wind squalls, subterranean termites, and expansive alluvial clay soils that compromise tree root foundations.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Whether dismantling a storm-damaged poinciana overhang in Mundingburra, clearing hazardous coconut clusters on Magnetic Island, or creating 20-metre bushfire asset protection zones in Alligator Creek, our team approaches every property with meticulous care, strict safety protocols, and a total commitment to customer satisfaction.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold font-heading">
              <Link
                href="/services"
                className="bg-[#036829] hover:bg-[#025220] text-white px-6 py-3.5 rounded-xl shadow-md transition-colors"
              >
                Explore All 7 Services →
              </Link>
              <Link
                href="/partners"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-xl shadow-xs transition-colors"
              >
                Our Partners & Affiliations →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src="/Tree Removal.png"
                alt="Arbco Tree Services Arborists at work in Townsville"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051c0e]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[#7cc043] text-xs font-bold uppercase tracking-wider font-heading">Level 5 Certified</span>
                <div className="text-lg font-extrabold font-heading">Fully Insured Tree Works Across 97 Suburbs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arboricultural Standards Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs font-heading">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Strict Industry Standards on Every Property
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We never compromise on safety, compliance, or tree health. Every member of our team is trained in current arboricultural best practices and environmental conservation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((std, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-4 block">{std.icon}</span>
                  <h3 className="font-extrabold text-slate-900 font-heading text-base mb-2">{std.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{std.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Equipment Fleet */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[#036829] font-black uppercase tracking-wider text-xs font-heading">
            Heavy Machinery & Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Specialized Equipment for Any Terrain
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From steep hillside terraces to narrow 800mm pedestrian side gates, our purpose-built fleet handles jobs of any scale safely and efficiently.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentFleet.map((eq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#036829] uppercase tracking-wider block mb-1 font-heading">{eq.specs}</span>
                <h3 className="text-base font-extrabold text-slate-900 font-heading mb-2">{eq.name}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{eq.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-linking to Directories & Resources */}
      <section className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-[#036829] uppercase tracking-wider font-heading">Community & Trade Network</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">Looking for Verified Local Trade Resources?</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                Explore our curated network of Townsville trade directories, emergency council resources, and commercial partners.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center shrink-0">
              <Link
                href="/partners"
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-heading transition-colors"
              >
                Our Partners
              </Link>
              <Link
                href="/other-local-directories"
                className="px-5 py-3 rounded-xl bg-[#036829] hover:bg-[#025220] text-white text-xs font-bold font-heading transition-colors"
              >
                Other Local Directories →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#023011] text-white text-center px-4 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7cc043] bg-white/10 px-4 py-1.5 rounded-full">
            <span>Fast Quote Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Ready to Speak with a Certified Arborist?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Contact Arbco Tree Services today for an upfront, fixed-price quote or immediate 24/7 storm damage dispatch in Greater Townsville.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-xl bg-[#7cc043] hover:bg-[#6eb235] text-[#051c0e] font-extrabold px-8 py-4 shadow-lg transition-all font-heading text-sm"
            >
              Get a Fast Free Quote →
            </Link>
            <a
              href="tel:0456579811"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-extrabold px-8 py-4 backdrop-blur-sm transition-all font-heading text-sm"
            >
              Call 0456 579 811
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
