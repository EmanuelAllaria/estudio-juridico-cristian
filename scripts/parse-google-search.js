import fs from "fs";

const h = fs.readFileSync("google-search.html", "utf8");
const m = [...h.matchAll(/"([^"]{40,400})"/g)]
  .map((x) => x[1])
  .filter(
    (s) =>
      /abogad|despido|laboral|excelente|profesional|recomend|atención|gracias/i.test(
        s
      ) && !/google|function|padding|margin|webkit/i.test(s)
  );
console.log("Snippets:", [...new Set(m)].slice(0, 25));

const rating = h.match(/([45],[0-9])\s*\((\d+)\)/);
console.log("Rating:", rating);

const stars = h.match(/(\d+[,.]\d)\s*(?:estrellas|stars|opiniones|reseñas)/gi);
console.log("Star mentions:", stars?.slice(0, 10));
