import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import vm from "vm";
import sharp from "sharp";
import {
  renderTrustBadges,
  renderSpecialties,
  renderReviews,
  renderProcessSteps,
  renderWhyList,
  renderFaq,
} from "./render.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function loadConfig() {
  const configCode = readFileSync(
    join(ROOT, "assets/js/config.js"),
    "utf8"
  );
  const context = { SITE_CONFIG: null, buildSchema: null };
  vm.createContext(context);
  vm.runInContext(configCode, context);
  return {
    config: context.SITE_CONFIG,
    buildSchema: context.buildSchema,
  };
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
}

function bundleCss() {
  const files = [
    "tokens.css",
    "reset.css",
    "base.css",
    "layout.css",
    "components.css",
    "sections.css",
    "animations.css",
    "responsive.css",
  ];
  const bundled = files
    .map((file) =>
      readFileSync(join(ROOT, "assets/css", file), "utf8")
    )
    .join("\n");
  const minified = minifyCss(bundled);
  writeFileSync(join(ROOT, "assets/css/main.min.css"), minified);
  console.log("✓ CSS bundled → assets/css/main.min.css");
}

async function generateImages() {
  const imagesDir = join(ROOT, "assets/images");

  await sharp(join(imagesDir, "og-image.svg"))
    .resize(1200, 630)
    .jpeg({ quality: 88 })
    .toFile(join(imagesDir, "og-image.jpg"));

  await sharp(join(imagesDir, "logo-mark.svg"))
    .resize(180, 180)
    .png()
    .toFile(join(imagesDir, "apple-touch-icon.png"));

  console.log("✓ Images generated (og-image.jpg, apple-touch-icon.png)");
}

function injectSection(html, marker, content) {
  const pattern = new RegExp(
    `(<!-- @build:${marker} -->)[\\s\\S]*?(<!-- /@build:${marker} -->)`,
    "m"
  );
  if (!pattern.test(html)) {
    throw new Error(`Build marker @build:${marker} not found in template`);
  }
  return html.replace(
    pattern,
    `<!-- @build:${marker} -->\n${content.trim()}\n          <!-- /@build:${marker} -->`
  );
}

function buildHtml(config, buildSchema) {
  let html = readFileSync(join(ROOT, "index.template.html"), "utf8");
  const schema = JSON.stringify(buildSchema(config), null, 2);

  html = injectSection(html, "trust-badges", renderTrustBadges(config));
  html = injectSection(html, "specialties-grid", renderSpecialties(config));
  html = injectSection(html, "reviews-container", renderReviews(config));
  html = injectSection(html, "process-steps", renderProcessSteps(config));
  html = injectSection(html, "why-list", renderWhyList(config));
  html = injectSection(html, "faq-list", renderFaq(config));

  html = html.replace(
    /<script type="application\/ld\+json" id="schema-json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="schema-json">\n${schema}\n  </script>`
  );

  const today = new Date().toISOString().split("T")[0];
  html = html.replace(/@BUILD_DATE@/g, today);

  writeFileSync(join(ROOT, "index.html"), html);
  console.log("✓ HTML pre-rendered → index.html");
}

function updateSitemap() {
  const today = new Date().toISOString().split("T")[0];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.aboglaborales.com.ar/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
  writeFileSync(join(ROOT, "sitemap.xml"), sitemap);
  console.log("✓ sitemap.xml updated");
}

async function main() {
  const { config, buildSchema } = loadConfig();
  mkdirSync(join(ROOT, "assets/images"), { recursive: true });
  await generateImages();
  bundleCss();
  buildHtml(config, buildSchema);
  updateSitemap();
  console.log("\nBuild complete.");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
