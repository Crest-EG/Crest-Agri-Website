"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navKeys = ["products", "about", "certifications", "contact"] as const;
const navHrefs = {
  products: "/products",
  about: "/about",
  certifications: "/certifications",
  contact: "/contact",
} as const;

export function Header() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-link" aria-label={t("navigation.menu")}>
            <Logo alt={t("logoAlt")} className="header-logo" />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? t("navigation.closeMenu") : t("navigation.openMenu")}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
          <nav id="primary-navigation" className={`primary-navigation${open ? " is-open" : ""}`} aria-label={t("navigation.menu")}>
            <ul>
              {navKeys.map((key) => (
                <li key={key}>
                  <Link href={navHrefs[key]} onClick={() => setOpen(false)}>{t(`navigation.${key}`)}</Link>
                </li>
              ))}
            </ul>
            <div className="header-actions">
              <LanguageSwitcher />
              <Link href="/contact#quote" className="button button-primary" onClick={() => setOpen(false)}>{t("navigation.quote")}</Link>
            </div>
          </nav>
        </div>
        <a className="skip-link" href="#products">{t("navigation.skipToProducts")}</a>
      </header>
    </>
  );
}
