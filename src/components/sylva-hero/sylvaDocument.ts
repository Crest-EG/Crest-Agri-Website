import { readFileSync } from "node:fs";
import path from "node:path";

import { PAGE_CUSTOMIZATION_BRIDGE } from "@/shaders/landing-pages/pageTypography";
import { products } from "@/content/products";

/**
 * The registered Sylva source is kept byte-for-byte under this component, not
 * in public/, so the unmodified origin document is never served as a page.
 * This module only builds the localized Crest edition in memory: the scene,
 * shaders, pacing, pointer parallax, liquid-metal controls and responsive rules
 * stay authored by ThreeUI.
 */

export type SylvaCopy = {
  documentTitle: string;
  metaDescription: string;
  headlineLine1: string;
  headlineLine2: string;
  lede: string;
  quoteCta: string;
  productLabel: string;
  productCta: string;
  statFormsLabel: string;
  statFormsValue: string;
  statOriginLabel: string;
  statOriginValue: string;
  scroll: string;
  ghost: string;
};

type SylvaDocumentOptions = {
  locale: "en" | "ar";
  copy: SylvaCopy;
};

const CANONICAL_PATH = path.join(
  process.cwd(),
  "src/components/sylva-hero/source/inner-green-3d.html",
);
const SITE_FONT_PATHS = {
  en: path.join(process.cwd(), "brand/fonts/Acumin Variable Concept.woff2"),
  ar: path.join(process.cwd(), "brand/fonts/Montserrat-Arabic-Regular.woff2"),
} as const;
let canonicalSource: string | undefined;
const siteFontBase64: Partial<Record<"en" | "ar", string>> = {};

function getCanonicalSource() {
  canonicalSource ??= readFileSync(CANONICAL_PATH, "utf8");
  return canonicalSource;
}

/**
 * The frame is sandboxed without allow-same-origin, so its origin is opaque
 * and cross-origin font requests are blocked. Inline the locale's site font.
 */
function getSiteFontDataUri(locale: "en" | "ar") {
  siteFontBase64[locale] ??= readFileSync(SITE_FONT_PATHS[locale]).toString("base64");
  return `data:font/woff2;base64,${siteFontBase64[locale]}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceOnce(source: string, from: string, to: string) {
  if (!source.includes(from)) {
    throw new Error(`Sylva source no longer matches: ${from.slice(0, 90)}`);
  }
  return source.replace(from, to);
}

function removeBetween(source: string, startMarker: string, endMarker: string) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Sylva source no longer matches between ${startMarker} and ${endMarker}`);
  }
  return `${source.slice(0, start)}${source.slice(end)}`;
}

const CLICK_BRIDGE = `<script>
(function () {
  function send(href) {
    parent.postMessage({ type: "crest-sylva-navigate", href: href }, "*");
  }
  document.addEventListener("click", function (event) {
    var target = event.target && event.target.closest
      ? event.target.closest("[data-crest-href], [data-crest-scroll]")
      : null;
    if (!target) return;
    event.preventDefault();
    if (target.hasAttribute("data-crest-scroll")) {
      parent.postMessage({ type: "crest-sylva-scroll" }, "*");
      return;
    }
    send(target.getAttribute("data-crest-href"));
  });
})();
</script>`;

