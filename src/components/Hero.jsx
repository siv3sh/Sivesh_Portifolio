import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks, heroStats, profile, heroCopy } from "../data/content";

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

export default function Hero() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.06,
      });

      if (statsRef.current) {
        gsap.from(".hero-stat", {
          y: 18,
          opacity: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero-section relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-36 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pt-44 lg:pb-24">
        <div className="order-2 lg:order-1">
          <p className="hero-reveal label-mono bracket">{heroCopy.greeting}</p>

          <h1 className="hero-reveal mt-4">
            <span className="block font-heading text-5xl leading-[0.92] font-medium tracking-[-0.04em] text-cream sm:text-6xl lg:text-7xl">
              {profile.fullName}
            </span>
            <span className="mt-4 block font-mono-tech text-[12px] tracking-[0.32em] text-accent uppercase">
              {profile.role}
            </span>
          </h1>

          <div className="hero-reveal mt-8 flex items-start gap-5">
            <span className="crosshair mt-3 shrink-0" aria-hidden="true" />
            <div className="space-y-1">
              {heroCopy.lines.map((line) => (
                <p
                  key={line}
                  className="font-heading text-xl leading-[1.35] font-medium tracking-[-0.02em] text-cream/90 sm:text-2xl"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <p className="hero-reveal mt-6 max-w-xl text-base leading-relaxed text-cream-muted sm:text-lg">
            {profile.tagline}
          </p>

          <div className="hero-reveal mt-6 inline-flex items-center gap-2.5 border border-border px-3 py-2 font-mono-tech text-[11px] tracking-[0.14em] text-muted uppercase">
            <span className="signal-dot" aria-hidden="true" />
            {profile.availability}
          </div>

          <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-neon px-8 py-3.5 text-center sm:px-10 sm:py-4">
              Book a free discovery call
            </a>
            <a href="#projects" className="btn-ghost px-8 py-3.5 text-center sm:px-10 sm:py-4">
              View my work
            </a>
          </div>

          <div className="hero-reveal mt-8 flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.label];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center border border-border text-cream-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-reveal order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="hero-portrait-frame relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-3 border border-border" aria-hidden="true">
              <div className="corner-frame absolute inset-0" />
              <div className="corner-frame-alt absolute inset-0" />
            </div>
            <img
              src="/sivesh-portrait.png?v=8"
              alt={`${profile.fullName}, ${profile.role}`}
              className="hero-portrait-img relative"
              width={682}
              height={1024}
              decoding="async"
              fetchPriority="high"
            />
            <div className="scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div ref={statsRef} className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rule-strong" />
        <dl className="grid grid-cols-2 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="hero-stat border-b border-[var(--color-border-strong)] px-1 py-7 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="font-heading text-4xl leading-none font-medium tracking-[-0.03em] text-cream">
                {stat.value}
              </dt>
              <dd className="mt-2.5 font-mono-tech text-[10px] leading-snug tracking-[0.12em] text-muted uppercase">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
        <div className="rule-strong" />
      </div>
    </section>
  );
}
