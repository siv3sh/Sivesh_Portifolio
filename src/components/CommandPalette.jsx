import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, stagger } from "animejs";
import { navLinks, profile, resume } from "../data/content";
import { prefersReducedMotion } from "../lib/animeMotion";
import { copyText, useToast } from "./Toast";

const CONTACT_EMAIL = "hello@sivesh-pb.com";

function scrollTo(href) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Cmd/Ctrl + K command palette — jump sections, resume, copy email.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const listId = useId();
  const { push } = useToast();

  const actions = useMemo(
    () => [
      ...navLinks.map((link) => ({
        id: link.id,
        label: `Go to ${link.label}`,
        hint: link.href,
        run: () => scrollTo(link.href),
      })),
      {
        id: "resume",
        label: "Download resume PDF",
        hint: resume.fileName,
        run: () => {
          const a = document.createElement("a");
          a.href = resume.href;
          a.download = resume.fileName;
          a.click();
        },
      },
      {
        id: "email",
        label: "Copy email address",
        hint: CONTACT_EMAIL,
        run: async () => {
          await copyText(CONTACT_EMAIL);
          push("Email copied", "accent");
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "github.com/siv3sh",
        run: () => window.open("https://github.com/siv3sh", "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "linkedin.com/in/siv3sh",
        run: () =>
          window.open("https://linkedin.com/in/siv3sh", "_blank", "noopener,noreferrer"),
      },
      {
        id: "top",
        label: "Back to top",
        hint: "#hero",
        run: () => scrollTo("#hero"),
      },
    ],
    [push]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return undefined;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);

    if (!prefersReducedMotion()) {
      const panel = document.querySelector("[data-cmd-panel]");
      const rows = document.querySelectorAll("[data-cmd-row]");
      if (panel) {
        animate(panel, {
          opacity: [0, 1],
          y: [16, 0],
          scale: [0.98, 1],
          ease: "outExpo",
          duration: 420,
        });
      }
      if (rows.length) {
        animate(rows, {
          opacity: [0, 1],
          x: [-8, 0],
          delay: stagger(28, { start: 80 }),
          duration: 380,
          ease: "outExpo",
        });
      }
    }

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const runActive = () => {
    const item = filtered[active];
    if (!item) return;
    setOpen(false);
    item.run();
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[90] inline-flex items-center gap-2 border border-[var(--color-border-strong)] bg-ink/95 px-3 py-2.5 font-mono-tech text-[10px] tracking-[0.16em] text-muted uppercase shadow-sm backdrop-blur hover:border-accent hover:text-accent md:right-4 md:bottom-4"
        aria-label="Open command palette"
      >
        Command
        <kbd className="hidden border border-border px-1.5 py-0.5 text-cream sm:inline">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[350] flex items-end justify-center bg-[color-mix(in_oklab,#0c0f16_55%,transparent)] p-0 backdrop-blur-md sm:items-start sm:p-6 sm:pt-[12vh]"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            data-cmd-panel
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="max-h-[88svh] w-full overflow-hidden border border-[var(--color-border-strong)] bg-ink shadow-[0_24px_80px_-28px_rgba(22,24,31,0.55)] sm:max-h-none sm:max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-border px-4 py-3">
              <p className="mb-2 font-mono-tech text-[10px] tracking-[0.18em] text-accent uppercase">
                [{profile.firstName} · command]
              </p>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    runActive();
                  }
                }}
                placeholder="Jump to section, copy email, download resume…"
                className="w-full bg-transparent font-heading text-xl tracking-[-0.03em] text-cream outline-none placeholder:text-muted"
                aria-controls={listId}
                aria-autocomplete="list"
              />
            </div>

            <ul id={listId} role="listbox" className="max-h-[min(50vh,22rem)] overflow-y-auto overscroll-contain py-2 sm:max-h-[50vh]">
              {filtered.length === 0 && (
                <li className="px-4 py-6 font-mono-tech text-[11px] tracking-[0.14em] text-muted uppercase">
                  No matches
                </li>
              )}
              {filtered.map((item, i) => (
                <li key={item.id} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    data-cmd-row
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      setOpen(false);
                      item.run();
                    }}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${
                      i === active ? "bg-accent/10 text-cream" : "text-cream-muted"
                    }`}
                  >
                    <span className="font-heading text-base tracking-[-0.02em]">{item.label}</span>
                    <span className="font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
                      {item.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono-tech text-[10px] tracking-[0.12em] text-muted uppercase">
              <span>↑↓ Navigate · ↵ Run · Esc Close</span>
              <span>Anime.js palette</span>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
