import {
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';

export default function LogoDetailModal({
  logo,
  onClose
}) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    window.requestAnimationFrame(
      () =>
        closeRef.current?.focus()
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [onClose]);

  const gallery =
    Array.isArray(logo.gallery)
      ? logo.gallery
      : [];

  const deliverables =
    Array.isArray(
      logo.deliverables
    )
      ? logo.deliverables
      : [];

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
        className="logo-detail-modal"
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
          aria-label="Close logo details"
        >
          <i
            className="bi bi-x-lg"
            aria-hidden="true"
          />
        </button>

        <div className="logo-detail-hero">
          <div className="logo-detail-copy">
            <span className="logo-detail-kicker">
              // VISUAL IDENTITY
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
                <span>
                  {logo.category}
                </span>
              )}

              {logo.year && (
                <span>
                  {logo.year}
                </span>
              )}

              {logo.role && (
                <span>
                  {logo.role}
                </span>
              )}
            </div>

            {deliverables.length >
              0 && (
              <div className="logo-detail-deliverables">
                {deliverables.map(
                  item => (
                    <span key={item}>
                      {item}
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          <div className="logo-detail-mark">
            <img
              src={logo.image}
              alt={`Logo ${logo.name}`}
            />
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="logo-detail-gallery">
            <div className="logo-detail-gallery-head">
              <span>
                BRAND APPLICATIONS
              </span>

              <span>
                {String(
                  gallery.length
                ).padStart(
                  2,
                  '0'
                )}{' '}
                VISUALS
              </span>
            </div>

            <div className="logo-detail-gallery-grid">
              {gallery.map(
                (item, index) => {
                  const source =
                    typeof item ===
                    'string'
                      ? item
                      : item.src;

                  const alt =
                    typeof item ===
                    'string'
                      ? `${logo.name} application ${index + 1}`
                      : item.alt ||
                        `${logo.name} application ${index + 1}`;

                  const label =
                    typeof item ===
                    'string'
                      ? ''
                      : item.label ||
                        '';

                  return (
                    <figure
                      key={`${source}-${index}`}
                      className="logo-detail-gallery-item"
                    >
                      <img
                        src={source}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                      />

                      {label && (
                        <figcaption>
                          {label}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
              )}
            </div>
          </div>
        )}
      </section>
    </div>,
    document.body
  );
}
