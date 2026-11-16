"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GOOGLE_MAPS_REVIEW_URL, GoogleReviewItem, GoogleReviewsResponse } from "@/lib/googleReviews";

export default function GoogleReviewsSection() {
  const [data, setData] = useState<GoogleReviewsResponse>({
    googleMapsUri: GOOGLE_MAPS_REVIEW_URL,
    reviews: [],
    isFallback: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const json: GoogleReviewsResponse = await res.json();
          if (isMounted && json) {
            setData(json);
          }
        }
      } catch (err) {
        console.warn("Could not fetch live Google reviews, using verified rating fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const mapsUrl = data.googleMapsUri || GOOGLE_MAPS_REVIEW_URL;

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase">
            {/* Google Multicolor G Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Verified Google Reviews</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 font-heading">
            What Our Townsville Customers Say
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto">
            Authentic feedback from local homeowners and property managers across Greater Townsville.
          </p>

          {/* Dynamic Rating Summary Bar (Rendered ONLY when returned from Google Places API) */}
          {typeof data.rating === "number" && typeof data.userRatingCount === "number" && (
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-4 py-2 rounded-2xl">
                <span className="text-2xl font-black text-slate-900">{data.rating.toFixed(1)}</span>
                <div className="flex text-amber-400 text-lg leading-none" aria-label={`${data.rating} out of 5 stars`}>
                  {"★".repeat(Math.round(data.rating))}
                </div>
              </div>

              <div className="text-left text-xs sm:text-sm text-slate-600 font-medium">
                <div className="font-bold text-slate-900">
                  {data.userRatingCount === 1 ? "1 Verified Review" : `${data.userRatingCount} Verified Reviews`}
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <span>on Google Maps</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Review Cards Grid */}
        {data.reviews && data.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            {data.reviews.map((rev, idx) => (
              <ReviewCard key={rev.id || idx} review={rev} mapsUrl={mapsUrl} />
            ))}
          </div>
        ) : (
          /* Clean Card linking to Google Maps reviews */
          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Verified Customer Feedback on Google
              </h3>
              <p className="text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
                See authentic customer reviews, ratings, and job photos directly on our verified Google Maps business listing.
              </p>
            </div>
            <div className="pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-colors shadow-sm"
              >
                <span>Read Our Google Reviews</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* CTA Link to Google Maps Reviews (Requirement 9) */}
        {data.reviews && data.reviews.length > 0 && (
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#036829] hover:bg-[#025220] text-white font-extrabold text-sm sm:text-base transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
              <span>Read Our Google Reviews</span>
              <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
              <span>Powered by</span>
              <span className="font-bold text-slate-700">Google</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review, mapsUrl }: { review: GoogleReviewItem; mapsUrl: string }) {
  const [imageError, setImageError] = useState(false);
  const initials = (review.authorName || "C")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const authorLink = review.authorUri || mapsUrl;
  const reviewLink = review.googleMapsUri || mapsUrl;

  return (
    <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        {/* Star Rating & Google Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400 text-base">
            {"★".repeat(Math.round(review.rating || 5))}
          </div>

          <a
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            title="View verified review on Google"
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </a>
        </div>

        {/* Review Text */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans italic">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Review Author Attribution (Requirement 8) */}
      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
        <a
          href={authorLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          {review.authorPhoto && !imageError ? (
            <Image
              src={review.authorPhoto}
              alt={review.authorName}
              width={40}
              height={40}
              onError={() => setImageError(true)}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 border border-emerald-200">
              {initials}
            </div>
          )}

          <div className="text-left font-sans">
            <span className="block font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              {review.authorName}
            </span>
            <span className="block text-xs text-slate-500">
              {review.relativePublishTimeDescription}
            </span>
          </div>
        </a>

        {/* Verified on Google Badge */}
        <a
          href={reviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
        >
          <span>Verified</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
