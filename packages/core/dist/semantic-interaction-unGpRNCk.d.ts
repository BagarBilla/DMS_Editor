import { T as TextMeasurer, S as SemanticLayout, B as BlockFragmentRecord, C as ContentControlBoundaryRecord, a as StyleSpanRecord } from './semantic-records-BC4bIKKL.js';

/** A caret position in the model. */
interface SemanticPosition {
    readonly paragraphId: string;
    readonly offset: number;
}
/** A caret position with the geometry that renders it. */
interface CaretGeometry {
    readonly position: SemanticPosition;
    /** Page-relative, in the same coordinate space as the line boxes. */
    readonly x: number;
    readonly y: number;
    readonly height: number;
    readonly lineId: string;
    readonly pageIndex: number;
}
/**
 * A selection as two semantic positions — never as DOM nodes.
 *
 * `anchor` is where the selection started and `head` is where it currently ends, so `head` before
 * `anchor` is an ordinary backwards selection rather than an error. Collapsed when the two are
 * equal, which is what a caret is.
 */
interface SemanticSelection {
    readonly anchor: SemanticPosition;
    readonly head: SemanticPosition;
}
/** One painted selection rectangle, in page-relative layout points. */
interface SelectionRect {
    readonly pageIndex: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
/**
 * Every caret stop in the document body, in reading order.
 *
 * One per character boundary on every line, plus the line end. Derived rather than stored,
 * so a stop can never survive the content it described. Ownership of a position SHARED by
 * two lines is decided here exactly as `caretAt` decides it. Furniture stories use
 * {@link caretStopsForBlocks} so open header/footer navigation never walks body stops.
 */
declare function caretStops(layout: SemanticLayout, measurer?: TextMeasurer): CaretGeometry[];
/**
 * Caret stops for one story's block fragments (header/footer), in reading order.
 *
 * Coordinates stay story-relative — the same space `hitTestFragments` and furniture paint
 * use — so arrow motion follows tab-stop geometry and projected field atoms without mixing
 * body sheet offsets.
 */
declare function caretStopsForBlocks(layout: SemanticLayout, pageIndex: number, fragments: readonly BlockFragmentRecord[], measurer?: TextMeasurer): CaretGeometry[];
/**
 * How caret geometry is resolved.
 *
 * `preferPage` disambiguates a paragraph that paints on SEVERAL pages — a shared header appears
 * once per page, and without a preference the caret could be placed on any of its copies.
 */
interface CaretAtOptions {
    readonly measurer?: TextMeasurer;
    /**
     * Prefer geometry from this sheet when the same paragraph paints on multiple pages
     * (shared header/footer copies).
     */
    readonly preferredPageIndex?: number;
}
/** Geometry for one model position, or null when it is not laid out. */
declare function caretAt(layout: SemanticLayout, position: SemanticPosition, measurerOrOptions?: TextMeasurer | CaretAtOptions): CaretGeometry | null;
/**
 * The caret position nearest a point, in PAGE-CONTENT coordinates.
 *
 * Never returns null for a point inside the document: a click in the margin, past the end of
 * a line, or below the last line still has an obvious intended caret, and refusing to answer
 * would make those clicks do nothing.
 *
 * The rules live in `semantic-hit-test.ts`, which answers with the cell address and the
 * on-glyphs flag a pointer controller needs too; this keeps the geometry-only shape for
 * callers that want nothing else.
 */
declare function hitTestSemantic(layout: SemanticLayout, point: {
    readonly x: number;
    readonly y: number;
    readonly pageIndex?: number;
}): CaretGeometry | null;
/**
 * Innermost content-control boundary at a page-content point, or null outside every control.
 *
 * Prefers the deepest nesting depth when nested boundaries share geometry.
 */
declare function contentControlAtSemantic(layout: SemanticLayout, point: {
    readonly x: number;
    readonly y: number;
    readonly pageIndex?: number;
}): ContentControlBoundaryRecord | null;
/** Layout-published content-control boundaries in document order. */
declare function contentControlsInLayout(layout: SemanticLayout): readonly ContentControlBoundaryRecord[];
/** The rectangles covering a selection, one per line it spans. */
declare function selectionRects(layout: SemanticLayout, selection: SemanticSelection): SelectionRect[];
/** A model range to highlight, and the key the caller knows it by. */
interface KeyedRange {
    readonly key: string;
    readonly from: SemanticPosition;
    readonly to: SemanticPosition;
}
/**
 * Rectangles for MANY ranges in ONE pass over the lines.
 *
 * Not `selectionRects` in a loop. That walks every page, fragment and line per range, and a
 * contract with two hundred comments would re-walk the whole document two hundred times on
 * every layout — the highlight would cost more than the layout it decorates. One pass tests
 * each line against every range instead, which is the same work a single selection does.
 */
declare function keyedRangeRects(layout: SemanticLayout, ranges: readonly KeyedRange[], 
/**
 * Pages to measure, or every page when absent.
 *
 * A band that is not on screen is not painted, so measuring it is pure cost — and it is
 * cost paid per keystroke, because an edit republishes the layout. Bounding this to the
 * materialized pages is what keeps typing in a heavily reviewed document as fast as
 * typing in a clean one.
 */
pages?: ReadonlySet<number>): Map<string, SelectionRect[]>;
/** Paragraph ids in document order, deduplicated across fragments. */
declare function documentOrder(layout: SemanticLayout): string[];
/**
 * One caret movement, in Word's own vocabulary.
 *
 * Visual rather than logical where the two differ: `left` means left on screen, which in
 * right-to-left text is forward through the string.
 */
type NavigationCommand = 'left' | 'right' | 'up' | 'down' | 'wordLeft' | 'wordRight' | 'lineStart' | 'lineEnd' | 'documentStart' | 'documentEnd' | 'pageUp' | 'pageDown';
/**
 * The text of one paragraph, read back from the layout records.
 *
 * Word boundaries need characters, and the records carry them: every span holds the text it
 * was laid out from, keyed by the source range it covers. Reading them back keeps word
 * motion in the interaction lane instead of making it a second consumer of the model.
 */
declare function paragraphTextFromLayout(layout: SemanticLayout, paragraphId: string): string;
/**
 * The next word boundary from `offset`, in `direction`.
 *
 * Word-LEFT skips any whitespace immediately behind the caret and then the word behind that,
 * which is what every editor does and what makes repeated presses walk words rather than
 * alternate between a word and the space before it. Word-RIGHT stops at the END of the
 * current word, then skips the following whitespace on the next press.
 */
declare function wordBoundary(text: string, offset: number, direction: -1 | 1): number;
/**
 * How a caret move resolves.
 *
 * Story-scoped stops are REQUIRED when navigating inside an open header or footer: the body's
 * stops describe a different story, and moving through them would walk the caret out of the
 * furniture the user is editing.
 */
interface MoveCaretOptions {
    /**
     * Precomputed stops for the active story. Open header/footer navigation MUST pass
     * story-scoped stops from {@link caretStopsForBlocks}; body keeps the default.
     */
    readonly stops?: readonly CaretGeometry[];
    readonly measurer?: TextMeasurer;
}
/**
 * Move a caret.
 *
 * Vertical movement keeps a DESIRED X so a caret travelling through short lines returns to
 * its original column rather than collapsing to the end of the shortest one. The caller
 * threads that value; passing null starts a fresh vertical run from the current position.
 */
declare function moveCaret(layout: SemanticLayout, position: SemanticPosition, command: NavigationCommand, desiredX?: number | null, options?: MoveCaretOptions): {
    position: SemanticPosition;
    desiredX: number | null;
} | null;
/**
 * The anchor an IME composition is attached to.
 *
 * Composition needs a position that survives the intermediate transactions it produces, so
 * it is expressed in model coordinates and re-resolved against each new layout rather than
 * cached as geometry.
 */
declare function compositionAnchor(layout: SemanticLayout, position: SemanticPosition): CaretGeometry | null;
/** The style spans a selection touches, for reporting active formatting. */
declare function spansInSelection(layout: SemanticLayout, selection: SemanticSelection): StyleSpanRecord[];

export { type CaretGeometry as C, type KeyedRange as K, type MoveCaretOptions as M, type NavigationCommand as N, type SemanticPosition as S, type SemanticSelection as a, type CaretAtOptions as b, type SelectionRect as c, caretAt as d, caretStops as e, caretStopsForBlocks as f, compositionAnchor as g, contentControlAtSemantic as h, contentControlsInLayout as i, documentOrder as j, hitTestSemantic as k, keyedRangeRects as l, moveCaret as m, spansInSelection as n, paragraphTextFromLayout as p, selectionRects as s, wordBoundary as w };
