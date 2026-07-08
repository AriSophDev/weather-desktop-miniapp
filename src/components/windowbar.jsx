import "./component.css";

export default function Windowbar() {
  return (
    <div className="titlebar" data-tauri-drag-region>
      <span className="titlebar-title">:3</span>
      <div className="titlebar-controls">
        <button id="titlebar-minimize" className="titlebar-btn"></button>
        <button id="titlebar-close" className="titlebar-btn"></button>
      </div>
    </div>
  );
}
