import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'typescript',
  readOnly = false 
}: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        readOnly,
        wordWrap: 'on',
      }}
    />
  );
}
