import { animate, useReducedMotion } from "motion/react";
import { Check, Clapperboard, Globe, Image, IndianRupee, LayoutGrid, Megaphone, PhoneCall, QrCode } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandGlyph, EGlyph, Glyph, type Brand } from "../lib/glyphs";
import { Dot, INK, Line, OnFace, Packet, Prism, RED, Scene, Shadow, useProj, type V3 } from "../lib/iso";
import { CardL, CardR, EBox } from "../lib/parts";

/*
 * Four scenes for the marketing tabs: making the creatives, running them,
 * moving the budget, and gathering the leads they bring.
 */

const BOX = { w: 560, h: 500 };

function Frame({ label, children, s = 26 }: { label: string; children: ReactNode; s?: number }) {
  return (
    <Scene w={BOX.w} h={BOX.h} s={s} ox={280} oy={250} label={label} fit pad={10}>
      {children}
    </Scene>
  );
}

/** A black engine block with the red E box set into its lid. */
function Cube({ at, size = 2.5 }: { at: V3; size?: number }) {
  const [x0, y0, z0] = at;
  const inset = size * 0.17;
  return (
    <g>
      <Shadow at={at} size={[size, size, size * 0.8]} r={0.25} lift={0.8} />
      <Prism at={at} size={[size, size, size * 0.8]} r={0.3} mat="ink" />
      <EBox at={[x0 + inset, y0 + inset, z0 + size * 0.8]} size={[size - inset * 2, size - inset * 2, size * 0.16]} r={0.2} />
    </g>
  );
}

function Bars({ x, y, widths, gap = 0.42, h = 0.2, fill = "#dcdcdc" }: { x: number; y: number; widths: number[]; gap?: number; h?: number; fill?: string }) {
  return (
    <g fill={fill}>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} />
      ))}
    </g>
  );
}

/* ----------------------------------------------------------------- create */

function Post({ at, w, h, tone }: { at: V3; w: number; h: number; tone: string }) {
  return (
    <g>
      <Shadow at={at} size={[w, 0.26, h]} r={0.2} lift={0.3} />
      <Prism at={at} size={[w, 0.26, h]} axis="y" r={0.2} mat="white">
        <rect x={0.22} y={0.22} width={w - 0.44} height={h * 0.56} rx={0.14} fill={tone} />
        <rect x={w - 0.78} y={0.36} width={0.42} height={0.42} fill="#fff" stroke={INK} strokeWidth={0.04} />
        <rect x={w - 0.68} y={0.46} width={0.22} height={0.22} fill={INK} />
        <Bars x={0.26} y={h * 0.56 + 0.5} widths={[w * 0.62, w * 0.42]} gap={0.36} h={0.17} />
      </Prism>
    </g>
  );
}

export function CreateArt() {
  return (
    <Frame label="An approved render and an approved price go into the Estationic engine and come out as a story, a feed post and a banner, each carrying the registration details.">
      <Shadow at={[-7.4, 1.6, 0]} size={[2.4, 2.4, 0.5]} r={0.35} />
      <Prism at={[-7.4, 1.6, 0]} size={[2.4, 2.4, 0.5]} r={0.35} mat="white">
        <IndianRupee x={0.72} y={0.72} size={0.96} color={INK} strokeWidth={2} aria-hidden />
      </Prism>
      <CardR at={[-6.3, -2.4, 0]} w={3.0} h={2.5} t={0.3} mat="white" icon={Image} scale={0.44} />
      <OnFace face="right" o={[-6.0, 0.6, 2.5]}>
        <circle cx={2.55} cy={0.45} r={0.3} fill={INK} />
        <Check x={2.37} y={0.27} size={0.36} color="#fff" strokeWidth={3} aria-hidden />
      </OnFace>
      <Line pts={[[-5.0, 0.2, 0], [-1.6, 0.2, 0]]} />
      <Dot at={[-5.0, 0.2, 0]} r={3.2} />
      <Packet pts={[[-5.0, 0.2, 0], [-1.6, 0.2, 0]]} dur={1.8} fill={RED} />
      <Line pts={[[1.0, 0.1, 0], [4.3, 0.1, 0]]} />
      <Dot at={[4.3, 0.1, 0]} r={3.2} />
      <Packet pts={[[1.0, 0.1, 0], [4.3, 0.1, 0]]} dur={1.8} begin={0.9} fill={RED} />
      <Cube at={[-1.6, -1.2, 0]} size={2.6} />
      <Post at={[4.3, -1.6, 0]} w={1.9} h={3.6} tone="#e9e9e9" />
      <Post at={[5.2, 0.0, 0]} w={2.6} h={2.6} tone="#dedede" />
      <Post at={[6.6, 1.6, 0]} w={3.5} h={1.95} tone="#e4e4e4" />
    </Frame>
  );
}

