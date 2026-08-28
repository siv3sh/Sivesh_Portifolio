import SectionHeading from "./SectionHeading";
import MagneticCard from "./effects/MagneticCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects, profile } from "../data/content";

function ProjectCard({ project, index }) {
  const { ref, visible } = useScrollReveal(0.08, "0px 0px -50px 0px");

  return (
    <article
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${project.featured ? "lg:col-span-2" : ""}`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      <MagneticCard className="h-full" tiltStrength={2.5}>
        <div
          className={`gradient-border interactive-card group h-full ${
            project.featured ? "ring-1 ring-cream/10" : ""
          }`}
        >
          <div className="gradient-border-inner flex h-full min-h-0 flex-col p-6 md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <span className="font-mono-tech text-5xl font-bold leading-none text-accent/10 md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.featured && (
                <span className="shrink-0 rounded-full border border-cream/15 bg-cream/[0.04] px-3 py-1 font-mono-tech text-[10px] tracking-widest text-cream-muted uppercase">
                  Featured
                </span>
              )}
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-cream/10 bg-cream/[0.03] px-2.5 py-1 font-mono-tech text-[10px] tracking-wider text-cream-muted uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="font-heading text-xl font-bold text-cream transition-colors duration-300 group-hover:text-cream md:text-2xl">
              {project.title}
            </h3>

            {project.problem && (
              <p className="mt-4 rounded-lg border border-cream/8 bg-cream/[0.03] px-4 py-3 text-sm leading-relaxed text-cream-muted">
                <span className="font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                  The challenge ·{" "}
                </span>
                {project.problem}
              </p>
            )}

            <p className="mt-4 flex-1 text-sm leading-relaxed text-cream-muted md:text-base">
              <span className="font-medium text-cream">What I delivered · </span>
              {project.description}
            </p>

            <div className={`mt-6 grid gap-3 ${project.featured ? "sm:grid-cols-2" : ""}`}>
              {project.metrics.map((metric) => (
                <div
                  key={metric}
                  className="flex items-center gap-3 rounded-lg border border-cream/8 bg-cream/[0.03] px-4 py-3"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cream-muted" />
                  <span className="text-sm text-cream-muted">{metric}</span>
                </div>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs tracking-widest text-cream-muted uppercase transition-[gap,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:gap-3 hover:text-cream"
            >
              <span>View Source</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </MagneticCard>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="immersive-section relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="projects"
          title={`${profile.firstName}'s work`}
          subtitle={`Selected projects by ${profile.fullName} — each started with a real business problem and ended with a system teams could use.`}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
