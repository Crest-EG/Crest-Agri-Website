# Replaceable assets

Product imagery supplied for the fresh, frozen and dried ranges is installed under stable slug-based paths. The normalized files below are the images used by product pages, cards, and social metadata.

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
| `brand/fonts/Montserrat-Arabic-Regular.woff2` | Regular WOFF2 font | Arabic and English site font via `next/font/local` |
| `public/frames/scene-{1..5}/{001..150}.webp` | 1280×720 WebP; 150 frames per scene, 750 total | Scroll journey canvas backgrounds in landing order; scene 1 uses the supplied `Crest agri.mp4` video |
| `public/images/products/grapes/1.webp` | 1024×683 WebP | Grapes product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/pomegranate/1.webp` | 600×600 WebP | Pomegranate product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/peach/1.webp` | 259×195 WebP | Peach product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/green-onion/1.webp` | 600×300 WebP | Green onion product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/cabbage/1.webp` | 600×600 WebP | Cabbage product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/broccoli/1.webp` | 1000×1000 WebP | Broccoli product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/citrus/1.webp` | 1000×809 WebP | Citrus product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/strawberry/1.webp` | 225×225 WebP | Fresh strawberry product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/green-beans/1.webp` | 1700×1045 WebP | Fresh green beans product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/sweet-potato/1.webp` | 700×600 WebP | Sweet potato product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/lettuce/1.webp` | 480×480 WebP | Lettuce product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/garlic/1.webp` | 600×600 WebP | Fresh garlic product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/dried-tomato/1.webp` | 600×600 WebP | Dried tomato product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/frozen-peas/1.webp` | 600×600 WebP | Frozen peas product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/mango/1.webp` | 1000×1000 WebP | Frozen mango product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/banana/1.webp` | 600×600 WebP | Banana product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/frozen-pomegranate/1.webp` | 600×600 WebP | Frozen pomegranate product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/frozen-guava/1.webp` | 383×309 WebP | Frozen guava product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/frozen-green-beans/1.webp` | 517×386 WebP | Frozen green beans product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/frozen-artichokes/1.webp` | 600×600 WebP | Frozen artichokes product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/dried-jalapeno-peppers/1.webp` | 600×600 WebP | Dried jalapeno peppers product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/dried-dates/1.webp` | 600×600 WebP | Dried dates product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/onion/1.webp` | 600×600 WebP | Onion product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/cucumber/1.webp` | 600×600 WebP | Cucumber product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/carrots/1.webp` | 600×600 WebP | Carrots product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/frozen-strawberry/1.webp` | 600×600 WebP | Frozen strawberry product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/dried-garlic/1.webp` | 600×600 WebP | Dried garlic product card, detail image, Open Graph and Product JSON-LD |
| `public/images/products/frozen-broccoli/1.webp` | 600×600 WebP | Frozen broccoli product card, detail image, Open Graph and Product JSON-LD |
| `public/images/stitch-about/orchard.jpg` | 1280×714 JPEG | Provisional About page orchard photo |
| `public/images/stitch-services/assurance.jpg` | 1280×698 JPEG | Provisional Services quality photo |
| `public/images/stitch-services/shipping.jpg` | 1280×698 JPEG | Provisional Services shipping photo |
| `public/images/footer/forest-landscape.webp` | 1472×828 WebP | User-provided forest photo, tinted as the full footer background beneath the content; replace with an equally wide or higher-resolution crop for the sharpest desktop display |

## Landing hero scene

The first screen is the registered ThreeUI `inner-green-3d` scene. The
localized Crest edition is generated from its authored source:

| Path | Format and use | Source / note |
|---|---|---|
| `src/components/sylva-hero/source/inner-green-3d.html` | 197,914-byte HTML; exact registered source | Build input only. The Crest page is generated in memory by `src/components/sylva-hero/sylvaDocument.ts`. |
| `public/landing-pages/inner-green-assets/three.min.js` | Exact bundled Three.js runtime | Required by the authored scene; do not replace with a different build. |
| `public/landing-pages/inner-green-assets/lexend-latin.woff2` | Variable WOFF2, Latin subset | Preserved by the authored source; the generated frame embeds the local site font. |
| `src/shaders/fonts/fragment-mono.woff2` | WOFF2 | Required by the shared ThreeUI stylesheet (`threeui.css`). |
| `public/landing-pages/inner-green-assets/card-ethos.jpg` | 1200×800 JPEG | Original art referenced in the source and replaced in the Crest edition. |
| `public/landing-pages/inner-green-assets/card-ecostove.jpg` | 1200×600 JPEG | Original art referenced in the source and replaced in the Crest edition. |

The tree is a procedural Three.js composition rather than a replaceable
photograph. The generated Crest page uses the first two featured product images
for its cards; those photos are listed in the product photography rows above.


## Font

The site uses `Montserrat-Arabic-Regular.woff2` for both languages, with an
Arial system fallback.
`src/styles/fonts.ts` centralizes the local font mapping.

## Content replacement

The bilingual mock content and the exact owner, item and replacement action for each pending review are tracked in [CONTENT_TODO.md](CONTENT_TODO.md). The map's named destinations are presented as indicative areas for discussion and need the export team's confirmation. Certification descriptions are reference-only until scope and supporting documents are confirmed.

Product technical sheets open as external Google Drive links configured by product slug in `src/content/products.ts`. For initial review, every product temporarily points to the company brochure Drive URL. `TODO(confirm)`: replace each temporary URL with the approved technical-sheet link for that product.

The map in `src/config/redirects.ts` covers the old product sitemap and the numeric products verified from the old pages. Review it against the owner's final WordPress export before launch and add any unlisted routes.


The smaller `screenshot.png` or `screenshot-preview.jpg` files preserve original Stitch responses; `screenshot-full.png` / `screenshot-full.jpg` are larger previews. Image references from the Stitch HTML exports have local copies beside each export.

## Design-system differences

- Stitch introduces extra greens (`#006e15`, `#43a141`, `#8ffb86`) and dark olive surfaces. The implemented site keeps PLAN.md's Crest palette and uses the existing text token for dark contrast surfaces.
- Stitch uses Plus Jakarta Sans and Material Symbols. Those are not brand assets; no external fonts or icon packages were added. System font fallbacks and text glyphs are used until the brand fonts are supplied.
