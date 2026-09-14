import { useRef, useState } from 'react';
import { assets } from '../../data/assets';

const ROLES = [
  'SYSTEM ANALYST',
  'UI/UX ENGINEER',
  'VISUAL ARCHITECT',
  'LOGIC & ALGORITHMS',
  'CREATIVE TECHNOLOGIST'
];

function SlideToWork() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const draggingRef = useRef(false);

  const clamp = value => Math.min(Math.max(value, 0), 1);

  const updateFromPointer = clientX => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const knob = track.querySelector('.hero-slide-knob');
    const knobWidth = knob?.offsetWidth ?? 52;
    const travel = Math.max(rect.width - knobWidth - 12, 1);
    const x = clamp((clientX - rect.left - knobWidth / 2 - 6) / travel);
    setProgress(x);
  };

  const complete = () => {
    setProgress(1);
    window.setTimeout(() => {
      document.getElementById('works')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      window.setTimeout(() => setProgress(0), 650);
    }, 140);
  };

  const handlePointerDown = event => {
    if (event.button !== 0) return;
    draggingRef.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromPointer(event.clientX);
  };

  const handlePointerMove = event => {
    if (!draggingRef.current) return;
    updateFromPointer(event.clientX);
  };

  const handlePointerUp = event => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (progress >= 0.82) complete();
    else setProgress(0);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      complete();
    }
  };

  return (
    <div
      ref={trackRef}
      className="hero-slide-cta"
      style={{ '--slide-progress': progress }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        draggingRef.current = false;
        setProgress(0);
      }}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Slide to see my work"
    >
      <span className="hero-slide-label">SLIDE TO SEE MY WORK</span>
      <span className="hero-slide-line" aria-hidden="true" />
      <span className="hero-slide-knob" aria-hidden="true">
        <i className="bi bi-arrow-right" />
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <header id="hero-section" className="hero-system">
      <div
        className="hero-bg-layer"
        data-parallax="0.012"
        data-parallax-scroll="0.04"
        aria-hidden="true"
      />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-system-shell">
        <div className="hero-entry-meta reveal in-left" data-delay="90">
          <span>// ENTRY POINT</span>
          <b>RAKA / 2026</b>
        </div>

        <div className="hero-kicker reveal in-left" data-delay="130">
          <span>IDEAS</span><i>/</i><span>SYSTEMS</span><i>/</i><span>BETTER TOMORROW</span>
        </div>

        <div className="hero-title-wrap" data-parallax="0.022" data-parallax-scroll="0.1">
          <h1 className="hero-title-big reveal in-zoom" data-delay="0">
            <span className="hero-title-solid">SYSTEM</span>
            <span className="hero-title-outline">THINKER</span>
          </h1>
        </div>

        <div className="hero-copy reveal in-left" data-delay="460">
          <p>
            I design systems, craft experiences, and turn ideas into meaningful digital solutions.
          </p>

          <SlideToWork />

          <a className="hero-cv-link" href="./cv-raka.pdf" download>
            <span>DOWNLOAD CV</span>
            <i className="bi bi-arrow-down-right" aria-hidden="true" />
          </a>
        </div>

        <div className="hero-profile-zone reveal in-up" data-delay="160">
          <div className="hero-photo-frame" aria-hidden="true" />
          <img
            src={assets.heroProfile}
            alt="Raka Profile"
            className="hero-profile-img"
            fetchPriority="high"
            data-parallax="0.055"
            data-parallax-scroll="0.24"
          />
        </div>

        <div className="hero-identity-tag reveal in-left" data-delay="560">
          <span>RAKA_01</span>
          <strong>Nakeshya Raka Putra Priyatna</strong>
          <small>Visual System Architect &amp; UI/UX Engineer</small>
        </div>

        <div className="status-badge hero-status reveal in-right" data-delay="620">
          <span className="status-dot" />
          <span>Available for work</span>
        </div>

        <div className="hero-process" aria-hidden="true">
          <div><b>01</b><span>THINK</span></div>
          <div><b>02</b><span>DESIGN</span></div>
          <div><b>03</b><span>BUILD</span></div>
        </div>

        <div className="hero-coordinate hero-coordinate-a" aria-hidden="true">A / 01</div>
        <div className="hero-coordinate hero-coordinate-b" aria-hidden="true">B / 04</div>
      </div>

      <div className="marquee-wrapper" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(group => (
            <div className="marquee-group" key={group}>
              {ROLES.map(role => (
                <span className="hero-marquee-pair" key={`${group}-${role}`}>
                  <span>{role}</span>
                  <span className="marquee-dot">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
