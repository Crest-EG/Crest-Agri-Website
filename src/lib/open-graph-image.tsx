import { headers } from "next/headers";
import { ImageResponse } from "next/og";
import { LOGO_SRC } from "@/components/Logo";
import english from "@/messages/en.json";
import arabic from "@/messages/ar.json";

type Locale = "ar" | "en";
type PageKey = "home" | "products" | "about" | "services" | "certifications" | "contact";

const messages = { en: english, ar: arabic } as const;

function getPageCopy(locale: Locale, page: PageKey, slug?: string) {
  const copy = messages[locale];
  if (slug) {
    const product = copy.seo.product as {
      title: string;
      description: string;
      titles: Record<string, string>;
      descriptions?: Record<string, string>;
    };
    const name = (copy.products as Record<string, { name?: string }>)[slug]?.name ?? slug;
    return {
      title: product.titles[slug] ?? product.title.replace("{product}", name),
      subtitle: product.descriptions?.[slug] ?? product.description.replace("{product}", name),
    };
  }

  const pageMessages = {
    home: copy.landing.seo,
    products: copy.seo.products,
    about: copy.seo.about,
    services: copy.seo.services,
    certifications: copy.seo.certifications,
    contact: copy.seo.contact,
  };
  const pageCopy = pageMessages[page];
  return { title: pageCopy.title, subtitle: pageCopy.description };
}

export async function createOpenGraphImage(localeInput: string, page: PageKey, slug?: string) {
  const locale: Locale = localeInput === "ar" ? "ar" : "en";
  const { title, subtitle } = getPageCopy(locale, page, slug);
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "crestagricultural.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const logoUrl = new URL(LOGO_SRC, `${protocol}://${host}`).toString();
  const logoResponse = await fetch(logoUrl);
  const logoBytes = new Uint8Array(await logoResponse.arrayBuffer());
  let logoBinary = "";
  for (const byte of logoBytes) logoBinary += String.fromCharCode(byte);
  const logoData = `data:image/svg+xml;base64,${btoa(logoBinary)}`;
  const direction = locale === "ar" ? "rtl" : "ltr";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#ffffff",
          background: "linear-gradient(125deg, #1c2a1c 0%, #2f7d2e 58%, #50b94e 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
          direction,
          textAlign: locale === "ar" ? "right" : "left",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 260,
            border: "2px solid rgba(255,255,255,0.13)",
            top: -260,
            [locale === "ar" ? "left" : "right"]: -100,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: 170,
            background: "rgba(247,148,29,0.18)",
            bottom: -250,
            [locale === "ar" ? "right" : "left"]: 340,
            display: "flex",
          }}
        />
        <div
          style={{
            zIndex: 1,
            width: 250,
            height: 76,
            padding: "10px 18px",
            borderRadius: 14,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logo.tsx owns this source asset; ImageResponse renders it from its data URL. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a data img source. */}
          <img src={logoData} height={54} alt={messages[locale].common.logoAlt} />
        </div>
        <div style={{ zIndex: 1, display: "flex", flexDirection: "column", maxWidth: 970, gap: 20 }}>
          <div style={{ width: 80, height: 8, borderRadius: 8, background: "#f7941d", display: "flex" }} />
          <div style={{ fontSize: 62, lineHeight: 1.18, fontWeight: 700, display: "flex" }}>{title}</div>
          <div style={{ fontSize: 27, lineHeight: 1.45, color: "rgba(255,255,255,0.88)", display: "flex" }}>{subtitle}</div>
        </div>
        <div style={{ zIndex: 1, display: "flex", alignItems: "center", gap: 12, fontSize: 20, color: "rgba(255,255,255,0.82)" }}>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: "#f7941d", display: "flex" }} />
          <span style={{ display: "flex" }}>{messages[locale].common.companyName}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
