/**
 * Abstract system diagrams for case studies — visual without fake screenshots.
 */
const diagrams = {
  agents: AgentsDiagram,
  rag: RagDiagram,
  local: LocalDiagram,
  fullstack: FullstackDiagram,
};

export default function ProjectDiagram({ type = "rag", className = "" }) {
  const Diagram = diagrams[type] || RagDiagram;
  return (
    <div
      className={`project-diagram relative overflow-hidden border border-border bg-[#0c0f16] ${className}`}
      aria-hidden="true"
    >
      <div className="tech-grid absolute inset-0 opacity-25" />
      <div className="scanlines absolute inset-0 opacity-20" />
      <div className="relative z-[1] flex h-full min-h-[220px] flex-col p-4 md:min-h-[280px] md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono-tech text-[9px] tracking-[0.18em] text-[#6b8ff8] uppercase">
            System map
          </span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 bg-[#3d6ef5]" />
            <span className="h-1.5 w-1.5 bg-[#5b6578]" />
            <span className="h-1.5 w-1.5 bg-[#aeb6c5]" />
          </span>
        </div>
        <Diagram />
      </div>
    </div>
  );
}

function Node({ x, y, label, accent }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="56"
        height="22"
        fill={accent ? "rgba(61,110,245,0.18)" : "rgba(247,248,250,0.04)"}
        stroke={accent ? "#3d6ef5" : "#5b6578"}
        strokeWidth="1"
      />
      <text
        x={x + 28}
        y={y + 14}
        textAnchor="middle"
        fill={accent ? "#6b8ff8" : "#aeb6c5"}
        fontSize="7"
        fontFamily="JetBrains Mono, ui-monospace, monospace"
        letterSpacing="0.08em"
      >
        {label}
      </text>
    </g>
  );
}

function Wire({ x1, y1, x2, y2 }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#3d6ef5"
      strokeOpacity="0.45"
      strokeWidth="1"
      strokeDasharray="3 3"
    />
  );
}

function AgentsDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full flex-1" preserveAspectRatio="xMidYMid meet">
      <Wire x1="48" y1="40" x2="130" y2="80" />
      <Wire x1="48" y1="120" x2="130" y2="80" />
      <Wire x1="186" y1="80" x2="250" y2="40" />
      <Wire x1="186" y1="80" x2="250" y2="120" />
      <Node x={20} y={28} label="HR DATA" />
      <Node x={20} y={108} label="QUERY" />
      <Node x={130} y={69} label="ORCHESTRATOR" accent />
      <Node x={242} y={28} label="ANALYST" />
      <Node x={242} y={108} label="RAG" accent />
      <circle cx="158" cy="80" r="3" fill="#3d6ef5">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function RagDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full flex-1" preserveAspectRatio="xMidYMid meet">
      <Wire x1="76" y1="80" x2="120" y2="80" />
      <Wire x1="176" y1="80" x2="220" y2="80" />
      <Wire x1="148" y1="50" x2="148" y2="68" />
      <Node x={20} y={69} label="RECORDS" />
      <Node x={120} y={28} label="EMBED" />
      <Node x={120} y={69} label="VECTOR DB" accent />
      <Node x={120} y={110} label="RETRIEVE" />
      <Node x={220} y={69} label="ANSWER" accent />
      <rect x="20" y="20" width="8" height="120" fill="none" stroke="#3d6ef5" strokeOpacity="0.25" />
      <rect x="292" y="20" width="8" height="120" fill="none" stroke="#3d6ef5" strokeOpacity="0.25" />
    </svg>
  );
}

function LocalDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full flex-1" preserveAspectRatio="xMidYMid meet">
      <rect
        x="40"
        y="24"
        width="240"
        height="112"
        fill="none"
        stroke="#3d6ef5"
        strokeOpacity="0.35"
        strokeDasharray="4 3"
      />
      <text
        x="160"
        y="18"
        textAnchor="middle"
        fill="#6b8ff8"
        fontSize="7"
        fontFamily="JetBrains Mono, ui-monospace, monospace"
        letterSpacing="0.12em"
      >
        ON-DEVICE BOUNDARY
      </text>
      <Wire x1="100" y1="80" x2="140" y2="80" />
      <Wire x1="196" y1="80" x2="230" y2="80" />
      <Node x={44} y={69} label="SIGNAL" />
      <Node x={140} y={69} label="RoBERTa" accent />
      <Node x={230} y={69} label="MISTRAL" accent />
      <text
        x="160"
        y="128"
        textAnchor="middle"
        fill="#5b6578"
        fontSize="7"
        fontFamily="JetBrains Mono, ui-monospace, monospace"
      >
        ZERO EXTERNAL API
      </text>
    </svg>
  );
}

function FullstackDiagram() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full flex-1" preserveAspectRatio="xMidYMid meet">
      <Wire x1="76" y1="48" x2="132" y2="80" />
      <Wire x1="76" y1="112" x2="132" y2="80" />
      <Wire x1="188" y1="80" x2="244" y2="80" />
      <Node x={20} y={36} label="REACT UI" />
      <Node x={20} y={100} label="API" />
      <Node x={132} y={69} label="FLASK" accent />
      <Node x={244} y={69} label="POSTGRES" accent />
      <Node x={132} y={120} label="DOCKER" />
    </svg>
  );
}
