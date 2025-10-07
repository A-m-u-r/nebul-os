import { useState, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { WindowState } from 'shared';
import './WindowManager.css';

interface WindowManagerProps {
  windows: WindowState[];
  onWindowClose: (id: string) => void;
  onWindowUpdate: (id: string, updates: Partial<WindowState>) => void;
  renderWindowContent: (window: WindowState) => React.ReactNode;
}

export function WindowManager({ 
  windows, 
  onWindowClose, 
  onWindowUpdate,
  renderWindowContent 
}: WindowManagerProps) {
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);

  const handleFocus = useCallback((id: string) => {
    setFocusedWindowId(id);
  }, []);

  const handleClose = useCallback((id: string) => {
    onWindowClose(id);
  }, [onWindowClose]);

  const handleMinimize = useCallback((id: string) => {
    onWindowUpdate(id, { minimized: true });
  }, [onWindowUpdate]);

  const handleMaximize = useCallback((id: string, isMaximized: boolean) => {
    onWindowUpdate(id, { maximized: !isMaximized });
  }, [onWindowUpdate]);

  return (
    <div className="window-manager">
      {windows
        .filter(w => !w.minimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <Rnd
            key={window.id}
            default={{
              x: window.x,
              y: window.y,
              width: window.width,
              height: window.height,
            }}
            minWidth={300}
            minHeight={200}
            bounds="parent"
            onDragStop={(e, d) => {
              onWindowUpdate(window.id, { x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              onWindowUpdate(window.id, {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                ...position,
              });
            }}
            className={`window ${focusedWindowId === window.id ? 'focused' : ''} ${window.maximized ? 'maximized' : ''}`}
            style={{ zIndex: window.zIndex }}
            onMouseDown={() => handleFocus(window.id)}
          >
            <div className="window-header">
              <div className="window-title">{window.title}</div>
              <div className="window-controls">
                <button onClick={() => handleMinimize(window.id)} className="window-control-btn">
                  −
                </button>
                <button onClick={() => handleMaximize(window.id, window.maximized)} className="window-control-btn">
                  ◻
                </button>
                <button onClick={() => handleClose(window.id)} className="window-control-btn close">
                  ×
                </button>
              </div>
            </div>
            <div className="window-content">
              {renderWindowContent(window)}
            </div>
          </Rnd>
        ))}
    </div>
  );
}
