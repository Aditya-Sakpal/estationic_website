/* Compound pieces shared by every illustration. */
import type { LucideIcon } from "lucide-react";
import { EGlyph, Glyph, BrandGlyph, type Brand } from "./glyphs";
import { MAT, OnFace, Prism, pr, poly, useProj, type Material, type MatName, type V3 } from "./iso";

/** The brand's red box with the white E on its top. */
export function EBox({ at, size, r = 0.2 }: { at: V3; size: V3; r?: number }) {
  const [sx, sy] = size;
  return (
    <Prism at={at} size={size} r={r} mat="red">
      <EGlyph x={sy / 2} y={sx / 2} h={Math.min(sx, sy) * 0.52} />
    </Prism>
  );
}

/** A red cube carrying the E on both faces the viewer sees. */
export function ECube({ at, size }: { at: V3; size: V3 }) {
  const [x0, y0, z0] = at;
  const [sx, sy, sz] = size;
  const h = Math.min(sx, sy, sz) * 0.5;
  return (
    <g>
      <Prism at={at} size={size} mat="red" sw={1.2} />
      <OnFace face="left" o={[x0, y0 + sy, z0 + sz]}>
        <EGlyph x={sx / 2} y={sz / 2} h={h} />
      </OnFace>
      <OnFace face="right" o={[x0 + sx, y0 + sy, z0 + sz]}>
        <EGlyph x={sy / 2} y={sz / 2} h={h} />
      </OnFace>
    </g>
  );
}

type Mark = { icon?: LucideIcon; brand?: Brand };

function MarkIn({ icon, brand, w, h, color, scale = 0.46 }: Mark & { w: number; h: number; color: string; scale?: number }) {
  const size = Math.min(w, h) * scale;
  const x = (w - size) / 2;
  const y = (h - size) / 2;
  if (brand) return <BrandGlyph brand={brand} x={x} y={y} size={size} color={color} />;
  if (icon) return <Glyph icon={icon} x={x} y={y} size={size} color={color} sw={2} />;
  return null;
}

/** An upright card facing the right of the screen, with one mark on it. */
export function CardR({
  at,
  w = 2.1,
  h = 2.2,
  t = 0.3,
  mat = "ink",
  scale,
  ...mark
}: Mark & { at: V3; w?: number; h?: number; t?: number; mat?: MatName | Material; scale?: number }) {
  const color = mat === "ink" ? "#fff" : "#1a1a1a";
  return (
    <Prism at={at} size={[t, w, h]} axis="x" r={0.26} mat={mat}>
      <MarkIn {...mark} w={w} h={h} color={color} scale={scale} />
    </Prism>
  );
}

/** An upright card facing the left of the screen. */
export function CardL({
  at,
  w = 2.1,
  h = 2.2,
  t = 0.3,
  mat = "white",
  scale,
  ...mark
}: Mark & { at: V3; w?: number; h?: number; t?: number; mat?: MatName | Material; scale?: number }) {
  const color = mat === "ink" ? "#fff" : "#1a1a1a";
  return (
    <Prism at={at} size={[w, t, h]} axis="y" r={0.26} mat={mat}>
      <MarkIn {...mark} w={w} h={h} color={color} scale={scale} />
    </Prism>
  );
}

/** A tile lying flat, with one mark set on its top. */
export function Tile({
  at,
  size,
  mat = "white",
  r = 0.35,
  scale = 0.42,
  ...mark
}: Mark & { at: V3; size: V3; mat?: MatName | Material; r?: number; scale?: number }) {
  const color = mat === "ink" ? "#fff" : "#1a1a1a";
  return (
    <Prism at={at} size={size} r={r} mat={mat}>
      <MarkIn {...mark} w={size[1]} h={size[0]} color={color} scale={scale} />
    </Prism>
  );
}

/** White top, black sides: the finished-state tile. */
export const INKED: Material = {
  ...MAT.ink,
  top: MAT.white.top,
  stroke: "#050505",
};

/** A soft vertical glow rising from a footprint, drawn as a fading prism. */
export function Beam({ at, size, height, id }: { at: V3; size: V3; height: number; id: string }) {
  const p = useProj();
  const [x0, y0, z0] = at;
  const [sx, sy] = size;
  // the front silhouette of a vertical box: left, front and right corners
  const [xa, ya] = pr(p, x0, y0 + sy, z0);
  const [xb, yb] = pr(p, x0 + sx, y0 + sy, z0);
  const [xc, yc] = pr(p, x0 + sx, y0, z0);
  const d = poly([
    [xa, ya],
    [xb, yb],
    [xc, yc],
    [xc, yc - height * p.s],
    [xb, yb - height * p.s],
    [xa, ya - height * p.s],
  ]);
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#8a8a8a" stopOpacity="0.3" />
          <stop offset="1" stopColor="#8a8a8a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
    </g>
  );
}
