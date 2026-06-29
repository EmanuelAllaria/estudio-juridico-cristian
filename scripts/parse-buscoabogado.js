import fs from "fs";

const h = fs.readFileSync("buscoabogado.html", "utf8");
const maps = [...h.matchAll(/https?:[^"'\\s>]*google[^"'\\s>]*/gi)];
console.log("maps links:", [...new Set(maps.map((m) => m[0]))].slice(0, 8));

const reviewBlocks = [...h.matchAll(/"reviewBody":"([^"]+)"/g)];
console.log("reviewBody:", reviewBlocks.slice(0, 10));

const jsonLd = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (jsonLd) console.log("jsonld:", jsonLd[1].slice(0, 2000));

const allText = [...h.matchAll(/>([^<]{50,400})</g)]
  .map((m) => m[1].trim())
  .filter((t) => /excelente|profesional|recomend|atención|gracias|despido|laboral|abogad/i.test(t));
console.log("text blocks:", allText.slice(0, 20));
