import "./globals.css";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import en from "@/messages/en.json";

export default function NotFound() {
  const t = en.common;
  return (
    <html lang="en">
      <body>
        <main className="status-page">
          <Logo variant="mark" alt={t.logoAlt} className="status-logo" />
          <p className="eyebrow">404</p>
          <h1>{t.errors.notFoundTitle}</h1>
          <p>{t.errors.notFoundBody}</p>
          <Link className="button button-primary" href="/en">{t.errors.backHome}</Link>
        </main>
      </body>
    </html>
  );
}
