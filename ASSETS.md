# Replaceable assets

The landing page and product catalogue now use the supplied company/profile images, converted to compressed WebP files. Product paths are stable and are referenced from `src/content/products.ts`.

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
| `public/images/landing/export-truck.webp` | 1800×1012 WebP | Landing hero and shipping page |
| `public/images/landing/harvest.webp` | 910×1200 WebP | Landing about section, About page and services page |
| `public/images/landing/private-label.webp` | 1608×946 WebP | Private-label section |
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

- `TODO(confirm)`: confirm product seasons, commercial grades, orange/lemon pack-size mapping and current loading details with Crest before publishing product specifications.
- `TODO(confirm)`: confirm the named markets and certification wording against current company documents.
- `TODO(confirm)`: replace placeholder brand files where the final approved logo and font assets are provided.
- The supplied product-pack images are used as delivered. The source FFmpeg build does not include the `libwebp` encoder. FFmpeg resized the source assets and the installed `cwebp` encoder wrote the compressed WebP files.
- Product copy and variant data are transcribed from `Images/Profile Company 2026 - Crest Agricultural.pdf`; the PDF contains several typos and incomplete lines, so unclear details are marked for confirmation instead of inferred.
