import { brand } from "../../data/brand";

export default function BrandWatermark() {
  return (
    <div className="brand-watermark" aria-hidden="true">
      <p className="brand-watermark-text brand-watermark-text--back">{brand.monogram}</p>
      <p className="brand-watermark-text brand-watermark-text--front">{brand.monogram}</p>
      <div className="brand-watermark-glow" />
      <div className="brand-watermark-rays" />
    </div>
  );
}
