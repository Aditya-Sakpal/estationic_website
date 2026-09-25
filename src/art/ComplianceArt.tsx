import { BadgeCheck, Clock, FileBadge, Image, QrCode, ScrollText, type LucideIcon } from "lucide-react";
import { Dot, Line, OnFace, Packet, Prism, RED, Scene, Shadow, useProj, type V3 } from "../lib/iso";
import { CardL, CardR, EBox } from "../lib/parts";

/*
 * The checks, as a hub: every satellite is one control the engine runs before
 * anything reaches a buyer. The open accordion item inks its satellite.
 */

const HUB = { at: [-2.6, -2.6, 0] as V3, size: [5.2, 5.2, 0.8] as V3 };

interface Sat {
  icon: LucideIcon;
  /** slab centre on the ground */
  c: [number, number];
  /** which way its card faces */
  face: "l" | "r";
  /** the wire, as a list of ground points from the hub edge */
  wire: [number, number][];
}

const SATS: Sat[] = [
  { icon: FileBadge, c: [-7.6, -1.2], face: "r", wire: [[-2.6, -1.2], [-6.1, -1.2]] },
  { icon: BadgeCheck, c: [-3.2, -8.2], face: "l", wire: [[-1.2, -2.6], [-1.2, -5.1], [-3.2, -5.1], [-3.2, -6.7]] },
  { icon: Image, c: [3.4, -7.4], face: "l", wire: [[1.2, -2.6], [1.2, -4.4], [3.4, -4.4], [3.4, -5.9]] },
  { icon: QrCode, c: [7.8, 1.2], face: "r", wire: [[2.6, 1.2], [6.3, 1.2]] },
  { icon: Clock, c: [1.4, 7.8], face: "l", wire: [[1.4, 2.6], [1.4, 6.3]] },
  { icon: ScrollText, c: [-6.0, 5.4], face: "r", wire: [[-1.2, 2.6], [-1.2, 5.4], [-4.5, 5.4]] },
];

function Satellite({ s, hot }: { s: Sat; hot: boolean }) {
  const p = useProj();
  const at: V3 = [s.c[0] - 1.5, s.c[1] - 1.5, 0];
  const size: V3 = [3, 3, 0.55];
  const card = s.face === "r"
    ? { at: [s.c[0] - 0.2, s.c[1] - 0.95, 0.55] as V3 }
    : { at: [s.c[0] - 0.95, s.c[1] - 0.2, 0.55] as V3 };
  const Card = s.face === "r" ? CardR : CardL;
  return (
    <g>
      <Shadow at={at} size={size} r={0.4} lift={1.6} />
      <Prism at={at} size={size} r={0.4} mat="white" />
      {hot && !p.still && (
        <OnFace face="top" o={[at[0], at[1] + 3, 0.55]}>
          <rect className="iso-pulse" x={0.35} y={0.35} width={2.3} height={2.3} rx={0.4} fill="none" stroke={RED} strokeWidth={1.6 / p.s} />
        </OnFace>
      )}
      <g>
        <Card at={card.at} w={1.9} h={2} t={0.3} mat="white" icon={s.icon} scale={0.5} />
        <g className="swap" style={{ opacity: hot ? 1 : 0 }}>
          <Card at={card.at} w={1.9} h={2} t={0.3} mat="ink" icon={s.icon} scale={0.5} />
        </g>
      </g>
    </g>
  );
}

export function ComplianceArt({ active }: { active: number }) {
  const wires = SATS.map((s) => s.wire.map(([x, y]) => [x, y, 0] as V3));
  // draw far satellites first so nearer ones overlap them
  const order = SATS.map((_, i) => i).sort((a, b) => SATS[a].c[0] + SATS[a].c[1] - (SATS[b].c[0] + SATS[b].c[1]));
  const back = order.filter((i) => SATS[i].c[0] + SATS[i].c[1] < 0);
  const front = order.filter((i) => SATS[i].c[0] + SATS[i].c[1] >= 0);
  return (
    <Scene
      w={680}
      h={520}
      s={25}
      ox={330}
      oy={250}
      fit
      pad={18}
      label="The compliance checks around the Estationic engine: RERA registration, approved claims, approved pictures, registration details on every creative, consent and calling hours, and a record of every decision."
    >
      {wires.map((w, i) => (
        <g key={i}>
          <Line pts={w} opacity={i === active ? 1 : 0.55} />
          {w.slice(1, -1).map((q, k) => (
            <Dot key={k} at={q} r={3} />
          ))}
          <Dot at={w[w.length - 1]} r={3.4} ring />
        </g>
      ))}
      {wires.map((w, i) => (i === active ? <Packet key={`${i}-${active}`} pts={w} dur={1.8} fill={RED} r={3.2} /> : null))}
      {back.map((i) => (
        <Satellite key={i} s={SATS[i]} hot={i === active} />
      ))}
      <Shadow at={HUB.at} size={HUB.size} r={0.5} lift={1.4} />
      <Prism at={HUB.at} size={HUB.size} r={0.5} mat="white" />
      <Prism at={[-1.95, -1.95, 0.8]} size={[3.9, 3.9, 0.3]} r={0.4} mat="paper" />
      <EBox at={[-1.2, -1.2, 1.1]} size={[2.4, 2.4, 0.75]} r={0.24} />
      {front.map((i) => (
        <Satellite key={i} s={SATS[i]} hot={i === active} />
      ))}
    </Scene>
  );
}
