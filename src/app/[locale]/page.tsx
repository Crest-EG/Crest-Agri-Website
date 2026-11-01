import { getTranslations } from "next-intl/server";

import { EditorialGallery } from "@/components/EditorialGallery";
import { LandingCallToAction } from "@/components/LandingCallToAction";
import { MarketMap } from "@/components/MarketMap";
import { ScrollJourney } from "@/components/ScrollJourney";
import { CrestSylvaHero } from "@/components/sylva-hero/CrestSylvaHero";
import { buildCrestSylvaDocument } from "@/components/sylva-hero/sylvaDocument";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "landing.seo" });
  return createPageMetadata({
    locale: language,
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: activeLocale, namespace: "landing.sylva" });
  const cta = await getTranslations({ locale: activeLocale, namespace: "landing.finalCta" });
  const srcDoc = buildCrestSylvaDocument({
    locale: activeLocale,
    copy: {
      documentTitle: t("documentTitle"),
      metaDescription: t("metaDescription"),
      headlineLine1: t("headlineLine1"),
      headlineLine2: t("headlineLine2"),
      lede: t("lede"),
      quoteCta: t("quoteCta"),
      productLabel: t("productLabel"),
      productCta: t("productCta"),
      statFormsLabel: t("statFormsLabel"),
      statFormsValue: t("statFormsValue"),
      statOriginLabel: t("statOriginLabel"),
      statOriginValue: t("statOriginValue"),
      scroll: t("scroll"),
      ghost: t("ghost"),
    },
  });

  return (
    <main id="home">
      <CrestSylvaHero srcDoc={srcDoc} title={t("documentTitle")} />
      <EditorialGallery />
      <div id="crest-journey">
        <ScrollJourney marketMap={<MarketMap locale={activeLocale} />} />
      </div>
      <LandingCallToAction
        eyebrow={cta("eyebrow")}
        title={cta("title")}
        description={cta("description")}
        buttonLabel={cta("button")}
        servicesLabel={cta("servicesLabel")}
        services={[
          cta("serviceFresh"),
          cta("servicePacking"),
          cta("serviceQuality"),
          cta("serviceExport"),
        ]}
      />
    </main>
  );
}
