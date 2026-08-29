import { useState, useEffect } from "react";
import { navLinks, profile } from "../data/content";
import { brand } from "../data/brand";
import ResumeActions from "./ResumeActions";

function scrollToSection(href, onDone) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  onDone?.();
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el) => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    scrollToSection(href, () => setOpen(false));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-border-strong)] bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="group flex items-center gap-3"
          aria-label={`${profile.fullName} — back to top`}
        >
          <span className="flex h-9 w-9 items-center justify-center border border-[var(--color-border-strong)] font-mono-tech text-[10px] tracking-[0.12em] text-accent">
            {brand.monogram}
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-heading text-lg font-medium tracking-[-0.03em] text-cream">
              {brand.fullName}
            </span>
            <span className="mt-0.5 block font-mono-tech text-[9px] tracking-[0.16em] text-muted uppercase">
              {brand.descriptor}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                aria-current={active === link.id ? "true" : undefined}
                className={`border-b py-1 font-mono-tech text-[11px] tracking-[0.18em] uppercase transition-colors ${
                  active === link.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted hover:text-accent"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1.5 font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
            aria-label="Open command palette"
            title="Command palette"
          >
            <kbd className="text-cream">⌘K</kbd>
          </button>
          <ResumeActions variant="nav" />
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="btn-neon px-5 py-2.5"
          >
            Hire {profile.firstName}
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-border md:hidden"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-0.5 w-5 bg-accent transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-accent transition-all duration-300 ${open ? "opacity-0 scale-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-accent transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="border-t border-border bg-ink px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`block py-3 font-mono-tech text-[11px] tracking-[0.18em] uppercase transition-colors ${
                  active === link.id ? "text-accent" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="space-y-3 pt-2">
            <ResumeActions />
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="btn-neon block py-3 text-center"
            >
              Hire {profile.firstName}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
