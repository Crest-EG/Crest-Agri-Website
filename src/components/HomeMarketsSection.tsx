import Image from "next/image";

type HomeMarketsSectionProps = {
  alt: string;
  title: string;
};

export function HomeMarketsSection({ alt, title }: HomeMarketsSectionProps) {
  return (
    <section className="home-markets" aria-labelledby="markets-title">
      <h2 id="markets-title" className="home-markets-title">{title}</h2>
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
