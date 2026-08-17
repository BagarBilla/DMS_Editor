export { D as DEFAULT_FIELD_SHADING, F as FieldShadingMode, P as PaintOptions, p as paintSemanticLayout } from './semantic-paint-BBNaqr1s.js';
import { S as SemanticLayout } from './semantic-records-BC4bIKKL.js';
import './image-resources-C_YnqPhn.js';
import './tree-op-types-DWLCllG7.js';
import './ooxml-tree-BU0e3DVi.js';
import './ooxml-package-D_CtywTW.js';
import './revision-projection-DHAkcD_L.js';

/** A rectangle in page-content coordinates, on a named page. */
interface OverlayRect {
    readonly pageIndex: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    /**
     * Class for THIS rectangle, overriding the layer's default.
     *
     * One layer draws bands that mean different things — every commented range, and the one the
     * caret is in — and splitting them into two layers would stack two absolutely positioned
     * sheets over the pages just to vary a colour.
     */
    readonly className?: string;
}
/**
 * How the selection overlay draws its rectangles over the painted pages.
 *
 * `scale` and `pageOffsetX` must match what the page painter used, or the highlight lands beside
 * the content it describes rather than on it.
 */
interface SelectionOverlayOptions {
    /** Points to CSS pixels. */
    readonly scale: number;
    /**
     * Per-page horizontal offset the page painter applied, by page index.
     *
     * A document whose pages differ in width centres each one individually, so a page is drawn
     * at an x its record does not carry. Without the same offset here a highlight would sit
     * beside the cells it describes.
     */
    readonly pageOffsetX?: ReadonlyMap<number, number>;
    /**
     * Class for each painted rectangle. Defaults to the cell-selection class, because a cell
     * rectangle was the only thing this layer drew when it was written.
     *
     * A retained TEXT range is drawn here too and must not look like selected cells — one is
     * "these cells are chosen", the other is "your selection is still here while you type in
     * this panel". Same geometry, different meaning, so the caller names the class.
     */
    readonly className?: string;
}
/**
 * Draw a set of rectangles over the pages.
 *
 * The layer is a SIBLING of the pages, never a child: the page painter sweeps anything it did
 * not paint out of its own subtree, and a stray child of a contenteditable is editable content
 * a keystroke could land in.
 */
declare function paintSelectionOverlay(layer: HTMLElement, layout: SemanticLayout, rects: readonly OverlayRect[], options: SelectionOverlayOptions): void;

export { type OverlayRect, type SelectionOverlayOptions, paintSelectionOverlay };
