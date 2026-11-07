import Image from "next/image";

type HomeMarketsSectionProps = {
  alt: string;
};

export function HomeMarketsSection({ alt }: HomeMarketsSectionProps) {
  return (
    <section className="home-markets" aria-label={alt}>
      <div className="home-markets-inner">
        <Image
          src="/images/landing/market-map.webp"
          alt={alt}
          fill
          sizes="100vw"
          className="home-market-map-image"
        />
      </div>
    </section>
  );
}
