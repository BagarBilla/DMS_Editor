// Microsoft Word-like bottom status bar showing page count, line/col numbers, word count, and zoom controls.

import { useCallback, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { useTranslation } from '../i18n';
import { useDocxEditor } from './context';
import { useEditorCaretPosition } from './useEditorCaretPosition';
import { useZoom } from './useZoom';

/** Props for `DocxEditorStatusBar`. @public */
export interface DocxEditorStatusBarProps {
  /** Additional CSS class names. */
  className?: string;
  /** Inline style overrides. */
  style?: CSSProperties;
  /** Whether to show the word count item (default true). */
  showWordCount?: boolean;
  /** Whether to show line and column number (default true). */
  showLineCol?: boolean;
  /** Whether to show zoom controls on the right (default true). */
  showZoom?: boolean;
  /** Optional custom translation / string resolver. */
  t?: (key: string, params?: Record<string, string | number>) => string;
}

const BAR_CONTAINER_STYLE: CSSProperties = {
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 28,
  minHeight: 28,
  padding: '0 12px',
  backgroundColor: 'var(--doc-surface)',
  borderTop: '1px solid var(--doc-border)',
  color: 'var(--doc-text-muted)',
  fontSize: 12,
  fontFamily: 'inherit',
  userSelect: 'none',
  zIndex: 20,
  position: 'relative',
};

const SECTION_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

const ITEM_BUTTON_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 6px',
  border: 'none',
  borderRadius: 3,
  backgroundColor: 'transparent',
  color: 'inherit',
  font: 'inherit',
  fontSize: 'inherit',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease',
  outline: 'none',
  lineHeight: '18px',
};

const ITEM_TEXT_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 6px',
  lineHeight: '18px',
};

const SEPARATOR_STYLE: CSSProperties = {
  width: 1,
  height: 12,
  backgroundColor: 'var(--doc-border)',
  margin: '0 4px',
};

const ZOOM_BUTTON_STYLE: CSSProperties = {
  ...ITEM_BUTTON_STYLE,
  width: 22,
  height: 22,
  padding: 0,
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 600,
};

function StatusButton({
  children,
  onClick,
  title,
  ariaLabel,
  style,
}: {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      style={{ ...ITEM_BUTTON_STYLE, ...style }}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel ?? title}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--doc-bg-hover)';
        e.currentTarget.style.color = 'var(--doc-text)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'inherit';
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--doc-bg-hover)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {children}
    </button>
  );
}

/**
 * Word-like bottom status bar showing page count, cursor line/column, word count, and zoom controls.
 *
 * @public
 */
export function DocxEditorStatusBar({
  className,
  style,
  showWordCount = true,
  showLineCol = true,
  showZoom = true,
  t: customT,
}: DocxEditorStatusBarProps) {
  const editor = useDocxEditor();
  const { t: i18nT } = useTranslation();
  const t = customT ?? i18nT;
  const caret = useEditorCaretPosition();
  const { zoom, zoomIn, zoomOut, reset: resetZoom, isFit, fitToWidth } = useZoom();

  const handlePageClick = useCallback(() => {
    if (editor && caret.pageNumber >= 1) {
      editor.scrollToPage(caret.pageNumber);
    }
  }, [editor, caret.pageNumber]);

  const pageLabel = t
    ? `Page ${caret.pageNumber} of ${caret.totalPages}`
    : `Page ${caret.pageNumber} of ${caret.totalPages}`;

  const wordLabel =
    caret.selectedWordCount > 0
      ? `${caret.selectedWordCount} / ${caret.wordCount} words`
      : `${caret.wordCount} ${caret.wordCount === 1 ? 'word' : 'words'}`;

  const lineColLabel = `Line ${caret.lineNumber}, Col ${caret.columnNumber}`;
  const zoomPercent = `${Math.round(zoom * 100)}%`;

  return (
    <footer
      className={`docx-editor-statusbar${className ? ` ${className}` : ''}`}
      style={{ ...BAR_CONTAINER_STYLE, ...style }}
      role="status"
      aria-label="Editor Status Bar"
    >
      <div style={SECTION_STYLE}>
        <StatusButton
          onClick={handlePageClick}
          title="Scroll to current page"
          ariaLabel={pageLabel}
        >
          {pageLabel}
        </StatusButton>

        {showWordCount && (
          <>
            <span style={SEPARATOR_STYLE} aria-hidden="true" />
            <span style={ITEM_TEXT_STYLE} title="Total word count in document">
              {wordLabel}
            </span>
          </>
        )}

        {showLineCol && (
          <>
            <span style={SEPARATOR_STYLE} aria-hidden="true" />
            <span style={ITEM_TEXT_STYLE} title="Cursor line and column position on current page">
              {lineColLabel}
            </span>
          </>
        )}
      </div>

      {showZoom && (
        <div style={SECTION_STYLE}>
          <button
            type="button"
            style={{
              ...ITEM_BUTTON_STYLE,
              fontWeight: isFit ? 600 : 'normal',
              color: isFit ? 'var(--doc-primary)' : 'inherit',
            }}
            onClick={fitToWidth}
            title="Fit to width"
            aria-pressed={isFit}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--doc-bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Fit
          </button>
          <span style={SEPARATOR_STYLE} aria-hidden="true" />
          <button
            type="button"
            style={ZOOM_BUTTON_STYLE}
            onClick={zoomOut}
            title="Zoom out"
            aria-label="Zoom out"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--doc-bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            -
          </button>
          <StatusButton onClick={resetZoom} title="Reset zoom to 100%" ariaLabel="Current zoom level">
            {zoomPercent}
          </StatusButton>
          <button
            type="button"
            style={ZOOM_BUTTON_STYLE}
            onClick={zoomIn}
            title="Zoom in"
            aria-label="Zoom in"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--doc-bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            +
          </button>
        </div>
      )}
    </footer>
  );
}
