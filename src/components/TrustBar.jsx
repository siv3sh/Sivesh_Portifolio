import { trustPillars, profile } from "../data/content";
import { useScrollReveal } from "../hooks/useScrollReveal";

function TrustCard({ pillar, index }) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`reveal interactive-card glass border border-border p-5 md:p-6 ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      <span className="flex h-10 w-10 items-center justify-center border border-border text-lg text-accent">
        {pillar.icon}
      </span>
      <h3 className="mt-4 font-heading text-lg font-medium tracking-[-0.03em] text-cream">
        {pillar.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-cream-muted">{pillar.description}</p>
    </div>
  );
}

export default function TrustBar() {
  const { ref, visible } = useScrollReveal(0.05, "0px 0px 80px 0px");

  return (
    <section className="relative px-6 py-16 md:py-20" aria-label="Why clients trust this work">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className={`reveal mb-10 text-center md:mb-12 ${visible ? "is-visible" : ""}`}>
          <p className="label-mono bracket justify-center">
            Why clients trust {profile.firstName}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium tracking-[-0.035em] text-cream md:text-4xl">
            Work with {profile.fullName}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream-muted">
            When you hire {profile.fullName}, you get one accountable engineer — clear
            communication, production-grade delivery, and outcomes you can measure.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((pillar, index) => (
            <TrustCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
