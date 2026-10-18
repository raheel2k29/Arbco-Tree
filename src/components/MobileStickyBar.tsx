"use client";

import React from 'react';
import Link from 'next/link';

export default function MobileStickyBar() {
  return (
    <aside
      aria-label="Mobile quick contact actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* Direct One-Tap Phone Call */}
        <a
          href="tel:0456579811"
          aria-label="Call Arbco Tree Services on 0456 579 811"
          className="flex-1 bg-[#036829] hover:bg-[#025220] active:scale-95 text-white font-extrabold py-3.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all font-heading tracking-wide"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7cc043] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7cc043]" />
          </span>
          <svg className="w-4 h-4 text-[#7cc043] shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <span className="whitespace-nowrap">Call 0456 579 811</span>
        </a>

        {/* Free Quote Button */}
        <Link
          href="/quote"
          aria-label="Request a Free Quote"
          className="flex-1 quote-btn-gradient active:scale-95 text-white font-extrabold py-3.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md transition-all font-heading tracking-wide"
        >
          <span>Free Quote</span>
          <span className="text-xs">→</span>
        </Link>
      </div>
    </aside>
  );
}
