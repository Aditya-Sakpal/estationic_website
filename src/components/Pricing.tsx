import { CircleCheck } from "lucide-react";
import { LINKS, PRICING } from "../content";
import { Reveal, Words } from "../lib/motion";
import { Button } from "./ui";

export function Pricing() {
  return (
    <section className="section pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="frame">
        <div className="section-head is-split">
          <Words
            as="h2"
            id="pricing-title"
            className="h2"
            lines={[PRICING.title[0], { text: PRICING.title[1], className: "tone-2" }]}
          />
          <Words as="p" className="body" lines={[PRICING.body]} stagger={0.012} delay={0.2} />
        </div>
      </div>
      <div className="rule" aria-hidden>
        <span className="cross cross-l" />
        <span className="cross cross-r" />
      </div>
      <div className="frame plans">
        {PRICING.plans.map((pl, k) => (
          <Reveal key={pl.name} className={`plan${pl.popular ? " is-popular" : ""}`} delay={k * 0.08} y={20}>
            <div className="plan-head">
              <h3>
                {pl.name}
                {pl.popular && <span className="plan-tag">Recommended</span>}
              </h3>
              <p>{pl.blurb}</p>
            </div>
            <div className="plan-price">
              <p className="price">
                <span className="price-value">{pl.price}</span>
                <span className="price-period">{pl.period}</span>
              </p>
              <Button href={LINKS.demo} tone={pl.popular ? "ink" : "line"} arrow className="btn-block">
                Book a demo
              </Button>
            </div>
            <div className="plan-list">
              <p className="plan-list-title">What&rsquo;s included</p>
              <ul>
                {pl.features.map((f) => (
                  <li key={f}>
                    <CircleCheck size={17} strokeWidth={1.6} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="rule" aria-hidden>
        <span className="cross cross-l" />
        <span className="cross cross-r" />
      </div>
      <Reveal className="frame terms" y={16}>
        {PRICING.terms.map((t) => (
          <div className="term" key={t.title}>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </div>
        ))}
      </Reveal>
      <div className="rule" aria-hidden>
        <span className="cross cross-l" />
        <span className="cross cross-r" />
      </div>
      <div className="frame topups">
        <Reveal className="topups-head" y={16}>
          <h3>{PRICING.topupsTitle}</h3>
          <ul className="fine">
            {PRICING.fine.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal y={16}>
          <table className="topups-table">
            <caption className="sr-only">{PRICING.topupsTitle}</caption>
            <tbody>
              {PRICING.topups.map((t) => (
                <tr key={t.item}>
                  <th scope="row">{t.item}</th>
                  <td>{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
