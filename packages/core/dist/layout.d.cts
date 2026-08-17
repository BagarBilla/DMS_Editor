import { V as VersionedShapingLibrary, T as TextShaper, F as FontByteValidator, a as FixedPointRoundingMode, b as FixedPoint, c as TextDirection, S as ShapedRun } from './shaped-measurer-SIqZp-Ty.cjs';
export { C as CacheLookup, d as CacheMiss, e as CacheProvenance, D as DeclaredFontSubstitution, f as FontFingerprintInputs, g as FontRequest, h as FontResolutionError, i as FontResolutionErrorCode, j as FontResourceDefinition, k as FontResourceInstrumentation, l as FontResourceSnapshot, m as FontResourceSnapshotOptions, n as FontSubstitution, o as FontValidationResult, G as GlyphOutline, H as HARD_MAX_AGGREGATE_FONT_BYTES, p as HARD_MAX_FONT_BYTES, q as HARD_MAX_FONT_SOURCES, L as LayoutShapingOptions, N as NormalizationPolicy, O as OperationSnapshot, r as OperationSnapshotField, s as OperationSnapshotGuard, R as ResolvedCache, t as ResolvedFont, u as ResourceDependencyProvenance, v as ShapeInput, w as ShapedCluster, x as ShapedFontSpan, y as ShapedGlyph, z as ShapedMeasurerOptions, A as ShapedRunComparatorInputs, B as ShapedVerticalMetrics, E as ShapingEnvironment, I as ShapingEnvironmentFingerprintInputs, J as ShapingEnvironmentInput, K as boundedStructuralFontValidator, M as captureOperationSnapshot, P as createFontResourceSnapshot, Q as createShapedMeasurer, U as createShapedRun, W as createShapingEnvironment, X as fixedPoint, Y as fontRequestKey, Z as guardOperationSnapshot, _ as sha256FontBytes, $ as shapedRunComparatorInputs, a0 as shapingEnvironmentFingerprint, a1 as shapingEnvironmentFingerprintInputs } from './shaped-measurer-SIqZp-Ty.cjs';
import { d as SpanLinkRecord, e as LayoutBox, D as DrawingPoint, f as DrawingInsets, a as StyleSpanRecord, I as InlineDrawingRecord, M as ModelRange, R as ResolvedRunStyle, g as ThemeFonts, h as ParagraphSpacing, i as ParagraphLineSpacing, j as ParagraphBorderEdge, k as ParagraphBorders, l as ResolvedTabStops, m as TableBorderSide, B as BlockFragmentRecord, n as InlineDrawingLayoutContext, T as TextMeasurer, S as SemanticLayout, o as PageRecord, p as ParagraphFragmentRecord, A as AnchoredDrawingRecord, P as PageGeometry, q as CellBorderBox, r as TableBorderBox } from './semantic-records-DC6V1U3T.cjs';
export { s as AUTO_PARAGRAPH_SPACING_PT, t as BorderGridGeometry, C as ContentControlBoundaryRecord, u as ContentControlGeometryFragment, v as ContentControlLevel, w as ContentControlLock, x as ContentControlMappedType, y as DEFAULT_PAGE_GEOMETRY, z as DEFAULT_RUN_STYLE, E as DEFAULT_TAB_INTERVAL_PT, F as DEFAULT_TAB_INTERVAL_TWIPS, G as EMPTY_TAB_STOPS, H as FieldAtomMarker, J as HeaderFooterStoryRecord, L as LineRecord, K as LineSpacingRule, N as ListMarkerRecord, O as MAX_BORDER_SPACE_PT, Q as MAX_BORDER_WIDTH_PT, U as MAX_PARAGRAPH_SPACING_PT, V as MAX_TABLE_BORDER_STROKES, W as MAX_TAB_POSITION_TWIPS, X as MAX_TAB_STOPS, Y as PARAGRAPH_BORDER_SIDES, Z as ParagraphAutoSpacingContext, _ as ParagraphBorderSide, $ as ParagraphBorderStrokeRecord, a0 as ParagraphBottomBorderRecord, a1 as ParagraphIndent, a2 as ResolvedCellBorders, a3 as ResolvedTableBorderEdge, a4 as ResolvedTableBorderEdgeSegment, a5 as ResolvedUnderline, a6 as SINGLE_LINE_SPACING, a7 as SourceRange, a8 as TAB_LEADER_GLYPH, a9 as TabAlignment, aa as TabDestination, ab as TabLeader, ac as TabStop, ad as TableBorderSideName, ae as TableBorderStrokeRecord, c as TableCellFragmentRecord, af as TableFragmentRecord, b as TableRowFragmentRecord, ag as VerticalAlign, ah as appliedSpaceBefore, ai as applyLineSpacing, aj as baselineShiftPtOf, ak as borderExtentPt, al as borderWeight, am as bottomBorderExtentPt, an as cascadedParagraphBorders, ao as cascadedTabStops, ap as collapsedSpaceBefore, aq as contentControlsOfLayout, ar as defaultTabIntervalFromSettings, as as displayText, at as effectiveContentControlLock, au as fragmentsOfParagraph, av as lineAtPosition, aw as linesOf, ax as measureDisplayText, ay as nextTabDestination, az as paragraphBorderExtentPt, aA as paragraphBorderStrokeWidthPt, aB as paragraphBorders, aC as paragraphBordersFingerprint, aD as paragraphBreaksBefore, aE as paragraphContextualSpacing, aF as paragraphFragmentsOf, aG as paragraphFragmentsOfBlocks, aH as paragraphLineSpacing, aI as paragraphSpacing, aJ as paragraphTabStops, aK as readBorderSide, aL as readCellBorders, aM as readTableBorders, aN as resolveBorderConflict, aO as resolveRunStyle, aP as resolveTableCellBorderGrid, aQ as runStylesEqual, aR as tabAdvanceWidth, aS as tabStopsFingerprint, aT as unionLayoutBoxes, aU as withDefaultTabInterval } from './semantic-records-DC6V1U3T.cjs';
import { O as OoxmlNode, a as OoxmlElement, e as OoxmlPart } from './ooxml-tree-BU0e3DVi.cjs';
import { O as OoxmlProperty, C as ContentControlKind, n as ContentControlLevel, o as ContentControlLock, p as ContentControlDataBinding, I as ImpactClass } from './tree-op-types-UOXlRUqQ.cjs';
export { l as TableBorderStyle } from './tree-op-types-UOXlRUqQ.cjs';
import { N as NoteKind, n as noteTypeOf } from './note-nodes-C6DLxlvj.cjs';
import { R as ResolvedFootnoteProperties, a as ResolvedEndnoteProperties } from './review-reads-D3r3tnoo.cjs';
export { p as paragraphOrderOfPart } from './review-reads-D3r3tnoo.cjs';
import { R as RevisionDisplayMode } from './revision-projection-72ZApe-g.cjs';
export { D as DEFAULT_REVISION_DISPLAY_MODE, a as RevisionAttribution, b as RevisionKind, f as formatRevisionOf, p as paragraphMarkRevisionOf, r as revisionsAreDeletion, c as revisionsVisible } from './revision-projection-72ZApe-g.cjs';
import { a as SectionColumns } from './semantic-cell-selection-CI3loBKq.cjs';
export { C as CellSelection, D as DEFAULT_SECTION_PROPERTIES, b as DEFAULT_VERTICAL_WEIGHT, c as DocumentSection, d as DocumentSectionsEnumeration, e as DrawingOverlayFrame, H as HitPoint, f as HitTestOptions, M as MAX_DOCUMENT_SECTIONS, P as PlacedCell, g as SectionBreakType, h as SectionColumnDefinition, i as SectionMargins, j as SectionPageNumbering, S as SectionProperties, k as SemanticHit, l as SemanticHitDrawing, T as TableCellAddress, m as TableCellContext, n as caretBoxOnLine, o as cellSelectionBetween, p as cellSelectionRects, q as cellSelectionText, r as contentControlAtPoint, s as enumerateDocumentSections, t as enumerateDocumentSectionsBounded, u as findDrawingOverlayFrameInLayout, v as geometryOfSection, w as hitTestPage, x as hitTestSheet, y as isFurniturePoint, z as lineEndOffset, A as pageAtY, B as paragraphSectionNode, E as paragraphsInCells, F as parsePageNumbering, G as parseSectionProperties, I as readSectionProperties, J as spanOffsetX, K as spansInCells, L as tableContextAt } from './semantic-cell-selection-CI3loBKq.cjs';
export { M as MAX_SDT_NESTING, c as collectFlowBlocks, a as contentControlContentChildren, i as isContentControl, b as isContentControlContent } from './content-control-walk-CbTqHq6O.cjs';
export { h as CommentAnchor, i as CommentPosition, C as CommentRecord, j as CommentThreadState, c as ReviewCommentItem, d as ReviewCustomItem, a as ReviewItem, R as ReviewModelInput, k as ReviewParagraphAnchor, e as ReviewPosition, f as ReviewRange, b as ReviewRevisionItem, g as ReviewRevisionKind, W as W15_NAMESPACE_URI, l as activeReviewItem, m as commentBodyText, n as commentInitials, o as firstReviewRange, r as reviewAnchorIndex, p as reviewItemGeometry, q as reviewItemKey, s as reviewItemPositionRank, t as reviewItemRanges, u as reviewItemsAt, v as reviewThreadRootOf } from './review-support-rsyGP5-9.cjs';
import { T as TreeModelChange } from './tree-store-B1lEkdXc.cjs';
export { b as CaretAtOptions, C as CaretGeometry, K as KeyedRange, M as MoveCaretOptions, N as NavigationCommand, c as SelectionRect, S as SemanticPosition, a as SemanticSelection, d as caretAt, e as caretStops, f as caretStopsForBlocks, g as compositionAnchor, h as contentControlAtSemantic, i as contentControlsInLayout, j as documentOrder, k as hitTestSemantic, l as keyedRangeRects, m as moveCaret, p as paragraphTextFromLayout, s as selectionRects, n as spansInSelection, w as wordBoundary } from './semantic-interaction-B4HrJFQ2.cjs';
import './image-resources-DwpNnTg3.cjs';
import './ooxml-package-CR5us6ad.cjs';

/**
 * Which allowlisted page fields a header/footer story actually contains.
 *
 * Drives layout reuse: no fields → one baseline; NUMPAGES only → one layout per page count;
 * SECTIONPAGES only → one layout per section page count; PAGE (alone or combined) → per
 * distinct evaluated values with a bounded cache. Counts both complex markers and
 * `w:fldSimple` (including an allowlisted page field nested inside a non-page simple field).
 */
interface StoryPageFieldNeeds {
    readonly hasPage: boolean;
    readonly hasNumPages: boolean;
    readonly hasSectionPages: boolean;
}

/**
 * Page-field evaluation context for furniture projection.
 *
 * `pageNumber` is the displayed PAGE value after section `w:pgNumType/@w:start` (1-based).
 * `pageCount` is document NUMPAGES. `sectionPageCount` is SECTIONPAGES for the attached
 * section. `format` is the authored `w:pgNumType/@w:fmt` applied only to PAGE.
 */
interface FieldPageContext {
    readonly pageNumber: number;
    readonly pageCount: number;
    /** SECTIONPAGES; defaults to `pageCount` when omitted (single-section callers). */
    readonly sectionPageCount?: number;
    /** Authored ST_NumberFormat for PAGE; absent → decimal. */
    readonly format?: string;
}
/**
 * Format a displayed PAGE value through the shared ST_NumberFormat resolver.
 *
 * Unknown / script-specific formats fall back to decimal (same convention as list markers).
 * `none` / `bullet` are meaningless for page numbers and also fall back to decimal so a
 * hostile fmt cannot blank the furniture.
 */
declare function formatPageNumber(value: number, format: string | undefined): string;

/**
 * Lookup of derived display marks keyed by {@link formatNoteScopeId}.
 *
 * `null` mark = customMarkFollows (no automatic digits). Absent key = dangling / unknown
 * — fail-open with an empty display (model atom preserved).
 */
interface NoteMarkContext {
    /** scopeId → formatted mark (or null when suppressed). */
    readonly marks: ReadonlyMap<string, string | null>;
    /**
     * When set, every automatic mark measures at least this string's width (eachPage
     * reservation). The string is the widest-measuring candidate under the effective mark
     * style (actual marks plus a bounded per-section value window) — not merely the longest
     * by codepoint count. Display text may still be the real mark; measurement uses the wider
     * of the two so digit-width / proportional-glyph feedback cannot oscillate.
     */
    readonly reservedMarkText?: string;
    /**
     * Scope id of the note story currently being laid out (`footnote:N` / `endnote:N`).
     *
     * Body `noteReference` atoms carry `@w:id`; note-body `noteRef` atoms do not — they
     * inherit identity from the enclosing note via this key.
     */
    readonly activeNoteKey?: string;
}
/**
 * The key one note's mark is stored under — `footnote:N` / `endnote:N`.
 *
 * The same encoding `EditorScope` uses for note ids, so a mark context and a scope address name
 * the same note without a translation step.
 */
declare function noteMarkKey(noteKind: NoteKind, noteId: number): string;
/**
 * Navigation role for a projected note atom:
 * - `to-note` — body `noteReference` jumps into the note story
 * - `to-body` — note-body `noteRef` jumps back to the body citation
 */
type NoteNavDirection = 'to-note' | 'to-body';
interface ProjectedNoteMark {
    readonly text: string;
    readonly measureText?: string;
    readonly projected: boolean;
    readonly kind: NoteKind | null;
    readonly noteId: number | null;
    readonly nav?: NoteNavDirection;
    readonly scopeId?: string;
}
/** Resolve display text for a noteReference / noteRef node under a mark context. */
declare function projectedNoteMarkText(node: OoxmlNode, context: NoteMarkContext | undefined): ProjectedNoteMark | null;

/**
 * How layout turns a typed `w:hyperlink` node into the sanitized record spans carry.
 *
 * Injected rather than computed here because resolving `r:id` needs the PACKAGE's
 * relationships and this module only ever sees one part's tree. `null` means the caller
 * declined to project — the runs still measure and paint, they simply carry no link, which is
 * the right degradation: text is never lost for want of a target.
 */
type HyperlinkProjector = (link: OoxmlNode) => SpanLinkRecord | null;

/** A fingerprint over one paragraph's layout inputs. */
type ParagraphLayoutKey = string;
/** Cache counters, for asserting that incremental layout is actually reusing work. */
interface LayoutCacheStats {
    readonly hits: number;
    readonly misses: number;
    readonly evictions: number;
    readonly size: number;
}
/**
 * The per-paragraph measurement cache.
 *
 * Caches the BREAK only — where a paragraph's lines fall at a given width — never its placement.
 * An edit high in a document still repaginates everything below it, while paragraphs nobody
 * touched are never measured again.
 */
interface ParagraphLayoutCache<T> {
    get(key: ParagraphLayoutKey): T | undefined;
    set(key: ParagraphLayoutKey, value: T): void;
    /** Drop entries for paragraphs a commit removed, so the cache cannot grow without bound. */
    retain(keys: ReadonlySet<ParagraphLayoutKey>): void;
    clear(): void;
    readonly stats: LayoutCacheStats;
}
/**
 * Everything that decides whether a cached paragraph break is still valid.
 *
 * `producer` is in the key because a font arriving after first paint changes every advance in the
 * document while no content changes — without it the cache would serve the pre-font layout
 * forever.
 */
