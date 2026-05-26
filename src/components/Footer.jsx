import { BrandMark, BrandRule, BrandWordmark } from "./brand";
import { brand } from "../data/brand";

function scrollToTop(e) {
  e.preventDefault();
  if (window.lenis) {
    window.lenis.scrollTo(0, { duration: 1.1 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 py-12">
      <div className="section-line absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-6xl">
        <BrandRule className="mb-10 max-w-md mx-auto" />

        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <BrandMark size="md" />
            <div>
              <BrandWordmark size="sm" showTag />
              <p className="mt-2 font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                © {year} · {brand.descriptor}
              </p>
            </div>
          </div>

          <a
            href="#hero"
            onClick={scrollToTop}
            className="btn-ghost rounded-lg px-6 py-2.5 font-mono-tech text-xs tracking-widest uppercase"
          >
            ↑ Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
