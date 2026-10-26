"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import type { Product } from "@/content/products";

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
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("products");
  const forms = useTranslations("forms");
  const label = product.name[locale];

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
            ? <Image src={product.images[0]} alt="" aria-hidden="true" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" className="product-card-photo" />
            : <span className="product-glyph" aria-hidden="true">{label.slice(0, 1)}</span>}
        </Placeholder>
      </div>
      <div className="product-card-body">
        <div className="product-card-meta">
          <small>{product.forms.map((form) => forms(form)).join(" · ")}</small>
          <span className="product-card-arrow" aria-hidden="true">↗</span>
        </div>
        <h2>{label}</h2>
        <p>{product.summary[locale]}</p>
      </div>
    </Link>
  );
});
