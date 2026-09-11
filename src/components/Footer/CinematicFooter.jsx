import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials } from '../../data/socials';
import '../../styles/cinematic-footer.css';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  'SYSTEM THINKING',
  'UI/UX ENGINEERING',
  'SYSTEM ANALYSIS',
  'VISUAL DESIGN',
  'WEB DEVELOPMENT',
  'CREATIVE TECHNOLOGY'
];

function MagneticAction({
  as: Component = 'a',
  className = '',
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (!finePointer.matches || reducedMotion.matches) {
      return undefined;
    }

    const move = event => {
      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      gsap.to(element, {
        x: x * 0.22,
        y: y * 0.22,
        rotateX: -y * 0.06,
        rotateY: x * 0.06,
        scale: 1.035,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true
      });
    };

    const leave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.75,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true
      });
    };

    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);

    return () => {
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);

      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <Component
      ref={ref}
      className={`cinematic-footer-pill ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

function MarqueeGroup() {
  return (
    <div className="cinematic-footer-marquee-group">
      {MARQUEE_ITEMS.map(item => (
        <span
          className="cinematic-footer-marquee-item"
          key={item}
        >
          <span>{item}</span>
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  );
}

export default function CinematicFooter() {
  const shellRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const copyRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;

    if (!shell) return undefined;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const targets = [
      headingRef.current,
      copyRef.current,
      linksRef.current,
      bottomRef.current
    ].filter(Boolean);

    if (reducedMotion.matches) {
      gsap.set(
        [giantTextRef.current, ...targets].filter(Boolean),
        {
          clearProps: 'all'
        }
      );

      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        {
          y: 90,
          scale: 0.9,
          opacity: 0.05
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: shell,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.1
          }
        }
      );

      gsap.fromTo(
        headingRef.current,
        {
          y: 56,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: shell,
            start: 'top 72%',
            end: 'top 30%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo(
        copyRef.current,
        {
          y: 38,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: shell,
            start: 'top 64%',
            end: 'top 25%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo(
        linksRef.current,
        {
          y: 42,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: shell,
            start: 'top 56%',
            end: 'top 17%',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo(
        bottomRef.current,
        {
          y: 26,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: shell,
            start: 'top 44%',
            end: 'top 8%',
            scrub: 0.7
          }
        }
      );
    }, shell);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      ref={shellRef}
      className="cinematic-footer-shell"
    >
      <footer
        className="cinematic-footer"
        aria-label="Site footer"
      >
        <div
          className="cinematic-footer-aurora"
          aria-hidden="true"
        />

        <div
          className="cinematic-footer-grid"
          aria-hidden="true"
        />

        <div
          className="cinematic-footer-giant-wrap"
          aria-hidden="true"
        >
          <div
            ref={giantTextRef}
            className="cinematic-footer-giant"
          >
            RAKA.
          </div>
        </div>

        <div
          className="cinematic-footer-marquee-wrap"
          aria-hidden="true"
        >
          <div className="cinematic-footer-marquee-track">
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>

        <div className="cinematic-footer-center">
          <p className="cinematic-footer-kicker">
            // END OF SYSTEM
          </p>

          <h2
            ref={headingRef}
            className="cinematic-footer-heading"
          >
            YOU&apos;VE REACHED
            <br />
            <span>THE END.</span>
          </h2>

          <p
            ref={copyRef}
            className="cinematic-footer-copy"
          >
            Thanks for exploring the system.
            <br />
            The next one could be yours.
          </p>

          <div
            ref={linksRef}
            className="cinematic-footer-actions"
          >
            <div className="cinematic-footer-actions-primary">
              <MagneticAction href="#about">
                <span>About</span>
                <i
                  className="bi bi-arrow-up-right"
                  aria-hidden="true"
                />
              </MagneticAction>

              <MagneticAction href="#works">
                <span>Projects</span>
                <i
                  className="bi bi-arrow-up-right"
                  aria-hidden="true"
                />
              </MagneticAction>
            </div>

            <div className="cinematic-footer-actions-social">
              {socials.map(item => (
                <MagneticAction
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="cinematic-footer-pill--social"
                >
                  <i
                    className={`bi ${item.icon}`}
                    aria-hidden="true"
                  />

                  <span>{item.label}</span>
                </MagneticAction>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={bottomRef}
          className="cinematic-footer-bottom"
        >
          <div className="cinematic-footer-copyright">
            © 2026 Nakeshya Raka Putra Priyatna
          </div>

          <div className="cinematic-footer-signature">
            <span>DESIGNING SYSTEMS</span>
            <i aria-hidden="true" />
            <span>NOT JUST SCREENS</span>
          </div>

          <MagneticAction
            as="button"
            type="button"
            onClick={scrollToTop}
            className="cinematic-footer-top"
            aria-label="Back to top"
          >
            <i
              className="bi bi-arrow-up"
              aria-hidden="true"
            />
          </MagneticAction>
        </div>
      </footer>
    </div>
  );
}
