"use client";

type BackToTopProps = {
  label: string;
};

export function BackToTop({ label }: BackToTopProps) {
  return (
    <button
      className="back-to-top"
      type="button"
      onClick={() => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
        document.documentElement.scrollTo({ top: 0, behavior });
      }}
    >
      {label}<span aria-hidden="true">↑</span>
    </button>
  );
}