/* ---------------------------------------------------------------- publish */

const W = { t: 0.36, w: 12, h: 9 };
const CHIP = 1.36;
const ROWS = [2.0, 3.78, 5.56, 7.34];
const IN_U = 1.2;
const OUT_U = W.w - 1.2 - CHIP;
const CORE = { u: 4.15, v: 3.95, s: 2.4 };
const CREATIVES = [Image, Clapperboard, LayoutGrid, Megaphone];
const PLATFORMS: { brand: Brand; live: boolean }[] = [
  { brand: "meta", live: true },
  { brand: "instagram", live: true },
  { brand: "googleads", live: true },
  { brand: "google", live: false },
];

function chipAt(u: number, v: number, size = CHIP): { at: V3; size: V3 } {
  return { at: [u, W.t, W.h - v - size], size: [size, 0.34, size] };
}

function Window({ y, ghost = false }: { y: number; ghost?: boolean }) {
  const p = useProj();
  const sw = 1.2 / p.s;
  return (
    <Prism at={[0, y, 0]} size={[W.w, W.t, W.h]} axis="y" r={0.34} mat={ghost ? "ghost" : "white"} sw={ghost ? 1 : 1.3}>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={0.62 + i * 0.5} cy={0.62} r={0.15} fill="none" stroke={ghost ? "#d4d4d4" : INK} strokeWidth={sw} />
      ))}
      <line x1={0} x2={W.w} y1={1.22} y2={1.22} stroke={ghost ? "#e2e2e2" : "#d9d9d9"} strokeWidth={sw} />
      {!ghost && (
        <text x={2.35} y={0.78} fontSize={0.42} fill="#8a8a8a">
          Tower C · Campaigns
        </text>
      )}
      {ghost &&
        ROWS.map((v) => (
          <g key={v} fill="#ededed">
            <rect x={IN_U} y={v} width={CHIP} height={CHIP} rx={0.2} />
            <rect x={OUT_U} y={v} width={CHIP} height={CHIP} rx={0.2} />
          </g>
        ))}
    </Prism>
  );
}

export function PublishArt() {
  return (
    <Frame label="Posts, reels, carousels and ads go through the Estationic engine to Meta, Instagram, Google Ads and Google, where three campaigns are live and one is paused." s={30}>
      <Window y={-3.7} ghost />
      <Window y={-1.85} ghost />
      <Window y={0} />
      <PublishWires />
      {CREATIVES.map((Icon, i) => {
        const c = chipAt(IN_U, ROWS[i]);
        return (
          <Prism key={i} at={c.at} size={c.size} axis="y" r={0.22} mat="white" sw={1.2}>
            <Glyph icon={Icon} x={CHIP * 0.25} y={CHIP * 0.25} size={CHIP * 0.5} color={INK} sw={2} />
          </Prism>
        );
      })}
      {PLATFORMS.map((pl, i) => {
        const c = chipAt(OUT_U, ROWS[i]);
        return (
          <g key={pl.brand}>
            <Prism at={c.at} size={c.size} axis="y" r={0.22} mat={pl.live ? "ink" : "white"} sw={1.2}>
              <BrandGlyph brand={pl.brand} x={CHIP * 0.27} y={CHIP * 0.27} size={CHIP * 0.46} color={pl.live ? "#fff" : "#9a9a9a"} />
            </Prism>
          </g>
        );
      })}
      <PublishStatus />
      {(() => {
        const core = chipAt(CORE.u, CORE.v, CORE.s);
        return (
          <Prism at={core.at} size={core.size} axis="y" r={0.28} mat="red" sw={1.3}>
            <EGlyph x={CORE.s / 2} y={CORE.s / 2} h={CORE.s * 0.5} />
          </Prism>
        );
      })()}
    </Frame>
  );
}

