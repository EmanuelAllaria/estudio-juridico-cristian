import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

const fileUrl =
  "file:///" +
  process.cwd().replace(/\\/g, "/") +
  "/index.html";

await page.goto(fileUrl, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(500);

const trustFile = await page.locator("#trust-badges").innerHTML();
console.log("file:// trust-badges length:", trustFile.trim().length);

await page.goto("http://localhost:3456/", { waitUntil: "networkidle" });

const trust = await page.locator("#trust-badges").innerHTML();
const specs = await page.locator("#specialties-grid").innerHTML();
const reviews = await page.locator("#reviews-container").innerHTML();
const process = await page.locator("#process-steps").innerHTML();
const faq = await page.locator("#faq-list").innerHTML();

console.log("trust-badges length:", trust.trim().length);
console.log("specialties length:", specs.trim().length);
console.log("reviews length:", reviews.trim().length);
console.log("process length:", process.trim().length);
console.log("faq length:", faq.trim().length);
console.log("errors:", errors);

await browser.close();
