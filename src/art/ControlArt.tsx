import { Check, MapPin, PhoneCall, RefreshCw, User } from "lucide-react";
import { Glyph } from "../lib/glyphs";
import { Dot, INK, Line, OnFace, Packet, Prism, RED, Scene, Shadow, useProj, type V3 } from "../lib/iso";
import { CardR, EBox } from "../lib/parts";

/*
 * Work leaves the engine on three routes: to what runs by itself, to the
 * approval gate, and to your team's desk. Wide, left to right, they line up
 * with the three columns set under the picture. Compact, for a phone, they
 * zigzag down the column in the same order so each object stays readable.
 */

type P2 = [number, number];
const SLAB = 3.6;

const LAYOUT = {
  wide: {
    hub: [-2.5, -2.5] as P2,
    a: [-3.6, 6.6] as P2,
    b: [3.6, 3.6] as P2,
    c: [6.6, -3.6] as P2,
    routes: [
      [[-3.1, -1.2], [-3.1, 1.8], [-3.1, 4.8]],
      [[-1.2, -1.9], [3.6, -1.9], [3.6, 1.8]],
      [[-1.2, -3.1], [1.8, -3.1], [4.8, -3.1]],
    ] as P2[][],
    w: 1160,
    h: 380,
  },
  compact: {
    hub: [-2.5, -2.5] as P2,
    a: [1.0, 5.0] as P2,
    b: [7.0, 3.0] as P2,
    c: [6.2, 10.2] as P2,
    routes: [
      [[-2.0, -1.2], [-2.0, 5.0], [-0.8, 5.0]],
      [[-1.2, -2.0], [7.0, -2.0], [7.0, 1.2]],
      [[-1.2, -1.5], [3.4, -1.5], [3.4, 10.2], [4.4, 10.2]],
    ] as P2[][],
    w: 400,
    h: 460,
  },
};

function Pad({ c }: { c: P2 }) {
  const at: V3 = [c[0] - SLAB / 2, c[1] - SLAB / 2, 0];
  return (
    <g>
      <Shadow at={at} size={[SLAB, SLAB, 0.5]} r={0.4} lift={1.4} />
      <Prism at={at} size={[SLAB, SLAB, 0.5]} r={0.4} mat="white" />
    </g>
  );
}

/** Runs on its own: three jobs on a loop. */
function Auto({ c }: { c: P2 }) {
  const p = useProj();
  const [x, y] = c;
  return (
    <g>
      <Pad c={c} />
      <OnFace face="top" o={[x - SLAB / 2, y + SLAB / 2, 0.5]}>
        <circle cx={SLAB / 2} cy={SLAB / 2} r={1.25} fill="none" stroke="#cfcfcf" strokeWidth={1.2 / p.s} strokeDasharray="0.16 0.14" />
      </OnFace>
      <CardR at={[x - 1.35, y - 1.35, 0.5]} w={1.2} h={1.35} t={0.22} mat="ink" icon={PhoneCall} scale={0.52} />
      <CardR at={[x - 0.2, y - 0.75, 0.5]} w={1.2} h={1.35} t={0.22} mat="ink" brand="whatsapp" scale={0.52} />
      <CardR at={[x + 0.85, y - 0.1, 0.5]} w={1.2} h={1.35} t={0.22} mat="ink" icon={MapPin} scale={0.52} />
      <Prism at={[x + 0.2, y + 0.9, 0.5]} size={[1.0, 1.0, 0.16]} r={0.2} mat="paper" sw={1}>
        <Glyph icon={RefreshCw} x={0.2} y={0.2} size={0.6} color={INK} sw={2.2} />
      </Prism>
    </g>
  );
}

