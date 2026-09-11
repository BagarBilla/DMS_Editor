import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { useDocxEditor } from './context';
import { useTranslation } from '../i18n';

export interface DocxEditorSplitCellDialogProps {
  /** Whether the dialog is shown. The host owns this state. */
  open: boolean;
  /** Called on Cancel, Escape, overlay click, and after a successful split. */
  onClose: () => void;
  className?: string;
  initialCols?: number;
  initialRows?: number;
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'var(--doc-overlay, rgba(0, 0, 0, 0.4))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
};

const dialogStyle: CSSProperties = {
  backgroundColor: 'var(--doc-surface, #ffffff)',
  borderRadius: 8,
  boxShadow: '0 4px 20px var(--doc-shadow, rgba(0, 0, 0, 0.15))',
  minWidth: 320,
  maxWidth: 380,
  width: '100%',
  margin: 20,
  border: '1px solid var(--doc-border, #e5e7eb)',
  color: 'var(--doc-text, #111827)',
  outline: 'none',
};

const headerStyle: CSSProperties = {
  padding: '16px 20px 12px',
  borderBottom: '1px solid var(--doc-border, #e5e7eb)',
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--doc-text, #111827)',
};

const bodyStyle: CSSProperties = {
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
};

const labelStyle: CSSProperties = {
  fontSize: 13,
  color: 'var(--doc-text, #374151)',
};

const inputStyle: CSSProperties = {
  width: 72,
  padding: '6px 8px',
  border: '1px solid var(--doc-border, #d1d5db)',
  borderRadius: 4,
  fontSize: 13,
  backgroundColor: 'var(--doc-surface, #ffffff)',
  color: 'var(--doc-text, #111827)',
  textAlign: 'right',
};

const footerStyle: CSSProperties = {
  padding: '12px 20px 16px',
  borderTop: '1px solid var(--doc-border, #e5e7eb)',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
};

const btnStyle: CSSProperties = {
  padding: '6px 16px',
  fontSize: 13,
  border: '1px solid var(--doc-border, #d1d5db)',
  borderRadius: 4,
  cursor: 'pointer',
  backgroundColor: 'var(--doc-surface, #ffffff)',
  color: 'var(--doc-text, #111827)',
};

/**
 * Split Cell dialog: allows configuring number of columns and rows to split a table cell into.
 *
 * @public
 */
export function DocxEditorSplitCellDialog({
  open,
  onClose,
  className,
  initialCols = 2,
  initialRows = 1,
}: DocxEditorSplitCellDialogProps): ReactElement | null {
  const { t } = useTranslation();
  const editor = useDocxEditor();
  const [cols, setCols] = useState(initialCols);
  const [rows, setRows] = useState(initialRows);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const config = editor?.query({ type: 'splitCellConfig' });
  const maxCols = config?.maxCols ?? 63;
  const maxRows = config?.maxRows ?? 64;

  useEffect(() => {
    if (open) {
      setCols(initialCols);
      setRows(initialRows);
      panelRef.current?.focus();
    }
  }, [open, initialCols, initialRows]);

  const isValid =
    Number.isInteger(cols) &&
    Number.isInteger(rows) &&
    cols >= 1 &&
    rows >= 1 &&
    cols <= maxCols &&
    rows <= maxRows &&
    (cols > 1 || rows > 1);

  const handleApply = useCallback(() => {
    if (!isValid || !editor) return;
    const canSplit = editor.can({ type: 'splitCell', rows, cols });
    if (canSplit) {
      editor.exec({ type: 'splitCell', rows, cols });
      onClose();
    }
  }, [editor, isValid, rows, cols, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleApply();
      }
    },
    [onClose, handleApply]
  );

  if (!open) return null;

  return (
    <div
      style={overlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="split-cell-dialog-title"
        tabIndex={-1}
        className={className}
        style={dialogStyle}
        onKeyDown={handleKeyDown}
      >
        <div id="split-cell-dialog-title" style={headerStyle}>
          {t('dialogs.splitCell.title')}
        </div>

        <div style={bodyStyle}>
          <div style={rowStyle}>
            <label htmlFor="split-cell-cols-input" style={labelStyle}>
              {t('dialogs.splitCell.numberOfColumns')}
            </label>
            <input
              id="split-cell-cols-input"
              type="number"
              min={1}
              max={maxCols}
              value={cols}
              style={inputStyle}
              onChange={(e) => setCols(parseInt(e.target.value, 10) || 1)}
            />
          </div>

          <div style={rowStyle}>
            <label htmlFor="split-cell-rows-input" style={labelStyle}>
              {t('dialogs.splitCell.numberOfRows')}
            </label>
            <input
              id="split-cell-rows-input"
              type="number"
              min={1}
              max={maxRows}
              value={rows}
              style={inputStyle}
              onChange={(e) => setRows(parseInt(e.target.value, 10) || 1)}
            />
          </div>
        </div>

        <div style={footerStyle}>
          <button type="button" style={btnStyle} onClick={onClose}>
            {t('dialogs.splitCell.cancel')}
          </button>
          <button
            type="button"
            style={{
              ...btnStyle,
              backgroundColor: 'var(--doc-primary, #2563eb)',
              color: 'var(--doc-on-primary, #ffffff)',
              borderColor: 'var(--doc-primary, #2563eb)',
              opacity: isValid ? 1 : 0.5,
            }}
            disabled={!isValid}
            onClick={handleApply}
          >
            {t('dialogs.splitCell.ok')}
          </button>
        </div>
      </div>
    </div>
  );
}
