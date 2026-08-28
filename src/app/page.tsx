"use client";

// Trigger deployment rebuild: 2026-08-28T04:41
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Falling Tree Scroll Handler
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      
      const elementTop = rect.top;
      const startTrigger = 0; // Starts falling only when the section top reaches the top of the viewport
      const endTrigger = -sectionHeight * 0.6; // Fully fallen when 60% of the section goes off-screen
      
      if (elementTop <= startTrigger) {
        const totalDistance = startTrigger - endTrigger;
        const currentDistance = startTrigger - elementTop;
        const progress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);
        setRotation(progress * 85); 
      } else {
        setRotation(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // 2. Intersection Observer for Scroll Entrance Animations
    const revealElements = document.querySelectorAll(
      ".reveal-fade-in, .reveal-slide-up, .reveal-zoom-in"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Lock in place once animated
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
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
              <Link href="/services">Services</Link>
              <svg className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#036829] transition-colors mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <Link href="/about" className="hover:text-[#036829] transition-colors">About Us</Link>
            <Link href="/service-areas" className="hover:text-[#036829] transition-colors">Areas We Serve</Link>
            <Link href="/gallery" className="hover:text-[#036829] transition-colors">Gallery</Link>
            <Link href="/testimonials" className="hover:text-[#036829] transition-colors">Reviews</Link>
            <Link href="/contact" className="hover:text-[#036829] transition-colors">Contact</Link>
          </nav>

          {/* Call-to-action button */}
          <div className="flex items-center">
            <Link
              href="/book-quote"
              className="quote-btn-gradient rounded-lg px-5 py-3 text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5"
            >
              Get a Free Quote <span className="text-xs">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-emerald-950 py-24 lg:py-36 text-white overflow-hidden">
        {/* Looping HTML5 Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-75"
          >
            <source src="/hero%20sec%20video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-slate-950/50" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Heading and info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading reveal-fade-in">
                SAFE. RELIABLE. PROFESSIONAL.
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight font-heading text-white reveal-slide-up delay-75">
                Expert Tree <br />
                Removal & Arborist <br />
                Services in{" "}
                <span className="text-[#7cc043] font-cursive normal-case font-normal text-5xl lg:text-7xl ml-1 relative inline-block">
                  Melbourne
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#7cc043] rounded-full transform -rotate-2" />
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans reveal-slide-up delay-150">
                Arbco Tree Solutions provides professional tree removal, pruning, stump grinding and arborist solutions with a focus on safety, care and customer satisfaction.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 reveal-slide-up delay-200">
                <Link
                  href="/book-quote"
                  className="quote-btn-gradient inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-extrabold text-white"
                >
                  Request a Free Quote <span className="text-xs">→</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-400 hover:border-white px-6 py-3.5 text-sm font-extrabold text-white transition-all"
                >
                  Our Services <span className="text-xs">→</span>
                </Link>
              </div>

              {/* Bottom Trust Badges row */}
              <div className="flex flex-row flex-nowrap items-center justify-between gap-3 pt-6 border-t border-white/10 text-[10px] sm:text-xs lg:text-sm font-bold text-white font-heading w-full overflow-x-auto lg:overflow-visible reveal-slide-up delay-300">
                <div className="flex items-center gap-2.5 whitespace-nowrap flex-shrink-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#7cc043] bg-transparent text-[#7cc043]">
                    <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Qualified Arborists
                </div>
                <div className="flex items-center gap-2.5 whitespace-nowrap flex-shrink-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#7cc043] bg-transparent text-[#7cc043]">
                    <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Fully Insured
                </div>
                <div className="flex items-center gap-2.5 whitespace-nowrap flex-shrink-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#7cc043] bg-transparent text-[#7cc043]">
                    <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  Safety Focused
                </div>
                <div className="flex items-center gap-2.5 whitespace-nowrap flex-shrink-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#7cc043] bg-transparent text-[#7cc043]">
                    <svg className="h-5.5 w-5.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  Satisfaction Guaranteed
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Widget Card */}
            <div className="lg:col-span-5 reveal-zoom-in delay-250">
              <div className="rounded-3xl bg-white p-8 text-slate-800 shadow-2xl relative border border-slate-100/80 max-w-[450px] mx-auto lg:ml-auto lg:mr-0">
                {/* Floating Green Circle Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-[#036829] border-4 border-white flex items-center justify-center text-white text-lg font-bold shadow-md">
                  📋
                </div>

                <div className="text-center mt-2 mb-6">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Get a Free Quote Today!</h3>
                  <p className="text-slate-500 text-xs mt-1">Get custom arborist pricing sent to your inbox.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-heading">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs focus:border-[#036829] focus:bg-white focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-heading">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 0400 000 000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs focus:border-[#036829] focus:bg-white focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-heading">Your Suburb</label>
                    <input
                      type="text"
                      placeholder="e.g. Box Hill, VIC"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs focus:border-[#036829] focus:bg-white focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-heading">Service Needed</label>
                    <select
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs focus:border-[#036829] focus:bg-white focus:outline-none transition-colors appearance-none"
                      required
                    >
                      <option value="">Select a service...</option>
                      <option value="removal">Tree Removal</option>
                      <option value="pruning">Tree Pruning & Lopping</option>
                      <option value="stump">Stump Grinding</option>
                      <option value="report">Arborist Report</option>
                      <option value="emergency">Emergency Tree Work</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-[#036829] to-[#7cc043] py-3.5 text-xs font-extrabold text-white shadow-md shadow-emerald-950/20 hover:opacity-95 transition-opacity font-heading"
                  >
                    Get My Free Quote
                  </button>
                </form>

                <div className="text-center mt-4 text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                  <span className="text-[#398018] text-xs">🛡️</span> 100% Secure. We respect your privacy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 reveal-slide-up">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">Arbco Services</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
              Our Professional Arborist Solutions
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-sans">
              We provide state-of-the-art tree care services tailored to commercial property developers, local councils, and private homeowners.
            </p>
          </div>

          {/* 8 Card Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600" alt="Tree Removal" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors font-heading">Tree Removal</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">Safe, technical removals of complex, tight-access, or dangerous trees.</p>
                </div>
                <Link href="/services/tree-removal" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#036829] hover:underline font-heading">Read More →</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in delay-75">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600" alt="Stump Grinding" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors font-heading">Stump Grinding</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">Complete mechanical grinding to eliminate trip hazards and termite hubs.</p>
                </div>
                <Link href="/services/stump-grinding" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#036829] hover:underline font-heading">Read More →</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in delay-150">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=600" alt="Palm Tree Care" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors font-heading">Palm Tree Removal</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">Pruning, shaving, cleaning, and specialist removal of unwanted palms.</p>
                </div>
                <Link href="/services/palm-tree-removal" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#036829] hover:underline font-heading">Read More →</Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in delay-200">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600" alt="Pruning" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors font-heading">Pruning & Lopping</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">Structural canopy pruning to enhance health, air-flow, and properties.</p>
                </div>
                <Link href="/services/tree-pruning-lopping" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#036829] hover:underline font-heading">Read More →</Link>
              </div>
            </div>

            {/* Card 5 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600" alt="Arborist Report" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors font-heading">Arborist Reports</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">Official diagnostic assessments for council planning permits.</p>
                </div>
                <Link href="/services/arborist-reports" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#036829] hover:underline font-heading">Read More →</Link>
              </div>
            </div>

            {/* Card 6 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in delay-75">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" alt="Emergency Services" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-700 transition-colors font-heading">Emergency Work</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">24/7 priority emergency response to storm damage and tree collapses.</p>
                </div>
                <Link href="/services/emergency-tree-removal" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-red-700 hover:underline font-heading">Read More →</Link>
              </div>
            </div>

            {/* Card 7 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in delay-150">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600" alt="Mulching" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors font-heading">Wood Chipping</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">Processing green tree waste on-site into valuable organic garden mulch.</p>
                </div>
                <Link href="/services/wood-chipping-mulching" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#036829] hover:underline font-heading">Read More →</Link>
              </div>
            </div>

            {/* Card 8 */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between reveal-zoom-in delay-200">
              <div className="relative h-48 w-full">
                <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600" alt="Block Clearing" fill className="object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors font-heading">Block Clearing</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">Full subdivision and commercial block clearing services.</p>
                </div>
                <Link href="/services/land-clearing" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#036829] hover:underline font-heading">Read More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
        {/* Animated Background Silhouette Tree */}
        <div className="absolute left-[-5%] bottom-0 w-[50%] h-[110%] pointer-events-none z-0 select-none">
          <div 
            style={{ 
              transform: `rotate(${rotation}deg) translate(${-rotation * 0.8}px, ${rotation * 1.3}px)`, 
              transformOrigin: '20% 100%',
              transition: 'transform 0.05s ease-out'
            }}
            className="w-full h-full relative opacity-[0.08]"
          >
            <Image
              src="/silhouette-tree.png"
              alt="Background silhouette tree animation"
              fill
              className="object-contain object-left-bottom"
              priority
            />
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left side: Checklist content */}
            <div className="lg:col-span-7 space-y-6 reveal-slide-up">
              <span className="text-[#036829] font-black uppercase tracking-wider text-xs">Arbco Standards</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
                Melbourne’s Gold Standard in Certified Arborist Work
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                At **Arbco Tree Solutions**, we care about maintaining a standard of absolute safety and property protection.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2 pt-4 reveal-slide-up delay-150">
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-[#036829] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-base font-heading">$20M Public Liability</h4>
                    <p className="text-slate-500 text-sm">Full insurance protection coverage across all domestic and commercial sites.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-[#036829] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-base font-heading">Eco-Friendly Practices</h4>
                    <p className="text-slate-500 text-sm">We process organic tree material into garden mulch to prevent waste.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-[#036829] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-base font-heading">Council Planning Permit Reports</h4>
                    <p className="text-slate-500 text-sm">We prepare arborist planning reports for all Melbourne councils.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-[#036829] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-base font-heading">Advanced Machinery</h4>
                    <p className="text-slate-500 text-sm">Equipped with tower platforms, wood chippers, and stump grinders.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: High-End Image */}
            <div className="lg:col-span-5 reveal-zoom-in delay-200">
              <div className="relative h-[480px] w-full overflow-hidden rounded-3xl shadow-xl border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
                  alt="Professional arborist climbing palm tree safely"
                  fill
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Tree Experts Block (Dark Green Background with Forest Overlay) */}
      <section className="bg-gradient-to-b from-[#0a2514] to-[#041209] text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000"
            alt="Forest overlay"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 lg:px-8 space-y-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-heading reveal-slide-up">
            What makes Arbco Tree the trusted experts?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left font-sans">
            {/* Card 1 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 reveal-zoom-in">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <h4 className="font-extrabold text-lg text-emerald-300 font-heading">Fully Insured</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">Complete property protection with full public liability insurance ($20 million cover).</p>
            </div>

            {/* Card 2 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 reveal-zoom-in delay-100">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </span>
                <h4 className="font-extrabold text-lg text-emerald-300 font-heading">Council Permit Experts</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">Expert guidance on Victoria's council laws and planning permit applications.</p>
            </div>

            {/* Card 3 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 reveal-zoom-in delay-200">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                <h4 className="font-extrabold text-lg text-emerald-300 font-heading">Safety First</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">Rigorous safety assessments before climbing or starting any rigging operations.</p>
            </div>

            {/* Card 4 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 reveal-zoom-in">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
                <h4 className="font-extrabold text-lg text-emerald-300 font-heading">Qualified Arborists</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">Expertise in tree health, pruning standards (AS4373), and emergency felling.</p>
            </div>

            {/* Card 5 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 reveal-zoom-in delay-100">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                  </svg>
                </span>
                <h4 className="font-extrabold text-lg text-emerald-300 font-heading">Eco-Friendly Recycling</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">We recycle tree material into nutrient-rich mulches for gardens and community spaces.</p>
            </div>

            {/* Card 6 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 reveal-zoom-in delay-200">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <h4 className="font-extrabold text-lg text-emerald-300 font-heading">High-End Equipment</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">Modern chippers, high-access platforms, and heavy transport trucks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Timeline */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-100">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 reveal-slide-up">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">How We Work</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
              Our Effortless 4-Step Process
            </h2>
            <p className="text-slate-600 text-lg font-sans">
              We make tree care simple, clear, and stress-free from contact to cleanup.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all reveal-zoom-in">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Free Initial Booking</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">Fill out our quick form or phone us directly. We schedule an on-site assessment at your convenience.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all reveal-zoom-in delay-75">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Transparent Pricing</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">We audit the site and issue a formal, all-inclusive written quote containing full safety details.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all reveal-zoom-in delay-150">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Precision Execution</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">Our qualified arborist crew carries out the work using advanced safety rigging and tools.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all reveal-zoom-in delay-200">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Zero-Mess Cleanup</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">We process tree debris into garden mulch and sweep up leaving your property spotless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Valued Customers Section (Dark Green Background with Edge Fades) */}
      <section className="py-16 bg-[#023011] text-white border-t border-b border-white/5 relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 text-center space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 reveal-slide-up">
            <span className="text-[#7cc043] font-black uppercase tracking-wider text-xs">Our Clients</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white font-heading">
              Our Valued Customers
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Proudly delivering professional arborist and tree management solutions for municipal councils, civil contractors, and commercial developers.
            </p>
          </div>
          
          <div className="space-y-6 overflow-hidden py-2 relative w-full reveal-zoom-in delay-150">
            {/* Left Side Fade Overlay (inside the overflow wrapper) */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#023011] to-transparent pointer-events-none z-20" />
            {/* Right Side Fade Overlay (inside the overflow wrapper) */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#023011] to-transparent pointer-events-none z-20" />

            {/* Top Row: Scrolls Left */}
            <div className="logos-track-left gap-8 flex items-center">
              {[
                { type: "downer" },
                { type: "citywide" },
                { type: "barryplant" },
                { type: "avington" },
                { type: "eco" },
                { type: "arcare" },
                { type: "johnholland" }
              ].concat([
                { type: "downer" },
                { type: "citywide" },
                { type: "barryplant" },
                { type: "avington" },
                { type: "eco" },
                { type: "arcare" },
                { type: "johnholland" }
              ]).map((logo, idx) => (
                <div key={`top-${idx}`} className="w-[140px] sm:w-[180px] shrink-0 flex items-center justify-center select-none opacity-60 hover:opacity-100 transition-opacity duration-300">
                  {logo.type === "downer" && (
                    <div className="flex items-center gap-1">
                      <span className="font-heading font-black tracking-tighter text-base sm:text-lg text-white">Downer</span>
                      <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 bg-orange-500 rotate-45 transform"></span>
                    </div>
                  )}
                  {logo.type === "citywide" && (
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-bold tracking-widest text-white leading-none">▲</span>
                      <span className="font-heading font-black tracking-tight text-xs sm:text-sm text-white">CITYWIDE</span>
                    </div>
                  )}
                  {logo.type === "barryplant" && (
                    <span className="font-serif italic font-bold text-base sm:text-lg text-white">BarryPlant</span>
                  )}
                  {logo.type === "avington" && (
                    <div className="flex flex-col items-center">
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-[9px] font-bold tracking-widest text-white mt-1">AVINGTON</span>
                    </div>
                  )}
                  {logo.type === "eco" && (
                    <span className="text-[10px] sm:text-xs text-white leading-tight font-sans text-left">🌿 Australian<br/><span className="text-[7px] sm:text-[8px] tracking-widest font-bold">ECOSYSTEMS</span></span>
                  )}
                  {logo.type === "arcare" && (
                    <div className="flex items-center gap-1">
                      <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-white flex items-center justify-center text-[6px] sm:text-[7px] font-bold text-white shrink-0">O</span>
                      <span className="text-xs font-bold text-white tracking-wide">arcare</span>
                    </div>
                  )}
                  {logo.type === "johnholland" && (
                    <div className="flex flex-col items-center">
                      <span className="font-sans font-black tracking-wide text-[10px] sm:text-xs text-white uppercase leading-none">JOHN HOLLAND</span>
                      <div className="h-[2px] w-full bg-red-600 mt-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Row: Scrolls Right */}
            <div className="logos-track-right gap-8 flex items-center">
              {[
                { type: "manheim" },
                { type: "airport" },
                { type: "mercy" },
                { type: "miepol" },
                { type: "raywhite" },
                { type: "sunshine" }
              ].concat([
                { type: "manheim" },
                { type: "airport" },
                { type: "mercy" },
                { type: "miepol" },
                { type: "raywhite" },
                { type: "sunshine" }
              ]).map((logo, idx) => (
                <div key={`bottom-${idx}`} className="w-[140px] sm:w-[180px] shrink-0 flex items-center justify-center select-none opacity-60 hover:opacity-100 transition-opacity duration-300">
                  {logo.type === "manheim" && (
                    <span className="font-serif font-black text-base sm:text-lg text-white">Manheim</span>
                  )}
                  {logo.type === "airport" && (
                    <div className="flex items-center gap-1">
                      <span className="text-white text-xs">🚄</span>
                      <span className="text-[8px] sm:text-[9px] font-black tracking-tight leading-none text-white text-left">MELBOURNE<br/>AIRPORT RAIL</span>
                    </div>
                  )}
                  {logo.type === "mercy" && (
                    <div className="flex flex-col items-center">
                      <span className="font-sans font-extrabold text-[10px] sm:text-xs text-white">Mercy Health</span>
                      <span className="text-[6px] sm:text-[7px] italic text-slate-300">Care first</span>
                    </div>
                  )}
                  {logo.type === "miepol" && (
                    <span className="font-heading font-black text-sm sm:text-base text-white tracking-tighter">miepol</span>
                  )}
                  {logo.type === "raywhite" && (
                    <span className="font-serif font-black text-sm sm:text-base text-white">Ray White.</span>
                  )}
                  {logo.type === "sunshine" && (
                    <span className="text-[8px] sm:text-[9px] font-bold tracking-tight text-white leading-none font-sans text-left">☀️ Sunshine<br/><span className="text-[6px] sm:text-[7px] font-normal text-slate-300">SPECIAL SCHOOL</span></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4 reveal-slide-up">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">Testimonials</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
              Meet Our Happy Customers
            </h2>
            <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-lg">
              ★★★★★ <span className="text-slate-800 text-sm ml-2 font-sans font-bold">5.0 Star Google Rating</span>
            </div>
          </div>

          <div className="overflow-hidden w-full py-4 relative reveal-zoom-in delay-150">
            <div className="reviews-marquee-track gap-6 flex">
              {[
                {
                  name: "David K.",
                  initials: "DK",
                  text: "Highly recommend Arbco Tree Solutions. They removed 3 large trees from my backyard. Safe, clean, and very competitively priced!",
                },
                {
                  name: "Sarah M.",
                  initials: "SM",
                  text: "Professional crew, turned up on time, ground down all stumps and cleaned up so well you wouldn't even know they had been there. Fantastic job.",
                },
                {
                  name: "John L.",
                  initials: "JL",
                  text: "I have used Arbco twice now. They are extremely careful and did a wonderful job lopping the gum tree overhanging our roof.",
                },
                {
                  name: "Michael B.",
                  initials: "MB",
                  text: "Top class arborist service. They explained everything clearly, got the permits sorted quickly, and left the garden spotless. Outstanding work!",
                },
                {
                  name: "Emily R.",
                  initials: "ER",
                  text: "Very professional and friendly team. Their stump grinding machinery is state-of-the-art and they cleared the site in record time. Will use again!",
                },
              ].concat([
                {
                  name: "David K.",
                  initials: "DK",
                  text: "Highly recommend Arbco Tree Solutions. They removed 3 large trees from my backyard. Safe, clean, and very competitively priced!",
                },
                {
                  name: "Sarah M.",
                  initials: "SM",
                  text: "Professional crew, turned up on time, ground down all stumps and cleaned up so well you wouldn't even know they had been there. Fantastic job.",
                },
                {
                  name: "John L.",
                  initials: "JL",
                  text: "I have used Arbco twice now. They are extremely careful and did a wonderful job lopping the gum tree overhanging our roof.",
                },
                {
                  name: "Michael B.",
                  initials: "MB",
                  text: "Top class arborist service. They explained everything clearly, got the permits sorted quickly, and left the garden spotless. Outstanding work!",
                },
                {
                  name: "Emily R.",
                  initials: "ER",
                  text: "Very professional and friendly team. Their stump grinding machinery is state-of-the-art and they cleared the site in record time. Will use again!",
                },
              ]).map((rev, index) => (
                <div
                  key={index}
                  className="w-[350px] sm:w-[380px] bg-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left font-sans shrink-0 whitespace-normal"
                >
                  <div>
                    <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">"{rev.text}"</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs shrink-0">
                      {rev.initials}
                    </div>
                    <span className="font-bold text-xs text-slate-800">{rev.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map & Service Regions */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left side: Map representation */}
            <div className="lg:col-span-6 h-[400px] rounded-3xl overflow-hidden relative shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                alt="Map of Greater Melbourne Victoria"
                fill
                className="object-cover opacity-60 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-emerald-950/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-900">
                <span className="text-4xl mb-3">📍</span>
                <h4 className="font-extrabold text-2xl text-emerald-950 font-heading">Greater Melbourne Coverage</h4>
                <p className="text-sm mt-2 text-slate-800 max-w-xs font-semibold font-sans">104+ target suburbs serviced with fast-response arborist teams.</p>
              </div>
            </div>

            {/* Right side: Details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#036829] font-black uppercase tracking-wider text-xs">Service Radius</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                Rapid Response Tree Services Across All Melbourne Suburbs
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-sans">
                Whether you need tree removal in Werribee, stump grinding in Geelong, or emergency pruning in Box Hill, we have localized crews ready to respond.
              </p>
              <div className="pt-4">
                <Link
                  href="/service-areas"
                  className="quote-btn-gradient inline-flex items-center justify-center rounded-xl text-white font-extrabold px-8 py-4 shadow-md transition-all font-heading hover:opacity-95"
                >
                  Explore Service Areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rounded Pre-footer CTA Callout Card */}
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8 -mb-16 relative z-30">
        <div className="bg-[#051c0e] border border-[#7cc043]/20 rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          {/* Leaf background texture overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
          
          {/* Hanging leaf branch top-left */}
          <div className="absolute top-0 left-0 w-36 h-36 opacity-30 pointer-events-none select-none">
            <svg className="w-full h-full text-[#7cc043]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 Q 30,10 50,40" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <path d="M15,8 C 22,5 25,12 22,16 C 18,18 12,14 15,8 Z" />
              <path d="M28,16 C 36,12 38,20 34,24 C 30,26 24,22 28,16 Z" />
              <path d="M38,28 C 46,24 48,32 44,36 C 40,38 34,34 38,28 Z" />
              <path d="M8,18 C 12,25 5,28 2,24 C 0,20 5,14 8,18 Z" />
              <path d="M18,30 C 22,37 15,40 12,36 C 9,32 14,26 18,30 Z" />
              <path d="M28,42 C 32,49 25,52 22,48 C 19,44 24,38 28,42 Z" />
            </svg>
          </div>
          
          {/* Hanging leaf branch top-right */}
          <div className="absolute top-0 right-0 w-36 h-36 opacity-30 pointer-events-none select-none scale-x-[-1]">
            <svg className="w-full h-full text-[#7cc043]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 Q 30,10 50,40" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <path d="M15,8 C 22,5 25,12 22,16 C 18,18 12,14 15,8 Z" />
              <path d="M28,16 C 36,12 38,20 34,24 C 30,26 24,22 28,16 Z" />
              <path d="M38,28 C 46,24 48,32 44,36 C 40,38 34,34 38,28 Z" />
              <path d="M8,18 C 12,25 5,28 2,24 C 0,20 5,14 8,18 Z" />
              <path d="M18,30 C 22,37 15,40 12,36 C 9,32 14,26 18,30 Z" />
              <path d="M28,42 C 32,49 25,52 22,48 C 19,44 24,38 28,42 Z" />
            </svg>
          </div>

          <div className="flex items-center gap-4 text-left w-full lg:w-auto relative z-10">
            <div className="h-14 w-14 rounded-full bg-[#041a0d]/80 border-2 border-[#7cc043]/30 flex items-center justify-center text-white shrink-0 shadow-md">
              <svg className="h-6 w-6 text-[#7cc043]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">Need a <span className="text-[#7cc043]">Tree Expert?</span></h3>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-0.5">Get professional tree services across Melbourne.</p>
            </div>
          </div>

          {/* Features columns */}
          <div className="hidden lg:flex items-center justify-between gap-6 lg:gap-8 flex-1 max-w-2xl px-6 border-l border-r border-[#7cc043]/10 text-left text-xs text-slate-300 relative z-10">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-[#7cc043] mt-0.5">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <div>
                <h4 className="font-extrabold text-white leading-none">Fully Insured</h4>
                <p className="text-[10px] text-slate-400 mt-1">Your property is in safe hands.</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#7cc043]/10" />

            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-[#7cc043] mt-0.5">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <div>
                <h4 className="font-extrabold text-white leading-none">Qualified Arborists</h4>
                <p className="text-[10px] text-slate-400 mt-1">Experts in tree care and maintenance.</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#7cc043]/10" />

            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-[#7cc043] mt-0.5">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <h4 className="font-extrabold text-white leading-none">Fast Response</h4>
                <p className="text-[10px] text-slate-400 mt-1">We respond quickly when you need us.</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="shrink-0 w-full lg:w-auto relative z-10">
            <Link
              href="/book-quote"
              className="quote-btn-gradient rounded-xl px-6 py-4 text-sm font-extrabold text-white flex items-center justify-center gap-1.5 shadow-md shadow-black/20 w-full lg:w-auto hover:opacity-95 transition-opacity"
            >
              Get a Free Quote <span className="text-xs">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
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
              Professional tree removal and arborist services across Melbourne. Safety, reliability and customer satisfaction is our top priority.
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
              <li><Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Gallery</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Reviews</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Our Team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Contact Us</Link></li>
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
              <li><Link href="/service-areas" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Melbourne</Link></li>
              <li><Link href="/service-areas/eastern-suburbs" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Eastern Suburbs</Link></li>
              <li><Link href="/service-areas/northern-suburbs" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Northern Suburbs</Link></li>
              <li><Link href="/service-areas/southern-suburbs" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Southern Suburbs</Link></li>
              <li><Link href="/service-areas/western-suburbs" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Western Suburbs</Link></li>
              <li><Link href="/service-areas/mornington-peninsula" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Mornington Peninsula</Link></li>
              <li><Link href="/service-areas/yarra-ranges" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="text-[#7cc043] text-[9px]">❯</span> Yarra Ranges</Link></li>
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
              href="/book-quote"
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
            <span className="italic text-[#7cc043] font-serif text-[13px] font-semibold tracking-wide">Caring for trees. Caring for Melbourne.</span>
          </div>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-800">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
