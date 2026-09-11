// Where the caret is in layout coordinates and document metrics: page, total pages, line, column, and word count.

import { useCallback, useRef, useSyncExternalStore } from 'react';
import type { Editor } from '@docx-editor.dev/core/contracts/editor';
import { useDocxEditor } from './context';

/**
 * Metric position of the caret and document statistics.
 *
 * @public
 */
export interface EditorCaretPosition {
  /** 1-based page number containing the caret. */
  readonly pageNumber: number;
  /** Total number of pages in the document. */
  readonly totalPages: number;
  /** 1-based line number of the caret on the current page. */
  readonly lineNumber: number;
  /** 1-based column number (character offset) on the current line. */
  readonly columnNumber: number;
  /** Total number of words in the document body. */
  readonly wordCount: number;
  /** Number of words in the active selection, if text is selected. */
  readonly selectedWordCount: number;
}

const DEFAULT_POSITION: EditorCaretPosition = {
  pageNumber: 1,
  totalPages: 1,
  lineNumber: 1,
  columnNumber: 1,
  wordCount: 0,
  selectedWordCount: 0,
};

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function calculatePosition(editor: Editor | null): EditorCaretPosition {
  if (!editor) return DEFAULT_POSITION;

  const metrics = editor.getCaretPosition?.() ?? null;
  const pageNumber = metrics?.pageNumber ?? editor.getCurrentPage('caret') ?? 1;
  const totalPages = metrics?.totalPages ?? editor.getTotalPages() ?? 1;
  const lineNumber = metrics?.lineNumber ?? 1;
  const columnNumber = metrics?.columnNumber ?? 1;

  let wordCount = 0;
  try {
    const paragraphs = editor.query({ type: 'paragraphs' });
    for (const p of paragraphs) {
      if (p.text) wordCount += countWords(p.text);
    }
  } catch {
    wordCount = 0;
  }

  let selectedWordCount = 0;
  try {
    const selectedText = editor.query({ type: 'selectedText' });
    if (selectedText) {
      selectedWordCount = countWords(selectedText);
    }
  } catch {
    selectedWordCount = 0;
  }

  return {
    pageNumber,
    totalPages: Math.max(1, totalPages),
    lineNumber,
    columnNumber,
    wordCount,
    selectedWordCount,
  };
}

function samePosition(a: EditorCaretPosition, b: EditorCaretPosition): boolean {
  return (
    a.pageNumber === b.pageNumber &&
    a.totalPages === b.totalPages &&
    a.lineNumber === b.lineNumber &&
    a.columnNumber === b.columnNumber &&
    a.wordCount === b.wordCount &&
    a.selectedWordCount === b.selectedWordCount
  );
}

/**
 * Read the current caret position metrics and word count from the active editor.
 *
 * Updates reactively on caret movement, selection changes, and document edits.
 * Reference-stable when values have not changed.
 *
 * @public
 */
export function useEditorCaretPosition(): EditorCaretPosition {
  const editor = useDocxEditor();
  const cached = useRef<EditorCaretPosition>(DEFAULT_POSITION);

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!editor) return () => undefined;
      const offSelection = editor.on('selectionChange', onChange);
      const offChange = editor.on('change', onChange);
      return () => {
        offSelection();
        offChange();
      };
    },
    [editor]
  );

  const read = useCallback((): EditorCaretPosition => {
    const next = calculatePosition(editor);
    if (samePosition(cached.current, next)) {
      return cached.current;
    }
    cached.current = next;
    return next;
  }, [editor]);

  return useSyncExternalStore(subscribe, read, () => DEFAULT_POSITION);
}
