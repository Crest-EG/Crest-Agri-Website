# Replaceable assets

The landing page, certification page and product catalogue use supplied company/profile imagery converted to compressed WebP files. Product paths are stable and are referenced from `src/content/products.ts`.

| Path | Current size and format | Use |
|---|---:|---|
| `brand/logo/logo.svg` | SVG, horizontal | Header and footer via `<Logo variant="full" />` |
| `brand/logo/logo-white.svg` | SVG, horizontal | White logo variant |
| `brand/logo/mark.svg` | SVG, square | Compact mark |
| `brand/logo/logo-512.png` | 512×512 PNG | Brand mark |
| `public/icons/icon-192.png` | 192×192 PNG | PWA icon |
| `public/icons/icon-512.png` | 512×512 PNG | PWA icon |
| `public/icons/icon-maskable-512.png` | 512×512 PNG | Maskable PWA icon |
| `src/app/icon.png` | 512×512 PNG | Browser tab icon |
| `src/app/apple-icon.png` | 180×180 PNG | Apple touch icon |
| `src/app/opengraph-image.png` | 1200×630 PNG | Social preview |
| `brand/fonts/Montserrat-Arabic-Regular.woff2` | WOFF2 | Local site font; Arial/sans-serif is the fallback |
| `brand/fonts/Dubai-Light` | Not supplied | TODO(confirm): planned Arabic/display font; system fallback remains active |
| `brand/fonts/Acumin-Variable-Concept` | Not supplied | TODO(confirm): planned Latin body font; system fallback remains active |
| `public/images/landing/export-truck.webp` | 1800×1012 WebP | Landing hero |
| `public/images/landing/private-label.webp` | 1608×946 WebP | Original private-label illustration on the landing page and product details |
| `public/images/categories/fresh.webp` | 1800×1012 WebP | Fresh category card |
| `public/images/categories/frozen.webp` | 1800×1012 WebP | Frozen category card, landing and About imagery |
| `public/images/services/shipping.webp` | 1500×818 WebP | Services shipping section |
| `public/images/landing/harvest.webp` | 910×1200 WebP | Services page quality section |
| `public/images/certifications/globalgap.webp` | 625×625 WebP | Landing certification strip and certification page |
| `public/images/certifications/grasp.webp` | 625×625 WebP | Landing certification strip and certification page |
| `public/images/certifications/iso-22000.webp` | 177×179 WebP | Landing certification strip and certification page |
| `public/images/certifications/iso.webp` | 365×335 WebP | Certification page |
| `public/images/certifications/brcgs.webp` | 158×126 WebP | Certification page |
| `public/images/certifications/fda.webp` | 190×93 WebP | Certification page |
| `public/images/certifications/gacc.webp` | 222×103 WebP | Certification page |
| `public/images/certifications/haccp.webp` | 189×164 WebP | Certification page |
| `public/images/products/orange.webp` | 594×595 WebP | Fresh orange |
| `public/images/products/lemon.webp` | 716×717 WebP | Fresh lemon |
| `public/images/products/sweet-potato.webp` | 792×793 WebP | Fresh sweet potato |
| `public/images/products/strawberry.webp` | 979×1200 WebP | Frozen strawberry |
| `public/images/products/fig.webp` | 972×1200 WebP | Frozen fig |
| `public/images/products/mango.webp` | 949×1200 WebP | Frozen mango |
| `public/images/products/guava.webp` | 1022×1200 WebP | Frozen guava |
| `public/images/products/pomegranate.webp` | 1200×1200 WebP | Frozen pomegranate |
| `public/images/products/apricot.webp` | 1022×1200 WebP | Frozen apricot |
| `public/images/products/cauliflower.webp` | 1200×1200 WebP | Frozen cauliflower |
| `public/images/products/mixed-vegetables.webp` | 1200×1200 WebP | Frozen mixed vegetables |
| `public/images/products/okra.webp` | 1200×1200 WebP | Frozen okra |
| `public/images/products/carrot.webp` | 1200×1200 WebP | Frozen carrot |
| `public/images/products/peas.webp` | 1200×1200 WebP | Frozen peas |
| `public/images/products/green-beans.webp` | 1200×1200 WebP | Frozen green beans |
| `public/images/products/molokhia.webp` | 566×697 WebP | Frozen molokhia |
| `public/images/products/sweet-corn.webp` | 1200×1200 WebP | Frozen sweet corn |
| `public/images/products/spinach.webp` | 527×700 WebP | Frozen spinach |
| `public/images/products/broccoli.webp` | 1200×1200 WebP | Frozen broccoli |
| `public/images/products/artichoke.webp` | 1200×1200 WebP | Frozen artichoke |
| `public/images/products/french-fries.webp` | 1200×1200 WebP | Frozen par-fried French fries |

## Content confirmation

- `TODO(confirm)`: confirm seasonal windows for fresh orange, lemon and sweet potato, and year-round frozen mixed-vegetable supply. Their timelines are estimates from public Egyptian crop and export calendars; confirm commercial availability with Crest before publishing. Also confirm commercial grades, pack-size mapping and current loading details.
- `TODO(confirm)`: confirm the named markets and certification wording against current company documents.
- `TODO(confirm)`: replace placeholder brand files where the final approved logo and font assets are provided.
- FFmpeg resized and color-converted the supplied CMYK/JPEG and Pexels images; the installed `cwebp` encoder wrote the compressed WebP files because the FFmpeg build does not include `libwebp`. The oversized source photo attachments were removed after conversion. The supplied workflow graphic was used as a layout reference and its labels were rebuilt as localized HTML text.
- Product copy and variant data are transcribed from `Images/Profile Company 2026 - Crest Agricultural.pdf`; the PDF contains several typos and incomplete lines, so unclear details are marked for confirmation instead of inferred.
