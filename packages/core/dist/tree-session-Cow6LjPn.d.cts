import { S as SupportedImageMime, b as ImageDecodePort } from './image-resources-DwpNnTg3.cjs';
import { S as StoryScope, a as StoryTargetRejection, D as DocumentTrackingSettings, I as InsertCustomNodeWrite, C as CustomNodeWriteResult, b as CustomNodeSweepOutcome, E as EmbeddedFont, B as BookmarkIndex, L as ListKind, c as InsertImageInput, d as ImageIntentResult, R as ReplaceImageOptions, A as ApplyImagePropertiesInput } from './custom-node-writes-YqISlSRl.cjs';
import { Node } from 'prosemirror-model';
import { a as ReviewItem } from './review-support-rsyGP5-9.cjs';
import { ReviewModuleContribution } from './contracts/modules.cjs';
import { e as OoxmlPart, O as OoxmlNode, a as OoxmlElement } from './ooxml-tree-BU0e3DVi.cjs';
import { O as OoxmlPackage, b as OoxmlPackageRejection } from './ooxml-package-CR5us6ad.cjs';
import { a as HeaderFooterParts, b as HeaderFooterSectionResolution } from './hf-references-CgEOSw3i.cjs';
import { T as TreeDocOp } from './tree-op-types-UOXlRUqQ.cjs';
import { S as SelectionMark, T as TreeModelChange } from './tree-store-B1lEkdXc.cjs';

/**
 * The scheme slots the picker shows, in Word's column order.
 *
 * Assumes the default `w:clrSchemeMapping` (bg1→lt1, t1→dk1, ...); a settings part
 * that remaps them is rare and a follow-up.
 */
declare const PICKER_SLOTS: readonly ["lt1", "dk1", "lt2", "dk2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6"];
type ThemeColorSlot = (typeof PICKER_SLOTS)[number];
/** One theme colour: the scheme slot and its resolved six-digit hex (no '#'). */
interface DocumentThemeColorEntry {
    readonly slot: ThemeColorSlot;
    readonly hex: string;
}
/** The theme's two font slots, for resolving `w:rFonts` theme attributes. */
interface DocumentThemeFonts {
    /** `a:majorFont` latin typeface — headings. */
    readonly major: string | null;
    /** `a:minorFont` latin typeface — body text. */
    readonly minor: string | null;
}

/**
 * Why an edited projection could not be mapped back into tree ops.
 *
 * A refusal, not a fallback. The reverse direction never RECONSTRUCTS the tree from the
 * projection — it explains a difference — so a shape it cannot explain is rejected outright.
 * A silently-dropped edit is worse than a refused one, because only the refusal can be
 * reconciled.
 */
type TreeBindingRejection = 'paragraph-count-unexplained' | 'paragraph-reordered' | 'unknown-paragraph-id' | 'unknown-content-moved' | 'unsupported-node' | 'split-not-clean' | 'join-not-clean';
/**
 * The ops explaining one edit, or the reason it could not be explained.
 *
 * `ops` is the SMALLEST set that accounts for the difference, so anything the projection does not
 * model — unknown nodes, lexical form, node identities — stays carried by the tree rather than
 * round-tripping through the editor.
 */
type MapResult = {
    readonly ok: true;
    readonly ops: readonly TreeDocOp[];
} | {
    readonly ok: false;
    readonly reason: TreeBindingRejection;
    readonly detail?: string;
};
/** Body paragraphs of a part, in document order. */
declare function bodyParagraphs(part: OoxmlPart): OoxmlNode[];
/** Project one tree revision into a ProseMirror doc (task 6.1). */
declare function treeToDoc(part: OoxmlPart): Node;
/**
 * Map an edited ProseMirror doc back into typed tree ops (task 6.2), or refuse (6.3).
 *
 * Handles a paragraph count delta of 0 (in-place edits), +1 (a clean split) and -1 (a clean
 * join). Anything else — a reorder, a multi-paragraph paste, a structural change combined
 * with an edit elsewhere — is refused rather than approximated, because the approximation
 * is what silently loses content.
 */
