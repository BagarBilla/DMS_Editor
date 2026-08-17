import { O as OoxmlNode, a as OoxmlElement, o as OoxmlDrawingNode, b as OoxmlContentControlNode, d as OoxmlContentControlContentNode, p as OoxmlContentControlEndPropertiesNode, q as OoxmlContentControlPropertiesNode, e as OoxmlPart } from './ooxml-tree-BU0e3DVi.cjs';

/** The relationship namespace `r:id` lives in. */
declare const OFFICE_RELATIONSHIP_NAMESPACE_URI = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
/** The `Type` a hyperlink relationship declares. */
declare const HYPERLINK_RELATIONSHIP_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink";
/**
 * What a part's relationships answer for one `r:id`: the authored target and whether the
 * package declared it external. `null` for an id the part does not declare — a DANGLING
 * relationship, which is a real thing in real documents.
 */
type RelationshipTargetResolver = (relationshipId: string) => {
    readonly target: string;
    readonly external: boolean;
    /**
     * The PACKAGE's own verdict on this target (`validateExternalTarget`): whether it is an
     * absolute URI with a safe scheme.
     *
     * Carried separately because `sanitizeHref` cannot answer it. That function is a SCHEME
     * allowlist and deliberately admits relative URLs — the right rule for a value the host
     * authored, and the wrong one for a value a `.docx` did. A file-supplied
     * `Target="/admin/delete-account"` has no scheme to refuse, so it would pass the
     * allowlist and resolve against the EMBEDDING APPLICATION'S origin: a link reading
     * "Company policy" that issues an authenticated same-origin request to whatever host
     * app the editor is mounted in. Absent, a target is treated as unverified.
     */
    readonly sinkSafe?: boolean;
} | null;
/**
 * What a hyperlink points at, which decides what activating it may do.
 *
 * The security-relevant split: an `external` link goes through `sanitizeHref` and opens only on
 * explicit user action, while an anchor merely scrolls and never navigates.
 */
type HyperlinkKind = 
/** `r:id` → a relationship with `TargetMode="External"`. Opens somewhere else. */
'external'
/** `w:anchor` → a bookmark in this document. Scrolls, never navigates. */
 | 'internal'
/**
 * `r:id` naming a relationship the part does not declare, or one that is not external.
 *
 * The link keeps its runs — the text is never lost twice — but there is nothing to
 * activate, so it paints inert exactly like a refused scheme.
 */
 | 'unresolved';
/** A resolved hyperlink: its kind, its target, and the tooltip Word shows on hover. */
interface HyperlinkTarget {
    readonly kind: HyperlinkKind;
    /**
     * The authored target, verbatim: the relationship's `Target` for an `r:id` link, the
     * anchor name for an internal one. Save re-emits from the tree, never from this — it is
     * here so a UI can show what the document actually says.
     */
    readonly authored: string;
    /**
     * The sanitized runtime projection, or `null` when there is nothing safe to navigate to.
     * The ONLY value permitted in a DOM `href`, `window.open`, or a copied link.
     */
    readonly href: string | null;
    /** `w:anchor`, for an internal link. */
    readonly anchor?: string;
    /** `w:tooltip` — Word's hover text; paint puts it on the anchor's `title`. */
    readonly tooltip?: string;
    /** The authored `r:id`, so an edit can rewrite the relationship it names. */
    readonly relationshipId?: string;
}
/** Whether a node is a typed `w:hyperlink`. */
declare function isHyperlinkNode(node: OoxmlNode): boolean;
/** A typed hyperlink's `w:anchor`, or undefined. */
declare function hyperlinkAnchorOf(link: OoxmlNode): string | undefined;
/** A typed hyperlink's `r:id`, or undefined. */
declare function hyperlinkRelationshipIdOf(link: OoxmlNode): string | undefined;
/**
 * Read a typed `w:hyperlink` into its target record.
 *
 * `r:id` wins over `w:anchor` when a link carries both, matching Word: the relationship
 * names the document and the anchor names a place inside it, so the pair is a link to a
 * bookmark in ANOTHER file — which this engine will not follow, but whose external half is
 * the part that decides where it points.
 *
 * A link with neither is `unresolved`: it paints its runs and does nothing.
 */
declare function hyperlinkTargetOf(link: OoxmlNode, resolve: RelationshipTargetResolver): HyperlinkTarget;

interface DrawingProjectionLimits {
    readonly maxCompatibilityBranches: number;
    readonly maxVisitedElements: number;
    readonly maxDrawingDepth: number;
}
interface DrawingDiagnostic {
    readonly code: 'malformed-drawing' | 'unsupported-graphic' | 'unresolvable-frame' | 'invalid-geometry' | 'resource-refused' | 'wrap-polygon-over-limit' | 'wrap-polygon-malformed';
    readonly nodeId: string;
    readonly detail: string | null;
}

/**
 * The renderable subset of a `wps:wsp` non-picture graphic: closed polygon subpaths
 * (`a:custGeom` with move/line/close verbs only, or `a:prstGeom prst="rect"`) with a
 * solid sRGB fill and/or stroke. Anything richer (curves, theme fills, text bodies,
 * rotation) projects as `null` and paints the labelled placeholder instead.
 */
interface VectorShapeProjection {
    /** The drawing extent that frames the subpath coordinate space. */
    readonly extentEmu: Readonly<{
        cx: number;
        cy: number;
    }>;
    /** Closed subpath polygons in extent-EMU space; fill rule is even-odd. */
    readonly subpathsEmu: readonly (readonly Readonly<{
        x: number;
        y: number;
    }>[])[];
    /** Validated 6-digit sRGB hex (no `#`), or null for no fill. */
    readonly fillHex: string | null;
    /** Validated 6-digit sRGB hex (no `#`), or null for no stroke. */
    readonly strokeHex: string | null;
    /** Stroke width in EMU; 0 when absent. */
    readonly strokeWidthEmu: number;
}
/**
 * The story carried by a `wps:wsp` text box (`wps:txbx` → `w:txbxContent`).
 *
 * The projection captures only the story root and the shape chrome reads; it never walks the
 * story content, so the per-drawing element budget is not spent on paragraphs. Layout collects
 * blocks from `content` under its own caps.
 */
interface TextboxStoryProjection {
    /** Canonical node id of the `w:txbxContent` element. */
    readonly contentNodeId: string;
    /** The `w:txbxContent` element itself; treated as an opaque story root here. */
    readonly content: OoxmlElement;
    /** `wps:bodyPr` insets with the OOXML defaults (91440 EMU l/r, 45720 EMU t/b) when absent. */
    readonly insetsEmu: Readonly<{
        top: number;
        right: number;
        bottom: number;
        left: number;
    }>;
    /** `wps:bodyPr/@anchor` collapsed to the three renderable positions; default top. */
    readonly verticalAnchor: 'top' | 'center' | 'bottom';
    /** Autofit child of `wps:bodyPr`; extent stays authoritative either way (diagnostic only). */
    readonly autofit: 'none' | 'shape' | 'normal';
    /** Solid fill of the hosting shape, painted behind the story; null for no fill. */
    readonly fillHex: string | null;
    /** Solid outline of the hosting shape; null for no outline. */
    readonly strokeHex: string | null;
    /** Outline width in EMU; 0 when absent. */
    readonly strokeWidthEmu: number;
}

/**
 * Whether a drawing sits in the text flow or is positioned against a frame.
 *
 * The distinction that decides everything downstream: an inline drawing occupies a character
 * position, while an anchored one has offsets relative to a page, margin or column.
 */
