import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import LogoDetailModal from './LogoDetailModal';
import '../../styles/logo-coverflow.css';

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

export default function LogoCoverflow({
  logos,
  rotate = 30,
  depth = 0.45,
  perspective = 3.6,
  falloff = 0.6,
  fade = 0.09,
  gap = 0.1
}) {
  const count = logos.length;
  const initialIndex = Math.floor(count / 2);

  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const widthRef = useRef(0);
  const rafRef = useRef(null);

  const posRef = useRef(initialIndex);
  const targetRef = useRef(initialIndex);

  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);

  const [selected, setSelected] = useState(initialIndex);
  const [openLogo, setOpenLogo] = useState(null);

  const indexAt = useCallback(
    position => {
      if (!count) return 0;

      return (
        (Math.round(position) % count + count) %
        count
      );
    },
    [count]
  );

  const clampPosition = useCallback(
    position => position,
    []
  );

  const paint = useCallback(() => {
    const width = widthRef.current;

    if (!width || !count) return;

    const pitch = width * (1 + gap);
    const position = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - position;

      offset =
        ((offset % count) + count) %
        count;

      if (offset > count / 2) {
        offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);

      const tilt =
        Math.min(rotate * ramp, 76) *
        Math.sign(offset);

      const edge =
        Math.min(
          1,
          Math.max(
            0,
            count / 2 - distance + 0.15
          )
        );

      const opacity =
        Math.max(
          0,
          1 - fade * distance
        ) * edge;

      card.style.transform = `
        translate3d(
          calc(-50% + ${offset * pitch}px),
          -50%,
          ${-depth * width * ramp}px
        )
        rotateY(${-tilt}deg)
      `;

      card.style.opacity =
        String(opacity);

      card.style.zIndex =
        String(
          100 -
          Math.round(distance * 10)
        );

      card.style.pointerEvents =
        opacity < 0.12
          ? 'none'
          : 'auto';
    });

  }, [
    count,
    depth,
    fade,
    falloff,
    gap,
    indexAt,
    rotate
  ]);

  const settle = useCallback(
    target => {
      if (!count) return;

      if (rafRef.current !== null) {
        cancelAnimationFrame(
          rafRef.current
        );
      }

      targetRef.current =
        clampPosition(target);

      const step = () => {
        const remaining =
          targetRef.current -
          posRef.current;

        if (
          Math.abs(remaining) <
          0.0004
        ) {
          posRef.current =
            targetRef.current;

          paint();

          rafRef.current = null;

          return;
        }

        posRef.current +=
          remaining * 0.16;

        paint();

        rafRef.current =
          requestAnimationFrame(step);
      };

      rafRef.current =
        requestAnimationFrame(step);
    },
    [
      clampPosition,
      count,
      paint
    ]
  );

  const goTo = useCallback(
    index => {
      if (!count) return;

      const target =
        index +
        Math.round(
          (
            targetRef.current -
            index
          ) / count
        ) *
        count;

      settle(target);
    },
    [count, settle]
  );

  const nudge = useCallback(
    amount => {
      if (!count) return;

      const nextIndex =
        (selected + amount + count) %
        count;

      setSelected(nextIndex);
      goTo(nextIndex);
    },
    [
      count,
      selected,
      goTo
    ]
  );

  const handlePointerDown = event => {
    if (
      event.pointerType === 'mouse' &&
      event.button !== 0
    ) {
      return;
    }

    if (rafRef.current !== null) {
      cancelAnimationFrame(
        rafRef.current
      );

      rafRef.current = null;
    }

    targetRef.current =
      posRef.current;

    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      x: event.clientX,
      position: posRef.current,
      velocity: 0,
      time: performance.now(),
      moved: false
    };
  };

  const handlePointerMove = event => {
    const drag = dragRef.current;

    if (
      !drag ||
      drag.id !== event.pointerId
    ) {
      return;
    }

    const delta =
      event.clientX -
      drag.startX;

    if (
      !drag.moved &&
      Math.abs(delta) > 6
    ) {
      drag.moved = true;

      try {
        event.currentTarget
          .setPointerCapture(
            event.pointerId
          );
      } catch {
        // Pointer capture is only an enhancement.
      }
    }

    if (!drag.moved) return;

    const width = widthRef.current;
    const pitch =
      width * (1 + gap);

    if (!pitch) return;

    const now =
      performance.now();

    const previous =
      posRef.current;

    posRef.current =
      drag.position -
      delta / pitch;

    drag.velocity =
      (
        (
          posRef.current -
          previous
        ) /
        Math.max(
          now - drag.time,
          1
        )
      ) * 1000;

    drag.time = now;

    paint();
  };

  const finishDrag = (
    event,
    cancelled = false
  ) => {
    const drag = dragRef.current;

    if (
      !drag ||
      drag.id !== event.pointerId
    ) {
      return;
    }

    dragRef.current = null;

    try {
      if (
        event.currentTarget
          .hasPointerCapture(
            event.pointerId
          )
      ) {
        event.currentTarget
          .releasePointerCapture(
            event.pointerId
          );
      }
    } catch {
      // Safe fallback.
    }

    if (!drag.moved) return;

    suppressClickRef.current = true;

    const carried = cancelled
      ? 0
      : clamp(
          drag.velocity * 0.16,
          -1.75,
          1.75
        );

    const finalPosition =
      Math.round(
        posRef.current +
        carried
      );

    setSelected(
      indexAt(finalPosition)
    );

    settle(finalPosition);

    window.setTimeout(() => {
      suppressClickRef.current =
        false;
    }, 0);
  };

  const handleCardClick = index => {
    if (
      suppressClickRef.current ||
      index !== selected
    ) {
      return;
    }

    setOpenLogo(logos[index]);
  };

  useLayoutEffect(() => {
    const frame =
      frameRef.current;

    if (!frame || !count) {
      return undefined;
    }

    const measure = () => {
      const card =
        cardRefs.current[0];

      if (!card) return;

      widthRef.current =
        card.offsetWidth;

      paint();
    };

    measure();

    const observer =
      new ResizeObserver(measure);

    observer.observe(frame);

    return () =>
      observer.disconnect();
  }, [count, paint]);

  useEffect(
    () => () => {
      if (
        rafRef.current !== null
      ) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    },
    []
  );

  if (!count) return null;

  const activeLogo =
    logos[selected];

  return (
    <>
      <div
        className="logo-coverflow"
        style={{
          '--logo-perspective':
            perspective
        }}
      >
        <div className="logo-coverflow-viewport">
          <div
            ref={frameRef}
            className="logo-coverflow-frame"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Logo design gallery"
          onPointerDown={
            handlePointerDown
          }
          onPointerMove={
            handlePointerMove
          }
          onPointerUp={event =>
            finishDrag(event)
          }
          onPointerCancel={event =>
            finishDrag(
              event,
              true
            )
          }
          onKeyDown={event => {
            if (
              event.key ===
              'ArrowLeft'
            ) {
              event.preventDefault();
              nudge(-1);
            }

            if (
              event.key ===
              'ArrowRight'
            ) {
              event.preventDefault();
              nudge(1);
            }
          }}
        >
          <div className="logo-coverflow-stage">
            <p className="logo-coverflow-hint">
              Slow down and explore
            </p>

            {logos.map(
              (logo, index) => {
                const isActive =
                  index === selected;

                return (
                  <button
                    key={logo.id}
                    ref={node => {
                      cardRefs.current[
                        index
                      ] = node;
                    }}
                    type="button"
                    className={[
                      'logo-coverflow-card',
                      isActive
                        ? 'is-active'
                        : ''
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{
                      '--logo-accent':
                        logo.hoverColor ||
                        'var(--accent-color)'
                    }}
                    onClick={() =>
                      handleCardClick(
                        index
                      )
                    }
                    tabIndex={isActive ? 0 : -1}
                    aria-label={
                      isActive
                        ? `Open details for ${logo.name}`
                        : `${logo.name} logo`
                    }
                    aria-current={
                      isActive
                        ? 'true'
                        : undefined
                    }
                  >
                    <span className="logo-coverflow-image">
                      <img
                        src={
                          logo.image
                        }
                        alt={`Logo ${logo.name}`}
                        draggable="false"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>

                    <span className="logo-coverflow-card-index">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    <span className="logo-coverflow-open">
                      EXPLORE
                      <i
                        className="bi bi-arrow-up-right"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                );
              }
            )}
            </div>
          </div>

          <button
            type="button"
            className="logo-coverflow-nav logo-coverflow-nav--prev"
            onClick={() => nudge(-1)}
            aria-label="Previous logo"
          >
            <i
              className="bi bi-chevron-left"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="logo-coverflow-nav logo-coverflow-nav--next"
            onClick={() => nudge(1)}
            aria-label="Next logo"
          >
            <i
              className="bi bi-chevron-right"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="logo-coverflow-info">
          <div className="logo-coverflow-info-copy">
            <span className="logo-coverflow-eyebrow">
              SELECTED IDENTITY
            </span>

            <h4>
              {activeLogo.name}
            </h4>

            <p>
              Click the active
              identity to explore
              the project.
            </p>
          </div>

          <div
            className="logo-coverflow-pagination"
            aria-label="Select logo"
          >
            {logos.map(
              (logo, index) => (
                <button
                  type="button"
                  key={logo.id}
                  className={
                    index === selected
                      ? 'is-active'
                      : ''
                  }
                  onClick={() => {
                    setSelected(index);
                    goTo(index);
                  }}
                  aria-label={`Show ${logo.name}`}
                  aria-current={
                    index === selected
                      ? 'true'
                      : undefined
                  }
                />
              )
            )}
          </div>
        </div>
      </div>

      {openLogo && (
        <LogoDetailModal
          logo={openLogo}
          onClose={() =>
            setOpenLogo(null)
          }
        />
      )}
    </>
  );
}
