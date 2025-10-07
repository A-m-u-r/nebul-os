import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

interface TerminalProps {
  onData?: (data: string) => void;
}

export function Terminal({ onData }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
      },
    });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    xterm.open(terminalRef.current);
    fitAddon.fit();

    xterm.onData((data) => {
      if (onData) {
        onData(data);
      }
    });

    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;

    xterm.writeln('Welcome to Nebul OS Terminal');
    xterm.writeln('Type commands to interact with the system');
    xterm.write('\r\n$ ');

    return () => {
      xterm.dispose();
    };
  }, [onData]);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
}
