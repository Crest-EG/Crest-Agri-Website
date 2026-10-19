"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { products } from "@/content/products";
import { site } from "@/content/site";

type QuoteFormProps = { initialProduct?: string; variant?: "full" | "footer" };
type PreparedMessage = { whatsapp: string; email: string; leadId: string };

type LeadPayload = {
  event: "lead";
  leadId: string;
  locale: "ar" | "en";
  type: "quote" | "inquiry" | "contact";
  name: string;
  company: string;
  country: string;
  contact: string;
  product: string;
  quantity: string;
  message: string;
  page: string;
  website: string;
};

function track(payload: LeadPayload | { event: "channel"; leadId: string; channel: "whatsapp" | "email" }) {
  void fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}

export function QuoteForm({ initialProduct = "", variant = "full" }: QuoteFormProps) {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("quote");
  const [prepared, setPrepared] = useState<PreparedMessage | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const leadId = crypto.randomUUID();
    const nameAndCompany = String(form.get("name") ?? "").trim();
    const [footerName, footerCompany] = nameAndCompany.split(/\s+[—–-]\s+/, 2);
    const name = variant === "footer" ? (footerName || nameAndCompany) : nameAndCompany;
    const company = String(form.get("company") ?? (variant === "footer" ? footerCompany : "") ?? "").trim();
    const contact = String(form.get("email") ?? "").trim() + (String(form.get("phone") ?? "").trim() ? ` / ${String(form.get("phone")).trim()}` : "");
    const country = String(form.get("country") ?? "").trim();
    const productName = products.find((product) => product.slug === form.get("product"))?.name[locale] ?? "";
    const quantity = String(form.get("quantity") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const type = String(form.get("requestType") ?? "quote") as "quote" | "inquiry" | "contact";
    track({
      event: "lead", leadId, locale, type, name, company, country, contact,
      product: String(form.get("product") ?? ""), quantity, message,
      page: window.location.pathname, website: String(form.get("website") ?? ""),
    });
    const conciseValues = [
      [t("name"), name],
      [t("company"), company],
      [t("footerEmailPhone"), contact],
      [t("country"), country],
      [t("product"), productName],
    ];
    const fullValues = [
      [t("requestType"), t(`requestTypes.${type}`)],
      [t("name"), name], [t("company"), company], [t("country"), country],
      [t("email"), form.get("email")], [t("phone"), form.get("phone")],
      [t("product"), productName], [t("quantity"), quantity], [t("message"), message],
    ];
    const values = (variant === "footer" ? conciseValues : fullValues)
      .map(([label, value]) => String(label) + ": " + String(value ?? ""));
    const body = values.join("\n");
    const subject = t("subject", { name });
    setPrepared({
      leadId,
      whatsapp: "https://wa.me/" + site.whatsapp + "?text=" + encodeURIComponent(subject + "\n" + body),
      email: "mailto:" + site.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body),
    });
  }

  const fieldId = (name: string) => `${variant === "footer" ? "footer-quote" : "contact-quote"}-${name}`;

  return (
    <form id={variant === "footer" ? "quote" : undefined} className={`quote-form${variant === "footer" ? " quote-form-footer" : ""}`} onSubmit={handleSubmit} onChange={() => setPrepared(null)}>
      {variant !== "footer" && <div className="quote-field">
        <label htmlFor="quote-type">{t("requestType")}</label>
        <select id="quote-type" name="requestType" defaultValue="quote">
          <option value="quote">{t("requestTypes.quote")}</option>
          <option value="inquiry">{t("requestTypes.inquiry")}</option>
          <option value="contact">{t("requestTypes.contact")}</option>
        </select>
      </div>}
      <div className="quote-honeypot" aria-hidden="true">
        <label htmlFor={`${variant}-quote-website`}>{t("honeypotLabel")}</label>
        <input id={`${variant}-quote-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="quote-field">
        <label htmlFor={fieldId("name")}>{variant === "footer" ? t("footerNameCompany") : t("name")}</label>
        <input id={fieldId("name")} name="name" autoComplete="name" placeholder={variant === "footer" ? t("placeholder.nameCompany") : t("placeholder.name")} required />
      </div>
      {variant !== "footer" && <div className="quote-field">
        <label htmlFor="quote-company">{t("company")}</label>
        <input id="quote-company" name="company" autoComplete="organization" placeholder={t("placeholder.company")} />
      </div>}
      <div className="quote-field">
        <label htmlFor={fieldId("email")}>{variant === "footer" ? t("footerEmailPhone") : t("email")}</label>
        <input id={fieldId("email")} name="email" type={variant === "footer" ? "text" : "email"} autoComplete={variant === "footer" ? "email" : "email"} placeholder={t("placeholder.email")} required />
      </div>
      <div className="quote-field">
        <label htmlFor={fieldId("country")}>{variant === "footer" ? t("footerDestination") : t("country")}</label>
        <input id={fieldId("country")} name="country" autoComplete="country-name" placeholder={variant === "footer" ? t("placeholder.destination") : t("placeholder.country")} />
      </div>
      {variant !== "footer" && <div className="quote-field">
        <label htmlFor="quote-phone">{t("phone")}</label>
        <input id="quote-phone" name="phone" type="tel" autoComplete="tel" placeholder={t("placeholder.phone")} />
      </div>}
      <div className="quote-field">
        <label htmlFor={fieldId("product")}>{variant === "footer" ? t("product") : t("product")}</label>
        <select id={fieldId("product")} name="product" defaultValue={initialProduct}>
          <option value="">{t("chooseProduct")}</option>
          {products.map((product) => <option value={product.slug} key={product.slug}>{product.name[locale]}</option>)}
        </select>
      </div>
      {variant !== "footer" && <div className="quote-field">
        <label htmlFor="quote-quantity">{t("quantity")}</label>
        <input id="quote-quantity" name="quantity" placeholder={t("placeholder.quantity")} />
      </div>}
      {variant !== "footer" && <div className="quote-field quote-field-wide">
        <label htmlFor="quote-message">{t("message")}</label>
        <textarea id="quote-message" name="message" placeholder={t("placeholder.message")} required />
      </div>}
      <button className="button button-primary" type="submit">{variant === "footer" ? t("footerSubmit") : t("submit")} <span aria-hidden="true">▷</span></button>
      {prepared && (
        <div className="quote-result" aria-live="polite">
          <strong>{t("sentTitle")}</strong>
          <p>{t("sentBody")}</p>
          <a href={prepared.whatsapp} target="_blank" rel="noreferrer" onClick={() => track({ event: "channel", leadId: prepared.leadId, channel: "whatsapp" })}>{t("whatsappAction")}</a>
          <a href={prepared.email} onClick={() => track({ event: "channel", leadId: prepared.leadId, channel: "email" })}>{t("emailAction")}</a>
        </div>
      )}
      <p className="quote-consent">{t.rich("consent", { privacy: (chunks) => <a href={`/${locale}/privacy`}>{chunks}</a> })}</p>
    </form>
  );
}
