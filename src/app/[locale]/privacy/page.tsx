import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// TODO(confirm): Have the company’s legal reviewer confirm this localized policy before publication.
type Section = { title: string; body: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title"), description: t("intro") };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as Section[];
  return (
    <main className="page-shell">
      <header className="page-intro"><p className="eyebrow">{t("title")}</p><h1>{t("title")}</h1><p>{t("intro")}</p></header>
      <div className="legal-sections page-section">
        {sections.map((section) => <section className="content-card" key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
        <Link className="text-link" href="/contact">{t("back")}</Link>
      </div>
    </main>
  );
}
