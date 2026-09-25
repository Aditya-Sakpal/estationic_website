/*
 * Isometric line-art toolkit.
 *
 * World units are projected with true isometric angles (30 degrees). The camera
 * looks down the (1, 1, 1) diagonal, so the faces it sees are the top (+z), the
 * left (+y) and the right (+x). Every illustration on the site is built from
 * these few primitives so line weight, shading and corner language stay one
 * family.
 */
import { createContext, useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export const C = Math.sqrt(3) / 2;
export const INK = "#1a1a1a";
export const RED = "#e2332a";

export type V3 = readonly [number, number, number];
type P2 = [number, number];

export interface Projection {
  s: number;
  ox: number;
  oy: number;
  still: boolean;
}

const Ctx = createContext<Projection>({ s: 20, ox: 0, oy: 0, still: false });
export const useProj = () => useContext(Ctx);

export function pr(p: Projection, x: number, y: number, z: number): P2 {
  return [(x - y) * C * p.s + p.ox, (x + y) * 0.5 * p.s - z * p.s + p.oy];
}

const r2 = (n: number) => Math.round(n * 100) / 100;
export const poly = (a: P2[], close = true) =>
  "M" + a.map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L") + (close ? "Z" : "");

/* ------------------------------------------------------------------ colour */

type RGBA = [number, number, number, number];
const hex = (h: string, a = 1): RGBA => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
  a,
];
const css = ([r, g, b, a]: RGBA) =>
  a >= 1
    ? `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`
    : `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${r2(a)})`;
const mix3 = (a: RGBA, b: RGBA, c: RGBA, wa: number, wb: number, wc: number): RGBA =>
  [0, 1, 2, 3].map((i) => a[i] * wa + b[i] * wb + c[i] * wc) as RGBA;

export interface Material {
  /** +z face */
  top: RGBA;
  /** faces turned to +y, the left of the screen */
  left: RGBA;
  /** faces turned to +x, the right of the screen */
  right: RGBA;
  /** the big face of an upright panel */
  capLeft: RGBA;
  capRight: RGBA;
  stroke: string;
}

export const MAT = {
  white: {
    top: hex("#ffffff"),
    left: hex("#f1f1f1"),
    right: hex("#e1e1e1"),
    capLeft: hex("#fdfdfd"),
    capRight: hex("#f7f7f7"),
    stroke: INK,
  },
  paper: {
    top: hex("#fbfbfb"),
    left: hex("#eeeeee"),
    right: hex("#dedede"),
    capLeft: hex("#fafafa"),
    capRight: hex("#f3f3f3"),
    stroke: INK,
  },
  ink: {
    top: hex("#232323"),
    left: hex("#161616"),
    right: hex("#0b0b0b"),
    capLeft: hex("#1b1b1b"),
    capRight: hex("#141414"),
    stroke: "#050505",
  },
  red: {
    top: hex(RED),
    left: hex("#c82a22"),
    right: hex("#a3201a"),
    capLeft: hex("#d62f26"),
    capRight: hex("#c52a22"),
    stroke: INK,
  },
  ghost: {
    top: hex("#ffffff", 0.9),
    left: hex("#f6f6f6", 0.9),
    right: hex("#efefef", 0.9),
    capLeft: hex("#fcfcfc", 0.9),
    capRight: hex("#f8f8f8", 0.9),
    stroke: "#d2d2d2",
  },
} satisfies Record<string, Material>;

export type MatName = keyof typeof MAT;

/* ------------------------------------------------------------------- faces */

export type Face = "top" | "topA" | "left" | "right";

/**
 * The affine map from a face's own 2D coordinates (u right, v down, in world
 * units) onto the screen. "top" reads rising to the right, the way labels sit
 * on a tile in isometric drawings; "topA" reads falling to the right.
 */
export function faceMatrix(p: Projection, face: Face, o: V3) {
  const [ox, oy] = pr(p, o[0], o[1], o[2]);
  const s = p.s;
  let U: P2, V: P2;
  switch (face) {
    case "top":
      U = [C * s, -0.5 * s];
      V = [C * s, 0.5 * s];
      break;
    case "topA":
      U = [C * s, 0.5 * s];
      V = [-C * s, 0.5 * s];
      break;
    case "left":
      U = [C * s, 0.5 * s];
      V = [0, s];
      break;
    case "right":
      U = [C * s, -0.5 * s];
      V = [0, s];
      break;
  }
  return `matrix(${r2(U[0])} ${r2(U[1])} ${r2(V[0])} ${r2(V[1])} ${r2(ox)} ${r2(oy)})`;
}

