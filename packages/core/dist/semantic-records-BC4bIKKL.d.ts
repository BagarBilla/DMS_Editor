import { O as OoxmlProperty, j as DrawingAccessibility, S as SourceCrop, k as DrawingTransform, V as VectorShapeProjection, f as DrawingHorizontalReferenceFrame, g as DrawingVerticalReferenceFrame, b as ImageWrapTarget, D as DrawingProjection, l as TableBorderStyle } from './tree-op-types-DWLCllG7.js';
import { O as OoxmlNode, o as OoxmlDrawingNode, a as OoxmlElement } from './ooxml-tree-BU0e3DVi.js';
import { a as RevisionAttribution } from './revision-projection-DHAkcD_L.js';
import { I as ImageResourceState } from './image-resources-C_YnqPhn.js';

/** Whether a paragraph must start a new page (`w:pageBreakBefore`). */
declare function paragraphBreaksBefore(props: readonly OoxmlProperty[]): boolean;
/**
 * Soft ceiling matching the spike's resolved-style limit (31_680 twips ≈ 22"). Beyond
 * that an attacker-authored spacing would push pagination into pathological page counts.
 */
declare const MAX_PARAGRAPH_SPACING_PT: number;
/** Soft ceiling on border width (96 eighths = 12pt). Word's UI tops out well below this. */
declare const MAX_BORDER_WIDTH_PT = 12;
/** Soft ceiling on border-to-text gap (`w:space`, already in points). */
declare const MAX_BORDER_SPACE_PT = 3168;
/**
 * A paragraph's resolved space before and after, in points.
 *
 * Already collapsed against `w:contextualSpacing`, so adjacent same-style paragraphs that suppress
 * their gap arrive here with it removed rather than leaving that to whoever stacks them.
 */
interface ParagraphSpacing {
    /** `w:spacing/@before`, in points. */
    readonly before: number;
    /** `w:spacing/@after`, in points. */
    readonly after: number;
}
/**
 * The gap Word substitutes when `w:beforeAutospacing` / `w:afterAutospacing` is on
 * (ECMA-376 §17.3.1.2, §17.3.1.13).
 *
 * The attribute means "the consumer decides", and the authored `@before` / `@after` beside it
 * is IGNORED rather than used as the value. Word's answer is HTML's default `<p>` margin,
 * 14pt, which is what a document round-tripped through Word's HTML filter carries — and this
 * one is everywhere, because Word writes `w:before="100" w:beforeAutospacing="1"` for it. Reading
 * only the literal 100 twips lays every such paragraph out 9pt tight, which moves page breaks.
 */
declare const AUTO_PARAGRAPH_SPACING_PT = 14;
/**
 * Where a paragraph sits, for the two contexts in which Word's auto spacing resolves to 0
 * instead of {@link AUTO_PARAGRAPH_SPACING_PT}.
 *
 * Both come from the HTML model the attribute emulates: a `<li>` and a `<td>` collapse the
 * paragraph margin, a bare `<p>` does not. A caller that says nothing gets the body answer.
 */
interface ParagraphAutoSpacingContext {
    /** The paragraph participates in numbering (`w:numPr`), i.e. it is a list item. */
    readonly inList?: boolean;
    /** The paragraph lives in a table cell. */
    readonly inTableCell?: boolean;
}
/**
 * Resolved line spacing (`w:spacing/@line` + `@lineRule`, ECMA-376 17.3.1.33).
 *
 * `auto` is the interesting one: `@line` is 240ths of a line, so 240 is single, 360 is
 * one-and-a-half, 480 is double — and Word's own Normal style since 2013 is 259, i.e.
 * 1.08. A document laid out at a flat single spacing is ~8% tight on EVERY line, which
 * moves every page break, so this is not a cosmetic detail.
 *
 * `exact` fixes the line box at `@line` twips and lets tall glyphs clip, the way Word
 * does. `atLeast` uses it as a floor.
 */
type LineSpacingRule = 'auto' | 'exact' | 'atLeast';
/**
 * Resolved line spacing: the rule, and the value it applies.
 *
 * `value` means different things per rule — 240ths of a line under `auto`, points under `exact`
 * and `atLeast` — which is why the two travel together and neither is useful alone.
 */
interface ParagraphLineSpacing {
    readonly rule: LineSpacingRule;
    /** `auto`: the 240ths-of-a-line multiplier numerator. Otherwise points. */
    readonly value: number;
}
/** Single spacing: what a paragraph that says nothing gets. */
declare const SINGLE_LINE_SPACING: ParagraphLineSpacing;
/**
 * One resolved `w:pBdr` edge: its style, colour, thickness and gap.
 *
 * `widthPt` and `spacePt` are already converted and CLAMPED — both come from a file, and an
 * unbounded border width becomes a layout dimension.
 */
interface ParagraphBorderEdge {
    /** Authored `ST_Border` value (`single`, `dashed`, …). */
    readonly val: string;
    /** RRGGBB, or null when auto/missing (paint defaults to black). */
    readonly color: string | null;
    /** Border thickness in points (`w:sz` is eighths of a point). */
    readonly widthPt: number;
    /** Gap from text to the rule, in points (`w:space`). */
    readonly spacePt: number;
    /**
     * `w:shadow` — Word offsets a drop shadow behind the rule.
     *
     * Present only when authored true, so an edge that says nothing keeps the shape earlier
     * fixtures assert. Resolved and carried; drawing it is deferred.
     */
    readonly shadow?: true;
}
/** The six `CT_PBdr` children, in schema order (ECMA-376 §17.3.1.24). */
declare const PARAGRAPH_BORDER_SIDES: readonly ["top", "left", "bottom", "right", "between", "bar"];
/**
 * Which of the six `CT_PBdr` edges.
 *
 * Four are physical box edges; `between` and `bar` are group-relative, drawn only where
 * consecutive paragraphs share a border definition.
 */
type ParagraphBorderSide = (typeof PARAGRAPH_BORDER_SIDES)[number];
/**
 * A paragraph's resolved `w:pBdr` (ECMA-376 §17.3.1.24).
 *
 * `top`/`left`/`bottom`/`right` are the four physical edges of the box. The other two are
 * group-relative: `between` draws at a boundary INSIDE a run of consecutive paragraphs whose
 * border settings are identical, and `bar` is the vertical change-bar rule beside the
 * paragraph, drawn whether or not the paragraph groups with its neighbours.
 */
interface ParagraphBorders {
    readonly top?: ParagraphBorderEdge;
    readonly left?: ParagraphBorderEdge;
    readonly bottom?: ParagraphBorderEdge;
    readonly right?: ParagraphBorderEdge;
    readonly between?: ParagraphBorderEdge;
    readonly bar?: ParagraphBorderEdge;
}
/**
 * Resolve `w:spacing` before/after from flat paragraph properties.
 *
 * Line spacing (`w:line` / `w:lineRule`) is a separate concern — it changes measured line
 * height, not the gap between paragraphs — and is not resolved here.
 *
 * `w:beforeAutospacing` / `w:afterAutospacing` REPLACE the authored measurement on their own
 * side rather than adding to it; see {@link AUTO_PARAGRAPH_SPACING_PT}.
 */
declare function paragraphSpacing(props: readonly OoxmlProperty[], context?: ParagraphAutoSpacingContext): ParagraphSpacing;
/**
 * Resolve `w:line` / `w:lineRule` from flat paragraph properties.
 *
 * Merged per attribute for the same reason as before/after: `w:spacing` is one element
 * carrying independent attributes, and a style that states only `@line` must not reset the
 * rule an earlier entry in the cascade set.
 */
declare function paragraphLineSpacing(props: readonly OoxmlProperty[]): ParagraphLineSpacing;
/**
 * Apply resolved line spacing to a line's natural (glyph-derived) box.
 *
 * Word places `auto` / `atLeast` extras BELOW the line (the last line's multiple spacing
 * still separates it from the next paragraph). Putting that delta above inverted cover-page
 * rhythm: `w:line="460"` on "between" opened a large gap above the word and almost none
 * before "MERIDIAN". `exact` taller than the glyphs centers the text (ECMA-376 17.3.1.33).
 * An `exact` box smaller than the glyphs keeps the baseline inside so clipped text still
 * sits on it.
 */
declare function applyLineSpacing(spacing: ParagraphLineSpacing, naturalHeight: number, naturalBaseline: number): {
    height: number;
    baseline: number;
};
/**
 * `w:contextualSpacing` (17.3.1.9): drop before/after between paragraphs of the SAME
 * style. Word's built-in `ListParagraph` sets it, so every list authored in Word gets a
 * paragraph gap between items without this.
 */
declare function paragraphContextualSpacing(props: readonly OoxmlProperty[]): boolean;
/**
 * Resolve `w:pBdr` from the paragraph-properties node.
 *
 * Nested — every edge is a child of `pBdr`, not an attribute — so this reads the typed tree
 * rather than the flattened `OoxmlProperty[]` bag `propertiesOf` builds for leaf props.
 */
