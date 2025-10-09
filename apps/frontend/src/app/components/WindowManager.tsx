import React from "react";
import { observer } from "mobx-react-lite";
import { Rnd } from "react-rnd";
import windowStore from "../stores/windowStore";
import "./WindowManager.css";

export const WindowManager = observer(() => {
  const {
    windows,
    focusedWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPositionSize,
  } = windowStore;

  const sortedWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <>
      {sortedWindows.map((window) => (
        <Rnd
          key={window.id}
          size={{ width: window.width, height: window.height }}
          position={{ x: window.x, y: window.y }}
          onDragStop={(e, d) =>
            updateWindowPositionSize(window.id, d.x, d.y, window.width, window.height)
          }
          onResizeStop={(e, direction, ref, delta, position) =>
            updateWindowPositionSize(window.id, position.x, position.y, ref.offsetWidth, ref.offsetHeight)
          }
          style={{ zIndex: window.zIndex, display: window.minimized ? "none" : "block" }}
          onMouseDown={() => focusWindow(window.id)}
          dragHandleClassName="window-titlebar"
        >
          <div className="window">
            <div className="window-titlebar">
              <span className="window-title">{window.title}</span>
              <button onClick={() => minimizeWindow(window.id)} className="window-control-button" title="Minimize">
                _
              </button>
              <button
                onClick={() => maximizeWindow(window.id)}
                className="window-control-button"
                title={window.maximized ? "Restore" : "Maximize"}
              >
                {window.maximized ? "🗗" : "🗖"}
              </button>
              <button onClick={() => closeWindow(window.id)} className="window-control-button" title="Close">
                ×
              </button>
            </div>
            <div className="window-content">
              {window.content}
            </div>
          </div>
        </Rnd>
      ))}
    </>
  );
});


