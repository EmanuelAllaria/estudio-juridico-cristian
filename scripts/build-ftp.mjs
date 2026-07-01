import { spawnSync } from "child_process";
import { cpSync, existsSync, mkdirSync, renameSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const apiDir = join(ROOT, "app", "api");
const apiDisabled = join(ROOT, "app", "_api_disabled");
const outDir = join(ROOT, "out");

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function disableNextApiRoute() {
  if (existsSync(apiDir)) {
    renameSync(apiDir, apiDisabled);
  }
}

function restoreNextApiRoute() {
  if (existsSync(apiDisabled)) {
    renameSync(apiDisabled, apiDir);
  }
}

function copyPhpApi() {
  const target = join(outDir, "api");
  mkdirSync(target, { recursive: true });
  cpSync(join(ROOT, "api", "google-reviews.php"), join(target, "google-reviews.php"));
  cpSync(join(ROOT, "api", "config.sample.php"), join(target, "config.sample.php"));

  const configPhp = join(ROOT, "api", "config.php");
  if (existsSync(configPhp)) {
    cpSync(configPhp, join(target, "config.php"));
  }
}

console.log("→ Generando imágenes...");
run("node", ["scripts/generate-images.mjs"]);

console.log("→ Build estático para FTP...");
disableNextApiRoute();

try {
  run("npx", ["next", "build"], {
    BUILD_TARGET: "ftp",
    NEXT_PUBLIC_REVIEWS_API: "/api/google-reviews.php",
  });
} finally {
  restoreNextApiRoute();
}

if (!existsSync(outDir)) {
  console.error("✗ No se generó la carpeta out/");
  process.exit(1);
}

copyPhpApi();

console.log("");
console.log("✓ Build FTP listo en: out/");
console.log("  Subí TODO el contenido de out/ a public_html (o www) por FTP.");
console.log("  Luego renombrá api/config.sample.php → api/config.php y pegá tu API key.");
