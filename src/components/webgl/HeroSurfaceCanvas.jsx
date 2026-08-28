import { useEffect, useRef } from "react";
import { initHeroSurface } from "../../webgl/initHeroSurface";

export default function HeroSurfaceCanvas({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef?.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const api = initHeroSurface(canvas, container);
    return () => api.destroy();
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-[1] h-full w-full"
      aria-hidden="true"
    />
  );
}