interface ParagraphKeyInputs {
    readonly paragraph: OoxmlNode;
    readonly properties: readonly OoxmlProperty[];
    /** Available width, which decides where the lines break. */
    readonly width: number;
    /**
     * Who produced the measurements.
     *
     * Fonts loading after first paint change every advance while no content changes, so a
     * cache keyed on content alone would serve the pre-font layout forever.
     */
    readonly producer: string;
    /**
     * Inline drawing projection/resource epoch for this paragraph.
     *
     * Pending→ready/refused transitions and extent/hidden changes must invalidate breaks even
     * when paragraph text is unchanged.
     */
    readonly drawingToken?: string;
    /** Active page exclusion zones affecting this paragraph's break. */
    readonly exclusionToken?: string;
}
/**
 * The cache key for one paragraph's measured break.
 *
 * Folds in the content, the available width, and the measurement producer. Anything that changes
 * where lines fall must be in here, or the cache serves a break taken under different conditions.
 */
declare function paragraphLayoutKey(inputs: ParagraphKeyInputs): ParagraphLayoutKey;
/** How large the paragraph cache grows before least-recently-used eviction. */
interface ParagraphLayoutCacheOptions {
    /**
     * Entries retained before the least recently used are dropped.
     *
     * The default has to exceed a realistic document, or a full pass evicts exactly what the
     * next one needs and the cache costs more than it saves.
     */
    readonly maxEntries?: number;
}
/**
 * A bounded least-recently-used cache.
 *
 * Bounded because a long editing session touches far more paragraph states than a document
 * contains — every keystroke mints a new key for the paragraph being typed in — and an
 * unbounded cache would hold every intermediate state of the session.
 */
declare function createParagraphLayoutCache<T>(options?: ParagraphLayoutCacheOptions): ParagraphLayoutCache<T>;

type WrapTextSide = 'bothSides' | 'left' | 'right' | 'largest';
interface WrapExclusionInput {
    readonly mode: 'square' | 'tight' | 'through' | 'topAndBottom';
    readonly contentBounds: LayoutBox;
    readonly polygon: readonly DrawingPoint[] | null;
    readonly clipPolygon: readonly DrawingPoint[] | null;
    readonly wrapDistances: DrawingInsets;
    readonly effectInsets: DrawingInsets;
    readonly textSide: WrapTextSide;
    readonly contentLeft: number;
    readonly contentRight: number;
}

/** Paint layer relative to body text — not the OOXML wrap element. */
type DrawingPaintLayer = 'behind' | 'inFront';
interface ExclusionZone {
    readonly drawingNodeId: string;
    readonly anchorParagraphId: string;
    /** UTF-16 model offset of the anchor atom — exclusions apply at/after this point in the paragraph. */
    readonly anchorModelStart: number;
    readonly sourceOrder: number;
    readonly paintLayer: DrawingPaintLayer;
    readonly relativeHeight: number;
    readonly allowOverlap: boolean;
    /** Owning column index in a multi-column section — 0 for single-column and HF stories. */
    readonly columnIndex: number;
    /** Resolved top edge in page-content coordinates after overlap displacement. */
    readonly y: number;
    readonly verticalBand: LayoutBox;
    readonly input: WrapExclusionInput;
}

interface PendingLine {
    readonly spans: StyleSpanRecord[];
    readonly drawings: InlineDrawingRecord[];
    readonly start: number;
    end: number;
    width: number;
    height: number;
    baseline: number;
    /**
     * Space ABOVE the glyph band inside {@link height}.
     *
     * Exact spacing can center the glyphs and move the baseline. Auto/atLeast spacing leaves
     * this at zero and puts its extra depth below instead.
     */
    leading: number;
    /**
     * Auto/atLeast line-spacing depth below the painted glyph band.
     *
     * Word lets this external depth cross the bottom text margin when the glyphs themselves
     * still fit. Pagination therefore budgets {@link height} minus this amount at a page
     * bottom, while paint keeps the full box and padding.
     */
    trailingSpacing: number;
    /** When true, layout must start a new page after this line is placed. */
    pageBreakAfter?: boolean;
    /** When true, layout must advance to the next authored section column. */
    columnBreakAfter?: boolean;
    /** Model ranges on this line covering deleted content; see {@link LineRecord.deletedRanges}. */
    deletedRanges?: readonly ModelRange[];
    /** Vertical gap inserted before this line to clear a topAndBottom exclusion band. */
    exclusionSkipBefore?: number;
}
/** Horizontal alignment of a paragraph (`w:jc`, ECMA-376 §17.3.1.13). */
type Alignment = 'left' | 'center' | 'right' | 'both';

/** Soft ceiling on abstractNum / num entries read from one part. */
declare const MAX_NUMBERING_DEFINITIONS = 512;
/** Soft ceiling on override entries per `w:num`. */
declare const MAX_LVL_OVERRIDES = 9;
/** `w:suff` — what separates a list marker from the text after it. */
type ListSuffix = 'tab' | 'space' | 'nothing';
/** `w:lvlJc` — how a list marker aligns within its own indent. */
type ListMarkerAlign = 'left' | 'center' | 'right';
/**
 * One level's indent, plus which parts the level actually AUTHORED.
 *
 * The provenance matters: `w:ind` cascades per-attribute, so a level that authored only `left`
 * must not overwrite an inherited `hanging` with a synthesized zero.
 */
interface NumberingLevelIndent {
    readonly left: number;
    readonly right: number;
    readonly hanging: number;
    readonly firstLine: number;
    /**
     * Which of these the LEVEL actually authored.
     *
     * A level's `w:pPr/w:ind` sits between the paragraph style and direct formatting, so the
     * merge has to tell "the level says left = 0" from "the level says nothing about left and
     * the style's value stands". Absent (the default) reads as "says nothing", which is what a
     * hand-built level in a test means.
     */
    readonly stated?: {
        readonly left: boolean;
        readonly right: boolean;
        /** `w:hanging`/`w:firstLine` are one mutually exclusive slot (§17.3.1.10, §17.3.1.12). */
        readonly firstLineOffset: boolean;
    };
}
/** One `w:lvl`: how this depth numbers, what its marker looks like, and how it indents. */
interface NumberingLevel {
    readonly ilvl: number;
    readonly start: number;
    readonly numFmt: string;
    readonly lvlText: string;
    readonly lvlJc: ListMarkerAlign;
    readonly suff: ListSuffix;
    readonly indent: NumberingLevelIndent;
    /**
     * `w:lvlRestart` one-based trigger level, or `0` when the level never restarts.
     * Omitted in XML → restart when the previous level (or any earlier level) is used.
     */
    readonly lvlRestart?: number;
    /**
     * `w:isLgl` (§17.9.9): render EVERY level referenced by this level's `w:lvlText` in
     * decimal, whatever number format those levels declare for themselves.
     */
    readonly isLgl: boolean;
    /** Level `w:rPr` as flat properties (for marker face / vanish). */
    readonly runProperties: readonly OoxmlProperty[];
    /** True when level run props request vanish — marker must not paint. */
    readonly vanish: boolean;
}
/**
 * One `w:lvlOverride` on a `w:num`: a restart value, a replacement level, or both.
 *
 * How two lists share an abstract definition while numbering independently.
 */
interface LevelOverride {
    readonly startOverride?: number;
    /** Full level replacement when `w:lvl` is present under the override. */
    readonly level?: NumberingLevel;
}
/**
 * One `w:abstractNum` — the shape of a list, without being a list.
 *
 * Never referenced by a paragraph directly. Paragraphs name a {@link NumDefinition}, which names
 * one of these, so several lists can share a definition and still count separately.
 */
interface AbstractNumDefinition {
    readonly abstractNumId: string;
    readonly levels: ReadonlyMap<number, NumberingLevel>;
    /**
     * `w:numStyleLink` (§17.9.21): this definition carries no levels of its own — the numbering
     * lives on the named style. Word follows the link; resolve it with
     * {@link resolveNumberingStyleLinks} before reading levels, or every paragraph on this
     * abstract renders with NO marker at all.
     */
    readonly numStyleLink?: string;
    /**
     * `w:styleLink` (§17.9.23): the definition side of the same pair — this abstract IS the
     * numbering of the named style. Kept so a link can be verified rather than assumed.
     */
    readonly styleLink?: string;
}
/**
 * One `w:num` — the thing a paragraph's `w:numId` actually names.
 *
 * Points at an {@link AbstractNumDefinition} and may override any of its levels.
 */
interface NumDefinition {
    readonly numId: string;
    readonly abstractNumId: string;
    readonly overrides: ReadonlyMap<number, LevelOverride>;
}
/**
 * The bounded projection of `numbering.xml` that list layout resolves against.
 *
 * Projection ONLY — never a mutation or serialization authority. Hostile values are dropped or
 * clamped, and a missing definition resolves to "no list" rather than a guess.
 */
interface NumberingIndex {
    readonly abstractNums: ReadonlyMap<string, AbstractNumDefinition>;
    readonly nums: ReadonlyMap<string, NumDefinition>;
}
/**
 * Build a numbering index from the root of a numbering part (`w:numbering`).
 *
 * Empty / missing roots yield an empty index. Duplicate ids keep the first definition.
 */
/**
 * Project `numbering.xml` into the bounded index.
 *
 * Every ceiling here exists because the input is file-derived: definition counts, override
 * counts, indent magnitudes and style-link hop depth are all capped, and nothing from the file
 * becomes a loop bound or an allocation size.
 */
declare function buildNumberingIndex(root: OoxmlElement | null | undefined): NumberingIndex;
/** Resolve the effective level for a `numId` + `ilvl`, applying overrides. */
/**
 * The effective level for one paragraph's numbering reference, after overrides and style links.
 *
 * Answers null for a reference the index cannot resolve — a paragraph naming a definition the
 * file never declared is an unnumbered paragraph, not an error.
 */
declare function resolveNumberingLevel(index: NumberingIndex, numId: string, ilvl: number): {
    readonly abstractNumId: string;
    readonly level: NumberingLevel;
    readonly startOverride?: number;
} | null;
/** Empty index for tests / documents without numbering. */
declare const EMPTY_NUMBERING_INDEX: NumberingIndex;

/**
 * A paragraph's list membership fully resolved: definition, level, marker text and geometry.
 *
 * `markerText` is already expanded through the counter state, so it is the string a reader sees
 * rather than the `w:lvlText` template.
 */
interface ResolvedListItem {
    readonly numId: string;
    readonly ilvl: number;
    readonly abstractNumId: string;
    /** `w:numFmt` of the resolved level — `bullet` or a numbering format. */
    readonly numFmt: string;
    readonly markerText: string;
    readonly markerAlign: ListMarkerAlign;
    readonly suffix: ListSuffix;
    /** Effective indent after merging level + paragraph indents, in points. */
    readonly indent: NumberingLevelIndent;
    readonly markerStyle: ResolvedRunStyle;
    /** Fingerprint for layout cache keys (indent + level identity, not ordinal). */
    readonly cacheToken: string;
}
/**
 * Read `w:numPr` from cascaded paragraph-property nodes (last wins).
 *
 * Flat `OoxmlProperty[]` bags drop nested `ilvl`/`numId`, so this walks the tree nodes
 * the same way borders and tabs do.
 */
declare function readNumPr(paragraphPropertyNodes: readonly OoxmlNode[]): {
    numId: string;
    ilvl: number;
} | null;
/**
 * Resolve `w:numStyleLink` delegation using the document's styles (§17.9.21).
 *
 * Without a style table there is nothing to follow, so the index is returned unchanged —
 * and so it is when nothing delegates, which keeps layout cache identity.
 */
declare function withNumberingStyleLinks(index: NumberingIndex, styleCascade: StyleCascadeTable | undefined): NumberingIndex;
/**
 * The effective indent of a list paragraph: STYLE, then the numbering LEVEL, then DIRECT.
 *
 * Word applies a level's `w:pPr/w:ind` between the paragraph style and the paragraph's own
 * formatting, per attribute — and the ordering matters on real documents. A converted
 * agreement numbers its `(a)` items with a level stating `left=1512 hanging=738` under a
 * `ListParagraph` style stating `left=775 hanging=624`, and states only `hanging="737"` on
 * the paragraph itself. Reading the flattened cascade as "the paragraph's indent" gave the
 * STYLE's 775 to a level that had overridden it, so every lettered sub-item hung a full
 * indent step to the left of where Word puts it.
 *
 * `inherited` is the cascade WITHOUT the paragraph's own `w:pPr` (defaults, table cell style,
 * style chain); `direct` is that `w:pPr` alone.
 */
declare function mergeListIndent(levelIndent: NumberingLevelIndent, inherited: readonly OoxmlProperty[], direct?: readonly OoxmlProperty[]): NumberingLevelIndent;
/**
 * Collect paragraphs of a block list in document order, descending into tables.
 *
 * Caps nesting so a hostile nested-table document cannot recurse without bound.
 */
declare function walkStoryParagraphs(blocks: readonly OoxmlElement[], maxTableDepth?: number): OoxmlElement[];
/**
 * Resolve every list paragraph in a story to a {@link ResolvedListItem}, keyed by node id.
 *
 * Non-list paragraphs are absent from the map. Hostile / missing numbering resolves inertly
 * (paragraph omitted — laid out as ordinary text).
 */
declare function resolveStoryListItems(blocks: readonly OoxmlElement[], index: NumberingIndex, styleCascade: StyleCascadeTable | undefined, isFontAvailable?: (family: string) => boolean): ReadonlyMap<string, ResolvedListItem>;
/**
 * Attach a full-story list-item map to layout options.
 *
 * Resolves once over `blocks` (body story including table cells) so counters continue across
 * section boundaries. No-ops when numbering is absent.
 */
declare function withResolvedListItems<T extends {
    readonly numberingIndex?: NumberingIndex;
    readonly listItems?: ReadonlyMap<string, ResolvedListItem>;
    readonly styleCascade?: StyleCascadeTable;
    /**
     * Host oracle for "is this font family really loaded". Supplied, a Symbol/Wingdings
     * bullet keeps the file's own private-use codepoint so the authored typeface draws it;
     * absent, it falls back to the Unicode equivalent rather than a tofu box.
     */
    readonly isFontAvailable?: (family: string) => boolean;
}>(options: T, blocks: readonly OoxmlElement[]): T & {
    readonly numberingIndex: NumberingIndex;
    readonly listItems?: ReadonlyMap<string, ResolvedListItem>;
};
/**
 * Horizontal marker box inside the hanging indent slot.
 *
 * Coordinates are relative to the same origin as paragraph content (`indent.left` is the
 * text start). Returns null when there is nothing to paint.
 */
declare function listMarkerBox(item: ResolvedListItem, markerWidth: number, lineY: number, lineHeight: number): {
    x: number;
    y: number;
    width: number;
    height: number;
} | null;

/** Soft ceiling on `basedOn` chain length — enough for real templates, refuses hostile graphs. */
declare const MAX_STYLE_BASED_ON_DEPTH = 32;
/** Soft ceiling on style definitions read from one styles part. */
declare const MAX_STYLE_DEFINITIONS = 4096;
/** One `w:style` as the cascade reads it: its properties, and the style it is based on. */
interface StyleDefinition {
    readonly styleId: string;
    readonly type: string;
    readonly basedOn: string | null;
    readonly paragraphProperties: readonly OoxmlProperty[];
    readonly runProperties: readonly OoxmlProperty[];
    /** The style's `w:pPr` node, when present — needed for nested `w:pBdr`. */
    readonly paragraphPropertiesNode: OoxmlElement | undefined;
    /** The style's `w:tblPr`, for a `w:type="table"` style. */
    readonly tablePropertiesNode: OoxmlElement | undefined;
    /**
     * `w:tblStylePr` conditional formats by `w:type` (`firstRow`, `band1Horz`, …).
     *
     * Word puts a table's real appearance here: `Table Grid` carries its grid in the style's
     * `w:tblBorders`, and the banded/​header looks live in these. A document states only
     * `<w:tblStyle w:val="TableGrid"/>`.
     */
    readonly conditionalTableFormats: ReadonlyMap<string, OoxmlElement>;
}
/**
 * The whole styles part, indexed and ready to resolve against.
 *
 * `cacheToken` is load-bearing: it folds into layout cache producers so breaks measured under one
 * styles part are never reused under another.
 */
