import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, createTimeline, stagger, scrambleText } from "animejs";
import { brand } from "../../data/brand";
import { prefersReducedMotion } from "../../lib/animeMotion";

const SESSION_KEY = "spb-boot-done";

const BOOT_LINES = [
  "INIT · SPB RUNTIME",
  "MOUNT · NEURAL GRAPH",
  "LINK · RAG / AGENTS / LLM",
  "SYNC · PORTFOLIO SURFACE",
  "READY · SIGNAL ONLINE",
];

/**
 * Full-viewport Anime.js boot sequence — plays once per session.
 */
export default function SystemBoot() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const rootRef = useRef(null);
  const statusRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (prefersReducedMotion()) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active || !rootRef.current) return undefined;

    const root = rootRef.current;
    const bars = root.querySelectorAll("[data-boot-bar]");
    const lines = root.querySelectorAll("[data-boot-line]");
    const mark = root.querySelector("[data-boot-mark]");
    const progress = root.querySelector("[data-boot-progress]");
    const status = statusRef.current;

    document.body.style.overflow = "hidden";

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }

      animate(root, {
        opacity: [1, 0],
        duration: 520,
        ease: "inOutQuad",
        onComplete: () => {
          document.body.style.overflow = "";
          setActive(false);
        },
      });
    };

    const onSkip = (e) => {
      if (e.type === "keydown" && e.key !== "Escape" && e.key !== "Enter" && e.key !== " ") {
        return;
      }
      e.preventDefault?.();
      finish();
    };

    window.addEventListener("keydown", onSkip);
    root.addEventListener("click", onSkip);

    const tl = createTimeline({
      defaults: { ease: "outExpo" },
      onComplete: finish,
    });

    tl.add(bars, {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(90),
    });

    if (mark) {
      tl.add(
        mark,
        {
          opacity: [0, 1],
          scale: [0.86, 1],
          duration: 900,
        },
        "-=200"
      );
    }

    tl.add(
      lines,
      {
        opacity: [0, 1],
        x: [-18, 0],
        duration: 520,
        delay: stagger(140),
      },
      "-=400"
    );

    if (status) {
      tl.add(
        status,
        {
          opacity: [0, 1],
          duration: 200,
        },
        "-=200"
      );
      tl.add(
        status,
        {
          text: scrambleText({
            chars: "uppercase",
            from: "left",
            cursor: false,
          }),
          duration: 900,
          ease: "outExpo",
        },
        "<"
      );
    }

    if (progress) {
      tl.add(
        progress,
        {
          width: ["0%", "100%"],
          duration: 1600,
          ease: "inOut(3)",
        },
        "-=700"
      );
    }

    tl.add({}, { duration: 380 });

    return () => {
      window.removeEventListener("keydown", onSkip);
      root.removeEventListener("click", onSkip);
      tl.pause();
      tl.cancel?.();
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!mounted || !active) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0c0f16] text-[#f7f8fa]"
      role="dialog"
      aria-modal="true"
      aria-label="System boot sequence"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div
        data-boot-bar
        className="pointer-events-none absolute top-0 left-0 h-1 origin-left scale-x-0 bg-accent opacity-0"
        style={{ width: "38%" }}
        aria-hidden="true"
      />
      <div
        data-boot-bar
        className="pointer-events-none absolute top-0 right-0 h-1 origin-right scale-x-0 bg-accent opacity-0"
        style={{ width: "22%" }}
        aria-hidden="true"
      />
      <div
        data-boot-bar
        className="pointer-events-none absolute bottom-0 left-0 h-1 origin-left scale-x-0 bg-accent opacity-0"
        style={{ width: "55%" }}
        aria-hidden="true"
      />
      <div
        data-boot-bar
        className="pointer-events-none absolute right-0 bottom-0 h-1 origin-right scale-x-0 bg-accent opacity-0"
        style={{ width: "28%" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl px-8">
        <p
          data-boot-mark
          className="font-mono-tech text-[11px] tracking-[0.28em] text-accent uppercase opacity-0"
        >
          [{brand.monogram} · BOOT]
        </p>

        <p
          ref={statusRef}
          className="mt-6 font-heading text-4xl font-medium tracking-[-0.04em] text-[#f7f8fa] opacity-0 sm:text-5xl md:text-6xl"
        >
          {brand.line}
        </p>

        <ul className="mt-10 space-y-3">
          {BOOT_LINES.map((line) => (
            <li
              key={line}
              data-boot-line
              className="font-mono-tech text-[11px] tracking-[0.18em] text-[#aeb6c5] uppercase opacity-0"
            >
              ▸ {line}
            </li>
          ))}
        </ul>

        <div className="mt-12 h-px w-full bg-white/10">
          <div data-boot-progress className="h-px w-0 bg-accent" />
        </div>

        <p className="mt-4 font-mono-tech text-[10px] tracking-[0.16em] text-[#7a8496] uppercase">
          Click / Esc / Enter to skip
        </p>
      </div>
    </div>,
    document.body
  );
}
