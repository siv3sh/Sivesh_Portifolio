import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useVisualBudget } from "../../hooks/useVisualBudget";
import { updateScrollField, scrollField } from "../../lib/scrollField";
import StellarSwarm from "../effects/StellarSwarm";

/**
 * Full-site ambient stellar field — fixed behind content.
 * Mounts after idle; reacts to scroll via shared scrollField signal.
 */
export default function GlobalSwarmCanvas() {
  const budget = useVisualBudget();
  const [ready, setReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const t = setTimeout(enable, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    let decayTimer = 0;

    const onScroll = () => {
      updateScrollField();
      window.clearTimeout(decayTimer);
      // Ease velocity back to 0 after scroll stops
      decayTimer = window.setTimeout(() => {
        scrollField.velocity *= 0.35;
        if (Math.abs(scrollField.velocity) < 0.00008) {
          scrollField.velocity = 0;
          scrollField.scrolling = false;
        } else {
          decayTimer = window.setTimeout(() => {
            scrollField.velocity = 0;
            scrollField.scrolling = false;
          }, 120);
        }
      }, 80);
    };

    updateScrollField();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(decayTimer);
    };
  }, []);

  if (!budget.heroGl || !ready) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.32] sm:opacity-[0.38]"
      aria-hidden="true"
    >
      <Canvas
        frameloop={pageVisible ? "always" : "never"}
        dpr={1}
        camera={{ position: [0, 0, 95], fov: 45, near: 1, far: 300 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          stencil: false,
          depth: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#0c0b0a", 55, 140]} />
        <Suspense fallback={null}>
          <StellarSwarm count={480} radius={40} />
        </Suspense>
      </Canvas>
    </div>
  );
}
