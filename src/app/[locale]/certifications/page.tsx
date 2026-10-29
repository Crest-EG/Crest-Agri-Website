import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type CopyItem = { title: string; body: string };

const certifications = [
  { key: "globalgap", image: "/images/certifications/globalgap.webp", width: 625, height: 625 },
  { key: "grasp", image: "/images/certifications/grasp.webp", width: 625, height: 625 },
  { key: "iso22000", image: "/images/certifications/iso-22000.webp", width: 177, height: 179 },
  { key: "iso", image: "/images/certifications/iso.webp", width: 365, height: 335 },
  { key: "brcgs", image: "/images/certifications/brcgs.webp", width: 158, height: 126 },
  { key: "fda", image: "/images/certifications/fda.webp", width: 190, height: 93 },
  { key: "gacc", image: "/images/certifications/gacc.webp", width: 222, height: 103 },
  { key: "haccp", image: "/images/certifications/haccp.webp", width: 189, height: 164 },
] as const;

function getCertificationRows<T>(items: readonly T[], maxColumns = 5) {
  const rowCount = Math.ceil(items.length / maxColumns);
  const baseRowSize = Math.floor(items.length / rowCount);
  const largerRows = items.length % rowCount;
  let start = 0;

  return Array.from({ length: rowCount }, (_, index) => {
    const rowSize = baseRowSize + (index < largerRows ? 1 : 0);
    const row = items.slice(start, start + rowSize);
    start += rowSize;
    return row;
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications" });
  return { title: t("title"), description: t("intro") };
}

export default async function CertificationsPage() {
  const t = await getTranslations("certifications");
  const benefits = t.raw("benefits") as CopyItem[];
  const certificationRows = getCertificationRows(certifications);
  return (
    <main className="page-shell certification-page">
      <header className="page-intro">
        <p className="eyebrow">{t("title")}</p>
        <h1>{t("intro")}</h1>
      </header>
      <section className="page-section certification-intro-copy" aria-labelledby="quality-title">
        <h2 className="page-heading" id="quality-title">{t("qualityTitle")}</h2>
        <p>{t("quality")}</p>
      </section>
      <section className="page-section certification-benefits" aria-labelledby="benefits-title">
        <h2 className="page-heading" id="benefits-title">{t("benefitsTitle")}</h2>
        <ul>{benefits.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ul>
      </section>
      <section className="page-section certification-grid" aria-label={t("title")}>
        {certificationRows.map((row, rowIndex) => (
          <div className={`certification-grid-row certification-grid-row--${row.length}-columns`} key={rowIndex}>
            {row.map(({ key, image, width, height }) => (
              <article className="certification-card" key={key}>
                <div className="certification-mark">
                  <Image src={image} alt={t("certAlt", { certification: t(key) })} width={width} height={height} sizes="(max-width: 560px) 78vw, (max-width: 900px) 38vw, 20vw" />
                </div>
                <div><h2>{t(key)}</h2></div>
              </article>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
