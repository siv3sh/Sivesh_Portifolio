import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionMeta } from "../data/content";

export default function SectionHeading({ sectionKey, title, subtitle }) {
  const ref = useRef(null);
  const meta = sectionMeta[sectionKey];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-heading-part]"), {
        y: 22,
        opacity: 0,
        stagger: 0.07,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-14 max-w-2xl md:mb-20">
      <div data-heading-part className="flex items-center gap-4">
        <span className="crosshair shrink-0" aria-hidden="true" />
        <span className="label-mono text-accent">{meta?.num}</span>
        <span className="rule-strong max-w-16 flex-1" />
        <span className="label-mono bracket">{meta?.label}</span>
      </div>

      <h2
        data-heading-part
        className="mt-6 font-heading text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] text-cream md:text-[2.75rem]"
      >
        {title}
      </h2>

      {subtitle && (
        <p
          data-heading-part
          className="mt-4 max-w-2xl text-base leading-relaxed text-cream-muted md:text-lg"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
