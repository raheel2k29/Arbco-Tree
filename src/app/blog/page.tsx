import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogArticles } from '@/lib/blogData';

export const metadata = {
  title: 'Arborist Guides & Advice | Arbco Tree Services Townsville',
  description:
    'Expert arborist advice for Townsville homeowners. Pre-cyclone tree safety, Townsville City Council tree permits, stump grinding comparisons, and tropical palm care.',
  alternates: {
    canonical: 'https://arbco-tree.vercel.app/blog',
  },
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-[#051c0e] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        
        <div className="max-w-[1440px] mx-auto relative z-10 space-y-4">
          <div className="flex items-center justify-center text-xs text-slate-400 gap-2 mb-2 font-medium">
            <Link href="/" className="hover:text-[#7cc043] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7cc043] font-bold">Arborist Guides</span>
          </div>

          <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading">
            TOWNSVILLE TREE CARE & COMPLIANCE
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
            Arborist Advice & Local Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practical advice from qualified North Queensland arborists on cyclone readiness, Townsville City Council vegetation regulations, stump removal, and tropical palm care.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {blogArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#051c0e]/85 backdrop-blur-sm text-[#7cc043] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#7cc043]/30">
                    {article.category}
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span className="text-[#036829] font-semibold">{article.author}</span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#036829] font-heading transition-colors leading-snug">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#036829] group-hover:text-[#024a1d] font-heading hover:underline"
                >
                  <span>Read Full Guide</span>
                  <span>→</span>
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>🌿 Local QLD Advice</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Free Consultation Banner */}
        <div className="mt-16 bg-[#0b1f10] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl border border-emerald-900/40">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[#7cc043] font-bold text-xs uppercase tracking-widest font-heading">
              NEED PROFESSIONAL ADVICE ON-SITE?
            </span>
            <h3 className="text-3xl font-extrabold font-heading">
              Have a Specific Tree Question or Safety Concern?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our Level 5 certified arborists are active across all 97 Greater Townsville suburbs daily. We provide fast hazard assessments, honest advice, and transparent upfront quotes.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="tel:0456579811"
                className="quote-btn-gradient rounded-xl px-7 py-3.5 text-sm font-extrabold text-white flex items-center gap-2 shadow-lg"
              >
                <span>Call 0456 579 811</span>
              </a>
              <Link
                href="/quote"
                className="rounded-xl px-7 py-3.5 text-sm font-extrabold text-white border border-white/20 hover:bg-white/10 transition-all font-heading"
              >
                Request a Free Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
