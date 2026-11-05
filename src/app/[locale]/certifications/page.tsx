import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { createBreadcrumbStructuredData } from "@/lib/structured-data";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

type CopyItem = { title: string; body: string };
const certifications = ["globalgap", "smeta", "iso"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "seo.certifications" });
  return createPageMetadata({ locale: language, title: t("title"), description: t("description"), path: "/certifications" });
}

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations("certifications");
  const benefits = t.raw("benefits") as CopyItem[];
  return (
    <main className="page-shell certification-page">
      <JsonLd data={createBreadcrumbStructuredData(language, [
        { name: site.name[language], path: "/" },
        { name: t("title"), path: "/certifications" },
      ])} />
      <header className="page-intro">
        <p className="eyebrow">{t("title")}</p>
        <h1>{t("intro")}</h1>
      </header>
      <section className="page-section certification-intro-copy" aria-labelledby="quality-title">
        <h2 className="page-heading" id="quality-title">{t("qualityTitle")}</h2>
        <p>{t("quality")}</p>
      </section>
      <section className="page-section certification-benefits" aria-labelledby="benefits-title">
        <h2 className="page-heading" id="benefits-title">{t("benefitsTitle")}</h2>
        <ul>{benefits.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ul>
      </section>
      <section className="page-section certification-grid" aria-label={t("title")}>
        <div className="product-spec-grid">
          {certifications.map((key) => <article className="product-spec-card" key={key}><h2>{t(key)}</h2><p>{t(`${key}Description`)}</p></article>)}
        </div>
      </section>
    </main>
  );
}
