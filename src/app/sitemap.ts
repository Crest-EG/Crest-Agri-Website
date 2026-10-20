import type { MetadataRoute } from "next";

const baseUrl = "https://crestagricultural.com";
const routes = ["", "/about", "/products", "/services", "/certifications", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => ["en", "ar"].map((locale) => ({
    url: `${baseUrl}/${locale}${route}`,
    alternates: { languages: { en: `${baseUrl}/en${route}`, ar: `${baseUrl}/ar${route}` } },
  })));
}
