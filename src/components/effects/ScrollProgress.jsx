import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  const barRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const glow = glowRef.current;
    if (!bar) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
      },
    });

    const glowTween = glow
      ? gsap.to(glow, {
          opacity: 1,
          scrollTrigger: {
            start: "top top",
            end: "20% top",
            scrub: true,
          },
        })
      : null;

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    return () => {
      tween.scrollTrigger?.kill();
      glowTween?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]">
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent-2/20 to-accent/20 opacity-0 blur-sm"
        aria-hidden="true"
      />
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-accent via-accent-dim to-accent-2 shadow-[0_0_16px_rgba(224,122,74,0.45)]"
        style={{ transform: "scaleX(0)" }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
