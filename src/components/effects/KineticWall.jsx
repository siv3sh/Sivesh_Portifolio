import { useEffect, useRef } from "react";
import {
  animate,
  createTimeline,
  scrambleText,
  splitText,
  stagger,
  utils,
} from "animejs";
import { brand } from "../../data/brand";
import { heroStats, profile } from "../../data/content";
import { prefersReducedMotion, revealOnScroll } from "../../lib/animeMotion";

const HEADLINES = [
  brand.line,
  "RETRIEVE · REASON · ACT",
  "PRODUCTION · NOT PROTOTYPE",
];

const QUAD_NOTES = [
  { corner: "NW", label: "SCOPE", body: "Fixed proposals · clear milestones" },
  { corner: "NE", label: "STACK", body: "RAG · agents · LLM apps" },
  { corner: "SW", label: "SIGNAL", body: "Anime.js kinetic field" },
  { corner: "SE", label: "OWNED", body: "Architecture → ship → handoff" },
];

/**
 * Full kinetic wall — 4-quadrant HUD + giant type (Anime.js).
 */
export default function KineticWall() {
  const rootRef = useRef(null);
  const lineRefs = useRef([]);
  const splitsRef = useRef([]);
  const meterRef = useRef(null);
  const tagRef = useRef(null);
  const quadRefs = useRef([]);
  const statRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    return revealOnScroll(root, (_el, reduced) => {
      const lines = lineRefs.current.filter(Boolean);
      const quads = quadRefs.current.filter(Boolean);
      const stats = statRefs.current.filter(Boolean);

      const showAll = () => {
        lines.forEach((line) => {
          line.style.opacity = "1";
        });
        quads.forEach((q) => {
          q.style.opacity = "1";
        });
        stats.forEach((s) => {
          s.style.opacity = "1";
        });
        if (tagRef.current) tagRef.current.style.opacity = "1";
        if (meterRef.current) meterRef.current.style.width = "100%";
      };

      if (reduced || prefersReducedMotion()) {
        showAll();
        return;
      }

      // Ensure parents are visible — chars animate individually
      lines.forEach((line) => {
        line.style.opacity = "1";
      });

      const splits = [];
      lines.forEach((line) => {
        try {
          const split = splitText(line, { chars: true, accessible: true });
          splits.push(split);
          if (split?.chars?.length) {
            animate(split.chars, { opacity: 0, y: 56, rotateX: -55, duration: 1 });
          }
        } catch {
          line.style.opacity = "1";
        }
      });
      splitsRef.current = splits;

      const tl = createTimeline({ defaults: { ease: "outExpo" } });

      if (tagRef.current) {
        tl.add(tagRef.current, {
          opacity: [0, 1],
          y: [12, 0],
          duration: 500,
        });
      }

      if (quads.length) {
        tl.add(
          quads,
          {
            opacity: [0, 1],
            y: [18, 0],
            duration: 700,
            delay: stagger(80),
          },
          "-=200"
        );
      }

      splits.forEach((split, i) => {
        if (!split?.chars?.length) return;
        tl.add(
          split.chars,
          {
            opacity: [0, 1],
            y: [56, 0],
            rotateX: [-55, 0],
            duration: 820,
            delay: stagger(16),
          },
          i === 0 ? "-=300" : "-=520"
        );
      });

      if (stats.length) {
        tl.add(
          stats,
          {
            opacity: [0, 1],
            y: [14, 0],
            duration: 650,
            delay: stagger(70),
          },
          "-=450"
        );

        stats.forEach((stat) => {
          const valueEl = stat.querySelector("[data-kw-metric]");
          if (!valueEl) return;
          const raw = valueEl.dataset.kwMetric || "";
          const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
          if (!match) return;
          const target = Number(match[1]);
          const suffix = match[2] || "";
          const state = { v: 0 };
          animate(state, {
            v: target,
            ease: "outExpo",
            duration: 1400,
            delay: 200,
            onUpdate: () => {
              valueEl.textContent = `${utils.round(state.v, 0)}${suffix}`;
            },
          });
        });
      }

      if (meterRef.current) {
        tl.add(
          meterRef.current,
          {
            width: ["0%", "100%"],
            duration: 1200,
            ease: "inOut(3)",
          },
          "-=700"
        );
      }

      splits.forEach((split, i) => {
        if (!split?.chars?.length) return;
        animate(split.chars, {
          y: [
            { to: -6, ease: "inOutSine", duration: 1000 },
            { to: 6, ease: "inOutSine", duration: 1000 },
            { to: 0, ease: "inOutSine", duration: 1000 },
          ],
          delay: stagger(36, { start: 1400 + i * 160 }),
          loop: true,
        });
      });

      if (tagRef.current) {
        animate(tagRef.current, {
          text: scrambleText({
            chars: "uppercase",
            from: "left",
            cursor: false,
          }),
          duration: 1200,
          ease: "outExpo",
          delay: 600,
          loop: true,
          loopDelay: 3200,
        });
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      splitsRef.current.forEach((s) => s?.revert?.());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="kinetic-wall relative overflow-hidden border-y border-[var(--color-border-strong)] bg-ink px-6 py-16 md:py-20"
      aria-label="Kinetic signal wall"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[color-mix(in_oklab,var(--color-accent)_35%,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[color-mix(in_oklab,var(--color-accent)_25%,transparent)]"
        aria-hidden="true"
      />

      {/* Four quadrant notes */}
      <div className="pointer-events-none absolute inset-0 z-[1] mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="grid h-full min-h-[70vh] grid-cols-2 grid-rows-2 gap-0">
          {QUAD_NOTES.map((note, i) => (
            <div
              key={note.corner}
              ref={(el) => {
                quadRefs.current[i] = el;
              }}
              className={`flex opacity-0 ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              } ${i < 2 ? "items-start" : "items-end"}`}
            >
              <div
                className={`max-w-[12rem] ${i % 2 === 1 ? "text-right" : "text-left"}`}
              >
                <p className="font-mono-tech text-[9px] tracking-[0.2em] text-accent uppercase">
                  [{note.corner} · {note.label}]
                </p>
                <p className="mt-1.5 font-mono-tech text-[10px] leading-relaxed tracking-[0.08em] text-muted uppercase">
                  {note.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center composition */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center py-20">
        <p
          ref={tagRef}
          className="font-mono-tech text-[11px] tracking-[0.28em] text-accent uppercase opacity-0"
        >
          [{brand.monogram} · KINETIC SIGNAL]
        </p>

        <div className="mt-6 space-y-2 md:mt-8 md:space-y-3" style={{ perspective: "900px" }}>
          {HEADLINES.map((text, i) => (
            <p
              key={text}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={`font-heading font-medium tracking-[-0.05em] text-cream ${
                i === 0
                  ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                  : "text-2xl text-cream-muted sm:text-3xl md:text-4xl lg:text-5xl"
              }`}
            >
              {text}
            </p>
          ))}
        </div>

        <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
          {heroStats.slice(0, 3).map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => {
                statRefs.current[i] = el;
              }}
              className="border border-border bg-surface-raised/80 px-4 py-3 opacity-0 backdrop-blur-sm"
            >
              <p
                data-kw-metric={stat.value}
                className="font-heading text-2xl font-medium tracking-[-0.03em] text-cream md:text-3xl"
              >
                {stat.value}
              </p>
              <p className="mt-1 font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 h-px max-w-md bg-[var(--color-border)]">
          <div ref={meterRef} className="h-px w-0 bg-accent" />
        </div>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream-muted">
          {profile.firstName} builds production AI systems — this wall is the signal layer:
          retrieve, reason, act, then ship.
        </p>
      </div>
    </section>
  );
}