type DrawingKind = 'inline' | 'anchored';
/** Nine Word wrap menu targets (inline plus eight floating modes). @public */
type ImageWrapTarget = 'inline' | 'square' | 'squareLeft' | 'squareRight' | 'tight' | 'through' | 'topAndBottom' | 'behind' | 'inFront';
/** Every text-wrap mode a drawing may be set to, including `inline`. */
declare const IMAGE_WRAP_TARGETS: readonly ImageWrapTarget[];
type DrawingWrapElement = 'none' | 'square' | 'tight' | 'through' | 'topAndBottom';
type DrawingHorizontalReferenceFrame = 'character' | 'column' | 'insideMargin' | 'leftMargin' | 'margin' | 'outsideMargin' | 'page' | 'rightMargin';
type DrawingVerticalReferenceFrame = 'bottomMargin' | 'insideMargin' | 'line' | 'margin' | 'outsideMargin' | 'page' | 'paragraph' | 'topMargin';
/** `a:srcRect` — how much of each edge of the source image is cropped away, as fractions. */
interface SourceCrop {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
}
interface DrawingTransform {
    readonly rotationDegrees: number;
    readonly flipHorizontal: boolean;
    readonly flipVertical: boolean;
    /** Source `a:off` in EMU; defaults to origin when absent. */
    readonly offsetEmu: Readonly<{
        x: number;
        y: number;
    }>;
    /** Source `a:ext` in EMU; zero falls back to `wp:extent` at geometry time. */
    readonly extentEmu: Readonly<{
        cx: number;
        cy: number;
    }>;
}
/**
 * What a drawing refuses: selection, movement, resizing, aspect change.
 *
 * Read and honoured rather than advisory — chrome that offered a handle the store will refuse
 * would promise an edit that cannot happen.
 */
interface DrawingLocks {
    readonly select: boolean;
    readonly move: boolean;
    readonly resize: boolean;
    readonly changeAspect: boolean;
}
interface DrawingLocksInput {
    readonly select?: boolean;
    readonly move?: boolean;
    readonly resize?: boolean;
    readonly changeAspect?: boolean;
}
/**
 * An anchored drawing's position: offsets, and the frames they are relative to.
 *
 * The relative-to bases matter as much as the offsets. Writing an offset without preserving its
 * base re-anchors the drawing against a different reference and moves it somewhere nobody asked.
 */
interface DrawingPositionInput {
    /**
     * `'simple'` when `@simplePos="1"`: `horizontalEmu` / `verticalEmu` are authoritative
     * `wp:simplePos` x/y. `'frame'` (default) uses positionH/V relative frames.
     */
    readonly mode?: 'frame' | 'simple';
    readonly horizontalEmu?: number;
    readonly verticalEmu?: number;
    readonly relativeToH?: DrawingHorizontalReferenceFrame;
    readonly relativeToV?: DrawingVerticalReferenceFrame;
}
interface DrawingProjection {
    readonly drawingNodeId: string;
    readonly ownerPartName: string;
    readonly kind: DrawingKind;
    readonly relationshipId: string | null;
    readonly docPrId: number | null;
    readonly name: string;
    readonly title: string;
    readonly description: string;
    readonly hyperlinkHref: string | null;
    readonly hidden: boolean;
    readonly extentEmu: Readonly<{
        cx: number;
        cy: number;
    }>;
    readonly effectExtentEmu: Readonly<{
        top: number;
        right: number;
        bottom: number;
        left: number;
    }>;
    readonly inlineDistancesEmu: Readonly<{
        top: number;
        right: number;
        bottom: number;
        left: number;
    }>;
    readonly wrap: ImageWrapTarget;
    readonly wrapGeometry: DrawingWrapProjection | null;
    readonly position: DrawingPositionProjection | null;
    readonly anchor: Readonly<{
        simplePos: boolean;
        relativeHeight: number;
        behindDocument: boolean;
        layoutInCell: boolean;
        allowOverlap: boolean;
    }> | null;
    readonly picture: PictureProjection | null;
    readonly vectorShape: VectorShapeProjection | null;
    readonly textboxStory: TextboxStoryProjection | null;
    readonly locks: DrawingLocks;
    readonly effects: Readonly<{
        grayscale: boolean;
        brightness: number;
        contrast: number;
    }>;
    readonly compatibilityBranchNodeId: string | null;
    readonly diagnostics: readonly DrawingDiagnostic[];
}
interface DrawingAccessibility {
    readonly hidden: boolean;
    readonly decorative: boolean;
    readonly label: string | null;
}
interface DrawingPositionProjection {
    readonly simplePosition: Readonly<{
        xEmu: number;
        yEmu: number;
    }>;
    readonly horizontal: Readonly<{
        relativeFrom: DrawingHorizontalReferenceFrame;
        align: string | null;
        offsetEmu: number | null;
    }>;
    readonly vertical: Readonly<{
        relativeFrom: DrawingVerticalReferenceFrame;
        align: string | null;
        offsetEmu: number | null;
    }>;
}
interface DrawingWrapProjection {
    readonly element: DrawingWrapElement;
    readonly textSide: 'bothSides' | 'left' | 'right' | 'largest';
    readonly distancesEmu: Readonly<{
        top: number;
        right: number;
        bottom: number;
        left: number;
    }>;
    readonly polygon: readonly Readonly<{
        x: number;
        y: number;
    }>[];
}
interface PictureProjection {
    readonly embeddedRelationshipId: string | null;
    readonly linkedRelationshipId: string | null;
    readonly crop: SourceCrop;
    readonly fillMode: 'stretch' | 'tile';
    readonly transform: DrawingTransform;
    readonly presetGeometry: string | null;
}
/**
 * Project one `w:drawing` into the resolved shape layout and chrome read.
 *
 * Bounded throughout: extents, crops and nesting all come from a file. Returns a projection that
 * reports `hidden` and its locks rather than throwing, so an unusable drawing degrades to
 * something the surface can skip.
 */
declare function projectDrawing(drawing: OoxmlDrawingNode, context: Readonly<{
    ownerPartName: string;
    supportedMcRequires: ReadonlySet<string>;
    limits: DrawingProjectionLimits;
    namespaceScope?: ReadonlyMap<string, string>;
    resolveRelationship?: RelationshipTargetResolver;
}>): DrawingProjection | null;

/** How deep controls may nest before a walk stops descending. Shared by every lane. */
declare const MAX_CONTENT_CONTROL_NESTING = 32;
/** Cap on controls one walk reports, so a hostile file cannot make a read unbounded. */
declare const MAX_CONTENT_CONTROLS_PER_PART = 10000;
/** `CT_SdtPr/w:id` is `ST_DecimalNumber`; Word treats it as a signed 32-bit integer. */
declare const CONTENT_CONTROL_ID_MAX = 2147483647;
/** `ST_Lock` (§17.5.2.24). An absent `w:lock` is `unlocked`. */
/**
 * `w:lock` — what a control refuses.
 *
 * `sdtLocked` protects the wrapper, `contentLocked` the text inside it, and `sdtContentLocked`
 * both. A control inside a locked one is locked in effect regardless of its own value.
 */
type ContentControlLock = 'unlocked' | 'sdtLocked' | 'contentLocked' | 'sdtContentLocked';
/**
 * What kind of control this is.
 *
 * `checkbox` is the Microsoft `w14:checkbox` extension rather than an ECMA-376 type
 * element, and the two are not mutually exclusive with "declares no type": four controls
 * in the comprehensive fixture declare the extension and no `w:`-prefixed type, so a scan
 * that read only the ECMA-376 choice reported them untyped. `untyped` means the control
 * declares neither — a rich-text container, which is what Word treats it as.
 */
/** Which kind of control a `w:sdt` is, and therefore what a written value must look like. */
type ContentControlKind = 'richText' | 'plainText' | 'checkbox' | 'dropDownList' | 'comboBox' | 'date' | 'picture' | 'docPartObj' | 'docPartList' | 'group' | 'citation' | 'bibliography' | 'equation' | 'untyped';
/** One declared option of a dropdown or combo box: its display text and its stored value. */
interface ContentControlListItem {
    readonly displayText: string;
    readonly value: string;
}
/** A date picker's authored format and locale, for rendering and for parsing what it stores. */
interface ContentControlDateFormat {
    readonly fullDate?: string;
    readonly dateFormat?: string;
    readonly lid?: string;
    readonly storeMappedDataAs?: string;
    readonly calendar?: string;
}
/** One of a checkbox's two glyphs: the font and code point it is drawn with. */
interface ContentControlCheckboxState {
    /** The `w14:val` hex code point of the glyph, exactly as the control declares it. */
    readonly value: string;
    readonly font?: string;
}
/**
 * A checkbox's state and the two glyphs it chooses between.
 *
 * Both glyphs matter on a write: setting the value has to update `w14:checked` AND the run's
 * character, or the document's glyph and its recorded state disagree.
 */
