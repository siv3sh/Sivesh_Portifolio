import { useEffect, useRef, useState } from "react";
import { createAnimatable } from "animejs";
import { prefersReducedMotion } from "../../lib/animeMotion";

/**
 * Top progress bar + live percent — driven by scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    if (prefersReducedMotion()) {
      const sync = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${p})`;
        setPct(Math.round(p * 100));
      };
      window.addEventListener("scroll", sync, { passive: true });
      sync();
      return () => window.removeEventListener("scroll", sync);
    }

    const anim = createAnimatable(bar, {
      scaleX: { duration: 120, ease: "out(2)" },
    });
    anim.scaleX(0);

    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      anim.scaleX(p);
      setPct(Math.round(p * 100));
    };

    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      window.removeEventListener("scroll", sync);
      anim.revert?.();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div className="h-[2px] w-full">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        />
      </div>
      <p className="absolute top-2 right-3 font-mono-tech text-[9px] tracking-[0.18em] text-muted uppercase">
        {String(pct).padStart(2, "0")}%
      </p>
    </div>
  );
}
