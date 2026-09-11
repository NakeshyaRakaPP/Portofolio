export default function SceneChrome({ index, label, meta }) {
  return (
    <div className="scene-chrome" aria-hidden="true">
      <div className="scene-chrome-left">
        <span className="scene-chrome-index">{index}</span>
        <span className="scene-chrome-line" />
        <span className="scene-chrome-label">{label}</span>
      </div>
      <span className="scene-chrome-meta">{meta}</span>
    </div>
  );
}
