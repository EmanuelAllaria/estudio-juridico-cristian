import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FloatCta } from "@/components/layout/FloatCta";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AccidentTypes } from "@/components/sections/AccidentTypes";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Documentation } from "@/components/sections/Documentation";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { LegalAssistance } from "@/components/sections/LegalAssistance";
import { Process } from "@/components/sections/Process";
import { SeoCoverage } from "@/components/sections/SeoCoverage";
import { Specialties } from "@/components/sections/Specialties";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { buildSchemaPageConfig } from "@/lib/schema";
import { SEO, SITE_CONFIG } from "@/lib/site-config";
import { SpeedInsights } from "@vercel/speed-insights/next";

const isFtpExport = process.env.BUILD_TARGET === "ftp";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SEO.title,
    description: SEO.description,
    keywords: [...SEO.keywords],
    alternates: {
      canonical: SITE_CONFIG.domain,
    },
    openGraph: {
      title: SEO.title,
      description: SEO.ogDescription,
      url: SITE_CONFIG.domain,
      type: "website",
      locale: SEO.locale,
      siteName: SITE_CONFIG.brand,
    },
    twitter: {
      title: SEO.titleShort,
      description: SEO.twitterDescription,
    },
  };
}

export default async function HomePage() {
  const pageConfig = buildSchemaPageConfig();

  return (
    <>
      {!isFtpExport && <SpeedInsights />}
      <JsonLd config={pageConfig} />
      <Header />
      <main itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content={SEO.title} />
        <meta itemProp="description" content={SEO.description} />
        <Hero />
        <TrustBar />
        <Specialties />
        <AccidentTypes />
        <LegalAssistance />
        <Documentation />
        <Process />
        <WhyUs />
        <SeoCoverage />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatCta />
    </>
  );
}
