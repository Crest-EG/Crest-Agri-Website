# Crest website handoff

## What is built

The site is a bilingual (`/en`, `/ar`) Next.js App Router website for Crest for Agricultural Development. The landing page opens with the registered ThreeUI “Living Green” hero scene, localized into Crest copy, followed by the seven-scene scroll journey. The site also includes product listing and detail pages, About, Services, Certifications, Contact, a shared footer, privacy page, localized error pages, and quote forms. Arabic pages use RTL layout. The quote form prepares email and WhatsApp messages and sends lead and channel events to `/api/lead` without waiting for the webhook.

Some copy and image assets are provisional. Review [CONTENT_TODO.md](CONTENT_TODO.md) with the Crest team before treating those details as confirmed. Replace visual assets at their existing paths using the specifications in [ASSETS.md](ASSETS.md). The Stitch source exports are retained under `stitch/crest-export-website/`.

## Run and verify locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`. Run the quality gate before handing off code:

```bash
npm run lint
npx tsc --noEmit
npm run build
```


## Owner review before launch

- Confirm the provisional claims and company/contact details listed in [CONTENT_TODO.md](CONTENT_TODO.md).
- Replace the provisional logo, missing brand fonts, product and service photography, and journey frames listed in [ASSETS.md](ASSETS.md).
- Keep the shared footer rendered once from the locale layout. Keep new visible copy in both locale message files.
- Re-run lint, TypeScript, and production build after content or asset changes.
