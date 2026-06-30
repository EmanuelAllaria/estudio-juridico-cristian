import { SITE_CONFIG, type Review } from "./site-config";
import type { GoogleReviewsPayload } from "./stars";
import { initialsFromName } from "./stars";

export function normalizeAuthorName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function localizeRelativeDate(date: string): string {
  const trimmed = date.trim();
  if (!trimmed) return trimmed;
  if (/^hace\b/i.test(trimmed)) return trimmed;

  const patterns: Array<[RegExp, (n: string) => string]> = [
    [/^a year ago$/i, () => "Hace un año"],
    [/^(\d+) years? ago$/i, (n) => `Hace ${n} años`],
    [/^a month ago$/i, () => "Hace un mes"],
    [/^(\d+) months? ago$/i, (n) => `Hace ${n} meses`],
    [/^a week ago$/i, () => "Hace una semana"],
    [/^(\d+) weeks? ago$/i, (n) => `Hace ${n} semanas`],
    [/^a day ago$/i, () => "Hace un día"],
    [/^(\d+) days? ago$/i, (n) => `Hace ${n} días`],
    [/^an? hour ago$/i, () => "Hace una hora"],
    [/^(\d+) hours? ago$/i, (n) => `Hace ${n} horas`],
  ];

  for (const [regex, format] of patterns) {
    const match = trimmed.match(regex);
    if (match) return format(match[1] ?? "");
  }

  return trimmed;
}

function buildCatalogMap(catalog: Review[]): Map<string, Review> {
  const map = new Map<string, Review>();
  for (const entry of catalog) {
    map.set(normalizeAuthorName(entry.name), entry);
  }
  return map;
}

export function mergeSpanishReviewTexts(
  apiReviews: Review[],
  catalog: Review[] = SITE_CONFIG.reviews
): Review[] {
  const catalogMap = buildCatalogMap(catalog);

  return apiReviews.map((review) => {
    const match = catalogMap.get(normalizeAuthorName(review.name));
    const date = match?.date ?? localizeRelativeDate(review.date);

    return {
      name: review.name,
      rating: review.rating,
      text: match?.text ?? review.text,
      date,
      initials: review.initials || initialsFromName(review.name),
    };
  });
}

export function localizeReviewsPayload(
  payload: GoogleReviewsPayload,
  catalog: Review[] = SITE_CONFIG.reviews
): GoogleReviewsPayload {
  const reviews =
    payload.reviews.length > 0
      ? mergeSpanishReviewTexts(payload.reviews, catalog)
      : catalog;

  return {
    ...payload,
    reviews,
  };
}
