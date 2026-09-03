// Shared insert-video wiring: hidden file input, metadata extraction, and async dispatch.
//
// Matches ImageInsert architecture: toolbar and menu trigger the same picker.

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';
import { executeImageCommand, toolbarCommandState } from '@docx-editor.dev/core/editor';
import { useDocxEditor } from '../context';
import { useEditorState } from '../useEditorState';
import { useToolbarLabel } from '../toolbar/toolbar-context';
import { chromeControlForSlot, chromeIcon, guardToolbarMousedown } from '../toolbar/ToolbarButton';
import { Slot } from '../toolbar/Slot';

const ACCEPT = 'video/mp4,video/webm,video/ogg,video/quicktime';

export interface VideoInsertContextValue {
  readonly openFilePicker: () => void;
  readonly insertFromFileList: (files: FileList | File[] | null | undefined) => Promise<void>;
  readonly insertFromDataTransfer: (data: DataTransfer | null) => Promise<void>;
  readonly isEnabled: boolean;
  readonly disabledReason: string | null;
  readonly inputRef: React.RefObject<HTMLInputElement | null>;
  readonly onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoInsertContext = createContext<VideoInsertContextValue | null>(null);

export function useVideoInsert(): VideoInsertContextValue {
  const context = useContext(VideoInsertContext);
  if (!context) {
    throw new Error('useVideoInsert must be used within VideoInsertProvider');
  }
  return context;
}

export function useVideoInsertOptional(): VideoInsertContextValue | null {
  return useContext(VideoInsertContext);
}

export interface VideoInsertProviderProps {
  children: ReactNode;
}

function extractVideoMetadata(file: File): Promise<{
  widthPoints: number;
  heightPoints: number;
  mime: string;
}> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve({ widthPoints: 420, heightPoints: 236, mime: file.type || 'video/mp4' });
      return;
    }
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    video.src = url;
    video.muted = true;
    video.preload = 'metadata';

    let resolved = false;
    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      try {
        URL.revokeObjectURL(url);
        video.remove();
      } catch {
        // Safe disposal
      }
    };

    video.onloadedmetadata = () => {
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 360;
      const maxPt = 440;
      let widthPoints = Math.min(maxPt, w * 0.75);
      let heightPoints = Math.round(widthPoints * (h / w));
      if (heightPoints > 380) {
        heightPoints = 380;
        widthPoints = Math.round(heightPoints * (w / h));
      }
      cleanup();
      resolve({
        widthPoints,
        heightPoints,
        mime: file.type || 'video/mp4',
      });
    };

    video.onerror = () => {
      cleanup();
      resolve({
        widthPoints: 420,
        heightPoints: 236,
        mime: file.type || 'video/mp4',
      });
    };

    setTimeout(() => {
      cleanup();
      resolve({
        widthPoints: 420,
        heightPoints: 236,
        mime: file.type || 'video/mp4',
      });
    }, 2000);
  });
}

