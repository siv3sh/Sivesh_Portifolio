import SectionHeading from "./SectionHeading";
import MagneticCard from "./effects/MagneticCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects, profile } from "../data/content";

function ProjectCard({ project, index }) {
  const { ref, visible } = useScrollReveal(0.08, "0px 0px -50px 0px");

  return (
    <article
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${project.featured ? "lg:col-span-2" : ""}`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      <MagneticCard className="h-full" tiltStrength={4}>
        <div
          className={`gradient-border group neon-glow-hover h-full transition-all duration-300 ${
            project.featured ? "ring-1 ring-accent-2/20" : ""
          }`}
        >
          <div className="gradient-border-inner flex h-full min-h-0 flex-col p-6 md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <span className="font-mono-tech text-5xl font-bold leading-none text-accent/10 md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.featured && (
                <span className="shrink-0 rounded-full border border-accent-2/30 bg-accent-2/10 px-3 py-1 font-mono-tech text-[10px] tracking-widest text-accent-2 uppercase">
                  Featured
                </span>
              )}
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono-tech text-[10px] tracking-wider text-accent uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="font-heading text-xl font-bold text-cream transition-colors duration-300 group-hover:text-gradient md:text-2xl">
              {project.title}
            </h3>

            {project.problem && (
              <p className="mt-4 rounded-lg border border-accent/10 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-cream-muted">
                <span className="font-mono-tech text-[10px] tracking-widest text-accent uppercase">
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
                  className="flex items-center gap-3 rounded-lg border border-accent/10 bg-accent/5 px-4 py-3"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(224,122,74,0.6)]" />
                  <span className="text-sm text-cream-muted">{metric}</span>
                </div>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs tracking-widest text-accent uppercase transition-all hover:gap-3 hover:text-cream"
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
