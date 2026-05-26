import { brand } from "../../data/brand";
import BrandMark from "./BrandMark";

export default function BrandRibbon({ className = "" }) {
  return (
    <div className={`brand-ribbon ${className}`}>
      <BrandMark size="xs" />
      <span className="brand-ribbon-rule" aria-hidden="true" />
      <span className="brand-ribbon-studio">{brand.studio}</span>
      <span className="brand-ribbon-rule" aria-hidden="true" />
      <span className="brand-ribbon-line">{brand.line}</span>
    </div>
  );
}
