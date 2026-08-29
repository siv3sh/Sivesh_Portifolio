import { useEffect, useRef } from "react";
import { createAnimatable, utils } from "animejs";
import { prefersReducedMotion } from "../../lib/animeMotion";

/**
 * Desktop-only cursor field — soft accent orb + crosshair that tracks the pointer.
 * Disabled on coarse pointers / reduced motion.
 */
export default function CursorField() {
  const orbRef = useRef(null);
  const crossRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const orb = orbRef.current;
    const cross = crossRef.current;
    if (!orb || !cross) return undefined;

    const orbAnim = createAnimatable(orb, {
      x: 0,
      y: 0,
      ease: "out(3)",
      duration: 800,
    });

    const crossAnim = createAnimatable(cross, {
      x: 0,
      y: 0,
      ease: "out(2)",
      duration: 280,
    });

    let visible = false;
    const root = document.documentElement;

    const onMove = (e) => {
      if (!visible) {
        visible = true;
        orb.style.opacity = "1";
        cross.style.opacity = "1";
      }
      const x = e.clientX;
      const y = e.clientY;
      orbAnim.x(x);
      orbAnim.y(y);
      crossAnim.x(x);
      crossAnim.y(y);
      root.style.setProperty("--pointer-x", `${utils.round(x, 0)}px`);
      root.style.setProperty("--pointer-y", `${utils.round(y, 0)}px`);
    };

    const onLeave = () => {
      visible = false;
      orb.style.opacity = "0";
      cross.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      orbAnim.revert?.();
      crossAnim.revert?.();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[40] hidden md:block" aria-hidden="true">
      <div
        ref={orbRef}
        className="cursor-orb absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
      />
      <div
        ref={crossRef}
        className="cursor-cross absolute top-0 left-0 opacity-0"
      >
        <span className="cursor-cross-h" />
        <span className="cursor-cross-v" />
      </div>
    </div>
  );
}
