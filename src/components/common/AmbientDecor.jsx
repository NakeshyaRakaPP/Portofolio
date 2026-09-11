import '../../styles/ambient-decor.css';

const VARIANTS = {
  about: {
    word: 'SYSTEM',
    meta: 'THINK / DESIGN / BUILD',
    nodes: [
      { label: '01', icon: 'bi-diagram-3' },
      { label: 'UX', icon: 'bi-bounding-box-circles' },
      { label: 'LOGIC', icon: 'bi-braces' }
    ]
  },

  tools: {
    word: 'STACK',
    meta: 'TOOLS / TECHNOLOGIES',
    nodes: [
      { label: 'UI', icon: 'bi-bezier2' },
      { label: 'DB', icon: 'bi-database' },
      { label: 'GIT', icon: 'bi-git' },
      { label: 'DEV', icon: 'bi-code-slash' }
    ]
  },

  projects: {
    word: 'WORK',
    meta: 'DESIGN / SYSTEM / BUILD',
    nodes: [
      { label: 'CASE', icon: 'bi-window-stack' },
      { label: 'FLOW', icon: 'bi-diagram-2' },
      { label: 'IDEA', icon: 'bi-lightbulb' }
    ]
  },

  contact: {
    word: "LET'S TALK",
    meta: 'OPEN CHANNEL',
    nodes: [
      { label: 'MAIL', icon: 'bi-envelope' },
      { label: 'LINK', icon: 'bi-arrow-up-right' }
    ]
  }
};

export default function AmbientDecor({ variant = 'tools' }) {
  const config = VARIANTS[variant] ?? VARIANTS.tools;

  return (
    <div
      className={`ambient-decor ambient-decor--${variant}`}
      aria-hidden="true"
    >
      <span className="ambient-glow ambient-glow--a" />
      <span className="ambient-glow ambient-glow--b" />

      <span className="ambient-orbit ambient-orbit--a" />
      <span className="ambient-orbit ambient-orbit--b" />

      <span className="ambient-grid" />

      <span className="ambient-word">
        {config.word}
      </span>

      <span className="ambient-meta">
        <span className="ambient-meta-dot" />
        {config.meta}
      </span>

      <div className="ambient-nodes">
        {config.nodes.map((node, index) => (
          <span
            key={`${variant}-${node.label}`}
            className={`ambient-node ambient-node--${index + 1}`}
          >
            <i
              className={`bi ${node.icon}`}
              aria-hidden="true"
            />
            <span>{node.label}</span>
          </span>
        ))}
      </div>

      {variant === 'projects' && (
        <div className="ambient-ghost-cards">
          <span className="ambient-ghost-card ambient-ghost-card--1">
            <i />
            <b />
            <b />
          </span>

          <span className="ambient-ghost-card ambient-ghost-card--2">
            <i />
            <b />
            <b />
          </span>
        </div>
      )}

      {variant === 'tools' && (
        <div className="ambient-connection" />
      )}

      {variant === 'contact' && (
        <span className="ambient-contact-ring" />
      )}
    </div>
  );
}
