import { readFile } from "fs/promises";
import path from "path";
import { SITE_CONFIG } from "./site-config";
import { normalizePayload, type GoogleReviewsPayload } from "./stars";

export async function fetchFromPlacesApi(): Promise<GoogleReviewsPayload | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = SITE_CONFIG.googlePlaceId;
  if (!apiKey || !placeId) return null;

  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      "X-Goog-LanguageCode": "es",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Places API ${res.status}`);
  const data = await res.json();
  return normalizePayload(
    {
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      reviews: data.reviews,
      source: "places-api",
    },
    SITE_CONFIG.googleRating,
    SITE_CONFIG.reviewCount
  );
}

export async function fetchFromJsonCache(): Promise<GoogleReviewsPayload | null> {
  try {
    const filePath = path.join(process.cwd(), "data", "google-reviews.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return normalizePayload(data, SITE_CONFIG.googleRating, SITE_CONFIG.reviewCount);
  } catch {
    return null;
  }
}

export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  const strategies = [fetchFromPlacesApi, fetchFromJsonCache];

  for (const strategy of strategies) {
    try {
      const payload = await strategy();
      if (payload) return payload;
    } catch (err) {
      console.warn("[google-reviews]", err);
    }
  }

  return normalizePayload(
    {
      rating: SITE_CONFIG.googleRating,
      reviewCount: SITE_CONFIG.reviewCount,
      reviews: SITE_CONFIG.reviews,
      source: "static",
    },
    SITE_CONFIG.googleRating,
    SITE_CONFIG.reviewCount
  );
}
