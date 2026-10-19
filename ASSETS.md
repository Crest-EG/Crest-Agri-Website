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
| `public/frames/scene-{1..7}/{001..060}.jpg` | 1280×720 JPEG; 60 frames per scene, 420 total | Scroll journey canvas backgrounds; current visual sequence needs approval |
| `public/images/products/broccoli/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/cabbage/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/citrus/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/grapes/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/green-beans/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/green-onion/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/lettuce/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/peach/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/pomegranate/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/strawberry/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/products/sweet-potato/{1,2,3}.jpg` | 1280×853 JPEG | Product photography placeholders; not used while `images` is empty |
| `public/images/stitch-products/{citrus,grapes,green-beans,green-onion,pomegranate,strawberry}.jpg` | 1280×698 JPEG | Provisional Stitch product-card and detail photos |
| `public/images/stitch-about/orchard.jpg` | 1280×714 JPEG | Provisional About page orchard photo |
| `public/images/stitch-services/assurance.jpg` | 1280×698 JPEG | Provisional Services quality photo |
| `public/images/stitch-services/shipping.jpg` | 1280×698 JPEG | Provisional Services shipping photo |

## Missing brand fonts

The three brand font files have not been supplied. The site uses system font fallbacks until the owner adds them. `src/styles/fonts.ts` centralizes the mapping.

## Content replacement

The bilingual mock content and the exact owner, item and replacement action for each pending review are tracked in [CONTENT_TODO.md](CONTENT_TODO.md). The map's named destinations are presented as indicative areas for discussion and need the export team's confirmation. Certification descriptions are reference-only until scope and supporting documents are confirmed.

## Stitch source references

The source HTML, referenced images, and full-height preview images are stored under `stitch/crest-export-website/` by screen ID. The available references are:

- Landing: `7b360f04e7c449b082622925db2e1a86`, 1280×8192 PNG preview.
- Products: `92271d6075f54f85b0ca55cf65967575`, 1280×2385 JPEG preview.
- About: `c2dc21c6830d456494a9f22a992315ee`, 1280×2547 JPEG preview.
- Product detail: `324cd36efdba442aa0aa6314e12f28b8`, 1280×2595 JPEG preview.
- Services: `cbbe7654288b4ffab582cfb1660b9b97`, 1280×3389 JPEG preview.

The smaller `screenshot.png` or `screenshot-preview.jpg` files preserve original Stitch responses; `screenshot-full.png` / `screenshot-full.jpg` are larger previews. Image references from the Stitch HTML exports have local copies beside each export.

## Design-system differences

- Stitch introduces extra greens (`#006e15`, `#43a141`, `#8ffb86`) and dark olive surfaces. The implemented site keeps PLAN.md's Crest palette and uses the existing text token for dark contrast surfaces.
- Stitch uses Plus Jakarta Sans and Material Symbols. Those are not brand assets; no external fonts or icon packages were added. System font fallbacks and text glyphs are used until the brand fonts are supplied.
