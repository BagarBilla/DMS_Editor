/**
 * One parsed XML node, preserving significant order, whitespace and raw lexical values.
 *
 * Attribute records have a NULL prototype: attribute names come from a file and become object
 * keys, so `__proto__` must be inert by construction rather than by filtering.
 */
type XmlNode = {
    readonly type: 'element';
    readonly name: string;
    readonly attributes: Readonly<Record<string, string>>;
    readonly children: readonly XmlNode[];
} | {
    readonly type: 'text';
    readonly value: string;
};
/**
 * Why XML was refused at the trust boundary.
 *
 * DTDs, entity declarations and external-entity references are PRE-rejected before parsing —
 * blocking XXE and billion-laughs by never handing the parser the construct, rather than by
 * trusting it to be configured safely.
 */
type XmlRejection = 'too-large' | 'dtd-forbidden' | 'entity-forbidden' | 'too-deep' | 'too-many-elements' | 'invalid-limits' | 'parse-error';
/** A parsed document, or a typed refusal. Never throws — the input is untrusted. */
type XmlResult = {
    readonly ok: true;
    readonly nodes: readonly XmlNode[];
} | {
    readonly ok: false;
    readonly reason: XmlRejection;
};
/** Per-part caps on size, element count and depth. Clamped into the hard ceilings. */
interface XmlLimits {
    readonly maxBytes: number;
    readonly maxElements?: number;
}
/** Read XML into an ordered tree, refusing DTDs/entities and bounding size. */
/**
 * Read XML at the trust boundary: bounded, entity-free, and fidelity-preserving.
 *
 * Pre-rejects DTDs and entity constructs, disables expansion and value coercion, and keeps child
 * order, attributes, whitespace and raw lexical form — everything a lossless re-emit needs.
 */
declare function readXml(xml: string, limits?: XmlLimits): XmlResult;
/** Find the first descendant element with the given qualified name. */
declare function findElement(nodes: readonly XmlNode[], name: string): Extract<XmlNode, {
    type: 'element';
}> | undefined;
/** All direct child elements with the given name. */
declare function childElements(node: Extract<XmlNode, {
    type: 'element';
}>, name: string): Extract<XmlNode, {
    type: 'element';
}>[];
/** Concatenated text content of an element (all descendant text nodes). */
declare function textContent(node: Extract<XmlNode, {
    type: 'element';
}>): string;

/** The WordprocessingML main namespace — the `w:` prefix in every `word/document.xml`. */
declare const WML_NAMESPACE_URI = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
/** The reserved `xml:` namespace, which carries `xml:space`. */
declare const XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
/** The reserved `xmlns:` namespace that namespace declarations themselves live in. */
declare const XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";
/** The `w14` wordml-2010 extension namespace — `w14:paraId`/`w14:textId` live here. */
declare const W14_NAMESPACE_URI = "http://schemas.microsoft.com/office/word/2010/wordml";
declare const DRAWINGML_MAIN_NAMESPACE_URI = "http://schemas.openxmlformats.org/drawingml/2006/main";
declare const WP_NAMESPACE_URI = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing";
declare const PIC_NAMESPACE_URI = "http://schemas.openxmlformats.org/drawingml/2006/picture";
/** The four content-position revision wrappers, which nest and carry runs. */
declare function isContentRevisionKind(kind: OoxmlNode['kind']): kind is 'revisionInsert' | 'revisionDelete' | 'revisionMoveFrom' | 'revisionMoveTo';
/** Move-range and comment-range boundary markers, which are empty and sit between runs. */
declare function isRangeMarkerKind(kind: OoxmlNode['kind']): kind is 'moveFromRangeStart' | 'moveFromRangeEnd' | 'moveToRangeStart' | 'moveToRangeEnd' | 'commentRangeStart' | 'commentRangeEnd';
/**
 * OOXML on/off toggle: on only when a same-namespace child is present and its `w:val`
 * (same namespace as the child) does not explicitly disable. Foreign-namespace siblings
 * with the same local name cannot turn the flag on.
 */
declare function readOnOffChild(parent: OoxmlNode, localName: string, namespaceUri?: string): boolean;

/**
 * A node's stable identity within its part.
 *
 * Minted deterministically from the structural path at parse, then RETAINED through structural
 * sharing — the same bytes always produce the same ids, and an edit elsewhere in the document
 * does not renumber untouched nodes. Every tree op addresses nodes by these.
 */
type OoxmlNodeId = string;
/**
 * One `xmlns:` declaration carried on a node.
 *
 * Preserved rather than normalized away: a document that binds `w14` at the root and a document
 * that binds it on a paragraph are different bytes, and re-emitting the wrong one is a fidelity
 * loss even though the semantics match.
 */
interface OoxmlNamespaceBinding {
    readonly prefix: string;
    readonly namespaceUri: string;
}
interface OoxmlAttributeBase {
    readonly namespaceUri: string;
    readonly localName: string;
    readonly prefix?: string;
    readonly value: string;
}
/** `xml:space`, which decides whether a run's leading and trailing whitespace survives. */
interface OoxmlXmlSpaceAttribute extends OoxmlAttributeBase {
    readonly kind: 'xmlSpace';
    readonly namespaceUri: typeof XML_NAMESPACE_URI;
    readonly localName: 'space';
    readonly prefix: 'xml';
    readonly value: 'default' | 'preserve';
}
/** `w:val` — the attribute nearly every WordprocessingML property carries its value in. */
interface OoxmlWmlValAttribute extends OoxmlAttributeBase {
    readonly kind: 'wmlVal';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'val';
}
/**
 * Any attribute outside the typed vocabulary, carried verbatim.
 *
 * Where losslessness actually happens: an attribute this engine has no model for is preserved
 * exactly rather than dropped, so a save re-emits what the file said.
 */
