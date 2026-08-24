// Selection ring and eight resize handles for the selected drawing — geometry from layout records.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import {
  captureImageMutationPreconditions,
  computeMovedImagePosition,
  executeImageCommand,
  IMAGE_OVERLAY_NUDGE_PT,
  IMAGE_OVERLAY_NUDGE_SHIFT_PT,
  isStaleImageInteractionCommit,
  selectedDrawingOverlayTargetOf,
  type ImageInteractionSession,
  type ImageOverlayScrollPort,
  type ImageResizeHandle,
  type ImageWrapTarget,
  type SelectedDrawingOverlayTarget,
} from '@docx-editor.dev/core/editor';
import {
  computeImageResizeResult,
  createImageOverlayScrollPort,
  cssPixelsToLayoutPoints,
  finalizeImageOverlayInteraction,
  overlayFrameToSheetCssPixels,
  resizePreservesAspect,
} from '@docx-editor.dev/core/editor';
import type { DrawingPositionInput } from '@docx-editor.dev/core/editor';
import { useTranslation } from '../../i18n';
import { useDocxEditor } from '../context';
import { guardToolbarMousedown } from '../toolbar/ToolbarButton';
import { DocxEditorImagePropertiesDialog } from './ImageProperties';
import { normalizeImageBytes, pointsToEmu } from './normalizeImageFile';

const HANDLES: readonly ImageResizeHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const AUTO_SCROLL_EDGE_PX = 40;
const AUTO_SCROLL_MAX_PT = 12;

interface PreviewState {
  readonly session: ImageInteractionSession;
  readonly bounds: SelectedDrawingOverlayTarget;
  readonly accumulatedScrollPt: number;
}

export interface ImageSelectionOverlayProps {
  readonly containerRef: RefObject<HTMLElement | null>;
  readonly portalRef: RefObject<HTMLElement | null>;
  readonly scrollPort?: ImageOverlayScrollPort;
}

function handleLabelKey(handle: ImageResizeHandle): `imageOverlay.handle.${ImageResizeHandle}` {
  return `imageOverlay.handle.${handle}`;
}

function cursorForHandle(handle: ImageResizeHandle): string {
  switch (handle) {
    case 'nw':
    case 'se':
      return 'nwse-resize';
    case 'ne':
    case 'sw':
      return 'nesw-resize';
    case 'n':
    case 's':
      return 'ns-resize';
    default:
      return 'ew-resize';
  }
}

function handlePosition(handle: ImageResizeHandle): { readonly x: string; readonly y: string } {
  const map: Record<ImageResizeHandle, { x: string; y: string }> = {
    nw: { x: '0%', y: '0%' },
    n: { x: '50%', y: '0%' },
    ne: { x: '100%', y: '0%' },
    e: { x: '100%', y: '50%' },
    se: { x: '100%', y: '100%' },
    s: { x: '50%', y: '100%' },
    sw: { x: '0%', y: '100%' },
    w: { x: '0%', y: '50%' },
  };
  return map[handle];
}

function handleFromDelta(dx: number, dy: number): ImageResizeHandle {
  if (dx > 0 && dy > 0) return 'se';
  if (dx > 0 && dy < 0) return 'ne';
  if (dx < 0 && dy > 0) return 'sw';
  if (dx < 0 && dy < 0) return 'nw';
  if (dx > 0) return 'e';
  if (dx < 0) return 'w';
  if (dy > 0) return 's';
  return 'n';
}

