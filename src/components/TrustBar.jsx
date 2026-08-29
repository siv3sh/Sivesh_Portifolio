import { useEffect, useRef } from "react";
import { animate, createTimeline, scrambleText, stagger } from "animejs";
import { trustPillars, profile, contactAssurances } from "../data/content";
import { prefersReducedMotion, revealOnScroll } from "../lib/animeMotion";

/**
 * Trust / “why work with me” band — dense, technical, Anime.js-driven.
 */
export default function TrustBar() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const listRef = useRef(null);
  const sideRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = prefersReducedMotion();

    const stopIntro = revealOnScroll(introRef.current, (_el, isReduced) => {
      const parts = introRef.current?.querySelectorAll("[data-trust-intro]");
      if (!parts?.length) return;

      if (isReduced || reduced) {
        animate(parts, { opacity: 1, y: 0, duration: 1 });
        return;
      }

      const tl = createTimeline({ defaults: { ease: "outExpo" } });
      tl.add(parts, {
        opacity: [0, 1],
        y: [18, 0],
        duration: 750,
        delay: stagger(70),
      });

      if (titleRef.current) {
        tl.add(
          titleRef.current,
          {
            text: scrambleText({
              chars: "uppercase",
              from: "left",
              cursor: false,
            }),
            duration: 900,
            ease: "outExpo",
          },
          "-=400"
        );
      }
    });

    const stopList = revealOnScroll(listRef.current, (_el, isReduced) => {
      const rows = listRef.current?.querySelectorAll("[data-trust-row]");
      if (!rows?.length) return;
      if (isReduced || reduced) {
        animate(rows, { opacity: 1, x: 0, duration: 1 });
        return;
      }
      animate(rows, {
        opacity: [0, 1],
        x: [-16, 0],
        ease: "outExpo",
        duration: 700,
        delay: stagger(85),
      });
    });

    const stopSide = revealOnScroll(sideRef.current, (_el, isReduced) => {
      const bits = sideRef.current?.querySelectorAll("[data-trust-side]");
      if (!bits?.length) return;
      if (isReduced || reduced) {
        animate(bits, { opacity: 1, y: 0, duration: 1 });
        return;
      }
      animate(bits, {
        opacity: [0, 1],
        y: [16, 0],
        ease: "outExpo",
        duration: 700,
        delay: stagger(80),
      });
    });

    return () => {
      stopIntro();
      stopList();
      stopSide();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="relative overflow-hidden border-y border-border bg-surface px-6 py-20 md:py-28"
      aria-label={`Why clients trust ${profile.firstName}`}
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div ref={introRef} className="max-w-3xl">
          <div data-trust-intro className="flex items-center gap-4 opacity-0">
            <span className="crosshair shrink-0" aria-hidden="true" />
            <span className="label-mono text-accent">00</span>
            <span className="rule-strong max-w-16 flex-1" />
            <span className="label-mono bracket">
              Why clients trust {profile.firstName}
            </span>
          </div>

          <h2
            data-trust-intro
            className="mt-6 font-heading text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] text-cream opacity-0 md:text-[2.75rem]"
          >
            Work with {profile.fullName}
          </h2>

          <p
            ref={titleRef}
            data-trust-intro
            className="mt-3 font-mono-tech text-[11px] tracking-[0.18em] text-accent uppercase opacity-0"
          >
            One engineer · clear scope · measurable delivery
          </p>

          <p
            data-trust-intro
            className="mt-5 max-w-2xl text-base leading-relaxed text-cream-muted opacity-0 md:text-lg"
          >
            When you hire {profile.fullName}, you get one accountable engineer — clear
            communication, production-grade delivery, and outcomes you can measure.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <ol ref={listRef} className="space-y-0 lg:col-span-7">
            {trustPillars.map((pillar, i) => (
              <li
                key={pillar.title}
                data-trust-row
                className="group flex gap-5 border-t border-border py-5 opacity-0 last:border-b md:py-6"
              >
                <span className="mt-1 w-10 shrink-0 font-mono-tech text-[11px] tracking-[0.16em] text-accent uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading text-xl font-medium tracking-[-0.03em] text-cream transition-colors group-hover:text-accent md:text-2xl">
                      {pillar.title}
                    </h3>
                    <span
                      className="hidden shrink-0 font-mono-tech text-lg text-accent/40 sm:block"
                      aria-hidden="true"
                    >
                      {pillar.icon}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-muted md:text-base">
                    {pillar.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside ref={sideRef} className="lg:col-span-5">
            <div
              data-trust-side
              className="border border-[var(--color-border-strong)] bg-ink p-6 opacity-0 md:p-8"
            >
              <p className="font-mono-tech text-[10px] tracking-[0.2em] text-accent uppercase">
                [Engagement promise]
              </p>
              <p className="mt-4 font-heading text-2xl font-medium tracking-[-0.03em] text-cream md:text-3xl">
                No demo theater. Production systems your team can run.
              </p>
              <ul className="mt-6 space-y-3">
                {contactAssurances.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-cream-muted">
                    <span className="mt-0.5 text-accent" aria-hidden="true">
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-neon px-5 py-3 text-center">
                  Book a free discovery call
                </a>
                <a
                  href="#about"
                  className="border border-[var(--color-border-strong)] px-5 py-3 text-center font-mono-tech text-[11px] tracking-[0.16em] text-cream uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  Meet {profile.firstName}
                </a>
              </div>
            </div>

            <div
              data-trust-side
              className="mt-4 grid grid-cols-2 gap-3 opacity-0"
            >
              {[
                ["01", "Discovery", "30 min free"],
                ["02", "Proposal", "Fixed scope"],
                ["03", "Build", "Weekly demos"],
                ["04", "Handoff", "Docs included"],
              ].map(([num, title, meta]) => (
                <div
                  key={num}
                  className="border border-border bg-ink/80 px-4 py-3"
                >
                  <p className="font-mono-tech text-[10px] tracking-[0.16em] text-accent uppercase">
                    {num}
                  </p>
                  <p className="mt-1 font-heading text-base tracking-[-0.02em] text-cream">
                    {title}
                  </p>
                  <p className="mt-0.5 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
                    {meta}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
