"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/ProductCard";
import { products, type ProductForm } from "@/content/products";

type ProductFilter = ProductForm | "all";
const filterKeys: ProductFilter[] = ["all", "fresh", "frozen", "dried"];

export function ProductsCatalog() {
  const t = useTranslations("products");
  const [filter, setFilter] = useState<ProductFilter>("all");
  const visible = filter === "all" ? products : products.filter((product) => product.forms.includes(filter));

  return (
    <div className="page-section">
      <div className="filter-row" role="group" aria-label={t("filters.label")}>
        {filterKeys.map((key) => (
          <button key={key} type="button" className="filter-chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {t(`filters.${key}`)}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="product-grid">{visible.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      ) : <p>{t("empty")}</p>}
    </div>
  );
}
