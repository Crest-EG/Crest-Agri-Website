import type { ReactNode } from "react";

type HomeMarketsSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function HomeMarketsSection({ eyebrow, title, children }: HomeMarketsSectionProps) {
  return (
    <section className="home-markets" aria-labelledby="markets-title">
      <div className="home-markets-inner page-shell">
        <header className="home-markets-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="markets-title">{title}</h2>
        </header>
        <div className="market-map-zoom">
          {children}
        </div>
      </div>
    </section>
  );
}
