import { F as FontConfiguration, E as EditorFontError, a as EditorCommand, C as CanResult, Z as ZoomMode } from './editor-25RmHnxu.cjs';
export { I as ImageContext, b as ImageCropPercent, c as ImageCropPermille, S as SelectedImageState, d as cropPercentFromCropPermille, e as cropPercentFromPermille, f as cropPercentFromSourceCrop, g as cropPermilleFromCropPercent, h as cropPermilleFromPercent, s as sourceCropFromCropPercent, v as validateImageCropPercent } from './editor-25RmHnxu.cjs';
import { L as LayoutShapingOptions } from './shaped-measurer-SIqZp-Ty.cjs';
import { P as PaginatedSurfaceOptions, O as OpenPaginatedResult, a as PaginatedSurface, T as TableCommandPlan, D as DocxEditorInstance } from './index-Beyo2mTa.cjs';
export { A as AnchorFrameOrigin, C as CHROME_GROUPS, b as CHROME_MENUS, c as CHROME_UNAVAILABLE_KEY, d as ChromeControl, e as ChromeControlId, f as ChromeControlState, g as ChromeGroup, h as ChromeGroupId, i as ChromeMenu, j as ChromeMenuEntry, k as ChromeMenuId, l as ChromeMenuItemEntry, m as ChromeMenuSeparatorEntry, n as ChromeMenuSubmenuEntry, o as ChromeSlotId, p as DEFAULT_TABLE_CHROME_DRAFT, q as DocxEditorConfig, E as EMU_PER_POINT, F as FinalizedImageOverlayInteraction, r as FontConfigurationBase, s as FontConfigurationFragment, t as FontLoadFailure, u as FontLoadFailureReason, v as FontMeasurementState, w as FontResolutionRequest, x as FontResolver, y as FontUrlSource, H as HyperlinkActivation, z as HyperlinkChromeHandlers, B as HyperlinkOps, I as IMAGE_OVERLAY_NUDGE_PT, G as IMAGE_OVERLAY_NUDGE_SHIFT_PT, J as ImageInteractionSession, K as ImageOverlayScrollPort, L as ImageResizeHandle, M as ImageResizeResult, N as LoadFontsRequest, Q as LoadFontsResult, R as MAX_RESOLVER_FAMILIES, S as OverlayFrameRect, U as PaginatedSurfaceState, V as RunTableChromeCommandResult, W as SelectedDrawingOverlayTarget, X as SurfaceFormatting, Y as SurfaceHyperlink, Z as SurfaceNavigation, _ as SurfaceOverlayCoordinates, $ as TABLE_BORDER_STYLE_OPTIONS, a0 as TABLE_BORDER_TARGET_OPTIONS, a1 as TABLE_BORDER_WIDTH_OPTIONS, a2 as TABLE_CHROME_SLOT_IDS, a3 as TableBorderStyleOption, a4 as TableBorderTargetOption, a5 as TableBorderTargetValue, a6 as TableBorderWidthOption, a7 as TableChromeDraft, a8 as TableChromePick, a9 as TableChromeSlotId, aa as TableInteractionLabelKey, ab as ToolbarCommandState, ac as WORD_DEFAULT_FONT, ad as applyTableChromePick, ae as blankDocumentBytes, af as canExecuteImageCommand, ag as captureImageMutationPreconditions, ah as chromeControlCount, ai as chromeMenuSlots, aj as chromeProbeForSlot, ak as chromeSlotId, al as commandForSlot, am as commandForSlotValue, an as commandForTableChromeSlotValue, ao as composeFontConfiguration, ap as computeImageResizeResult, aq as computeMovedImagePosition, ar as computeResizedImageExtentEmu, as as createDocxEditor, at as createFontSource, au as createImageOverlayScrollPort, av as cssPixelsToLayoutPoints, aw as defaultChromeGroups, ax as defaultTableLabel, ay as emuToOverlayPoints, az as executeImageCommand, aA as finalizeImageOverlayInteraction, aB as formattingBarChromeGroups, aC as isStaleImageInteractionCommit, aD as isTableChromeSlot, aE as layoutPointsToCssPixels, aF as loadFonts, aG as overlayFrameToSheetCssPixels, aH as pointsToEmu, aI as probeTableChromeCommand, aJ as resizePreservesAspect, aK as runSave, aL as runTableChromeCommand, aM as runTableCommand, aN as runToolbarCommand, aO as selectedDrawingOverlayTargetOf, aP as selectedImageStateOf, aQ as surfacePaintScale, aR as tableChromeIconPaths, aS as tableChromeLabelKeyForTarget, aT as tableChromeToolbarState, aU as tableChromeVisible, aV as tableCommandToolbarState, aW as toolbarCommandState, aX as toolbarCommandStates } from './index-Beyo2mTa.cjs';
import { A as AutomationCapabilities, a as AutomationHost } from './protocol-FAz_nPm_.cjs';
export { CollectReviewItems, EditorModule, EditorModuleRegistry, ReviewModuleContribution, resolveEditorModules } from './contracts/modules.cjs';
import { ColorValue } from './contracts/types.cjs';
import { h as TreeDocColorValue, d as DrawingPositionInput } from './tree-op-types-UOXlRUqQ.cjs';
export { i as IMAGE_WRAP_TARGETS, b as ImageWrapTarget } from './tree-op-types-UOXlRUqQ.cjs';
import { f as DocumentThemeColorEntry } from './tree-session-Cow6LjPn.cjs';
import { S as SemanticLayout } from './semantic-records-DC6V1U3T.cjs';
export { T as TextMeasurer } from './semantic-records-DC6V1U3T.cjs';
export { D as DEFAULT_IMAGE_RESOURCE_LIMITS, b as ImageDecodePort, c as ImageResourceLimits, R as RenderableImageMime, S as SupportedImageMime, a as VectorImageMime, r as resolveImageResourceLimits, d as resolveSvgIntrinsicSize, s as sniffImageMime, v as validateRasterHeader } from './image-resources-DwpNnTg3.cjs';
export { S as SectionProperties } from './semantic-cell-selection-CI3loBKq.cjs';
export { R as ReviewModelInput } from './review-support-rsyGP5-9.cjs';
export { N as NavigationCommand, S as SemanticPosition, a as SemanticSelection } from './semantic-interaction-B4HrJFQ2.cjs';
export { F as FieldShadingMode } from './semantic-paint-DdGGra4m.cjs';
import './contracts/document.cjs';
import './revision-projection-72ZApe-g.cjs';
import './ooxml-tree-BU0e3DVi.cjs';
import './review-reads-D3r3tnoo.cjs';
import './ooxml-package-CR5us6ad.cjs';
import './custom-node-writes-YqISlSRl.cjs';
import './hf-references-CgEOSw3i.cjs';
import './note-nodes-C6DLxlvj.cjs';
import './tree-store-B1lEkdXc.cjs';
import 'prosemirror-model';

