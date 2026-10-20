import localFont from "next/font/local";

export const brandFont = localFont({
  src: "../../brand/fonts/Montserrat-Arabic-Regular.woff2",
  display: "swap",
  variable: "--font-brand",
  fallback: ["Arial", "sans-serif"],
});