export function VideoInsertProvider({ children }: VideoInsertProviderProps) {
  const editor = useDocxEditor();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const busyRef = useRef(false);

  const selectInsertState = useCallback(
    () => toolbarCommandState(editor, 'video.insert'),
    [editor]
  );
  const insertState = useEditorState(
    selectInsertState,
    (a, b) => a.enabled === b.enabled && a.disabledReason === b.disabledReason
  );
  const isEnabled = insertState.enabled;
  const disabledReason = insertState.disabledReason;

  const insertVideoFile = useCallback(
    async (file: File) => {
      if (!editor || busyRef.current) return;
      const isVideoType = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|ogg|mov)$/i);
      if (!isVideoType) {
        window.alert('Please select a valid video file (.mp4, .webm, .ogg, .mov)');
        return;
      }
      if (file.size > 1024 * 1024 * 1024) {
        window.alert('Video file exceeds maximum size limit (1 GB)');
        return;
      }

      busyRef.current = true;
      try {
        let mime = file.type;
        if (!mime || !mime.startsWith('video/')) {
          if (/\.mp4$/i.test(file.name)) mime = 'video/mp4';
          else if (/\.webm$/i.test(file.name)) mime = 'video/webm';
          else if (/\.ogg$/i.test(file.name)) mime = 'video/ogg';
          else if (/\.mov$/i.test(file.name)) mime = 'video/quicktime';
          else mime = 'video/mp4';
        }

        const metadata = await extractVideoMetadata(file);
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        const command = {
          type: 'insertImage' as const,
          data: bytes,
          mime: (mime || metadata.mime) as any,
          widthPoints: metadata.widthPoints,
          heightPoints: metadata.heightPoints,
        };

        const gate = editor.canExecuteImageCommand?.(command);
        if (gate && !gate.ok) {
          window.alert(gate.reason ?? 'Cannot insert video here');
          return;
        }

        const result = await executeImageCommand(editor, command);
        if (!result.ok) {
          window.alert(result.reason ?? 'Failed to insert video');
        } else {
          editor.focus();
        }
      } catch (err) {
        console.error('Failed to insert video:', err);
        window.alert('Error reading or inserting video file');
      } finally {
        busyRef.current = false;
      }
    },
    [editor]
  );

  const insertFromFileList = useCallback(
    async (files: FileList | File[] | null | undefined) => {
      const file = files?.[0];
      if (!file) return;
      await insertVideoFile(file);
    },
    [insertVideoFile]
  );

  const insertFromDataTransfer = useCallback(
    async (data: DataTransfer | null) => {
      if (!data) return;
      const file = [...data.files].find((candidate) => candidate.type.startsWith('video/'));
      if (file) {
        await insertVideoFile(file);
        return;
      }
      for (const item of data.items) {
        if (item.kind !== 'file' || !item.type.startsWith('video/')) continue;
        const blob = item.getAsFile();
        if (!blob) continue;
        await insertVideoFile(blob);
        return;
      }
    },
    [insertVideoFile]
  );

  const openFilePicker = useCallback(() => {
    if (!isEnabled) return;
    inputRef.current?.click();
  }, [isEnabled]);

  const onInputChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.currentTarget;
      await insertFromFileList(input.files);
      input.value = '';
    },
    [insertFromFileList]
  );

  const value = useMemo(
    (): VideoInsertContextValue => ({
      openFilePicker,
      insertFromFileList,
      insertFromDataTransfer,
      isEnabled,
      disabledReason,
      inputRef,
      onInputChange,
    }),
    [
      openFilePicker,
      insertFromFileList,
      insertFromDataTransfer,
      isEnabled,
      disabledReason,
      onInputChange,
    ]
  );

  return (
    <VideoInsertContext.Provider value={value}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="docx-video-insert__input"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
        onChange={onInputChange}
      />
      {children}
    </VideoInsertContext.Provider>
  );
}

export interface VideoInsertTriggerProps {
  className?: string;
  hidden?: boolean;
  asChild?: boolean;
  children?: ReactNode;
}

export function VideoInsertTrigger({
  className,
  hidden,
  asChild,
  children,
}: VideoInsertTriggerProps) {
  const { openFilePicker, isEnabled, disabledReason } = useVideoInsert();
  const label = useToolbarLabel();
  if (hidden) return null;
  const control = chromeControlForSlot('video.insert');
  const text = label(control?.labelKey ?? 'toolbar.video');
  const shared = {
    type: 'button' as const,
    className: `docx-toolbar__button${className ? ` ${className}` : ''}`,
    'data-slot': 'video.insert',
    disabled: !isEnabled,
    ...(!isEnabled ? { 'data-disabled': '' } : {}),
    'aria-label': text,
    title: disabledReason ?? text,
    onMouseDown: guardToolbarMousedown,
    onClick: openFilePicker,
  };
  if (asChild) return <Slot {...shared}>{children}</Slot>;
  return <button {...shared}>{children ?? chromeIcon(control?.paths)}</button>;
}

VideoInsertTrigger.docxSlot = 'video.insert' as const;

export const ToolbarVideoInsert = Object.assign(VideoInsertTrigger, {
  docxSlot: 'video.insert' as const,
});
