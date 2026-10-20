export type ProductForm = "fresh" | "frozen" | "dried";
export type ProductType = "fruit" | "vegetable";
export type BilingualText = { en: string; ar: string };

export type Product = {
  slug: string;
  name: BilingualText;
  type: ProductType;
  forms: ProductForm[];
  season: BilingualText;
  seasonWindows: Array<{ start: { month: number; day: number }; end: { month: number; day: number } }>;
  summary: BilingualText;
  farming: BilingualText;
  harvest: BilingualText;
  packing: BilingualText;
  shipping: BilingualText;
  images: string[];
  featured: boolean;
};

// TODO(replace): Shared bilingual farming, harvest, packing and shipping copy | Crest export team | Confirm actual sourcing, handling and export practices, then update these shared fields.
const common = {
  farming: { en: "We coordinate product specifications and sourcing with the buyer before a programme is confirmed.", ar: "ننسق مواصفات المنتج ومصادره مع المشتري قبل تأكيد برنامج التوريد." },
  harvest: { en: "Harvest timing and maturity requirements are agreed for the selected product and destination.", ar: "يُتفق على موعد الحصاد ودرجة النضج وفق المنتج والوجهة المحددين." },
  packing: { en: "Depending on the product, options may include export cartons, crates, bulk formats or IQF bags. Final specifications are agreed per enquiry.", ar: "قد تشمل الخيارات، بحسب المنتج، كراتين تصدير أو صناديق أو عبوات سائبة أو أكياس IQF. وتُحدد المواصفات النهائية لكل استفسار." },
  shipping: { en: "Handling, temperature requirements and shipping options are discussed against the product, destination and requested schedule.", ar: "تُناقش متطلبات التداول ودرجات الحرارة وخيارات الشحن بحسب المنتج والوجهة والموعد المطلوب." },
} satisfies Record<string, BilingualText>;

type ProductSeed = Omit<Product, "images" | "farming" | "harvest" | "packing" | "shipping">;
const seed = (item: ProductSeed): Product => ({ ...item, ...common, images: stitchProductImages[item.slug] ? [stitchProductImages[item.slug]] : [] });
const stitchProductImages: Record<string, string> = {
  // TODO(replace): Citrus product photograph | Crest creative team | Replace public/images/stitch-products/citrus.jpg with approved product photography at the same path.
  citrus: "/images/stitch-products/citrus.jpg",
  // TODO(replace): Grape product photograph | Crest creative team | Replace public/images/stitch-products/grapes.jpg with approved product photography at the same path.
  grapes: "/images/stitch-products/grapes.jpg",
  // TODO(replace): Green bean product photograph | Crest creative team | Replace public/images/stitch-products/green-beans.jpg with approved product photography at the same path.
  "green-beans": "/images/stitch-products/green-beans.jpg",
  // TODO(replace): Green onion product photograph | Crest creative team | Replace public/images/stitch-products/green-onion.jpg with approved product photography at the same path.
  "green-onion": "/images/stitch-products/green-onion.jpg",
  // TODO(replace): Pomegranate product photograph | Crest creative team | Replace public/images/stitch-products/pomegranate.jpg with approved product photography at the same path.
  pomegranate: "/images/stitch-products/pomegranate.jpg",
  // TODO(replace): Strawberry product photograph | Crest creative team | Replace public/images/stitch-products/strawberry.jpg with approved product photography at the same path.
  strawberry: "/images/stitch-products/strawberry.jpg",
};
// TODO(replace): Broccoli, cabbage, peach, sweet potato and lettuce product photography | Crest creative team | Add approved images to public/images/stitch-products/ and add each path to the image map above.

