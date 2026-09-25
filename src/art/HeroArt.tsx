import { Globe, KeyRound, PhoneCall, type LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Dot, Line, OnFace, Packet, Prism, RED, Scene, Shadow, pr, poly, useProj, worldDelta, type V3 } from "../lib/iso";
import { Beam, CardR, EBox, INKED } from "../lib/parts";
import { BrandGlyph, type Brand } from "../lib/glyphs";

/*
 * Leads from every channel ride a belt into the engine. What comes out is the
 * whole sales journey in three steps: a qualified lead, a booked site visit,
 * and a booking.
 */

const BELT = { x: -3.4, y: 0, len: 19.4, w: 3, h: 0.75 };
const PITCH = 3.88;
const ITEMS: ({ icon: LucideIcon } | { brand: Brand })[] = [
  { brand: "meta" },
  { brand: "instagram" },
  { brand: "google" },
  { brand: "whatsapp" },
  { icon: Globe },
];
const TRAVEL = PITCH * ITEMS.length;
const DUR = 22;

const M = { at: [15.6, -1.8, 0] as V3, size: [7.4, 7.2, 6.4] as V3 };
const MX = M.at[0] + M.size[0];
const MY = M.at[1] + M.size[1];
const MZ = M.size[2];

function Belt() {
  const p = useProj();
  const { x, y, len, w, h } = BELT;
  const top = [
    pr(p, x, y, h),
    pr(p, x + len, y, h),
    pr(p, x + len, y + w, h),
    pr(p, x, y + w, h),
  ];
  const [dx, dy] = worldDelta(p, 1.2, 0, 0);
  const slats = Array.from({ length: 19 }, (_, i) => x - 1.2 + i * 1.2);
  return (
    <g>
      <Shadow at={[x, y, 0]} size={[len, w, h]} r={0.35} lift={1.2} />
      <Prism at={[x, y, 0]} size={[len, w, h]} r={0.35} mat="white" />
      <defs>
        <clipPath id="belt-top">
          <path d={poly(top)} />
        </clipPath>
      </defs>
      <g clipPath="url(#belt-top)">
        <g
          className={p.still ? undefined : "iso-slide"}
          style={{ "--tx": `${dx}px`, "--ty": `${dy}px`, "--dur": `${(1.2 / TRAVEL) * DUR}s` } as CSSProperties}
        >
          {slats.map((sx) => (
            <path
              key={sx}
              d={poly([pr(p, sx, y + 0.18, h), pr(p, sx, y + w - 0.18, h)], false)}
              stroke="#d9d9d9"
              strokeWidth={1}
            />
          ))}
        </g>
      </g>
      {/* rollers along the belt's near side */}
      <OnFace face="left" o={[x, y + w, h]}>
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx={0.8 + i * 1.6} cy={h / 2} rx={0.13} ry={0.17} fill="#1a1a1a" />
        ))}
      </OnFace>
    </g>
  );
}

function Riders() {
  const p = useProj();
  const [tx, ty] = worldDelta(p, TRAVEL, 0, 0);
  return (
    <g>
      {ITEMS.map((it, i) => {
        const card = (
          <g>
            <CardR at={[BELT.x + 0.3, BELT.y + 0.45, BELT.h]} w={2.1} h={2.25} t={0.34} mat="ink" {...it} />
          </g>
        );
        if (p.still) {
          const [sx, sy] = worldDelta(p, i * PITCH + 0.6, 0, 0);
          return (
            <g key={i} transform={`translate(${sx} ${sy})`}>
              {card}
            </g>
          );
        }
        return (
          <g
            key={i}
            className="iso-ride"
            style={
              {
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                "--dur": `${DUR}s`,
                animationDelay: `${-(i / ITEMS.length) * DUR}s`,
              } as CSSProperties
            }
          >
            {card}
          </g>
        );
      })}
    </g>
  );
}

function Machine() {
  const p = useProj();
  const [x0, y0] = M.at;
  const [sx, sy] = M.size;
  const chip: V3 = [x0 + 2.35, y0 + 2.35, MZ + 0.36];
  return (
    <g>
      <Shadow at={M.at} size={M.size} r={0.3} lift={0.55} />
      <Prism at={M.at} size={M.size} r={0.3} mat="white" />
      {/* the near face: an inspection slot and a vent */}
      <OnFace face="left" o={[x0, MY, MZ]}>
        <rect x={0.95} y={1.55} width={2.3} height={3.9} rx={0.32} fill="#f6f6f6" stroke="#1a1a1a" strokeWidth={1.25 / p.s} />
        <rect x={1.2} y={1.8} width={1.8} height={3.4} rx={0.2} fill="none" stroke="#cfcfcf" strokeWidth={1 / p.s} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={4.3} x2={6.4} y1={1.7 + i * 0.42} y2={1.7 + i * 0.42} stroke="#1a1a1a" strokeWidth={1.2 / p.s} strokeLinecap="round" />
        ))}
      </OnFace>
      {/* the working face: a shutter the leads come out of, and two lamps */}
      <OnFace face="right" o={[MX, MY, MZ]}>
        <rect x={1.25} y={2.3} width={3.7} height={4.1} fill="#fbfbfb" stroke="#1a1a1a" strokeWidth={2.2 / p.s} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={1.25 + 0.92 * (i + 1) - 0.09} y={2.3} width={0.18} height={4.1} fill="#1a1a1a" />
        ))}
        <rect x={1.25} y={2.3} width={0.2} height={4.1} fill="#1a1a1a" />
        <rect x={4.75} y={2.3} width={0.2} height={4.1} fill="#1a1a1a" />
        <circle cx={5.75} cy={1.35} r={0.3} fill="#fff" stroke="#1a1a1a" strokeWidth={1.25 / p.s} />
        <circle cx={6.55} cy={1.35} r={0.3} fill={RED} stroke="#1a1a1a" strokeWidth={1.25 / p.s} className={p.still ? undefined : "iso-blink"} />
      </OnFace>
      {/* crown: a plate and the E box */}
      <Prism at={[x0 + 1.3, y0 + 1.3, MZ]} size={[sx - 2.6, sy - 2.6, 0.36]} r={0.3} mat="white" />
      <EBox at={chip} size={[2.7, 2.5, 0.72]} r={0.22} />
      {!p.still && (
        <OnFace face="top" o={[chip[0], chip[1] + 2.5, chip[2] + 0.72]}>
          <rect className="iso-pulse" x={0.1} y={0.1} width={2.3} height={2.5} rx={0.3} fill="none" stroke={RED} strokeWidth={2 / p.s} />
        </OnFace>
      )}
      <Beam at={[chip[0] + 0.05, chip[1] + 0.05, chip[2] + 0.72]} size={[2.6, 2.4, 0]} height={3.4} id="hero-beam" />
    </g>
  );
}

