import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Arbco Tree Solutions',
  description: 'Privacy Policy for Arbco Tree Solutions. Learn how we handle and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 py-32 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
        <div>
          <Link href="/" className="text-xs font-bold text-[#036829] hover:underline font-heading">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">1. Introduction</h2>
            <p>
              Arbco Tree Solutions (“we”, “us”, or “our”) is committed to protecting the privacy of our customers and website visitors. This policy outlines how we collect, use, and protect your personal information in accordance with the Australian Privacy Principles (APPs) and the Privacy Act 1988 (Cth).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">2. Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when requesting a quote or contacting us, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Phone number and email address</li>
              <li>Property address or suburb in the Greater Townsville region</li>
              <li>Details, images, or notes regarding tree work requirements</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">3. How We Use Your Information</h2>
            <p>We use your information solely to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide on-site inspections, written quotes, and deliver arborist services</li>
              <li>Respond to inquiries, phone calls, and emergency service requests</li>
              <li>Comply with workplace safety, council permit, and insurance reporting standards</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 font-heading">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to access or update your information, please contact us at:
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
