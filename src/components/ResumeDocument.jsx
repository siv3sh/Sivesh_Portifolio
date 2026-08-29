import { profile } from "../data/content";
import { resumeDoc } from "../data/resumeDoc";

function SectionLabel({ index, children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="crosshair shrink-0" aria-hidden="true" />
      <span className="font-mono-tech text-[10px] tracking-[0.22em] text-accent uppercase">
        {String(index).padStart(2, "0")}
      </span>
      <span className="rule-strong max-w-10 flex-1" />
      <span className="label-mono bracket text-muted">{children}</span>
    </div>
  );
}

/**
 * Creative dossier-style resume preview — matches site visual language.
 */
export default function ResumeDocument() {
  return (
    <article className="resume-doc relative overflow-hidden bg-ink text-cream">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Masthead */}
      <header className="relative border-b border-[var(--color-border-strong)] px-6 py-8 sm:px-10 sm:py-10">
        <div className="absolute top-4 right-4 flex gap-2 sm:top-6 sm:right-8" aria-hidden="true">
          <span className="signal-dot" />
          <span className="font-mono-tech text-[10px] tracking-[0.2em] text-muted uppercase">
            Live dossier
          </span>
        </div>

        <p className="label-mono bracket text-accent">Curriculum vitae</p>
        <h2 className="mt-3 font-heading text-4xl font-medium tracking-[-0.045em] text-cream sm:text-5xl">
          {profile.fullName}
        </h2>
        <p className="mt-2 font-mono-tech text-[12px] tracking-[0.28em] text-accent uppercase">
          {profile.role}
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream-muted sm:text-base">
          {resumeDoc.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="border border-border px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
            {resumeDoc.phone}
          </span>
          <a
            href={`mailto:${resumeDoc.email}`}
            className="border border-border px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
          >
            {resumeDoc.email}
          </a>
          {resumeDoc.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <div className="relative space-y-10 px-6 py-8 sm:px-10 sm:py-10">
        {/* Experience */}
        <section>
          <SectionLabel index={1}>Experience</SectionLabel>
          <div className="space-y-6">
            {resumeDoc.experience.map((job) => (
              <div
                key={job.company + job.role}
                className="border border-border bg-surface-raised/60 p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-xl font-medium tracking-[-0.03em] text-cream">
                      {job.role}
                    </h3>
                    <p className="mt-1 font-mono-tech text-[11px] tracking-[0.14em] text-accent uppercase">
                      {job.company}
                      <span className="text-muted"> · {job.place}</span>
                    </p>
                  </div>
                  <span className="border border-border px-2.5 py-1 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-cream-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionLabel index={2}>Selected projects</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {resumeDoc.projects.map((project, i) => (
              <div
                key={project.title}
                className="group relative border border-border bg-surface-raised/40 p-5 transition-colors hover:border-accent"
              >
                <span className="font-mono-tech text-[10px] tracking-[0.18em] text-accent/70 uppercase">
                  P{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-medium tracking-[-0.03em] text-cream">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono-tech text-[10px] tracking-[0.08em] text-muted uppercase">
                  {project.stack}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream-muted">{project.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionLabel index={3}>Education</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {resumeDoc.education.map((ed) => (
              <div key={ed.school} className="border border-border p-5">
                <h3 className="font-heading text-lg font-medium tracking-[-0.03em] text-cream">
                  {ed.degree}
                </h3>
                <p className="mt-1 text-sm text-cream-muted">{ed.school}</p>
                <p className="mt-3 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
                  {ed.place} · {ed.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <SectionLabel index={4}>Achievements</SectionLabel>
          <ul className="space-y-3 border border-border p-5">
            {resumeDoc.achievements.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-cream-muted">
                <span className="mt-0.5 shrink-0 font-mono-tech text-accent">◈</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section>
          <SectionLabel index={5}>Technical stack</SectionLabel>
          <div className="space-y-4">
            {resumeDoc.skillGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 font-mono-tech text-[10px] tracking-[0.18em] text-muted uppercase">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="border border-border bg-surface-raised px-2.5 py-1 font-mono-tech text-[10px] tracking-[0.1em] text-cream-muted uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="relative flex items-center justify-between gap-4 border-t border-border px-6 py-4 sm:px-10">
        <span className="font-mono-tech text-[10px] tracking-[0.16em] text-muted uppercase">
          Intelligence · Engineered
        </span>
        <span className="font-mono-tech text-[10px] tracking-[0.16em] text-accent uppercase">
          {resumeDoc.website}
        </span>
      </footer>
    </article>
  );
}