interface OoxmlGenericExtensionAttribute extends OoxmlAttributeBase {
    readonly kind: 'genericExtension';
}
/** Any attribute on any node: the two typed ones, plus the verbatim catch-all. */
type OoxmlAttribute = OoxmlXmlSpaceAttribute | OoxmlWmlValAttribute | OoxmlGenericExtensionAttribute;
/**
 * Attributes a TYPED node may carry.
 *
 * Excludes `w:val` on purpose: a node the engine models keeps its value in typed fields, and
 * allowing a stray `w:val` alongside them would create two sources of truth for one property.
 */
type OoxmlKnownNodeAttribute = OoxmlXmlSpaceAttribute | OoxmlGenericExtensionAttribute;
interface OoxmlElementBase<Children extends readonly OoxmlNode[] = readonly OoxmlNode[], Attributes extends readonly OoxmlAttribute[] = readonly OoxmlAttribute[]> {
    readonly id: OoxmlNodeId;
    readonly namespaceUri: string;
    readonly localName: string;
    /** Authored prefix retained as non-authoritative fidelity evidence. */
    readonly prefix?: string;
    /** Namespace declarations authored directly on this element, in source order. */
    readonly namespaceBindings: readonly OoxmlNamespaceBinding[];
    readonly attributes: Attributes;
    readonly children: Children;
}
/** `w:document` — the root of a main document part. */
interface OoxmlDocumentNode extends OoxmlElementBase<readonly (OoxmlBodyNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'document';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'document';
}
/** `w:body` — the main story's block content. */
interface OoxmlBodyNode extends OoxmlElementBase<readonly (OoxmlParagraphNode | OoxmlTableNode | OoxmlContentControlNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'body';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'body';
}
interface OoxmlTableNode extends OoxmlElementBase<readonly (OoxmlTablePropertiesNode | OoxmlTableGridNode | OoxmlTableRowNode | OoxmlContentControlNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'table';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'tbl';
}
interface OoxmlTableRowNode extends OoxmlElementBase<readonly (OoxmlTableCellNode | OoxmlContentControlNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'tableRow';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'tr';
}
interface OoxmlTableCellNode extends OoxmlElementBase<readonly (OoxmlParagraphNode | OoxmlTableNode | OoxmlContentControlNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'tableCell';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'tc';
}
/** Grid children (`w:gridCol`) stay generic: they are property leaves, not structure. */
interface OoxmlTableGridNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'tableGrid';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'tblGrid';
}
/** Property children stay generic, mirroring `runProperties`. */
interface OoxmlTablePropertiesNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'tableProperties';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'tblPr';
}
/**
 * `w:p` — a paragraph, and the unit every offset in this engine is relative to.
 *
 * Positions are addressed as this node's id plus a UTF-16 offset, which is what makes a paragraph
 * inside a table cell no different from one at the top level.
 */
interface OoxmlParagraphNode extends OoxmlElementBase<readonly (OoxmlParagraphPropertiesNode | OoxmlRunNode | OoxmlHyperlinkNode | OoxmlContentControlNode | OoxmlBookmarkStartNode | OoxmlBookmarkEndNode | OoxmlRevisionContentNode | OoxmlRangeMarkerNode | OoxmlFldSimpleNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'paragraph';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'p';
}
/**
 * `CT_Hyperlink` (ECMA-376 §17.16.22) — a RUN CONTAINER, not a leaf.
 *
 * Its runs are part of the paragraph's inline sequence: they measure, paint, select and
 * take offsets exactly like a run written directly under the `w:p`. Typing the element is
 * what lets them in; while it was generic, its runs never reached the token stream and the
 * words inside every link simply did not paint.
 *
 * Targets live in the ATTRIBUTES, and §17.16.22 declares exactly six. They divide into two
 * groups, and the difference is load-bearing:
 *
 *   MODELED    `r:id` (a relationship, resolved against the owning part's rels), `w:anchor`
 *              (a bookmark name in this document) and `w:tooltip`. These are the three the
 *              ops read and write — `setHyperlinkTarget` sets one target attribute and
 *              CLEARS the other, so a link never carries both and resolves by the wrong one.
 *
 *   PRESERVED  `w:tgtFrame`, `w:docLocation` and `w:history`. Nothing in this engine
 *              interprets them and no op names them; they survive because attributes are
 *              carried verbatim, and `setHyperlinkTarget` must leave them exactly as
 *              authored. That is a REQUIREMENT, not an incidental property of the current
 *              applier: `w:docLocation` names a location inside the target document, so
 *              silently dropping it on a retarget would change where a link goes.
 *              `hyperlink-lossless-editing.test.ts` pins both against a retarget.
 *
 * Nothing here is a runtime URL — the sanitized projection is computed separately (see
 * `hyperlinkTargetOf`), and only that reaches a DOM or navigation sink.
 *
 * Bookmark markers are admitted as children because Word writes them inside links; anything
 * else it can carry (a drawing, a field, a nested SDT) stays `generic` at its position, so a
 * link around a picture keeps both the picture and the link.
 *
 * A link may contain ANOTHER link: §17.16.22's content model is `EG_PContent`, which lists
 * `w:hyperlink` among its own members. That is why this child union is self-referential
 * rather than bottoming out at runs. Demoting the inner one to `generic` would have been the
 * easier type, and it would have reintroduced exactly the bug typing this element fixed —
 * a generic link's runs never reach the token stream, so the words inside it stop painting.
 * Every walk that descends a link therefore recurses (`segmentsOf`, `runsUnder`,
 * `runPropertyEdits`) instead of descending one level.
 */
