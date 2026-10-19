import type { Metadata } from "next";
import { LocalizedNotFound } from "./LocalizedNotFound";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://crestagricultural.com"),
  title: "Page not found | Crest for Agricultural Development",
};

export default function NotFound() {
  return <LocalizedNotFound />;
}
