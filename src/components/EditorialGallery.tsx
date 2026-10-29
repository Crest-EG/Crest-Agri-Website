"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/content/products";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { slug: "grapes", src: "/images/stitch-products/grapes.jpg", depth: 60 },
  { slug: "pomegranate", src: "/images/stitch-products/pomegranate.jpg", depth: -80 },
  { slug: "strawberry", src: "/images/stitch-products/strawberry.jpg", depth: 40 },
  { slug: "green-beans", src: "/images/stitch-products/green-beans.jpg", depth: -50 },
  { slug: "citrus", src: "/images/stitch-products/citrus.jpg", depth: 90 },
] as const;

export function EditorialGallery() {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("landing.editorial");
  const productsT = useTranslations("products");
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".editorial-image").forEach((image) => {
        const depth = Number(image.dataset.depth);
        gsap.fromTo(
          image,
          { y: depth },
          {
            y: -depth,
            ease: "none",
            scrollTrigger: {
              trigger: fieldRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, fieldRef);

    return () => context.revert();
  }, []);

  return (
    <section className="editorial-break" aria-labelledby="editorial-title">
      <div className="editorial-heading">
        <p className="editorial-eyebrow">{t("eyebrow")}</p>
        <h2 id="editorial-title">{t("title")}</h2>
        <p className="editorial-description">{t("description")}</p>
      </div>
      <div className="editorial-field" ref={fieldRef}>
        {GALLERY_IMAGES.map(({ slug, src, depth }, index) => {
          const product = products.find((item) => item.slug === slug);
          if (!product) return null;

          return (
            <figure
              className={`editorial-image editorial-image-${index + 1}`}
              data-depth={depth}
              key={slug}
            >
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
