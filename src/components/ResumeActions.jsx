import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { animate, stagger } from "animejs";
import { resume } from "../data/content";
import { prefersReducedMotion } from "../lib/animeMotion";
import ResumePreview from "./ResumePreview";

/**
 * Preview opens a creative in-site resume surface (ported to body so fixed
 * positioning is not broken by hero transforms).
 * Download serves the real PDF in /public.
 */
export default function ResumeActions({ className = "", variant = "default" }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    const id = requestAnimationFrame(() => {
      const sheet = document.querySelector(".resume-sheet");
      const parts = document.querySelectorAll(".resume-reveal");
      if (!sheet) return;

      if (prefersReducedMotion()) {
        animate([sheet, ...parts], { opacity: 1, y: 0, duration: 1 });
        return;
      }

      animate(sheet, {
        opacity: [0, 1],
        y: [28, 0],
        scale: [0.985, 1],
        ease: "outExpo",
        duration: 700,
      });

      if (parts.length) {
        animate(parts, {
          opacity: [0, 1],
          y: [18, 0],
          ease: "outExpo",
          duration: 650,
          delay: stagger(55, { start: 120 }),
        });
      }
    });

    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const btnBase =
    "inline-flex items-center justify-center gap-2 font-mono-tech text-[11px] tracking-[0.18em] uppercase transition-colors";

  const modal =
    mounted &&
    open &&
    createPortal(
      <div
        className="resume-overlay fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto p-3 sm:p-6 md:p-8"
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="resume-modal relative my-4 w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-3 z-20 mb-3 flex flex-wrap items-center justify-between gap-3 border border-[var(--color-border-strong)] bg-ink px-4 py-3 shadow-sm sm:px-5">
            <div>
              <p
                id={titleId}
                className="font-heading text-lg font-medium tracking-[-0.03em] text-cream"
              >
                Resume · live preview
              </p>
              <p className="font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase">
                Designed view · PDF download available
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnBase} border border-border px-3 py-2 text-muted hover:border-accent hover:text-accent`}
              >
                Raw PDF
              </a>
              <a
                href={resume.href}
                download={resume.fileName}
                className={`${btnBase} border border-accent bg-accent px-3 py-2 text-[#f7f8fa] hover:bg-transparent hover:text-accent`}
              >
                Download
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`${btnBase} border border-border px-3 py-2 text-muted hover:border-accent hover:text-accent`}
                aria-label="Close resume preview"
              >
                Close
              </button>
            </div>
          </div>

          <ResumePreview />
        </div>
      </div>,
      document.body
    );

  return (
    <>
      {variant === "nav" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${btnBase} border border-border px-4 py-2.5 text-cream hover:border-accent hover:text-accent ${className}`}
        >
          Resume
        </button>
      ) : (
        <div className={`flex flex-wrap items-center gap-3 ${className}`}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`${btnBase} border border-border px-5 py-2.5 text-cream hover:border-accent hover:text-accent`}
          >
            Preview resume
          </button>
          <a
            href={resume.href}
            download={resume.fileName}
            className={`${btnBase} border border-accent bg-accent px-5 py-2.5 text-[#f7f8fa] hover:bg-transparent hover:text-accent`}
          >
            Download PDF
          </a>
        </div>
      )}
      {modal}
    </>
  );
}
