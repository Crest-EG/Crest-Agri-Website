# SEO implementation checklist

## Implemented

- [x] Localized titles and descriptions for the landing page, products, every product detail, about, certifications, services, contact, privacy and terms pages.
- [x] Canonical URLs and `ar`, `en` and `x-default` alternates on localized pages; the locale layout renders the matching `html` language and direction.
- [x] Open Graph and Twitter large-image metadata use the shared social preview; product detail pages use their own product photo.
- [x] Optional Google Search Console and Bing Webmaster Tools verification metadata via environment variables.
- [x] Localized sitemap for all page and product URLs, including language alternates and `lastModified`.
- [x] Robots rules allow the public site, disallow `/api/`, and explicitly allow the configured search and AI crawlers.
- [x] Server-rendered Organization and WebSite JSON-LD, BreadcrumbList on inner pages, Product on product details, FAQPage on services and ContactPage on contact.
- [x] Product JSON-LD contains only name, description, image and category; it does not include prices, offers or ratings.
- [x] Landing headings, scene copy, product links and contact/service links are present in server-rendered HTML. Product details link to services and related products.
- [x] Product photos have localized alt text and are served through `next/image` with AVIF/WebP optimization. The scroll journey has a fixed-size first-frame poster while nearby frames load.
- [x] Legacy WordPress page, product slug, Arabic product slug and verified numeric product redirects are wired through `next.config.ts`; `public/llms.txt` provides a factual bilingual summary.
- [x] The localized and root 404 pages suggest products and contact links.

## Owner actions before launch

- [ ] Compare the documented legacy redirect map with Search Console / WordPress exports and add any remaining URLs to `src/config/redirects.ts`.
- [ ] Add the Google and/or Bing verification token to the deployment environment, then verify the domain in Search Console and Webmaster Tools.
- [ ] Submit `https://crestagricultural.com/sitemap.xml` after domain verification.
- [ ] Confirm company social profile URLs, contact details, certification claims and the illustrative product photos.
- [ ] Run Lighthouse mobile against `/en`, `/ar`, one product detail and `/services` on the deployed site; record Performance, Accessibility, Best Practices and SEO scores for each page, and address any score below 90. This has not been run; the project has no Lighthouse executable and deployment-only results cannot be inferred from local checks.

## Local regression checks

- The sandboxed 3D landing hero is verified in English and Arabic; a message handshake reveals it after its internal document is ready, even if its iframe load event fires before React hydrates.
- The crawlable landing copy follows the original hero → editorial gallery → scroll journey → quote CTA sequence.
- The scroll-journey poster remains lazy-loaded below the fold; only the hero poster is preloaded as the LCP candidate.
