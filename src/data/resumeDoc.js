/** Structured resume content for the in-site creative preview */
export const resumeDoc = {
  phone: "+91 79078 40071",
  email: "hello@sivesh-pb.com",
  website: "sivesh-pb.com",
  links: [
    { label: "Web", href: "https://sivesh-pb.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/siv3sh" },
    { label: "GitHub", href: "https://github.com/siv3sh" },
  ],
  summary:
    "AI engineer shipping production LLM systems, RAG pipelines, and multi-agent workflows — from architecture through Dockerized deployment.",
  education: [
    {
      school: "CHRIST (Deemed to be University)",
      degree: "M.Sc. Artificial Intelligence and Machine Learning",
      place: "Bangalore, Karnataka",
      period: "Jul 2024 – Present",
    },
    {
      school: "Yeldo Mar Baselios College (MGU)",
      degree: "Bachelor of Computer Applications",
      place: "Ernakulam, Kerala",
      period: "Aug 2021 – May 2024",
    },
  ],
  experience: [
    {
      role: "Junior AI Engineer",
      company: "Ideaelan",
      place: "Remote",
      period: "Jan 2026 – Present",
      bullets: [
        "Built a Monday.com-style project & ticket platform for Infinity X, extended with Agentic AI automation.",
        "Shipped Flask LLM microservices with LangChain agentic pipelines and RAG (ChromaDB) for production support.",
        "Implemented embedding-based related-ticket detection to surface duplicates and cut redundant agent work.",
        "Deployed AI services with Docker + Git CI/CD from model iteration to production release.",
        "Built LLM reply suggestions for context-aware drafts, improving resolution consistency.",
        "Owned end-to-end architecture on Azure Cosmos DB, including API design and backend services.",
      ],
    },
    {
      role: "GenAI Intern",
      company: "UIAI Technologies",
      place: "Chennai, Tamil Nadu",
      period: "Mar 2025 – Jul 2025",
      bullets: [
        "Engineered multi-agent workflows with AGNO + LangChain; improved RAG retrieval accuracy by ~35%.",
        "Deployed Flask LLM services with Ollama and vector search for real-time internal NLP tools.",
        "Fine-tuned hiring models: +25% screening precision, −40% manual review time.",
      ],
    },
  ],
  projects: [
    {
      title: "Multi-Agent AI Attrition Analysis",
      stack: "LangChain · Python · Streamlit · Docker · RAG",
      blurb:
        "Modular agents for processing, analysis, and attrition prediction — 65% faster HR insights with ChromaDB RAG.",
    },
    {
      title: "Career Placement Assistant",
      stack: "Python · Streamlit · RAG · Groq · ChromaDB",
      blurb:
        "Realtime analytics over 3,000+ placement records with 92% retrieval accuracy for advisors.",
    },
    {
      title: "Mental Health Risk Detection Agent",
      stack: "RoBERTa · Mistral · Streamlit · Ollama",
      blurb:
        "88% risk classification with fully local, privacy-preserving response generation.",
    },
    {
      title: "Automated HR Management System",
      stack: "Python · Flask · PostgreSQL · React · Docker",
      blurb:
        "Full-stack employee lifecycle platform for 200+ records, containerized end-to-end.",
    },
  ],
  achievements: [
    "Presenter — AgriCLIP-CNN plant disease detection, International Conference on Artificial Intelligence (ICAI).",
    "Q1 journal submission — multimodal deep learning for plant phenotyping (under review).",
    "Winner — Best Innovation Award, SRM University Hackathon (AI sustainability).",
  ],
  skillGroups: [
    {
      label: "Languages",
      items: ["Python", "SQL", "Java", "C", "JavaScript"],
    },
    {
      label: "GenAI & Agents",
      items: [
        "LangChain",
        "LangGraph",
        "RAG",
        "Multi-Agent",
        "CrewAI",
        "AutoGen",
        "Fine-tuning",
        "LoRA",
        "OpenAI",
        "Anthropic",
        "Groq",
      ],
    },
    {
      label: "Vectors & MLOps",
      items: ["Chroma", "Weaviate", "Qdrant", "Docker", "CI/CD", "MLflow", "W&B"],
    },
    {
      label: "ML / DL",
      items: ["PyTorch", "TensorFlow", "Transformers", "RoBERTa", "OpenCV", "XGBoost"],
    },
    {
      label: "Backend & Cloud",
      items: ["Flask", "FastAPI", "PostgreSQL", "MongoDB", "Cosmos DB", "AWS", "GCP"],
    },
  ],
};