interface ContentControlCheckbox {
    readonly checked: boolean;
    readonly checkedState?: ContentControlCheckboxState;
    readonly uncheckedState?: ContentControlCheckboxState;
}
/** `CT_DataBinding` — preserved metadata. Never resolved, never fetched. */
/** `w:dataBinding` — the custom-XML part and XPath a control's value is bound to. */
interface ContentControlDataBinding {
    readonly xpath?: string;
    readonly storeItemID?: string;
    readonly prefixMappings?: string;
}
/**
 * A control's whole `w:sdtPr`, projected into one typed shape.
 *
 * What every other lane reads instead of walking `localName` strings — which also means a Word
 * re-save that demotes the properties node to generic does not break the projection.
 */
interface ContentControlProperties {
    readonly type: ContentControlKind;
    readonly alias?: string;
    readonly tag?: string;
    /** `@w:val` of `w:id` when the file declares a parseable one. Never fabricated. */
    readonly id?: number;
    readonly lock: ContentControlLock;
    /** The glossary entry named by `w:placeholder/w:docPart`. Preserved, never loaded. */
    readonly placeholderDocPart?: string;
    readonly temporary: boolean;
    readonly showingPlaceholder: boolean;
    readonly dataBinding?: ContentControlDataBinding;
    readonly label?: string;
    readonly tabIndex?: number;
    /** Items a dropdown or combo box offers. Empty for every other type. */
    readonly listItems: readonly ContentControlListItem[];
    readonly lastValue?: string;
    readonly date?: ContentControlDateFormat;
    readonly multiLine?: boolean;
    readonly checkbox?: ContentControlCheckbox;
}
/** Whether a node is a `w:sdt` wrapper. */
declare function isContentControlNode(node: OoxmlNode): node is OoxmlContentControlNode;
/** Whether a node is a `w:sdtContent` — the container holding a control's actual content. */
declare function isContentControlContentNode(node: OoxmlNode): node is OoxmlContentControlContentNode;
/**
 * A `w:sdt` wrapper, TYPED or DEMOTED.
 *
 * Flattening predates typing and must not stop at a control the reader refused to type: a
 * demoted wrapper still renders its content in place in Word, so a walk that only saw the
 * typed kind would drop every paragraph inside a malformed control out of the story.
 */
declare function isContentControlWrapper(node: OoxmlNode): boolean;
/**
 * The children of a wrapper's `w:sdtContent`, typed or demoted, in order.
 *
 * The one place that knows a control's content is reached through an intermediate element,
 * so the four flattening walks (story blocks, layout, header/footer references, list
 * resolution) ask the same question rather than each re-deriving it.
 */
declare function contentControlContentChildren(wrapper: OoxmlNode): readonly OoxmlNode[];
/**
 * A container's children with every content-control wrapper flattened away, bounded in depth.
 *
 * ONE unwrap rule, for the places where a control sits between a container and the children that
 * container is defined in terms of. `CT_SdtRow` puts it between `w:tbl` and `w:tr`, `CT_SdtCell`
 * between `w:tr` and `w:tc`, and a walk that filtered on the child's kind dropped the row or cell
 * entirely: not measured, not painted, not addressable. Flattening at the point of the filter
 * means a controlled row is the same row to the grid pass, the pagination pass and the story walk.
 *
 * Returns the SAME array identity when there is nothing to unwrap, so the tables that carry no
 * controls — nearly all of them — allocate nothing and the incremental layout cache still sees
 * its own inputs.
 */
declare function flattenContentControls(children: readonly OoxmlNode[], maxDepth?: number): readonly OoxmlNode[];
/** A control's `w:sdtPr`, or null. Matches structurally, so a Word-demoted node still resolves. */
declare function contentControlPropertiesNodeOf(control: OoxmlNode): OoxmlContentControlPropertiesNode | undefined;
/** A control's `w:sdtEndPr` — the run properties applied to its closing marker. */
declare function contentControlEndPropertiesNodeOf(control: OoxmlNode): OoxmlContentControlEndPropertiesNode | undefined;
/** A control's `w:sdtContent`, or null when the wrapper has none. */
declare function contentControlContentNodeOf(control: OoxmlNode): OoxmlContentControlContentNode | undefined;
/** A signed 32-bit `ST_DecimalNumber`, or undefined when the file wrote something else. */
declare function parseContentControlId(raw: string | undefined): number | undefined;
/**
 * Read a control's properties.
 *
 * Total: a control with no `w:sdtPr` at all answers the same shape with the defaults an
 * absent property means, so no caller has to branch on the container's existence.
 */
declare function contentControlPropertiesOf(control: OoxmlNode): ContentControlProperties;
/** Where a control sits, read off what its content holds. */
type ContentControlLevel = 'block' | 'inline' | 'row' | 'cell' | 'empty';
/**
 * How deeply a control is nested inside other controls.
 *
 * Bounded by {@link MAX_CONTENT_CONTROL_NESTING}: nesting depth comes from a file and is a
 * recursion bound.
 */
declare function contentControlLevelOf(control: OoxmlNode): ContentControlLevel;
/** One control, plus how deeply it is nested and the controls that enclose it. */
interface ContentControlEntry {
    readonly node: OoxmlContentControlNode;
    /** 0 for a top-level control; the nesting depth otherwise. */
    readonly depth: number;
    /** Enclosing controls, outermost first. Empty at depth 0. */
    readonly ancestors: readonly OoxmlContentControlNode[];
}
/**
 * Every control under a node, in document order, bounded in depth and in count.
 *
 * ONE walk, shared. The nesting bound is the same one layout flattens with, so a control
 * a lane can address is a control every lane can address — and a file that nests past it
 * keeps its content in the tree (the serializer never stops) while no walk recurses
 * further.
 */
declare function contentControlsIn(root: OoxmlNode, options?: {
    readonly maxDepth?: number;
    readonly limit?: number;
}): readonly ContentControlEntry[];
/** Find one control by canonical node id, with the same bounded walk. */
declare function findContentControl(root: OoxmlNode, nodeId: string): ContentControlEntry | null;
/**
 * The plain text a control's content holds, in reading order.
 *
 * `w:delText` is excluded: struck text is not the control's value, and a dropdown whose
 * old item is still present as a tracked deletion would otherwise report both.
 */
declare function contentControlTextOf(control: OoxmlNode): string;
/**
 * Resolve the lock a position inherits from the controls enclosing it.
 *
 * CONSERVATIVE, because a template that says a field cannot be edited and sits inside a
 * section that says it cannot be removed means both. Each half of `ST_Lock` is taken
 * independently and the strongest wins, so an unlocked control inside a `contentLocked`
 * one is still content-locked — a nested control cannot grant a permission its parent
 * withheld, which is the only reading under which a lock is a lock.
 */
declare function resolveContentControlLock(chain: readonly ContentControlLock[]): ContentControlLock;
/** Whether a resolved lock forbids editing the content it covers. */
declare function lockForbidsEdit(lock: ContentControlLock): boolean;
/** Whether a resolved lock forbids removing the control itself. */
declare function lockForbidsRemoval(lock: ContentControlLock): boolean;
/**
 * `CT_SdtPr`'s declared child order (§17.5.2.38), followed by the type choice.
 *
 * Serialization re-emits children in tree order, so the ONLY way a write keeps the
 * sequence valid is to place the child it authors at its schema position — which is what
 * {@link orderedContentControlProperties} does.
 */
declare const CONTENT_CONTROL_PROPERTY_ORDER: readonly string[];
/**
 * Rebuild a `w:sdtPr`'s children in schema order.
 *
 * Modelled children sort to their declared position and the type element follows them,
 * as the sequence requires. Everything else — a `w15:repeatingSection`, a vendor
 * extension, the `w14:checkbox` that is not part of the ECMA-376 choice — keeps the order
 * it was authored in and follows the modelled block, so a write that touches one property
 * neither drops nor reorders anything it does not name.
 */
declare function orderedContentControlProperties(children: readonly OoxmlNode[]): readonly OoxmlNode[];
/**
 * The next `w:id` to write, seeded from the document's own maximum plus one.
 *
 * Never a clock, a timestamp, a random source or a hash: those collide with ids already
 * in the file and produce values Word rejects. Null when the document already reaches the
 * signed 32-bit bound, so the caller refuses rather than wrapping into a negative id.
 */
declare function allocateContentControlId(root: OoxmlNode): number | null;

