"use client";
import React, { useEffect, useState, useMemo } from "react";
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

export default function ServiceAreasClient() {
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
            Tree Services Across Greater Townsville
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
            Arbco provides comprehensive, professional tree care across all 97 Greater Townsville suburbs. Select a service below to discover tailored local capabilities, access equipment, and fast quote dispatch.
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-8 inline-flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-xs sm:text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7cc043] animate-pulse" />
              97 Suburbs Serviced
            </span>
            <span className="text-white/20">|</span>
            <span>$20M Insurance</span>
            <span className="text-white/20">|</span>
            <span>Level 5 Certified Arborists</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 -mt-10 relative z-20">
        {/* Service Switcher Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-200/80 mb-8">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            Select Active Service:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {services.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all text-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-[#036829] text-white shadow-md scale-[1.02]"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  <span className={isSelected ? "text-[#7cc043]" : "text-[#036829]"}>
                    {serviceIcons[service.id]}
                  </span>
                  <span className="leading-tight">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Active Service Filter Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-12 h-12 rounded-xl bg-[#036829]/10 text-[#036829] flex items-center justify-center shrink-0">
              {serviceIcons[activeService.id]}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Currently Viewing Suburb Landing Pages For:
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                {activeService.name}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suburb (e.g. Kirwan, Castle Hill)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pl-10 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#036829] focus:bg-white transition-all font-sans"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Service Suburb Context Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-[#036829] text-white p-6 rounded-2xl mb-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#7cc043] mb-1">
              Active Service Focus
            </div>
            <div className="text-lg font-bold font-heading">
              {activeService.name} Across All 97 Suburbs
            </div>
            <p className="text-sm text-slate-200 mt-1 max-w-3xl leading-relaxed">
              {activeService.description} Click any suburb below to view tailored local pricing, Townsville City Council planning guidance, access equipment, and fast quote dispatch.
            </p>
          </div>
          <Link
            href={`/services/${activeService.id}`}
            className="shrink-0 bg-white text-[#036829] hover:bg-slate-100 px-5 py-2.5 rounded-xl text-xs font-bold font-heading transition-colors"
          >
            About {activeService.name} Hub →
          </Link>
        </div>

        {/* Suburbs Grid Grouped by Region */}
        {filteredRegions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-4xl block mb-3">🔍</span>
            <div className="text-lg font-bold text-slate-900 font-heading">No Suburbs Found Matching &ldquo;{searchQuery}&rdquo;</div>
            <p className="text-sm text-slate-500 mt-1">Try another search term or clear the filter to view all 97 Greater Townsville locations.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 bg-[#036829] text-white rounded-xl text-xs font-bold hover:bg-[#025220] transition-colors"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredRegions.map((region) => (
              <div key={region.name} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#7cc043]" />
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      {region.name}
                    </h2>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {region.suburbs.length} {region.suburbs.length === 1 ? 'Suburb' : 'Suburbs'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {region.suburbs.map((suburb) => {
                    const suburbSlug = slugify(suburb);
                    const routeSlug = `${activeService.id}-${suburbSlug}`;
                    return (
                      <Link
                        key={suburb}
                        href={`/service-areas/${routeSlug}`}
                        className="group bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#7cc043] transition-all flex flex-col justify-between"
                      >
                        <div className="font-bold text-slate-900 text-sm group-hover:text-[#036829] transition-colors leading-tight">
                          {suburb}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-[#7cc043] font-medium pt-2 border-t border-slate-100">
                          <span>{activeService.name}</span>
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Fast Dispatch CTA */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#036829] bg-emerald-50 px-3 py-1 rounded-full">
            <span>Fast North Queensland Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Need Rapid {activeService.name} in Greater Townsville?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
            Whether you need a tree removed in Kirwan, a stump ground in Bushland Beach, or acreage clearing in Alligator Creek, our Level 5 certified arborists are on call with $20M public liability coverage.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-xl bg-[#036829] text-white font-extrabold px-8 py-4 shadow-md hover:bg-[#025220] transition-all font-heading"
            >
              Get a Fast Free Quote →
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
      </div>
    </main>
  );
}