interface StyleCascadeTable {
    /**
     * Bounded fingerprint folded into layout cache producers so a different styles part cannot
     * reuse breaks measured under another cascade. Computed once per table (FNV-1a hex).
     */
    readonly cacheToken: string;
    readonly docDefaultsRun: readonly OoxmlProperty[];
    readonly docDefaultsParagraph: readonly OoxmlProperty[];
    readonly docDefaultsParagraphNode: OoxmlElement | undefined;
    /** `w:style[@w:default='1'][@w:type='paragraph']` — last wins among defaults of that type. */
    readonly defaultParagraphStyleId: string | null;
    /** `w:style[@w:default='1'][@w:type='character']` — last wins among defaults of that type. */
    readonly defaultCharacterStyleId: string | null;
    /**
     * The theme part's Latin typefaces, for `w:rFonts` theme references.
     *
     * Lives on the cascade because it is document-level style material with the same
     * lifetime, and because every site that resolves run properties already holds this table.
     */
    readonly themeFonts: ThemeFonts;
    readonly styles: ReadonlyMap<string, StyleDefinition>;
}
/**
 * A paragraph's properties after the cascade, plus the same list WITHOUT its own `w:pPr`.
 *
 * Both, because a writer needs to know what a paragraph INHERITS to decide whether setting a
 * value is a change or a no-op — and writing back an inherited value freezes it into the
 * paragraph as though the author had chosen it.
 */
interface CascadedParagraphFormatting {
    /** Flat paragraph properties in cascade order (defaults → bases → style → direct). */
    readonly paragraphProperties: readonly OoxmlProperty[];
    /**
     * The same list WITHOUT the paragraph's own `w:pPr` — everything it inherits.
     *
     * Numbering needs the two tiers apart: a level's `w:pPr/w:ind` outranks the style's and is
     * outranked by the paragraph's own, and a flattened list cannot say which is which.
     */
    readonly inheritedParagraphProperties: readonly OoxmlProperty[];
    /** Matching `w:pPr` nodes for nested border resolution. */
    readonly paragraphPropertyNodes: readonly OoxmlNode[];
    /**
     * Inherited run properties for CONTENT runs (before direct run `rPr`).
     *
     * Does NOT include direct `w:pPr/w:rPr` — that formats the paragraph MARK only
     * (ECMA-376 §17.3.1.36). Folding mark `w:sz` into content made BodyText runs with no
     * direct size paint at the mark's size (Selection Notice "or" alternative → 6.5pt).
     */
    readonly runProperties: readonly OoxmlProperty[];
    /**
     * Content cascade plus direct `w:pPr/w:rPr` — empty-line metrics and last-line mark height.
     */
    readonly markRunProperties: readonly OoxmlProperty[];
    /**
     * The style this paragraph resolved to, or null when it names none and there is no
     * document default. `w:contextualSpacing` compares neighbours by exactly this.
     */
    readonly styleId: string | null;
}
/** Accepted style ids only — over-long, control-bearing, or dangerous keys are dropped. */
declare function isValidStyleId(raw: string | undefined): raw is string;
/**
 * What a table style contributes to the paragraphs of ONE cell: the style's whole-table
 * `w:pPr`/`w:rPr` followed by every `w:tblStylePr` the cell is under (17.7.6.6), weakest
 * first in the caller's condition order (banding, column, row, corner).
 *
 * This is how Word makes a header row bold and centred while the document states nothing
 * but `<w:tblStyle w:val="…"/>` on the table and plain runs in the cells.
 */
interface TableCellStyleFormatting {
    readonly paragraphProperties: readonly OoxmlProperty[];
    /** Matching `w:pPr` nodes, for nested `w:pBdr` / `w:tabs` resolution. */
    readonly paragraphPropertyNodes: readonly OoxmlElement[];
    /** Inherited run properties for every run in the cell, before the paragraph style. */
    readonly runProperties: readonly OoxmlProperty[];
}
/**
 * Build a cascade table from a styles part root.
 *
 * Only direct `w:style` children of the root participate (bounded count). Duplicate
 * `styleId` values keep the last definition, matching Word's reader for this fixture class.
 * Default paragraph/character style ids track `w:default="1"` with the same last-wins rule.
 */
declare function buildStyleCascadeTable(stylesRoot: OoxmlElement | null, themeFonts?: ThemeFonts): StyleCascadeTable;
/**
 * Cascade paragraph + inherited run properties for one paragraph's direct `w:pPr`.
 *
 * Order: `docDefaults` → table style → `basedOn` ancestors → paragraph style → direct
 * formatting, which is the style hierarchy of 17.7.2: a table style sits above the document
 * defaults and below the paragraph style a cell paragraph names for itself.
 * When `w:pStyle` is absent, the document's default paragraph style (`w:default="1"`) is used.
 * Direct formatting is last so it overrides inherited values inside the existing resolvers.
 */
declare function cascadeParagraphFormatting(table: StyleCascadeTable, directPPr: OoxmlNode | undefined, tableCellStyle?: TableCellStyleFormatting): CascadedParagraphFormatting;
/**
 * Bottom border after cascade: a later `w:pBdr` replaces an earlier one; absence inherits.
 * `nil`/`none` clear the edge via `paragraphBorders`.
 */
declare function cascadedBottomBorder(paragraphPropertyNodes: readonly OoxmlNode[]): ParagraphBorderEdge | undefined;
/**
 * Merge inherited paragraph-style run props with a run's direct `rPr` (direct last).
 *
 * When a cascade table is supplied, also resolves `w:rStyle` character styles (basedOn chain,
 * cycle/depth capped). Runs without an explicit `rStyle` pick up the default character style
 * (`w:default="1"`). Precedence: inherited → character style chain → direct formatting.
 */
declare function cascadeRunProperties(inheritedRunProperties: readonly OoxmlProperty[], directRunProperties: readonly OoxmlProperty[], table?: StyleCascadeTable): readonly OoxmlProperty[];
/** Everything the line breaker needs about one paragraph, already cascaded and converted. */
interface ParagraphLayoutInputs {
    readonly props: OoxmlProperty[];
    readonly indent: {
        left: number;
        right: number;
        hanging: number;
        firstLine: number;
    };
    readonly available: number;
    readonly alignment: Alignment;
    readonly spacing: ParagraphSpacing;
    /** Resolved `w:line` / `w:lineRule`; single spacing where the cascade says nothing. */
    readonly lineSpacing: ParagraphLineSpacing;
    /** `w:contextualSpacing`: drop before/after between same-style neighbours. */
    readonly contextualSpacing: boolean;
    /** Resolved paragraph style id, for the `w:contextualSpacing` neighbour comparison. */
    readonly styleId: string | null;
    readonly bottomBorder: ParagraphBorderEdge | undefined;
    /**
     * Every `CT_PBdr` edge after cascade, not just the bottom one.
     *
     * `bottomBorder` stays alongside it because the fragment signature and the table flow
     * read that field by name; this is the whole box, so a cell paragraph gets the same
     * frame a body paragraph does.
     */
    readonly borders: ParagraphBorders;
    /** Validated 6-hex paragraph shading fill from cascaded `w:pPr/w:shd`, absent for none. */
    readonly shading: string | undefined;
    readonly inheritedRunProperties: readonly OoxmlProperty[];
    /**
     * Paragraph-mark cascade (`inheritedRunProperties` + direct `w:pPr/w:rPr`).
     * Empty-line sizing and last-line mark height — never content-run face.
     */
    readonly markRunProperties: readonly OoxmlProperty[];
    /** Cascaded custom tab stops + default interval for paragraph-flow breaking. */
    readonly tabStops: ResolvedTabStops;
    /**
     * Fingerprint folded into the paragraph layout cache key — nested `w:tabs` are absent
     * from flat property bags, so style-inherited stops must be named explicitly.
     */
    readonly tabStopsCacheToken: string;
    /** Resolved list marker inputs when the paragraph participates in numbering. */
    readonly listItem?: ResolvedListItem;
}
/**
 * Resolve every paragraph input semantic layout / table cells share: cascaded props when a
 * style table is present, otherwise direct formatting only.
 *
 * When `listItem` is provided, its merged level indent becomes the paragraph indent (list
 * hanging / left from `numbering.xml`), which is what Word uses for fixture list paragraphs
 * that author no direct `w:ind`.
 *
 * `tableCellStyle` carries what the enclosing table's style says about this cell's
 * paragraphs; body paragraphs pass nothing.
 *
 * `inTableCell` is asked for separately because a cell paragraph may have no table style to
 * inherit at all, and `w:beforeAutospacing` still needs to know it is in a cell.
 */
declare function resolveParagraphLayoutInputs(paragraph: OoxmlElement, contentWidth: number, styleCascade: StyleCascadeTable | undefined, listItem?: ResolvedListItem, tableCellStyle?: TableCellStyleFormatting, inTableCell?: boolean): ParagraphLayoutInputs;

/**
 * What one cell side is before any ADJACENT cell has its say.
 *
 * - omitted → the table's own rule for that position (`tblBorders`, `insideH`/`insideV`)
 * - edge → the cell wins outright; no weight fight with the table
 * - none → an explicit `w:val="nil"`. Suppresses a matching table border on interior
 *   and perimeter sides alike, so a table whose cells all declare none paints borderless
 *   like Word even when `tblBorders` still carry `single` rules.
 */
declare function effectiveBorderSide(authored: TableBorderSide, tableSide: TableBorderSide, _options?: {
    readonly interior?: boolean;
}): TableBorderSide;

/** Minimum stroke width for a compound (double/triple) band, in points. */
declare const COMPOUND_BORDER_MIN_STROKE_PT = 1;
/** Minimum gap between compound strokes, in points. */
declare const COMPOUND_BORDER_MIN_GAP_PT = 1;
/**
 * How a multi-line border style (double, triple) is drawn: stroke width, gap, and total extent.
 *
 * The band is CENTRED on the authored width, so a double border occupies the space Word gives it
 * rather than growing the cell it surrounds.
 */
interface CompoundBorderMetrics {
    readonly strokePt: number;
    readonly gapPt: number;
    readonly extentPt: number;
    /** Centers the compound band on the authored width; negative extends outward. */
    readonly insetPt: number;
}
/**
 * Deterministic double stroke / gap / extent in layout points (scale-independent).
 *
 * Thin authored widths inflate to a 1+1+1 point compound so a `w:sz="3"` double remains
 * visible at paint scale 1 — matching Word's hairline-double floor.
 */
declare function computeDoubleBorderMetricsPt(widthPt: number): CompoundBorderMetrics;

/**
 * The exact HarfBuzz build this engine shapes against.
 *
 * Pinned and verified at load: a runtime reporting a different version is REFUSED rather than
 * used, because glyph positioning can change between releases and a cached measurement taken
 * under one build must not be trusted under another.
 */
declare const HARFBUZZ_SHAPING_LIBRARY: VersionedShapingLibrary;
/** Load and verify the HarfBuzz WASM runtime without adding top-level await to import graphs. */
declare function initializeHarfBuzz(): Promise<void>;
/** Whether the WASM runtime is loaded and shaping can proceed synchronously. */
declare function isHarfBuzzInitialized(): boolean;
/**
 * Why shaping refused.
 *
 * Mostly RESOURCE limits, because every input here derives from a file: text length, codepoint
 * count, glyph count and outline size are all attacker-influenced, and an unbounded shape call is
 * a denial-of-service vector rather than a rendering bug.
 */
type HarfBuzzShapingErrorCode = 'notInitialized' | 'fontOverLimit' | 'malformedFont' | 'textOverLimit' | 'codepointsOverLimit' | 'glyphOverLimit' | 'outlineOverLimit' | 'shapedRunOverLimit' | 'unsupportedVariationAxes' | 'unsupportedFallback' | 'unsupportedColorFont' | 'unsupportedNormalization' | 'invalidBidiLevel' | 'shapingLibraryMismatch' | 'disposed';
/**
 * A shaping call that was refused, carrying the limit it exceeded where there was one.
 *
 * Thrown rather than returned: unlike a missing font, a run that cannot be shaped has no sensible
 * fallback measurement, and continuing would lay text out at made-up widths.
 */
declare class HarfBuzzShapingError extends Error {
    readonly name = "HarfBuzzShapingError";
    readonly code: HarfBuzzShapingErrorCode;
    readonly limit?: number;
    readonly actual?: number;
    readonly diagnostic?: string;
    constructor(code: HarfBuzzShapingErrorCode, details?: {
        readonly limit?: number;
        readonly actual?: number;
        readonly diagnostic?: string;
    });
}
/**
 * Resource budgets and cache sizes for one shaper. Every field optional.
 *
 * The caches exist because shaping is the expensive step: a face is opened once and reused, and
 * identical runs return their previous result. The caps exist because file-derived input decides
 * how much work is asked for.
 */
interface HarfBuzzTextShaperOptions {
    readonly maxFontBytes?: number;
    readonly maxInputUtf16?: number;
    readonly maxCodepoints?: number;
    readonly maxGlyphs?: number;
    readonly maxCachedFaces?: number;
    readonly maxCachedShapes?: number;
    readonly maxOutlineBytes?: number;
    readonly maxCachedOutlineBytes?: number;
    readonly maxShapedRunBytes?: number;
    readonly maxCachedShapeBytes?: number;
    readonly instrumentation?: HarfBuzzTextShaperInstrumentation;
}
/** One face-cache transition, for instrumentation. */
interface HarfBuzzFaceCacheEvent {
    readonly kind: 'created' | 'hit' | 'evicted';
    readonly identity: string;
}
/**
 * Optional counters for the work a shaper is expected to do rarely.
 *
 * Exists so tests can assert the ABSENCE of work — re-opening a face or re-copying its bytes per
 * shape call would not change any output, only make typing slow, which no rendering assertion
 * would catch.
 */
interface HarfBuzzTextShaperInstrumentation {
    readonly onFaceCacheEvent?: (event: HarfBuzzFaceCacheEvent) => void;
    readonly onShapeCacheEvent?: (event: HarfBuzzShapeCacheEvent) => void;
    readonly onByteCopy?: () => void;
    readonly onTableScan?: () => void;
    readonly onShapeCall?: () => void;
    readonly onOutlinePathCall?: () => void;
    readonly onOutlineCacheEvent?: (event: HarfBuzzOutlineCacheEvent) => void;
}
/** One shape-cache transition, for instrumentation. */
interface HarfBuzzShapeCacheEvent {
    readonly kind: 'hit' | 'miss' | 'stored' | 'evicted' | 'skipped' | 'cleared';
    readonly retainedBytes: number;
}
/** One outline-cache transition, for instrumentation. */
interface HarfBuzzOutlineCacheEvent {
    readonly kind: 'created' | 'hit' | 'evicted' | 'skipped' | 'cleared';
    readonly retainedBytes: number;
}
/**
 * A {@link TextShaper} backed by HarfBuzz, holding WASM resources.
 *
 * {@link HarfBuzzTextShaper.dispose} is not optional housekeeping: the cached faces are WASM
 * allocations that garbage collection cannot reclaim, so a shaper outliving its editor leaks
 * until the page goes away.
 */
interface HarfBuzzTextShaper extends TextShaper {
    dispose(): void;
}
/** Structural sfnt validation that does not construct native HarfBuzz objects. */
declare const harfBuzzFontValidator: FontByteValidator;
/** Convert signed font units by an exact rational multiplier using the declared tie rule. */
declare const roundFontUnitToFixedPoint: (fontUnits: number, denominator: number, numerator: number, mode: FixedPointRoundingMode) => FixedPoint;
/**
 * Build a HarfBuzz-backed shaper.
 *
 * Requires `initializeHarfBuzz()` to have resolved — shaping is synchronous, so the WASM runtime
 * must already be loaded. Dispose the result when the editor goes away, or its cached faces leak.
 */
