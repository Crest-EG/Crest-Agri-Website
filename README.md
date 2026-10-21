# Crest Agricultural Export Website

Marketing website for Crest for Agricultural Development, built with Next.js App Router, TypeScript, Tailwind CSS, GSAP and next-intl. The site supports English and Arabic, with localized routes under `/en` and `/ar`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Journey frames

The seven-scene scroll journey uses 120 WebP frames per scene. Regenerate the complete sequence in one command with local `ffmpeg` and Python Pillow installed:

```bash
npm run frames:generate
```

## Content and assets

Real product availability, specifications, market relationships, standards scope, office details and contact routing need confirmation from the Crest team. Mock content is marked in `CONTENT_TODO.md` with a replace instruction beside each item. Replaceable visual assets and their specifications are listed in `ASSETS.md`.
