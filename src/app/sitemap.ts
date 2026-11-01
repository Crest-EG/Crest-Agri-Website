import type { MetadataRoute } from "next";
import { products } from "@/content/products";

const baseUrl = "https://crestagricultural.com";
const routes = [
  "",
  "/about",
  "/products",
  "/services",
  "/certifications",
  "/contact",
  "/privacy",
  "/terms",
  ...products.map((product) => `/products/${product.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    (["en", "ar"] as const).map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          ar: `${baseUrl}/ar${route}`,
          en: `${baseUrl}/en${route}`,
          "x-default": `${baseUrl}/en${route}`,
        },
      },
    })),
  );
}
