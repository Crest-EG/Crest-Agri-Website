"use client";

import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("common");
  return (
    <main className="status-page">
      <Logo variant="mark" alt={t("logoAlt")} className="status-logo" />
      <h1>{t("errors.errorTitle")}</h1>
      <p>{t("errors.errorBody")}</p>
      <Button type="button" onClick={() => reset()}>{t("errors.tryAgain")}</Button>
    </main>
  );
}
