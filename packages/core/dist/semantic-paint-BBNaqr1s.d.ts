import { C as ContentControlBoundaryRecord, S as SemanticLayout } from './semantic-records-BC4bIKKL.js';
import { V as ValidatedImageBytesHandle, R as RenderableImageMime } from './image-resources-C_YnqPhn.js';

/** Host port for safe blob URLs — only called for {@link ImageResourceState.kind} `ready`. */
interface PaintImageUrlPort {
    create(handle: ValidatedImageBytesHandle, mime: RenderableImageMime): string;
    revoke(url: string): void;
}
/** Localized refusal labels; adapters supply i18n-backed implementations. */
interface DrawingPaintStrings {
    readonly unsupportedFormat: (format: string) => string;
    readonly nonPictureGraphic: (kind: string) => string;
    readonly missingResource: string;
    readonly externalResource: string;
    readonly invalidResource: string;
    readonly contentMismatch: string;
    readonly decodeFailed: string;
    readonly resourceLimit: string;
    readonly pendingResource: string;
}

/**
 * When a field's result is drawn on its grey block, following Word's own View option.
 *
 * `when-selected` is Word's default and the reason the option exists at all: a document dense
 * with cross-references turns largely grey under `always`, and under `never` a reader cannot
 * tell computed text from typed text at all.
 */
type FieldShadingMode = 'never' | 'when-selected' | 'always';
/** Word's default: shaded only while the caret is inside the field. */
declare const DEFAULT_FIELD_SHADING: FieldShadingMode;
/**
 * How a layout is painted into DOM. Every field is optional.
 *
 * The painted pages ARE the editable surface, so everything here is presentation-only — nothing
 * set through these options is ever serialised back into the document.
 */
interface PaintOptions {
    /** Points to CSS pixels. 96/72 renders a point as a CSS point at 100% zoom. */
    readonly scale?: number;
    /** Generated paragraphs that paint as non-editable navigation surfaces. */
    readonly readOnlyParagraphIds?: ReadonlySet<string>;
    /**
     * Empty-TOC begin paragraphs that paint subtle identifiable furniture. Paint-only — never
     * serialised into the document.
     */
    readonly emptyTocPlaceholderIds?: ReadonlySet<string>;
    /** Marks painted pages as presentational, so assistive tech reads the editable projection. */
    readonly ariaHidden?: boolean;
    /**
     * Page indices to build in detail (task 9.4).
     *
     * Omitted means all of them. A page left out keeps its size and position but no content,
     * so the document's height and page count are unchanged and scrolling to it reveals it
     * instead of reflowing everything underneath.
     */
    readonly materialize?: ReadonlySet<number>;
    /**
     * Family-alias lookup for fonts the host registered on behalf of THIS document (see
     * {@link PaintContext.fontAlias}). Painted runs emit the alias ahead of the declared
     * family, so a file can never shadow a family name the host page uses.
     */
    readonly fontAlias?: (family: string) => string | undefined;
    /** See {@link PaintContext.defaultFontFamily}. */
    readonly defaultFontFamily?: string;
    /** See {@link PaintContext.fieldShading}. */
    readonly fieldShading?: FieldShadingMode;
    /** See {@link PaintContext.shadeFormFields}. */
    readonly shadeFormFields?: boolean;
    /**
     * Relationship id of the header/footer story currently open for editing.
     *
     * When set, the matching `[data-docx-hf]` container is editable and every body
     * `.docx-page-content` box is inert; all other furniture stays read-only.
     */
    readonly activeHeaderFooterRId?: string;
    /**
     * Sheet that hosts the active visual occurrence of a shared furniture part.
     *
     * Required with {@link activeHeaderFooterRId} so only one painted copy receives
     * `data-docx-hf-active` / the engine caret when the same rId appears on many pages.
     */
    readonly activeHeaderFooterPageIndex?: number;
    /**
     * On-demand content-control boundary chrome (show-all and/or caret-entry).
     *
     * Furniture only — never contributes layout records or changes page geometry. Omitted or
     * empty means no control chrome is painted. Folded into the paint-reuse key so a toggle
     * rebuilds furniture without a layout pass.
     */
    readonly contentControlChrome?: {
        readonly showAll?: boolean;
        /** Control ids whose boundaries are visible because the caret is inside them. */
        readonly activeIds?: ReadonlySet<string>;
        /**
         * Control ids whose boundaries are visible because the pointer is over them.
         * Used for TOC hover chrome without projecting a persistent caret-active state.
         *
         * Deliberately OUTSIDE the paint-reuse key: hover must never rebuild a page. The
         * surface toggles `data-hover` / `data-boundary-visible` on the painted chrome it
         * already has, and this set only tells a page that rebuilds for some OTHER reason
         * which of its controls is currently under the pointer.
         */
        readonly hoverIds?: ReadonlySet<string>;
        /**
         * Control ids whose boundary furniture is painted by something else.
         *
         * An empty TOC paints its own placeholder box on the begin paragraph, so drawing the
         * control boundary as well left two rounded rectangles (of different heights) plus a
         * label chip stacked over one empty region.
         */
        readonly suppressedIds?: ReadonlySet<string>;
        /** Checkbox control ids whose canonical `w14:checked` state is on. */
        readonly checkedIds?: ReadonlySet<string>;
        /** Non-SDT structured regions that intentionally reuse content-control chrome. */
        readonly additionalBoundaries?: readonly ContentControlBoundaryRecord[];
        /** Control ids that represent TOC regions (hover-only chrome; never caret-sticky). */
        readonly tocControlIds?: ReadonlySet<string>;
    };
    readonly drawingStrings?: DrawingPaintStrings;
    readonly imageUrlPort?: PaintImageUrlPort;
}

/**
 * Paint a whole layout into a container, reusing the pages that did not change.
 *
 * The DOM is built with `createElement` and `textContent` only — no file-derived string is
 * ever parsed as markup — and stray children (nothing this module painted) are removed, so
 * the container's content is always exactly the painted pages.
 */
declare function paintSemanticLayout(container: HTMLElement, layout: SemanticLayout, options?: PaintOptions): void;

export { DEFAULT_FIELD_SHADING as D, type FieldShadingMode as F, type PaintOptions as P, type DrawingPaintStrings as a, paintSemanticLayout as p };
