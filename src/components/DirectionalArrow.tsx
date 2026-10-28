type DirectionalArrowProps = {
  kind: "external" | "forward" | "chevron";
};

const arrowGlyph: Record<DirectionalArrowProps["kind"], string> = {
  external: "↗",
  forward: "→",
  chevron: "›",
};

export function DirectionalArrow({ kind }: DirectionalArrowProps) {
  return <span className={`directional-arrow directional-arrow-${kind}`} aria-hidden="true">{arrowGlyph[kind]}</span>;
}
