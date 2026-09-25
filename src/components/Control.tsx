import { ArrowRight } from "lucide-react";
import { ControlArt } from "../art/ControlArt";
import { CONTROL } from "../content";
import { Reveal, Words, useNarrow } from "../lib/motion";

export function Control() {
  const narrow = useNarrow();
  return (
    <section className="section control" id="autopilot" aria-labelledby="control-title">
      <div className="frame">
        <div className="section-head is-center">
          <Words
            as="h2"
            id="control-title"
            className="h2"
            lines={[CONTROL.title[0], { text: CONTROL.title[1], className: "tone-2" }]}
          />
          <Words as="p" className="body" lines={[CONTROL.body]} stagger={0.012} delay={0.2} />
        </div>
      </div>
      <Reveal className="frame control-stage" y={24}>
        <div className="stage-grid is-soft" aria-hidden />
        <ControlArt compact={narrow} />
      </Reveal>
      <div className="frame">
        <div className="lanes">
          {CONTROL.columns.map((c, k) => (
            <Reveal key={c.key} className="lane" delay={k * 0.08} y={16}>
              <h3>{c.title}</h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