export function OnFace({
  face,
  o,
  children,
  className,
}: {
  face: Face;
  o: V3;
  children: ReactNode;
  className?: string;
}) {
  const p = useProj();
  return (
    <g transform={faceMatrix(p, face, o)} className={className}>
      {children}
    </g>
  );
}

/* ------------------------------------------------------------------ prism */

type Axis = "x" | "y" | "z";
const AX: Record<Axis, [number, number, number]> = {
  // [in-plane a1, in-plane a2, extrusion]
  z: [0, 1, 2],
  y: [0, 2, 1],
  x: [1, 2, 0],
};

interface OutlinePt {
  a: [number, number];
  n: [number, number];
}

function outline(lo: [number, number], hi: [number, number], r: number, seg = 7): OutlinePt[] {
  const rr = Math.max(0, Math.min(r, (hi[0] - lo[0]) / 2, (hi[1] - lo[1]) / 2));
  const centres: [number, number, number][] = [
    [hi[0] - rr, hi[1] - rr, 0],
    [lo[0] + rr, hi[1] - rr, 90],
    [lo[0] + rr, lo[1] + rr, 180],
    [hi[0] - rr, lo[1] + rr, 270],
  ];
  const out: OutlinePt[] = [];
  for (const [cx, cy, a0] of centres) {
    const n = rr === 0 ? 1 : seg;
    for (let i = 0; i <= n; i++) {
      const t = ((a0 + (90 * i) / n) * Math.PI) / 180;
      out.push({ a: [cx + rr * Math.cos(t), cy + rr * Math.sin(t)], n: [Math.cos(t), Math.sin(t)] });
    }
  }
  return out;
}

/** A chamfered octagon, each edge given as its two end points sharing one normal. */
function octagon(lo: [number, number], hi: [number, number]): OutlinePt[] {
  const c = Math.min(hi[0] - lo[0], hi[1] - lo[1]) * 0.29;
  const v: [number, number][] = [
    [hi[0], hi[1] - c],
    [hi[0] - c, hi[1]],
    [lo[0] + c, hi[1]],
    [lo[0], hi[1] - c],
    [lo[0], lo[1] + c],
    [lo[0] + c, lo[1]],
    [hi[0] - c, lo[1]],
    [hi[0], lo[1] + c],
  ];
  const out: OutlinePt[] = [];
  for (let i = 0; i < v.length; i++) {
    const a = v[i];
    const b = v[(i + 1) % v.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy);
    const n: [number, number] = [dy / l, -dx / l];
    out.push({ a, n }, { a: b, n });
  }
  return out;
}

