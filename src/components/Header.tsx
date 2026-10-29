"use client";

import { useEffect, useRef, useState } from "react";
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

function measureCompactWidth(header: HTMLElement) {
  const brand = header.querySelector<HTMLElement>(".brand-link");
  const navigation = header.querySelector<HTMLElement>(".primary-navigation");
  const navigationItems = navigation?.querySelector<HTMLElement>("ul");
  const languageActions = navigation?.querySelector<HTMLElement>(".header-actions");
  const quickActions = header.querySelector<HTMLElement>(".header-quick-actions");

  if (!brand || !navigation || !quickActions) return 0;

  const headerStyle = getComputedStyle(header);
  const navigationStyle = getComputedStyle(navigation);
  const hasInlineNavigation =
    navigationStyle.display !== "none" && navigationStyle.position !== "absolute";
  const navigationWidth = hasInlineNavigation
    ? (navigationItems?.getBoundingClientRect().width ?? 0) +
      (languageActions?.getBoundingClientRect().width ?? 0) +
      Number.parseFloat(navigationStyle.columnGap || "0")
    : 0;
  const childCount = hasInlineNavigation ? 3 : 2;
  const width =
    brand.getBoundingClientRect().width +
    navigationWidth +
    quickActions.getBoundingClientRect().width +
    Number.parseFloat(headerStyle.columnGap || "0") * (childCount - 1) +
    Number.parseFloat(headerStyle.paddingInlineStart) +
    Number.parseFloat(headerStyle.paddingInlineEnd) +
    Number.parseFloat(headerStyle.borderInlineStartWidth) +
    Number.parseFloat(headerStyle.borderInlineEndWidth);

  return Math.ceil(Math.min(width, window.innerWidth - 28));
}

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compactWidth, setCompactWidth] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  // On the landing journey the header sits on dark scenes: show the white wordmark,
  // and switch back to the dark wordmark while the light outro section passes under it.
  const [tone, setTone] = useState<"default" | "white">(isHome ? "white" : "default");
  const headerTone = isHome ? tone : "default";

  useEffect(() => {
    if (isHome) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 48;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
        if (nextScrolled && headerRef.current) {
          setCompactWidth(measureCompactWidth(headerRef.current));
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      if (scrolledRef.current && headerRef.current) {
        setCompactWidth(measureCompactWidth(headerRef.current));
      }
      schedule();
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!footer) return;

    let observer: IntersectionObserver | undefined;
    const observeFooterBand = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => setTone(entry.isIntersecting ? "default" : "white"),
        {
          rootMargin: `0px 0px -${Math.max(0, window.innerHeight - HEADER_BAND)}px 0px`,
          threshold: 0,
        },
      );
      observer.observe(footer);
    };
    observeFooterBand();
    window.addEventListener("resize", observeFooterBand);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeFooterBand);
    };
  }, [isHome]);

  return (
    <header
      className={`site-header${isHome ? " site-header-home" : ""}`}
      data-tone={headerTone}
      data-scrolled={isHome || scrolled}
    >
      <div
        ref={headerRef}
        className="header-inner"
        style={!isHome && scrolled && compactWidth ? { width: `${compactWidth}px` } : undefined}
      >
        <Link href="/" className="brand-link" aria-label={t("navigation.home")} onClick={() => setOpen(false)}>
          <Logo alt={t("logoAlt")} tone={headerTone} className="header-logo" />
        </Link>
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
      </div>
    </header>
  );
}