interface OoxmlHyperlinkNode extends OoxmlElementBase<readonly (OoxmlRunNode | OoxmlHyperlinkNode | OoxmlContentControlNode | OoxmlBookmarkStartNode | OoxmlBookmarkEndNode | OoxmlRevisionContentNode | OoxmlRangeMarkerNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'hyperlink';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'hyperlink';
}
/**
 * A content-position revision wrapper — `w:ins`, `w:del`, `w:moveFrom`, `w:moveTo`.
 *
 * These wrap runs, so a walk that visits only direct `run` children never reaches
 * the content inside them. Typing them is what lets layout descend deliberately
 * rather than treating tracked content as unknown markup.
 *
 * ECMA-376 §17.13.5.18/.14/.25/.29. All four extend `CT_TrackChange`: `@w:id` and
 * `@w:author` are required, `@w:date` is optional and is never fabricated.
 *
 * The SAME element names appear in property positions — `w:pPr/w:rPr/w:ins` marks a
 * paragraph mark, `w:trPr/w:del` marks a row — where they carry no content and mean
 * something structurally different. Those stay generic; see `contentRevisionKind`.
 */
interface OoxmlRevisionContentNode extends OoxmlElementBase<readonly (OoxmlRunNode | OoxmlRevisionContentNode | OoxmlHyperlinkNode | OoxmlRangeMarkerNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'revisionInsert' | 'revisionDelete' | 'revisionMoveFrom' | 'revisionMoveTo';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'ins' | 'del' | 'moveFrom' | 'moveTo';
}
/**
 * `w:bookmarkStart` — a ZERO-LENGTH point anchor (`@w:id`, `@w:name`).
 *
 * It takes no text offset and paints nothing; it only marks a position, which is what an
 * internal hyperlink's `w:anchor` names. Split and join place it by that position, the
 * behaviour `tree-op-split-anchors.test.ts` pins.
 */
interface OoxmlBookmarkStartNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'bookmarkStart';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'bookmarkStart';
}
/** `w:bookmarkEnd` — the closing point anchor (`@w:id`), zero-length like its start. */
interface OoxmlBookmarkEndNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'bookmarkEnd';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'bookmarkEnd';
}
/**
 * A range marker: the move-range and comment-range boundaries.
 *
 * Three of the base types in this family disagree, and the disagreement is load-bearing:
 *
 * - `w:moveFromRangeStart` / `w:moveToRangeStart` are `CT_MoveBookmark` (§17.13.5.22/.26):
 *   `@w:name`, `@w:author`, and `@w:date` are all REQUIRED.
 * - `w:moveFromRangeEnd` / `w:moveToRangeEnd` / `w:commentRangeStart` / `w:commentRangeEnd`
 *   are `CT_MarkupRange` (§17.13.5.21): `@w:id` only, with NO author and NO date. Requiring
 *   provenance here refuses valid files; writing it emits invalid XML.
 *
 * Two different join keys ride on these: `@w:name` pairs a `moveFrom` range with its
 * `moveTo` range, while `@w:id` pairs a range start with its own range end. In a real
 * document the two halves of a named pair carry different ids, so neither key substitutes
 * for the other.
 */
interface OoxmlRangeMarkerNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'moveFromRangeStart' | 'moveFromRangeEnd' | 'moveToRangeStart' | 'moveToRangeEnd' | 'commentRangeStart' | 'commentRangeEnd';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'moveFromRangeStart' | 'moveFromRangeEnd' | 'moveToRangeStart' | 'moveToRangeEnd' | 'commentRangeStart' | 'commentRangeEnd';
}
/** `w:commentReference` — the in-run mark that carries the comment's anchor point. */
interface OoxmlCommentReferenceNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'commentReference';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'commentReference';
}
/** The `word/comments.xml` root (`CT_Comments`, §17.13.4.2). */
interface OoxmlCommentsNode extends OoxmlElementBase<readonly (OoxmlCommentNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'comments';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'comments';
}
/**
 * One comment (`CT_Comment`, §17.13.4.4) — `CT_TrackChange` plus `@w:initials`, holding
 * block content. The block content is why a comment body is a story rather than a string.
 */
