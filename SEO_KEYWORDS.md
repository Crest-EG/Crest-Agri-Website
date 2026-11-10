Implement technical SEO and AI-search readiness for the whole site. Follow AGENTS.md. Run lint, tsc, build and commit per step, then report.

1. METADATA (every page, en + ar): unique localized <title> and meta description, canonical URL, hreflang alternates (ar, en, x-default), Open Graph and Twitter cards (using the opengraph image), correct html lang/dir. Product pages use their own name/description/image. Use the keyword map below naturally, never stuff keywords. Titles under ~60 chars, descriptions ~150 chars.
2. sitemap.ts: all locale URLs including every product slug, with hreflang alternates and lastModified. robots.ts: allow all, disallow /api/, point to the sitemap. Explicitly allow these bots: Googlebot, Bingbot, Applebot, OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, Google-Extended. Keep the list in one config file.
3. Search engine verification: support env vars NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION and NEXT_PUBLIC_BING_SITE_VERIFICATION rendered in metadata when present. Document in README.
4. STRUCTURED DATA (JSON-LD, server-rendered, localized): Organization (name en/ar, logo, url, address, telephones, email, sameAs placeholders read from site.ts), WebSite, BreadcrumbList on inner pages, Product on product pages (name, description, image, category; NO price, NO offers, NO ratings), FAQPage on /services, ContactPage on /contact. Only use facts that exist in the content files; never invent data.
5. CRAWLABLE CONTENT: the landing page's scene texts, product links and contact links must exist in the server-rendered HTML (not only after JS runs or inside canvas). One h1 per page, logical h2/h3, descriptive alt text on every image (localized), descriptive link text (no "click here"), internal links between landing, products, services and contact. Product pages link to services (private label, shipping) and to related products.
6. PERFORMANCE (Core Web Vitals): the landing LCP must be a static poster image (first frame) shown instantly, before frames load; no layout shift; next/image with proper sizes, avif/webp; fonts preloaded with display swap; frames lazy-loaded; no render-blocking scripts. Run Lighthouse (mobile) on /en, /ar, one product page and report scores. Target 90+.
7. REDIRECTS: create redirects.ts consumed by next.config for 301 redirects from the old WordPress URLs. I will provide the old URL list later; build the mechanism now with the 4 known old patterns as examples and a clear place to add more. Add a custom 404 that suggests products and contact.
8. Optional low priority: add public/llms.txt (short, plain-language summary of the company, products, services, contact and key page URLs, both languages). Keep it factual.
9. Create SEO_CHECKLIST.md listing everything implemented and what the owner must do outside the code.

KEYWORD MAP (use naturally in titles, descriptions, h1/h2 and body copy):
- Landing: EN "Egyptian fresh and frozen fruits and vegetables exporter" / AR "مصدر فواكه وخضروات مصرية طازجة ومجمدة"
- Products: EN "Egyptian fruits and vegetables export" / AR "تصدير فواكه وخضروات مصرية"
- Strawberry: EN "Egyptian strawberry exporter", "frozen strawberries from Egypt" / AR "تصدير فراولة مصرية", "فراولة مجمدة للتصدير"
- Citrus/oranges: EN "Egyptian oranges and citrus export" / AR "تصدير برتقال وموالح مصرية"
- Pomegranate: EN "Egyptian pomegranate exporter" / AR "تصدير رمان مصري"
- Other crops: same pattern ("Egyptian X exporter" / "تصدير X مصري")
- Services: EN "private label fruits and vegetables Egypt", "export packing and shipping of fresh produce" / AR "تعبئة وتصدير الخضروات والفواكه", "برايفت ليبل"
- Certifications: EN "GlobalG.A.P. certified Egyptian exporter" / AR "مصدر مصري حاصل على GlobalG.A.P"
- Brand: EN "Crest for Agricultural Development", "Crest Agricultural" / AR "كرست للتنمية الزراعية"
- Location: Alexandria, Egypt / الإسكندرية، مصر