declare const createHarfBuzzTextShaper: (options?: HarfBuzzTextShaperOptions) => HarfBuzzTextShaper;

/**
 * UAX #9 embedding levels, one per UTF-16 code unit, plus the paragraph ranges they were resolved
 * within.
 *
 * The level is EXACT, not a direction: its parity gives direction, but the numeric value is what
 * reordering needs, and collapsing it early loses nested isolates.
 */
interface BidiEmbeddingLevels {
    readonly levels: Uint8Array;
    readonly paragraphs: readonly {
        readonly start: number;
        readonly end: number;
        readonly level: number;
    }[];
}

/**
 * Which `w:rFonts` slot a character resolves its face through.
 *
 * OOXML gives a run up to four faces and picks between them by SCRIPT, so one run of mixed Latin
 * and CJK text uses two different fonts without saying so anywhere in its properties.
 */
type FontSlot = 'ascii' | 'hAnsi' | 'eastAsia' | 'cs';
/**
 * A run of text sharing one script, direction and font slot — the unit handed to the shaper.
 *
 * Shaping cannot span a script change: Arabic and Latin in one call would produce wrong joining
 * behaviour, so a run is itemized into these first.
 */
interface ScriptItem {
    readonly from: number;
    readonly to: number;
    readonly direction: TextDirection;
    readonly bidiLevel: number;
    readonly script: 'Zyyy' | 'Latn' | 'Grek' | 'Cyrl' | 'Hani' | 'Hebr' | 'Arab' | 'Deva' | 'Beng' | 'Thai' | 'Khmr';
    readonly slot: FontSlot;
}
/**
 * A code point whose script this engine does not itemize.
 *
 * Carries the offending `codePoint` so the caller can report which character stopped it, rather
 * than failing anonymously somewhere in the middle of a paragraph.
 */
declare class UnsupportedScriptError extends Error {
    readonly name = "UnsupportedScriptError";
    readonly code = "unsupportedScript";
    readonly codePoint: number;
    constructor(codePoint: number);
}
/**
 * Split text into shapeable runs by script, bidi level and font slot.
 *
 * Consumes the bidi levels rather than re-deriving direction, so itemization and reordering agree
 * by construction instead of by two implementations happening to match.
 */
declare function itemizeScriptFontSlots(text: string, paragraphOffset: number, embedding: BidiEmbeddingLevels): readonly ScriptItem[];

/** UTF-16 boundaries that are both whole-grapheme and HarfBuzz cluster edges. */
declare function shapedHorizontalBoundaries(run: ShapedRun): readonly number[];
/**
 * Whether an offset is a real caret position: both a grapheme boundary and a shaped cluster edge.
 *
 * Both conditions, because they disagree. A ligature is one cluster spanning two graphemes, and
 * an offset inside it has no geometry the shaper can answer for — placing a caret there would
 * mean inventing an x coordinate.
 */
declare function isWholeGraphemeHorizontalBoundary(run: ShapedRun, utf16Offset: number): boolean;
/** Every published shaped boundary has exact geometry from the shaping result. */
declare function isGeometryTrustedCaretOffset(run: ShapedRun, utf16Offset: number): boolean;
/**
 * Whether the distance from a line's start to an offset can be trusted as exact.
 *
 * Requires BOTH ends to be shaped boundaries: accumulating advances across an offset the shaper
 * cannot place would produce a caret x that drifts further along the line.
 */
declare function isCumulativeGeometryTrustedFromLineOrigin(run: ShapedRun, lineStartUtf16Offset: number, utf16Offset: number): boolean;
/** Grapheme offsets corresponding to exact shaped boundaries. */
declare function semanticHorizontalBoundaries(run: ShapedRun): readonly number[];

/**
 * One user-perceived character, and the UTF-16 range that encodes it.
 *
 * The unit a caret moves by. An emoji with a skin-tone modifier is ONE segment spanning several
 * UTF-16 code units, so stepping by code unit would put the caret inside it.
 */
interface GraphemeSegment {
    readonly index: number;
    readonly text: string;
    readonly utf16From: number;
    readonly utf16To: number;
}
/**
 * The replaceable segmentation strategy.
 *
 * An explicit seam rather than a direct `Intl.Segmenter` call, so tests can install a
 * deterministic boundary and a runtime without `Intl.Segmenter` can be given one.
 */
interface GraphemeBoundary {
    segment(text: string): readonly GraphemeSegment[];
}
/** Invariant locale for deterministic cross-runtime grapheme boundaries. */
declare const GRAPHEME_SEGMENTER_LOCALE: "und";
/** Whether this runtime provides `Intl.Segmenter`, which the default boundary requires. */
declare function isIntlSegmenterAvailable(): boolean;
/**
 * The default boundary, over `Intl.Segmenter` at the invariant `und` locale.
 *
 * Locale-invariant on purpose: grapheme boundaries must not vary with the user's locale, or the
 * same document would paginate differently for different readers.
 */
declare const intlGraphemeBoundary: GraphemeBoundary;
/** Current boundary generation, for callers that cache segmentation-derived answers. */
declare function graphemeBoundaryEpoch(): number;
/**
 * Split text into graphemes through the active boundary.
 *
 * Memoized on the last texts seen, because paragraph layout asks about the same string
 * repeatedly and a full segmentation pass per call made layout quadratic in paragraph length.
 */
declare function segmentGraphemes(text: string): readonly GraphemeSegment[];
/**
 * Install a different segmentation strategy, invalidating the memo.
 *
 * For tests and for runtimes lacking `Intl.Segmenter`. Call {@link resetGraphemeBoundary} to
 * restore the default.
 */
declare function setGraphemeBoundary(boundary: GraphemeBoundary): void;
/** Restore the default `Intl.Segmenter` boundary and clear the memo. */
declare function resetGraphemeBoundary(): void;
/** How many user-perceived characters the text holds. */
declare function graphemeCount(text: string): number;
/**
 * The grapheme index containing a UTF-16 offset. Clamps rather than throwing.
 *
 * Backed by a single-entry index cache: this runs once per character during paragraph layout, and
 * re-segmenting per call is what made a 20,000-character paragraph take minutes to open. One
 * entry rather than a map, because the keys are file-derived strings of unbounded size.
 */
declare function utf16OffsetToGrapheme(text: string, utf16Offset: number): number;
/** The UTF-16 offset a grapheme index starts at. Clamps rather than throwing. */
declare function graphemeOffsetToUtf16(text: string, graphemeOffset: number): number;

/**
 * One word-segmentation span. `wordLike` separates words from the whitespace and punctuation
 * between them, which is what double-click selection needs to skip.
 */
interface WordSegment {
    readonly utf16From: number;
    readonly utf16To: number;
    readonly wordLike: boolean;
}
/**
 * The replaceable word-segmentation strategy.
 *
 * Falls back to a BOUNDED grapheme-safe splitter where `Intl.Segmenter` is absent — bounded
 * because the input is file-derived, and grapheme-safe so a fallback never splits inside an
 * emoji.
 */
interface WordBoundary {
    segment(text: string): readonly WordSegment[];
}
/** Invariant locale for deterministic cross-runtime word boundaries. */
declare const WORD_SEGMENTER_LOCALE: "und";
/** Whether this runtime provides word-granularity `Intl.Segmenter`. */
declare function isIntlWordSegmenterAvailable(): boolean;
/** Intl.Segmenter word boundary for the invariant locale. */
declare function createIntlWordBoundary(): WordBoundary;
/** Bounded deterministic fallback — not full UAX #29 word conformance. */
declare function boundedFallbackWordSegments(text: string): readonly WordSegment[];
/** Explicit bounded fallback boundary (grapheme-safe, narrower than Intl). */
declare function createBoundedFallbackWordBoundary(): WordBoundary;
/** Injection points for {@link createDefaultWordBoundary}, so tests can force either path. */
interface WordBoundaryResolverDeps {
    readonly isIntlAvailable?: () => boolean;
    readonly createIntlBoundary?: () => WordBoundary;
    readonly createFallbackBoundary?: () => WordBoundary;
}
/** Resolve production word boundary: Intl when available/construction succeeds, else bounded fallback. */
declare function createDefaultWordBoundary(deps?: WordBoundaryResolverDeps): WordBoundary;
/** Cached immutable production boundary (first resolved instance only). */
declare function resolveDefaultWordBoundary(): WordBoundary;
/** Split text into word segments through the given boundary, or the resolved default. */
declare function segmentWords(text: string, boundary?: WordBoundary): readonly WordSegment[];
/**
 * A word span expressed in GRAPHEME offsets rather than UTF-16 ones.
 *
 * What selection actually uses: a range whose ends are UTF-16 offsets could land inside a
 * grapheme, and selecting half an emoji is not a word.
 */
interface GraphemeWordSegmentRecord {
    readonly graphemeFrom: number;
    readonly graphemeTo: number;
    readonly wordLike: boolean;
}
/** Map UTF-16 word segments to grapheme-safe half-open ranges within one paragraph. */
declare function wordSegmentsToGraphemeRecords(text: string, segments: readonly WordSegment[]): readonly GraphemeWordSegmentRecord[];

/**
 * Strict hex fill: exactly six hex digits. Rejects `auto`, `nil`, and any non-hex payload
 * (CSS functions, URLs, short hex, theme tokens).
 */
declare function resolveStrictHexFill(raw: string | undefined): string | undefined;
/**
 * Resolve a `w:shd` attribute bag to a validated RRGGBB fill, or undefined.
 *
 * `w:themeFill` is a REFERENCE, and Word always writes the value it resolved to alongside
 * it: `<w:shd w:val="clear" w:fill="D9E2F3" w:themeFill="accent1" w:themeFillTint="33"/>`.
 * Reading `w:fill` in that case is not inventing a colour from the theme — it is reading
 * the colour the producer computed. Dropping the fill because a theme reference sat next
 * to it left every accent-shaded cell and paragraph unpainted.
 *
 * `val="nil"` clears shading. Pattern vals are not rendered; a valid solid `fill` still
 * paints as a clear fill until pattern support lands. A theme reference with no usable
 * `w:fill` still resolves to nothing rather than a guess.
 */
declare function resolveOoxmlShadingFill(attributes: Readonly<Record<string, string>> | undefined): string | undefined;
/** Read `w:shd` from a typed/generic element (table `tcPr`, nested `pPr`, …). */
declare function shadingFillFromElement(shd: OoxmlElement | undefined): string | undefined;
/**
 * Resolve paragraph shading from cascaded flat `w:pPr` properties.
 *
 * Later `w:shd` entries win (defaults → style → direct), matching spacing/border cascade.
 */
declare function paragraphShading(props: readonly OoxmlProperty[]): string | undefined;
/**
 * Page-content box for paragraph shading: union of this fragment's line boxes.
 *
 * Excludes collapsed before/after spacing and bottom-border extent so the painted band
 * matches Word's content-area fill (character shading height on a single line).
 */
declare function paragraphShadingBox(lines: readonly {
    readonly box: LayoutBox;
}[], x: number, width: number): LayoutBox | undefined;

/**
 * Where one note is referenced from — what per-page and per-section restart rules are computed
 * against.
 */
interface NoteReferenceSite {
    /** Stable note id (`w:id`). */
    readonly noteId: number;
    /** Section index of the reference (0-based). */
    readonly sectionIndex: number;
    /**
     * Page index of the reference when known (0-based). Required for `eachPage` restart;
     * when omitted, `eachPage` behaves like `continuous` for that site.
     */
    readonly pageIndex?: number;
    /** When true, consumes no automatic number (`customMarkFollows`). */
    readonly customMarkFollows?: boolean;
}
/**
 * The mark a note reference paints.
 *
 * `null` where `w:customMarkFollows` suppresses it: the document supplies its own glyph, and
 * painting an automatic number too would show the note twice.
 */
interface NoteDisplayMark {
    readonly noteId: number;
    /** Formatted mark, or `null` when suppressed by customMarkFollows. */
    readonly mark: string | null;
    /** 1-based automatic sequence number when assigned; absent when suppressed. */
    readonly displayNumber?: number;
}
type ResolvedNoteProperties = ResolvedFootnoteProperties | ResolvedEndnoteProperties;
/**
 * Derive display marks for references of one note kind in document order.
 *
 * Restart rules:
 * - `continuous` — single sequence across the document from `numStart`
 * - `eachSect` — restart at `numStart` when `sectionIndex` changes
 * - `eachPage` — restart when `pageIndex` changes (falls back to continuous if unknown)
 *
 * IDs are stable; only display numbers change. Non-mutating.
 */
declare function deriveNoteDisplayMarks(noteKind: NoteKind, references: readonly NoteReferenceSite[], properties: ResolvedNoteProperties): readonly NoteDisplayMark[];
/**
 * Derive marks using per-reference-section resolved properties (`numFmt` / `numStart` /
 * `numRestart`). Restart rules consult each site's own section props.
 */
declare function deriveNoteDisplayMarksResolved(_noteKind: NoteKind, references: readonly NoteReferenceSite[], resolveProps: (sectionIndex: number) => ResolvedNoteProperties): readonly NoteDisplayMark[];
/** Map noteId → formatted mark for quick lookup (last site wins if duplicated). */
declare function noteDisplayMarkMap(marks: readonly NoteDisplayMark[]): ReadonlyMap<number, string | null>;

/** Hard ceiling on notes laid out in one pass (fail closed beyond). */
declare const MAX_NOTES_LAID_OUT = 10000;
/** Hard ceiling on fragments emitted for one note (split / continuation). */
declare const MAX_NOTE_FRAGMENTS = 512;
/**
 * Why note layout stopped short and fell back.
 *
 * Every one is a BOUND rather than a bug: note counts, fragment counts and heights all come from
 * a file, and a document can ask for more note area than a page has. Falling back with a reason
 * keeps the document open instead of failing to lay out.
 */
type NoteLayoutFallbackReason = 'note-count-limit' | 'note-fragment-limit' | 'note-reflow-exhausted' | 'note-height-cap'
/** Authored separator/continuationSeparator taller than the content column. */
 | 'note-separator-height-cap' | 'missing-note-body' | 'dangling-note-reference';
/**
 * One note's body laid out as its own story, in story-relative coordinates.
 *
 * Relative rather than page-absolute because a note moves between pages during pagination — the
 * page it lands on is decided after its content is measured.
 */
interface NoteStoryLayout {
    readonly noteKind: NoteKind;
    readonly noteId: number;
    /** `footnote:N` / `endnote:N` — matches EditorScope note id encoding. */
    readonly scopeId: string;
    readonly noteType: ReturnType<typeof noteTypeOf>;
    /** Story-relative fragments; origin at the story box's top-left. */
    readonly fragments: readonly BlockFragmentRecord[];
    /** Height the blocks flow to (points). */
    readonly flowHeight: number;
    /** True when layout hit a named bound and returned a truncated / empty story. */
    readonly fallbackReason?: NoteLayoutFallbackReason;
}
/** Paint style for Word-default / marker-only separator rules (not CSS inventing content). */
type NoteSeparatorRuleStyle = 'single' | 'double';
/**
 * The rule between body text and the note area.
 *
 * Synthesized when the document declares none, because Word draws one regardless — a document
 * without an authored separator still shows the line a reader expects.
 */
interface NoteSeparatorLayout {
    readonly kind: 'separator' | 'continuationSeparator';
    readonly fragments: readonly BlockFragmentRecord[];
    readonly flowHeight: number;
    /** True when the engine synthesized a default rule (document had none). */
    readonly synthetic: boolean;
    /**
     * Layout-owned rule when the separator is marker-only (`w:separator` /
     * `w:continuationSeparator`) or fully synthetic. Absent when an authored separator
     * story has real paragraph/run/border content that paint should render as fragments.
     */
    readonly ruleStyle?: NoteSeparatorRuleStyle;
    /** Set when an oversize authored separator was replaced with a synthetic rule. */
    readonly fallbackReason?: NoteLayoutFallbackReason;
}
/**
 * Inline drawing support for ONE notes part.
 *
 * A note lives in `/word/footnotes.xml` or `/word/endnotes.xml`, not in the body part, so its
 * pictures resolve against that part's relationships — the same per-part shape header/footer
 * furniture uses. Without it a note paragraph flows with no drawing context at all and a
 * picture inside it contributes no record: no image, and no placeholder either.
 */
