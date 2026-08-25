import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {/* Top Banner (Thin green bar) */}
      <div className="bg-[#036829] text-white py-2.5 px-4 text-center text-xs font-bold sm:text-sm tracking-wide">
        <span>Arbco Tree Solutions • Professional Arborists • $20M Public Liability Insurance</span>
        <a href="tel:0426204514" className="ml-3 underline hover:text-emerald-100 font-extrabold">
          Call: 0426 204 514
        </a>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Arbco Tree Logo"
              width={200}
              height={50}
              priority
              className="object-contain h-12 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
            <Link href="/" className="text-[#036829]">Home</Link>
            <Link href="/about" className="hover:text-[#036829] transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-[#036829] transition-colors">Services</Link>
            <Link href="/faq" className="hover:text-[#036829] transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-[#036829] transition-colors">Contact</Link>
          </nav>

          {/* Call-to-action button */}
          <div className="flex items-center gap-4">
            <a
              href="tel:0426204514"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-5 py-2.5 text-sm font-extrabold text-slate-700 hover:border-[#036829] hover:text-[#036829] transition-all"
            >
              📞 0426 204 514
            </a>
            <Link
              href="/book-quote"
              className="rounded-full bg-[#036829] px-6 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800 hover:scale-[1.02] transition-all"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-emerald-950 py-24 lg:py-36 text-white overflow-hidden">
        {/* Next.js Image component for background instead of unreliable CSS bg-[url] */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000"
            alt="Arborist working on tall trees"
            fill
            priority
            className="object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Heading and info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4.5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                🌱 Melbourne’s Premium Tree Care & Arborists
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight font-heading text-white">
                Safe, Professional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                  Tree Removal & Arboriculture
                </span>
              </h1>
              <p className="max-w-xl text-lg text-slate-300 leading-relaxed font-sans">
                Arbco Tree Solutions delivers expert tree care, technical removals, stump grinding, and arborist reports. We combine decades of experience with rigorous safety standards to protect your home and landscape.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-sm text-slate-200 backdrop-blur-sm">
                  🛡️ $20M Insurance Cover
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-sm text-slate-200 backdrop-blur-sm">
                  👷 Level 5 Qualified Arborists
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Widget Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-8 text-slate-800 shadow-2xl border border-slate-100/80 relative">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-xl text-emerald-600 animate-pulse">📋</div>
                <h3 className="text-2xl font-extrabold text-emerald-950 tracking-tight font-heading">Request a Free On-Site Quote</h3>
                <p className="text-sm text-slate-500 mt-2 mb-6">Fully transparent pricing. No hidden fees.</p>
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
                    <select
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-sm focus:outline-none focus:border-[#036829] focus:bg-white transition-all text-slate-600 font-sans"
                    >
                      <option>Select Service Needed</option>
                      <option>Tree Removal</option>
                      <option>Stump Grinding / Removal</option>
                      <option>Palm Tree Care</option>
                      <option>Tree Pruning & Lopping</option>
                      <option>Arborist Assessment Report</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#036829] hover:bg-emerald-800 text-white font-extrabold py-4 transition-all shadow-md shadow-emerald-950/20 hover:-translate-y-0.5"
                  >
                    Send Quote Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-base font-heading">🛡️ $20M Public Liability</h4>
                  <p className="text-slate-500 text-sm">Full insurance protection coverage across all domestic and commercial sites.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-base font-heading">🌳 Eco-Friendly Practices</h4>
                  <p className="text-slate-500 text-sm">We process organic tree material into garden mulch to prevent waste.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-base font-heading">📋 Council Planning Permit Reports</h4>
                  <p className="text-slate-500 text-sm">We prepare arborist planning reports for all Melbourne councils.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-base font-heading">🏗️ Advanced Machinery</h4>
                  <p className="text-slate-500 text-sm">Equipped with tower platforms, wood chippers, and stump grinders.</p>
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

      {/* Trusted Tree Experts Block (Dark Green Background) */}
      <section className="bg-[#024a1c] text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000"
            alt="Forest overlay"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 space-y-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-heading">
            What makes Arbco Tree the trusted experts?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left font-sans">
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30 backdrop-blur-sm">
              <h4 className="font-extrabold text-lg text-emerald-300 font-heading">✓ Fully Insured</h4>
              <p className="text-sm text-slate-200">Complete property protection with full public liability insurance ($20 million cover).</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30 backdrop-blur-sm">
              <h4 className="font-extrabold text-lg text-emerald-300 font-heading">✓ Council Permit Experts</h4>
              <p className="text-sm text-slate-200">Expert guidance on Victoria's council laws and planning permit applications.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30 backdrop-blur-sm">
              <h4 className="font-extrabold text-lg text-emerald-300 font-heading">✓ Safety First</h4>
              <p className="text-sm text-slate-200">Rigorous safety assessments before climbing or starting any rigging operations.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30 backdrop-blur-sm">
              <h4 className="font-extrabold text-lg text-emerald-300 font-heading">✓ Qualified Arborists</h4>
              <p className="text-sm text-slate-200">Expertise in tree health, pruning standards (AS4373), and emergency felling.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30 backdrop-blur-sm">
              <h4 className="font-extrabold text-lg text-emerald-300 font-heading">✓ Eco-Friendly Recycling</h4>
              <p className="text-sm text-slate-200">We recycle tree material into nutrient-rich mulches for gardens and community spaces.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30 backdrop-blur-sm">
              <h4 className="font-extrabold text-lg text-emerald-300 font-heading">✓ High-End Equipment</h4>
              <p className="text-sm text-slate-200">Modern chippers, high-access platforms, and heavy transport trucks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">Testimonials</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
              Meet Our Happy Customers
            </h2>
            <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-lg">
              ★★★★★ <span className="text-slate-800 text-sm ml-2 font-sans font-bold">5.0 Star Google Rating</span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left font-sans">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed italic">"Highly recommend Arbco Tree Solutions. They removed 3 large trees from my backyard. Safe, clean, and very competitively priced!"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">DK</div>
                <span className="font-bold text-xs text-slate-800">David K.</span>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed italic">"Professional crew, turned up on time, ground down all stumps and cleaned up so well you wouldn't even know they had been there. Fantastic job."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">SM</div>
                <span className="font-bold text-xs text-slate-800">Sarah M.</span>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed italic">"I have used Arbco twice now. They are extremely careful and did a wonderful job lopping the gum tree overhanging our roof."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">JL</div>
                <span className="font-bold text-xs text-slate-800">John L.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Service Regions */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
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
        <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-16 pt-8 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
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
