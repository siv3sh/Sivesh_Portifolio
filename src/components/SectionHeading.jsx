import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion, revealOnScroll } from "../lib/animeMotion";
import { sectionMeta } from "../data/content";

export default function SectionHeading({ sectionKey, title, subtitle }) {
  const ref = useRef(null);
  const meta = sectionMeta[sectionKey];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parts = el.querySelectorAll("[data-heading-part]");

    return revealOnScroll(el, (_target, reduced) => {
      if (reduced || prefersReducedMotion()) {
        animate(parts, { opacity: 1, y: 0, duration: 1 });
        return;
      }
      animate(parts, {
        opacity: [0, 1],
        y: [20, 0],
        ease: "outExpo",
        duration: 850,
        delay: stagger(80),
      });
    });
  }, []);

  return (
    <div ref={ref} className="mb-14 max-w-2xl md:mb-20">
      <div data-heading-part className="flex items-center gap-4 opacity-0">
        <span className="crosshair shrink-0" aria-hidden="true" />
        <span className="label-mono text-accent">{meta?.num}</span>
        <span className="rule-strong max-w-16 flex-1" />
        <span className="label-mono bracket">{meta?.label}</span>
      </div>

      <h2
        data-heading-part
        className="mt-6 font-heading text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] text-cream opacity-0 md:text-[2.75rem]"
      >
        {title}
      </h2>

      {subtitle && (
        <p
          data-heading-part
          className="mt-4 max-w-2xl text-base leading-relaxed text-cream-muted opacity-0 md:text-lg"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
