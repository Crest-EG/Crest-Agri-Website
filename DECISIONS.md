# Implementation decisions

- Product detail URLs use lowercase descriptive slugs and distinct fresh, frozen, or dried records so product form is explicit without relying on numeric IDs.
- The legacy numeric pages map to frozen strawberry (`2659`), frozen mango (`2887`), and dried garlic (`2678`) based on each old page's title and product copy.
- Supplied category photos are copied to stable `/images/products/<slug>/1.webp` paths and used by catalog cards, product detail pages, Open Graph metadata, and the landing gallery.
- Product summaries, seasons, and packing stay conditional and enquiry-led because confirmed supply, sizes, and packaging terms were not provided.
- Products filters are represented by `?form=` and applied in the server page so the URL, selected chip, and rendered product list stay aligned.
- Legacy routes redirect directly to localized final pages; unknown old product slugs go to the products listing rather than an invented product detail.
- Existing standalone About, Certifications, Privacy, and Terms routes retain their page layout; the generic Terms text is marked for legal review.
