import { e as OoxmlPart, a as OoxmlElement, O as OoxmlNode } from './ooxml-tree-BU0e3DVi.cjs';
import { P as PageGeometry, I as InlineDrawingRecord, A as AnchoredDrawingRecord, T as TextMeasurer, L as LineRecord, S as SemanticLayout, C as ContentControlBoundaryRecord, a as StyleSpanRecord, b as TableRowFragmentRecord, c as TableCellFragmentRecord } from './semantic-records-DC6V1U3T.cjs';
import { R as RevisionDisplayMode } from './revision-projection-72ZApe-g.cjs';
import { S as SemanticPosition, C as CaretGeometry, a as SemanticSelection } from './semantic-interaction-B4HrJFQ2.cjs';

/**
 * Hard ceiling on sections enumerated from a document (matches write-path
 * `MAX_SECTIONS` in note/hf lifecycle). Hostile packages with unbounded `w:sectPr`
 * marks fail closed here rather than amplifying layout props arrays.
 */
declare const MAX_DOCUMENT_SECTIONS = 4096;
/** A section's margins in twips, including the header and footer reserve bands. */
interface SectionMargins {
    readonly topTwips: number;
    readonly rightTwips: number;
    readonly bottomTwips: number;
    readonly leftTwips: number;
    readonly headerTwips: number;
    readonly footerTwips: number;
    readonly gutterTwips: number;
}
/** One explicit `w:col`: its width and the gap after it. */
interface SectionColumnDefinition {
    readonly widthTwips: number;
    /** Space after this column; zero on the final column. */
    readonly gapTwips: number;
}
/**
 * A section's column layout.
 *
 * Equal-width and explicit-width columns are one type because a file may declare `w:num` with no
 * `w:col` children at all, and layout must handle both without branching at every use site.
 */
interface SectionColumns {
    readonly count: number;
    /** Shared gap for equal-width columns and fallback gap for incomplete explicit definitions. */
    readonly gapTwips: number;
    readonly equalWidth?: boolean;
    readonly separator?: boolean;
    /** Authored `w:col` geometry when `equalWidth` is false. */
    readonly definitions?: readonly SectionColumnDefinition[];
}
/**
 * How this section is placed relative to the previous one (ECMA-376 17.6.22,
 * `ST_SectionMark`).
 *
 * All five schema values are read. `nextColumn` paginates like `nextPage` for now: in a
 * single-column section that IS Word's behaviour, and multi-column flow is not modelled,
 * so collapsing it at the parse boundary would only hide the authored value from a
 * consumer that asks.
 */
type SectionBreakType = 'nextPage' | 'continuous' | 'evenPage' | 'oddPage' | 'nextColumn';
/**
 * Authored `w:pgNumType` (ECMA-376 CT_PageNumber).
 *
 * Distinguishes three states via {@link SectionProperties.pageNumbering}:
 * - element absent → `undefined` (Word defaults; no empty element to re-emit)
 * - empty `<w:pgNumType/>` → `{}` (present, no authored attrs; must round-trip empty)
 * - attributes set → only those keys appear (never invent schema defaults like `fmt=decimal`)
 *
 * `chapStyle` / `chapSep` are preserved for consumers; PAGE projection does not yet compose
 * chapter numbers (heading outline resolution is out of this slice).
 */
interface SectionPageNumbering {
    /** Authored `@w:start` when present and in range; otherwise omitted. */
    readonly start?: number;
    /** Authored `@w:fmt` (ST_NumberFormat) when present; otherwise omitted. */
    readonly fmt?: string;
    /** Authored `@w:chapStyle` outline level when present and in range. */
    readonly chapStyle?: number;
    /** Authored `@w:chapSep` when present (hyphen / period / colon / emDash / enDash). */
    readonly chapSep?: string;
}
/**
 * One section's resolved `w:sectPr`, as layout needs it.
 *
 * Resolved, not raw: defaults the file omitted are filled in here (an absent `w:type` is
 * `nextPage`), so layout never has to know which attributes were authored and which were
 * inherited.
 */
