import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, scrambleText, stagger } from "animejs";
import { resumeDoc } from "../data/resume";
import { prefersReducedMotion } from "../lib/animeMotion";
import { copyText, useToast } from "./Toast";

const TOC = [
  { id: "rv-edu", label: "Education" },
  { id: "rv-skills", label: "Skills" },
  { id: "rv-wins", label: "Wins" },
  { id: "rv-exp", label: "Experience" },
  { id: "rv-systems", label: "Systems" },
];

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

/** Creative in-site resume — boot sequence, TOC jumps, reading progress. */
export default function ResumePreview() {
  const doc = resumeDoc;
  const sheetRef = useRef(null);
  const nameRef = useRef(null);
  const progressRef = useRef(null);
  const [booting, setBooting] = useState(!prefersReducedMotion());
  const [bootLine, setBootLine] = useState("MOUNT · RESUME SURFACE");
  const { push } = useToast();

  useEffect(() => {
    if (!booting) return undefined;
    const lines = [
      "MOUNT · RESUME SURFACE",
      "LOAD · EXPERIENCE / SKILLS",
      "SYNC · SIGNAL WINS",
      "READY · PREVIEW ONLINE",
    ];
    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      if (i >= lines.length) {
        window.clearInterval(tick);
        setBooting(false);
        return;
      }
      setBootLine(lines[i]);
    }, 320);
    return () => window.clearInterval(tick);
  }, [booting]);

  useEffect(() => {
    if (booting) return undefined;
    const sheet = sheetRef.current;
    if (!sheet) return undefined;

    const parts = sheet.querySelectorAll(".resume-reveal");
    const chips = sheet.querySelectorAll("[data-resume-chip]");

    if (prefersReducedMotion()) {
      animate([sheet, ...parts, ...chips], { opacity: 1, y: 0, duration: 1 });
      return undefined;
    }

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(sheet, {
      opacity: [0, 1],
      y: [24, 0],
      scale: [0.985, 1],
      duration: 700,
    });
    tl.add(
      parts,
      {
        opacity: [0, 1],
        y: [16, 0],
        duration: 600,
        delay: stagger(50),
      },
      "-=420"
    );
    if (chips.length) {
      tl.add(
        chips,
        {
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 420,
          delay: stagger(18),
        },
        "-=350"
      );
    }

    if (nameRef.current) {
      animate(nameRef.current, {
        text: scrambleText({
          chars: "uppercase",
          from: "left",
          cursor: false,
        }),
        duration: 900,
        ease: "outExpo",
        delay: 120,
      });
    }

    const scan = sheet.querySelector("[data-resume-scan]");
    if (scan) {
      animate(scan, {
        top: ["0%", "100%"],
        opacity: [0, 0.7, 0],
        duration: 1400,
        ease: "inOut(2)",
      });
    }

    return () => {
      tl.pause();
      tl.cancel?.();
    };
  }, [booting]);

  useEffect(() => {
    if (booting) return undefined;
    const modal = sheetRef.current?.closest(".resume-modal")?.parentElement;
    const bar = progressRef.current;
    if (!modal || !bar) return undefined;

    const onScroll = () => {
      const max = modal.scrollHeight - modal.clientHeight;
      const p = max > 0 ? modal.scrollTop / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    modal.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => modal.removeEventListener("scroll", onScroll);
  }, [booting]);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopyEmail = async () => {
    try {
      await copyText(doc.email);
      push("Email copied", "accent");
    } catch {
      push("Could not copy email");
    }
  };

  if (booting) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center border border-[var(--color-border-strong)] bg-[#0c0f16] p-10">
        <div className="w-full max-w-md">
          <p className="font-mono-tech text-[11px] tracking-[0.22em] text-accent uppercase">
            [SPB · RESUME BOOT]
          </p>
          <p className="mt-4 font-heading text-2xl tracking-[-0.03em] text-[#f7f8fa]">{bootLine}</p>
          <div className="mt-6 h-px bg-white/10">
            <div className="h-px w-2/3 animate-pulse bg-accent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      ref={sheetRef}
      className="resume-sheet relative overflow-hidden border border-[var(--color-border-strong)] bg-[#fbfcfd] opacity-0"
    >
      <div
        ref={progressRef}
        className="pointer-events-none sticky top-0 z-30 h-0.5 origin-left scale-x-0 bg-accent"
        aria-hidden="true"
      />

      <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-3 border border-border/80" aria-hidden="true">
        <div className="corner-frame absolute inset-0" />
        <div className="corner-frame-alt absolute inset-0" />
      </div>
      <div
        data-resume-scan
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0"
        aria-hidden="true"
      />

      <div className="relative z-[1] p-6 sm:p-8 md:p-10">
        <header className="resume-reveal grid gap-6 border-b border-[var(--color-border-strong)] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="label-mono bracket text-accent">Curriculum vitae</p>
            <h2
              ref={nameRef}
              className="mt-3 font-heading text-4xl font-medium tracking-[-0.045em] text-cream sm:text-5xl"
            >
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
                className="relative h-24 w-20 bg-ink object-cover object-top sm:h-28 sm:w-24"
              />
              <div className="scanlines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            </div>
            <div className="mt-2 space-y-1 text-left font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase md:text-right">
              <p>{doc.phone}</p>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="block transition-colors hover:text-accent"
              >
                {doc.email} · copy
              </button>
              <p>{doc.web}</p>
            </div>
          </div>
        </header>

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

        {/* In-preview jump TOC */}
        <nav
          className="resume-reveal sticky top-1 z-20 mt-6 flex flex-wrap gap-2 border border-border bg-ink/95 p-2 backdrop-blur-sm"
          aria-label="Resume sections"
        >
          {TOC.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => jumpTo(item.id)}
              className="border border-transparent px-2.5 py-1.5 font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-9">
            <section id="rv-edu" className="resume-reveal scroll-mt-24">
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

            <section id="rv-skills" className="resume-reveal scroll-mt-24">
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
                          data-resume-chip
                          className="border border-border bg-ink/60 px-2 py-1 font-mono-tech text-[10px] tracking-[0.06em] text-cream-muted opacity-0"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="rv-wins" className="resume-reveal scroll-mt-24">
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

          <div className="space-y-9">
            <section id="rv-exp" className="resume-reveal scroll-mt-24">
              <SectionLabel num="04">Experience</SectionLabel>
              <div className="space-y-7">
                {doc.experience.map((job) => (
                  <div
                    key={job.role + job.company}
                    className="relative border border-border bg-ink/50 p-4 transition-colors hover:border-accent sm:p-5"
                  >
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

            <section id="rv-systems" className="resume-reveal scroll-mt-24">
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
