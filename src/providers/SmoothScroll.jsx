import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      ScrollTrigger.config({ limitCallbacks: true });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);
      requestAnimationFrame(refresh);
      return () => window.removeEventListener("resize", refresh);
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      infinite: false,
      anchors: true,
    });

    window.lenis = lenis;
    document.documentElement.classList.add("lenis");

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const onLenisScroll = () => {
      window.dispatchEvent(new CustomEvent("lenis-scroll", { detail: lenis.scroll }));
    };
    lenis.on("scroll", onLenisScroll);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refreshScroll = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refreshScroll);

    const refreshTimeout = setTimeout(refreshScroll, 100);
    const refreshTimeout2 = setTimeout(refreshScroll, 500);

    return () => {
      clearTimeout(refreshTimeout);
      clearTimeout(refreshTimeout2);
      window.removeEventListener("resize", refreshScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
      delete window.lenis;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, []);

  return children;
}
