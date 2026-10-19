import type { ReactNode } from "react";

type PlaceholderProps = {
  label: string;
  variant?: "product" | "frame";
  className?: string;
  children?: ReactNode;
};

export function Placeholder({ label, variant = "product", className = "", children }: PlaceholderProps) {
  return (
    <div className={`placeholder placeholder-${variant} ${className}`} role="img" aria-label={label}>
      <span className="placeholder-orbit" aria-hidden="true" />
      {children ?? <span className="placeholder-label">{label}</span>}
    </div>
  );
}
