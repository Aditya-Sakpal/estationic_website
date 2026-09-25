import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { CalendarClock, Check, KeyRound, MapPin, PhoneCall, Sprout, User, Users } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { BrandGlyph, Glyph } from "../lib/glyphs";
import { C, Dot, INK, Line, OnFace, Prism, RED, Scene, Shadow, useProj, type V3 } from "../lib/iso";
import { CardR, EBox } from "../lib/parts";

/*
 * The sales journey as a rising walkway: six stations, each with its own
 * object, and a red lead token that walks from the engine to whichever step
 * is active. Beside the second station sits your team, who take the lead over.
 */

const GAP = 4.8;
const PATH_X = 3.0;
const SLAB = 3.5;
const cy = (i: number) => -GAP * i;

/* ------------------------------------------------------------- objects */

/** 1: a handset mid-call, sound bars on its screen. */
function Handset({ y }: { y: number }) {
  const p = useProj();
  const at: V3 = [-1.0, y - 0.8, 0.5];
  const w = 1.6;
  const h = 2.6;
  return (
    <g>
      <Prism at={at} size={[0.3, w, h]} axis="x" r={0.28} mat="ink" />
      <OnFace face="right" o={[at[0] + 0.3, at[1] + w, at[2] + h]}>
        <rect x={0.55} y={0.22} width={0.5} height={0.1} rx={0.05} fill="#3a3a3a" />
        <Glyph icon={PhoneCall} x={0.5} y={0.62} size={0.6} color="#fff" sw={2.2} />
        {[0.5, 0.9, 0.35, 0.75, 0.55].map((b, i) => (
          <rect
            key={i}
            x={0.34 + i * 0.2}
            y={1.95 - b / 2}
            width={0.1}
            height={b}
            rx={0.05}
            fill="#fff"
            className={p.still ? undefined : "bar"}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </OnFace>
    </g>
  );
}

/** 2: the qualification card, three answers ticked. */
function Qualified({ y }: { y: number }) {
  const at: V3 = [-1.0, y - 1.0, 0.5];
  const w = 2.0;
  const h = 2.2;
  return (
    <Prism at={at} size={[0.26, w, h]} axis="x" r={0.18} mat="white">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={0.42} cy={0.5 + i * 0.6} r={0.14} fill={INK} />
          <rect x={0.72} y={0.42 + i * 0.6} width={[1.0, 0.8, 0.9][i]} height={0.16} rx={0.08} fill="#d6d6d6" />
        </g>
      ))}
    </Prism>
  );
}

/** 3: a stack of WhatsApp messages. */
function Messages({ y }: { y: number }) {
  const at: V3 = [-1.0, y - 1.0, 0.5];
  const w = 2.0;
  const h = 2.4;
  return (
    <g>
      <Prism at={[at[0] - 0.4, at[1] - 0.35, 0.5]} size={[0.24, w, h]} axis="x" r={0.2} mat="ghost" sw={1} />
      <Prism at={at} size={[0.26, w, h]} axis="x" r={0.2} mat="white">
        <BrandGlyph brand="whatsapp" x={0.3} y={0.26} size={0.5} color={INK} />
        <rect x={0.3} y={0.95} width={1.1} height={0.36} rx={0.16} fill="#e6e6e6" />
        <rect x={0.6} y={1.45} width={1.1} height={0.36} rx={0.16} fill={INK} />
        <rect x={0.3} y={1.95} width={0.8} height={0.3} rx={0.14} fill="#e6e6e6" />
      </Prism>
    </g>
  );
}

/** 4: the site pin, and the location card sent the day before. */
function SitePin({ y }: { y: number }) {
  const at: V3 = [-1.05, y - 0.8, 0.5];
  return (
    <g>
      <CardR at={at} w={1.6} h={2.3} t={0.26} mat="ink" icon={MapPin} scale={0.6} />
      <Prism at={[0.15, y + 0.2, 0.5]} size={[1.2, 1.3, 0.14]} r={0.16} mat="paper" sw={1}>
        <Glyph icon={CalendarClock} x={0.28} y={0.23} size={0.72} color={INK} sw={2} />
      </Prism>
    </g>
  );
}

/** 5: the signed agreement, and the key. */
function Agreement({ y }: { y: number }) {
  const at: V3 = [-1.0, y - 1.0, 0.5];
  const w = 1.9;
  const h = 2.5;
  return (
    <g>
      <Prism at={at} size={[0.24, w, h]} axis="x" r={0.12} mat="white">
        {[0.45, 0.75, 1.05].map((yy, i) => (
          <rect key={i} x={0.3} y={yy} width={[1.3, 1.1, 1.2][i]} height={0.12} rx={0.06} fill="#d6d6d6" />
        ))}
        <path d="M0.3 1.85c0.2-0.3 0.35 0.25 0.55-0.05s0.3 0.2 0.5-0.02" fill="none" stroke={INK} strokeWidth={0.07} strokeLinecap="round" />
        <line x1={0.3} x2={1.6} y1={2.05} y2={2.05} stroke="#bdbdbd" strokeWidth={0.04} />
        <circle cx={1.45} cy={1.7} r={0.22} fill={INK} />
        <Check x={1.3} y={1.55} size={0.3} color="#fff" strokeWidth={3.4} aria-hidden />
      </Prism>
      <Prism at={[0.2, y + 0.25, 0.5]} size={[1.1, 1.1, 0.14]} r={0.16} mat="paper" sw={1}>
        <Glyph icon={KeyRound} x={0.23} y={0.23} size={0.64} color={INK} sw={2} />
      </Prism>
    </g>
  );
}

