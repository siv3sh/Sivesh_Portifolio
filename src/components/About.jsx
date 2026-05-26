import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import MagneticCard from "./effects/MagneticCard";
import { aboutHighlights, profile } from "../data/content";

export default function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (portraitRef.current) {
        gsap.from(portraitRef.current, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.from(".about-highlight", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="immersive-section relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="about"
          title={`Meet ${profile.fullName}`}
          subtitle={`${profile.role} for founders and product teams who want one person accountable for delivery — from architecture through launch.`}
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div ref={portraitRef} className="lg:col-span-2">
            <MagneticCard className="h-full">
              <div className="gradient-border neon-glow h-full">
                <div className="gradient-border-inner flex h-full flex-col justify-between p-8">
                  <div>
                    <p className="font-mono-tech text-xs tracking-widest text-accent/70 uppercase">
                      {profile.fullName}
                    </p>
                    <h3 className="mt-4 font-heading text-3xl font-bold text-cream">
                      {profile.firstName}{" "}
                      <span className="text-gradient">{profile.lastName}</span>
                    </h3>
                    <p className="mt-2 text-accent">Junior AI Engineer @ Ideaelan · Remote</p>
                    <p className="mt-4 text-sm leading-relaxed text-cream-muted">
                      Shipping production AI for support and operations — the same standards
                      {profile.firstName} brings to every client project.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3 border-t border-accent/10 pt-6">
                    {[
                      ["Education", "MSc AI & ML"],
                      ["University", "CHRIST, Bangalore"],
                      ["Delivery", "End-to-end ownership"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="font-mono-tech text-muted">{k}</span>
                        <span className="text-cream-muted">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Reliable", "Transparent", "Outcome-driven"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-accent-2/20 bg-accent-2/10 px-2.5 py-1 font-mono-tech text-[10px] tracking-wider text-accent-2 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </MagneticCard>
          </div>

          <div ref={listRef} className="space-y-4 lg:col-span-3">
            <p className="text-lg leading-relaxed text-cream-muted">
              Most AI projects fail in the gap between demo and deployment. {profile.firstName}{" "}
              closes that gap: scoped builds, honest timelines, and systems your team can
              actually run after handoff.
            </p>
            <p className="leading-relaxed text-muted">
              Whether you need a RAG assistant, multi-agent workflow, or full-stack AI
              product — with {profile.fullName} you get one point of contact who owns
              delivery and keeps you informed every step.
            </p>

            <ul className="mt-6 space-y-3">
              {aboutHighlights.map((item, i) => (
                <li
                  key={i}
                  className="about-highlight group glass flex gap-4 rounded-xl p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(224,122,74,0.08)]"
                >
                  <span className="mt-0.5 shrink-0 text-accent">✓</span>
                  <span className="text-sm leading-relaxed text-cream-muted transition-colors group-hover:text-cream sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
