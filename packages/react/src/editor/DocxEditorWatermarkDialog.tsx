// Watermark Dialog component: configure text, layout (horizontal, vertical, parallel), and size adjustments with real-time preview.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import type { Watermark } from '@docx-editor.dev/core/contracts/types';
import { useWatermark, type WatermarkEditorTarget } from './useWatermark';
import { DEFAULT_WATERMARK_PRESETS } from '../lib/watermark';

export interface DocxEditorWatermarkDialogProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  editor?: WatermarkEditorTarget;
}

const FONTS = [
  'Calibri',
  'Arial',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Trebuchet MS',
  'Impact',
  'Courier New',
];

const PRESET_COLORS = [
  '#C0C0C0', // Classic subtle gray
  '#9CA3AF', // Medium gray
  '#4B5563', // Dark gray
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
];

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  backdropFilter: 'blur(2px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  animation: 'docxFadeIn 0.15s ease-out',
};

const dialogStyle: CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08)',
  width: '100%',
  maxWidth: 620,
  maxHeight: '92vh',
  overflowY: 'auto',
  margin: 16,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, sans-serif',
  border: '1px solid #e5e7eb',
  color: '#1f2937',
};

const headerStyle: CSSProperties = {
  padding: '16px 22px',
  borderBottom: '1px solid #f3f4f6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const titleStyle: CSSProperties = {
  fontSize: 17,
  fontWeight: 600,
  color: '#111827',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const bodyStyle: CSSProperties = {
  padding: '18px 22px',
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  marginBottom: 8,
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};

const inputStyle: CSSProperties = {
  flex: 1,
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 6,
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.15s',
  backgroundColor: '#fff',
  color: '#111827',
};

const footerStyle: CSSProperties = {
  padding: '14px 22px',
  borderTop: '1px solid #f3f4f6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f9fafb',
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
};

const btnBaseStyle: CSSProperties = {
  padding: '8px 18px',
  fontSize: 13,
  fontWeight: 600,
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  border: 'none',
};

export function DocxEditorWatermarkDialog({
  open,
  onClose,
  className,
  editor,
}: DocxEditorWatermarkDialogProps): ReactElement | null {
  const { watermark, isEnabled, apply, remove } = useWatermark(editor);

  // Form states
  const [enabled, setEnabled] = useState(true);
  const [text, setText] = useState('CONFIDENTIAL');
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'parallel'>('parallel');
  const [font, setFont] = useState('Calibri');
  const [color, setColor] = useState('#C0C0C0');
  const [isAutoFontSize, setIsAutoFontSize] = useState(true);
  const [fontSize, setFontSize] = useState(54);
  const [semitransparent, setSemitransparent] = useState(true);
  const [opacity, setOpacity] = useState(0.25);

  const panelRef = useRef<HTMLDivElement | null>(null);

  // Initialize or synchronize when dialog opens
  useEffect(() => {
    if (!open) return;
    if (watermark && watermark.text) {
      setEnabled(true);
      setText(watermark.text);
      if (watermark.layout === 'horizontal' || watermark.layout === 'vertical') {
        setLayout(watermark.layout);
      } else {
        setLayout('parallel');
      }
      if (watermark.font) setFont(watermark.font);
      if (watermark.color) setColor(watermark.color);
      if (watermark.fontSize && watermark.fontSize > 0) {
        setIsAutoFontSize(false);
        setFontSize(watermark.fontSize);
      } else {
        setIsAutoFontSize(true);
      }
      if (watermark.semitransparent !== undefined) {
        setSemitransparent(watermark.semitransparent);
      }
      if (watermark.opacity !== undefined) {
        setOpacity(watermark.opacity);
      }
    } else {
      setEnabled(true);
      setText('CONFIDENTIAL');
      setLayout('parallel');
      setIsAutoFontSize(true);
      setFontSize(54);
      setColor('#C0C0C0');
      setSemitransparent(true);
      setOpacity(0.25);
    }
  }, [open, watermark]);

  // Handle escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleApply = useCallback(() => {
    if (!enabled || !text.trim()) {
      remove();
    } else {
      const newWatermark: Watermark = {
        kind: 'text',
        text: text.trim(),
        layout,
        font,
        color,
        semitransparent,
        opacity: semitransparent ? opacity : 1,
        ...(isAutoFontSize ? {} : { fontSize }),
      };
      apply(newWatermark);
    }
    onClose();
  }, [enabled, text, layout, font, color, semitransparent, opacity, isAutoFontSize, fontSize, apply, remove, onClose]);

  const handleRemove = useCallback(() => {
    remove();
    onClose();
  }, [remove, onClose]);

  // Preview rotation angle
  const previewAngle = useMemo(() => {
    if (layout === 'horizontal') return 0;
    if (layout === 'vertical') return -90;
    return -45; // parallel / diagonal
  }, [layout]);

  if (!open) return null;

  return (
    <div
      style={overlayStyle}
      onClick={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div ref={panelRef} style={dialogStyle} className={className} role="dialog" aria-modal="true" aria-labelledby="watermark-dialog-title">
        {/* Header */}
        <div style={headerStyle}>
          <div id="watermark-dialog-title" style={titleStyle}>
            <span style={{ fontSize: 20 }}>💧</span>
            <span>Insert Watermark</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
              color: '#9ca3af',
              padding: '4px 8px',
              borderRadius: 4,
            }}
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={bodyStyle}>
          {/* Top Mode Selector: Watermark On / Off */}
          <div style={{ display: 'flex', gap: 12, paddingBottom: 6, borderBottom: '1px solid #f3f4f6' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              <input
                type="radio"
                name="wm-mode"
                checked={enabled}
                onChange={() => setEnabled(true)}
              />
              Text Watermark
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#6b7280' }}>
              <input
                type="radio"
                name="wm-mode"
                checked={!enabled}
                onChange={() => setEnabled(false)}
              />
              No Watermark
            </label>
          </div>

          {enabled && (
            <div style={{ display: 'flex', gap: 20 }}>
              {/* Left Column: Form Controls */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Text Input & Quick Preset Chips */}
                <div>
                  <div style={sectionTitleStyle}>Watermark Text</div>
                  <input
                    type="text"
                    value={text}
                    placeholder="e.g. CONFIDENTIAL"
                    onChange={(e) => setText(e.target.value)}
                    style={inputStyle}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {DEFAULT_WATERMARK_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setText(preset)}
                        style={{
                          fontSize: 11,
                          padding: '3px 8px',
                          borderRadius: 12,
                          border: text === preset ? '1px solid #2563eb' : '1px solid #e5e7eb',
                          backgroundColor: text === preset ? '#eff6ff' : '#f9fafb',
                          color: text === preset ? '#1d4ed8' : '#4b5563',
                          cursor: 'pointer',
                          fontWeight: text === preset ? 600 : 500,
                        }}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orientation / Layout: Horizontal, Vertical, Parallel */}
                <div>
                  <div style={sectionTitleStyle}>Orientation / Layout</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {[
                      { id: 'horizontal', label: 'Horizontal', icon: '↔', desc: '0° across page' },
                      { id: 'vertical', label: 'Vertical', icon: '↕', desc: '90° vertical stack' },
                      { id: 'parallel', label: 'Parallel', icon: '⤢', desc: 'Diagonal angled' },
                    ].map((item) => {
                      const isSelected = layout === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setLayout(item.id as 'horizontal' | 'vertical' | 'parallel')}
                          style={{
                            padding: '10px 8px',
                            borderRadius: 8,
                            border: isSelected ? '2px solid #2563eb' : '1px solid #e5e7eb',
                            backgroundColor: isSelected ? '#eff6ff' : '#fff',
                            cursor: 'pointer',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span style={{ fontSize: 18, color: isSelected ? '#2563eb' : '#6b7280' }}>
                            {item.icon}
                          </span>
                          <span style={{ fontSize: 13, fontWeight: isSelected ? 700 : 600, color: isSelected ? '#1d4ed8' : '#374151' }}>
                            {item.label}
                          </span>
                          <span style={{ fontSize: 10, color: '#9ca3af' }}>{item.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Controls */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={sectionTitleStyle}>Adjust Size</div>
                    <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', color: '#4b5563' }}>
                      <input
                        type="checkbox"
                        checked={isAutoFontSize}
                        onChange={(e) => setIsAutoFontSize(e.target.checked)}
                      />
                      Auto-fit Size
                    </label>
                  </div>

                  {!isAutoFontSize && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#f9fafb', padding: 10, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <input
                          type="range"
                          min={24}
                          max={144}
                          step={2}
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          style={{ flex: 1, cursor: 'pointer' }}
                        />
                        <div style={{ minWidth: 50, textAlign: 'right', fontWeight: 600, fontSize: 13, color: '#1f2937' }}>
                          {fontSize} pt
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {[36, 48, 54, 72, 96, 120].map((sizeVal) => (
                          <button
                            key={sizeVal}
                            type="button"
                            onClick={() => setFontSize(sizeVal)}
                            style={{
                              flex: 1,
                              padding: '2px 0',
                              fontSize: 11,
                              borderRadius: 4,
                              border: fontSize === sizeVal ? '1px solid #2563eb' : '1px solid #d1d5db',
                              backgroundColor: fontSize === sizeVal ? '#dbeafe' : '#fff',
                              color: fontSize === sizeVal ? '#1e40af' : '#4b5563',
                              cursor: 'pointer',
                              fontWeight: fontSize === sizeVal ? 600 : 500,
                            }}
                          >
                            {sizeVal}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Font, Color & Opacity */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {/* Font Family */}
                  <div>
                    <div style={sectionTitleStyle}>Font</div>
                    <select
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      style={{ ...inputStyle, width: '100%', padding: '6px 8px' }}
                    >
                      {FONTS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Color Picker & Swatches */}
                  <div>
                    <div style={sectionTitleStyle}>Color</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="color"
                        value={color.length === 7 ? color : '#C0C0C0'}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ width: 36, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0 }}
                      />
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {PRESET_COLORS.slice(0, 5).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              backgroundColor: c,
                              border: color === c ? '2px solid #2563eb' : '1px solid #d1d5db',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opacity / Semitransparent */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#374151' }}>
                    <input
                      type="checkbox"
                      checked={semitransparent}
                      onChange={(e) => setSemitransparent(e.target.checked)}
                    />
                    Semitransparent
                  </label>
                  {semitransparent && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>Opacity:</span>
                      <input
                        type="range"
                        min={0.08}
                        max={0.8}
                        step={0.02}
                        value={opacity}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                        style={{ width: 90, cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 600, width: 32, textAlign: 'right' }}>
                        {Math.round(opacity * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Live Interactive Miniature Preview */}
              <div style={{ width: 170, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ ...sectionTitleStyle, alignSelf: 'flex-start' }}>Preview</div>
                <div
                  style={{
                    width: 160,
                    height: 220,
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: 4,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Faux lines of text in the background */}
                  <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.15 }}>
                    <div style={{ width: '60%', height: 7, backgroundColor: '#374151', borderRadius: 2 }} />
                    <div style={{ width: '100%', height: 4, backgroundColor: '#374151', borderRadius: 2 }} />
                    <div style={{ width: '90%', height: 4, backgroundColor: '#374151', borderRadius: 2 }} />
                    <div style={{ width: '95%', height: 4, backgroundColor: '#374151', borderRadius: 2 }} />
                    <div style={{ width: '70%', height: 4, backgroundColor: '#374151', borderRadius: 2 }} />
                    <div style={{ width: '100%', height: 4, backgroundColor: '#374151', borderRadius: 2, marginTop: 4 }} />
                    <div style={{ width: '85%', height: 4, backgroundColor: '#374151', borderRadius: 2 }} />
                    <div style={{ width: '92%', height: 4, backgroundColor: '#374151', borderRadius: 2 }} />
                    <div style={{ width: '65%', height: 4, backgroundColor: '#374151', borderRadius: 2 }} />
                  </div>

                  {/* Watermark text preview */}
                  <div
                    style={{
                      transform: `rotate(${previewAngle}deg)`,
                      transformOrigin: 'center center',
                      color: color,
                      fontFamily: font,
                      fontWeight: 'bold',
                      fontSize: isAutoFontSize
                        ? Math.max(8, Math.min(22, Math.round(180 / Math.max(text.length, 1))))
                        : Math.max(8, Math.round(fontSize * 0.22)),
                      opacity: semitransparent ? opacity : 1,
                      whiteSpace: 'nowrap',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      textAlign: 'center',
                      zIndex: 2,
                    }}
                  >
                    {text || 'WATERMARK'}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, textAlign: 'center' }}>
                  Layout: <strong>{layout}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={footerStyle}>
          <div>
            {watermark && watermark.text ? (
              <button
                type="button"
                onClick={handleRemove}
                style={{
                  ...btnBaseStyle,
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                }}
              >
                Remove Watermark
              </button>
            ) : null}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                ...btnBaseStyle,
                backgroundColor: '#fff',
                color: '#4b5563',
                border: '1px solid #d1d5db',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={enabled ? text.trim().length === 0 : false}
              style={{
                ...btnBaseStyle,
                backgroundColor: '#2563eb',
                color: '#fff',
                opacity: (enabled && text.trim().length === 0) ? 0.6 : 1,
                cursor: (enabled && text.trim().length === 0) ? 'not-allowed' : 'pointer',
              }}
            >
              Insert Watermark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
