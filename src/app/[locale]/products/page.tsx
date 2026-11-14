import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductsCatalog } from "@/components/ProductsCatalog";
import { ButtonLink } from "@/components/Button";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import { JsonLd } from "@/components/JsonLd";
import { createBreadcrumbStructuredData } from "@/lib/structured-data";
import { createPageMetadata, type SiteLocale } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: language, namespace: "seo.products" });
  return createPageMetadata({
    locale: language,
    title: t("title"),
    description: t("description"),
    path: "/products",
    image: `/${language}/products/opengraph-image`,
  });
}

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ form?: string | string[] }>;
};

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const language: SiteLocale = locale === "ar" ? "ar" : "en";
  const requestedForm = Array.isArray(query.form) ? query.form[0] : query.form;
  const form = requestedForm === "fresh" || requestedForm === "frozen"
    ? requestedForm
    : "all";
  const filteredProducts = form === "all"
    ? products
    : products.filter((product) => product.forms.includes(form));
  const t = await getTranslations("products");
  return (
    <main className="page-shell catalog-page">
      <JsonLd data={createBreadcrumbStructuredData(language, [
        { name: site.name[language], path: "/" },
        { name: t("title"), path: "/products" },
      ])} />
      <header className="page-intro">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
      </header>
      <div className="catalog-actions">
        <ButtonLink href={site.brochureUrl} target="_blank" rel="noreferrer" variant="secondary">
          {t("brochure")} <DirectionalArrow kind="external" />
        </ButtonLink>
      </div>
      <ProductsCatalog products={filteredProducts} activeFilter={form} />
    </main>
  );
}