interface SectionProperties {
    readonly pageSize: {
        readonly widthTwips: number;
        readonly heightTwips: number;
    };
    readonly margins: SectionMargins;
    readonly columns: SectionColumns;
    readonly landscape: boolean;
    readonly titlePage: boolean;
    /** Absent `w:type` defaults to `nextPage`. */
    readonly breakType: SectionBreakType;
    /**
     * Authored page-number type. Absent when `w:pgNumType` is missing; empty object when the
     * element is present with no attributes (comprehensive-fixture shape).
     */
    readonly pageNumbering?: SectionPageNumbering;
}
/**
 * One section of the body story: contiguous top-level blocks plus the properties that end it.
 *
 * `blockStart` / `blockEndExclusive` index into `storyBlocks(part)`.
 */
interface DocumentSection {
    readonly index: number;
    readonly properties: SectionProperties;
    readonly blockStart: number;
    readonly blockEndExclusive: number;
}
/** US Letter, portrait, one-inch margins: Word's own default when a section says nothing. */
declare const DEFAULT_SECTION_PROPERTIES: SectionProperties;
/**
 * Parse authored `w:pgNumType` without inventing schema defaults.
 *
 * Returns `undefined` when the element is absent. An empty element yields `{}` so callers
 * can tell "present but unauthored" from "missing" and serialization can re-emit empty.
 * Hostile / out-of-range attribute values are dropped rather than clamped into meaning.
 */
declare function parsePageNumbering(sectPr: OoxmlNode): SectionPageNumbering | undefined;
/** Parse one `w:sectPr` into geometry/break properties (null reads as Word's defaults). */
declare function parseSectionProperties(sectPr: OoxmlNode | null | undefined): SectionProperties;
/** `w:sectPr` nested under a paragraph's `w:pPr`, if present. */
declare function paragraphSectionNode(paragraph: OoxmlElement): OoxmlElement | undefined;
/**
 * The section properties a part declares, or Word's defaults where it says nothing.
 *
 * Returns the FINAL section (body-level `w:sectPr`, else the last paragraph-level one).
 * Multi-section geometry belongs to `enumerateDocumentSections`; chrome that needs "the
 * document's page" still reads the last section, which is what Word's body-level sectPr is.
 */
declare function readSectionProperties(part: OoxmlPart): SectionProperties;
/**
 * Split the body story into sections.
 *
 * A paragraph carrying `w:pPr/w:sectPr` ends the current section (that paragraph is IN the
 * section being ended). The body-level `w:sectPr` ends the final section. A document with
 * neither yields one section of Word defaults covering every block.
 *
 * Enumeration is capped at {@link MAX_DOCUMENT_SECTIONS}. Further paragraph-level section
 * breaks are ignored and remaining blocks fold into the last accepted section (fail closed).
 *
 * `displayMode` MUST match the one the caller passes to `storyBlocks`. `blockStart` /
 * `blockEndExclusive` are indices into that list, and the list changes shape with the mode:
 * the proposed view drops a paragraph whose mark and content a revision both removed. Slicing
 * a filtered list with indices counted over an unfiltered one puts body text under another
 * section's page geometry — the wrong paper size, the wrong margins, the wrong header.
 */
declare function enumerateDocumentSections(part: OoxmlPart, displayMode?: RevisionDisplayMode): DocumentSection[];
/**
 * Every section in a document, with a flag saying whether the list was cut short.
 *
 * `truncated` is reported rather than silent: section count comes from a file, so a crafted
 * document declaring thousands of paragraph-level `w:sectPr` marks is bounded, and a reader
 * should be able to tell that happened.
 */
interface DocumentSectionsEnumeration {
    readonly sections: DocumentSection[];
    /** True when paragraph-level sectPr marks beyond {@link MAX_DOCUMENT_SECTIONS} were dropped. */
    readonly truncated: boolean;
}
/**
 * Like {@link enumerateDocumentSections}, but reports whether the section bound clipped
 * hostile input. Prefer the plain enumerator for normal layout; use this when a caller
 * needs a named fail-closed diagnostic.
 */
declare function enumerateDocumentSectionsBounded(part: OoxmlPart, displayMode?: RevisionDisplayMode): DocumentSectionsEnumeration;
/**
 * Section properties as the geometry layout paginates against.
 *
 * The gutter is added to the LEFT margin: it is binding allowance, extra space on the inner
 * edge, and folding it into the content width instead would silently narrow every line.
 */