export function ImageSelectionOverlay({
  containerRef,
  portalRef,
  scrollPort: scrollPortOverride,
}: ImageSelectionOverlayProps): React.ReactPortal | null {
  const editor = useDocxEditor();
  const { t } = useTranslation();
  const [target, setTarget] = useState<SelectedDrawingOverlayTarget | null>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<PreviewState | null>(null);
  previewRef.current = preview;
  const pointerStartRef = useRef<{ readonly x: number; readonly y: number } | null>(null);
  const captureTargetRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const focusRequestedForDrawingRef = useRef<string | null>(null);
  const scrollPortRef = useRef<ImageOverlayScrollPort | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const onPointerDown = (event: PointerEvent): void => {
      const element = event.target instanceof Element ? event.target : null;
      const drawingId = element
        ?.closest<HTMLElement>('[data-drawing-node-id]')
        ?.getAttribute('data-drawing-node-id');
      focusRequestedForDrawingRef.current = drawingId ?? null;
      if (drawingId && drawingId === target?.id) {
        queueMicrotask(() => overlayRef.current?.focus({ preventScroll: true }));
      }
    };
    container.addEventListener('pointerdown', onPointerDown, { capture: true });
    return () => container.removeEventListener('pointerdown', onPointerDown, { capture: true });
  }, [containerRef, target?.id]);

  useEffect(() => {
    if (!editor) {
      setTarget(null);
      return undefined;
    }
    const sync = (): void => {
      setTarget(selectedDrawingOverlayTargetOf(editor.surface));
    };
    const syncAfterCommit = (): void => {
      queueMicrotask(sync);
    };
    sync();
    const off = [editor.on('change', syncAfterCommit), editor.on('selectionChange', sync)];
    return () => {
      for (const unsubscribe of off) unsubscribe();
    };
  }, [editor]);

  useEffect(() => {
    if (scrollPortOverride) {
      scrollPortRef.current = scrollPortOverride;
      return undefined;
    }
    const container = containerRef.current;
    if (!container || !editor?.surface) return undefined;
    const scroller = container.closest('.docx-editor__scroll-container') as HTMLElement | null;
    if (!scroller) return undefined;
    const coordinates = editor.surface.overlayCoordinates();
    scrollPortRef.current = createImageOverlayScrollPort(scroller, coordinates.paintScale);
    return () => {
      scrollPortRef.current = null;
    };
  }, [containerRef, editor, scrollPortOverride]);

  const clearPreview = useCallback(() => {
    setPreview(null);
    pointerStartRef.current = null;
    const captured = captureTargetRef.current;
    captureTargetRef.current = null;
    if (captured) {
      try {
        captured.releasePointerCapture(
          (captured as HTMLElement & { _lastPointerId?: number })._lastPointerId ?? 0
        );
      } catch {
        // Already released.
      }
    }
  }, []);

  const beginSession = useCallback(
    (
      mode: 'move' | 'resize',
      handle: ImageResizeHandle | null,
      active: SelectedDrawingOverlayTarget,
      clientX: number,
      clientY: number,
      captureTarget: HTMLElement,
      pointerId: number
    ) => {
      if (!editor?.surface) return;
      const pre = captureImageMutationPreconditions(editor);
      if (!pre) return;
      const layout = editor.surface.publishedLayout();
      pointerStartRef.current = Object.freeze({ x: clientX, y: clientY });
      captureTargetRef.current = captureTarget;
      (captureTarget as HTMLElement & { _lastPointerId?: number })._lastPointerId = pointerId;
      try {
        captureTarget.setPointerCapture(pointerId);
      } catch {
        // Capture is best-effort.
      }
      setPreview({
        session: Object.freeze({
          drawingNodeId: active.id,
          startBounds: Object.freeze({
            x: active.x,
            y: active.y,
            width: active.width,
            height: active.height,
          }),
          startWidthEmu: active.widthEmu,
          startHeightEmu: active.heightEmu,
          startPosition: active.position,
          anchorFrameOrigin: active.anchorFrameOrigin,
          transform: active.transform,
          mode,
          handle,
          preconditions: pre,
          layoutRevision: layout.revision,
          packageRevision: editor.surface.session.packageRevision(),
          kind: active.kind,
        }),
        bounds: active,
        accumulatedScrollPt: 0,
      });
      overlayRef.current?.focus({ preventScroll: true });
    },
    [editor]
  );

  const commitSession = useCallback(
    (
      session: ImageInteractionSession,
      widthEmu: number,
      heightEmu: number,
      _bounds: {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
      },
      position: DrawingPositionInput | null
    ) => {
      if (!editor) return;
      const stale = isStaleImageInteractionCommit(editor, session);
      if (stale) {
        clearPreview();
        return;
      }
      if (session.mode === 'resize') {
        editor.exec({
          type: 'setImageProperties',
          widthEmu,
          heightEmu,
          ...(position?.mode === 'simple'
            ? {
                horizontalEmu: position.horizontalEmu,
                verticalEmu: position.verticalEmu,
              }
            : {}),
          ...(position?.mode === 'frame'
            ? {
                ...(position.horizontalEmu !== undefined
                  ? { horizontalEmu: position.horizontalEmu }
                  : {}),
                ...(position.verticalEmu !== undefined
                  ? { verticalEmu: position.verticalEmu }
                  : {}),
              }
            : {}),
        });
      } else if (session.mode === 'move' && position) {
        editor.exec({ type: 'setImagePosition', ...position });
      }
      clearPreview();
    },
    [clearPreview, editor]
  );

  const onOverlayKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!editor) return;
      const active = previewRef.current?.bounds ?? selectedDrawingOverlayTargetOf(editor.surface);
      if (!active) return;
      if (previewRef.current && event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        clearPreview();
        return;
      }
      if (previewRef.current) return;
      const step = event.shiftKey ? IMAGE_OVERLAY_NUDGE_SHIFT_PT : IMAGE_OVERLAY_NUDGE_PT;
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        event.stopPropagation();
        editor.exec({ type: 'deleteImage' });
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        setDialogOpen(true);
        return;
      }
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      const dx = event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
      const dy = event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
      if (event.altKey) {
        if (!active.canResize) return;
        const handle = handleFromDelta(dx, dy);
        const resized = computeImageResizeResult({
          handle,
          startWidthEmu: active.widthEmu,
          startHeightEmu: active.heightEmu,
          startBounds: { x: active.x, y: active.y, width: active.width, height: active.height },
          startPosition: active.position,
          anchorFrameOrigin: active.anchorFrameOrigin,
          deltaXPt: dx,
          deltaYPt: dy,
          transform: active.transform,
          preserveAspect: resizePreservesAspect(handle, active.aspectLocked, event.shiftKey),
          kind: active.kind,
        });
        editor.exec({
          type: 'setImageProperties',
          widthEmu: resized.widthEmu,
          heightEmu: resized.heightEmu,
          ...(resized.position?.mode === 'simple'
            ? {
                horizontalEmu: resized.position.horizontalEmu,
                verticalEmu: resized.position.verticalEmu,
              }
            : {}),
          ...(resized.position?.mode === 'frame'
            ? {
                ...(resized.position.horizontalEmu !== undefined
                  ? { horizontalEmu: resized.position.horizontalEmu }
                  : {}),
                ...(resized.position.verticalEmu !== undefined
                  ? { verticalEmu: resized.position.verticalEmu }
                  : {}),
              }
            : {}),
        });
        return;
      }
      if (active.kind !== 'anchored' || !active.canMove || !active.position) return;
      const moved = computeMovedImagePosition(active.position, dx, dy);
      editor.exec({ type: 'setImagePosition', ...moved });
    },
    [clearPreview, editor]
  );

  useEffect(() => {
    if (!preview || !editor?.surface) return undefined;
    const coordinates = editor.surface.overlayCoordinates();
    const onPointerMove = (event: PointerEvent) => {
      const current = previewRef.current;
      const startPointer = pointerStartRef.current;
      if (!current || !startPointer) return;
      const deltaX = cssPixelsToLayoutPoints(
        event.clientX - startPointer.x,
        coordinates.paintScale
      );
      const deltaY = cssPixelsToLayoutPoints(
        event.clientY - startPointer.y,
        coordinates.paintScale
      );
      if (current.session.mode === 'move') {
        let scrollDelta = 0;
        const scrollPort = scrollPortRef.current;
        const scroller = containerRef.current?.closest(
          '.docx-editor__scroll-container'
        ) as HTMLElement | null;
        if (scrollPort && scroller) {
          const scrollerRect = scroller.getBoundingClientRect();
          if (event.clientY > scrollerRect.bottom - AUTO_SCROLL_EDGE_PX)
            scrollDelta = AUTO_SCROLL_MAX_PT;
          else if (event.clientY < scrollerRect.top + AUTO_SCROLL_EDGE_PX)
            scrollDelta = -AUTO_SCROLL_MAX_PT;
          if (scrollDelta !== 0) scrollDelta = scrollPort.scrollBy(scrollDelta);
        }
        const accumulatedScrollPt = current.accumulatedScrollPt + scrollDelta;
        setPreview({
          ...current,
          accumulatedScrollPt,
          bounds: Object.freeze({
            ...current.bounds,
            x: current.session.startBounds.x + deltaX,
            y: current.session.startBounds.y + deltaY + accumulatedScrollPt,
          }),
        });
        return;
      }
      if (!current.session.handle) return;
      const resized = computeImageResizeResult({
        handle: current.session.handle,
        startWidthEmu: current.session.startWidthEmu,
        startHeightEmu: current.session.startHeightEmu,
        startBounds: current.session.startBounds,
        startPosition: current.session.startPosition,
        anchorFrameOrigin: current.session.anchorFrameOrigin,
        deltaXPt: deltaX,
        deltaYPt: deltaY,
        transform: current.session.transform,
        preserveAspect: resizePreservesAspect(
          current.session.handle,
          current.bounds.aspectLocked,
          event.shiftKey
        ),
        kind: current.session.kind,
      });
      setPreview({
        ...current,
        bounds: Object.freeze({
          ...current.bounds,
          x: resized.previewBounds.x,
          y: resized.previewBounds.y,
          width: resized.previewBounds.width,
          height: resized.previewBounds.height,
          widthEmu: resized.widthEmu,
          heightEmu: resized.heightEmu,
        }),
      });
    };
    const finish = (event: PointerEvent) => {
      const current = previewRef.current;
      if (!current) return;
      if (event.type === 'pointerup') {
        const deltaX = cssPixelsToLayoutPoints(
          event.clientX - (pointerStartRef.current?.x ?? event.clientX),
          coordinates.paintScale
        );
        const deltaY = cssPixelsToLayoutPoints(
          event.clientY - (pointerStartRef.current?.y ?? event.clientY),
          coordinates.paintScale
        );
        const finalized = finalizeImageOverlayInteraction({
          session: current.session,
          deltaXPt: deltaX,
          deltaYPt: deltaY,
          accumulatedScrollPt: current.accumulatedScrollPt,
          aspectLocked: current.bounds.aspectLocked,
          shiftKey: event.shiftKey,
          anchorFrameOrigin: current.session.anchorFrameOrigin,
        });
        commitSession(
          current.session,
          finalized.widthEmu,
          finalized.heightEmu,
          finalized.previewBounds,
          finalized.position
        );
      } else clearPreview();
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
    };
  }, [clearPreview, commitSession, containerRef, editor, preview]);

  useEffect(() => {
    if (!target || focusRequestedForDrawingRef.current !== target.id) return;
    focusRequestedForDrawingRef.current = null;
    overlayRef.current?.focus({ preventScroll: true });
  }, [target]);

  const quickScale = useCallback(
    (scaleRatio: number) => {
      if (!editor || !target) return;
      const snapshot = editor.snapshot();
      const image = snapshot.image;
      if (!image) return;
      const baseWidthEmu = image.intrinsic
        ? pointsToEmu((image.intrinsic.pixelWidth * 72) / image.intrinsic.dpiX)
        : image.widthEmu;
      const baseHeightEmu = image.intrinsic
        ? pointsToEmu((image.intrinsic.pixelHeight * 72) / image.intrinsic.dpiY)
        : image.heightEmu;
      const widthEmu = Math.round(baseWidthEmu * scaleRatio);
      const heightEmu = Math.round(baseHeightEmu * scaleRatio);
      editor.exec({ type: 'setImageProperties', widthEmu, heightEmu });
    },
    [editor, target]
  );

  const quickWrap = useCallback(
    (wrapType: ImageWrapTarget) => {
      if (!editor || !target) return;
      editor.exec({ type: 'setImageWrapType', target: wrapType });
    },
    [editor, target]
  );

  const handleReplaceImageFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      try {
        const buffer = await file.arrayBuffer();
        const normalized = normalizeImageBytes(new Uint8Array(buffer));
        if (!normalized.ok) {
          window.alert('Unable to decode image file.');
          return;
        }
        await executeImageCommand(editor, {
          type: 'replaceImage',
          data: normalized.bytes,
          mime: normalized.mime,
        });
      } catch (err) {
        console.error('Replace image error:', err);
      } finally {
        if (e.target) e.target.value = '';
      }
    },
    [editor]
  );

  const active = preview?.bounds ?? target;
  const rendered = useMemo(() => {
    if (!editor?.surface || !active) return null;
    const layout = editor.surface.publishedLayout();
    const coordinates = editor.surface.overlayCoordinates();
    const rect = overlayFrameToSheetCssPixels(
      layout,
      {
        pageIndex: active.pageIndex,
        x: active.x,
        y: active.y,
        width: active.width,
        height: active.height,
      },
      coordinates
    );
    const showHandles = active.canResize;
    const showMove = active.kind === 'anchored' && active.canMove;

    const quickbarTop = rect.top > 52 ? rect.top - 42 : rect.top + rect.height + 10;
    const quickbarLeft = rect.left + rect.width / 2;

    return (
      <>
        <div
          ref={overlayRef}
          className="docx-image-selection-overlay docx-editor-one-surface__overlay-control"
          data-drawing-node-id={active.id}
          tabIndex={0}
          onKeyDown={onOverlayKeyDown}
        >
          {/* Main selection frame */}
          <div
            className="docx-image-selection-overlay__frame"
            role="group"
            aria-label={t('imageOverlay.selection')}
            style={{
              left: `${rect.left}px`,
              top: `${rect.top}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              cursor: showMove ? 'move' : 'default',
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDialogOpen(true);
            }}
            onPointerDown={(event) => {
              guardToolbarMousedown(event);
              if (!showMove || !active.position) return;
              if (event.button !== 0) return;
              event.preventDefault();
              event.stopPropagation();
              beginSession(
                'move',
                null,
                active,
                event.clientX,
                event.clientY,
                event.currentTarget,
                event.pointerId
              );
            }}
          />

          {/* Live Dimension Badge */}
          <div
            className="docx-image-dimension-badge"
            style={{
              left: `${rect.left + rect.width / 2}px`,
              top: `${rect.top - 6}px`,
            }}
          >
            <span>📐</span> {Math.round(rect.width)} × {Math.round(rect.height)} px
          </div>

          {/* 8 Resize Handles */}
          {showHandles
            ? HANDLES.map((handle) => {
                const pos = handlePosition(handle);
                return (
                  <button
                    key={handle}
                    type="button"
                    className="docx-image-selection-overlay__handle"
                    aria-label={t(handleLabelKey(handle))}
                    tabIndex={0}
                    style={{
                      left: `calc(${rect.left}px + ${rect.width}px * ${parseFloat(pos.x) / 100} - 6px)`,
                      top: `calc(${rect.top}px + ${rect.height}px * ${parseFloat(pos.y) / 100} - 6px)`,
                      cursor: cursorForHandle(handle),
                    }}
                    onPointerDown={(event) => {
                      guardToolbarMousedown(event);
                      if (event.button !== 0) return;
                      event.preventDefault();
                      event.stopPropagation();
                      beginSession(
                        'resize',
                        handle,
                        active,
                        event.clientX,
                        event.clientY,
                        event.currentTarget,
                        event.pointerId
                      );
                    }}
                  />
                );
              })
            : null}

          {/* Floating Quick Action Bar */}
          {!preview && (
            <div
              className="docx-image-quickbar"
              style={{
                left: `${quickbarLeft}px`,
                top: `${quickbarTop}px`,
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="docx-image-quickbar-btn docx-image-quickbar-btn--primary"
                onClick={() => setDialogOpen(true)}
                title="Open full Image Editor dialog (Double-click image)"
              >
                <span>✏️</span> Edit Image
              </button>

              <div className="docx-image-quickbar-divider" />

              <button
                type="button"
                className="docx-image-quickbar-btn"
                onClick={() => quickScale(0.5)}
                title="Scale to 50%"
              >
                50%
              </button>

              <button
                type="button"
                className="docx-image-quickbar-btn"
                onClick={() => quickScale(1.0)}
                title="Scale to 100% (Original Size)"
              >
                100%
              </button>

              <div className="docx-image-quickbar-divider" />

              <button
                type="button"
                className="docx-image-quickbar-btn"
                onClick={() => quickWrap(active.kind === 'inline' ? 'square' : 'inline')}
                title="Toggle Text Wrap (Inline / Square)"
              >
                <span>🔲</span> {active.kind === 'inline' ? 'Wrap' : 'Inline'}
              </button>

              <button
                type="button"
                className="docx-image-quickbar-btn"
                onClick={() => replaceInputRef.current?.click()}
                title="Replace image with another file"
              >
                <span>🔄</span> Replace
              </button>

              <div className="docx-image-quickbar-divider" />

              <button
                type="button"
                className="docx-image-quickbar-btn docx-image-quickbar-btn--danger"
                onClick={() => {
                  if (window.confirm('Delete selected image?')) {
                    editor.exec({ type: 'deleteImage' });
                  }
                }}
                title="Delete Image (Del/Backspace)"
              >
                <span>🗑️</span>
              </button>
            </div>
          )}

          {/* Hidden Replace File Input */}
          <input
            ref={replaceInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            style={{ display: 'none' }}
            onChange={handleReplaceImageFile}
          />
        </div>

        {/* Full Image Editor Dialog */}
        <DocxEditorImagePropertiesDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </>
    );
  }, [
    active,
    beginSession,
    dialogOpen,
    editor,
    handleReplaceImageFile,
    onOverlayKeyDown,
    preview,
    quickScale,
    quickWrap,
    t,
  ]);

  if (!rendered || !portalRef.current) return null;
  return createPortal(rendered, portalRef.current);
}
