import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { contactAssurances, profile } from "../data/content";
import { copyText, useToast } from "./Toast";

const CONTACT_EMAIL = "hello@sivesh-pb.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const inputClass =
  "w-full border border-border bg-ink px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-muted/70 focus:border-accent disabled:opacity-60";

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
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { push } = useToast();

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    try {
      await copyText(CONTACT_EMAIL);
      push("Email copied", "accent");
    } catch {
      push("Could not copy — use mailto instead");
    }
  };

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
            {contactInfo.map((item) =>
              item.label === "Email" ? (
                <div
                  key={item.label}
                  className="contact-channel glass interactive-card flex items-center gap-4 border border-border p-5 hover:border-accent"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono-tech text-[10px] tracking-widest text-muted uppercase">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      className="mt-0.5 block truncate text-sm text-cream transition-colors hover:text-accent"
                    >
                      {item.value}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="shrink-0 border border-border px-2.5 py-1.5 font-mono-tech text-[10px] tracking-[0.14em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
                  >
                    Copy
                  </button>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel glass interactive-card group flex items-center gap-4 border border-border p-5 hover:border-accent"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
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
              )
            )}

            <div className="contact-channel glass mt-2 border border-border p-5">
              <p className="font-mono-tech text-xs tracking-widest text-accent uppercase">
                What you can expect
              </p>
              <ul className="mt-4 space-y-2.5">
                {contactAssurances.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-cream-muted">
                    <span className="shrink-0 text-accent">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={formRef} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="gradient-border h-full">
              <div className="gradient-border-inner p-6 md:p-8">
                {status === "success" ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-none border border-accent text-xl text-accent">
                      ✓
                    </div>
                    <p className="font-heading text-2xl font-medium tracking-[-0.03em] text-cream">
                      Message received
                    </p>
                    <p className="mt-3 max-w-sm text-sm text-cream-muted">
                      Thanks for reaching out. {profile.firstName} will review your note and get
                      back to you within 24 hours with next steps.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="mb-2 font-heading text-xl font-medium tracking-[-0.03em] text-cream">
                      Message {profile.firstName}
                    </p>
                    <p className="mb-6 text-sm text-muted">
                      A few sentences on your goal, timeline, and budget range is enough to start.
                    </p>

                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="mb-2 block font-mono-tech text-[10px] tracking-widest text-muted uppercase"
                      >
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={status === "sending"}
                        className={inputClass}
                        placeholder="Jane Smith"
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="mb-2 block font-mono-tech text-[10px] tracking-widest text-muted uppercase"
                      >
                        Work email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={status === "sending"}
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="mb-2 block font-mono-tech text-[10px] tracking-widest text-muted uppercase"
                      >
                        Project details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        disabled={status === "sending"}
                        className={`${inputClass} resize-none`}
                        placeholder="What problem are you solving? What's your ideal timeline? Any tech constraints?"
                      />
                    </div>

                    {status === "error" && (
                      <p className="mb-4 text-center text-sm text-red-600" role="alert">
                        {errorMsg}{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline">
                          {CONTACT_EMAIL}
                        </a>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-neon w-full py-4 disabled:cursor-wait disabled:opacity-70"
                    >
                      {status === "sending"
                        ? "Sending…"
                        : "Send message — I\u2019ll reply within 24h"}
                    </button>
                    <p className="mt-4 text-center text-xs text-muted">
                      Prefer email?{" "}
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="link-underline"
                      >
                        Copy {CONTACT_EMAIL}
                      </button>
                    </p>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
