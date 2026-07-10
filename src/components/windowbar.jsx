import "./component.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

export default function Windowbar() {
  return (
    <div className="titlebar" data-tauri-drag-region>
      <span className="titlebar-title">:3</span>
      <div className="titlebar-controls">
        <button
          id="titlebar-minimize"
          className="titlebar-btn"
          onClick={() => appWindow.minimize()}
        ></button>
        <button
          id="titlebar-close"
          className="titlebar-btn"
          onClick={() => appWindow.close()}
        ></button>
      </div>
    </div>
  );
}
