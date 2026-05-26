import { brand } from "../../data/brand";

export default function BrandWordmark({
  size = "md",
  showTag = false,
  showDescriptor = false,
  className = "",
}) {
  const sizeClass =
    size === "lg"
      ? "brand-wordmark--lg"
      : size === "sm"
        ? "brand-wordmark--sm"
        : "";

  return (
    <span className={`brand-wordmark ${sizeClass} ${className}`}>
      <span className="brand-wordmark-lockup">
        <span className="brand-wordmark-name">{brand.name}</span>
        <span className="brand-wordmark-surname">{brand.surname}</span>
      </span>
      {showDescriptor && (
        <span className="brand-wordmark-descriptor">{brand.descriptor}</span>
      )}
      {showTag && <span className="brand-wordmark-tag">{brand.line}</span>}
    </span>
  );
}

/** Large hero display wordmark */
export function BrandHeroTitle({ className = "" }) {
  return (
    <h1
      className={`brand-hero-title font-heading font-bold leading-[0.92] tracking-tight ${className}`}
    >
      <span className="brand-hero-title-name">{brand.name}</span>
      <span className="brand-hero-title-surname">{brand.surname}</span>
    </h1>
  );
}
