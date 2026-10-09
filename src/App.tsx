import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { Compliance } from "./components/Compliance";
import { Control } from "./components/Control";
import { Marketing } from "./components/Marketing";
import { Sales } from "./components/Sales";
import { Cta } from "./components/Cta";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Integrations } from "./components/Integrations";
// import { Logos } from "./components/Logos";
import { Nav } from "./components/Nav";
import { Pricing } from "./components/Pricing";
import { Stats } from "./components/Stats";
import { Rule } from "./components/ui";

export default function App() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ anchors: { offset: -72 }, lerp: 0.11 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <div className="page">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="rails" aria-hidden />
      <Nav />
      <main id="main">
        <Hero />
        <Rule />
        {/* Client logos, hidden for now (9 October 2026).
        <Logos />
        <Rule />
        */}
        <Marketing />
        <Rule />
        <Sales />
        <Rule />
        <Control />
        <Rule />
        <Compliance />
        <Rule />
        <Stats />
        <Rule />
        <Integrations />
        <Rule />
        <Pricing />
        <Rule />
        <Faq />
        <Rule />
        <Cta />
        <Rule />
      </main>
      <Footer />
    </div>
  );
}
