import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAds } from "@/components/GoogleAds";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Tracking } from "@/components/Tracking";
import { SEO, SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.brand,
    title: SEO.title,
    description: SEO.ogDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: SEO.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abogados Laborales CABA | Consulta Gratis",
    description: SEO.twitterDescription,
    images: [ogImage],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "legal",
  other: {
    "geo.region": "AR-C",
    "geo.placename": "Buenos Aires",
    "geo.position": "-34.6020072;-58.3907044",
    ICBM: "-34.6020072, -58.3907044",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1222",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={inter.className}>
        <GoogleAds />
        {children}
        <ScrollReveal />
        <SmoothScroll />
        <Tracking />
      </body>
    </html>
  );
}
