import BrandMark from "./BrandMark";

/** Horizontal brand divider with centered mark */
export default function BrandRule({ className = "" }) {
  return (
    <div className={`brand-rule ${className}`} aria-hidden="true">
      <span className="brand-rule-line" />
      <BrandMark size="xs" className="brand-rule-mark opacity-80" />
      <span className="brand-rule-line" />
    </div>
  );
}
