import '../../styles/contact-intro.css';

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-intro"
    >
      <div className="contact-intro-inner">

        <div
          className="contact-intro-eyebrow"
          aria-hidden="true"
        >
          <span />
          OPEN CHANNEL
          <span />
        </div>

        <h2 className="contact-intro-title">
          LET&apos;S BUILD A
          <br />
          <span>SYSTEM TOGETHER.</span>
        </h2>

        <div
          className="contact-scroll-cue"
          aria-hidden="true"
        >
          <span className="contact-scroll-label">
            KEEP SCROLLING
          </span>

          <div className="contact-scroll-line">
            <span />
          </div>

          <i className="bi bi-arrow-down" />
        </div>

      </div>
    </section>
  );
}