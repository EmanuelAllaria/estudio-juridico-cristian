import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { scraper } from "google-maps-review-scraper";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "assets/data/google-reviews.json");

const MAPS_URL =
  "https://www.google.com/maps/place/Abogados+Laborales+%26+Asoc./@-34.6020072,-58.3907044,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccba0ab8466f9:0x9198d8f008c1f834!8m2!3d-34.6020072!4d-58.3907044!16s%2Fg%2F11cn3vx9hq";

const PLACE_ID = "ChIJ-WaEq6DLvJURNPjBCPDYmJE";

function parseRawReview(review) {
  if (!Array.isArray(review)) return null;
  const name = review[3]?.[0] || "Cliente";
  const rating = typeof review[1] === "number" ? review[1] : 5;
  const date = review[2]?.[0] || "";
  const text =
    review[27] ||
    review[28] ||
    review[11] ||
    (typeof review[4]?.[2] === "string" && !review[4][2].startsWith("http")
      ? review[4][2]
      : null);
  if (!text || text.startsWith("http")) return null;

  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();

  return { name, rating, text: text.replace(/<br\s*\/?>/gi, " "), date, initials };
}

async function fetchFromPlacesApi(apiKey) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      "X-Goog-LanguageCode": "es",
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    rating: data.rating ?? 5,
    reviewCount: data.userRatingCount ?? 171,
    reviews: (data.reviews || []).map((r) => ({
      name: r.authorAttribution?.displayName || "Cliente",
      rating: r.rating || 5,
      text: (r.text?.text || "").replace(/<br\s*\/?>/gi, " "),
      date: r.relativePublishTimeDescription || "",
      initials: (() => {
        const n = r.authorAttribution?.displayName || "CL";
        const p = n.trim().split(/\s+/);
        return p.length >= 2
          ? (p[0][0] + p[p.length - 1][0]).toUpperCase()
          : n.slice(0, 2).toUpperCase();
      })(),
    })).filter((r) => r.text),
    source: "places-api",
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchFromScraper() {
  const raw = await scraper(MAPS_URL, {
    sort_type: "relevant",
    pages: 3,
    clean: false,
    experimental: true,
  });

  const reviews = (Array.isArray(raw) ? raw : [])
    .map(parseRawReview)
    .filter(Boolean);

  const seen = new Set();
  const unique = reviews.filter((r) => {
    const key = r.text.slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    rating: 5,
    reviewCount: 171,
    reviews: unique.slice(0, 6),
    source: "scraper-fallback",
    fetchedAt: new Date().toISOString(),
  };
}

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
  let payload = null;

  if (apiKey) {
    console.log("Consultando Google Places API...");
    payload = await fetchFromPlacesApi(apiKey);
  }

  if (!payload) {
    console.log("Usando scraper de Maps (fallback)...");
    payload = await fetchFromScraper();
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2), "utf8");
  console.log(`✓ ${payload.reviews.length} reseñas → assets/data/google-reviews.json`);
  console.log(`  Rating: ${payload.rating} · Total: ${payload.reviewCount} (${payload.source})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
