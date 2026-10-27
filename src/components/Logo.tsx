import Image from "next/image";
import fullLogo from "../../brand/logo/logo.svg";
import fullLogoWhite from "../../brand/logo/logo-white.svg";
import markLogo from "../../brand/logo/mark.svg";

type LogoProps = {
  variant?: "full" | "mark";
  /** "white" renders the wordmark lettering in white for dark surfaces. */
  tone?: "default" | "white";
  alt: string;
  className?: string;
};

export function Logo({ variant = "full", tone = "default", alt, className }: LogoProps) {
  const source = variant === "full" ? (tone === "white" ? fullLogoWhite : fullLogo) : markLogo;
  return (
    <Image
      src={source}
      alt={alt}
      className={className}
      priority
      aria-label={alt}
    />
  );
}
