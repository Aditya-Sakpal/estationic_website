import { Mail } from "lucide-react";
import { FOOTER, LINKS } from "../content";
import { Button, Logo } from "./ui";

export function Footer({ base = "" }: { base?: string }) {
  // on the legal pages the section anchors live on the home page
  const at = (href: string) => (href.startsWith("#") ? `${base}${href}` : href);
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
                  <a href={at(l.href)}>{l.label}</a>
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
        <nav className="footer-legal" aria-label="Legal">
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Terms of service</a>
          <span>Made for developers across India</span>
        </nav>
      </div>
    </footer>
  );
}
