/** Structured resume content for the in-site creative preview.
 * Download still serves public/Sivesh-PB-Resume.pdf (your uploaded file).
 */

export const resumeDoc = {
  name: "Sivesh PB",
  role: "AI Engineer",
  phone: "+91 79078 40071",
  email: "hello@sivesh-pb.com",
  web: "sivesh-pb.com",
  links: [
    { label: "Web", href: "https://sivesh-pb.com" },
    { label: "GitHub", href: "https://github.com/siv3sh" },
    { label: "LinkedIn", href: "https://linkedin.com/in/siv3sh" },
  ],
  summary:
    "AI engineer shipping production LLM apps, RAG systems, and multi-agent workflows — with clear architecture, Dockerized delivery, and measurable business impact.",
  education: [
    {
      school: "CHRIST (Deemed to be University)",
      place: "Bangalore, Karnataka",
      degree: "M.Sc. Artificial Intelligence and Machine Learning",
      period: "Jul 2024 – Present",
    },
    {
      school: "Yeldo Mar Baselios College",
      place: "Ernakulam, Kerala",
      degree: "Bachelor of Computer Applications",
      period: "Aug 2021 – May 2024",
    },
  ],
  experience: [
    {
      role: "Junior AI Engineer",
      company: "Ideaelan",
      place: "Remote",
      period: "Jan 2025 – Present",
      bullets: [
        "Built an in-house Monday.com-style project/ticket platform for Infinity X, extended with Agentic AI automation.",
        "Shipped Flask LLM microservices with LangChain + RAG (ChromaDB) for real-time production support NLP.",
        "Implemented embedding-based related-ticket detection to surface duplicates and cut redundant agent work.",
        "Owned Docker + Git CI/CD releases and end-to-end architecture on Azure Cosmos DB.",
        "Built LLM reply suggestions for context-aware draft responses across the support team.",
      ],
    },
    {
      role: "GenAI Intern",
      company: "UIAI Technologies",
      place: "Chennai, Tamil Nadu",
      period: "Mar 2025 – Jul 2025",
      bullets: [
        "Engineered multi-agent workflows with AGNO + LangChain and RAG pipelines (~35% retrieval accuracy gain).",
        "Deployed Flask LLM services with Ollama and vector search for internal realtime NLP tools.",
        "Fine-tuned hiring automation models: +25% screening precision, −40% manual review time.",
      ],
    },
  ],
  projects: [
    {
      title: "Multi-Agent AI Attrition Analysis",
      stack: "LangChain · Python · Streamlit · Docker · RAG",
      note: "65% faster HR insight generation with modular agents + ChromaDB RAG.",
    },
    {
      title: "Career Placement Assistant",
      stack: "Python · Streamlit · RAG · Groq · ChromaDB",
      note: "92% retrieval accuracy across 3,000+ placement records.",
    },
    {
      title: "Mental Health Risk Detection Agent",
      stack: "RoBERTa · Mistral · Streamlit · Ollama",
      note: "88% risk classification accuracy with fully on-device responses.",
    },
    {
      title: "Automated HR Management System",
      stack: "Python · Flask · PostgreSQL · React · Docker",
      note: "Full-stack lifecycle platform for 200+ employee records.",
    },
  ],
  achievements: [
    "ICAI presenter — AgriCLIP-CNN for plant disease detection with GenAI foundation models.",
    "Q1 journal submission — multimodal deep learning for plant phenotyping (under review).",
    "Best Innovation Award — SRM University Hackathon (AI sustainability).",
  ],
  skillGroups: [
    {
      label: "Languages",
      items: ["Python", "SQL", "JavaScript", "Java", "C"],
    },
    {
      label: "GenAI",
      items: ["LangChain", "LangGraph", "RAG", "CrewAI", "AutoGen", "Fine-tuning", "OpenAI", "Anthropic", "Groq"],
    },
    {
      label: "Vectors",
      items: ["Chroma", "Weaviate", "Qdrant", "Embeddings"],
    },
    {
      label: "ML / DL",
      items: ["PyTorch", "TensorFlow", "Transformers", "RoBERTa", "OpenCV", "XGBoost"],
    },
    {
      label: "Platform",
      items: ["Docker", "CI/CD", "Azure Cosmos DB", "AWS", "GCP", "FastAPI", "Flask"],
    },
  ],
};
