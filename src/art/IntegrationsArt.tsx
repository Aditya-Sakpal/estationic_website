import { Database } from "lucide-react";
import type { ReactNode } from "react";
import { BrandGlyph, EGlyph, Glyph, type Brand } from "../lib/glyphs";
import { Dot, INK, Line, OnFace, Packet, Prism, RED, Scene, pr, poly, useProj, type V3 } from "../lib/iso";

/*
 * The engine in a glass case on a black plinth, fed by the platforms it
 * publishes to on one side and the CRM it sits beside on the other.
 */

type Mark = { brand: Brand } | { icon: typeof Database };
const LEFT_MARKS: Mark[] = [{ brand: "meta" }, { brand: "instagram" }, { brand: "whatsapp" }];
const RIGHT_MARKS: Mark[] = [{ brand: "googleads" }, { brand: "google" }, { icon: Database }];

/* Wide spreads the platforms out to either side. On a phone the same picture
   would print its marks about ten pixels tall, so compact stacks them instead:
   Meta's family above the case, Google's and the CRM below it. */
const LIFT = 1.7;

function FloatCube({ c, mark, CUBE }: { c: [number, number]; mark: Mark; CUBE: number }) {
  const p = useProj();
  const [cx, cy] = c;
  const at: V3 = [cx - CUBE / 2, cy - CUBE / 2, LIFT];
  const [fx, fy] = [cx - CUBE / 2 + 0.45, cy - CUBE / 2 + 0.2];
  const foot = [
    pr(p, fx, fy, 0),
    pr(p, fx + CUBE, fy, 0),
    pr(p, fx + CUBE, fy + CUBE, 0),
    pr(p, fx, fy + CUBE, 0),
  ];
  const s = CUBE * 0.46;
  return (
    <g>
      <path d={poly(foot)} fill="rgba(0,0,0,0.05)" />
      <Line pts={[[cx, cy, 0], [cx, cy, LIFT]]} sw={1.2} stroke="#9a9a9a" />
      <Prism at={at} size={[CUBE, CUBE, CUBE]} r={0.12} mat="white" />
      <OnFace face="right" o={[at[0] + CUBE, at[1] + CUBE, at[2] + CUBE]}>
        {"brand" in mark ? (
          <BrandGlyph brand={mark.brand} x={(CUBE - s) / 2} y={(CUBE - s) / 2} size={s} color={INK} />
        ) : (
          <Glyph icon={mark.icon} x={(CUBE - s) / 2} y={(CUBE - s) / 2} size={s} color={INK} sw={2} />
        )}
      </OnFace>
    </g>
  );
}

function GlassCase({ at, size, children }: { at: V3; size: V3; children: ReactNode }) {
  const p = useProj();
  const [x0, y0, z0] = at;
  const [x1, y1, z1] = [x0 + size[0], y0 + size[1], z0 + size[2]];
  const P = (x: number, y: number, z: number) => pr(p, x, y, z);
  const back = [
    [P(x0, y0, z0), P(x1, y0, z0)],
    [P(x0, y0, z0), P(x0, y1, z0)],
    [P(x0, y0, z0), P(x0, y0, z1)],
  ];
  const front = [
    [P(x1, y0, z0), P(x1, y1, z0)],
    [P(x0, y1, z0), P(x1, y1, z0)],
    [P(x1, y0, z0), P(x1, y0, z1)],
    [P(x0, y1, z0), P(x0, y1, z1)],
    [P(x1, y1, z0), P(x1, y1, z1)],
    [P(x0, y0, z1), P(x1, y0, z1)],
    [P(x0, y0, z1), P(x0, y1, z1)],
    [P(x1, y0, z1), P(x1, y1, z1)],
    [P(x0, y1, z1), P(x1, y1, z1)],
  ];
  const faces = [
    [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)],
    [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)],
    [P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)],
  ];
  return (
    <g>
      {back.map((e, i) => (
        <path key={i} d={poly(e, false)} stroke="#c8c8c8" strokeWidth={1} strokeDasharray="3 3" fill="none" />
      ))}
      {children}
      {faces.map((f, i) => (
        <path key={i} d={poly(f)} fill={i === 0 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"} />
      ))}
      {front.map((e, i) => (
        <path key={i} d={poly(e, false)} stroke="#7d7d7d" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      ))}
    </g>
  );
}

type Group = { c: [number, number]; mark: Mark }[];

