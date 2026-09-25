import { AnimatePresence, motion } from "motion/react";
import { MARKETING_ART } from "../art/MarketingArt";
import { MARKETING } from "../content";
import { EASE, Reveal, Words, useCycle } from "../lib/motion";

export function Marketing() {
  const tabs = MARKETING.tabs;
  const { ref, i, pick, progress, hold, reduce } = useCycle(tabs.length, 5600);
  const active = tabs[i];
  return (
    <section className="section marketing" id="marketing" aria-labelledby="marketing-title">
      <div className="frame">
        <div className="section-head is-center">
          <Words
            as="h2"
            id="marketing-title"
            className="h2"
            lines={[MARKETING.title[0], { text: MARKETING.title[1], className: "tone-2" }]}
          />
          <Words as="p" className="body" lines={[MARKETING.body]} stagger={0.012} delay={0.2} />
        </div>
      </div>
      <div className="frame split" ref={ref} {...hold}>
        <div className="split-copy">
          <Reveal className="tabs" delay={0.15} y={16}>
            <div role="tablist" aria-label="What marketing on autopilot does" className="tabs-grid is-list">
              {tabs.map((t, k) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  id={`mk-tab-${k}`}
                  aria-selected={i === k}
                  aria-controls="mk-panel"
                  tabIndex={i === k ? 0 : -1}
                  className={`tab${i === k ? " is-on" : ""}`}
                  onClick={() => pick(k)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const n = (k + d + tabs.length) % tabs.length;
                    pick(n);
                    document.getElementById(`mk-tab-${n}`)?.focus();
                  }}
                >
                  <span className="tab-title">{t.title}</span>
                  <span className="tab-body">{t.body}</span>
                  {i === k && !reduce && <motion.span className="tab-timer" style={{ scaleX: progress }} aria-hidden />}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="split-art" delay={0.1}>
          <div id="mk-panel" role="tabpanel" aria-labelledby={`mk-tab-${i}`} className="art-stack">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.key}
                className="art-layer"
                initial={reduce ? false : { opacity: 0, filter: "blur(8px)", scale: 0.97 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, filter: "blur(8px)", scale: 1.02 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {MARKETING_ART[active.key]()}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
