import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogArticles, getBlogArticle } from '@/lib/blogData';
import { services, slugify } from '@/lib/locationData';
import { SITE_URL, BUSINESS_NAME, BUSINESS_PHONE_INTL, BUSINESS_EMAIL } from '@/lib/schemaStructuredData';

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getBlogArticle(resolvedParams.slug);

  if (!article) {
    return { title: 'Article Not Found | Arbco Tree Services' };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `https://arbco-tree.vercel.app/blog/${article.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getBlogArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Get other articles for cross-linking
  const otherArticles = blogArticles.filter((a) => a.slug !== article.slug);

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: article.image,
    datePublished: '2026-10-12T00:00:00+10:00',
    dateModified: '2026-10-18T00:00:00+10:00',
    author: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Arborist Guides',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/blog/${article.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-[#051c0e] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center text-xs text-slate-400 gap-2 font-medium flex-wrap">
            <Link href="/" className="hover:text-[#7cc043] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#7cc043] transition-colors">Arborist Guides</Link>
            <span>/</span>
            <span className="text-[#7cc043] font-semibold truncate max-w-xs">{article.category}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7cc043]/20 border border-[#7cc043]/30 text-[#7cc043] text-xs font-bold tracking-widest uppercase">
            <span>🌿</span> {article.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2 border-t border-white/10 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7cc043]" />
              <span className="font-semibold text-white">{article.author}</span>
            </div>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12 space-y-10">
        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Container */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-8 font-sans">
          {/* Intro Section */}
          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {article.content.intro.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Quick Table of Contents */}
          <div className="bg-[#f4fbf6] rounded-2xl p-6 border border-[#7cc043]/30 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#036829] font-heading block">
              In This Guide:
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {article.content.sections.map((section, sIdx) => (
                <li key={sIdx} className="flex items-center gap-2 text-slate-700">
                  <span className="text-[#7cc043] font-bold">›</span>
                  <span>{section.heading}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Content Sections */}
          <div className="space-y-10 pt-4 border-t border-slate-100">
            {article.content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-700 leading-relaxed text-base sm:text-lg">
                    {p}
                  </p>
                ))}

                {/* Callout Box linking to Services or Suburbs */}
                {sec.callout && (
                  <div className="my-6 p-6 rounded-2xl bg-emerald-50/70 border border-[#7cc043]/40 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-[#036829] font-extrabold font-heading text-base">
                      <span>{sec.callout.type === 'warning' ? '⚠️' : '🌿'}</span>
                      <span>{sec.callout.title}</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {sec.callout.text}
                    </p>
                    {sec.callout.linkHref && sec.callout.linkLabel && (
                      <div className="pt-2">
                        <Link
                          href={sec.callout.linkHref}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#036829] hover:underline font-heading"
                        >
                          <span>{sec.callout.linkLabel}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Conclusion */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              Summary & Final Advice
            </h3>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              {article.content.conclusion}
            </p>
          </div>

          {/* Strategic Internal Links: Related Core Services */}
          <div className="pt-8 border-t border-slate-100 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 font-heading">
              Related Townsville Tree Services
            </h4>
            <div className="flex flex-wrap gap-2">
              {article.relatedServices.map((serviceId) => {
                const s = services.find((item) => item.id === serviceId);
                if (!s) return null;
                return (
                  <Link
                    key={s.id}
                    href={`/services/${s.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#036829] text-slate-800 hover:text-white transition-colors text-xs font-bold font-heading"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px]">→</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Strategic Internal Links: Featured Suburbs */}
          <div className="pt-4 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 font-heading">
              Active Service Suburbs Mentioned
            </h4>
            <div className="flex flex-wrap gap-2">
              {article.featuredSuburbs.map((suburb) => {
                const primaryService = article.relatedServices[0] || 'tree-removal';
                return (
                  <Link
                    key={suburb}
                    href={`/service-areas/${primaryService}-${slugify(suburb)}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-[#036829] hover:text-[#036829] transition-colors text-xs font-semibold"
                  >
                    <span>📍 {suburb}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </article>

        {/* Arborist On-Site Consultation Card */}
        <div className="bg-[#051c0e] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#7cc043]/30 text-center relative overflow-hidden space-y-4">
          <span className="text-3xl block">🌿</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Need Expert Tree Care on Your Property?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Our qualified team is on call across all 97 Greater Townsville suburbs with $20M liability insurance, precision climbers, and heavy machinery.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
            <a
              href="tel:0456579811"
              className="quote-btn-gradient rounded-xl px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white flex items-center gap-2 shadow-md"
            >
              Call 0456 579 811
            </a>
            <Link
              href="/quote"
              className="rounded-xl px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white border border-white/20 hover:bg-white/10 transition-all font-heading"
            >
              Request a Free Quote →
            </Link>
          </div>
        </div>

        {/* Other Guides Carousel / Grid */}
        <div className="space-y-6 pt-8">
          <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
            More Helpful Arborist Guides
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {otherArticles.slice(0, 2).map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#036829] font-heading block mb-2">
                    {other.category}
                  </span>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-[#036829] font-heading text-base leading-snug transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {other.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#036829] group-hover:underline">
                  <span>Read Guide</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
