import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import MagneticCard from "./effects/MagneticCard";
import { experience, profile } from "../data/content";

export default function Experience() {
  const sectionRef = useRef(null);
  const lineFillRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lineFill = lineFillRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (lineFill && !prefersReduced) {
        gsap.fromTo(
          lineFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          }
        );
      }

      if (!prefersReduced) {
        gsap.utils.toArray(".exp-item").forEach((item, i) => {
          gsap.from(item, {
            y: 22,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.04,
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="immersive-section relative px-6 py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="experience"
          title={`${profile.fullName}'s experience`}
          subtitle={`Where ${profile.firstName} has shipped AI in production — the same standards brought to every client engagement.`}
        />

        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          >
            <div
              ref={lineFillRef}
              className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent-2 to-accent shadow-[0_0_12px_rgba(168,144,108,0.35)]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {experience.map((item, i) => (
              <div
                key={item.role + item.company}
                className={`exp-item relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 top-8 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <span className="relative h-3 w-3 rounded-full border-2 border-accent bg-ink shadow-[0_0_12px_rgba(168,144,108,0.6)]" />
                </div>

                <div className={`w-full pl-12 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <MagneticCard tiltStrength={4}>
                    <div className="gradient-border neon-glow-hover">
                      <div className="gradient-border-inner p-6 md:p-8">
                        <p className="font-mono-tech text-xs tracking-widest text-accent/60 uppercase">
                          {item.period}
                        </p>
                        <h3 className="mt-2 font-heading text-xl font-bold text-cream md:text-2xl">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-accent">
                          {item.company}
                          <span className="text-muted"> · </span>
                          <span className="text-muted">{item.location}</span>
                        </p>

                        <ul className="mt-6 space-y-3 border-t border-accent/10 pt-6">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-3 text-sm leading-relaxed text-cream-muted"
                            >
                              <span className="mt-0.5 shrink-0 font-mono-tech text-xs text-accent-2">
                                ▹
                              </span>
                              <span className="transition-colors hover:text-cream">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </MagneticCard>
                </div>

                <div className="hidden md:block md:w-1/2" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
