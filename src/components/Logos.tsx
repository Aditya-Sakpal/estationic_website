import { CLIENTS, LOGOS_LABEL } from "../content";
import { Reveal } from "../lib/motion";

type Client = (typeof CLIENTS)[number] & { wordmark?: string };

function ClientMark({ c, hidden, repeat }: { c: Client; hidden?: boolean; repeat?: boolean }) {
  return (
    <span className={repeat ? "client is-repeat" : "client"}>
      <img src={c.src} alt={hidden ? "" : c.name} style={{ height: c.height }} loading="lazy" decoding="async" />
      {c.wordmark && <span className="client-word">{c.wordmark}</span>}
    </span>
  );
}

export function Logos() {
  // five marks do not span a wide screen, so each half of the loop holds two rounds
  const round = (hidden: boolean, r: number) =>
    (CLIENTS as Client[]).map((c) => <ClientMark key={`${r}-${c.name}`} c={c} hidden={hidden || r > 0} repeat={r > 0} />);
  return (
    <section className="logos" aria-label={LOGOS_LABEL}>
      <Reveal className="frame" y={12}>
        <p className="logos-label">{LOGOS_LABEL}</p>
        <div className="marquee">
          <div className="marquee-track">
            <div className="marquee-set">
              {round(false, 0)}
              {round(false, 1)}
            </div>
            <div className="marquee-set" aria-hidden>
              {round(true, 0)}
              {round(true, 1)}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
