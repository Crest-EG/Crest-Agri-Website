"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { products } from "@/content/products";

const GALLERY_IMAGES = [
  { slug: "grapes", src: "/images/stitch-products/grapes.jpg" },
  { slug: "pomegranate", src: "/images/stitch-products/pomegranate.jpg" },
  { slug: "strawberry", src: "/images/stitch-products/strawberry.jpg" },
  { slug: "green-beans", src: "/images/stitch-products/green-beans.jpg" },
  { slug: "citrus", src: "/images/stitch-products/citrus.jpg" },
] as const;

export function EditorialGallery() {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("landing.editorial");
  const productsT = useTranslations("products");

  return (
    <section className="editorial-break" aria-labelledby="editorial-title">
      <div className="editorial-heading">
        <p className="editorial-eyebrow">{t("eyebrow")}</p>
        <h2 id="editorial-title">{t("title")}</h2>
        <p className="editorial-description">{t("description")}</p>
      </div>
      <div className="editorial-field">
        {GALLERY_IMAGES.map(({ slug, src }, index) => {
          const product = products.find((item) => item.slug === slug);
          if (!product) return null;

          return (
            <figure className={`editorial-image editorial-image-${index + 1}`} key={slug}>
              <Image
                src={src}
                alt={productsT("imageAlt", { product: product.name[locale] })}
                fill
                sizes="(max-width: 600px) 44vw, (max-width: 900px) 32vw, 24vw"
                priority={false}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
