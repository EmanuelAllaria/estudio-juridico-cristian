import { scraper } from "google-maps-review-scraper";
import fs from "fs";

const url =
  "https://www.google.com/maps/place/Abogados+Laborales+%26+Asoc./@-34.6020072,-58.3907044,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccba0ab8466f9:0x9198d8f008c1f834!8m2!3d-34.6020072!4d-58.3907044!16s%2Fg%2F11cn3vx9hq";

const reviews = await scraper(url, {
  sort_type: "relevant",
  pages: 5,
  clean: true,
  experimental: true,
});

console.log("Total:", Array.isArray(reviews) ? reviews.length : reviews);
const withText = Array.isArray(reviews)
  ? reviews.filter((r) => r.review?.text)
  : [];
console.log("With text:", withText.length);
if (withText.length) {
  console.log(JSON.stringify(withText.slice(0, 6), null, 2));
}
fs.writeFileSync("reviews-data.json", JSON.stringify(reviews, null, 2));
