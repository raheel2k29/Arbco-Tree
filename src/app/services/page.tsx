import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/locationData';

export const metadata = {
  title: 'Arborist Services Townsville | Arbco Tree Solutions',
  description:
    'Comprehensive tree care, removal, stump grinding, palm maintenance, and land clearing across all 97 Greater Townsville suburbs. Fully insured Level 5 qualified arborists.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-[#051c0e] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
        
        <div className="max-w-[1440px] mx-auto relative z-10 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-xs text-slate-400 gap-2 mb-4 font-medium">
            <Link href="/" className="hover:text-[#7cc043] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7cc043] font-bold">Services</span>
          </div>

          <span className="text-[#7cc043] font-black uppercase tracking-widest text-xs sm:text-sm block font-heading">
            TOWNSVILLE'S TRUSTED ARBORISTS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
            Our Professional Tree Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From tight-access residential palm trimming to large-scale commercial land clearing and 24/7 storm response, we provide certified, fully insured arborist solutions across North Queensland.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.localImage || service.heroImage}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#051c0e]/80 backdrop-blur-sm text-[#7cc043] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#7cc043]/30">
                    {service.tag || 'PROFESSIONAL SERVICE'}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#036829] font-heading transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#036829] hover:underline font-heading"
                >
                  <span>Explore Service</span>
                  <span>→</span>
                </Link>
                <a
                  href="tel:0426204514"
                  className="text-xs text-slate-400 hover:text-[#036829] transition-colors flex items-center gap-1 font-medium"
                >
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          ))}

          {/* Contact Assistance Card */}
          <div className="bg-[#0b1f10] text-white rounded-3xl p-8 border border-[#0b1f10] shadow-xl flex flex-col justify-between text-left relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-[#7cc043] text-lg">
                🌿
              </span>
              <h3 className="text-2xl font-extrabold font-heading">
                Need Custom Tree Work?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Have a complex arborist report requirement, multiple large trees, or need urgent storm clearing? Our Level 5 arborists are on call.
              </p>
            </div>

            <div className="pt-6 relative z-10 space-y-3">
              <a
                href="tel:0426204514"
                className="w-full quote-btn-gradient rounded-xl py-3.5 text-xs sm:text-sm font-extrabold text-white flex items-center justify-center gap-2 shadow-lg"
              >
                Call 0426 204 514
              </a>
              <Link
                href="/#quote"
                className="w-full inline-flex items-center justify-center py-3 text-xs font-bold text-slate-300 hover:text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all"
              >
                Request an On-Site Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Link Callout */}
      <section className="py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Looking for Services in Your Specific Suburb?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            We provide prompt arborist solutions across all 97 Greater Townsville suburbs, from Castle Hill and Belgian Gardens to Kirwan, Bushland Beach, and Magnetic Island.
          </p>
          <div className="pt-2">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 rounded-xl bg-[#036829] hover:bg-[#025320] text-white px-7 py-3.5 text-sm font-extrabold font-heading shadow-md transition-all"
            >
              <span>Explore the Service Areas Directory</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