interface LayoutShapingInstrumentation {
    readonly onFontByteCopy?: () => void;
    readonly onFontHash?: () => void;
    readonly onFontAdmission?: () => void;
}
/**
 * Normalize anything thrown during font work into an {@link EditorFontError}.
 *
 * One error type reaches consumers whether the failure came from resolution, admission or
 * shaping, so a host branches on `code` rather than on which layer happened to throw.
 */
declare function toEditorFontError(error: unknown): EditorFontError;
/** Adapt the published byte-source contract to the private deterministic layout snapshot. */
declare function createLayoutShaping(configuration: FontConfiguration, instrumentation?: LayoutShapingInstrumentation): Promise<LayoutShapingOptions>;
/**
 * Release a shaping environment's native resources.
 *
 * The shaper holds WASM memory that garbage collection cannot reclaim on its own, so a host that
 * builds shaping options must dispose them when the editor goes away. Safe on a shaper that has
 * no `dispose`.
 */
declare function disposeLayoutShaping(shaping: LayoutShapingOptions): void;

/** The engine paints at 96 px per inch (twips / 15, 1440 twips per inch). */
declare const PX_PER_INCH = 96;
/** Painted pixels per centimetre, derived from {@link PX_PER_INCH}. */
declare const PX_PER_CM: number;
/** Which measurement system the ruler shows. Drives both tick cadence and drag snapping. */
type RulerUnit = 'inch' | 'cm';
/** One tick on the ruler: where it sits, how tall it is, and its label if it carries one. */
interface RulerTick {
    /** Offset along the ruler in content pixels. */
    readonly position: number;
    readonly height: number;
    /** Whole-unit label, omitted at the origin and on minor ticks. */
    readonly label?: string;
}
/**
 * Ticks across one page dimension, matching the legacy cadence: eighth-inch
 * minors with labelled inches, or millimetre minors with labelled centimetres.
 */
