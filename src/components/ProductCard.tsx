"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
  const copy = t.raw(`items.${product.slug}`) as ProductContent;
  const label = copy.name;
  const isHovered = index !== undefined && hovered === index;

  return (
    <Link
      className={`product-card${isHovered ? " product-card-focused" : ""}`}
      href={`/products/${product.slug}`}
      onMouseEnter={() => index !== undefined && onHover?.(index)}
      onMouseLeave={() => onLeave?.()}
    >
      <div className="product-card-media">
        {product.images[0]
          ? <Image src={product.images[0]} alt={t("imageAlt", { product: label })} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" className="product-card-photo" />
          : <span className="product-glyph" aria-hidden="true">{label.slice(0, 1)}</span>}
      </div>
      <div className="product-card-body">
        <h2>{label}</h2>
        <p>{copy.summary}</p>
      </div>
    </Link>
  );
});
