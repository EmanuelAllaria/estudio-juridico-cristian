import fs from "fs";

const html = fs.readFileSync(
  process.env.USERPROFILE +
    "/.cursor/projects/c-Users-EmanuelAllaria-OneDrive-Cerberus-Digital-Escritorio-trabajo-landing-german/agent-tools/677f4eef-babe-4352-b938-dc25cfe0f4e8.txt",
  "utf8"
);

// Decode unicode escapes in chunks
function decode(s) {
  return s
    .replace(/\\u0026/g, "&")
    .replace(/\\u003d/g, "=")
    .replace(/\\u0027/g, "'")
    .replace(/\\n/g, " ");
}

// Find all readable Spanish text blocks
const blocks = [...html.matchAll(/"((?:[^"\\]|\\.){20,800})"/g)]
  .map((m) => decode(m[1]))
  .filter((s) => !/^[A-Za-z0-9+/=]{30,}$/.test(s))
  .filter((s) => !s.includes("google") && !s.includes("maps") && !s.includes("http"))
  .filter((s) => /[áéíóúñÁÉÍÓÚÑ]/.test(s) || /abogad|despido|laboral|excelente|profesional|atención|recomend|gracias|caso/i.test(s));

console.log("Spanish blocks:", [...new Set(blocks)].slice(0, 30));

// Look for rating count pattern near business name
const idx = html.indexOf("Abogados Laborales");
const chunk = html.slice(idx, idx + 50000);
const nums = [...chunk.matchAll(/,([45]\.[0-9]),(\d{1,4}),/g)];
console.log("Rating nums near business:", nums.slice(0, 10).map((n) => `${n[1]} / ${n[2]}`));

// place id
const placeIds = [...html.matchAll(/0x[a-f0-9]+:0x[a-f0-9]+/gi)].slice(0, 5);
console.log("Place hex ids:", placeIds.map((p) => p[0]));

const kgIds = [...html.matchAll(/\/g\/(11[a-z0-9]+)/g)].slice(0, 5);
console.log("KG ids:", kgIds.map((p) => p[0]));