/** A result pad: an icon badge, a title and a detail line on its top. */
function Pad({
  at,
  size,
  mat,
  badge,
  title,
  detail,
  short,
  bar,
}: {
  at: V3;
  size: V3;
  mat: "white" | typeof INKED;
  badge: ReactNode;
  title: string;
  detail: string;
  /** the one or two words a phone shows instead of the full label */
  short: string;
  bar?: boolean;
}) {
  return (
    <g>
      <Shadow at={at} size={size} r={0.42} lift={0.85} />
      <Prism at={at} size={size} r={0.42} mat={mat}>
        <circle cx={1.0} cy={1.0} r={0.5} fill="#1a1a1a" />
        {badge}
        <g className="pad-text">
          <text x={0.55} y={2.25} fontSize={0.46} fontWeight={600} fill="#1a1a1a" fontFamily="'Space Grotesk Variable', sans-serif">
            {title}
          </text>
          <text x={0.55} y={2.85} fontSize={0.34} fill="#6b6b6b">
            {detail}
          </text>
        </g>
        <text className="pad-short" x={0.4} y={2.55} fontSize={0.82} fontWeight={600} fill="#1a1a1a" fontFamily="'Space Grotesk Variable', sans-serif">
          {short}
        </text>
        {bar && (
          <g>
            <rect x={0.55} y={3.35} width={size[1] - 1.1} height={0.24} rx={0.12} fill={RED} />
          </g>
        )}
      </Prism>
    </g>
  );
}

function Outputs() {
  const t1: V3 = [26.2, 0.2, 0];
  const t1s: V3 = [3.6, 4.8, 0.75];
  const t2: V3 = [26.2, -7.6, 0];
  const t2s: V3 = [3.6, 5.8, 0.8];
  const t3: V3 = [26.0, -14.6, 0];
  const t3s: V3 = [4.1, 5.2, 0.95];
  const wire1: V3[] = [
    [MX, 2.1, 0],
    [t1[0], 2.1, 0],
  ];
  const wire2: V3[] = [
    [t1[0] + 1.8, t1[1], 0],
    [t1[0] + 1.8, t2[1] + t2s[1], 0],
  ];
  const wire3: V3[] = [
    [t2[0] + 1.8, t2[1], 0],
    [t2[0] + 1.8, t3[1] + t3s[1], 0],
  ];
  return (
    <g>
      <Line pts={wire1} />
      <Dot at={[MX + 1.7, 2.1, 0]} r={4.2} ring />
      <Packet pts={wire1} dur={2.4} fill={RED} />
      <Line pts={wire3} />
      <Packet pts={wire3} dur={1.8} begin={1.6} fill={RED} />
      <Line pts={wire2} />
      <Packet pts={wire2} dur={1.8} begin={0.8} fill={RED} />
      <Pad
        at={t3}
        size={t3s}
        mat={INKED}
        badge={<KeyRound x={0.72} y={0.72} size={0.56} color="#fff" strokeWidth={2.4} aria-hidden />}
        title="Unit booked"
        detail="Tower C · C-803"
        short="Booked"
        bar
      />
      <Pad
        at={t2}
        size={t2s}
        mat="white"
        badge={<BrandGlyph brand="whatsapp" x={0.72} y={0.72} size={0.56} color="#fff" />}
        title="Site visit booked"
        detail="Sat 11 am · location sent"
        short="Visit booked"
      />
      <Pad
        at={t1}
        size={t1s}
        mat="white"
        badge={<PhoneCall x={0.72} y={0.72} size={0.56} color="#fff" strokeWidth={2.4} aria-hidden />}
        title="Lead qualified"
        detail="2 BHK · Rs 90 lakh"
        short="Qualified"
      />
    </g>
  );
}

export function HeroArt() {
  return (
    <Scene
      w={1224}
      h={560}
      s={29}
      ox={196}
      oy={150}
      fit
      pad={8}
      className="hero-art"
      label="Leads from Meta, Instagram, Google, WhatsApp and property portals ride into the Estationic engine and come out qualified, then with a site visit booked, then with a unit booked."
    >
      <Belt />
      <Riders />
      <Machine />
      <Outputs />
    </Scene>
  );
}
