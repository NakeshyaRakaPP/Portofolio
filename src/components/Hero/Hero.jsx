import { assets } from '../../data/assets';

export default function Hero() {
  return (
    <header id="hero-section">
      <div className="hero-bg-layer" data-parallax="0.015" data-parallax-scroll="0.06" />

      <h1 className="hero-title-big reveal in-zoom" data-delay="0" data-parallax="0.03" data-parallax-scroll="0.16">
        SYSTEM THINKER
      </h1>

      <div className="hero-side-info left-info" data-parallax="0" data-parallax-scroll="0.45">
        <div className="status-badge mb-3 reveal in-left" data-delay="800">
          <span className="status-dot" /> Available for work
        </div>

        <div className="reveal in-left hero-identity-block" data-delay="1000">
          <h2 className="hero-name-big">Hi, I'm <span className="name-underline">Nakeshya Raka <br /> Putra Priyatna</span></h2>
          <p className="hero-role-small">A Visual System Architect & UI/UX Engineer.</p>
        </div>

        <div className="hero-cta-group reveal in-left" data-delay="1100">
          <a href="#works" className="btn btn-hero-primary">View Projects</a>
          <a href="./cv-raka.pdf" className="btn btn-hero-outline" download>Download CV</a>
          <a href="#contact" className="btn btn-hero-outline">Contact Me</a>
        </div>
      </div>

      <div className="hero-side-info right-info" data-parallax="0" data-parallax-scroll="0.75">
        <div className="reveal in-right" data-delay="1000">
          <p className="hero-desc-long">
            I Bridge <strong>Creative Aesthetics</strong> With <strong>Technical Logic</strong>, Utilizing{' '}
            <strong>System Thinking</strong> To Architect <strong>User Experiences</strong>. My Expertise{' '}
            Is Building <strong>Scalable Design Systems</strong> And <strong>Modular UI Components</strong>{' '}
            That Align Directly With <strong>Back-End Structures And Data Logic</strong>, Ensuring{' '}
            Maximum Efficiency And Long-Term Maintainability.
          </p>
        </div>
      </div>

      <div className="reveal in-up hero-profile-wrapper" data-delay="200">
        <img
          src={assets.heroProfile}
          alt="Raka Profile"
          className="hero-profile-img"
          fetchPriority="high"
          data-parallax="0.08"
          data-parallax-scroll="0.38"
        />
      </div>

      <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">

              <div className="marquee-group">
                  <span>CREATIVE TECHNOLOGIST</span>
                  <span className="marquee-dot">•</span>
                  <span>SYSTEM ANALYST</span>
                  <span className="marquee-dot">•</span>
                  <span>UI/UX ENGINEER</span>
                  <span className="marquee-dot">•</span>
                  <span>VISUAL ARCHITECT</span>
                  <span className="marquee-dot">•</span>
                  <span>LOGIC &amp; ALGORITHMS</span>
                  <span className="marquee-dot">•</span>
              </div>

              <div className="marquee-group" aria-hidden="true">
                  <span>CREATIVE TECHNOLOGIST</span>
                  <span className="marquee-dot">•</span>
                  <span>SYSTEM ANALYST</span>
                  <span className="marquee-dot">•</span>
                  <span>UI/UX ENGINEER</span>
                  <span className="marquee-dot">•</span>
                  <span>VISUAL ARCHITECT</span>
                  <span className="marquee-dot">•</span>
                  <span>LOGIC &amp; ALGORITHMS</span>
                  <span className="marquee-dot">•</span>
              </div>

          </div>
      </div>
    </header>
  );
}
