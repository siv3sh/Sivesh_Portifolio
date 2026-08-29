import { useEffect, useRef } from "react";
import {
  animate,
  createTimeline,
  scrambleText,
  splitText,
  stagger,
} from "animejs";
import SectionHeading from "./SectionHeading";
import SignalFrame from "./effects/SignalFrame";
import { aboutHighlights, profile, idealClients } from "../data/content";
import { brand } from "../data/brand";
import { prefersReducedMotion, revealOnScroll } from "../lib/animeMotion";

const FACTS = [
  ["Role", "Junior AI Engineer @ Ideaelan"],
  ["Education", "MSc AI & ML · CHRIST, Bangalore"],
  ["Focus", "RAG · Agents · LLM products"],
  ["Delivery", "Architecture → ship → handoff"],
];

const TRAITS = ["Reliable", "Transparent", "Outcome-driven"];

/**
 * About — primary identity section with Anime.js immersives.
 */
export default function About() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const panelRef = useRef(null);
  const copyRef = useRef(null);
  const listRef = useRef(null);
  const factsRef = useRef(null);
  const clientsRef = useRef(null);
  const splitRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = prefersReducedMotion();

    const stopPanel = revealOnScroll(panelRef.current, (_el, isReduced) => {
      const nameEl = nameRef.current;
      const roleEl = roleRef.current;
      const facts = factsRef.current?.querySelectorAll("[data-about-fact]");
      const traits = panelRef.current?.querySelectorAll("[data-about-trait]");
      const portrait = panelRef.current?.querySelector("[data-about-portrait]");

      if (isReduced || reduced) {
        animate(
          [nameEl, roleEl, portrait, ...(facts || []), ...(traits || [])].filter(Boolean),
          { opacity: 1, y: 0, duration: 1 }
        );
        return;
      }

      let split = null;
      if (nameEl) {
        split = splitText(nameEl, { chars: true, accessible: true });
        splitRef.current = split;
        animate(split.chars, { opacity: 0, y: 24, duration: 1 });
        nameEl.style.opacity = "1";
      }

      const tl = createTimeline({ defaults: { ease: "outExpo" } });

      if (portrait) {
        tl.add(portrait, {
          opacity: [0, 1],
          y: [28, 0],
          duration: 900,
        });
      }

      if (split?.chars?.length) {
        tl.add(
          split.chars,
          {
            opacity: [0, 1],
            y: [24, 0],
            rotateX: [-50, 0],
            duration: 780,
            delay: stagger(22),
          },
          "-=500"
        );
      }

      if (roleEl) {
        tl.add(roleEl, { opacity: [0, 1], duration: 180 }, "-=400");
        tl.add(
          roleEl,
          {
            text: scrambleText({
              chars: "uppercase",
              from: "left",
              cursor: false,
            }),
            duration: 1000,
            ease: "outExpo",
          },
          "<"
        );
      }

      if (facts?.length) {
        tl.add(
          facts,
          {
            opacity: [0, 1],
            x: [-12, 0],
            duration: 600,
            delay: stagger(60),
          },
          "-=500"
        );
      }

      if (traits?.length) {
        tl.add(
          traits,
          {
            opacity: [0, 1],
            scale: [0.92, 1],
            duration: 500,
            delay: stagger(50),
          },
          "-=350"
        );
      }
    });

    const stopCopy = revealOnScroll(copyRef.current, (_el, isReduced) => {
      const paras = copyRef.current?.querySelectorAll("[data-about-copy]");
      if (!paras?.length) return;
      if (isReduced || reduced) {
        animate(paras, { opacity: 1, y: 0, duration: 1 });
        return;
      }
      animate(paras, {
        opacity: [0, 1],
        y: [20, 0],
        ease: "outExpo",
        duration: 800,
        delay: stagger(100),
      });
    });

    const stopList = revealOnScroll(listRef.current, (_el, isReduced) => {
      const items = listRef.current?.querySelectorAll(".about-highlight");
      if (!items?.length) return;
      if (isReduced || reduced) {
        animate(items, { opacity: 1, y: 0, duration: 1 });
        return;
      }
      animate(items, {
        opacity: [0, 1],
        y: [22, 0],
        ease: "outExpo",
        duration: 720,
        delay: stagger(75),
      });
    });

    const stopClients = revealOnScroll(clientsRef.current, (_el, isReduced) => {
      const chips = clientsRef.current?.querySelectorAll("[data-about-client]");
      if (!chips?.length) return;
      if (isReduced || reduced) {
        animate(chips, { opacity: 1, y: 0, duration: 1 });
        return;
      }
      animate(chips, {
        opacity: [0, 1],
        y: [14, 0],
        ease: "outExpo",
        duration: 650,
        delay: stagger(55),
      });
    });

    return () => {
      stopPanel();
      stopCopy();
      stopList();
      stopClients();
      splitRef.current?.revert?.();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="immersive-section relative overflow-hidden px-6 py-28 md:py-36"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="about"
          title={`Meet ${profile.fullName}`}
          subtitle={`${profile.role} for founders and product teams who want one person accountable for delivery — from architecture through launch.`}
        />

        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Identity panel */}
          <div ref={panelRef} className="lg:col-span-5">
            <SignalFrame className="h-full">
              <div className="border border-[var(--color-border-strong)] bg-surface-raised/80 p-6 md:p-8">
                <div
                  data-about-portrait
                  className="relative mb-8 opacity-0"
                >
                  <div className="pointer-events-none absolute -inset-px border border-accent/40" aria-hidden="true" />
                  <div className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t border-l border-accent" aria-hidden="true" />
                  <div className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t border-r border-accent" aria-hidden="true" />
                  <div className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent" aria-hidden="true" />
                  <div className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-b border-r border-accent" aria-hidden="true" />
                  <img
                    src="/sivesh-portrait.png?v=9"
                    alt={`${profile.fullName} — ${profile.role}`}
                    className="mx-auto block w-full max-w-[16rem] object-contain object-top"
                    width={320}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="mt-3 text-center font-mono-tech text-[10px] tracking-[0.2em] text-accent uppercase">
                    [{brand.monogram} · IDENTITY]
                  </p>
                </div>

                <p className="font-mono-tech text-[10px] tracking-[0.2em] text-muted uppercase">
                  Profile
                </p>
                <h3
                  ref={nameRef}
                  className="mt-2 font-heading text-3xl font-medium tracking-[-0.03em] text-cream md:text-4xl"
                  style={{ perspective: "600px" }}
                >
                  {profile.fullName}
                </h3>
                <p
                  ref={roleRef}
                  className="mt-2 font-mono-tech text-[11px] tracking-[0.16em] text-accent uppercase opacity-0"
                >
                  Junior AI Engineer @ Ideaelan · Remote
                </p>

                <p className="mt-5 text-sm leading-relaxed text-cream-muted">
                  Shipping production AI for support and operations — the same standards{" "}
                  {profile.firstName} brings to every client project.
                </p>

                <div ref={factsRef} className="mt-8 space-y-3 border-t border-border pt-6">
                  {FACTS.map(([k, v]) => (
                    <div
                      key={k}
                      data-about-fact
                      className="flex items-baseline justify-between gap-4 text-sm opacity-0"
                    >
                      <span className="font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase">
                        {k}
                      </span>
                      <span className="text-right text-cream-muted">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {TRAITS.map((tag) => (
                    <span
                      key={tag}
                      data-about-trait
                      className="border border-border px-2.5 py-1 font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase opacity-0"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SignalFrame>
          </div>

          {/* Narrative + highlights */}
          <div className="flex flex-col lg:col-span-7">
            <div ref={copyRef} className="space-y-4">
              <p
                data-about-copy
                className="text-lg leading-relaxed text-cream-muted opacity-0 md:text-xl"
              >
                Most AI projects fail in the gap between demo and deployment.{" "}
                {profile.firstName} closes that gap: scoped builds, honest timelines, and
                systems your team can actually run after handoff.
              </p>
              <p data-about-copy className="leading-relaxed text-muted opacity-0">
                Whether you need a RAG assistant, multi-agent workflow, or full-stack AI
                product — with {profile.fullName} you get one point of contact who owns
                delivery and keeps you informed every step.
              </p>
            </div>

            <ul ref={listRef} className="mt-8 space-y-3">
              {aboutHighlights.map((item) => (
                <li
                  key={item}
                  className="about-highlight group flex gap-4 border border-border bg-surface-raised/50 p-4 opacity-0 transition-colors hover:border-accent"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-accent/40 font-mono-tech text-[10px] text-accent"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-cream-muted transition-colors group-hover:text-cream sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div ref={clientsRef} className="mt-10 border-t border-border pt-8">
              <p className="font-mono-tech text-[10px] tracking-[0.2em] text-accent uppercase">
                [Best fit]
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {idealClients.map((client) => (
                  <span
                    key={client}
                    data-about-client
                    className="border border-border px-3 py-2 font-mono-tech text-[10px] tracking-[0.1em] text-muted uppercase opacity-0"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
