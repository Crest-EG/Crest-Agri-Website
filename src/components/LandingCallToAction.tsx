import Image from "next/image";
import { Link } from "@/i18n/navigation";

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
  return (
    <section className="landing-cta" aria-labelledby="landing-cta-title">
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