declare function docToTreeOps(part: OoxmlPart, doc: Node): MapResult;
/** Whether a tree node id is still present, for reconciliation checks. */
declare function partHasNode(part: OoxmlPart, nodeId: string): boolean;
/**
 * Rebuild a projected doc from a new tree revision, reusing untouched paragraphs (task 6.4).
 *
 * A full reprojection is always CORRECT, so this only ever narrows the work: paragraphs the
 * change did not name are carried over by reference, which lets ProseMirror keep their node
 * identity and redraw nothing. When the change is structural — a paragraph created, deleted,
 * split or joined — positions shift in ways a per-paragraph patch cannot express, so it
 * falls back to a full projection rather than guessing.
 *
 * Passing `null` means "no evidence available", which also takes the full path. Reconciling
 * on partial evidence is how a projection silently diverges from the model.
 */
declare function reconcileDoc(previousDoc: Node, part: OoxmlPart, change: {
    readonly dirty: readonly string[];
    readonly created: readonly string[];
    readonly deleted: readonly string[];
    readonly splitJoin: readonly unknown[];
} | null): Node;

/**
 * How a style LOOKS, for a picker to preview it in its own face — Word shows the gallery
 * that way, and a list of identical rows makes the user apply a style to find out what it
 * is. PRESENTATION ONLY: these are the few properties a one-line preview can show, not the
 * cascade layout resolves. Every value is already bounded here (the family against the same
 * shape the CSS sink enforces, the colour against six hex digits), because a picker renders
 * them into a style attribute and they come from an attacker-controlled `styles.xml`.
 */
interface DocumentStylePreview {
    readonly fontFamily: string | null;
    /** Points, already halved from `w:sz`. Null when the style states no size. */
    readonly fontSizePt: number | null;
    readonly bold: boolean;
    readonly italic: boolean;
    /** RRGGBB, or null for inherited/automatic — theme colours are not resolved here. */
    readonly color: string | null;
}
/** One `w:style` definition, projected for a style picker. */
interface DocumentStyleEntry {
    readonly styleId: string;
    readonly name: string;
    readonly type: string;
    readonly preview: DocumentStylePreview;
}

/** One heading of the outline, in document order. `level` is 0-based (Heading 1 = 0). */
interface DocumentOutlineEntry {
    /** The paragraph's text, control characters flattened, bounded to 200 characters. */
    readonly text: string;
    /** 0-based outline level: `heading 1` / `outlineLvl 0` → 0. */
    readonly level: number;
    /** The paragraph's canonical node id — the address `setSelection` navigates to. */
    readonly blockId: string;
}

/** How a search is narrowed. Both flags default to off, matching Word's initial state. */
interface DocumentSearchOptions {
    readonly matchCase?: boolean;
    readonly wholeWord?: boolean;
    /** Override the default {@link SEARCH_MATCH_LIMIT}. Clamped to it; never raised past it. */
    readonly limit?: number;
}
/**
 * One occurrence of a query in the body story.
 *
 * Carries the engine's own address (`blockId` + `start`) and the positional one a find UI
 * needs (`paragraphIndex` / `runIndex` / `runOffset`), both derived from the SAME walk —
 * a caller reconstructing run boundaries itself is where an off-by-one would come from.
 * A match can span runs when formatting changes mid-word; the run address is where it
 * STARTS.
 */
interface DocumentSearchMatch {
    readonly blockId: string;
    readonly start: number;
    readonly length: number;
    readonly paragraphIndex: number;
    readonly runIndex: number;
    readonly runOffset: number;
    /** The matched text as it appears in the document, control characters flattened. */
    readonly text: string;
    /** Paragraph text immediately before the match, bounded and flattened. */
    readonly contextBefore: string;
    /** Paragraph text immediately after the match, bounded and flattened. */
    readonly contextAfter: string;
}
/**
 * What one search answers with.
 *
 * `truncated` says the scan stopped at the cap with matches still ahead of it, so a caller
 * can show "2000+" honestly instead of claiming an exact total it does not have.
 */
