/** Catálogo en español — debe coincidir con SITE_CONFIG.reviews en lib/site-config.ts */
export const SPANISH_REVIEW_CATALOG = [
  {
    name: "Robert Soria",
    rating: 5,
    text: "Tuve una excelente experiencia con Germán. Me contacté para realizar una consulta legal y rápidamente se comunicó conmigo. Durante la conversación fue muy claro, directo y profesional, explicándome con tranquilidad todas las opciones y posibles resultados del caso. Destaco especialmente su honestidad y la manera sencilla en la que pudo orientarme. Estoy muy agradecido por su ayuda y lo recomiendo totalmente.",
    date: "Hace 4 meses",
    initials: "RS",
  },
  {
    name: "Leila Hernandez",
    rating: 5,
    text: "La atención es EXCELENTE! Tuve un problema laboral y me asesoraron rápidamente, muy serio y comprometido con mi situación. Recomiendo 100%, son súper confiables y resuelven defendiendo lo que te corresponde.",
    date: "Hace un mes",
    initials: "LH",
  },
  {
    name: "Mariana Di Salvio",
    rating: 5,
    text: "Me contacté con el estudio y me respondieron de inmediato. Me brindaron un excelente asesoramiento. ¡Los recomiendo totalmente!",
    date: "Hace una semana",
    initials: "MS",
  },
  {
    name: "Elsa Guitian",
    rating: 5,
    text: "Súper recomendable el Dr. Germán Carnevalle, abogado laboral. Tiene un conocimiento claro en derecho del trabajo. Siempre respondió de inmediato por teléfono y videollamada. Comprobé que la atención 24 horas es totalmente real. Me brindó todo su apoyo de forma gratuita y con gran profesionalismo.",
    date: "Hace 4 meses",
    initials: "EG",
  },
  {
    name: "Martín Germán López",
    rating: 5,
    text: "Me contacté por mensaje y pregunté si podía comunicarme por teléfono. Al momento recibí respuesta. Le comuniqué mi caso al abogado Germán y me orientó en todas mis dudas. Muy recomendado.",
    date: "Hace 2 meses",
    initials: "ML",
  },
  {
    name: "Maria Fernanda Gutierrez A",
    rating: 5,
    text: "Excelente servicio legal. Los abogados son muy profesionales, tienen mucha experiencia y ofrecen una atención al cliente de primera, destacando por su paciencia y amabilidad. Totalmente recomendados.",
    date: "Hace 7 meses",
    initials: "MA",
  },
  {
    name: "Silvina Mata",
    rating: 5,
    text: "Excelente equipo de abogados. Sus respuestas son inmediatas. Buena predisposición para sus clientes.",
    date: "Hace 4 meses",
    initials: "SM",
  },
];

export function normalizeAuthorName(name) {
  return String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function localizeRelativeDate(date) {
  const trimmed = String(date || "").trim();
  if (!trimmed) return trimmed;
  if (/^hace\b/i.test(trimmed)) return trimmed;

  const patterns = [
    [/^a year ago$/i, () => "Hace un año"],
    [/^(\d+) years? ago$/i, (n) => `Hace ${n} años`],
    [/^a month ago$/i, () => "Hace un mes"],
    [/^(\d+) months? ago$/i, (n) => `Hace ${n} meses`],
    [/^a week ago$/i, () => "Hace una semana"],
    [/^(\d+) weeks? ago$/i, (n) => `Hace ${n} semanas`],
    [/^a day ago$/i, () => "Hace un día"],
    [/^(\d+) days? ago$/i, (n) => `Hace ${n} días`],
    [/^an? hour ago$/i, () => "Hace una hora"],
    [/^(\d+) hours? ago$/i, (n) => `Hace ${n} horas`],
  ];

  for (const [regex, format] of patterns) {
    const match = trimmed.match(regex);
    if (match) return format(match[1] ?? "");
  }

  return trimmed;
}

function initialsFromName(name) {
  const parts = String(name || "CL").trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : String(name).slice(0, 2).toUpperCase();
}

function buildCatalogMap(catalog) {
  const map = new Map();
  for (const entry of catalog) {
    map.set(normalizeAuthorName(entry.name), entry);
  }
  return map;
}

export function mergeSpanishReviewTexts(
  apiReviews,
  catalog = SPANISH_REVIEW_CATALOG
) {
  const catalogMap = buildCatalogMap(catalog);

  return apiReviews.map((review) => {
    const match = catalogMap.get(normalizeAuthorName(review.name));
    const date = match?.date ?? localizeRelativeDate(review.date);

    return {
      name: review.name,
      rating: review.rating,
      text: match?.text ?? review.text,
      date,
      initials: review.initials || initialsFromName(review.name),
    };
  });
}

export function localizeReviewsPayload(
  payload,
  catalog = SPANISH_REVIEW_CATALOG
) {
  const reviews =
    payload.reviews?.length > 0
      ? mergeSpanishReviewTexts(payload.reviews, catalog)
      : catalog;

  return { ...payload, reviews };
}
