import { SEO, SITE_CONFIG, type SiteConfig } from "./site-config";

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

function telList(config: PageConfig): string[] {
  return config.phones.map((phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.startsWith("54") ? `+${digits}` : `+549${digits}`;
  });
}

export function buildSchema(config: PageConfig) {
  const legalServiceId = `${config.domain}/#legal-service`;
  const organizationId = `${config.domain}/#organization`;
  const websiteId = `${config.domain}/#website`;
  const webpageId = `${config.domain}/#webpage`;
  const faqId = `${config.domain}/#faq`;
  const howToId = `${config.domain}/#howto`;
  const breadcrumbId = `${config.domain}/#breadcrumb`;
  const penalServiceId = `${config.domain}/#servicio-penal`;
  const accidenteServiceId = `${config.domain}/#servicio-accidentes`;

  const phones = telList(config);
  const sameAs = [config.googleMapsUrl, config.instagramUrl].filter(Boolean);
  const image = `${config.domain}/images/og-image.jpg`;

  const contactPoints = phones.map((telephone, index) => ({
    "@type": "ContactPoint",
    telephone,
    contactType: index === 0 ? "customer service" : "customer support",
    areaServed: ["AR-M", "AR"],
    availableLanguage: ["Spanish", "es-AR"],
    hoursAvailable: {
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
  }));

  contactPoints.push({
    "@type": "ContactPoint",
    telephone: phones[0],
    contactType: "emergency",
    areaServed: ["AR-M", "AR"],
    availableLanguage: ["Spanish", "es-AR"],
    hoursAvailable: {
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
  });

  const legalService: Record<string, unknown> = {
    "@type": ["LegalService", "LocalBusiness"],
    "@id": legalServiceId,
    name: config.brand,
    alternateName: [
      "Hidalgo y Crifo Abogados",
      "Estudio Hidalgo & Crifo",
      "Abogados penalistas Mendoza Hidalgo Crifo",
    ],
    description: SEO.description,
    url: config.domain,
    telephone: phones,
    email: config.email,
    image: [image, `${config.domain}/images/hero-justicia.webp`],
    logo: `${config.domain}/images/logo.svg`,
    slogan:
      "Defensa penal urgente las 24 hs y reclamos por accidentes de tránsito en Mendoza",
    knowsAbout: [
      "Derecho penal",
      "Defensa penal",
      "Excarcelación",
      "Allanamientos",
      "Citación judicial",
      "Accidentes de tránsito",
      "Reclamos a aseguradoras",
      "Indemnizaciones",
      "Justicia Federal",
      "Provincia de Mendoza",
    ],
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
      latitude: SEO.geo.latitude,
      longitude: SEO.geo.longitude,
    },
    hasMap: config.googleMapsUrl,
    areaServed: [
      { "@type": "City", name: "Mendoza" },
      { "@type": "AdministrativeArea", name: "Provincia de Mendoza" },
      {
        "@type": "AdministrativeArea",
        name: "Justicia Federal — Mendoza",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "ARS",
    paymentAccepted: "Cash, Bank Transfer",
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
    contactPoint: contactPoints,
    sameAs,
    parentOrganization: { "@id": organizationId },
    makesOffer: [
      { "@id": penalServiceId },
      { "@id": accidenteServiceId },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios jurídicos Hidalgo & Crifo",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Derecho penal",
          itemListElement: config.specialties.map((spec, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: spec.title,
              description: spec.description,
              provider: { "@id": legalServiceId },
              areaServed: "Mendoza",
              serviceType: "Defensa penal",
            },
          })),
        },
        {
          "@type": "OfferCatalog",
          name: "Accidentes de tránsito",
          itemListElement: config.accidentTypes.map((item, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: item.title,
              description: item.description,
              provider: { "@id": legalServiceId },
              areaServed: "Mendoza",
              serviceType: "Reclamo por accidente de tránsito",
            },
          })),
        },
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
        "@type": "Organization",
        "@id": organizationId,
        name: config.brand,
        url: config.domain,
        logo: {
          "@type": "ImageObject",
          url: `${config.domain}/images/logo.svg`,
        },
        email: config.email,
        telephone: phones,
        address: legalService.address,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: config.domain,
        name: config.brand,
        alternateName: SEO.focusKeywords.slice(0, 3),
        description: SEO.description,
        inLanguage: "es-AR",
        publisher: { "@id": organizationId },
        about: { "@id": legalServiceId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: config.domain,
        name: SEO.title,
        description: SEO.description,
        inLanguage: "es-AR",
        isPartOf: { "@id": websiteId },
        about: { "@id": legalServiceId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
        },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": legalServiceId },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#hero-title", ".hero__subtitle", "#cobertura-title"],
        },
        significantLink: [
          `${config.domain}/#penal`,
          `${config.domain}/#accidentes`,
          `${config.domain}/#faq`,
        ],
        keywords: SEO.focusKeywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: config.domain,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Defensa penal",
            item: `${config.domain}/#penal`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Accidentes de tránsito",
            item: `${config.domain}/#accidentes`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Preguntas frecuentes",
            item: `${config.domain}/#faq`,
          },
        ],
      },
      legalService,
      {
        "@type": "Service",
        "@id": penalServiceId,
        name: "Defensa penal urgente en Mendoza",
        serviceType: "Derecho penal",
        description:
          "Defensa penal inmediata ante detenciones, allanamientos, citaciones e investigaciones en Mendoza y Justicia Federal. Atención las 24 horas.",
        provider: { "@id": legalServiceId },
        areaServed: [
          { "@type": "City", name: "Mendoza" },
          { "@type": "AdministrativeArea", name: "Provincia de Mendoza" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: config.domain,
          servicePhone: phones[0],
          availableLanguage: "Spanish",
        },
        hoursAvailable: {
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
      },
      {
        "@type": "Service",
        "@id": accidenteServiceId,
        name: "Reclamos por accidentes de tránsito en Mendoza",
        serviceType: "Accidentes de tránsito",
        description:
          "Asesoramiento y reclamo por accidentes de tránsito: responsabilidad, indemnización, negociación con aseguradoras y demanda judicial en Mendoza.",
        provider: { "@id": legalServiceId },
        areaServed: {
          "@type": "City",
          name: "Mendoza",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${config.domain}/#accidentes`,
          servicePhone: phones[0],
          availableLanguage: "Spanish",
        },
      },
      {
        "@type": "HowTo",
        "@id": howToId,
        name: "Cómo consultar con Hidalgo & Crifo Abogados",
        description:
          "Pasos para iniciar una consulta penal urgente o un reclamo por accidente de tránsito en Mendoza.",
        inLanguage: "es-AR",
        totalTime: "PT15M",
        step: config.processSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.text,
          url: `${config.domain}/#proceso`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${config.domain}/#faq`,
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
