"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HomeMarketsSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function HomeMarketsSection({ eyebrow, title, children }: HomeMarketsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const mapFrame = mapContainerRef.current?.querySelector<HTMLDivElement>(".map-frame");
      if (!section || !mapFrame) return;
      const zoomScale = Number.parseFloat(getComputedStyle(section).getPropertyValue("--markets-zoom-scale")) || 1.35;
      const context = gsap.context(() => {
        gsap.fromTo(mapFrame, { scale: 1 }, {
          scale: zoomScale,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 0.9)}`,
            pin: section,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);
      return () => context.revert();
    });
    return () => motion.revert();
  }, []);

  return (
    <section className="home-markets" aria-labelledby="markets-title" ref={sectionRef}>
      <div className="home-markets-inner page-shell">
        <header className="home-markets-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="markets-title">{title}</h2>
        </header>
        <div className="market-map-zoom" ref={mapContainerRef}>
          {children}
        </div>
      </div>
    </section>
  );
}
