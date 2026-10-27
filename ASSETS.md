# Replaceable assets

All image placeholders are usable today. Replace them with files at the same paths so code does not need changes.

| Path / pattern | Required size and format | Used for |
|---|---|---|
| `brand/logo/logo.svg` | Horizontal vector, 300×72 viewBox | Header and footer via `<Logo variant="full" />` |
| `brand/logo/logo-white.svg` | Horizontal vector, 300×72 viewBox; wordmark lettering in white, mark colors unchanged | `<Logo variant="full" tone="white" />` — footer and the landing header over dark scenes. Regenerate from `logo.svg` whenever the main logo changes (recolor its `#231F20` wordmark to `#FFFFFF`) |
| `brand/logo/mark.svg` | Square vector, 128×128 viewBox | Compact logo and derived app icons |
| `brand/logo/logo-512.png` | 512×512 PNG | High-resolution brand mark |
| `public/icons/icon-192.png` | 192×192 PNG | PWA icon |
| `public/icons/icon-512.png` | 512×512 PNG | PWA icon |
| `public/icons/icon-maskable-512.png` | 512×512 PNG; artwork within centered 80% safe zone | Maskable PWA icon |
| `src/app/icon.png` | 512×512 PNG | Browser tab icon |
| `src/app/apple-icon.png` | 180×180 PNG | Apple touch icon |
| `src/app/opengraph-image.png` | 1200×630 PNG | Social preview; keep logo within the image safe area |
| `brand/fonts/Montserrat-Arabic-Regular.woff2` | Supplied WOFF2 font | Shared English and Arabic site font via `next/font/local` |
| `public/frames/scene-{1..7}/{001..120}.webp` | 1280×720 WebP, quality 75; 120 frames per scene, 840 total | Scroll journey canvas backgrounds |
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

## Landing hero scene

The first screen is the registered ThreeUI `inner-green-3d` scene. Its authored
source and runtime are exact copies and are not placeholders to redesign:

| Path | Format and use | Source / note |
|---|---|---|
| `src/components/sylva-hero/source/inner-green-3d.html` | 197,914-byte HTML; exact registered source | Build input only. It stays outside `public/` so the unmodified Sylva-branded page is not served. Do not edit; the Crest edition is generated in memory by `src/components/sylva-hero/sylvaDocument.ts`. |
| `public/landing-pages/inner-green-assets/three.min.js` | Exact bundled Three.js runtime | Required by the authored scene; do not replace with a different build. |
| `public/landing-pages/inner-green-assets/lexend-latin.woff2` | Variable WOFF2, Latin subset | Authored scene font. Inlined into the sandboxed `srcDoc` at build time because the frame has an opaque origin. Keep the file at this path. |
| `src/shaders/fonts/fragment-mono.woff2` | WOFF2 | Required by the shared ThreeUI stylesheet (`threeui.css`), not by the hero copy. |
| `public/landing-pages/inner-green-assets/card-ethos.jpg` | 1200×800 JPEG | Original Sylva card art. Still referenced by the exact source, but replaced by Crest product photos in the generated edition. |
| `public/landing-pages/inner-green-assets/card-ecostove.jpg` | 1200×600 JPEG | Original Sylva card art. Still referenced by the exact source, but replaced by Crest product photos in the generated edition. |

The “tree” in the hero is **not an image**. It is a procedural Three.js
composition: authored branch/fern/flower geometry, custom moss and haze shaders,
GPU pollen, a butterfly, scan-reveal timing, and pointer parallax. There is no
single replaceable bitmap, so a fruit photograph cannot be substituted without
rebuilding the scene and losing its depth, lighting and motion. Fruit appears
instead in the two floating product cards:

- `public/images/stitch-products/grapes.jpg` (1280×698 JPEG)
- `public/images/stitch-products/pomegranate.jpg` (1280×698 JPEG)

Both are already tracked in the replaceable product-photography rows above.

The hero's visible copy lives in `landing.sylva` in both message files. The
scene fonts are kept for visual fidelity inside the sandboxed frame; the rest of
the site continues to use the brand font from `brand/fonts/`. TODO(confirm):
owner approval to keep the authored Lexend type in the hero frame, or to switch
the hero copy to the Crest brand font.


## Font

The supplied `Montserrat-Arabic-Regular.woff2` file is used for both locales with an Arial system fallback. `src/styles/fonts.ts` centralizes the local font mapping.

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

## Certification page marks

| Path | Format and use | Source / note |
|---|---|---|
| `public/images/certifications/globalgap.webp` | 625×625 WebP, quality 88; certification page | Optimized from [LSQA Middle East’s GLOBALG.A.P. asset](https://lsqame.com/wp-content/uploads/2022/12/GG.png). Confirm current mark and permitted use before publication; GLOBALG.A.P. says logo use may require prior approval. |
| `public/images/certifications/grasp.webp` | 625×625 WebP, quality 88; certification page | Optimized from [LSQA Middle East’s GRASP asset](https://lsqame.com/wp-content/uploads/2022/12/GRASP.png). Confirm current mark and permitted use before publication. |
| `public/images/certifications/smeta.webp` | 420×160 WebP, quality 90; certification page | Optimized from the owner-provided reference screenshot. SMETA is an audit methodology, not a certification. |
| `public/images/certifications/iso.webp` | 365×335 WebP, quality 90; certification page | Optimized from the owner-provided reference screenshot. Confirm current certification mark and validity before publication. |

`src/app/[locale]/privacy/page.tsx` and `src/app/[locale]/terms/page.tsx` include `TODO(confirm)` legal review notes. The inquiry workflow description reflects the existing optional Google Apps Script / Google Sheets forwarding route.
