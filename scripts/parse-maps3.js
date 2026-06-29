import fs from "fs";

const files = [
  process.env.USERPROFILE +
    "/.cursor/projects/c-Users-EmanuelAllaria-OneDrive-Cerberus-Digital-Escritorio-trabajo-landing-german/agent-tools/677f4eef-babe-4352-b938-dc25cfe0f4e8.txt",
  "maps-search.html",
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  console.log("\n=== FILE:", file, "size:", html.length);

  // APP_INITIALIZATION_STATE pattern
  const initMatch = html.match(/APP_INITIALIZATION_STATE\s*=\s*(\[.+?\]);/s);
  if (initMatch) {
    console.log("Found APP_INITIALIZATION_STATE, length:", initMatch[1].length);
  }

  // Look for review-like Spanish sentences in raw HTML
  const decoded = html
    .replace(/\\u003d/g, "=")
    .replace(/\\u0026/g, "&")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ");

  const reviews = [...decoded.matchAll(/"([^"]{60,500})"/g)]
    .map((m) => m[1])
    .filter((s) =>
      /abogad|despido|laboral|atención|profesional|recomend|gracias|caso|indemniz|ART|WhatsApp/i.test(
        s
      )
    )
    .filter((s) => !/function|google|maps|http|padding|margin|color/i.test(s));

  console.log("Review-like strings:", [...new Set(reviews)].slice(0, 20));

  // Rating + count patterns
  const ratingPatterns = [...decoded.matchAll(/,([45]\.[0-9]),(\d{1,4}),/g)];
  console.log("Ratings found:", ratingPatterns.slice(0, 10).map((r) => `${r[1]} (${r[2]})`));

  // Names near 5 star patterns  
  const names = [...decoded.matchAll(/,\[\[null,"([A-ZÁÉÍÓÚ][a-záéíóúñ]+ [A-ZÁÉÍÓÚ]\.?)"\]/g)];
  console.log("Names:", names.slice(0, 15).map((n) => n[1]));
}
