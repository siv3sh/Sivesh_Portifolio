import { BrandMark, BrandWordmark } from "../brand";
import { brand } from "../../data/brand";

const items = [
  "LangChain",
  "RAG",
  "PyTorch",
  "Multi-Agent",
  "FastAPI",
  "ChromaDB",
  "Docker",
  "LLM Fine-tuning",
  "Azure",
  "Streamlit",
  "RoBERTa",
  "AGNO",
];

export default function MarqueeStrip() {
  const branded = [
    { type: "brand", key: "brand" },
    ...items.map((item) => ({ type: "item", key: item, label: item })),
  ];
  const loop = [...branded, ...branded];

  return (
    <div className="brand-marquee relative overflow-hidden border-y border-accent/20 py-4">
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
        {loop.map((entry, i) =>
          entry.type === "brand" ? (
            <span
              key={`brand-${i}`}
              className="inline-flex items-center gap-4 px-3"
            >
              <BrandMark size="sm" className="brand-mark-glow" />
              <BrandWordmark size="lg" showTag />
              <span className="brand-marquee-manifesto hidden sm:inline">
                {brand.line}
              </span>
              <span className="text-accent/40">◆</span>
            </span>
          ) : (
            <span
              key={`${entry.key}-${i}`}
              className="font-mono-tech text-xs font-medium tracking-[0.22em] text-accent/75 uppercase"
            >
              {entry.label}
              <span className="mx-6 text-accent-2/30">◆</span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
