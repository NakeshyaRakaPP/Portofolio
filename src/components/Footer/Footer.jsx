import { socials } from '../../data/socials';

export default function Footer({ compact = false, subpage = false }) {
  const prefix = subpage ? 'index.html' : '';

  return (
    <footer className="site-footer">
      <div className="container">
        {!compact && (
          <>
            <div className="footer-cta reveal in-up" data-delay="0">
              <h3>Let's Build Something Together.</h3>
              <a href={`${prefix}#contact`} className="footer-cta-btn">
                Start a Conversation <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            </div>

            <div className="footer-bottom reveal in-up" data-delay="100">
              <div className="footer-brand">RAKA<span>.</span></div>
              <p className="footer-note">Designing systems, not just screens. Thanks for scrolling this far — see you on the next project.</p>

              <div className="footer-links">
                <a href={`${prefix}#hero-section`}>About</a>
                <a href={`${prefix}#works`}>Projects</a>
                <a href={`${prefix}#contact`}>Contact</a>
              </div>

              <div className="footer-socials">
                {socials.map(item => (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} key={item.label}>
                    <i className={`bi ${item.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        <p className="footer-copyright">© 2026 Nakeshya Raka Putra Priyatna. All rights reserved.</p>
      </div>
    </footer>
  );
}
