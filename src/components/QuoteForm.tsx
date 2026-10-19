"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { products } from "@/content/products";
import { site } from "@/content/site";

type QuoteFormProps = { initialProduct?: string; variant?: "full" | "footer" };
type PreparedMessage = { whatsapp: string; email: string };

export function QuoteForm({ initialProduct = "", variant = "full" }: QuoteFormProps) {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("quote");
  const [prepared, setPrepared] = useState<PreparedMessage | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const footerContact = String(form.get("email") ?? "");
    const conciseValues = [
      [t("name"), form.get("name")],
      [t("footerEmailPhone"), footerContact],
      [t("country"), form.get("country")],
      [t("product"), products.find((product) => product.slug === form.get("product"))?.name[locale] ?? ""],
    ];
    const fullValues = [
      [t("requestType"), form.get("requestType")],
      [t("name"), form.get("name")],
      [t("company"), form.get("company")],
      [t("country"), form.get("country")],
      [t("email"), form.get("email")],
      [t("phone"), form.get("phone")],
      [t("product"), products.find((product) => product.slug === form.get("product"))?.name[locale] ?? ""],
      [t("quantity"), form.get("quantity")],
      [t("message"), form.get("message")],
    ];
    const values = (variant === "footer" ? conciseValues : fullValues)
      .map(([label, value]) => String(label) + ": " + String(value ?? ""));
    const body = values.join("\n");
    const subject = t("subject", { name: String(form.get("name") ?? "") });
    setPrepared({
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
          <a href={prepared.whatsapp} target="_blank" rel="noreferrer">{t("whatsappAction")}</a>
          <a href={prepared.email}>{t("emailAction")}</a>
        </div>
      )}
    </form>
  );
}
