import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductsCatalog } from "@/components/ProductsCatalog";
import { ButtonLink } from "@/components/Button";
import { site } from "@/content/site";
import { DirectionalArrow } from "@/components/DirectionalArrow";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("title"), description: t("intro") };
}

export default async function ProductsPage() {
  const t = await getTranslations("products");
  return (
    <main className="page-shell catalog-page">
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
      <ProductsCatalog />
    </main>
  );
}
