import localFont from "next/font/local";

export const acuminFont = localFont({
  src: "../../brand/fonts/Acumin Variable Concept.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-acumin",
  fallback: ["Arial", "sans-serif"],
});

export const dubaiFont = localFont({
  src: "../../brand/fonts/DUBAI-REGULAR.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-dubai",
  fallback: ["Arial", "sans-serif"],
});
