import { scraper } from "google-maps-review-scraper";
import fs from "fs";

const url =
  "https://www.google.com/maps/place/Abogados+Laborales+%26+Asoc./@-34.6020072,-58.3907044,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccba0ab8466f9:0x9198d8f008c1f834!8m2!3d-34.6020072!4d-58.3907044!16s%2Fg%2F11cn3vx9hq";

const reviews = await scraper(url, {
  sort_type: "relevant",
  pages: 2,
  clean: false,
  experimental: true,
});

fs.writeFileSync("reviews-raw.json", JSON.stringify(reviews, null, 2));

function findStrings(obj, depth = 0, path = "") {
  const results = [];
  if (depth > 12) return results;
  if (typeof obj === "string" && obj.length > 40 && /[a-záéíóúñ]/i.test(obj)) {
    results.push({ path, value: obj.slice(0, 200) });
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...findStrings(item, depth + 1, `${path}[${i}]`));
    });
  }
  return results;
}

if (Array.isArray(reviews) && reviews[0]) {
  const strings = findStrings(reviews[0]).slice(0, 20);
  console.log("Sample strings in first review:", JSON.stringify(strings, null, 2));
}
