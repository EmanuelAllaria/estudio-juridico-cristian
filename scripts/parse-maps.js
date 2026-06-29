import fs from "fs";

const html = fs.readFileSync("./maps-temp.html", "utf8");

// Extract quoted Spanish review-like strings (longer than 40 chars)
const strings = [...html.matchAll(/\\u003d|\\u0026|\\"/g)];
const textMatches = [...html.matchAll(/"([A-Za-zÁÉÍÓÚáéíóúñÑ][^"\\]{40,500})"/g)]
  .map((m) => m[1].replace(/\\u0026/g, "&").replace(/\\n/g, " "))
  .filter((s) => !s.includes("http") && !s.includes("google") && !s.includes("maps"))
  .filter((s) => /[áéíóúñ]|excelente|profesional|abogad|despido|laboral|atención|recomend/i.test(s));

console.log("Potential review texts:", [...new Set(textMatches)].slice(0, 15));

// Rating patterns
const ratings = [...html.matchAll(/,([45]\.[0-9]),(\d+),/g)].slice(0, 10);
console.log("Ratings:", ratings.map((r) => `${r[1]} (${r[2]} reviews)`));

// Address / phone
const phone = html.match(/4673[- ]?4420|541146734420/);
console.log("Phone:", phone?.[0]);

const addresses = [...html.matchAll(/(Paraná|Tucumán)[^"\\]{5,60}/gi)].slice(0, 5);
console.log("Addresses:", addresses.map((a) => a[0]));
