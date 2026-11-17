"use client";

import { useState, useEffect, type CSSProperties } from "react";

type Review = {
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  googleMapsUri?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type Place = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Review[];
};

const card: CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 20,
  background: "#fff",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
};

function Stars({ rating }: { rating: number }) {
  const count = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      style={{ color: "#e7a300", letterSpacing: 2 }}
    >
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default function GoogleReviews() {
  const [place, setPlace] = useState<Place>({
    displayName: { text: "Arbco Tree Services" },
    googleMapsUri:
      "https://search.google.com/local/reviews?placeid=ChIJG-YJIXv51WsR13gvhrSbQYA",
    reviews: [],
  });

  useEffect(() => {
    let isMounted = true;
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setPlace({
              displayName: { text: data.businessName || "Arbco Tree Services" },
              rating: typeof data.rating === "number" ? data.rating : undefined,
              userRatingCount:
                typeof data.userRatingCount === "number"
                  ? data.userRatingCount
                  : undefined,
              googleMapsUri:
                data.googleMapsUri ||
                "https://search.google.com/local/reviews?placeid=ChIJG-YJIXv51WsR13gvhrSbQYA",
              reviews: (data.reviews || []).map((r: any) => ({
                rating: r.rating,
                text: { text: typeof r.text === "string" ? r.text : r.text?.text },
                relativePublishTimeDescription: r.relativePublishTimeDescription,
                googleMapsUri: r.googleMapsUri,
                authorAttribution: {
                  displayName: r.authorAttribution?.displayName || r.authorName,
                  uri: r.authorAttribution?.uri || r.authorUrl,
                  photoUri: r.authorAttribution?.photoUri || r.profilePhotoUrl,
                },
              })),
            });
          }
        }
      } catch (err) {
        console.warn("Google Reviews unavailable", err);
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const reviews = place.reviews ?? [];
  const mapsUrl =
    place.googleMapsUri ||
    "https://search.google.com/local/reviews?placeid=ChIJG-YJIXv51WsR13gvhrSbQYA";

  return (
    <section
      id="reviews"
      aria-labelledby="google-reviews-heading"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "56px 20px",
      }}
    >
      {/* Official Google Verified Badge */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            padding: "6px 14px",
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 600,
            color: "#334155",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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
              d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.57H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.43l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.57l4.03 3.15c.95-2.83 3.6-4.97 6.72-4.97z"
            />
          </svg>
          <span>Verified Google Reviews</span>
        </div>
      </div>

      <h2
        id="google-reviews-heading"
        style={{
          textAlign: "center",
          fontSize: 32,
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: 8,
          letterSpacing: "-0.025em",
        }}
      >
        What Our Townsville Customers Say
      </h2>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        {typeof place.rating === "number" && (
          <p style={{ margin: "4px 0" }}>
            <strong style={{ fontSize: 30, color: "#0f172a" }}>
              {place.rating.toFixed(1)}
            </strong>{" "}
            <Stars rating={place.rating} />
          </p>
        )}
        {typeof place.userRatingCount === "number" && (
          <p style={{ color: "#64748b", fontSize: 14 }}>
            Based on {place.userRatingCount} Google ratings
          </p>
        )}
      </div>

      {reviews.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 20,
          }}
        >
          {reviews.map((review, index) => {
            const author = review.authorAttribution;
            return (
              <article key={index} style={card}>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  {author?.photoUri && (
                    <img
                      src={author.photoUri}
                      alt={author.displayName ?? "Reviewer"}
                      width={42}
                      height={42}
                      referrerPolicy="no-referrer"
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  )}
                  <div>
                    {author?.uri ? (
                      <a
                        href={author.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontWeight: 600,
                          color: "#0f172a",
                          textDecoration: "none",
                          fontSize: 15,
                        }}
                      >
                        {author.displayName ?? "Google reviewer"}
                      </a>
                    ) : (
                      <strong style={{ color: "#0f172a", fontSize: 15 }}>
                        {author?.displayName ?? "Google reviewer"}
                      </strong>
                    )}
                    <div>
                      {review.rating != null && (
                        <Stars rating={review.rating} />
                      )}
                    </div>
                  </div>
                </div>
                {review.text?.text && (
                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      color: "#334155",
                      fontSize: 14,
                      lineHeight: 1.6,
                      margin: "8px 0",
                    }}
                  >
                    {review.text.text}
                  </p>
                )}
                <small
                  style={{
                    display: "block",
                    color: "#94a3b8",
                    fontSize: 12,
                    marginTop: 6,
                  }}
                >
                  {review.relativePublishTimeDescription}
                </small>
                {review.googleMapsUri && (
                  <p style={{ marginTop: 10, marginBottom: 0 }}>
                    <a
                      href={review.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#036829",
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "underline",
                      }}
                    >
                      View original review on Google Maps
                    </a>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        /* Clean fallback card linking to Google Maps reviews */
        <div
          style={{
            maxWidth: 580,
            margin: "0 auto",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 24,
            padding: "36px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              margin: "0 auto 16px auto",
              borderRadius: 16,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
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
                d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.57H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.43l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.57l4.03 3.15c.95-2.83 3.6-4.97 6.72-4.97z"
              />
            </svg>
          </div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 8,
            }}
          >
            Verified Customer Feedback on Google
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.6,
              maxWidth: 440,
              margin: "0 auto 20px auto",
            }}
          >
            See authentic customer reviews, ratings, and job photos directly on
            our verified Google Maps business listing.
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#036829",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Read Our Google Reviews
          </a>
        </div>
      )}

      {mapsUrl && reviews.length > 0 && (
        <p style={{ textAlign: "center", marginTop: 32 }}>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#036829",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Read Our Google Reviews
          </a>
        </p>
      )}

      {/* Developer: insert Google's approved logo asset here. Follow Places API branding and attribution rules. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 24,
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        <span>Powered by</span>
        <svg
          width="48"
          height="16"
          viewBox="0 0 74 24"
          fill="none"
          aria-label="Google"
        >
          <path
            fill="#4285F4"
            d="M12.04 14.28v-3.08h8.21c.08.54.14 1.13.14 1.83 0 2.21-.6 4.38-2.07 5.85-1.42 1.44-3.26 2.22-5.61 2.22-4.46 0-8.15-3.62-8.15-8.08s3.69-8.08 8.15-8.08c2.41 0 4.15.95 5.43 2.17l-2.18 2.18c-.92-.86-2.17-1.53-3.25-1.53-2.61 0-4.73 2.12-4.73 4.73s2.12 4.73 4.73 4.73c1.7 0 2.66-.68 3.28-1.3.5-.5.84-1.21.97-2.19h-4.87z"
          />
          <path
            fill="#EA4335"
            d="M30.41 12c0 3.03-2.3 5.22-5.18 5.22s-5.18-2.19-5.18-5.22c0-3.06 2.3-5.22 5.18-5.22s5.18 2.16 5.18 5.22zm-2.27 0c0-1.89-1.34-3.19-2.91-3.19s-2.91 1.3-2.91 3.19c0 1.86 1.34 3.19 2.91 3.19s2.91-1.33 2.91-3.19z"
          />
          <path
            fill="#FBBC05"
            d="M41.74 12c0 3.03-2.3 5.22-5.18 5.22s-5.18-2.19-5.18-5.22c0-3.06 2.3-5.22 5.18-5.22s5.18 2.16 5.18 5.22zm-2.27 0c0-1.89-1.34-3.19-2.91-3.19s-2.91 1.3-2.91 3.19c0 1.86 1.34 3.19 2.91 3.19s2.91-1.33 2.91-3.19z"
          />
          <path
            fill="#4285F4"
            d="M52.75 7.07v9.64c0 3.96-2.33 5.59-5.09 5.59-2.6 0-4.16-1.74-4.75-3.14l1.98-.82c.35.84 1.22 1.83 2.77 1.83 1.81 0 2.93-1.12 2.93-3.21v-.78h-.08c-.54.67-1.58 1.26-2.89 1.26-2.73 0-5.22-2.38-5.22-5.25 0-2.9 2.49-5.22 5.22-5.22 1.31 0 2.35.59 2.89 1.24h.08V7.07h2.16zm-2.07 4.96c0-1.86-1.22-3.19-2.79-3.19-1.6 0-2.89 1.33-2.89 3.19 0 1.83 1.29 3.19 2.89 3.19 1.57 0 2.79-1.36 2.79-3.19z"
          />
          <path fill="#34A853" d="M55.88 1.05v16.17h-2.27V1.05h2.27z" />
          <path
            fill="#EA4335"
            d="M64.71 13.91l1.81 1.21c-.59.87-2.01 2.38-4.47 2.38-3.05 0-5.16-2.36-5.16-5.22 0-3.11 2.22-5.22 4.9-5.22 2.83 0 4.22 2.14 4.5 3.32l.24.62-7.14 2.95c.55 1.08 1.4 1.63 2.6 1.63 1.2 0 2.03-.6 2.72-1.67zm-5.41-2.07l4.78-1.98c-.26-.66-1.02-1.13-1.94-1.13-1.17 0-2.82 1.04-2.84 3.11z"
          />
        </svg>
      </div>
    </section>
  );
}