interface OoxmlCommentNode extends OoxmlElementBase<readonly (OoxmlParagraphNode | OoxmlTableNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'comment';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'comment';
}
/** `w:r` — a run: text and atoms sharing one set of character properties. */
interface OoxmlRunNode extends OoxmlElementBase<readonly (OoxmlRunPropertiesNode | OoxmlTextElementNode | OoxmlDeletedTextNode | OoxmlTabNode | OoxmlHardBreakNode | OoxmlCommentReferenceNode | OoxmlFldCharNode | OoxmlInstrTextNode | OoxmlNoteReferenceNode | OoxmlNoteRefNode | OoxmlSeparatorNode | OoxmlContinuationSeparatorNode | OoxmlDrawingNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'run';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'r';
}
/** `w:drawing` — run content only; exactly one typed inline or anchored child. */
interface OoxmlDrawingNode extends OoxmlElementBase<readonly (OoxmlInlineDrawingNode | OoxmlAnchoredDrawingNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawing';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'drawing';
}
/** `wp:inline` / `wp:anchor` shared payload children. */
type OoxmlDrawingAnchorChild = OoxmlDrawingExtentNode | OoxmlDrawingEffectExtentNode | OoxmlDrawingDocPrNode | OoxmlDrawingGraphicFramePrNode | OoxmlDrawingGraphicNode | OoxmlDrawingSimplePosNode | OoxmlDrawingPositionHNode | OoxmlDrawingPositionVNode | OoxmlDrawingWrapNoneNode | OoxmlDrawingWrapSquareNode | OoxmlDrawingWrapTightNode | OoxmlDrawingWrapThroughNode | OoxmlDrawingWrapTopBottomNode | OoxmlGenericElementNode;
/** `wp:inline` (`CT_Inline`) — typed only under `w:drawing`. */
interface OoxmlInlineDrawingNode extends OoxmlElementBase<readonly OoxmlDrawingAnchorChild[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'inlineDrawing';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'inline';
}
/** `wp:anchor` (`CT_Anchor`) — typed only under `w:drawing`. */
interface OoxmlAnchoredDrawingNode extends OoxmlElementBase<readonly OoxmlDrawingAnchorChild[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'anchoredDrawing';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'anchor';
}
interface OoxmlDrawingExtentNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingExtent';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'extent';
}
interface OoxmlDrawingEffectExtentNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingEffectExtent';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'effectExtent';
}
interface OoxmlDrawingDocPrNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingDocPr';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'docPr';
}
interface OoxmlDrawingGraphicFramePrNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingGraphicFramePr';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'cNvGraphicFramePr';
}
interface OoxmlDrawingGraphicNode extends OoxmlElementBase<readonly (OoxmlDrawingGraphicDataNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingGraphic';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'graphic';
}
interface OoxmlDrawingGraphicDataNode extends OoxmlElementBase<readonly (OoxmlPictureNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingGraphicData';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'graphicData';
}
interface OoxmlDrawingSimplePosNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingSimplePos';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'simplePos';
}
interface OoxmlDrawingPositionHNode extends OoxmlElementBase<readonly (OoxmlDrawingPositionAlignNode | OoxmlDrawingPositionOffsetNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingPositionH';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'positionH';
}
interface OoxmlDrawingPositionVNode extends OoxmlElementBase<readonly (OoxmlDrawingPositionAlignNode | OoxmlDrawingPositionOffsetNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingPositionV';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'positionV';
}
interface OoxmlDrawingPositionAlignNode extends OoxmlElementBase<readonly (OoxmlTextNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingPositionAlign';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'align';
}
interface OoxmlDrawingPositionOffsetNode extends OoxmlElementBase<readonly (OoxmlTextNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingPositionOffset';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'posOffset';
}
interface OoxmlDrawingWrapNoneNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapNone';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'wrapNone';
}
interface OoxmlDrawingWrapSquareNode extends OoxmlElementBase<readonly (OoxmlDrawingEffectExtentNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapSquare';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'wrapSquare';
}
interface OoxmlDrawingWrapTightNode extends OoxmlElementBase<readonly (OoxmlDrawingWrapPolygonNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapTight';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'wrapTight';
}
interface OoxmlDrawingWrapThroughNode extends OoxmlElementBase<readonly (OoxmlDrawingWrapPolygonNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapThrough';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'wrapThrough';
}
interface OoxmlDrawingWrapTopBottomNode extends OoxmlElementBase<readonly (OoxmlDrawingEffectExtentNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapTopBottom';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'wrapTopAndBottom';
}
interface OoxmlDrawingWrapPolygonNode extends OoxmlElementBase<readonly (OoxmlDrawingWrapPolygonStartNode | OoxmlDrawingWrapPolygonLineToNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapPolygon';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'wrapPolygon';
}
interface OoxmlDrawingWrapPolygonStartNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapPolygonStart';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'start';
}
interface OoxmlDrawingWrapPolygonLineToNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'drawingWrapPolygonLineTo';
    readonly namespaceUri: typeof WP_NAMESPACE_URI;
    readonly localName: 'lineTo';
}
/** `pic:pic` (`CT_Picture`) — typed only under picture `a:graphicData`. */
interface OoxmlPictureNode extends OoxmlElementBase<readonly (OoxmlPictureNvPicPrNode | OoxmlPictureBlipFillNode | OoxmlPictureShapePropertiesNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'picture';
    readonly namespaceUri: typeof PIC_NAMESPACE_URI;
    readonly localName: 'pic';
}
interface OoxmlPictureNvPicPrNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureNvPicPr';
    readonly namespaceUri: typeof PIC_NAMESPACE_URI;
    readonly localName: 'nvPicPr';
}
interface OoxmlPictureBlipFillNode extends OoxmlElementBase<readonly (OoxmlPictureBlipNode | OoxmlPictureSrcRectNode | OoxmlPictureStretchNode | OoxmlPictureTileNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureBlipFill';
    readonly namespaceUri: typeof PIC_NAMESPACE_URI;
    readonly localName: 'blipFill';
}
interface OoxmlPictureBlipNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureBlip';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'blip';
}
interface OoxmlPictureSrcRectNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureSrcRect';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'srcRect';
}
interface OoxmlPictureStretchNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureStretch';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'stretch';
}
interface OoxmlPictureTileNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureTile';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'tile';
}
interface OoxmlPictureShapePropertiesNode extends OoxmlElementBase<readonly (OoxmlPictureTransformNode | OoxmlPicturePresetGeometryNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureShapeProperties';
    readonly namespaceUri: typeof PIC_NAMESPACE_URI;
    readonly localName: 'spPr';
}
interface OoxmlPictureTransformNode extends OoxmlElementBase<readonly (OoxmlPictureTransformOffsetNode | OoxmlPictureTransformExtentNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureTransform';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'xfrm';
}
interface OoxmlPictureTransformOffsetNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureTransformOffset';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'off';
}
interface OoxmlPictureTransformExtentNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'pictureTransformExtent';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'ext';
}
interface OoxmlPicturePresetGeometryNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'picturePresetGeometry';
    readonly namespaceUri: typeof DRAWINGML_MAIN_NAMESPACE_URI;
    readonly localName: 'prstGeom';
}
/**
 * `w:delText` (§17.3.3.7) — the text container a run uses once its content is deleted.
 *
 * Structurally identical to `w:t`, and deliberately a DIFFERENT kind: it must never flow
 * as ordinary text, and rejecting the deletion that contains it turns it back into `w:t`.
 */
