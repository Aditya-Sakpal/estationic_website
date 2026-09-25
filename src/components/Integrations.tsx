import { IntegrationsArt } from "../art/IntegrationsArt";
import { INTEGRATIONS } from "../content";
import { Reveal, Words, useNarrow } from "../lib/motion";

export function Integrations() {
  const narrow = useNarrow();
  return (
    <section className="section integrations" id="integrations" aria-labelledby="int-title">
      <div className="stage-grid is-soft" aria-hidden />
      <div className="frame">
        <div className="section-head is-center">
          <Words
            as="h2"
            id="int-title"
            className="h2"
            lines={[INTEGRATIONS.title[0], { text: INTEGRATIONS.title[1], className: "tone-2" }]}
          />
          <Words as="p" className="body" lines={[INTEGRATIONS.body]} stagger={0.012} delay={0.2} />
        </div>
        <Reveal className="int-art" delay={0.1}>
          <IntegrationsArt compact={narrow} />
        </Reveal>
      </div>
    </section>
  );
}
