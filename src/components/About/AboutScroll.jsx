import { useEffect, useRef } from 'react';
import SceneChrome from '../common/SceneChrome';
import TextRoll from '../common/TextRoll';
import Magnetic from '../common/Magnetic';
import '../../styles/about-scroll.css';

const ABOUT_STEPS = [
  {
    number: '01',
    tag: 'ORIGIN',
    title: 'CURIOSITY',
    text: 'It started with a strange habit: taking systems apart to see why they work — a checkout flow, campus bureaucracy, a strategy game. I was always more interested in the why than the how-to.'
  },
  {
    number: '02',
    tag: 'METHOD',
    title: 'LOGIC FIRST',
    text: 'Before touching color or layout, I map the problem: who are the users, what data flows, what decisions happen at each point. A design should be sound in logic before it looks beautiful.'
  },
  {
    number: '03',
    tag: 'NOW',
    title: 'SHIPPING',
    text: 'SIM student and IT Developer intern at Telkom, turning that thinking into working products — from a multi-location POS to data-warehouse reporting.',
    cta: { href: '#works', label: 'See the systems' }
  }
];

const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

/* Overshoot spring — the NativeWind-style bouncy entrance.
   Peaks ~10% past the target, then settles back. */
const easeOutBack = value => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
};
const easeInCubic = value => value * value * value;

export default function AboutScroll() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const stepElements = Array.from(
      section.querySelectorAll('[data-about-step]')
    );

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const mobileQuery = window.matchMedia('(max-width: 767px)');

    let rafId = null;
    let isStatic = false;

    const resetSteps = () => {
      stepElements.forEach(step => {
        step.style.removeProperty('--step-y');
        step.style.removeProperty('--step-opacity');
        step.style.removeProperty('--step-scale');
        step.classList.remove('is-current');
      });

      section.style.removeProperty('--about-progress');
    };

    const updateScrollStory = () => {
      rafId = null;

      if (reducedMotionQuery.matches || mobileQuery.matches) {
        if (!isStatic) {
          isStatic = true;
          resetSteps();
        }

        return;
      }

      isStatic = false;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDistance = Math.max(
        section.offsetHeight - viewportHeight,
        1
      );

      const travelled = clamp(
        -rect.top,
        0,
        scrollDistance
      );

      const progress = clamp(travelled / scrollDistance);

      section.style.setProperty(
        '--about-progress',
        progress.toFixed(4)
      );

      stepElements.forEach((step, index) => {
        /*
         * Satu step mendapat satu "chapter" sendiri.
         * Tidak ada overlap antar step.
         * Masing-masing: masuk -> tahan -> keluar.
         */
        const storyStart = 0.06;
        const storyEnd = 0.96;
        const chapterLength = (storyEnd - storyStart) / stepElements.length;
        const chapterStart = storyStart + (index * chapterLength);
        const localProgress = clamp(
          (progress - chapterStart) / chapterLength
        );

        let y = 42;
        let opacity = 0;
        let scale = 0.97;

        /* 0% - 22% : masuk dari bawah, dengan overshoot spring */
        if (localProgress < 0.22) {
          const phase = easeOutBack(localProgress / 0.22);
          y = 42 * (1 - phase);
          opacity = Math.min(phase, 1);
          scale = 0.97 + (0.03 * Math.min(phase, 1));
        }
        /* 22% - 78% : benar-benar stay */
        else if (localProgress <= 0.78) {
          y = 0;
          opacity = 1;
          scale = 1;
        }
        /* 78% - 100% : keluar ke atas */
        else {
          const phase = easeInCubic(
            (localProgress - 0.78) / 0.22
          );
          y = -34 * phase;
          opacity = 1 - phase;
          scale = 1 - (0.02 * phase);
        }

        step.style.setProperty('--step-y', `${y}vh`);
        step.style.setProperty(
          '--step-opacity',
          opacity.toFixed(3)
        );
        step.style.setProperty(
          '--step-scale',
          scale.toFixed(4)
        );

        step.classList.toggle(
          'is-current',
          localProgress >= 0.18 && localProgress <= 0.82
        );
      });
    };

    const requestUpdate = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(
        updateScrollStory
      );
    };

    const handleModeChange = () => {
      resetSteps();
      requestUpdate();
    };

    window.addEventListener('scroll', requestUpdate, {
      passive: true
    });

    window.addEventListener('resize', requestUpdate);

    reducedMotionQuery.addEventListener(
      'change',
      handleModeChange
    );

    mobileQuery.addEventListener(
      'change',
      handleModeChange
    );

    updateScrollStory();

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener(
        'scroll',
        requestUpdate
      );

      window.removeEventListener(
        'resize',
        requestUpdate
      );

      reducedMotionQuery.removeEventListener(
        'change',
        handleModeChange
      );

      mobileQuery.removeEventListener(
        'change',
        handleModeChange
      );
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-scroll-story"
      aria-labelledby="about-scroll-title"
    >
      <div className="about-scroll-sticky">

        <SceneChrome
          index="01"
          label="ABOUT / PROCESS"
          meta="SYSTEM THINKING"
        />

        <div className="container about-scroll-container">
          <div className="about-scroll-intro">
            <div className="about-scroll-eyebrow">
              // ABOUT ME
            </div>

            <h2
              id="about-scroll-title"
              className="about-scroll-title"
            >
              <TextRoll>I design</TextRoll>
              <br />
              <TextRoll>systems,</TextRoll>
              <br />
              <TextRoll className="text-roll--muted">not just</TextRoll>
              <br />
              <TextRoll className="text-roll--muted">screens.</TextRoll>
            </h2>

            <p className="about-scroll-copy">
              I combine visual thinking, UI/UX, and
              technical logic to turn complex problems
              into structured digital experiences.
            </p>

            <div
              className="about-scroll-hint"
              aria-hidden="true"
            >
              <span className="about-scroll-hint-line" />
              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>

          <div
            className="about-scroll-stage"
            aria-label="My working process"
          >
            <div
              className="about-scroll-blueprint"
              aria-hidden="true"
            >
              <span className="about-scroll-blueprint-tag">
                [ FIG. 01 — SYSTEM ]
              </span>
              <span className="about-scroll-blueprint-cross tl" />
              <span className="about-scroll-blueprint-cross tr" />
              <span className="about-scroll-blueprint-cross bl" />
              <span className="about-scroll-blueprint-cross br" />
            </div>

            <div
              className="about-scroll-stage-line"
              aria-hidden="true"
            />

            {ABOUT_STEPS.map((step, index) => (
              <article
                key={step.number}
                className="about-scroll-step"
                data-about-step
                style={{ '--step-index': index }}
              >
                <div
                  className="about-scroll-step-number"
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                <div className="about-scroll-step-content">
                  <div className="about-scroll-step-kicker">
                    <span className="about-scroll-step-index">
                      [{step.number}]
                    </span>
                    <span className="about-scroll-step-dash" />
                    <span>{step.tag}</span>
                  </div>

                  <h3><TextRoll className="text-roll-step-title">{step.title}</TextRoll></h3>
                  <p>{step.text}</p>

                  {step.cta && (
                    <Magnetic
                      href={step.cta.href}
                      className="about-scroll-step-cta"
                    >
                      {step.cta.label}
                      <i className="bi bi-arrow-down-right" aria-hidden="true" />
                    </Magnetic>
                  )}
                </div>
              </article>
            ))}

            <div
              className="about-scroll-progress"
              aria-hidden="true"
            >
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
