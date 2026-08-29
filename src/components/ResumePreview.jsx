import { resumeDoc } from "../data/resume";

function SectionLabel({ num, children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="crosshair shrink-0" aria-hidden="true" />
      <span className="font-mono-tech text-[10px] tracking-[0.22em] text-accent uppercase">
        {num}
      </span>
      <span className="rule-strong max-w-10 flex-1" />
      <span className="label-mono bracket">{children}</span>
    </div>
  );
}

/** Creative in-site resume surface — not a raw PDF iframe. */
export default function ResumePreview() {
  const doc = resumeDoc;

  return (
    <article className="resume-sheet relative overflow-hidden border border-[var(--color-border-strong)] bg-[#fbfcfd] opacity-0">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-3 border border-border/80" aria-hidden="true">
        <div className="corner-frame absolute inset-0" />
        <div className="corner-frame-alt absolute inset-0" />
      </div>

      <div className="relative z-[1] p-6 sm:p-8 md:p-10">
        {/* Masthead */}
        <header className="resume-reveal grid gap-6 border-b border-[var(--color-border-strong)] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="label-mono bracket text-accent">Curriculum vitae</p>
            <h2 className="mt-3 font-heading text-4xl font-medium tracking-[-0.045em] text-cream sm:text-5xl">
              {doc.name}
            </h2>
            <p className="mt-2 font-mono-tech text-[12px] tracking-[0.28em] text-accent uppercase">
              {doc.role}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream-muted sm:text-[15px]">
              {doc.summary}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="relative">
              <div className="absolute -inset-2 border border-border" aria-hidden="true" />
              <img
                src="/sivesh-portrait.png?v=9"
                alt=""
                className="relative h-24 w-20 object-cover object-top bg-ink sm:h-28 sm:w-24"
              />
              <div className="scanlines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            </div>
            <div className="mt-2 space-y-1 text-left font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase md:text-right">
              <p>{doc.phone}</p>
              <p>{doc.email}</p>
              <p>{doc.web}</p>
            </div>
          </div>
        </header>

        {/* Contact strip */}
        <div className="resume-reveal mt-5 flex flex-wrap gap-2">
          {doc.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.16em] text-cream uppercase transition-colors hover:border-accent hover:text-accent"
            >
              [{link.label}]
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Left rail */}
          <div className="space-y-9">
            <section className="resume-reveal">
              <SectionLabel num="01">Education</SectionLabel>
              <ul className="space-y-5">
                {doc.education.map((ed) => (
                  <li key={ed.degree} className="border-l-2 border-accent/40 pl-4">
                    <p className="font-heading text-base font-medium tracking-[-0.02em] text-cream">
                      {ed.degree}
                    </p>
                    <p className="mt-1 text-sm text-cream-muted">{ed.school}</p>
                    <p className="mt-1 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
                      {ed.place} · {ed.period}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-reveal">
              <SectionLabel num="02">Skills</SectionLabel>
              <div className="space-y-4">
                {doc.skillGroups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 font-mono-tech text-[10px] tracking-[0.18em] text-accent uppercase">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="border border-border bg-ink/60 px-2 py-1 font-mono-tech text-[10px] tracking-[0.06em] text-cream-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-reveal">
              <SectionLabel num="03">Signal wins</SectionLabel>
              <ul className="space-y-3">
                {doc.achievements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-cream-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-9">
            <section className="resume-reveal">
              <SectionLabel num="04">Experience</SectionLabel>
              <div className="space-y-7">
                {doc.experience.map((job) => (
                  <div key={job.role + job.company} className="relative border border-border bg-ink/50 p-4 sm:p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-heading text-lg font-medium tracking-[-0.03em] text-cream">
                        {job.role}
                      </h3>
                      <span className="font-mono-tech text-[10px] tracking-[0.14em] text-accent uppercase">
                        {job.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-cream-muted">
                      {job.company}
                      <span className="text-muted"> · {job.place}</span>
                    </p>
                    <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[13px] leading-relaxed text-cream-muted">
                          <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-reveal">
              <SectionLabel num="05">Selected systems</SectionLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                {doc.projects.map((project, i) => (
                  <div
                    key={project.title}
                    className="group border border-border bg-ink/40 p-4 transition-colors hover:border-accent"
                  >
                    <p className="font-mono-tech text-[10px] tracking-[0.2em] text-accent/80 uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-heading text-[15px] font-medium tracking-[-0.02em] text-cream">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono-tech text-[9px] tracking-[0.08em] text-muted uppercase">
                      {project.stack}
                    </p>
                    <p className="mt-3 text-[12px] leading-relaxed text-cream-muted">{project.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="resume-reveal mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border-strong)] pt-5">
          <p className="font-mono-tech text-[10px] tracking-[0.18em] text-muted uppercase">
            Intelligence · Engineered
          </p>
          <p className="font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase">
            End of file // SPB
          </p>
        </footer>
      </div>
    </article>
  );
}
