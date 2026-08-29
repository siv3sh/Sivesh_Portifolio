import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { animate } from "animejs";
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
      const overlay = document.querySelector(".resume-overlay");
      if (!overlay || prefersReducedMotion()) return;
      animate(overlay, {
        opacity: [0, 1],
        duration: 320,
        ease: "outQuad",
      });
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
        className="resume-overlay fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto overscroll-contain bg-[color-mix(in_oklab,#0c0f16_58%,transparent)] p-2 backdrop-blur-md sm:p-6 md:p-8"
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="resume-modal relative my-2 w-full max-w-5xl sm:my-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-2 z-20 mb-3 flex flex-col gap-3 border border-[var(--color-border-strong)] bg-ink px-3 py-3 shadow-sm sm:top-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5">
            <div className="min-w-0">
              <p
                id={titleId}
                className="font-heading text-base font-medium tracking-[-0.03em] text-cream sm:text-lg"
              >
                Resume · live preview
              </p>
              <p className="font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase">
                Jump sections · download PDF
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <a
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnBase} border border-border px-2 py-2.5 text-center text-muted hover:border-accent hover:text-accent sm:px-3`}
              >
                Raw PDF
              </a>
              <a
                href={resume.href}
                download={resume.fileName}
                className={`${btnBase} border border-accent bg-accent px-2 py-2.5 text-center text-[#f7f8fa] hover:bg-transparent hover:text-accent sm:px-3`}
              >
                Download
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`${btnBase} border border-border px-2 py-2.5 text-center text-muted hover:border-accent hover:text-accent sm:px-3`}
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
