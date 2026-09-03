// Watermark hook: reads the active watermark and controls it via setWatermark command.

import { useCallback, useMemo } from 'react';
import type { Watermark } from '@docx-editor.dev/core/contracts/types';
import type { EditorSnapshot } from '@docx-editor.dev/core/contracts/editor';
import type { DocxEditorInstance } from '@docx-editor.dev/core/editor';
import { useDocxEditor } from './context';
import { useEditorState } from './useEditorState';
import type { DocxEditorRef } from '../types';

/** What `useWatermark` returns. @public */
export interface UseWatermarkReturn {
  /** Current watermark configuration, or null if none. */
  readonly watermark: Watermark | null;
  /** Whether watermark operations can be performed right now. */
  readonly isEnabled: boolean;
  /** Apply or update the watermark. Returns whether the command succeeded. */
  readonly apply: (watermark: Watermark | null) => boolean;
  /** Remove the watermark. Returns whether the command succeeded. */
  readonly remove: () => boolean;
}

const selectEditable = (snapshot: EditorSnapshot): boolean => snapshot.editable;

export type WatermarkEditorTarget =
  | DocxEditorInstance
  | DocxEditorRef
  | React.RefObject<DocxEditorRef | null>
  | (() => DocxEditorInstance | DocxEditorRef | null)
  | null
  | undefined;

function resolveEditorInstance(target: WatermarkEditorTarget): DocxEditorInstance | DocxEditorRef | null {
  if (!target) return null;
  if (typeof target === 'function') return resolveEditorInstance(target());
  if (typeof target === 'object' && 'current' in target) return resolveEditorInstance(target.current);
  if (typeof target === 'object' && 'getEditor' in target && typeof target.getEditor === 'function') {
    const inner = target.getEditor();
    if (inner) return inner as unknown as DocxEditorInstance;
  }
  return target as DocxEditorInstance | DocxEditorRef;
}

/**
 * Hook to inspect and manipulate document watermarks.
 *
 * @public
 */
export function useWatermark(explicitEditor?: WatermarkEditorTarget): UseWatermarkReturn {
  const contextEditor = useDocxEditor();
  const resolved = resolveEditorInstance(explicitEditor);
  const editor = (resolved as DocxEditorInstance | null) ?? contextEditor;

  const contextEditable = useEditorState(selectEditable);
  const editable = editor && typeof editor.snapshot === 'function'
    ? editor.snapshot().editable
    : contextEditable;

  const watermark = useMemo(() => {
    if (editor && typeof editor.getWatermark === 'function') {
      return editor.getWatermark();
    }
    return null;
  }, [editor]);

  const isEnabled = useMemo(() => {
    // If we have an active editor with a .can method, ask the engine
    if (editor && typeof editor.can === 'function') {
      const probe = editor.can({ type: 'setWatermark', watermark: null });
      return probe.ok;
    }
    // If an imperative ref handle is provided with .exec, allow execution
    if (resolved && typeof (resolved as DocxEditorRef).exec === 'function') {
      return true;
    }
    // Otherwise, default to editable state or true so user is not blocked
    return editable !== false;
  }, [editor, resolved, editable]);

  const apply = useCallback(
    (newWatermark: Watermark | null): boolean => {
      const active = resolveEditorInstance(explicitEditor) ?? contextEditor;
      if (active && typeof active.exec === 'function') {
        const result = active.exec({
          type: 'setWatermark',
          watermark: newWatermark,
        });
        return result.ok;
      }
      return false;
    },
    [explicitEditor, contextEditor]
  );

  const remove = useCallback((): boolean => {
    return apply(null);
  }, [apply]);

  return useMemo(
    () => ({ watermark, isEnabled, apply, remove }),
    [watermark, isEnabled, apply, remove]
  );
}
