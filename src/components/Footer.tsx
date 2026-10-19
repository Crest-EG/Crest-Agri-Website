import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const links = [
  ["products", "/products"],
  ["about", "/about"],
  ["certifications", "/certifications"],
  ["contact", "/contact"],
] as const;

export function Footer() {
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
        <LanguageSwitcher />
      </div>
      <p className="copyright">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
