import Image from "next/image";
import fullLogo from "../../brand/logo/logo.svg";
import markLogo from "../../brand/logo/mark.svg";

type LogoProps = {
  variant?: "full" | "mark";
  alt: string;
  className?: string;
};

export function Logo({ variant = "full", alt, className }: LogoProps) {
  const source = variant === "full" ? fullLogo : markLogo;
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
