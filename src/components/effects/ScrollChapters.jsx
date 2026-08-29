import { useEffect, useState } from "react";
import { animate } from "animejs";
import { navLinks } from "../../data/content";
import { prefersReducedMotion } from "../../lib/animeMotion";

const CHAPTERS = [
  { id: "hero", label: "Hero" },
  ...navLinks.map((l) => ({ id: l.id, label: l.label })),
];

/**
 * Side chapter rail — highlights the section in view while scrolling.
 */
export default function ScrollChapters() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean);
    if (!els.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.08, 0.25, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || prefersReducedMotion()) return;
    const rail = document.querySelector("[data-scroll-chapters]");
    if (!rail) return;
    animate(rail, {
      opacity: [0, 1],
      x: [12, 0],
      duration: 500,
      ease: "outExpo",
    });
  }, [visible]);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!visible) return null;

  return (
    <nav
      data-scroll-chapters
      className="pointer-events-none fixed top-1/2 right-3 z-[80] hidden -translate-y-1/2 lg:block"
      aria-label="Section chapters"
    >
      <ul className="pointer-events-auto flex flex-col gap-1.5 border border-border bg-ink/90 p-2 backdrop-blur-md">
        {CHAPTERS.map((ch) => {
          const on = active === ch.id;
          return (
            <li key={ch.id}>
              <button
                type="button"
                onClick={() => jump(ch.id)}
                className={`group flex w-full items-center gap-2 px-2 py-1.5 text-left transition-colors ${
                  on ? "text-accent" : "text-muted hover:text-cream"
                }`}
                aria-current={on ? "true" : undefined}
              >
                <span
                  className={`h-px transition-all ${on ? "w-5 bg-accent" : "w-2 bg-border group-hover:w-3 group-hover:bg-accent"}`}
                  aria-hidden="true"
                />
                <span className="font-mono-tech text-[9px] tracking-[0.16em] uppercase">
                  {ch.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
