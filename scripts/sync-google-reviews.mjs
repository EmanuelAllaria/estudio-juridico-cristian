import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { localizeReviewsPayload } from "./lib/localize-reviews.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function loadEnvFiles() {
  for (const file of [".env.local", ".env"]) {
    const filePath = join(ROOT, file);
    if (!existsSync(filePath)) continue;

    const content = readFileSync(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

loadEnvFiles();
const OUT_PATHS = [
  join(ROOT, "data/google-reviews.json"),
  join(ROOT, "assets/data/google-reviews.json"),
];

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

  return {
    name,
    rating,
    text: text.replace(/<br\s*\/?>/gi, " "),
    date,
    initials,
  };
}

function initialsFromName(name) {
  const parts = String(name || "CL").trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : String(name).slice(0, 2).toUpperCase();
}

async function fetchFromPlacesApiLegacy(apiKey) {
  const params = new URLSearchParams({
    place_id: PLACE_ID,
    fields: "rating,user_ratings_total,reviews",
    key: apiKey,
    language: "es-419",
    region: "ar",
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`
  );

  const data = await res.json();

  if (data.status !== "OK" || !data.result) {
    console.error(
      `Places API (clásica) error: ${data.status} — ${data.error_message || ""}`
    );
    return null;
  }

  const { rating, user_ratings_total, reviews = [] } = data.result;
  if (rating == null || user_ratings_total == null) return null;

  return {
    rating,
    reviewCount: user_ratings_total,
    reviews: reviews
      .map((r) => ({
        name: r.author_name || "Cliente",
        rating: r.rating || 5,
        text: (r.text || "").replace(/<br\s*\/?>/gi, " "),
        date: r.relative_time_description || "",
        initials: initialsFromName(r.author_name),
      }))
      .filter((r) => r.text),
    source: "places-api-legacy",
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchFromPlacesApi(apiKey) {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${PLACE_ID}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        "X-Goog-LanguageCode": "es-419",
      },
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error(`Places API error ${res.status}: ${body.slice(0, 300)}`);
    if (body.includes("API_KEY_HTTP_REFERRER_BLOCKED")) {
      console.error(
        "\nTu API key tiene restricción por referrer (solo navegador).\n" +
          "Para sync y Next.js servidor necesitás una key de backend:\n" +
          "  Google Cloud → Credenciales → tu key → Restricciones de aplicación\n" +
          "  → 'Ninguna' o 'Direcciones IP' (no 'Sitios web/referrers').\n" +
          "La key nunca se expone al cliente en este proyecto.\n"
      );
    } else if (
      body.includes("has not been used in project") ||
      body.includes("SERVICE_DISABLED")
    ) {
      const linkMatch = body.match(/https:\/\/console\.developers\.google\.com[^\s"]+/);
      console.error(
        "\nPlaces API (New) no está habilitada en tu proyecto de Google Cloud.\n" +
          (linkMatch ? `Habilitala acá: ${linkMatch[0]}\n` : "") +
          "También podés habilitar 'Places API' (clásica) como alternativa.\n" +
          "Después de activarla, esperá 1-2 minutos y volvé a ejecutar sync:reviews.\n"
      );
    }
    return null;
  }

  const data = await res.json();
  if (data.rating == null || data.userRatingCount == null) {
    console.error("Places API no devolvió rating o userRatingCount.");
    return null;
  }

  return {
    rating: data.rating,
    reviewCount: data.userRatingCount,
    reviews: (data.reviews || [])
      .map((r) => ({
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
      }))
      .filter((r) => r.text),
    source: "places-api",
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchReviewCountFromMaps() {
  try {
    const res = await fetch(MAPS_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; GoogleReviewsSync/1.0)",
      },
    });
    const html = await res.text();
    const match =
      html.match(/(\d[\d.,]*)\s+reseñas/i) ||
      html.match(/(\d[\d.,]*)\s+reviews/i);
    if (!match) return null;
    return parseInt(match[1].replace(/[.,]/g, ""), 10);
  } catch {
    return null;
  }
}

async function fetchFromScraper() {
  let scraper;
  try {
    ({ scraper } = await import("google-maps-review-scraper"));
  } catch {
    console.error(
      "Scraper no disponible. Instalá google-maps-review-scraper o usá GOOGLE_PLACES_API_KEY."
    );
    return null;
  }

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

  const reviewCount = await fetchReviewCountFromMaps();
  if (reviewCount == null) return null;

  return {
    rating: 5,
    reviewCount,
    reviews: unique.slice(0, 6),
    source: "scraper",
    fetchedAt: new Date().toISOString(),
  };
}

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim() || "";
  let payload = null;

  if (apiKey) {
    console.log("Consultando Places API (New)...");
    payload = await fetchFromPlacesApi(apiKey);

    if (!payload) {
      console.log("Probando Places API (clásica)...");
      payload = await fetchFromPlacesApiLegacy(apiKey);
    }
  } else {
    console.warn(
      "GOOGLE_PLACES_API_KEY no encontrada. Revisá .env o .env.local en la raíz del proyecto."
    );
  }

  if (!payload) {
    console.log("Usando scraper de Maps (fallback)...");
    payload = await fetchFromScraper();
  }

  if (!payload) {
    console.error(
      "No se pudieron obtener datos de Google. Verificá GOOGLE_PLACES_API_KEY en .env y que Places API (New) esté habilitada."
    );
    process.exit(1);
  }

  payload = localizeReviewsPayload(payload);

  for (const outPath of OUT_PATHS) {
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
  }

  console.log(`✓ ${payload.reviews.length} reseñas sincronizadas`);
  console.log(
    `  Rating: ${payload.rating} · Total: ${payload.reviewCount} (${payload.source})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
