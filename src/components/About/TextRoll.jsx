/**
 * TextRoll — 21st.dev-style letter roll hover effect,
 * rewritten CSS-only for this codebase (no motion/Tailwind/shadcn).
 *
 * Each TextRoll is a single unwrappable line: letters roll up on
 * hover with a center-out stagger, revealing an accent-colored copy
 * sliding in from below. Split the headline per visual line so each
 * line animates independently.
 * Pure CSS: zero JS animation, zero new dependencies.
 */
const STAGGER = 0.035;
const NBSP = '\u00A0';

export default function TextRoll({
  children,
  className = '',
  center = true
}) {
  const letters = children.split('');
  const mid = (letters.length - 1) / 2;

  const renderLayer = hidden => (
    <span
      className={
        hidden
          ? 'text-roll-layer text-roll-layer--alt'
          : 'text-roll-layer'
      }
      aria-hidden={hidden || undefined}
    >
      {letters.map((letter, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - mid)
          : STAGGER * i;

        return (
          <span
            key={i}
            className="text-roll-letter"
            style={{
              '--roll-delay': `${delay.toFixed(3)}s`
            }}
          >
            {letter === ' ' ? NBSP : letter}
          </span>
        );
      })}
    </span>
  );

  return (
    <span className={`text-roll${className ? ` ${className}` : ''}`}>
      {renderLayer(false)}
      {renderLayer(true)}
    </span>
  );
}
