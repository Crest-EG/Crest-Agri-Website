import { getTranslations } from "next-intl/server";

import { MarketMap } from "@/components/MarketMap";
import { ScrollJourney } from "@/components/ScrollJourney";
import { CrestSylvaHero } from "@/components/sylva-hero/CrestSylvaHero";
import { buildCrestSylvaDocument } from "@/components/sylva-hero/sylvaDocument";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: activeLocale, namespace: "landing.sylva" });
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
      <div id="crest-journey">
        <ScrollJourney marketMap={<MarketMap locale={activeLocale} />} />
      </div>
    </main>
  );
}
