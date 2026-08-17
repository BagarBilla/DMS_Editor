/**
 * `@docx-editor.dev/core/layout` — DOM-free pagination, shaping, and hit testing.
 *
 * Text is measured through an injected `TextMeasurer` and shaped through an injected
 * `TextShaper`, so the same code paginates in a browser and on a server. Points everywhere;
 * twips convert at property-read boundaries.
 *
 * Incremental by construction: per-block cache keys and flow checkpoints mean a pass that
 * changes nothing returns the previous pages by identity.
 *
 * @packageDocumentation
 * @public
 */
// Lane: layout. Responsibilities and dependency rules:
// docs/architecture/production-engine-packages.md.
//
// Resolved caches, dependency closure, shaping, convergent pagination, and the anchored
// DisplayItem[] IR. DOM-free — emits positioned geometry, never paints.

export {
  FontResolutionError,
  HARD_MAX_AGGREGATE_FONT_BYTES,
  HARD_MAX_FONT_BYTES,
  HARD_MAX_FONT_SOURCES,
  createFontResourceSnapshot,
  fontRequestKey,
  sha256FontBytes,
  boundedStructuralFontValidator,
  type FontRequest,
  type FontSubstitution,
  type ResolvedFont,
  type FontResolutionErrorCode,
  type FontResourceDefinition,
  type DeclaredFontSubstitution,
  type FontValidationResult,
  type FontByteValidator,
  type FontResourceSnapshot,
  type FontResourceSnapshotOptions,
  type FontResourceInstrumentation,
} from './font-resource.js';
export {
  fixedPoint,
  createShapingEnvironment,
  createShapedRun,
  shapedRunComparatorInputs,
  shapingEnvironmentFingerprintInputs,
  shapingEnvironmentFingerprint,
  type FixedPoint,
  type TextDirection,
  type FixedPointRoundingMode,
  type NormalizationPolicy,
  type VersionedShapingLibrary,
  type ShapingEnvironmentInput,
  type ShapingEnvironment,
  type ShapeInput,
  type ShapedGlyph,
  type GlyphOutline,
  type ShapedCluster,
  type ShapedVerticalMetrics,
  type ShapedFontSpan,
  type ShapedRun,
  type ShapedRunComparatorInputs,
  type TextShaper,
  type ShapingEnvironmentFingerprintInputs,
  type FontFingerprintInputs,
} from './shaped-run.js';
export {
  HARFBUZZ_SHAPING_LIBRARY,
  HarfBuzzShapingError,
  initializeHarfBuzz,
  isHarfBuzzInitialized,
  createHarfBuzzTextShaper,
  harfBuzzFontValidator,
  roundFontUnitToFixedPoint,
  type HarfBuzzShapingErrorCode,
  type HarfBuzzFaceCacheEvent,
  type HarfBuzzOutlineCacheEvent,
  type HarfBuzzShapeCacheEvent,
  type HarfBuzzTextShaper,
  type HarfBuzzTextShaperInstrumentation,
  type HarfBuzzTextShaperOptions,
} from './harfbuzz-shaper.js';
export {
  UnsupportedScriptError,
  itemizeScriptFontSlots,
  type FontSlot,
  type ScriptItem,
} from './script-itemization.js';
export type { BidiEmbeddingLevels } from './bidi.js';
export {
  shapedHorizontalBoundaries,
  isWholeGraphemeHorizontalBoundary,
  isGeometryTrustedCaretOffset,
  isCumulativeGeometryTrustedFromLineOrigin,
  semanticHorizontalBoundaries,
} from './horizontal-boundary.js';
export {
  type GraphemeBoundary,
  type GraphemeSegment,
  intlGraphemeBoundary,
  graphemeBoundaryEpoch,
  segmentGraphemes,
  graphemeCount,
  utf16OffsetToGrapheme,
  graphemeOffsetToUtf16,
  setGraphemeBoundary,
  resetGraphemeBoundary,
  isIntlSegmenterAvailable,
  GRAPHEME_SEGMENTER_LOCALE,
} from './grapheme.js';
export {
  type WordBoundary,
  type WordSegment,
  type GraphemeWordSegmentRecord,
  type WordBoundaryResolverDeps,
  createIntlWordBoundary,
  createBoundedFallbackWordBoundary,
  createDefaultWordBoundary,
  resolveDefaultWordBoundary,
  segmentWords,
  wordSegmentsToGraphemeRecords,
  boundedFallbackWordSegments,
  isIntlWordSegmenterAvailable,
  WORD_SEGMENTER_LOCALE,
} from './word-segment.js';
export {
  type OperationSnapshot,
  type OperationSnapshotField,
  type OperationSnapshotGuard,
  type ResourceDependencyProvenance,
  type CacheProvenance,
  type CacheMiss,
  type CacheLookup,
  ResolvedCache,
  captureOperationSnapshot,
  guardOperationSnapshot,
} from './resolved-cache.js';
export {
  DEFAULT_PAGE_GEOMETRY,
  contentControlsOfLayout,
  effectiveContentControlLock,
  fragmentsOfParagraph,
  lineAtPosition,
  linesOf,
  paragraphFragmentsOf,
  paragraphFragmentsOfBlocks,
  unionLayoutBoxes,
  type BlockFragmentRecord,
  type ContentControlBoundaryRecord,
  type ContentControlGeometryFragment,
  type ContentControlLevel,
  type ContentControlLock,
  type ContentControlMappedType,
  type HeaderFooterStoryRecord,
  type LayoutBox,
  type LineRecord,
  type PageGeometry,
  type PageRecord,
  type ListMarkerRecord,
  type ParagraphBottomBorderRecord,
  type ParagraphBorderEdge,
  type ParagraphBorderSide,
  type ParagraphBorderStrokeRecord,
  type ParagraphFragmentRecord,
  type ParagraphIndent,
  type ParagraphSpacing,
  type SemanticLayout,
  type SourceRange,
  type SpanLinkRecord,
  type StyleSpanRecord,
  type TableCellFragmentRecord,
  type TableFragmentRecord,
  type TableRowFragmentRecord,
  type TextMeasurer,
} from './semantic-records.js';
// Named on `StyleSpanRecord`, so a consumer reading spans needs to be able to name it too.
export type { FieldAtomMarker } from './field-pieces.js';
export {
  AUTO_PARAGRAPH_SPACING_PT,
  MAX_BORDER_SPACE_PT,
  MAX_BORDER_WIDTH_PT,
  MAX_PARAGRAPH_SPACING_PT,
  PARAGRAPH_BORDER_SIDES,
  SINGLE_LINE_SPACING,
  appliedSpaceBefore,
  applyLineSpacing,
  paragraphBorderExtentPt,
  paragraphBorderStrokeWidthPt,
  bottomBorderExtentPt,
  cascadedParagraphBorders,
  collapsedSpaceBefore,
  paragraphBorders,
  paragraphBordersFingerprint,
  paragraphBreaksBefore,
  paragraphContextualSpacing,
  paragraphLineSpacing,
  paragraphSpacing,
  type LineSpacingRule,
  type ParagraphAutoSpacingContext,
  type ParagraphBorders,
  type ParagraphLineSpacing,
} from './paragraph-style.js';
export {
  paragraphShading,
  paragraphShadingBox,
  resolveOoxmlShadingFill,
  resolveStrictHexFill,
  shadingFillFromElement,
} from './ooxml-shading.js';
export {
  DEFAULT_TAB_INTERVAL_PT,
  DEFAULT_TAB_INTERVAL_TWIPS,
  EMPTY_TAB_STOPS,
  MAX_TAB_POSITION_TWIPS,
  MAX_TAB_STOPS,
  cascadedTabStops,
  defaultTabIntervalFromSettings,
  nextTabDestination,
  paragraphTabStops,
  tabAdvanceWidth,
  tabStopsFingerprint,
  withDefaultTabInterval,
  TAB_LEADER_GLYPH,
  type ResolvedTabStops,
  type TabAlignment,
  type TabDestination,
  type TabLeader,
  type TabStop,
} from './paragraph-tabs.js';
export {
  createLayoutSession,
  layoutSemanticDocument,
  type HeaderFooterVariantName,
  type LayoutSession,
  type LayoutSessionStats,
  type PageFurniture,
  type SemanticLayoutOptions,
} from './semantic-layout.js';
export { formatPageNumber, type HyperlinkProjector } from './field-projection.js';
export {
  EMPTY_NUMBERING_INDEX,
  MAX_LVL_OVERRIDES,
  MAX_NUMBERING_DEFINITIONS,
  buildNumberingIndex,
  resolveNumberingLevel,
  type AbstractNumDefinition,
  type LevelOverride,
  type ListMarkerAlign,
  type ListSuffix,
  type NumDefinition,
  type NumberingIndex,
  type NumberingLevel,
  type NumberingLevelIndent,
} from './numbering-index.js';
export {
  MAX_LVL_TEXT_LENGTH,
  MAX_MARKER_TEXT_LENGTH,
  clampListValue,
  expandLvlText,
  formatDecimal,
  formatDecimalZero,
  formatLowerLetter,
  formatLowerRoman,
  formatNumFmt,
  formatUpperLetter,
  formatUpperRoman,
} from './numbering-format.js';
export {
  createListCounterState,
  type ListCounterAdvance,
  type ListCounterState,
} from './list-counters.js';
export {
  listMarkerBox,
  mergeListIndent,
  readNumPr,
  resolveStoryListItems,
  walkStoryParagraphs,
  withNumberingStyleLinks,
  withResolvedListItems,
  type ResolvedListItem,
} from './list-resolve.js';
export { createFixedMeasurer } from './fixed-measurer.js';
export {
  DEFAULT_CANVAS_FONT_STACK,
  isCanvasMeasurementAvailable,
  resolveDefaultSurfaceMeasurer,
  tryCreateCanvasMeasurer,
  type CanvasMeasurerOptions,
  type CanvasTextContext,
  type CanvasTextMetrics,
  type ResolvedSurfaceMeasurer,
} from './canvas-measurer.js';
export { layoutHeaderFooterStory } from './hf-layout.js';
export {
  deriveNoteDisplayMarks,
  deriveNoteDisplayMarksResolved,
  noteDisplayMarkMap,
  type NoteDisplayMark,
  type NoteReferenceSite,
} from './note-numbering.js';
export {
  layoutNoteStory,
  layoutNoteById,
  layoutNoteSeparator,
  noteLineIdPrefix,
  normalNotesOf,
  findSeparatorNote,
  isMarkerOnlySeparatorNote,
  defaultNoteSeparatorRuleStyle,
  noteSeparatorAreaBox,
  syntheticSeparatorBox,
  MAX_NOTES_LAID_OUT,
  MAX_NOTE_FRAGMENTS,
  type NoteStoryLayout,
  type NoteStoryDrawings,
  type NoteSeparatorLayout,
  type NoteSeparatorRuleStyle,
  type NoteLayoutFallbackReason,
} from './note-layout.js';
export {
  attachNotesToLayout,
  buildPageRefIndex,
  computeFootnoteReserves,
  filterRefsOnPage,
  fragmentOwnsAtomOffset,
  provisionalNoteMarks,
  MAX_NOTE_OVERFLOW_PAGES,
  MAX_NOTE_REFLOW_ATTEMPTS,
  MAX_EACH_PAGE_MARK_CANDIDATES,
  type NotesLayoutInput,
  type NotesAttachResult,
  type NotePaginationFallbackReason,
  type PageRefIndex,
} from './note-pagination.js';
export { noteMarkKey, projectedNoteMarkText, type NoteMarkContext } from './note-projection.js';
export { storyBlocks, noteStoryBlocks, MAX_SDT_NESTING } from './story-roots.js';
export {
  emptyTocPlaceholderParagraphIds,
  emptyTocSuppressedResultParagraphIds,
  tocFieldChromeParagraphIds,
} from './toc-layout.js';
export {
  collectFlowBlocks,
  contentControlContentChildren,
  isContentControl,
  isContentControlContent,
} from '../store/package/content-control-walk.js';
// The boundary RECORD this barrel publishes is the one layout itself paints and hit-tests
// (`semantic-records.ts`). This module derives the same question for a part that is not the
// laid-out story, and its own record type stays module-local so `ContentControlBoundaryRecord`
// names one shape everywhere — `paginated-surface-contract.ts` imports it from here.
export {
  contentControlBoundaries,
  type ContentControlFragmentRecord,
} from './content-control-boundaries.js';
export {
  W15_NAMESPACE_URI,
  type CommentAnchor,
  type CommentPosition,
  type CommentRecord,
  type CommentThreadState,
} from './review-support.js';
// The review queue DERIVATION (`collectReviewItems` and its readers) is the pro
// review module's implementation and is deliberately NOT in this package — the
// engine receives it through the `EditorModule` seam. What remains public here
// is the vocabulary and its pure helpers.
export {
  activeReviewItem,
  reviewThreadRootOf,
  commentBodyText,
  commentInitials,
  firstReviewRange,
  paragraphOrderOfPart,
  reviewAnchorIndex,
  reviewItemGeometry,
  reviewItemKey,
  reviewItemPositionRank,
  reviewItemRanges,
  reviewItemsAt,
  type ReviewCommentItem,
  type ReviewCustomItem,
  type ReviewItem,
  type ReviewModelInput,
  type ReviewParagraphAnchor,
  type ReviewPosition,
  type ReviewRange,
  type ReviewRevisionItem,
  type ReviewRevisionKind,
} from './review-support.js';
export {
  DEFAULT_REVISION_DISPLAY_MODE,
  formatRevisionOf,
  paragraphMarkRevisionOf,
  revisionsAreDeletion,
  revisionsVisible,
  type RevisionAttribution,
  type RevisionDisplayMode,
  type RevisionKind,
} from './revision-projection.js';
export {
  createShapedMeasurer,
  type LayoutShapingOptions,
  type ShapedMeasurerOptions,
} from './shaped-measurer.js';
export {
  DEFAULT_SECTION_PROPERTIES,
  enumerateDocumentSections,
  enumerateDocumentSectionsBounded,
  geometryOfSection,
  MAX_DOCUMENT_SECTIONS,
  paragraphSectionNode,
  parsePageNumbering,
  parseSectionProperties,
  readSectionProperties,
  type DocumentSection,
  type DocumentSectionsEnumeration,
  type SectionBreakType,
  type SectionColumnDefinition,
  type SectionColumns,
  type SectionMargins,
  type SectionPageNumbering,
  type SectionProperties,
} from './section-properties.js';
export { pagesToMaterialize, type MaterializationInput, type ViewportWindow } from './viewport.js';
export {
  createParagraphLayoutCache,
  paragraphLayoutKey,
  type LayoutCacheStats,
  type ParagraphKeyInputs,
  type ParagraphLayoutCache,
  type ParagraphLayoutCacheOptions,
} from './layout-cache.js';
export {
  createLayoutScheduler,
  type LayoutScheduler,
  type LayoutSchedulerOptions,
  type LayoutScope,
} from './layout-scheduler.js';
export {
  DEFAULT_RUN_STYLE,
  baselineShiftPtOf,
  displayText,
  measureDisplayText,
  resolveRunStyle,
  runStylesEqual,
  type ResolvedRunStyle,
  type ResolvedUnderline,
  type VerticalAlign,
} from './run-style.js';
export {
  MAX_STYLE_BASED_ON_DEPTH,
  MAX_STYLE_DEFINITIONS,
  buildStyleCascadeTable,
  cascadeParagraphFormatting,
  cascadeRunProperties,
  cascadedBottomBorder,
  isValidStyleId,
  resolveParagraphLayoutInputs,
  type CascadedParagraphFormatting,
  type ParagraphLayoutInputs,
  type StyleCascadeTable,
  type StyleDefinition,
  // Referenced by `SemanticTableCell`: what a table style says about a cell's paragraphs.
  type TableCellStyleFormatting,
} from './style-cascade.js';
export {
  cellSelectionBetween,
  cellSelectionRects,
  cellSelectionText,
  paragraphsInCells,
  spansInCells,
  tableContextAt,
  type CellSelection,
  type PlacedCell,
  type TableCellContext,
} from './semantic-cell-selection.js';
export {
  DEFAULT_VERTICAL_WEIGHT,
  contentControlAtPoint,
  findDrawingOverlayFrameInLayout,
  hitTestPage,
  hitTestSheet,
  isFurniturePoint,
  lineEndOffset,
  caretBoxOnLine,
  pageAtY,
  spanOffsetX,
  type DrawingOverlayFrame,
  type HitPoint,
  type HitTestOptions,
  type SemanticHit,
  type SemanticHitDrawing,
  type TableCellAddress,
} from './semantic-hit-test.js';
export {
  caretAt,
  caretStops,
  caretStopsForBlocks,
  compositionAnchor,
  contentControlAtSemantic,
  contentControlsInLayout,
  documentOrder,
  // `hitTest` is already taken by the legacy painted-geometry lane; this one answers in
  // MODEL coordinates, so it is named for what it returns rather than shadowing that.
  hitTestSemantic,
  moveCaret,
  paragraphTextFromLayout,
  keyedRangeRects,
  selectionRects,
  spansInSelection,
  wordBoundary,
  type CaretAtOptions,
  type CaretGeometry,
  type MoveCaretOptions,
  type NavigationCommand,
  type KeyedRange,
  type SelectionRect,
  type SemanticPosition,
  type SemanticSelection,
} from './semantic-interaction.js';
export {
  AUTO_PREFERRED_WIDTH,
  CELL_PAD,
  DEFAULT_CELL_MARGINS,
  MAX_TABLE_COLUMNS,
  MAX_TABLE_NESTING,
  MAX_TABLE_ROW_HEIGHT_PT,
  readTableStructure,
  tableOriginX,
  type CellMarginsPt,
  type CellVerticalAlign,
  type PreferredWidth,
  type PreferredWidthType,
  type SemanticTableCell,
  type SemanticTableRow,
  type SemanticTableStructure,
  type TableAlignment,
  type TableRowHeight,
  type TableRowHeightRule,
} from './semantic-table.js';
export { paragraphMarkDeleted, revisionRemovesParagraph } from './revision-visibility.js';
export {
  MAX_TABLE_ROW_FRAGMENTS,
  TablePaginationError,
  type TablePaginationErrorCode,
} from './semantic-table-layout.js';
export {
  borderExtentPt,
  borderWeight,
  COMPOUND_BORDER_MIN_GAP_PT,
  COMPOUND_BORDER_MIN_STROKE_PT,
  computeDoubleBorderMetricsPt,
  effectiveBorderSide,
  MAX_TABLE_BORDER_STROKES,
  readBorderSide,
  readCellBorders,
  readTableBorders,
  resolveBorderConflict,
  resolveTableCellBorderGrid,
  type BorderGridGeometry,
  type CellBorderBox,
  type CompoundBorderMetrics,
  type ResolvedCellBorders,
  type ResolvedTableBorderEdge,
  type ResolvedTableBorderEdgeSegment,
  type TableBorderBox,
  type TableBorderSide,
  type TableBorderSideName,
  type TableBorderStrokeRecord,
  type TableBorderStyle,
} from './table-borders.js';
