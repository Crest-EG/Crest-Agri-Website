import { site } from "@/content/site";

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
  technicalSheetUrl: string;
  featured: boolean;
};

// TODO(replace): Shared bilingual farming, harvest, packing and shipping copy | Crest export team | Confirm actual sourcing, handling and export practices, then update these shared fields.
const common = {
  farming: { en: "We coordinate product specifications and sourcing with the buyer before a programme is confirmed.", ar: "ننسق مواصفات المنتج ومصادره مع المشتري قبل تأكيد برنامج التوريد." },
  harvest: { en: "Harvest timing and maturity requirements are agreed for the selected product and destination.", ar: "يُتفق على موعد الحصاد ودرجة النضج وفق المنتج والوجهة المحددين." },
  packing: { en: "Depending on the product, options may include export cartons, crates, bulk formats or IQF bags. Final specifications are agreed per enquiry.", ar: "قد تشمل الخيارات، بحسب المنتج، كراتين تصدير أو صناديق أو عبوات سائبة أو أكياس IQF. وتُحدد المواصفات النهائية لكل استفسار." },
  shipping: { en: "Handling, temperature requirements and shipping options are discussed against the product, destination and requested schedule.", ar: "تُناقش متطلبات التداول ودرجات الحرارة وخيارات الشحن بحسب المنتج والوجهة والموعد المطلوب." },
} satisfies Record<string, BilingualText>;

