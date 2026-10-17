import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Legal } from "./Legal";
import { CONTACT_PAGE, PRIVACY, REFUNDS, TERMS } from "./legal-text";
import "./styles.css";

// The legal pages share this entry; the body says which to draw.
const DOCS = { terms: TERMS, refunds: REFUNDS, contact: CONTACT_PAGE, privacy: PRIVACY };
const doc = DOCS[(document.body.dataset.page ?? "privacy") as keyof typeof DOCS] ?? PRIVACY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Legal doc={doc} />
  </StrictMode>,
);
