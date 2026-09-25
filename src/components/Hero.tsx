import { ArrowDown } from "lucide-react";
import { HeroArt } from "../art/HeroArt";
import { HERO, LINKS } from "../content";
import { Reveal, Words } from "../lib/motion";
import { Button } from "./ui";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="frame hero-copy">
        <Words
          as="h1"
          id="hero-title"
          className="h1"
          lines={HERO.title.map((t, i) => ({ text: t, className: i ? "tone-2" : undefined }))}
          onLoad
          delay={0.1}
          stagger={0.07}
        />
        <Words as="p" className="lede" lines={[HERO.sub]} onLoad delay={0.45} stagger={0.018} />
        <Reveal className="hero-actions" delay={0.75} y={12}>
          <Button href={LINKS.demo} arrow>
            {HERO.primary}
          </Button>
          <Button href="#product" tone="line" icon={<ArrowDown size={16} strokeWidth={2} aria-hidden />}>
            {HERO.secondary}
          </Button>
        </Reveal>
      </div>
      <Reveal className="frame hero-stage" delay={0.5} y={40} amount={0.1}>
        <div className="stage-grid" aria-hidden />
        <HeroArt />
      </Reveal>
    </section>
  );
}
