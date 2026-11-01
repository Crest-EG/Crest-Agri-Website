import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { createSiteStructuredData } from "@/lib/structured-data";
import type { SiteLocale } from "@/lib/seo";
import { montserratFont } from "@/styles/fonts";
import "@/shaders/threeui.css";
import "../globals.css";

type Locale = (typeof routing.locales)[number];

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  return {
    metadataBase: new URL("https://crestagricultural.com"),
    title: { default: messages.common.metadata.title, template: `%s | ${messages.common.metadata.shortName}` },
    description: messages.common.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: messages.common.companyName,
      title: messages.common.metadata.title,
      description: messages.common.metadata.description,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
      images: [{ url: new URL("/opengraph-image.png", site.website).toString(), alt: messages.common.metadata.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.common.metadata.title,
      description: messages.common.metadata.description,
      images: [{ url: new URL("/opengraph-image.png", site.website).toString(), alt: messages.common.metadata.title }],
    },
    ...(googleVerification || bingVerification
      ? {
          verification: {
            ...(googleVerification ? { google: googleVerification } : {}),
            ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
          },
        }
      : {}),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={montserratFont.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={createSiteStructuredData(locale as SiteLocale)} />
          <div id="top" />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