declare function generateRulerTicks(lengthPx: number, unit: RulerUnit): RulerTick[];
/** The first page's box, which the rulers measure against. */
declare function rulerPageBox(pages: readonly {
    readonly index: number;
    readonly box: {
        width: number;
        height: number;
    };
}[]): {
    width: number;
    height: number;
} | null;

/** Twips per inch, as OOXML defines them. */
declare const TWIPS_PER_INCH = 1440;
/** Twips per centimetre, as Word rounds them. */
declare const TWIPS_PER_CM = 567;
/** Word snaps ruler drags to the eighth-inch grid its ticks already draw. */
declare const SNAP_TWIPS_INCH: number;
/** The centimetre ruler's grid is the millimetre. */
declare const SNAP_TWIPS_CM: number;

/**
 * The four handles Word's ruler carries.
 *
 * `hanging` and `left` sit at the SAME position and differ only in what a drag takes with
 * them — the box moves the whole paragraph, the triangle leaves the first line where it is.
 */
type RulerIndentHandle = 'firstLine' | 'hanging' | 'left' | 'right';
/** A paragraph's indent as the ruler works with it. Twips; `firstLine` signed. */
interface RulerIndent {
    readonly left: number;
    readonly right: number;
    readonly firstLine: number;
}
/** The page the handles are placed against. Twips. */
interface RulerPageMetrics {
    readonly pageWidth: number;
    readonly leftMargin: number;
    readonly rightMargin: number;
}
/**
 * How a ruler drag resolves: which grid it snaps to, and whether it snaps at all.
 *
 * @public
 */
interface RulerDragOptions {
    /** Which snap grid applies. Defaults to inches. */
    readonly unit?: RulerUnit;
    /** Alt held: continuous, twip-precision drag, bypassing the snap grid — as in Word. */
    readonly precise?: boolean;
}
/** Where a handle sits, in twips from the page's LEFT SHEET EDGE (not the margin). */
declare function handlePosition(handle: RulerIndentHandle, indent: RulerIndent, page: RulerPageMetrics): number;
/** Round to the ruler's grid, or to the twip when the drag is precise. */
declare function snapTwips(value: number, unit: RulerUnit, precise: boolean): number;
/**
 * The indent a drag of `handle` to `positionTwips` produces.
 *
 * Clamps differ from the MARGIN drags this ruler also carries, and deliberately:
 *
 * - Indents may go NEGATIVE, pulling text into the margin, which Word allows. The floor is
 *   the sheet edge, not the margin.
 * - There is no minimum text width. The 720-twip floor the margin drags use mirrors an
 *   engine refusal that does not exist for indents, and enforcing one here would make a
 *   narrow pull-quote unreachable. Left and right markers may MEET; they may not cross.
 * - The left box needs a first-line clamp of its own. It does not move `firstLine`, so on a
 *   hanging paragraph dragging the box left can push the first-line marker off the sheet
 *   while the box itself is still in range. The drag stops when the LEADING marker lands.
 */
declare function dragIndent(handle: RulerIndentHandle, positionTwips: number, indent: RulerIndent, page: RulerPageMetrics, options?: RulerDragOptions): RulerIndent;

/**
 * Mount a paginated surface over DOCX bytes.
 *
 * Returns a typed rejection rather than throwing: a failure here is a property of the file,
 * and a host must be able to tell "not a package" from "no body" without parsing an error
 * message.
 */
declare function mountPaginatedSurface(container: HTMLElement, bytes: Uint8Array, options?: PaginatedSurfaceOptions): OpenPaginatedResult;

/** Planner-backed can/plan pair — production gate for table commands. Task 9 maps chrome slots. */
declare function tableCommandState(command: EditorCommand, surface: PaginatedSurface): {
    readonly can: CanResult;
    readonly plan: TableCommandPlan;
};

/**
 * What a browser host can do.
 *
 * `selection`, `scrolling` and `layout` are true because a mounted editor genuinely has a
 * caret, a scroll container and paginated layout — a consumer may branch on them. The
 * DOCUMENT operations behave identically to the headless host regardless; the extra
 * capabilities widen what may be asked later, never what an existing operation means.
 */
