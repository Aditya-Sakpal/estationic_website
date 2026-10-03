import { Footer } from "./components/Footer";
import { Button, Logo, Rule } from "./components/ui";
import { LINKS } from "./content";
import type { LegalDoc } from "./legal-text";

/** The privacy policy or the terms of service, on the site's own frame. */
export function Legal({ doc }: { doc: LegalDoc }) {
  return (
    <div className="page">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="rails" aria-hidden />
      <header className="nav is-scrolled">
        <div className="nav-inner frame legal-nav">
          <a href="/" className="nav-logo" aria-label="Estationic, home">
            <Logo />
          </a>
          <div className="nav-cta legal-cta">
            <Button href={LINKS.demo}>Book a demo</Button>
          </div>
        </div>
      </header>
      <main id="main">
        <article className="frame legal">
          <header className="legal-head">
            <h1 className="h1">{doc.title}</h1>
            <p className="legal-date">Last updated {doc.updated}</p>
            {doc.intro.map((p) => (
              <p key={p} className="legal-intro">
                {p}
              </p>
            ))}
          </header>
          {doc.sections.map((s) => (
            <section key={s.heading} className="legal-section">
              <h2>{s.heading}</h2>
              {s.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i}>
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{b}</p>
                ),
              )}
            </section>
          ))}
        </article>
        <Rule />
      </main>
      <Footer base="/" />
    </div>
  );
}
