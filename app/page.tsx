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
import { Specialties } from "@/components/sections/Specialties";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { buildSchemaPageConfig } from "@/lib/schema";
import { SEO } from "@/lib/site-config";
import { SpeedInsights } from "@vercel/speed-insights/next";

const isFtpExport = process.env.BUILD_TARGET === "ftp";

export async function generateMetadata(): Promise<Metadata> {
  return {
    description: SEO.description,
    openGraph: {
      description: SEO.ogDescription,
    },
    twitter: {
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
      <main>
        <Hero />
        <TrustBar />
        <Specialties />
        <AccidentTypes />
        <LegalAssistance />
        <Documentation />
        <Process />
        <WhyUs />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatCta />
    </>
  );
}
