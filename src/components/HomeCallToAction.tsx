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
      const muted = getComputedStyle(document.documentElement).getPropertyValue("--text-muted").trim();
      const text = getComputedStyle(document.documentElement).getPropertyValue("--text").trim();
      const words = copy.querySelectorAll<HTMLElement>(".home-cta-word");
      const context = gsap.context(() => {
        gsap.fromTo(words, { color: muted }, {
          color: text,
          ease: "none",
          stagger: { each: 0.035 },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
            pin: section,
            pinSpacing: true,
            pinType: "transform",
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(section.querySelectorAll(".home-cta-product"), { autoAlpha: 0, scale: 0.86, y: 14 }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 76%" },
        });
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
