import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/Button";
import { DirectionalArrow } from "@/components/DirectionalArrow";

export async function PrivateLabelSection({ id }: { id?: string }) {
  const t = await getTranslations("landing.home");

  return (
    <section id={id} className="home-private page-shell" aria-labelledby="private-title">
      <div className="home-private-copy">
        <p className="eyebrow">{t("privateEyebrow")}</p>
        <h2 id="private-title">{t("privateTitle")}</h2>
        <p>{t("privateBody")}</p>
        <ul>{(["privatePoint1", "privatePoint2", "privatePoint3"] as const).map((key) => <li key={key}>{t(key)}</li>)}</ul>
        <ButtonLink href="/contact#quote" variant="secondary">{t("privateLink")} <DirectionalArrow kind="forward" /></ButtonLink>
      </div>
      <div className="home-private-image">
        <Image src="/images/landing/private-label.webp" alt={t("privateImageAlt")} fill sizes="(max-width: 800px) 100vw, 48vw" />
      </div>
    </section>
  );
}
