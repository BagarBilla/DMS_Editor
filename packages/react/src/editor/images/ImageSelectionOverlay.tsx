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
  emuToOverlayPoints,
  IMAGE_OVERLAY_NUDGE_PT,
  IMAGE_OVERLAY_NUDGE_SHIFT_PT,
  isStaleImageInteractionCommit,
  pointsToEmu,
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

const HANDLES: readonly ImageResizeHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const AUTO_SCROLL_EDGE_PX = 40;
const AUTO_SCROLL_MAX_PT = 12;

interface CropDraft {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
}

type CustomSession = Omit<ImageInteractionSession, 'mode'> & {
  readonly mode: 'move' | 'resize' | 'crop';
  readonly startCrop?: CropDraft;
  readonly currentCrop?: CropDraft;
};

function isCoreInteractionSession(session: CustomSession): session is ImageInteractionSession {
  return session.mode !== 'crop';
}

interface PreviewState {
  readonly session: CustomSession;
  readonly bounds: SelectedDrawingOverlayTarget;
  readonly accumulatedScrollPt: number;
  readonly cropLabel?: string;
}

export interface ImageSelectionOverlayProps {
  readonly containerRef: RefObject<HTMLElement | null>;
  readonly portalRef: RefObject<HTMLElement | null>;
  readonly scrollPort?: ImageOverlayScrollPort;
}

function handleLabelKey(handle: ImageResizeHandle): `imageOverlay.handle.${ImageResizeHandle}` {
  return `imageOverlay.handle.${handle}`;
}

function isCropHandle(handle: ImageResizeHandle): boolean {
  return handle === 'n' || handle === 's' || handle === 'w' || handle === 'e';
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
      return 'row-resize';
    case 'w':
    case 'e':
      return 'col-resize';
    default:
      return 'pointer';
  }
}

