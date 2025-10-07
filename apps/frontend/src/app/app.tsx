import { useState, useCallback } from 'react';
import { WindowState, FileNode, APP_CONSTANTS } from 'shared';
import { WindowManager } from './components/WindowManager';
import { Desktop } from './components/Desktop';
import { Terminal } from './components/Terminal';
import { CodeEditor } from './components/CodeEditor';
import { FileExplorer } from './components/FileExplorer';

export function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

  const [files] = useState<FileNode[]>([
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      path: '/Documents',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'hello.ts',
      type: 'file',
      path: '/hello.ts',
      size: 1234,
      mimeType: 'text/typescript',
      content: 'console.log("Hello, Nebul OS!");',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const createWindow = useCallback((type: WindowState['type']) => {
    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      title: type === 'terminal' ? 'Terminal' : 
             type === 'editor' ? 'Code Editor' :
             type === 'file-explorer' ? 'File Explorer' : 
             'AI Assistant',
      type,
      x: 100 + (windows.length * 30),
      y: 100 + (windows.length * 30),
      width: APP_CONSTANTS.DEFAULT_WINDOW_WIDTH,
      height: APP_CONSTANTS.DEFAULT_WINDOW_HEIGHT,
      minimized: false,
      maximized: false,
      zIndex: nextZIndex,
    };
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [windows.length, nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const updateWindow = useCallback((id: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const renderWindowContent = (window: WindowState) => {
    switch (window.type) {
      case 'terminal':
        return <Terminal onData={(data) => console.log('Terminal data:', data)} />;
      case 'editor':
        return (
          <CodeEditor 
            value={window.data?.content || '// Start coding...'} 
            onChange={(value) => console.log('Editor value:', value)}
          />
        );
      case 'file-explorer':
        return (
          <FileExplorer 
            files={files}
            onFileClick={(file) => console.log('File clicked:', file)}
            onFileDoubleClick={(file) => {
              if (file.type === 'file') {
                createWindow('editor');
              }
            }}
          />
        );
      case 'ai-assistant':
        return (
          <div style={{ padding: '20px' }}>
            <h2>AI Assistant</h2>
            <p>Your AI-powered coding assistant (coming soon)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Desktop 
        windows={windows}
        onCreateWindow={createWindow}
        onRestoreWindow={restoreWindow}
      />
      <WindowManager
        windows={windows}
        onWindowClose={closeWindow}
        onWindowUpdate={updateWindow}
        renderWindowContent={renderWindowContent}
      />
    </div>
  );
}

export default App;
