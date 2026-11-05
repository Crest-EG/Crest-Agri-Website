"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/Button";
import { DirectionalArrow } from "@/components/DirectionalArrow";

type FloatingProduct = { slug: string; image: string; className: string; width: number; height: number };
type HomeCallToActionProps = {
  eyebrow: string;
  title: string;
  body: string;
  button: string;
  products: FloatingProduct[];
};

function animatedWords(text: string, prefix: string) {
  return text.split(/(\s+)/).map((part, index) => (
    /\s+/.test(part) ? part : <span className="home-cta-word" key={`${prefix}-${index}`}>{part}</span>
  ));
}

export function HomeCallToAction({ eyebrow, title, body, button, products }: HomeCallToActionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const copy = copyRef.current;
      if (!section || !copy) return;
      const muted = getComputedStyle(section).getPropertyValue("--cta-word-muted").trim();
      const text = getComputedStyle(document.documentElement).getPropertyValue("--text").trim();
      const words = copy.querySelectorAll<HTMLElement>(".home-cta-word");
      const products = section.querySelectorAll<HTMLElement>(".home-cta-product");
      const context = gsap.context(() => {
        const timeline = gsap.timeline({
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
        timeline.fromTo(words, { color: muted }, {
          color: text,
          duration: 1,
          ease: "none",
          stagger: { each: 0.05 },
        }, 0);
        timeline.fromTo(products, { autoAlpha: 0, scale: 0.97, y: 6 }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.02,
          ease: "none",
        }, 0);
      }, section);
      return () => context.revert();
    });
    return () => motion.revert();
  }, []);

  return (
    <section className="home-cta" aria-labelledby="cta-title" ref={sectionRef}>
      {products.map(({ slug, image, className, width, height }) => (
        <Image key={slug} src={image} alt="" aria-hidden="true" width={width} height={height} sizes="(max-width: 600px) 76px, 144px" className={`home-cta-product ${className}`} />
      ))}
      <div className="home-cta-content" ref={copyRef}>
        <p className="eyebrow home-cta-eyebrow">{animatedWords(eyebrow, "eyebrow")}</p>
        <h2 id="cta-title">{animatedWords(title, "title")}</h2>
        <p className="home-cta-body">{animatedWords(body, "body")}</p>
        <ButtonLink href="/contact#quote" variant="primary">{button} <DirectionalArrow kind="forward" /></ButtonLink>
      </div>
    </section>
  );
}
