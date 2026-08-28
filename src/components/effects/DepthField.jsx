import { useVisualBudget } from "../../hooks/useVisualBudget";

export default function DepthField() {
  const budget = useVisualBudget();

  if (budget.tier === "reduce") return null;

  // Low tier: one soft static wash — no stacked large blurs
  if (!budget.animatedBg) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-[20%] left-[15%] h-64 w-64 rounded-full bg-accent/6 blur-[60px]" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full bg-accent/8 blur-[90px]" />
      <div className="absolute top-[55%] right-[8%] h-80 w-80 rounded-full bg-accent-2/8 blur-[100px]" />
    </div>
  );
}
