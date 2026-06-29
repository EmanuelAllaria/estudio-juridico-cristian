import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
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

function mergeReviewTexts(payload: GoogleReviewsPayload): GoogleReviewsPayload {
  if (payload.reviews.length > 0) return payload;

  return {
    ...payload,
    reviews: SITE_CONFIG.reviews,
  };
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
    language: "es",
    reviews_no_translations: "true",
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

  const merged = mergeReviewTexts(payload);
  await saveCache(merged);
  return merged;
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
      "X-Goog-LanguageCode": "es",
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

  const merged = mergeReviewTexts(payload);
  await saveCache(merged);
  return merged;
}

export async function fetchFromJsonCache(): Promise<GoogleReviewsPayload | null> {
  try {
    const raw = await readFile(CACHE_PATH, "utf-8");
    const data = JSON.parse(raw);
    const payload = normalizePayload(data);
    if (!payload || !isGoogleSource(payload.source)) return null;
    return mergeReviewTexts(payload);
  } catch {
    return null;
  }
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
