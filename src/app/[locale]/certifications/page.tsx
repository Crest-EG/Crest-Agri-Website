import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const certificationKeys = ["globalgap", "smeta", "iso"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications" });
  return { title: t("title"), description: t("intro") };
}

export default async function CertificationsPage() {
  const t = await getTranslations("certifications");
  return (
    <main className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">{t("title")}</p>
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
      </header>
      <section className="page-section product-grid" aria-label={t("title")}>
        {certificationKeys.map((key, index) => (
          <article className="content-card" key={key}>
            <p className="eyebrow" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
            <h2>{t(key)}</h2>
            <p>{t("placeholder")}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
