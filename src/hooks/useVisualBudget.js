import { useEffect, useState } from "react";
import { getVisualBudget } from "../lib/visualBudget";

/** Stable visual budget — only reacts to breakpoint / motion preference changes. */
export function useVisualBudget() {
  const [budget, setBudget] = useState(() => getVisualBudget());

  useEffect(() => {
    const refresh = () => setBudget(getVisualBudget());
    const mq = window.matchMedia("(max-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    mq.addEventListener("change", refresh);
    motion.addEventListener("change", refresh);
    coarse.addEventListener("change", refresh);

    return () => {
      mq.removeEventListener("change", refresh);
      motion.removeEventListener("change", refresh);
      coarse.removeEventListener("change", refresh);
    };
  }, []);

  return budget;
}
