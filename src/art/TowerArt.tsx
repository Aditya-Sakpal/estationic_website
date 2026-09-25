import { useInView } from "motion/react";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { OnFace, Prism, Scene, useProj, type Material, MAT } from "../lib/iso";
import { EBox } from "../lib/parts";

/* A tower that builds itself, floor by floor, and is capped with the E. */

const LINE: Material = { ...MAT.ghost, stroke: "#cdcdcd" };
const FLOORS = 11;
const FH = 0.82;
const BASE = 1.2;
const T = { x: 1.4, y: 1.2, w: 6.2, d: 4.6 };

function Floor({ k }: { k: number }) {
  const p = useProj();
  const z = BASE + k * FH;
  const sw = 1 / p.s;
  return (
    <g className="rise" style={{ "--i": k } as CSSProperties}>
      <Prism at={[T.x, T.y, z]} size={[T.w, T.d, FH]} mat={LINE} sw={1} edge />
      <OnFace face="left" o={[T.x, T.y + T.d, z + FH]}>
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={0.5 + i * 0.87} x2={0.5 + i * 0.87} y1={0.16} y2={FH - 0.12} stroke="#dcdcdc" strokeWidth={sw} />
        ))}
      </OnFace>
      <OnFace face="right" o={[T.x + T.w, T.y + T.d, z + FH]}>
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1={0.45 + i * 0.93} x2={0.45 + i * 0.93} y1={0.16} y2={FH - 0.12} stroke="#dcdcdc" strokeWidth={sw} />
        ))}
      </OnFace>
      {k % 2 === 0 && <Prism at={[T.x + T.w, T.y + 0.8, z]} size={[0.6, 2.6, 0.09]} mat={LINE} sw={1} />}
    </g>
  );
}

export function TowerArt() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className={`tower${on ? " is-on" : ""}`}>
      <Scene w={520} h={440} s={24} ox={200} oy={330} fit pad={12} label="A residential tower rising floor by floor, capped with the Estationic E.">
        <Prism at={[0, 0, 0]} size={[9, 7, BASE]} mat={LINE} sw={1} edge />
        {Array.from({ length: FLOORS }, (_, k) => (
          <Floor key={k} k={k} />
        ))}
        <g className="rise" style={{ "--i": FLOORS } as CSSProperties}>
          <Prism at={[T.x, T.y, BASE + FLOORS * FH]} size={[T.w, T.d, 0.3]} mat={LINE} sw={1} edge />
        </g>
        <g className="rise cap" style={{ "--i": FLOORS + 2 } as CSSProperties}>
          <EBox at={[T.x + 1.9, T.y + 1.2, BASE + FLOORS * FH + 0.3]} size={[2.2, 2.2, 0.62]} r={0.2} />
        </g>
      </Scene>
    </div>
  );
}
