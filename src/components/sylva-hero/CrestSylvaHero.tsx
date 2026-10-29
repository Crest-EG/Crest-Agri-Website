"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { SylvaHero } from "@/components/sylva-hero/SylvaHero";

type CrestSylvaHeroProps = {
  srcDoc: string;
  title: string;
};

export function CrestSylvaHero({ srcDoc, title }: CrestSylvaHeroProps) {
  const locale = useLocale();
  const router = useRouter();

  const handleNavigate = useCallback(
    (href: string) => {
      if (/^https?:\/\//i.test(href)) {
        window.location.assign(href);
        return;
      }
      const prefix = `/${locale}`;
      if (href.startsWith(prefix)) {
        router.push((href.slice(prefix.length) || "/") as never);
        return;
      }
      router.push(href as never);
    },
    [locale, router],
  );

  const scrollToJourney = useCallback(() => {
    const target = document.getElementById("crest-journey");
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <SylvaHero
      variant="living-green"
      srcDoc={srcDoc}
      title={title}
      headingFont={locale === "ar" ? "crest-montserrat-arabic" : "crest-acumin"}
      bodyFont={locale === "ar" ? "crest-montserrat-arabic" : "crest-acumin"}
      headingWeight={locale === "ar" ? "400" : "300"}
      bodyWeight={locale === "ar" ? "400" : "300"}
      primaryColor="#ffffff"
      headingSize={63}
      bodySize={16.5}
      headingLetterSpacing={-0.006}
      onNavigate={handleNavigate}
      onScrollToJourney={scrollToJourney}
    />
  );
}
