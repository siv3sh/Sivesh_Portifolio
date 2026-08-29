import { useEffect } from "react";
import { animate, stagger } from "animejs";
import SectionHeading from "./SectionHeading";
import MagneticCard from "./effects/MagneticCard";
import SignalFrame from "./effects/SignalFrame";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { prefersReducedMotion } from "../lib/animeMotion";
import { skillCategories, profile } from "../data/content";

function SkillCard({ category, index }) {
  const rootMargin = index === 0 ? "0px 0px 120px 0px" : "0px 0px -50px 0px";
  const { ref, visible } = useScrollReveal(index === 0 ? 0 : 0.05, rootMargin);

  useEffect(() => {
    if (!visible) return;
    const root = ref.current;
    if (!root) return;
    const tags = root.querySelectorAll(".skill-tag");
    if (!tags.length) return;

    if (prefersReducedMotion()) {
      animate(tags, { opacity: 1, y: 0, duration: 1 });
      return;
    }

    animate(tags, {
      opacity: [0, 1],
      y: [10, 0],
      scale: [0.96, 1],
      ease: "outExpo",
      duration: 520,
      delay: stagger(28, { start: 80 }),
    });
  }, [visible, ref]);

  return (
    <div
      ref={ref}
      className={`reveal w-full ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      <MagneticCard className="w-full" tiltStrength={2.5}>
        <SignalFrame className="w-full">
          <div className="gradient-border w-full">
            <div className="gradient-border-inner p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center border border-border text-xl text-accent">
                  {category.icon}
                </span>
                <div>
                  <span className="font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                    Layer {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-cream md:text-xl">
                    {category.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag border border-border/80 bg-surface-raised/60 px-3 py-1.5 font-mono-tech text-[11px] tracking-wide text-cream-muted opacity-0 transition-[border-color,background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent hover:text-cream hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SignalFrame>
      </MagneticCard>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="immersive-section relative px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent-2/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="skills"
          title={`${profile.firstName}'s toolkit`}
          subtitle={`Technologies ${profile.fullName} uses to build reliable, scalable AI systems for clients.`}
        />

        <div className="flex w-full flex-col gap-6">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
