import "./component.css";

export default function Windowbar() {
  return (
    <div className="titlebar">
      <div data-tauri-drag-region className="titlebar">
        <div className="titlebar-controls">
          <button id="titlebar-minimize">—</button>
          <button id="titlebar-close">✕</button>
        </div>
      </div>
    </div>
  );
}
