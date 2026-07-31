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

export interface AccidentType {
  title: string;
  description: string;
}

export interface DocItem {
  title: string;
  description: string;
}

export interface LegalPoint {
  title: string;
  description: string;
}

export interface SiteConfig {
  brand: string;
  /** Teléfonos de contacto (todos visibles). El primero es el principal para CTAs. */
  phones: string[];
  /** WhatsApp en formato internacional sin + (uno por cada teléfono). */
  whatsapps: string[];
  /** @deprecated Usar phones[0] — se mantiene por compatibilidad */
  phone: string;
  /** @deprecated Usar whatsapps[0] */
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
  accidentIntro: string;
  accidentIntroSupport: string;
  accidentTypes: AccidentType[];
  legalAssistanceIntro: string;
  legalAssistancePoints: LegalPoint[];
  documentationIntro: string;
  documentationItems: DocItem[];
  documentationNote: string;
  reviews: Review[];
  processSteps: ProcessStep[];
  whyReasons: WhyReason[];
  faq: FaqItem[];
}

const PHONES = ["261 255-7461", "261 558-3158"] as const;
const WHATSAPPS = ["5492612557461", "5492615583158"] as const;

export const SITE_CONFIG: SiteConfig = {
  brand: "Hidalgo & Crifo Abogados",
  phones: [...PHONES],
  whatsapps: [...WHATSAPPS],
  phone: PHONES[0],
  whatsapp: WHATSAPPS[0],
  whatsappMessage:
    "Hola, necesito asesoramiento legal urgente. Vi su página y me gustaría que me orienten.",
  email: "alejandrohidalgoabogado@hotmail.com",
  address: "Mitre 535, 1° piso, oficinas 43 y 44, Ciudad de Mendoza",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Mitre+535+Mendoza",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Mitre+535+Mendoza",
  instagramUrl: "",
  domain: "https://www.defensasyaccidentes.com.ar",
  googlePlaceId: "",

  trustBadges: [
    { icon: "scale", text: "Experiencia" },
    { icon: "clock", text: "Velocidad" },
    { icon: "check", text: "Eficacia" },
    { icon: "shield", text: "Confidencialidad" },
  ],

  heroStatsTitle: "Nuestro equipo a su disposición, de manera inmediata",
  heroStats: [
    "Más de 20 años de trayectoria",
    "Defensa penal urgente las 24 hs",
    "Mendoza y Justicia Federal",
    "Secreto profesional absoluto",
    "Respuesta inmediata por WhatsApp",
  ],

  specialties: [
    {
      id: "investigacion",
      title: "¿Te están investigando?",
      description:
        "No esperes a la imputación. Si sospechás de una causa en tu contra, blindamos tu situación legal con una estrategia preventiva. Protegemos tu patrimonio y tu libertad desde el primer momento.",
      whatsappMessage:
        "Hola, creo que me están investigando y necesito asesoramiento penal urgente.",
      track: "cta-section-investigacion",
      icon: "shield",
    },
    {
      id: "detenido",
      title: "¿Un familiar está detenido?",
      description:
        "Intervención inmediata en comisarías y juzgados las 24 hs. Gestionamos pedidos de excarcelación y control de legalidad para asegurar la libertad y la integridad de tu familiar sin demoras.",
      whatsappMessage:
        "Hola, un familiar está detenido y necesito intervención penal urgente.",
      track: "cta-section-detenido",
      icon: "clock",
    },
    {
      id: "citacion",
      title: "¿Recibiste una citación?",
      description:
        "No te presentes ante la justicia sin defensa especializada. Analizamos el expediente, preparamos tu declaración y te acompañamos para evitar que un error procesal comprometa tu futuro.",
      whatsappMessage:
        "Hola, recibí una citación judicial y necesito un abogado penalista.",
      track: "cta-section-citacion",
      icon: "file",
    },
  ],

  accidentIntro:
    "Contar con un abogado especializado en accidentes de tránsito es fundamental para asegurar una compensación justa.",
  accidentIntroSupport:
    "Nuestros abogados expertos en accidentes de tránsito lo guiarán en cada paso del proceso.",

  accidentTypes: [
    {
      title: "Choque en cadena",
      description:
        "Ocurre cuando tres o más vehículos chocan de forma sucesiva en la misma dirección. La complejidad de estos casos radica en determinar la responsabilidad de cada conductor.",
    },
    {
      title: "Choque frontal",
      description:
        "Es un impacto entre vehículos que circulan en direcciones opuestas.",
    },
    {
      title: "Choque trasero",
      description:
        "Sucede cuando un vehículo impacta por detrás a otro. En la mayoría de los casos, la responsabilidad recae sobre el conductor del vehículo que impacta por detrás.",
    },
    {
      title: "Atropello",
      description:
        "Se produce cuando un vehículo impacta a un peatón, ciclista o motociclista. Estos casos suelen ser especialmente graves debido a la vulnerabilidad de las víctimas.",
    },
    {
      title: "Vuelco",
      description:
        "Ocurre cuando un vehículo se voltea sobre su costado o techo. Puede ser causado por una maniobra brusca, exceso de velocidad o un impacto previo.",
    },
  ],

  legalAssistanceIntro:
    "Las compañías de seguros a menudo buscan minimizar los pagos, y un abogado experto puede:",
  legalAssistancePoints: [
    {
      title: "Determinar la responsabilidad",
      description:
        "Analizar la evidencia (informe policial, peritajes, testigos) para establecer quién fue el culpable del accidente.",
    },
    {
      title: "Calcular la indemnización",
      description:
        "Asegurar que se incluyan todos los daños (materiales, lesiones, gastos médicos, lucro cesante y daño moral).",
    },
    {
      title: "Negociar con las aseguradoras",
      description:
        "Tratar directamente con la compañía de seguros para lograr un acuerdo beneficioso para el cliente.",
    },
    {
      title: "Iniciar una demanda",
      description:
        "Si no se llega a un acuerdo justo, el abogado puede iniciar un proceso judicial para defender los derechos del damnificado.",
    },
  ],

  documentationIntro:
    "Si nos enviás la siguiente documentación, podemos avanzar más rápido en el reclamo.",
  documentationItems: [
    {
      title: "Fotos del hecho",
      description:
        "Si las tenés, sirven fotos del lugar, los daños, las patentes y cualquier evidencia visible del accidente.",
    },
    {
      title: "Certificados médicos",
      description:
        "Estudios, constancias de atención o guardia, y cualquier documento que acredite lesiones o controles posteriores.",
    },
    {
      title: "Documentación personal",
      description:
        "DNI, registro, cédula verde y los datos del vehículo involucrado, si corresponden.",
    },
  ],
  documentationNote:
    "No frenes la consulta si no tenés todo. Si hoy te falta parte de la documentación, igual podés enviarnos el caso y te indicamos qué conviene reunir.",

  reviews: [],

  processSteps: [
    {
      title: "Consultá de inmediato",
      text: "Escribinos por WhatsApp o llamanos al 261 255-7461 / 261 558-3158. Contanos tu situación penal o de accidente y te orientamos sin demoras.",
    },
    {
      title: "Analizamos tu caso",
      text: "Evaluamos riesgos, la situación procesal o el reclamo frente a la aseguradora, y definimos la estrategia legal más sólida.",
    },
    {
      title: "Actuamos por vos",
      text: "Intervenimos en comisarías y juzgados, negociamos con aseguradoras o iniciamos el proceso judicial. Acompañamiento constante y confidencial.",
    },
  ],

  whyReasons: [
    {
      text: "<strong>Experiencia:</strong> más de 20 años de trayectoria y un equipo interdisciplinario para causas penales y accidentes de tránsito.",
    },
    {
      text: "<strong>Velocidad:</strong> actuación inmediata ante detenciones, allanamientos, imputaciones y urgencias las 24 horas.",
    },
    {
      text: "<strong>Eficacia:</strong> estrategia preventiva, negociación con aseguradoras y defensa en Mendoza y Justicia Federal.",
    },
    {
      text: "<strong>Confidencialidad:</strong> toda comunicación está protegida por el secreto profesional, con estricta reserva.",
    },
  ],

  faq: [
    {
      question: "¿Cuándo debería contactar a un abogado penalista?",
      answer:
        "Ante cualquier denuncia, imputación, citación judicial, allanamiento o situación penal inesperada, actuar rápidamente puede marcar una diferencia determinante. El asesoramiento temprano permite proteger derechos, evitar errores y definir una estrategia legal sólida desde el inicio.",
    },
    {
      question: "¿El estudio atiende urgencias penales?",
      answer:
        "Sí. El estudio interviene de manera inmediata ante detenciones, allanamientos, declaraciones indagatorias, conflictos penales complejos y situaciones que requieren asistencia urgente. Nuestro equipo se encuentra preparado para actuar con rapidez y eficiencia.",
    },
    {
      question: "¿Qué diferencia al estudio frente a otros estudios jurídicos?",
      answer:
        "La experiencia, el trabajo estratégico, la rapidez de respuesta y el acompañamiento constante forman parte del enfoque del estudio. Más de 20 años de trayectoria y un equipo interdisciplinario permiten abordar casos complejos con profesionalismo, discreción y compromiso.",
    },
    {
      question: "¿Qué tipo de casos penales trabaja el estudio?",
      answer:
        "El estudio se especializa en Derecho Penal y trabaja en causas vinculadas a delitos económicos, homicidios, robos, narcotráfico, abuso sexual, violencia de género, ciberdelitos, querellas, revisiones de causas penales, recursos e impugnaciones, entre otras áreas complejas, tanto en el ámbito provincial de Mendoza como en la Justicia Federal.",
    },
    {
      question: "¿El estudio también trabaja Derecho Civil?",
      answer:
        "Sí. Además de su fuerte especialización en Derecho Penal, el estudio está especializado también en Accidentes de Tránsito.",
    },
    {
      question: "¿La consulta es confidencial?",
      answer:
        "Absolutamente. Toda comunicación con el estudio se encuentra protegida por el secreto profesional y es tratada con estricta reserva y confidencialidad.",
    },
    {
      question: "¿Cómo es la primera consulta?",
      answer:
        "La primera reunión permite analizar el caso, evaluar riesgos, comprender la situación procesal y definir posibles líneas de acción. Puede realizarse de manera presencial o virtual, según las necesidades del cliente.",
    },
    {
      question: "¿Puedo realizar consultas virtuales?",
      answer:
        "Sí. El estudio ofrece reuniones virtuales para clientes de distintas ciudades o situaciones que requieran mayor comodidad y privacidad.",
    },
    {
      question: "¿Qué ocurre si soy investigado o citado en una causa penal?",
      answer:
        "Recibir una citación judicial o verse involucrado en una investigación penal no implica necesariamente culpabilidad. Contar con asesoramiento legal desde el primer momento resulta fundamental para proteger derechos, evitar errores procesales y afrontar la situación con una estrategia jurídica adecuada y confidencial.",
    },
    {
      question: "¿En qué zonas atienden?",
      answer:
        "Nuestro estudio está en Mitre 535, 1° piso, oficinas 43 y 44, Ciudad de Mendoza. Atendemos causas en el ámbito provincial de Mendoza y en la Justicia Federal.",
    },
  ],
};

export const SEO = {
  title:
    "Abogados Penalistas y Accidentes de Tránsito Mendoza | Hidalgo & Crifo",
  description:
    "Hidalgo & Crifo Abogados. Defensa penal urgente las 24 hs y reclamos por accidentes de tránsito en Mendoza. Consultá por WhatsApp al 261 255-7461 / 261 558-3158.",
  ogDescription:
    "Estudio jurídico en Mendoza. Derecho penal y accidentes de tránsito. Defensa urgente las 24 hs. WhatsApp 261 255-7461 / 261 558-3158.",
  twitterDescription:
    "Defensa penal urgente y accidentes de tránsito en Mendoza. Hidalgo & Crifo Abogados. WhatsApp 261 255-7461 / 261 558-3158.",
  ogImageAlt:
    "Hidalgo & Crifo Abogados — Defensa penal y accidentes de tránsito en Mendoza",
  googleAdsId: "",
} as const;
