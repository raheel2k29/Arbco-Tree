"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services, allSuburbs } from '@/lib/locationData';

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    suburb: '',
    service: 'tree-removal',
    urgency: 'normal',
    details: '',
  });

  useEffect(() => {
    if (serviceParam && services.some(s => s.id === serviceParam)) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [serviceParam]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate swift confirmation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-32 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-slate-400 gap-2 mb-6 font-medium">
          <Link href="/" className="hover:text-[#7cc043] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#036829] font-bold">Request a Free Quote</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#051c0e] text-white p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#7cc043] via-transparent to-transparent" />
            <div className="relative z-10 space-y-3">
              <span className="text-[#7cc043] font-bold text-xs uppercase tracking-widest block font-heading">
                🌿 FREE, FAST & NO OBLIGATION
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
                Request Your Free Arborist Quote
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Tell us about your tree care needs. Our qualified Townsville arborists provide prompt on-site assessments and competitive, all-inclusive pricing.
              </p>
            </div>
          </div>

          {/* Form / Confirmation Body */}
          <div className="p-8 sm:p-12">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-[#036829] rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
                  ✓
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Quote Request Received!
                  </h2>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. We have received your request for{' '}
                    <span className="font-bold text-[#036829]">
                      {services.find((s) => s.id === formData.service)?.name || 'Arborist Services'}
                    </span>{' '}
                    in <span className="font-bold text-slate-900">{formData.suburb || 'Townsville'}</span>.
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    One of our certified team members will review your details and call you back at{' '}
                    <span className="font-bold text-slate-800">{formData.phone}</span> within 2 business hours.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:0426204514"
                    className="quote-btn-gradient rounded-xl px-7 py-3.5 text-sm font-extrabold text-white flex items-center gap-2 shadow-md"
                  >
                    <span>Need Immediate Response? Call 0426 204 514</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        suburb: '',
                        service: 'tree-removal',
                        urgency: 'normal',
                        details: '',
                      });
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-[#036829] underline"
                  >
                    Submit another quote request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Contact Information */}
                <div>
                  <h3 className="text-sm font-bold text-[#036829] uppercase tracking-wider font-heading mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#7cc043]" />
                    1. Your Contact Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. David Smith"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#036829] focus:outline-none text-sm transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0426 000 000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#036829] focus:outline-none text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. david@example.com.au"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#036829] focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Step 2: Location & Service */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-[#036829] uppercase tracking-wider font-heading mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#7cc043]" />
                    2. Service & Property Location
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Townsville Suburb *</label>
                      <input
                        type="text"
                        required
                        list="townsville-suburbs"
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        placeholder="e.g. Annandale, Kirwan, Aitkenvale..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#036829] focus:outline-none text-sm transition-colors"
                      />
                      <datalist id="townsville-suburbs">
                        {allSuburbs.map((sub, i) => (
                          <option key={i} value={sub} />
                        ))}
                      </datalist>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Service Required *</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#036829] focus:outline-none text-sm transition-colors appearance-none"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Urgency</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'emergency', label: '🚨 Urgent / Storm Damage' },
                        { id: 'soon', label: '📅 Within 48 Hours' },
                        { id: 'normal', label: '🌿 Flexible Schedule' },
                      ].map((urg) => (
                        <button
                          key={urg.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: urg.id })}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                            formData.urgency === urg.id
                              ? 'border-[#036829] bg-[#f4fbf6] text-[#036829]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {urg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3: Job Description */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-[#036829] uppercase tracking-wider font-heading mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#7cc043]" />
                    3. Job Details
                  </h3>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Description of Tree(s) / Access Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Please mention approximate tree height, species (if known), location on property, fence or pool access restrictions, or powerline proximity..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#036829] focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full quote-btn-gradient rounded-xl py-4 text-sm font-extrabold text-white shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <span>Submit My Free Quote Request</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                <div className="text-center text-xs text-slate-400 space-y-1">
                  <p>🔒 Your personal details are completely private and safe with us.</p>
                  <p>
                    Prefer to speak with an arborist right away? Call{' '}
                    <a href="tel:0426204514" className="text-[#036829] font-bold hover:underline">
                      0426 204 514
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-heading text-slate-500">Loading quote form...</div>}>
      <QuoteFormContent />
    </Suspense>
  );
}