interface OoxmlDeletedTextNode extends OoxmlElementBase<readonly OoxmlTextNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'deletedText';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'delText';
}
/**
 * `w:rPr` — a run's character properties, whose children stay GENERIC.
 *
 * Deliberately unmodelled below this point: the property vocabulary is large and mostly
 * uninteresting to layout, so carrying it verbatim preserves everything without the engine having
 * to know what each element means.
 */
interface OoxmlRunPropertiesNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'runProperties';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'rPr';
}
/** `w:t` — the element holding a run's literal characters. */
interface OoxmlTextElementNode extends OoxmlElementBase<readonly OoxmlTextNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'text';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 't';
}
/** `w:pPr` — a paragraph's properties. Children stay generic, like `w:rPr`'s. */
interface OoxmlParagraphPropertiesNode extends OoxmlElementBase<readonly (OoxmlRunPropertiesNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'paragraphProperties';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'pPr';
}
/** `w:tab` inside a run — one tab character as its own element. */
interface OoxmlTabNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'tab';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'tab';
}
/** `w:br` — a line, column or page break inside a run. */
interface OoxmlHardBreakNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'hardBreak';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'br';
}
/**
 * Complex-field character (`w:fldChar`).
 *
 * Children stay generic so `w:ffData` (legacy form fields / macros) round-trips as inert
 * payload and is never promoted to an executable surface. `@w:fldCharType`, `@w:dirty`,
 * and `@w:fldLock` are preserved on `attributes`.
 */
interface OoxmlFldCharNode extends OoxmlElementBase<readonly OoxmlGenericElementNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'fldChar';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'fldChar';
}
/**
 * Field instruction text (`w:instrText`), same text-carrier shape as `w:t`.
 *
 * Instruction strings are never executed; layout may recognize allowlisted page-number
 * keywords only.
 */
interface OoxmlInstrTextNode extends OoxmlElementBase<readonly OoxmlTextNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'instrText';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'instrText';
}
/**
 * Simple field (`w:fldSimple`) at paragraph content level.
 *
 * `@w:instr`, `@w:dirty`, and `@w:fldLock` round-trip on `attributes`. Cached result
 * children stay structurally preserved; the field is one atomic addressable unit.
 */
interface OoxmlFldSimpleNode extends OoxmlElementBase<readonly (OoxmlRunNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'fldSimple';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'fldSimple';
}
/**
 * Footnotes part root (`w:footnotes`). Children are typed notes or preserved generics.
 * Never a story root itself — each note body is its own story for layout.
 */
interface OoxmlFootnotesNode extends OoxmlElementBase<readonly (OoxmlNoteNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'footnotes';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'footnotes';
}
/**
 * Endnotes part root (`w:endnotes`). Same content model as {@link OoxmlFootnotesNode}.
 */
interface OoxmlEndnotesNode extends OoxmlElementBase<readonly (OoxmlNoteNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'endnotes';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'endnotes';
}
/**
 * One footnote or endnote (`w:footnote` / `w:endnote`).
 *
 * Discriminated by `localName`. `@w:id` and optional `@w:type` (`ST_FtnEdn`, including
 * authored `normal`) live on `attributes`. Children are ordinary block content.
 */
interface OoxmlNoteNode extends OoxmlElementBase<readonly (OoxmlParagraphNode | OoxmlTableNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'note';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'footnote' | 'endnote';
}
/**
 * Body citation (`w:footnoteReference` / `w:endnoteReference`) as a typed run child.
 * Display mark is derived — never stored as text. One UTF-16 atom in addressing.
 */
interface OoxmlNoteReferenceNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'noteReference';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'footnoteReference' | 'endnoteReference';
}
/**
 * Auto mark inside a note body (`w:footnoteRef` / `w:endnoteRef`).
 * One UTF-16 atom; display digit is derived at paint time.
 */
interface OoxmlNoteRefNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'noteRef';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'footnoteRef' | 'endnoteRef';
}
/** Run-inner separator rule (`w:separator`). One UTF-16 atom. */
interface OoxmlSeparatorNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'separator';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'separator';
}
/** Run-inner continuation separator (`w:continuationSeparator`). One UTF-16 atom. */
interface OoxmlContinuationSeparatorNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'continuationSeparator';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'continuationSeparator';
}
/**
 * `w:sdt` — structured document tag (content control) at block, inline, row, or cell level.
 *
 * Placement is not a separate kind: the same element name appears in every `EG_*Content`
 * group. Child shape is the union of those placements; parents admit the control wherever
 * `generic` was previously accepted (see `isPreservedChild`). Identity is the node id —
 * `w:id` inside `w:sdtPr` is optional, preserved when present, never fabricated here.
 */