export function buildCrestSylvaDocument({ locale, copy }: SylvaDocumentOptions) {
  const featured = products.filter((product) => product.featured).slice(0, 2);
  const [first, second] = featured;
  if (!first || !second) throw new Error("Sylva hero needs two featured products.");

  const href = (suffix: string) => `/${locale}${suffix}`;
  const firstImage = first.images[0] ?? "/images/stitch-products/grapes.jpg";
  const secondImage = second.images[0] ?? "/images/stitch-products/pomegranate.jpg";
  const firstHref = href(`/products/${first.slug}`);
  const secondHref = href(`/products/${second.slug}`);
  const quoteHref = href("/contact#quote");
  const fontFamily = locale === "ar" ? "Montserrat Arabic" : "Acumin";
  const fontWeight = locale === "ar" ? "400" : "100 900";

  let html = getCanonicalSource();

  html = replaceOnce(
    html,
    '<html lang="en">',
    `<html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">`,
  );
  html = replaceOnce(html, "<title>Sylva — Into the living world</title>", `<title>${escapeHtml(copy.documentTitle)}</title>`);
  html = replaceOnce(
    html,
    '<meta name="description" content="Restoring wild places through patient design, native planting, and a deeper kind of stewardship.">',
    `<meta name="description" content="${escapeHtml(copy.metaDescription)}">`,
  );
  html = replaceOnce(
    html,
    "src:url('inner-green-assets/lexend-latin.woff2') format('woff2');",
    `src:url('${getSiteFontDataUri(locale)}') format('woff2');`,
  );
  html = replaceOnce(
    html,
    "font-weight:100 900; font-style:normal; font-display:swap;",
    `font-weight:${fontWeight}; font-style:normal; font-display:swap;`,
  );
  html = html.replaceAll("'Lexend'", `'${fontFamily}'`);

  // Remove the authored Sylva dock and the play control. Crest's own header
  // and quote CTA replace them; the product cards, stats, scroll cue and the
  // native Explore liquid-metal control remain.
  html = removeBetween(html, '<div class="dock-wrap">', '<div class="stage" id="stage">');
  html = removeBetween(html, '<span class="play-wrap"', '<dl class="stat stat--a');

  // Product cards: the first two featured Crest products, using the same
  // authored portal frames and scan reveal as the original field notes.
  html = replaceOnce(
    html,
    '<span class="portal-media"><img src="inner-green-assets/card-ethos.jpg" alt="A cushion of moss grown over lichen-crusted stones" loading="eager" decoding="async"></span>',
    `<span class="portal-media"><img src="${firstImage}" alt="${escapeHtml(first.name[locale])}" loading="eager" decoding="async"></span>`,
  );
  html = replaceOnce(
    html,
    '<span class="portal-media"><img src="inner-green-assets/card-ecostove.jpg" alt="Moss-covered boulders in a misty grove" loading="eager" decoding="async"></span>',
    `<span class="portal-media"><img src="${secondImage}" alt="${escapeHtml(second.name[locale])}" loading="eager" decoding="async"></span>`,
  );

  html = replaceOnce(html, '<p class="label">Our Ethos</p>', "");
  html = replaceOnce(html, "<h2>Let the wild lead.</h2>", `<h2>${escapeHtml(first.name[locale])}</h2>`);
  html = replaceOnce(html, '<p class="label">Field Note 07</p>', "");
  html = replaceOnce(html, "<h2>After the Rain</h2>", `<h2>${escapeHtml(second.name[locale])}</h2>`);

  html = replaceOnce(
    html,
    'aria-label="Read about Sylva"',
    `aria-label="${escapeHtml(`${copy.productCta}: ${first.name[locale]}`)}" data-crest-href="${firstHref}"`,
  );
  html = replaceOnce(
    html,
    'aria-label="Open field note: After the Rain"',
    `aria-label="${escapeHtml(`${copy.productCta}: ${second.name[locale]}`)}" data-crest-href="${secondHref}"`,
  );

  html = replaceOnce(html, '<i style="--d:260ms">Step into</i>', `<i style="--d:260ms">${escapeHtml(copy.headlineLine1)}</i>`);
  html = replaceOnce(html, '<i style="--d:360ms">the living world</i>', `<i style="--d:360ms">${escapeHtml(copy.headlineLine2)}</i>`);
  html = replaceOnce(
    html,
    "We restore wild places through patient design, native planting, and a deeper kind of stewardship.",
    escapeHtml(copy.lede),
  );

  html = replaceOnce(
    html,
    '<button class="liquid-button liquid-button--explore btn" type="button">',
    `<button class="liquid-button liquid-button--explore btn" type="button" data-crest-href="${quoteHref}">`,
  );
  html = replaceOnce(html, '<span class="lbl">Explore the work</span>', `<span class="lbl">${escapeHtml(copy.quoteCta)}</span>`);
  html = replaceOnce(
    html,
    `            <svg class="ico" viewBox="0 0 115 115" aria-hidden="true">
              <g stroke="currentColor" stroke-width="11" stroke-linecap="round">
                <path d="M14 34.5 H101"/>
                <path d="M14 57.5 H101"/>
                <path d="M14 80.5 H68"/>
              </g>
            </svg>`,
    `          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h13"/><path d="m12 6 6 6-6 6"/>
          </svg>`,
  );

  html = replaceOnce(html, "<dt>Canopy restored</dt><dd>282 ha</dd>", `<dt>${escapeHtml(copy.statFormsLabel)}</dt><dd>${escapeHtml(copy.statFormsValue)}</dd>`);
  html = replaceOnce(html, "<dt>Native species</dt><dd>43 mapped</dd>", `<dt>${escapeHtml(copy.statOriginLabel)}</dt><dd>${escapeHtml(copy.statOriginValue)}</dd>`);

  html = replaceOnce(html, '<div class="ghost fade" style="--d:1150ms" aria-hidden="true">SYLVA</div>', `<div class="ghost fade" style="--d:1150ms" aria-hidden="true">${escapeHtml(copy.ghost)}</div>`);
  html = replaceOnce(
    html,
    '<a class="scroll mask" style="--d:1040ms; --pd:9" href="#">Discover<span class="track"></span></a>',
    `<a class="scroll mask" style="--d:1040ms; --pd:9" href="#crest-journey" data-crest-scroll>${escapeHtml(copy.scroll)}<span class="track"></span></a>`,
  );

  html = html.replaceAll("inner-green-assets/", "/landing-pages/inner-green-assets/");

  const localizationCss = `
<style data-crest-sylva>
  /* Crest edition: the authored composition is preserved; these rules only
     localize alignment and clear the fixed Crest header on narrow phones. */
  html[dir="rtl"] .headline,
  html[dir="rtl"] .lede { text-align: right; }
  /* Crest's headline is longer than the authored "Step into / the living
     world", so the standard full-width lede would collide with it. On desktop
     the lede moves under the headline, keeping the authored left rail. */
  @media (min-width: 901px) {
    .lede {
      left: calc(46 * var(--u));
      top: calc(350 * var(--u));
      width: calc(360 * var(--u));
    }
    /* The oversize clip box is centred on the button: offset it so the
       visible quote pill sits under the copy instead of the headline tail. */
    .pill-clip {
      left: calc(146 * var(--u));
      top: calc(470 * var(--u));
    }
    html[dir="rtl"] .pill-clip {
      left: calc(325 * var(--u));
    }
  }
  html[dir="rtl"] .liquid-button--explore .ico { transform: scaleX(-1); }
  @media (max-width: 900px) {
    /* Keep the product cards readable on phones instead of letting the
       procedural branch paint across their plates and knobs. */
    #scene { z-index: 2; }
    .card { z-index: 4; }
    html[dir="rtl"] .pill-clip { left: calc(160 * var(--u)); }
  }
  html[dir="rtl"] .card .label,
  html[dir="rtl"] .card h2 {
    left: auto;
    right: calc(38 * var(--u));
    text-align: right;
  }
  /* The procedural moss grows over the lower-right corner of the first card.
     Keep its Arabic copy on the clear left rail instead of under the branch. */
  html[dir="rtl"] .card--about .label,
  html[dir="rtl"] .card--about h2 {
    right: auto;
    left: calc(38 * var(--u));
    width: auto;
    text-align: right;
  }
  html[dir="rtl"] .stat { direction: rtl; }
  /* Lift the small labels just enough to stay legible on the scene. */
  .stat dt { color: rgba(255, 255, 255, .8); }
  .card .label { color: rgba(35, 38, 31, .72); }
  html[dir="rtl"] .scroll {
    left: calc(846 * var(--u));
    writing-mode: vertical-rl;
  }
  @media (max-width: 520px) {
    .headline { top: calc(178 * var(--u)); }
    .lede { top: calc(338 * var(--u)); }
    .pill-clip { top: calc(480 * var(--u)); }
    .stat--a, .stat--b { top: calc(600 * var(--u)); }
  }
  /* The embedded document must stay a single viewport tall; scale the authored
     composition against both dimensions instead of creating an iframe scroller. */
  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .hero {
    height: 100svh;
    min-height: 0;
  }
  @media (min-width: 901px) {
    :root { --u: min(calc(100vw / 1600), calc(100svh / 880)); }
  }
  @media (max-width: 900px) {
    :root { --u: min(calc(100vw / 760), calc(100svh / 1625)); }
    .stage {
      width: calc(760 * var(--u));
      margin-inline: auto;
    }
  }
  @media (max-width: 900px) and (max-height: 600px) {
    :root { --u: min(calc(100vw / 1600), calc(100svh / 880)); }
    .stage {
      position: absolute;
      left: 50%;
      top: 50%;
      width: calc(1600 * var(--u));
      height: calc(880 * var(--u));
      margin: calc(-440 * var(--u)) 0 0 calc(-800 * var(--u));
    }
    .headline {
      left: calc(46 * var(--u));
      top: calc(202 * var(--u));
      font-size: calc(63 * var(--u));
      line-height: calc(65 * var(--u));
    }
    .lede {
      left: calc(46 * var(--u));
      top: calc(350 * var(--u));
      width: max(210px, calc(360 * var(--u)));
      font-size: max(12px, calc(16.5 * var(--u)));
      line-height: max(15px, calc(22 * var(--u)));
    }
    .pill-clip {
      left: calc(146 * var(--u));
      top: calc(470 * var(--u));
    }
    .stat,
    .card,
    .scroll,
    .ghost {
      display: none;
    }
  }
  .card--about,
  .card--stove {
    height: calc(240 * var(--u));
  }
  @media (min-width: 901px) {
      .card--stove { width: calc(310 * var(--u)); }
  }
  .card--about figure,
  .card--stove figure {
    inset: calc(14 * var(--u)) calc(14 * var(--u)) auto;
    width: auto;
    height: calc(158 * var(--u));
  }
  .card--about h2,
  .card--stove h2 {
    inset-inline: calc(22 * var(--u));
    inset-block: auto calc(18 * var(--u));
    width: auto;
    text-align: start;
  }
  @media (max-width: 900px) {
    .card--about,
    .card--stove {
      height: calc(240 * var(--u));
    }
    .card--about figure,
    .card--stove figure {
      inset: calc(14 * var(--u)) calc(14 * var(--u)) auto;
      width: auto;
      height: calc(158 * var(--u));
    }
    .card--about h2,
    .card--stove h2 {
      inset-inline: calc(18 * var(--u));
      inset-block-end: calc(16 * var(--u));
    }
  }
</style>`;

  html = replaceOnce(
    html,
    "</head>",
    `${PAGE_CUSTOMIZATION_BRIDGE}${CLICK_BRIDGE}${localizationCss}</head>`,
  );

  return html;
}
