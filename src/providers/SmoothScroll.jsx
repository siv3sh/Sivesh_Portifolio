import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Native scroll + ScrollTrigger refresh.
 * Lenis was removed — it made wheel feel laggy and competed with WebGL for rAF.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh, { passive: true });
    const id = requestAnimationFrame(refresh);
    const t = setTimeout(refresh, 200);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return children;
}
