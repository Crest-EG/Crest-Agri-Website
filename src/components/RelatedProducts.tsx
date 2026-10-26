"use client";

import { useState, useCallback } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/content/products";

export function RelatedProducts({ products }: { products: Product[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const onHover = useCallback((index: number) => setHovered(index), []);
  const onLeave = useCallback(() => setHovered(null), []);

  return (
    <div className="product-grid related-grid">
      {products.map((item, index) => (
        <ProductCard
          key={item.slug}
          product={item}
          index={index}
          hovered={hovered}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </div>
  );
}