/** The value a control accepts, by what kind of control it is. */
type ContentControlValueInput = {
    readonly kind: 'text';
    readonly text: string;
} | {
    readonly kind: 'listItem';
    readonly value: string;
} | {
    readonly kind: 'checkbox';
    readonly checked: boolean;
}
/** A calendar date, `YYYY-MM-DD` or a full ISO-8601 instant. */
 | {
    readonly kind: 'date';
    readonly iso: string;
};
/** The control types an insertion may author. Picture and repeating section are deferred. */
declare const INSERTABLE_CONTENT_CONTROL_TYPES: readonly ["richText", "plainText", "dropDownList", "comboBox", "date"];
type InsertableContentControlType = (typeof INSERTABLE_CONTENT_CONTROL_TYPES)[number];

/** Allowlisted OOXML table border line styles — store/layout authority. */
declare const TABLE_BORDER_STYLES: readonly ["single", "dashed", "dotted", "double", "triple", "thick"];
/**
 * One of the border line styles this engine draws.
 *
 * An ALLOWLIST, not the full `ST_Border` enumeration: a file may name any of the seventy-odd
 * OOXML border styles, and anything outside this set falls back rather than being passed through
 * to paint.
 */
type TableBorderStyle = (typeof TABLE_BORDER_STYLES)[number];

/** JSON-safe color input carried on table cell property ops. Theme/auto require a validated literal. */
/**
 * A colour as an op carries it: a literal, a theme reference, or automatic.
 *
 * Theme references stay references so the document keeps following its theme; flattening one to
 * hex at write time would freeze the resolved value into the file.
 */
type TreeDocColorValue = {
    readonly kind: 'hex';
    readonly value: string;
} | {
    readonly kind: 'theme';
    readonly slot: string;
    readonly resolvedHex: string;
    readonly tint?: number;
    readonly shade?: number;
} | {
    readonly kind: 'auto';
    readonly resolvedHex: string;
};
/** Which cell edges a selected-cell border op targets. */
/** Which edges a border op addresses — the four sides, the interiors, all, or clear. */
type TableBorderTarget = 'all' | 'outside' | 'inside' | 'none' | 'top' | 'bottom' | 'left' | 'right';
/** Concrete edge scopes that apply or clear a complete border spec. */
/** A {@link TableBorderTarget} that draws something — everything except clear. */
type TableBorderEdgeTarget = Exclude<TableBorderTarget, 'none'>;
/** Complete border spec for non-`none` selected-cell border scopes. Size is in eighths of a point. */
/** A complete border spec: style, width and colour. Ops carry all three, never a partial edit. */
interface TableBorderSpecInput {
    readonly style: TableBorderStyle;
    readonly size: number;
    readonly color: TreeDocColorValue;
}
/**
 * The accepted RUN property boundary (design D8), as the OOXML element names that carry it.
 *
 * An explicit allowlist rather than "any `w:rPr` child": a property outside D8 has no
 * resolver, no layout behavior and no support claim, so accepting it here would let an
 * operation assert support the engine does not have. Unknown properties still ROUND-TRIP —
 * they are generic nodes in the tree — they simply cannot be authored by an op.
 */
declare const ACCEPTED_RUN_PROPERTIES: readonly ["rFonts", "sz", "szCs", "color", "b", "bCs", "i", "iCs", "u", "strike", "dstrike", "highlight", "vertAlign", "position", "caps", "smallCaps", "spacing", "w", "kern"];
/** The accepted PARAGRAPH property boundary (design D8). */
declare const ACCEPTED_PARAGRAPH_PROPERTIES: readonly ["pStyle", "jc", "spacing", "ind", "tabs", "numPr", "keepNext", "keepLines", "widowControl", "pageBreakBefore", "shd"];
/**
 * One authored property: an element name plus its `w:`-namespace attributes.
 *
 * Modeled as name+attributes rather than a typed record per property because that is what
 * the tree holds, so an op maps to nodes without a lossy intermediate vocabulary. Attribute
 * VALUES are validated as XML text; their meaning is the resolver's business.
 */
/**
 * One property an op writes, as a name plus attributes.
 *
 * Deliberately structural rather than a typed union: the accepted property lists bound WHICH
 * properties may be written, so the shape itself does not need to enumerate them.
 */
interface OoxmlProperty {
    readonly localName: string;
    readonly attributes?: Readonly<Record<string, string>>;
}
/**
 * The identity of one revision WITHIN a part: `@w:id`, `@w:author` and `@w:date` together.
 *
 * `@w:id` is not unique and not author-scoped, so `(part, id)` alone would merge two authors'
 * distinct revisions; and one logical revision — a tracked row insertion — is deliberately
 * many elements sharing an id, which a uniqueness rule could not express at all.
 */
/**
 * How a tracked change is addressed: its numeric id plus the PART it lives in.
 *
 * Both, always — `@w:id` is unique only within a part, so an id alone names two revisions in any
 * package with a header or a comments part.
 */
interface RevisionAddress {
    readonly id: string;
    readonly author: string;
    /** Absent when the file wrote no `@w:date`; part of the identity either way. */
    readonly date?: string;
}
/** Who a tracked edit is attributed to. `CT_TrackChange` requires an author. */
/** The author and timestamp a tracked edit is recorded under. */
interface RevisionAttributionInput {
    readonly author: string;
    /** ISO-8601. Omitted writes no `@w:date`. */
    readonly date?: string;
}
/**
 * Every mutation the store accepts, as one JSON-safe discriminated union.
 *
 * The ONLY write path into a document. Each op addresses nodes by id plus UTF-16 offset, which is
 * what makes editing a paragraph inside a table cell no different from editing one at the top
 * level. Declarative and serializable, so the same op crosses a worker or transport boundary
 * unchanged.
 */
