"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { regions, services, slugify } from "@/lib/locationData";

const serviceIcons: Record<string, React.ReactNode> = {
  "tree-removal": (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
    </svg>
  ),
  "stump-grinding": (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18M3 12h18" />
    </svg>
  ),
  "palm-tree-removal": (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22V10M12 10C8 8 5 4 5 4s4 0 7 6zm0 0c4-2 7-6 7-6s-4 0-7 6zm0 0c0-4-2-8-2-8s2 1 2 8zm0 0c0-4 2-8 2-8s-2 1-2 8z" />
    </svg>
  ),
  "tree-pruning-lopping": (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L10.5 8.5" />
    </svg>
  ),
  "emergency-tree-removal": (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "wood-chipping-mulching": (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  "land-clearing": (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  )
};

function ServiceAreasContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  
  // Default to query param if valid, else 'tree-removal'
  const [selectedServiceId, setSelectedServiceId] = useState<string>(() => {
    if (serviceParam && services.some(s => s.id === serviceParam)) {
      return serviceParam;
    }
    return 'tree-removal';
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Sync state if URL query param changes
  useEffect(() => {
    if (serviceParam && services.some(s => s.id === serviceParam)) {
      setSelectedServiceId(serviceParam);
    }
  }, [serviceParam]);

  const activeService = useMemo(() => {
    return services.find(s => s.id === selectedServiceId) || services[0];
  }, [selectedServiceId]);

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('service', id);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    // Intersection Observer for scroll entrance animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-fade-in, .reveal-slide-up, .reveal-zoom-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [searchQuery, selectedServiceId]);

  const filteredRegions = useMemo(() => {
    return regions.map(region => ({
      ...region,
      suburbs: region.suburbs.filter(suburb => 
        suburb.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(region => region.suburbs.length > 0);
  }, [searchQuery]);

  const totalMatchingSuburbs = useMemo(() => {
    return filteredRegions.reduce((acc, r) => acc + r.suburbs.length, 0);
  }, [filteredRegions]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-[#023011] text-white pt-20 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7cc043] bg-white/10 px-4 py-1.5 rounded-full mb-4">
            <span>Greater Townsville Arborist Directory</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading mb-6">
            Our Service Areas
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Arbco Tree Services delivers fully insured, professional tree lopping, removal, stump grinding, and palm management across all 97 Greater Townsville suburbs.
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-4 pb-2">
        <div className="flex items-center text-sm text-slate-500 gap-2 font-sans font-medium">
          <Link href="/" className="hover:text-[#036829] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Service Areas</span>
        </div>
      </div>

      {/* Service Selector & Search Section */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-2 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/90 p-5 md:p-8">
          {/* Section Header with Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#036829] bg-[#7cc043]/20 px-3 py-1 rounded-full mb-2">
                <span>Select Arborist Service</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">
                Choose a service to view local suburb details & pricing
              </h2>
            </div>

            {/* Suburb Search Input */}
            <div className="relative w-full lg:w-96 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search your suburb (e.g. Aitkenvale, Kirwan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-10 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50/80 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7cc043] focus:border-[#7cc043] focus:bg-white transition-all font-sans text-sm text-slate-800 shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* 7-Service Selector Pill Bar */}
          <div className="pt-6">
            <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider font-sans">
              Active Service Filter:
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
              {services.map((svc) => {
                const isActive = svc.id === selectedServiceId;
                return (
                  <button
                    key={svc.id}
                    onClick={() => handleSelectService(svc.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl font-heading font-semibold text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-[#036829] text-white shadow-lg shadow-[#036829]/30 ring-2 ring-[#7cc043]' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/90 hover:text-slate-900 border border-slate-200/80'
                    }`}
                  >
                    <span className={isActive ? 'text-[#7cc043]' : 'text-slate-500'}>
                      {serviceIcons[svc.id]}
                    </span>
                    <span>{svc.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#7cc043] animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Active Service Context Banner */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-[#023011] via-[#034018] to-[#044a1d] text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-[#7cc043]/30">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7cc043] bg-white/10 px-3 py-1 rounded-full">
                {activeService.tag}
              </span>
              <span className="text-xs text-slate-300">
                • Showing {totalMatchingSuburbs} Suburbs for {activeService.name}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              {activeService.name} Across Greater Townsville
            </h3>
            <p className="text-sm md:text-base text-slate-200 max-w-3xl font-sans leading-relaxed">
              {activeService.description} Click any suburb below to view tailored local pricing, council compliance, access equipment, and fast quote dispatch.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <a 
              href="tel:0456579811"
              className="inline-flex items-center gap-2 bg-[#7cc043] text-[#023011] font-extrabold px-6 py-3.5 rounded-2xl hover:bg-[#8fd54f] transition-all font-heading shadow-lg shadow-[#7cc043]/20 text-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call 0456 579 811</span>
            </a>
          </div>
        </div>
      </div>

      {/* Regions & Suburbs Grid */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 space-y-12">
        {filteredRegions.length > 0 ? (
          filteredRegions.map((region, idx) => (
            <div 
              key={idx} 
              id={slugify(region.name)} 
              className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-200/70 reveal-slide-up scroll-mt-24" 
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#036829] font-heading flex items-center gap-3">
                  <span className="h-8 w-2 bg-[#7cc043] rounded-full inline-block"></span>
                  {region.name}
                </h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {region.suburbs.length} Suburbs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[...region.suburbs].sort().map((suburb, sIdx) => (
                  <Link 
                    key={sIdx} 
                    href={`/service-areas/${selectedServiceId}-${slugify(suburb)}`}
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 hover:bg-[#036829]/5 border border-slate-200/60 hover:border-[#036829]/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <svg className="w-4 h-4 text-[#7cc043] shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-slate-800 font-semibold font-sans text-sm md:text-base group-hover:text-[#036829] transition-colors truncate">
                        {suburb}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#036829] bg-[#7cc043]/20 px-2.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 hidden sm:inline-block">
                      {activeService.shortName} &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/70 shadow-sm">
            <svg className="mx-auto h-12 w-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-slate-800 font-heading mb-2">No suburbs found</h3>
            <p className="text-slate-500 font-sans">We couldn&apos;t find any suburb matching &ldquo;{searchQuery}&rdquo;.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 inline-flex items-center gap-2 text-[#036829] font-bold hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>

      {/* Multi-Service SEO Directory Index */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold tracking-wider uppercase text-[#036829] bg-[#7cc043]/20 px-3 py-1 rounded-full">
              Full Greater Townsville Directory
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 mt-2">
              Browse All 7 Tree Care Disciplines
            </h3>
            <p className="text-slate-600 font-sans text-sm mt-1">
              Select any core service discipline below to filter our 97 suburb pages or jump directly to our Townsville regional hubs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div 
                key={svc.id} 
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 hover:border-[#036829]/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="p-2.5 rounded-xl bg-[#036829] text-white shrink-0">
                    {serviceIcons[svc.id]}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-base">
                      {svc.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">97 Suburbs Serviced</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 font-sans leading-relaxed">
                  {svc.description}
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                  <button 
                    onClick={() => {
                      handleSelectService(svc.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="text-[#036829] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Filter Suburbs</span>
                    <span>&uarr;</span>
                  </button>
                  <Link 
                    href={`/service-areas/${svc.id}-townsville-city`} 
                    className="text-slate-700 hover:text-[#036829] font-semibold flex items-center gap-1"
                  >
                    <span>View Hub</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center reveal-zoom-in">
        <h3 className="text-2xl font-bold text-slate-900 font-heading mb-4">Don&apos;t see your suburb?</h3>
        <p className="text-slate-600 mb-8 font-sans max-w-xl mx-auto">
          We service all of Greater Townsville, Thuringowa, and the Islands. Contact our certified arborists today for a free on-site assessment.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/quote"
            className="quote-btn-gradient inline-flex items-center justify-center rounded-xl text-white font-extrabold px-8 py-4 shadow-md transition-all font-heading hover:opacity-95"
          >
            Request a Free Quote
          </Link>
          <a
            href="tel:0456579811"
            className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-800 font-extrabold px-8 py-4 shadow-sm hover:bg-slate-50 transition-all font-heading"
          >
            Call 0456 579 811
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-center gap-6 text-xs font-bold text-[#036829] flex-wrap">
          <Link href="/services" className="hover:underline flex items-center gap-1">
            <span>Explore All 7 Core Services</span>
            <span>→</span>
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/blog" className="hover:underline flex items-center gap-1">
            <span>Read Townsville Arborist Guides</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ServiceAreasPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50 py-32 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#036829]" />
        <p className="mt-4 text-slate-500 font-sans text-sm">Loading service areas...</p>
      </main>
    }>
      <ServiceAreasContent />
    </Suspense>
  );
}
