import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { QuoteForm } from "@/components/QuoteForm";
import { Link } from "@/i18n/navigation";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import { site } from "@/content/site";
import { products } from "@/content/products";

type ContactProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string | string[] }>;
};

export async function generateMetadata({ params }: Pick<ContactProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("intro") };
}

export default async function ContactPage({ params, searchParams }: ContactProps) {
  const { locale } = await params;
  const query = await searchParams;
  const requested = Array.isArray(query.product) ? query.product[0] : query.product;
  const initialProduct = products.some((product) => product.slug === requested) ? requested ?? "" : "";
  const language = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale, namespace: "contact" });
  const q = await getTranslations({ locale, namespace: "quote" });
  const faq = await getTranslations({ locale, namespace: "faq" });
  // TODO(replace): Bilingual FAQ answers | Crest export team | Confirm product, season, private-label and quotation practices, then update the faq namespace in both message files.
  const faqItems = faq.raw("items") as { question: string; answer: string }[];

  return (
    <main className="page-shell contact-page">
      <header className="page-intro">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
      </header>
      <div className="contact-grid">
        <section className="contact-details content-card" aria-labelledby="contact-details-title">
          <h2 id="contact-details-title">{t("detailsTitle")}</h2>
          <p>{site.name[language]}</p>
          <address>{site.address[language]}</address>
          <a href={site.mapsUrl} target="_blank" rel="noreferrer">{t("maps")}</a>
          <div className="contact-links">
            {site.phones.map((phone) => <a key={phone} href={`tel:${phone.replaceAll(" ", "")}`}>{phone}</a>)}
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.website}>{t("website")}</a>
          </div>
          <p className="contact-prompt">{t("followUp")}</p>
          <Link className="text-link" href="/products">{t("browseProducts")} <DirectionalArrow kind="forward" /></Link>
        </section>
        <section id="quote" className="contact-quote">
          <p className="eyebrow">{q("title")}</p>
          <QuoteForm initialProduct={initialProduct} />
        </section>
      </div>
      <section className="page-section" aria-labelledby="contact-faq-title">
        <header className="page-intro"><h2 id="contact-faq-title">{faq("title")}</h2></header>
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
