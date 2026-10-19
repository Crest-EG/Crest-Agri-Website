# PLAN.md — Crest Agricultural website (agent plan)

Read `AGENTS.md` first (standing rules), then this file. Work phase by phase.

## 0. Context
- Company: **Crest for Agricultural Development** (Alexandria, Egypt). Exports fresh, frozen and dried agricultural products. This site replaces a WordPress site.
- Audience: international importers (Europe, USA, Gulf, other Arab countries, Russia), factories, traders, intermediaries. Local factories are secondary.
- Goal: premium, product-first site with a cinematic scroll journey. Main action: **request a quote**. No prices anywhere.
- Final approver: the manager. The first deliverable is a working prototype to show him, so it must feel finished, fast and polished on real devices, in Arabic and English.
- The project folder is empty except possibly `public/frames/` and an empty `public/images/products/` (delete the empty one). No product images are downloaded; use generated placeholders.

## 1. Decisions already made (do not re-ask)
- No backend, database, auth, admin panel, analytics, or third-party integrations (no Instagram feed, no Odoo, no Supabase, no CMS).
- Arabic + English only. Device language by default, switchable, fallback English.
- Landing = ONE continuous scroll journey (frame sequence), not stacked sections. Products are the main message; export/logistics is one part of the journey.
- Excluded for now: ads strip, Instagram feed, news, FAQ, prices, catalog download, dashboard.
- Local git only (`git init`, commit per phase). Upload to GitHub/Vercel later by the owner.
- Never invent company facts (numbers, years, certificates beyond GlobalGAP, SMETA, ISO). Use clearly marked `TODO(content)` placeholders.

## 2. Stack
Next.js (App Router) + TypeScript (strict) + Tailwind CSS + GSAP/ScrollTrigger (Lenis only if scroll feels rough) + next-intl + `next/font/local`. Map: `d3-geo`, `topojson-client`, `world-atlas`, flags: `country-flag-icons`. Static-friendly, zero running cost.

## 3. Design tokens (`src/styles/tokens.css`, mapped in Tailwind)
| Token | Value | Use |
|---|---|---|
| `--green` | `#50b94e` | Primary green: fills, borders, icons, buttons (~30%) |
| `--green-ink` | `#2f7d2e` | Darker green for text/links on white (contrast) — `TODO(confirm)` |
| `--orange` | `#f7941d` | Accent only (~10%): small highlights, pins. Never large areas |
| `--bg` | `#faf9f5` | Page background (off-white) |
| `--surface` | `#ffffff` | Secondary surfaces (cards, panels, header, inputs) — always with a 1px `--green` border |
| `--text` | `#1c2a1c` | Body text |
| `--text-muted` | `#5b6b5b` | Secondary text |
Radius 16px cards, 999px buttons/pills; one soft shadow. Primary button: filled green, white text (check contrast). Secondary: white + green border. Never use primary green for small body text on white.

Fonts (files in `brand/fonts/`, `display: swap`; one file `src/styles/fonts.ts` so the mapping is a one-line change):
- **Milan Display** — main headings (both languages)
- **Dubai Light** — sub-headings and Arabic body
- **Acumin Variable Concept** — Latin body
`TODO(confirm)`: this role mapping is an assumption. Missing font file → system fallback + entry in `ASSETS.md`.

