import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ButtonLink } from "@/components/Button";
import { SeasonTimeline } from "@/components/SeasonTimeline";
import { products, getProductBySlug, type ProductContent } from "@/content/products";
import { site } from "@/content/site";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import { JsonLd } from "@/components/JsonLd";
import { createBreadcrumbStructuredData, createProductStructuredData } from "@/lib/structured-data";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

type DetailProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const seo = await getTranslations({ locale: language, namespace: "seo.product" });
  const productMessages = await getTranslations({ locale: language, namespace: "products" });
  const productCopy = productMessages.raw(`items.${product.slug}`) as ProductContent;
  const productTitles = seo.raw("titles") as Record<string, string>;
  const title = product.slug === "strawberry"
    ? seo("strawberryTitle")
    : product.slug === "frozen-strawberry"
      ? seo("frozenStrawberryTitle")
    : productTitles[product.slug] ?? seo("title", { product: productCopy.name });
  const description = product.slug === "strawberry"
    ? seo("strawberryDescription")
    : product.slug === "frozen-strawberry"
      ? seo("frozenStrawberryDescription")
    : seo("description", { product: productCopy.name });
  return createPageMetadata({
    locale: language,
    title,
    description,
    path: `/products/${slug}`,
    image: product.images[0] ?? "/opengraph-image.png",
  });
}

export default async function ProductDetailPage({ params }: DetailProps) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale, namespace: "products" });
  const productCopy = t.raw(`items.${product.slug}`) as ProductContent;
  const forms = await getTranslations({ locale, namespace: "forms" });
  const monthNames = t.raw("monthNames") as string[];
  const monthLabels = t.raw("monthLabels") as string[];
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 4);
  const quoteHref = `/contact?product=${encodeURIComponent(product.slug)}#quote`;

  return (
    <main className="page-shell detail-page">
      <JsonLd data={createBreadcrumbStructuredData(language, [
        { name: site.name[language], path: "/" },
        { name: t("title"), path: "/products" },
        { name: productCopy.name, path: `/products/${product.slug}` },
      ])} />
      <JsonLd data={createProductStructuredData(
        product,
        t(product.type),
        productCopy.name,
        productCopy.summary,
      )} />
      <nav className="breadcrumb" aria-label={t("breadcrumbLabel")}>
        <Link href="/products">{t("title")}</Link><DirectionalArrow kind="chevron" /><span>{productCopy.name}</span>
      </nav>
      <section className="detail-hero">
        <div className="detail-copy">
          <p className="eyebrow">{t("dossier")} · {product.forms.map((form) => forms(form)).join(" / ")}</p>
          <h1>{productCopy.name}</h1>
          <p>{productCopy.summary}</p>
          <div className="detail-tags">
            {product.forms.map((form) => <span key={form}>{forms(form)}</span>)}
            <span>{t("worldwide")}</span>
          </div>
          <div className="detail-assurance">
            <strong>{t("originPacking")}</strong>
            <p>{productCopy.harvest}</p>
          </div>
          <div className="detail-actions">
            <ButtonLink href={quoteHref} variant="primary">{t("request")} <DirectionalArrow kind="forward" /></ButtonLink>
          </div>
        </div>
        <div className="detail-gallery">
          <Placeholder label={t("imageAlt", { product: productCopy.name })} className="detail-main-image">
            {product.images[0]
              ? <Image src={product.images[0]} alt={t("imageAlt", { product: productCopy.name })} fill sizes="(max-width: 600px) 100vw, 50vw" className="detail-photo" />
              : <span className="detail-glyph" aria-hidden="true">{productCopy.name.slice(0, 1)}</span>}
          </Placeholder>
          {product.images.length > 1 && <div className="detail-thumbnails">
            {product.images.slice(1, 4).map((image, index) => (
              <div className="detail-thumbnail" key={image}><Image src={image} alt={t("imageAlt", { product: productCopy.name })} fill sizes="20vw" className="detail-photo" /><span aria-hidden="true">{index + 1}</span></div>
            ))}
          </div>}
        </div>
      </section>
      <section className="detail-facts page-section">
        <div className="season-fact"><SeasonTimeline locale={language} windows={product.seasonWindows} months={monthNames} shortMonths={monthLabels} title={t("seasonWindowTitle")} /><p>{productCopy.season}</p></div>
        <div className="packing-fact"><p className="eyebrow">{t("packing")}</p><p>{productCopy.packing}</p></div>
      </section>
      {productCopy.variants.length > 0 && <section className="product-variants page-section" aria-labelledby="product-variants-title">
        <div className="section-heading"><h2 id="product-variants-title">{t("variantsTitle")}</h2></div>
        <ul className="product-variant-grid">
          {productCopy.variants.map((variant) => <li className="product-variant-card" key={variant}>{variant}</li>)}
        </ul>
      </section>}
      <section className="product-specifications page-section" aria-labelledby="product-specifications-title">
        <div className="section-heading"><h2 id="product-specifications-title">{t("specificationsTitle")}</h2></div>
        <dl className="product-spec-grid">
          {productCopy.specs.map((item, index) => <div className="product-spec-card" key={`${item.key}-${index}`}><dt>{t(`specs.${item.key}`)}</dt><dd>{item.value}</dd></div>)}
          <div className="product-spec-card"><dt>{t("packing")}</dt><dd>{productCopy.packing}</dd></div>
          <div className="product-spec-card"><dt>{t("shipping")}</dt><dd>{productCopy.shipping}</dd></div>
        </dl>
      </section>
      <section className="detail-services content-card" aria-labelledby="detail-services-title">
        <h2 id="detail-services-title">{t("servicesLink")}</h2>
        <p>{t("servicesLinkBody")}</p>
        <Link className="text-link" href="/services">{t("servicesLink")}</Link>
      </section>
      <section className="page-section">
        <div className="section-heading"><h2>{t("related")}</h2><Link className="text-link" href="/products">{t("allProducts")} <DirectionalArrow kind="forward" /></Link></div>
        <RelatedProducts products={related} />
      </section>
    </main>
  );
}
