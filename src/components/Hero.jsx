import { useEffect, useRef } from "react";
import {
  animate,
  createTimeline,
  stagger,
  splitText,
  scrambleText,
  utils,
} from "animejs";
import { prefersReducedMotion, revealOnScroll } from "../lib/animeMotion";
import { socialLinks, heroStats, profile, heroCopy, resume } from "../data/content";
import { brand } from "../data/brand";
import ResumeActions from "./ResumeActions";

const GitHubIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const iconMap = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, Email: MailIcon };

function runStatCounters(statNodes) {
  statNodes.forEach((stat) => {
    const valueEl = stat.querySelector("[data-metric]");
    if (!valueEl) return;
    const raw = valueEl.dataset.metric || valueEl.textContent.trim();
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const target = Number(match[1]);
    const suffix = match[2] || "";
    const state = { v: 0 };

    animate(state, {
      v: target,
      ease: "outExpo",
      duration: 1400,
      onUpdate: () => {
        valueEl.textContent = `${utils.round(state.v, 0)}${suffix}`;
      },
    });
  });
}

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const portraitRef = useRef(null);
  const statsRef = useRef(null);
  const splitRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reveals = section.querySelectorAll(".hero-reveal");
    const stats = section.querySelectorAll(".hero-stat");
    const nameEl = nameRef.current;
    const roleEl = roleRef.current;
    const portrait = portraitRef.current;

    if (prefersReducedMotion()) {
      animate([...reveals, ...stats, portrait].filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 1,
      });
      return undefined;
    }

    let split = null;
    if (nameEl) {
      split = splitText(nameEl, { chars: true, accessible: true });
      splitRef.current = split;
      nameEl.style.opacity = "1";
      animate(split.chars, { opacity: 0, y: 36, rotateX: -60, duration: 1 });
    }

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    if (portrait) {
      tl.add(portrait, {
        opacity: [0, 1],
        y: [32, 0],
        duration: 1000,
      });
    }

    tl.add(
      reveals,
      {
        opacity: [0, 1],
        y: [22, 0],
        duration: 800,
        delay: stagger(65),
      },
      "-=650"
    );

    if (split?.chars?.length) {
      tl.add(
        split.chars,
        {
          opacity: [0, 1],
          y: [36, 0],
          rotateX: [-60, 0],
          duration: 920,
          delay: stagger(26),
        },
        "-=700"
      );
    }

    if (roleEl) {
      tl.add(roleEl, { opacity: [0, 1], duration: 180 }, "-=480");
      tl.add(
        roleEl,
        {
          text: scrambleText({
            chars: "uppercase",
            from: "left",
            cursor: false,
          }),
          duration: 1100,
          ease: "outExpo",
        },
        "<"
      );
    }

    if (stats.length) {
      tl.add(
        stats,
        {
          opacity: [0, 1],
          y: [14, 0],
          duration: 650,
          delay: stagger(55),
        },
        "-=300"
      );
    }

    const stopStats = revealOnScroll(statsRef.current, (_el, reduced) => {
      if (!reduced) runStatCounters(stats);
    });

    return () => {
      tl.pause();
      tl.cancel?.();
      split?.revert?.();
      stopStats();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-[-10%] right-[-8%] -z-10 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_14%,transparent)_0%,transparent_68%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-40 w-full bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 pt-28 pb-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pt-32 lg:pb-12">
        <div className="order-2 lg:order-1">
          <div className="hero-reveal flex items-center gap-3 opacity-0">
            <span className="crosshair shrink-0" aria-hidden="true" />
            <p className="label-mono text-accent">[{brand.monogram}]</p>
            <span className="rule-strong max-w-12 flex-1" />
            <p className="label-mono bracket">{brand.line}</p>
          </div>

          <h1 className="mt-6" style={{ perspective: "800px" }}>
            <span
              ref={nameRef}
              className="hero-name-split block font-heading text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.045em] text-cream"
            >
              {profile.fullName}
            </span>
            <span
              ref={roleRef}
              className="mt-4 block font-mono-tech text-[12px] tracking-[0.34em] text-accent uppercase opacity-0"
            >
              {profile.role}
            </span>
          </h1>

          <p className="hero-reveal mt-7 max-w-md font-heading text-xl leading-snug font-medium tracking-[-0.025em] text-cream opacity-0 sm:text-2xl">
            {heroCopy.lines[0]}{" "}
            <span className="text-cream-muted">{heroCopy.lines[1]}</span>
          </p>

          <p className="hero-reveal mt-5 max-w-lg text-base leading-relaxed text-cream-muted opacity-0">
            {profile.tagline}
          </p>

          <div className="hero-reveal mt-9 flex flex-col gap-3 opacity-0 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-neon px-8 py-3.5 text-center sm:px-10">
              Book a free discovery call
            </a>
            <a href="#projects" className="btn-ghost px-8 py-3.5 text-center sm:px-10">
              View my work
            </a>
          </div>

          <div className="hero-reveal mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 opacity-0">
            <ResumeActions className="!gap-2" />
            <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.label];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label !== "Email" ? "_blank" : undefined}
                    rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center border border-border text-cream-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div
            ref={portraitRef}
            className="hero-portrait-frame relative mx-auto w-full max-w-[22rem] opacity-0 sm:max-w-md lg:ml-auto lg:max-w-[26rem]"
          >
            <div
              className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_70%)]"
              aria-hidden="true"
            />

            <div className="absolute -inset-3 border border-[var(--color-border-strong)]" aria-hidden="true">
              <div className="corner-frame absolute inset-0" />
              <div className="corner-frame-alt absolute inset-0" />
            </div>

            <div className="absolute top-0 left-0 z-20 -translate-y-full pb-3">
              <p className="font-mono-tech text-[10px] tracking-[0.2em] text-accent uppercase">
                [{brand.monogram} · PORTRAIT]
              </p>
            </div>

            <div className="absolute top-0 right-0 z-20 -translate-y-full pb-3 text-right">
              <p className="inline-flex items-center gap-2 border border-border bg-ink/90 px-2.5 py-1.5 font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase backdrop-blur-sm">
                <span className="signal-dot" aria-hidden="true" />
                {profile.availability}
              </p>
            </div>

            <img
              src="/sivesh-portrait.png?v=9"
              alt={`${profile.fullName}, ${profile.role}`}
              className="hero-portrait-img relative"
              width={682}
              height={1024}
              decoding="async"
              fetchPriority="high"
            />

            <div className="scanlines pointer-events-none absolute inset-0 z-[2] opacity-35" aria-hidden="true" />

            <div className="absolute right-0 bottom-0 z-20 translate-y-full pt-3 text-right">
              <p className="font-mono-tech text-[10px] tracking-[0.16em] text-muted uppercase">
                Remote · Ideaelan
              </p>
              <a
                href={resume.href}
                download={resume.fileName}
                className="mt-1 inline-block font-mono-tech text-[10px] tracking-[0.16em] text-accent uppercase transition-opacity hover:opacity-70"
              >
                ↓ {resume.fileName}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div ref={statsRef} className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 lg:pb-10">
        <div className="rule-strong" />
        <dl className="grid grid-cols-2 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="hero-stat border-b border-[var(--color-border-strong)] px-1 py-6 opacity-0 sm:border-b-0 sm:border-r sm:px-6 sm:py-7 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt
                data-metric={stat.value}
                className="font-heading text-3xl leading-none font-medium tracking-[-0.03em] text-cream md:text-4xl"
              >
                {stat.value}
              </dt>
              <dd className="mt-2 font-mono-tech text-[10px] leading-snug tracking-[0.12em] text-muted uppercase">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
        <div className="rule-strong" />

        <a
          href="#trust"
          className="hero-reveal mt-6 flex items-center justify-center gap-3 opacity-0 font-mono-tech text-[10px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent"
        >
          <span className="h-8 w-px bg-accent/50" aria-hidden="true" />
          Scroll · signal continues
          <span className="h-8 w-px bg-accent/50" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