interface DocumentSearchResult {
    readonly matches: readonly DocumentSearchMatch[];
    readonly truncated: boolean;
}

/** What a run inherits at one point of the chain — null means "nothing authored". */
interface StyleRunDefaults {
    readonly fontFamily: string | null;
    readonly fontSizeHalfPoints: number | null;
}
/** One run property as the layout records carry it (structurally SurfaceProperty). */
interface RunPropertyLike {
    readonly localName: string;
    readonly attributes?: Record<string, string>;
}

interface ParagraphAnchorIndex {
    /** nodeId → `w14:paraId`, verbatim as authored/minted. Paragraphs without one are absent. */
    readonly paraIdByNode: ReadonlyMap<string, string>;
    /** UPPERCASED paraId → nodeId (matching is case-insensitive). First occurrence wins on the impossible-by-invariant duplicate. */
    readonly nodeByParaId: ReadonlyMap<string, string>;
    /** nodeId → reading-order ordinal, for document-ordering DocRange endpoints. */
    readonly ordinalByNode: ReadonlyMap<string, number>;
}

/**
 * What applying ops produced: whether it committed, and why not when it did not.
 *
 * `committed` and `rejected` are separate flags because they are not opposites — a batch of zero
 * ops neither commits nor is rejected.
 */
interface TreeApplyResult {
    readonly committed: boolean;
    readonly rejected: boolean;
    readonly opCount: number;
    /** Present when the edit was refused, so a host can report WHY rather than a silent no-op. */
    readonly reason?: TreeBindingRejection | StoryTargetRejection | string;
}
/**
 * One open document: the canonical tree, and the only write path into it.
 *
 * `applyTreeOps` is that path. Every mutation is a `TreeDocOp` addressed by node id plus UTF-16
 * offset, applied in one transaction, which is what makes cell and nested paragraphs ordinary
 * rather than special cases.
 *
 * Holds the whole package, not just the body — headers, footers, notes, comments and styles are
 * all reachable through it, and parts the engine does not model are preserved verbatim.
 */
