import type { Metadata } from "next";
import { LocalizedNotFound } from "./LocalizedNotFound";
import en from "@/messages/en.json";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://crestagricultural.com"),
  title: en.common.errors.notFoundTitle,
  description: en.common.errors.notFoundBody,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <LocalizedNotFound />;
}
