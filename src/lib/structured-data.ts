import { site } from "@/content/site";
import { LOGO_SRC } from "@/components/Logo";
import type { Product } from "@/content/products";
import type { SiteLocale } from "@/lib/seo";

const schemaContext = "https://schema.org";

export function createSiteStructuredData(locale: SiteLocale) {
  const otherLocale = locale === "ar" ? "en" : "ar";

  return {
    "@context": schemaContext,
    "@graph": [
      {
        "@type": "Organization",
        name: site.name[locale],
        alternateName: site.name[otherLocale],
        url: site.website,
        logo: new URL(LOGO_SRC, site.website).toString(),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address[locale],
        },
        telephone: site.phones,
        email: site.email,
        sameAs: Object.values(site.socials),
      },
      {
        "@type": "WebSite",
        name: site.name[locale],
        alternateName: site.name[otherLocale],
        url: site.website,
        inLanguage: locale,
      },
    ],
  };
}

export function createBreadcrumbStructuredData(
  locale: SiteLocale,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": schemaContext,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(
        item.path === "/" ? `/${locale}` : `/${locale}${item.path}`,
        site.website,
      ).toString(),
    })),
  };
}

export function createProductStructuredData(
  product: Product,
  category: string,
  name: string,
  description: string,
) {
  const image = product.images[0];
  return {
    "@context": schemaContext,
    "@type": "Product",
    name,
    description,
    ...(image ? { image: new URL(image, site.website).toString() } : {}),
    category,
  };
}

export function createFaqStructuredData(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": schemaContext,
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
