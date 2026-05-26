export default function DepthField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full bg-accent/8 blur-[90px]" />
      <div className="absolute top-[55%] right-[8%] h-80 w-80 rounded-full bg-accent-2/8 blur-[100px]" />
      <div className="absolute bottom-[8%] left-[35%] h-56 w-56 rounded-full bg-accent/6 blur-[70px]" />
    </div>
  );
}
