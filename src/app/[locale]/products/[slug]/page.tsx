import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ButtonLink } from "@/components/Button";
import { SeasonTimeline } from "@/components/SeasonTimeline";
import { products, getProductBySlug } from "@/content/products";
import { DirectionalArrow } from "@/components/DirectionalArrow";

type DetailProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const copy = await getTranslations({ locale, namespace: "products" });
  return { title: product.name[locale === "ar" ? "ar" : "en"], description: product.summary[locale === "ar" ? "ar" : "en"] + " " + copy("request") };
}

export default async function ProductDetailPage({ params }: DetailProps) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const language = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale, namespace: "products" });
  const forms = await getTranslations({ locale, namespace: "forms" });
  const monthNames = t.raw("monthNames") as string[];
  const monthLabels = t.raw("monthLabels") as string[];
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 4);
  const quoteHref = `/contact?product=${encodeURIComponent(product.slug)}#quote`;

  return (
    <main className="page-shell detail-page">
      <nav className="breadcrumb" aria-label={t("breadcrumbLabel")}>
        <Link href="/products">{t("title")}</Link><DirectionalArrow kind="chevron" /><span>{product.name[language]}</span>
      </nav>
      <section className="detail-hero">
        <div className="detail-copy">
          <p className="eyebrow">{t("dossier")} · {product.forms.map((form) => forms(form)).join(" / ")}</p>
          <h1>{product.name[language]}</h1>
          <p>{product.summary[language]}</p>
          <div className="detail-tags">
            {product.forms.map((form) => <span key={form}>{forms(form)}</span>)}
            <span>{t("worldwide")}</span>
          </div>
          <div className="detail-assurance">
            <strong>{t("originPacking")}</strong>
            <p>{product.harvest[language]}</p>
          </div>
          <div className="detail-actions">
            <ButtonLink href={quoteHref} variant="primary">{t("request")} <DirectionalArrow kind="forward" /></ButtonLink>
            <ButtonLink href={product.technicalSheetUrl} target="_blank" rel="noreferrer" variant="secondary">
              {t("technicalSheet")} <DirectionalArrow kind="external" />
            </ButtonLink>
          </div>
        </div>
        <div className="detail-gallery">
          <Placeholder label={t("imageAlt", { product: product.name[language] })} className="detail-main-image">
            {product.images[0]
              ? <Image src={product.images[0]} alt="" aria-hidden="true" fill sizes="(max-width: 600px) 100vw, 50vw" className="detail-photo" />
              : <span className="detail-glyph" aria-hidden="true">{product.name[language].slice(0, 1)}</span>}
          </Placeholder>
          {product.images.length > 1 && <div className="detail-thumbnails">
            {product.images.slice(1, 4).map((image, index) => (
              <div className="detail-thumbnail" key={image}><Image src={image} alt="" aria-hidden="true" fill sizes="20vw" className="detail-photo" /><span aria-hidden="true">{index + 1}</span></div>
            ))}
          </div>}
        </div>
      </section>
      <section className="detail-facts page-section">
        <div className="season-fact"><SeasonTimeline locale={language} windows={product.seasonWindows} months={monthNames} shortMonths={monthLabels} title={t("seasonWindowTitle")} /><p>{product.season[language]}</p></div>
        <div className="packing-fact"><p className="eyebrow">{t("packing")}</p><p>{product.packing[language]}</p></div>
      </section>
      <section className="page-section">
        <div className="section-heading"><h2>{t("related")}</h2><Link className="text-link" href="/products">{t("allProducts")} <DirectionalArrow kind="forward" /></Link></div>
        <RelatedProducts products={related} />
      </section>
    </main>
  );
}
