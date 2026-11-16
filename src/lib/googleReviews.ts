/**
 * Google Places API (New) Reviews Service for Arbco Tree Services
 *
 * Verified Google Place ID: ChIJG-YJIXv51WsR13gvhrSbQYA
 * Complies with Google Places API Policies:
 * - Server-only execution (API key never exposed to client)
 * - Temporary caching compliant with 30-day max caching policy (24-hour ISR revalidation)
 * - Full author attribution, Google branding, and direct links to Google Maps content
 * - Graceful fallback on API failure or missing key
 */

export const GOOGLE_PLACE_ID = 'ChIJG-YJIXv51WsR13gvhrSbQYA';
export const GOOGLE_MAPS_REVIEW_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;

export interface GoogleReviewItem {
  id?: string;
  authorName: string;
  authorPhoto?: string;
  authorUri?: string;
  rating: number;
  relativePublishTimeDescription: string;
  text: string;
  googleMapsUri?: string;
  publishTime?: string;
}

export interface GoogleReviewsResponse {
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  reviews: GoogleReviewItem[];
  isFallback: boolean;
  businessName?: string;
  debugStatus?: string;
  debugMessage?: string;
}

export async function fetchGooglePlacesReviews(): Promise<GoogleReviewsResponse> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  // Fallback data when API key is not configured or in development
  const fallbackData: GoogleReviewsResponse = {
    rating: 5.0,
    userRatingCount: 1,
    googleMapsUri: GOOGLE_MAPS_REVIEW_URL,
    reviews: [],
    isFallback: true,
    businessName: 'Arbco Tree Services'
  };

  if (!apiKey) {
    return {
      ...fallbackData,
      debugStatus: 'missing_key'
    };
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`;
    const fieldMask = 'id,displayName,rating,userRatingCount,reviews,googleMapsUri';

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey.trim(),
        'X-Goog-FieldMask': fieldMask,
        'Accept-Language': 'en'
      },
      // Cache for 24 hours (compliant with Google 30-day max storage policy)
      next: { revalidate: 86400 }
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      console.warn(`[Google Places API] Request failed with HTTP ${res.status}: ${errorText.substring(0, 150)}`);
      return {
        ...fallbackData,
        debugStatus: `api_error_${res.status}`,
        debugMessage: errorText.substring(0, 200)
      };
    }

    const data = await res.json();

    const reviews: GoogleReviewItem[] = (data.reviews || []).map((r: any, idx: number) => ({
      id: r.name || `review-${idx}`,
      authorName: r.authorAttribution?.displayName || 'Google Customer',
      authorPhoto: r.authorAttribution?.photoUri || '',
      authorUri: r.authorAttribution?.uri || data.googleMapsUri || GOOGLE_MAPS_REVIEW_URL,
      rating: typeof r.rating === 'number' ? r.rating : 5,
      relativePublishTimeDescription: r.relativePublishTimeDescription || 'recently',
      text: r.text?.text || r.originalText?.text || '',
      googleMapsUri: r.googleMapsUri || data.googleMapsUri || GOOGLE_MAPS_REVIEW_URL,
      publishTime: r.publishTime
    }));

    return {
      rating: typeof data.rating === 'number' ? data.rating : 5.0,
      userRatingCount: typeof data.userRatingCount === 'number' ? data.userRatingCount : reviews.length || 1,
      googleMapsUri: data.googleMapsUri || GOOGLE_MAPS_REVIEW_URL,
      reviews,
      isFallback: false,
      businessName: data.displayName?.text || 'Arbco Tree Services'
    };
  } catch (err) {
    console.error('[Google Places API] Unexpected fetch error:', err);
    return fallbackData;
  }
}
