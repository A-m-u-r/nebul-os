export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  FILES: {
    LIST: '/files',
    CREATE: '/files',
    GET: '/files/:id',
    UPDATE: '/files/:id',
    DELETE: '/files/:id',
  },
  PROCESSES: {
    LIST: '/processes',
    CREATE: '/processes',
    GET: '/processes/:id',
    KILL: '/processes/:id/kill',
  },
} as const;
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  TERMINAL_DATA: 'terminal:data',
  TERMINAL_RESIZE: 'terminal:resize',
  PROCESS_OUTPUT: 'process:output',
  PROCESS_EXIT: 'process:exit',
  FILE_CHANGE: 'file:change',
} as const;

export const APP_CONSTANTS = {
  JWT_SECRET: (typeof process !== 'undefined' && process.env?.['JWT_SECRET']) || 'your-secret-key',
  JWT_EXPIRES_IN: '24h',
  DEFAULT_WINDOW_WIDTH: 800,
  DEFAULT_WINDOW_HEIGHT: 600,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

export const PORTS = {
  GATEWAY: 3000,
  AUTH: 3001,
  FILES: 3002,
  PROCESSES: 3003,
} as const;