declare function geometryOfSection(section: SectionProperties): PageGeometry;

/** A point in the coordinate space named by the function taking it. */
interface HitPoint {
    readonly x: number;
    readonly y: number;
}
/** The innermost table cell a point resolved through. */
interface TableCellAddress {
    /** Canonical node id of the `w:tbl`. */
    readonly tableId: string;
    /** Canonical node id of the `w:tr`. */
    readonly rowId: string;
    /** Canonical node id of the `w:tc`. */
    readonly cellId: string;
    /** Ordinal in the WHOLE table, stable across fragments and header repeats. */
    readonly rowIndex: number;
    readonly gridColumn: number;
    readonly gridSpan: number;
}
/** Stable inline drawing identity when a hit resolves to a drawing atom. */
interface SemanticHitDrawing {
    readonly drawingNodeId: string;
    readonly paragraphId: string;
    readonly start: number;
}
/** What a point landed on: a semantic position, its caret geometry, and where it sits. */
interface SemanticHit {
    readonly position: SemanticPosition;
    readonly caret: CaretGeometry;
    readonly pageIndex: number;
    readonly lineId: string;
    /** Null outside a table; the innermost cell when tables nest. */
    readonly cell: TableCellAddress | null;
    /**
     * True when the point was inside the resolved line's box AND inside one of its spans.
     *
     * A caller distinguishing a click ON text from a click BESIDE it — to decide whether to
     * claim the gesture at all — needs this, and cannot recover it from the position.
     */
    readonly onGlyphs: boolean;
    /**
     * Innermost content-control boundary covering the hit point, or null outside every control.
     *
     * Resolved from layout-published boundary geometry (not DOM). Nested controls prefer the
     * deepest {@link ContentControlBoundaryRecord.nestingDepth}.
     */
    readonly contentControlId: string | null;
    /** Non-null when the hit resolved to an inline drawing atom. */
    readonly drawing: SemanticHitDrawing | null;
}
/**
 * How precisely a hit resolves within a run.
 *
 * Without a measurer the offset is INTERPOLATED across the span's advance, which is exact only
 * for monospaced text — supply one for proportional fonts, or a click lands a character or two
 * away from the glyph under the pointer.
 */
interface HitTestOptions {
    /**
     * Exact resolution of the character within a run.
     *
     * Absent, the offset is interpolated across the span's own advance, which is exact only for
     * a uniform advance. Pass the measurer layout was produced with, or the answer can disagree
     * with what was painted.
     */
    readonly measurer?: TextMeasurer;
    /** Vertical weight for the nearest-block rule. */
    readonly verticalWeight?: number;
}
/**
 * How much more a point of vertical distance counts than a point of horizontal distance.
 *
 * Without it, clicking far out in the right margin beside a two-word line picks whichever
 * block happens to be directly below, because that block is horizontally nearer. Weighting
 * the vertical axis makes "the line I am level with" win, which is what the pointer meant.
 */
declare const DEFAULT_VERTICAL_WEIGHT = 8;
/**
 * The page a sheet-space y belongs to.
 *
 * The gutter between page *i* and page *i+1* resolves to page *i*, because the nearest text
 * to a point in that gap is the last line of the page above it. That falls out of searching
 * for the last page whose top is at or above the point, with no special case: the gutter is
 * inside `[top(i), top(i+1))` by construction. A point above the first page clamps to it, and
 * a point past the last page clamps to that.
 */
declare function pageAtY(layout: SemanticLayout, sheetY: number): number;
/** True when a sheet-space point falls inside a page's header or footer box. */
declare function isFurniturePoint(layout: SemanticLayout, point: HitPoint): boolean;
/** Hit test a point given in PAGE-CONTENT coordinates, the space the fragment boxes use. */
declare function hitTestPage(layout: SemanticLayout, pageIndex: number, point: HitPoint, options?: HitTestOptions): SemanticHit | null;
/**
 * Hit test a point given in SHEET coordinates — the space `page.box` lives in, and the space
 * a surface's own pixel offsets convert into.
 */
