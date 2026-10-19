import { MarketMap } from "@/components/MarketMap";
import { ScrollJourney } from "@/components/ScrollJourney";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = locale === "ar" ? "ar" : "en";
  return (
    <main id="home">
      <ScrollJourney marketMap={<MarketMap locale={activeLocale} />} />
    </main>
  );
}
