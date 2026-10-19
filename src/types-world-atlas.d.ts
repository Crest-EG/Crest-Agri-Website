declare module "world-atlas/countries-110m.json" {
  import type { GeometryCollection, Topology } from "topojson-specification";
  const atlas: Topology<{ countries: GeometryCollection }>;
  export default atlas;
}
