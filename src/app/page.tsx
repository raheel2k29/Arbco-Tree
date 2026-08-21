import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top emergency bar */}
      <div className="bg-emerald-950 text-emerald-300 py-2.5 px-4 text-center text-xs font-semibold uppercase tracking-wider sm:text-sm">
        ⚠️ Need Emergency Tree Work? Call us 24/7 on <a href="tel:0426204514" className="text-white underline hover:text-emerald-100">0426 204 514</a>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex items-center gap-2">
            {/* Tree Icon */}
            <svg className="h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3L7 8h10L12 3zm0 6l-5 5h10l-5-5zm0 6l-5 5h10l-5-5z" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-emerald-900">
              Milone's <span className="text-emerald-700">Tree Solutions</span>
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <Link href="/" className="text-emerald-700">Home</Link>
            <Link href="/about" className="hover:text-emerald-700 transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-emerald-700 transition-colors">Services</Link>
            <Link href="/faq" className="hover:text-emerald-700 transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-emerald-700 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:0426204514"
              className="hidden items-center gap-2 rounded-full border-2 border-emerald-700 px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50 md:flex transition-colors"
            >
              📞 0426 204 514
            </a>
            <Link
              href="/book-quote"
              className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-800 transition-all"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 to-slate-900/90" />
        
        {/* Abstract design elements */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-700/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block rounded-full bg-emerald-500/20 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                ⭐ Fully Insured & Certified Arborists
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
                Melbourne's Trusted <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  Tree Removal & Arborist
                </span> Experts
              </h1>
              <p className="max-w-xl text-lg text-slate-300 leading-relaxed">
                Specialising in safe tree removal, stump grinding, tree pruning, and arborist assessments across Melbourne and regional Victoria. With 15+ years of experience, we tackle any job safely and professionally.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/book-quote"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-600 px-8 text-base font-bold text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Request a Free Quote
                </Link>
                <a
                  href="tel:0426204514"
                  className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/20 px-8 text-base font-bold text-white hover:bg-white/10 hover:border-white transition-all"
                >
                  📞 Call Emergency Crew
                </a>
              </div>

              {/* Trust badges */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-xs font-semibold text-slate-300">Fully Insured<br />$20M Cover</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👷</span>
                  <span className="text-xs font-semibold text-slate-300">Qualified<br />Arborists</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xs font-semibold text-slate-300">5-Star Google<br />Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪓</span>
                  <span className="text-xs font-semibold text-slate-300">15+ Years<br />Experience</span>
                </div>
              </div>
            </div>

            {/* Visual card element on the right */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl bg-slate-800/80 border border-slate-700 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                <h3 className="text-xl font-bold text-white">Get a Quick Quote</h3>
                <p className="text-sm text-slate-400 mb-6">Fill in details for a prompt response within 2 hours.</p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Your Name</label>
                    <input type="text" className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Phone Number</label>
                    <input type="text" className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="0400 000 000" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Service Needed</label>
                    <select className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                      <option>Tree Removal</option>
                      <option>Stump Grinding</option>
                      <option>Palm Tree Removal</option>
                      <option>Pruning & Lopping</option>
                      <option>Arborist Report</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3.5 font-bold transition-all text-white shadow-md">Submit Quote Request</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-emerald-700 font-bold uppercase tracking-wider text-sm">Professional Tree Services</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Our Certified Arborist Solutions
            </h2>
            <p className="text-slate-600 text-lg">
              We provide professional, environment-friendly tree care services tailored to your property's needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Service 1 */}
            <div className="group rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">🌲</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Tree Removal</h3>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                Safe, expert removal of hazardous, dead, or unwanted trees from residential and commercial properties. Fully equipped.
              </p>
              <Link href="/services/tree-removal" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-600">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="group rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">⚙️</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Stump Grinding</h3>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                Complete grinding and removal of unsightly or dangerous tree stumps to clear space for landscaping and prevent pests.
              </p>
              <Link href="/services/stump-grinding" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-600">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="group rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">🌴</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Palm Tree Removal</h3>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                Specialist palm tree extraction, shaving, and cleaning. Safely dealing with messy seed pods and spikes.
              </p>
              <Link href="/services/palm-tree-removal" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-600">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service 4 */}
            <div className="group rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">✂️</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Tree Pruning & Lopping</h3>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                Enhance tree health, shape, and structure while removing hazardous overhanging branches near house lines.
              </p>
              <Link href="/services/tree-pruning-lopping" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-600">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service 5 */}
            <div className="group rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">📋</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Arborist Reports</h3>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                Comprehensive health assessments, hazard checks, and documentation for council permit submissions.
              </p>
              <Link href="/services/arborist-reports" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-600">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Service 6 */}
            <div className="group rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-2xl">🚨</div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">24/7 Emergency Tree Care</h3>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                Urgent tree cleanup and extraction following heavy storms, wind, or sudden structural failures. Call anytime.
              </p>
              <Link href="/services/emergency-tree-removal" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-red-700 hover:text-red-600">
                Call Emergency <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-emerald-950 text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Why Choose Milone's</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Melbourne’s Gold Standard in Professional Tree Care
              </h2>
              <p className="text-emerald-100 text-lg leading-relaxed">
                We handle every domestic and commercial job with absolute safety, efficiency, and respect for your property. 
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-emerald-300 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-white text-base">Full $20 Million Public Liability Insurance</h4>
                    <p className="text-emerald-200/80 text-sm mt-1">Total peace of mind knowing you and your assets are completely protected.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-emerald-300 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-white text-base">State-of-the-Art Tree Care Machinery</h4>
                    <p className="text-emerald-200/80 text-sm mt-1">High-reach tower trucks, commercial wood chippers, and compact stump grinders.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-emerald-300 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-white text-base">Eco-Friendly Recycling</h4>
                    <p className="text-emerald-200/80 text-sm mt-1">We turn green waste into high-quality organic garden mulch, preventing landfill waste.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side illustration / trust badge box */}
            <div className="lg:col-span-6 bg-emerald-900/50 rounded-3xl p-8 border border-emerald-800/80 space-y-6">
              <h3 className="text-xl font-bold">What Our Clients Say</h3>
              <div className="space-y-6">
                <div className="bg-emerald-950/60 p-6 rounded-2xl border border-emerald-800/60 relative">
                  <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
                  <p className="text-slate-200 text-sm italic">"Highly recommend Milone's Tree Solutions. They removed 3 large trees from my backyard. Safe, clean, and very competitively priced!"</p>
                  <p className="text-emerald-300 font-bold text-xs mt-4">— David K., Werribee</p>
                </div>
                <div className="bg-emerald-950/60 p-6 rounded-2xl border border-emerald-800/60 relative">
                  <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
                  <p className="text-slate-200 text-sm italic">"Professional crew, turned up on time, ground down all stumps and cleaned up so well you wouldn't even know they had been there. Fantastic job."</p>
                  <p className="text-emerald-300 font-bold text-xs mt-4">— Sarah M., Geelong</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Form */}
      <section className="py-20 lg:py-28 text-center bg-slate-100">
        <div className="mx-auto max-w-5xl px-4 space-y-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900">Ready to clear your backyard?</h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">Get in touch with Milone’s Tree Solutions today for a fully free, zero-obligation assessment and written quote.</p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href="/book-quote" className="rounded-full bg-emerald-700 hover:bg-emerald-800 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-800/20">Book a Free Consultation</Link>
            <a href="tel:0426204514" className="rounded-full bg-white hover:bg-slate-50 border border-slate-300 px-8 py-4 font-bold text-slate-800 shadow-sm">Call 0426 204 514</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Milone's Tree Solutions</h3>
            <p className="text-sm">Melbourne's premier tree removal and arborist solutions company. Fully certified, clean, and insured.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services Directory</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/tree-removal" className="hover:text-white transition-colors">Tree Removal</Link></li>
              <li><Link href="/services/stump-grinding" className="hover:text-white transition-colors">Stump Grinding</Link></li>
              <li><Link href="/services/palm-tree-removal" className="hover:text-white transition-colors">Palm Tree Care</Link></li>
              <li><Link href="/services/arborist-reports" className="hover:text-white transition-colors">Arborist Reports</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact Info</h4>
            <p className="text-sm">📍 Factory 8 61/65 Russell St, Werribee VIC 3030</p>
            <p className="text-sm mt-2">📞 Phone: <a href="tel:0426204514" className="hover:text-white">0426 204 514</a></p>
            <p className="text-sm mt-2">✉️ Email: <a href="mailto:milonesgroup@gmail.com" className="hover:text-white">milonesgroup@gmail.com</a></p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Milone's Tree Solutions. All rights reserved. Created in Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