type ProductSeed = Omit<Product, "images" | "technicalSheetUrl" | "farming" | "harvest" | "packing" | "shipping"> & {
  packing?: BilingualText;
};
const seed = (item: ProductSeed): Product => ({
  ...common,
  ...item,
  packing: item.packing ?? common.packing,
  images: [`/images/products/${item.slug}/1.webp`],
  technicalSheetUrl: technicalSheetUrls[item.slug] ?? site.brochureUrl,
});
// TODO(confirm): Replace each temporary brochure URL with the approved
// Google Drive technical-sheet URL for that product.
const technicalSheetUrls: Record<string, string> = {
  grapes: site.brochureUrl,
  pomegranate: site.brochureUrl,
  peach: site.brochureUrl,
  "green-onion": site.brochureUrl,
  cabbage: site.brochureUrl,
  broccoli: site.brochureUrl,
  citrus: site.brochureUrl,
  strawberry: site.brochureUrl,
  "green-beans": site.brochureUrl,
  "sweet-potato": site.brochureUrl,
  lettuce: site.brochureUrl,
};
export const products: Product[] = [
  // TODO(replace): Egyptian grape season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "grapes", name: { en: "Grapes", ar: "عنب" }, type: "fruit", forms: ["fresh"], season: { en: "Typically late spring through summer; timing varies by variety and growing area.", ar: "عادةً من أواخر الربيع حتى الصيف؛ ويختلف التوقيت باختلاف الصنف ومنطقة الزراعة." }, seasonWindows: [{ start: { month: 5, day: 1 }, end: { month: 8, day: 31 } }], summary: { en: "Egyptian table grapes selected for fresh-market programmes, with variety, sizing and pack details agreed for each destination.", ar: "عنب مائدة مصري لبرامج السوق الطازج، مع الاتفاق على الصنف والأحجام والتعبئة وفق كل وجهة." }, featured: true }),
  // TODO(replace): Egyptian pomegranate season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "pomegranate", name: { en: "Pomegranate", ar: "رمان" }, type: "fruit", forms: ["fresh"], season: { en: "Fresh supply is seasonal; timing and availability depend on variety and growing area.", ar: "يتسم توفر الرمان الطازج بالموسمية؛ ويتوقف التوقيت والتوفر على الصنف ومنطقة الزراعة." }, seasonWindows: [{ start: { month: 8, day: 1 }, end: { month: 11, day: 30 } }], summary: { en: "Egyptian pomegranates for fresh-market programmes, with grade, sizing and packing requirements discussed for each destination.", ar: "رمان مصري لبرامج السوق الطازج، مع مناقشة الفرز والأحجام ومتطلبات التعبئة لكل وجهة." }, featured: true }),
  // TODO(replace): Egyptian peach season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "peach", name: { en: "Peach", ar: "خوخ" }, type: "fruit", forms: ["fresh"], season: { en: "Typically a late-spring and summer crop; availability varies by variety and year.", ar: "يكون موسمه عادةً في أواخر الربيع والصيف؛ ويتغير التوفر بحسب الصنف والسنة." }, seasonWindows: [{ start: { month: 5, day: 1 }, end: { month: 8, day: 31 } }], summary: { en: "Egyptian fresh peaches for seasonal retail programmes, with variety, sizing and pack details agreed for each destination.", ar: "خوخ مصري طازج لبرامج البيع الموسمية، مع الاتفاق على الصنف والأحجام والتعبئة وفق كل وجهة." }, featured: true }),
  // TODO(replace): Egyptian green onion season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "green-onion", name: { en: "Green onion", ar: "بصل أخضر" }, type: "vegetable", forms: ["fresh"], season: { en: "Typically available through the cooler growing months; confirm the current programme with our team.", ar: "يتوفر عادةً خلال أشهر الزراعة الأكثر اعتدالاً؛ يرجى تأكيد البرنامج الحالي مع فريقنا." }, seasonWindows: [{ start: { month: 10, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Fresh green onions prepared for food-service and retail requirements, with grading and bunch or carton presentation agreed to order.", ar: "بصل أخضر طازج يُجهز لمتطلبات خدمات الطعام والبيع بالتجزئة، مع الاتفاق على الفرز والتقديم في ربطات أو كراتين حسب الطلب." }, featured: true }),
  // TODO(replace): Egyptian cabbage season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "cabbage", name: { en: "Cabbage", ar: "كرنب" }, type: "vegetable", forms: ["fresh"], season: { en: "Typically a cool-season crop, with fresh availability concentrated in autumn and winter.", ar: "يُزرع عادةً كمحصول للأجواء المعتدلة، ويتركز توفره الطازج في الخريف والشتاء." }, seasonWindows: [{ start: { month: 10, day: 1 }, end: { month: 3, day: 31 } }], summary: { en: "Egyptian cabbage for fresh-market buyers, with grade, size and packing details agreed for each enquiry.", ar: "كرنب مصري للمشترين في سوق المنتجات الطازجة، مع الاتفاق على الفرز والحجم والتعبئة لكل استفسار." }, featured: false }),
  // TODO(replace): Egyptian broccoli season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "broccoli", name: { en: "Broccoli", ar: "بروكلي" }, type: "vegetable", forms: ["fresh"], season: { en: "Typically a cool-season crop, with fresh supply strongest through the cooler months.", ar: "يُزرع عادةً في الموسم المعتدل، ويكون توفره الطازج أفضل خلال الأشهر الأبرد." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Fresh Egyptian broccoli for retail and food-service programmes, with head grading and packing requirements discussed for each destination.", ar: "بروكلي مصري طازج لبرامج البيع وخدمات الطعام، مع مناقشة فرز الرؤوس ومتطلبات التعبئة لكل وجهة." }, featured: true }),
  // TODO(replace): Egyptian citrus season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "citrus", name: { en: "Citrus", ar: "موالح" }, type: "fruit", forms: ["fresh"], season: { en: "Typically spans late autumn through spring, depending on citrus type and variety.", ar: "يمتد عادةً من أواخر الخريف حتى الربيع، بحسب نوع الموالح والصنف." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Egyptian citrus for fresh export programmes, with fruit type, size range, treatment and pack format agreed by destination.", ar: "موالح مصرية لبرامج التصدير الطازج، مع تحديد نوع الثمار والأحجام والمعاملة والتعبئة وفق الوجهة." }, featured: false }),
  // TODO(replace): Egyptian strawberry season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "strawberry", name: { en: "Strawberry", ar: "فراولة" }, type: "fruit", forms: ["fresh"], season: { en: "Fresh harvest is typically from late autumn through spring; timing varies by growing area and conditions.", ar: "يمتد موسم الفراولة الطازجة عادةً من أواخر الخريف حتى الربيع؛ ويختلف التوقيت بحسب منطقة الزراعة والظروف." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Egyptian strawberries for fresh-market programmes, with grade, sizing and packaging tailored to the destination.", ar: "فراولة مصرية لبرامج السوق الطازج، مع مواءمة الفرز والأحجام والتعبئة للوجهة." }, featured: true }),
  // TODO(replace): Egyptian green bean season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "green-beans", name: { en: "Green beans", ar: "فاصوليا خضراء" }, type: "vegetable", forms: ["fresh"], season: { en: "Fresh windows typically include autumn and spring; timing depends on growing conditions.", ar: "تشمل فترات التوفر الطازج عادةً الخريف والربيع؛ ويتوقف التوقيت على ظروف الزراعة." }, seasonWindows: [{ start: { month: 3, day: 1 }, end: { month: 5, day: 31 } }, { start: { month: 9, day: 1 }, end: { month: 11, day: 30 } }], summary: { en: "Fresh Egyptian green beans, with whole, trimmed or cut specifications discussed against the buyer’s end use.", ar: "فاصوليا خضراء مصرية طازجة، مع مناقشة مواصفات الحبات الكاملة أو المشذبة أو المقطعة وفق استخدام المشتري." }, featured: false }),
  // TODO(replace): Egyptian sweet potato season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "sweet-potato", name: { en: "Sweet potato", ar: "بطاطا حلوة" }, type: "vegetable", forms: ["fresh"], season: { en: "Typically harvested from late summer into autumn, with availability depending on curing and storage needs.", ar: "يُحصد عادةً من أواخر الصيف حتى الخريف، ويتوقف التوفر على احتياجات المعالجة والتخزين." }, seasonWindows: [{ start: { month: 8, day: 1 }, end: { month: 11, day: 30 } }], summary: { en: "Egyptian sweet potatoes for fresh retail and food-service programmes, with variety, size and pack agreed to the buyer’s requirements.", ar: "بطاطا حلوة مصرية لبرامج البيع الطازج وخدمات الطعام، مع الاتفاق على الصنف والحجم والعبوة وفق متطلبات المشتري." }, featured: false }),
  // TODO(replace): Egyptian lettuce season and product copy | Crest export team | Confirm seasonal window, varieties and specifications, then update this product entry.
  seed({ slug: "lettuce", name: { en: "Lettuce", ar: "خس" }, type: "vegetable", forms: ["fresh"], season: { en: "Typically a cool-season crop, with fresh availability varying by type and growing conditions.", ar: "يُزرع عادةً في الموسم المعتدل، ويتغير توفره الطازج بحسب النوع وظروف الزراعة." }, seasonWindows: [{ start: { month: 11, day: 1 }, end: { month: 4, day: 30 } }], summary: { en: "Fresh lettuce for wholesale, food-service and retail programmes, with type, trim and packaging agreed to specification.", ar: "خس طازج لبرامج الجملة وخدمات الطعام والبيع بالتجزئة، مع الاتفاق على النوع والتشذيب والتعبئة وفق المواصفات." }, featured: false }),
  // TODO(replace): Fresh garlic season and product copy | Crest export team | Confirm current varieties, seasonal window and export specifications, then update this entry.
  seed({
    slug: "garlic",
    name: { en: "Garlic", ar: "ثوم" },
    type: "vegetable",
    forms: ["fresh"],
    season: { en: "Fresh garlic is seasonal; confirm the current harvest window and availability with our team.", ar: "يتسم الثوم الطازج بالموسمية؛ يرجى تأكيد فترة الحصاد والتوفر الحالي مع فريقنا." },
    seasonWindows: [],
    summary: { en: "Fresh Egyptian garlic for export enquiries, with size, preparation and packing requirements discussed for each destination.", ar: "ثوم مصري طازج لاستفسارات التصدير، مع مناقشة الحجم والتجهيز ومتطلبات التعبئة لكل وجهة." },
    packing: { en: "Export packing and presentation are agreed by bulb size, preparation, destination and buyer specification.", ar: "يُتفق على تعبئة التصدير وطريقة العرض وفق حجم الرؤوس والتجهيز والوجهة ومواصفات المشتري." },
    featured: false,
  }),
  // TODO(replace): Dried tomato product copy | Crest export team | Confirm cut, moisture, packaging and destination specifications, then update this entry.
  seed({
    slug: "dried-tomato",
    name: { en: "Dried tomato", ar: "طماطم مجففة" },
    type: "vegetable",
    forms: ["dried"],
    season: { en: "Supply timing depends on the tomato crop and drying programme; confirm current availability per enquiry.", ar: "يتوقف توقيت التوريد على موسم الطماطم وبرنامج التجفيف؛ يرجى تأكيد التوفر لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Dried tomatoes for ingredient and food-service enquiries, with cut, preparation and packing details agreed to the intended use.", ar: "طماطم مجففة لاستفسارات المكونات وخدمات الطعام، مع الاتفاق على التقطيع والتجهيز والتعبئة وفق الاستخدام المطلوب." },
    packing: { en: "Dried tomato packing, cut and pack size are confirmed against the buyer’s product and destination requirements.", ar: "تُحدد طريقة تعبئة الطماطم المجففة وشكل التقطيع وحجم العبوة وفق متطلبات المنتج والوجهة." },
    featured: false,
  }),
  // TODO(replace): Frozen peas product copy | Crest export team | Confirm variety, processing specifications and supply schedule, then update this entry.
  seed({
    slug: "frozen-peas",
    name: { en: "Frozen peas", ar: "بازلاء مجمدة" },
    type: "vegetable",
    forms: ["frozen"],
    season: { en: "Processing and shipment timing depend on the crop and supply programme; confirm availability per enquiry.", ar: "يعتمد توقيت التصنيع والشحن على المحصول وبرنامج التوريد؛ يرجى تأكيد التوفر لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Frozen peas for food-service and ingredient enquiries, with grade, pack size and shipment requirements discussed to specification.", ar: "بازلاء مجمدة لاستفسارات خدمات الطعام والمكونات، مع مناقشة الفرز وحجم العبوة ومتطلبات الشحن وفق المواصفات." },
    packing: { en: "Frozen peas can be discussed in suitable frozen export packs; pack sizes and specifications are confirmed per enquiry.", ar: "يمكن مناقشة تعبئة البازلاء المجمدة في عبوات تصدير مناسبة؛ ويُؤكد حجم العبوة والمواصفات لكل استفسار." },
    featured: false,
  }),
  // TODO(replace): Frozen mango product copy | Crest export team | Confirm variety, cut and processing specifications, then update this entry.
  seed({
    slug: "mango",
    name: { en: "Frozen mango", ar: "مانجو مجمدة" },
    type: "fruit",
    forms: ["frozen"],
    season: { en: "Frozen supply timing depends on mango harvest and processing programmes; confirm current availability per enquiry.", ar: "يتوقف توقيت توريد المانجو المجمدة على موسم الحصاد وبرامج التصنيع؛ يرجى تأكيد التوفر لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Frozen Egyptian mango for export enquiries, with cut, grade and pack specifications discussed for the buyer’s intended use.", ar: "مانجو مصرية مجمدة لاستفسارات التصدير، مع مناقشة التقطيع والفرز ومواصفات العبوة وفق الاستخدام المطلوب." },
    packing: { en: "Frozen mango formats and pack sizes are discussed against the product cut, destination and buyer specification.", ar: "تُناقش أشكال تعبئة المانجو المجمدة وأحجام العبوات وفق شكل التقطيع والوجهة ومواصفات المشتري." },
    featured: false,
  }),
  // TODO(replace): Fresh banana product copy | Crest export team | Confirm origin, seasonal availability and export specifications, then update this entry.
  seed({
    slug: "banana",
    name: { en: "Banana", ar: "موز" },
    type: "fruit",
    forms: ["fresh"],
    season: { en: "Harvest and supply timing vary by source and programme; confirm current availability with our team.", ar: "يختلف توقيت الحصاد والتوريد بحسب المصدر والبرنامج؛ يرجى تأكيد التوفر الحالي مع فريقنا." },
    seasonWindows: [],
    summary: { en: "Fresh bananas for export enquiries, with variety, grade, ripeness and packing requirements agreed by destination.", ar: "موز طازج لاستفسارات التصدير، مع الاتفاق على الصنف والفرز ودرجة النضج ومتطلبات التعبئة وفق الوجهة." },
    packing: { en: "Banana export cartons and product presentation are confirmed against the selected grade and destination.", ar: "تُؤكد كراتين تصدير الموز وطريقة عرض المنتج وفق الفرز والوجهة المحددين." },
    featured: false,
  }),
  // TODO(replace): Frozen pomegranate product copy | Crest export team | Confirm preparation, processing and packaging specifications, then update this entry.
  seed({
    slug: "frozen-pomegranate",
    name: { en: "Frozen pomegranate", ar: "رمان مجمد" },
    type: "fruit",
    forms: ["frozen"],
    season: { en: "Processing and shipment timing depend on the pomegranate crop and supply programme; confirm current availability.", ar: "يعتمد توقيت التصنيع والشحن على محصول الرمان وبرنامج التوريد؛ يرجى تأكيد التوفر الحالي." },
    seasonWindows: [],
    summary: { en: "Frozen pomegranate for ingredient and food-service enquiries, with preparation, grade and pack requirements discussed per destination.", ar: "رمان مجمد لاستفسارات المكونات وخدمات الطعام، مع مناقشة التجهيز والفرز ومتطلبات العبوة وفق الوجهة." },
    packing: { en: "Frozen pomegranate preparation and export pack sizes are agreed to the buyer’s application and destination.", ar: "يُتفق على تجهيز الرمان المجمد وأحجام عبوات التصدير وفق استخدام المشتري والوجهة." },
    featured: false,
  }),
  // TODO(replace): Frozen guava product copy | Crest export team | Confirm preparation, processing and packaging specifications, then update this entry.
  seed({
    slug: "frozen-guava",
    name: { en: "Frozen guava", ar: "جوافة مجمدة" },
    type: "fruit",
    forms: ["frozen"],
    season: { en: "Processing and shipment timing depend on the guava crop and supply programme; confirm current availability.", ar: "يعتمد توقيت التصنيع والشحن على محصول الجوافة وبرنامج التوريد؛ يرجى تأكيد التوفر الحالي." },
    seasonWindows: [],
    summary: { en: "Frozen guava for ingredient and food-service enquiries, with preparation and pack options discussed against the intended use.", ar: "جوافة مجمدة لاستفسارات المكونات وخدمات الطعام، مع مناقشة التجهيز وخيارات العبوة وفق الاستخدام المطلوب." },
    packing: { en: "Frozen guava preparation and pack sizes are confirmed against the product specification and destination.", ar: "يُؤكد تجهيز الجوافة المجمدة وأحجام العبوات وفق مواصفات المنتج والوجهة." },
    featured: false,
  }),
  // TODO(replace): Frozen green bean product copy | Crest export team | Confirm cut, grade and processing specifications, then update this entry.
  seed({
    slug: "frozen-green-beans",
    name: { en: "Frozen green beans", ar: "فاصوليا خضراء مجمدة" },
    type: "vegetable",
    forms: ["frozen"],
    season: { en: "Processing and shipment timing depend on the crop and supply programme; confirm availability per enquiry.", ar: "يعتمد توقيت التصنيع والشحن على المحصول وبرنامج التوريد؛ يرجى تأكيد التوفر لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Frozen green beans for export enquiries, with cut, grade and pack specifications discussed for the buyer’s use.", ar: "فاصوليا خضراء مجمدة لاستفسارات التصدير، مع مناقشة التقطيع والفرز ومواصفات العبوة وفق استخدام المشتري." },
    packing: { en: "Frozen green bean cuts and export pack sizes are confirmed by the buyer’s specification and destination.", ar: "تُحدد أشكال تقطيع الفاصوليا الخضراء المجمدة وأحجام عبوات التصدير وفق مواصفات المشتري والوجهة." },
    featured: false,
  }),
  // TODO(replace): Frozen artichoke product copy | Crest export team | Confirm cuts, grades and processing specifications, then update this entry.
  seed({
    slug: "frozen-artichokes",
    name: { en: "Frozen artichokes", ar: "خرشوف مجمد" },
    type: "vegetable",
    forms: ["frozen"],
    season: { en: "Processing and shipment timing depend on the artichoke crop and supply programme; confirm availability per enquiry.", ar: "يعتمد توقيت التصنيع والشحن على محصول الخرشوف وبرنامج التوريد؛ يرجى تأكيد التوفر لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Frozen artichokes for export enquiries, with cut, grade and packing requirements discussed for the intended application.", ar: "خرشوف مجمد لاستفسارات التصدير، مع مناقشة التقطيع والفرز ومتطلبات التعبئة وفق الاستخدام المطلوب." },
    packing: { en: "Frozen artichoke cuts and pack sizes are confirmed against the requested specification and destination.", ar: "تُؤكد أشكال تقطيع الخرشوف المجمد وأحجام العبوات وفق المواصفات المطلوبة والوجهة." },
    featured: false,
  }),
  // TODO(replace): Dried jalapeno pepper product copy | Crest export team | Confirm pepper variety, preparation and packaging specifications, then update this entry.
  seed({
    slug: "dried-jalapeno-peppers",
    name: { en: "Dried jalapeno peppers", ar: "فلفل هالبينو مجفف" },
    type: "vegetable",
    forms: ["dried"],
    season: { en: "Supply timing depends on pepper sourcing and drying programmes; confirm the current availability per enquiry.", ar: "يتوقف توقيت التوريد على مصادر الفلفل وبرامج التجفيف؛ يرجى تأكيد التوفر الحالي لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Dried jalapeno peppers for ingredient and food-service enquiries, with whole, cut or other preparation requirements discussed.", ar: "فلفل هالبينو مجفف لاستفسارات المكونات وخدمات الطعام، مع مناقشة متطلبات الحبات الكاملة أو المقطعة أو غيرها من أشكال التجهيز." },
    packing: { en: "Dried pepper preparation and pack format are agreed to the buyer’s product specification and destination.", ar: "يُتفق على تجهيز الفلفل المجفف وشكل العبوة وفق مواصفات المنتج والوجهة." },
    featured: false,
  }),
  // TODO(replace): Dried date product copy | Crest export team | Confirm date variety, grade, storage and packaging specifications, then update this entry.
  seed({
    slug: "dried-dates",
    name: { en: "Dried dates", ar: "تمر مجفف" },
    type: "fruit",
    forms: ["dried"],
    season: { en: "Harvest and packing timing vary by date variety and supply programme; confirm availability per enquiry.", ar: "يختلف توقيت الحصاد والتعبئة بحسب صنف التمر وبرنامج التوريد؛ يرجى تأكيد التوفر لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Dried dates for retail, ingredient and food-service enquiries, with variety, grade and pack requirements discussed to specification.", ar: "تمر مجفف لاستفسارات البيع والمكونات وخدمات الطعام، مع مناقشة الصنف والفرز ومتطلبات العبوة وفق المواصفات." },
    packing: { en: "Date grade, presentation and export pack sizes are confirmed against the buyer’s requirements and destination.", ar: "يُؤكد فرز التمر وطريقة عرضه وأحجام عبوات التصدير وفق متطلبات المشتري والوجهة." },
    featured: false,
  }),
  // TODO(replace): Fresh onion product copy | Crest export team | Confirm onion types, seasonal window and export specifications, then update this entry.
  seed({
    slug: "onion",
    name: { en: "Onion", ar: "بصل" },
    type: "vegetable",
    forms: ["fresh"],
    season: { en: "Fresh onion supply is seasonal; confirm the current type, harvest window and availability with our team.", ar: "يتسم توريد البصل الطازج بالموسمية؛ يرجى تأكيد النوع وفترة الحصاد والتوفر الحالي مع فريقنا." },
    seasonWindows: [],
    summary: { en: "Fresh onions for export enquiries, with type, size, preparation and packing requirements agreed by destination.", ar: "بصل طازج لاستفسارات التصدير، مع الاتفاق على النوع والحجم والتجهيز ومتطلبات التعبئة وفق الوجهة." },
    packing: { en: "Onion sizing, preparation and export packaging are confirmed against the buyer’s specification and destination.", ar: "يُؤكد فرز أحجام البصل وتجهيزه وتعبئته للتصدير وفق مواصفات المشتري والوجهة." },
    featured: false,
  }),
  // TODO(replace): Fresh cucumber product copy | Crest export team | Confirm varieties, seasonal window and export specifications, then update this entry.
  seed({
    slug: "cucumber",
    name: { en: "Cucumber", ar: "خيار" },
    type: "vegetable",
    forms: ["fresh"],
    season: { en: "Fresh cucumber availability varies by variety and growing conditions; confirm current timing per enquiry.", ar: "يختلف توفر الخيار الطازج بحسب الصنف وظروف الزراعة؛ يرجى تأكيد التوقيت الحالي لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Fresh cucumbers for retail and food-service export enquiries, with size, grade and packing requirements discussed to specification.", ar: "خيار طازج لاستفسارات التصدير للبيع وخدمات الطعام، مع مناقشة الحجم والفرز ومتطلبات التعبئة وفق المواصفات." },
    packing: { en: "Cucumber sizing and export pack format are agreed by product specification and destination.", ar: "يُتفق على فرز أحجام الخيار وشكل عبوة التصدير وفق مواصفات المنتج والوجهة." },
    featured: false,
  }),
  // TODO(replace): Fresh carrot product copy | Crest export team | Confirm varieties, seasonal window and export specifications, then update this entry.
  seed({
    slug: "carrots",
    name: { en: "Carrots", ar: "جزر" },
    type: "vegetable",
    forms: ["fresh"],
    season: { en: "Fresh carrot availability depends on growing conditions and the supply programme; confirm current timing per enquiry.", ar: "يعتمد توفر الجزر الطازج على ظروف الزراعة وبرنامج التوريد؛ يرجى تأكيد التوقيت الحالي لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Fresh carrots for export enquiries, with size, grade, preparation and packing discussed for the buyer’s requirements.", ar: "جزر طازج لاستفسارات التصدير، مع مناقشة الحجم والفرز والتجهيز والتعبئة وفق متطلبات المشتري." },
    packing: { en: "Carrot sizing, preparation and export packing are confirmed against the buyer’s specification and destination.", ar: "يُؤكد فرز أحجام الجزر وتجهيزه وتعبئته للتصدير وفق مواصفات المشتري والوجهة." },
    featured: false,
  }),
  // TODO(replace): Frozen strawberry product copy | Crest export team | Confirm grade, preparation and processing specifications, then update this entry.
  seed({
    slug: "frozen-strawberry",
    name: { en: "Frozen strawberry", ar: "فراولة مجمدة" },
    type: "fruit",
    forms: ["frozen"],
    season: { en: "Processing and shipment timing depend on the strawberry crop and supply programme; confirm current availability.", ar: "يعتمد توقيت التصنيع والشحن على محصول الفراولة وبرنامج التوريد؛ يرجى تأكيد التوفر الحالي." },
    seasonWindows: [],
    summary: { en: "Frozen Egyptian strawberries for export, with grade, preparation and packaging discussed for the buyer’s intended use.", ar: "فراولة مصرية مجمدة للتصدير، مع مناقشة الفرز والتجهيز والتعبئة وفق الاستخدام المطلوب من المشتري." },
    packing: { en: "Frozen strawberry preparation and export pack sizes are agreed against the buyer’s specification and destination.", ar: "يُتفق على تجهيز الفراولة المجمدة وأحجام عبوات التصدير وفق مواصفات المشتري والوجهة." },
    featured: false,
  }),
  // TODO(replace): Dried garlic product copy | Crest export team | Confirm cut, moisture and packaging specifications, then update this entry.
  seed({
    slug: "dried-garlic",
    name: { en: "Dried garlic", ar: "ثوم مجفف" },
    type: "vegetable",
    forms: ["dried"],
    season: { en: "Supply timing depends on garlic sourcing and drying programmes; confirm current availability per enquiry.", ar: "يتوقف توقيت التوريد على مصادر الثوم وبرامج التجفيف؛ يرجى تأكيد التوفر الحالي لكل استفسار." },
    seasonWindows: [],
    summary: { en: "Dried garlic for ingredient and food-service enquiries, with slice, granule or powder specifications subject to confirmation.", ar: "ثوم مجفف لاستفسارات المكونات وخدمات الطعام، مع تحديد مواصفات الشرائح أو الحبيبات أو المسحوق بعد التأكيد." },
    packing: { en: "Dried garlic form and pack sizes are confirmed against the intended application, product specification and destination.", ar: "يُؤكد شكل الثوم المجفف وأحجام العبوات وفق الاستخدام ومواصفات المنتج والوجهة." },
    featured: false,
  }),
  // TODO(replace): Frozen broccoli product copy | Crest export team | Confirm cuts, grade and processing specifications, then update this entry.
  seed({
    slug: "frozen-broccoli",
    name: { en: "Frozen broccoli", ar: "بروكلي مجمد" },
    type: "vegetable",
    forms: ["frozen"],
    season: { en: "Processing and shipment timing depend on the broccoli crop and supply programme; confirm current availability.", ar: "يعتمد توقيت التصنيع والشحن على محصول البروكلي وبرنامج التوريد؛ يرجى تأكيد التوفر الحالي." },
    seasonWindows: [],
    summary: { en: "Frozen broccoli for export enquiries, with cut, grade and packing requirements discussed for the intended application.", ar: "بروكلي مجمد لاستفسارات التصدير، مع مناقشة التقطيع والفرز ومتطلبات التعبئة وفق الاستخدام المطلوب." },
    packing: { en: "Frozen broccoli cuts and export pack sizes are confirmed against the product specification and destination.", ar: "تُؤكد أشكال تقطيع البروكلي المجمد وأحجام عبوات التصدير وفق مواصفات المنتج والوجهة." },
    featured: false,
  }),
];

export const featuredProducts = products.filter((item) => item.featured);
export const getProductBySlug = (slug: string) => products.find((item) => item.slug === slug);
