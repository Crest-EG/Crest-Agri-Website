import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "button button-primary",
  secondary: "button button-secondary",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${variantClass[variant]} ${className}`} {...props} />;
}

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <a className={`${variantClass[variant]} ${className}`} {...props} />;
}