interface NoteStoryDrawings {
    readonly inlineDrawingLayout: InlineDrawingLayoutContext;
    /**
     * Per-paragraph projection + RESOURCE token for the break cache key.
     *
     * Image resources settle asynchronously, and the authored extent does not move when one
     * does — so without the resource in the key the cached `pending` lines are served forever
     * and a decoded picture never reaches the page.
     */
    readonly drawingTokenForParagraph?: (paragraph: OoxmlNode) => string;
}
interface LayoutNoteStoryOptions {
    readonly measurer: TextMeasurer;
    readonly producer: string;
    readonly cache?: ParagraphLayoutCache<readonly PendingLine[]>;
    readonly styleCascade?: StyleCascadeTable;
    readonly defaultTabStopPt?: number;
    /** Derived display marks for noteRef projection inside the note body. */
    readonly noteMarks?: NoteMarkContext;
    /**
     * Cap on flow height for a single note story (points). Hostile notes must not allocate
     * unbounded page fragments; overflow is split by the pagination layer, not here.
     */
    readonly maxFlowHeightPt?: number;
    /** Resolves inline drawing support for the notes part a story lives in. */
    readonly drawingsForPart?: (ownerPartName: string) => NoteStoryDrawings | undefined;
    /**
     * Notes part the story being laid out came from. Set by {@link layoutNoteById} /
     * {@link layoutNoteSeparator}, which are the callers that hold the part.
     */
    readonly ownerPartName?: string;
}
/**
 * Stable line-id namespace for one note. Body line counters compare these as opaque strings
 * and must not collide with `line-N` / `hf-…` ids.
 */
declare function noteLineIdPrefix(noteKind: NoteKind, noteId: number): string;
/** Collect normal (body) notes from a notes part, bounded. */
declare function normalNotesOf(part: OoxmlPart | null | undefined): readonly OoxmlElement[];
/** Find separator / continuationSeparator note body in a notes part. */
declare function findSeparatorNote(part: OoxmlPart | null | undefined, kind: 'separator' | 'continuationSeparator'): OoxmlElement | undefined;
/**
 * Lay one note node out at `contentWidth`.
 *
 * Does not paginate. Callers that need splits ask for fragments and cut at paragraph/line
 * boundaries in the note-pagination layer.
 */
declare function layoutNoteStory(note: OoxmlNode, contentWidth: number, options: LayoutNoteStoryOptions): NoteStoryLayout | null;
/** Layout a note by id from a notes part; null when missing. */
declare function layoutNoteById(part: OoxmlPart | null | undefined, noteId: number, contentWidth: number, options: LayoutNoteStoryOptions): NoteStoryLayout | null;
/**
 * Word-default paint style for a separator marker.
 *
 * Footnote and endnote separators both use a short single rule. A full-width double
 * border on a body heading (e.g. the comprehensive fixture’s end banner) is ordinary
 * paragraph `w:pBdr` ownership and must not transfer onto the note separator record.
 * Authored separator stories with real paragraph/run/border content bypass this via
 * fragment paint.
 */
declare function defaultNoteSeparatorRuleStyle(_noteKind: NoteKind, _kind: 'separator' | 'continuationSeparator'): NoteSeparatorRuleStyle;
/**
 * True when a separator note contains only OOXML separator markers (and empty noteRef
 * atoms Word often authors beside them) — no measurable text or paragraph borders.
 */
declare function isMarkerOnlySeparatorNote(note: OoxmlNode): boolean;
/**
 * Layout the document's separator note, or synthesize a short horizontal rule.
 *
 * Marker-only / missing separators emit no paragraph fragments — paint draws the rule
 * from {@link NoteSeparatorLayout.ruleStyle} + box geometry. Authored separators with
 * real paragraph/run/border content keep their fragment story (including `w:pBdr`).
 *
 * When `maxFlowHeightPt` is set and an authored separator exceeds it, the engine fails
 * closed to a short synthetic rule ({@link note-separator-height-cap}) so note pagination
 * cannot burn the overflow budget on zero-progress separator-only pages.
 */
declare function layoutNoteSeparator(part: OoxmlPart | null | undefined, kind: 'separator' | 'continuationSeparator', contentWidth: number, options: LayoutNoteStoryOptions, noteKind: NoteKind, maxFlowHeightPt?: number): NoteSeparatorLayout;
/** Default rule geometry for a synthetic / marker-only separator, story-relative. */
declare function syntheticSeparatorBox(contentWidth: number, flowHeight: number): LayoutBox;
/** Absolute separator box: short rule for marker/synthetic, full width for authored stories. */
declare function noteSeparatorAreaBox(separator: NoteSeparatorLayout, contentX: number, contentWidth: number, areaTop: number): LayoutBox;

/** Bound on reflow attempts per document layout pass. */
declare const MAX_NOTE_REFLOW_ATTEMPTS = 8;
/** Cap on empty pages created solely to drain footnote/endnote overflow. */
declare const MAX_NOTE_OVERFLOW_PAGES = 256;
/**
 * Cap on synthetic eachPage mark candidates measured per section (plus actual marks).
 *
 * eachPage sequences restart every page, so a page almost never carries more than a
 * handful of auto-numbered notes. Measuring `numStart .. numStart + N - 1` covers
 * single→double digit decimal growth and typical roman width peaks (e.g. `viii` vs `ix`)
 * without scanning hostile `numStart` ranges unboundedly. Derived marks already assigned
 * for the pass are always included in addition to this window.
 */
declare const MAX_EACH_PAGE_MARK_CANDIDATES = 12;
/**
 * Why note PAGINATION fell back, widening {@link NoteLayoutFallbackReason} with the reasons that
 * only arise while distributing notes across pages.
 */
type NotePaginationFallbackReason = NoteLayoutFallbackReason | 'note-reflow-exhausted' | 'note-area-fragment-limit' | 'note-overflow-page-limit'
/**
 * Overflow/drain iteration placed zero note stories while carry/pending remained —
 * abort rather than minting blank separator-only sheets up to the page budget.
 */
 | 'note-overflow-stalled'
/** A single note line exceeds the full content column; content is not placed overflowing. */
 | 'note-line-exceeds-page';
/**
 * Everything note pagination needs: the note parts, and the per-section properties governing
 * them.
 *
 * Per-SECTION because numbering, restart rules and placement are all section properties — one
 * document can restart footnote numbering at every section and end notes at the document end.
 */
interface NotesLayoutInput {
    readonly footnotesPart: OoxmlPart | null;
    readonly endnotesPart: OoxmlPart | null;
    /** Per-section resolved footnote properties (index-aligned with document sections). */
    readonly footnotePropsBySection: readonly ResolvedFootnoteProperties[];
    /** Per-section resolved endnote properties. */
    readonly endnotePropsBySection: readonly ResolvedEndnoteProperties[];
    /** Document-level defaults (section 0 fallback). */
    readonly documentFootnoteProps: ResolvedFootnoteProperties;
    readonly documentEndnoteProps: ResolvedEndnoteProperties;
    readonly measurer: TextMeasurer;
    readonly producer: string;
    readonly cache?: ParagraphLayoutCache<readonly PendingLine[]>;
    readonly styleCascade?: StyleCascadeTable;
    readonly defaultTabStopPt?: number;
    /**
     * Inline drawing support per notes part. Absent means note paragraphs flow without
     * drawing records, which is what a headless caller with no image port wants.
     */
    readonly drawingsForPart?: (ownerPartName: string) => NoteStoryDrawings | undefined;
}
/**
 * The layout with notes attached, plus any fallbacks taken and the mark context used.
 *
 * The marks come back because they feed the body's incremental cache tokens: a note number that
 * changed must invalidate the paragraph that references it.
 */
interface NotesAttachResult {
    readonly layout: SemanticLayout;
    readonly fallbackReasons: readonly NotePaginationFallbackReason[];
    /** Mark context used for the final body projection (for incremental cache tokens). */
    readonly noteMarks: NoteMarkContext;
}
interface PageRefHit {
    readonly noteKind: NoteKind;
    readonly noteId: number;
    readonly paragraphId: string;
    /** Canonical UTF-16 atom offset within the paragraph. */
    readonly atomOffset: number;
    readonly customMarkFollows: boolean;
    readonly sectionIndex: number;
}

/**
 * Whether a paragraph fragment owns a note atom at `atomOffset`.
 *
 * Fragment ranges are half-open for content ownership: `[start, end)`. The shared
 * boundary offset belongs to the later fragment (downstream affinity), matching line
 * splits where `fragmentStart = previous.range.end`.
 */
declare function fragmentOwnsAtomOffset(fragment: ParagraphFragmentRecord, atomOffset: number): boolean;
/** Paragraph-id → refs index for linear {@link filterRefsOnPage} over a layout pass. */
type PageRefIndex = ReadonlyMap<string, readonly PageRefHit[]>;
/** Build a reusable paragraph-id index (document order preserved per paragraph). */
declare function buildPageRefIndex(allRefs: readonly PageRefHit[]): PageRefIndex;
/**
 * Collect note references that appear in laid-out body fragments on a page.
 * Matches {@link ParagraphFragmentRecord.range} ownership (half-open + boundary affinity).
 *
 * Pass {@link buildPageRefIndex} result as `refIndex` for O(fragments + matching refs)
 * instead of scanning every document ref against every page fragment.
 */
declare function filterRefsOnPage(page: PageRecord, allRefs: readonly PageRefHit[], refIndex?: PageRefIndex): readonly PageRefHit[];
/**
 * Compute per-page bottom reserves (points) needed for footnotes given a provisional layout.
 * Used by the bounded reflow loop before final attach.
 *
 * Height is measured against a column-derived note budget (not leftover body slack). Measuring
 * from slack makes `stable` true on the first pass and never shrinks the body — references and
 * notes then compete for the same band. Oversized notes still split/continue within the budget;
 * {@link MIN_FOOTNOTE_BODY_BAND_PT} keeps a body band so reflow cannot chase blank sheets.
 */
declare function computeFootnoteReserves(layout: SemanticLayout, allRefs: readonly PageRefHit[], input: NotesLayoutInput, noteMarks: NoteMarkContext): {
    readonly reserves: ReadonlyMap<number, number>;
    readonly stable: boolean;
    readonly reasons: readonly NotePaginationFallbackReason[];
};
/**
 * Attach footnote/endnote areas onto a body layout. Does not re-paginate — callers that
 * need reservation must re-run body layout with {@link pageBottomReserves} first.
 */
declare function attachNotesToLayout(layout: SemanticLayout, allRefs: readonly PageRefHit[], input: NotesLayoutInput, options?: {
    readonly fallbackReasons?: readonly NotePaginationFallbackReason[];
    readonly paragraphSectionIndex?: ReadonlyMap<string, number>;
}): NotesAttachResult;
/**
 * Build a continuous (pre-page) mark context for the first body layout pass.
 * eachPage reserves digit width; {@link reprojectBodyNoteMarks} publishes final marks
 * onto body citations after page assignment in {@link attachNotesToLayout}.
 */
declare function provisionalNoteMarks(refs: readonly PageRefHit[], input: NotesLayoutInput): NoteMarkContext;

/** Page geometry for header/footer anchored frame resolution (story-relative layout space). */
interface HeaderFooterPageContext {
    readonly pageNumber: number;
    readonly pageWidth: number;
    readonly pageHeight: number;
    readonly marginLeft: number;
    readonly marginRight: number;
    readonly marginTop: number;
    readonly marginBottom: number;
}
interface HeaderFooterStoryLayout {
    readonly partName: string;
    /** Main-document relationship id when the furniture source knows it. */
    readonly rId?: string;
    /**
     * Bounded identity of the story's canonical OOXML content.
     *
     * Furniture cache keys must not rely on {@link flowHeight} alone: equal-height A→B edits
     * would otherwise reuse stale page furniture. Derived as a 16-hex FNV-1a over the part's
     * canonical fingerprint — never DOM identity or unbounded raw serialization in the key.
     * PAGE/NUMPAGES/SECTIONPAGES projection shares this key; page context is cached separately.
     */
    readonly contentKey: string;
    /** Story-relative fragments; origin at the story box's top-left. */
    readonly fragments: readonly BlockFragmentRecord[];
    /** The height the blocks actually flow to — what sizes the box on every page. */
    readonly flowHeight: number;
    /**
     * Allowlisted complex PAGE / NUMPAGES / SECTIONPAGES presence detected for this story.
     *
     * Callers use this to skip attaching a page-field projector when the baseline is enough.
     */
    readonly pageFieldNeeds: StoryPageFieldNeeds;
    /** Anchored drawings owned by this story, in story-relative coordinates. */
    readonly anchoredDrawings?: readonly AnchoredDrawingRecord[];
    /**
     * Re-layout this story under a page-field context.
     *
     * Field-free stories return `this`. Count-only stories cache by the counts they read.
     * PAGE stories cache by the distinct evaluated values (including format) with a bounded LRU.
     */
    readonly withPageContext: (ctx: FieldPageContext) => HeaderFooterStoryLayout;
}
/**
 * Lay one header/footer part out at `contentWidth`.
 *
 * Line ids are namespaced by part so the body's `line-N` counter — which incremental
 * convergence compares — never moves because a header changed.
 *
 * When `pageContext` is set, allowlisted PAGE/NUMPAGES/SECTIONPAGES instructions project
 * live values; otherwise those fields contribute only cached result text (often empty).
 * Field-free stories ignore `pageContext` and share one baseline layout.
 *
 * `defaultTabStopPt` is the document's `w:settings/w:defaultTabStop` (ECMA-376 §17.15.1.25)
 * in points; absent keeps the 0.5" schema default. Furniture tabs on the SAME grid as the
 * body — a page-number tab in a metric-locale footer belongs on the document's interval, not
 * on a constant. It sits at the tail because the parameters ahead of it are already
 * positional; new callers should keep passing `undefined` for what they do not set.
 */
declare function layoutHeaderFooterStory(part: OoxmlPart, contentWidth: number, measurer: TextMeasurer, producer: string, cache?: ParagraphLayoutCache<readonly PendingLine[]>, styleCascade?: StyleCascadeTable, pageContext?: FieldPageContext, maxPageContextEntries?: number, defaultTabStopPt?: number, displayMode?: RevisionDisplayMode, inlineDrawingLayout?: InlineDrawingLayoutContext, drawingTokenForParagraph?: (paragraph: OoxmlNode) => string, drawingLayoutToken?: string, hfPageContext?: HeaderFooterPageContext): HeaderFooterStoryLayout;

/** The flow state as it stood immediately before one block was placed. */
interface FlowCheckpoint {
    /** Completed pages at this point. The prefix of the previous layout that still stands. */
    readonly pageCount: number;
    /** Fragments already on the page being built. */
    readonly pageFragments: readonly BlockFragmentRecord[];
    /** Anchored drawings already collected for the open page. */
    readonly pendingAnchoredDrawings: readonly AnchoredDrawingRecord[];
    readonly cursorY: number;
    readonly lineCounter: number;
    /** Trailing paragraph spacing participating in adjacent-spacing collapse. */
    readonly previousSpaceAfter: number;
    /** Active column index when the section uses multiple columns. */
    readonly flowColumnIndex: number;
}
/**
 * What the last layout pass actually did — the observable evidence that incremental layout is
 * working.
 *
 * `reusedPages` and `fullPasses` are the ones that matter: a typing keystroke that rebuilds every
 * page produces identical output and unusable performance, so the tests assert on these rather
 * than on the rendered result.
 */
