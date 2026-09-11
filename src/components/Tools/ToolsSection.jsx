import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ToolCard from './ToolCard';
import ToolDropzone from './ToolDropzone';
import AmbientDecor from '../common/AmbientDecor';
import { tools } from '../../data/tools';

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState(null);
  const [draggingTool, setDraggingTool] = useState(null);

  const sectionRef = useRef(null);
  const dropzoneRef = useRef(null);
  const cardRefs = useRef({});
  const ghostRef = useRef(null);
  const fakeCursorRef = useRef(null);

  const dragOffsetRef = useRef({
    x: 0,
    y: 0
  });

  const demoRunRef = useRef(false);

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
    if (draggingTool) return;

    if (activeTool === toolId) return;

    flyCardToDropzone(toolId);
  }

  function handleDragStart(toolId, event) {
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
    if (!draggingTool) return;

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

    const dropped = isPointerInsideDropzone(
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

  useEffect(() => {
    const section = sectionRef.current;
    const fakeCursor = fakeCursorRef.current;

    if (!section || !fakeCursor) return;

    if (
      !window.matchMedia(
        '(hover: hover) and (pointer: fine)'
      ).matches
    ) {
      return;
    }

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return;
    }

    if (demoRunRef.current) return;

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

    observer.observe(section);

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
        if (cancelled) return;

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

        window.setTimeout(() => {
          sourceCard.classList.add(
            'is-demo-grabbed'
          );

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

          dropzone.classList.add(
            'is-hovered'
          );

          window.setTimeout(() => {
            sourceCard.classList.remove(
              'is-demo-grabbed'
            );

            dropzone.classList.remove(
              'is-hovered'
            );

            cursor.classList.remove(
              'is-visible'
            );

            resolve();
          }, 1250);
        }, 650);
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <section
        id="skills"
        className="skills-section"
        ref={sectionRef}
    >
        <AmbientDecor variant="tools" />

        <div className="container">

            <div
                className="project-category-header reveal in-left"
                data-delay="0"
            >
                <span className="cat-num">
                    // STACK
                </span>

                <h3>
                    Tools & Technologies
                </h3>
            </div>


            <div
                className="tools-playground reveal in-up"
                data-delay="100"
            >

                <div className="tools-layout">

                  <div className="tools-top-row">
                    {tools.slice(0, 7).map((tool) => (
                      <ToolCard
                        key={tool.id}
                        ref={(element) => {
                          cardRefs.current[tool.id] = element;
                        }}
                        tool={tool}
                        isActive={activeTool === tool.id}
                        isDragging={draggingTool === tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        onPointerDown={(event) => handleDragStart(tool.id, event)}
                        onPointerMove={handleDragMove}
                        onPointerUp={handleDragEnd}
                        onPointerCancel={handleDragEnd}
                      />
                    ))}
                  </div>


                  <div className="tools-bottom-layout">

                    <div className="tools-side tools-side-left">
                      {tools.slice(7, 9).map((tool) => (
                        <ToolCard
                          key={tool.id}
                          ref={(element) => {
                            cardRefs.current[tool.id] = element;
                          }}
                          tool={tool}
                          isActive={activeTool === tool.id}
                          isDragging={draggingTool === tool.id}
                          onClick={() => handleToolClick(tool.id)}
                          onPointerDown={(event) => handleDragStart(tool.id, event)}
                          onPointerMove={handleDragMove}
                          onPointerUp={handleDragEnd}
                          onPointerCancel={handleDragEnd}
                        />
                      ))}
                    </div>


                    <ToolDropzone
                      ref={dropzoneRef}
                      tool={getToolById(activeTool)}
                      onReturn={() => setActiveTool(null)}
                    />


                    <div className="tools-side tools-side-right">
                      {tools.slice(9, 11).map((tool) => (
                        <ToolCard
                          key={tool.id}
                          ref={(element) => {
                            cardRefs.current[tool.id] = element;
                          }}
                          tool={tool}
                          isActive={activeTool === tool.id}
                          isDragging={draggingTool === tool.id}
                          onClick={() => handleToolClick(tool.id)}
                          onPointerDown={(event) => handleDragStart(tool.id, event)}
                          onPointerMove={handleDragMove}
                          onPointerUp={handleDragEnd}
                          onPointerCancel={handleDragEnd}
                        />
                      ))}
                    </div>
                  </div>
                </div>
            </div>
        </div>


        {/* Fake cursor sengaja dirender ke body.
            Jangan masukkan kembali ke tools-playground. */}
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
            )
        }

    </section>
);
}