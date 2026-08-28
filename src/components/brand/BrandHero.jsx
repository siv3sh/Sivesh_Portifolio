import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { brand } from "../../data/brand";
import BrandMark from "./BrandMark";
import HeroSurfaceCanvas from "../webgl/HeroSurfaceCanvas";

/** High-impact hero brand stack — mark, manifesto, name */
export default function BrandHero() {
  const rootRef = useRef(null);
  const titleWrapRef = useRef(null);
  const useSurfaceGl = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".brand-hero-reveal", {
        y: 48,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.15,
      });

      gsap.from(".brand-hero-mark-wrap", {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".brand-hero-ring", {
        scale: 0.5,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="brand-hero-impact">
      <div className="brand-hero-mark-wrap brand-hero-reveal">
        <div className="brand-hero-ring" aria-hidden="true" />
        <div className="brand-hero-ring brand-hero-ring--slow" aria-hidden="true" />
        <BrandMark size="impact" className="brand-mark-glow relative z-10" />
      </div>

      <p className="brand-hero-manifesto brand-hero-reveal">{brand.line}</p>

      <div ref={titleWrapRef} className="brand-hero-title-wrap brand-hero-reveal relative w-full">
        {useSurfaceGl && <HeroSurfaceCanvas containerRef={titleWrapRef} />}
        <h1 className="brand-hero-title relative z-[1]">
          <span className="brand-hero-name">{brand.name}</span>
          <span className="brand-hero-surname">{brand.surname}</span>
        </h1>
      </div>

      <p className="brand-hero-descriptor brand-hero-reveal">{brand.descriptor}</p>
    </div>
  );
}
