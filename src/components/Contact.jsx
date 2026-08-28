import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import MagneticCard from "./effects/MagneticCard";
import { contactAssurances, profile } from "../data/content";

const CONTACT_EMAIL = "hello@sivesh-pb.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const contactInfo = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: "✉",
  },
  {
    label: "GitHub",
    value: "github.com/siv3sh",
    href: "https://github.com/siv3sh",
    icon: "⌥",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/siv3sh",
    href: "https://linkedin.com/in/siv3sh",
    icon: "◈",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-channel", {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      if (formRef.current) {
        gsap.from(formRef.current, {
          y: 22,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio inquiry from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Could not send message.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please email me directly."
      );
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="immersive-section relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sectionKey="contact"
          title={`Contact ${profile.fullName}`}
          subtitle={`Reach out to ${profile.firstName} directly — reply within 24 hours with honest feedback on fit, scope, and timeline.`}
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-4 lg:col-span-2">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                className="contact-channel glass interactive-card group flex items-center gap-4 rounded-xl p-5 hover:border-cream/15"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent transition-all group-hover:shadow-[0_0_15px_rgba(168,144,108,0.3)]">
                  {item.icon}
                </span>
                <div>
                  <p className="font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-cream transition-colors group-hover:text-accent">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            <div className="contact-channel glass mt-2 rounded-xl p-5">
              <p className="font-mono-tech text-xs tracking-widest text-accent-2/70 uppercase">
                What you can expect
              </p>
              <ul className="mt-4 space-y-2.5">
                {contactAssurances.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-cream-muted">
                    <span className="shrink-0 text-accent-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={formRef} className="lg:col-span-3">
            <MagneticCard className="h-full" tiltStrength={4}>
              <form onSubmit={handleSubmit} className="gradient-border h-full">
                <div className="gradient-border-inner p-6 md:p-8">
                  {status === "success" ? (
                    <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-2xl text-accent shadow-[0_0_40px_rgba(168,144,108,0.2)]">
                        ✓
                      </div>
                      <p className="font-heading text-2xl font-bold text-gradient">
                        Message received
                      </p>
                      <p className="mt-3 max-w-sm text-sm text-cream-muted">
                        Thanks for reaching out. {profile.firstName} will review your note and
                        get back to you within 24 hours with next steps.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-2 font-heading text-xl font-bold text-cream">
                        Message {profile.firstName}
                      </p>
                      <p className="mb-6 text-sm text-muted">
                        A few sentences on your goal, timeline, and budget range is enough to
                        start.
                      </p>

                      <div className="mb-5">
                        <label htmlFor="name" className="mb-2 block font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                          Your name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          disabled={status === "sending"}
                          className="w-full rounded-lg border border-border/80 bg-surface-raised/60 px-4 py-3 text-cream outline-none transition-all placeholder:text-muted/80 focus:border-accent/50 focus:shadow-[0_0_20px_rgba(168,144,108,0.1)] focus:ring-1 focus:ring-accent/30 disabled:opacity-60"
                          placeholder="Jane Smith"
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="email" className="mb-2 block font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                          Work email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          disabled={status === "sending"}
                          className="w-full rounded-lg border border-border/80 bg-surface-raised/60 px-4 py-3 text-cream outline-none transition-all placeholder:text-muted/80 focus:border-accent/50 focus:shadow-[0_0_20px_rgba(168,144,108,0.1)] focus:ring-1 focus:ring-accent/30 disabled:opacity-60"
                          placeholder="you@company.com"
                        />
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="mb-2 block font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                          Project details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          disabled={status === "sending"}
                          className="w-full resize-none rounded-lg border border-border/80 bg-surface-raised/60 px-4 py-3 text-cream outline-none transition-all placeholder:text-muted/80 focus:border-accent/50 focus:shadow-[0_0_20px_rgba(168,144,108,0.1)] focus:ring-1 focus:ring-accent/30 disabled:opacity-60"
                          placeholder="What problem are you solving? What's your ideal timeline? Any tech constraints?"
                        />
                      </div>

                      {status === "error" && (
                        <p className="mb-4 text-center text-sm text-red-300/90" role="alert">
                          {errorMsg}{" "}
                          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
                            {CONTACT_EMAIL}
                          </a>
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-neon w-full rounded-xl py-4 text-sm disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === "sending"
                          ? "Sending…"
                          : "Send message — I\u2019ll reply within 24h"}
                      </button>
                      <p className="mt-4 text-center text-xs text-muted">
                        Prefer email?{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                          {CONTACT_EMAIL}
                        </a>
                      </p>
                    </>
                  )}
                </div>
              </form>
            </MagneticCard>
          </div>
        </div>
      </div>
    </section>
  );
}
