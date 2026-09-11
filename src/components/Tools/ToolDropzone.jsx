import { forwardRef } from 'react';

const ToolDropzone = forwardRef(
  function ToolDropzone(
    {
      tool,
      onReturn
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={[
          'tool-dropzone',
          tool ? 'has-result' : ''
        ]
          .filter(Boolean)
          .join(' ')}
        role="region"
        aria-live="polite"
        aria-label="Tool detail area"
      >

        {/* =========================
            EMPTY STATE
        ========================== */}

        <div className="tool-dropzone-empty">
          <span
            className="drop-icon"
            aria-hidden="true"
          >
            <i className="bi bi-arrows-move" />
          </span>

          <strong>
            DROP HERE
          </strong>

          <span>
            or click any tool
          </span>
        </div>


        {/* =========================
            RESULT STATE
        ========================== */}

        {tool && (
          <div className="tool-result">

            <button
              type="button"
              className="tool-return-btn"
              onClick={onReturn}
              aria-label={`Return ${tool.name} to its original position`}
            >
              <i
                className="bi bi-arrow-return-left"
                aria-hidden="true"
              />

              <span>
                Return
              </span>
            </button>


            <div className="tool-result-head">

              <span className="tool-result-logo">
                <img
                  src={tool.logo}
                  alt=""
                />
              </span>

              <strong>
                {tool.name}
              </strong>

            </div>


            <p>
              {tool.description}
            </p>


            <div className="tool-result-level">

              <span>
                Proficiency
              </span>

              <strong>
                {tool.level}%
              </strong>

            </div>


            <div className="tool-progress">

              <span
                style={{
                  transform: `scaleX(${
                    tool.level / 100
                  })`
                }}
              />

            </div>

          </div>
        )}

      </div>
    );
  }
);

export default ToolDropzone;