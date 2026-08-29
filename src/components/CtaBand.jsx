import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/content";
import { BrandMark } from "./brand";
import { brand } from "../data/brand";
import SignalFrame from "./effects/SignalFrame";

export default function CtaBand() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section className="relative px-6 py-16 md:py-20" aria-label="Call to action">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`reveal overflow-hidden ${visible ? "is-visible" : ""}`}
        >
          <SignalFrame>
            <div className="gradient-border">
              <div className="gradient-border-inner relative px-8 py-12 text-center md:px-16 md:py-16">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10" />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <BrandMark size="sm" />
                    <span className="font-mono-tech text-[10px] tracking-[0.28em] text-accent-2/80 uppercase">
                      {brand.line}
                    </span>
                  </div>
                  <p className="font-mono-tech text-xs tracking-[0.25em] text-accent uppercase">
                    Ready when you are
                  </p>
                  <h2 className="mt-4 font-heading text-3xl font-bold text-cream md:text-4xl lg:text-5xl">
                    Work with <span className="text-gradient">{profile.fullName}</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-cream-muted">
                    Tell {profile.firstName} about your project. Reply within 24 hours with honest
                    feedback on scope, timeline, and fit.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a href="#contact" className="btn-neon w-full px-10 py-4 sm:w-auto">
                      Start a conversation
                    </a>
                    <a
                      href="mailto:hello@sivesh-pb.com"
                      className="btn-ghost w-full px-10 py-4 sm:w-auto"
                    >
                      Email directly
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SignalFrame>
        </div>
      </div>
    </section>
  );
}
