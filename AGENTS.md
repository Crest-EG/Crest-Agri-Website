# AGENTS.md — Crest Agricultural website

Read this file and `PLAN.md` fully before writing any code. Work phase by phase as listed in `PLAN.md`.

## Project
Marketing website for **Crest for Agricultural Development** (Alexandria, Egypt), an exporter of fresh, frozen and dried agricultural products. Main audience: international buyers (Europe, USA, Gulf, other Arab countries, Russia). It replaces a WordPress site. No backend.

## Hard rules
1. **Stack:** Next.js (App Router) + TypeScript (strict) + Tailwind CSS + GSAP (ScrollTrigger) + next-intl. No backend, no database, no auth, no third-party integrations (no Instagram feed, no analytics, no CMS).
2. **Languages:** Arabic (`ar`, RTL) and English (`en`, LTR) only. Every user-visible string lives in `src/messages/en.json` and `src/messages/ar.json`. No hardcoded visible text in components.
3. **Language detection:** first visit uses the browser/device language (`Accept-Language`). Arabic → `ar`, English → `en`, anything else or any detection error → `en`. A visible switcher lets the user change it, and the choice is remembered (cookie) and wins over detection afterwards.
4. **Colors:** only the design tokens in `src/styles/tokens.css`. Never hardcode a hex value in a component. Ratio target: ~60% white/off-white, ~30% green, ~10% orange accent.
5. **Fonts:** only the three brand fonts, loaded from `brand/fonts/` with `next/font/local`. Do not download fonts from the internet. If a font file is missing, fall back to the system stack and list it in `ASSETS.md`.
6. **Logo:** use the shared `<Logo />` component everywhere a logo is needed (header, footer, favicon/tab icon, PWA icons, error and not-found pages, social preview). Never inline a different logo copy.
7. **One footer:** a single `<Footer />` rendered once in the locale layout, never per page.
8. **Placeholders:** the real logo, photos and frames are supplied later. Create placeholders with the exact final file names, and list every replaceable file with its required size in `ASSETS.md`.
9. **Accessibility and motion:** respect `prefers-reduced-motion`, keep all text as real HTML (never baked into images/video), keyboard focus visible, sufficient contrast (do NOT use the primary green for small body text on white).
10. **Quality gate before finishing any phase:** `npm run lint`, `npx tsc --noEmit` and `npm run build` must pass. Fix, don't skip.
11. **Git:** `git init` locally, one commit per phase with a clear message. Do not push anywhere.
12. **Scope:** do not add features not in `PLAN.md`. If something is ambiguous, pick the simplest option, mark it `TODO(confirm)` in code and in `ASSETS.md`, and continue.

## Commands
- `npm run dev` — local dev
- `npm run lint`, `npx tsc --noEmit`, `npm run build` — quality gate

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
