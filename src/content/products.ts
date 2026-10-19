export type ProductForm = "fresh" | "frozen" | "dried";
export type ProductType = "fruit" | "vegetable";
export type BilingualText = { en: string; ar: string };

export type Product = {
  slug: string;
  name: BilingualText;
  type: ProductType;
  forms: ProductForm[];
  season: BilingualText;
  summary: BilingualText;
  farming: BilingualText;
  harvest: BilingualText;
  packing: BilingualText;
  shipping: BilingualText;
  images: string[];
  featured: boolean;
};

const contentTodo = (en: string, ar: string): BilingualText => ({ en, ar });
const seasonTodo = contentTodo("Season details to be confirmed.", "سيُحدد الموسم لاحقاً.");
const farmingTodo = contentTodo("TODO(content): Add approved farming information.", "TODO(content): أضف معلومات الزراعة المعتمدة.");
const harvestTodo = contentTodo("TODO(content): Add approved harvest information.", "TODO(content): أضف معلومات الحصاد المعتمدة.");
const packingTodo = contentTodo("TODO(content): Add approved packing information.", "TODO(content): أضف معلومات التعبئة المعتمدة.");
const shippingTodo = contentTodo("TODO(content): Add approved shipping information.", "TODO(content): أضف معلومات الشحن المعتمدة.");
const stitchProductImages: Record<string, string> = {
  citrus: "/images/stitch-products/citrus.jpg",
  grapes: "/images/stitch-products/grapes.jpg",
  "green-beans": "/images/stitch-products/green-beans.jpg",
  "green-onion": "/images/stitch-products/green-onion.jpg",
  pomegranate: "/images/stitch-products/pomegranate.jpg",
  strawberry: "/images/stitch-products/strawberry.jpg",
};

function product(
  slug: string,
  en: string,
  ar: string,
  type: ProductType,
  forms: ProductForm[],
  summaryEn: string,
  summaryAr: string,
  featured = false,
): Product {
  return {
    slug,
    name: { en, ar },
    type,
    forms,
    season: seasonTodo,
    summary: { en: summaryEn, ar: summaryAr },
    farming: farmingTodo,
    harvest: harvestTodo,
    packing: packingTodo,
    shipping: shippingTodo,
    // TODO(confirm): Stitch supplied these provisional reference photos; replace them with approved photography.
    images: stitchProductImages[slug] ? [stitchProductImages[slug]] : [],
    featured,
  };
}

// TODO(confirm): validate product forms and seasons with the export team before publication.
export const products: Product[] = [
  product("grapes", "Grapes", "عنب", "fruit", ["fresh"], "TODO(content): Add the approved grapes description.", "TODO(content): أضف وصف العنب المعتمد.", true),
  product("pomegranate", "Pomegranate", "رمان", "fruit", ["fresh", "frozen", "dried"], "TODO(content): Add the approved pomegranate description.", "TODO(content): أضف وصف الرمان المعتمد.", true),
  product("peach", "Peach", "خوخ", "fruit", ["fresh", "frozen"], "TODO(content): Add the approved peach description.", "TODO(content): أضف وصف الخوخ المعتمد.", true),
  product("green-onion", "Green onion", "بصل أخضر", "vegetable", ["fresh"], "TODO(content): Add the approved green onion description.", "TODO(content): أضف وصف البصل الأخضر المعتمد.", true),
  product("cabbage", "Cabbage", "كرنب", "vegetable", ["fresh", "frozen"], "TODO(content): Add the approved cabbage description.", "TODO(content): أضف وصف الكرنب المعتمد."),
  product("broccoli", "Broccoli", "بروكلي", "vegetable", ["fresh", "frozen"], "TODO(content): Add the approved broccoli description.", "TODO(content): أضف وصف البروكلي المعتمد.", true),
  product("citrus", "Citrus", "موالح", "fruit", ["fresh"], "TODO(content): Add the approved citrus description.", "TODO(content): أضف وصف الموالح المعتمد."),
  product("strawberry", "Strawberry", "فراولة", "fruit", ["fresh", "frozen"], "TODO(content): Add the approved strawberry description.", "TODO(content): أضف وصف الفراولة المعتمد.", true),
  product("green-beans", "Green beans", "فاصوليا خضراء", "vegetable", ["fresh", "frozen"], "TODO(content): Add the approved green beans description.", "TODO(content): أضف وصف الفاصوليا الخضراء المعتمد."),
  product("sweet-potato", "Sweet potato", "بطاطا حلوة", "vegetable", ["fresh", "frozen"], "TODO(content): Add the approved sweet potato description.", "TODO(content): أضف وصف البطاطا الحلوة المعتمد."),
  product("lettuce", "Lettuce", "خس", "vegetable", ["fresh"], "TODO(content): Add the approved lettuce description.", "TODO(content): أضف وصف الخس المعتمد."),
];

export const featuredProducts = products.filter((item) => item.featured);
export const getProductBySlug = (slug: string) => products.find((item) => item.slug === slug);
