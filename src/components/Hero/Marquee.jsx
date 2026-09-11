const MARQUEE_TEXT = 'CREATIVE TECHNOLOGIST  •  SYSTEM ANALYST  •  UI/UX ENGINEER  •  VISUAL ARCHITECT  •  LOGIC & ALGORITHMS     ';

export default function Marquee() {
  return (
    <div className="marquee-wrapper" aria-label="Creative technologist, system analyst, UI UX engineer, visual architect, logic and algorithms">
      <div className="marquee-content" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <span key={index}>{MARQUEE_TEXT}</span>)}
      </div>
    </div>
  );
}
