import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { createBreadcrumbStructuredData } from "@/lib/structured-data";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

type Section = { title: string; body: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "seo.privacy" });
  return createPageMetadata({ locale: language, title: t("title"), description: t("description"), path: "/privacy" });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as Section[];
  return (
    <main className="page-shell">
      <JsonLd data={createBreadcrumbStructuredData(language, [
        { name: site.name[language], path: "/" },
        { name: t("title"), path: "/privacy" },
      ])} />
      <header className="page-intro"><p className="eyebrow">{t("title")}</p><h1>{t("title")}</h1><p>{t("intro")}</p></header>
      <div className="legal-sections page-section">
        {sections.map((section) => <section className="content-card" key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
        <Link className="text-link" href="/contact">{t("back")}</Link>
      </div>
    </main>
  );
}