interface LayoutSessionStats {
    /** Paragraphs placed by the last pass, against the number in the document. */
    readonly placed: number;
    readonly total: number;
    /** Pages carried over from the previous layout without being rebuilt. */
    readonly reusedPages: number;
    /** Passes that could not resume and laid the document out from the top. */
    readonly fullPasses: number;
}
/** One section's place on the previous document sheet stack. */
interface SectionStackSpan {
    readonly startIndex: number;
    readonly pageCount: number;
    readonly sheetY: number;
    /** Remapped pages (projectors intact) from the last pass for this section. */
    readonly remappedPages: readonly PageRecord[];
}
/** Orchestrator state for multi-section incremental layout. */
interface MultiSectionLayoutState {
    structureKey: string;
    sections: LayoutSession[];
    spans: SectionStackSpan[];
    previousRemapped: readonly PageRecord[];
    previousFinalized: SemanticLayout | null;
    previousPageCount: number;
}
/**
 * Carried-over state that makes layout incremental.
 *
 * A caller creates one and hands the SAME object back each pass. It holds the previous pages, the
 * per-block cache keys and the flow checkpoints a pass resumes from, so an edit low in a document
 * re-lays only what follows it. A no-change pass returns the previous pages by identity.
 */
interface LayoutSession {
    /** @internal Mutable across passes; a caller only creates one and passes it back. */
    previous: SemanticLayout | null;
    checkpoints: FlowCheckpoint[];
    keys: string[];
    /** Geometry and producer of the previous pass; a change to either forces a full pass. */
    context: string;
    /**
     * Line counter after the last block of the previous pass.
     *
     * Multi-section orchestration threads a global line counter across sections; early-exit
     * paths (unchanged / converged) must report this rather than the resume cursor.
     */
    endLineCounter: number;
    /**
     * Flow state after the last block of the previous pass, for a section that CONTINUES
     * onto this one's last sheet (`w:type="continuous"`).
     *
     * `endCursorY` is the used height of that sheet's content column; `endSpaceAfter` is the
     * trailing paragraph spacing still eligible for adjacent-spacing collapse. Reported by
     * the early-exit paths (unchanged / converged) for the same reason as
     * {@link endLineCounter}: the resume cursor is not the end of the flow.
     */
    endCursorY: number;
    endSpaceAfter: number;
    /** Whether the last page of that pass was still open (no trailing page break). */
    endsOpenPage: boolean;
    stats: LayoutSessionStats;
    /**
     * Column-height limit chosen by the last balanced multi-column pass, or null when the
     * last pass did not balance.
     *
     * Lets the next pass try the remembered limit FIRST: an unchanged balanced section
     * early-exits on that single attempt instead of re-running the natural pass and the
     * whole balance search every time.
     */
    balanceLimit: number | null;
    /** Present when the last pass was multi-section; child sessions live here. */
    multi: MultiSectionLayoutState | null;
    /**
     * Page-bottom footnote reserves from the last published notes layout.
     *
     * Seeded into the next {@link layoutSemanticDocumentWithNotes} call so the first body
     * pass already matches the reserved context key — without this, every notes document
     * starts empty, mismatches, and throws away the session on reflow.
     */
    notePageBottomReserves: ReadonlyMap<number, number> | null;
}
/**
 * A layout session, retained across revisions by the caller.
 */
declare function createLayoutSession(): LayoutSession;

/**
 * A deterministic measurer for tests and headless use.
 *
 * Monospace by construction: every character is the same width and every line the same
 * height, scaled by `w:sz` when present. Real shaping is the HarfBuzz path; this exists so
 * layout behaviour can be asserted without a font stack deciding the answer.
 */
declare function createFixedMeasurer(charWidth?: number, lineHeight?: number): TextMeasurer;

/** Which header/footer variant a page shows (ECMA-376 §17.10.5). */
type HeaderFooterVariantName = 'default' | 'first' | 'even';
/**
 * Pre-laid page furniture, supplied by the host (phase 2).
 *
 * Baseline stories are laid out once per variant (`layoutHeaderFooterStory`) for furniture
 * height. Stories that actually contain allowlisted PAGE/NUMPAGES fields attach a projector
 * so document-level finalize can re-layout under the known page count; field-free furniture
 * reuses the baseline on every sheet.
 */
interface PageFurniture {
    readonly titlePage: boolean;
    readonly evenAndOddHeaders: boolean;
    readonly headers: ReadonlyMap<HeaderFooterVariantName, HeaderFooterStoryLayout>;
    readonly footers: ReadonlyMap<HeaderFooterVariantName, HeaderFooterStoryLayout>;
}
/**
 * Everything a layout pass needs beyond the document itself.
 *
 * `measurer` is the only required field — layout is DOM-free and measures through whatever is
 * injected here, which is what lets the same code paginate on a server and in a browser.
 */
interface SemanticLayoutOptions {
    readonly geometry?: PageGeometry;
    readonly measurer: TextMeasurer;
    /**
     * Reuse of measured-and-broken paragraphs across revisions (task 9.2).
     *
     * Only the BREAK is cached. Placement — y, fragments, page cuts — is always redone, so
     * an edit high in the document still repaginates everything below it while paragraphs
     * nobody touched are never measured again.
     */
    readonly cache?: ParagraphLayoutCache<readonly PendingLine[]>;
    /**
     * Who produced the measurements, folded into every cache key.
     *
     * A font arriving after first paint changes every advance in the document while no
     * content changes; without this the cache would serve the pre-font layout forever.
     */
    readonly producer?: string;
    /**
     * Incremental placement across revisions (task 9.3).
     *
     * Holds the previous complete layout and a flow checkpoint per paragraph, so a pass can
     * resume just before the first affected paragraph instead of re-placing the document from
     * the top, and can stop early when the flow reconverges with the previous run.
     *
     * Multi-section documents keep per-section child sessions on {@link LayoutSession.multi}.
     */
    readonly session?: LayoutSession;
    /** Header/footer stories to attach per page; absent means no furniture. */
    readonly furniture?: PageFurniture;
    /**
     * Which tracked revisions this pass resolves away (ECMA-376 §17.13).
     *
     * `all-markup` (the default) lays out both halves of every change. `proposed` lays out what
     * the document becomes if every change is accepted; `original` what it was before any of
     * them. Both are LAYOUT INPUTS: neither applies a `TreeDocOp` nor publishes a `ModelChange`,
     * so a user who switches to the proposed result, saves, and sends the file has not silently
     * accepted every proposal in it.
     */
    readonly displayMode?: RevisionDisplayMode;
    /**
     * Per-section furniture, index-aligned with `enumerateDocumentSections`.
     *
     * When present, multi-section layout attaches each section's own headers/footers (after
     * OOXML inheritance). `furniture` remains the single-section / last-section fallback.
     */
    readonly sectionFurniture?: readonly (PageFurniture | undefined)[];
    /** Authored column count/gap for anchored `relativeFrom="column"` frame resolution. */
    readonly sectionColumns?: SectionColumns;
    /**
     * Styles-part cascade table (docDefaults + `w:style` last-wins). Absent keeps direct
     * formatting only — the pre-cascade behaviour, used by unit tests that never open a
     * package.
     */
    readonly styleCascade?: StyleCascadeTable;
    /**
     * Projection of `/word/numbering.xml`. Absent keeps pre-list behaviour (no markers /
     * level indents). The index is immutable for a session; list counter state is derived
     * per layout pass from document order.
     */
    readonly numberingIndex?: NumberingIndex;
    /**
     * Optional precomputed list items for the body story. When absent and
     * {@link numberingIndex} is set, layout walks the full body (including table cells)
     * once so counters continue across section boundaries and table document order.
     */
    readonly listItems?: ReadonlyMap<string, ResolvedListItem>;
    /**
     * `w:settings/w:defaultTabStop` in points (ECMA-376 §17.15.1.25); absent keeps the 0.5"
     * schema default.
     *
     * It arrives as an option because the paragraph cascade cannot see `settings.xml`. A
     * metric-locale template declares 1134 twips (2cm) and every default-interval tab in the
     * document belongs on that grid. Constant for a session — the settings part is immutable
     * here — which is why the prepared-block memo does not key on it.
     */
    readonly defaultTabStopPt?: number;
    /**
     * Turns a typed `w:hyperlink` into the SANITIZED record its spans carry.
     *
     * An option because resolving `r:id` needs the package's relationships, which layout — a
     * per-part walk — cannot see. Absent means link runs still measure, break and paint;
     * they simply carry no link, so nothing is clickable and no text is lost. That is the
     * degradation a headless test or a furniture-only pass gets, and it is the safe one.
     */
    readonly projectLink?: HyperlinkProjector;
    /**
     * Footnote/endnote layout input. When present, body layout projects note marks and a
     * post-pass attaches note areas (with bounded reflow for pageBottom reservation).
     */
    readonly notes?: NotesLayoutInput;
    /**
     * Per-page bottom reserves (points) subtracted from content height before line placement.
     * Produced by the note reflow loop; absent means full content column.
     */
    readonly pageBottomReserves?: ReadonlyMap<number, number>;
    /** Derived note marks for body/note projection (provisional or final). */
    readonly noteMarks?: NoteMarkContext;
    /** Inline drawing projection for typed `w:drawing` / `wp:inline` nodes. */
    readonly inlineDrawingLayout?: InlineDrawingLayoutContext;
    /** Per-paragraph drawing projection/resource token for break cache keys. */
    readonly drawingTokenForParagraph?: (paragraph: OoxmlNode) => string;
    /** @deprecated Prefer {@link drawingTokenForParagraph}. */
    readonly drawingLayoutToken?: string;
    /** Internal: reflow pass index while wrap exclusions converge. */
    readonly drawingExclusionPass?: number;
    /** Internal: converged exclusion zones — skips the reflow loop when set with zones. */
    readonly drawingExclusionConverged?: boolean;
    /** Internal: exclusion zones from the prior reflow pass, keyed by page index. */
    readonly drawingExclusionZonesByPage?: ReadonlyMap<number, readonly ExclusionZone[]>;
    /** Canonical drawing traversal order within the owner story part. */
    readonly drawingSourceOrder?: ReadonlyMap<string, number>;
    /**
     * Cross-paragraph TOC field begin/end paragraph ids. Empty chrome on these ids suppresses
     * the caret placeholder line in layout while the tree nodes stay intact for refresh/save.
     */
    readonly tocFieldChromeParagraphIds?: ReadonlySet<string>;
    /**
     * Begin-paragraph ids of empty TOCs. These keep one layout line so paint can host an
     * identifiable empty-TOC furniture placeholder (overrides chrome suppression).
     */
    readonly emptyTocPlaceholderParagraphIds?: ReadonlySet<string>;
    /**
     * Empty result-paragraph ids inside empty TOCs. Suppressed like field chrome so blank
     * cached rows do not stack under the empty placeholder.
     */
    readonly emptyTocSuppressedResultParagraphIds?: ReadonlySet<string>;
}
/**
 * Lay one story part out into pages.
 *
 * The engine's layout entry point. Walks body, header, footer and note roots, flattens block
 * SDTs, paginates tables with header-row repeats and vertical merges, and resolves every
 * paragraph through the style cascade.
 *
 * Incremental when given a {@link LayoutSession}: per-block cache keys plus flow checkpoints mean
 * a pass that changes nothing returns the previous pages by identity.
 */
declare function layoutSemanticDocument(part: OoxmlPart, revision: number, options: SemanticLayoutOptions): SemanticLayout;

/** Soft ceiling on an expanded marker string (codepoints). */
declare const MAX_MARKER_TEXT_LENGTH = 64;
/** Soft ceiling on authored `w:lvlText` before expansion. */
declare const MAX_LVL_TEXT_LENGTH = 64;
/** Clamp a list counter into a safe non-negative integer Word can format. */
declare function clampListValue(value: number): number;
/** `decimal` (§17.18.59). Clamped, because the counter derives from file-declared restarts. */
declare function formatDecimal(value: number): string;
/** `decimalZero` (§17.18.59): single digits zero-padded to two. */
declare function formatDecimalZero(value: number): string;
/**
 * `upperRoman` (§17.18.59). Saturates at 3999, the largest value classical Roman numerals
 * express — beyond it there is nothing correct to emit, so it stops rather than inventing
 * notation.
 */
declare function formatUpperRoman(value: number): string;
/** `lowerRoman` (§17.18.59). */
declare function formatLowerRoman(value: number): string;
/**
 * Excel-style letter sequence: 1→A … 26→Z, 27→AA.
 * Caps length so a hostile counter cannot grow without bound.
 */
declare function formatUpperLetter(value: number): string;
/** `lowerLetter` (§17.18.59): the {@link formatUpperLetter} sequence, lower-cased. */
declare function formatLowerLetter(value: number): string;
/**
 * Format one counter for a `w:numFmt` value (ST_NumberFormat, §17.18.59).
 *
 * `none` prints NOTHING — it is the format Word uses for a level that contributes only
 * literal text, and formatting it as decimal invents a number the document never had.
 * `bullet` is not formatted here — callers use the literal `lvlText`.
 *
 * The remaining enumerants (`japaneseCounting`, `hebrew1`, `thaiNumbers`, `ganada`, …) are
 * per-script numeral sequences we do not carry glyph tables for. They fall back to decimal
 * deliberately: the ORDINAL is still the authored one, only the script differs, which reads
 * as a number in the wrong alphabet rather than as a missing or wrong marker.
 */
declare function formatNumFmt(numFmt: string, value: number): string;
/**
 * Expand `w:lvlText` placeholders `%1`…`%9` using per-level counters and formats.
 *
 * `formats[i]` / `counters[i]` correspond to ilvl `i`. Missing slots use decimal / 1.
 * Literal percent signs that are not `%1`…`%9` are kept. Output is hard-capped.
 */
declare function expandLvlText(lvlText: string, counters: readonly number[], formats: readonly string[]): string;

/**
 * The result of counting ONE list paragraph: the level that applied, the counter vector after it,
 * and the marker text a reader sees.
 *
 * Counters are a vector across all nine levels, not a single number, because a deeper level
 * restarting resets the ones below it while leaving those above intact.
 */
interface ListCounterAdvance {
    /** Effective abstract numbering template for this num instance. */
    readonly abstractNumId: string;
    readonly numId: string;
    readonly ilvl: number;
    readonly level: NumberingLevel;
    /** Counter vector after this item was counted (indices 0..8). */
    readonly counters: readonly number[];
    /** Expanded marker text (empty when vanished / empty lvlText). */
    readonly markerText: string;
}
/**
 * The running counters for one layout pass over one story.
 *
 * Stateful and order-dependent by nature: a list number is a function of every numbered paragraph
 * before it, which is why markers are computed during layout and cannot be read off a paragraph
 * in isolation.
 */
interface ListCounterState {
    /**
     * Advance counters for one list paragraph.
     *
     * Returns null when the numbering definition cannot be resolved — callers treat the
     * paragraph as non-list (inert fallback).
     */
    advance(numId: string, ilvl: number): ListCounterAdvance | null;
}
/**
 * Create a fresh counter bag for one story (body, or one header/footer part).
 */
declare function createListCounterState(index: NumberingIndex): ListCounterState;

/**
 * The stack used when a run names no font (or names one the sink refuses).
 *
 * Paint only sets `font-family` when `w:rFonts` supplies a validated name, so an unstyled
 * run inherits the surrounding face. Measuring one stack and painting another drifts every
 * advance; this is the Word-like Latin fallback the canvas path measures against.
 */
declare const DEFAULT_CANVAS_FONT_STACK = "Calibri, Carlito, Helvetica, Arial, sans-serif";
/**
 * The canvas text-metrics surface the editor injects.
 *
 * Structural subset of `CanvasRenderingContext2D` — declared here so the layout lane stays
 * off the DOM lib. Hosts pass a real 2d context; tests pass a controllable mock.
 */
