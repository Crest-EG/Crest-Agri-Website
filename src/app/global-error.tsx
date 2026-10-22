"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Logo } from "@/components/Logo";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import "./globals.css";

function getLocale() {
  const pathLocale = window.location.pathname.split("/")[1];
  if (pathLocale === "ar" || pathLocale === "en") return pathLocale;
  const saved = document.cookie.match(/(?:^|; )NEXT_LOCALE=(ar|en)(?:;|$)/)?.[1];
  if (saved) return saved as "ar" | "en";
  return navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useSyncExternalStore(() => () => {}, getLocale, () => "en");
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  const messages = locale === "ar" ? ar.common : en.common;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} data-scroll-behavior="smooth">
      <body>
        <main className="status-page">
          <Logo variant="mark" alt={messages.logoAlt} className="status-logo" />
          <h1>{messages.errors.errorTitle}</h1>
          <p>{messages.errors.errorBody}</p>
          <button className="button button-primary" type="button" onClick={() => reset()}>{messages.errors.tryAgain}</button>
        </main>
      </body>
    </html>
  );
}