Layout: max width 1200px, 8px scale, fluid type with `clamp()`. Use CSS logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`) so RTL needs no special cases.

## 4. Logo and assets contract
Create placeholders now with the final names, and write `ASSETS.md` listing each file, required size/format, and where it's used. The owner will replace them without code changes.
```
brand/logo/logo.svg            full horizontal logo (header, footer)
brand/logo/mark.svg            icon-only mark
brand/logo/logo-512.png        512x512
public/icons/icon-192.png      PWA 192x192
public/icons/icon-512.png      PWA 512x512
public/icons/icon-maskable-512.png   PWA maskable 512x512 (mark inside safe zone)
src/app/icon.png               favicon / tab icon 512x512
src/app/apple-icon.png         180x180
src/app/opengraph-image.png    1200x630 social preview
brand/fonts/*                  the three font files
public/frames/scene-1..7/      journey frames
public/images/products/<slug>/ real product photos (later)
```
`<Logo variant="full|mark" />` is the only code that references logo files. Placeholder logo = simple SVG with the text "CREST" in brand green. The logo must appear in: header, the single footer, browser tab (favicon), PWA icons, `not-found`, `error`, social preview.

## 5. Routes and structure
```
src/app/[locale]/layout.tsx          html lang/dir, fonts, Header, Footer (ONCE), providers
src/app/[locale]/page.tsx            landing (scroll journey)
src/app/[locale]/products/page.tsx   all products, filter Fresh/Frozen/Dried
src/app/[locale]/products/[slug]/page.tsx   product detail
src/app/[locale]/about/page.tsx      story, vision, mission
src/app/[locale]/certifications/page.tsx    GlobalGAP, SMETA, ISO (placeholder logos)
src/app/[locale]/contact/page.tsx    contact details + quote form
src/app/[locale]/not-found.tsx       branded 404 (logo, message, links)
src/app/[locale]/error.tsx           branded error + "Try again"
src/app/global-error.tsx             last-resort error page
src/app/not-found.tsx                404 outside a locale
src/app/manifest.ts                  PWA manifest
src/middleware.ts                    locale detection
src/messages/en.json, ar.json        ALL UI strings (the "strings file")
src/content/site.ts, products.ts, countries.ts
src/components/                      Logo, Header, Footer, LanguageSwitcher, Button, Card, Placeholder, ScrollJourney, MarketMap, QuoteForm, ProductCard
```
Static params for locales and product slugs. `generateMetadata` per page (localized title/description, `title.template` `%s | Crest`, hreflang alternates), sitemap, robots, semantic HTML, alt text.

**Header** (sticky, white, green bottom border, visible during the journey): logo, Products, About, Certifications, Contact, language switcher, "Request a quote". On `/`, add a visible "Skip to products" link. Mobile: menu sheet.
**Footer** (single component): logo, short description, nav, contact details, language switcher, copyright.
**PWA**: `manifest.ts` (name, short_name, `start_url: /`, `display: standalone`, theme `--green`, background `--bg`, icons above). No service worker, no offline mode.

## 6. Language detection
next-intl routing, locales `['ar','en']`, `defaultLocale: 'en'`, prefix always. First visit with no cookie: read `Accept-Language`; top supported match Arabic → `ar`, English → `en`; anything else, empty or parse error → `en` (wrap in try/catch). The switcher sets the `NEXT_LOCALE` cookie; the choice persists and wins over detection. `<html lang dir>` from locale (`dir="rtl"` for `ar`).

## 7. Content
**`site.ts`:** Name EN `Crest for Agricultural Development`, AR `كريست للتنمية الزراعية`. Address `B Entrance, Grand Towers, Smouha 21523, Alexandria, Egypt` (Arabic version `TODO(confirm)`). Phones `+20 100 209 0007`, `+20 108 002 1191`; WhatsApp = first number (`201002090007`) `TODO(confirm)`. Email `info@crestagricultural.com`. Website `crestagricultural.com`.

**`products.ts`** (11): grapes, pomegranate, peach, green-onion, cabbage, broccoli, citrus, strawberry, green-beans, sweet-potato, lettuce. Per product: `slug`, `name{en,ar}`, `type` (fruit|vegetable), `forms` (fresh|frozen|dried subset), `season{en,ar}`, `summary`, `farming/harvest/packing/shipping {en,ar}` (short generic placeholders, `TODO(content)`), `images: string[]` (empty now), `featured` (6 featured for the landing). Empty `images` → `<Placeholder />` (brand-color gradient with the product name).

**`countries.ts`:** `status: 'current' | 'target'`, EN name, AR name, coordinates. Use correct names (the source map has typos). Every status `TODO(confirm)`:
- current: Canada, Turkey, Switzerland, Italy, Slovenia, UAE, Jordan, Saudi Arabia, Brazil
- target: USA, Germany, Netherlands, Spain, Russia, Cyprus, GCC (grouped), North Africa (grouped)

## 8. Scroll journey (landing page)
One pinned full-viewport stage with a single `<canvas>` drawing a frame sequence driven by ScrollTrigger `scrub`, with real HTML overlays (text, buttons, cards) so translation, clicks and SEO work. After it: the compact quote section, then the footer.

**Frames contract:** `public/frames/scene-{1..7}/{001..060}.jpg` (1280x720; `.webp` later via config only: `src/config/frames.ts`). 420 frames as one continuous sequence. If frames are missing, draw a procedural placeholder on the canvas (brand gradient + scene number) so the page still works. Never show a blank canvas; keep the last loaded frame.

| # | Scene | Overlay |
|---|---|---|
| 1 | Hero | Headline (safe, high-quality agricultural products shipped worldwide) + buttons "Request a quote", "Browse products" |
| 2 | Farm and care | 2–3 lines about the company + link About + certification logos row |
| 3 | Harvest | Compact row of 4–6 featured product cards + "View all products" |
| 4 | Packing | Packing quality + **private label** option (importer's own label) |
| 5 | Shipping and export | Export service anywhere, fresh/frozen/dried |
| 6 | Markets | `<MarketMap />` in a white panel with green border over the dimmed canvas: static SVG world map (d3-geo + world-atlas), flag pins, current = green, target = gray, legend; GCC and North Africa as gray circles labeled "GCC"/"NA" |
| 7 | Delivery | Satisfied-customer closing + "Request a quote" |

**Mechanics**
- Height ≈ 140vh per scene desktop, ≈ 120vh mobile; total ≤ ~10 screens. Do not make it longer.
- Load scene 1 first (minimal loader until its first ~12 frames are ready), then current scene ±1 while scrolling; bounded cache; never load all 420 up front.
- `requestAnimationFrame` draw, cover-fit, DPR capped at 2, `scrub: 0.5`.
- **Lite mode** (every 2nd frame = 30/scene) when viewport < 768px, `deviceMemory <= 4`, `saveData`, or a slow connection. **Reduced motion:** no pin/canvas animation; each scene is a normal stacked block with a static first frame and the same content.
- Overlays fade by each scene's progress window; `pointer-events: auto` only on the active scene; all text stays in the DOM in order. Mobile: overlay becomes a bottom panel (white, green border) for readability.
- Visitors are never trapped: sticky header + "Skip to products".
- Kill ScrollTriggers and cancel animation frames on unmount; no horizontal scroll, no layout jank.

## 9. Quote form (no backend)
`<QuoteForm />` on the landing quote section and the contact page. Fields: request type (Quote / Inquiry / Contact), name, company, country, email, phone/WhatsApp, product (select; prefilled from `?product=`), quantity, message. Client validation. On submit show two buttons: **Send via WhatsApp** (`https://wa.me/<number>?text=<encoded>`) and **Send via Email** (`mailto:` with subject and body), message in the visitor's language with all fields. Nothing is stored.

## 10. Other pages
- **Products:** grid of `ProductCard` + filter chips (All / Fresh / Frozen / Dried).
- **Product detail:** gallery/placeholder, forms, season, farming → harvest → packing → shipping blocks, "Request a quote for this product", related products.
- **About:** story, vision, mission (short placeholder copy, bilingual).
- **Certifications:** three placeholder cards (GlobalGAP, SMETA, ISO) with a short text each.
- **Contact:** details from `site.ts` (click-to-call, mailto, WhatsApp, address + "Open in maps") + `<QuoteForm />`.

## 11. Phases (commit after each; run lint + `tsc --noEmit` + build; report after each)
- **P0** Scaffold with `create-next-app` (TS, Tailwind, ESLint, App Router, `src/`, npm, alias `@/*`) in the current folder; if it refuses due to a non-empty folder, scaffold in a temp dir and move files in. Install deps. Tokens, fonts, `ASSETS.md`.
- **P1** Foundation: i18n + middleware, locale layout, `Logo`, `Header`, single `Footer`, language switcher, `not-found`, `error`, `global-error`, metadata, icons, manifest, `messages`.
- **P2** Content layer: `site.ts`, `products.ts`, `countries.ts`, full `en.json`/`ar.json`.
- **P3** Scroll journey with placeholder frames + `MarketMap`. **Acceptance:** smooth on desktop and a mid-range phone, no blank canvas, overlays clickable, works in Arabic and English, lite mode and reduced motion work. **STOP and report for review here.**
- **P4** Inner pages (products, detail, about, certifications, contact) + `QuoteForm`.
- **P5** Polish: RTL pass on every page, 360px mobile pass, keyboard/focus, no hardcoded colors/strings, 404/error in both languages, language detection checks (Arabic browser → `/ar`, English → `/en`, French → `/en`, switcher persists), performance sanity, SEO basics.
- **P6** `HANDOFF.md`: what was built, how to run, every `TODO(confirm)`/`TODO(content)`, assets to replace (from `ASSETS.md`), how to deploy later (GitHub → Vercel, no env vars).

## 12. Definition of done
- `npm run lint`, `npx tsc --noEmit`, `npm run build` pass.
- All pages work in `/ar` (RTL) and `/en`, no console errors, no hardcoded visible strings or colors.
- The journey is smooth on desktop and usable on a mid-range phone, with working light mode.
- Every placeholder is listed in `ASSETS.md` with its final name and size, so real assets drop in with no code changes.