function PublishWires() {
  const p = useProj();
  const sw = 1.2 / p.s;
  const busL = 3.35;
  const busR = 7.1;
  const mid = CORE.v + CORE.s / 2;
  const ins = ROWS.map((v) => `M${IN_U + CHIP} ${v + CHIP / 2}H${busL}V${mid}H${CORE.u}`);
  const outs = ROWS.map((v) => `M${CORE.u + CORE.s} ${mid}H${busR}V${v + CHIP / 2}H${OUT_U}`);
  return (
    <OnFace face="left" o={[0, W.t, W.h]}>
      <g fill="none" stroke={INK} strokeWidth={sw} strokeLinejoin="round">
        {ins.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {outs.map((d, i) => (
          <path key={i} d={d} opacity={PLATFORMS[i].live ? 1 : 0.3} strokeDasharray={PLATFORMS[i].live ? undefined : "0.2 0.16"} />
        ))}
      </g>
      {[busL, busR].map((u) => (
        <circle key={u} cx={u} cy={mid} r={0.13} fill={INK} />
      ))}
      {!p.still &&
        outs.map((d, i) =>
          PLATFORMS[i].live ? (
            <circle key={d} className="pk" r={0.13} fill={RED}>
              <animateMotion dur="2.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={d} />
            </circle>
          ) : null,
        )}
    </OnFace>
  );
}

/** Live and paused tags beside each platform chip, on the window's face. */
function PublishStatus() {
  const p = useProj();
  return (
    <OnFace face="left" o={[0, W.t, W.h]}>
      {PLATFORMS.map((pl, i) => (
        <g key={pl.brand}>
          <rect
            x={OUT_U - 1.62}
            y={ROWS[i] + 0.44}
            width={1.3}
            height={0.48}
            rx={0.24}
            fill={pl.live ? "#fff" : "#f3f3f3"}
            stroke={pl.live ? INK : "#c9c9c9"}
            strokeWidth={1 / p.s}
          />
          <circle cx={OUT_U - 1.37} cy={ROWS[i] + 0.68} r={0.09} fill={pl.live ? RED : "#b5b5b5"} />
          <text x={OUT_U - 1.19} y={ROWS[i] + 0.8} fontSize={0.3} fontWeight={600} fill={pl.live ? INK : "#8a8a8a"}>
            {pl.live ? "Live" : "Paused"}
          </text>
        </g>
      ))}
    </OnFace>
  );
}

/* ----------------------------------------------------------------- budget */

const BUDGET_STATES = [
  [1.3, 3.8, 2.0, 0.9],
  [1.0, 2.3, 4.0, 0.7],
];
const BAR_BRANDS: Brand[] = ["meta", "instagram", "googleads", "google"];

export function BudgetArt() {
  const reduce = useReducedMotion();
  const [k, setK] = useState(0);
  const [h, setH] = useState(BUDGET_STATES[0]);
  const from = useRef(BUDGET_STATES[0]);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setK((v) => (v + 1) % BUDGET_STATES.length), 3200);
    return () => window.clearInterval(t);
  }, [reduce]);
  useEffect(() => {
    const to = BUDGET_STATES[k];
    const start = from.current;
    const c = animate(0, 1, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (t) => setH(start.map((a, i) => a + (to[i] - a) * t)),
      onComplete: () => (from.current = to),
    });
    return () => {
      c.stop();
      from.current = to;
    };
  }, [k]);
  const top = h.indexOf(Math.max(...h));
  const low = h.indexOf(Math.min(...h));
  const bx = (i: number) => 1.0 + i * 2.55;
  const flow: V3[] = [
    [bx(low) + 0.8, 5.2, 0.5],
    [bx(top) + 0.8, 5.2, 0.5],
  ];
  return (
    <Frame label="Four campaign budgets on a platform. Spend moves from the campaign that brings fewer bookings to the one that brings more, and cost per booking trends down." s={28}>
      <Shadow at={[0, -3.2, 0]} size={[11.2, 10.6, 0.5]} r={0.45} lift={1.2} />
      <Prism at={[0, -3.2, 0]} size={[11.2, 10.6, 0.5]} r={0.45} mat="white" />
      <CardL at={[0.7, -2.7, 0.5]} w={7.0} h={3.4} t={0.26} mat="white" />
      <OnFace face="left" o={[0.7, -2.44, 3.9]}>
        <text x={0.45} y={0.72} fontSize={0.4} fontWeight={600} fill={INK}>
          Cost per booking
        </text>
        <path d="M0.5 1.25L1.8 1.4L3.1 1.8L4.4 1.95L5.7 2.25L6.4 2.3" fill="none" stroke={INK} strokeWidth={0.05} strokeLinejoin="round" />
        <circle cx={6.4} cy={2.3} r={0.12} fill={RED} />
      </OnFace>
      <EBox at={[8.7, -2.3, 0.5]} size={[1.9, 1.9, 0.62]} r={0.2} />
      <Line pts={flow} stroke={RED} sw={1.6} dash="5 5" />
      <Packet pts={flow} dur={1.6} fill={RED} r={3.4} key={`${low}-${top}`} />
      {h.map((v, i) => (
        <g key={i}>
          <Prism at={[bx(i), 3.4, 0.5]} size={[1.6, 1.6, v]} r={0.16} mat={i === top ? "ink" : "white"} sw={1.2} />
          <Prism at={[bx(i) + 0.05, 5.6, 0.5]} size={[1.5, 1.3, 0.14]} r={0.18} mat="paper" sw={1}>
            <BrandGlyph brand={BAR_BRANDS[i]} x={0.36} y={0.3} size={0.7} color={INK} />
          </Prism>
        </g>
      ))}
    </Frame>
  );
}

