import sharp from "sharp";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const imagesDir = join(ROOT, "public", "images");
const stockDir = join(imagesDir, "stock");
const assetsImagesDir = join(ROOT, "assets", "images");

await sharp(join(imagesDir, "logo.svg"), { density: 300 })
  .resize(800)
  .png({ compressionLevel: 9 })
  .toFile(join(imagesDir, "logo.png"));

await sharp(join(imagesDir, "logo.svg"), { density: 300 })
  .resize(800)
  .png({ compressionLevel: 9 })
  .toFile(join(assetsImagesDir, "logo.png"));

await sharp(join(imagesDir, "og-image.svg"))
  .resize(1200, 630)
  .jpeg({ quality: 85 })
  .toFile(join(imagesDir, "og-image.jpg"));

await sharp(join(imagesDir, "logo-mark.svg"))
  .resize(180, 180)
  .png()
  .toFile(join(imagesDir, "apple-touch-icon.png"));

const heroBgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e2a45"/>
      <stop offset="50%" stop-color="#151d32"/>
      <stop offset="100%" stop-color="#0c1222"/>
    </linearGradient>
    <pattern id="columns" width="120" height="120" patternUnits="userSpaceOnUse">
      <rect width="120" height="120" fill="none"/>
      <line x1="30" y1="0" x2="30" y2="120" stroke="rgba(255,255,255,0.04)" stroke-width="2"/>
      <line x1="90" y1="0" x2="90" y2="120" stroke="rgba(255,255,255,0.04)" stroke-width="2"/>
      <rect x="20" y="20" width="80" height="12" fill="rgba(255,255,255,0.03)" rx="2"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#columns)"/>
  <rect width="1200" height="800" fill="url(#bg)" opacity="0.35"/>
</svg>`;

await sharp(Buffer.from(heroBgSvg))
  .resize(1200, 800)
  .webp({ quality: 72 })
  .toFile(join(imagesDir, "hero-bg.webp"));

const stockImages = [
  { src: "hero-lawyer.jpg", dest: "hero-lawyer.webp", width: 1200, height: 900 },
  { src: "about-founder.jpg", dest: "about-founder.webp", width: 800, height: 1000 },
  { src: "office-caba.jpg", dest: "office-caba.webp", width: 1200, height: 800 },
];

for (const { src, dest, width, height } of stockImages) {
  const inputPath = join(stockDir, src);
  if (existsSync(inputPath)) {
    await sharp(inputPath)
      .resize(width, height, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(join(imagesDir, dest));
  }
}

console.log("✓ logo.png, og-image.jpg, apple-touch-icon.png, hero-bg.webp y fotos stock generados");