declare function paragraphBorders(pPr: OoxmlNode | undefined): ParagraphBorders;
/**
 * `w:pBdr` after the style cascade: a later `w:pBdr` replaces an earlier one WHOLESALE.
 *
 * Word does not merge edges across the cascade. A style that states only `w:bottom` discards
 * the box its `basedOn` ancestor declared, so folding edge by edge would leave a lone
 * underline surrounded by a box no one authored. Absence inherits; `nil`/`none` clear.
 */
declare function cascadedParagraphBorders(paragraphPropertyNodes: readonly OoxmlNode[]): ParagraphBorders;
/**
 * Visual stroke thickness layout publishes for one edge (points).
 *
 * Compound `ST_Border` values (`double`, …) use the shared inflated band so a thin
 * `w:sz="3"` double still occupies a visible double-line box — matching table borders.
 */
declare function paragraphBorderStrokeWidthPt(edge: ParagraphBorderEdge): number;
/**
 * Extent one border edge occupies away from the text it decorates: gap plus rule, in points.
 *
 * Vertically that is flow height — a top rule pushes the first line down, a bottom rule holds
 * the page open below the last one — so pagination has to see it. Horizontally it is
 * publish-only: Word draws left/right paragraph rules OUTSIDE the text column and never
 * re-breaks the lines, which is why adding a box to a paragraph in Word does not reflow it.
 */
declare function paragraphBorderExtentPt(edge: ParagraphBorderEdge | undefined): number;
/** Vertical extent a bottom border adds below the last line (gap + rule). */
declare function bottomBorderExtentPt(edge: ParagraphBorderEdge | undefined): number;
/**
 * Identity of a paragraph's border set, for the `w:between` group rule.
 *
 * Word treats consecutive paragraphs whose border settings are IDENTICAL as ONE bordered
 * block: the top rule draws above the first, the bottom rule below the last, and each
 * interior boundary gets `w:between` or nothing (§17.3.1.24). That is why applying a box to
 * three selected paragraphs in Word draws one box and not three.
 *
 * Empty string means "no borders", which never groups with anything.
 */
declare function paragraphBordersFingerprint(borders: ParagraphBorders): string;
/**
 * Gap to insert before a paragraph once the previous paragraph's `after` is already in the
 * flow cursor — Word takes the larger of the two rather than summing them.
 */
declare function collapsedSpaceBefore(before: number, previousAfter: number): number;
/**
 * Applied before-spacing for placement (Word 2013+ / compat mode 15).
 *
 * Adjacent before/after still collapse to the larger gap, but before is dropped entirely when
 * the paragraph begins at the top of a page mid-section. The first paragraph of a document or
 * section retains before. Callers publish this applied value on the fragment so shading, borders,
 * selection, and paint share one geometry.
 */
declare function appliedSpaceBefore(before: number, previousAfter: number, atTopOfPage: boolean, firstParagraphOfSection: boolean): number;

/** Soft ceiling matching Word's practical custom-tab UI limit. */
declare const MAX_TAB_STOPS = 64;
/**
 * Soft ceiling on a tab position (31_680 twips ≈ 22"), matching paragraph-spacing bounds so
 * a hostile stop cannot shove layout into pathological widths.
 */
declare const MAX_TAB_POSITION_TWIPS = 31680;
/** OOXML / Word default when `w:settings/w:defaultTabStop` is absent: 720 twips = 0.5". */
declare const DEFAULT_TAB_INTERVAL_TWIPS = 720;
/** The default tab interval in points — {@link DEFAULT_TAB_INTERVAL_TWIPS} converted. */
declare const DEFAULT_TAB_INTERVAL_PT: number;
/**
 * How a tab stop positions the text that follows it.
 *
 * Only `left` is a plain cursor jump. The other three size the tab glyph from the MEASURED
 * following segment, so its end, centre or decimal point lands on the stop.
 */
type TabAlignment = 'left' | 'center' | 'right' | 'decimal';
/**
 * `w:tab/@w:leader` (ECMA-376 §17.3.1.38, ST_TabTlc): the character repeated across the
 * space a tab reserves. `none` is the default and is represented by an absent leader.
 *
 * This is the difference between a Word table of contents and a column of headings floating
 * next to a column of page numbers, so it is carried through layout to paint rather than
 * dropped as a geometry-irrelevant attribute.
 */
type TabLeader = 'dot' | 'hyphen' | 'underscore' | 'heavy' | 'middleDot';
/**
 * The character each leader repeats (§17.3.1.38, ST_TabTlc).
 *
 * Lives with the type rather than with the painter because LAYOUT has to measure it: a
 * leader is the same character typed over and over, and the only way to space it the way
 * typing it would is to ask the measurer how wide it actually is.
 */
declare const TAB_LEADER_GLYPH: ReadonlyMap<TabLeader, string>;
/** One authored `w:tab`: where it sits, how it aligns, and what fills the gap. */
interface TabStop {
    /** Position from the paragraph content origin, in points. */
    readonly positionPt: number;
    readonly alignment: TabAlignment;
    /** Absent for `none` — the schema default and the overwhelming majority of stops. */
    readonly leader?: TabLeader;
}
/**
 * A paragraph's tab stops after the style cascade, with the default interval that applies past
 * the last explicit one.
 */
interface ResolvedTabStops {
    /** Custom stops sorted by ascending position. */
    readonly stops: readonly TabStop[];
    /** Default-tab interval in points (always positive and bounded). */
    readonly defaultIntervalPt: number;
}
/** The frozen "no custom stops" value, so a paragraph without tabs mints no object. */
declare const EMPTY_TAB_STOPS: ResolvedTabStops;
/**
 * Resolve tab stops from cascaded `w:pPr` nodes (docDefaults → style chain → direct).
 *
 * Each `w:tabs` merges with `clear` support; absence inherits. The leader travels with the
 * stop that declared it — a `clear` at the same position discards both together.
 */
declare function cascadedTabStops(paragraphPropertyNodes: readonly OoxmlNode[]): ResolvedTabStops;
/** Direct `w:pPr` only — used when no style cascade table is present. */
declare function paragraphTabStops(pPr: OoxmlNode | undefined): ResolvedTabStops;
/**
 * Republish stops under a document-wide default-tab interval (`w:defaultTabStop`).
 *
 * The cascade resolves stops from the paragraph's own property chain, which cannot see
 * `settings.xml`; the interval is a document constant that arrives from the session. Returns
 * the input unchanged when nothing moves, so a cache-key fingerprint stays stable.
 */
declare function withDefaultTabInterval(tabs: ResolvedTabStops, defaultIntervalPt: number | undefined): ResolvedTabStops;
/**
 * Read `w:settings/w:defaultTabStop` (ECMA-376 §17.15.1.25), in points.
 *
 * Word's own interval, not a constant: a metric-locale template writes `w:val="1134"` (2cm)
 * and every default-interval tab in the document lands on that grid instead of the 0.5"
 * one. The value is FILE-DERIVED, so a non-integer, non-positive or out-of-range `val` falls
 * back to the schema default rather than being trusted into layout arithmetic.
 *
 * `ST_TwipsMeasure` also admits a universal measure (`"2cm"`); Word writes plain twips, and
 * the spelled form falls back to the default rather than being parsed here.
 */
declare function defaultTabIntervalFromSettings(settings: OoxmlNode | null | undefined): number;
/** Where one tab character lands: the resolved x, and the stop that decided it. */
interface TabDestination {
    readonly positionPt: number;
    readonly alignment: TabAlignment;
    /** Leader of the stop that was reached; absent for `none` and for default-interval tabs. */
    readonly leader?: TabLeader;
}
/**
 * Next tab destination strictly past `currentX`, preferring custom stops then the default
 * interval. Destination is clamped to `rightEdge` so stops cannot escape the content box.
 */
declare function nextTabDestination(tabs: ResolvedTabStops, currentX: number, rightEdge: number): TabDestination;
/**
 * Width of a tab glyph so the following segment lands on the destination.
 *
 * `segmentWidth` / `decimalOffset` are already measured in points. Decimal offset is the
 * advance from the segment start to the decimal point (0 when none — treated like right).
 */
declare function tabAdvanceWidth(alignment: TabAlignment, currentX: number, destinationX: number, segmentWidth: number, decimalOffset: number): number;
/**
 * Stable fingerprint for layout cache keys — nested `w:tabs` are not in flat `OoxmlProperty`
 * bags, so style-inherited stops must be named explicitly or breaks would collide.
 */
declare function tabStopsFingerprint(tabs: ResolvedTabStops): string;

/** `w:vertAlign` — script position, which also scales the run's effective size. */
type VerticalAlign = 'baseline' | 'superscript' | 'subscript';
/** A resolved underline: its variant, and its colour when it does not follow the text. */
interface ResolvedUnderline {
    /** The authored `ST_Underline` variant. */
    readonly variant: string;
    /** RRGGBB, or null when the underline follows the text colour. */
    readonly color: string | null;
}
/**
 * A run's character properties after the full cascade, in the units layout works in.
 *
 * Points rather than half-points, RRGGBB rather than theme references — everything already
 * resolved, so measurement and paint never re-run the cascade per glyph.
 */
