import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { LINKS, PRICING } from "../content";
import { Reveal, Words } from "../lib/motion";
import { Button } from "./ui";

type Audience = "project" | "partner";

export function Pricing() {
  const [who, setWho] = useState<Audience>("project");
  const list =
    who === "project"
      ? { title: PRICING.title, body: PRICING.body, plans: PRICING.plans, terms: PRICING.terms }
      : PRICING.partner;

  return (
    <section className="section pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="frame">
        <div className="section-head is-split">
          <Words
            key={`t-${who}`}
            as="h2"
            id="pricing-title"
            className="h2"
            lines={[list.title[0], { text: list.title[1], className: "tone-2" }]}
          />
          <div className="pricing-intro">
            <Words key={`b-${who}`} as="p" className="body" lines={[list.body]} stagger={0.012} delay={0.2} />
            <div className="audience" role="tablist" aria-label="Who the prices are for">
              {(Object.keys(PRICING.tabs) as Audience[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  id={`aud-${k}`}
                  aria-selected={who === k}
                  aria-controls="pricing-plans"
                  className={`audience-tab${who === k ? " is-on" : ""}`}
                  onClick={() => setWho(k)}
                >
                  {PRICING.tabs[k]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rule" aria-hidden>
        <span className="cross cross-l" />
        <span className="cross cross-r" />
      </div>
      <div className="frame plans" id="pricing-plans" role="tabpanel" aria-labelledby={`aud-${who}`}>
        {list.plans.map((pl, k) => (
          <Reveal key={`${who}-${pl.name}`} className={`plan${pl.popular ? " is-popular" : ""}`} delay={k * 0.08} y={20}>
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
      <Reveal key={`terms-${who}`} className="frame terms" y={16}>
        {list.terms.map((t) => (
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
