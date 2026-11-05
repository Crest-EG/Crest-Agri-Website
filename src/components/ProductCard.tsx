"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import type { Product, ProductContent } from "@/content/products";

type ProductCardProps = {
  product: Product;
  index?: number;
  hovered?: number | null;
  onHover?: (index: number) => void;
  onLeave?: () => void;
};

export const ProductCard = React.memo(function ProductCard({
  product,
  index,
  hovered,
  onHover,
  onLeave,
}: ProductCardProps) {
  const t = useTranslations("products");
  const forms = useTranslations("forms");
  const copy = t.raw(`items.${product.slug}`) as ProductContent;
  const label = copy.name;

  const isFocusMode = hovered !== null && hovered !== undefined;
  const isHovered = index !== undefined && hovered === index;
  const isDimmed = isFocusMode && !isHovered;

  return (
    <Link
      className={`product-card${isDimmed ? " product-card-dimmed" : ""}${isHovered ? " product-card-focused" : ""}`}
      href={`/products/${product.slug}`}
      onMouseEnter={() => index !== undefined && onHover?.(index)}
      onMouseLeave={() => onLeave?.()}
    >
      <div className="product-card-media">
        <Placeholder label={t("imageAlt", { product: label })} className="product-card-image">
          {product.images[0]
            ? <Image src={product.images[0]} alt={t("imageAlt", { product: label })} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" className="product-card-photo" />
            : <span className="product-glyph" aria-hidden="true">{label.slice(0, 1)}</span>}
        </Placeholder>
      </div>
      <div className="product-card-body">
        <div className="product-card-meta">
          <small>{product.forms.map((form) => forms(form)).join(" · ")}</small>
          <DirectionalArrow kind="forward" />
        </div>
        <h2>{label}</h2>
        <p>{copy.summary}</p>
        <ul className="product-card-specs" aria-label={t("specificationHighlights")}>
          {copy.specs.slice(0, 2).map((item, index) => <li key={`${item.key}-${index}`}>{item.value}</li>)}
        </ul>
      </div>
    </Link>
  );
});
