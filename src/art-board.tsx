// Development only: renders one illustration at a time for review captures.
import { createRoot } from "react-dom/client";
import type { ReactNode } from "react";
import "./styles.css";
import { HeroArt } from "./art/HeroArt";
import { ComplianceArt } from "./art/ComplianceArt";
import { MARKETING_ART } from "./art/MarketingArt";
import { JourneyArt } from "./art/JourneyArt";
import { IntegrationsArt } from "./art/IntegrationsArt";
import { TowerArt } from "./art/TowerArt";
import { ControlArt } from "./art/ControlArt";

const q = new URLSearchParams(location.search);
const i = Number(q.get("i") ?? 0);
const ARTS: Record<string, () => ReactNode> = {
  hero: () => <HeroArt />,
  compliance: () => <ComplianceArt active={i} />,
  ...MARKETING_ART,
  journey: () => <JourneyArt active={i} />,
  integrations: () => <IntegrationsArt compact={q.has("compact")} />,
  tower: () => <TowerArt />,
  control: () => <ControlArt />,
};

createRoot(document.getElementById("root")!).render(
  <div style={{ padding: 24, backgroundColor: "var(--ground)", width: Number(q.get("w") ?? 1272), boxSizing: "border-box" }} className="grid-bg">
    {ARTS[q.get("a") ?? "hero"]?.()}
  </div>,
);
