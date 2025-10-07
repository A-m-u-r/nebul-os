import { FileNode } from 'shared';
import './FileExplorer.css';

interface FileExplorerProps {
  files: FileNode[];
  onFileClick?: (file: FileNode) => void;
  onFileDoubleClick?: (file: FileNode) => void;
}

export function FileExplorer({ files, onFileClick, onFileDoubleClick }: FileExplorerProps) {
  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h3>Files</h3>
      </div>
      <div className="file-list">
        {files.map((file) => (
          <div
            key={file.id}
            className={`file-item ${file.type}`}
            onClick={() => onFileClick?.(file)}
            onDoubleClick={() => onFileDoubleClick?.(file)}
          >
            <span className="file-icon">
              {file.type === 'folder' ? '📁' : '📄'}
            </span>
            <span className="file-name">{file.name}</span>
            {file.size && (
              <span className="file-size">{formatFileSize(file.size)}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
