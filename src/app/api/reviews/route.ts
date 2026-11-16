import { NextResponse } from 'next/server';
import { fetchGooglePlacesReviews } from '@/lib/googleReviews';

export const dynamic = 'force-dynamic'; // Always evaluate dynamically at request time

export async function GET() {
  try {
    const data = await fetchGooglePlacesReviews();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        'CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Error in /api/reviews route handler:', error);
    return NextResponse.json(
      {
        rating: 5.0,
        userRatingCount: 1,
        googleMapsUri: 'https://search.google.com/local/reviews?placeid=ChIJG-YJIXv51WsR13gvhrSbQYA',
        reviews: [],
        isFallback: true,
      },
      { status: 200 }
    );
  }
}
