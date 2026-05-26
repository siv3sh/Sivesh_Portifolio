import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks, heroStats, profile } from "../data/content";
import { BrandHero, BrandWatermark } from "./brand";
import TypeWriter from "./effects/TypeWriter";

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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const iconMap = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, Email: MailIcon };

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (content) {
        gsap.to(content, {
          y: -40,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });
      }

      gsap.from(".hero-stat", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      <BrandWatermark />

      <div className="brand-hero-orb pointer-events-none absolute top-[38%] left-1/2 h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <BrandHero />

        <p className="hero-eyebrow mx-auto mt-10 max-w-md text-sm text-cream-muted">
          <span className="font-semibold text-accent">{profile.role}</span>
          <span className="mx-2 text-border">·</span>
          <span className="inline-flex items-center justify-center gap-1.5">
            <span className="brand-status-dot" aria-hidden="true" />
            {profile.availability}
          </span>
        </p>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream-muted sm:text-xl">
          {profile.tagline}
        </p>

        <div className="mt-8 flex min-h-[2rem] flex-wrap items-center justify-center gap-2 text-sm text-muted">
          <span>Specializing in</span>
          <TypeWriter />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#contact" className="btn-neon w-full rounded-xl px-10 py-4 text-sm sm:w-auto">
            Book a free discovery call
          </a>
          <a href="#projects" className="btn-ghost w-full rounded-xl px-10 py-4 text-sm sm:w-auto">
            View my work
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.label];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="glass flex h-11 w-11 items-center justify-center rounded-xl text-cream-muted transition-all hover:border-accent/50 hover:text-accent"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="hero-stat brand-stat-card rounded-xl px-4 py-4">
              <p className="font-heading text-2xl font-semibold text-cream sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted/70">
        <span className="font-mono-tech text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="brand-scroll-indicator">
          <div className="brand-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
