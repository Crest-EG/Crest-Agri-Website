import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/Button";

const processSteps = ["sourcing", "artwork", "packing", "dispatch"] as const;
// TODO(replace): Bilingual export service and private-label descriptions | Crest export team | Confirm service scope and approval flow, then update the services namespace in both message files.
// TODO(replace): Services page photography | Crest creative team | Replace the Stitch reference images under public/images/stitch-services/ with approved service photography at the same paths.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("intro") };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  return (
    <main className="page-shell services-page">
      <header className="page-intro services-intro">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
      </header>
      <section className="service-overview page-section">
        <div className="service-photo">
          <Image src="/images/stitch-services/assurance.jpg" alt="" aria-hidden="true" fill sizes="(max-width: 900px) 100vw, 36vw" />
          <aside className="service-photo-note content-card">
            <p className="eyebrow">{t("quality")}</p>
            <p>{t("qualityBody")}</p>
          </aside>
        </div>
        <div>
          <p className="eyebrow">{t("provenance")}</p>
          <h2>{t("oversight")}</h2>
          <p>{t("oversightBody")}</p>
          <div className="service-support"><span>{t("sourcing")}</span><span>{t("dispatch")}</span></div>
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading"><h2>{t("privateLabel")}</h2><p>{t("privateLabelBody")}</p></div>
        <ol className="service-steps">
          {processSteps.map((key, index) => <li className="content-card" key={key}><span>{String(index + 1).padStart(2, "0")}</span><h3>{t(key)}</h3></li>)}
        </ol>
      </section>
      <section className="shipping-card content-card">
        <div><p className="eyebrow">{t("dispatch")}</p><h2>{t("shipping")}</h2><p>{t("shippingBody")}</p></div>
        <div className="shipping-card-visual"><Image src="/images/stitch-services/shipping.jpg" alt="" aria-hidden="true" fill sizes="(max-width: 900px) 100vw, 40vw" /></div>
        <ButtonLink href="/contact#quote">{t("contactAction")} <span aria-hidden="true">↗</span></ButtonLink>
      </section>
      <section className="services-link"><Link className="text-link" href="/products">{t("productsAction")} <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
