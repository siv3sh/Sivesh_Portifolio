import { animate, createTimeline, stagger } from "animejs";

/** @returns {boolean} */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Staggered fade/rise for a NodeList or selector inside a root.
 */
export function riseIn(targets, { delay = 0, staggerMs = 70, duration = 800 } = {}) {
  if (prefersReducedMotion()) {
    animate(targets, { opacity: 1, y: 0, duration: 1 });
    return null;
  }

  return animate(targets, {
    opacity: [0, 1],
    y: [22, 0],
    ease: "outExpo",
    duration,
    delay: stagger(staggerMs, { start: delay }),
  });
}

/**
 * Timeline helper with site defaults.
 */
export function motionTimeline(params = {}) {
  return createTimeline({
    defaults: { ease: "outExpo", duration: 800 },
    ...params,
  });
}

/**
 * Play anime.js animation once when element enters the viewport.
 * Uses IntersectionObserver for reliable triggers; anime.js for motion.
 * @returns {() => void} cleanup
 */
export function revealOnScroll(target, animationFactory) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return () => {};

  if (prefersReducedMotion()) {
    animationFactory?.(el, true);
    return () => {};
  }

  let played = false;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting || played) return;
      played = true;
      animationFactory?.(el, false);
      io.disconnect();
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  io.observe(el);
  return () => io.disconnect();
}
