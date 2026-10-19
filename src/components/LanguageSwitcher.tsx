"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common.language");
  const nextLocale = locale === "ar" ? "en" : "ar";

  function rememberLanguage() {
    document.cookie = `NEXT_LOCALE=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      hrefLang={nextLocale}
      onClick={rememberLanguage}
      className="language-switcher"
      aria-label={`${t("label")}: ${nextLocale === "ar" ? t("arabic") : t("english")}`}
    >
      {nextLocale === "ar" ? t("arabic") : t("english")}
    </Link>
  );
}
