import type { MetadataRoute } from "next";

const baseUrl = "https://crestagricultural.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ar"].map((locale) => ({
    url: `${baseUrl}/${locale}`,
    alternates: { languages: { en: `${baseUrl}/en`, ar: `${baseUrl}/ar` } },
  }));
}
