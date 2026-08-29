import { brand } from "./brand";

export const profile = {
  firstName: "Sivesh",
  lastName: "PB",
  fullName: "Sivesh PB",
  role: "AI Engineer",
  brandLine: brand.line,
  tagline:
    "I help startups and teams turn AI ideas into production software — with clear timelines, weekly updates, and measurable results.",
  availability: "Open to new opportunities",
};

/** Hero split-layout copy (HTML text — not baked into the photo) */
export const heroCopy = {
  greeting: "Hey I'm",
  lines: [
    "Building intelligent solutions.",
    "Shaping the future with AI.",
  ],
};

export const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const sectionMeta = {
  about: { num: "01", label: "About" },
  process: { num: "02", label: "Process" },
  skills: { num: "03", label: "Capabilities" },
  projects: { num: "04", label: "Case Studies" },
  experience: { num: "05", label: "Experience" },
  faq: { num: "06", label: "FAQ" },
  contact: { num: "07", label: "Contact" },
};

export const heroStats = [
  { value: "2+", label: "Years shipping AI in production" },
  { value: "35%", label: "Avg. retrieval accuracy gain" },
  { value: "40%", label: "Less manual work for teams" },
  { value: "100%", label: "End-to-end delivery ownership" },
];

export const trustPillars = [
  {
    icon: "◎",
    title: "Clear communication",
    description:
      "Weekly updates, plain-language demos, and no jargon walls — you always know where your project stands.",
  },
  {
    icon: "⬡",
    title: "Production-first builds",
    description:
      "Dockerized, documented, and deployable systems — not notebook prototypes that stall after the demo.",
  },
  {
    icon: "✦",
    title: "Measurable outcomes",
    description:
      "Every engagement ties to business metrics: time saved, accuracy gained, or cost reduced — tracked from day one.",
  },
  {
    icon: "◈",
    title: "Low-risk start",
    description:
      "Discovery call and scoped proposal before any commitment. You approve the plan before build begins.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery call",
    duration: "30 min · Free",
    description:
      "We align on your goal, users, data, and timeline. You leave with clarity on feasibility and next steps — no pressure.",
  },
  {
    step: "02",
    title: "Scope & proposal",
    duration: "2–3 days",
    description:
      "Fixed deliverables, milestones, and transparent pricing. You know exactly what ships, when, and what success looks like.",
  },
  {
    step: "03",
    title: "Build & iterate",
    duration: "Weekly sprints",
    description:
      "Working demos every week. Feedback loops built in so the final product matches how your team actually works.",
  },
  {
    step: "04",
    title: "Launch & handoff",
    duration: "Included",
    description:
      "Deployment support, documentation, and knowledge transfer so your team can run and extend the system confidently.",
  },
];

export const idealClients = [
  "Startups adding AI to an existing product",
  "Teams stuck with a prototype that won't scale",
  "Companies needing RAG, agents, or LLM automation",
  "Founders who want one engineer owning delivery end-to-end",
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/siv3sh" },
  { label: "LinkedIn", href: "https://linkedin.com/in/siv3sh" },
  { label: "Email", href: "mailto:hello@sivesh-pb.com" },
];

/** Resume file in /public — swap this PDF anytime to update site + downloads */
export const resume = {
  fileName: "Sivesh-PB-Resume.pdf",
  href: "/Sivesh-PB-Resume.pdf",
  label: "Resume",
};

export const skillCategories = [
  {
    title: "Generative AI & LLMs",
    icon: "◈",
    skills: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "RAG",
      "Fine-tuning",
      "LoRA/QLoRA",
      "Prompt Engineering",
      "OpenAI API",
      "Anthropic API",
      "Groq",
      "CrewAI",
      "AutoGen",
      "AGNO",
    ],
  },
  {
    title: "ML & Deep Learning",
    icon: "◎",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Transformers",
      "RoBERTa",
      "LSTM",
      "CNN",
      "XGBoost",
      "OpenCV",
    ],
  },
  {
    title: "Backend & Databases",
    icon: "⬡",
    skills: [
      "Python",
      "Flask",
      "FastAPI",
      "REST API",
      "PostgreSQL",
      "MongoDB",
      "Azure Cosmos DB",
      "ChromaDB",
      "Weaviate",
      "Qdrant",
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "✦",
    skills: [
      "Docker",
      "AWS",
      "GCP",
      "MLflow",
      "CI/CD",
      "Weights & Biases",
      "Streamlit",
      "Gradio",
    ],
  },
];

