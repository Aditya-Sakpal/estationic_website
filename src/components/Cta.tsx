import { TowerArt } from "../art/TowerArt";
import { CTA, LINKS } from "../content";
import { Reveal, Words } from "../lib/motion";
import { Button } from "./ui";

export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="frame cta-inner">
        <div className="cta-copy">
          <div className="cta-squares" aria-hidden />
          <Words
            as="h2"
            id="cta-title"
            className="h2 cta-title"
            lines={[CTA.title[0], { text: CTA.title[1], className: "tone-2" }]}
          />
          <Reveal className="cta-actions" delay={0.25} y={12}>
            <Button href={LINKS.demo} arrow>
              {CTA.primary}
            </Button>
            <Button href={LINKS.compose} tone="line">
              {CTA.secondary}
            </Button>
          </Reveal>
        </div>
        <div className="cta-art">
          <TowerArt />
        </div>
      </div>
    </section>
  );
}
