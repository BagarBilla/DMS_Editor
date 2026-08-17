import { O as OoxmlNode, a as OoxmlElement, b as OoxmlContentControlNode, c as OoxmlGenericElementNode, d as OoxmlContentControlContentNode } from './ooxml-tree-BU0e3DVi.cjs';

/** Nested content-control wrappers deeper than this stop flattening; content stays preserved. */
declare const MAX_CONTENT_CONTROL_NESTING = 32;
type ContentControlLike = OoxmlContentControlNode | OoxmlGenericElementNode;
type ContentControlContentLike = OoxmlContentControlContentNode | OoxmlGenericElementNode;
/**
 * Block or inline structured-document-tag wrapper — typed or generic during migration.
 *
 * Generic fallback requires the WordprocessingML namespace so foreign-namespace
 * `<x:sdt>` elements stay opaque wrappers and are never treated as Word controls.
 */
declare function isContentControl(node: OoxmlNode): node is ContentControlLike;
/**
 * True when `node` is the control's content container (`w:sdtContent`).
 *
 * Generic `sdtContent` requires the WML namespace — same foreign-namespace rule as
 * {@link isContentControl}.
 */
declare function isContentControlContent(node: OoxmlNode): node is ContentControlContentLike;
/** Children of the first `w:sdtContent` under a control, or null when absent or not a control. */
declare function contentControlContentOf(node: OoxmlNode): readonly OoxmlNode[] | null;
/**
 * Children of every `w:sdtContent` under a control, in document order.
 *
 * Does not recurse into nested controls — callers that flatten blocks or inline runs do that
 * with their own depth counter against {@link MAX_CONTENT_CONTROL_NESTING}.
 */
declare function contentControlContentChildren(control: OoxmlNode): readonly OoxmlNode[];
/**
 * Collect paragraph and table blocks from a sibling list, flattening through content-control
 * wrappers up to {@link MAX_CONTENT_CONTROL_NESTING}.
 *
 * `accept` filters which typed blocks are kept (e.g. skip revision-removed paragraphs). When
 * nesting exceeds the bound the wrapper is skipped entirely — same fail-closed rule as the
 * historical `storyBlocks` walk.
 */
declare function collectFlowBlocks(children: readonly OoxmlNode[], depth?: number, accept?: (block: OoxmlElement) => boolean): OoxmlElement[];
/**
 * Story blocks in document order, flattening block-level content controls — same shape as
 * layout's `storyBlocks` and store `bodyBlocks`.
 */
declare function walkStoryBlocks(children: readonly OoxmlNode[], depth: number, visit: (block: OoxmlElement) => void): void;
/**
 * Every story paragraph in reading order — body, table cells, and flattened block controls.
 */
declare function walkAllStoryParagraphs(children: readonly OoxmlNode[], sdtDepth: number, visit: (paragraph: OoxmlElement) => void): void;
/**
 * Paragraph-level inline sequence — runs, hyperlinks, and inline content controls in order.
 *
 * `visit` receives each direct `w:r` and any other inline node the caller treats as opaque
 * (bookmarks, drawings, …). Hyperlinks and content controls are descended transparently.
 */
declare function walkParagraphInline(children: readonly OoxmlNode[], depth: number, visit: (child: OoxmlNode) => void): void;

export { MAX_CONTENT_CONTROL_NESTING as M, contentControlContentChildren as a, isContentControlContent as b, collectFlowBlocks as c, contentControlContentOf as d, walkParagraphInline as e, walkStoryBlocks as f, isContentControl as i, walkAllStoryParagraphs as w };
