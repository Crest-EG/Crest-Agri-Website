import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type CopyItem = { title: string; body: string };
type FaqItem = { question: string; answer: string };

const certifications = [
  { key: "globalgap", image: "/images/certifications/globalgap.webp", width: 625, height: 625 },
  { key: "grasp", image: "/images/certifications/grasp.webp", width: 625, height: 625 },
  { key: "smeta", image: "/images/certifications/smeta.webp", width: 420, height: 160 },
  { key: "iso", image: "/images/certifications/iso.webp", width: 365, height: 335 },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications" });
  return { title: t("title"), description: t("intro") };
}

export default async function CertificationsPage() {
  const t = await getTranslations("certifications");
  const benefits = t.raw("benefits") as CopyItem[];
  const faq = t.raw("faq") as FaqItem[];
  return (
    <main className="page-shell certification-page">
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
            <div className="certification-mark">
              <Image src={image} alt={t("certAlt", { certification: t(key) })} width={width} height={height} sizes="(max-width: 560px) 78vw, (max-width: 900px) 38vw, 20vw" />
            </div>
            <div><h2>{t(key)}</h2>{key === "smeta" ? <p>{t("smetaType")}</p> : null}</div>
          </article>
        ))}
      </section>
      <section className="page-section certification-faq" aria-labelledby="certification-faq-title">
        <h2 className="page-heading" id="certification-faq-title">{t("faqTitle")}</h2>
        <div>{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        <Link className="text-link" href="/contact#quote">{t("documentAction")} <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
