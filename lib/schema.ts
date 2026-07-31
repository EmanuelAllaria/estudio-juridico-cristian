import { SITE_CONFIG, type SiteConfig } from "./site-config";

export type PageConfig = SiteConfig & {
  googleRating?: number;
  reviewCount?: number;
};

export function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function buildSchemaPageConfig(): PageConfig {
  return { ...SITE_CONFIG };
}

export function buildSchema(config: PageConfig) {
  const legalServiceId = `${config.domain}/#legal-service`;
  const websiteId = `${config.domain}/#website`;
  const faqId = `${config.domain}/#faq`;

  const sameAs = [config.googleMapsUrl, config.instagramUrl].filter(Boolean);

  const legalService: Record<string, unknown> = {
    "@type": "LegalService",
    "@id": legalServiceId,
    name: config.brand,
    description:
      "Estudio jurídico especializado en derecho penal y accidentes de tránsito en Mendoza. Defensa penal urgente las 24 hs.",
    url: config.domain,
    telephone: config.phones,
    email: config.email,
    image: `${config.domain}/images/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mitre 535, 1° piso, oficinas 43 y 44",
      addressLocality: "Mendoza",
      addressRegion: "Mendoza",
      postalCode: "5500",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -32.8894587,
      longitude: -68.8458386,
    },
    areaServed: {
      "@type": "City",
      name: "Mendoza",
    },
    priceRange: "Consulta",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de derecho penal y accidentes de tránsito",
      itemListElement: [
        ...config.specialties.map((spec, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: spec.title,
            description: spec.description,
          },
        })),
        ...config.accidentTypes.map((item, index) => ({
          "@type": "Offer",
          position: config.specialties.length + index + 1,
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.description,
          },
        })),
      ],
    },
  };

  if (
    typeof config.googleRating === "number" &&
    typeof config.reviewCount === "number" &&
    config.reviewCount > 0
  ) {
    legalService.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: config.googleRating,
      reviewCount: config.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (config.reviews.length > 0) {
    legalService.review = config.reviews.slice(0, 3).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: stripHtml(r.text),
    }));
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: config.domain,
        name: config.brand,
        inLanguage: "es-AR",
        publisher: { "@id": legalServiceId },
      },
      legalService,
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: config.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
