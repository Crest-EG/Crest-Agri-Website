import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";

export default function LocaleNotFound() {
  const t = useTranslations("common");
  return (
    <main className="status-page">
      <Logo variant="mark" alt={t("logoAlt")} className="status-logo" />
      <p className="eyebrow">404</p>
      <h1>{t("errors.notFoundTitle")}</h1>
      <p>{t("errors.notFoundBody")}</p>
      <Link className="button button-primary" href="/">{t("errors.backHome")}</Link>
    </main>
  );
}