function hull(points: P2[]): P2[] {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (p.length < 3) return p;
  const cross = (o: P2, a: P2, b: P2) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: P2[] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: P2[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

export interface PrismProps {
  /** the minimum corner */
  at: V3;
  /** extent along x, y and z */
  size: V3;
  /** the direction the shape is extruded in; its far cap is the face you see */
  axis?: Axis;
  r?: number;
  mat?: MatName | Material;
  sw?: number;
  /** draw the hard front edge (on by default for sharp boxes) */
  edge?: boolean;
  /** the face the cap content is laid on, for a z prism */
  orient?: "top" | "topA";
  shape?: "rect" | "oct";
  capFill?: string;
  /** content drawn on the visible cap, in that cap's own world units */
  children?: ReactNode;
  className?: string;
}

export function Prism({
  at,
  size,
  axis = "z",
  r = 0,
  mat = "white",
  sw = 1.3,
  edge,
  orient = "top",
  capFill,
  shape = "rect",
  children,
  className,
}: PrismProps) {
  const p = useProj();
  const m: Material = typeof mat === "string" ? MAT[mat] : mat;
  const [i1, i2, ia] = AX[axis];
  const lo: [number, number] = [at[i1], at[i2]];
  const hi: [number, number] = [at[i1] + size[i1], at[i2] + size[i2]];
  const a0 = at[ia];
  const a1 = at[ia] + size[ia];
  const ring = shape === "oct" ? octagon(lo, hi) : outline(lo, hi, r);

  const P = (pt: [number, number], av: number): P2 => {
    const v = [0, 0, 0];
    v[i1] = pt[0];
    v[i2] = pt[1];
    v[ia] = av;
    return pr(p, v[0], v[1], v[2]);
  };
  const N3 = (n: [number, number]) => {
    const v = [0, 0, 0];
    v[i1] = n[0];
    v[i2] = n[1];
    return v;
  };

  const base = ring.map((q) => P(q.a, a0));
  const top = ring.map((q) => P(q.a, a1));

  const quads: { d: string; fill: string }[] = [];
  for (let i = 0; i < ring.length; i++) {
    const j = (i + 1) % ring.length;
    const nx = ring[i].n[0] + ring[j].n[0];
    const ny = ring[i].n[1] + ring[j].n[1];
    const len = Math.hypot(nx, ny) || 1;
    const n = N3([nx / len, ny / len]);
    if (n[0] + n[1] + n[2] <= 1e-6) continue;
    const dx = Math.abs(ring[i].a[0] - ring[j].a[0]) + Math.abs(ring[i].a[1] - ring[j].a[1]);
    if (dx < 1e-6) continue;
    const fill = css(mix3(m.right, m.left, m.top, n[0] * n[0], n[1] * n[1], n[2] * n[2]));
    quads.push({ d: poly([base[i], base[j], top[j], top[i]]), fill });
  }

  const sil = hull([...base, ...top]);
  const cap =
    capFill ??
    css(axis === "z" ? m.top : axis === "y" ? m.capLeft : m.capRight);

  const sharp = edge ?? (shape === "oct" || r < 0.2);
  const edgeLines: string[] = [];
  if (sharp && shape === "oct") {
    // a vertical edge wherever two visible faces meet
    const vis = (n: [number, number]) => {
      const q = N3(n);
      return q[0] + q[1] + q[2] > 1e-6;
    };
    for (let i = 1; i < ring.length; i += 2) {
      const j = (i + 1) % ring.length;
      if (vis(ring[i].n) && vis(ring[j].n)) edgeLines.push(poly([base[i], top[i]], false));
    }
  } else if (sharp) {
    const k = ring.findIndex((q) => q.n[0] > 0.6 && q.n[1] > 0.6);
    const idx = k >= 0 ? k : 0;
    edgeLines.push(poly([base[idx], top[idx]], false));
  }

  let capO: V3;
  let face: Face;
  const [x0, y0, z0] = at;
  const [sx, sy, sz] = size;
  if (axis === "z") {
    face = orient;
    capO = orient === "top" ? [x0, y0 + sy, z0 + sz] : [x0, y0, z0 + sz];
  } else if (axis === "y") {
    face = "left";
    capO = [x0, y0 + sy, z0 + sz];
  } else {
    face = "right";
    capO = [x0 + sx, y0 + sy, z0 + sz];
  }

  return (
    <g className={className} strokeLinejoin="round" strokeLinecap="round">
      {quads.map((q, i) => (
        <path key={i} d={q.d} fill={q.fill} stroke={q.fill} strokeWidth={0.6} />
      ))}
      {edgeLines.map((d, i) => (
        <path key={`e${i}`} d={d} stroke={m.stroke} strokeWidth={sw * 0.85} fill="none" />
      ))}
      <path d={poly(sil)} fill="none" stroke={m.stroke} strokeWidth={sw} />
      <path d={poly(top)} fill={cap} stroke={m.stroke} strokeWidth={sw} />
      {children && <g transform={faceMatrix(p, face, capO)}>{children}</g>}
    </g>
  );
}

/** A flat rounded rectangle lying on a plane: a label plate, a slot, a floor mark. */
export function Flat({
  face,
  o,
  w,
  h,
  r = 0,
  fill = "none",
  stroke = INK,
  sw = 1.2,
  dash,
  className,
}: {
  face: Face;
  o: V3;
  w: number;
  h: number;
  r?: number;
  fill?: string;
  stroke?: string;
  sw?: number;
  dash?: string;
  className?: string;
}) {
  const p = useProj();
  // Stroke widths inside a face matrix are in world units; convert from pixels.
  return (
    <g transform={faceMatrix(p, face, o)} className={className}>
      <rect
        width={w}
        height={h}
        rx={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={sw / p.s}
        strokeDasharray={dash}
      />
    </g>
  );
}

/* ------------------------------------------------------------ ground marks */

export function Shadow({ at, size, r = 0, lift = 0.9, opacity = 0.055 }: { at: V3; size: V3; r?: number; lift?: number; opacity?: number }) {
  const p = useProj();
  const ring = outline([at[0], at[1]], [at[0] + size[0], at[1] + size[1]], r);
  const d = size[2] * lift;
  const pts: P2[] = [];
  for (const q of ring) {
    pts.push(pr(p, q.a[0], q.a[1], at[2]));
    pts.push(pr(p, q.a[0] + d * 0.55, q.a[1] + d * 0.15, at[2]));
  }
  return <path d={poly(hull(pts))} fill={`rgba(0,0,0,${opacity})`} />;
}

export function Line({
  pts,
  sw = 1.2,
  stroke = INK,
  dash,
  className,
  opacity,
}: {
  pts: V3[];
  sw?: number;
  stroke?: string;
  dash?: string;
  className?: string;
  opacity?: number;
}) {
  const p = useProj();
  return (
    <path
      d={poly(pts.map((q) => pr(p, q[0], q[1], q[2])), false)}
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
      strokeDasharray={dash}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      opacity={opacity}
    />
  );
}

export function Dot({ at, r = 3.6, fill = INK, ring }: { at: V3; r?: number; fill?: string; ring?: boolean }) {
  const p = useProj();
  const [x, y] = pr(p, at[0], at[1], at[2]);
  return ring ? (
    <circle cx={x} cy={y} r={r} fill="#fff" stroke={fill} strokeWidth={1.3} />
  ) : (
    <circle cx={x} cy={y} r={r} fill={fill} />
  );
}

/** A dot that travels a ground path forever. Rendered only when motion is allowed. */
export function Packet({
  pts,
  dur = 3,
  begin = 0,
  r = 3,
  fill = INK,
}: {
  pts: V3[];
  dur?: number;
  begin?: number;
  r?: number;
  fill?: string;
}) {
  const p = useProj();
  if (p.still) return null;
  const d = poly(pts.map((q) => pr(p, q[0], q[1], q[2])), false);
  return (
    <circle className="pk" r={r} fill={fill} opacity={0}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
      <animate
        attributeName="opacity"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        values="0;1;1;0"
        keyTimes="0;0.12;0.85;1"
      />
    </circle>
  );
}

/** Screen-space offset of a world vector, for CSS motion along an iso axis. */
export function worldDelta(p: Projection, dx: number, dy: number, dz: number): P2 {
  return [(dx - dy) * C * p.s, (dx + dy) * 0.5 * p.s - dz * p.s];
}

/* ------------------------------------------------------------------ scene */

/**
 * An illustration. Its motion stops while it is off screen, and never starts
 * for somebody who asked their system for reduced motion.
 */
export function Scene({
  w,
  h,
  s,
  ox,
  oy,
  label,
  className,
  fit = false,
  pad = 16,
  children,
}: {
  w: number;
  h: number;
  s: number;
  ox: number;
  oy: number;
  label: string;
  className?: string;
  /** frame the drawing to its own bounds, keeping the w:h shape */
  fit?: boolean;
  pad?: number;
  children: ReactNode;
}) {
  const still = useReducedMotion() ?? false;
  const ref = useRef<SVGSVGElement>(null);
  const body = useRef<SVGGElement>(null);
  useLayoutEffect(() => {
    if (!fit || !ref.current || !body.current) return;
    // a packet sits at the origin until its motion starts, so it is left out
    const packets = [...body.current.querySelectorAll<SVGElement>(".pk")];
    packets.forEach((el) => (el.style.display = "none"));
    const b = body.current.getBBox();
    packets.forEach((el) => (el.style.display = ""));
    const A = w / h;
    let vw = b.width + pad * 2;
    let vh = b.height + pad * 2;
    if (vw / vh > A) vh = vw / A;
    else vw = vh * A;
    const vx = b.x + b.width / 2 - vw / 2;
    const vy = b.y + b.height / 2 - vh / 2;
    ref.current.setAttribute("viewBox", `${r2(vx)} ${r2(vy)} ${r2(vw)} ${r2(vh)}`);
  }, [fit, pad, w, h]);
  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.remove("is-paused");
          el.unpauseAnimations();
        } else {
          el.classList.add("is-paused");
          el.pauseAnimations();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [still]);
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      className={className ? `iso ${className}` : "iso"}
      role="img"
      aria-label={label}
      fontFamily="'Inter Variable', Inter, system-ui, sans-serif"
    >
      <Ctx.Provider value={{ s, ox, oy, still }}>
        <g ref={body}>{children}</g>
      </Ctx.Provider>
    </svg>
  );
}
