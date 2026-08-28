import { useEffect, useRef } from "react";
import { useVisualBudget } from "../../hooks/useVisualBudget";

const PARTICLE_RGB = "168, 144, 108";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const budget = useVisualBudget();

  useEffect(() => {
    if (!budget.particles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId = 0;
    let particles = [];
    let running = true;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const area = window.innerWidth * window.innerHeight;
      const count = Math.min(16, Math.max(8, Math.floor(area / 90000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.28 + 0.1,
      }));
    };

    const draw = (now) => {
      if (!running) return;
      animationId = requestAnimationFrame(draw);

      // ~30fps cap — enough for ambient dots, half the main-thread cost
      if (now - last < 32) return;
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_RGB}, ${p.opacity})`;
        ctx.fill();
      }
      // Line links removed — O(n²) was the main cost
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = 0;
        animationId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animationId);
      }
    };

    const onResize = () => {
      resize();
      init();
    };

    resize();
    init();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [budget.particles]);

  if (!budget.particles) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-10"
      aria-hidden="true"
    />
  );
}
