"use client";
import React, { useEffect } from "react";
import Link from "next/link";

import { regions, slugify, services } from "@/lib/locationData";

export default function ServiceAreasPage() {
  useEffect(() => {
    // Intersection Observer for scroll entrance animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-fade-in, .reveal-slide-up, .reveal-zoom-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-[#023011] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-heading mb-6">
            Our Service Areas
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Arbco Tree Solutions is proud to provide professional tree care, removal, and arborist services across the entire Greater Townsville region.
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center text-sm text-slate-500 gap-2 font-sans font-medium">
          <Link href="/" className="hover:text-[#036829] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Service Areas</span>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 space-y-16">
        {regions.map((region, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200/60 reveal-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#036829] font-heading mb-8 flex items-center gap-3">
              <span className="h-8 w-2 bg-[#7cc043] rounded-full inline-block"></span>
              {region.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
              {region.suburbs.sort().map((suburb, sIdx) => (
                  <Link key={sIdx} href={`/service-areas/tree-removal-${slugify(suburb)}`} className="flex items-center gap-2 group cursor-pointer w-full">
                    <svg className="w-4 h-4 text-[#7cc043] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-slate-700 font-medium font-sans text-sm md:text-base group-hover:text-[#036829] transition-colors">
                      {suburb}
                    </span>
                  </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center reveal-zoom-in">
        <h3 className="text-2xl font-bold text-slate-900 font-heading mb-4">Don&apos;t see your suburb?</h3>
        <p className="text-slate-600 mb-8 font-sans">
          We service all of Greater Townsville. Contact us today to check availability in your specific area.
        </p>
        <Link 
          href="/#quote"
          className="quote-btn-gradient inline-flex items-center justify-center rounded-xl text-white font-extrabold px-8 py-4 shadow-md transition-all font-heading hover:opacity-95"
        >
          Request a Free Quote
        </Link>
      </div>
    </main>
  );
}
