export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-1/4 left-1/4 h-[600px] w-[600px] animate-pulse-glow rounded-full bg-accent/8 blur-[150px]" />
      <div
        className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent-2/6 blur-[130px]"
        style={{ animation: "pulse-glow 6s ease-in-out infinite 2s" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 grid-perspective opacity-20" />
    </div>
  );
}
