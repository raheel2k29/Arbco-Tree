import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allSuburbs, services, slugify } from '@/lib/locationData';
import { getSuburbPageContent } from '@/lib/suburbIntelligence';
import { generateSuburbJsonLd } from '@/lib/schemaStructuredData';

// Generate static params for all programmatic routes at build time
export function generateStaticParams() {
  const paths: { slug: string }[] = [];
  
  for (const suburb of allSuburbs) {
    for (const service of services) {
      paths.push({
        slug: `${service.id}-${slugify(suburb)}`
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { suburbName, serviceData } = parseSlug(resolvedParams.slug);
  
  if (!suburbName || !serviceData) {
    return { title: 'Service Not Found' };
  }

  const content = getSuburbPageContent(suburbName, serviceData.id, serviceData.name);
  
  return {
    title: `${serviceData.name} ${suburbName} | Arbco Tree Services Townsville`,
    description: `Professional, fully insured ${serviceData.name.toLowerCase()} in ${suburbName}. Level 5 arborists handling ${content.environmentalProfile.zoneName.toLowerCase()} conditions, tight access, and storm preparation. Call 0456 579 811.`,
  };
}

function parseSlug(slug: string) {
  let matchedService = null;
  let matchedSuburb = null;

  for (const service of services) {
    if (slug.startsWith(service.id + '-')) {
      const suburbSlug = slug.replace(service.id + '-', '');
      const found = allSuburbs.find(s => slugify(s) === suburbSlug);
      
      if (found) {
        matchedService = service;
        matchedSuburb = found;
        break;
      }
    }
  }

  // Backward-compatibility alias for stump-removal-grinding
  if (!matchedService && slug.startsWith('stump-removal-grinding-')) {
    const suburbSlug = slug.replace('stump-removal-grinding-', '');
    const found = allSuburbs.find(s => slugify(s) === suburbSlug);
    if (found) {
      matchedService = services.find(s => s.id === 'stump-grinding') || null;
      matchedSuburb = found;
    }
  }

  // Backward-compatibility alias for bluewater-park -> Bluewater
  if (!matchedSuburb && slug.endsWith('-bluewater-park')) {
    for (const service of services) {
      if (slug.startsWith(service.id + '-')) {
        matchedService = service;
        matchedSuburb = 'Bluewater';
        break;
      }
    }
  }

  return { suburbName: matchedSuburb, serviceData: matchedService };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { suburbName, serviceData } = parseSlug(resolvedParams.slug);

  if (!suburbName || !serviceData) {
    notFound();
  }

  const content = getSuburbPageContent(suburbName, serviceData.id, serviceData.name);
  const jsonLdSchemas = generateSuburbJsonLd(suburbName, serviceData, content);

  // Get other services for this suburb for cross-linking
  const otherServices = services.filter(s => s.id !== serviceData.id);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Schema.org Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
      />

      {/* Dynamic Hero Section */}
      <div className="relative pt-32 pb-24 px-4 overflow-hidden bg-[#051c0e] text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url('${serviceData.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051c0e] via-[#051c0e]/80 to-transparent" />
        
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7cc043]/20 border border-[#7cc043]/30 text-[#7cc043] text-xs font-bold tracking-widest uppercase mb-6">
            <span>🌿</span> {content.environmentalProfile.zoneName}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading mb-6">
            {serviceData.name} <span className="text-[#7cc043]">{suburbName}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
            {content.heroDescription}
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <a href="tel:0456579811" className="quote-btn-gradient rounded-xl px-8 py-4 text-sm font-extrabold text-white flex items-center gap-2 transition-transform hover:scale-105 shadow-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 0456 579 811
            </a>
            <Link
              href="/quote"
              className="rounded-xl px-8 py-4 text-sm font-extrabold text-white border border-[#7cc043]/40 hover:bg-[#7cc043]/15 transition-all"
            >
              Request a Free Quote →
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center text-sm text-slate-500 gap-2 font-sans font-medium flex-wrap">
          <Link href="/" className="hover:text-[#036829] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/service-areas" className="hover:text-[#036829] transition-colors">Service Areas</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{serviceData.name} {suburbName}</span>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none font-sans leading-relaxed">
            
            {/* Main Location Heading & Context */}
            <h2 className="text-3xl font-extrabold text-emerald-950 font-heading mb-6">{content.h2}</h2>
            {content.introParagraphs.map((p, idx) => (
              <p key={`intro-${idx}`} className="text-slate-700 leading-relaxed text-base lg:text-lg mb-4">
                {p}
              </p>
            ))}

            {/* Environmental Profile Infographic Box */}
            <div className="not-prose my-8 p-6 lg:p-8 bg-[#f4fbf6] rounded-2xl border border-[#7cc043]/30 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌱</span>
                <h3 className="text-xl font-extrabold text-emerald-950 font-heading">
                  {suburbName} {serviceData.name} & Environmental Snapshot
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-xs">
                  <span className="font-bold text-emerald-900 block mb-1">🌍 District Zone</span>
                  <span className="text-slate-600">{content.environmentalProfile.zoneName}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-xs">
                  <span className="font-bold text-emerald-900 block mb-1">🪨 Soil Profile</span>
                  <span className="text-slate-600">{content.environmentalProfile.soilType}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-xs">
                  <span className="font-bold text-emerald-900 block mb-1">💨 Wind & Storm Dynamics</span>
                  <span className="text-slate-600">{content.environmentalProfile.windExposure}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-xs">
                  <span className="font-bold text-emerald-900 block mb-1">🚪 Typical Access Realities</span>
                  <span className="text-slate-600">{content.environmentalProfile.accessConstraint}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-xs md:col-span-2">
                  <span className="font-bold text-emerald-900 block mb-1">
                    {serviceData.id === 'palm-tree-removal' ? '🌴 Dominant Local Palms & Species' : '🌳 Dominant Local Tree Canopy'}
                  </span>
                  <span className="text-slate-600">
                    {serviceData.id === 'palm-tree-removal' 
                      ? content.environmentalProfile.dominantPalms.join(', ')
                      : content.environmentalProfile.dominantCanopy.join(', ')}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-xs md:col-span-2">
                  <span className="font-bold text-emerald-900 block mb-1">📜 Relevant Planning Overlay</span>
                  <span className="text-slate-600">{content.environmentalProfile.councilOverlay}</span>
                </div>
              </div>
            </div>

            {/* Content Image 1 */}
            <div className="my-8 rounded-2xl overflow-hidden shadow-md">
              <img src={serviceData.contentImage1} alt={`${serviceData.name} in ${suburbName}`} className="w-full h-auto object-cover max-h-[400px]" />
            </div>

            {/* Service-Specific Focus */}
            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-10 mb-4">{content.serviceFocusHeading}</h3>
            {content.serviceFocusParagraphs.map((p, idx) => (
              <p key={`service-focus-${idx}`} className="text-slate-700 leading-relaxed text-base lg:text-lg mb-4">
                {p}
              </p>
            ))}

            {/* Property and Access Realities */}
            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-10 mb-4">{content.propertyAndAccessHeading}</h3>
            {content.propertyAndAccessParagraphs.map((p, idx) => (
              <p key={`access-${idx}`} className="text-slate-700 leading-relaxed text-base lg:text-lg mb-4">
                {p}
              </p>
            ))}

            {/* Content Image 2 */}
            <div className="my-8 rounded-2xl overflow-hidden shadow-md">
              <img src={serviceData.contentImage2} alt={`Professional Arborists in ${suburbName}`} className="w-full h-auto object-cover max-h-[400px]" />
            </div>

            {/* Council & Safety Standards */}
            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-10 mb-4">{content.councilAndSafetyHeading}</h3>
            {content.councilAndSafetyParagraphs.map((p, idx) => (
              <p key={`council-${idx}`} className="text-slate-700 leading-relaxed text-base lg:text-lg mb-4">
                {p}
              </p>
            ))}

            {/* Tailored Why Choose Us */}
            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-12 mb-6">
              {content.whyChooseHeading}
            </h3>
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {content.whyChoosePoints.map((pt, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#7cc043]/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#036829] font-heading font-extrabold text-base mb-2">
                      <span className="flex h-6 w-6 rounded-full bg-emerald-100 text-[#036829] text-xs items-center justify-center shrink-0">✔</span>
                      {pt.title}
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tailored Service Process */}
            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-12 mb-6">
              {content.processHeading}
            </h3>
            <div className="not-prose space-y-4 my-6">
              {content.processSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="flex h-8 w-8 rounded-xl bg-[#036829] text-white font-extrabold font-heading text-sm items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base font-heading mb-1">{step.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Localized Frequently Asked Questions */}
            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-12 mb-6">
              {content.faqHeading}
            </h3>
            <div className="not-prose space-y-4 mt-6">
              {content.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-extrabold text-base lg:text-lg text-emerald-950 font-heading mb-2 flex items-start gap-2">
                    <span className="text-[#7cc043] font-black">Q.</span>
                    {faq.question}
                  </h4>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed pl-5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Suburb Assessment CTA Card */}
            <div className="not-prose mt-12 p-8 bg-[#f4fbf6] rounded-3xl border border-[#7cc043]/30 text-center relative overflow-hidden shadow-sm">
              <span className="text-4xl block mb-2">🌿</span>
              <h4 className="text-2xl lg:text-3xl font-extrabold text-emerald-950 mb-3 font-heading">
                {content.ctaHeadline}
              </h4>
              <p className="text-base lg:text-lg text-emerald-800 mb-6 max-w-2xl mx-auto leading-relaxed">
                {content.ctaText}
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a href="tel:0456579811" className="inline-flex items-center justify-center rounded-xl bg-[#036829] text-white font-extrabold px-8 py-4 shadow-md hover:bg-[#024a1d] transition-colors font-heading text-sm">
                  Call Us Now: 0456 579 811
                </a>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-[#036829] border border-[#036829]/20 font-extrabold px-8 py-4 shadow-sm hover:bg-slate-50 transition-colors font-heading text-sm"
                >
                  Request a Free On-Site Quote →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 self-start">
          {/* Service Links for this Suburb */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-extrabold text-emerald-950 font-heading mb-6 border-b border-slate-100 pb-4">Other Services in {suburbName}</h3>
            <div className="space-y-4">
              {otherServices.map(service => (
                <Link 
                  key={service.id}
                  href={`/service-areas/${service.id}-${slugify(suburbName)}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#7cc043] hover:bg-[#f4fbf6] transition-all group"
                >
                  <span className="font-semibold text-slate-700 group-hover:text-[#036829] font-sans">{service.name}</span>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[#7cc043] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-[#0b1f10] rounded-3xl p-8 relative overflow-hidden text-white shadow-lg">
            <div className="absolute -right-10 -bottom-10 opacity-10 w-48 h-48 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 3.8l6.2 12.2H5.8L12 5.8z"/>
              </svg>
            </div>
            <h3 className="text-xl font-extrabold font-heading mb-3 relative z-10">{content.sidebarHeading}</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed">
              {content.sidebarPitch}
            </p>
            <a href="tel:0456579811" className="w-full inline-flex items-center justify-center rounded-xl bg-white text-[#036829] font-extrabold px-6 py-4 shadow-md transition-all font-heading hover:bg-slate-50 relative z-10">
              Call 0456 579 811
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
