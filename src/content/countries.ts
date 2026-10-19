export type MarketStatus = "current" | "target";
export type Market = {
  status: MarketStatus;
  name: { en: string; ar: string };
  coordinates: [longitude: number, latitude: number];
  flag?: string;
  grouped?: boolean;
};

// TODO(confirm): every market classification and grouped-region pin requires owner approval.
export const markets: Market[] = [
  { status: "current", name: { en: "Canada", ar: "كندا" }, coordinates: [-106.3, 56.1], flag: "CA" },
  { status: "current", name: { en: "Turkey", ar: "تركيا" }, coordinates: [35.2, 39.0], flag: "TR" },
  { status: "current", name: { en: "Switzerland", ar: "سويسرا" }, coordinates: [8.2, 46.8], flag: "CH" },
  { status: "current", name: { en: "Italy", ar: "إيطاليا" }, coordinates: [12.6, 42.8], flag: "IT" },
  { status: "current", name: { en: "Slovenia", ar: "سلوفينيا" }, coordinates: [14.9, 46.1], flag: "SI" },
  { status: "current", name: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" }, coordinates: [53.8, 23.4], flag: "AE" },
  { status: "current", name: { en: "Jordan", ar: "الأردن" }, coordinates: [36.2, 31.2], flag: "JO" },
  { status: "current", name: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" }, coordinates: [45.1, 23.9], flag: "SA" },
  { status: "current", name: { en: "Brazil", ar: "البرازيل" }, coordinates: [-51.9, -10.8], flag: "BR" },
  { status: "target", name: { en: "United States", ar: "الولايات المتحدة" }, coordinates: [-98.6, 39.8], flag: "US" },
  { status: "target", name: { en: "Germany", ar: "ألمانيا" }, coordinates: [10.4, 51.1], flag: "DE" },
  { status: "target", name: { en: "Netherlands", ar: "هولندا" }, coordinates: [5.3, 52.1], flag: "NL" },
  { status: "target", name: { en: "Spain", ar: "إسبانيا" }, coordinates: [-3.7, 40.4], flag: "ES" },
  { status: "target", name: { en: "Russia", ar: "روسيا" }, coordinates: [105.3, 61.5], flag: "RU" },
  { status: "target", name: { en: "Cyprus", ar: "قبرص" }, coordinates: [33.4, 35.1], flag: "CY" },
  { status: "target", name: { en: "GCC", ar: "دول مجلس التعاون الخليجي" }, coordinates: [49.5, 25.0], grouped: true },
  { status: "target", name: { en: "North Africa", ar: "شمال أفريقيا" }, coordinates: [14.0, 30.0], grouped: true },
];
