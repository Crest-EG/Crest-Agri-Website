# PLAN.md — Crest Agricultural website (agent plan)

Read `AGENTS.md` first (standing rules), then this file. Work phase by phase.

## 0. Context
- Company: **Crest for Agricultural Development** (Alexandria, Egypt). Exports fresh, frozen and dried agricultural products. This site replaces a WordPress site.
- Audience: international importers (Europe, USA, Gulf, other Arab countries, Russia), factories, traders, intermediaries. Local factories are secondary.
- Goal: premium, product-first site. Main action: **request a quote**. No prices anywhere.
- Final approver: the manager. The first deliverable is a working prototype to show him, so it must feel finished, fast and polished on real devices, in Arabic and English.
- Product and landing photography is supplied locally under `Images/` and is optimized into stable WebP paths under `public/images/`.

## 1. Decisions already made (do not re-ask)
- No backend, database, auth, admin panel, analytics, or third-party integrations (no Instagram feed, no Odoo, no Supabase, no CMS).
- Arabic + English only. Device language by default, switchable, fallback English.
- Landing is a product-first page: photographic hero, fresh/frozen entry points, about and certifications, product cards, private label, services, markets, quote call-to-action, and the shared footer. The prior 3D intro, editorial gallery, frame sequence and scroll CTA are removed.
- Excluded for now: ads strip, Instagram feed, news, FAQ, prices, catalog download, dashboard.
- Local git only (`git init`, commit per phase). Upload to GitHub/Vercel later by the owner.
- Never invent company facts (numbers, years, certificates beyond GlobalGAP, SMETA, ISO). Use clearly marked `TODO(content)` placeholders.

## 2. Stack
Next.js (App Router) + TypeScript (strict) + Tailwind CSS + GSAP/ScrollTrigger (Lenis only if scroll feels rough) + next-intl + `next/font/local`. Map: `d3-geo`, `topojson-client`, `world-atlas`, flags: `country-flag-icons`. Static-friendly, zero running cost.

## 3. Design tokens (`src/styles/tokens.css`, mapped in Tailwind)
| Token | Value | Use |
|---|---|---|
| `--green` | `#50b94e` | Primary green: fills, borders, icons, buttons (~30%) |
| `--green-ink` | `#2f7d2e` | Darker green for text/links on white (contrast) |
| `--orange` | `#f7941d` | Accent only (~10%): small highlights, pins. Never large areas |
| `--bg` | `#faf9f5` | Page background (off-white) |
| `--surface` | `#ffffff` | Secondary surfaces (cards, panels, header, inputs) — always with a 1px `--green` border |
| `--text` | `#1c2a1c` | Body text |
| `--text-muted` | `#5b6b5b` | Secondary text |
Radius 16px cards, 999px buttons/pills; one soft shadow. Primary button: filled green, white text (check contrast). Secondary: white + green border. Never use primary green for small body text on white.

