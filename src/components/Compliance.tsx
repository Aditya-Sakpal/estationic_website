import { AnimatePresence, motion } from "motion/react";
import { ComplianceArt } from "../art/ComplianceArt";
import { COMPLIANCE } from "../content";
import { EASE, Reveal, Words, useCycle } from "../lib/motion";

export function Compliance() {
  const { ref, i, pick, progress, hold, reduce } = useCycle(COMPLIANCE.items.length, 6200);
  return (
    <section className="section compliance" id="compliance" aria-labelledby="compliance-title">
      <div className="frame">
        <div className="section-head">
          <Words
            as="h2"
            id="compliance-title"
            className="h2"
            lines={[COMPLIANCE.title[0], { text: COMPLIANCE.title[1], className: "tone-2" }]}
          />
          <Words as="p" className="body" lines={[COMPLIANCE.body]} stagger={0.012} delay={0.2} />
        </div>
        <div className="checks" ref={ref} {...hold}>
          <Reveal className="checks-list" y={16}>
            {COMPLIANCE.items.map((it, k) => {
              const on = i === k;
              return (
                <div key={it.title} className={`check${on ? " is-on" : ""}`}>
                  <span className="check-rail" aria-hidden>
                    {on && !reduce && <motion.span className="check-timer" style={{ scaleX: progress }} />}
                  </span>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`check-${k}`}
                      id={`check-btn-${k}`}
                      onClick={() => pick(k)}
                    >
                      {it.title}
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`check-${k}`}
                        role="region"
                        aria-labelledby={`check-btn-${k}`}
                        className="check-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                      >
                        <p>{it.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
          <Reveal className="checks-art" delay={0.1}>
            <span className="corner c-tl" aria-hidden />
            <span className="corner c-tr" aria-hidden />
            <span className="corner c-bl" aria-hidden />
            <span className="corner c-br" aria-hidden />
            <ComplianceArt active={i} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
