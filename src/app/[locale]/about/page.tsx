import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type AboutCopy = { qualityTitle: string; qualityItems: string[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("intro") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const copy = t.raw("qualityItems") as AboutCopy["qualityItems"];
  return (
    <main className="page-shell about-page">
      <header className="page-intro about-intro"><p className="eyebrow">{t("title")}</p><h1>{t("intro")}</h1></header>
      <div className="about-hero-visual"><Image src="/images/stitch-about/orchard.jpg" alt={t("imageAlt")} fill sizes="(max-width: 900px) 100vw, 80vw" priority /></div>
      <section className="page-section about-story"><p className="eyebrow">{t("storyTitle")}</p><h2>{t("story")}</h2></section>
      <section className="about-values page-section">
        <article className="content-card"><p className="eyebrow">{t("visionTitle")}</p><h2>{t("vision")}</h2></article>
        <article className="content-card"><p className="eyebrow">{t("missionTitle")}</p><h2>{t("mission")}</h2></article>
      </section>
      <section className="page-section content-card about-quality"><p className="eyebrow">{t("qualityTitle")}</p><h2>{t("qualityTitle")}</h2><ol>{copy.map((item) => <li key={item}>{item}</li>)}</ol></section>
    </main>
  );
}
