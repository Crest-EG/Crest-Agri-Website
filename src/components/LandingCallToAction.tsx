"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type LandingCallToActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
};

const productPhotos = [
  { src: "/images/stitch-products/grapes.jpg", className: "landing-cta-image-1" },
  { src: "/images/stitch-products/pomegranate.jpg", className: "landing-cta-image-2" },
  { src: "/images/stitch-products/strawberry.jpg", className: "landing-cta-image-3" },
  { src: "/images/stitch-products/citrus.jpg", className: "landing-cta-image-4" },
];

export function LandingCallToAction({
  eyebrow,
  title,
  description,
  buttonLabel,
}: LandingCallToActionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLImageElement>(".landing-cta-image img").forEach((image) => {
        gsap.to(image, {
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="landing-cta" aria-labelledby="landing-cta-title" ref={sectionRef}>
      <div className="landing-cta-gallery" aria-hidden="true">
        {productPhotos.map(({ src, className }) => (
          <figure className={`landing-cta-image ${className}`} key={src}>
            <Image src={src} alt="" fill sizes="(max-width: 600px) 32vw, 18vw" />
          </figure>
        ))}
      </div>
      <div className="landing-cta-content">
        <p className="landing-cta-eyebrow">{eyebrow}</p>
        <h2 id="landing-cta-title">{title}</h2>
        <p className="landing-cta-description">{description}</p>
        <Link className="button button-primary landing-cta-button" href="/contact#quote">
          {buttonLabel}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
