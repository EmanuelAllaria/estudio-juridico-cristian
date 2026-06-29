import type { SiteConfig } from "./site-config";

export type PageConfig = SiteConfig & {
  googleRating: number;
  reviewCount: number;
};

export function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function buildSchema(config: PageConfig) {
  const legalServiceId = `${config.domain}/#legal-service`;
  const websiteId = `${config.domain}/#website`;
  const faqId = `${config.domain}/#faq`;

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
      {
        "@type": "LegalService",
        "@id": legalServiceId,
        name: config.brand,
        description:
          "Estudio jurídico especializado en derecho laboral: despidos, accidentes de trabajo, trabajo en negro, indemnizaciones y horas extras en Buenos Aires.",
        url: config.domain,
        telephone: config.phone,
        email: config.email,
        image: `${config.domain}/images/og-image.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: config.address,
          addressLocality: "Buenos Aires",
          addressRegion: "CABA",
          addressCountry: "AR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -34.6020072,
          longitude: -58.3907044,
        },
        areaServed: {
          "@type": "City",
          name: "Buenos Aires",
        },
        priceRange: "Consulta gratuita",
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
        sameAs: [config.googleMapsUrl, config.instagramUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de derecho laboral",
          itemListElement: config.specialties.map((spec, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: spec.title,
              description: spec.description,
            },
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: config.googleRating,
          reviewCount: config.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: config.reviews.slice(0, 3).map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
          },
          reviewBody: stripHtml(r.text),
        })),
      },
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
