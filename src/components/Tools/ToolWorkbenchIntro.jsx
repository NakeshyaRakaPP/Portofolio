import { useEffect, useRef } from 'react';
import SceneChrome from '../common/SceneChrome';

const clamp01 = value => Math.max(0, Math.min(1, value));

const smoothstep = (start, end, value) => {
  if (start === end) return value >= end ? 1 : 0;
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const mix = (from, to, progress) =>
  from + (to - from) * progress;

const CLUSTER = [
  [-18, -12, -16],
  [8, -18, 12],
  [-7, 2, -7],
  [18, 6, 15],
  [-12, 14, -11],
  [5, 17, 7],
  [15, -4, -5],
  [-21, 5, 10],
  [3, -7, -3],
  [22, 13, -12],
  [-3, 20, 5]
];

const SCATTER_DESKTOP = [
  [-0.37, -0.29, -7],
  [-0.13, -0.34, 4],
  [0.14, -0.3, -4],
  [0.35, -0.18, 6],
  [0.38, 0.08, -4],
  [0.24, 0.29, 4],
  [0.01, 0.33, -3],
  [-0.24, 0.28, 5],
  [-0.38, 0.07, -5],
  [-0.28, -0.1, 4],
  [0.08, -0.02, -2]
];

const SCATTER_COMPACT = [
  [-0.24, -0.29, -5],
  [0.24, -0.29, 5],
  [-0.2, -0.16, 3],
  [0.2, -0.16, -3],
  [-0.25, -0.02, -4],
  [0.25, -0.02, 4],
  [-0.19, 0.12, 3],
  [0.19, 0.12, -3],
  [-0.24, 0.25, -3],
  [0.24, 0.25, 3],
  [0, 0.34, 0]
];

export default function ToolWorkbenchIntro({
  tools,
  anchorRefs,
  sceneRef
}) {
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const hintRef = useRef(null);
  const railRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;

    if (!wrap || !sticky) return undefined;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let rafId = null;

    const paint = () => {
      rafId = null;

      const rect = wrap.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(
        wrap.offsetHeight - viewportHeight,
        1
      );

      const progress = reduceMotion.matches
        ? 1
        : clamp01(-rect.top / scrollable);

      const compact =
        window.innerWidth <= 767 ||
        window.matchMedia('(pointer: coarse)').matches;

      const width = sticky.clientWidth;
      const height = sticky.clientHeight;
      const contentWidth = Math.min(width * 0.86, 1320);

      const scatterPoints = compact
        ? SCATTER_COMPACT
        : SCATTER_DESKTOP;

      // The unpacking is deliberately slow. After reaching the scattered
      // state, these anchors simply travel with the intro scene. The visible
      // ToolCards are controlled by ToolsSection and use these anchors as
      // their real source positions.
      const spread = smoothstep(0.08, 0.78, progress);

      cardRefs.current.forEach((anchor, index) => {
        if (!anchor) return;

        const cluster = CLUSTER[index] || [0, 0, 0];
        const scatter = scatterPoints[index] || [0, 0, 0];

        const scatterX = scatter[0] * contentWidth;
        const scatterY = scatter[1] * height;

        const x = mix(cluster[0], scatterX, spread);
        const y = mix(cluster[1], scatterY, spread);
        const rotation = mix(cluster[2], scatter[2], spread);
        const scale = mix(
          compact ? 0.72 : 0.78,
          compact ? 0.82 : 1,
          spread
        );

        anchor.style.transform = `
          translate3d(
            calc(-50% + ${x}px),
            calc(-50% + ${y}px),
            0
          )
          rotate(${rotation}deg)
          scale(${scale})
        `;

        // Expose the exact scene coordinates to the single, portaled ToolCard
        // actor layer. This lets the same card travel from stack -> scatter ->
        // grid and reverse on upward scroll without visual cloning.
        anchor.dataset.actorX = String(x);
        anchor.dataset.actorY = String(y);
        anchor.dataset.actorRotation = String(rotation);
        anchor.dataset.actorScale = String(scale);
        anchor.dataset.actorSpread = String(spread);
      });

      const copyIn = smoothstep(0.12, 0.36, progress);

      if (titleRef.current) {
        titleRef.current.style.opacity = String(copyIn);
        titleRef.current.style.transform = `
          translate3d(0, ${mix(22, 0, copyIn)}px, 0)
          scale(${mix(0.9, 1, copyIn)})
        `;
      }

      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = String(copyIn * 0.72);
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = String(
          1 - smoothstep(0.04, 0.2, progress)
        );
      }

      const scattered = progress >= 0.79;
      wrap.classList.toggle('is-scattered', scattered);

      if (railRef.current) {
        railRef.current.style.transform = `scaleX(${progress})`;
      }

      if (progressRef.current) {
        progressRef.current.textContent = `${String(
          Math.round(progress * 100)
        ).padStart(2, '0')}%`;
      }
    };

    const requestPaint = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(paint);
    };

    paint();

    window.addEventListener('scroll', requestPaint, {
      passive: true
    });
    window.addEventListener('resize', requestPaint);
    reduceMotion.addEventListener('change', requestPaint);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', requestPaint);
      window.removeEventListener('resize', requestPaint);
      reduceMotion.removeEventListener('change', requestPaint);
    };
  }, [tools.length]);

  return (
    <div ref={wrapRef} className="workbench-intro" aria-hidden="true">
      <div
        ref={node => {
          stickyRef.current = node;
          if (sceneRef) sceneRef.current = node;
        }}
        className="workbench-intro-sticky"
      >
        <SceneChrome
          index="02"
          label="TOOLKIT"
          meta="WORKBENCH"
        />

        <div className="workbench-intro-grid" />
        <div className="workbench-intro-glow" />

        <div className="workbench-intro-copy">
          <span className="workbench-intro-kicker">
            TOOLS / TECHNOLOGIES
          </span>

          <h2 ref={titleRef} className="workbench-intro-title">
            MY <span>WORKBENCH</span>
          </h2>

          <p ref={subtitleRef} className="workbench-intro-subtitle">
            The stack behind how I design, build, test, and refine systems.
          </p>
        </div>

        <div className="workbench-intro-cards">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              ref={node => {
                cardRefs.current[index] = node;

                if (anchorRefs) {
                  anchorRefs.current[tool.id] = node;
                }
              }}
              className="workbench-intro-card-anchor"
              data-tool-id={tool.id}
            />
          ))}
        </div>

        <div ref={hintRef} className="workbench-intro-hint">
          <span>Scroll to unpack the stack</span>
          <i className="bi bi-arrow-down" />
        </div>

        <div className="workbench-intro-progress">
          <span className="workbench-intro-progress-track">
            <span ref={railRef} />
          </span>
          <span ref={progressRef}>00%</span>
        </div>
      </div>
    </div>
  );
}
