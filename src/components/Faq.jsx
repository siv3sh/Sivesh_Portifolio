import { useId, useState } from "react";
import { animate } from "animejs";
import SectionHeading from "./SectionHeading";
import { faqs, profile } from "../data/content";
import { prefersReducedMotion } from "../lib/animeMotion";

function FaqItem({ item, index, open, onToggle }) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border border-border bg-surface-raised/40">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/[0.04]"
      >
        <span className="flex items-start gap-3">
          <span className="mt-1 font-mono-tech text-[10px] tracking-[0.16em] text-accent uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-heading text-lg font-medium tracking-[-0.02em] text-cream">
            {item.q}
          </span>
        </span>
        <span
          className={`font-mono-tech text-accent transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        ref={(node) => {
          if (!node || !open || prefersReducedMotion()) return;
          animate(node, {
            opacity: [0, 1],
            y: [-6, 0],
            duration: 360,
            ease: "outExpo",
          });
        }}
        className="border-t border-border px-5 py-4 pl-[3.25rem] text-sm leading-relaxed text-cream-muted"
      >
        {item.a}
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="immersive-section relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="faq"
          title="Questions before we talk"
          subtitle={`Straight answers about working with ${profile.firstName} — scope, communication, NDAs, and how projects kick off.`}
        />

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