interface OoxmlContentControlNode extends OoxmlElementBase<readonly (OoxmlContentControlPropertiesNode | OoxmlContentControlEndPropertiesNode | OoxmlContentControlContentNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControl';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'sdt';
}
/**
 * `w:sdtPr` (`CT_SdtPr`) — schema-ordered properties. Unmodelled children (alias/tag/id/lock
 * leaves with `w:val`, `w15:*`, empty type markers) stay `generic` in position. Typed
 * payloads: dropdown/combo/listItem, date (+ leaves), text, dataBinding, `w14:checkbox`.
 */
interface OoxmlContentControlPropertiesNode extends OoxmlElementBase<readonly (OoxmlRunPropertiesNode | OoxmlContentControlDataBindingNode | OoxmlContentControlDropDownListNode | OoxmlContentControlComboBoxNode | OoxmlContentControlDateNode | OoxmlContentControlTextNode | OoxmlContentControlCheckboxNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlProperties';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'sdtPr';
}
/** `w:sdtEndPr` — end-character properties; children are `w:rPr` or generic. */
interface OoxmlContentControlEndPropertiesNode extends OoxmlElementBase<readonly (OoxmlRunPropertiesNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlEndProperties';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'sdtEndPr';
}
/**
 * `w:sdtContent` — control contents for every placement. Block content is paragraphs/tables;
 * inline content is runs/hyperlinks; row/cell content is rows/cells. Nested controls stay typed.
 */
interface OoxmlContentControlContentNode extends OoxmlElementBase<readonly OoxmlNode[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlContent';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'sdtContent';
}
/** `w:dropDownList` — `@w:lastValue` plus typed `w:listItem` children. */
interface OoxmlContentControlDropDownListNode extends OoxmlElementBase<readonly (OoxmlContentControlListItemNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlDropDownList';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'dropDownList';
}
/** `w:comboBox` — same payload shape as dropdown; free entry is an editing concern. */
interface OoxmlContentControlComboBoxNode extends OoxmlElementBase<readonly (OoxmlContentControlListItemNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlComboBox';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'comboBox';
}
/** `w:listItem` — `@w:displayText` / `@w:value` as preserved attributes (not `w:val`). */
interface OoxmlContentControlListItemNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlListItem';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'listItem';
}
/**
 * `w:date` — `@w:fullDate` plus typed dateFormat/lid/storeMappedDataAs/calendar leaves.
 * Those leaves allow `w:val` (the only known kinds that do) so they are not demoted.
 */
interface OoxmlContentControlDateNode extends OoxmlElementBase<readonly (OoxmlContentControlDateFormatNode | OoxmlContentControlLidNode | OoxmlContentControlStoreMappedDataAsNode | OoxmlContentControlCalendarNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlDate';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'date';
}
/** `w:dateFormat` — the picture string a date picker formats its value with. */
interface OoxmlContentControlDateFormatNode extends OoxmlElementBase<readonly [], readonly (OoxmlKnownNodeAttribute | OoxmlWmlValAttribute)[]> {
    readonly kind: 'contentControlDateFormat';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'dateFormat';
}
/** `w:lid` — the language id a date picker parses and formats under. */
interface OoxmlContentControlLidNode extends OoxmlElementBase<readonly [], readonly (OoxmlKnownNodeAttribute | OoxmlWmlValAttribute)[]> {
    readonly kind: 'contentControlLid';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'lid';
}
/** `w:storeMappedDataAs` — which representation a bound date is written to its XML part as. */
interface OoxmlContentControlStoreMappedDataAsNode extends OoxmlElementBase<readonly [], readonly (OoxmlKnownNodeAttribute | OoxmlWmlValAttribute)[]> {
    readonly kind: 'contentControlStoreMappedDataAs';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'storeMappedDataAs';
}
/** `w:calendar` — which calendar system a date picker uses (Gregorian, Hijri, …). */
interface OoxmlContentControlCalendarNode extends OoxmlElementBase<readonly [], readonly (OoxmlKnownNodeAttribute | OoxmlWmlValAttribute)[]> {
    readonly kind: 'contentControlCalendar';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'calendar';
}
/** `w:text` (`CT_SdtText`) — distinct from `w:t` (`kind: 'text'`). `@w:multiLine` preserved. */
interface OoxmlContentControlTextNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlText';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'text';
}
/**
 * `w:dataBinding` — xpath / storeItemID / prefixMappings preserved as attributes.
 * This tree never resolves or fetches the binding target.
 */
interface OoxmlContentControlDataBindingNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlDataBinding';
    readonly namespaceUri: typeof WML_NAMESPACE_URI;
    readonly localName: 'dataBinding';
}
/**
 * `w14:checkbox` — Microsoft extension, not an ECMA-376 type choice. Distinguishable from
 * untyped rich-text controls that merely wrap a `w:sym`.
 */
