import { makeAutoObservable } from "mobx";

export interface WindowState {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  contentType: string; // 'terminal', 'editor'
}

class WindowStore {
  windows: WindowState[] = [];
  focusedWindowId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openWindow(window: WindowState) {
    this.windows.push(window);
    this.focusWindow(window.id);
  }

  closeWindow(id: string) {
    this.windows = this.windows.filter(w => w.id !== id);
    if (this.focusedWindowId === id) {
      this.focusedWindowId = this.windows.length ? this.windows[this.windows.length - 1].id : null;
    }
  }

  focusWindow(id: string) {
    this.focusedWindowId = id;
    const maxZ = this.windows.reduce((max, w) => Math.max(max, w.zIndex), 0);
    const window = this.windows.find(w => w.id === id);
    if (window && window.zIndex !== maxZ + 1) {
      window.zIndex = maxZ + 1;
    }
  }

  minimizeWindow(id: string) {
    const window = this.windows.find(w => w.id === id);
    if (window) window.minimized = true;
  }

  maximizeWindow(id: string) {
    const window = this.windows.find(w => w.id === id);
    if (window) window.maximized = !window.maximized;
  }

  updateWindowPositionSize(id: string, x: number, y: number, width: number, height: number) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      window.x = x;
      window.y = y;
      window.width = width;
      window.height = height;
    }
  }
}

const windowStore = new WindowStore();
export default windowStore;