Fonts (files in `brand/fonts/`, `display: swap`; one file `src/styles/fonts.ts` so the mapping is a one-line change):
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
public/images/landing/             compressed landing photography
public/images/products/<slug>.webp  compressed fresh and frozen product images
```
`<Logo variant="full|mark" />` is the only code that references logo files. Placeholder logo = simple SVG with the text "CREST" in brand green. The logo must appear in: header, the single footer, browser tab (favicon), PWA icons, `not-found`, `error`, social preview.

## 5. Routes and structure
```
src/app/[locale]/layout.tsx          html lang/dir, fonts, Header, Footer (ONCE), providers
src/app/[locale]/page.tsx            product-first landing
src/app/[locale]/products/page.tsx   all products, filter Fresh/Frozen
src/app/[locale]/products/[slug]/page.tsx   product detail
src/app/[locale]/about/page.tsx      story, vision, mission
src/app/[locale]/certifications/page.tsx    GlobalGAP, SMETA, ISO (text cards until approved logos are supplied)
src/app/[locale]/contact/page.tsx    contact details + quote form
src/app/[locale]/not-found.tsx       branded 404 (logo, message, links)
src/app/[locale]/error.tsx           branded error + "Try again"
src/app/global-error.tsx             last-resort error page
src/app/not-found.tsx                404 outside a locale
src/app/manifest.ts                  PWA manifest
src/middleware.ts                    locale detection
src/messages/en.json, ar.json        ALL UI strings (the "strings file")
src/content/site.ts, products.ts, countries.ts
src/components/                      Logo, Header, Footer, LanguageSwitcher, Button, MarketMap, QuoteForm, ProductCard
```
Static params for locales and product slugs. `generateMetadata` per page (localized title/description, `title.template` `%s | Crest`, hreflang alternates), sitemap, robots, semantic HTML, alt text.

**Header** (sticky, white, green bottom border, visible while scrolling): logo, Products, About, Certifications, Contact, language switcher, "Request a quote". On `/`, add a visible "Skip to products" link. Mobile: menu sheet.
**Footer** (single component): logo, short description, nav, contact details, language switcher, copyright.
**PWA**: `manifest.ts` (name, short_name, `start_url: /`, `display: standalone`, theme `--green`, background `--bg`, icons above). No service worker, no offline mode.

## 6. Language detection
next-intl routing, locales `['ar','en']`, `defaultLocale: 'en'`, prefix always. First visit with no cookie: read `Accept-Language`; top supported match Arabic → `ar`, English → `en`; anything else, empty or parse error → `en` (wrap in try/catch). The switcher sets the `NEXT_LOCALE` cookie; the choice persists and wins over detection. `<html lang dir>` from locale (`dir="rtl"` for `ar`).

## 7. Content
**`site.ts`:** Name EN `Crest for Agricultural Development`, AR `كرست للتنمية الزراعية`. Address `B Entrance, Grand Towers, Smouha 21523, Alexandria, Egypt` (Arabic version `TODO(confirm)`). Phones `+20 100 209 0007`, `+20 108 002 1191`; WhatsApp = first number (`201002090007`) `TODO(confirm)`. Email `info@crestagricultural.com`. Website `crestagricultural.com`.

**`products.ts`**: use fresh and frozen products and specifications supplied in the 2026 company profile. Each entry includes bilingual name, summary, season, sourcing/harvest/packing/shipping notes, preparation variants and a WebP image. The catalogue has no dried category.

**`countries.ts`:** `status: 'current' | 'target'`, EN name, AR name, coordinates. Use correct names (the source map has typos). Every status `TODO(confirm)`:
- current: Canada, Turkey, Switzerland, Italy, Slovenia, UAE, Jordan, Saudi Arabia, Brazil
- target: USA, Germany, Netherlands, Spain, Russia, Cyprus, GCC (grouped), North Africa (grouped)

## 8. Landing page
Build a responsive product-first page with real HTML copy and the supplied, compressed WebP assets. Keep the shared header and footer. Sections in order: photographic hero, fresh/frozen entry cards, about with certifications, products grouped by fresh and frozen, private label, sourcing/packing/logistics services, static market map, and quote call-to-action. Product cards expose specification highlights and link to full detail pages. There is no 3D intro, frame video, pinned scroll stage, or dried category.

## 9. Quote form (no backend)
`<QuoteForm />` on the landing quote section and the contact page. Fields: request type (Quote / Inquiry / Contact), name, company, country, email, phone/WhatsApp, product (select; prefilled from `?product=`), quantity, message. Client validation. On submit show two buttons: **Send via WhatsApp** (`https://wa.me/<number>?text=<encoded>`) and **Send via Email** (`mailto:` with subject and body), message in the visitor's language with all fields. Nothing is stored.

## 10. Other pages
- **Products:** grid of `ProductCard` + filter chips (All / Fresh / Frozen).
- **Product detail:** gallery/placeholder, forms, season, farming → harvest → packing → shipping blocks, "Request a quote for this product", related products.
- **About:** story, vision, mission (short placeholder copy, bilingual).
- **Certifications:** three placeholder cards (GlobalGAP, SMETA, ISO) with a short text each.
- **Contact:** details from `site.ts` (click-to-call, mailto, WhatsApp, address + "Open in maps") + `<QuoteForm />`.

## 11. Phases (commit after each; run lint + `tsc --noEmit` + build; report after each)
- **P0** Scaffold with `create-next-app` (TS, Tailwind, ESLint, App Router, `src/`, npm, alias `@/*`) in the current folder; if it refuses due to a non-empty folder, scaffold in a temp dir and move files in. Install deps. Tokens, fonts, `ASSETS.md`.
- **P1** Foundation: i18n + middleware, locale layout, `Logo`, `Header`, single `Footer`, language switcher, `not-found`, `error`, `global-error`, metadata, icons, manifest, `messages`.
- **P2** Content layer: `site.ts`, `products.ts`, `countries.ts`, full `en.json`/`ar.json`.
- **P3** Product-first landing page with supplied WebP assets + `MarketMap`. **Acceptance:** responsive on desktop and mobile, sections and product cards work in Arabic and English, text remains accessible HTML, reduced-motion preferences are respected. **STOP and report for review here.**
- **P4** Inner pages (products, detail, about, certifications, contact) + `QuoteForm`.
- **P5** Polish: RTL pass on every page, 360px mobile pass, keyboard/focus, no hardcoded colors/strings, 404/error in both languages, language detection checks (Arabic browser → `/ar`, English → `/en`, French → `/en`, switcher persists), performance sanity, SEO basics.
- **P6** `HANDOFF.md`: what was built, how to run, every `TODO(confirm)`/`TODO(content)`, assets to replace (from `ASSETS.md`), how to deploy later (GitHub → Vercel, no env vars).

## 12. Definition of done
- `npm run lint`, `npx tsc --noEmit`, `npm run build` pass.
- All pages work in `/ar` (RTL) and `/en`, no console errors, no hardcoded visible strings or colors.
- Landing and product pages are responsive in Arabic and English, with working light mode.
- Every placeholder is listed in `ASSETS.md` with its final name and size, so real assets drop in with no code changes.
