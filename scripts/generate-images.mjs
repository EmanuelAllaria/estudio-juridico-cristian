import sharp from "sharp";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const imagesDir = join(ROOT, "public", "images");

await sharp(join(imagesDir, "og-image.svg"))
  .resize(1200, 630)
  .jpeg({ quality: 85 })
  .toFile(join(imagesDir, "og-image.jpg"));

await sharp(join(imagesDir, "logo-mark.svg"))
  .resize(180, 180)
  .png()
  .toFile(join(imagesDir, "apple-touch-icon.png"));

console.log("✓ og-image.jpg y apple-touch-icon.png generados");
