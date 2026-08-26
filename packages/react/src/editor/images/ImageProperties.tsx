// Image properties dialog — one atomic `setImageProperties` on Apply.

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { EditorSnapshot, SelectedImageState } from '@docx-editor.dev/core/contracts/editor';
import type { DrawingPositionInput, ImageWrapTarget } from '@docx-editor.dev/core/editor';
import {
  DRAWING_REL_FROM_H,
  DRAWING_REL_FROM_V,
  IMAGE_WRAP_TARGETS,
  executeImageCommand,
  positionInputFromPropertiesCommand,
  validateDrawingPositionInput,
} from '@docx-editor.dev/core/editor';
import { useTranslation } from '../../i18n';
import { useDocxEditor } from '../context';
import { useEditorState } from '../useEditorState';
import { chromeControlForSlot, chromeIcon, guardToolbarMousedown } from '../toolbar/ToolbarButton';
import { Slot } from '../toolbar/Slot';
import { emuToPoints, normalizeImageBytes, pointsToEmu } from './normalizeImageFile';

const selectImage = (snapshot: EditorSnapshot) => snapshot.image;

function dialogFocusables(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => element.offsetParent !== null || element === document.activeElement);
}

function guardDialogMousedown(event: React.MouseEvent): void {
  const tag = (event.target as HTMLElement | null)?.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  event.preventDefault();
}

/** Props for `DocxEditor.ImagePropertiesDialog`. @public */
export interface DocxEditorImagePropertiesDialogProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

interface DraftState {
  widthPoints: string;
  heightPoints: string;
  cropLeft: string;
  cropTop: string;
  cropRight: string;
  cropBottom: string;
  title: string;
  description: string;
  hyperlink: string;
  wrap: ImageWrapTarget;
  lockAspect: boolean;
  positionMode: 'frame' | 'simple';
  horizontalPoints: string;
  verticalPoints: string;
  relativeToH: DrawingPositionInput['relativeToH'];
  relativeToV: DrawingPositionInput['relativeToV'];
}

function positionDraftFrom(
  image: SelectedImageState
): Pick<
  DraftState,
  'positionMode' | 'horizontalPoints' | 'verticalPoints' | 'relativeToH' | 'relativeToV'
> {
  const position = image.position;
  if (!position || image.kind !== 'anchored') {
    return {
      positionMode: 'frame',
      horizontalPoints: '',
      verticalPoints: '',
      relativeToH: 'page',
      relativeToV: 'line',
    };
  }
  if (position.mode === 'simple') {
    return {
      positionMode: 'simple',
      horizontalPoints:
        position.horizontalEmu !== undefined ? String(emuToPoints(position.horizontalEmu)) : '',
      verticalPoints:
        position.verticalEmu !== undefined ? String(emuToPoints(position.verticalEmu)) : '',
      relativeToH: 'page',
      relativeToV: 'line',
    };
  }
  return {
    positionMode: 'frame',
    horizontalPoints:
      position.horizontalEmu !== undefined ? String(emuToPoints(position.horizontalEmu)) : '',
    verticalPoints:
      position.verticalEmu !== undefined ? String(emuToPoints(position.verticalEmu)) : '',
    relativeToH: position.relativeToH ?? 'page',
    relativeToV: position.relativeToV ?? 'line',
  };
}

function positionDraftChanged(draft: DraftState, basis: SelectedImageState): boolean {
  const initial = positionDraftFrom(basis);
  return (
    draft.horizontalPoints !== initial.horizontalPoints ||
    draft.verticalPoints !== initial.verticalPoints ||
    draft.relativeToH !== initial.relativeToH ||
    draft.relativeToV !== initial.relativeToV
  );
}

function parseSignedOffsetPoints(value: string): number | null {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  const emu = pointsToEmu(parsed);
  if (!Number.isInteger(emu)) return null;
  return emu;
}

function parsePositionCommandPayload(
  draft: DraftState,
  basis: SelectedImageState
):
  | { ok: true; value: Pick<EditorCommandPositionPayload, keyof EditorCommandPositionPayload> }
  | { ok: false } {
  const initial = positionDraftFrom(basis);
  if (draft.positionMode === 'simple' || basis.position?.mode === 'simple') {
    const horizontalChanged = draft.horizontalPoints !== initial.horizontalPoints;
    const verticalChanged = draft.verticalPoints !== initial.verticalPoints;
    const horizontalEmu = horizontalChanged
      ? parseSignedOffsetPoints(draft.horizontalPoints)
      : basis.position?.horizontalEmu;
    const verticalEmu = verticalChanged
      ? parseSignedOffsetPoints(draft.verticalPoints)
      : basis.position?.verticalEmu;
    if (horizontalChanged && horizontalEmu === null) return { ok: false };
    if (verticalChanged && verticalEmu === null) return { ok: false };
    if (horizontalEmu === undefined || verticalEmu === undefined) return { ok: false };
    return {
      ok: true,
      value: {
        horizontalEmu: horizontalEmu as number,
        verticalEmu: verticalEmu as number,
      },
    };
  }
  const horizontalChanged = draft.horizontalPoints !== initial.horizontalPoints;
  const verticalChanged = draft.verticalPoints !== initial.verticalPoints;
  const relativeHChanged = draft.relativeToH !== initial.relativeToH;
  const relativeVChanged = draft.relativeToV !== initial.relativeToV;
  const horizontalEmu = horizontalChanged
    ? parseSignedOffsetPoints(draft.horizontalPoints)
    : basis.position?.horizontalEmu;
  const verticalEmu = verticalChanged
    ? parseSignedOffsetPoints(draft.verticalPoints)
    : basis.position?.verticalEmu;
  if (horizontalChanged && horizontalEmu === null) return { ok: false };
  if (verticalChanged && verticalEmu === null) return { ok: false };
  return {
    ok: true,
    value: {
      ...(typeof horizontalEmu === 'number' ? { horizontalEmu } : {}),
      ...(typeof verticalEmu === 'number' ? { verticalEmu } : {}),
      ...(relativeHChanged || horizontalChanged || verticalChanged
        ? { relativeToH: draft.relativeToH }
        : {}),
      ...(relativeVChanged || horizontalChanged || verticalChanged
        ? { relativeToV: draft.relativeToV }
        : {}),
    },
  };
}

