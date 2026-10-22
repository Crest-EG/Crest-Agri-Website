"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";

export function ContactOutro() {
  const t = useTranslations("landing.outro");
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(motionQuery.matches);
    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);
    return () => motionQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const word = wordRef.current;
    const orb = orbRef.current;
    const cta = ctaRef.current;
    if (!section || !word || !orb || !cta || reducedMotion) {
      setCtaVisible(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.set(word, { autoAlpha: 0.24, scale: 0.42, y: 36, transformOrigin: "50% 50%" });
      gsap.set(orb, { scale: 0.2, rotation: -100, transformOrigin: "50% 50%" });
      gsap.set(cta, { autoAlpha: 0, y: 18 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          pin: section.querySelector(".contact-outro-stage"),
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setCtaVisible(self.progress >= 0.78),
          onRefresh: (self) => setCtaVisible(self.progress >= 0.78),
        },
      });

      timeline.to(word, { autoAlpha: 1, scale: 1, y: 0, duration: 0.68, ease: "none" }, 0);
      timeline.to(orb, { scale: 1, rotation: 0, duration: 0.72, ease: "none" }, 0.16);
      timeline.to(cta, { autoAlpha: 1, y: 0, duration: 0.18, ease: "none" }, 0.82);
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className={`contact-outro${reducedMotion ? " is-reduced-motion" : ""}`} aria-label={t("label")}>
      <div className="contact-outro-stage">
        <div className="contact-outro-content">
          <h2 ref={wordRef} className="contact-outro-word">
            {t("word")}<span ref={orbRef} className="contact-outro-orb" aria-hidden="true" />
          </h2>
          <div ref={ctaRef} className="contact-outro-cta" aria-hidden={!ctaVisible} inert={!ctaVisible}>
            <Link className="button button-primary" href="/contact">{t("cta")} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
