import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const certifications = [
  { key: "globalgap", image: "/images/certifications/globalgap.webp" },
  { key: "grasp", image: "/images/certifications/grasp.webp" },
  { key: "smeta", image: "/images/certifications/smeta.webp" },
  { key: "iso", image: "/images/certifications/iso.webp" },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications" });
  return { title: t("title"), description: t("intro") };
}

export default async function CertificationsPage() {
  const t = await getTranslations("certifications");
  return (
    <main className="page-shell certification-page">
      <header className="page-intro">
        <p className="eyebrow">{t("title")}</p>
        <h1>{t("intro")}</h1>
      </header>
      <section className="page-section certification-intro-copy" aria-labelledby="quality-title">
        <h2 className="page-heading" id="quality-title">{t("qualityTitle")}</h2>
        <p>{t("quality")}</p><p className="certification-note">{t("smetaNote")}</p>
      </section>
      <section className="page-section certification-grid" aria-label={t("title")}>
        {certifications.map(({ key, image }) => (
          <article className="certification-card" key={key}>
            <div className="certification-mark">
              <Image src={image} alt={t("certAlt", { certification: t(key) })} width={420} height={300} sizes="(max-width: 560px) 80vw, (max-width: 900px) 40vw, 22vw" />
            </div>
            <div><h2>{t(key)}</h2>{key === "smeta" ? <p>{t("smetaType")}</p> : null}</div>
          </article>
        ))}
      </section>
    </main>
  );
}
