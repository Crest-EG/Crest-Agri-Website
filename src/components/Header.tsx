"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navItems = [
  ["home", "/"],
  ["products", "/products"],
  ["about", "/about"],
  ["services", "/services"],
  ["contact", "/contact"],
] as const;

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header${isHome ? " site-header-home" : ""}`} id="top">
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label={t("navigation.home")} onClick={() => setOpen(false)}>
          <Logo alt={t("logoAlt")} className="header-logo" />
        </Link>
        <div className="header-quick-actions">
          <Link href="/contact#quote" className="button button-primary header-quote" onClick={() => setOpen(false)}>{t("navigation.quote")}</Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? t("navigation.closeMenu") : t("navigation.openMenu")}
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
        <nav id="primary-navigation" className={`primary-navigation${open ? " is-open" : ""}`} aria-label={t("navigation.menu")}>
          <ul>
            {navItems.map(([key, href]) => (
              <li key={key}>
                <Link href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{t(`navigation.${key}`)}</Link>
              </li>
            ))}
          </ul>
          <div className="header-actions">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