interface EditorCommandPositionPayload {
  horizontalEmu?: number;
  verticalEmu?: number;
  relativeToH?: string;
  relativeToV?: string;
}

function parsePercent(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return null;
  return parsed;
}

function parsePoints(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return parsed;
}

const WRAP_OPTIONS: Array<{ key: ImageWrapTarget; label: string; icon: string; desc: string }> = [
  { key: 'inline', label: 'In Line', icon: '📄', desc: 'Moves with text like a word' },
  { key: 'square', label: 'Square', icon: '🔲', desc: 'Text flows around rectangular bounds' },
  { key: 'tight', label: 'Tight', icon: '📐', desc: 'Text wraps closely around shape' },
  { key: 'behind', label: 'Behind Text', icon: '🔽', desc: 'Sits behind document text' },
  { key: 'inFront', label: 'In Front of Text', icon: '🔼', desc: 'Floats freely above text' },
  { key: 'topAndBottom', label: 'Top & Bottom', icon: '⏸️', desc: 'Text stops above and resumes below' },
];

type DialogTab = 'dimensions' | 'wrap' | 'crop' | 'details' | 'replace';

/**
 * Enhanced Properties and Image Editor dialog for the selected picture.
 *
 * @public
 */
export function DocxEditorImagePropertiesDialog({
  open,
  onClose,
  className,
  triggerRef,
}: DocxEditorImagePropertiesDialogProps) {
  const editor = useDocxEditor();
  const { t } = useTranslation();
  const image = useEditorState(selectImage);
  const titleId = useId();
  const hyperlinkInputId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement | null>(null);
  const targetRef = useRef<SelectedImageState | null>(null);
  const selectionRef = useRef<{ paragraphId: string; offset: number } | null>(null);
  const packageRevisionRef = useRef<number | null>(null);
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DialogTab>('dimensions');
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);

  const target = targetRef.current;
  const pictureOnlyDisabled = target?.canCrop === false;
  const resizeDisabled = target?.canResize === false;
  const aspectLockDisabled = target?.locks.changeAspect === true;
  const positionEditable = target?.kind === 'anchored' && target.canMove === true;
  const positionUnavailable = target?.kind === 'inline';
  const positionLocked = target?.kind === 'anchored' && target.canMove === false;

  useEffect(() => {
    if (!open) {
      targetRef.current = null;
      selectionRef.current = null;
      packageRevisionRef.current = null;
      setImagePreviewSrc(null);
      return;
    }
    if (!image) return;
    targetRef.current = image;
    if (editor?.surface) {
      const { anchor } = editor.surface.state().selection;
      selectionRef.current = { paragraphId: anchor.paragraphId, offset: anchor.offset };
      packageRevisionRef.current = editor.surface.session.packageRevision();
    }
    setErrorKey(null);
    const positionDraft = positionDraftFrom(image);
    const cropPercent = image.crop;
    setDraft({
      widthPoints: String(emuToPoints(image.widthEmu)),
      heightPoints: String(emuToPoints(image.heightEmu)),
      cropLeft: String(cropPercent.left),
      cropTop: String(cropPercent.top),
      cropRight: String(cropPercent.right),
      cropBottom: String(cropPercent.bottom),
      title: image.title,
      description: image.description,
      hyperlink: image.hyperlink ?? '',
      wrap: image.wrap,
      lockAspect: image.locks.changeAspect,
      ...positionDraft,
    });

    // Extract live image preview element src
    const imgEl = document.querySelector<HTMLImageElement>(
      `[data-drawing-node-id="${image.id}"] img`
    );
    if (imgEl?.src) {
      setImagePreviewSrc(imgEl.src);
    }
  }, [open, image?.id, image?.widthEmu, image?.heightEmu, editor]);

  const restoreFocus = useCallback(() => {
    triggerRef?.current?.focus();
    editor?.focus();
  }, [editor, triggerRef]);

  const dismiss = useCallback(() => {
    onClose();
    restoreFocus();
  }, [onClose, restoreFocus]);

  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const focusables = dialogFocusables(dialog);
    const initial =
      focusables.find(
        (element) => element.id === 'image-prop-width' && !element.hasAttribute('disabled')
      ) ??
      focusables.find((element) => !element.hasAttribute('disabled')) ??
      dialog;
    initial.focus();
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = dialogFocusables(dialog);
      if (items.length === 0) return;
      const active = document.activeElement;
      const currentIndex = items.findIndex((element) => element === active);
      if (currentIndex === -1) return;
      event.preventDefault();
      const nextIndex = event.shiftKey
        ? (currentIndex - 1 + items.length) % items.length
        : (currentIndex + 1) % items.length;
      items[nextIndex]?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, dismiss]);

  const aspectRatio = useMemo(() => {
    const basis = target ?? image;
    if (!basis || basis.widthEmu <= 0) return 1;
    return basis.widthEmu / basis.heightEmu;
  }, [image, target]);

  const setWidth = useCallback(
    (next: string) => {
      setDraft((current) => {
        if (!current) return current;
        if (!current.lockAspect) return { ...current, widthPoints: next };
        const width = parsePoints(next);
        if (width === null) return { ...current, widthPoints: next };
        const height = Math.round((width / aspectRatio) * 100) / 100;
        return { ...current, widthPoints: next, heightPoints: String(height) };
      });
    },
    [aspectRatio]
  );

  const setHeight = useCallback(
    (next: string) => {
      setDraft((current) => {
        if (!current) return current;
        if (!current.lockAspect) return { ...current, heightPoints: next };
        const height = parsePoints(next);
        if (height === null) return { ...current, heightPoints: next };
        const width = Math.round(height * aspectRatio * 100) / 100;
        return { ...current, widthPoints: String(width), heightPoints: next };
      });
    },
    [aspectRatio]
  );

  const resetNatural = useCallback(() => {
    const basis = targetRef.current;
    if (!basis?.intrinsic) return;
    const width = (basis.intrinsic.pixelWidth * 72) / basis.intrinsic.dpiX;
    const height = (basis.intrinsic.pixelHeight * 72) / basis.intrinsic.dpiY;
    setDraft((current) =>
      current
        ? {
            ...current,
            widthPoints: String(Math.round(width * 100) / 100),
            heightPoints: String(Math.round(height * 100) / 100),
          }
        : current
    );
  }, []);

  const scaleByPercent = useCallback(
    (percent: number) => {
      const basis = targetRef.current;
      if (!basis) return;
      const baseWidth = basis.intrinsic
        ? (basis.intrinsic.pixelWidth * 72) / basis.intrinsic.dpiX
        : emuToPoints(basis.widthEmu);
      const baseHeight = basis.intrinsic
        ? (basis.intrinsic.pixelHeight * 72) / basis.intrinsic.dpiY
        : emuToPoints(basis.heightEmu);
      const targetWidth = Math.round(((baseWidth * percent) / 100) * 100) / 100;
      const targetHeight = Math.round(((baseHeight * percent) / 100) * 100) / 100;
      setDraft((current) =>
        current
          ? {
              ...current,
              widthPoints: String(targetWidth),
              heightPoints: String(targetHeight),
            }
          : current
      );
    },
    []
  );

  const deleteCurrentDrawing = useCallback(() => {
    if (!editor) return;
    if (window.confirm('Are you sure you want to delete this image?')) {
      editor.exec({ type: 'deleteImage' });
      dismiss();
    }
  }, [editor, dismiss]);

  const handleReplaceFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor) return;
      setIsReplacing(true);
      try {
        const buffer = await file.arrayBuffer();
        const normalized = normalizeImageBytes(new Uint8Array(buffer));
        if (!normalized.ok) {
          setErrorKey(normalized.reasonKey);
          return;
        }
        const res = await executeImageCommand(editor, {
          type: 'replaceImage',
          data: normalized.bytes,
          mime: normalized.mime,
        });
        if (!res.ok) {
          setErrorKey(res.reason ?? 'imageInsert.errors.refused');
        } else {
          dismiss();
        }
      } catch {
        setErrorKey('imageInsert.errors.refused');
      } finally {
        setIsReplacing(false);
        if (event.target) event.target.value = '';
      }
    },
    [editor, dismiss]
  );

  const apply = useCallback(() => {
    const basis = targetRef.current;
    const capturedSelection = selectionRef.current;
    const capturedRevision = packageRevisionRef.current;
    if (!editor || !basis || !draft || !capturedSelection || capturedRevision === null) return;
    const command: {
      type: 'setImageProperties';
      drawingNodeId: string;
      expectedPackageRevision: number;
      selectionParagraphId: string;
      selectionOffset: number;
      widthEmu?: number;
      heightEmu?: number;
      title?: string;
      description?: string;
      hyperlink?: string | null;
      crop?: { left: number; top: number; right: number; bottom: number };
      wrap?: ImageWrapTarget;
      horizontalEmu?: number;
      verticalEmu?: number;
      relativeToH?: string;
      relativeToV?: string;
    } = {
      type: 'setImageProperties',
      drawingNodeId: basis.id,
      expectedPackageRevision: capturedRevision,
      selectionParagraphId: capturedSelection.paragraphId,
      selectionOffset: capturedSelection.offset,
    };

    if (!resizeDisabled) {
      const width = parsePoints(draft.widthPoints);
      const height = parsePoints(draft.heightPoints);
      if (width === null || height === null) {
        setErrorKey('imageProperties.errors.invalidDimensions');
        return;
      }
      const widthEmu = pointsToEmu(width);
      const heightEmu = pointsToEmu(height);
      if (widthEmu !== basis.widthEmu) command.widthEmu = widthEmu;
      if (heightEmu !== basis.heightEmu) command.heightEmu = heightEmu;
    }

    if (basis.canCrop && !pictureOnlyDisabled) {
      const left = parsePercent(draft.cropLeft);
      const top = parsePercent(draft.cropTop);
      const right = parsePercent(draft.cropRight);
      const bottom = parsePercent(draft.cropBottom);
      if (left === null || top === null || right === null || bottom === null) {
        setErrorKey('imageProperties.errors.invalidCrop');
        return;
      }
      const basisCrop = basis.crop;
      if (
        left !== basisCrop.left ||
        top !== basisCrop.top ||
        right !== basisCrop.right ||
        bottom !== basisCrop.bottom
      ) {
        command.crop = { left, top, right, bottom };
      }
    }

    if (draft.title !== basis.title) command.title = draft.title;
    if (draft.description !== basis.description) command.description = draft.description;
    const trimmedHyperlink = draft.hyperlink.trim();
    if (trimmedHyperlink !== (basis.hyperlink ?? '')) {
      command.hyperlink = trimmedHyperlink === '' ? null : trimmedHyperlink;
    }
    if (basis.canChangeWrap && draft.wrap !== basis.wrap) command.wrap = draft.wrap;

    const canEditPosition = basis.kind === 'anchored' && basis.canMove;
    if (canEditPosition && positionDraftChanged(draft, basis)) {
      const parsed = parsePositionCommandPayload(draft, basis);
      if (!parsed.ok) {
        setErrorKey('imageProperties.errors.invalidPosition');
        return;
      }
      if (!validateDrawingPositionInput(positionInputFromPropertiesCommand(parsed.value, basis))) {
        setErrorKey('imageProperties.errors.invalidPosition');
        return;
      }
      Object.assign(command, parsed.value);
    }

    const hasMutation =
      command.widthEmu !== undefined ||
      command.heightEmu !== undefined ||
      command.title !== undefined ||
      command.description !== undefined ||
      command.hyperlink !== undefined ||
      command.crop !== undefined ||
      command.wrap !== undefined ||
      command.horizontalEmu !== undefined ||
      command.verticalEmu !== undefined ||
      command.relativeToH !== undefined ||
      command.relativeToV !== undefined;
    if (!hasMutation) {
      dismiss();
      return;
    }
    const allowed = editor.can(command);
    if (!allowed.ok) {
      setErrorKey('imageProperties.errors.refused');
      return;
    }
    const result = editor.exec(command);
    if (!result.ok) {
      setErrorKey('imageProperties.errors.refused');
      return;
    }
    dismiss();
  }, [editor, draft, pictureOnlyDisabled, resizeDisabled, dismiss]);

  if (!open || !draft) return null;

  return (
    <div
      className={`docx-dialog-overlay${className ? ` ${className}` : ''}`}
      onClick={dismiss}
      onMouseDown={(event) => {
        event.stopPropagation();
        guardDialogMousedown(event);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="docx-dialog docx-image-editor-dialog"
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div id={titleId} className="docx-dialog__header">
          <h3 className="docx-dialog__title">
            <span>🖼️</span> Image Editor & Properties
          </h3>
          <button
            type="button"
            className="docx-dialog__close"
            onClick={dismiss}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab Bar */}
        <div className="docx-dialog__tabs">
          <button
            type="button"
            className={`docx-dialog__tab ${activeTab === 'dimensions' ? 'docx-dialog__tab--active' : ''}`}
            onClick={() => setActiveTab('dimensions')}
          >
            📐 Size & Scale
          </button>
          <button
            type="button"
            className={`docx-dialog__tab ${activeTab === 'wrap' ? 'docx-dialog__tab--active' : ''}`}
            onClick={() => setActiveTab('wrap')}
          >
            🔲 Wrapping & Layout
          </button>
          <button
            type="button"
            className={`docx-dialog__tab ${activeTab === 'crop' ? 'docx-dialog__tab--active' : ''}`}
            onClick={() => setActiveTab('crop')}
          >
            ✂️ Crop
          </button>
          <button
            type="button"
            className={`docx-dialog__tab ${activeTab === 'details' ? 'docx-dialog__tab--active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            🏷️ Alt Text & Link
          </button>
          <button
            type="button"
            className={`docx-dialog__tab ${activeTab === 'replace' ? 'docx-dialog__tab--active' : ''}`}
            onClick={() => setActiveTab('replace')}
          >
            🔄 Replace
          </button>
        </div>

        {/* Dialog Body */}
        <div className="docx-dialog__body">
          {errorKey ? (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-md border border-red-200">
              ⚠️ {t(errorKey as 'imageProperties.errors.invalidDimensions') || errorKey}
            </div>
          ) : null}

          {/* Live Preview Panel */}
          {imagePreviewSrc && (() => {
            const cropL = Math.max(0, Math.min(85, parseFloat(draft.cropLeft) || 0));
            const cropT = Math.max(0, Math.min(85, parseFloat(draft.cropTop) || 0));
            const cropR = Math.max(0, Math.min(85, parseFloat(draft.cropRight) || 0));
            const cropB = Math.max(0, Math.min(85, parseFloat(draft.cropBottom) || 0));

            const lFrac = cropL / 100;
            const tFrac = cropT / 100;
            const rFrac = cropR / 100;
            const bFrac = cropB / 100;

            const visW = Math.max(0.01, 1 - lFrac - rFrac);
            const visH = Math.max(0.01, 1 - tFrac - bFrac);

            const natW = target?.intrinsic?.pixelWidth ?? 400;
            const natH = target?.intrinsic?.pixelHeight ?? 300;
            const croppedAspect = (natW * visW) / (natH * visH);

            const maxBoxW = 280;
            const maxBoxH = 150;
            let viewW = maxBoxW;
            let viewH = viewW / (croppedAspect || 1);
            if (viewH > maxBoxH) {
              viewH = maxBoxH;
              viewW = viewH * (croppedAspect || 1);
            }

            const isCropped = cropL > 0 || cropT > 0 || cropR > 0 || cropB > 0;

            return (
              <div className="docx-dialog__preview-container">
                <div className="docx-dialog__crop-box">
                  <div
                    className="docx-dialog__crop-viewport"
                    style={{
                      width: `${Math.round(viewW)}px`,
                      height: `${Math.round(viewH)}px`,
                    }}
                  >
                    <img
                      src={imagePreviewSrc}
                      alt="Selected Image Preview"
                      className="docx-dialog__crop-img"
                      style={{
                        width: `${(1 / visW) * 100}%`,
                        height: `${(1 / visH) * 100}%`,
                        left: `${(-lFrac / visW) * 100}%`,
                        top: `${(-tFrac / visH) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="docx-dialog__preview-badge">
                  {isCropped ? '✂️ Cropped View: ' : 'Current Size: '}
                  {Math.round(Number(draft.widthPoints))} × {Math.round(Number(draft.heightPoints))} pt
                  {target?.intrinsic
                    ? ` (Original: ${target.intrinsic.pixelWidth} × ${target.intrinsic.pixelHeight} px)`
                    : ''}
                </div>
              </div>
            );
          })()}

          {/* Tab 1: Dimensions & Sizing */}
          {activeTab === 'dimensions' && (
            <section className="docx-dialog__section">
              <div className="docx-dialog__section-title">Dimensions</div>
              <div className="docx-dialog__grid-2">
                <div className="docx-dialog__field">
                  <label className="docx-dialog__label" htmlFor="image-prop-width">
                    Width
                  </label>
                  <div className="docx-dialog__input-group">
                    <input
                      id="image-prop-width"
                      className="docx-dialog__input"
                      value={draft.widthPoints}
                      disabled={resizeDisabled}
                      onChange={(event) => setWidth(event.target.value)}
                    />
                    <span className="docx-dialog__unit">pt</span>
                  </div>
                </div>

                <div className="docx-dialog__field">
                  <label className="docx-dialog__label" htmlFor="image-prop-height">
                    Height
                  </label>
                  <div className="docx-dialog__input-group">
                    <input
                      id="image-prop-height"
                      className="docx-dialog__input"
                      value={draft.heightPoints}
                      disabled={resizeDisabled}
                      onChange={(event) => setHeight(event.target.value)}
                    />
                    <span className="docx-dialog__unit">pt</span>
                  </div>
                </div>
              </div>

              {/* Aspect Ratio & Reset */}
              <div className="docx-dialog__inline-actions">
                <label className="docx-dialog__checkbox-label">
                  <input
                    type="checkbox"
                    checked={draft.lockAspect}
                    onChange={(event) =>
                      setDraft((current) =>
                        current ? { ...current, lockAspect: event.target.checked } : current
                      )
                    }
                  />
                  <span>🔒 Lock aspect ratio</span>
                </label>

                <button
                  type="button"
                  className="docx-dialog__btn-text"
                  onClick={resetNatural}
                  disabled={resizeDisabled}
                >
                  ↩️ Reset to original size
                </button>
              </div>

              {/* Quick Scale Presets */}
              <div className="docx-dialog__scale-presets">
                <span className="docx-dialog__scale-presets-title">Quick Scale:</span>
                {[25, 50, 75, 100, 150, 200].map((percent) => (
                  <button
                    key={percent}
                    type="button"
                    className="docx-dialog__preset-btn"
                    disabled={resizeDisabled}
                    onClick={() => scaleByPercent(percent)}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Tab 2: Text Wrapping & Layout */}
          {activeTab === 'wrap' && (
            <section className="docx-dialog__section">
              <div className="docx-dialog__section-title">Text Wrapping Style</div>
              <div className="docx-dialog__wrap-cards">
                {WRAP_OPTIONS.map((item) => (
                  <div
                    key={item.key}
                    className={`docx-dialog__wrap-card ${draft.wrap === item.key ? 'docx-dialog__wrap-card--active' : ''}`}
                    onClick={() => {
                      if (target?.canChangeWrap !== false) {
                        setDraft((current) =>
                          current ? { ...current, wrap: item.key } : current
                        );
                      }
                    }}
                  >
                    <span className="docx-dialog__wrap-card-icon">{item.icon}</span>
                    <span className="docx-dialog__wrap-card-label">{item.label}</span>
                  </div>
                ))}
              </div>

              {positionEditable && draft.positionMode === 'frame' && (
                <>
                  <div className="docx-dialog__section-title mt-2">Position & Offsets</div>
                  <div className="docx-dialog__grid-2">
                    <div className="docx-dialog__field">
                      <label className="docx-dialog__label" htmlFor="image-pos-rel-h">
                        Horizontal Anchor
                      </label>
                      <select
                        id="image-pos-rel-h"
                        className="docx-dialog__select"
                        value={draft.relativeToH ?? 'page'}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  relativeToH: event.target
                                    .value as DrawingPositionInput['relativeToH'],
                                }
                              : current
                          )
                        }
                      >
                        {DRAWING_REL_FROM_H.map((frame) => (
                          <option key={frame} value={frame}>
                            Relative to {frame}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="docx-dialog__field">
                      <label className="docx-dialog__label" htmlFor="image-pos-rel-v">
                        Vertical Anchor
                      </label>
                      <select
                        id="image-pos-rel-v"
                        className="docx-dialog__select"
                        value={draft.relativeToV ?? 'line'}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? {
                                  ...current,
                                  relativeToV: event.target
                                    .value as DrawingPositionInput['relativeToV'],
                                }
                              : current
                          )
                        }
                      >
                        {DRAWING_REL_FROM_V.map((frame) => (
                          <option key={frame} value={frame}>
                            Relative to {frame}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="docx-dialog__grid-2">
                    <div className="docx-dialog__field">
                      <label className="docx-dialog__label" htmlFor="image-pos-h">
                        Horizontal Offset
                      </label>
                      <div className="docx-dialog__input-group">
                        <input
                          id="image-pos-h"
                          className="docx-dialog__input"
                          value={draft.horizontalPoints}
                          onChange={(event) =>
                            setDraft((current) =>
                              current ? { ...current, horizontalPoints: event.target.value } : current
                            )
                          }
                        />
                        <span className="docx-dialog__unit">pt</span>
                      </div>
                    </div>

                    <div className="docx-dialog__field">
                      <label className="docx-dialog__label" htmlFor="image-pos-v">
                        Vertical Offset
                      </label>
                      <div className="docx-dialog__input-group">
                        <input
                          id="image-pos-v"
                          className="docx-dialog__input"
                          value={draft.verticalPoints}
                          onChange={(event) =>
                            setDraft((current) =>
                              current ? { ...current, verticalPoints: event.target.value } : current
                            )
                          }
                        />
                        <span className="docx-dialog__unit">pt</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}

          {/* Tab 3: Crop */}
          {activeTab === 'crop' && (
            <section className="docx-dialog__section">
              <div className="docx-dialog__section-title">Crop Edges (%)</div>
              <div className="docx-dialog__grid-2">
                {/* Left Crop */}
                <div className="docx-dialog__field">
                  <label className="docx-dialog__label" htmlFor="image-crop-left">
                    Left Crop
                  </label>
                  <div className="docx-dialog__crop-field-row">
                    <input
                      id="image-crop-left"
                      type="range"
                      min="0"
                      max="80"
                      step="1"
                      value={draft.cropLeft}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentR = parseFloat(draft.cropRight) || 0;
                        const safeVal = val + currentR > 90 ? Math.max(0, 90 - currentR) : val;
                        setDraft((curr) => (curr ? { ...curr, cropLeft: String(safeVal) } : curr));
                      }}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="80"
                      step="0.5"
                      value={draft.cropLeft}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentR = parseFloat(draft.cropRight) || 0;
                        const safeVal = val + currentR > 90 ? Math.max(0, 90 - currentR) : val;
                        setDraft((curr) => (curr ? { ...curr, cropLeft: String(safeVal) } : curr));
                      }}
                      className="docx-dialog__crop-input-num"
                    />
                    <span className="text-xs text-slate-500 font-medium">%</span>
                  </div>
                </div>

                {/* Top Crop */}
                <div className="docx-dialog__field">
                  <label className="docx-dialog__label" htmlFor="image-crop-top">
                    Top Crop
                  </label>
                  <div className="docx-dialog__crop-field-row">
                    <input
                      id="image-crop-top"
                      type="range"
                      min="0"
                      max="80"
                      step="1"
                      value={draft.cropTop}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentB = parseFloat(draft.cropBottom) || 0;
                        const safeVal = val + currentB > 90 ? Math.max(0, 90 - currentB) : val;
                        setDraft((curr) => (curr ? { ...curr, cropTop: String(safeVal) } : curr));
                      }}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="80"
                      step="0.5"
                      value={draft.cropTop}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentB = parseFloat(draft.cropBottom) || 0;
                        const safeVal = val + currentB > 90 ? Math.max(0, 90 - currentB) : val;
                        setDraft((curr) => (curr ? { ...curr, cropTop: String(safeVal) } : curr));
                      }}
                      className="docx-dialog__crop-input-num"
                    />
                    <span className="text-xs text-slate-500 font-medium">%</span>
                  </div>
                </div>

                {/* Right Crop */}
                <div className="docx-dialog__field">
                  <label className="docx-dialog__label" htmlFor="image-crop-right">
                    Right Crop
                  </label>
                  <div className="docx-dialog__crop-field-row">
                    <input
                      id="image-crop-right"
                      type="range"
                      min="0"
                      max="80"
                      step="1"
                      value={draft.cropRight}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentL = parseFloat(draft.cropLeft) || 0;
                        const safeVal = val + currentL > 90 ? Math.max(0, 90 - currentL) : val;
                        setDraft((curr) => (curr ? { ...curr, cropRight: String(safeVal) } : curr));
                      }}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="80"
                      step="0.5"
                      value={draft.cropRight}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentL = parseFloat(draft.cropLeft) || 0;
                        const safeVal = val + currentL > 90 ? Math.max(0, 90 - currentL) : val;
                        setDraft((curr) => (curr ? { ...curr, cropRight: String(safeVal) } : curr));
                      }}
                      className="docx-dialog__crop-input-num"
                    />
                    <span className="text-xs text-slate-500 font-medium">%</span>
                  </div>
                </div>

                {/* Bottom Crop */}
                <div className="docx-dialog__field">
                  <label className="docx-dialog__label" htmlFor="image-crop-bottom">
                    Bottom Crop
                  </label>
                  <div className="docx-dialog__crop-field-row">
                    <input
                      id="image-crop-bottom"
                      type="range"
                      min="0"
                      max="80"
                      step="1"
                      value={draft.cropBottom}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentT = parseFloat(draft.cropTop) || 0;
                        const safeVal = val + currentT > 90 ? Math.max(0, 90 - currentT) : val;
                        setDraft((curr) => (curr ? { ...curr, cropBottom: String(safeVal) } : curr));
                      }}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="80"
                      step="0.5"
                      value={draft.cropBottom}
                      disabled={pictureOnlyDisabled}
                      onChange={(e) => {
                        const val = Math.min(80, Math.max(0, parseFloat(e.target.value) || 0));
                        const currentT = parseFloat(draft.cropTop) || 0;
                        const safeVal = val + currentT > 90 ? Math.max(0, 90 - currentT) : val;
                        setDraft((curr) => (curr ? { ...curr, cropBottom: String(safeVal) } : curr));
                      }}
                      className="docx-dialog__crop-input-num"
                    />
                    <span className="text-xs text-slate-500 font-medium">%</span>
                  </div>
                </div>
              </div>

              {/* Crop Presets */}
              <div className="docx-dialog__scale-presets mt-3">
                <span className="docx-dialog__scale-presets-title">Crop Presets:</span>
                <button
                  type="button"
                  className="docx-dialog__preset-btn"
                  onClick={() =>
                    setDraft((curr) =>
                      curr
                        ? {
                            ...curr,
                            cropLeft: '0',
                            cropTop: '0',
                            cropRight: '0',
                            cropBottom: '0',
                          }
                        : curr
                    )
                  }
                >
                  ✂️ Reset (0%)
                </button>
                <button
                  type="button"
                  className="docx-dialog__preset-btn"
                  onClick={() =>
                    setDraft((curr) =>
                      curr
                        ? {
                            ...curr,
                            cropLeft: '12.5',
                            cropTop: '0',
                            cropRight: '12.5',
                            cropBottom: '0',
                          }
                        : curr
                    )
                  }
                >
                  🔲 Square (1:1)
                </button>
                <button
                  type="button"
                  className="docx-dialog__preset-btn"
                  onClick={() =>
                    setDraft((curr) =>
                      curr
                        ? {
                            ...curr,
                            cropLeft: '0',
                            cropTop: '10',
                            cropRight: '0',
                            cropBottom: '10',
                          }
                        : curr
                    )
                  }
                >
                  📺 16:9 Wide
                </button>
                <button
                  type="button"
                  className="docx-dialog__preset-btn"
                  onClick={() =>
                    setDraft((curr) =>
                      curr
                        ? {
                            ...curr,
                            cropLeft: '5',
                            cropTop: '0',
                            cropRight: '5',
                            cropBottom: '0',
                          }
                        : curr
                    )
                  }
                >
                  📷 4:3 Standard
                </button>
              </div>
            </section>
          )}

          {/* Tab 4: Details & Link */}
          {activeTab === 'details' && (
            <section className="docx-dialog__section">
              <div className="docx-dialog__section-title">Alt Text (Accessibility)</div>
              <div className="docx-dialog__field">
                <label className="docx-dialog__label" htmlFor="image-prop-title">
                  Title
                </label>
                <input
                  id="image-prop-title"
                  className="docx-dialog__input-group docx-dialog__input"
                  style={{ border: '1px solid #cbd5e1' }}
                  value={draft.title}
                  placeholder="Short image title"
                  onChange={(event) =>
                    setDraft((current) =>
                      current ? { ...current, title: event.target.value } : current
                    )
                  }
                />
              </div>

              <div className="docx-dialog__field">
                <label className="docx-dialog__label" htmlFor="image-prop-description">
                  Description / Caption
                </label>
                <textarea
                  id="image-prop-description"
                  className="docx-dialog__textarea"
                  value={draft.description}
                  placeholder="Detailed description for screen readers"
                  onChange={(event) =>
                    setDraft((current) =>
                      current ? { ...current, description: event.target.value } : current
                    )
                  }
                />
              </div>

              <div className="docx-dialog__section-title mt-2">Hyperlink</div>
              <div className="docx-dialog__field">
                <label className="docx-dialog__label" htmlFor={hyperlinkInputId}>
                  Link URL (Clicking opens URL)
                </label>
                <input
                  id={hyperlinkInputId}
                  className="docx-dialog__input-group docx-dialog__input"
                  style={{ border: '1px solid #cbd5e1' }}
                  value={draft.hyperlink}
                  placeholder="https://example.com"
                  onChange={(event) =>
                    setDraft((current) =>
                      current ? { ...current, hyperlink: event.target.value } : current
                    )
                  }
                />
              </div>
            </section>
          )}

          {/* Tab 5: Replace Image */}
          {activeTab === 'replace' && (
            <section className="docx-dialog__section">
              <div className="docx-dialog__section-title">Replace Current Image</div>
              <p className="text-xs text-slate-500">
                Choose a new image file (.png, .jpg, .gif, .webp) to replace the current picture in
                this document while maintaining its position and layout settings.
              </p>

              <input
                ref={replaceFileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                className="hidden"
                onChange={handleReplaceFileChange}
              />

              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="text-3xl mb-2">📁</div>
                <button
                  type="button"
                  disabled={isReplacing}
                  onClick={() => replaceFileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition"
                >
                  {isReplacing ? 'Replacing Image...' : 'Choose Replacement Image'}
                </button>
                <span className="text-xs text-slate-400 mt-2">
                  Supported formats: PNG, JPG, GIF, WebP
                </span>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="docx-dialog__footer">
          <button
            type="button"
            className="docx-dialog__btn docx-dialog__btn--danger"
            onClick={deleteCurrentDrawing}
          >
            🗑️ Delete Image
          </button>

          <div className="docx-dialog__footer-actions">
            <button type="button" className="docx-dialog__btn" onClick={dismiss}>
              Cancel
            </button>
            <button
              type="button"
              className="docx-dialog__btn docx-dialog__btn--primary"
              onClick={apply}
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Props for the toolbar properties trigger. @public */
export interface ImagePropertiesTriggerProps {
  className?: string;
  hidden?: boolean;
  asChild?: boolean;
  children?: import('react').ReactNode;
}

/**
 * Opens the image properties dialog for the selected drawing.
 *
 * @public
 */
export function ImagePropertiesTrigger({
  className,
  hidden,
  asChild,
  children,
}: ImagePropertiesTriggerProps) {
  const editor = useDocxEditor();
  const { t } = useTranslation();
  const image = useEditorState(selectImage);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const probe = { type: 'setImageProperties' as const, description: 'probe' };
  const allowed = editor && image ? editor.can(probe) : null;
  const isEnabled = allowed?.ok === true;
  const disabledReason = allowed && !allowed.ok ? allowed.reason : null;

  if (hidden) return null;

  const control = chromeControlForSlot('image.properties');
  const shared = {
    type: 'button' as const,
    ref: triggerRef,
    className: `docx-toolbar__button${className ? ` ${className}` : ''}`,
    'data-slot': 'image.properties',
    disabled: !isEnabled,
    ...(!isEnabled ? { 'data-disabled': '' } : {}),
    'aria-label': t('formattingBar.imagePropertiesShortcut'),
    title: disabledReason ?? t('formattingBar.imagePropertiesShortcut'),
    onMouseDown: guardToolbarMousedown,
    onClick: () => setOpen(true),
  };

  return (
    <>
      {asChild ? (
        <Slot {...shared}>{children}</Slot>
      ) : (
        <button {...shared}>{children ?? chromeIcon(control?.paths)}</button>
      )}
      <DocxEditorImagePropertiesDialog
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
}

ImagePropertiesTrigger.docxSlot = 'image.properties' as const;

export const ToolbarImageProperties = Object.assign(ImagePropertiesTrigger, {
  docxSlot: 'image.properties' as const,
});