interface OoxmlContentControlCheckboxNode extends OoxmlElementBase<readonly (OoxmlContentControlCheckedNode | OoxmlContentControlCheckedStateNode | OoxmlContentControlUncheckedStateNode | OoxmlGenericElementNode)[], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlCheckbox';
    readonly namespaceUri: typeof W14_NAMESPACE_URI;
    readonly localName: 'checkbox';
}
/** `w14:checked` — a checkbox's recorded state, independent of the glyph drawn for it. */
interface OoxmlContentControlCheckedNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlChecked';
    readonly namespaceUri: typeof W14_NAMESPACE_URI;
    readonly localName: 'checked';
}
/** `w14:checkedState` — the font and code point drawn when a checkbox is checked. */
interface OoxmlContentControlCheckedStateNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlCheckedState';
    readonly namespaceUri: typeof W14_NAMESPACE_URI;
    readonly localName: 'checkedState';
}
/** `w14:uncheckedState` — the font and code point drawn when a checkbox is not checked. */
interface OoxmlContentControlUncheckedStateNode extends OoxmlElementBase<readonly [], readonly OoxmlKnownNodeAttribute[]> {
    readonly kind: 'contentControlUncheckedState';
    readonly namespaceUri: typeof W14_NAMESPACE_URI;
    readonly localName: 'uncheckedState';
}
/**
 * Any element the typed vocabulary does not cover — the other half of the preservation model.
 *
 * Also where a KNOWN element lands when it appears somewhere invalid: an element is demoted to
 * generic rather than rejected, so malformed or unfamiliar content is carried losslessly and
 * never locks editing.
 */
interface OoxmlGenericElementNode extends OoxmlElementBase<readonly OoxmlNode[]> {
    readonly kind: 'generic';
}
/** A literal text value. The only node kind with no children and no attributes. */
interface OoxmlTextNode {
    readonly id: OoxmlNodeId;
    readonly kind: 'textValue';
    readonly value: string;
}
/** Every element node kind: the typed vocabulary plus the generic catch-all. */
type OoxmlElement = OoxmlDocumentNode | OoxmlBodyNode | OoxmlParagraphNode | OoxmlRunNode | OoxmlHyperlinkNode | OoxmlBookmarkStartNode | OoxmlBookmarkEndNode | OoxmlRunPropertiesNode | OoxmlTextElementNode | OoxmlDeletedTextNode | OoxmlParagraphPropertiesNode | OoxmlTabNode | OoxmlHardBreakNode | OoxmlFldCharNode | OoxmlInstrTextNode | OoxmlFldSimpleNode | OoxmlFootnotesNode | OoxmlEndnotesNode | OoxmlNoteNode | OoxmlNoteReferenceNode | OoxmlNoteRefNode | OoxmlSeparatorNode | OoxmlContinuationSeparatorNode | OoxmlTableNode | OoxmlTableRowNode | OoxmlTableCellNode | OoxmlTableGridNode | OoxmlTablePropertiesNode | OoxmlRevisionContentNode | OoxmlRangeMarkerNode | OoxmlCommentReferenceNode | OoxmlCommentsNode | OoxmlCommentNode | OoxmlContentControlNode | OoxmlContentControlPropertiesNode | OoxmlContentControlEndPropertiesNode | OoxmlContentControlContentNode | OoxmlContentControlDropDownListNode | OoxmlContentControlComboBoxNode | OoxmlContentControlListItemNode | OoxmlContentControlDateNode | OoxmlContentControlDateFormatNode | OoxmlContentControlLidNode | OoxmlContentControlStoreMappedDataAsNode | OoxmlContentControlCalendarNode | OoxmlContentControlTextNode | OoxmlContentControlDataBindingNode | OoxmlContentControlCheckboxNode | OoxmlContentControlCheckedNode | OoxmlContentControlCheckedStateNode | OoxmlContentControlUncheckedStateNode | OoxmlDrawingNode | OoxmlInlineDrawingNode | OoxmlAnchoredDrawingNode | OoxmlDrawingExtentNode | OoxmlDrawingEffectExtentNode | OoxmlDrawingDocPrNode | OoxmlDrawingGraphicFramePrNode | OoxmlDrawingGraphicNode | OoxmlDrawingGraphicDataNode | OoxmlDrawingSimplePosNode | OoxmlDrawingPositionHNode | OoxmlDrawingPositionVNode | OoxmlDrawingPositionAlignNode | OoxmlDrawingPositionOffsetNode | OoxmlDrawingWrapNoneNode | OoxmlDrawingWrapSquareNode | OoxmlDrawingWrapTightNode | OoxmlDrawingWrapThroughNode | OoxmlDrawingWrapTopBottomNode | OoxmlDrawingWrapPolygonNode | OoxmlDrawingWrapPolygonStartNode | OoxmlDrawingWrapPolygonLineToNode | OoxmlPictureNode | OoxmlPictureNvPicPrNode | OoxmlPictureBlipFillNode | OoxmlPictureBlipNode | OoxmlPictureSrcRectNode | OoxmlPictureStretchNode | OoxmlPictureTileNode | OoxmlPictureShapePropertiesNode | OoxmlPictureTransformNode | OoxmlPictureTransformOffsetNode | OoxmlPictureTransformExtentNode | OoxmlPicturePresetGeometryNode | OoxmlGenericElementNode;
/**
 * Any node in the canonical tree.
 *
 * Typed where layout needs structure, generic everywhere else — one tree carries a whole document
 * whether or not the engine understands every part of it.
 */
type OoxmlNode = OoxmlElement | OoxmlTextNode;
/** One XML part of the package, parsed into a canonical tree. */
interface OoxmlPart {
    readonly id: string;
    /** Canonical part name, e.g. `/word/document.xml`. */
    readonly name: string;
    readonly contentType: string;
    readonly root: OoxmlElement;
}
/** A part's identity without its tree — enough to enumerate a package cheaply. */
interface OoxmlPartMetadata {
    readonly name: string;
    readonly contentType: string;
}
/**
 * Why a part could not be read into a tree.
 *
 * Widens the XML-level rejections with the tree-level ones. All of them describe the FILE, which
 * is why reading returns a result rather than throwing.
 */
