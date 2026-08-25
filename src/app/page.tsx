import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Top Banner (Thin green bar) */}
      <div className="bg-[#036829] text-white py-2 px-4 text-center text-xs font-semibold sm:text-sm">
        <span>Melbourne's Trusted Arborists • Fully Insured • Free Quotes</span>
        <a href="tel:0426204514" className="ml-3 underline hover:text-emerald-100 font-bold">
          Call Now: 0426 204 514
        </a>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <Link href="/" className="flex items-center">
            {/* Using the logo copied to the public folder */}
            <Image
              src="/logo.png"
              alt="Milone's Tree Solutions Logo"
              width={220}
              height={40}
              priority
              className="object-contain h-10 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-[#036829]">
            <Link href="/" className="text-[#036829] border-b-2 border-[#036829] pb-1">Home</Link>
            <Link href="/about" className="hover:text-emerald-700 transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-emerald-700 transition-colors">Services</Link>
            <Link href="/faq" className="hover:text-emerald-700 transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-emerald-700 transition-colors">Contact</Link>
          </nav>

          {/* Call-to-action button */}
          <div className="flex items-center gap-4">
            <a
              href="tel:0426204514"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border-2 border-[#036829] px-5 py-2 text-sm font-extrabold text-[#036829] hover:bg-[#036829]/5 transition-colors"
            >
              📞 0426 204 514
            </a>
            <Link
              href="/book-quote"
              className="rounded-full bg-[#036829] px-6 py-2.5 text-sm font-extrabold text-white shadow-md hover:bg-emerald-800 transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-emerald-950 py-20 lg:py-32 text-white overflow-hidden">
        {/* Decorative Leaf Overlay or Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Heading and info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block rounded-full bg-[#036829]/30 border border-emerald-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                ★ Professional Arborist Services
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Professional Tree Removal & Arborist Services <br />
                <span className="text-emerald-400">across Melbourne</span>
              </h1>
              <p className="max-w-xl text-lg text-slate-200 leading-relaxed">
                Need reliable tree removal, stump grinding, or a qualified arborist assessment? Milone's Tree Solutions offers top-tier, fully insured tree services for commercial and residential properties.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 rounded-lg bg-emerald-900/40 border border-emerald-800 px-4 py-2 text-sm text-slate-200">
                  🛡️ Fully Insured ($20M)
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-emerald-900/40 border border-emerald-800 px-4 py-2 text-sm text-slate-200">
                  👷 Qualified Arborists
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-emerald-900/40 border border-emerald-800 px-4 py-2 text-sm text-slate-200">
                  ⏳ 15+ Years Experience
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Widget Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-8 text-slate-800 shadow-2xl border border-slate-100">
                <h3 className="text-2xl font-black text-emerald-950 tracking-tight">Fully Insured Professional Tree Care Melbourne</h3>
                <p className="text-sm text-slate-500 mt-2 mb-6">Request a free assessment and formal written quote today.</p>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-sm placeholder-slate-400 focus:outline-none focus:border-[#036829] focus:bg-white transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-sm placeholder-slate-400 focus:outline-none focus:border-[#036829] focus:bg-white transition-all"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <select
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3.5 text-sm focus:outline-none focus:border-[#036829] focus:bg-white transition-all text-slate-600"
                    >
                      <option>Select Service</option>
                      <option>Tree Removal</option>
                      <option>Stump Grinding / Removal</option>
                      <option>Palm Tree Removal</option>
                      <option>Tree Pruning & Lopping</option>
                      <option>Arborist Report</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#036829] hover:bg-emerald-800 text-white font-extrabold py-4 transition-all shadow-md shadow-emerald-950/20"
                  >
                    Request a Free Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Explore our wide range of Tree Services
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We offer comprehensive tree solutions across Melbourne and regional Victoria. Our team of certified arborists ensures safety, precision, and efficiency on every project.
            </p>
          </div>

          {/* 8 Card Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors">Tree Removal Melbourne</h3>
                <p className="text-slate-500 text-xs mt-2">Safe, expert tree felling and extraction for dangerous or unwanted trees.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors">Stump Grinding Melbourne</h3>
                <p className="text-slate-500 text-xs mt-2">Eliminate unsightly or pest-attracting stumps completely from your lawn.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors">Palm Tree Removal Melbourne</h3>
                <p className="text-slate-500 text-xs mt-2">Specialist palm cleanup, trimming, shaving, and full removals.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors">Tree Pruning & Lopping</h3>
                <p className="text-slate-500 text-xs mt-2">Regular maintenance to shape trees, thin branches, and remove hazards.</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors">Arborist Reports</h3>
                <p className="text-slate-500 text-xs mt-2">Certified safety audits, tree health reports, and council applications.</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-700 transition-colors">Emergency Tree Removal</h3>
                <p className="text-slate-500 text-xs mt-2">24/7 rapid storm cleanup, fallen tree extraction, and hazard securing.</p>
              </div>
            </div>

            {/* Card 7 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors">Wood Chipping & Mulching</h3>
                <p className="text-slate-500 text-xs mt-2">Convert heavy green waste into useful, moisture-retaining organic mulch.</p>
              </div>
            </div>

            {/* Card 8 */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-44 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#036829] transition-colors">Land & Block Clearing</h3>
                <p className="text-slate-500 text-xs mt-2">Full block clearance for construction, subdivisions, or fire prevention.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-[#036829] hover:bg-emerald-800 text-white font-extrabold px-8 py-3.5 shadow-md transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left side: Checklist content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#036829] font-black uppercase tracking-wider text-sm">Professionalism First</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
                Why Choose Milone's Tree Solutions?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                With a focus on safety, environment, and customer satisfaction, we deliver gold-standard arborist care for all shapes and sizes of trees.
              </p>
              
              <ul className="space-y-4 pt-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">✓</span>
                  <div>
                    <strong>Fully Insured Crew:</strong> $20 Million public liability protection on every single project site.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">✓</span>
                  <div>
                    <strong>State-of-the-Art Equipment:</strong> Tower trucks, advanced rigging gear, and efficient stump grinders.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">✓</span>
                  <div>
                    <strong>Qualified Team members:</strong> Fully certified arborists who understand local council permit laws.
                  </div>
                </li>
              </ul>

              <div className="pt-6">
                <Link
                  href="/book-quote"
                  className="inline-flex items-center justify-center rounded-full bg-[#036829] hover:bg-emerald-800 text-white font-extrabold px-8 py-3.5 shadow-md transition-all"
                >
                  Request a Free Quote
                </Link>
              </div>
            </div>

            {/* Right side: Single High-End Image */}
            <div className="lg:col-span-5">
              <div className="relative h-[480px] w-full overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
                  alt="Professional arborist climbing palm tree"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Tree Experts Block (Dark Green Background) */}
      <section className="bg-[#024a1c] text-white py-20 text-center relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 space-y-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What makes Milone's the trusted tree experts?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30">
              <h4 className="font-extrabold text-lg text-emerald-300">✓ Fully Insured</h4>
              <p className="text-sm text-slate-300">Complete property protection with full public liability insurance ($20 million cover).</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30">
              <h4 className="font-extrabold text-lg text-emerald-300">✓ Council Permit Experts</h4>
              <p className="text-sm text-slate-300">Expert guidance on Victoria's council laws and planning permit applications.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30">
              <h4 className="font-extrabold text-lg text-emerald-300">✓ Safety First</h4>
              <p className="text-sm text-slate-300">Rigorous safety assessments before climbing or starting any rigging operations.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30">
              <h4 className="font-extrabold text-lg text-emerald-300">✓ Qualified Arborists</h4>
              <p className="text-sm text-slate-300">Expertise in tree health, pruning standards (AS4373), and emergency felling.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30">
              <h4 className="font-extrabold text-lg text-emerald-300">✓ Eco-Friendly Recycling</h4>
              <p className="text-sm text-slate-300">We recycle tree material into nutrient-rich mulches for gardens and community spaces.</p>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-[#036829]/20 border border-emerald-700/30">
              <h4 className="font-extrabold text-lg text-emerald-300">✓ High-End Equipment</h4>
              <p className="text-sm text-slate-300">Modern chippers, high-access platforms, and heavy transport trucks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 lg:py-28 bg-[#fdfdfd]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Meet Our Happy Customers
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-yellow-500 font-bold text-lg">
              ★★★★★ <span className="text-slate-800 text-sm ml-2">5.0 Star Google Rating</span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-slate-600 text-sm italic">"Highly recommend Milone's Tree Solutions. They removed 3 large trees from my backyard. Safe, clean, and very competitively priced!"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">DK</div>
                <span className="font-bold text-xs text-slate-800">David K.</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-slate-600 text-sm italic">"Professional crew, turned up on time, ground down all stumps and cleaned up so well you wouldn't even know they had been there. Fantastic job."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">SM</div>
                <span className="font-bold text-xs text-slate-800">Sarah M.</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-slate-600 text-sm italic">"I have used Milone's twice now. They are extremely careful and did a wonderful job lopping the gum tree overhanging our roof."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">JL</div>
                <span className="font-bold text-xs text-slate-800">John L.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Service Regions */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left side: Map representation */}
            <div className="lg:col-span-6 bg-slate-200 h-[380px] rounded-3xl overflow-hidden relative shadow-inner">
              {/* Fallback image of a map layout */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-60 mix-blend-multiply" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-emerald-950/20 text-slate-900">
                <span className="text-3xl mb-3">📍</span>
                <h4 className="font-extrabold text-xl text-emerald-950">Servicing All Greater Melbourne & Suburbs</h4>
                <p className="text-sm mt-1 text-slate-800 max-w-xs font-semibold">104+ target suburbs serviced with fast-response arborist teams.</p>
              </div>
            </div>

            {/* Right side: Details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#036829] font-black uppercase tracking-wider text-sm">Where We Work</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Rapid Tree Services Across Melbourne & Surrounding Regions
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Whether you need tree removal in Werribee, stump grinding in Geelong, or emergency pruning in Box Hill, we have localized crews ready to respond.
              </p>
              <div className="pt-4">
                <Link
                  href="/service-areas"
                  className="inline-flex items-center justify-center rounded-full bg-[#036829] hover:bg-emerald-800 text-white font-extrabold px-8 py-3.5 shadow-md transition-all"
                >
                  View Service Areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Row Showcase */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center space-y-8">
          <h3 className="font-black text-2xl text-slate-900 tracking-tight">Recent Work & Machinery Showcase</h3>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            <div className="h-60 rounded-2xl overflow-hidden shadow-sm relative group">
              <Image src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800" alt="Arborist at work" fill className="object-cover group-hover:scale-105 transition-all duration-300" />
            </div>
            <div className="h-60 rounded-2xl overflow-hidden shadow-sm relative group">
              <Image src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800" alt="Stump grinder machinery" fill className="object-cover group-hover:scale-105 transition-all duration-300" />
            </div>
            <div className="h-60 rounded-2xl overflow-hidden shadow-sm relative group col-span-2 md:col-span-1">
              <Image src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=800" alt="Chipped wood mulcher" fill className="object-cover group-hover:scale-105 transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Callout Banner */}
      <section className="relative py-24 bg-emerald-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-25 mix-blend-overlay" />
        
        <div className="relative mx-auto max-w-4xl px-4 space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-5xl">Reach out to Milone's today!</h2>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">Get absolute peace of mind for your tree issues. Get a quote or talk to an arborist now.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/book-quote" className="rounded-full bg-emerald-500 hover:bg-emerald-400 px-8 py-4 font-extrabold text-emerald-950 shadow-lg">Request a Free Quote</Link>
            <a href="tel:0426204514" className="rounded-full border-2 border-white px-8 py-4 font-bold hover:bg-white/10 transition-colors">Call 0426 204 514</a>
          </div>
        </div>
      </section>

      {/* Footer (Dark Green) */}
      <footer className="bg-[#023313] text-slate-300 py-16 border-t border-emerald-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Info */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="Milone's Tree Solutions"
              width={200}
              height={36}
              className="brightness-0 invert object-contain"
            />
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Melbourne's leading arborist and tree removal services. We provide high-quality, professional solutions with focus on safety, customer service, and environment.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-extrabold mb-4 text-sm uppercase tracking-wider">Quick Navigation</h4>
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
            <h4 className="text-white font-extrabold mb-4 text-sm uppercase tracking-wider">Our Core Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/tree-removal" className="hover:text-white transition-colors">Professional Tree Removal</Link></li>
              <li><Link href="/services/stump-grinding" className="hover:text-white transition-colors">Stump Grinding & Removal</Link></li>
              <li><Link href="/services/palm-tree-removal" className="hover:text-white transition-colors">Palm Tree Cleaning & Removal</Link></li>
              <li><Link href="/services/arborist-reports" className="hover:text-white transition-colors">Certified Arborist Reports</Link></li>
              <li><Link href="/services/tree-pruning-lopping" className="hover:text-white transition-colors">Tree Lopping & Maintenance</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div>
            <h4 className="text-white font-extrabold mb-4 text-sm uppercase tracking-wider">Contact Information</h4>
            <ul className="space-y-3 text-xs">
              <li>📍 Factory 8 61/65 Russell St, Werribee VIC 3030</li>
              <li>📞 Phone: <a href="tel:0426204514" className="hover:text-white font-semibold">0426 204 514</a></li>
              <li>✉️ Email: <a href="mailto:milonesgroup@gmail.com" className="hover:text-white">milonesgroup@gmail.com</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-16 pt-8 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Milone's Tree Solutions. All rights reserved. Created in Next.js.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">ABN: 67 608 227 343</span>
            <span className="text-slate-400">Fully Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