declare const BROWSER_AUTOMATION_CAPABILITIES: AutomationCapabilities;
/**
 * An automation host over a live editor.
 *
 * The editor keeps its own lifetime: `dispose()` on the returned host releases the change
 * subscription this adapter took and leaves the editor mounted and editable.
 */
declare function createBrowserAutomationHost(editor: DocxEditorInstance): AutomationHost;

/** Clamp and validate an OOXML theme modifier fraction (0, 1]. */
declare function validateThemeModifier(value: unknown): value is number;
/** Blend toward white. `keep` is the fraction of the base colour retained (OOXML themeTint byte). */
declare function applyThemeTint(hex: string, keep: number): string;
/** Blend toward black. `keep` is the fraction of the base colour retained (OOXML themeShade byte). */
declare function applyThemeShade(hex: string, keep: number): string;
/** Resolve a theme colour to literal hex. When both tint and shade are present, ECMA-376
 *  §17.3.2.6 / §17.3.4 / §17.3.5 require tint precedence — shade is ignored for paint. */
declare function resolveThemeColorHex(color: Extract<ColorValue, {
    kind: 'theme';
}>, themeColors: readonly DocumentThemeColorEntry[]): {
    ok: true;
    hex: string;
} | {
    ok: false;
    reason: string;
};
type ColorLowerRefusal = {
    readonly ok: false;
    readonly reason: string;
};
/**
 * A public colour lowered for a border or fill op, or the reason it could not be.
 *
 * Refusals happen because paint needs a literal: a theme colour the document's theme does not
 * define has no hex to draw, and inventing one would show a border in a colour the file never
 * named.
 */
type ColorLowerResult = {
    readonly ok: true;
    readonly color: TreeDocColorValue;
} | ColorLowerRefusal;
/**
 * Lower a public colour for table border ops. Theme colours require a resolved literal for
 * paint; `auto` preserves OOXML automatic semantics with a black render fallback.
 */
declare function lowerColorValueForBorder(color: ColorValue, themeColors: readonly DocumentThemeColorEntry[]): ColorLowerResult;
/**
 * Lower a public colour for cell fill. `auto` refuses because the cascade literal
 * cannot be named honestly at commit time.
 */
declare function lowerColorValueForFill(color: ColorValue, themeColors: readonly DocumentThemeColorEntry[]): ColorLowerResult;
/** Resolve any public colour to a CSS `#RRGGBB` string for chrome display. */
declare function resolveColorValueToCss(color: ColorValue | undefined | null, themeColors: readonly DocumentThemeColorEntry[], defaultHex?: string): string;

/** Surface sizing derived from layout records, in layout points (not CSS pixels). */
interface SurfaceExtent {
    /** Width the surface container should occupy. */
    readonly width: number;
    /** Total document height (always from every page, for scroll extent). */
    readonly height: number;
    /**
     * Extra horizontal offset per page, in layout points, so narrower sheets centre inside a
     * mixed-width materialized window. Absent entries mean no offset beyond layout `box.x`.
     */
    readonly pageOffsetX: ReadonlyMap<number, number>;
}
/**
 * How wide and tall the paginated surface should be.
 *
 * When `materialize` is set — virtualization is active — width follows only those pages so a
 * distant landscape section does not stretch a portrait viewport. Without it (print, export,
 * tests with no scroller) every page contributes, which is the safe reading.
 */
declare function surfaceExtent(layout: SemanticLayout, materialize: ReadonlySet<number> | undefined): SurfaceExtent;

/** The narrowest scale the editor contract accepts. One definition, every user. */
declare const ZOOM_MIN = 0.1;
/** The widest scale the editor contract accepts. */
declare const ZOOM_MAX = 5;
/**
 * Fit the page width, but never magnify and never shrink past legibility: the default.
 *
 * A wide container keeps the 100% it has always had, and only one too narrow to hold the
 * sheet shrinks. Uncapped fitting would render a Letter page at 183% on a 1600px monitor,
 * which is a reader app, not Word; unfloored fitting would render it at 20% beside an open
 * comments rail on a phone.
 */
