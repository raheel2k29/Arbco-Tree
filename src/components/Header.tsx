"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <>
      {/* Top Banner — Scrolling marquee ticker */}
      <div className="bg-[#0b1f10] w-full overflow-hidden py-2.5">
        <div className="marquee-track">
          {/* Render the items twice for seamless infinite loop */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8 pr-8 text-[11px] font-medium text-slate-300 whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fully Insured ($20M)</span>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Level 5 Qualified Arborists</span>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Emergency Storm Service</span>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                <span>Call Us Direct —</span>
                <a href="tel:0456579811" className="text-white font-bold hover:text-[#7cc043] transition-colors">0456 579 811</a>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Servicing All 97 Suburbs</span>
              </div>
              <span className="text-[#036829] pr-8">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100 w-full">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between py-2 px-4 lg:px-8">
          <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Arbco Tree Services Logo"
              width={120}
              height={120}
              priority
              className="object-contain h-14 sm:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700 font-heading">
            <Link href="/" className="text-[#036829] border-b-2 border-[#036829] pb-1">Home</Link>
            <div className="relative group flex items-center gap-1 hover:text-[#036829] transition-colors py-2">
              <Link href="/services" className="flex items-center gap-1">
                <span>Services</span>
                <svg className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#036829] transition-colors mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white shadow-xl rounded-2xl border border-slate-100 p-2 z-50">
                <Link href="/services/tree-removal" className="block px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829] rounded-xl transition-colors">Tree Removal</Link>
                <Link href="/services/stump-grinding" className="block px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829] rounded-xl transition-colors">Stump Grinding</Link>
                <Link href="/services/palm-tree-removal" className="block px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829] rounded-xl transition-colors">Palm Tree Removal</Link>
                <Link href="/services/tree-pruning-lopping" className="block px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829] rounded-xl transition-colors">Pruning & Lopping</Link>
                <Link href="/services/emergency-tree-removal" className="block px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-xl transition-colors">24/7 Emergency Work</Link>
                <Link href="/services/wood-chipping-mulching" className="block px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829] rounded-xl transition-colors">Wood Chipping & Mulching</Link>
                <Link href="/services/land-clearing" className="block px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829] rounded-xl transition-colors">Land Clearing</Link>
                <div className="border-t border-slate-100 my-1" />
                <Link href="/services" className="block px-3.5 py-2 text-xs font-extrabold text-[#036829] hover:bg-emerald-50 rounded-xl transition-colors">All Services Overview →</Link>
              </div>
            </div>
            <Link href="/#about" className="hover:text-[#036829] transition-colors">About Us</Link>
            <Link href="/service-areas" className="hover:text-[#036829] transition-colors">Areas We Serve</Link>
            <Link href="/blog" className="hover:text-[#036829] transition-colors">Guides</Link>
            <Link href="/#gallery" className="hover:text-[#036829] transition-colors">Gallery</Link>
            <Link href="/#testimonials" className="hover:text-[#036829] transition-colors">Reviews</Link>
            <Link href="/#contact" className="hover:text-[#036829] transition-colors">Contact</Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Call Icon Button (Mobile Only) */}
            <a
              href="tel:0456579811"
              aria-label="Call Arbco on 0456 579 811"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-[#036829] border border-emerald-200 active:scale-95 transition-all shadow-xs"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

            {/* Desktop & Mobile Free Quote Button */}
            <Link
              href="/quote"
              className="quote-btn-gradient rounded-xl px-3.5 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-extrabold text-white flex items-center gap-1 shadow-md hover:scale-[1.02] active:scale-95 transition-transform whitespace-nowrap"
            >
              <span>Free Quote</span> <span className="text-xs">→</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 active:scale-95 transition-all"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-2xl space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Urgent Call Hero Banner in Drawer */}
            <div className="bg-emerald-950 rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-[#7cc043] font-bold block font-heading">
                  24/7 Townsville Emergency Line
                </span>
                <span className="text-base font-extrabold font-heading text-white block">
                  0456 579 811
                </span>
              </div>
              <a
                href="tel:0456579811"
                className="bg-[#7cc043] hover:bg-[#6eb235] text-[#051c0e] font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <span>Call Now</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1 font-heading text-sm font-bold text-slate-800">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Home</span>
                <span className="text-slate-300">→</span>
              </Link>

              {/* Collapsible Services Section */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  className="w-full flex items-center justify-between p-3 text-left font-bold text-slate-800 hover:text-[#036829] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>Our 7 Arborist Services</span>
                  </span>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform ${servicesExpanded ? 'rotate-180 text-[#036829]' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {servicesExpanded && (
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-slate-100 bg-white">
                    <Link
                      href="/services/tree-removal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829]"
                    >
                      🪓 Tree Removal
                    </Link>
                    <Link
                      href="/services/stump-grinding"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829]"
                    >
                      ⚙️ Stump Grinding
                    </Link>
                    <Link
                      href="/services/palm-tree-removal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829]"
                    >
                      🌴 Palm Tree Removal & De-Nutting
                    </Link>
                    <Link
                      href="/services/tree-pruning-lopping"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829]"
                    >
                      🌿 Tree Pruning & Lopping (AS4373)
                    </Link>
                    <Link
                      href="/services/emergency-tree-removal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50"
                    >
                      🚨 24/7 Emergency Storm Service
                    </Link>
                    <Link
                      href="/services/wood-chipping-mulching"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829]"
                    >
                      🪵 Wood Chipping & Mulch Delivery
                    </Link>
                    <Link
                      href="/services/land-clearing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#036829]"
                    >
                      🚜 Land Clearing & Forestry Mulching
                    </Link>
                    <div className="border-t border-slate-100 pt-1">
                      <Link
                        href="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 text-xs font-bold text-[#036829] hover:underline"
                      >
                        All Services Overview →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/service-areas"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Areas We Serve (97 Suburbs)</span>
                <span className="text-slate-300">→</span>
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Arborist Guides & Advice</span>
                <span className="text-slate-300">→</span>
              </Link>

              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>About Us</span>
                <span className="text-slate-300">→</span>
              </Link>

              <Link
                href="/#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Customer Reviews</span>
                <span className="text-slate-300">→</span>
              </Link>

              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Contact Details</span>
                <span className="text-slate-300">→</span>
              </Link>
            </nav>

            {/* Bottom Large CTA in Drawer */}
            <div className="pt-2">
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full quote-btn-gradient text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md font-heading active:scale-95 transition-transform"
              >
                <span>Request a Free Quote</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