/** Waits for your approval: a gate with a post held in front of it. */
function Gate({ c }: { c: P2 }) {
  const [x, y] = c;
  return (
    <g>
      <Pad c={c} />
      <Prism at={[x - 1.5, y - 1.4, 0.5]} size={[0.3, 0.3, 2.3]} mat="ink" sw={1.1} />
      <Prism at={[x - 1.5, y + 1.1, 0.5]} size={[0.3, 0.3, 2.3]} mat="ink" sw={1.1} />
      <Prism at={[x - 1.45, y - 1.3, 2.35]} size={[0.2, 2.6, 0.26]} mat="white" sw={1.1} />
      <Prism at={[x + 0.1, y - 0.75, 0.5]} size={[0.22, 1.5, 1.9]} axis="x" r={0.14} mat="white" sw={1.1}>
        <rect x={0.14} y={0.14} width={1.22} height={0.9} rx={0.06} fill="#e3e3e3" />
        <circle cx={0.75} cy={1.45} r={0.2} fill="none" stroke={RED} strokeWidth={0.06} strokeDasharray="0.1 0.08" />
      </Prism>
      <Prism at={[x + 0.9, y + 0.6, 0.5]} size={[0.9, 0.9, 0.16]} r={0.45} mat="ink" sw={1}>
        <Check x={0.2} y={0.2} size={0.5} color="#fff" strokeWidth={3} aria-hidden />
      </Prism>
    </g>
  );
}

/** Your team owns: a desk with two people at it. */
function Desk({ c }: { c: P2 }) {
  const [x, y] = c;
  return (
    <g>
      <Pad c={c} />
      <Prism at={[x - 1.2, y - 1.3, 0.5]} size={[1.3, 2.6, 0.75]} r={0.1} mat="paper" sw={1.1} />
      <Prism at={[x - 1.05, y - 1.1, 1.25]} size={[0.14, 1.1, 0.75]} axis="x" r={0.06} mat="ink" sw={1} />
      <CardR at={[x + 0.5, y - 1.2, 0.5]} w={1.1} h={1.5} t={0.22} mat="white" icon={User} scale={0.55} />
      <CardR at={[x + 0.5, y + 0.1, 0.5]} w={1.1} h={1.5} t={0.22} mat="white" icon={User} scale={0.55} />
    </g>
  );
}

export function ControlArt({ compact = false }: { compact?: boolean }) {
  const L = compact ? LAYOUT.compact : LAYOUT.wide;
  const routes: V3[][] = L.routes.map((r) => r.map(([x, y]) => [x, y, 0] as V3));
  const [hx, hy] = L.hub;
  // back to front, so nearer objects overlap farther ones
  const dests = [
    { key: "a", c: L.a, el: <Auto c={L.a} /> },
    { key: "b", c: L.b, el: <Gate c={L.b} /> },
    { key: "c", c: L.c, el: <Desk c={L.c} /> },
  ].sort((m, n) => m.c[0] + m.c[1] - (n.c[0] + n.c[1]));
  return (
    <Scene
      key={compact ? "compact" : "wide"}
      w={L.w}
      h={L.h}
      s={30}
      ox={L.w / 2}
      oy={170}
      fit
      pad={compact ? 8 : 12}
      className="control-art"
      label="Work leaves the Estationic engine on three routes: calls, messages and reminders that run on their own; posts and offers held at an approval gate; and conversations handed to your team's desk."
    >
      {routes.map((r, i) => (
        <g key={i}>
          <Line pts={r} />
          {r.slice(1, -1).map((q, k) => (
            <Dot key={k} at={q} r={3.2} />
          ))}
        </g>
      ))}
      <Packet pts={routes[0]} dur={2.2} fill={RED} />
      <Packet pts={routes[0]} dur={2.2} begin={1.1} fill={RED} />
      <Packet pts={routes[1]} dur={2.6} begin={0.4} fill={RED} />
      <Packet pts={routes[2]} dur={3.2} begin={0.9} fill={RED} />
      <Shadow at={[hx - 1.3, hy - 1.3, 0]} size={[2.6, 2.6, 2.1]} r={0.3} lift={0.8} />
      <Prism at={[hx - 1.3, hy - 1.3, 0]} size={[2.6, 2.6, 2.1]} r={0.3} mat="ink" />
      <EBox at={[hx - 0.85, hy - 0.85, 2.1]} size={[1.7, 1.7, 0.42]} r={0.2} />
      {dests.map((d) => (
        <g key={d.key}>{d.el}</g>
      ))}
    </Scene>
  );
}