/* ---------------------------------------------------------------- capture */

type Source = { brand: Brand } | { icon: typeof Globe };
const SOURCES: Source[] = [
  { brand: "meta" },
  { brand: "google" },
  { brand: "whatsapp" },
  { icon: Globe },
  { icon: PhoneCall },
  { icon: QrCode },
];
const LEADS = [
  { name: "Priya S.", tag: "2 BHK" },
  { name: "Arjun M.", tag: "3 BHK" },
  { name: "Neha K.", tag: "2 BHK" },
];

export function CaptureArt() {
  const ys = SOURCES.map((_, i) => -6.25 + i * 2.5);
  const wires: V3[][] = ys.map((y) => [
    [0.6, y, 0],
    [3.2, y, 0],
    [3.2, 0, 0],
    [4.4, 0, 0],
  ]);
  return (
    <Frame label="Leads from Meta, Google, WhatsApp, property portals, phone calls and site QR codes flow into the Estationic engine and land in one queue." s={24}>
      {wires.map((w, i) => (
        <g key={i}>
          <Line pts={w} />
          <Dot at={w[1]} r={2.8} />
        </g>
      ))}
      {wires.map((w, i) => (
        <Packet key={i} pts={w} dur={2.6} begin={i * 0.42} fill={RED} r={2.8} />
      ))}
      <Line pts={[[7.0, 0, 0], [8.6, 0, 0]]} />
      <Packet pts={[[7.0, 0, 0], [8.6, 0, 0]]} dur={1.2} fill={RED} r={2.8} />
      {SOURCES.map((src, i) => (
        <g key={i}>
          <Shadow at={[-1.0, ys[i] - 1, 0]} size={[1.6, 2, 0.3]} r={0.3} />
          <Prism at={[-1.0, ys[i] - 1, 0]} size={[1.6, 2, 0.3]} r={0.3} mat="white" sw={1.1} />
          <CardR at={[-0.55, ys[i] - 0.85, 0.3]} w={1.7} h={1.8} t={0.26} mat="white" scale={0.5} {...src} />
        </g>
      ))}
      <Cube at={[4.4, -1.3, 0]} size={2.6} />
      <Shadow at={[8.6, -3.2, 0]} size={[6.2, 6.4, 0.5]} r={0.45} lift={1.2} />
      <Prism at={[8.6, -3.2, 0]} size={[6.2, 6.4, 0.5]} r={0.45} mat="white">
        <text x={0.5} y={0.85} fontSize={0.44} fontWeight={600} fill={INK}>
          New leads
        </text>
        <circle cx={5.6} cy={0.7} r={0.13} fill={RED} />
      </Prism>
      {LEADS.map((l, i) => (
        <Prism key={l.name} at={[9.95 + i * 1.55, -2.85, 0.5]} size={[1.25, 5.7, 0.22]} r={0.2} mat={i === 0 ? "ink" : "white"} sw={1.1}>
          <circle cx={0.62} cy={0.62} r={0.34} fill={i === 0 ? "#fff" : "#e6e6e6"} />
          <text x={1.2} y={0.76} fontSize={0.38} fontWeight={600} fill={i === 0 ? "#fff" : INK}>
            {l.name}
          </text>
          <rect x={3.55} y={0.36} width={1.5} height={0.5} rx={0.25} fill={i === 0 ? RED : "#efefef"} />
          <text x={3.8} y={0.72} fontSize={0.3} fontWeight={600} fill={i === 0 ? "#fff" : "#555"}>
            {l.tag}
          </text>
        </Prism>
      ))}
    </Frame>
  );
}

export const MARKETING_ART: Record<string, () => ReactNode> = {
  create: () => <CreateArt />,
  publish: () => <PublishArt />,
  budget: () => <BudgetArt />,
  capture: () => <CaptureArt />,
};
