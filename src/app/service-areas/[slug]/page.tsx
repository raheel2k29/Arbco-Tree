import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allSuburbs, services, slugify } from '@/lib/locationData';
import { generateSpintaxContent } from '@/lib/spintax';

// Generate static params for all 291 routes at build time
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
  
  return {
    title: `${serviceData.name} ${suburbName} | Professional Arborists`,
    description: `Expert ${serviceData.name.toLowerCase()} in ${suburbName}. Fully insured, qualified arborists providing safe and efficient tree care across the Greater Townsville region.`,
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

  return { suburbName: matchedSuburb, serviceData: matchedService };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { suburbName, serviceData } = parseSlug(resolvedParams.slug);

  if (!suburbName || !serviceData) {
    notFound();
  }

  const spintax = generateSpintaxContent(resolvedParams.slug, serviceData.name, suburbName);

  // Get other services for this suburb for cross-linking
  const otherServices = services.filter(s => s.id !== serviceData.id);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
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
            <span>🌿</span> Townsville Area Service
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading mb-6">
            {serviceData.name} <span className="text-[#7cc043]">{suburbName}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            {serviceData.description} Local, reliable, and fully insured arborist services for residents and businesses in {suburbName}.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="tel:0426204514" className="quote-btn-gradient rounded-xl px-8 py-4 text-sm font-extrabold text-white flex items-center gap-2 transition-transform hover:scale-105 shadow-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 0426 204 514
            </a>
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
          <span className="text-slate-900">{serviceData.name} {suburbName}</span>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none font-sans leading-relaxed">
            
            <h2 className="text-3xl font-extrabold text-emerald-950 font-heading mb-6">{spintax.h2}</h2>
            {spintax.intro}
            
            <div className="my-8 rounded-2xl overflow-hidden shadow-md">
              <img src={serviceData.contentImage1} alt={`${serviceData.name} in ${suburbName}`} className="w-full h-auto object-cover max-h-[400px]" />
            </div>

            {spintax.body}

            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-10 mb-4">Why Choose Us For {suburbName} Properties?</h3>
            <p>
              When you search for <em>{serviceData.name.toLowerCase()} near me</em>, you want a team that doesn't just cut corners. We are committed to industry best practices, environmental sustainability, and uncompromising safety standards.
            </p>
            <ul className="space-y-3 list-none pl-0 my-6">
              <li className="flex gap-3">
                <span className="text-[#7cc043] shrink-0 mt-1">✔</span>
                <span><strong>Fully Insured & Qualified:</strong> We carry $20M Public Liability Insurance for your complete peace of mind.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#7cc043] shrink-0 mt-1">✔</span>
                <span><strong>Local Expertise:</strong> We know Townsville and the specific tree management requirements of {suburbName} council regulations.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#7cc043] shrink-0 mt-1">✔</span>
                <span><strong>Safety First Approach:</strong> Utilizing industry-leading rigging and safety equipment to protect your home and landscaping.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#7cc043] shrink-0 mt-1">✔</span>
                <span><strong>Clean & Tidy:</strong> We don't just complete the {serviceData.name.toLowerCase()} – we leave your property spotless, chipping and removing all debris.</span>
              </li>
            </ul>

            <div className="my-8 rounded-2xl overflow-hidden shadow-md">
              <img src={serviceData.contentImage2} alt={`Professional Arborists in ${suburbName}`} className="w-full h-auto object-cover max-h-[400px]" />
            </div>

            <h2 className="text-3xl font-extrabold text-emerald-950 font-heading mt-12 mb-6">Our {serviceData.name} Process</h2>
            <p>
              We believe in transparent communication and seamless execution. Our process for {serviceData.name.toLowerCase()} in {suburbName} is designed to be completely stress-free for you:
            </p>
            <ol className="list-decimal pl-5 space-y-4 my-6 font-semibold text-slate-800">
              <li><strong className="text-emerald-900">Free Site Assessment:</strong> We visit your {suburbName} property to evaluate the tree's health, structural integrity, and proximity to hazards.</li>
              <li><strong className="text-emerald-900">Transparent Quoting:</strong> You receive a clear, upfront quote with no hidden fees.</li>
              <li><strong className="text-emerald-900">Safe Execution:</strong> Using advanced rigging techniques, our arborists perform the {serviceData.name.toLowerCase()} safely, section by section if necessary.</li>
              <li><strong className="text-emerald-900">Comprehensive Clean-up:</strong> All branches, timber, and debris are removed or mulched, leaving your yard immaculate.</li>
            </ol>

            <h3 className="text-2xl font-extrabold text-emerald-950 font-heading mt-10 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="font-bold text-lg text-emerald-900">Do I need council approval for {serviceData.name.toLowerCase()} in {suburbName}?</h4>
                <p className="text-slate-600 mt-2">Regulations vary depending on the tree species, size, and your exact location within {suburbName}. Our team is highly experienced with local council bylaws and can advise you on whether a permit is required during our initial assessment.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-emerald-900">How much does it cost?</h4>
                <p className="text-slate-600 mt-2">The cost of {serviceData.name.toLowerCase()} depends on the tree's size, location, and accessibility. We offer free, on-site quotes to provide you with an accurate and highly competitive price.</p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-[#f4fbf6] rounded-2xl border border-[#7cc043]/20 text-center">
              <h4 className="text-2xl font-extrabold text-emerald-950 mb-4 font-heading">Ready for your free assessment in {suburbName}?</h4>
              <p className="text-lg text-emerald-800 mb-6">Contact our friendly team today. We can usually provide a free, no-obligation quote on the very same day for {suburbName} residents.</p>
              <a href="tel:0426204514" className="inline-flex items-center justify-center rounded-xl bg-[#036829] text-white font-extrabold px-8 py-4 shadow-md hover:bg-[#024a1d] transition-colors font-heading">
                Call Us Now: 0426 204 514
              </a>
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
            <h3 className="text-xl font-extrabold font-heading mb-3 relative z-10">Need an Arborist Fast?</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">We have crews operating near {suburbName} right now. Call us for rapid response.</p>
            <a href="tel:0426204514" className="w-full inline-flex items-center justify-center rounded-xl bg-white text-[#036829] font-extrabold px-6 py-4 shadow-md transition-all font-heading hover:bg-slate-50 relative z-10">
              Call 0426 204 514
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
