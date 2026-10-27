import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { brandFont } from "@/styles/fonts";
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
  return {
    metadataBase: new URL("https://crestagricultural.com"),
    title: { default: messages.common.metadata.title, template: `%s | ${messages.common.companyName}` },
    description: messages.common.metadata.description,
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: messages.common.companyName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={brandFont.variable} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
