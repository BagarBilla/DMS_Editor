// app/components/Editor.tsx
'use client';

import { useRef, useState } from 'react';
import { DocxEditor, type DocxEditorRef } from '../../packages/react/dist/index.mjs';
import {
  DocxEditorImagePropertiesDialog,
  ImageInsertProvider,
  ImageInsertTrigger,
} from '../../packages/react/dist/index.mjs';
import '../../packages/core/dist/editor.css';

export function Editor() {
  const editorRef = useRef<DocxEditorRef>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState('document.docx');
  const [showUploader, setShowUploader] = useState(true);

  async function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    setBuffer(await file.arrayBuffer());
    setFileName(file.name);
    setShowUploader(false);
  }

  async function onSave() {
    const out = await editorRef.current?.save();
    if (!out) return;
    const blob = new Blob([out], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showUploader && (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #ffffff 100%)',
            fontFamily: 'Segoe UI, sans-serif',
            position: 'absolute',
            inset: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: '420px',
              padding: '35px',
              background: '#fff',
              borderRadius: '20px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontSize: '55px', marginBottom: '10px' }}>📄</div>
            <h2
              style={{
                margin: '0',
                color: '#1f2937',
              }}
            >
              DOCX Preview
            </h2>
            <p
              style={{
                color: '#6b7280',
                marginTop: '10px',
                marginBottom: '30px',
                lineHeight: 1.6,
              }}
            >
              Upload a Microsoft Word (.docx) document to preview and edit it.
            </p>
            <label
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                background: '#2563eb',
                color: '#fff',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: '0.2s',
              }}
            >
              📂 Choose DOCX File
              <input
                type="file"
                accept=".docx"
                onChange={onFileSelect}
                style={{ display: 'none' }}
              />
            </label>
            <p
              style={{
                marginTop: '20px',
                color: '#9ca3af',
                fontSize: '14px',
              }}
            >
              Supported format: <strong>.docx</strong>
            </p>
          </div>
        </div>
      )}

      <div style={{ flex: 1, minHeight: 0 }}>
       
          <DocxEditor
            ref={editorRef}
            document={buffer ?? undefined}
            />
            </div>
            </div>
  );
}