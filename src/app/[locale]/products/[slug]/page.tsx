import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import { ProductCard } from "@/components/ProductCard";
import { ButtonLink } from "@/components/Button";
import { products, getProductBySlug } from "@/content/products";

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
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const quoteHref = `/contact?product=${encodeURIComponent(product.slug)}#quote`;

  return (
    <main className="page-shell detail-page">
      <nav className="breadcrumb" aria-label={t("breadcrumbLabel")}>
        <Link href="/products">{t("title")}</Link><span aria-hidden="true">›</span><span>{product.name[language]}</span>
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
            <ButtonLink href={quoteHref} variant="primary">{t("request")} <span aria-hidden="true">→</span></ButtonLink>
            <ButtonLink href="/contact#quote" variant="secondary">{t("commercialInquiry")}</ButtonLink>
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
        <div><p className="eyebrow">{t("forms")}</p><p>{product.forms.map((form) => forms(form)).join(" · ")}</p></div>
        <div><p className="eyebrow">{t("season")}</p><p>{product.season[language]}</p></div>
        <div><p className="eyebrow">{t("packing")}</p><p>{product.packing[language]}</p></div>
      </section>
      <section className="page-section">
        <div className="section-heading"><h2>{t("related")}</h2><Link className="text-link" href="/products">{t("allProducts")} <span aria-hidden="true">↗</span></Link></div>
        <div className="product-grid related-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div>
      </section>
    </main>
  );
}
