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
      <svg className="footer-landscape" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          fill="var(--bg)"
          d="M0 -40H1440V62 C1412 59 1411 67 1397 63 C1384 59 1380 69 1368 64 C1357 59 1350 67 1338 62 C1325 57 1317 68 1304 64 C1291 59 1285 69 1272 64 C1258 59 1253 67 1240 62 C1226 57 1218 69 1204 64 C1190 58 1185 68 1172 63 C1158 58 1150 69 1136 64 C1122 59 1117 67 1104 62 C1090 57 1081 69 1067 64 C1053 59 1047 68 1034 63 C1020 58 1012 69 998 64 C984 58 979 67 965 62 C951 57 942 69 928 64 C914 59 908 68 894 63 C880 58 872 69 858 64 C844 59 838 67 824 62 C810 57 801 69 787 64 C773 58 768 68 754 63 C740 58 732 69 718 64 C704 59 698 67 684 62 C670 57 661 69 647 64 C633 59 627 68 613 63 C599 58 591 69 577 64 C563 58 558 67 544 62 C530 57 521 69 507 64 C493 59 487 68 473 63 C459 58 451 69 437 64 C423 59 417 67 403 62 C389 57 380 69 366 64 C352 58 347 68 333 63 C319 58 311 69 297 64 C283 59 277 67 263 62 C249 57 240 69 226 64 C212 59 206 68 192 63 C178 58 170 69 156 64 C142 58 137 67 123 62 C109 57 100 69 86 64 C72 59 66 68 52 63 C38 58 30 68 16 63 L0 68Z"
        />
      </svg>
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