export const projects = [
  {
    title: "Multi-Agent AI Attrition Analysis System",
    focus: "Multi-agent · RAG",
    diagram: "agents",
    stack: ["LangChain", "Python", "Streamlit", "Docker", "RAG", "ChromaDB"],
    problem:
      "HR teams spent hours pulling reports manually and couldn't query employee data in plain language.",
    description:
      "Built a multi-agent system that processes HR data, runs analysis, and answers natural-language questions — replacing manual report workflows.",
    metrics: [
      "65% faster HR insight generation",
      "Self-serve analytics for non-technical staff",
      "Deployed with Docker for easy rollout",
    ],
    impact: "65%",
    impactLabel: "Faster insight generation",
    github: "https://github.com/siv3sh",
    featured: true,
  },
  {
    title: "Career Placement Assistant AI Agent",
    focus: "RAG · Retrieval",
    diagram: "rag",
    stack: ["Python", "Streamlit", "RAG", "Groq API", "ChromaDB"],
    problem:
      "Placement data lived in spreadsheets — advisors couldn't quickly answer student and recruiter questions.",
    description:
      "RAG-powered assistant over 3,000+ placement records with accurate retrieval for salary, hiring, and branch-level queries.",
    metrics: [
      "92% retrieval accuracy on real queries",
      "3,000+ records searchable instantly",
      "Handles complex multi-part questions",
    ],
    impact: "92%",
    impactLabel: "Retrieval accuracy",
    github: "https://github.com/siv3sh",
    featured: false,
  },
  {
    title: "Mental Health Risk Detection & Response Agent",
    focus: "On-device · NLP",
    diagram: "local",
    stack: ["RoBERTa", "Mistral", "Streamlit", "Ollama"],
    problem:
      "Sensitive mental-health screening required accuracy and privacy — cloud APIs were not an option.",
    description:
      "Fine-tuned classifier plus local LLM responses so risk detection and support run entirely on-device.",
    metrics: [
      "88% classification accuracy",
      "Zero data sent to external APIs",
      "Production-ready local inference stack",
    ],
    impact: "88%",
    impactLabel: "Classification accuracy",
    github: "https://github.com/siv3sh",
    featured: false,
  },
  {
    title: "Automated HR Management System",
    focus: "Full-stack · Ops",
    diagram: "fullstack",
    stack: ["Python", "Flask", "PostgreSQL", "React", "Docker"],
    problem:
      "Employee lifecycle management was fragmented across tools with no single source of truth.",
    description:
      "Full-stack HR platform with secure API, React UI, and optimized database — containerized for reliable deployment.",
    metrics: [
      "200+ employee records managed",
      "End-to-end lifecycle in one system",
      "Containerised for consistent deployments",
    ],
    impact: "200+",
    impactLabel: "Records managed",
    github: "https://github.com/siv3sh",
    featured: false,
  },
];

export const experience = [
  {
    role: "Junior AI Engineer",
    company: "Ideaelan",
    location: "Remote",
    period: "Jan 2025 – Present",
    highlights: [
      "Shipped a production AI support platform integrated with Infinity X — used daily by support teams",
      "Built ticket risk classification and escalation pipelines that reduce manual triage",
      "Delivered LLM-powered draft responses so agents resolve tickets faster",
      "Architected scalable storage on Azure Cosmos DB for enterprise reliability",
    ],
  },
  {
    role: "GenAI Intern",
    company: "UIAI Technologies",
    location: "Chennai",
    period: "Mar 2025 – Jul 2025",
    highlights: [
      "Deployed autonomous workflows with AGNO and LangChain — cut repetitive ops work",
      "Improved RAG retrieval accuracy by 35%, directly improving answer quality for users",
      "Fine-tuned hiring automation: 25% better screening precision, 40% less manual review",
    ],
  },
];

export const aboutHighlights = [
  "Trusted by teams at Ideaelan and UIAI Technologies to ship production AI",
  "MSc in AI & ML — research published at ICAI; journal submission in review (Q1)",
  "Full ownership: from architecture and build to deployment and handoff",
  "Honest timelines, written scope, and weekly visibility — no surprise invoices",
  "Winner, Best Innovation Award — SRM University Hackathon",
];

export const contactAssurances = [
  "Free 30-minute discovery call",
  "Reply within 24 hours on weekdays",
  "NDA-friendly — your ideas stay confidential",
  "Fixed-scope proposals — no open-ended billing surprises",
];

export const faqs = [
  {
    q: "What kinds of projects do you take on?",
    a: "Production LLM apps, RAG systems, multi-agent workflows, and AI features inside existing products. Best fit is a clear problem with a path to measurable impact.",
  },
  {
    q: "How do engagements usually start?",
    a: "A free 30-minute discovery call, then a fixed-scope proposal with deliverables, timeline, and pricing. Build starts only after you approve the plan.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — especially teams that need one engineer to own architecture through launch, not just a prototype demo.",
  },
  {
    q: "Can you work under NDA?",
    a: "Absolutely. Sensitive product and data details stay confidential — happy to sign an NDA before deep technical discussion.",
  },
  {
    q: "What does communication look like during a build?",
    a: "Weekly demos, written updates, and a shared milestone board. You always know what’s shipping next and what’s blocked.",
  },
  {
    q: "How fast can you start?",
    a: "Usually within 1–2 weeks of signed scope, depending on current capacity. Availability is shown on the site and updated as bookings fill.",
  },
];
