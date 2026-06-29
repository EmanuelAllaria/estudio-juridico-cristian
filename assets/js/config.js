/**
 * CONFIGURACIÓN DEL SITIO — Datos reales de aboglaborales.com.ar y Google Maps
 */

var SITE_CONFIG = {
  brand: "Abogados Laborales & Asoc.",
  phone: "+54 9 11 4673-4420",
  whatsapp: "541146734420",
  whatsappMessage:
    "Hola, quiero hacer una consulta laboral sin cargo. Vi su página y me gustaría que me asesoren.",
  email: "info@aboglaborales.com.ar",
  address: "Tucumán 1668, 2ºA - CABA",
  mapsUrl: "https://maps.app.goo.gl/weeMB9y9jiw2BjBy5",
  googleMapsUrl:
    "https://www.google.com/maps/place/Abogados+Laborales+%26+Asoc./@-34.6020072,-58.3907044,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccba0ab8466f9:0x9198d8f008c1f834!8m2!3d-34.6020072!4d-58.3907044!16s%2Fg%2F11cn3vx9hq",
  domain: "https://www.aboglaborales.com.ar",
  googlePlaceId: "ChIJ-WaEq6DLvJURNPjBCPDYmJE",
  /** API key de Google Places (New). Opcional si usás placesApiProxy. */
  placesApiKey: "",
  /** Proxy PHP en el hosting — recomendado para datos en vivo sin exponer la key. */
  placesApiProxy: "/api/google-reviews.php",
  googleRating: 5,
  reviewCount: 174,

  trustBadges: [
    {
      icon: "shield",
      text: "Sin adelantos ni gastos previos",
    },
    {
      icon: "clock",
      text: "Atención 24 horas por WhatsApp y teléfono",
    },
    {
      icon: "check",
      text: "Consulta sin cargo y confidencial",
    },
    {
      icon: "scale",
      text: "Honorarios solo por resultado",
    },
  ],

  specialties: [
    {
      id: "despidos",
      title: "Despidos",
      description:
        "Despido con o sin causa, verbal o por carta documento. Te asesoramos para reclamar la máxima indemnización y defendemos tus derechos ante el empleador.",
      track: "cta-section-despidos",
      icon: "briefcase",
    },
    {
      id: "accidentes",
      title: "Accidentes de trabajo",
      description:
        "Enfermedades y accidentes laborales. Reclamamos ante la ART la indemnización que te corresponde, con peritos médicos especializados.",
      track: "cta-section-accidentes",
      icon: "heart",
    },
    {
      id: "negro",
      title: "Trabajo en negro",
      description:
        "Trabajaste sin registración total o parcial. Te ayudamos a reconocer tu relación laboral, antigüedad y cobrar lo que te corresponde.",
      track: "cta-section-negro",
      icon: "file",
    },
    {
      id: "diferencias",
      title: "Diferencias salariales",
      description:
        "Cobro de salarios adeudados, atrasos y diferencias en tu remuneración. Evaluamos tu caso y gestionamos el reclamo correspondiente.",
      track: "cta-section-diferencias",
      icon: "scale",
    },
    {
      id: "indemnizaciones",
      title: "Indemnizaciones",
      description:
        "Calculamos y reclamamos todas las indemnizaciones que te corresponden según tu situación laboral y antigüedad.",
      track: "cta-section-indemnizaciones",
      icon: "shield",
    },
    {
      id: "horas-extras",
      title: "Reclamo de horas extras",
      description:
        "Errónea registración de jornada, horas extras no pagadas y telegramas laborales. Te asesoramos en SECLO y en todo el proceso judicial.",
      track: "cta-section-horas-extras",
      icon: "clock",
    },
  ],

  // Reseñas reales extraídas de Google Maps (junio 2026)
  reviews: [
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
  ],

  processSteps: [
    {
      title: "Consultá sin cargo",
      text: "Escribinos por WhatsApp o llamanos al 11-4673-4420. Contanos tu situación y te orientamos sin costo ni compromiso.",
    },
    {
      title: "Analizamos tu caso",
      text: "Nuestros abogados laboralistas evalúan tu situación y te explican qué derechos tenés y cuál es el mejor camino.",
    },
    {
      title: "Iniciamos tu reclamo",
      text: "Nos encargamos de telegramas, SECLO y procesos judiciales. Solo cobramos honorarios si obtenemos un resultado favorable.",
    },
  ],

  whyReasons: [
    {
      text: "<strong>Consulta sin cargo:</strong> la primera orientación es gratuita por WhatsApp o teléfono, las 24 horas.",
    },
    {
      text: "<strong>Sin costos previos:</strong> financiamos los gastos del reclamo. Solo cobramos si ganamos.",
    },
    {
      text: "<strong>Equipo especializado:</strong> abogados laboralistas dedicados a la defensa de los derechos de los trabajadores.",
    },
    {
      text: "<strong>Resolución rápida y eficaz:</strong> telegramas, audiencias ante el SECLO y conducción de procesos judiciales.",
    },
  ],

  faq: [
    {
      question: "¿La consulta tiene algún costo?",
      answer:
        "No. La consulta es sin cargo y sin compromiso. Podés contactarnos por WhatsApp al 11-4673-4420 o por teléfono y un abogado te orientará sobre tu caso.",
    },
    {
      question: "¿Tengo que pagar algo por adelantado?",
      answer:
        "No cobramos gastos ni adelantos. Financiamos los costos del reclamo y solo cobramos honorarios en caso de obtener un resultado exitoso para vos.",
    },
    {
      question: "¿Qué pasa si trabajé en negro?",
      answer:
        "Aunque no tengas recibos de sueldo, podés reclamar el reconocimiento de la relación laboral, indemnizaciones y aportes. Somos especialistas en trabajo en negro.",
    },
    {
      question: "¿Atienden las 24 horas?",
      answer:
        "Sí. Nuestro equipo atiende consultas por WhatsApp y teléfono las 24 horas, todos los días. Muchos clientes lo confirman en sus reseñas de Google.",
    },
    {
      question: "¿En qué zonas atienden?",
      answer:
        "Nuestro estudio está en Tucumán 1668, 2ºA, CABA. Atendemos casos en Capital Federal y Gran Buenos Aires.",
    },
    {
      question: "¿Qué documentación necesito para la consulta?",
      answer:
        "Para la primera consulta no necesitás documentación. Contanos tu situación y te indicaremos qué documentos conviene reunir según tu caso.",
    },
  ],
};

