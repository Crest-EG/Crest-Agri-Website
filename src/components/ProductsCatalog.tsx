"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/ProductCard";
import { products, type ProductForm } from "@/content/products";

type ProductFilter = ProductForm | "all";
const filterKeys: ProductFilter[] = ["all", "fresh", "frozen"];

export function ProductsCatalog() {
  const t = useTranslations("products");
  const [filter, setFilter] = useState<ProductFilter>("all");
  const [hovered, setHovered] = useState<number | null>(null);
  const visible = filter === "all" ? products : products.filter((product) => product.forms.includes(filter));

  const onHover = useCallback((index: number) => setHovered(index), []);
  const onLeave = useCallback(() => setHovered(null), []);

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
        <div className="product-grid">{visible.map((product, index) => (
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
