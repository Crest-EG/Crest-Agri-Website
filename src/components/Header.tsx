"use client";

import { useEffect, useState } from "react";
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

const HEADER_BAND = 96;

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  // On the landing journey the header sits on dark scenes: show the white wordmark,
  // and switch back to the dark wordmark while the light outro section passes under it.
  const [tone, setTone] = useState<"default" | "white">(isHome ? "white" : "default");

  useEffect(() => {
    if (!isHome) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const outro = document.querySelector<HTMLElement>(".contact-outro");
      const footer = document.querySelector<HTMLElement>(".site-footer");
      const outroTop = outro?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      setTone(outroTop < HEADER_BAND && footerTop > HEADER_BAND ? "default" : "white");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  return (
    <header className={`site-header${isHome ? " site-header-home" : ""}`} id="top">
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label={t("navigation.home")} onClick={() => setOpen(false)}>
          <Logo alt={t("logoAlt")} tone={tone} className="header-logo" />
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
