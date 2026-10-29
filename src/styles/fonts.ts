import localFont from "next/font/local";

export const acuminFont = localFont({
  src: "../../brand/fonts/Acumin Variable Concept.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-acumin",
  fallback: ["Arial", "sans-serif"],
});

export const montserratArabicFont = localFont({
  src: "../../brand/fonts/Montserrat-Arabic-Regular.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-montserrat-arabic",
  fallback: ["Arial", "sans-serif"],
});
