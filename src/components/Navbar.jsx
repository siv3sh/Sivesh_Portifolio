import { useState, useEffect } from "react";
import { navLinks, profile } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { BrandMark, BrandWordmark } from "./brand";

function scrollToSection(href, onDone) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  if (window.lenis) {
    window.lenis.scrollTo(el, {
      offset: -72,
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  onDone?.();
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    const updateScrolled = (scrollY) => {
      setScrolled(scrollY > 24);
    };

    const onLenisScroll = (e) => updateScrolled(e.detail ?? 0);
    const onWindowScroll = () => updateScrolled(window.scrollY);

    window.addEventListener("lenis-scroll", onLenisScroll);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    updateScrolled(window.lenis?.scroll ?? window.scrollY);

    return () => {
      window.removeEventListener("lenis-scroll", onLenisScroll);
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    scrollToSection(href, () => setOpen(false));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg shadow-accent/5" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="brand-lockup group flex items-center gap-2.5"
          aria-label={`${profile.fullName} — back to top`}
        >
          <BrandMark
            size="md"
            className="brand-mark-glow transition-transform duration-300 group-hover:scale-110"
          />
          <span className="hidden sm:inline">
            <BrandWordmark showTag showDescriptor />
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`relative rounded-lg px-4 py-2 text-sm transition-all duration-300 ${
                  active === link.id
                    ? "text-accent"
                    : "text-cream-muted hover:text-cream"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleNav(e, "#contact")}
          className="btn-neon hidden rounded-lg px-5 py-2 text-sm md:inline-flex"
        >
          Hire {profile.firstName}
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-accent/20 bg-accent/5 md:hidden"
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
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="glass border-t border-accent/10 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`block py-3 text-sm transition-colors ${
                  active === link.id ? "text-accent" : "text-cream-muted"
                }`}
              >
                <span className="font-mono-tech mr-3 text-xs text-accent-2/60">
                  //
                </span>
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="btn-neon block rounded-lg py-3 text-center text-sm"
            >
              Hire {profile.firstName}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
