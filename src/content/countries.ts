export type MarketStatus = "current" | "target";
export type Market = {
  status: MarketStatus;
  name: { en: string; ar: string };
  coordinates: [longitude: number, latitude: number];
  flag?: string;
  grouped?: boolean;
  pinOffset?: [horizontal: number, vertical: number];
};

export const markets: Market[] = [
  // TODO(replace): Canada market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Canada", ar: "كندا" }, coordinates: [-106.3, 56.1], flag: "CA" },
  // TODO(replace): Turkey market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Turkey", ar: "تركيا" }, pinOffset: [9, -14], coordinates: [35.2, 39.0], flag: "TR" },
  // TODO(replace): Switzerland market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Switzerland", ar: "سويسرا" }, pinOffset: [-22, -12], coordinates: [8.2, 46.8], flag: "CH" },
  // TODO(replace): Italy market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Italy", ar: "إيطاليا" }, pinOffset: [-23, 10], coordinates: [12.6, 42.8], flag: "IT" },
  // TODO(replace): Slovenia market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Slovenia", ar: "سلوفينيا" }, pinOffset: [1, 23], coordinates: [14.9, 46.1], flag: "SI" },
  // TODO(replace): UAE market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" }, pinOffset: [20, -17], coordinates: [53.8, 23.4], flag: "AE" },
  // TODO(replace): Jordan market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Jordan", ar: "الأردن" }, pinOffset: [-16, -18], coordinates: [36.2, 31.2], flag: "JO" },
  // TODO(replace): Saudi Arabia market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" }, pinOffset: [17, 10], coordinates: [45.1, 23.9], flag: "SA" },
  // TODO(replace): Brazil market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "current", name: { en: "Brazil", ar: "البرازيل" }, coordinates: [-51.9, -10.8], flag: "BR" },
  // TODO(replace): United States market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "target", name: { en: "United States", ar: "الولايات المتحدة" }, coordinates: [-98.6, 39.8], flag: "US" },
  // TODO(replace): Germany market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "target", name: { en: "Germany", ar: "ألمانيا" }, pinOffset: [21, -17], coordinates: [10.4, 51.1], flag: "DE" },
  // TODO(replace): Netherlands market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "target", name: { en: "Netherlands", ar: "هولندا" }, pinOffset: [-13, -23], coordinates: [5.3, 52.1], flag: "NL" },
  // TODO(replace): Spain market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "target", name: { en: "Spain", ar: "إسبانيا" }, coordinates: [-3.7, 40.4], flag: "ES" },
  // TODO(replace): Russia market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "target", name: { en: "Russia", ar: "روسيا" }, coordinates: [105.3, 61.5], flag: "RU" },
  // TODO(replace): Cyprus market status and map pin | Crest export team | Confirm the relationship and replace or remove this illustrative entry.
  { status: "target", name: { en: "Cyprus", ar: "قبرص" }, pinOffset: [24, 8], coordinates: [33.4, 35.1], flag: "CY" },
  // TODO(replace): GCC grouped market status and map pin | Crest export team | Confirm included destinations and replace the grouped marker.
  { status: "target", name: { en: "GCC", ar: "دول مجلس التعاون الخليجي" }, pinOffset: [24, 28], coordinates: [49.5, 25.0], grouped: true },
  // TODO(replace): North Africa grouped market status and map pin | Crest export team | Confirm included destinations and replace the grouped marker.
  { status: "target", name: { en: "North Africa", ar: "شمال أفريقيا" }, pinOffset: [-18, 18], coordinates: [14.0, 30.0], grouped: true },
];
