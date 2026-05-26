import SectionHeading from "./SectionHeading";
import MagneticCard from "./effects/MagneticCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { skillCategories, profile } from "../data/content";

function SkillCard({ category, index }) {
  const rootMargin = index === 0 ? "0px 0px 120px 0px" : "0px 0px -50px 0px";
  const { ref, visible } = useScrollReveal(index === 0 ? 0 : 0.05, rootMargin);

  return (
    <div
      ref={ref}
      className={`w-full transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <MagneticCard className="w-full" tiltStrength={6}>
        <div className="gradient-border neon-glow-hover w-full">
          <div className="gradient-border-inner p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-xl text-accent">
                {category.icon}
              </span>
              <div>
                <span className="font-mono-tech text-[10px] tracking-widest text-accent-2/60 uppercase">
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
                  className="skill-tag rounded-md border border-border/80 bg-surface-raised/60 px-3 py-1.5 font-mono-tech text-[11px] tracking-wide text-cream-muted transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
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
