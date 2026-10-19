import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import atlasJson from "world-atlas/countries-110m.json";
import { useTranslations } from "next-intl";
import * as Flags from "country-flag-icons/react/3x2";
import { markets, type Market } from "@/content/countries";

type Atlas = Topology<{ countries: GeometryCollection }>;
const atlas = atlasJson as Atlas;
const countries = feature(atlas, atlas.objects.countries);
const width = 960;
const height = 480;
const projection = geoNaturalEarth1().fitSize([width, height], countries);
const path = geoPath(projection);

type Props = { locale: "ar" | "en" };

function MarketPin({ market, locale }: { market: Market; locale: "ar" | "en" }) {
  const t = useTranslations("landing.scenes.markets");
  const projected = projection(market.coordinates);
  if (!projected) return null;
  const [x, y] = projected;
  const Flag = market.flag ? Flags[market.flag as keyof typeof Flags] : null;
  const label = market.name[locale];
  return (
    <div
      className={`map-pin ${market.status === "current" ? "map-pin-current" : "map-pin-target"}${market.grouped ? " map-pin-grouped" : ""}`}
      style={{
        left: `${(x / width) * 100}%`,
        top: `${(y / height) * 100}%`,
        transform: `translate(calc(-50% + ${market.pinOffset?.[0] ?? 0}px), calc(-50% + ${market.pinOffset?.[1] ?? 0}px))`,
      }}
      title={label}
      aria-label={label}
    >
      {Flag ? <Flag aria-hidden="true" /> : <span>{market.name.en === "GCC" ? t("gccPin") : t("northAfricaPin")}</span>}
    </div>
  );
}

export function MarketMap({ locale }: Props) {
  const t = useTranslations("landing.scenes.markets");
  return (
    <section className="market-map-panel" aria-label={t("mapLabel")}>
      <div className="map-frame">
        <svg viewBox={`0 0 ${width} ${height}`} className="world-map" role="img" aria-label={t("worldMap")}>
          <path d={path(countries) ?? ""} className="world-land" />
        </svg>
        {markets.map((market) => <MarketPin key={`${market.name.en}-${market.status}`} market={market} locale={locale} />)}
      </div>
      <ul className="map-legend">
        <li><span className="legend-dot legend-current" />{t("current")}</li>
        <li><span className="legend-dot legend-target" />{t("target")}</li>
      </ul>
    </section>
  );
}