declare function hitTestSheet(layout: SemanticLayout, point: HitPoint, options?: HitTestOptions): SemanticHit | null;
/**
 * Innermost content control whose published boundary geometry contains `point` on `pageIndex`.
 *
 * Nested controls that share the same content box resolve to the deepest nesting depth.
 */
declare function contentControlAtPoint(layout: SemanticLayout, pageIndex: number, point: HitPoint): ContentControlBoundaryRecord | null;
/**
 * The end position of a line, as Word places it.
 *
 * On a SOFT-WRAPPED line the space that caused the break is painted at the end of the line
 * but the caret belongs before it — otherwise clicking in the right margin puts the caret
 * visually at the start of the NEXT line, which reads as the click having missed. The last
 * line of a paragraph has no such space to discount.
 *
 * A HARD BREAK is the same story with a character that is always there: the position after
 * it belongs to the line the break opened (`caretAt` places it there), so a click in the
 * right margin of the line the break ENDED has to stop in front of it or the caret appears
 * a row below the click.
 *
 * A PAGE break is discounted even on the paragraph's LAST line, which is the one case the
 * last-line shortcut got wrong. The position after such a break is on the next page — and
 * when the remainder is empty it has no line anywhere, because Word Online starts the
 * following block flush at the top of that page. So the caret for it stays behind on the
 * line the break ended, and a click in the wide blank space beside the mark resolved to a
 * position a page away from where it landed: the caret appeared under the pointer and the
 * typing came out on the next page. `<w:p><w:r><w:br w:type="page"/></w:r></w:p>` is the
 * commonest way to end a page, so that blank space is most of a page wide.
 */
declare function lineEndOffset(layout: SemanticLayout, line: LineRecord): number;
/**
 * The x of a model offset inside a span — the inverse of {@link offsetWithinSpan}.
 *
 * Shares the measurement, and the cache, with the hit test. Interpolating across the span's
 * advance instead is exact only for a uniform one: in a proportional face the caret for
 * offset 4 of an 8-character span is drawn at half its width, which lands in the middle of a
 * glyph rather than between two.
 */
declare function spanOffsetX(span: StyleSpanRecord, offset: number, measurer: TextMeasurer | undefined): number;
/**
 * Where a caret sits on a line: its x, and the box it should be drawn at.
 *
 * The height comes from the RUN at the insertion point, not from the line. A line is as tall
 * as its largest run, so a caret in 11pt text on a line that also carries 36pt text was drawn
 * three times the height of the text it sits in. Word sizes the insertion point to the run it
 * would type into, which is also how the painter already draws the selection band: every run
 * is its own inline box, and the band steps with the text.
 *
 * Affinity at a shared model boundary:
 *   - after a layout-sized atom (tab / projected field), prefer the DOWNSTREAM span so the
 *     caret sits at the aligned destination (e.g. before CONFIDENTIAL after a right tab),
 *     matching hit-testing and caretStops;
 *   - otherwise the run BEFORE the offset wins — the run a keystroke would continue —
 *     except at the start of the line, where there is nothing before it.
 */
declare function caretBoxOnLine(line: LineRecord, offset: number, measurer: TextMeasurer | undefined): {
    x: number;
    y: number;
    height: number;
};
/** Page-content overlay rectangle for a drawing's painted extent. */
interface DrawingOverlayFrame {
    readonly pageIndex: number;
    /** Relative to {@link PageRecord.contentBox}. */
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly record: InlineDrawingRecord | AnchoredDrawingRecord;
}
/**
 * Locate a drawing's painted extent on the published layout.
 *
 * Coordinates are page-content relative — the same space {@link hitTestPage} uses — so an
 * overlay can position from records without reading painted DOM geometry.
 */
declare function findDrawingOverlayFrameInLayout(layout: SemanticLayout, drawingNodeId: string): DrawingOverlayFrame | null;

