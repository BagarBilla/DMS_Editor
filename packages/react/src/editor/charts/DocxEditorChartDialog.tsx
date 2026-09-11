// Interactive Chart Editor Dialog component for creating and updating charts.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { useDocxEditor } from '../context';
import { useTranslation } from '../../i18n';
import {
  CHART_PALETTES,
  createDefaultChartConfig,
  serializeChartConfig,
  type ChartConfig,
  type ChartSeries,
  type ChartType,
} from './types';
import { chartToPngBytes, renderChartSvg } from './chart-renderer';
import { executeImageCommand } from '@docx-editor.dev/core/editor';

export interface DocxEditorChartDialogProps {
  /** Whether the dialog is shown. */
  open: boolean;
  /** Called on Cancel, Escape, or after a successful insert/update. */
  onClose: () => void;
  /** Optional initial chart config when editing an existing chart. */
  initialConfig?: ChartConfig | null;
  /** Drawing node ID when editing an existing chart in place. */
  editDrawingNodeId?: string | null;
  className?: string;
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'var(--doc-overlay, rgba(0, 0, 0, 0.45))',
  backdropFilter: 'blur(2px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
};

const dialogStyle: CSSProperties = {
  backgroundColor: 'var(--doc-surface, #ffffff)',
  borderRadius: 12,
  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)',
  width: '100%',
  maxWidth: 960,
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  margin: 20,
  border: '1px solid var(--doc-border, #e5e7eb)',
  color: 'var(--doc-text, #111827)',
  fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
  outline: 'none',
  overflow: 'hidden',
};

const headerStyle: CSSProperties = {
  padding: '16px 24px',
  borderBottom: '1px solid var(--doc-border, #f3f4f6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const titleStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: 'var(--doc-text, #111827)',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const bodyStyle: CSSProperties = {
  padding: '20px 24px',
  display: 'flex',
  gap: 24,
  overflowY: 'auto',
  flex: 1,
  minHeight: 0,
};

const leftColStyle: CSSProperties = {
  flex: '1 1 55%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  minWidth: 0,
};

const rightColStyle: CSSProperties = {
  flex: '1 1 45%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minWidth: 0,
};

const sectionLabelStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--doc-text-muted, #6b7280)',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  marginBottom: 4,
};

const typeGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: 8,
};

const inputStyle: CSSProperties = {
  padding: '7px 10px',
  border: '1px solid var(--doc-border, #d1d5db)',
  borderRadius: 6,
  fontSize: 13,
  backgroundColor: 'var(--doc-surface, #ffffff)',
  color: 'var(--doc-text, #111827)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const previewContainerStyle: CSSProperties = {
  backgroundColor: '#f9fafb',
  border: '1px solid var(--doc-border, #e5e7eb)',
  borderRadius: 8,
  padding: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 280,
  overflow: 'hidden',
};

const tableContainerStyle: CSSProperties = {
  overflowX: 'auto',
  border: '1px solid var(--doc-border, #e5e7eb)',
  borderRadius: 6,
  maxHeight: 220,
};

const footerStyle: CSSProperties = {
  padding: '14px 24px',
  borderTop: '1px solid var(--doc-border, #f3f4f6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 10,
  backgroundColor: 'var(--doc-surface, #ffffff)',
};

const btnStyle: CSSProperties = {
  padding: '7px 18px',
  fontSize: 13,
  fontWeight: 500,
  border: '1px solid var(--doc-border, #d1d5db)',
  borderRadius: 6,
  cursor: 'pointer',
  backgroundColor: 'var(--doc-surface, #ffffff)',
  color: 'var(--doc-text, #111827)',
};

const CHART_TYPE_ITEMS: readonly { readonly type: ChartType; readonly label: string; readonly icon: string }[] = [
  { type: 'column', label: 'Column', icon: '📊' },
  { type: 'bar', label: 'Bar', icon: '📶' },
  { type: 'line', label: 'Line', icon: '📈' },
  { type: 'area', label: 'Area', icon: '🏔️' },
  { type: 'pie', label: 'Pie', icon: '🥧' },
  { type: 'donut', label: 'Donut', icon: '🍩' },
];