interface TreeDocxSession {
    /** Whether the body holds at least one editable paragraph. */
    readonly editable: boolean;
    /** Canonical node ids of the body paragraphs, in order. */
    paragraphIds(): string[];
    /**
     * Canonical node ids of paragraphs in a story scope. Defaults to the body.
     * Header/footer scopes address the part `EditorScope { kind: 'headerFooter'; rId }` names.
     */
    paragraphIdsIn(scope?: StoryScope): string[];
    /** The current canonical BODY part — what layout reads for the main story. */
    part(): OoxmlPart;
    /** The current part for a story scope, or null when the target is refused. */
    partFor(scope: StoryScope): OoxmlPart | null;
    /**
     * The current package with every opened story store merged in. Authority for layout
     * resolution and save — never a swapped single-part view.
     */
    currentPackage(): OoxmlPackage;
    /**
     * Commit typed tree ops directly, as ONE transaction.
     *
     * The paginated surface has no ProseMirror doc to diff, so it addresses the model the way
     * the ops already do — by node id and offset — rather than round-tripping an edit through
     * a projection just to have it diffed back out.
     *
     * `scope` defaults to the body. Pass `{ kind: 'headerFooter', rId }` to target an existing
     * header/footer part; the transaction publishes one ModelChange (HF → `global` impact)
     * and one undo unit without swapping the body store.
     */
    applyTreeOps(ops: readonly TreeDocOp[], selectionBefore?: SelectionMark | null, selectionAfter?: SelectionMark | null, scope?: StoryScope): TreeApplyResult;
    /** Project the current BODY revision into a ProseMirror doc. */
    projectDoc(): Node;
    /** Re-project incrementally from the last committed change, reusing untouched paragraphs. */
    reconcile(previousDoc: Node): Node;
    /**
     * Whether the last commit changed the BLOCK SEQUENCE (a split, join, insert or delete).
     *
     * A host needs this to decide whether the view must be re-projected at all: after a pure
     * text edit the view already holds what the model holds, and re-projecting anyway both
     * wastes work and races the next keystroke.
     */
    lastCommitWasStructural(): boolean;
    /** Map an edited BODY doc to tree ops and commit them as ONE transaction. */
    applyPmDoc(doc: Node): TreeApplyResult;
    /** Body text, paragraphs joined by newlines, read from the CANONICAL tree. */
    bodyText(): string;
    /** Text of a story scope, paragraphs joined by newlines. */
    storyText(scope: StoryScope): string | null;
    /** Body-store revision (independent of header/footer store revisions). */
    revision(): number;
    /** Per-story revision, or null when the target is refused. */
    revisionFor(scope: StoryScope): number | null;
    /** Package-wide revision — bumps on any story commit (body or HF). */
    packageRevision(): number;
    canUndo(): boolean;
    canRedo(): boolean;
    /**
     * Undo the last entry, returning the selection to restore.
     *
     * The selection is part of the entry, not something a host can recompute: after undoing a
     * split the caret belongs where the user was typing, and offsets in the reverted tree do
     * not correspond to offsets in the one that replaced it. `null` means nothing was undone
     * or the entry recorded no selection.
     */
    undo(): SelectionMark | null;
    redo(): SelectionMark | null;
    beginComposition(scope?: StoryScope): void;
    endComposition(): void;
    subscribe(onChange: (change: TreeModelChange) => void): () => void;
    /** Serialize the whole package back to DOCX bytes. */
    save(): Uint8Array;
    /**
     * The resolved header/footer parts of the section, by variant (phase 2).
     *
     * Returns the FINAL section's effective parts after OOXML inheritance. Prefer
     * `headerFooterPartsBySection` for multi-section pagination.
     *
     * Re-resolved after any package revision so an edited shared part is visible everywhere
     * it is attached.
     */
    headerFooterParts(): HeaderFooterParts;
    /**
     * Per-section header/footer parts after OOXML inheritance, index-aligned with
     * `enumerateDocumentSections`.
     */
    headerFooterPartsBySection(): readonly HeaderFooterParts[];
    /**
     * Per-section resolution with declared-vs-inherited metadata for "Same as previous"
     * chrome. Index-aligned with `headerFooterPartsBySection`.
     */
    headerFooterResolutionBySection(): readonly HeaderFooterSectionResolution[];
    /**
     * Font family names the document uses, from every `w:rFonts` in the CURRENT main
     * part plus the styles and header/footer parts — validated, deduplicated, sorted.
     * Memoized per package revision.
     */
    documentFonts(): readonly string[];
    /**
     * The `w:style` definitions of the styles part, validated and projected for a style
     * picker. Memoized once: the styles part is immutable for the session's lifetime.
     * A document without a styles part answers `[]`.
     */
    documentStyles(): readonly DocumentStyleEntry[];
    /**
     * Root of the styles part tree, for layout's style cascade. Memoized once; `null` when
     * the package has no styles part. Styles editing is a later slice, so this is immutable
     * for the session.
     */
    stylesRoot(): OoxmlElement | null;
    /**
     * The theme part's Latin typefaces, for resolving `w:rFonts` theme references in layout.
     *
     * Memoized once: theme editing is a later slice. A document with no theme part answers
     * `{ major: null, minor: null }`, which leaves every theme reference on the explicit
     * font name beside it.
     */
    documentThemeFonts(): DocumentThemeFonts;
    /**
     * Root of the numbering part tree (`w:numbering`), for list layout. Memoized once;
     * `null` when the package has no numbering part. Numbering editing is a later slice.
     */
    numberingRoot(): OoxmlElement | null;
    /**
     * Root of the settings part tree (`w:settings`), for document-wide layout constants such
     * as `w:defaultTabStop`. Memoized once; `null` when the package has no settings part.
     * Settings editing is a later slice, so this is immutable for the session.
     */
    settingsRoot(): OoxmlElement | null;
    /**
     * What `settings.xml` says about tracking — `w:trackRevisions`, the tracked-changes
     * protection, and the two do-not-track switches.
     *
     * Read from the document rather than assumed, because Word records the tracking state on
     * the FILE: a package that asks to be edited as tracked changes, presented as an ordinary
     * editable one, takes its first keystroke as an untracked edit.
     */
    trackingSettings(): DocumentTrackingSettings;
    /**
     * The theme's ten picker colours (`a:clrScheme`), in Word's column order, or `[]`
     * when the package has no complete scheme. Memoized once: the theme part is
     * immutable for the session's lifetime.
     */
    documentThemeColors(): readonly DocumentThemeColorEntry[];
    /**
     * The run formatting a paragraph's content INHERITS when it authors none: the
     * paragraph style's `basedOn` chain, then `w:docDefaults`, with theme `rFonts`
     * attributes resolved through the font scheme. `runProperties` (the span's own
     * authored properties) lets a theme-only run-level `w:rFonts` resolve too. This is
     * what lets a toolbar always show the effective font, the way Word does.
     */
    effectiveRunDefaults(paragraphId: string, runProperties?: readonly RunPropertyLike[]): StyleRunDefaults;
    /**
     * The heading outline of the BODY story, in document order: paragraphs whose
     * `w:pStyle` resolves to a heading through the styles part (built-in `heading N`
     * name, or the style's own `w:outlineLvl` 0..8). Memoized per main-part revision —
     * an edit can retitle, add or remove a heading, but the styles part cannot change
     * in-session.
     */
    documentOutline(): readonly DocumentOutlineEntry[];
    /**
     * Every pending review decision in the document, memoized per revision.
     *
     * Derived from the canonical TREE — the queue is a property of the document, and one derived
     * from laid-out spans empties by half whenever the reader switches to a resolved view.
     */
    reviewItems(): readonly ReviewItem[];
    /**
     * Whether the document carries review content — tracked changes or comment
     * anchors — regardless of any review module. Derived from store vocabulary
     * only (never the review model), memoized per revision: it is the free
     * tier's honest "this document has more than you are seeing" signal.
     */
    hasReviewContent(): boolean;
    /**
     * Reply to a comment, or add one over a revision's range. Returns the new comment's id.
     *
     * `scope` names the story the anchor lives in and defaults to the body. A header or
     * footer anchor written against the body store addresses a paragraph that store has
     * never heard of, so the transaction is refused and the reply is lost — which is what
     * replying to a header card did.
     */
    replyToComment(parentCommentId: string | null, anchor: {
        paragraphId: string;
        start: number;
        end: number;
        endParagraphId?: string;
    }, text: string, author: string, 
    /** ISO-8601. Omitted writes no `@w:date`, because inventing one is a content change. */
    date?: string, scope?: StoryScope): string | null;
    /**
     * Resolve a comment thread, or reopen it. False when the document holds no such comment.
     *
     * The same package transaction shape as a reply, and for the same reason: `@w15:done` lives in
     * `commentsExtended.xml`, a part a document with no thread does not have, so the state and the
     * part that records it commit together.
     */
    setCommentResolved(commentId: string, resolved: boolean): boolean;
    /**
     * Delete a comment thread outright — body, thread state and story markers.
     *
     * A THREAD, like resolving one: a reply whose parent is gone has nothing left to answer.
     * False when the document holds no such comment, or when the removal was refused.
     */
    deleteComment(commentId: string): boolean;
    /**
     * Insert a custom node, with the payload it carries, as ONE transaction.
     *
     * A package write reaching through the body store, exactly as a comment is: the customXml data
     * part, the node inside it and the bound `w:sdt` commit together or not at all. A control bound
     * to a store that was never written is a document Word offers to repair.
     *
     * Omitting the payload authors the ordinary tagged control, which is what a node small enough
     * to live in its `w:tag` needs.
     */
    /** `scope` names the story the paragraph is in, and defaults to the body. */
    insertCustomNode(write: InsertCustomNodeWrite, scope?: StoryScope): CustomNodeWriteResult;
    /**
     * Remove a custom node and, in the same transaction, the payload it bound.
     *
     * The sweep would collect the payload on the next open regardless; doing it here means a
     * document saved between the deletion and that open does not carry a payload for a chip that
     * is gone.
     */
    /**
     * Remove a custom node and the payload it bound. `scope` names the story holding it and
     * defaults to the body; a chip in a header is refused against the body store.
     */
    removeCustomNode(controlNodeId: string, scope?: StoryScope): CustomNodeWriteResult;
    /**
     * Drop every payload no control binds, in the stores whose namespaces a module claims.
     *
     * Called ON OPEN and nowhere else — see `sweepCustomNodePayloads`. Answers the ids collected,
     * so a host can report what a document arrived carrying.
     */
    sweepCustomNodePayloads(namespaces: readonly string[]): CustomNodeSweepOutcome;
    /**
     * Every occurrence of `query` in the BODY story, in document order, addressed in the
     * same offset vocabulary the tree ops and the surface selection use — so a match can be
     * handed straight to `setSelection` without re-deriving anything.
     *
     * Memoized one deep, keyed on the revision AND the question asked: a find panel asks the
     * same question on every tick, and a different query replaces the entry rather than
     * growing a cache the session would have to bound.
     */
    findText(query: string, options?: DocumentSearchOptions): DocumentSearchResult;
    /**
     * The faces the package EMBEDS (`word/fontTable.xml` embed relationships),
     * deobfuscated — the only font source that needs neither a substitute nor a network.
     * Extraction asserts nothing about validity; admitting a face is the font resource
     * lane's job. Memoized once: the font table and font parts are immutable in-session.
     */
    embeddedFonts(): readonly EmbeddedFont[];
    /**
     * The `w:numId` of a bullet or numbered list definition, creating one where the document
     * has none — including `numbering.xml` itself, its relationship and its content type.
     *
     * A document Word has never numbered carries no numbering part at all, so the first
     * bullet a user asks for has to bring the whole definition with it. An existing
     * definition of the same kind is reused rather than duplicated.
     */
    /**
     * What the owning part's relationships answer for one `r:id` under `scope` (default:
     * body): the authored target and whether it is external. `null` for an id the part does
     * not declare, or when the scoped part is not open.
     *
     * Live rather than memoized: inserting a link mints a relationship mid-session, and a
     * cached resolver would report the link this session just created as dangling.
     */
    relationshipTarget(relationshipId: string, scope?: StoryScope): {
        readonly target: string;
        readonly external: boolean;
    } | null;
    /**
     * `bookmarkName -> { paragraphId, offset }` over the main part, memoized per revision.
     *
     * What an internal hyperlink's `w:anchor` resolves through. Keyed on the store revision
     * because an edit can move, split or delete the paragraph a bookmark sits in.
     */
    bookmarks(): BookmarkIndex;
    /**
     * The relationship id for an external hyperlink target on the part owning `scope`
     * (default: body), minting one if that part has none, or `null` when the URL is refused
     * or the scoped part cannot be resolved.
     *
     * Lives on the PACKAGE, outside `store.transact`, like the numbering definitions: the
     * undoable half is the tree op that names the id. An unreferenced relationship left
     * behind by an undo is inert and is what Word writes anyway. Scoped inserts mint onto
     * the story's own `.rels` so a header/footer or note link never creates a stray body
     * relationship.
     */
    ensureHyperlinkRelationship(url: string, scope?: StoryScope): string | null;
    ensureListDefinition(kind: ListKind): string | null;
    /**
     * Declare `level` in the list definition `numId` names, with Word's default format for
     * that depth, or answer false.
     *
     * Word never greys Increase Indent out on a list item: demoting past the deepest level
     * a definition declares makes Word define the level, cycling its stock bullets and
     * number formats. An already-declared level answers true without changing anything.
     *
     * The declaration lives on the PACKAGE, outside the store's history — undoing the edit
     * that needed it restores the paragraph but leaves the level declared, which is
     * harmless: an unreferenced level renders nothing and Word writes files full of them.
     */
    ensureNumberingLevel(numId: string, level: number, kind: ListKind): boolean;
    /**
     * The `w14:paraId` ↔ node-id index over the full editable set of the MAIN part,
     * memoized per revision. Every editable paragraph carries a valid, part-unique id
     * (established at open, maintained by the split appliers), so every paragraph is
     * mapped. Header/footer paragraphs become addressable through `partFor` once their
     * story store is open.
     */
    paragraphAnchors(): ParagraphAnchorIndex;
    /** `w14:paraId` of a canonical paragraph node id, verbatim, or null. */
    paraIdOf(nodeId: string): string | null;
    /** Canonical node id for a `w14:paraId`, matched case-insensitively, or null. */
    nodeIdOf(paraId: string): string | null;
    /** Insert a validated raster image as one package undo unit (task 12). */
    insertImage(scope: StoryScope, input: InsertImageInput): Promise<ImageIntentResult>;
    /** Replace a picture drawing's embedded media in one package undo unit. */
    replaceImage(scope: StoryScope, drawingNodeId: string, bytes: Uint8Array, mime: SupportedImageMime, decodePort: ImageDecodePort, options: ReplaceImageOptions): Promise<ImageIntentResult>;
    /** Delete a picture drawing and collect orphaned media in one package undo unit. */
    deleteImage(scope: StoryScope, drawingNodeId: string): ImageIntentResult;
    /** Apply image property tree ops plus hyperlink relationship wiring atomically. */
    applyImageProperties(scope: StoryScope, input: ApplyImagePropertiesInput): ImageIntentResult;
}