interface ResolvedRunStyle {
    readonly fontFamily: string | null;
    /** Points. `w:sz` is half-points, so 22 becomes 11. */
    readonly fontSizePt: number;
    /** RRGGBB, or null for the inherited/automatic colour. */
    readonly color: string | null;
    readonly bold: boolean;
    readonly italic: boolean;
    readonly underline: ResolvedUnderline | null;
    readonly strike: boolean;
    readonly doubleStrike: boolean;
    /** An `ST_HighlightColor` name, or null. */
    readonly highlight: string | null;
    /**
     * Character shading fill (`w:rPr/w:shd`), validated RRGGBB, or null.
     *
     * Paint applies this as the glyph-box background; a recognised highlight overrides it.
     * Measurement ignores shading.
     */
    readonly shading: string | null;
    readonly verticalAlign: VerticalAlign;
    /** `w:position`, in points. Positive raises the baseline. */
    readonly baselineShiftPt: number;
    readonly caps: boolean;
    readonly smallCaps: boolean;
    /** `w:spacing`, in points. Added to every advance. */
    readonly characterSpacingPt: number;
    /** `w:w`, as a percentage. 100 is unscaled. */
    readonly horizontalScalePercent: number;
    /** `w:kern`, in points: the size at or above which kerning applies. 0 disables it. */
    readonly kerningMinPt: number;
    /**
     * `w:vanish` (ECMA-376 §17.3.2.45): the run is hidden text.
     *
     * Word does not draw it AND does not paginate it — hidden index or comment text takes no
     * space at all. So this cannot be a paint-time opacity: a hidden run that is still measured
     * pushes every following line, and every following page break, to the wrong place. Layout
     * drops the content instead (see `piecesOfParagraph`).
     *
     * `w:specVanish` (§17.3.2.36) is a different property — an always-hidden paragraph mark on
     * a heading — and never sets this.
     */
    readonly hidden: boolean;
}
/** The style a run inherits when it authors nothing. */
declare const DEFAULT_RUN_STYLE: ResolvedRunStyle;
/**
 * The theme part's two Latin typefaces, for resolving `w:rFonts` theme attributes.
 *
 * Structurally identical to the binding lane's `DocumentThemeFonts` and assignable from it.
 * Declared here so this lane reads two validated strings rather than the theme tree.
 */
interface ThemeFonts {
    /** `a:majorFont` latin typeface — headings. */
    readonly major: string | null;
    /** `a:minorFont` latin typeface — body text. */
    readonly minor: string | null;
}
/**
 * Resolve one run's direct formatting.
 *
 * Unrecognised values are DROPPED rather than guessed: a `w:sz` of `"large"` leaves the
 * default size rather than inventing one, because a wrong measurement moves every glyph
 * after it and a missing one is visible immediately.
 *
 * `themeFonts` resolves `w:rFonts` theme references. Absent, a theme-only `rFonts` leaves
 * the family inherited — which is what every run of a theme-fonted document does, so the
 * whole document falls back to the surface default face.
 */
declare function resolveRunStyle(props: readonly OoxmlProperty[], themeFonts?: ThemeFonts): ResolvedRunStyle;
/** The text as it is DRAWN, after case transforms. Measurement must use this, not the source. */
declare function displayText(text: string, style: ResolvedRunStyle): string;
/** Measure run text the way layout breaks lines and paints glyphs (caps/small-caps aware). */
declare function measureDisplayText(text: string, style: ResolvedRunStyle, measurer: TextMeasurer): number;
/** Whether two resolved styles are identical, for span merging and cache keys. */
declare function runStylesEqual(a: ResolvedRunStyle, b: ResolvedRunStyle): boolean;
/**
 * How far a run's glyphs are lifted off the line's baseline, in points. Positive is up.
 *
 * Super and subscript move the GLYPHS without moving the run's box, so the box keeps tiling
 * the line and the selection band stays continuous. Anything drawing at the glyphs — the
 * painter, and the caret — has to apply this itself, and from one place, or the two drift.
 */
declare function baselineShiftPtOf(style: ResolvedRunStyle): number;

interface DrawingPoint {
    readonly x: number;
    readonly y: number;
}
interface DrawingInsets {
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
}
type DrawingClipFallback = 'none' | 'unsupported-preset';
interface DrawingGeometry {
    readonly contentBounds: LayoutBox;
    readonly paintBounds: LayoutBox;
    readonly hitBounds: LayoutBox;
    readonly transformedCorners: readonly DrawingPoint[];
    readonly clipPolygon: readonly DrawingPoint[] | null;
    readonly clipFallback: DrawingClipFallback;
    readonly effectInsets: DrawingInsets;
}

/**
 * Why textbox story layout stopped short.
 *
 * Every one is a BOUND rather than a bug: nesting depth, fragment counts and the extent all
 * come from a file. Falling back with a reason keeps the drawing rendered (clipped) instead
 * of failing the layout pass.
 */
type TextboxStoryFallbackReason = 'textbox-nesting-limit' | 'textbox-fragment-limit'
/** Flowed content is taller than the extent; trailing fragments were dropped. */
 | 'textbox-height-clip';
/**
 * One text box's story laid out inside its extent, in content-box-relative coordinates.
 *
 * Fragments origin at the content box's top-left; paint places the content box at
 * `drawing origin + contentOffset` and clips to the extent.
 */
interface TextboxStoryLayout {
    /** Content-box-relative fragments (origin at the content box's top-left). */
    readonly fragments: readonly BlockFragmentRecord[];
    /** Height the blocks flow to (points), before vertical anchoring. */
    readonly flowHeight: number;
    /** Offset of the content box inside the drawing extent: insets plus vertical anchoring. */
    readonly contentOffset: Readonly<{
        x: number;
        y: number;
    }>;
    /** Content box width (extent minus horizontal insets). */
    readonly contentWidth: number;
    /** Content box height (extent minus vertical insets). */
    readonly contentHeight: number;
    /** Solid fill of the hosting shape, painted behind the story; null for no fill. */
    readonly fillHex: string | null;
    /** Solid outline of the hosting shape; null for no outline. */
    readonly strokeHex: string | null;
    /** Outline width in points; 0 when absent. */
    readonly strokeWidthPt: number;
    /** True when layout hit a named bound and returned a truncated / empty story. */
    readonly fallbackReason?: TextboxStoryFallbackReason;
}

interface InlineDrawingRecord {
    readonly kind: 'inlineDrawing';
    readonly drawingNodeId: string;
    readonly paragraphId: string;
    readonly ownerPartName: string;
    readonly start: number;
    /** Left edge of the extent box (slot + distL). */
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly distL: number;
    readonly distR: number;
    readonly distT: number;
    readonly distB: number;
    /** Caret/hit advance start (slot left, before distL). */
    readonly advanceStart: number;
    /** Caret/hit advance end (slot + totalWidth). */
    readonly advanceEnd: number;
    readonly baselineOffset: number;
    readonly paintBounds: LayoutBox;
    readonly hitBounds: LayoutBox;
    readonly geometry: DrawingGeometry;
    readonly resource: ImageResourceState;
    readonly accessibility: DrawingAccessibility;
    /** Sanitized external hyperlink projection; inert until an explicit gesture activates it. */
    readonly hyperlinkHref: string | null;
    readonly effects: Readonly<{
        readonly grayscale: boolean;
        readonly brightness: number;
        readonly contrast: number;
    }>;
    readonly crop: SourceCrop;
    readonly transform: DrawingTransform;
    /** Fixed non-picture graphic kind for refusal labels (`chart`, `group`, …); null for pictures. */
    readonly placeholderGraphicKind: string | null;
    /** Typed solid-geometry payload for a renderable `wps:wsp` shape; null otherwise. */
    readonly vectorShape: VectorShapeProjection | null;
}
interface InlineDrawingLayoutContext {
    readonly ownerPartName: string;
    /** Precomputed run-level atom id (`w:drawing` or MC wrapper) → projection. */
    readonly projectionForAtom?: (atomNodeId: string) => DrawingProjection | null;
    readonly project: (drawing: OoxmlDrawingNode) => DrawingProjection | null;
    readonly resourceOf: (projection: DrawingProjection) => ImageResourceState;
}
/** Named fallback when a positioning frame cannot be resolved (OpenSpec 4.6). */
type AnchoredDrawingLayoutFallback = 'unresolvable-frame' | 'page-defer-exhausted';
interface AnchoredDrawingRecord extends Omit<InlineDrawingRecord, 'kind' | 'baselineOffset' | 'advanceStart' | 'advanceEnd' | 'distL' | 'distR' | 'distT' | 'distB'> {
    readonly kind: 'anchoredDrawing';
    readonly anchorParagraphId: string;
    readonly horizontalFrame: DrawingHorizontalReferenceFrame;
    readonly verticalFrame: DrawingVerticalReferenceFrame;
    readonly horizontalFrameOrigin: number;
    readonly verticalFrameOrigin: number;
    readonly behindDocument: boolean;
    readonly allowOverlap: boolean;
    readonly layoutInCell: boolean;
    readonly relativeHeight: number;
    readonly wrap: Exclude<ImageWrapTarget, 'inline'>;
    readonly layoutFallback?: AnchoredDrawingLayoutFallback;
    /** Canonical document traversal index within the owner story part. */
    readonly sourceOrder?: number;
    /**
     * Laid-out textbox story for a `wps:txbx` drawing; paint renders it clipped inside the
     * extent instead of a placeholder. Absent when the drawing carries no story or the host
     * did not thread story layout (the record then degrades to the placeholder path).
     */
    readonly textboxStory?: TextboxStoryLayout;
}