type OoxmlReadRejection = XmlRejection | 'missing-root' | 'multiple-roots' | 'invalid-name' | 'invalid-namespace' | 'undeclared-prefix' | 'duplicate-expanded-attribute';
/** A parsed part, or a typed refusal. Never throws — the input is untrusted by definition. */
type OoxmlReadResult = {
    readonly ok: true;
    readonly part: OoxmlPart;
} | {
    readonly ok: false;
    readonly reason: OoxmlReadRejection;
};
/**
 * The node-identity contract, written down as a type so it is checkable rather than merely
 * documented.
 *
 * Ids are deterministic from a normalized parse, retained through structural sharing, explicit on
 * replacement, and unique within a part. Everything that addresses nodes — ops, the caret, the
 * paraId bimap — depends on all four holding.
 */
interface OoxmlNodeIdentityRules {
    readonly initial: 'deterministic-structural-path-after-normalized-parse';
    readonly unchanged: 'retain-id-through-structural-sharing';
    readonly replacement: 'explicitly-retain-or-allocate';
    readonly uniqueness: 'unique-within-part';
}
/**
 * Identity policy for future immutable tree edits. This defines the boundary
 * without implementing task 2.4 edit primitives.
 */
declare const OOXML_NODE_IDENTITY_RULES: OoxmlNodeIdentityRules;
/** What a tree invariant walk found wrong. Each names a rule the canonical tree must satisfy. */
type OoxmlInvariantIssueCode = 'invalid-id' | 'duplicate-id' | 'invalid-name' | 'invalid-namespace' | 'invalid-qname' | 'duplicate-expanded-attribute' | 'invalid-xml-value' | 'known-node-invariant';
/** One invariant violation, located by structural path and node id. */
interface OoxmlInvariantIssue {
    readonly code: OoxmlInvariantIssueCode;
    readonly path: string;
    readonly nodeId?: string;
}
/** Whether a tree satisfies its invariants, listing every violation when it does not. */
type OoxmlInvariantResult = {
    readonly ok: true;
} | {
    readonly ok: false;
    readonly issues: readonly OoxmlInvariantIssue[];
};
/**
 * Read one XML part into the additive typed/generic foundation. Existing package
 * parsing and DocumentStore models intentionally remain unchanged until their
 * later migration tasks; this tree is not yet the repository's sole runtime authority.
 * Structural-path IDs are deterministic across normalized reopen. Preserving an
 * identity through moves and edits is deferred to PackageModel/DocumentStore integration.
 */
declare function readOoxmlPart(xml: string, metadata: OoxmlPartMetadata, limits?: XmlLimits): OoxmlReadResult;

export { type OoxmlPartMetadata as $, type OoxmlBookmarkEndNode as A, type OoxmlBookmarkStartNode as B, type OoxmlContentControlCalendarNode as C, type OoxmlContentControlCheckboxNode as D, type OoxmlContentControlCheckedNode as E, type OoxmlContentControlCheckedStateNode as F, type OoxmlContentControlComboBoxNode as G, type OoxmlContentControlDataBindingNode as H, type OoxmlContentControlDateFormatNode as I, type OoxmlContentControlDateNode as J, type OoxmlContentControlDropDownListNode as K, type OoxmlContentControlLidNode as L, type OoxmlContentControlListItemNode as M, type OoxmlContentControlStoreMappedDataAsNode as N, type OoxmlNode as O, type OoxmlContentControlTextNode as P, type OoxmlContentControlUncheckedStateNode as Q, type OoxmlDocumentNode as R, type OoxmlGenericExtensionAttribute as S, type OoxmlHyperlinkNode as T, type OoxmlInvariantIssueCode as U, type OoxmlKnownNodeAttribute as V, type OoxmlNamespaceBinding as W, type XmlLimits as X, type OoxmlNodeId as Y, type OoxmlNodeIdentityRules as Z, type OoxmlParagraphPropertiesNode as _, type OoxmlElement as a, type OoxmlReadResult as a0, type OoxmlRunNode as a1, type OoxmlRunPropertiesNode as a2, type OoxmlTabNode as a3, type OoxmlTextElementNode as a4, type OoxmlTextNode as a5, type OoxmlWmlValAttribute as a6, type OoxmlXmlSpaceAttribute as a7, WML_NAMESPACE_URI as a8, XMLNS_NAMESPACE_URI as a9, XML_NAMESPACE_URI as aa, type XmlNode as ab, type XmlRejection as ac, type XmlResult as ad, childElements as ae, findElement as af, isContentRevisionKind as ag, isRangeMarkerKind as ah, readOnOffChild as ai, readOoxmlPart as aj, readXml as ak, textContent as al, type OoxmlContentControlNode as b, type OoxmlGenericElementNode as c, type OoxmlContentControlContentNode as d, type OoxmlPart as e, type OoxmlParagraphNode as f, type OoxmlNoteNode as g, type OoxmlContinuationSeparatorNode as h, type OoxmlEndnotesNode as i, type OoxmlFootnotesNode as j, type OoxmlNoteRefNode as k, type OoxmlNoteReferenceNode as l, type OoxmlSeparatorNode as m, type OoxmlReadRejection as n, type OoxmlDrawingNode as o, type OoxmlContentControlEndPropertiesNode as p, type OoxmlContentControlPropertiesNode as q, type OoxmlInvariantResult as r, type OoxmlInvariantIssue as s, type OoxmlHardBreakNode as t, type OoxmlFldCharNode as u, type OoxmlFldSimpleNode as v, type OoxmlInstrTextNode as w, type OoxmlAttribute as x, OOXML_NODE_IDENTITY_RULES as y, type OoxmlBodyNode as z };