type TreeDocOp = {
    /**
     * Insert an SDT-wrapped TOC immediately before a body paragraph.
     * The initial cached result and any heading bookmarks land in one undo unit.
     */
    readonly op: 'insertToc';
    readonly beforeParagraphId: string;
    readonly instruction: string;
    readonly alias: string;
    readonly entries: readonly {
        readonly level: number;
        readonly text: string;
        readonly headingParagraphId: string;
        readonly bookmarkName: string;
        readonly pageNumberText: string;
    }[];
    readonly bookmarksToCreate: readonly {
        readonly paragraphId: string;
        readonly name: string;
    }[];
} | {
    readonly op: 'insertText';
    readonly paragraphId: string;
    readonly offset: number;
    readonly text: string;
    /**
     * Write this as a TRACKED insertion, attributed here.
     *
     * On the op rather than on the store, so suggesting stays a decision the surface makes
     * per edit and the write vocabulary stays explicit — a global "everything is tracked
     * now" flag is exactly what `DocEdits` refuses, because it makes the meaning of an op
     * depend on state the op does not carry.
     */
    readonly revision?: RevisionAttributionInput;
    /**
     * When set, the text belongs INSIDE this content control, whatever sits at the offset.
     *
     * A boundary offset is owned by the run that starts there, which at a control's trailing
     * edge is the run after the control — so an offset alone cannot say "append to this field",
     * the way it cannot say which run of a field result to format (see `targetRunIds`). A
     * caller that names the control gets the text in the control; one that does not gets the
     * plain offset rule, which is what a keystroke beside a field means.
     */
    readonly inside?: string;
    /**
     * Which side of a run BOUNDARY the text joins. Default `'left'` — Word's typing rule:
     * the next character takes the formatting of the character before the caret.
     *
     * `'right'` is for a caller that is not typing but placing text inside the run that
     * STARTS at the offset — the hyperlink editor rewriting a link's display text, where
     * landing left of the boundary would put the new text outside the link. Ignored when
     * the offset falls strictly inside a run, which has no boundary to choose.
     */
    readonly bias?: 'left' | 'right';
} | {
    readonly op: 'deleteText';
    readonly paragraphId: string;
    readonly start: number;
    readonly end: number;
    /** Write this as a TRACKED deletion — the characters stay, wrapped in `w:del`. */
    readonly revision?: RevisionAttributionInput;
} | {
    /**
     * Mark a paragraph's own MARK as inserted or deleted (`w:pPr/w:rPr/w:ins|w:del`,
     * §17.13.5). The change is to the paragraph break itself, so no character carries it.
     */
    readonly op: 'setParagraphMarkRevision';
    readonly paragraphId: string;
    readonly kind: 'ins' | 'del';
    readonly revision: RevisionAttributionInput;
} | {
    /**
     * Propose merging this paragraph into its PREDECESSOR by striking the predecessor's
     * mark. Addressed by the SECOND paragraph so a multi-paragraph delete marks each
     * paragraph's own predecessor rather than stamping the group head N times.
     */
    readonly op: 'proposeParagraphMerge';
    readonly paragraphId: string;
    readonly revision: RevisionAttributionInput;
} | {
    /**
     * Place one piece of comment markup at a model offset.
     *
     * Separate from the comment BODY, which lives in another part: this op is the story half
     * of a comment write, and the two are staged in one package transaction.
     */
    readonly op: 'insertCommentMarker';
    readonly paragraphId: string;
    readonly offset: number;
    readonly commentId: string;
    readonly marker: 'start' | 'end' | 'reference';
} | {
    /**
     * Accept one revision, resolving every site in this part that carries its triple.
     */
    readonly op: 'acceptRevision';
    readonly revision: RevisionAddress;
    /** When set, only wrappers with this element local name resolve (ins/del/moveFrom/moveTo). */
    readonly localName?: string;
} | {
    readonly op: 'rejectRevision';
    readonly revision: RevisionAddress;
    readonly localName?: string;
} | {
    /**
     * Accept every revision in the part, in ONE transaction and one history entry.
     *
     * Deliberately not a loop over `acceptRevision`: a reviewer who accepts a document's
     * changes made one decision, and one undo should restore all of them.
     */
    readonly op: 'acceptAllRevisions';
} | {
    readonly op: 'rejectAllRevisions';
} | {
    readonly op: 'insertTab';
    readonly paragraphId: string;
    readonly offset: number;
} | {
    readonly op: 'insertHardBreak';
    readonly paragraphId: string;
    readonly offset: number;
} | {
    readonly op: 'insertPageBreak';
    readonly paragraphId: string;
    readonly offset: number;
} | {
    /**
     * Insert an allowlisted page-number complex field at a UTF-16 offset.
     *
     * `PAGE_X_OF_Y` is PAGE + literal " of " + NUMPAGES in one undoable op. Non-page
     * instructions are refused — never authored through this path.
     */
    readonly op: 'insertPageField';
    readonly paragraphId: string;
    readonly offset: number;
    readonly field: 'PAGE' | 'NUMPAGES' | 'SECTIONPAGES' | 'PAGE_X_OF_Y';
} | {
    /**
     * Move a numbered paragraph to another `w:numPr/w:ilvl`.
     *
     * A list item's LEVEL is what selects its format out of `numbering.xml`, so this is
     * the op behind Increase/Decrease Indent on a list: the marker changes with it. A
     * paragraph carrying no `w:numPr` is refused rather than silently numbered.
     */
    readonly op: 'setListLevel';
    readonly paragraphId: string;
    readonly level: number;
} | {
    /**
     * Put a paragraph in a list, or take it out of one.
     *
     * `numId` names a `w:num` in `numbering.xml`; null removes `w:numPr` entirely, which
     * is what turning a bullet off means. Everything else in `w:pPr` survives.
     */
    /**
     * Run properties of the PARAGRAPH MARK (`w:pPr/w:rPr`, ECMA-376 17.3.1.29).
     *
     * The mark carries the formatting a paragraph's own pilcrow has, and Word keeps it
     * in step whenever formatting is applied to a whole paragraph. It is what a list
     * marker inherits its face from — so without it, sizing a bulleted paragraph leaves
     * the bullet at the old size.
     */
    readonly op: 'setParagraphMarkProperties';
    readonly paragraphId: string;
    readonly properties: readonly OoxmlProperty[];
} | {
    readonly op: 'setListNumbering';
    readonly paragraphId: string;
    readonly numId: string | null;
    readonly level?: number;
} | {
    readonly op: 'splitParagraph';
    readonly paragraphId: string;
    readonly offset: number;
} | {
    /**
     * Split one `w:p` at MANY offsets in a single op.
     *
     * Equivalent to applying `splitParagraph` at each offset from the last to the first,
     * but the paragraph's content is cut in one pass and the parent's child sequence is
     * rebuilt once. A plain-text paste is a paragraph mark per line: as individual ops,
     * a large paste rebuilt the body — and re-sliced the pasted text — once per line,
     * which is quadratic in paste size.
     */
    readonly op: 'splitParagraphMany';
    readonly paragraphId: string;
    /**
     * Non-decreasing UTF-16 offsets; each produces one paragraph boundary. A repeated
     * offset produces an empty paragraph between the two boundaries — a blank line.
     */
    readonly offsets: readonly number[];
} | {
    readonly op: 'joinParagraphs';
    readonly firstId: string;
    readonly secondId: string;
} | {
    readonly op: 'setRunProperties';
    readonly paragraphId: string;
    readonly start: number;
    readonly end: number;
    readonly properties: readonly OoxmlProperty[];
    /**
     * When set, format only these runs (field result ownership). Offset range still
     * gates the edit and drives edge splits; without this, multi-run field results that
     * share one atom offset would homogenise under a single property bag.
     */
    readonly targetRunIds?: readonly string[];
} | {
    readonly op: 'setParagraphProperties';
    readonly paragraphId: string;
    readonly properties: readonly OoxmlProperty[];
} | {
    /**
     * Set page-setup fields — page size, orientation, margins — on every targeted
     * `w:sectPr`: all of them (Word's "Apply to: Whole document", the default) or
     * only the one governing `anchorParagraphId`. A document whose write must reach
     * the implicit tail section gets a body-level `w:sectPr` minted as the body's
     * last child. Omitted fields are left exactly as authored per section. Explicit
     * dimensions are written literally; `orientation` WITHOUT dimensions swaps each
     * section's own (see `plannedSectionDimensions`), so distinct paper sizes
     * survive a whole-document flip.
     */
    readonly op: 'setSectionProperties';
    readonly pageWidthTwips?: number;
    readonly pageHeightTwips?: number;
    readonly orientation?: 'portrait' | 'landscape';
    readonly marginTopTwips?: number;
    readonly marginRightTwips?: number;
    readonly marginBottomTwips?: number;
    readonly marginLeftTwips?: number;
    /**
     * Word's "Apply to: This section": update only the section GOVERNING this
     * paragraph — the nearest mid-body `w:sectPr` at or after it, else the body-level
     * one. Absent means every section.
     */
    readonly anchorParagraphId?: string;
} | {
    /**
     * End a section AT this paragraph: mint a `w:pPr/w:sectPr` cloning the governing
     * section's effective page setup, so the blocks up to and including this paragraph
     * become their own section (a next-page section break). The paragraph must not
     * already carry one.
     */
    readonly op: 'setSectionMark';
    readonly paragraphId: string;
} | {
    /**
     * Wrap `[start, end)` of a paragraph in a `w:hyperlink`.
     *
     * The RANGE is the link — text and formatting inside it are untouched, and runs that
     * straddle either edge are divided so the link covers exactly the characters asked
     * for. Exactly one of `relationshipId` (an external target, already minted on the
     * package) or `anchor` (a bookmark in this document) names where it goes.
     *
     * A collapsed range is refused: a link with no text is markup with nothing to click,
     * and the caller that wants "insert a link with display text" inserts the text first.
     */
    readonly op: 'insertHyperlink';
    readonly paragraphId: string;
    readonly start: number;
    readonly end: number;
    readonly relationshipId?: string;
    readonly anchor?: string;
    readonly tooltip?: string;
    /**
     * Character style to mark the linked runs with (`w:rStyle`), normally `Hyperlink`.
     *
     * Written HERE rather than through `setRunProperties` because `w:rStyle` is preserved,
     * not accepted: it is not in the set a property write replaces, and putting it there
     * would make a later bold toggle delete it. Marking the text is part of making it a
     * link — Word does both in one operation — so the op that wraps it also styles it.
     * Omitted for a document that declares no such style.
     */
    readonly styleId?: string;
} | {
    /**
     * Re-aim an existing link. `relationshipId` moves it to another external target,
     * `anchor` to a bookmark; supplying one CLEARS the other, so a link never ends up
     * carrying both and resolving by the wrong one.
     */
    readonly op: 'setHyperlinkTarget';
    readonly linkId: string;
    readonly relationshipId?: string;
    readonly anchor?: string;
    readonly tooltip?: string;
} | {
    /**
     * Unlink: splice the `w:hyperlink`'s children into the paragraph in its place.
     *
     * The runs keep their identity, their formatting and their order, and any bookmark
     * markers inside the link stay exactly where they were. Only the link element goes,
     * which is what Word's Remove Hyperlink does — the text is not the link's, it was
     * only wrapped by it.
     */
    readonly op: 'removeHyperlink';
    readonly linkId: string;
} | {
    /**
     * Insert a NEW run-level content control at a text offset: `w:sdt` with a
     * `w:sdtPr` carrying the given tag (and alias/lock) and a `w:sdtContent`
     * holding one run of `text`.
     *
     * The write half of the custom-node contract (pro-review-and-custom-nodes):
     * a node's identity lives in `w:tag`, `sdtLocked` keeps Word users from
     * unwrapping the anchor, and the literal run text is what Word (and the
     * free tier) render. The TAG IS ATTACKER-ADJACENT ON READ but authored
     * here; it is written as an ordinary attribute value, so the serializer's
     * escaping covers it like every other attribute.
     */
    readonly op: 'insertInlineContentControl';
    readonly paragraphId: string;
    readonly offset: number;
    readonly tag: string;
    readonly text: string;
    readonly alias?: string;
    /** `w:lock` value; omitted writes no lock. */
    readonly lock?: 'sdtLocked' | 'sdtContentLocked' | 'contentLocked';
    /**
     * `w:dataBinding` — the customXml data part node this control mirrors.
     *
     * The payload half of the custom-node contract: `w:tag` caps at 64
     * characters, so anything larger lives in a data part and the control
     * points at it. All three attributes travel together because Word needs
     * all three — the store's `ds:itemID`, the XPath to the node's label, and
     * the prefix declaration that XPath's steps resolve through.
     *
     * A control that carries one is READ-ONLY in Word (verified against
     * `sdt-custom-node-databinding-word-roundtrip.docx`), and this engine
     * refuses content edits inside it for the same reason — see
     * `bindingRefusal`. That is what keeps the store and the page from
     * drifting: there is no edit that could move one without the other.
     *
     * Nothing here is resolved or fetched. The op writes the three strings and
     * the store lane owns the part they name.
     */
    readonly dataBinding?: {
        readonly prefixMappings: string;
        readonly xpath: string;
        readonly storeItemId: string;
    };
} | {
    /** Repeating-section item insert — unsupported at this layer (out of scope). */
    readonly op: 'addRepeatingSectionItem';
    readonly controlId: string;
    readonly index?: number;
} | {
    /** Repeating-section item remove — unsupported at this layer (out of scope). */
    readonly op: 'removeRepeatingSectionItem';
    readonly controlId: string;
    readonly index: number;
} | {
    /**
     * Remove a typed block and everything under it.
     *
     * Validation restricts this structural operation to `w:p`, `w:tbl`, and `w:tr`, and
     * refuses removals that would violate required-container or section-mark invariants.
     */
    readonly op: 'deleteBlock';
    readonly blockId: string;
} | {
    /**
     * Insert a fresh empty table immediately before a block-level paragraph.
     *
     * Before, never after, so the anchor paragraph stays as the block that follows the
     * table: a `w:tbl` is not a valid final child of a story container, and two tables
     * that end up adjacent merge into one when the file is reopened. When the anchor's
     * previous sibling is already a table, a separating empty paragraph is authored with
     * it, which is what Word does for the same reason.
     */
    readonly op: 'insertTable';
    readonly beforeParagraphId: string;
    readonly rows: number;
    readonly cols: number;
    /** Width of every grid column, in twips. The caller divides the content width. */
    readonly columnWidthTwips: number;
} | {
    /** Insert a fresh row above or below a canonical table row. */
    readonly op: 'insertTableRow';
    readonly tableId: string;
    readonly rowId: string;
    readonly where: 'above' | 'below';
    /** When present, author the row as a Word tracked insertion. */
    readonly revision?: RevisionAttributionInput;
} | {
    /** Delete one canonical table row; refuses the final row. */
    readonly op: 'deleteTableRow';
    readonly tableId: string;
    readonly rowId: string;
    /** Optional anchor cell for column-aware caret recovery after deletion. */
    readonly referenceCellId?: string;
    /** When present, retain the row and author a Word tracked deletion. */
    readonly revision?: RevisionAttributionInput;
} | {
    /** Insert one grid column left or right of a canonical `w:gridCol`. */
    readonly op: 'insertTableColumn';
    readonly tableId: string;
    readonly where: 'left' | 'right';
    readonly gridColumnId: string;
} | {
    /**
     * Insert one grid column beside a first-row reference cell when `w:tblGrid` is absent.
     * Synthesizes a canonical grid before mutation.
     */
    readonly op: 'insertTableColumn';
    readonly tableId: string;
    readonly where: 'left' | 'right';
    readonly referenceCellId: string;
} | {
    /** Delete one canonical grid column; refuses the final column. */
    readonly op: 'deleteTableColumn';
    readonly tableId: string;
    readonly gridColumnId: string;
} | {
    /**
     * Resize one internal divider between two adjacent canonical grid columns.
     * Preserves the pair total and sets fixed table layout.
     */
    readonly op: 'setTableColumnWidths';
    readonly tableId: string;
    readonly leftGridColumnId: string;
    readonly rightGridColumnId: string;
    readonly leftWidthTwips: number;
    readonly rightWidthTwips: number;
} | {
    /**
     * Resize the outer-right edge: last grid column, matching cells, and `w:tblW` total.
     */
    readonly op: 'setTableRightEdgeWidth';
    readonly tableId: string;
    readonly gridColumnId: string;
    readonly columnWidthTwips: number;
    readonly tableWidthTwips: number;
} | {
    /** Set one authored table row to an exact height in twips. */
    readonly op: 'setTableRowHeight';
    readonly tableId: string;
    readonly rowId: string;
    readonly heightTwips: number;
} | {
    /** Clear the active edge target on a bounded rectangular cell selection. */
    readonly op: 'setTableCellBorders';
    readonly tableId: string;
    readonly cellIds: readonly string[];
    readonly scope: 'none';
    readonly target: TableBorderEdgeTarget;
} | {
    /** Apply a complete border spec to the requested edge target. */
    readonly op: 'setTableCellBorders';
    readonly tableId: string;
    readonly cellIds: readonly string[];
    readonly scope: TableBorderEdgeTarget;
    readonly spec: TableBorderSpecInput;
} | {
    /** Write or remove direct selected-cell shading (`w:tcPr/w:shd`). */
    readonly op: 'setTableCellFill';
    readonly tableId: string;
    readonly cellIds: readonly string[];
    readonly color: TreeDocColorValue | null;
} | {
    /** Set direct selected-cell vertical alignment (`w:tcPr/w:vAlign`). */
    readonly op: 'setTableCellVerticalAlignment';
    readonly tableId: string;
    readonly cellIds: readonly string[];
    readonly alignment: 'top' | 'center' | 'bottom';
} | {
    /** Allocate an empty header/footer part and declare it on a section. Package-level. */
    readonly op: 'createHeaderFooter';
    readonly sectionIndex: number;
    readonly kind: 'header' | 'footer';
    readonly variant: 'default' | 'first' | 'even';
    /** When true, also set section `w:titlePg` in the same package transaction. */
    readonly titlePage?: boolean;
    /** When true, also set document `w:evenAndOddHeaders` in the same package transaction. */
    readonly evenAndOddHeaders?: boolean;
} | {
    /** Remove a section's declared header/footer reference; GC when orphaned. Package-level. */
    readonly op: 'deleteHeaderFooter';
    readonly sectionIndex: number;
    readonly kind: 'header' | 'footer';
    readonly variant: 'default' | 'first' | 'even';
} | {
    /** Drop a declared ref so the section inherits from the previous. Package-level. */
    readonly op: 'linkToPrevious';
    readonly sectionIndex: number;
    readonly kind: 'header' | 'footer';
    readonly variant: 'default' | 'first' | 'even';
} | {
    /** Clone an inherited part into a new declared reference. Package-level. */
    readonly op: 'unlinkFromPrevious';
    readonly sectionIndex: number;
    readonly kind: 'header' | 'footer';
    readonly variant: 'default' | 'first' | 'even';
} | {
    /**
     * Section/document furniture options: `titlePg`, header/footer distances on the
     * section; `evenAndOddHeaders` document-wide in settings. Package-level.
     */
    readonly op: 'setSectionFurnitureOptions';
    readonly sectionIndex?: number;
    readonly titlePage?: boolean;
    readonly evenAndOddHeaders?: boolean;
    readonly headerDistanceTwips?: number;
    readonly footerDistanceTwips?: number;
} | {
    /**
     * Insert a footnote or endnote: body reference + notes-part body (+ create the
     * notes part/rel/content-type when missing). Package-level; one ModelChange.
     */
    readonly op: 'insertNote';
    readonly noteKind: 'footnote' | 'endnote';
    readonly paragraphId: string;
    readonly offset: number;
} | {
    /**
     * Delete a note body and every matching reference (body, HF, other notes).
     * Package-level; one ModelChange.
     */
    readonly op: 'deleteNote';
    readonly noteKind: 'footnote' | 'endnote';
    readonly noteId: number;
} | {
    /** Convert a footnote ↔ endnote, reallocating id in the target part. Package-level. */
    readonly op: 'convertNote';
    readonly fromKind: 'footnote' | 'endnote';
    readonly noteId: number;
} | {
    /**
     * Convert every normal footnote↔endnote of `fromKind` in one package transaction.
     * One ModelChange / undo unit; bounded by notes-part size.
     */
    readonly op: 'convertAllNotes';
    readonly fromKind: 'footnote' | 'endnote';
} | {
    /**
     * Write a content control's VALUE, in the vocabulary its own type accepts.
     *
     * One transaction for the whole transition: the content, `w:showingPlcHdr`, and the
     * type's own record of the value (`@w:lastValue`, `@w:fullDate`, `w14:checked`) move
     * together, because a control whose glyph says checked and whose flag says unchecked is
     * a document Word and this engine read differently.
     */
    readonly op: 'setContentControlValue';
    readonly controlId: string;
    /** String is the editor-facing v2 form; structured input is the automation form. */
    readonly value: string | ContentControlValueInput;
} | {
    /**
     * Author the metadata a control carries: its tag, its title, its lock.
     *
     * `null` removes the property. Everything else in `CT_SdtPr` — the type payload, a data
     * binding, an extension this vocabulary does not model — survives in schema order.
     */
    readonly op: 'setContentControlProperties';
    readonly controlId: string;
    readonly tag?: string | null;
    readonly alias?: string | null;
    readonly lock?: ContentControlLock;
} | {
    /**
     * Remove a control. `keepContent` splices its content into its place — Word's own
     * "Remove content control" — and false takes the content with it.
     */
    readonly op: 'removeContentControl';
    readonly controlId: string;
    /** Defaults to true for the editor-facing v2 operation. */
    readonly keepContent?: boolean;
} | {
    /**
     * Wrap `[start, end)` of a paragraph in a new control of the named type.
     *
     * A control is a SIBLING of runs, never a thing inside one, so a range ending mid-run
     * splits that run at both edges first. The characters and their formatting are the ones
     * that were there; only the run boundaries move.
     */
    readonly op: 'insertContentControl';
    readonly paragraphId: string;
    readonly start: number;
    readonly end: number;
    readonly type: InsertableContentControlType;
    readonly tag?: string;
    readonly alias?: string;
    readonly lock?: ContentControlLock;
} | {
    /**
     * Author `w:footnotePr` / `w:endnotePr` at document (settings) or section scope.
     * Refuse endnote `pageBottom`. Package-level; does not invent props on unedited saves.
     */
    readonly op: 'setNoteProperties';
    readonly scope: 'document' | 'section';
    readonly sectionIndex?: number;
    readonly footnote?: {
        readonly numFmt?: string;
        readonly numRestart?: string;
        readonly position?: string;
        readonly numStart?: number;
    };
    readonly endnote?: {
        readonly numFmt?: string;
        readonly numRestart?: string;
        readonly position?: string;
        readonly numStart?: number;
    };
} | {
    readonly op: 'insertDrawing';
    readonly paragraphId: string;
    readonly offset: number;
    readonly drawing: OoxmlDrawingNode;
} | {
    readonly op: 'replaceDrawingResource';
    readonly drawingNodeId: string;
    readonly relationshipId: string;
} | {
    readonly op: 'deleteDrawing';
    readonly drawingNodeId: string;
    /** Suggesting-mode tracked deletion is refused; owned by typed-revisions-and-comments. */
    readonly revision?: RevisionAttributionInput;
} | {
    readonly op: 'resizeDrawing';
    readonly drawingNodeId: string;
    readonly extentEmu: {
        readonly cx: number;
        readonly cy: number;
    };
} | {
    readonly op: 'cropDrawing';
    readonly drawingNodeId: string;
    readonly crop: SourceCrop;
} | {
    readonly op: 'positionDrawing';
    readonly drawingNodeId: string;
    readonly position: DrawingPositionInput;
} | {
    readonly op: 'setDrawingWrap';
    readonly drawingNodeId: string;
    readonly wrap: ImageWrapTarget;
} | {
    readonly op: 'setDrawingMetadata';
    readonly drawingNodeId: string;
    readonly title: string;
    readonly description: string;
    /** Omitted preserves existing `a:hlinkClick`; null removes it; a URL needs a package transaction. */
    readonly hyperlink?: string | null;
} | {
    readonly op: 'setDrawingLocks';
    readonly drawingNodeId: string;
    readonly locks: DrawingLocksInput;
} | {
    readonly op: 'transformDrawing';
    readonly drawingNodeId: string;
    readonly action: 'rotateCW' | 'rotateCCW' | 'flipH' | 'flipV';
} | {
    /**
     * Replace a detected TOC field's cached result paragraphs and ensure heading bookmarks.
     * Preserves field chrome / instruction. One undo unit (phase A of TOC refresh).
     */
    readonly op: 'replaceTocResult';
    readonly tocId: string;
    readonly entries: readonly {
        readonly level: number;
        readonly text: string;
        readonly headingParagraphId: string;
        readonly bookmarkName: string;
        readonly pageNumberText: string;
    }[];
    readonly bookmarksToCreate: readonly {
        readonly paragraphId: string;
        readonly name: string;
    }[];
} | {
    /**
     * Rewrite page-number text runs inside existing TOC result paragraphs.
     * One undo unit (phase B of TOC refresh).
     */
    readonly op: 'rewriteTocPageNumbers';
    readonly tocId: string;
    readonly updates: readonly {
        readonly paragraphId: string;
        readonly pageNumberText: string;
    }[];
};
/** Drawing mutation ops from typed-drawings-and-images task 11. */
type DrawingTreeDocOp = Extract<TreeDocOp, {
    readonly op: 'insertDrawing' | 'replaceDrawingResource' | 'deleteDrawing' | 'resizeDrawing' | 'cropDrawing' | 'positionDrawing' | 'setDrawingWrap' | 'setDrawingMetadata' | 'setDrawingLocks' | 'transformDrawing';
}>;
/** Just the `op` discriminants, for dispatch tables and validation. */
type TreeDocOpKind = TreeDocOp['op'];
/** Every {@link TreeDocOpKind}, for validation and exhaustiveness checks. */
declare const TREE_DOC_OP_KINDS: readonly ["insertText", "deleteText", "setParagraphMarkRevision", "proposeParagraphMerge", "insertCommentMarker", "acceptRevision", "rejectRevision", "acceptAllRevisions", "rejectAllRevisions", "insertTab", "insertHardBreak", "insertPageBreak", "insertPageField", "setListLevel", "setListNumbering", "setParagraphMarkProperties", "splitParagraph", "splitParagraphMany", "joinParagraphs", "setRunProperties", "setParagraphProperties", "setSectionProperties", "setSectionMark", "insertHyperlink", "setHyperlinkTarget", "removeHyperlink", "setContentControlValue", "removeContentControl", "insertInlineContentControl", "addRepeatingSectionItem", "removeRepeatingSectionItem", "deleteBlock", "insertTable", "insertTableRow", "deleteTableRow", "insertTableColumn", "deleteTableColumn", "setTableColumnWidths", "setTableRightEdgeWidth", "setTableRowHeight", "setTableCellBorders", "setTableCellFill", "setTableCellVerticalAlignment", "createHeaderFooter", "deleteHeaderFooter", "linkToPrevious", "unlinkFromPrevious", "setSectionFurnitureOptions", "insertNote", "deleteNote", "convertNote", "convertAllNotes", "setNoteProperties", "setContentControlProperties", "insertContentControl", "insertDrawing", "replaceDrawingResource", "deleteDrawing", "resizeDrawing", "cropDrawing", "positionDrawing", "setDrawingWrap", "setDrawingMetadata", "setDrawingLocks", "transformDrawing", "insertToc", "replaceTocResult", "rewriteTocPageNumbers"];
/**
 * How far a committed op can reach, so layout can scope its work (task 5.2).
 *
 * `text-local` touches one paragraph's characters; `paragraph-local` changes one
 * paragraph's own properties; `flow-structural` changes the block sequence and can
 * repaginate everything after it; `global` invalidates every page that shares the
 * edited story (header/footer parts attached to many sections/pages).
 */
