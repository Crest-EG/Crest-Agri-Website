import localFont from "next/font/local";

export const montserratFont = localFont({
  src: "../../brand/fonts/Montserrat-Arabic-Regular.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-montserrat",
  fallback: ["Arial", "sans-serif"],
});