/**
 * Why bytes could not be opened: any bounded-reader rejection, plus the package that parsed but
 * carried no main document tree.
 */
type TreeSessionRejection = OoxmlPackageRejection | 'no-main-document-tree';
/**
 * An open session, or a typed refusal.
 *
 * A result rather than a throw: every failure here is a property of the FILE, and a host needs to
 * tell "this is not a package" from "this package is malicious" from "this document has no body".
 */
type OpenTreeSessionResult = {
    readonly ok: true;
    readonly session: TreeDocxSession;
} | {
    readonly ok: false;
    readonly reason: TreeSessionRejection;
    readonly detail?: string;
};
interface OpenTreeSessionOptions {
    /**
     * The review module's derivation hooks, contributed through the editor's
     * `EditorModule` seam. Absent — the free engine — the session's
     * `reviewItems()` reports the typed empty queue; parse, preservation, and
     * `hasReviewContent` are unaffected.
     */
    readonly reviewModel?: ReviewModuleContribution;
}
/**
 * Open DOCX bytes into a tree-backed session.
 *
 * Returns a typed rejection rather than throwing: every failure here is a property of the FILE,
 * and a host needs to tell "this is not a package" from "this package is malicious" from "this
 * document has no body".
 *
 * The read is BOUNDED — decompression ratio, part count, XML depth and element counts are all
 * capped — because the bytes are untrusted by definition.
 */
declare function openTreeSession(bytes: Uint8Array, options?: OpenTreeSessionOptions): OpenTreeSessionResult;
/** The origin a host should use when committing a reconciliation rather than a user edit. */
declare const PROJECTION_ORIGIN: "dev.docx-editor.core.origin.projection";

export { type DocumentStyleEntry as D, type MapResult as M, type OpenTreeSessionResult as O, PROJECTION_ORIGIN as P, type TreeDocxSession as T, type TreeApplyResult as a, type TreeBindingRejection as b, type TreeSessionRejection as c, bodyParagraphs as d, docToTreeOps as e, type DocumentThemeColorEntry as f, openTreeSession as o, partHasNode as p, reconcileDoc as r, treeToDoc as t };
