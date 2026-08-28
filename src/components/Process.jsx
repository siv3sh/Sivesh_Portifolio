import SectionHeading from "./SectionHeading";
import { processSteps, idealClients, profile } from "../data/content";
import { useScrollReveal } from "../hooks/useScrollReveal";

function ProcessStep({ step, index }) {
  const { ref, visible } = useScrollReveal(0.08, "0px 0px -50px 0px");

  return (
    <div
      ref={ref}
      className={`reveal relative ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      <div className="gradient-border interactive-card h-full">
        <div className="gradient-border-inner flex h-full flex-col p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono-tech text-3xl font-bold text-cream/15">{step.step}</span>
            <span className="shrink-0 rounded-full border border-cream/12 bg-cream/[0.03] px-3 py-1 font-mono-tech text-[10px] tracking-wider text-muted uppercase">
              {step.duration}
            </span>
          </div>
          <h3 className="mt-4 font-heading text-xl font-bold text-cream">{step.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const { ref, visible } = useScrollReveal(0.1, "0px 0px -50px 0px");

  return (
    <section id="process" className="immersive-section relative px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cream/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="process"
          title={`How ${profile.firstName} works with you`}
          subtitle={`A transparent path with ${profile.fullName} — from first call to launched product.`}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <ProcessStep key={step.step} step={step} index={i} />
          ))}
        </div>

        <div
          ref={ref}
          className={`reveal mt-12 rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 md:mt-16 md:p-8 ${
            visible ? "is-visible" : ""
          }`}
        >
          <p className="font-mono-tech text-xs tracking-widest text-muted uppercase">
            A strong fit if you are…
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {idealClients.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-cream-muted">
                <span className="mt-0.5 shrink-0 text-cream-muted">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-neon rounded-xl px-8 py-3.5 text-center text-sm">
              Book a free discovery call
            </a>
            <p className="text-sm text-muted">No commitment. Clear yes/no on fit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
