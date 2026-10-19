"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { products } from "@/content/products";
import { site } from "@/content/site";

type QuoteFormProps = { initialProduct?: string };
type PreparedMessage = { whatsapp: string; email: string };

export function QuoteForm({ initialProduct = "" }: QuoteFormProps) {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations("quote");
  const [prepared, setPrepared] = useState<PreparedMessage | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = [
      [t("requestType"), form.get("requestType")],
      [t("name"), form.get("name")],
      [t("company"), form.get("company")],
      [t("country"), form.get("country")],
      [t("email"), form.get("email")],
      [t("phone"), form.get("phone")],
      [t("product"), products.find((product) => product.slug === form.get("product"))?.name[locale] ?? ""],
      [t("quantity"), form.get("quantity")],
      [t("message"), form.get("message")],
    ].map(([label, value]) => String(label) + ": " + String(value ?? ""));
    const body = values.join("\n");
    const subject = t("subject", { name: String(form.get("name") ?? "") });
    setPrepared({
      whatsapp: "https://wa.me/" + site.whatsapp + "?text=" + encodeURIComponent(subject + "\n" + body),
      email: "mailto:" + site.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body),
    });
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} onChange={() => setPrepared(null)}>
      <div className="quote-field">
        <label htmlFor="quote-type">{t("requestType")}</label>
        <select id="quote-type" name="requestType" defaultValue="quote">
          <option value="quote">{t("requestTypes.quote")}</option>
          <option value="inquiry">{t("requestTypes.inquiry")}</option>
          <option value="contact">{t("requestTypes.contact")}</option>
        </select>
      </div>
      <div className="quote-field">
        <label htmlFor="quote-name">{t("name")}</label>
        <input id="quote-name" name="name" autoComplete="name" placeholder={t("placeholder.name")} required />
      </div>
      <div className="quote-field">
        <label htmlFor="quote-company">{t("company")}</label>
        <input id="quote-company" name="company" autoComplete="organization" placeholder={t("placeholder.company")} />
      </div>
      <div className="quote-field">
        <label htmlFor="quote-country">{t("country")}</label>
        <input id="quote-country" name="country" autoComplete="country-name" placeholder={t("placeholder.country")} />
      </div>
      <div className="quote-field">
        <label htmlFor="quote-email">{t("email")}</label>
        <input id="quote-email" name="email" type="email" autoComplete="email" placeholder={t("placeholder.email")} required />
      </div>
      <div className="quote-field">
        <label htmlFor="quote-phone">{t("phone")}</label>
        <input id="quote-phone" name="phone" type="tel" autoComplete="tel" placeholder={t("placeholder.phone")} />
      </div>
      <div className="quote-field">
        <label htmlFor="quote-product">{t("product")}</label>
        <select id="quote-product" name="product" defaultValue={initialProduct}>
          <option value="">{t("chooseProduct")}</option>
          {products.map((product) => <option value={product.slug} key={product.slug}>{product.name[locale]}</option>)}
        </select>
      </div>
      <div className="quote-field">
        <label htmlFor="quote-quantity">{t("quantity")}</label>
        <input id="quote-quantity" name="quantity" placeholder={t("placeholder.quantity")} />
      </div>
      <div className="quote-field quote-field-wide">
        <label htmlFor="quote-message">{t("message")}</label>
        <textarea id="quote-message" name="message" placeholder={t("placeholder.message")} required />
      </div>
      <button className="button button-primary" type="submit">{t("submit")} <span aria-hidden="true">↗</span></button>
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
