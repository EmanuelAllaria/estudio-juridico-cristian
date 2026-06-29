import { chromium } from "playwright";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { lookup } from "mime-types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const VIEWPORTS = [
  { name: "mobile-xs", width: 320, height: 568 },
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1024, height: 768 },
  { name: "desktop-lg", width: 1440, height: 900 },
];

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(ROOT, req.url === "/" ? "index.html" : req.url.slice(1));
      try {
        const data = readFileSync(filePath);
        const type = lookup(filePath) || "application/octet-stream";
        res.writeHead(200, { "Content-Type": type });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(0, () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function runTests() {
  const { server, port } = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];

  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });

  const faqCount = await page.locator("#faq-list details").count();
  if (faqCount < 6) {
    errors.push(`FAQ count expected >= 6, got ${faqCount}`);
  }

  const schemaText = await page.locator("#schema-json").textContent();
  let schema;
  try {
    schema = JSON.parse(schemaText);
  } catch {
    errors.push("JSON-LD is not valid JSON");
  }

  if (schema) {
    const graph = schema["@graph"] || [];
    const hasFaq = graph.some((item) => item["@type"] === "FAQPage");
    if (!hasFaq) errors.push("JSON-LD @graph missing FAQPage");
    const hasLegal = graph.some((item) => item["@type"] === "LegalService");
    if (!hasLegal) errors.push("JSON-LD @graph missing LegalService");
  }

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(200);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1;
    });

    if (overflow) {
      errors.push(`Horizontal overflow at ${vp.name} (${vp.width}px)`);
    }

    const trustLen = await page.locator("#trust-badges").innerHTML();
    if (trustLen.trim().length === 0) {
      errors.push(`trust-badges empty at ${vp.name}`);
    }
  }

  await browser.close();
  server.close();

  if (errors.length > 0) {
    console.error("FAILED:");
    errors.forEach((e) => console.error(" -", e));
    process.exit(1);
  }

  console.log("All responsive + SEO tests passed.");
  console.log(`Viewports tested: ${VIEWPORTS.map((v) => v.width).join(", ")}px`);
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
