"use client";

import { useEffect, type CSSProperties } from "react";

import { LandingPageFrame } from "@/shaders/landing-pages/LandingPageFrame";
import {
  usePageTypography,
  type PageTypographyProps,
} from "@/shaders/landing-pages/pageTypography";
import { SYLVA_TYPOGRAPHY } from "@/shaders/landing-pages/pageRecipes";

export type SylvaHeroProps = PageTypographyProps & {
  variant?: "living-green";
  /** Localized Crest edition of the registered inner-green-3d document. */
  srcDoc: string;
  title: string;
  className?: string;
  style?: CSSProperties;
  onNavigate?: (href: string) => void;
  onScrollToJourney?: () => void;
};

// srcDoc is always supplied, so the frame never fetches this fallback. The
// pristine source document stays out of public/.
const SYLVA_SOURCE_URL = "about:blank";

export function SylvaHero({
  variant = "living-green",
  srcDoc,
  title,
  className,
  style,
  onNavigate,
  onScrollToJourney,
  ...typeProps
}: SylvaHeroProps) {
  const customization = usePageTypography(SYLVA_TYPOGRAPHY, typeProps);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; href?: unknown } | null;
      if (!data || typeof data.type !== "string") return;
      if (data.type === "crest-sylva-navigate" && typeof data.href === "string") {
        onNavigate?.(data.href);
      }
      if (data.type === "crest-sylva-scroll") {
        onScrollToJourney?.();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onNavigate, onScrollToJourney]);

  return (
    <LandingPageFrame
      key={variant}
      srcDoc={srcDoc}
      sourceUrl={SYLVA_SOURCE_URL}
      title={title}
      customization={customization}
      className={className}
      style={{
        width: "100%",
        // The authored scene is a full-viewport composition. Keep it pinned to
        // the viewport instead of letting its own content height shrink it.
        height: "100svh",
        minHeight: "540px",
        background: "var(--text)",
        ...style,
      }}
    />
  );
}