/**
 * How far an op's effects reach — what layout must re-do after it.
 *
 * The knob incremental layout turns: a `text-local` edit re-breaks one paragraph, while a
 * `global` one invalidates the document.
 */
type ImpactClass = 'text-local' | 'paragraph-local' | 'flow-structural' | 'global';
/**
 * What one applied op changed: the ids dirtied, created and deleted.
 *
 * These ids are what let layout and paint re-do only what moved instead of the whole document.
 */
interface TreeOpEffect {
    readonly dirty: readonly string[];
    readonly created: readonly string[];
    readonly deleted: readonly string[];
    readonly split?: {
        readonly from: string;
        readonly tail: string;
    };
    /** One entry per boundary of a many-way split, in document order. */
    readonly splits?: readonly {
        readonly from: string;
        readonly tail: string;
    }[];
    readonly join?: {
        readonly kept: string;
        readonly removed: string;
    };
    readonly dependencyKeys: readonly string[];
    readonly impact: ImpactClass;
    /** First post-edit caret paragraph for table column structural ops. */
    readonly caret?: {
        readonly paragraphId: string;
    };
}
/**
 * Why an op was refused.
 *
 * `not-adjacent-siblings` is the notable one: a join across table cells is refused rather than
 * silently merging content out of the cell that owned it.
 */
