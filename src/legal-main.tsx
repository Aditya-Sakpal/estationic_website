import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Legal } from "./Legal";
import { PRIVACY, TERMS } from "./legal-text";
import "./styles.css";

// privacy.html and terms.html share this entry; the body says which to draw
const doc = document.body.dataset.page === "terms" ? TERMS : PRIVACY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Legal doc={doc} />
  </StrictMode>,
);
