import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { QuoteForm } from "@/components/QuoteForm";
import { products } from "@/content/products";
import { site } from "@/content/site";

const capabilities = ["sourcing", "artwork", "packing", "dispatch"] as const;

function ContactIcon({ kind }: { kind: "pin" | "phone" | "mail" }) {
  const paths = {
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="M5 3h4l2 5-2.5 1.7a15 15 0 0 0 5.8 5.8L16 13l5 2v4c0 1.1-.9 2-2 2C10.3 21 3 13.7 3 5c0-1.1.9-2 2-2Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };
  return <svg className="footer-contact-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

export function Footer() {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("common");
  const q = useTranslations("quote");
  const s = useTranslations("services");
  const footer = t.raw("footer") as Record<string, string>;
  const catalog = products.slice(0, 5);

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <section className="footer-brand" aria-label={t("companyName")}>
            <Link href="/" aria-label={t("navigation.home")} className="footer-brand-link">
              <Logo alt={t("logoAlt")} className="footer-logo" />
            </Link>
            <p>{t("footer.description")}</p>
            <address className="footer-contact">
              <a href={site.mapsUrl} target="_blank" rel="noreferrer"><ContactIcon kind="pin" /><span>{site.address[locale]}</span></a>
              <span className="footer-phone-row"><ContactIcon kind="phone" /><span><a href={`tel:${site.phones[0].replaceAll(" ", "")}`}>{site.phones[0]}</a><i aria-hidden="true">/</i><a href={`tel:${site.phones[1].replaceAll(" ", "")}`}>{site.phones[1]}</a></span></span>
              <a href={`mailto:${site.email}`}><ContactIcon kind="mail" /><span>{site.email}</span></a>
            </address>
          </section>

          <section className="footer-quote" aria-labelledby="footer-quote-title">
            <h2 id="footer-quote-title">{q("title")}</h2>
            <p>{q("intro")}</p>
            <QuoteForm variant="footer" />
          </section>
        </div>

        <div className="footer-directory">
          <section className="footer-column">
            <h3>{footer.catalog}</h3>
            <ul>{catalog.map((product) => <li key={product.slug}><Link href={`/products/${product.slug}`}>{product.name[locale]}</Link></li>)}</ul>
          </section>
          {/* TODO(confirm): verify the export ports and current certification register before naming specific ports or certificates here. */}
          <section className="footer-column">
            <h3>{footer.capabilities}</h3>
            <ul>{capabilities.map((key) => <li key={key}><Link href="/services">{s(key)}</Link></li>)}</ul>
          </section>
          <section className="footer-column">
            <h3>{footer.keyPorts}</h3>
            <ul>
              <li><a href={site.mapsUrl} target="_blank" rel="noreferrer">{footer.origin}</a></li>
              <li><Link href="/contact">{footer.destinationPorts}</Link></li>
            </ul>
          </section>
          <section className="footer-column">
            <h3>{footer.accreditations}</h3>
            <ul><li><Link href="/certifications">{footer.certificationInquiry}</Link></li></ul>
          </section>
        </div>

        <div className="footer-bottom">
          <p className="copyright">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="footer-bottom-actions"><LanguageSwitcher /><a className="back-to-top" href="#top">{footer.backToTop}<span aria-hidden="true">↑</span></a></div>
        </div>
      </div>
    </footer>
  );
}
