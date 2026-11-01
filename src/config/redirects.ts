type PermanentRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
};

const englishProductRedirects: Record<string, string> = {
  peach: "peach",
  garlic: "garlic",
  lettuce: "lettuce",
  "dried-tomato": "dried-tomato",
  citrus: "citrus",
  strawberry: "strawberry",
  "green-beans": "green-beans",
  "sweet-potatoes": "sweet-potato",
  "spring-onion": "green-onion",
  "frozen-peas": "frozen-peas",
  "2659": "frozen-strawberry",
  "2887": "mango",
  "2678": "dried-garlic",
  "broccoli-2": "frozen-broccoli",
  graps: "grapes",
  broccoli: "broccoli",
  "fresh-banana": "banana",
};

export const productRedirectMap: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(englishProductRedirects).map(([legacySlug, slug]) => [
      `/product/${legacySlug}`,
      `/en/products/${slug}`,
    ]),
  ),
  "/ar/المنتجات/الثوم": "/ar/products/garlic",
  "/ar/المنتجات/الخس": "/ar/products/lettuce",
  "/ar/المنتجات/الخوخ": "/ar/products/peach",
  "/ar/المنتجات/الموالح": "/ar/products/citrus",
  "/ar/المنتجات/الفراولة": "/ar/products/strawberry",
  "/ar/المنتجات/البصل-الأخضر": "/ar/products/green-onion",
  "/ar/المنتجات/البطاطا-الحلوة": "/ar/products/sweet-potato",
  "/ar/المنتجات/الفول-الأخضر": "/ar/products/green-beans",
  "/ar/المنتجات/بازلاء-مجمدة": "/ar/products/frozen-peas",
  "/ar/المنتجات/الثوم-2": "/ar/products/dried-garlic",
  "/ar/المنتجات/بروكلي": "/ar/products/broccoli",
  "/ar/المنتجات/مانجو-2": "/ar/products/mango",
  "/ar/المنتجات/طماطم-مجففة": "/ar/products/dried-tomato",
  "/ar/المنتجات/العنب": "/ar/products/grapes",
  "/ar/المنتجات/البروكلي": "/ar/products/broccoli",
};

const pageRedirectMap: Record<string, string> = {
  "/products": "/en/products",
  "/about": "/en/about",
  "/about-us": "/en/about",
  "/contact": "/en/contact",
  "/contact-us": "/en/contact",
  "/quality-certificates": "/en/certifications",
  "/group/fresh": "/en/products?form=fresh",
  "/group/frozen": "/en/products?form=frozen",
  "/group/dried": "/en/products?form=dried",
  "/product-category/fresh": "/en/products?form=fresh",
  "/product-category/frozen": "/en/products?form=frozen",
  "/product-category/dried": "/en/products?form=dried",
};

export function buildRedirects(): PermanentRedirect[] {
  const mappedRedirects = Object.entries({ ...productRedirectMap, ...pageRedirectMap })
    .flatMap(([source, destination]) => {
      const path = source.endsWith("/") ? source.slice(0, -1) : source;
      return [path, `${path}/`].map((sourcePath) => ({
        source: sourcePath,
        destination,
        statusCode: 301 as const,
      }));
    });

  return [
    ...mappedRedirects,
    {
      source: "/product/:slug",
      destination: "/en/products",
      statusCode: 301,
    },
    {
      source: "/ar/المنتجات/:slug",
      destination: "/ar/products",
      statusCode: 301,
    },
  ];
}
