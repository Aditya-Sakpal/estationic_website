import { Mail } from "lucide-react";
import { FOOTER, LINKS } from "../content";
import { Button, Logo } from "./ui";

export function Footer() {
  return (
    <footer className="footer">
      <div className="frame footer-inner">
        <div className="footer-brand">
          <Logo size={30} />
          <p>{FOOTER.blurb}</p>
        </div>
        {FOOTER.columns.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="footer-talk">
          <h2>{FOOTER.talk.title}</h2>
          <p>{FOOTER.talk.body}</p>
          <div className="footer-talk-row">
            <Button href={LINKS.demo} arrow>
              Book a demo
            </Button>
            <a className="footer-mail" href={LINKS.compose} target="_blank" rel="noopener noreferrer">
              <Mail size={16} strokeWidth={1.8} aria-hidden />
              {LINKS.email}
            </a>
          </div>
        </div>
      </div>
      <div className="rule" aria-hidden>
        <span className="cross cross-l" />
        <span className="cross cross-r" />
      </div>
      <div className="frame footer-base">
        <p>© {new Date().getFullYear()} Estationic. All rights reserved.</p>
        <p>Made for developers across India</p>
      </div>
    </footer>
  );
}
