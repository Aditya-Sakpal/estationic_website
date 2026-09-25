import { motion } from "motion/react";
import { JourneyArt } from "../art/JourneyArt";
import { SALES } from "../content";
import { Reveal, Words, useCycle } from "../lib/motion";

export function Sales() {
  const steps = SALES.steps;
  const { ref, i, pick, progress, hold, reduce } = useCycle(steps.length, 5000);
  return (
    <section className="section sales" id="sales" aria-labelledby="sales-title">
      <div className="frame">
        <div className="section-head is-center">
          <Words
            as="h2"
            id="sales-title"
            className="h2"
            lines={[SALES.title[0], { text: SALES.title[1], className: "tone-2" }]}
          />
          <Words as="p" className="body" lines={[SALES.body]} stagger={0.012} delay={0.2} />
        </div>
      </div>
      <div className="journey" ref={ref} {...hold}>
        <Reveal className="frame journey-stage" delay={0.05} y={24}>
          <div className="stage-grid is-soft" aria-hidden />
          <div id="sales-panel" role="tabpanel" aria-labelledby={`sales-tab-${i}`}>
            <JourneyArt active={i} />
          </div>
        </Reveal>
        <div className="frame">
          <div role="tablist" aria-label="The sales journey, step by step" className="steps">
            {steps.map((s, k) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                id={`sales-tab-${k}`}
                aria-selected={i === k}
                aria-controls="sales-panel"
                tabIndex={i === k ? 0 : -1}
                className={`step${i === k ? " is-on" : ""}${k < i ? " is-done" : ""}`}
                onClick={() => pick(k)}
                onKeyDown={(e) => {
                  const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                  if (!d) return;
                  e.preventDefault();
                  const n = (k + d + steps.length) % steps.length;
                  pick(n);
                  document.getElementById(`sales-tab-${n}`)?.focus();
                }}
              >
                <span className="step-rail" aria-hidden>
                  {i === k && !reduce && <motion.span className="step-timer" style={{ scaleX: progress }} />}
                </span>
                <span className="step-num" aria-hidden>
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className="step-title">{s.title}</span>
                <span className="step-body">{s.body}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