function getWhatsAppUrl(config) {
  config = config || SITE_CONFIG;
  const message = encodeURIComponent(config.whatsappMessage);
  return `https://wa.me/${config.whatsapp}?text=${message}`;
}

function getPhoneUrl(config) {
  config = config || SITE_CONFIG;
  return `tel:${config.phone.replace(/\s/g, "")}`;
}

const ICONS = {
  shield:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  clock:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  check:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  scale:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l2 12h10l2-12"/></svg>',
  briefcase:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
  heart:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  file:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
};

function getIcon(name) {
  return ICONS[name] || ICONS.check;
}

function stripHtml(text) {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildSchema(config) {
  config = config || SITE_CONFIG;
  const legalServiceId = config.domain + "/#legal-service";
  const websiteId = config.domain + "/#website";
  const faqId = config.domain + "/#faq";

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
        image: config.domain + "/assets/images/og-image.jpg",
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
        sameAs: [config.googleMapsUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de derecho laboral",
          itemListElement: config.specialties.map(function (spec, index) {
            return {
              "@type": "Offer",
              position: index + 1,
              itemOffered: {
                "@type": "Service",
                name: spec.title,
                description: spec.description,
              },
            };
          }),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: config.googleRating,
          reviewCount: config.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: config.reviews.slice(0, 3).map(function (r) {
          return {
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
            },
            reviewBody: stripHtml(r.text),
          };
        }),
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: config.faq.map(function (item) {
          return {
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          };
        }),
      },
    ],
  };
}
