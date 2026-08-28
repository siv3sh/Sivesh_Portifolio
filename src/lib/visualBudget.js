/**
 * Device / preference budget for decorative effects.
 * Layout, colors, and motion polish stay intact — this only gates cost.
 */

export function getVisualBudget() {
  if (typeof window === "undefined") {
    return {
      tier: "high",
      particles: true,
      heroGl: true,
      logoGl: true,
      animatedBg: true,
      grain: true,
      dpr: 1.5,
    };
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    return {
      tier: "reduce",
      particles: false,
      heroGl: false,
      logoGl: false,
      animatedBg: false,
      grain: false,
      dpr: 1,
    };
  }

  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const saveData = Boolean(navigator.connection?.saveData);
  const memory = navigator.deviceMemory;
  const lowPower =
    saveData ||
    narrow ||
    coarse ||
    (typeof memory === "number" && memory <= 4);

  if (lowPower) {
    return {
      tier: "low",
      particles: false,
      heroGl: false,
      logoGl: false,
      animatedBg: false,
      grain: false,
      dpr: 1,
    };
  }

  return {
    tier: "high",
    particles: false, // swarm replaces 2D particles
    heroGl: true, // site-wide swarm
    logoGl: false, // static mark — saves a second WebGL context
    animatedBg: true,
    grain: false, // film grain costs paint during scroll
    dpr: 1,
  };
}
