import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FAQ } from "../content";
import { EASE, Reveal, Words } from "../lib/motion";

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="frame faq-inner">
        <div className="faq-intro">
          <Words as="h2" id="faq-title" className="h2" lines={FAQ.title} />
          <Words as="p" className="body" lines={[FAQ.body]} stagger={0.012} delay={0.2} />
        </div>
        <Reveal className="faq-list" y={16}>
          {FAQ.items.map((it, k) => {
            const on = open === k;
            return (
              <div key={it.q} className={`qa${on ? " is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={`qa-btn-${k}`}
                    aria-expanded={on}
                    aria-controls={`qa-${k}`}
                    onClick={() => setOpen(on ? -1 : k)}
                  >
                    <span>{it.q}</span>
                    <Plus className="qa-icon" size={20} strokeWidth={1.8} aria-hidden />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`qa-${k}`}
                      role="region"
                      aria-labelledby={`qa-btn-${k}`}
                      className="qa-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p>{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
