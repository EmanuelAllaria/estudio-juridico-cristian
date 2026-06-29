export type IconName =
  | "shield"
  | "clock"
  | "check"
  | "scale"
  | "briefcase"
  | "heart"
  | "file";

export interface TrustBadge {
  icon: IconName;
  text: string;
}

export interface Specialty {
  id: string;
  title: string;
  description: string;
  whatsappMessage: string;
  track: string;
  icon: IconName;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface WhyReason {
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  brand: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  mapsUrl: string;
  googleMapsUrl: string;
  instagramUrl: string;
  domain: string;
  googlePlaceId: string;
  trustBadges: TrustBadge[];
  heroStatsTitle: string;
  heroStats: string[];
  specialties: Specialty[];
  reviews: Review[];
  processSteps: ProcessStep[];
  whyReasons: WhyReason[];
  faq: FaqItem[];
}

export const SITE_CONFIG: SiteConfig = {
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
  instagramUrl: "https://www.instagram.com/abogadolaboral.caba/",
  domain: "https://www.aboglaborales.com.ar",
  googlePlaceId: "ChIJ-WaEq6DLvJURNPjBCPDYmJE",

  trustBadges: [
    { icon: "shield", text: "Sin adelantos ni gastos previos" },
    { icon: "clock", text: "Atención 24 horas por WhatsApp y teléfono" },
    { icon: "check", text: "Consulta sin cargo y confidencial" },
    { icon: "scale", text: "Honorarios solo por resultado" },
  ],

  heroStatsTitle: "¿Por qué miles de trabajadores nos eligen?",
  heroStats: [
    "20+ años defendiendo trabajadores",
    "10.000+ trabajadores confiaron en nosotros",
    "2.500+ casos resueltos",
    "Calificación 5 estrellas en Google",
    "Respuesta rápida por WhatsApp",
  ],

  specialties: [
    {
      id: "despidos",
      title: "¿Te despidieron?",
      description:
        "Despido con o sin causa, verbal o por telegrama. Te asesoramos para reclamar tu máxima indemnización. No firmes nada sin consultar.",
      whatsappMessage:
        "Hola Estudio, me despidieron y necesito asesoramiento urgente.",
      track: "cta-section-despidos",
      icon: "briefcase",
    },
    {
      id: "negro",
      title: "¿Trabajás en negro?",
      description:
        "Si no estás registrado o te pagan una parte en mano, tenés derecho a exigir que te blanqueen o a considerarte despedido y reclamar una indemnización.",
      whatsappMessage:
        "Hola Estudio, me despidieron y necesito asesoramiento urgente.",
      track: "cta-section-negro",
      icon: "file",
    },
    {
      id: "accidentes",
      title: "¿Tuviste un accidente?",
      description:
        "Lesiones en tu trabajo o yendo/volviendo (in itinere). Reclamamos ante la ART la indemnización que te corresponde con peritos médicos propios.",
      whatsappMessage:
        "Hola, tuve un accidente de trabajo y quiero consultar por el reclamo a la ART.",
      track: "cta-section-accidentes",
      icon: "heart",
    },
    {
      id: "sueldos",
      title: "¿Te deben sueldos?",
      description:
        "Falta de pago de salarios, aguinaldos, horas extras o atrasos constantes. Evaluamos la deuda y gestionamos el reclamo urgente.",
      whatsappMessage:
        "Hola Estudio, la empresa me debe sueldos y quiero iniciar el reclamo.",
      track: "cta-section-sueldos",
      icon: "scale",
    },
    {
      id: "renuncia",
      title: "¿Te obligan a renunciar?",
      description:
        "No envíes ningún telegrama ni firmes nada sin asesorarte. Si te maltratan, te cambian el horario o te presionan para que te vayas, tenés derecho a reclamar tu indemnización.",
      whatsappMessage:
        "Hola Estudio, necesito asesoramiento porque me están presionando para renunciar.",
      track: "cta-section-renuncia",
      icon: "shield",
    },
    {
      id: "liquidacion",
      title: "¿Cuánto te corresponde?",
      description:
        "Te ayudamos a calcular tu liquidación e indemnización exacta según tu antigüedad y sueldo real para que reclames lo que la ley te garantiza.",
      whatsappMessage:
        "Hola, me gustaría que me ayuden a calcular mi liquidación e indemnización.",
      track: "cta-section-liquidacion",
      icon: "clock",
    },
  ],

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

export const SEO = {
  title: "Abogados Laborales CABA | Despidos y Accidentes | Consulta Gratis",
  description:
    "Abogados laborales en CABA. Especialistas en despidos, accidentes de trabajo y empleo en negro. Consulta sin cargo por WhatsApp 11-4673-4420, 24 horas. 5 estrellas en Google.",
  ogDescription:
    "Abogados laborales en CABA. Despidos, accidentes de trabajo y empleo en negro. Consulta sin cargo: 11-4673-4420. 5 estrellas en Google.",
  twitterDescription:
    "Abogados laborales en CABA. Consulta sin cargo por WhatsApp 11-4673-4420. 5 estrellas en Google.",
  ogImageAlt:
    "Abogados Laborales — Defendemos tus derechos laborales sin adelantos",
  googleAdsId: "AW-996950383",
} as const;
