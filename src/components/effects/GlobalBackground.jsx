export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-1/4 left-1/4 h-[420px] w-[420px] bg-accent/[0.06] blur-[120px]" />
      <div className="absolute top-1/3 -right-1/4 h-[360px] w-[360px] bg-accent/[0.04] blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 grid-perspective opacity-40" />
    </div>
  );
}
