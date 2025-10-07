# Nebul OS

A modern Web-based Operating System built as a TypeScript monorepo featuring a draggable window manager, cloud file storage, code editor, terminal, and AI assistant.

## Architecture

### Monorepo Structure

This project uses **Nx** for monorepo management with the following structure:

### Tech Stack

**Frontend:**
- React with TypeScript
- Vite for blazing fast builds
- react-rnd for draggable/resizable windows
- Monaco Editor for code editing
- xterm.js for terminal emulation

**Backend:**
- NestJS framework
- PostgreSQL database
- Redis for caching and sessions
- WebSocket support

**DevOps:**
- Docker & Docker Compose
- Nx for monorepo management

## Features

- **Window Manager**: Draggable and resizable windows with minimize, maximize, and close controls
- **File Explorer**: Browse and manage cloud-stored files
- **Code Editor**: Monaco-powered editor with syntax highlighting
- **Terminal**: Full-featured terminal with xterm.js
- **AI Assistant**: (Coming soon) AI-powered coding assistant
- **Desktop Environment**: Taskbar with window management