import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      {/* Top Banner — Scrolling marquee ticker */}
      <div className="bg-[#0b1f10] w-full overflow-hidden py-3">
        <div className="marquee-track">
          {/* Render the items twice for seamless infinite loop */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8 pr-8 text-[11px] font-medium text-slate-300 whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fully Insured</span>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Qualified Arborists</span>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Emergency Service</span>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                <span>Call Us Anytime —</span>
                <a href="tel:0426204514" className="text-white font-bold hover:text-[#7cc043] transition-colors">0426 204 514</a>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>$20M Public Liability Insurance</span>
              </div>
              <span className="text-[#036829]">✦</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#7cc043] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Level 5 Qualified Arborists</span>
              </div>
              <span className="text-[#036829] pr-8">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100 w-full">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between py-2 px-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Arbco Tree Logo"
              width={120}
              height={120}
              priority
              className="object-contain h-16 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700 font-heading">
            <Link href="/" className="text-[#036829] border-b-2 border-[#036829] pb-1">Home</Link>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#036829] transition-colors">
              <Link href="/#services">Services</Link>
              <svg className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#036829] transition-colors mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <Link href="/#about" className="hover:text-[#036829] transition-colors">About Us</Link>
            <Link href="/service-areas" className="hover:text-[#036829] transition-colors">Areas We Serve</Link>
            <Link href="/#gallery" className="hover:text-[#036829] transition-colors">Gallery</Link>
            <Link href="/#testimonials" className="hover:text-[#036829] transition-colors">Reviews</Link>
            <Link href="/#contact" className="hover:text-[#036829] transition-colors">Contact</Link>
          </nav>

          {/* Call-to-action button */}
          <div className="flex items-center">
            <Link
              href="/#quote"
              className="quote-btn-gradient rounded-lg px-5 py-3 text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5"
            >
              Get a Free Quote <span className="text-xs">→</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
