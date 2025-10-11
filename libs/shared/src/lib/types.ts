export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number;
  mimeType?: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  content?: string;
}

export interface WindowState {
  id: string;
  title: string;
  type: 'terminal' | 'editor' | 'file-explorer' | 'ai-assistant';
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  data?: any;
}

export interface Process {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  startedAt: Date;
  command?: string;
  output?: string;
}

export interface WSMessage<T = any> {
  type: string;
  payload: T;
  timestamp: Date;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
