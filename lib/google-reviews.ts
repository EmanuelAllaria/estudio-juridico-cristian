import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { localizeReviewsPayload } from "./localize-reviews";
import { SITE_CONFIG, type Review, type SiteConfig } from "./site-config";
import type { PageConfig } from "./schema";
import {
  normalizePayload,
  type GoogleReviewsPayload,
} from "./stars";

const CACHE_PATH = path.join(process.cwd(), "data", "google-reviews.json");

export function isGoogleSource(source?: string): boolean {
  return Boolean(
    source &&
      source !== "static" &&
      source !== "config-fallback"
  );
}

function applyLocalization(
  payload: GoogleReviewsPayload
): GoogleReviewsPayload {
  return localizeReviewsPayload(payload, SITE_CONFIG.reviews);
}

async function saveCache(payload: GoogleReviewsPayload): Promise<void> {
  try {
    await mkdir(path.dirname(CACHE_PATH), { recursive: true });
    await writeFile(CACHE_PATH, JSON.stringify(payload, null, 2), "utf-8");
  } catch (err) {
    console.warn("[google-reviews] No se pudo guardar caché:", err);
  }
}

export async function fetchFromPlacesApiLegacy(): Promise<GoogleReviewsPayload | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = SITE_CONFIG.googlePlaceId;
  if (!apiKey || !placeId) return null;

  const params = new URLSearchParams({
    place_id: placeId,
    fields: "rating,user_ratings_total,reviews",
    key: apiKey,
    language: "es-419",
    region: "ar",
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  if (data.status !== "OK" || !data.result) return null;

  const payload = normalizePayload({
    rating: data.result.rating,
    reviewCount: data.result.user_ratings_total,
    reviews: (data.result.reviews || []).map(
      (r: {
        author_name?: string;
        rating?: number;
        text?: string;
        relative_time_description?: string;
      }) => ({
        name: r.author_name || "Cliente",
        rating: r.rating || 5,
        text: r.text || "",
        date: r.relative_time_description || "",
      })
    ),
    source: "places-api-legacy",
    fetchedAt: new Date().toISOString(),
  });

  if (!payload) return null;

  const localized = applyLocalization(payload);
  await saveCache(localized);
  return localized;
}

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
      "X-Goog-LanguageCode": "es-419",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  const payload = normalizePayload({
    rating: data.rating,
    userRatingCount: data.userRatingCount,
    reviews: data.reviews,
    source: "places-api",
    fetchedAt: new Date().toISOString(),
  });

  if (!payload) return null;

  const localized = applyLocalization(payload);
  await saveCache(localized);
  return localized;
}

export async function fetchFromJsonCache(): Promise<GoogleReviewsPayload | null> {
  try {
    const raw = await readFile(CACHE_PATH, "utf-8");
    const data = JSON.parse(raw);
    const payload = normalizePayload(data);
    if (!payload || !isGoogleSource(payload.source)) return null;
    return applyLocalization(payload);
  } catch {
    return null;
  }
}

function getConfigFallbackReviews(): GoogleReviewsPayload {
  const reviews = SITE_CONFIG.reviews;
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const payload = normalizePayload({
    rating: avgRating,
    reviewCount: reviews.length,
    reviews,
    source: "config-fallback",
  });

  if (!payload) {
    return {
      rating: 0,
      reviewCount: 0,
      reviews: [],
      source: "config-fallback",
      fetchedAt: new Date().toISOString(),
    };
  }

  return payload;
}

export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  const strategies = [
    fetchFromPlacesApi,
    fetchFromPlacesApiLegacy,
    fetchFromJsonCache,
  ];

  for (const strategy of strategies) {
    try {
      const payload = await strategy();
      if (payload) return payload;
    } catch (err) {
      console.warn("[google-reviews]", err);
    }
  }

  throw new Error(
    "No hay datos de Google Reviews. Configurá GOOGLE_PLACES_API_KEY o ejecutá npm run sync:reviews"
  );
}

/** Para export estático (FTP): usa caché local, sin llamar a Google en build. */
export async function getBuildTimeReviews(): Promise<GoogleReviewsPayload> {
  const cached = await fetchFromJsonCache();
  if (cached) return cached;

  if (process.env.BUILD_TARGET === "ftp") {
    return getConfigFallbackReviews();
  }

  try {
    return await getGoogleReviews();
  } catch {
    return getConfigFallbackReviews();
  }
}

export function buildPageConfig(
  reviewsData: GoogleReviewsPayload
): PageConfig {
  return {
    ...SITE_CONFIG,
    googleRating: reviewsData.rating,
    reviewCount: reviewsData.reviewCount,
    reviews:
      reviewsData.reviews.length > 0
        ? reviewsData.reviews
        : SITE_CONFIG.reviews,
  };
}

export type { Review };