export function DocxEditorChartDialog({
  open,
  onClose,
  initialConfig,
  editDrawingNodeId,
  className,
}: DocxEditorChartDialogProps): ReactElement | null {
  const { t } = useTranslation();
  const editor = useDocxEditor();
  const [busy, setBusy] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [chartType, setChartType] = useState<ChartType>('column');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<ChartSeries[]>([]);
  const [palette, setPalette] = useState('vibrant');
  const [showLegend, setShowLegend] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showValues, setShowValues] = useState(false);

  // Initialize form state whenever dialog opens
  useEffect(() => {
    if (!open) return;
    const base = initialConfig ?? createDefaultChartConfig();
    setChartType(base.chartType);
    setTitle(base.title);
    setCategories([...base.categories]);
    setSeries(base.series.map((s) => ({ ...s, data: [...s.data] })));
    setPalette(base.palette || 'vibrant');
    setShowLegend(base.options.showLegend !== false);
    setShowGrid(base.options.showGrid !== false);
    setShowValues(base.options.showValues ?? false);
    panelRef.current?.focus();
  }, [open, initialConfig]);

  // Current live config
  const currentConfig: ChartConfig = useMemo(
    () => ({
      version: 1,
      chartType,
      title,
      categories,
      series,
      options: {
        showLegend,
        showGrid,
        showValues,
      },
      palette,
      widthPoints: initialConfig?.widthPoints ?? 420,
      heightPoints: initialConfig?.heightPoints ?? 260,
    }),
    [chartType, title, categories, series, showLegend, showGrid, showValues, palette, initialConfig]
  );

  // Live SVG preview string
  const previewSvg = useMemo(() => {
    try {
      return renderChartSvg(currentConfig, { width: 480, height: 300 });
    } catch {
      return '<svg width="480" height="300"><text x="240" y="150" text-anchor="middle">Preview Error</text></svg>';
    }
  }, [currentConfig]);

  // When switching chart type between circular and rectangular
  const handleTypeSelect = (nextType: ChartType) => {
    setChartType(nextType);
    if ((nextType === 'pie' || nextType === 'donut') && series.length > 1) {
      // Keep first series for pie/donut
      setSeries([series[0]!]);
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    const next = [...categories];
    next[index] = value;
    setCategories(next);
  };

  const handleAddCategory = () => {
    setCategories([...categories, `Item ${categories.length + 1}`]);
    setSeries(series.map((s) => ({ ...s, data: [...s.data, 20] })));
  };

  const handleRemoveCategory = (index: number) => {
    if (categories.length <= 1) return;
    setCategories(categories.filter((_, i) => i !== index));
    setSeries(series.map((s) => ({ ...s, data: s.data.filter((_, i) => i !== index) })));
  };

  const handleSeriesNameChange = (sIndex: number, name: string) => {
    const next = [...series];
    next[sIndex] = { ...next[sIndex]!, name };
    setSeries(next);
  };

  const handleValueChange = (sIndex: number, cIndex: number, raw: string) => {
    const num = parseFloat(raw) || 0;
    const next = [...series];
    const sData = [...next[sIndex]!.data];
    sData[cIndex] = num;
    next[sIndex] = { ...next[sIndex]!, data: sData };
    setSeries(next);
  };

  const handleAddSeries = () => {
    if (chartType === 'pie' || chartType === 'donut') return;
    const newSeries: ChartSeries = {
      name: `Series ${series.length + 1}`,
      data: categories.map(() => Math.floor(Math.random() * 80) + 10),
    };
    setSeries([...series, newSeries]);
  };

  const handleRemoveSeries = (sIndex: number) => {
    if (series.length <= 1) return;
    setSeries(series.filter((_, i) => i !== sIndex));
  };

  const isEditing = Boolean(editDrawingNodeId);

  const handleApply = useCallback(async () => {
    if (!editor || busy) return;
    setBusy(true);

    try {
      const pngBytes = await chartToPngBytes(currentConfig, { width: 800, height: 500 });
      const chartMeta = serializeChartConfig(currentConfig);
      const chartTitle = `Chart: ${currentConfig.title || currentConfig.chartType}`;

      if (isEditing && editDrawingNodeId) {
        const cmd = {
          type: 'replaceImage' as const,
          drawingNodeId: editDrawingNodeId,
          data: pngBytes,
          mime: 'image/png' as const,
          title: chartTitle,
          description: chartMeta,
        };
        await executeImageCommand(editor, cmd);
      } else {
        const cmd = {
          type: 'insertImage' as const,
          data: pngBytes,
          mime: 'image/png' as const,
          widthPoints: currentConfig.widthPoints ?? 420,
          heightPoints: currentConfig.heightPoints ?? 260,
          title: chartTitle,
          description: chartMeta,
        };
        await executeImageCommand(editor, cmd);
      }

      onClose();
      editor.focus();
    } catch (err) {
      console.error('Failed to insert or update chart:', err);
    } finally {
      setBusy(false);
    }
  }, [editor, busy, currentConfig, isEditing, editDrawingNodeId, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose]
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
        aria-labelledby="chart-dialog-title"
        tabIndex={-1}
        className={className}
        style={dialogStyle}
        onKeyDown={handleKeyDown}
      >
        {/* Dialog Header */}
        <div style={headerStyle}>
          <div id="chart-dialog-title" style={titleStyle}>
            <span>📊</span>
            <span>{isEditing ? t('dialogs.chart.update') : t('dialogs.chart.title')}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer',
              color: '#6b7280',
              padding: 4,
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Dialog Body */}
        <div style={bodyStyle}>
          {/* Left Column: Configuration Controls & Data Grid */}
          <div style={leftColStyle}>
            {/* Chart Type Selector */}
            <div>
              <div style={sectionLabelStyle}>{t('dialogs.chart.chartType')}</div>
              <div style={typeGridStyle}>
                {CHART_TYPE_ITEMS.map((item) => {
                  const isSelected = chartType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => handleTypeSelect(item.type)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        padding: '8px 4px',
                        border: isSelected
                          ? '2px solid var(--doc-primary, #2563eb)'
                          : '1px solid var(--doc-border, #e5e7eb)',
                        borderRadius: 6,
                        backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.06)' : '#ffffff',
                        cursor: 'pointer',
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? 'var(--doc-primary, #2563eb)' : '#374151',
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{item.icon}</span>
                      <span style={{ fontSize: 11 }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <div style={sectionLabelStyle}>{t('dialogs.chart.chartTitle')}</div>
              <input
                type="text"
                style={inputStyle}
                value={title}
                placeholder="e.g., Annual Revenue Breakdown"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Spreadsheet Data Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={sectionLabelStyle}>{t('dialogs.chart.data')}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    style={{
                      ...btnStyle,
                      padding: '3px 8px',
                      fontSize: 11,
                      backgroundColor: '#f3f4f6',
                    }}
                  >
                    + {t('dialogs.chart.addCategory')}
                  </button>
                  {chartType !== 'pie' && chartType !== 'donut' && (
                    <button
                      type="button"
                      onClick={handleAddSeries}
                      style={{
                        ...btnStyle,
                        padding: '3px 8px',
                        fontSize: 11,
                        backgroundColor: '#f3f4f6',
                      }}
                    >
                      + {t('dialogs.chart.addSeries')}
                    </button>
                  )}
                </div>
              </div>

              <div style={tableContainerStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '6px 8px', textAlign: 'left', minWidth: 100, color: '#4b5563' }}>
                        {t('dialogs.chart.categories')}
                      </th>
                      {series.map((s, sIdx) => (
                        <th key={sIdx} style={{ padding: '6px 8px', textAlign: 'left', minWidth: 90 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <input
                              type="text"
                              value={s.name}
                              onChange={(e) => handleSeriesNameChange(sIdx, e.target.value)}
                              style={{
                                ...inputStyle,
                                padding: '3px 6px',
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            />
                            {series.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSeries(sIdx)}
                                title={t('dialogs.chart.removeSeries')}
                                style={{
                                  border: 'none',
                                  background: 'none',
                                  cursor: 'pointer',
                                  color: '#9ca3af',
                                  fontSize: 12,
                                }}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </th>
                      ))}
                      <th style={{ width: 28 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, cIdx) => (
                      <tr key={cIdx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '4px 6px' }}>
                          <input
                            type="text"
                            value={cat}
                            onChange={(e) => handleCategoryChange(cIdx, e.target.value)}
                            style={{ ...inputStyle, padding: '3px 6px', fontSize: 11 }}
                          />
                        </td>
                        {series.map((s, sIdx) => (
                          <td key={sIdx} style={{ padding: '4px 6px' }}>
                            <input
                              type="number"
                              value={s.data[cIdx] ?? 0}
                              onChange={(e) => handleValueChange(sIdx, cIdx, e.target.value)}
                              style={{
                                ...inputStyle,
                                padding: '3px 6px',
                                fontSize: 11,
                                textAlign: 'right',
                              }}
                            />
                          </td>
                        ))}
                        <td style={{ padding: '4px 2px', textAlign: 'center' }}>
                          {categories.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveCategory(cIdx)}
                              title={t('dialogs.chart.removeCategory')}
                              style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                color: '#9ca3af',
                                fontSize: 12,
                              }}
                            >
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Color Palette & Options */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={sectionLabelStyle}>{t('dialogs.chart.palette')}</div>
                <select
                  style={inputStyle}
                  value={palette}
                  onChange={(e) => setPalette(e.target.value)}
                >
                  {CHART_PALETTES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <div style={sectionLabelStyle}>{t('dialogs.chart.options')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={showLegend}
                      onChange={(e) => setShowLegend(e.target.checked)}
                    />
                    <span>{t('dialogs.chart.showLegend')}</span>
                  </label>
                  {chartType !== 'pie' && chartType !== 'donut' && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={showGrid}
                        onChange={(e) => setShowGrid(e.target.checked)}
                      />
                      <span>{t('dialogs.chart.showGrid')}</span>
                    </label>
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={showValues}
                      onChange={(e) => setShowValues(e.target.checked)}
                    />
                    <span>{t('dialogs.chart.showValues')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview */}
          <div style={rightColStyle}>
            <div style={sectionLabelStyle}>Live Preview</div>
            <div
              style={previewContainerStyle}
              dangerouslySetInnerHTML={{ __html: previewSvg }}
            />
            <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>
              Renders as high-resolution native graphic with round-trip metadata.
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div style={footerStyle}>
          <button type="button" style={btnStyle} onClick={onClose} disabled={busy}>
            {t('dialogs.chart.cancel')}
          </button>
          <button
            type="button"
            style={{
              ...btnStyle,
              backgroundColor: 'var(--doc-primary, #2563eb)',
              color: 'var(--doc-on-primary, #ffffff)',
              borderColor: 'var(--doc-primary, #2563eb)',
              opacity: busy ? 0.6 : 1,
            }}
            disabled={busy}
            onClick={handleApply}
          >
            {busy ? 'Rendering...' : isEditing ? t('dialogs.chart.update') : t('dialogs.chart.insert')}
          </button>
        </div>
      </div>
    </div>
  );
}
