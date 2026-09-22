import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Arbco Tree Solutions',
  description: 'Terms & Conditions for Arbco Tree Solutions arborist, tree removal, and site maintenance services in Townsville QLD.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 py-32 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
        <div>
          <Link href="/" className="text-xs font-bold text-[#036829] hover:underline font-heading">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-3">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">1. General Terms</h2>
            <p>
              By accessing our website or engaging Arbco Tree Solutions for tree removal, lopping, stump grinding, pruning, or land clearing services, you agree to comply with and be bound by these terms and conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">2. Quotes & Estimates</h2>
            <p>
              All quotations provided are valid for 30 days unless otherwise agreed in writing. Quotations are based on visual on-site assessments and assume free and safe access to work areas. Additional work requested or unforeseen subterranean/overhead obstacles may be subject to additional fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">3. Council Approvals & Permits</h2>
            <p>
              While Arbco Tree Solutions can assist in advising on Townsville City Council guidelines and tree preservation orders, the property owner is ultimately responsible for ensuring any legally mandatory vegetation permits or neighbor boundary approvals are in place prior to commencement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">4. Insurance & Liability</h2>
            <p>
              Arbco Tree Solutions holds current $20 Million Public Liability Insurance and WorkCover Queensland insurance. All operations are conducted in strict accordance with Australian Standards (AS4373-2007) and Workplace Health & Safety regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">5. Contact Information</h2>
            <p>
              For inquiries regarding service contracts or our terms:
            </p>
            <p className="font-semibold text-slate-800">
              Arbco Tree Solutions<br />
              Email: <a href="mailto:info@arbcotree.com.au" className="text-[#036829] hover:underline">info@arbcotree.com.au</a><br />
              Phone: <a href="tel:0426204514" className="text-[#036829] hover:underline">0426 204 514</a><br />
              Townsville, Queensland, Australia
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
