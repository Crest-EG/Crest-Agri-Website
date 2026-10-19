"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/Placeholder";
import type { Product } from "@/content/products";

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("products");
  const forms = useTranslations("forms");
  const label = product.name[locale];
  return (
    <Link className="product-card" href={`/products/${product.slug}`}>
      <Placeholder label={t("imageAlt", { product: label })} className="product-card-image">
        {product.images[0]
          ? <Image src={product.images[0]} alt="" aria-hidden="true" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" className="product-card-photo" />
          : <span className="product-glyph" aria-hidden="true">{label.slice(0, 1)}</span>}
      </Placeholder>
      <div className="product-card-meta">
        <small>{product.forms.map((form) => forms(form)).join(" · ")}</small>
        <span className="product-card-arrow" aria-hidden="true">↗</span>
      </div>
      <h2>{label}</h2>
      <p>{product.summary[locale]}</p>
    </Link>
  );
}
