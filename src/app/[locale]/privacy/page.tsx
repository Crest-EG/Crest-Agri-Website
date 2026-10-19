import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title"), description: t("intro") };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  return (
    <main className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">{t("title")}</p>
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
      </header>
      <section className="page-section content-card" aria-labelledby="privacy-use-title">
        <h2 id="privacy-use-title">{t("useTitle")}</h2>
        <p>{t("use")}</p>
        <h2>{t("contactTitle")}</h2>
        <p>{t("contact")}</p>
        <Link className="text-link" href="/contact">{t("back")}</Link>
      </section>
    </main>
  );
}
