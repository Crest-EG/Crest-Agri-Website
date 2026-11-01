"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type LandingCallToActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  servicesLabel: string;
  services: string[];
};

export function LandingCallToAction({
  eyebrow,
  title,
  description,
  buttonLabel,
  servicesLabel,
  services,
}: LandingCallToActionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = titleRef.current;
    const serviceList = servicesRef.current;
    if (!section || !heading || !serviceList || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const direction = document.documentElement.dir === "rtl" ? -1 : 1;
      const colors = getComputedStyle(document.documentElement);
      const titleWords = gsap.utils.toArray<HTMLSpanElement>(".landing-cta-word", heading);
      const serviceCards = gsap.utils.toArray<HTMLLIElement>(".landing-cta-pill", serviceList);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      timeline.fromTo(
        titleWords,
        { color: colors.getPropertyValue("--text-muted").trim() },
        { color: colors.getPropertyValue("--text").trim(), duration: 0.12, stagger: 0.18, ease: "none" },
        0,
      );
      timeline.fromTo(
        serviceCards,
        {
          x: (_index, element) => (element.dataset.side === "start" ? direction : -direction) * 56,
          y: (index) => (index < 2 ? 18 : -18),
          opacity: 0,
          scale: 0.86,
        },
        { x: 0, y: 0, opacity: 1, scale: 1, stagger: 0.1, ease: "none" },
        0,
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const titleWords = title.trim().split(/\s+/);

  return (
    <section className="landing-cta" aria-labelledby="landing-cta-title" ref={sectionRef}>
      <div className="landing-cta-stage">
        <ul className="landing-cta-pills" aria-label={servicesLabel} ref={servicesRef}>
          {services.map((service, index) => (
            <li
              className={`landing-cta-pill landing-cta-pill-${index + 1}`}
              data-side={index % 2 === 0 ? "start" : "end"}
              key={service}
            >
              {service}
            </li>
          ))}
        </ul>
        <div className="landing-cta-content">
          <p className="landing-cta-eyebrow">{eyebrow}</p>
          <h2 id="landing-cta-title" ref={titleRef}>
            {titleWords.map((word, index) => (
              <span className="landing-cta-word" key={`${index}-${word}`}>
                {index > 0 ? " " : null}
                {word}
              </span>
            ))}
          </h2>
          <p className="landing-cta-description">{description}</p>
          <Link className="button button-primary landing-cta-button" href="/contact#quote">
            {buttonLabel}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
