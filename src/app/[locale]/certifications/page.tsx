import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { createBreadcrumbStructuredData } from "@/lib/structured-data";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

type CopyItem = { title: string; body: string };
const certifications = [
  { key: "globalgap", image: "/images/certifications/globalgap.webp", width: 625, height: 625 },
  { key: "grasp", image: "/images/certifications/grasp.webp", width: 625, height: 625 },
  { key: "iso22000", image: "/images/certifications/iso-22000.webp", width: 177, height: 179 },
  { key: "iso", image: "/images/certifications/iso.webp", width: 365, height: 335 },
  { key: "brcgs", image: "/images/certifications/brcgs.webp", width: 158, height: 126 },
  { key: "fda", image: "/images/certifications/fda.webp", width: 190, height: 93 },
  { key: "gacc", image: "/images/certifications/gacc.webp", width: 222, height: 103 },
  { key: "haccp", image: "/images/certifications/haccp.webp", width: 189, height: 164 },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "seo.certifications" });
  return createPageMetadata({ locale: language, title: t("title"), description: t("description"), path: "/certifications", image: `/${language}/certifications/opengraph-image` });
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
        {certifications.map(({ key, image, width, height }) => (
          <article className="certification-card" key={key}>
            <Image src={image} alt={t("certAlt", { certification: t(key) })} width={width} height={height} sizes="(max-width: 560px) 42vw, (max-width: 900px) 24vw, 15vw" />
            <h2>{t(key)}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