function handleOffsetCoords(handle: ImageResizeHandle): { readonly x: number; readonly y: number } {
  switch (handle) {
    case 'nw': return { x: 0, y: 0 };
    case 'n':  return { x: 0.5, y: 0 };
    case 'ne': return { x: 1, y: 0 };
    case 'e':  return { x: 1, y: 0.5 };
    case 'se': return { x: 1, y: 1 };
    case 's':  return { x: 0.5, y: 1 };
    case 'sw': return { x: 0, y: 1 };
    case 'w':  return { x: 0, y: 0.5 };
  }
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
      const drawingEl = element?.closest<HTMLElement>('[data-drawing-node-id]');
      const drawingId = drawingEl?.getAttribute('data-drawing-node-id');
      focusRequestedForDrawingRef.current = drawingId ?? null;
      if (drawingId) {
        setTimeout(() => {
          if (editor?.surface) {
            setTarget(selectedDrawingOverlayTargetOf(editor.surface));
            overlayRef.current?.focus({ preventScroll: true });
          }
        }, 10);
      }
    };
    container.addEventListener('pointerdown', onPointerDown, { capture: true });
    return () => container.removeEventListener('pointerdown', onPointerDown, { capture: true });
  }, [containerRef, editor]);

  useEffect(() => {
    if (!editor) {
      setTarget(null);
      return undefined;
    }
    const sync = (): void => {
      setTarget(selectedDrawingOverlayTargetOf(editor.surface));
    };
    sync();
    const off = [
      editor.on('change', () => {
        sync();
        queueMicrotask(sync);
      }),
      editor.on('selectionChange', sync),
    ];
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
    const current = previewRef.current;
    if (current?.session?.drawingNodeId) {
      const drawingEl = document.querySelector<HTMLElement>(
        `[data-drawing-node-id="${current.session.drawingNodeId}"]`
      );
      if (drawingEl) {
        drawingEl.style.transform = '';
      }
    }
    setPreview(null);
    pointerStartRef.current = null;
    const captured = captureTargetRef.current;
    captureTargetRef.current = null;
    if (captured) {
      try {
        const pointerId = (captured as HTMLElement & { _lastPointerId?: number })._lastPointerId;
        if (pointerId !== undefined) {
          captured.releasePointerCapture(pointerId);
        }
      } catch {
        // Already released.
      }
    }
  }, []);

  const beginSession = useCallback(
    (
      mode: 'move' | 'resize' | 'crop',
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

      const snapshot = editor.snapshot();
      const currentCrop: CropDraft = snapshot.image?.crop ?? { left: 0, top: 0, right: 0, bottom: 0 };
      const startPosition: DrawingPositionInput = active.position ?? {
        mode: 'frame' as const,
        relativeToH: 'column' as const,
        relativeToV: 'paragraph' as const,
        horizontalEmu: 0,
        verticalEmu: 0,
      };

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
          startPosition,
          anchorFrameOrigin: active.anchorFrameOrigin,
          transform: active.transform,
          mode,
          handle,
          startCrop: currentCrop,
          currentCrop,
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
      session: CustomSession,
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
      if (!editor) {
        clearPreview();
        return;
      }
      if (session.mode === 'crop' && session.currentCrop) {
        editor.exec({
          type: 'setImageProperties',
          crop: {
            left: Math.round(session.currentCrop.left * 10) / 10,
            top: Math.round(session.currentCrop.top * 10) / 10,
            right: Math.round(session.currentCrop.right * 10) / 10,
            bottom: Math.round(session.currentCrop.bottom * 10) / 10,
          },
        });
      } else if (session.mode === 'resize') {
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

      // Immediately refresh target to keep resize handles continuous & active!
      if (editor.surface) {
        setTarget(selectedDrawingOverlayTargetOf(editor.surface));
      }
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
      if (!current || !startPointer || !editor?.surface) return;
      const deltaX = cssPixelsToLayoutPoints(
        event.clientX - startPointer.x,
        coordinates.paintScale
      );
      const deltaY = cssPixelsToLayoutPoints(
        event.clientY - startPointer.y,
        coordinates.paintScale
      );
      // ── MODE 1: Move Drag (Hardware-accelerated 60fps) ──
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

        // Smooth GPU transform on document image node during drag
        const drawingEl = document.querySelector<HTMLElement>(
          `[data-drawing-node-id="${current.session.drawingNodeId}"]`
        );
        if (drawingEl) {
          const scale = coordinates.paintScale;
          drawingEl.style.transform = `translate3d(${deltaX * scale}px, ${(deltaY + accumulatedScrollPt) * scale}px, 0px)`;
        }

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

      // ── MODE 2: Live Edge Handle Image Cropping ──
      if (current.session.mode === 'crop' && current.session.startCrop && current.session.handle) {
        const handle = current.session.handle;
        const startW = emuToOverlayPoints(current.session.startWidthEmu);
        const startH = emuToOverlayPoints(current.session.startHeightEmu);
        const startCrop = current.session.startCrop;

        let left = startCrop.left;
        let top = startCrop.top;
        let right = startCrop.right;
        let bottom = startCrop.bottom;
        let cropLabel = '';

        if (handle === 'n') {
          const deltaPct = (deltaY / Math.max(10, startH)) * 100;
          top = Math.max(0, Math.min(80, startCrop.top + deltaPct));
          if (top + bottom > 88) top = Math.max(0, 88 - bottom);
          cropLabel = `✂️ Top Crop: ${Math.round(top)}%`;
        } else if (handle === 's') {
          const deltaPct = (deltaY / Math.max(10, startH)) * 100;
          bottom = Math.max(0, Math.min(80, startCrop.bottom - deltaPct));
          if (top + bottom > 88) bottom = Math.max(0, 88 - top);
          cropLabel = `✂️ Bottom Crop: ${Math.round(bottom)}%`;
        } else if (handle === 'w') {
          const deltaPct = (deltaX / Math.max(10, startW)) * 100;
          left = Math.max(0, Math.min(80, startCrop.left + deltaPct));
          if (left + right > 88) left = Math.max(0, 88 - right);
          cropLabel = `✂️ Left Crop: ${Math.round(left)}%`;
        } else if (handle === 'e') {
          const deltaPct = (deltaX / Math.max(10, startW)) * 100;
          right = Math.max(0, Math.min(80, startCrop.right - deltaPct));
          if (left + right > 88) right = Math.max(0, 88 - left);
          cropLabel = `✂️ Right Crop: ${Math.round(right)}%`;
        }

        // Live visual crop feedback on DOM image
        const drawingEl = document.querySelector<HTMLElement>(
          `[data-drawing-node-id="${current.session.drawingNodeId}"]`
        );
        if (drawingEl) {
          const img = drawingEl.querySelector<HTMLImageElement>('img.docx-drawing-image');
          if (img) {
            const lFrac = left / 100;
            const tFrac = top / 100;
            const rFrac = right / 100;
            const bFrac = bottom / 100;
            const visW = Math.max(0.01, 1 - lFrac - rFrac);
            const visH = Math.max(0.01, 1 - tFrac - bFrac);
            img.style.width = `${(1 / visW) * 100}%`;
            img.style.height = `${(1 / visH) * 100}%`;
            img.style.left = `${(-lFrac / visW) * 100}%`;
            img.style.top = `${(-tFrac / visH) * 100}%`;
          }
        }

        setPreview({
          ...current,
          session: {
            ...current.session,
            currentCrop: { left, top, right, bottom },
          },
          cropLabel,
        });
        return;
      }

      // ── MODE 3: Corner Handle Scaling & Resizing ──
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

      // ── Live Resizing on document image node ──
      const drawingEl = document.querySelector<HTMLElement>(
        `[data-drawing-node-id="${current.session.drawingNodeId}"]`
      );
      if (drawingEl) {
        const scale = coordinates.paintScale;
        const newWidthPx = resized.previewBounds.width * scale;
        const newHeightPx = resized.previewBounds.height * scale;
        drawingEl.style.width = `${newWidthPx}px`;
        drawingEl.style.height = `${newHeightPx}px`;
        const frame = drawingEl.querySelector<HTMLElement>('.docx-drawing-image-frame');
        if (frame) {
          frame.style.width = `${newWidthPx}px`;
          frame.style.height = `${newHeightPx}px`;
        }
        // ONLY adjust style.left/style.top if drawing is explicitly anchored
        if (current.session.kind === 'anchored') {
          drawingEl.style.left = `${resized.previewBounds.x * scale}px`;
          drawingEl.style.top = `${resized.previewBounds.y * scale}px`;
        }
      }
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

        if (current.session.mode === 'move') {
          const drawingEl = document.querySelector<HTMLElement>(
            `[data-drawing-node-id="${current.session.drawingNodeId}"]`
          );
          if (drawingEl) {
            drawingEl.style.transform = '';
          }
          if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
            const finalDeltaY = deltaY + current.accumulatedScrollPt;
            if (current.session.kind === 'inline') {
              editor.exec({
                type: 'setImageProperties',
                wrap: 'square',
                horizontalEmu: pointsToEmu(deltaX),
                verticalEmu: pointsToEmu(finalDeltaY),
                relativeToH: 'column',
                relativeToV: 'paragraph',
              });
            } else {
              const startPos = current.session.startPosition ?? {
                mode: 'frame',
                relativeToH: 'column',
                relativeToV: 'paragraph',
                horizontalEmu: 0,
                verticalEmu: 0,
              };
              const moved = computeMovedImagePosition(startPos, deltaX, finalDeltaY);
              editor.exec({ type: 'setImagePosition', ...moved });
            }
          }
          clearPreview();
          if (editor.surface) {
            setTarget(selectedDrawingOverlayTargetOf(editor.surface));
          }
          return;
        }

        if (current.session.mode === 'crop') {
          commitSession(
            current.session,
            current.session.startWidthEmu,
            current.session.startHeightEmu,
            current.session.startBounds,
            current.session.startPosition
          );
          return;
        }

        if (!isCoreInteractionSession(current.session)) return;

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

  const active = preview?.bounds ?? target;

  const rendered = useMemo(() => {
    if (!editor?.surface || !active) return null;

    let rect: { left: number; top: number; width: number; height: number };
    const drawingEl = containerRef.current?.querySelector<HTMLElement>(
      `[data-drawing-node-id="${active.id}"]`
    );
    const portalEl = portalRef.current;
    if (drawingEl && portalEl) {
      const portalRect = portalEl.getBoundingClientRect();
      const elRect = drawingEl.getBoundingClientRect();
      rect = {
        left: elRect.left - portalRect.left,
        top: elRect.top - portalRect.top,
        width: elRect.width,
        height: elRect.height,
      };
    } else {
      const layout = editor.surface.publishedLayout();
      const coordinates = editor.surface.overlayCoordinates();
      rect = overlayFrameToSheetCssPixels(
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
    }

    const showHandles = active.canResize;
    const showMove = true;

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
            title="Drag to move image anywhere on the page"
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


          {/* Live Dimension / Crop Badge */}
          <div
            className="docx-image-dimension-badge"
            style={{
              left: `${rect.left + rect.width / 2}px`,
              top: `${rect.top - 8}px`,
            }}
          >
            {preview?.cropLabel ? (
              <span>{preview.cropLabel}</span>
            ) : (
              <>
                <span>📐</span> {Math.round(rect.width)} × {Math.round(rect.height)} px
              </>
            )}
          </div>

          {/* 8 Handles: Corner Resize Handles & Edge Crop Handles */}
          {showHandles
            ? HANDLES.map((handle) => {
                const pos = handleOffsetCoords(handle);
                const isCrop = isCropHandle(handle);
                const isHoriz = handle === 'n' || handle === 's';
                const isVert = handle === 'w' || handle === 'e';

                let handleLeft = rect.left + rect.width * pos.x - 6;
                let handleTop = rect.top + rect.height * pos.y - 6;
                let handleClass = 'docx-image-selection-overlay__handle';

                if (isHoriz) {
                  handleLeft = rect.left + rect.width * pos.x - 12;
                  handleTop = rect.top + rect.height * pos.y - 4;
                  handleClass += ' docx-image-selection-overlay__handle--crop-h';
                } else if (isVert) {
                  handleLeft = rect.left + rect.width * pos.x - 4;
                  handleTop = rect.top + rect.height * pos.y - 12;
                  handleClass += ' docx-image-selection-overlay__handle--crop-v';
                }

                return (
                  <button
                    key={handle}
                    type="button"
                    className={handleClass}
                    aria-label={t(handleLabelKey(handle))}
                    title={isCrop ? 'Drag to crop image' : 'Drag to resize image'}
                    tabIndex={0}
                    style={{
                      left: `${handleLeft}px`,
                      top: `${handleTop}px`,
                      cursor: cursorForHandle(handle),
                    }}
                    onPointerDown={(event) => {
                      guardToolbarMousedown(event);
                      if (event.button !== 0) return;
                      event.preventDefault();
                      event.stopPropagation();
                      beginSession(
                        isCrop ? 'crop' : 'resize',
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
        </div>

        {/* Full Image Editor Dialog (accessible via double click on image or toolbar) */}
        <DocxEditorImagePropertiesDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </>
    );
  }, [
    active,
    beginSession,
    containerRef,
    dialogOpen,
    editor,
    onOverlayKeyDown,
    portalRef,
    preview,
    t,
  ]);

  if (!rendered || !portalRef.current) return null;
  return createPortal(rendered, portalRef.current);
}