interface CanvasTextMetrics {
    readonly width: number;
    readonly fontBoundingBoxAscent?: number;
    readonly fontBoundingBoxDescent?: number;
}
/**
 * The slice of a 2D canvas context measurement needs.
 *
 * A structural subset rather than `CanvasRenderingContext2D`, so layout stays DOM-free and a test
 * can supply a deterministic stub.
 */
interface CanvasTextContext {
    font: string;
    measureText(text: string): CanvasTextMetrics;
}
/**
 * How the canvas measurer resolves fonts, scales, and bounds its caches. Every field optional.
 *
 * Layout never creates a canvas itself: without a `context` this measurer does not exist and the
 * surface falls back to fixed metrics.
 */
interface CanvasMeasurerOptions {
    /**
     * Layout units to CSS pixels — the same value the painter uses.
     *
     * Measuring at the layout size and multiplying afterwards is not the same as measuring at
     * the painted size: font metrics are hinted per pixel size. Everything here measures at
     * the painted size and converts back.
     */
    readonly scale?: number;
    readonly fallbackFamily?: string;
    /**
     * The engine-minted family a document-embedded face was registered under, if any.
     *
     * Paint prefers this alias over the declared family, so measurement has to as well: a
     * document whose face is embedded rather than installed would otherwise be measured
     * against the fallback and painted with the embedded glyphs, and every advance, wrap
     * point and page break would be taken from a font the reader never sees.
     */
    readonly fontAlias?: (family: string) => string | undefined;
    /**
     * Injected 2d text context from the editor/browser seam.
     *
     * `undefined` or `null` makes {@link tryCreateCanvasMeasurer} return null so the surface
     * falls back to the fixed measurer. Layout never creates a canvas element itself.
     */
    readonly context?: CanvasTextContext | null;
    /**
     * Unique `(font, text)` width entries retained before LRU eviction.
     *
     * Long editing sessions measure many transient paragraph states; bounding this cache keeps
     * memory predictable without changing layout output.
     */
    readonly maxWidthEntries?: number;
    /** Distinct font-shorthand line metrics retained before LRU eviction. */
    readonly maxMetricsEntries?: number;
}
/**
 * The measurer a surface ended up with, plus the identity its cache keys must include.
 *
 * The `producer` string is load-bearing: the same canvas measuring against document-embedded
 * faces produces DIFFERENT advances, so the two must not share a cache key space or a document
 * would keep its pre-font pagination after the font arrived.
 */
interface ResolvedSurfaceMeasurer {
    readonly measurer: TextMeasurer;
    /**
     * Cache-invalidation identity when the caller did not supply `producer`.
     *
     * `canvas-measurer+embedded` is the canvas measurer resolving document-embedded faces:
     * the same canvas, different advances, so it must not share a cache key space.
     */
    readonly producer: 'canvas-measurer' | 'canvas-measurer+embedded' | 'fixed-measurer';
}
/**
 * Whether an injected canvas text context is usable for measurement.
 *
 * Availability is decided by the editor seam (which alone may create a canvas). Layout
 * never probes `document` — a missing context is simply "unavailable".
 */
declare function isCanvasMeasurementAvailable(context?: CanvasTextContext | null | undefined): boolean;
/**
 * Build a canvas-backed measurer, or `null` when no 2d context was injected.
 *
 * Prefer {@link resolveDefaultSurfaceMeasurer} at the editor surface: that keeps the
 * fixed fallback for SSR/tests in one place.
 */
declare function tryCreateCanvasMeasurer(options?: CanvasMeasurerOptions): TextMeasurer | null;
/**
 * The surface's default measurer: canvas when a 2d context was injected, otherwise fixed.
 *
 * Host-supplied and shaping measurers override this entirely — call only when the options
 * did not already name one. The editor seam is responsible for creating the canvas context.
 */
declare function resolveDefaultSurfaceMeasurer(scale?: number, options?: CanvasMeasurerOptions): ResolvedSurfaceMeasurer;

/**
 * The story's blocks — paragraphs and tables — in document order, flattening through
 * block-level content-control wrappers under the shared nesting budget.
 */
declare function storyBlocks(part: OoxmlPart, displayMode?: RevisionDisplayMode): OoxmlElement[];
/**
 * Blocks of one typed footnote/endnote node — a separate semantic story root.
 *
 * The footnotes/endnotes part root is never a story; each note is laid out independently
 * so line ids and incremental convergence stay namespaced by note identity.
 */
declare function noteStoryBlocks(note: OoxmlNode, displayMode?: RevisionDisplayMode): OoxmlElement[];

/** Paragraph ids for TOC field begin/end chrome that must not reserve vertical flow when empty. */
declare function tocFieldChromeParagraphIds(part: OoxmlPart): ReadonlySet<string>;
/**
 * Begin-paragraph ids of TOCs that have no visible cached result rows.
 *
 * Layout keeps a single caret-height line on these ids so paint can host an identifiable
 * empty-TOC furniture placeholder; ordinary field chrome on the same ids stays suppressed.
 */
declare function emptyTocPlaceholderParagraphIds(part: OoxmlPart): ReadonlySet<string>;
/**
 * Empty result-paragraph ids inside an empty TOC.
 *
 * Suppressed like field chrome so blank cached rows do not stack under the empty placeholder.
 */
declare function emptyTocSuppressedResultParagraphIds(part: OoxmlPart): ReadonlySet<string>;

/** One page-local rectangle covering the part of a control that sits on that page. */
interface ContentControlFragmentRecord extends LayoutBox {
    readonly pageIndex: number;
}
/**
 * Everything a consumer needs to point at one control without walking the tree.
 *
 * `controlId` is the canonical NODE id — the identity `w:id` cannot provide, because the file
 * may omit it and may repeat it. `id` is the file's own `w:id` where it wrote one, carried as
 * metadata for a caller that has to speak to something outside this engine.
 */
interface ContentControlBoundaryRecord {
    readonly controlId: string;
    readonly type: ContentControlKind;
    readonly level: ContentControlLevel;
    /** 0 for a top-level control; the nesting depth otherwise. */
    readonly depth: number;
    readonly lock: ContentControlLock;
    /** The lock in force here, including every lock an enclosing control imposes. */
    readonly effectiveLock: ContentControlLock;
    readonly showingPlaceholder: boolean;
    readonly temporary: boolean;
    readonly tag?: string;
    readonly alias?: string;
    readonly id?: number;
    /** Preserved `w:dataBinding` metadata. Present means value writes are refused as bound. */
    readonly dataBinding?: ContentControlDataBinding;
    /** Paragraphs the control's content holds, in reading order. */
    readonly paragraphIds: readonly string[];
    /** One rectangle per page the content reaches, in the page's own coordinate space. */
    readonly fragments: readonly ContentControlFragmentRecord[];
}
/**
 * Derive one boundary record per control the part declares, in document order.
 *
 * A control whose content the layout never placed — one inside a story this layout is not of,
 * or one holding nothing — answers no fragments rather than a zero-sized box at the origin: a
 * rectangle nothing painted is a rectangle a hit test would match.
 */
declare function contentControlBoundaries(part: OoxmlPart, layout: SemanticLayout): readonly ContentControlBoundaryRecord[];

/** The visible band of the document, in layout units. */
interface ViewportWindow {
    /** Distance from the top of the document to the top of the visible area, in layout units. */
    readonly top: number;
    readonly height: number;
}
/**
 * Which pages to build in detail.
 *
 * A page left out keeps its size and position but no content, so the document's height and page
 * count are unchanged and scrolling to it reveals it rather than reflowing everything below.
 */
interface MaterializationInput {
    readonly layout: SemanticLayout;
    /** Omitted means "no viewport": everything is materialized, which is the honest default. */
    readonly viewport?: ViewportWindow;
    /** Extra pages kept ready either side of the visible band. */
    readonly overscanPages?: number;
    /** Pages that must be built wherever they are — caret, selection, a search hit. */
    readonly pinnedPages?: Iterable<number>;
}
/**
 * The page indices to build in detail.
 *
 * Returns indices rather than records so a caller can compare cheaply against what it
 * already has mounted, and so the decision can be made without touching the layout.
 */
declare function pagesToMaterialize(input: MaterializationInput): Set<number>;

/**
 * What a batch of commits can affect.
 *
 * `paragraphIds` is the set the commits touched directly. What that set MEANS depends on
 * `impact`: for a local impact it bounds the work, for a structural one it only says where
 * the reflow starts.
 */
interface LayoutScope {
    readonly impact: ImpactClass;
    /** Node ids touched directly by the coalesced commits. */
    readonly paragraphIds: ReadonlySet<string>;
    /** Ids the commits created — no previous layout exists for these. */
    readonly created: ReadonlySet<string>;
    /** Ids the commits removed — any retained layout for these must be released. */
    readonly deleted: ReadonlySet<string>;
    /** Cache keys the commits invalidated (styles, numbering, fonts). */
    readonly dependencyKeys: ReadonlySet<string>;
    /** True when the block SEQUENCE changed, so ids alone cannot bound the reflow. */
    readonly structural: boolean;
    /** The revision this scope describes — the layout result must carry the same one. */
    readonly revision: number;
}
/** How the scheduler produces layouts and when it publishes them. */
interface LayoutSchedulerOptions {
    /**
     * Produce a complete layout for the CURRENT model state.
     *
     * Given the accumulated scope so an incremental implementation can use it. It must tag
     * the result with the revision it actually read, which is what makes staleness detectable
     * rather than assumed.
     */
    readonly run: (scope: LayoutScope) => SemanticLayout;
    /** The model's revision right now. Read at publish time, never cached. */
    readonly currentRevision: () => number;
    /** Called with a layout that is known current. Never called with a stale one. */
    readonly publish: (layout: SemanticLayout, scope: LayoutScope) => void;
    /**
     * Defer work to a later turn, returning a canceller.
     *
     * Injected rather than assumed: the browser wants an animation frame, tests want to step
     * the queue by hand, and a server has neither.
     */
    readonly schedule?: (run: () => void) => () => void;
    /**
     * Run a layout in slices instead of in one call (task 9.5).
     *
     * Optional: without it `run` is used and completes in one turn, which is right for a
     * document small enough that slicing costs more than it saves.
     */
    readonly runCooperatively?: (scope: LayoutScope) => CooperativeRun;
}
interface CooperativeRun {
    /**
     * Advance the work. Returns the finished layout, or null to be called again.
     *
     * Split so a global relayout does not hold the main thread for the whole document: the
     * scheduler yields between slices and a newer revision can cancel the run mid-flight
     * rather than the user waiting for work whose result is already stale.
     */
    step(): SemanticLayout | null;
    /** Abandon the run. Nothing partial is ever published. */
    cancel(): void;
}
/**
 * Coalesces commits into layout passes.
 *
 * A keystroke is one commit but must not be one full layout pass, so changes accumulate into a
 * scope and are laid out together. Every published layout is tagged with the revision it actually
 * read, which is what makes a stale result detectable rather than merely late.
 */
interface LayoutScheduler {
    /** Record a commit. Coalesces with anything already pending. */
    notify(change: TreeModelChange): void;
    /** Request a relayout for a reason the store did not report (page size, zoom, fonts). */
    invalidateAll(revision: number, reason?: string): void;
    /** Run any pending work now, synchronously. Returns whether a layout was published. */
    flush(): boolean;
    /** The scope that would be used if `flush` ran now, or null when nothing is pending. */
    pending(): LayoutScope | null;
    /** Drop pending work without publishing — for teardown. */
    cancel(): void;
    /** How many layouts were discarded for being stale. Diagnostics, and a test hook. */
    readonly staleDiscards: number;
    /** How many cooperative runs were abandoned because a newer revision arrived. */
    readonly cancelledRuns: number;
}
/**
 * Build the scheduler that turns a stream of commits into coalesced layout passes.
 *
 * Keystrokes arrive faster than a document can be laid out, so changes accumulate into one scope
 * and are laid out together rather than once per commit.
 */
declare function createLayoutScheduler(options: LayoutSchedulerOptions): LayoutScheduler;

/** Far above anything Word authors (its UI caps at 63) while keeping allocation bounded. */
declare const MAX_TABLE_COLUMNS = 1024;

/**
 * `w:tblW` / `w:tcW` / `w:wBefore` (CT_TblWidth, 17.4.63 / 17.4.71 / 17.4.86): a PREFERRED
 * width plus the unit it is stated in. Preferred is the operative word — it is what the
 * producer asked for, not what the table resolved to.
 *
 * `pct` is stated in fiftieths of a percent (5000 = 100%) by Word, and in the `"50%"`
 * string form of `ST_Percentage` by others; both are read. `auto` and `nil` carry no width.
 */
type PreferredWidthType = 'dxa' | 'pct' | 'auto' | 'nil';
/**
 * `w:tblW` / `w:tcW` — a requested width, whose UNIT depends on its type.
 *
 * Points for `dxa`, percent for `pct`, and zero for `auto`/`nil`. Reading `value` without `type`
 * is always wrong.
 */
interface PreferredWidth {
    readonly type: PreferredWidthType;
    /** POINTS for `dxa`, PERCENT (0–100) for `pct`, 0 for `auto`/`nil`. */
    readonly value: number;
}
/** The frozen "no preferred width" value — what a table or cell that declares none resolves to. */
declare const AUTO_PREFERRED_WIDTH: PreferredWidth;

/**
 * Layout-time nesting ceiling. Parse-time depth (MAX_DEPTH = 256 XML levels) alone still
 * admits ~80 levels of `w:tbl` recursion into the layout walk; deeper tables render as an
 * empty cell box rather than recursing.
 */
declare const MAX_TABLE_NESTING = 16;
/**
 * Fallback cell padding in points (60 twips) when neither `tblCellMar` nor `tcMar` authors
 * a side. Matches the historical uniform `CELL_PAD` inset.
 */
declare const CELL_PAD = 3;
/**
 * Soft ceiling on an authored `w:trHeight` (~22"). Hostile `w:val` otherwise becomes a
 * multi-page row that every pagination preflight and cell box inherits.
 */
declare const MAX_TABLE_ROW_HEIGHT_PT: number;
/**
 * `w:trPr/w:trHeight` (17.4.81) resolved for layout. Points leave the reader already —
 * twips convert once here, matching every other table geometry boundary.
 *
 * Word quirk (matches Form025U and Word's UI export): a present `@w:val` with an omitted
 * `@w:hRule` is treated as `atLeast`, not ECMA's `auto`. Explicit `auto` still ignores val.
 */
type TableRowHeightRule = 'auto' | 'atLeast' | 'exact';
/**
 * `w:trHeight` — a row's height rule and its value.
 *
 * `auto` carries no value at all, which is why this is a union rather than a rule plus an
 * optional number.
 */
type TableRowHeight = {
    readonly rule: 'auto';
} | {
    readonly rule: 'atLeast' | 'exact';
    readonly valuePt: number;
};
/** `w:vAlign` — where a cell's content sits when the row is taller than the content. */
type CellVerticalAlign = 'top' | 'center' | 'bottom';
/** `w:tblPr/w:jc` (17.4.29, ST_JcTable): where the table sits within the text column. */
type TableAlignment = 'left' | 'center' | 'right';
/**
 * `w:tblpPr/@w:horzAnchor` (17.4.58) and `@w:vertAnchor` (17.4.66): the box a floated
 * table's offsets are measured from. Absent means `text` for both.
 */
