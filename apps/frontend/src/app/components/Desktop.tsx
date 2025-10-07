import { WindowState } from 'shared';
import './Desktop.css';

interface DesktopProps {
  windows: WindowState[];
  onCreateWindow: (type: WindowState['type']) => void;
  onRestoreWindow: (id: string) => void;
}

export function Desktop({ windows, onCreateWindow, onRestoreWindow }: DesktopProps) {
  const minimizedWindows = windows.filter(w => w.minimized);

  return (
    <div className="desktop">
      <div className="desktop-icons">
        <div className="desktop-icon" onClick={() => onCreateWindow('file-explorer')}>
          <div className="icon">📁</div>
          <div className="label">Files</div>
        </div>
        <div className="desktop-icon" onClick={() => onCreateWindow('terminal')}>
          <div className="icon">💻</div>
          <div className="label">Terminal</div>
        </div>
        <div className="desktop-icon" onClick={() => onCreateWindow('editor')}>
          <div className="icon">📝</div>
          <div className="label">Editor</div>
        </div>
        <div className="desktop-icon" onClick={() => onCreateWindow('ai-assistant')}>
          <div className="icon">🤖</div>
          <div className="label">AI Assistant</div>
        </div>
      </div>
      
      <div className="taskbar">
        <div className="taskbar-start">
          <div className="start-button">☰ Nebul OS</div>
        </div>
        <div className="taskbar-windows">
          {minimizedWindows.map((window) => (
            <div 
              key={window.id}
              className="taskbar-window"
              onClick={() => onRestoreWindow(window.id)}
            >
              {window.title}
            </div>
          ))}
        </div>
        <div className="taskbar-tray">
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
