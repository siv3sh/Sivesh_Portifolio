import { useEffect, useRef } from "react";
import { initFloatingObjects } from "../../webgl/initFloatingObjects";
import { useVisualBudget } from "../../hooks/useVisualBudget";

export default function HeroGLCanvas({ sectionRef }) {
  const canvasRef = useRef(null);
  const budget = useVisualBudget();

  useEffect(() => {
    if (!budget.heroGl) return;

    const canvas = canvasRef.current;
    const bounds = sectionRef?.current;
    if (!canvas || !bounds) return;

    const api = initFloatingObjects(canvas, bounds, { dprCap: budget.dpr });
    let inView = true;

    const syncActive = () => {
      api.setActive(inView && document.visibilityState === "visible");
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
        syncActive();
      },
      { threshold: [0, 0.05, 0.25] }
    );
    io.observe(bounds);

    document.addEventListener("visibilitychange", syncActive);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", syncActive);
      api.destroy();
    };
  }, [sectionRef, budget.heroGl, budget.dpr]);

  if (!budget.heroGl) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-40 sm:opacity-50"
      aria-hidden="true"
    />
  );
}