declare const AUTO_ZOOM_MODE: ZoomMode;
/**
 * Fit the page width in BOTH directions — the uncapped fit, unlike `'auto'`.
 *
 * A shared constant rather than a literal per call site: modes are compared by value, but a
 * control also has to render its own selected state, and two spellings of one mode in two
 * files is how a menu ends up ticking a row the editor is not in.
 */
declare const FIT_WIDTH_ZOOM_MODE: ZoomMode;
/**
 * Normalize the `'auto'` shorthand a host may pass anywhere a {@link ZoomMode} is accepted.
 *
 * Returns `null` for a value that is neither, so callers refuse rather than silently
 * substituting a mode the caller did not ask for.
 */
declare function resolveZoomMode(mode: ZoomMode | 'auto'): ZoomMode | null;
/**
 * Whether two modes say the same thing.
 *
 * `snapshotsEqual` compares `zoomMode` by IDENTITY, and a host's `zoomMode` prop is an object
 * — `<DocxEditor zoomMode={{ type: 'fit', fit: 'pageWidth' }} />` is a fresh literal on every
 * render, which is the spelling the docs show. Without a value comparison somewhere, each of
 * those renders reinstalled the observer, refitted, bumped the tick, and re-rendered every
 * `useEditorState` consumer in the tree — including the page selector that the slice
 * memoization exists to keep asleep. The lane holds its object and compares by value here.
 */
declare function sameZoomMode(a: ZoomMode, b: ZoomMode): boolean;

/** Validate a position input, refusing offsets or bases outside what OOXML allows. */
declare function validateDrawingPositionInput(position: DrawingPositionInput): boolean;
/** Legal `relativeFrom` bases for a horizontal offset (page, margin, column, character, …). */
declare const DRAWING_REL_FROM_H: readonly string[];
/** Legal `relativeFrom` bases for a vertical offset (page, margin, paragraph, line, …). */
declare const DRAWING_REL_FROM_V: readonly string[];
/** Whether an image-properties command carries any positioning fields at all. */
declare function propertiesCommandHasPositionFields(command: {
    readonly horizontalEmu?: number;
    readonly verticalEmu?: number;
    readonly relativeToH?: string;
    readonly relativeToV?: string;
}): boolean;
/** Extract the position input from an image-properties command, or null when it carries none. */
declare function positionInputFromPropertiesCommand(command: {
    readonly horizontalEmu?: number;
    readonly verticalEmu?: number;
    readonly relativeToH?: string;
    readonly relativeToV?: string;
}, selected: {
    readonly position?: DrawingPositionInput | null;
} | null): DrawingPositionInput;
/** Validate a set-position command before it reaches the store. */
declare function validateSetImagePositionCommand(command: {
    readonly horizontalEmu?: number;
    readonly verticalEmu?: number;
    readonly relativeToH?: string;
    readonly relativeToV?: string;
}, mode: 'frame' | 'simple'): boolean;

export { AUTO_ZOOM_MODE, BROWSER_AUTOMATION_CAPABILITIES, type ColorLowerResult, DRAWING_REL_FROM_H, DRAWING_REL_FROM_V, DocxEditorInstance, DrawingPositionInput, FIT_WIDTH_ZOOM_MODE, OpenPaginatedResult, PX_PER_CM, PX_PER_INCH, PaginatedSurface, PaginatedSurfaceOptions, type RulerDragOptions, type RulerIndent, type RulerIndentHandle, type RulerPageMetrics, type RulerTick, type RulerUnit, SNAP_TWIPS_CM, SNAP_TWIPS_INCH, type SurfaceExtent, TWIPS_PER_CM, TWIPS_PER_INCH, ZOOM_MAX, ZOOM_MIN, applyThemeShade, applyThemeTint, createBrowserAutomationHost, createLayoutShaping, disposeLayoutShaping, dragIndent, generateRulerTicks, handlePosition, lowerColorValueForBorder, lowerColorValueForFill, mountPaginatedSurface, positionInputFromPropertiesCommand, propertiesCommandHasPositionFields, resolveColorValueToCss, resolveThemeColorHex, resolveZoomMode, rulerPageBox, sameZoomMode, snapTwips, surfaceExtent, tableCommandState, toEditorFontError, validateDrawingPositionInput, validateSetImagePositionCommand, validateThemeModifier };
