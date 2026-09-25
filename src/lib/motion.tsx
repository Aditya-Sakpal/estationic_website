import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  div: motion.div,
  li: motion.li,
  figure: motion.figure,
};
type Tag = keyof typeof TAGS;

const wordV: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: "0.28em" },
  shown: { opacity: 1, filter: "blur(0px)", y: "0em", transition: { duration: 0.9, ease: EASE } },
};

type Line = string | { text: string; className?: string };

/**
 * Words that sharpen into place one after another: the page's one entrance.
 * Each line is its own block so a two-tone heading keeps its break.
 */
export function Words({
  as = "p",
  lines,
  className,
  stagger = 0.055,
  delay = 0,
  onLoad = false,
  id,
}: {
  as?: Tag;
  lines: Line[];
  className?: string;
  stagger?: number;
  delay?: number;
  onLoad?: boolean;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const norm = lines.map((l) => (typeof l === "string" ? { text: l } : l));
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} id={id}>
        {norm.map((l, i) => (
          <span key={i} className={`line ${l.className ?? ""}`}>
            {l.text}
            {i < norm.length - 1 ? " " : ""}
          </span>
        ))}
      </Plain>
    );
  }
  const M = TAGS[as];
  const trigger = onLoad
    ? { animate: "shown" }
    : { whileInView: "shown", viewport: { once: true, amount: 0.5 } };
  return (
    <M
      className={className}
      id={id}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {norm.map((l, i) => (
        <span key={i} className={`line ${l.className ?? ""}`}>
          {l.text.split(" ").map((w, j, arr) => (
            <span key={j}>
              <motion.span className="word" variants={wordV}>
                {w}
              </motion.span>
              {j < arr.length - 1 ? " " : ""}
            </span>
          ))}
          {i < norm.length - 1 ? " " : ""}
        </span>
      ))}
    </M>
  );
}

/** A block that settles in: a small rise, and a blur that clears. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  const M = TAGS[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** A number that counts up the first time it is seen. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");
  const [text, setText] = useState(reduce ? fmt(value) : "0");
  useEffect(() => {
    if (!seen || reduce) return;
    const c = animate(0, value, { duration: 1.8, ease: EASE, onUpdate: (v) => setText(fmt(v)) });
    return () => c.stop();
  }, [seen, reduce, value]);
  return (
    <span ref={ref} className="tabular">
      <span aria-hidden>
        {text}
        {suffix}
      </span>
      <span className="sr-only">
        {fmt(value)}
        {suffix}
      </span>
    </span>
  );
}

function Char({ c, i, n, p }: { c: string; i: number; n: number; p: MotionValue<number> }) {
  const color = useTransform(p, [i / n, (i + 1) / n], ["#c4c4c4", "#151515"]);
  return <motion.span style={{ color }}>{c}</motion.span>;
}

/** A heading that inks in, letter by letter, as it is scrolled through. */
export function InkOnScroll({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.4"] });
  if (reduce) return <h2 className={className}>{text}</h2>;
  const chars = [...text];
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {chars.map((c, i) => (
          <Char key={i} c={c} i={i} n={chars.length} p={scrollYProgress} />
        ))}
      </span>
    </h2>
  );
}

/**
 * Steps through n items on a timer, but only while the element is on screen
 * and nobody's pointer or focus is resting on it. `progress` runs 0 to 1 over
 * the current step, for drawing its timer bar.
 */
export function useCycle(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const progress = useMotionValue(0);
  const running = inView && !held && !reduce;
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = progress.get() + (now - last) / ms;
      last = now;
      if (next >= 1) {
        progress.set(0);
        setI((k) => (k + 1) % n);
      } else {
        progress.set(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, n, ms, progress]);
  const pick = (k: number) => {
    progress.set(0);
    setI(k);
  };
  const hold = {
    onPointerEnter: () => setHeld(true),
    onPointerLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: (e: FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
    },
  };
  return { ref, i, pick, progress, hold, reduce: !!reduce };
}

/** True under the phone breakpoint, kept in step with the viewport. */
export function useNarrow(q = "(max-width: 640px)") {
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const f = () => setOn(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, [q]);
  return on;
}