type TreeOpRejection = 'unknown-op' | 'unknown-paragraph' | 'not-a-paragraph' | 'offset-out-of-range' | 'invalid-range' | 'not-a-list-paragraph' | 'splits-surrogate-pair' | 'invalid-text' | 'unsupported-property' | 'invalid-property-value' | 'not-adjacent-siblings' | 'unknown-block' | 'not-a-block' | 'block-required' | 'carries-section-mark'
/** The transaction named a part the package does not hold. */
 | 'unknown-part'
/**
 * The transaction would have published a package that does not open: a relationship
 * pointing at a part nobody created, or a part with no declared content type.
 */
 | 'package-invariant'
/** No revision in this part carries the addressed `(id, author, date)` triple. */
 | 'unknown-revision'
/**
 * A matched revision is a kind whose accept/reject semantics are structural and not
 * implemented. Refusing is deliberate: removing the markup alone would report the decision
 * applied while leaving the row, cell, or section it describes untouched.
 */
 | 'unsupported-revision' | 'tree-invariant'
/** No content control in this part carries the addressed node id. */
 | 'unknown-content-control'
/** The addressed node exists and is not a `w:sdt`. */
 | 'not-a-content-control'
/**
 * A content control's `w:lock` — or one an enclosing control imposes — forbids this.
 *
 * The same code for an edit inside `contentLocked` content and for the removal of an
 * `sdtLocked` control: both are "the document says no", and the two halves are already
 * distinguished by which operation was refused.
 */
 | 'locked'
