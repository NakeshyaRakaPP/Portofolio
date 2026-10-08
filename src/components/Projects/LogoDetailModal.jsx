import {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';

export default function LogoDetailModal({
  logo,
  onClose
}) {
  const closeRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = useMemo(
    () =>
      Array.isArray(logo.gallery) && logo.gallery.length
        ? logo.gallery
        : [
            {
              src: logo.image,
              label: 'Logo Mark',
              alt: `Logo ${logo.name}`,
              fit: 'contain'
            }
          ],
    [logo]
  );

  const deliverables =
    Array.isArray(logo.deliverables)
      ? logo.deliverables
      : [];

  const activeItem = gallery[activeIndex] || gallery[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [logo.id]);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex(index =>
          (index + 1) % gallery.length
        );
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex(index =>
          (index - 1 + gallery.length) %
          gallery.length
        );
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    window.requestAnimationFrame(
      () => closeRef.current?.focus()
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [gallery.length, onClose]);

  const showPrevious = () => {
    setActiveIndex(index =>
      (index - 1 + gallery.length) %
      gallery.length
    );
  };

  const showNext = () => {
    setActiveIndex(index =>
      (index + 1) % gallery.length
    );
  };

  return createPortal(
    <div
      className="logo-detail-backdrop"
      role="presentation"
      onMouseDown={event => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        className="logo-detail-modal logo-detail-modal--viewer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`logo-detail-${logo.id}`}
        style={{
          '--logo-accent':
            logo.hoverColor ||
            'var(--accent-color)'
        }}
      >
        <button
          ref={closeRef}
          type="button"
          className="logo-detail-close"
          onClick={onClose}
          aria-label="Close logo preview"
        >
          <i
            className="bi bi-x-lg"
            aria-hidden="true"
          />
        </button>

        <div className="logo-viewer-main">
          <div className="logo-viewer-copy">
            <div>
              <span className="logo-detail-kicker">
                // PROJECT PREVIEW
              </span>

              <h3
                id={`logo-detail-${logo.id}`}
              >
                {logo.name}
              </h3>

              {logo.subtitle && (
                <p className="logo-detail-subtitle">
                  {logo.subtitle}
                </p>
              )}

              {logo.description && (
                <p className="logo-detail-description">
                  {logo.description}
                </p>
              )}

              <div className="logo-detail-meta">
                {logo.category && (
                  <span>{logo.category}</span>
                )}

                {logo.year && (
                  <span>{logo.year}</span>
                )}

                {logo.role && (
                  <span>{logo.role}</span>
                )}
              </div>

              {deliverables.length > 0 && (
                <div className="logo-detail-deliverables">
                  {deliverables.map(item => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {logo.caseStudyHref && (
              <a
                href={logo.caseStudyHref}
                className="logo-detail-case-link"
              >
                <span>VIEW CASE STUDY</span>
                <i
                  className="bi bi-arrow-up-right"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>

          <div className="logo-viewer-stage">
            <figure
              className={`logo-viewer-figure ${
                activeItem.fit === 'contain'
                  ? 'is-contain'
                  : ''
              }`}
            >
              <img
                key={`${logo.id}-${activeIndex}`}
                src={activeItem.src}
                alt={
                  activeItem.alt ||
                  `${logo.name} visual ${activeIndex + 1}`
                }
                className="logo-viewer-image"
                decoding="async"
              />

              <figcaption className="logo-viewer-caption">
                <span>
                  {String(activeIndex + 1).padStart(2, '0')}
                  {' / '}
                  {String(gallery.length).padStart(2, '0')}
                </span>

                <strong>
                  {activeItem.label || 'Brand Application'}
                </strong>
              </figcaption>
            </figure>

            {gallery.length > 1 && (
              <div className="logo-viewer-arrows">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous visual"
                >
                  <i
                    className="bi bi-arrow-left"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next visual"
                >
                  <i
                    className="bi bi-arrow-right"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="logo-viewer-thumbs-wrap">
          <div
            className="logo-viewer-thumbs"
            aria-label={`${logo.name} gallery`}
          >
            {gallery.map((item, index) => (
              <button
                type="button"
                key={`${item.src}-${index}`}
                className={`logo-viewer-thumb ${
                  index === activeIndex
                    ? 'is-active'
                    : ''
                }`}
                onClick={() =>
                  setActiveIndex(index)
                }
                aria-label={`Show ${
                  item.label ||
                  `visual ${index + 1}`
                }`}
                aria-current={
                  index === activeIndex
                    ? 'true'
                    : undefined
                }
              >
                <span className="logo-viewer-thumb-index">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className={`logo-viewer-thumb-media ${
                    item.fit === 'contain'
                      ? 'is-contain'
                      : ''
                  }`}
                >
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>

                <span className="logo-viewer-thumb-label">
                  {item.label || 'Visual'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}
