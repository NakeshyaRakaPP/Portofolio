import { forwardRef } from 'react';

const ToolCard = forwardRef(
  function ToolCard(
    {
      tool,
      isActive,
      isDragging,
      interactive = true,
      onClick,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel
    },
    ref
  ) {
    return (
      <div
        className={[
          'tool-card-slot',
          isActive ? 'is-empty' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          ref={ref}
          type="button"
          className={[
            'tool-card',
            isActive ? 'is-active' : '',
            isDragging ? 'is-dragging' : ''
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={onClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          tabIndex={interactive ? 0 : -1}
          aria-hidden={interactive ? undefined : 'true'}
          aria-label={`Explore ${tool.name}`}
        >
          <span className="tool-logo">
            <img
              src={tool.logo}
              alt=""
            />
          </span>

          <span className="tool-name">
            {tool.name}
          </span>
        </button>
      </div>
    );
  }
);

export default ToolCard;
