import { useVisualBudget } from "../../hooks/useVisualBudget";

export default function GlobalBackground() {
  const budget = useVisualBudget();

  if (budget.tier === "reduce") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true" />
    );
  }

  // Static washes only — animated large blurs were repainting on every scroll frame
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-1/4 left-1/4 h-[480px] w-[480px] rounded-full bg-accent/7 blur-[120px]" />
      <div className="absolute top-1/3 -right-1/4 h-[400px] w-[400px] rounded-full bg-accent-2/5 blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 grid-perspective opacity-15" />
    </div>
  );
}
