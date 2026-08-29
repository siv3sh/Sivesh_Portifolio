import { useEffect, useMemo, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import SectionHeading from "./SectionHeading";
import ProjectDiagram from "./effects/ProjectDiagram";
import { projects, profile } from "../data/content";
import { prefersReducedMotion, revealOnScroll } from "../lib/animeMotion";

const FILTERS = ["All", "RAG", "Python", "Streamlit", "Docker", "React"];

function StackTags({ stack, limit }) {
  const shown = limit ? stack.slice(0, limit) : stack;
  const more = limit && stack.length > limit ? stack.length - limit : 0;

  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((tag) => (
        <span
          key={tag}
          className="border border-border px-2.5 py-1 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase"
        >
          {tag}
        </span>
      ))}
      {more > 0 && (
        <span className="border border-border px-2.5 py-1 font-mono-tech text-[10px] tracking-[0.12em] text-accent uppercase">
          +{more}
        </span>
      )}
    </div>
  );
}

function FeaturedCase({ project, index }) {
  return (
    <article
      data-project-item
      className="group overflow-hidden border border-[var(--color-border-strong)] bg-surface-raised/70 opacity-0 transition-colors hover:border-accent"
    >
      <div className="grid lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <ProjectDiagram type={project.diagram} className="h-full min-h-[260px] border-0 border-b lg:min-h-full lg:border-r lg:border-b-0" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c0f16] to-transparent p-5 pt-16">
            <p className="font-heading text-5xl font-medium tracking-[-0.04em] text-[#f7f8fa] md:text-6xl">
              {project.impact}
            </p>
            <p className="mt-1 font-mono-tech text-[11px] tracking-[0.14em] text-[#aeb6c5] uppercase">
              {project.impactLabel}
            </p>
          </div>
        </div>

        <div className="flex flex-col p-6 md:p-8 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono-tech text-[11px] tracking-[0.18em] text-accent uppercase">
              Case {String(index + 1).padStart(2, "0")} · Featured
            </span>
            <span className="font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase">
              {project.focus}
            </span>
          </div>

          <h3 className="mt-5 font-heading text-2xl font-medium tracking-[-0.03em] text-cream transition-colors group-hover:text-accent md:text-3xl lg:text-[2.35rem] lg:leading-[1.1]">
            {project.title}
          </h3>

          <div className="mt-5">
            <StackTags stack={project.stack} />
          </div>

          <div className="mt-8 grid flex-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono-tech text-[10px] tracking-[0.18em] text-accent uppercase">
                [Challenge]
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream-muted md:text-base">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="font-mono-tech text-[10px] tracking-[0.18em] text-accent uppercase">
                [What shipped]
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream-muted md:text-base">
                {project.description}
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <li key={metric} className="flex gap-2.5 text-sm leading-snug text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                {metric}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon px-5 py-2.5"
            >
              View source
            </a>
            <a
              href="#contact"
              className="font-mono-tech text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-accent"
            >
              Build something like this →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseCard({ project, index }) {
  return (
    <article
      data-project-item
      className="group flex h-full flex-col border border-border bg-ink opacity-0 transition-colors hover:border-accent"
    >
      <ProjectDiagram type={project.diagram} className="border-0 border-b" />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono-tech text-[10px] tracking-[0.16em] text-accent uppercase">
            Case {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-right font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
            {project.focus}
          </span>
        </div>

        <h3 className="mt-3 font-heading text-xl font-medium tracking-[-0.03em] text-cream transition-colors group-hover:text-accent md:text-[1.35rem]">
          {project.title}
        </h3>

        <div className="mt-4">
          <StackTags stack={project.stack} limit={3} />
        </div>

        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-cream-muted">
          {project.problem}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="font-heading text-2xl font-medium tracking-[-0.03em] text-cream">
              {project.impact}
            </p>
            <p className="mt-0.5 font-mono-tech text-[9px] tracking-[0.12em] text-muted uppercase">
              {project.impactLabel}
            </p>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-[11px] tracking-[0.14em] text-accent uppercase transition-[gap] hover:gap-2 inline-flex items-center gap-1"
          >
            Source <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) =>
      p.stack.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter]);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const showcase = featured.length ? featured : filtered.length ? [filtered[0]] : [];
  const cards = featured.length > 0 ? rest : filtered.slice(1);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return undefined;

    const play = (reduced) => {
      const nodes = root.querySelectorAll("[data-project-item]");
      if (!nodes.length) return;
      if (reduced || prefersReducedMotion()) {
        animate(nodes, { opacity: 1, y: 0, duration: 1 });
        return;
      }
      animate(nodes, {
        opacity: [0, 1],
        y: [28, 0],
        ease: "outExpo",
        duration: 820,
        delay: stagger(100),
      });
    };

    const rect = root.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (onScreen) {
      play(false);
      return undefined;
    }

    return revealOnScroll(root, (_el, reduced) => play(reduced));
  }, [filter]);

  return (
    <section
      id="projects"
      className="immersive-section relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden="true" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="projects"
          title={`Selected work by ${profile.firstName}`}
          subtitle="Visual case studies — system maps, the problem, what shipped, and the metric that mattered."
        />

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div
            className="flex flex-wrap gap-2"
            role="toolbar"
            aria-label="Filter projects by stack"
          >
            {FILTERS.map((label) => {
              const active = filter === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setFilter(label)}
                  aria-pressed={active}
                  className={`border px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.16em] uppercase transition-colors ${
                    active
                      ? "border-accent bg-accent text-[#f7f8fa]"
                      : "border-border text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <p className="font-mono-tech text-[10px] tracking-[0.16em] text-muted uppercase">
            {filtered.length} case{filtered.length === 1 ? "" : "s"} · map · ship · impact
          </p>
        </div>

        <div ref={listRef}>
          {filtered.length === 0 ? (
            <p className="border border-border px-5 py-10 font-mono-tech text-[11px] tracking-[0.14em] text-muted uppercase">
              No projects match [{filter}] — try another filter.
            </p>
          ) : (
            <>
              <div className="space-y-6">
                {showcase.map((project, i) => (
                  <FeaturedCase key={project.title} project={project} index={i} />
                ))}
              </div>

              {cards.length > 0 && (
                <div className="mt-8">
                  <p className="mb-4 font-mono-tech text-[10px] tracking-[0.18em] text-muted uppercase">
                    [More cases]
                  </p>
                  <div className="grid gap-5 md:grid-cols-3">
                    {cards.map((project, i) => (
                      <CaseCard
                        key={project.title}
                        project={project}
                        index={showcase.length + i}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm text-cream-muted">
            Need a production system like these? {profile.firstName} scopes fixed work with weekly
            demos and clean handoff.
          </p>
          <a href="#contact" className="btn-neon shrink-0 px-6 py-3">
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
}
