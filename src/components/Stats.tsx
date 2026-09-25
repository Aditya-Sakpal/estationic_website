import { STATS } from "../content";
import { CountUp, InkOnScroll, Reveal } from "../lib/motion";

export function Stats() {
  return (
    <section className="stats" aria-label="Estationic in numbers">
      <div className="frame stats-head">
        <InkOnScroll className="h2 stats-title" text={STATS.title} />
      </div>
      <div className="rule" aria-hidden>
        <span className="cross cross-l" />
        <span className="cross cross-r" />
      </div>
      <Reveal className="frame stats-grid" y={16}>
        {STATS.items.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value">
              <CountUp value={s.value} suffix={s.suffix} />
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