/** 6: a sprout in a pot. */
function Sprouting({ y }: { y: number }) {
  return (
    <g>
      <Prism at={[-0.8, y - 0.8, 0.5]} size={[1.6, 1.6, 0.9]} shape="oct" mat="white" />
      <CardR at={[-0.15, y - 0.6, 1.4]} w={1.2} h={1.4} t={0.2} mat="white" icon={Sprout} scale={0.62} />
    </g>
  );
}

const OBJECTS: ((p: { y: number }) => ReactNode)[] = [Handset, Qualified, Messages, SitePin, Agreement, Sprouting];

/* ------------------------------------------------------------ stations */

function Station({ i, hot }: { i: number; hot: boolean }) {
  const p = useProj();
  const y = cy(i);
  const at: V3 = [-SLAB / 2, y - SLAB / 2, 0];
  const Obj = OBJECTS[i];
  return (
    <g>
      <Shadow at={at} size={[SLAB, SLAB, 0.5]} r={0.4} lift={1.4} />
      <Prism at={at} size={[SLAB, SLAB, 0.5]} r={0.4} mat="white" />
      <g className="swap" style={{ opacity: hot ? 1 : 0 }}>
        <Prism at={at} size={[SLAB, SLAB, 0.5]} r={0.4} mat="ink" />
      </g>
      {hot && !p.still && (
        <OnFace face="top" o={[at[0], at[1] + SLAB, 0.5]}>
          <rect className="iso-pulse" x={0.35} y={0.35} width={SLAB - 0.7} height={SLAB - 0.7} rx={0.45} fill="none" stroke={RED} strokeWidth={1.6 / p.s} />
        </OnFace>
      )}
      <Obj y={y} />
    </g>
  );
}

/** Your team, off the walkway beside the qualification station. */
function Team() {
  const x = -5.4;
  const y = cy(1) - 0.2;
  return (
    <g>
      <Line pts={[[-SLAB / 2, y, 0], [x + 1.4, y, 0]]} dash="4 4" />
      <Shadow at={[x - 1.4, y - 1.4, 0]} size={[2.8, 2.8, 0.45]} r={0.35} lift={1.2} />
      <Prism at={[x - 1.4, y - 1.4, 0]} size={[2.8, 2.8, 0.45]} r={0.35} mat="paper" />
      <CardR at={[x - 0.6, y - 1.0, 0.45]} w={2.0} h={2.1} t={0.24} mat="white" icon={Users} scale={0.55} />
    </g>
  );
}

function Token({ active }: { active: number }) {
  const p = useProj();
  const reduce = useReducedMotion();
  const t = useMotionValue(active);
  useEffect(() => {
    if (reduce) {
      t.set(active);
      return;
    }
    const c = animate(t, active, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [active, reduce, t]);
  // walking -y along the path moves up and to the right on screen
  const x = useTransform(t, (v) => GAP * v * C * p.s);
  const y = useTransform(t, (v) => -GAP * v * 0.5 * p.s);
  return (
    <motion.g style={{ x, y }}>
      <Prism at={[PATH_X - 0.6, -0.6, 0]} size={[1.2, 1.2, 0.62]} r={0.3} mat="red" sw={1.2}>
        <User x={0.3} y={0.3} size={0.6} color="#fff" strokeWidth={2.4} aria-hidden />
      </Prism>
    </motion.g>
  );
}

export function JourneyArt({ active }: { active: number }) {
  const last = OBJECTS.length - 1;
  const path: V3[] = [
    [PATH_X, 5.6, 0],
    [PATH_X, cy(last), 0],
  ];
  return (
    <Scene
      w={1160}
      h={470}
      s={30}
      ox={300}
      oy={380}
      fit
      pad={14}
      className="journey-art"
      label="A lead token walks from the Estationic engine past six stations: a handset for the AI call, a qualification card beside your team's desk, a stack of WhatsApp messages, the site pin with a location card sent the day before, a signed agreement and key, and a sprout for nurturing."
    >
      <Line pts={path} dash="5 6" />
      {OBJECTS.map((_, i) => (
        <g key={i}>
          <Line pts={[[SLAB / 2, cy(i), 0], [PATH_X, cy(i), 0]]} />
          <Dot at={[PATH_X, cy(i), 0]} r={3.2} fill={i <= active ? INK : "#bdbdbd"} />
        </g>
      ))}
      {OBJECTS.map((_, i) => (
        <g key={i}>
          {i === 1 && <Team />}
          <Station i={i} hot={i === active} />
        </g>
      ))}
      <Shadow at={[1.7, 5.4, 0]} size={[2.6, 2.6, 2.1]} r={0.3} lift={0.8} />
      <Prism at={[1.7, 5.4, 0]} size={[2.6, 2.6, 2.1]} r={0.3} mat="ink" />
      <EBox at={[2.15, 5.85, 2.1]} size={[1.7, 1.7, 0.42]} r={0.2} />
      <Token active={active} />
    </Scene>
  );
}