/**
 * What a piece says about the FIELD result it came from, for Word's shading.
 *
 * Carried from layout rather than decided at paint time because only the walk knows an atom was
 * a field at all — by paint the result is just text. Whether the shading is actually drawn is a
 * view decision made downstream, so this states the fact and nothing about the appearance.
 */
interface FieldAtomMarker {
    /**
     * A legacy form field: `w:fldChar/w:ffData` (FORMTEXT, FORMCHECKBOX, FORMDROPDOWN).
     *
     * Word shades these on a different rule from ordinary fields — always, unless the document
     * turns it off — because they mark the blanks somebody is meant to fill in.
     */
    readonly formField: boolean;
}
/** A half-open model-offset range, in the paragraph's own UTF-16 offset space. */
interface ModelRange {
    readonly start: number;
    readonly end: number;
}

/** Test-only mutable counters; omitted by production call sites. Not package-public. */
interface TableBorderGridResolveWork {
    /** Sparse intervals emitted (not dense column slots). */
    ownershipSlotsWritten: number;
    columnLookups: number;
}
/** Shared remaining interval budget for nested table finalization in one layout. */
interface TableBorderOwnershipBudget {
    intervalsRemaining: number;
}

/** Which physical edge of a box a border sits on. */
type TableBorderSideName = 'top' | 'right' | 'bottom' | 'left';
/**
 * One border edge in one of three states.
 *
 * `omitted` and `none` are NOT the same: an omitted edge inherits from the table style or the
 * neighbouring cell, while an explicit `none` wins the conflict and draws nothing. Collapsing
 * them would let a style's border reappear where the author removed it.
 */
type TableBorderSide = {
    readonly state: 'omitted';
} | {
    readonly state: 'none';
} | {
    readonly state: 'edge';
    readonly style: TableBorderStyle;
    /** Validated RRGGBB, or null for auto/missing (paint defaults to black). */
    readonly color: string | null;
    /** Thickness in points (`w:sz` is eighths of a point). */
    readonly widthPt: number;
};
/** A table's six authored border edges: four outer, plus the two interior intervals. */
interface TableBorderBox {
    readonly top: TableBorderSide;
    readonly left: TableBorderSide;
    readonly bottom: TableBorderSide;
    readonly right: TableBorderSide;
    readonly insideH: TableBorderSide;
    readonly insideV: TableBorderSide;
}
/** The four resolved edges of one cell, after conflict resolution against its neighbours. */
interface CellBorderBox {
    readonly top: TableBorderSide;
    readonly left: TableBorderSide;
    readonly bottom: TableBorderSide;
    readonly right: TableBorderSide;
}
/** Final edge winner; absent means the side/interval is not drawn. */
interface ResolvedTableBorderEdge {
    readonly style: TableBorderStyle;
    readonly color: string | null;
    readonly widthPt: number;
}
/**
 * Conflict winner over one grid interval of a cell side.
 *
 * `gridStart`/`gridEnd` are absolute grid column indices for horizontal sides and absolute
 * row indices for vertical sides (half-open). `startPt`/`endPt` are cell-local along-axis
 * positions in layout points.
 */
interface ResolvedTableBorderEdgeSegment {
    readonly side: TableBorderSideName;
    readonly gridStart: number;
    readonly gridEnd: number;
    readonly startPt: number;
    readonly endPt: number;
    readonly edge: ResolvedTableBorderEdge;
}
/**
 * One published stroke rectangle in cell-local layout points.
 *
 * Paint multiplies x/y/width/height by scale and draws — no metrics, gaps, or corner math.
 */