function layout(compact: boolean): { back: Group; front: Group; wiresIn: V3[][]; wiresOut: V3[][]; cube: number; w: number; h: number } {
  if (compact) {
    // the back row sits far enough behind the case to clear its top edge,
    // and each row keeps a gap between its cubes
    const back: Group = [
      [-12, -6],
      [-9, -9],
      [-6, -12],
    ].map((c, i) => ({ c: c as [number, number], mark: LEFT_MARKS[i] }));
    const front: Group = [
      [3, 9],
      [6, 6],
      [9, 3],
    ].map((c, i) => ({ c: c as [number, number], mark: RIGHT_MARKS[i] }));
    return {
      back,
      front,
      // only the near row is wired, so every wire visibly ends at the plinth
      wiresIn: [],
      wiresOut: [
        [
          [3, 9, 0],
          [3, 3.3, 0],
        ],
        [
          [6, 6, 0],
          [6, 1.6, 0],
          [3.3, 1.6, 0],
        ],
        [
          [9, 3, 0],
          [3.3, 3, 0],
        ],
      ],
      cube: 2.6,
      w: 360,
      h: 540,
    };
  }
  const LX = -5.2;
  const RX = 10.2;
  const back: Group = [14.4, 10.6, 6.8].map((y, i) => ({ c: [LX, y], mark: LEFT_MARKS[i] }));
  const front: Group = [-2.6, -6.4, -10.2].map((y, i) => ({ c: [RX, y], mark: RIGHT_MARKS[i] }));
  return {
    back,
    front,
    wiresIn: back.map(({ c: [, y] }) => [
      [LX, y, 0],
      [-3.9, y, 0],
      [-3.9, 1.4, 0],
      [-3.3, 1.4, 0],
    ]),
    wiresOut: front.map(({ c: [, y] }) => [
      [RX, y, 0],
      [5.4, y, 0],
      [5.4, -1.4, 0],
      [3.3, -1.4, 0],
    ]),
    cube: 2.3,
    w: 1160,
    h: 500,
  };
}

export function IntegrationsArt({ compact = false }: { compact?: boolean }) {
  const L = layout(compact);
  const wiresL = L.wiresIn;
  const wiresR = L.wiresOut;
  const cube = 2.5;
  return (
    <Scene
      key={compact ? "compact" : "wide"}
      w={L.w}
      h={L.h}
      s={33}
      ox={560}
      oy={250}
      fit
      pad={compact ? 8 : 20}
      label="The Estationic engine in a glass case, connected to Meta, Instagram and WhatsApp on one side and Google Ads, Google and your CRM on the other."
    >
      {[...wiresL, ...wiresR].map((w, i) => (
        <g key={i}>
          <Line pts={w} />
          {w.slice(1, -1).map((q, k) => (
            <Dot key={k} at={q} r={3.4} />
          ))}
        </g>
      ))}
      {wiresL.map((w, i) => (
        <Packet key={`l${i}`} pts={w} dur={3.2} begin={i * 0.9} r={3} fill={RED} />
      ))}
      {wiresR.map((w, i) => (
        <Packet key={`r${i}`} pts={[...w].reverse()} dur={3.2} begin={0.45 + i * 0.9} r={3} fill={INK} />
      ))}
      {L.back.map((c) => (
        <FloatCube key={c.c.join()} c={c.c} mark={c.mark} CUBE={L.cube} />
      ))}
      <Prism at={[-3.3, -3.3, 0]} size={[6.6, 6.6, 1.0]} r={0.2} mat="ink" />
      <GlassCase at={[-3.0, -3.0, 1.0]} size={[6.0, 6.0, 5.6]}>
        <Prism at={[-2.0, -2.0, 1.0]} size={[4.0, 4.0, 0.45]} r={0.3} mat="white" />
        <g className="float">
          <Prism at={[-cube / 2, -cube / 2, 2.25]} size={[cube, cube, cube]} r={0.18} mat="red" />
          <OnFace face="left" o={[-cube / 2, cube / 2, 2.25 + cube]}>
            <EGlyph x={cube / 2} y={cube / 2} h={cube * 0.48} />
          </OnFace>
          <OnFace face="right" o={[cube / 2, cube / 2, 2.25 + cube]}>
            <EGlyph x={cube / 2} y={cube / 2} h={cube * 0.48} />
          </OnFace>
        </g>
      </GlassCase>
      {L.front.map((c) => (
        <FloatCube key={c.c.join()} c={c.c} mark={c.mark} CUBE={L.cube} />
      ))}
    </Scene>
  );
}