/** A rectangle of table cells. */
interface CellSelection {
    readonly kind: 'cells';
    /** Canonical node id of the `w:tbl`. */
    readonly tableId: string;
    /** Every selected `w:tc`, in document order, with merges resolved. */
    readonly cellIds: readonly string[];
    /** Inclusive row ordinals within the table. */
    readonly rows: {
        readonly from: number;
        readonly to: number;
    };
    /** Inclusive grid columns. */
    readonly columns: {
        readonly from: number;
        readonly to: number;
    };
    /**
     * The equivalent text range.
     *
     * Every existing reader of a selection — deletion, the clipboard, the DOM mirror, viewport
     * pinning — takes this and needs no knowledge that a rectangle produced it.
     */
    readonly text: SemanticSelection;
}
/** One painted occurrence of a cell, and where it sits. */
interface PlacedCell {
    readonly pageIndex: number;
    readonly tableId: string;
    readonly row: TableRowFragmentRecord;
    readonly cell: TableCellFragmentRecord;
    /** Ordinal within the whole table, shared by a header row and every repeat of it. */
    readonly rowIndex: number;
    readonly isHeaderRepeat: boolean;
}
/**
 * The rectangle two cells define.
 *
 * Grown to a fixpoint rather than taken literally: a cell that spans two columns cannot be
 * half selected, and a vertically merged run cannot be selected in the middle. Word grows the
 * rectangle until every cell it touches is wholly inside it, so dragging into a merged cell
 * pulls the selection out to that cell's full extent.
 */
declare function cellSelectionBetween(layout: SemanticLayout, anchor: TableCellAddress, head: TableCellAddress): CellSelection | null;
/** Paragraph ids inside a set of cells, in document order, each once. */
declare function paragraphsInCells(layout: SemanticLayout, cellIds: readonly string[]): readonly string[];
/** The style spans a cell selection covers, for reporting active formatting. */
declare function spansInCells(layout: SemanticLayout, cellIds: readonly string[]): readonly StyleSpanRecord[];
/** One rectangle per painted occurrence of a selected cell, in page-content coordinates. */
declare function cellSelectionRects(layout: SemanticLayout, cellIds: readonly string[]): readonly {
    pageIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
}[];
/**
 * A cell selection as plain text: tabs between cells, newlines between rows.
 *
 * What a spreadsheet and every other word processor put on the clipboard for a rectangle, and
 * the only shape that survives the trip: the text range a rectangle stands in for would paste
 * back as one run of characters with the grid gone.
 */
declare function cellSelectionText(layout: SemanticLayout, selection: CellSelection): string;
/** Where a paragraph sits in a table, if it sits in one. */
interface TableCellContext {
    readonly tableId: string;
    readonly rows: number;
    readonly columns: number;
    readonly rowIndex: number;
    readonly columnIndex: number;
}
/**
 * The table context of one paragraph — what a toolbar reflects when the caret is in a cell.
 *
 * Answers for a plain caret, not only for a cell selection, because "am I in a table" is a
 * question about where the caret is and a toolbar that only knew during a rectangle drag
 * would show its table controls disabled while the user was typing in a cell.
 */
declare function tableContextAt(layout: SemanticLayout, paragraphId: string): TableCellContext | null;

export { pageAtY as A, paragraphSectionNode as B, type CellSelection as C, DEFAULT_SECTION_PROPERTIES as D, paragraphsInCells as E, parsePageNumbering as F, parseSectionProperties as G, type HitPoint as H, readSectionProperties as I, spanOffsetX as J, spansInCells as K, tableContextAt as L, MAX_DOCUMENT_SECTIONS as M, type PlacedCell as P, type SectionProperties as S, type TableCellAddress as T, type SectionColumns as a, DEFAULT_VERTICAL_WEIGHT as b, type DocumentSection as c, type DocumentSectionsEnumeration as d, type DrawingOverlayFrame as e, type HitTestOptions as f, type SectionBreakType as g, type SectionColumnDefinition as h, type SectionMargins as i, type SectionPageNumbering as j, type SemanticHit as k, type SemanticHitDrawing as l, type TableCellContext as m, caretBoxOnLine as n, cellSelectionBetween as o, cellSelectionRects as p, cellSelectionText as q, contentControlAtPoint as r, enumerateDocumentSections as s, enumerateDocumentSectionsBounded as t, findDrawingOverlayFrameInLayout as u, geometryOfSection as v, hitTestPage as w, hitTestSheet as x, isFurniturePoint as y, lineEndOffset as z };