interface TableBorderStrokeRecord {
    readonly side: TableBorderSideName;
    readonly role: 'outer' | 'inner' | 'middle' | 'edge';
    readonly color: string | null;
    /** CSS keyword for this stroke (compound strokes are always solid). */
    readonly cssStyle: 'solid' | 'dashed' | 'dotted';
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
/**
 * Layout-owned cell borders after conflict resolution and compound expansion.
 *
 * Convenience `top`/`left`/`bottom`/`right` are set when that side has a single uniform
 * full-span winner (existing consumers / CSS simple edges). Multi-interval winners live
 * only on `edgeSegments`. Compound geometry is always on `strokes`.
 */
interface ResolvedCellBorders {
    readonly top?: ResolvedTableBorderEdge;
    readonly left?: ResolvedTableBorderEdge;
    readonly bottom?: ResolvedTableBorderEdge;
    readonly right?: ResolvedTableBorderEdge;
    readonly edgeSegments?: readonly ResolvedTableBorderEdgeSegment[];
    readonly strokes?: readonly TableBorderStrokeRecord[];
}
/** Soft cap on published stroke rectangles per cell (security / pathological spans). */
declare const MAX_TABLE_BORDER_STROKES = 256;
/** Read one OOXML border child into the three-state model. */
declare function readBorderSide(node: OoxmlElement | undefined): TableBorderSide;
/**
 * Read a table's `w:tblBorders`, dropping or clamping hostile values.
 *
 * Widths and colours come from a file: an out-of-range `w:sz` becomes a layout dimension, so it is
 * bounded here rather than downstream.
 */
declare function readTableBorders(tblPr: OoxmlElement | undefined): TableBorderBox;
/** Read one cell's `w:tcBorders`, under the same bounds {@link readTableBorders} applies. */
declare function readCellBorders(tcPr: OoxmlElement | undefined): CellBorderBox;
/**
 * Conflict weight: the authored width in eighths of a point, and nothing else.
 *
 * Word-matching, not conformance — §17.4.39 (`w:tblBorders`) and §17.4.66 (`w:tcBorders`)
 * describe the elements and specify no conflict algorithm. Word picks the heavier RULE, so
 * a 6pt dashed rule beats a hairline single. Folding the style rank into the weight (an
 * `sz × border-number` product) made a 0.5pt double outrank a 1pt single and made every
 * dashed or dotted rule weigh 1 regardless of `w:sz`, which erased its width entirely.
 */
declare function borderWeight(side: TableBorderSide): number;
/**
 * Pick the winner between two candidates on a shared grid line (zero cell spacing).
 *
 * `none` loses to any edge; two `none`/omitted yield omitted (no paint). Width decides;
 * equal widths rank by style, then prefer the darker color, then `preferFirst`
 * (reading-order / first candidate).
 */
declare function resolveBorderConflict(first: TableBorderSide, second: TableBorderSide, preferFirst?: boolean): TableBorderSide;
interface BorderGridCell {
    readonly gridColumn: number;
    readonly gridSpan: number;
    readonly vMergeContinue: boolean;
    readonly borders: CellBorderBox;
    /** Set on restart cells that visually span into later rows. */
    readonly mergeRowSpan?: number;
}
/**
 * The absolute grid a table's borders are drawn on: column widths, and per-row tops and heights.
 *
 * Shared by every edge so adjacent cells resolve to the SAME line, rather than each computing its
 * own and leaving a hairline gap between them.
 */
interface BorderGridGeometry {
    /** Absolute column widths for the whole table (points). */
    readonly columnWidthsPt: readonly number[];
    /**
     * Per laid-out row: absolute top and height in the same coordinate space as cell boxes
     * (only relative differences matter for vertical edge segmentation).
     */
    readonly rowBands: readonly {
        readonly y: number;
        readonly height: number;
    }[];
    /** Per laid-out cell: width/height after vMerge expansion (cell-local stroke space). */
    readonly cellBoxes: readonly (readonly {
        readonly width: number;
        readonly height: number;
    }[])[];
}
/**
 * Resolve borders for every cell in a laid-out table fragment.
 *
 * Shared vertical edges: conflict(left.right, right.left) → assigned to the left cell,
 * segmented per row when a vMerge restart faces differing neighbors.
 * Shared horizontal edges: conflict(above.bottom, below.top) → assigned to the above cell,
 * segmented per grid column when a gridSpan cell faces differing below neighbors; vMerge
 * interior seams are suppressed per interval.
 *
 * When `geometry` is provided, compound edges expand into explicit stroke records with
 * corner-adjusted endpoints in cell-local points.
 */
declare function resolveTableCellBorderGrid(rows: readonly (readonly BorderGridCell[])[], table: TableBorderBox, columnCount: number, geometry?: BorderGridGeometry, work?: TableBorderGridResolveWork, ownershipBudget?: TableBorderOwnershipBudget): ResolvedCellBorders[][];
/** Width contribution of a resolved edge for content inset / row sizing. */
declare function borderExtentPt(edge: ResolvedTableBorderEdge | TableBorderSide | undefined): number;

/** A half-open UTF-16 range inside one paragraph, addressed by its canonical node id. */
interface SourceRange {
    readonly paragraphId: string;
    readonly start: number;
    readonly end: number;
}
/**
 * A rectangle in layout POINTS.
 *
 * Points everywhere in this layer — twips convert at property-read boundaries and CSS pixels at
 * paint. A box carrying either of those would eventually be added to one carrying the other.
 */
interface LayoutBox {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
/**
 * A bottom paragraph border as layout published it.
 *
 * `box` is the rule's geometry in the same coordinate space as the fragment (page-content
 * relative). Paint positions from this box and MUST NOT remeasure the border.
 */
interface ParagraphBottomBorderRecord {
    readonly edge: ParagraphBorderEdge;
    readonly box: LayoutBox;
}
/**
 * One `w:pBdr` rule as layout published it.
 *
 * `box` is the STROKE rectangle in the same coordinate space as the fragment, so paint sets a
 * position and a colour and nothing else. It matters that paint cannot derive these itself:
 * Word draws the side rules OUTSIDE the text column, so `box.x` on a `left`/`bar` stroke is
 * left of the fragment box and a painter reasoning from the fragment alone would put it
 * inside the text.
 */
interface ParagraphBorderStrokeRecord {
    readonly side: ParagraphBorderSide;
    readonly edge: ParagraphBorderEdge;
    readonly box: LayoutBox;
}
/**
 * The hyperlink a span sits inside, as layout resolved it.
 *
 * Already SANITIZED: `href` is the runtime projection produced once at the trust boundary,
 * and `null` means the link is inert — a refused scheme, or a relationship the package does
 * not declare. Paint, hit-testing and the popover consume this and never the authored target,
 * so there is exactly one place a file-derived URL becomes something a browser can follow.
 *
 * `id` is the `w:hyperlink` node's canonical id, which is what makes the spans of one link
 * recognisable as one link across the several lines it wraps onto — and what an unlink or a
 * retarget addresses.
 */
interface SpanLinkRecord {
    readonly id: string;
    readonly kind: 'external' | 'internal' | 'unresolved';
    /** Sanitized runtime projection: an absolute URL, `#anchor`, or null when inert. */
    readonly href: string | null;
    /** Bookmark name for an internal link, so navigation need not re-parse the fragment. */
    readonly anchor?: string;
    /** `w:tooltip` — paint puts it on the anchor's `title`. */
    readonly tooltip?: string;
}
/** A run of text on one line sharing identical resolved formatting. */
interface StyleSpanRecord {
    readonly range: SourceRange;
    readonly text: string;
    /** The run's authored properties, retained as evidence. */
    readonly props: readonly OoxmlProperty[];
    /**
     * The same properties RESOLVED — one unit system, defaults applied.
     *
     * Carried on the span so the measurer, the span and the painter all read one resolution
     * rather than each deriving its own. Two derivations that disagree by a fraction of a
     * point put the caret where no glyph is.
     */
    readonly style: ResolvedRunStyle;
    readonly box: LayoutBox;
    /**
     * Cumulative advances from {@link box}.x to each UTF-16 caret boundary in {@link text}.
     *
     * Length is `text.length + 1` (both endpoints). Layout publishes these so hit-testing and
     * the caret read the same per-cluster edges the span was measured with, rather than
     * re-measuring a prefix at interaction time or interpolating across {@link box}.width —
     * OpenSpec task 13.5. Absent on older records; consumers fall back to the measurer.
     */
    readonly caretEdges?: readonly number[];
    /**
     * `w:tab/@w:leader` of the stop a `\t` span advanced to (ECMA-376 §17.3.1.38).
     *
     * Only ever set on a tab span, and only for a non-`none` leader. Paint repeats the glyph
     * across the advance THIS box already reserved — the leader adds no width of its own, so
     * it can never move the text that follows it.
     */
    readonly tabLeader?: TabLeader;
    /**
     * Advance of ONE leader glyph in this run's face, in points, measured by layout.
     *
     * Paint cannot ask a font how wide a character is, so without this it had to guess and
     * deliberately overfill, leaving the dots at whatever spacing an over-long string
     * happened to produce. Measured, the leader is spaced exactly as the same character
     * typed there would be — which is what Word draws.
     */
    readonly tabLeaderAdvancePt?: number;
    /**
     * The hyperlink this span belongs to, or absent for ordinary text.
     *
     * Carried on the SPAN rather than looked up at paint time because a link that wraps
     * produces one set of spans per line, and paint has no paragraph to walk — only the line
     * it was handed.
     */
    readonly link?: SpanLinkRecord;
    /**
     * Horizontal jump, in points, that a floating object's wrap zone forced before this span.
     *
     * A line that resumes on the far side of a float is still ONE line: its spans keep running
     * model offsets and share a selection band. Only layout knows the jump is an obstacle
     * rather than justification slack, so it publishes it here. Paint reserves it with an inert
     * advance and excludes it from the word spacing it reconstructs — inferring the difference
     * from the gap alone spread the float's whole width across every space on the line.
     */
    readonly wrapAdvanceBefore?: number;
    /**
     * The revision wrappers this text sits inside, outermost first, absent when untracked.
     *
     * Carried on the span for the same reason `style` is: paint and the review surface must read
     * ONE attribution. A sidebar that re-derived which revision covers a span by walking the tree
     * could disagree with what was painted, and the card would point at the wrong text.
     */
    readonly revisions?: readonly RevisionAttribution[];
    /**
     * Present when this span is a field's displayed RESULT, for the shading Word draws under one.
     *
     * `projected` cannot answer this: it is also set for note marks and inline drawings, so it
     * says "layout owns these glyphs" rather than "this is a field". Word shades legacy form
     * fields on a different rule from ordinary ones, which is why the marker distinguishes them.
     *
     * States the FACT, never the appearance — whether shading is drawn is a view decision, made
     * downstream from a host option and the document's own `w:doNotShadeFormData`. Deciding it
     * here would put the caret into layout's cache key and repaginate on every arrow press.
     */
    readonly fieldAtom?: FieldAtomMarker;
    /**
     * Live PAGE/NUMPAGES/SECTIONPAGES projection (layout-time evaluated text).
     *
     * Computed substitutions are not model-editable: paint treats these as atomic furniture
     * and selection mapping refuses them the way it refuses markers.
     */
    readonly projected?: boolean;
    /**
     * Footnote/endnote navigation metadata for projected note atoms.
     *
     * Paint tags body citations (`to-note`) and note-body marks (`to-body`) so React chrome
     * can jump without owning layout logic.
     */
    readonly noteNav?: {
        readonly scopeId: string;
        readonly direction: 'to-note' | 'to-body';
    };
}
/**
 * One laid-out line: its geometry, its baseline, and the styled spans it renders.
 *
 * The unit hit-testing and caret placement resolve against. Geometry comes from HERE, never from
 * the DOM, which is what lets an empty paragraph still get a caret.
 */
interface LineRecord {
    readonly id: string;
    readonly range: SourceRange;
    readonly spans: readonly StyleSpanRecord[];
    readonly box: LayoutBox;
    /**
     * Where the line's content actually starts, after alignment and the first-line indent.
     *
     * {@link box} is the content BAND the line was broken against — its `x` is the indented
     * column edge and its `width` the available measure, neither of which moves with
     * `w:jc`. Alignment is otherwise expressed only as x offsets on the span boxes, so a line
     * with no spans (an empty paragraph) had no aligned origin at all: paint, hit testing and
     * the caret each fell back to `box.x` and drew a centred empty paragraph's caret hard
     * against the left margin, where it stayed until the first character was typed.
     *
     * Equal to the first span's x whenever there is one, so it is the single origin every
     * consumer can read without a spans-or-box fallback of its own.
     */
    readonly contentX: number;
    /** Distance from the line box top to the text baseline. */
    readonly baseline: number;
    /**
     * Space ABOVE the glyph band inside {@link box} (exact centering, not auto/atLeast).
     *
     * `auto` / `atLeast` extras grow the box BELOW the glyphs — paint puts that depth in
     * padding-bottom. {@link baseline} is measured from the line top and already includes
     * this above-band when present.
     *
     * Published by layout rather than recovered by paint: three paint sites each deriving it
     * separately is how they came to disagree about where a line's text sits.
     */
    readonly leading: number;
    /**
     * Auto/atLeast line-spacing depth BELOW the glyph band, inside {@link box}.
     *
     * The complement of {@link leading}: exact spacing centres the glyphs and moves the
     * baseline down, while auto/atLeast leave the band at the top and grow the box beneath it.
     * So the band a consumer needs is `box.height - trailingSpacing - leading`, and
     * subtracting `leading` alone is right only under the exact rule.
     *
     * A line WITH spans carries its band in the span heights too. An empty paragraph carries
     * nothing, which is why the caret, paint's `padding-bottom` and the content-control
     * boundary all need this published rather than recovered from the box.
     *
     * Zero under the exact rule and on lines holding drawings, where the box is authored.
     * Absent on lines published before this was measured; treat as zero.
     */
    readonly trailingSpacing?: number;
    /**
     * Model ranges on this line covering DELETED content, absent when there is none.
     *
     * The caret steps over these rather than entering them: text typed inside a deletion exists
     * in neither the original nor the proposal, and there is no valid tree for the result.
     *
     * Recorded even in display modes that lay the deletion out invisibly, because the offsets
     * exist in the model in every mode and an offset-by-offset walk would otherwise stop at
     * positions with no glyph.
     */
    readonly deletedRanges?: readonly ModelRange[];
    /**
     * Inline drawings on this line, absent when there are none.
     *
     * Each occupies one UTF-16 model unit at {@link InlineDrawingRecord.start}. Hidden drawings
     * are omitted — they remain in the tree and projection but publish no geometry.
     */
    readonly drawings?: readonly InlineDrawingRecord[];
}
/**
 * A paragraph's resolved indent in points, in the vocabulary `w:ind` uses.
 *
 * `left`/`right` are signed; `hanging` is not (`ST_TwipsMeasure`). `firstLine` is signed
 * even though the schema declares it unsigned, because Word's model keeps one signed
 * first-line indent and this engine follows it.
 */
interface ParagraphIndent {
    readonly left: number;
    readonly right: number;
    readonly firstLine: number;
    readonly hanging: number;
}
/**
 * The part of one paragraph that sits on one page.
 *
 * A paragraph that crosses a page boundary produces several fragments that all name the SAME
 * `paragraphId`, which is what lets selection and hit-testing treat it as one paragraph while
 * pagination treats it as two boxes.
 */
interface ParagraphFragmentRecord {
    readonly kind: 'paragraph';
    readonly id: string;
    readonly paragraphId: string;
    /** 0 for the first fragment of the paragraph, 1 for its continuation, and so on. */
    readonly fragmentIndex: number;
    readonly range: SourceRange;
    readonly props: readonly OoxmlProperty[];
    /**
     * Before/after spacing applied to THIS fragment, in points.
     *
     * Continuations carry `before: 0`; only the final fragment carries `after`. The numbers
     * already reflect Word's adjacent-collapse against the previous paragraph's after.
     */
    readonly spacing: ParagraphSpacing;
    /**
     * The paragraph's EFFECTIVE indent in points, cascade and numbering merge included.
     *
     * Published because it is not recoverable from anything else here. `props` carries the
     * cascaded `w:ind`, but a list paragraph's indent comes from `numbering.xml` and is merged
     * in after the cascade, so a numbered item that authors no `w:ind` reads zero there while
     * its text sits indented. The geometry is no better an answer: `box.x` is cell-relative
     * inside a table and is displaced by float zones.
     *
     * `firstLine` and `hanging` are kept as OOXML spells them. A consumer wanting the one
     * signed first-line offset Word models takes `hanging > 0 ? -hanging : firstLine` —
     * hanging WINS, it is not summed (ECMA-376 §17.3.1.12).
     */
    readonly indent: ParagraphIndent;
    /** Bottom rule on the final fragment when `w:pBdr/w:bottom` resolves; absent otherwise. */
    readonly bottomBorder?: ParagraphBottomBorderRecord;
    /**
     * Every `w:pBdr` rule this fragment draws, in paint order.
     *
     * A paragraph split across pages opens and closes exactly once: the `top` stroke rides the
     * first fragment, the closing stroke the last. `bottomBorder` remains the bottom rule alone
     * — a `between` rule closing a grouped paragraph is not one.
     */
    readonly borders?: readonly ParagraphBorderStrokeRecord[];
    /**
     * Validated 6-hex paragraph shading fill (`w:pPr/w:shd`), absent for none/auto.
     *
     * Paint fills {@link shadingBox}. Measurement ignores it.
     */
    readonly shading?: string;
    /**
     * Geometry of the paragraph shading band when {@link shading} is set. Absent when there
     * is no fill.
     *
     * TWO SHAPES, because Word fills two different things. An UNBORDERED paragraph is filled
     * across its line boxes (indent-aware width), and before/after spacing stays unfilled. A
     * paragraph that publishes any {@link borders} stroke is filled across the rectangle those
     * strokes draw instead — `w:space` padding and rule extent included — so a callout's fill
     * reaches its frame rather than leaving a pale stripe floating inside an empty box. Paint
     * draws the strokes after the fill, so the frame is never covered.
     */
    readonly shadingBox?: LayoutBox;
    /**
     * The revision on this paragraph's own MARK (`w:pPr/w:rPr/w:ins|w:del`), absent when there
     * is none.
     *
     * Carried on the fragment rather than on a span because it decorates no characters: the
     * pilcrow was inserted or deleted, which is how a split or a merge is recorded. Only the
     * FINAL fragment carries it — the mark lives at the end of the paragraph, so a paragraph
     * split across pages must not draw two of them.
     */
    readonly markRevision?: RevisionAttribution;
    /**
     * List marker painted in the hanging-indent slot of the FIRST fragment only.
     *
     * Not part of model text: no UTF-16 range, never contributes to caret/selection offsets,
     * and must not be serialised back into the paragraph.
     */
    readonly marker?: ListMarkerRecord;
    readonly lines: readonly LineRecord[];
    readonly box: LayoutBox;
}
/**
 * A numbering marker as layout published it.
 *
 * Geometry is in the same coordinate space as the fragment (page-content or cell-content
 * relative). Paint positions from this box and MUST NOT remeasure the marker.
 */
interface ListMarkerRecord {
    readonly text: string;
    readonly style: ResolvedRunStyle;
    readonly box: LayoutBox;
    /**
     * The `w:ilvl` this marker was resolved at, 0..8.
     *
     * Published because the level, not the geometry, is what Increase/Decrease Indent moves
     * on a list paragraph — demoting an item re-resolves its format from `numbering.xml`,
     * which is why a bullet becomes a hollow circle and a `1.` becomes an `a.`.
     */
    readonly level: number;
    /**
     * The `w:numId` this marker resolved through.
     *
     * Published with the level because the two together are what identifies a list: whether
     * a demote is even possible depends on which levels THIS definition declares, and a
     * document may hold several lists whose level 0 looks identical.
     */
    readonly numId: string;
    /** `w:numFmt` of the resolved level — `bullet` or a numbering format. */
    readonly numFmt: string;
}
/**
 * The part of one table that sits on one page.
 *
 * A table that crosses a page boundary produces one fragment per page it spans, which is
 * what lets it checkpoint like a paragraph: the flow loop places whole fragments, and
 * resuming after a table needs no knowledge of its interior.
 */
interface TableFragmentRecord {
    readonly kind: 'table';
    readonly id: string;
    /** Canonical node id of the `w:tbl`. */
    readonly tableId: string;
    /** 0 for the first page the table touches, 1 for its continuation, and so on. */
    readonly fragmentIndex: number;
    /** Nesting depth: 0 for body-level tables, increasing for nested tables. */
    readonly nestingDepth: number;
    /**
     * Resolved column boundary x positions in table-local points, left edge through right edge.
     * Length is column count + 1.
     */
    readonly columnEdges: readonly number[];
    readonly rows: readonly TableRowFragmentRecord[];
    readonly box: LayoutBox;
}
/**
 * One table row on one page.
 *
 * A FRAGMENT, not the row: a row split across a page break appears once per page it touches, and
 * a repeated header row appears on every page of its table.
 */
interface TableRowFragmentRecord {
    /** Canonical node id of the `w:tr`. */
    readonly id: string;
    /** Pending tracked row insertion/deletion, when authored in `w:trPr`. */
    readonly revisionKind?: 'insert' | 'delete';
    /**
     * The `w:trPr/w:ins|w:del` attribution — the `(id, author, date)` triple the review model
     * addresses this decision by, so painted rows can carry it the way revision spans do.
     */
    readonly revisionId?: string;
    readonly revisionAuthor?: string;
    readonly revisionDate?: string;
    /** Authored row ordinal within the table; repeats share the original row's index. */
    readonly rowIndex: number;
    /**
     * True for a `w:tblHeader` row RE-EMITTED at the top of a continuation page. Painted,
     * but excluded from interaction walks so each caret stop exists exactly once.
     */
    readonly isHeaderRepeat: boolean;
    /**
     * True when this record continues a row that already emitted content on a prior page
     * (cell content fragmented at a paragraph/line boundary). Same `id` as the lead fragment.
     */
    readonly isContinuation?: boolean;
    readonly cells: readonly TableCellFragmentRecord[];
    readonly box: LayoutBox;
}
/**
 * One table cell on one page, already resolved against the grid.
 *
 * `gridSpan` is clamped at read time, because it comes from a file and an unclamped span is a
 * loop bound an attacker controls. A vertical-merge continuation paints its box but holds no
 * blocks — its content belongs to the cell that started the merge.
 */
interface TableCellFragmentRecord {
    /** Canonical node id of the `w:tc`. */
    readonly id: string;
    /** First grid column this cell occupies. */
    readonly gridColumn: number;
    /** Canonical `w:gridCol` node id for this cell's start column, when authored. */
    readonly gridColumnId?: string;
    /** Grid columns spanned, already clamped at read time. */
    readonly gridSpan: number;
    /** A vertical-merge continuation paints its box but holds no blocks. */
    readonly vMergeContinue: boolean;
    /**
     * When true, paint skips borders/fill/content for this cell (vMerge continue). Grid
     * bookkeeping and the box remain so selection/geometry walks stay consistent.
     */
    readonly paintInert?: boolean;
    /** Number of rows this restart cell visually spans (1 when not a vertical merge). */
    readonly rowSpan?: number;
    /** Validated 6-hex cell shading fill, absent for none/auto. */
    readonly shading?: string;
    /**
     * Layout-owned resolved borders after collapsed conflict resolution.
     *
     * Includes convenience per-side edges, per-grid-interval winners, and explicit compound
     * stroke rectangles in cell-local points. Paint only scales and draws — it must not
     * invent stroke/gap/corner geometry.
     */
    readonly borders?: ResolvedCellBorders;
    /** Nested blocks in reading order; recursion carries nested tables. */
    readonly blocks: readonly BlockFragmentRecord[];
    readonly box: LayoutBox;
}
/** A top-level (or cell-level) block fragment, discriminated by `kind`. */
type BlockFragmentRecord = ParagraphFragmentRecord | TableFragmentRecord;
/**
 * One header or footer story as it sits on one page.
 *
 * `box` is absolute (sheet coordinates) and sized to the story's FLOW height — never to
 * any anchored-object extent, which is the rule that keeps a decorated header's hit area
 * from covering the body. `fragments` are story-relative (origin at the box's top-left).
 * Baseline furniture may be shared across pages of the same variant when the story has no
 * allowlisted PAGE/NUMPAGES/SECTIONPAGES fields; after page-field finalize, projections are
 * per page (or per distinct field values for count-only stories).
 */
interface HeaderFooterStoryRecord {
    readonly kind: 'header' | 'footer';
    readonly variant: 'default' | 'first' | 'even';
    readonly partName: string;
    /**
     * Main-document relationship id that resolves to this part (`EditorScope.rId`).
     *
     * Present when the furniture source could name the relationship; scoped editing binds
     * on this id so shared parts stay one story across pages/sections.
     */
    readonly rId?: string;
    readonly box: LayoutBox;
    readonly fragments: readonly BlockFragmentRecord[];
    /** Anchored drawings owned by this story, in story-relative coordinates. */
    readonly anchoredDrawings?: readonly AnchoredDrawingRecord[];
    /**
     * Transient projector used between furniture attach and document-level page-field
     * finalize. Absent on published layout records after finalize.
     */
    readonly pageFieldProjector?: (context: {
        readonly pageNumber: number;
        readonly pageCount: number;
        readonly sectionPageCount?: number;
        readonly format?: string;
    }) => HeaderFooterStoryRecord;
}
/**
 * One footnote or endnote story as it sits on one page (or continuation page).
 *
 * Notes are ordinary editable stories — NOT `[data-docx-hf]` furniture. `box` is absolute
 * (sheet coordinates). `fragments` are story-relative. Separators are nonselectable paint
 * geometry owned by the parent {@link NoteAreaRecord}.
 */
interface NoteStoryRecord {
    readonly noteKind: 'footnote' | 'endnote';
    readonly noteId: number;
    /** `footnote:N` / `endnote:N` — EditorScope note id. */
    readonly scopeId: string;
    /** Derived display mark for this occurrence; null when customMarkFollows / continuation. */
    readonly mark: string | null;
    /** True when this is a continuation fragment (no leading mark). */
    readonly continuation?: boolean;
    readonly box: LayoutBox;
    readonly fragments: readonly BlockFragmentRecord[];
}
/**
 * Footnote / endnote area on one page: separator + stacked note stories.
 *
 * `placement` records how the area was positioned. `fallbackReason` is set when the
 * bounded reflow loop exhausted and layout kept the reference with its note on a later
 * page (D12 named fallback).
 */
interface NoteAreaRecord {
    readonly kind: 'footnotes' | 'endnotes';
    readonly placement: 'pageBottom' | 'beneathText' | 'sectEnd' | 'docEnd';
    readonly box: LayoutBox;
    /** Separator rule / authored separator story; absent when no notes on this page. */
    readonly separator?: {
        readonly kind: 'separator' | 'continuationSeparator';
        readonly box: LayoutBox;
        readonly fragments: readonly BlockFragmentRecord[];
        readonly synthetic: boolean;
        /** Layout-owned single/double rule when marker-only or synthetic; absent for authored stories. */
        readonly ruleStyle?: 'single' | 'double';
    };
    readonly notes: readonly NoteStoryRecord[];
    readonly fallbackReason?: string;
}
/**
 * Note-stream ownership for overflow sheets created by note pagination.
 *
 * - `footnote-drain`: continuation pages that exist only to finish pageBottom footnotes —
 *   not free body hosts for sectEnd/docEnd endnotes.
 * - `endnote-overflow`: sheets inserted to finish sectEnd/docEnd collections.
 */
type PageNoteStream = 'footnote-drain' | 'endnote-overflow';
/**
 * Raw `w:lock/@w:val` on one control, or `unlocked` when absent / unrecognised.
 *
 * Effective permissions across a nesting chain are the union of every ancestor's lock on two
 * axes (content edit / removal); see {@link ContentControlBoundaryRecord.effectiveLock}.
 */
type ContentControlLock = 'unlocked' | 'sdtLocked' | 'contentLocked' | 'sdtContentLocked';
/**
 * Mapped control type for layout / chrome — same members as the shipped public
 * `ContentControlType`. Untyped and preserved-only kinds report as `richText`.
 */
type ContentControlMappedType = 'richText' | 'plainText' | 'checkbox' | 'dropdown' | 'comboBox' | 'date' | 'picture' | 'repeatingSection';
/** Where the control sits in the tree relative to its content. */
type ContentControlLevel = 'block' | 'inline' | 'row' | 'cell';
/**
 * One piece of a control's content geometry.
 *
 * A block control that crosses a page break publishes one fragment per page rather than a
 * single rectangle covering the inter-page gap. An inline control publishes one fragment per
 * LINE it touches, covering the text's vertical extent (line-spacing leading excluded), so a
 * wrapped control never claims the words beside it. Coordinates match fragment boxes
 * (page-content space).
 */
interface ContentControlGeometryFragment {
    readonly pageIndex: number;
    readonly box: LayoutBox;
}
/**
 * Layout-published boundary for one content control (`w:sdt` / typed `contentControl`).
 *
 * Chrome, lock feedback, and hit resolution read this record — never painted DOM. The wrapper
 * itself is not a layout box; `fragments` cover the content that already flowed in place.
 */
interface ContentControlBoundaryRecord {
    /** Canonical node id of the control wrapper — not `w:id`. */
    readonly id: string;
    readonly alias?: string;
    readonly tag?: string;
    readonly controlType: ContentControlMappedType;
    /** This control's own `w:lock`, before ancestor union. */
    readonly lock: ContentControlLock;
    /**
     * Nested lock union with every ancestor control, collapsed back to a single `ST_Lock`
     * vocabulary value (both axes locked → `sdtContentLocked`).
     */
    readonly effectiveLock: ContentControlLock;
    /** `w:showingPlcHdr` is present on the control's properties. */
    readonly placeholder: boolean;
    /** `w:dataBinding` is present — content edits are refused as bound. */
    readonly bound: boolean;
    /** 0 for a top-level control; increments through nested wrappers under the shared nesting bound. */
    readonly nestingDepth: number;
    readonly level: ContentControlLevel;
    readonly fragments: readonly ContentControlGeometryFragment[];
}
/**
 * One laid-out page: the sheet, the content area, and everything that landed on it.
 *
 * Page identity is REUSED across incremental passes — a pass that changes nothing returns the
 * previous records by reference, which is what lets paint skip untouched pages entirely.
 */
interface PageRecord {
    readonly id: string;
    readonly index: number;
    /** The whole sheet. */
    readonly box: LayoutBox;
    /** The area inside the margins that content flows into. */
    readonly contentBox: LayoutBox;
    readonly fragments: readonly BlockFragmentRecord[];
    /** Layout-owned vertical rules requested by `w:cols/@w:sep`, content-box relative. */
    readonly columnSeparators?: readonly LayoutBox[];
    /** Page-content anchored drawings on this sheet, absent when there are none. */
    readonly anchoredDrawings?: readonly AnchoredDrawingRecord[];
    /** Page furniture for this page's variant, absent when the document declares none. */
    readonly header?: HeaderFooterStoryRecord;
    readonly footer?: HeaderFooterStoryRecord;
    /** Footnotes reserved on this page (pageBottom / beneathText / continuations). */
    readonly footnotes?: NoteAreaRecord;
    /** Endnotes collected on this page (sectEnd / docEnd). */
    readonly endnotes?: NoteAreaRecord;
    /**
     * Ownership of note-only overflow sheets. Absent on ordinary body pages.
     * Layout pagination sets this so endnote hosting does not treat footnote drain
     * pages as free body space.
     */
    readonly noteStream?: PageNoteStream;
    /**
     * Section-local PAGE/SECTIONPAGES inputs for finalize. Absent → physical page index and
     * document-wide section count (empty `w:pgNumType` behaviour).
     */
    readonly pageFieldSource?: {
        readonly pageNumber: number;
        readonly sectionPageCount: number;
        readonly format?: string;
    };
    /**
     * Content-control boundaries whose geometry intersects this page.
     *
     * Carried on the page so a consumer that only holds a page record still sees current
     * metadata; identity reuse of an unchanged page keeps the same array only when the
     * control-context token matches.
     */
    readonly contentControls?: readonly ContentControlBoundaryRecord[];
}
/**
 * A complete layout pass: every page, plus the document-wide indexes derived alongside them.
 *
 * Stamped with the store `revision` it was laid out from, so anything holding geometry can tell
 * whether the document has moved underneath it — which is how stale pointer gestures and
 * overlays are refused rather than applied to coordinates that no longer describe anything.
 */
interface SemanticLayout {
    /** The store revision these records were laid out from. */
    readonly revision: number;
    readonly pages: readonly PageRecord[];
    /**
     * Every content-control boundary in document order, including multi-page fragment lists.
     *
     * Always recomputed when a document layout pass finishes, so incremental page-identity
     * reuse cannot publish stale alias/tag/lock metadata.
     */
    readonly contentControls?: readonly ContentControlBoundaryRecord[];
    /**
     * Fingerprint of wrapper-only control metadata (alias, tag, lock, type, placeholder, binding).
     *
     * Folded into the layout producer / session context so a metadata-only edit invalidates
     * reuse paths that would otherwise return previous pages by identity with stale boundaries.
     */
    readonly controlContextToken?: string;
}
/** Page geometry, in points. */
interface PageGeometry {
    readonly width: number;
    readonly height: number;
    readonly margin: {
        readonly top: number;
        readonly right: number;
        readonly bottom: number;
        readonly left: number;
    };
    /** `w:pgMar/@header` — sheet edge to header top, in points. Defaults to 36 (720 twips). */
    readonly headerDistance?: number;
    /** `w:pgMar/@footer` — sheet edge to footer bottom, in points. Defaults to 36. */
    readonly footerDistance?: number;
}
/** US Letter with one-inch margins, in points. */
declare const DEFAULT_PAGE_GEOMETRY: PageGeometry;
/**
 * Text measurement, injected.
 *
 * A real implementation shapes with the resolved font; the tests supply a deterministic one.
 * Layout never reads the DOM, so this is the only way width and height enter it.
 */
interface TextMeasurer {
    /** Advance width of `text` in the resolved style. */
    measure(text: string, style: ResolvedRunStyle): number;
    /** Line height and baseline for the resolved style. */
    lineMetrics(style: ResolvedRunStyle): {
        height: number;
        baseline: number;
    };
}
/**
 * Depth-first paragraph fragments of one page, in reading order.
 *
 * Table interiors flatten through rows and cells; header-repeat rows are skipped unless
 * asked for, so interaction sees each caret stop exactly once while paint sees everything.
 */
declare function paragraphFragmentsOf(page: PageRecord, includeHeaderRepeats?: boolean): ParagraphFragmentRecord[];
/**
 * Depth-first paragraph fragments of one block list, in reading order.
 *
 * The same walk as {@link paragraphFragmentsOf} for fragment lists that do not sit on the
 * page directly — a header/footer story's fragments, a note story's.
 */
declare function paragraphFragmentsOfBlocks(blocks: readonly BlockFragmentRecord[], includeHeaderRepeats?: boolean): ParagraphFragmentRecord[];
/** Every line in a layout, in reading order — the order caret navigation walks. */
declare function linesOf(layout: SemanticLayout): LineRecord[];
/** Every fragment belonging to one paragraph, in order, across page boundaries. */
declare function fragmentsOfParagraph(layout: SemanticLayout, paragraphId: string): ParagraphFragmentRecord[];
/** The line containing a model position, or null when the position is not laid out. */
declare function lineAtPosition(layout: SemanticLayout, paragraphId: string, offset: number): LineRecord | null;
/** Every content-control boundary on a layout, preferring the layout-level list. */
declare function contentControlsOfLayout(layout: SemanticLayout): readonly ContentControlBoundaryRecord[];
/**
 * Axis-aligned union of boxes, or null when the list is empty.
 *
 * Used when a control's content spans several fragments or spans on one page.
 */
declare function unionLayoutBoxes(boxes: readonly LayoutBox[]): LayoutBox | null;
/** Collapse raw + ancestor locks into one `ST_Lock` vocabulary value. */
declare function effectiveContentControlLock(locks: readonly ContentControlLock[]): ContentControlLock;

export { type ParagraphBorderStrokeRecord as $, type AnchoredDrawingRecord as A, type BlockFragmentRecord as B, type ContentControlBoundaryRecord as C, type DrawingPoint as D, DEFAULT_TAB_INTERVAL_PT as E, DEFAULT_TAB_INTERVAL_TWIPS as F, EMPTY_TAB_STOPS as G, type FieldAtomMarker as H, type InlineDrawingRecord as I, type HeaderFooterStoryRecord as J, type LineSpacingRule as K, type LineRecord as L, type ModelRange as M, type ListMarkerRecord as N, MAX_BORDER_SPACE_PT as O, type PageGeometry as P, MAX_BORDER_WIDTH_PT as Q, type ResolvedRunStyle as R, type SemanticLayout as S, type TextMeasurer as T, MAX_PARAGRAPH_SPACING_PT as U, MAX_TABLE_BORDER_STROKES as V, MAX_TAB_POSITION_TWIPS as W, MAX_TAB_STOPS as X, PARAGRAPH_BORDER_SIDES as Y, type ParagraphAutoSpacingContext as Z, type ParagraphBorderSide as _, type StyleSpanRecord as a, type ParagraphBottomBorderRecord as a0, type ParagraphIndent as a1, type ResolvedCellBorders as a2, type ResolvedTableBorderEdge as a3, type ResolvedTableBorderEdgeSegment as a4, type ResolvedUnderline as a5, SINGLE_LINE_SPACING as a6, type SourceRange as a7, TAB_LEADER_GLYPH as a8, type TabAlignment as a9, paragraphBorderStrokeWidthPt as aA, paragraphBorders as aB, paragraphBordersFingerprint as aC, paragraphBreaksBefore as aD, paragraphContextualSpacing as aE, paragraphFragmentsOf as aF, paragraphFragmentsOfBlocks as aG, paragraphLineSpacing as aH, paragraphSpacing as aI, paragraphTabStops as aJ, readBorderSide as aK, readCellBorders as aL, readTableBorders as aM, resolveBorderConflict as aN, resolveRunStyle as aO, resolveTableCellBorderGrid as aP, runStylesEqual as aQ, tabAdvanceWidth as aR, tabStopsFingerprint as aS, unionLayoutBoxes as aT, withDefaultTabInterval as aU, type TabDestination as aa, type TabLeader as ab, type TabStop as ac, type TableBorderSideName as ad, type TableBorderStrokeRecord as ae, type TableFragmentRecord as af, type VerticalAlign as ag, appliedSpaceBefore as ah, applyLineSpacing as ai, baselineShiftPtOf as aj, borderExtentPt as ak, borderWeight as al, bottomBorderExtentPt as am, cascadedParagraphBorders as an, cascadedTabStops as ao, collapsedSpaceBefore as ap, contentControlsOfLayout as aq, defaultTabIntervalFromSettings as ar, displayText as as, effectiveContentControlLock as at, fragmentsOfParagraph as au, lineAtPosition as av, linesOf as aw, measureDisplayText as ax, nextTabDestination as ay, paragraphBorderExtentPt as az, type TableRowFragmentRecord as b, type TableCellFragmentRecord as c, type SpanLinkRecord as d, type LayoutBox as e, type DrawingInsets as f, type ThemeFonts as g, type ParagraphSpacing as h, type ParagraphLineSpacing as i, type ParagraphBorderEdge as j, type ParagraphBorders as k, type ResolvedTabStops as l, type TableBorderSide as m, type InlineDrawingLayoutContext as n, type PageRecord as o, type ParagraphFragmentRecord as p, type CellBorderBox as q, type TableBorderBox as r, AUTO_PARAGRAPH_SPACING_PT as s, type BorderGridGeometry as t, type ContentControlGeometryFragment as u, type ContentControlLevel as v, type ContentControlLock as w, type ContentControlMappedType as x, DEFAULT_PAGE_GEOMETRY as y, DEFAULT_RUN_STYLE as z };
