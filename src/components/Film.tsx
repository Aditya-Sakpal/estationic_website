import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { FILM } from "../content";
import { Reveal, Words } from "../lib/motion";

/** The launch film: a still until pressed, so nobody downloads 16 MB unasked. */
export function Film() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const start = () => {
    setPlaying(true);
    video.current?.play().catch(() => setPlaying(false));
  };
  return (
    <section className="section film" id="film" aria-labelledby="film-title">
      <div className="frame">
        <div className="section-head is-center">
          <Words
            as="h2"
            id="film-title"
            className="h2"
            lines={[FILM.title[0], { text: FILM.title[1], className: "tone-2" }]}
          />
          <Words as="p" className="body" lines={[FILM.body]} stagger={0.012} delay={0.2} />
        </div>
        <Reveal className="film-shell" delay={0.1} y={32} amount={0.15}>
          <video
            ref={video}
            className="film-video"
            src={FILM.src}
            poster={FILM.poster}
            preload="none"
            playsInline
            controls={playing}
            onPause={(e) => e.currentTarget.ended && setPlaying(false)}
            aria-label={FILM.label}
          />
          {!playing && (
            <button type="button" className="film-play" onClick={start}>
              <span className="film-play-pill">
                <Play size={16} strokeWidth={2.4} fill="currentColor" aria-hidden />
                <span>{FILM.cta}</span>
                <span className="film-len">{FILM.length}</span>
              </span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
