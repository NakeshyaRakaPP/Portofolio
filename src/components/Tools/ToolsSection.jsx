import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ToolCard from './ToolCard';
import ToolDropzone from './ToolDropzone';
import ToolWorkbenchIntro from './ToolWorkbenchIntro';
import { tools } from '../../data/tools';

const clamp01 = value => Math.max(0, Math.min(1, value));

const smoothstep = (start, end, value) => {
  if (start === end) return value >= end ? 1 : 0;
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const mix = (from, to, progress) =>
  from + (to - from) * progress;

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState(null);
  const [draggingTool, setDraggingTool] = useState(null);
  const [assemblyReady, setAssemblyReady] = useState(false);

  const sectionRef = useRef(null);
  const liveShellRef = useRef(null);
  const playgroundRef = useRef(null);
  const dropzoneRef = useRef(null);
  const introSceneRef = useRef(null);
  const introAnchorRefs = useRef({});
  const slotRefs = useRef({});
  const actorRefs = useRef({});
  const cardRefs = useRef({});
  const ghostRef = useRef(null);
  const fakeCursorRef = useRef(null);
  const activeToolRef = useRef(null);
  const readyRef = useRef(false);
  const layoutRequestRef = useRef(null);

  const dragOffsetRef = useRef({
    x: 0,
    y: 0
  });

  const demoRunRef = useRef(false);

  useEffect(() => {
    activeToolRef.current = activeTool;
    layoutRequestRef.current?.();
  }, [activeTool]);

  function getToolById(id) {
    return tools.find(tool => tool.id === id);
  }

  function getDropzoneRect() {
    return dropzoneRef.current?.getBoundingClientRect();
  }

  function isPointerInsideDropzone(clientX, clientY) {
    const rect = getDropzoneRect();

    if (!rect) return false;

    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  function removeGhost() {
    if (ghostRef.current) {
      ghostRef.current.remove();
      ghostRef.current = null;
    }
  }

  function createDragGhost(toolId, pointerX, pointerY) {
    const sourceCard = cardRefs.current[toolId];

    if (!sourceCard) return;

    const rect = sourceCard.getBoundingClientRect();

    dragOffsetRef.current = {
      x: pointerX - rect.left,
      y: pointerY - rect.top
    };

    const clone = sourceCard.cloneNode(true);

    clone.classList.add('tool-drag-ghost');
    clone.classList.remove('is-active');

    Object.assign(clone.style, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: '0',
      pointerEvents: 'none',
      zIndex: '9999'
    });

    document.body.appendChild(clone);

    ghostRef.current = clone;

    moveDragGhost(pointerX, pointerY);
  }

  function moveDragGhost(pointerX, pointerY) {
    const ghost = ghostRef.current;

    if (!ghost) return;

    const offset = dragOffsetRef.current;

    const x = pointerX - offset.x;
    const y = pointerY - offset.y;

    ghost.style.transform = `
      translate3d(${x}px, ${y}px, 0)
      scale(1.03)
    `;
  }

  function flyCardToDropzone(toolId) {
    if (!assemblyReady) return;

    const sourceCard = cardRefs.current[toolId];
    const dropzone = dropzoneRef.current;

    if (!sourceCard || !dropzone) {
      setActiveTool(toolId);
      return;
    }

    const startRect = sourceCard.getBoundingClientRect();
    const endRect = dropzone.getBoundingClientRect();

    const clone = sourceCard.cloneNode(true);

    clone.classList.add('tool-flight-clone');

    Object.assign(clone.style, {
      position: 'fixed',
      left: `${startRect.left}px`,
      top: `${startRect.top}px`,
      width: `${startRect.width}px`,
      height: `${startRect.height}px`,
      margin: '0',
      pointerEvents: 'none',
      zIndex: '9998'
    });

    document.body.appendChild(clone);

    const targetX =
      endRect.left +
      endRect.width / 2 -
      startRect.width / 2;

    const targetY =
      endRect.top +
      endRect.height / 2 -
      startRect.height / 2;

    const dx = targetX - startRect.left;
    const dy = targetY - startRect.top;

    requestAnimationFrame(() => {
      clone.style.transform = `
        translate3d(${dx}px, ${dy}px, 0)
        scale(.88)
      `;

      clone.style.opacity = '0.25';
    });

    window.setTimeout(() => {
      clone.remove();
      setActiveTool(toolId);
    }, 520);
  }

  function handleToolClick(toolId) {
    if (!assemblyReady || draggingTool) return;

    if (activeTool === toolId) return;

    flyCardToDropzone(toolId);
  }

  function handleDragStart(toolId, event) {
    if (!assemblyReady) return;

    if (
      !window.matchMedia(
        '(hover: hover) and (pointer: fine)'
      ).matches
    ) {
      return;
    }

    if (event.button !== 0) return;

    setDraggingTool(toolId);

    createDragGhost(
      toolId,
      event.clientX,
      event.clientY
    );

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  function handleDragMove(event) {
    if (!assemblyReady || !draggingTool) return;

    moveDragGhost(
      event.clientX,
      event.clientY
    );

    const inside = isPointerInsideDropzone(
      event.clientX,
      event.clientY
    );

    dropzoneRef.current?.classList.toggle(
      'is-hovered',
      inside
    );
  }

  function handleDragEnd(event) {
    if (!draggingTool) return;

    const toolId = draggingTool;

    const dropped =
      assemblyReady &&
      isPointerInsideDropzone(
        event.clientX,
        event.clientY
      );

    dropzoneRef.current?.classList.remove(
      'is-hovered'
    );

    removeGhost();

    setDraggingTool(null);

    if (dropped) {
      setActiveTool(toolId);
    }
  }

  useEffect(() => {
    return () => {
      removeGhost();
    };
  }, []);

  // -----------------------------------------------------------------------
  // ONE REAL TOOLCARD, TWO LAYOUT STATES
  // -----------------------------------------------------------------------
  // Every visible tool is a single portaled ToolCard. During the intro it
  // follows its scattered anchor. Near the live workbench it interpolates to
  // the matching grid slot. Scrolling upward simply reverses the same math.
  // Only the fully docked state enables pointer interaction.
  useEffect(() => {
    const section = sectionRef.current;
    const liveShell = liveShellRef.current;

    if (!section || !liveShell) return undefined;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let rafId = null;

    const setReady = nextReady => {
      if (readyRef.current === nextReady) return;

      const wasReady = readyRef.current;
      readyRef.current = nextReady;
      setAssemblyReady(nextReady);

      liveShell.classList.toggle('is-docked', nextReady);

      if (wasReady && !nextReady) {
        removeGhost();
        setDraggingTool(null);
        setActiveTool(null);
      }
    };

    const paintActors = () => {
      rafId = null;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const sectionRect = section.getBoundingClientRect();
      const shellRect = liveShell.getBoundingClientRect();
      const scene = introSceneRef.current;
      const sceneRect = scene?.getBoundingClientRect();

      const inSectionRange =
        sectionRect.bottom > -120 &&
        sectionRect.top < viewportHeight + 120;

      // Docking begins only as the interactive workbench approaches.
      // This leaves a genuine free-scroll gap after the scattered intro.
      const bridgeStart = viewportHeight * 0.96;
      const bridgeEnd = viewportHeight * 0.28;

      const bridge = reduceMotion.matches
        ? 1
        : clamp01(
            (bridgeStart - shellRect.top) /
              Math.max(bridgeStart - bridgeEnd, 1)
          );

      const dropProgress = smoothstep(0.7, 0.96, bridge);
      const liveCopyProgress = smoothstep(0.48, 0.86, bridge);

      liveShell.style.setProperty(
        '--workbench-dock-progress',
        bridge.toFixed(4)
      );
      liveShell.style.setProperty(
        '--workbench-live-copy',
        liveCopyProgress.toFixed(4)
      );
      liveShell.style.setProperty(
        '--workbench-live-y',
        `${mix(18, 0, liveCopyProgress)}px`
      );

      if (dropzoneRef.current) {
        dropzoneRef.current.style.opacity = String(dropProgress);
        dropzoneRef.current.style.transform = `
          translateY(${mix(18, 0, dropProgress)}px)
          scale(${mix(0.975, 1, dropProgress)})
        `;
        dropzoneRef.current.style.pointerEvents =
          bridge >= 0.995 ? 'auto' : 'none';
      }

      tools.forEach((tool, index) => {
        const actor = actorRefs.current[tool.id];
        const anchor = introAnchorRefs.current[tool.id];
        const target = slotRefs.current[tool.id];

        if (!actor || !target) return;

        const targetRect = target.getBoundingClientRect();

        const sourceX = Number(anchor?.dataset.actorX || 0);
        const sourceY = Number(anchor?.dataset.actorY || 0);
        const sourceRotation = Number(
          anchor?.dataset.actorRotation || 0
        );
        const sourceScale = Number(
          anchor?.dataset.actorScale || 1
        );
        const spread = Number(
          anchor?.dataset.actorSpread || 0
        );

        const sourceBaseWidth =
          anchor?.offsetWidth || targetRect.width;
        const sourceBaseHeight =
          anchor?.offsetHeight || targetRect.height;

        const sourceCenterX = sceneRect
          ? sceneRect.left + sceneRect.width / 2 + sourceX
          : targetRect.left + targetRect.width / 2;

        const sourceCenterY = sceneRect
          ? sceneRect.top + sceneRect.height / 2 + sourceY
          : -120 - index * 10;

        const sourceWidth = sourceBaseWidth * sourceScale;
        const sourceHeight = sourceBaseHeight * sourceScale;

        const targetCenterX =
          targetRect.left + targetRect.width / 2;
        const targetCenterY =
          targetRect.top + targetRect.height / 2;

        // Stagger is encoded in scroll space rather than timers, so the
        // sequence is perfectly reversible when the user scrolls upward.
        const staggerStart = index * 0.032;
        const staggerEnd = 0.62 + index * 0.032;
        const localDock = reduceMotion.matches
          ? 1
          : smoothstep(staggerStart, staggerEnd, bridge);

        const centerX = mix(
          sourceCenterX,
          targetCenterX,
          localDock
        );
        const centerY = mix(
          sourceCenterY,
          targetCenterY,
          localDock
        );
        const width = mix(
          sourceWidth,
          targetRect.width,
          localDock
        );
        const height = mix(
          sourceHeight,
          targetRect.height,
          localDock
        );
        const rotation = mix(
          sourceRotation,
          0,
          localDock
        );

        const selected =
          activeToolRef.current === tool.id &&
          bridge >= 0.995;

        actor.style.visibility =
          inSectionRange ? 'visible' : 'hidden';
        actor.style.left = `${centerX}px`;
        actor.style.top = `${centerY}px`;
        actor.style.width = `${Math.max(width, 1)}px`;
        actor.style.height = `${Math.max(height, 1)}px`;
        actor.style.transform = `
          translate3d(-50%, -50%, 0)
          rotate(${rotation}deg)
        `;
        actor.style.opacity = selected ? '0' : '1';
        actor.style.pointerEvents =
          bridge >= 0.995 && !selected
            ? 'auto'
            : 'none';

        actor.classList.toggle(
          'is-floating',
          spread >= 0.985 && bridge <= 0.02
        );
        actor.classList.toggle(
          'is-docked',
          localDock >= 0.999 && bridge >= 0.995
        );
      });

      setReady(bridge >= 0.995);
    };

    const requestPaint = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(paintActors);
    };

    layoutRequestRef.current = requestPaint;

    requestPaint();

    window.addEventListener('scroll', requestPaint, {
      passive: true
    });
    window.addEventListener('resize', requestPaint);
    reduceMotion.addEventListener('change', requestPaint);

    return () => {
      layoutRequestRef.current = null;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', requestPaint);
      window.removeEventListener('resize', requestPaint);
      reduceMotion.removeEventListener('change', requestPaint);
    };
  }, []);

  useEffect(() => {
    const playground = playgroundRef.current;
    const fakeCursor = fakeCursorRef.current;

    if (!assemblyReady) return undefined;

    if (!playground || !fakeCursor) return undefined;

    if (
      !window.matchMedia(
        '(hover: hover) and (pointer: fine)'
      ).matches
    ) {
      return undefined;
    }

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return undefined;
    }

    if (demoRunRef.current) return undefined;

    let cancelled = false;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (!entry.isIntersecting) return;

        observer.disconnect();

        demoRunRef.current = true;

        runDemoSequence();
      },
      {
        threshold: 0.4
      }
    );

    observer.observe(playground);

    async function runDemoSequence() {
      const firstTool = tools[0];

      if (!firstTool) return;

      const sourceCard =
        cardRefs.current[firstTool.id];

      const dropzone =
        dropzoneRef.current;

      if (!sourceCard || !dropzone) return;

      const TOTAL_DEMOS = 5;

      for (
        let index = 0;
        index < TOTAL_DEMOS;
        index++
      ) {
        if (cancelled || !readyRef.current) return;

        await runSingleDemo(
          sourceCard,
          dropzone,
          fakeCursor
        );

        if (index < TOTAL_DEMOS - 1) {
          await wait(700);
        }
      }
    }

    function wait(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    }

    function runSingleDemo(
      sourceCard,
      dropzone,
      cursor
    ) {
      return new Promise(resolve => {
        const cardRect =
          sourceCard.getBoundingClientRect();

        const dropRect =
          dropzone.getBoundingClientRect();

        const startX =
          cardRect.left +
          cardRect.width * 0.72;

        const startY =
          cardRect.top +
          cardRect.height * 0.62;

        const endX =
          dropRect.left +
          dropRect.width * 0.5;

        const endY =
          dropRect.top +
          dropRect.height * 0.5;

        cursor.style.transition = 'none';

        cursor.style.transform = `
          translate3d(
            ${startX}px,
            ${startY}px,
            0
          )
        `;

        cursor.classList.add('is-visible');

        // Cursor "lands" on Figma first, so the source card should
        // visibly react before the pointer starts travelling.
        window.setTimeout(() => {
          if (!readyRef.current) {
            cursor.classList.remove('is-visible');
            resolve();
            return;
          }

          sourceCard.classList.add('is-demo-hovered');
        }, 100);

        // Leave the source card, then travel toward the dropzone.
        window.setTimeout(() => {
          if (!readyRef.current) {
            sourceCard.classList.remove('is-demo-hovered');
            cursor.classList.remove('is-visible');
            resolve();
            return;
          }

          sourceCard.classList.remove('is-demo-hovered');

          cursor.style.transition = `
            transform 1.1s
            cubic-bezier(.22, 1, .36, 1)
          `;

          cursor.style.transform = `
            translate3d(
              ${endX}px,
              ${endY}px,
              0
            )
          `;

          // The dropzone only reacts once the cursor has actually arrived.
          window.setTimeout(() => {
            if (!readyRef.current) {
              cursor.classList.remove('is-visible');
              resolve();
              return;
            }

            dropzone.classList.add('is-hovered');

            window.setTimeout(() => {
              dropzone.classList.remove('is-hovered');
              cursor.classList.remove('is-visible');
              resolve();
            }, 700);
          }, 1100);
        }, 650);
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [assemblyReady]);

  const renderTargetSlot = tool => (
    <div
      key={tool.id}
      ref={element => {
        slotRefs.current[tool.id] = element;
      }}
      className={[
        'tool-card-slot',
        'tool-card-target-slot',
        activeTool === tool.id ? 'is-empty' : ''
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    />
  );

  return (
    <section
      id="skills"
      className="skills-section scene-section scene-tools"
      ref={sectionRef}
    >
      <ToolWorkbenchIntro
        tools={tools}
        anchorRefs={introAnchorRefs}
        sceneRef={introSceneRef}
      />

      <div ref={liveShellRef} className="tools-live-shell">
        <div className="container">
          <div className="tools-live-intro">
            <div>
              <span className="tools-live-state">
                Interactive mode
              </span>

              <h2 className="tools-live-title">
                THE BENCH <span>IS LIVE.</span>
              </h2>
            </div>

            <p className="tools-live-copy">
              The stack is assembled. Pick a tool — or drag it into the
              workbench — to inspect how it fits into my workflow.
            </p>
          </div>

          <div
            ref={playgroundRef}
            className="tools-playground"
          >
            <div className="tools-layout">
              <div className="tools-top-row">
                {tools.slice(0, 7).map(renderTargetSlot)}
              </div>

              <div className="tools-bottom-layout">
                <div className="tools-side tools-side-left">
                  {tools.slice(7, 9).map(renderTargetSlot)}
                </div>

                <ToolDropzone
                  ref={dropzoneRef}
                  tool={getToolById(activeTool)}
                  onReturn={() => setActiveTool(null)}
                />

                <div className="tools-side tools-side-right">
                  {tools.slice(9, 11).map(renderTargetSlot)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className="workbench-tool-actor-layer"
            aria-hidden={assemblyReady ? undefined : 'true'}
          >
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                ref={element => {
                  actorRefs.current[tool.id] = element;
                }}
                className="workbench-tool-actor"
                style={{
                  '--float-delay': `${index * -0.18}s`
                }}
              >
                <div className="workbench-tool-actor-float">
                  <ToolCard
                    ref={element => {
                      cardRefs.current[tool.id] = element;
                    }}
                    tool={tool}
                    isActive={false}
                    isDragging={draggingTool === tool.id}
                    interactive={assemblyReady}
                    onClick={() => handleToolClick(tool.id)}
                    onPointerDown={event =>
                      handleDragStart(tool.id, event)
                    }
                    onPointerMove={handleDragMove}
                    onPointerUp={handleDragEnd}
                    onPointerCancel={handleDragEnd}
                  />
                </div>
              </div>
            ))}
          </div>,
          document.body
        )}

      {/* Fake cursor stays portaled to body so transformed ancestors never
          offset its fixed coordinates. */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={fakeCursorRef}
            className="tool-demo-cursor"
            aria-hidden="true"
          >
            <i className="bi bi-cursor-fill" />
          </div>,
          document.body
        )}
    </section>
  );
}
