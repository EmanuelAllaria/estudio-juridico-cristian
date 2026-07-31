import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import { GoogleAds } from "@/components/GoogleAds";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Tracking } from "@/components/Tracking";
import { SEO, SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-cinzel",
});

const ogImage = `${SITE_CONFIG.domain}/images/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: SEO.title,
    template: `%s | ${SITE_CONFIG.brand}`,
  },
  description: SEO.description,
  applicationName: SITE_CONFIG.brand,
  authors: [{ name: SITE_CONFIG.brand }],
  creator: SITE_CONFIG.brand,
  publisher: SITE_CONFIG.brand,
  keywords: [...SEO.keywords],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
      es: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.brand,
    title: SEO.title,
    description: SEO.ogDescription,
    countryName: "Argentina",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: SEO.ogImageAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.titleShort,
    description: SEO.twitterDescription,
    images: [ogImage],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "legal",
  classification: "Abogados, Derecho penal, Accidentes de tránsito, Mendoza",
  other: {
    "geo.region": SEO.geo.region,
    "geo.placename": SEO.geo.placename,
    "geo.position": `${SEO.geo.latitude};${SEO.geo.longitude}`,
    ICBM: `${SEO.geo.latitude}, ${SEO.geo.longitude}`,
    "og:locale:alternate": "es_ES",
    "business:contact_data:street_address":
      "Mitre 535, 1° piso, oficinas 43 y 44",
    "business:contact_data:locality": "Mendoza",
    "business:contact_data:region": "Mendoza",
    "business:contact_data:postal_code": "5500",
    "business:contact_data:country_name": "Argentina",
    "business:contact_data:email": SITE_CONFIG.email,
    "business:contact_data:phone_number": SITE_CONFIG.phones[0],
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1B2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${montserrat.variable} ${cinzel.variable}`}>
      <body className={montserrat.className}>
        <GoogleAds />
        {children}
        <ScrollReveal />
        <SmoothScroll />
        <Tracking />
      </body>
    </html>
  );
}
