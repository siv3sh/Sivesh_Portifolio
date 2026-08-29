import { useEffect, useRef } from "react";
import { animate, createDrawable } from "animejs";
import { prefersReducedMotion, revealOnScroll } from "../../lib/animeMotion";

/**
 * Immersive SVG frame — path draws when the block enters view,
 * then a soft scanline sweeps once.
 */
export default function SignalFrame({ className = "", children }) {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const scanRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return undefined;

    return revealOnScroll(root, (_el, reduced) => {
      if (reduced || prefersReducedMotion()) {
        path.style.strokeDasharray = "none";
        if (scanRef.current) scanRef.current.style.opacity = "0";
        return;
      }

      try {
        const drawables = createDrawable(path);
        const drawable = drawables[0];
        if (!drawable) return;

        animate(drawable, {
          draw: ["0 0", "0 1"],
          ease: "inOut(3)",
          duration: 1400,
        });
      } catch {
        animate(path, {
          opacity: [0, 1],
          duration: 800,
          ease: "outExpo",
        });
      }

      if (scanRef.current) {
        animate(scanRef.current, {
          top: ["0%", "100%"],
          opacity: [0, 0.75, 0],
          ease: "inOut(2)",
          duration: 1500,
          delay: 180,
        });
      }
    });
  }, []);

  return (
    <div ref={rootRef} className={`signal-frame relative ${className}`}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-accent/60"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M 2 2 H 98 V 98 H 2 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
        />
      </svg>
      <div
        ref={scanRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0"
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
