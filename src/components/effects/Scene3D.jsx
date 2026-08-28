import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CgiScene from "./CgiScene";

export default function Scene3D() {
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 480;
    if (reduced) {
      setActive(false);
      return;
    }
    if (narrow) {
      setActive(false);
      return;
    }

    const update = (y) => setScrollY(y ?? window.scrollY);
    const onLenis = (e) => update(e.detail);
    const onScroll = () => update(window.scrollY);

    window.addEventListener("lenis-scroll", onLenis);
    window.addEventListener("scroll", onScroll, { passive: true });
    update(window.lenis?.scroll ?? window.scrollY);

    return () => {
      window.removeEventListener("lenis-scroll", onLenis);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!active) return null;

  const opacity = Math.max(0.08, (1 - scrollY / 850) * 0.5);

  return (
    <div
      className="scene-3d pointer-events-none fixed inset-0 z-[2]"
      style={{ opacity }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.3, 9], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <CgiScene scrollY={scrollY} />
        </Canvas>
      </Suspense>
    </div>
  );
}
