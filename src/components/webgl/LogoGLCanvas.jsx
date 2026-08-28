import { useEffect, useRef } from "react";
import { initLogoScene } from "../../webgl/initLogoScene";
import { useVisualBudget } from "../../hooks/useVisualBudget";

export default function LogoGLCanvas({ apiRef, className = "" }) {
  const canvasRef = useRef(null);
  const budget = useVisualBudget();

  useEffect(() => {
    if (!budget.logoGl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const api = initLogoScene(canvas);
    if (apiRef) apiRef.current = api;

    return () => {
      if (apiRef) apiRef.current = null;
      api.destroy();
    };
  }, [apiRef, budget.logoGl]);

  if (!budget.logoGl) return null;

  return (
    <canvas
      ref={canvasRef}
      width={80}
      height={80}
      className={`pointer-events-none block h-20 w-20 shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}
