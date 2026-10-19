import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { site } from "@/content/site";

const links = [
  ["products", "/products"],
  ["about", "/about"],
  ["services", "/services"],
  ["contact", "/contact"],
] as const;

export function Footer() {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("common");
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label={t("navigation.home")}>
            <Logo alt={t("logoAlt")} className="footer-logo" />
          </Link>
          <p>{t("footer.description")}</p>
        </div>
        <nav aria-label={t("navigation.menu")} className="footer-nav">
          {links.map(([key, href]) => <Link key={key} href={href}>{t(`navigation.${key}`)}</Link>)}
        </nav>
        <address className="footer-contact">
          <span>{site.address[locale]}</span>
          <a href={`tel:${site.phones[0].replaceAll(" ", "")}`}>{site.phones[0]}</a>
          <a href={`tel:${site.phones[1].replaceAll(" ", "")}`}>{site.phones[1]}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </address>
        <div className="footer-language"><LanguageSwitcher /></div>
      </div>
      <p className="copyright">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
