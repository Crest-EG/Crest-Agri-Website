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

## Search engine verification

Set these public verification tokens in the deployment environment when registering the site with each search engine:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: the token provided by Google Search Console.
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`: the token provided by Bing Webmaster Tools (`msvalidate.01`).

Leave either variable unset if that search engine has not issued a verification token. These values are verification tokens, not credentials.

## Journey frames

The five-scene scroll journey uses 150 WebP frames per scene. Regenerate the complete sequence in one command with local `ffmpeg`.
