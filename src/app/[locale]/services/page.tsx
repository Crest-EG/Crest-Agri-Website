import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/Button";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { createBreadcrumbStructuredData, createFaqStructuredData } from "@/lib/structured-data";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

const processSteps = ["sourcing", "artwork", "packing", "dispatch"] as const;
// TODO(replace): Bilingual export service and private-label descriptions | Crest export team | Confirm service scope and approval flow, then update the services namespace in both message files.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "seo.services" });
  return createPageMetadata({ locale: language, title: t("title"), description: t("description"), path: "/services" });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations("services");
  const faq = await getTranslations("faq");
  const faqItems = faq.raw("items") as { question: string; answer: string }[];
  return (
    <main className="page-shell services-page">
      <JsonLd data={createBreadcrumbStructuredData(language, [
        { name: site.name[language], path: "/" },
        { name: t("title"), path: "/services" },
      ])} />
      <JsonLd data={createFaqStructuredData(faqItems)} />
      <header className="page-intro services-intro">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
      </header>
      <section className="service-overview page-section">
        <div className="service-photo">
          <Image src="/images/landing/harvest.webp" alt={t("assuranceImageAlt")} fill sizes="(max-width: 900px) 100vw, 36vw" />
          <aside className="service-photo-note content-card">
            <p className="eyebrow">{t("quality")}</p>
            <p>{t("qualityBody")}</p>
          </aside>
        </div>
        <div>
          <p className="eyebrow">{t("provenance")}</p>
          <h2>{t("oversight")}</h2>
          <p>{t("oversightBody")}</p>
          <div className="service-support"><span>{t("sourcing")}</span><span>{t("dispatch")}</span></div>
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading"><h2>{t("privateLabel")}</h2><p>{t("privateLabelBody")}</p></div>
        <ol className="service-steps">
          {processSteps.map((key, index) => <li className="content-card" key={key}><span>{String(index + 1).padStart(2, "0")}</span><h3>{t(key)}</h3></li>)}
        </ol>
      </section>
      <section className="shipping-card content-card">
        <div><p className="eyebrow">{t("dispatch")}</p><h2>{t("shipping")}</h2><p>{t("shippingBody")}</p></div>
        <div className="shipping-card-visual"><Image src="/images/landing/export-truck.webp" alt={t("shippingImageAlt")} fill sizes="(max-width: 900px) 100vw, 40vw" /></div>
        <ButtonLink href="/contact#quote">{t("contactAction")} <DirectionalArrow kind="forward" /></ButtonLink>
      </section>
      <section className="services-link"><Link className="text-link" href="/products">{t("productsAction")} <DirectionalArrow kind="forward" /></Link></section>
      <section className="page-section services-faq" aria-labelledby="services-faq-title">
        <header className="page-intro"><h2 id="services-faq-title">{faq("title")}</h2></header>
        <div className="faq-list">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary className="faq-question">
                <span className="faq-question-copy">
                  <span className="faq-label">{faq("questionLabel")}</span>
                  <span className="faq-question-text">{item.question}</span>
                </span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <span className="faq-label">{faq("answerLabel")}</span>
                  <p>{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