type TableFloatAnchor = 'text' | 'margin' | 'page';
/** `w:tblpPr/@w:tblpXSpec` (17.4.63, ST_XAlign). */
type TableFloatXSpec = 'left' | 'center' | 'right' | 'inside' | 'outside';
/** `w:tblpPr/@w:tblpYSpec` (17.4.65, ST_YAlign). */
type TableFloatYSpec = 'inline' | 'top' | 'center' | 'bottom' | 'inside' | 'outside';
/**
 * `w:tblPr/w:tblpPr` (17.4.57) — a table positioned against an anchor box rather than at
 * the point in the text where it was authored.
 *
 * A spec (`tblpXSpec`/`tblpYSpec`) supersedes the matching offset when both are present:
 * 17.4.57 states the alignment outright, and the offset only answers "how far from the
 * anchor" for the case where no alignment was stated.
 */
interface TableFloatPosition {
    readonly horzAnchor: TableFloatAnchor;
    readonly vertAnchor: TableFloatAnchor;
    readonly xSpec?: TableFloatXSpec;
    /** `w:tblpX` in points; signed, so a table can be pulled into the margin. */
    readonly xPt: number;
    readonly ySpec?: TableFloatYSpec;
    /** `w:tblpY` in points; signed. */
    readonly yPt: number;
}
/** Resolved cell padding in points, after the table default and any per-cell override. */
interface CellMarginsPt {
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
}
/** Word's own default cell padding, applied where a table declares no `w:tblCellMar`. */
declare const DEFAULT_CELL_MARGINS: CellMarginsPt;
/**
 * One cell in the resolved table structure.
 *
 * `gridSpan` is clamped at READ time and layout never re-derives it — the value comes from a file
 * and would otherwise be a loop bound an attacker controls.
 */
interface SemanticTableCell {
    readonly id: string;
    /** Clamped to [1, MAX_TABLE_COLUMNS] at read time; layout never re-derives it. */
    readonly gridSpan: number;
    /**
     * Absolute grid column this cell starts on, after `w:gridBefore` and every preceding
     * span. Structural conditional formats and cell geometry both key on this, never on the
     * cell's position in the row: one `gridSpan` cell otherwise shifts firstCol/lastCol and
     * the vertical bands for every cell after it.
     */
    readonly gridColumn: number;
    /** Canonical `w:gridCol` node id for this cell's start column, when the grid is authored. */
    readonly gridColumnId?: string;
    /** A vMerge cell that is not the restart continues the cell above: box, no content. */
    readonly vMergeContinue: boolean;
    /** `w:vAlign` — defaults to top when omitted/unrecognised. */
    readonly vAlign: CellVerticalAlign;
    /** Resolved per-side margins (tcMar over tblCellMar over CELL_PAD). */
    readonly margins: CellMarginsPt;
    /** Three-state authored `tcBorders` (omitted / none / edge). */
    readonly borders: CellBorderBox;
    /** Validated 6-hex shading fill, absent for none/auto. */
    readonly shading?: string;
    /**
     * `w:tcW` — the width this cell asked for, as authored.
     *
     * Published for consumers that need the cell's own statement (a column-resize handle has
     * to write back to it). Column geometry is NOT derived from this field: the resolver works
     * from a flat claim list built in the same pass, because resolving a column means looking
     * at every cell that covers it across every row, not at one cell at a time. Read
     * `columnWidthsPt` for what the table actually laid out.
     */
    readonly preferredWidth: PreferredWidth;
    /**
     * What the table style says about this cell's paragraphs and runs (17.7.6.6) — a header
     * row's bold and centring live here, not in the cell's own properties.
     */
    readonly styleFormatting: TableCellStyleFormatting;
    /** Block children in reading order, with content-control wrappers flattened. */
    readonly blocks: readonly OoxmlElement[];
}
/** One row in the resolved structure: its cells, its height rule, and any row-level revision. */
interface SemanticTableRow {
    readonly id: string;
    /** Pending Word row insertion/deletion authored in `w:trPr`. */
    readonly revisionKind?: 'insert' | 'delete';
    /**
     * The `w:trPr/w:ins|w:del` attribution, carried with the kind so a painted row can say
     * WHOSE pending decision it is — the review model addresses the decision by exactly this
     * `(id, author, date)` triple, and a surface with only the kind could highlight the row
     * but never open its card.
     */
    readonly revisionId?: string;
    readonly revisionAuthor?: string;
    readonly revisionDate?: string;
    /** `w:trPr/w:tblHeader` — the row repeats atop each page the table continues onto. */
    readonly isHeader: boolean;
    /**
     * `w:trPr/w:cantSplit` — the row must stay on one page. When it cannot fit a fresh page,
     * layout fails closed rather than fragmenting or overflowing the content box.
     */
    readonly cantSplit: boolean;
    /** `w:trPr/w:trHeight` — auto / atLeast floor / exact (clipped) row height. */
    readonly height: TableRowHeight;
    readonly cells: readonly SemanticTableCell[];
}
/**
 * A table resolved into a rectangular grid: column widths, rows, and the widths it asked for.
 *
 * The grid is normalized here so layout never has to reconcile `w:gridCol` against actual cell
 * spans — vertical merges and column spans are already accounted for.
 */
interface SemanticTableStructure {
    readonly columnWidthsPt: readonly number[];
    readonly rows: readonly SemanticTableRow[];
    /** `w:tblPr/w:tblW` — the width the table asked for. */
    readonly tableWidth: PreferredWidth;
    /**
     * `w:tblInd` (17.4.50) in points — "this indentation should shift the table into the text
     * margin by the specified amount". Applies to a left-aligned table; `w:jc` decides the
     * placement outright for the other two.
     */
    readonly indentPt: number;
    /** `w:tblPr/w:jc` (17.4.29) — where the table sits in the text column. */
    readonly alignment: TableAlignment;
    /**
     * `w:tblPr/w:tblpPr` (17.4.57) — present when the table is positioned against an anchor
     * box. Placement then comes from {@link tableFloatOriginX} rather than `w:jc`/`w:tblInd`.
     */
    readonly float?: TableFloatPosition;
    /**
     * `w:tblCellSpacing` (17.4.45) in points: the gap between adjacent cell edges. Applied as
     * a half-gap inset on each side of every cell, so cells separate visually without the grid
     * itself moving. Word ALSO grows the table's overall width by the spacing it adds around
     * the outside; that part is not modelled, so a spaced table is laid out on the same grid
     * its file states rather than a wider one.
     */
    readonly cellSpacingPt: number;
    /**
     * `w:tblPr/w:tblLayout/@w:type="fixed"` (17.4.52 — 17.4.53 is the `w:tblPrEx` exception
     * variant, not this element). Fixed layout takes the grid as final;
     * anything else is autofit, which in Word never renders wider than the text column.
     */
    readonly layoutFixed: boolean;
    /** Table-level `tblBorders` (three-state, including insideH/insideV). */
    readonly tableBorders: TableBorderBox;
    /** Table-level `tblCellMar` defaults (per-side, CELL_PAD when a side is omitted). */
    readonly defaultMargins: CellMarginsPt;
}
/**
 * Where a table's left edge sits inside the box that contains it.
 *
 * 17.4.50 puts a left-aligned table at `w:tblInd` from the leading margin. 17.4.29's other
 * two placements are stated relative to the containing box instead, so the indent does not
 * also apply to them — Word centres a centred table in the text column whatever indent the
 * file carries. A table wider than its container starts flush so its leading edge stays on
 * the page rather than being centred off it.
 */
declare function tableOriginX(structure: SemanticTableStructure, containerWidthPt: number): number;
/**
 * Read one typed table node into a bounded structure, or null when the node is not a
 * typed table or sits beyond the nesting ceiling.
 */
declare function readTableStructure(table: OoxmlNode, contentWidthPt: number, depth: number, styleCascade?: StyleCascadeTable, 
/** Which revisions the view resolves away; only the proposed result performs the join. */
displayMode?: RevisionDisplayMode): SemanticTableStructure | null;

/**
 * `w:pPr/w:rPr/w:del` — the paragraph mark was deleted by a tracked revision.
 *
 * Read from the paragraph-mark run properties only. A `w:del` anywhere else in the paragraph
 * deletes run content, which is a different statement entirely.
 */
declare function paragraphMarkDeleted(paragraph: OoxmlNode): boolean;
/**
 * True when a tracked revision has removed this paragraph from the rendered document, so
 * layout should emit no box for it at all.
 */
declare function revisionRemovesParagraph(paragraph: OoxmlNode, displayMode?: 'all-markup' | 'proposed' | 'original'): boolean;

/** Soft ceiling on fragments emitted for one authored row (hostile / runaway splits). */
declare const MAX_TABLE_ROW_FRAGMENTS = 4096;
/**
 * Why a table could not be paginated as authored.
 *
 * Each is a bound: a row taller than a page, a row that cannot be split, or a row producing more
 * fragments than the limit allows.
 */
type TablePaginationErrorCode = 'table-row-overheight' | 'table-row-split-unsupported' | 'table-row-fragment-limit';
/**
 * Bounded table pagination failure. Prefer this over emitting a fragment that overflows
 * the page content box.
 */
declare class TablePaginationError extends Error {
    readonly code: TablePaginationErrorCode;
    constructor(code: TablePaginationErrorCode, message: string);
}

export { AUTO_PREFERRED_WIDTH, type AbstractNumDefinition, type BidiEmbeddingLevels, BlockFragmentRecord, CELL_PAD, COMPOUND_BORDER_MIN_GAP_PT, COMPOUND_BORDER_MIN_STROKE_PT, type CanvasMeasurerOptions, type CanvasTextContext, type CanvasTextMetrics, type CascadedParagraphFormatting, CellBorderBox, type CellMarginsPt, type CellVerticalAlign, type CompoundBorderMetrics, type ContentControlFragmentRecord, DEFAULT_CANVAS_FONT_STACK, DEFAULT_CELL_MARGINS, EMPTY_NUMBERING_INDEX, FixedPoint, FixedPointRoundingMode, FontByteValidator, type FontSlot, GRAPHEME_SEGMENTER_LOCALE, type GraphemeBoundary, type GraphemeSegment, type GraphemeWordSegmentRecord, HARFBUZZ_SHAPING_LIBRARY, type HarfBuzzFaceCacheEvent, type HarfBuzzOutlineCacheEvent, type HarfBuzzShapeCacheEvent, HarfBuzzShapingError, type HarfBuzzShapingErrorCode, type HarfBuzzTextShaper, type HarfBuzzTextShaperInstrumentation, type HarfBuzzTextShaperOptions, type HeaderFooterVariantName, type HyperlinkProjector, LayoutBox, type LayoutCacheStats, type LayoutScheduler, type LayoutSchedulerOptions, type LayoutScope, type LayoutSession, type LayoutSessionStats, type LevelOverride, type ListCounterAdvance, type ListCounterState, type ListMarkerAlign, type ListSuffix, MAX_EACH_PAGE_MARK_CANDIDATES, MAX_LVL_OVERRIDES, MAX_LVL_TEXT_LENGTH, MAX_MARKER_TEXT_LENGTH, MAX_NOTES_LAID_OUT, MAX_NOTE_FRAGMENTS, MAX_NOTE_OVERFLOW_PAGES, MAX_NOTE_REFLOW_ATTEMPTS, MAX_NUMBERING_DEFINITIONS, MAX_STYLE_BASED_ON_DEPTH, MAX_STYLE_DEFINITIONS, MAX_TABLE_COLUMNS, MAX_TABLE_NESTING, MAX_TABLE_ROW_FRAGMENTS, MAX_TABLE_ROW_HEIGHT_PT, type MaterializationInput, type NoteDisplayMark, type NoteLayoutFallbackReason, type NoteMarkContext, type NotePaginationFallbackReason, type NoteReferenceSite, type NoteSeparatorLayout, type NoteSeparatorRuleStyle, type NoteStoryDrawings, type NoteStoryLayout, type NotesAttachResult, type NotesLayoutInput, type NumDefinition, type NumberingIndex, type NumberingLevel, type NumberingLevelIndent, type PageFurniture, PageGeometry, PageRecord, type PageRefIndex, ParagraphBorderEdge, ParagraphBorders, ParagraphFragmentRecord, type ParagraphKeyInputs, type ParagraphLayoutCache, type ParagraphLayoutCacheOptions, type ParagraphLayoutInputs, ParagraphLineSpacing, ParagraphSpacing, type PreferredWidth, type PreferredWidthType, type ResolvedListItem, ResolvedRunStyle, type ResolvedSurfaceMeasurer, ResolvedTabStops, RevisionDisplayMode, type ScriptItem, SectionColumns, SemanticLayout, type SemanticLayoutOptions, type SemanticTableCell, type SemanticTableRow, type SemanticTableStructure, ShapedRun, SpanLinkRecord, type StyleCascadeTable, type StyleDefinition, StyleSpanRecord, type TableAlignment, TableBorderBox, TableBorderSide, type TableCellStyleFormatting, TablePaginationError, type TablePaginationErrorCode, type TableRowHeight, type TableRowHeightRule, TextDirection, TextMeasurer, TextShaper, UnsupportedScriptError, VersionedShapingLibrary, type ViewportWindow, WORD_SEGMENTER_LOCALE, type WordBoundary, type WordBoundaryResolverDeps, type WordSegment, attachNotesToLayout, boundedFallbackWordSegments, buildNumberingIndex, buildPageRefIndex, buildStyleCascadeTable, cascadeParagraphFormatting, cascadeRunProperties, cascadedBottomBorder, clampListValue, computeDoubleBorderMetricsPt, computeFootnoteReserves, contentControlBoundaries, createBoundedFallbackWordBoundary, createDefaultWordBoundary, createFixedMeasurer, createHarfBuzzTextShaper, createIntlWordBoundary, createLayoutScheduler, createLayoutSession, createListCounterState, createParagraphLayoutCache, defaultNoteSeparatorRuleStyle, deriveNoteDisplayMarks, deriveNoteDisplayMarksResolved, effectiveBorderSide, emptyTocPlaceholderParagraphIds, emptyTocSuppressedResultParagraphIds, expandLvlText, filterRefsOnPage, findSeparatorNote, formatDecimal, formatDecimalZero, formatLowerLetter, formatLowerRoman, formatNumFmt, formatPageNumber, formatUpperLetter, formatUpperRoman, fragmentOwnsAtomOffset, graphemeBoundaryEpoch, graphemeCount, graphemeOffsetToUtf16, harfBuzzFontValidator, initializeHarfBuzz, intlGraphemeBoundary, isCanvasMeasurementAvailable, isCumulativeGeometryTrustedFromLineOrigin, isGeometryTrustedCaretOffset, isHarfBuzzInitialized, isIntlSegmenterAvailable, isIntlWordSegmenterAvailable, isMarkerOnlySeparatorNote, isValidStyleId, isWholeGraphemeHorizontalBoundary, itemizeScriptFontSlots, layoutHeaderFooterStory, layoutNoteById, layoutNoteSeparator, layoutNoteStory, layoutSemanticDocument, listMarkerBox, mergeListIndent, normalNotesOf, noteDisplayMarkMap, noteLineIdPrefix, noteMarkKey, noteSeparatorAreaBox, noteStoryBlocks, pagesToMaterialize, paragraphLayoutKey, paragraphMarkDeleted, paragraphShading, paragraphShadingBox, projectedNoteMarkText, provisionalNoteMarks, readNumPr, readTableStructure, resetGraphemeBoundary, resolveDefaultSurfaceMeasurer, resolveDefaultWordBoundary, resolveNumberingLevel, resolveOoxmlShadingFill, resolveParagraphLayoutInputs, resolveStoryListItems, resolveStrictHexFill, revisionRemovesParagraph, roundFontUnitToFixedPoint, segmentGraphemes, segmentWords, semanticHorizontalBoundaries, setGraphemeBoundary, shadingFillFromElement, shapedHorizontalBoundaries, storyBlocks, syntheticSeparatorBox, tableOriginX, tocFieldChromeParagraphIds, tryCreateCanvasMeasurer, utf16OffsetToGrapheme, walkStoryParagraphs, withNumberingStyleLinks, withResolvedListItems, wordSegmentsToGraphemeRecords };
