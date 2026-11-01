import type { Metadata } from "next";
import { site } from "@/content/site";

export type SiteLocale = "ar" | "en";

type PageMetadataOptions = {
  locale: SiteLocale;
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function createPageMetadata({
  locale,
  title,
  description,
  path = "",
  image = "/opengraph-image.png",
}: PageMetadataOptions): Metadata {
  const pagePath = path ? `/${locale}${path}` : `/${locale}`;
  const languages = {
    ar: `/ar${path}`,
    en: `/en${path}`,
    "x-default": `/en${path}`,
  };
  const imageWithAlt = { url: new URL(image, site.website).toString(), alt: title };

  return {
    metadataBase: new URL(site.website),
    title,
    description,
    alternates: {
      canonical: pagePath,
      languages,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: pagePath,
      siteName: site.name[locale],
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      images: [imageWithAlt],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageWithAlt],
    },
  };
}
