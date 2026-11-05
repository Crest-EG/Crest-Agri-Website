import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DirectionalArrow } from "@/components/DirectionalArrow";
import { BackToTop } from "@/components/BackToTop";
import { ContactIcon, SocialIcon, type SocialKind } from "@/components/icons";
import { site } from "@/content/site";

export function Footer() {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("common");
  const footer = t.raw("footer") as Record<string, string>;
  const pageLinks = [
    { label: t("navigation.products"), href: "/products" },
    { label: t("navigation.services"), href: "/services" },
    { label: t("navigation.about"), href: "/about" },
    { label: t("navigation.contact"), href: "/contact" },
    { label: t("navigation.quote"), href: "/contact#quote" },
  ];
  const informationLinks = [
    { label: t("navigation.certifications"), href: "/certifications" },
    { label: footer.privacy, href: "/privacy" },
    { label: footer.terms, href: "/terms" },
  ];
  const socialLinks: Array<{ kind: SocialKind; href: string; label: string }> = [
    { kind: "facebook", href: site.socials.facebook, label: footer.socialFacebook },
    { kind: "instagram", href: site.socials.instagram, label: footer.socialInstagram },
    { kind: "x", href: site.socials.x, label: footer.socialX },
    { kind: "youtube", href: site.socials.youtube, label: footer.socialYoutube },
    { kind: "tiktok", href: site.socials.tiktok, label: footer.socialTiktok },
    { kind: "whatsapp", href: site.socials.whatsapp, label: footer.socialWhatsapp },
  ];

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <section className="footer-brand" aria-label={t("companyName")}>
            <Link href="/" aria-label={t("navigation.home")} className="footer-brand-link">
              <Logo alt={t("logoAlt")} tone="white" className="footer-logo" />
            </Link>
            <p>{t("footer.description")}</p>
            <address className="footer-contact">
              <a href={site.mapsUrl} target="_blank" rel="noreferrer"><ContactIcon kind="pin" className="footer-contact-icon" /><span>{site.address[locale]}</span></a>
              <span className="footer-phone-row"><ContactIcon kind="phone" className="footer-contact-icon" /><span className="footer-phone-numbers">{site.phones.map((phone) => <a key={phone} href={`tel:${phone.replaceAll(" ", "")}`} dir="ltr">{phone}</a>)}</span></span>
              <a href={site.socials.whatsapp} target="_blank" rel="noreferrer" className="footer-whatsapp-link"><ContactIcon kind="whatsapp" className="footer-contact-icon" /><span className="footer-contact-number" dir="ltr">{site.whatsappFormatted}</span></a>
              <a href={`mailto:${site.email}`}><ContactIcon kind="mail" className="footer-contact-icon" /><span>{site.email}</span></a>
            </address>

            <div className="footer-socials" aria-label={footer.socialMediaTitle}>
              {socialLinks.map(({ kind, href, label }) => (
                <a
                  key={kind}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className={`footer-social-link footer-social-${kind}`}
                >
                  <SocialIcon kind={kind} />
                </a>
              ))}
            </div>
          </section>

          <nav className="footer-directory" aria-label={t("navigation.menu")}>
            <section className="footer-column">
              <h2>{footer.pagesTitle}</h2>
              <ul>{pageLinks.map(({ label, href }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </section>
            <section className="footer-column">
              <h2>{footer.informationTitle}</h2>
              <ul>
                {informationLinks.map(({ label, href }) => <li key={href}><Link href={href}>{label}</Link></li>)}
                <li>
                  <a href={site.brochureUrl} target="_blank" rel="noreferrer" className="footer-brochure-link">
                    <span>{footer.brochure}</span>
                    <DirectionalArrow kind="external" />
                  </a>
                </li>
              </ul>
            </section>
            <section className="footer-column">
              <h2>{footer.sisterCompaniesTitle}</h2>
              <ul>
                <li>
                  <a href={site.sisterCompanyUrl} target="_blank" rel="noreferrer" className="footer-external-link">
                    <span>{footer.crestChemicals}</span>
                    <DirectionalArrow kind="external" />
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="copyright">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="footer-bottom-actions"><LanguageSwitcher /><BackToTop label={footer.backToTop} /></div>
        </div>
      </div>
    </footer>
  );
}
