const sizes = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
  hero: 128,
  impact: 168,
};

/** Simple technical monogram — matches light zero-radius system */
export default function BrandMark({ size = "md", className = "" }) {
  const px = sizes[size] ?? sizes.md;

  return (
    <span
      className={`brand-mark inline-flex shrink-0 items-center justify-center font-mono-tech tracking-[0.12em] text-accent ${className}`}
      style={{ width: px, height: px, fontSize: Math.max(9, px * 0.22) }}
      aria-hidden="true"
    >
      SPB
    </span>
  );
}
