import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#051c0e] text-slate-400 pt-28 pb-12 border-t border-emerald-950/60 relative overflow-hidden font-sans">
        {/* Left Side Tree Watermark (Enhanced Opacity & Tint) */}
        <div className="absolute left-[-2%] bottom-[-5%] w-[45%] h-[110%] opacity-[0.09] pointer-events-none select-none z-0 hidden lg:block">
          <Image src="/silhouette-tree.png" alt="watermark tree" fill className="object-contain object-left-bottom" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 grid gap-8 lg:grid-cols-12 relative z-10">
          {/* Column 1: Info & Brand */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center select-none">
              <Image
                src="/logo.png"
                alt="Arbco Tree Logo"
                width={240}
                height={80}
                priority
                className="brightness-0 invert object-contain h-22 w-auto"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Professional tree removal and arborist services across Townsville. Safety, reliability and customer satisfaction is our top priority.
            </p>
            {/* Social Icons with circular borders */}
            <div className="flex items-center gap-2.5 pt-2">
              {['facebook', 'instagram', 'google', 'leaf'].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  className="h-9 w-9 rounded-full border border-[#7cc043]/30 hover:border-[#7cc043] text-slate-400 hover:text-white flex items-center justify-center transition-all bg-[#0b1f10]/20 hover:bg-[#0b1f10]/50"
                >
                  {soc === 'facebook' && <span className="text-sm font-black font-sans">f</span>}
                  {soc === 'instagram' && <span className="text-xs font-black font-sans">ig</span>}
                  {soc === 'google' && <span className="text-xs font-black font-sans">G</span>}
                  {soc === 'leaf' && <span className="text-xs">🌿</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold mb-4 text-xs uppercase tracking-widest font-heading pb-1 border-b border-slate-900 w-fit">Company</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/#about" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> About Us</Link></li>
              <li><Link href="/#gallery" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Gallery</Link></li>
              <li><Link href="/#testimonials" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Reviews</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Our Team</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold mb-4 text-xs uppercase tracking-widest font-heading pb-1 border-b border-slate-900 w-fit">Services</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/services/tree-removal" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Tree Removal</Link></li>
              <li><Link href="/services/tree-pruning-lopping" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Tree Pruning</Link></li>
              <li><Link href="/services/stump-grinding" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Stump Grinding</Link></li>
              <li><Link href="/services/land-clearing" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Land Clearing</Link></li>
              <li><Link href="/services/hedge-trimming" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Hedge Trimming</Link></li>
              <li><Link href="/services/emergency-work" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Emergency Services</Link></li>
              <li><Link href="/services/arborist-reports" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Tree Health Assessments</Link></li>
              <li><Link href="/services/wood-chipping" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Mulching & Wood Chipping</Link></li>
            </ul>
          </div>

          {/* Column 4: Areas We Serve */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-extrabold mb-4 text-xs uppercase tracking-widest font-heading pb-1 border-b border-slate-900 w-fit">Areas We Serve</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Townsville</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Eastern Suburbs</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Northern Suburbs</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Southern Suburbs</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Western Suburbs</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Mornington Peninsula</Link></li>
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Yarra Ranges</Link></li>
            </ul>
          </div>

          {/* Column 5: Right side Contact Card Widget */}
          <div className="lg:col-span-3 bg-[#0b1f10]/40 border border-[#7cc043]/15 rounded-3xl p-6 space-y-4 text-left relative overflow-hidden backdrop-blur-sm">
            {/* Leaf watermark inside card */}
            <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.06] pointer-events-none select-none w-32 h-32">
              <Image src="/silhouette-tree.png" alt="Leaf watermark" fill className="object-contain object-right-bottom" />
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-[#7cc043] text-sm shrink-0">
                🌿
              </span>
              <h4 className="text-white font-extrabold text-base font-heading">Let's talk about <span className="text-[#7cc043]">your trees.</span></h4>
            </div>
            
            <p className="text-slate-400 text-xs relative z-10">Free quotes. Fast response. No obligation.</p>
            
            <div className="space-y-3 pt-2 relative z-10">
              <a href="tel:0426204514" className="flex items-center gap-3 text-white hover:text-[#7cc043] transition-colors group">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1f10]/30 group-hover:bg-[#036829] border border-emerald-900/30 text-[#7cc043] group-hover:text-white transition-all shrink-0">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span className="font-extrabold text-sm font-heading">0426 204 514</span>
              </a>
              <a href="mailto:milonesgroup@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1f10]/30 group-hover:bg-[#036829] border border-emerald-900/30 text-[#7cc043] group-hover:text-white transition-all shrink-0">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-xs truncate font-sans font-medium">milonesgroup@gmail.com</span>
              </a>
            </div>

            <Link
              href="/#quote"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#7cc043]/30 hover:border-[#7cc043] hover:bg-[#7cc043]/10 text-white font-extrabold text-xs py-3.5 transition-all font-heading relative z-10"
            >
              Request a Free Quote <span className="text-[10px]">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans z-10 relative">
          <p>&copy; {new Date().getFullYear()} Arbco Tree Services. All Rights Reserved.</p>
          
          <div className="flex items-center gap-2 justify-center">
            <span className="text-[#7cc043] text-xs">🌿</span>
            <span className="italic text-[#7cc043] font-serif text-[13px] font-semibold tracking-wide">Caring for trees. Caring for Townsville.</span>
          </div>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-800">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
  );
}
