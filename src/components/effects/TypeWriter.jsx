import { useState, useEffect } from "react";

const phrases = [
  "RAG & Knowledge Bases",
  "LLM Products",
  "Multi-Agent Workflows",
  "Production AI Systems",
];

export default function TypeWriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="text-gradient-accent font-mono-tech text-lg font-semibold tracking-wide sm:text-xl">
      {text}
      <span className="animate-blink text-accent">|</span>
    </span>
  );
}
