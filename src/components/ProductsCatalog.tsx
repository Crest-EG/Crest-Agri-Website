"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "@/i18n/navigation";
import type { Product, ProductForm } from "@/content/products";

type ProductFilter = ProductForm | "all";
const filterKeys: ProductFilter[] = ["all", "fresh", "frozen"];

type ProductsCatalogProps = {
  products: Product[];
  activeFilter: ProductFilter;
};

export function ProductsCatalog({ products, activeFilter }: ProductsCatalogProps) {
  const t = useTranslations("products");
  const [hovered, setHovered] = useState<number | null>(null);

  const onHover = useCallback((index: number) => setHovered(index), []);
  const onLeave = useCallback(() => setHovered(null), []);

  return (
    <div className="page-section">
      <div className="filter-row" role="group" aria-label={t("filters.label")}>
        {filterKeys.map((key) => (
          <Link
            key={key}
            href={{
              pathname: "/products",
              query: key === "all" ? {} : { form: key },
            }}
            className="filter-chip"
            role="button"
            aria-pressed={activeFilter === key}
            aria-current={activeFilter === key ? "page" : undefined}
            scroll={false}
          >{t(`filters.${key}`)}</Link>
        ))}
      </div>
      {products.length ? (
        <div className="product-grid">{products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            index={index}
            hovered={hovered}
            onHover={onHover}
            onLeave={onLeave}
          />
        ))}</div>
      ) : <p>{t("empty")}</p>}
    </div>
  );
}
