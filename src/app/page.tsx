import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
              <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading">
                SAFE. RELIABLE. PROFESSIONAL.
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight font-heading text-white">
                Expert Tree <br />
                Removal & Arborist <br />
                Services in{" "}
                <span className="text-[#7cc043] font-cursive normal-case font-normal text-5xl lg:text-7xl ml-1 relative inline-block">
                  Melbourne
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#7cc043] rounded-full transform -rotate-2" />
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                Arbco Tree Solutions provides professional tree removal, pruning, stump grinding and arborist solutions with a focus on safety, care and customer satisfaction.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
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
              <div className="flex flex-row flex-nowrap items-center justify-between gap-3 pt-6 border-t border-white/10 text-[10px] sm:text-xs lg:text-sm font-bold text-white font-heading w-full overflow-x-auto lg:overflow-visible">
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
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-8 text-slate-800 shadow-2xl relative border border-slate-100/80 max-w-[450px] mx-auto lg:ml-auto lg:mr-0">
                {/* Floating Green Circle Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-[#036829] border-4 border-white flex items-center justify-center text-white text-lg font-bold shadow-md">
                  📋
                </div>

                <div className="text-center mt-2 mb-6">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Get a Free Quote Today!</h3>
                  <p className="text-xs text-slate-500 font-medium font-sans mt-1">Fast. No obligation.</p>
                </div>

                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-sm placeholder-slate-400 focus:outline-none focus:border-[#036829] focus:bg-white transition-all font-sans"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-sm placeholder-slate-400 focus:outline-none focus:border-[#036829] focus:bg-white transition-all font-sans"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-sm placeholder-slate-400 focus:outline-none focus:border-[#036829] focus:bg-white transition-all font-sans"
                      placeholder="Suburb"
                    />
                  </div>
                  <button
                    type="submit"
                    className="quote-btn-gradient w-full rounded-lg text-white font-extrabold py-4 font-heading cursor-pointer"
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
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
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

      {/* 4-Step Process Timeline */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-100">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
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
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Free Initial Booking</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">Fill out our quick form or phone us directly. We schedule an on-site assessment at your convenience.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Transparent Pricing</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">We audit the site and issue a formal, all-inclusive written quote containing full safety details.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Precision Execution</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">Our qualified arborist crew carries out the work using advanced safety rigging and tools.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative group hover:border-[#036829] transition-all">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl bg-[#036829] text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4 font-heading">Zero-Mess Cleanup</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">We process tree debris into garden mulch and sweep up leaving your property spotless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left side: Checklist content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#036829] font-black uppercase tracking-wider text-xs">Arbco Standards</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
                Melbourne’s Gold Standard in Certified Arborist Work
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                At **Arbco Tree Solutions**, we care about maintaining a standard of absolute safety and property protection.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2 pt-4">
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
            <div className="lg:col-span-5">
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
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-heading">
            What makes Arbco Tree the trusted experts?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left font-sans">
            {/* Card 1 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300">
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
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300">
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
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300">
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
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300">
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
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300">
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
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300">
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

      {/* Google Reviews Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">Testimonials</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
              Meet Our Happy Customers
            </h2>
            <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-lg">
              ★★★★★ <span className="text-slate-800 text-sm ml-2 font-sans font-bold">5.0 Star Google Rating</span>
            </div>
          </div>

          <div className="overflow-hidden w-full py-4 relative">
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
                  className="inline-flex items-center justify-center rounded-full bg-[#036829] hover:bg-emerald-800 text-white font-extrabold px-8 py-3.5 shadow-md transition-all font-heading"
                >
                  Explore Service Areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Callout Banner */}
      <section className="relative py-28 bg-[#023313] text-white text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000"
            alt="Tall trees background"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-5xl font-heading">Reach out to Arbco Tree today!</h2>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto font-sans">Get absolute peace of mind for your tree issues. Get a quote or talk to an arborist now.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 font-heading">
            <Link href="/book-quote" className="rounded-full bg-emerald-500 hover:bg-emerald-400 px-8 py-4 font-extrabold text-emerald-950 shadow-lg hover:scale-105 transition-all">Request a Free Quote</Link>
            <a href="tel:0426204514" className="rounded-full border-2 border-white px-8 py-4 font-bold hover:bg-white/10 transition-colors">Call 0426 204 514</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-slate-300 py-16 border-t border-emerald-900/60 font-sans">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Info */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="Arbco Tree Logo"
              width={180}
              height={45}
              className="brightness-0 invert object-contain"
            />
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Arbco Tree Solutions is Melbourne's leading arborist and tree removal services provider. We deliver gold-standard safety and quality.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-extrabold mb-4 text-sm uppercase tracking-wider font-heading">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Our Team</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Tree Services</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-extrabold mb-4 text-sm uppercase tracking-wider font-heading">Our Core Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/tree-removal" className="hover:text-white transition-colors">Tree Removal</Link></li>
              <li><Link href="/services/stump-grinding" className="hover:text-white transition-colors">Stump Grinding</Link></li>
              <li><Link href="/services/palm-tree-removal" className="hover:text-white transition-colors">Palm Tree Care</Link></li>
              <li><Link href="/services/arborist-reports" className="hover:text-white transition-colors">Arborist Reports</Link></li>
              <li><Link href="/services/tree-pruning-lopping" className="hover:text-white transition-colors">Tree Lopping & Pruning</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div>
            <h4 className="text-white font-extrabold mb-4 text-sm uppercase tracking-wider font-heading">Contact Information</h4>
            <ul className="space-y-3 text-xs">
              <li>📍 Factory 8 61/65 Russell St, Werribee VIC 3030</li>
              <li>📞 Phone: <a href="tel:0426204514" className="hover:text-white font-semibold">0426 204 514</a></li>
              <li>✉️ Email: <a href="mailto:milonesgroup@gmail.com" className="hover:text-white">milonesgroup@gmail.com</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8 mt-16 pt-8 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Arbco Tree Solutions. All rights reserved. Created in Next.js.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">ABN: 67 608 227 343</span>
            <span className="text-slate-400 font-heading">Fully Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
