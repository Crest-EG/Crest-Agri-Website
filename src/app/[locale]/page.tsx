import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ProductCard } from "@/components/ProductCard";
import { MarketMap } from "@/components/MarketMap";
import { ButtonLink } from "@/components/Button";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import { Link } from "@/i18n/navigation";
import { featuredProducts, products } from "@/content/products";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

const homeCertifications = [
  { key: "certGlobalgap", image: "/images/certifications/globalgap.webp", width: 625, height: 625 },
  { key: "certGrasp", image: "/images/certifications/grasp.webp", width: 625, height: 625 },
  { key: "certIso22000", image: "/images/certifications/iso-22000.webp", width: 177, height: 179 },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "landing.seo" });
  return createPageMetadata({ locale: language, title: t("title"), description: t("description") });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "landing.home" });
  const forms = await getTranslations({ locale: language, namespace: "forms" });
  return (
    <main id="home" className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <Image src="/images/landing/export-truck.webp" alt={t("heroImageAlt")} fill priority sizes="100vw" className="home-hero-image" />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-copy">
          <p className="home-eyebrow">{t("heroEyebrow")}</p>
          <h1 id="home-title">{t("heroTitle")}</h1>
          <p>{t("heroBody")}</p>
          <div className="home-actions">
            <ButtonLink href="#home-products" variant="primary">{t("heroProducts")} <DirectionalArrow kind="forward" /></ButtonLink>
            <ButtonLink href="/contact#quote" variant="secondary">{t("heroQuote")}</ButtonLink>
          </div>
        </div>
        <p className="home-hero-origin">{t("originLabel")}</p>
      </section>

      <section className="home-about page-shell" aria-labelledby="about-title">
        <div className="home-about-image">
          <Image src="/images/categories/frozen.webp" alt={t("aboutImageAlt")} fill sizes="(max-width: 800px) 100vw, 48vw" />
          <span>{t("aboutImageCaption")}</span>
        </div>
        <div className="home-about-copy">
          <p className="eyebrow">{t("aboutEyebrow")}</p>
          <h2 id="about-title">{t("aboutTitle")}</h2>
          <p>{t("aboutBody")}</p>
          <Link href="/about" className="text-link">{t("aboutLink")} <DirectionalArrow kind="forward" /></Link>
        </div>
      </section>

      <section className="home-certifications-strip page-shell" aria-labelledby="home-certifications-title">
        <h2 id="home-certifications-title">{t("certificationsTitle")}</h2>
        <div className="home-certification-logos">
          {homeCertifications.map(({ key, image, width, height }) => (
            <Image key={key} src={image} alt={t(key)} width={width} height={height} />
          ))}
        </div>
        <Link href="/certifications">{t("certificationsLink")} <DirectionalArrow kind="forward" /></Link>
      </section>

      <section className="home-types page-shell" aria-labelledby="types-title">
        <div className="home-section-heading">
          <p className="eyebrow">{t("typesEyebrow")}</p>
          <h2 id="types-title">{t("typesTitle")}</h2>
        </div>
        <div className="home-type-grid">
          {(["fresh", "frozen"] as const).map((form) => (
            <Link key={form} href={{ pathname: "/products", query: { form } }} className={`home-type-card home-type-${form}`}>
              <Image src={form === "fresh" ? "/images/categories/fresh.webp" : "/images/categories/frozen.webp"} alt={t(`${form}.imageAlt`)} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <span className="home-type-shade" aria-hidden="true" />
              <span className="home-type-copy"><small>{t(`${form}.label`)}</small><strong>{forms(form)}</strong><span>{t(`${form}.body`)} <DirectionalArrow kind="forward" /></span></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="home-products" className="home-products page-shell" aria-labelledby="products-title">
        <div className="home-section-heading home-section-heading-row">
          <div><p className="eyebrow">{t("productsEyebrow")}</p><h2 id="products-title">{t("productsTitle")}</h2><p>{t("productsBody")}</p></div>
          <Link className="text-link" href="/products">{t("allProducts")} <DirectionalArrow kind="forward" /></Link>
        </div>
        <div className="home-products-group">
          <div className="home-group-label"><h3>{forms("fresh")}</h3><span>{products.filter((item) => item.forms.includes("fresh")).length.toString().padStart(2, "0")}</span></div>
          <div className="home-product-grid">{products.filter((item) => item.forms.includes("fresh")).map((item, index) => <ProductCard product={item} key={item.slug} index={index} />)}</div>
        </div>
        <div className="home-products-group">
          <div className="home-group-label"><h3>{forms("frozen")}</h3><span>{products.filter((item) => item.forms.includes("frozen")).length.toString().padStart(2, "0")}</span></div>
          <div className="home-product-grid">{featuredProducts.filter((item) => item.forms.includes("frozen")).map((item, index) => <ProductCard product={item} key={item.slug} index={index} />)}</div>
        </div>
      </section>

      <section className="home-private page-shell" aria-labelledby="private-title">
        <div className="home-private-copy">
          <p className="eyebrow">{t("privateEyebrow")}</p>
          <h2 id="private-title">{t("privateTitle")}</h2>
          <p>{t("privateBody")}</p>
          <ul>{(["privatePoint1", "privatePoint2", "privatePoint3"] as const).map((key) => <li key={key}>{t(key)}</li>)}</ul>
          <ButtonLink href="/services" variant="secondary">{t("privateLink")} <DirectionalArrow kind="forward" /></ButtonLink>
        </div>
        <div className="home-private-image">
          <Image src="/images/landing/private-label.webp" alt={t("privateImageAlt")} fill sizes="(max-width: 800px) 100vw, 48vw" />
        </div>
      </section>

      <section className="home-services page-shell" aria-labelledby="services-title">
        <div className="home-section-heading">
          <p className="eyebrow">{t("servicesEyebrow")}</p><h2 id="services-title">{t("servicesTitle")}</h2><p>{t("servicesBody")}</p>
        </div>
        <div className="home-service-grid">
          {(["sourcing", "packing", "logistics"] as const).map((item, index) => (
            <article className="home-service-card" key={item}>
              <span className="home-service-number">0{index + 1}</span>
              <h3>{t(`services.${item}.title`)}</h3>
              <p>{t(`services.${item}.body`)}</p>
            </article>
          ))}
        </div>
        <Link href="/services" className="text-link">{t("servicesLink")} <DirectionalArrow kind="forward" /></Link>
      </section>

      <section className="home-markets" aria-labelledby="markets-title">
        <div className="home-markets-inner page-shell">
          <div className="home-markets-copy"><p className="eyebrow">{t("marketsEyebrow")}</p><h2 id="markets-title">{t("marketsTitle")}</h2><p>{t("marketsBody")}</p><p className="home-markets-note">{t("marketsNote")}</p></div>
          <MarketMap locale={language} />
        </div>
      </section>

      <section className="home-cta" aria-labelledby="cta-title">
        <Image src="/images/landing/cta-berries.webp" alt={t("ctaImageAlt")} fill sizes="100vw" className="home-cta-image" />
        <span className="home-cta-shade" aria-hidden="true" />
        <div><p className="eyebrow">{t("ctaEyebrow")}</p><h2 id="cta-title">{t("ctaTitle")}</h2><p>{t("ctaBody")}</p></div>
        <ButtonLink href="/contact#quote" variant="primary">{t("ctaButton")} <DirectionalArrow kind="forward" /></ButtonLink>
      </section>
    </main>
  );
}
