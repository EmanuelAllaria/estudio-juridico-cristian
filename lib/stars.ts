import type { Review } from "./site-config";

export function renderStars(rating: number): string {
  const rounded = Math.round(rating);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

export function formatRating(value: number): string {
  if (!Number.isFinite(value)) return "5.0";
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function initialsFromName(name: string): string {
  const parts = String(name || "Cliente").trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return String(name || "CL").slice(0, 2).toUpperCase();
}

export interface GoogleReviewsPayload {
  rating: number;
  reviewCount: number;
  reviews: Review[];
  source?: string;
  fetchedAt?: string;
}

export function normalizeReview(review: Record<string, unknown>): Review {
  const attribution = review.authorAttribution as
    | { displayName?: string }
    | undefined;
  const textObj = review.text as { text?: string } | string | undefined;

  const name =
    attribution?.displayName ||
    (review.name as string) ||
    (review.author as string) ||
    "Cliente";

  const text =
    (typeof textObj === "object" && textObj?.text) ||
    (typeof textObj === "string" ? textObj : "") ||
    (review.reviewBody as string) ||
    "";

  const rating = (review.rating as number) || 5;
  const date =
    (review.relativePublishTimeDescription as string) ||
    (review.relativeTimeDescription as string) ||
    (review.date as string) ||
    "";

  return {
    name,
    text: String(text).trim(),
    rating,
    date,
    initials: initialsFromName(name),
  };
}

export function normalizePayload(
  data: Record<string, unknown>,
  fallbackRating = 5,
  fallbackCount = 171
): GoogleReviewsPayload {
  const reviews = ((data.reviews as Record<string, unknown>[]) || [])
    .map(normalizeReview)
    .filter((r) => r.text);

  return {
    rating: (data.rating as number) ?? fallbackRating,
    reviewCount:
      (data.userRatingCount as number) ??
      (data.reviewCount as number) ??
      fallbackCount,
    reviews,
    source: (data.source as string) || "google",
    fetchedAt: (data.fetchedAt as string) || new Date().toISOString(),
  };
}