/** The control declares `w:dataBinding`; its value belongs to a custom XML part. */
 | 'bound'
/** The value offered is not one this control's type accepts. */
 | 'typeMismatch' | 'unknown-control' | 'unsupported'
/** Malformed lifecycle args / first-section link — mirrors Editor `invalidArgs`. */
 | 'invalidArgs'
/** The addressed table id is missing, duplicated, or not a typed table. */
 | 'unknown-table'
/** The addressed row id is missing or not a direct child of the table. */
 | 'unknown-row'
/** A table property container appears more than once on a typed node. */
 | 'duplicate-property-container'
/** Row insertion would split an active vertical-merge chain. */
 | 'vertical-merge-crossing'
/** Column edit refused because the table carries horizontal or vertical merges. */
 | 'table-has-merge'
/** The addressed grid column id is missing or ambiguous without `w:tblGrid`. */
 | 'unknown-grid-column'
/** The operation would exceed bounded table topology limits. */
 | 'resource-limit'
/** The addressed node is not a top-level `w:drawing`. */
 | 'not-a-drawing'
/** No `w:drawing` with this id exists in the part. */
 | 'unknown-drawing'
/** The drawing's graphic payload is not a supported picture. */
 | 'not-a-picture-drawing'
/** A lock flag or `@locked` forbids this mutation. */
 | 'drawing-locked'
/** Finite EMU extent, crop, or position value is out of range. */
 | 'invalid-drawing-value'
/** Insertion would cross a table-cell boundary or wrong story container. */
 | 'cross-cell-drawing'
/** Suggesting-mode drawing deletion is not implemented in this change. */
 | 'trackedDrawingDeletionUnsupported'
/** Hyperlink target creation or change needs an OPC relationship in a package transaction. */
 | 'packageTransactionRequired';
/** Whether an op applied, with the effect it produced or the reason it was refused. */
type TreeOpResult = {
    readonly ok: true;
    readonly part: OoxmlPart;
    readonly effect: TreeOpEffect;
} | {
    readonly ok: false;
    readonly reason: TreeOpRejection;
    readonly detail?: string;
};

export { contentControlTextOf as $, ACCEPTED_PARAGRAPH_PROPERTIES as A, type HyperlinkKind as B, type ContentControlKind as C, type DrawingProjection as D, type HyperlinkTarget as E, MAX_CONTENT_CONTROL_NESTING as F, OFFICE_RELATIONSHIP_NAMESPACE_URI as G, HYPERLINK_RELATIONSHIP_TYPE as H, type ImpactClass as I, type RelationshipTargetResolver as J, TABLE_BORDER_STYLES as K, TREE_DOC_OP_KINDS as L, MAX_CONTENT_CONTROLS_PER_PART as M, type TreeDocOpKind as N, type OoxmlProperty as O, type TreeOpEffect as P, allocateContentControlId as Q, type RevisionAddress as R, type SourceCrop as S, type TreeDocOp as T, contentControlContentChildren as U, type VectorShapeProjection as V, contentControlContentNodeOf as W, contentControlEndPropertiesNodeOf as X, contentControlLevelOf as Y, contentControlPropertiesNodeOf as Z, contentControlPropertiesOf as _, type TreeOpRejection as a, contentControlsIn as a0, findContentControl as a1, flattenContentControls as a2, hyperlinkAnchorOf as a3, hyperlinkRelationshipIdOf as a4, hyperlinkTargetOf as a5, isContentControlContentNode as a6, isContentControlNode as a7, isContentControlWrapper as a8, isHyperlinkNode as a9, lockForbidsEdit as aa, lockForbidsRemoval as ab, orderedContentControlProperties as ac, parseContentControlId as ad, projectDrawing as ae, resolveContentControlLock as af, type ImageWrapTarget as b, type DrawingKind as c, type DrawingPositionInput as d, type DrawingLocks as e, type DrawingHorizontalReferenceFrame as f, type DrawingVerticalReferenceFrame as g, type TreeDocColorValue as h, IMAGE_WRAP_TARGETS as i, type DrawingAccessibility as j, type DrawingTransform as k, type TableBorderStyle as l, type DrawingTreeDocOp as m, type ContentControlLevel as n, type ContentControlLock as o, type ContentControlDataBinding as p, type TreeOpResult as q, ACCEPTED_RUN_PROPERTIES as r, CONTENT_CONTROL_ID_MAX as s, CONTENT_CONTROL_PROPERTY_ORDER as t, type ContentControlCheckbox as u, type ContentControlCheckboxState as v, type ContentControlDateFormat as w, type ContentControlEntry as x, type ContentControlListItem as y, type ContentControlProperties as z };
