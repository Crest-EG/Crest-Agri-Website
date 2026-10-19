# Replaceable assets

All image placeholders are usable today. Replace them with files at the same paths so code does not need changes.

| Path / pattern | Required size and format | Used for |
|---|---|---|
| `brand/logo/logo.svg` | Horizontal vector, 300×72 viewBox | Header and footer via `<Logo variant="full" />` |
| `brand/logo/mark.svg` | Square vector, 128×128 viewBox | Compact logo and derived app icons |
| `brand/logo/logo-512.png` | 512×512 PNG | High-resolution brand mark |
| `public/icons/icon-192.png` | 192×192 PNG | PWA icon |
| `public/icons/icon-512.png` | 512×512 PNG | PWA icon |
| `public/icons/icon-maskable-512.png` | 512×512 PNG; artwork within centered 80% safe zone | Maskable PWA icon |
| `src/app/icon.png` | 512×512 PNG | Browser tab icon |
| `src/app/apple-icon.png` | 180×180 PNG | Apple touch icon |
| `src/app/opengraph-image.png` | 1200×630 PNG | Social preview; keep logo within the image safe area |
| `brand/fonts/MilanDisplay.woff2` | WOFF2, variable or regular weight | Display headings, Latin and Arabic |
| `brand/fonts/DubaiLight.woff2` | WOFF2, regular/light | Subheadings and Arabic body |
| `brand/fonts/AcuminVariable.woff2` | WOFF2, variable | Latin body |
| `public/frames/scene-{1..7}/{001..060}.jpg` | 1280×720 JPEG; 60 frames per scene, 420 total | Scroll journey canvas backgrounds |
| `public/images/products/<slug>/` | TODO(confirm): product image dimensions and formats | Product photography, added during P2/P4 |

## Missing brand fonts

The three brand font files have not been supplied. The site uses system font fallbacks until the owner adds them. `src/styles/fonts.ts` centralizes the mapping; `TODO(confirm)` before wiring local font files because the final file names/weights may differ.

## Content confirmations

- `TODO(confirm)`: `--green-ink` is an accessible dark green derived for text and links.
- `TODO(confirm)`: WhatsApp number is the first listed company phone.
- `TODO(confirm)`: GCC and North Africa map group labels/coordinates and market statuses.
- `TODO(confirm)`: product photo dimensions/formats; no actual product images supplied.
- `TODO(confirm)`: product-specific fresh/frozen/dried forms and seasons in `src/content/products.ts`.
- `TODO(confirm)`: each listed market status and grouped-region pin in `src/content/countries.ts`.
- `TODO(confirm)`: approved Arabic address and WhatsApp number in `src/content/site.ts`.
- `TODO(content)`: product descriptions, seasons, farming, harvest, packing, and shipping copy in `src/content/products.ts`.
- `TODO(content)`: company story, vision, and mission copy in the localized message files.
- `TODO(confirm)`: certification status/details before presenting GlobalGAP, SMETA, or ISO as held certifications.
