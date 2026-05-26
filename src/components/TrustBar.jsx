import { trustPillars, profile } from "../data/content";
import { useScrollReveal } from "../hooks/useScrollReveal";

function TrustCard({ pillar }) {
  const { ref, visible } = useScrollReveal(0.1, "0px 0px -50px 0px");

  return (
    <div
      ref={ref}
      className={`glass rounded-xl p-5 transition-all duration-700 md:p-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-lg text-accent">
        {pillar.icon}
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold text-cream">{pillar.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cream-muted">{pillar.description}</p>
    </div>
  );
}

export default function TrustBar() {
  const { ref, visible } = useScrollReveal(0.05, "0px 0px 80px 0px");

  return (
    <section className="relative px-6 py-16 md:py-20" aria-label="Why clients trust this work">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`mb-10 text-center transition-all duration-700 md:mb-12 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="font-mono-tech text-xs tracking-[0.25em] text-accent uppercase">
            Why clients trust {profile.firstName}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-cream md:text-4xl">
            Work with <span className="text-gradient">{profile.fullName}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream-muted">
            When you hire {profile.fullName}, you get one accountable engineer — clear
            communication, production-grade delivery, and outcomes you can measure.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((pillar) => (
            <TrustCard key={pillar.title} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
