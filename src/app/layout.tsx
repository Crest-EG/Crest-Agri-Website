import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crest for Agricultural Development",
  description: "Fresh, frozen and dried agricultural products from Egypt.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
