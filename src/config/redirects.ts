type PermanentRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
};

const englishProductRedirects: Record<string, string> = {
  peach: "orange",
  garlic: "orange",
  lettuce: "orange",
  "dried-tomato": "orange",
  citrus: "orange",
  strawberry: "strawberry",
  "green-beans": "green-beans",
  "sweet-potatoes": "sweet-potato",
  "spring-onion": "green-beans",
  "frozen-peas": "peas",
  "2659": "frozen-strawberry",
  "2887": "mango",
  "2678": "orange",
  "broccoli-2": "broccoli",
  graps: "orange",
  broccoli: "broccoli",
  "fresh-banana": "orange",
};

export const productRedirectMap: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(englishProductRedirects).map(([legacySlug, slug]) => [
      `/product/${legacySlug}`,
      `/en/products/${slug}`,
    ]),
  ),
  "/ar/المنتجات/الثوم": "/ar/products/orange",
  "/ar/المنتجات/الخس": "/ar/products/orange",
  "/ar/المنتجات/الخوخ": "/ar/products/orange",
  "/ar/المنتجات/الموالح": "/ar/products/orange",
  "/ar/المنتجات/الفراولة": "/ar/products/strawberry",
  "/ar/المنتجات/البصل-الأخضر": "/ar/products/green-beans",
  "/ar/المنتجات/البطاطا-الحلوة": "/ar/products/sweet-potato",
  "/ar/المنتجات/الفول-الأخضر": "/ar/products/green-beans",
  "/ar/المنتجات/بازلاء-مجمدة": "/ar/products/peas",
  "/ar/المنتجات/الثوم-2": "/ar/products/orange",
  "/ar/المنتجات/بروكلي": "/ar/products/broccoli",
  "/ar/المنتجات/مانجو-2": "/ar/products/mango",
  "/ar/المنتجات/طماطم-مجففة": "/ar/products/orange",
  "/ar/المنتجات/العنب": "/ar/products/orange",
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
  "/group/dried": "/en/products",
  "/product-category/fresh": "/en/products?form=fresh",
  "/product-category/frozen": "/en/products?form=frozen",
  "/product-category/dried": "/en/products",
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