export const products: Product[] = [
  // TODO(replace): Egyptian grape season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "grapes", name: { en: "Grapes", ar: "عنب" }, type: "fruit", forms: ["fresh"], season: { en: "Typically late spring through summer; timing varies by variety and growing area.", ar: "عادةً من أواخر الربيع حتى الصيف؛ ويختلف التوقيت باختلاف الصنف ومنطقة الزراعة." }, seasonWindows: [{ start: { month: 5, day: 1 }, end: { month: 8, day: 31 } }], summary: { en: "Egyptian table grapes selected for fresh-market programmes, with variety, sizing and pack details agreed for each destination.", ar: "عنب مائدة مصري لبرامج السوق الطازج، مع الاتفاق على الصنف والأحجام والتعبئة وفق كل وجهة." }, featured: true }),
  // TODO(replace): Egyptian pomegranate season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "pomegranate", name: { en: "Pomegranate", ar: "رمان" }, type: "fruit", forms: ["fresh", "frozen", "dried"], season: { en: "Fresh fruit is typically available from late summer into autumn; processed forms depend on the programme.", ar: "يتوفر الرمان الطازج عادةً من أواخر الصيف حتى الخريف؛ وتتحدد الأشكال المصنعة وفق برنامج التوريد." }, seasonWindows: [{ start: { month: 8, day: 1 }, end: { month: 11, day: 30 } }], summary: { en: "A versatile fruit for fresh retail, food service and ingredient use, with processing options discussed to suit the brief.", ar: "فاكهة متعددة الاستخدامات للبيع الطازج وخدمات الطعام والمكونات، مع مناقشة خيارات التصنيع وفق متطلبات المشتري." }, featured: true }),
  // TODO(replace): Egyptian peach season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "peach", name: { en: "Peach", ar: "خوخ" }, type: "fruit", forms: ["fresh", "frozen"], season: { en: "Typically a late-spring and summer crop; availability varies by variety and year.", ar: "يكون موسمه عادةً في أواخر الربيع والصيف؛ ويتغير التوفر بحسب الصنف والسنة." }, seasonWindows: [{ start: { month: 5, day: 1 }, end: { month: 8, day: 31 } }], summary: { en: "Fresh peaches for seasonal retail programmes, with frozen formats considered when suitable for the buyer’s application.", ar: "خوخ طازج لبرامج البيع الموسمية، مع بحث الأشكال المجمدة عندما تلائم استخدام المشتري." }, featured: true }),
  // TODO(replace): Egyptian green onion season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "green-onion", name: { en: "Green onion", ar: "بصل أخضر" }, type: "vegetable", forms: ["fresh"], season: { en: "Typically available through the cooler growing months; confirm the current programme with our team.", ar: "يتوفر عادةً خلال أشهر الزراعة الأكثر اعتدالاً؛ يرجى تأكيد البرنامج الحالي مع فريقنا." }, seasonWindows: [{ start: { month: 10, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Fresh green onions prepared for food-service and retail requirements, with grading and bunch or carton presentation agreed to order.", ar: "بصل أخضر طازج يُجهز لمتطلبات خدمات الطعام والبيع بالتجزئة، مع الاتفاق على الفرز والتقديم في ربطات أو كراتين حسب الطلب." }, featured: true }),
  // TODO(replace): Egyptian cabbage season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "cabbage", name: { en: "Cabbage", ar: "كرنب" }, type: "vegetable", forms: ["fresh", "frozen"], season: { en: "Typically a cool-season crop, with fresh availability concentrated in autumn and winter.", ar: "يُزرع عادةً كمحصول للأجواء المعتدلة، ويتركز توفره الطازج في الخريف والشتاء." }, seasonWindows: [{ start: { month: 10, day: 1 }, end: { month: 3, day: 31 } }], summary: { en: "Cabbage for fresh-market and processing uses, with form, cut and packing requirements reviewed for each enquiry.", ar: "كرنب للاستخدام الطازج والتصنيع، مع مراجعة الشكل والتقطيع ومتطلبات التعبئة لكل استفسار." }, featured: false }),
  // TODO(replace): Egyptian broccoli season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "broccoli", name: { en: "Broccoli", ar: "بروكلي" }, type: "vegetable", forms: ["fresh", "frozen"], season: { en: "Typically a cool-season crop, with fresh supply strongest through the cooler months.", ar: "يُزرع عادةً في الموسم المعتدل، ويكون توفره الطازج أفضل خلال الأشهر الأبرد." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Broccoli for fresh and frozen applications, with head grading or processing specifications discussed against the buyer’s needs.", ar: "بروكلي للاستخدام الطازج والمجمد، مع مناقشة فرز الرؤوس أو مواصفات التصنيع بحسب احتياجات المشتري." }, featured: true }),
  // TODO(replace): Egyptian citrus season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "citrus", name: { en: "Citrus", ar: "موالح" }, type: "fruit", forms: ["fresh"], season: { en: "Typically spans late autumn through spring, depending on citrus type and variety.", ar: "يمتد عادةً من أواخر الخريف حتى الربيع، بحسب نوع الموالح والصنف." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Egyptian citrus for fresh export programmes, with fruit type, size range, treatment and pack format agreed by destination.", ar: "موالح مصرية لبرامج التصدير الطازج، مع تحديد نوع الثمار والأحجام والمعاملة والتعبئة وفق الوجهة." }, featured: false }),
  // TODO(replace): Egyptian strawberry season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "strawberry", name: { en: "Strawberry", ar: "فراولة" }, type: "fruit", forms: ["fresh", "frozen"], season: { en: "Fresh harvest is typically from late autumn through spring; frozen availability depends on the processing programme.", ar: "يمتد موسم الفراولة الطازجة عادةً من أواخر الخريف حتى الربيع؛ ويتوقف توفر المجمد على برنامج التصنيع." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Egyptian strawberries for fresh retail or frozen ingredient use, with grade, preparation and packaging tailored to the intended market.", ar: "فراولة مصرية للبيع الطازج أو للاستخدام كمكون مجمد، مع مواءمة الفرز والتجهيز والتعبئة للسوق المستهدف." }, featured: true }),
  // TODO(replace): Egyptian green bean season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "green-beans", name: { en: "Green beans", ar: "فاصوليا خضراء" }, type: "vegetable", forms: ["fresh", "frozen"], season: { en: "Fresh windows typically include autumn and spring; frozen formats depend on the processing programme.", ar: "تشمل فترات التوفر الطازج عادةً الخريف والربيع؛ وتتحدد الأشكال المجمدة وفق برنامج التصنيع." }, seasonWindows: [{ start: { month: 3, day: 1 }, end: { month: 5, day: 31 } }, { start: { month: 9, day: 1 }, end: { month: 11, day: 30 } }], summary: { en: "Green beans prepared for fresh or frozen supply, with whole, trimmed or cut specifications discussed for the end use.", ar: "فاصوليا خضراء للتوريد الطازج أو المجمد، مع مناقشة مواصفات الحبات الكاملة أو المشذبة أو المقطعة وفق الاستخدام." }, featured: false }),
  // TODO(replace): Egyptian sweet potato season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "sweet-potato", name: { en: "Sweet potato", ar: "بطاطا حلوة" }, type: "vegetable", forms: ["fresh", "frozen"], season: { en: "Typically harvested from late summer into autumn, with availability depending on curing and storage needs.", ar: "يُحصد عادةً من أواخر الصيف حتى الخريف، ويتوقف التوفر على احتياجات المعالجة والتخزين." }, seasonWindows: [{ start: { month: 8, day: 1 }, end: { month: 11, day: 30 } }], summary: { en: "Sweet potatoes for retail, food service and processing, with variety, size and preparation requirements aligned to the buyer’s market.", ar: "بطاطا حلوة للبيع بالتجزئة وخدمات الطعام والتصنيع، مع مواءمة الصنف والحجم والتجهيز مع سوق المشتري." }, featured: false }),
  // TODO(replace): Egyptian lettuce season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "lettuce", name: { en: "Lettuce", ar: "خس" }, type: "vegetable", forms: ["fresh"], season: { en: "Typically a cool-season crop, with fresh availability varying by type and growing conditions.", ar: "يُزرع عادةً في الموسم المعتدل، ويتغير توفره الطازج بحسب النوع وظروف الزراعة." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Fresh lettuce for wholesale, food-service and retail programmes, with type, trim and packaging agreed to specification.", ar: "خس طازج لبرامج الجملة وخدمات الطعام والبيع بالتجزئة، مع الاتفاق على النوع والتشذيب والتعبئة وفق المواصفات." }, featured: false }),
];

export const featuredProducts = products.filter((item) => item.featured);
export const getProductBySlug = (slug: string) => products.find((item) => item.slug === slug);
