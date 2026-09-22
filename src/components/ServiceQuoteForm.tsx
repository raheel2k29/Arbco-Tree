"use client";

import React, { useState } from 'react';

export default function ServiceQuoteForm({ serviceName }: { serviceName: string }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    suburb: '',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-[#051c0e] text-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-[#7cc043]/20 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4 mb-8">
        <span className="text-[#7cc043] font-bold text-xs uppercase tracking-widest font-heading">
          FAST RESPONSE GUARANTEED
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold font-heading">
          Request a Free Quote for {serviceName}
        </h3>
        <p className="text-slate-300 text-sm">
          Fill in your details below and our team will get in touch promptly with an accurate estimate.
        </p>
      </div>

      {submitted ? (
        <div className="relative z-10 max-w-md mx-auto py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-[#7cc043]/20 text-[#7cc043] border border-[#7cc043]/40 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-inner">
            ✓
          </div>
          <h4 className="text-2xl font-extrabold text-white font-heading">
            Quote Request Received!
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Thank you, <span className="font-bold text-white">{formData.name}</span>. We've received your request for{' '}
            <span className="font-bold text-[#7cc043]">{serviceName}</span> in{' '}
            <span className="font-bold text-white">{formData.suburb}</span>.
          </p>
          <p className="text-slate-400 text-xs">
            We will call you at <span className="font-bold text-white">{formData.phone}</span> within 2 business hours.
          </p>
          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', suburb: '', details: '' });
              }}
              className="text-xs text-[#7cc043] font-bold hover:underline"
            >
              Submit another quote request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4 max-w-xl mx-auto text-left">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. David Smith"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7cc043] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 0400 000 000"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7cc043] text-sm"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Suburb *
              </label>
              <input
                type="text"
                required
                value={formData.suburb}
                onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                placeholder="e.g. Annandale, QLD"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7cc043] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Selected Service
              </label>
              <input
                type="text"
                readOnly
                value={serviceName}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#7cc043] font-bold text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Job Description / Details
            </label>
            <textarea
              rows={3}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Tell us about the tree species, size, location, access restrictions, or urgency..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7cc043] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full quote-btn-gradient rounded-xl py-4 font-extrabold text-sm text-white shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? <span>Submitting...</span> : <span>Submit Quote Request →</span>}
          </button>

          <p className="text-center text-[11px] text-slate-400 pt-2">
            Prefer to speak directly? Call{' '}
            <a href="tel:0426204514" className="text-[#7cc043] font-bold hover:underline">
              0426 204 514
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
