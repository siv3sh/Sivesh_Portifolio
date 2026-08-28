import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionMeta } from "../data/content";
import { BrandMark } from "./brand";

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
    <div ref={ref} className="mb-14 md:mb-20">
      <div data-heading-part className="mb-6 flex items-center gap-3 sm:gap-4">
        <span className="font-mono-tech text-sm font-semibold tracking-widest text-muted">
          {meta?.num}
        </span>
        <div className="section-line min-w-8 flex-1" />
        <BrandMark size="sm" className="opacity-80" />
        <div className="section-line min-w-8 flex-1" />
        <span className="font-mono-tech text-xs tracking-[0.25em] text-muted uppercase">
          {meta?.label}
        </span>
      </div>

      <h2
        data-heading-part
        className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
      >
        <span className="text-gradient">{title}</span>
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
