import { useRef, useCallback } from "react";

export default function MagneticCard({
  children,
  className = "",
  tiltStrength = 2.5,
}) {
  const cardRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * tiltStrength;
      const rotateY = (x / rect.width) * tiltStrength;

      card.style.transition = "transform 0.1s ease-out";
      card.style.transform = `perspective(1000px) translate3d(${x * 0.01}px, ${y * 0.01}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    [tiltStrength]
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
    card.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`magnetic-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
