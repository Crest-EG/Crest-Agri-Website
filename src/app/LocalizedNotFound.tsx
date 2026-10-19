"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

const subscribe = () => () => {};
const getLocale = () => (window.location.pathname.split("/")[1] === "ar" ? "ar" : "en");
const getServerLocale = () => "en";

export function LocalizedNotFound() {
  const locale = useSyncExternalStore(subscribe, getLocale, getServerLocale);
  const t = locale === "ar" ? ar.common : en.common;
  useEffect(() => { document.title = t.errors.notFoundTitle; }, [t.errors.notFoundTitle]);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <main className="status-page">
          <Logo variant="mark" alt={t.logoAlt} className="status-logo" />
          <p className="eyebrow">404</p>
          <h1>{t.errors.notFoundTitle}</h1>
          <p>{t.errors.notFoundBody}</p>
          <Link className="button button-primary" href={`/${locale}`}>{t.errors.backHome}</Link>
        </main>
      </body>
    </html>
  );
}
