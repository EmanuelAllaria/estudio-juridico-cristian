import sharp from "sharp";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const imagesDir = join(ROOT, "public", "images");
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

console.log("✓ logo.png, og-image.jpg y apple-touch-icon.png generados");
