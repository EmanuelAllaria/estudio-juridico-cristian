import { scraper } from "google-maps-review-scraper";
import fs from "fs";

const url =
  "https://www.google.com/maps/place/Abogados+Laborales+%26+Asoc./@-34.6020072,-58.3907044,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccba0ab8466f9:0x9198d8f008c1f834!8m2!3d-34.6020072!4d-58.3907044!16s%2Fg%2F11cn3vx9hq";

const raw = await scraper(url, {
  sort_type: "relevant",
  pages: 3,
  clean: false,
  experimental: true,
});

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

  return { name, rating, text, date, initials };
}

const parsed = (Array.isArray(raw) ? raw : [])
  .map(parseRawReview)
  .filter(Boolean);

// Deduplicate by text
const seen = new Set();
const unique = parsed.filter((r) => {
  const key = r.text.slice(0, 80);
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log(`Parsed ${unique.length} reviews with text`);
console.log(JSON.stringify(unique.slice(0, 8), null, 2));
fs.writeFileSync("reviews-parsed.json", JSON.stringify(unique, null, 2));
