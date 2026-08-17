import { e as OoxmlPart, O as OoxmlNode } from './ooxml-tree-BU0e3DVi.js';
import { O as OoxmlPackage } from './ooxml-package-D_CtywTW.js';
import { S as SupportedImageMime, b as ImageDecodePort } from './image-resources-C_YnqPhn.js';
import { m as DrawingTreeDocOp, a as TreeOpRejection, T as TreeDocOp } from './tree-op-types-DWLCllG7.js';
import { c as HeaderFooterKind, H as HeaderFooterVariant } from './hf-references-BdjsQNE_.js';
import { N as NoteKind } from './note-nodes-BPSTVDMr.js';
import { T as TreeModelChange, a as TreeStoryRef, b as TreeDocumentStore, c as TransactionContext, d as TransactOptions, S as SelectionMark, e as TreeDocumentCheckpoint } from './tree-store-BscFPB7x.js';

/** A freshly allocated drawing property id, or the reason one could not be minted. */
type DrawingPropertyIdResult = {
    readonly ok: true;
    readonly id: number;
} | {
    readonly ok: false;
    readonly reason: 'invalidArgs';
};
/**
 * Mint a `wp:docPr` id unused anywhere in the package.
 *
 * Package-wide rather than per-part: Word treats these ids as document-global, and a collision
 * makes it renumber on open.
 */
declare function allocateDrawingPropertyId(pkg: OoxmlPackage): DrawingPropertyIdResult;
/**
 * Store raw bytes for a part and declare its exact content type.
 *
 * Does not create a relationship; callers decide which owner points at the part.
 */
declare function withBinaryPart(pkg: OoxmlPackage, partName: string, bytes: Uint8Array, contentType: string): OoxmlPackage;
/**
 * Add image bytes to the package: the media part, its content type, and the relationship.
 *
 * All three together — bytes with no relationship are unreachable, and a relationship with no
 * content-type record makes the package invalid.
 */
declare function withEmbeddedImage(pkg: OoxmlPackage, ownerPartName: string, input: Readonly<{
    bytes: Uint8Array;
    mime: SupportedImageMime;
}>): Readonly<{
    ok: true;
    pkg: OoxmlPackage;
    partName: string;
    relationshipId: string;
    docPrId: number;
}> | Readonly<{
    ok: false;
    reason: 'invalidArgs' | 'invalid-image';
}>;
/** Remove an orphaned image media part after a package-wide internal relationship target check. */
declare function withoutUnreferencedImagePart(pkg: OoxmlPackage, partName: string): OoxmlPackage;
interface ExternalImageFetchPort {
    /** Atomically resolve, reject non-public addresses, and connect for one HTTPS hop. */
    requestPublicHttps(url: string, init: Readonly<{
        redirect: 'manual';
        signal: AbortSignal;
    }>): Promise<Readonly<{
        status: number;
        location: string | null;
        contentType: string | null;
        body: AsyncIterable<Uint8Array>;
        /** Must equal the requested absolute URL for this hop. */
        connectedUrl: string;
    }>>;
}

/** Which of a family's four faces an embedded font relationship supplies. */
type FontStyleKey = 'regular' | 'bold' | 'italic' | 'boldItalic';
/**
 * One font whose bytes travel inside the package.
 *
 * The family name is the DOCUMENT's and is not validated — it is attacker-controlled, so it is
 * escaped into CSS and never registered globally on `document.fonts`, where it would shadow the
 * host application's own fonts.
 */
interface EmbeddedFont {
    /** The family as the document names it. Not validated against anything. */
    readonly family: string;
    readonly style: FontStyleKey;
    /** Deobfuscated bytes, ready to be offered to a font validator. */
    readonly bytes: Uint8Array;
    /** The part they came from, for diagnostics. */
    readonly partName: string;
}
/**
 * Undo Word's embedded-font obfuscation (ECMA-376 Part 4 §2.8.1).
 *
 * The key is the `w:fontKey` GUID's 16 bytes in REVERSED order — not the per-group
 * little-endian reading a GUID usually gets. It is XORed over the first 32 bytes of the
 * part, applied twice. Getting the order wrong produces a font that looks corrupt rather
 * than obfuscated, which is indistinguishable from a damaged file at the point it fails.
 *
 * Pure XOR, so the same operation obfuscates and deobfuscates.
 */
declare function deobfuscateFont(bytes: Uint8Array, fontKey: string): Uint8Array | null;
/** Limits and instrumentation for reading embedded fonts out of a package. */
interface ReadEmbeddedFontsOptions {
    /** Refuse a font part larger than this. Defaults to 16 MB. */
    readonly maxFontBytes?: number;
    /** Refuse more than this many fonts. Defaults to 64. */
    readonly maxFonts?: number;
}
/**
 * Every font the package embeds, deobfuscated.
 *
 * Silently skips anything malformed rather than rejecting the document: a broken font table
 * is a reason to fall back to substitution, never a reason to refuse to open the file.
 */
declare function readEmbeddedFonts(pkg: OoxmlPackage, fontTable: OoxmlPart | undefined, options?: ReadEmbeddedFontsOptions): EmbeddedFont[];

/** The two list kinds a toolbar offers. */
type ListKind = 'bullet' | 'ordered';
interface EnsuredListDefinition {
    readonly pkg: OoxmlPackage;
    /** The `w:numId` a paragraph's `w:numPr` should name. */
    readonly numId: string;
}
/**
 * Find or create a list definition of `kind`, returning the package that holds it.
 *
 * An existing definition of the same kind is REUSED rather than duplicated: Word does the
 * same, and a document that gains one `w:abstractNum` per toggled paragraph becomes
 * unreadable. Returns null only when the part cannot be built at all.
 */
declare function ensureListDefinition(pkg: OoxmlPackage, kind: ListKind): EnsuredListDefinition | null;
/**
 * Declare `level` in the definition `numId` names, with Word's default format for that
 * level, or refuse.
 *
 * Word never greys Increase Indent out on a list item: demoting past the deepest level a
 * `w:abstractNum` declares makes Word DEFINE the level, cycling its stock bullets
 * (Symbol •, Courier `o`, Wingdings ▪) or number formats (decimal, lowerLetter,
 * lowerRoman) by depth. This is that write. An already-declared level returns the package
 * unchanged, so callers may ask first and act second without a second lookup.
 *
 * A delegating definition (`w:numStyleLink`, 17.9.21) is refused: its levels live on the
 * linked style's definition, and a `w:lvl` grafted here would be shadowed the moment the
 * link resolves.
 */
declare function ensureNumberingLevel(pkg: OoxmlPackage, numId: string, level: number, kind: ListKind): OoxmlPackage | null;

/** One bookmark's name and the range its marker pair currently encloses. */
interface BookmarkAnchor {
    readonly name: string;
    /** Canonical node id of the paragraph the marker sits in. */
    readonly paragraphId: string;
    /** UTF-16 offset within that paragraph, in `paragraphTextOf`'s vocabulary. */
    readonly offset: number;
}
/** Bookmarks by name. A name the document declares twice resolves to the first in order. */
type BookmarkIndex = ReadonlyMap<string, BookmarkAnchor>;
/**
 * Build `name -> position` for every bookmark start in a part, in document order.
 *
 * FIRST IN DOCUMENT ORDER WINS on a duplicate name. Word treats a repeated bookmark name as
 * the same bookmark and jumps to the first, and the alternative — last-wins — makes a jump
 * target move when an edit far away happens to duplicate a name.
 *
 * The offset is measured the way the ops measure: text of the runs before the marker inside
 * its own paragraph, hyperlink runs included, so the position a jump places the caret at is a
 * position `setSelection` accepts.
 */
declare function buildBookmarkIndex(part: OoxmlPart): BookmarkIndex;

/** Lifecycle impact — furniture always reaches multiple pages; never narrower than flow-structural. */
type HeaderFooterLifecycleImpact = 'flow-structural' | 'global';
/**
 * A header/footer lifecycle mutation: create, remove, or relink a variant.
 *
 * Package-level, like note lifecycle: each touches the document, the header/footer part, the
 * relationships and `[Content_Types].xml` together.
 */
type HeaderFooterLifecycleOp = {
    readonly op: 'createHeaderFooter';
    readonly sectionIndex: number;
    readonly kind: HeaderFooterKind;
    readonly variant: HeaderFooterVariant;
    /** When true, also set section `w:titlePg` in the same package transaction. */
    readonly titlePage?: boolean;
    /** When true, also set document `w:evenAndOddHeaders` in the same package transaction. */
    readonly evenAndOddHeaders?: boolean;
} | {
    readonly op: 'deleteHeaderFooter';
    readonly sectionIndex: number;
    readonly kind: HeaderFooterKind;
    readonly variant: HeaderFooterVariant;
} | {
    readonly op: 'linkToPrevious';
    readonly sectionIndex: number;
    readonly kind: HeaderFooterKind;
    readonly variant: HeaderFooterVariant;
} | {
    readonly op: 'unlinkFromPrevious';
    readonly sectionIndex: number;
    readonly kind: HeaderFooterKind;
    readonly variant: HeaderFooterVariant;
} | {
    readonly op: 'setSectionFurnitureOptions';
    readonly sectionIndex?: number;
    readonly titlePage?: boolean;
    readonly evenAndOddHeaders?: boolean;
    readonly headerDistanceTwips?: number;
    readonly footerDistanceTwips?: number;
};
/** Why a header/footer lifecycle op was refused. */
type HeaderFooterLifecycleRejection = 'invalidArgs' | 'tree-invariant';
/** A new package, or a typed rejection. Pure and all-or-nothing — no partial writes. */
type HeaderFooterLifecycleResult = {
    readonly ok: true;
    readonly package: OoxmlPackage;
    readonly impact: HeaderFooterLifecycleImpact;
    readonly createdRId?: string;
    readonly createdPartName?: string;
} | {
    readonly ok: false;
    readonly reason: HeaderFooterLifecycleRejection;
    readonly detail?: string;
};
/** Whether an op is a header/footer lifecycle op rather than a story-level one. */
declare function isHeaderFooterLifecycleOp(op: {
    readonly op: string;
}): op is HeaderFooterLifecycleOp;
/**
 * Apply one furniture lifecycle op atomically. Rejected ops leave the input package
 * untouched (pure function — callers discard the result).
 */
declare function applyHeaderFooterLifecycleOp(pkg: OoxmlPackage, op: HeaderFooterLifecycleOp): HeaderFooterLifecycleResult;

/** Cap on nodes visited while scanning for note references across stories. */
declare const MAX_NOTE_REFERENCE_SCAN = 20000;
/**
 * Cap on XML parts walked in one package-wide note-reference scan (N/N+1 gate).
 * Soft targets are not allowed: exceeding this marks the shared budget truncated.
 */
declare const MAX_NOTE_REFERENCE_PARTS = 256;
/**
 * A load-time note problem worth reporting.
 *
 * `dangling-note-reference` is a citation pointing at no note; `note-reference-scan-truncated`
 * says the scan hit its budget, so absence of further diagnostics is not proof of correctness.
 */
type NoteDiagnosticCode = 'dangling-note-reference' | 'note-reference-scan-truncated';
/**
 * Load-time note diagnostics. Array API preserved; truncation is signaled as a typed
 * entry rather than by throwing or rejecting the package.
 */
type NoteDiagnostic = {
    readonly code: 'dangling-note-reference';
    readonly noteKind: NoteKind;
    readonly noteId: number;
    /** Paragraph / container node id when known. */
    readonly sourceNodeId?: string;
} | {
    /** Hard visited/part budget or soft hit cap stopped the scan before full coverage. */
    readonly code: 'note-reference-scan-truncated';
};
/** One note reference found in a story, with where it sits. */
interface NoteReferenceHit {
    readonly noteKind: NoteKind;
    readonly noteId: number;
    readonly nodeId: string;
    readonly paragraphId: string;
    /** Canonical UTF-16 atom offset within {@link paragraphId} (U+FFFC model). */
    readonly atomOffset: number;
    readonly customMarkFollows: boolean;
    /** Canonical part name that owns this reference. */
    readonly partName: string;
}
/** Mutable visited-node + part budget shared across parts / package snapshots. */
interface NoteReferenceScanBudget {
    visited: number;
    readonly maxVisited: number;
    parts: number;
    readonly maxParts: number;
    /** Set when a walk stops before finishing because a cap was hit. */
    truncated: boolean;
}
/** A bounded budget for scanning note references, so a crafted document cannot stall a load. */
declare function createNoteReferenceScanBudget(maxVisited?: number, maxParts?: number): NoteReferenceScanBudget;
/**
 * Resolve the footnotes or endnotes part via safe Internal document relationships.
 *
 * Unusable matching relationships (External, unsafe target, missing part, wrong root)
 * are skipped — never fetched, never accepted — so a decoy first match cannot hide a
 * later usable Internal notes part (same continue-past-bad pattern as settingsPartOf).
 */
declare function resolveNotesPart(pkg: OoxmlPackage, noteKind: NoteKind): OoxmlPart | null;
/**
 * Walk a part for addressable typed note references. Bounded by visited nodes; skips deep
 * hostile nesting by marking the shared budget truncated. When `budget` is supplied it is
 * shared and mutated in place. Hits are segment-aligned (`segmentsOf`); demoted wrappers
 * never invent atomOffsets.
 */
declare function collectNoteReferences(part: OoxmlPart, options?: {
    readonly maxHits?: number;
    readonly budget?: NoteReferenceScanBudget;
}): readonly NoteReferenceHit[];
/** Collect references across every XML part under one shared part + visited-node budget. */
declare function collectPackageNoteReferences(pkg: OoxmlPackage, options?: {
    readonly budget?: NoteReferenceScanBudget;
    /** Soft hit cap for diagnostics. Omit / Infinity for mutation scans. */
    readonly maxHits?: number;
}): readonly NoteReferenceHit[];
/**
 * Load diagnostics for dangling note references. Fail-open: never throws or mutates;
 * returns diagnostics for callers to surface. Does not invent missing note bodies.
 *
 * When the hard visited/part budget truncates or the soft hit cap binds, appends a single
 * `note-reference-scan-truncated` entry so incomplete coverage is visible without breaking
 * consumers that filter on `dangling-note-reference`.
 */
declare function diagnoseNoteReferences(pkg: OoxmlPackage): readonly NoteDiagnostic[];
/** Whether a notes-part root contains a note with the given id (any type). */
declare function notesPartHasId(part: OoxmlPart, noteId: number): boolean;
/** List normal (body) note ids in document order, bounded. */
declare function normalNoteIds(part: OoxmlPart): readonly number[];

/** How far a note lifecycle op reaches — which parts a caller must expect to have changed. */
type NoteLifecycleImpact = 'flow-structural' | 'global';
/**
 * A note lifecycle mutation: insert, delete, convert, or set properties.
 *
 * Package-level rather than story-level, because every one of these touches the main document,
 * the notes part, the document relationships AND `[Content_Types].xml` together.
 */
type NoteLifecycleOp = {
    readonly op: 'insertNote';
    readonly noteKind: NoteKind;
    readonly paragraphId: string;
    readonly offset: number;
} | {
    readonly op: 'deleteNote';
    readonly noteKind: NoteKind;
    readonly noteId: number;
} | {
    readonly op: 'convertNote';
    readonly fromKind: NoteKind;
    readonly noteId: number;
} | {
    /**
     * Convert every normal note of `fromKind` in document order. One atomic package
     * transaction / undo unit with the same validation as repeated `convertNote`.
     */
    readonly op: 'convertAllNotes';
    readonly fromKind: NoteKind;
} | {
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
};
/** Why a note lifecycle op was refused. */
type NoteLifecycleRejection = 'invalidArgs' | 'tree-invariant';
/**
 * A new package, or a typed rejection.
 *
 * Application is PURE and all-or-nothing: there are no partial writes, so a refused op leaves the
 * caller's package untouched rather than half-migrated across four parts.
 */
type NoteLifecycleResult = {
    readonly ok: true;
    readonly package: OoxmlPackage;
    readonly impact: NoteLifecycleImpact;
    readonly noteId?: number;
    readonly noteKind?: NoteKind;
    readonly createdPartName?: string;
} | {
    readonly ok: false;
    readonly reason: NoteLifecycleRejection;
    readonly detail?: string;
};
/** Whether an op is a note lifecycle op rather than a story-level one. */
declare function isNoteLifecycleOp(op: {
    readonly op: string;
}): op is NoteLifecycleOp;
/** Attribution and limits applied to one note lifecycle op. */
interface NoteLifecycleOptions {
    /**
     * Shared part + visited-node budget for reference scans. When omitted a fresh default
     * budget is used. Truncation rejects the op with the original package unchanged.
     */
    readonly scanBudget?: NoteReferenceScanBudget;
}
/**
 * Apply one note lifecycle op atomically. Rejected ops leave the input package untouched.
 */
declare function applyNoteLifecycleOp(pkg: OoxmlPackage, op: NoteLifecycleOp, options?: NoteLifecycleOptions): NoteLifecycleResult;
/**
 * How deleting text cascades into the notes it referenced.
 *
 * A note's body and the citation reaching it are one thing to a reader, so removing the reference
 * must remove the body too or the notes part keeps an entry nothing points at.
 */
interface CascadeDeletedNoteReferencesOptions {
    /**
     * Independent full budgets per snapshot. When omitted each snapshot gets its own
     * default budget — never share one counter across before/after walks.
     */
    readonly beforeBudget?: NoteReferenceScanBudget;
    readonly afterBudget?: NoteReferenceScanBudget;
}
/**
 * Remove note bodies for references that disappeared between two package snapshots.
 * Used when `deleteText` or `deleteBlock` removes a `noteReference` atom so body+ref stay
 * one undo unit.
 *
 * Each snapshot gets an independent full visited/part budget. If either scan truncates
 * the cascade fails closed so a hostile package cannot skip body deletion silently —
 * without accidentally halving capacity by charging both walks to one counter.
 */
declare function cascadeDeletedNoteReferences(before: OoxmlPackage, after: OoxmlPackage, options?: CascadeDeletedNoteReferencesOptions): OoxmlPackage | null;

/** What the document asks for. Every field defaults to "the document said nothing". */
interface DocumentTrackingSettings {
    /** `w:trackRevisions` — the document asks for edits to be tracked. */
    readonly trackRevisions: boolean;
    /**
     * `w:documentProtection/@w:edit="trackedChanges"` — tracking may not be turned OFF.
     *
     * Advisory. Presenting it as enforcement would be a lie about a file anyone can edit.
     */
    readonly restrictedToTrackedChanges: boolean;
    /** `w:doNotTrackMoves` — write a move as a delete and an insert. */
    readonly doNotTrackMoves: boolean;
    /** `w:doNotTrackFormatting` — apply formatting without recording a `w:rPrChange`. */
    readonly doNotTrackFormatting: boolean;
}
/** The frozen "nothing is tracked" settings — what a document with no `w:trackChanges` gets. */
declare const NO_TRACKING_SETTINGS: DocumentTrackingSettings;
/** Read the tracking settings from a `settings.xml` root, or the defaults when it has none. */
declare function readTrackingSettings(settingsRoot: OoxmlNode | null | undefined): DocumentTrackingSettings;

interface InsertImageInput {
    readonly paragraphId: string;
    readonly offset: number;
    readonly bytes: Uint8Array;
    readonly mime: SupportedImageMime;
    readonly widthPoints: number;
    readonly heightPoints: number;
    readonly decodePort: ImageDecodePort;
    readonly expectedPackageRevision: number;
    readonly commitGuard?: () => boolean;
    readonly title?: string;
    readonly description?: string;
    readonly hyperlink?: string;
}
interface ReplaceImageOptions {
    readonly expectedPackageRevision: number;
    readonly commitGuard?: () => boolean;
}
type ImageIntentResult = (Extract<PackageTransactResult, {
    ok: true;
}> & {
    readonly drawingNodeId?: string;
    readonly mediaPartName?: string;
}) | Extract<PackageTransactResult, {
    ok: false;
}>;
interface ApplyImagePropertiesInput {
    readonly drawingNodeId: string;
    readonly ops: readonly DrawingTreeDocOp[];
    readonly hyperlink: string | null;
}

type NoteCascadeFn = (before: OoxmlPackage, after: OoxmlPackage) => OoxmlPackage | null;
/**
 * Editable story target.
 *
 * Body and headerFooter mirror `EditorScope`. Notes use one lazy store per notes part
 * (`notesPart`) — not one store per note — resolved through safe document relationships.
 */
type StoryScope = {
    readonly kind: 'body';
} | {
    readonly kind: 'headerFooter';
    readonly rId: string;
} | {
    readonly kind: 'notesPart';
    readonly noteKind: NoteKind;
};
/**
 * Why a story scope could not be resolved to a part.
 *
 * Several of these are FILE-hostile shapes rather than caller mistakes:
 * `external-relationship` and `bad-relationship-target` are how a crafted document tries to
 * point a story at something outside the package, and both are refused rather than followed.
 */
type StoryTargetRejection = 'unknown-scope' | 'dangling-relationship' | 'wrong-relationship-type' | 'external-relationship' | 'bad-relationship-target' | 'missing-part' | 'not-a-story-part' | 'too-many-story-stores';
/** A story scope resolved to a part, or the typed reason it could not be. */
type StoryResolveResult = {
    readonly ok: true;
    readonly story: TreeStoryRef;
    readonly store: TreeDocumentStore;
} | {
    readonly ok: false;
    readonly reason: StoryTargetRejection;
    readonly detail?: string;
};
/** Whether a package-level transaction committed, or why it was refused. */
type PackageTransactResult = {
    readonly ok: true;
    readonly change: TreeModelChange | null;
} | {
    readonly ok: false;
    readonly reason: StoryTargetRejection | TreeOpRejection;
    readonly detail?: string;
};
/** Cap on simultaneously opened editable story stores (body + HF parts). Fail closed. */
declare const DEFAULT_MAX_EDITABLE_STORY_PARTS = 64;
/** How a package store is constructed: limits, history depth, and review contributions. */
interface TreePackageStoreOptions {
    readonly historyLimit?: number;
    /** Bound on opened story stores; defaults to {@link DEFAULT_MAX_EDITABLE_STORY_PARTS}. */
    readonly maxEditableStoryParts?: number;
    /**
     * Test seam for note-reference cascade after `deleteText` / `deleteBlock`. Production uses
     * {@link cascadeDeletedNoteReferences}.
     */
    readonly cascadeDeletedNoteReferences?: NoteCascadeFn;
}
/**
 * Package-level mutation authority: routes `TreeDocOp`s to the store for a story part,
 * publishes one ModelChange / undo unit per transaction, and keeps `currentPackage()`
 * coherent for save/reopen.
 */
declare class TreePackageStore {
    private pkg;
    private packageRev;
    private readonly body;
    /** Opened non-body story stores, keyed by canonical part name. */
    private readonly stories;
    /** rId → part name for opened HF stores (and resolved targets). */
    private readonly rIdToPartName;
    private readonly undoOrder;
    private readonly redoOrder;
    private readonly subscribers;
    private readonly historyLimit;
    private readonly maxEditableStoryParts;
    private readonly cascadeNoteReferences;
    private lastChange;
    /**
     * Hyperlink externals minted via {@link replacePackageShell} (outside package history).
     * Re-applied on snapshot install so lifecycle undo cannot drop shell `r:id`s; not used for
     * lifecycle-cloned owned relationships, which history snapshots already restore.
     */
    private shellHyperlinks;
    /**
     * Open IME composition session. Captures the package/story checkpoint at begin so a
     * mid-composition note-ref cascade can promote the whole composition to one package
     * undo unit (or restore on cancel) instead of a story-only pointer that orphans note bodies.
     */
    private compositionSession;
    private commitCounter;
    constructor(pkg: OoxmlPackage, main: OoxmlPart, options?: TreePackageStoreOptions);
    get packageRevision(): number;
    get canUndo(): boolean;
    get canRedo(): boolean;
    get lastModelChange(): TreeModelChange | null;
    /** Body store — independent revision/index from every HF store. */
    bodyStore(): TreeDocumentStore;
    /**
     * The current package with every opened story store's part merged in.
     * Pure snapshot of authority; callers must not mutate.
     *
     * Stores whose parts are absent from the package shell (deleted furniture/notes)
     * stay parked for undo/redo identity but are not re-injected into the snapshot.
     */
    currentPackage(): OoxmlPackage;
    subscribe(listener: (change: TreeModelChange) => void): () => void;
    /**
     * Resolve a story scope to its store. Fail closed for dangling / wrong-typed / missing
     * targets — layout may fail open on the same rId, but mutation must not invent a part.
     */
    resolveStory(scope: StoryScope): StoryResolveResult;
    /** Current part for a scope, or null when the target is refused. */
    partFor(scope: StoryScope): OoxmlPart | null;
    /** Per-story revision, or null when the target is refused. */
    revisionFor(scope: StoryScope): number | null;
    /**
     * Commit ops against one story as ONE transaction / undo unit / ModelChange.
     * Header/footer and notes-part commits publish `impact: 'global'`.
     * Deleting a `noteReference` via `deleteText` or a block subtree via `deleteBlock`
     * cascades the note body in the same package undo unit.
     */
    transact(scope: StoryScope, build: (ctx: TransactionContext) => void, options?: Omit<TransactOptions, 'story' | 'minimumImpact'>): PackageTransactResult;
    /** Whether a package-wide IME composition session is open on any story. */
    compositionSessionOpen(): boolean;
    beginComposition(scope: StoryScope, selectionBefore?: SelectionMark | null): boolean;
    endComposition(): void;
    cancelComposition(): void;
    /**
     * Commit one furniture or note lifecycle op as a single ModelChange / undo unit that
     * restores the entire package atomically (parts, rels, content-types, settings).
     */
    applyLifecycleOp(op: HeaderFooterLifecycleOp | NoteLifecycleOp | TreeDocOp): PackageTransactResult;
    undo(): TreeModelChange | null;
    redo(): TreeModelChange | null;
    selectionForUndo(): SelectionMark | null;
    selectionForRedo(): SelectionMark | null;
    /** How many story stores are open (body counts as one). */
    openedStoryCount(): number;
    /**
     * Insert a validated raster image as one package undo unit (task 12).
     */
    insertImage(scope: StoryScope, input: InsertImageInput): Promise<ImageIntentResult>;
    /** Replace a picture drawing's embedded media in one package undo unit. */
    replaceImage(scope: StoryScope, drawingNodeId: string, bytes: Uint8Array, mime: SupportedImageMime, decodePort: ImageDecodePort, options: ReplaceImageOptions): Promise<ImageIntentResult>;
    /** Delete a picture drawing and collect orphaned media in one package undo unit. */
    deleteImage(scope: StoryScope, drawingNodeId: string): ImageIntentResult;
    /** Fetch external bytes explicitly and embed them; no fetch on open/load. */
    embedExternalImage(scope: StoryScope, drawingNodeId: string, url: string, port: ExternalImageFetchPort, signal: AbortSignal, decodePort: ImageDecodePort): Promise<ImageIntentResult>;
    /** Metadata plus hyperlink target creation in one package transaction. */
    setDrawingMetadataWithHyperlink(scope: StoryScope, drawingNodeId: string, title: string, description: string, hyperlink: string | null): ImageIntentResult;
    /** Properties batch with hyperlink relationship create/update/remove in one package unit. */
    applyImageProperties(scope: StoryScope, input: ApplyImagePropertiesInput): ImageIntentResult;
    /**
     * Promote a story transaction that wrote package bytes to one package undo pointer.
     * Used by image intents and note-reference cascade.
     */
    promoteStoryTransactionToPackageUnit(beforePackage: OoxmlPackage, store: TreeDocumentStore, checkpoint: TreeDocumentCheckpoint, beforeDepth: number): TreeModelChange;
    /**
     * Publish a story transaction the coordinator did not run.
     *
     * Comment writes commit straight on the story store and hand the new shell back through
     * {@link replacePackageShell}, so they never pass through `applyTreeOps` — the one place
     * every other edit bumps the revision and publishes. The subscriber channel therefore
     * stayed silent for a comment: `Editor.on('change')` never fired, and a review rail keyed
     * on it only caught up on the next unrelated caret move, so a reply someone had just
     * written was invisible until they clicked elsewhere.
     *
     * The STORY's own change is published rather than a synthetic one, because it carries the
     * dirty anchor paragraphs and the `text-local` impact the marker ops computed; a synthetic
     * `global` would make every comment cost a full relayout. History is deliberately
     * untouched — the story transaction already recorded its undo entry, exactly as
     * `applyTreeOps` leaves a non-cascading story edit.
     *
     * A `null` change is an identity no-op (nothing was written), and publishes nothing.
     */
    publishStoryWrite(change: TreeModelChange | null): TreeModelChange | null;
    /**
     * Record a write that spanned SEVERAL parts as one package undo unit.
     *
     * A comment is not in one part — the body in `comments.xml`, the thread record in
     * `commentsExtended.xml`, the markers in the story — and those writes reach the store
     * through the story store directly rather than through `transact`. The story store's own
     * history entry cannot undo them: `undo()` on a story pointer syncs the STORY PART back and
     * nothing else, so undoing a comment restored the markers and left the body behind, or the
     * other way round. The caller discards the story entry and hands the package it started
     * from to this instead, which is the same promotion the note cascade does.
     */
    adoptPackageUnit(before: OoxmlPackage): void;
    /** Install a full package snapshot (public seam for post-fetch cleanup). */
    installPackageSnapshot(snapshot: OoxmlPackage): void;
    /**
     * Replace the package shell while preserving opened stores. Used when numbering /
     * content-types mutate the package outside story trees.
     */
    replacePackageShell(pkg: OoxmlPackage): void;
    /**
     * Install a full package snapshot: body + opened story stores track the snapshot's parts.
     * Stores whose parts disappeared stay parked (history identity preserved) so a later
     * package undo can reconnect them; rId cache rebuilds from remaining relationships.
     *
     * Numbering / shell-minted hyperlink resources (via {@link replacePackageShell}) are merged
     * onto the snapshot so lifecycle undo cannot orphan story `numId` / `r:id` references.
     * Furniture and notes parts remain snapshot-owned; shell hyperlink `.rels` for those owners
     * park when the part is temporarily absent and are pruned once history can no longer restore
     * the owner. Lifecycle-cloned owned relationships are not shell-minted and GC with the part.
     */
    private installPackageSnapshotInternal;
    private openNotesPartStore;
    private openHeaderFooterStore;
    private storyRefForPart;
    private syncPackageFromStore;
    private pushUndoPointer;
    /**
     * Drop parked story stores that no current package part and no undo/redo pointer can
     * restore. History-reachable identities stay so edit→delete→undo reconnects the same
     * store; unreachable parked entries must not hold `maxEditableStoryParts` forever.
     *
     * Also prunes scoped hyperlink shell resources parked for owners that are no longer
     * live and not history-reachable (see `pruneUnreachableHyperlinkShell`).
     */
    private evictUnreachableStories;
    private retainedStoryPartNames;
    /**
     * Owners whose scoped hyperlink shell must survive while furniture/notes parts are
     * temporarily absent: opened/parked story retention plus every part name that package
     * history can still restore (even when the story store was never opened).
     */
    private retainedHyperlinkOwnerParts;
    private retainPointerStoryParts;
    private retainPointerHyperlinkOwners;
    private publish;
    private publishSynthetic;
}

/**
 * The payload half of an insert: which store, which node, and what it holds.
 *
 * `data` is opaque here. The lane that owns a schema is the one that declared it, and a store
 * that parsed payloads would be a second opinion about what a host's node means.
 */
interface CustomNodePayloadWrite {
    /** Namespace of the store's root element — what identifies one store among several. */
    readonly namespaceUri: string;
    /** Local name of that root. An NCName; anything else refuses. */
    readonly rootLocalName: string;
    /** The node's own id, which the binding's xpath quotes. */
    readonly nodeId: string;
    /** The text the control shows. Word paints this from the store, so an empty one is an empty chip. */
    readonly label: string;
    /** The payload, serialized. JSON by convention; never parsed here. */
    readonly data: string;
}
/** Where the control goes, what it says, and the payload it carries. */
interface InsertCustomNodeWrite {
    readonly paragraphId: string;
    readonly offset: number;
    /**
     * Wrap rather than insert: the text from `offset` to here is removed first.
     *
     * The node's label REPLACES the words it covered, because that is what turning a stretch of a
     * sentence into a citation means. Removed inside the same transaction, so a refused insert
     * leaves the text where it was.
     */
    readonly replaceUntil?: number;
    /**
     * Rewrite an existing control: it and the payload it bound go first, in this transaction.
     *
     * An UPDATE is remove-and-reinsert, because the tag codec has no in-place rewrite and
     * pretending it did would put a second write path beside this one. Doing both halves here is
     * what keeps it one undo step, and what stops an update from leaving a label and a payload
     * that disagree.
     */
    readonly replaceControlId?: string;
    readonly tag: string;
    readonly text: string;
    readonly alias?: string;
    /** Defaults to none. Callers that want Word's own "cannot type into it" pass `contentLocked`. */
    readonly lock?: 'sdtLocked' | 'sdtContentLocked' | 'contentLocked';
    /** Omitted authors an ordinary tagged control with no store — the pre-payload behaviour. */
    readonly payload?: CustomNodePayloadWrite;
}
/**
 * Why a payload write was refused.
 *
 * The tree rejections pass through unchanged, so a locked paragraph refuses a bound insert for
 * the same named reason it refuses a plain one. The three added here are the payload's own.
 */
type CustomNodeWriteRejection = TreeOpRejection
/** The id, root name or namespace cannot be spelled in an XPath, so no binding could name it. */
 | 'unaddressable-payload'
/** The store could not be authored — see `withCustomXmlDataPart` for every way that happens. */
 | 'store-not-authored'
/** The payload or the label is past the cap. */
 | 'payload-too-large';
type CustomNodeWriteResult = {
    readonly ok: true;
    readonly change: TreeModelChange | null;
    /**
     * The control this write authored, when it authored one. A rewrite replaces the control
     * rather than editing it, so the id the caller passed in names nothing afterwards.
     */
    readonly nodeId?: string;
} | {
    readonly ok: false;
    readonly reason: CustomNodeWriteRejection;
    readonly detail?: string;
};
/**
 * The largest payload one node may carry, in UTF-16 code units.
 *
 * Same figure as the read side's (`parseCustomNodeData`) and for the same reason: far past any
 * legitimate chip, far short of anything that hurts. Checked on the WRITE too, so a document
 * cannot be authored here holding a payload the reader will later refuse to parse.
 */
declare const MAX_CUSTOM_NODE_PAYLOAD_LENGTH: number;
/** The longest label a binding may paint. Word renders it as the control's whole content. */
declare const MAX_CUSTOM_NODE_LABEL_LENGTH = 4096;
/**
 * Insert one custom node, with its payload, as a single transaction.
 *
 * Answers the store transaction's own change so the caller can publish it — a payload write is a
 * package write reaching through a story store, exactly as a comment is, and the coordinator
 * needs the change to know which paragraphs went dirty.
 */
declare function insertCustomNodeWrite(store: TreeDocumentStore, write: InsertCustomNodeWrite, 
/**
 * The part the customXml store hangs off, defaulting to the story being written.
 *
 * A chip in a header is written against the HEADER store, but Word enumerates the data
 * store from the main document part — a store authored off a header is one Word never
 * sees. So the caller passes the main part while the control itself lands in the story.
 */
dataOwnerPartName?: string): CustomNodeWriteResult;
/**
 * Remove a control and, in the same transaction, the payload it bound.
 *
 * The sweep would collect the node eventually — that is what makes deletion in Word survivable —
 * but "eventually" is the next open, and a document saved in between carries a payload for a
 * chip that is gone. Doing it here means the ordinary case is exact and the sweep is a backstop.
 */
declare function removeCustomNodeWrite(store: TreeDocumentStore, controlNodeId: string): CustomNodeWriteResult;
/**
 * What one sweep collected, or why it collected nothing.
 *
 * `ok: false` is NOT "the document was already tidy" — that is `ok: true` with an empty
 * `removed`. It means a store this sweep was asked to tidy refused the rewrite, which a caller
 * that keeps saving into the same document should know about rather than silently retry forever.
 */
type CustomNodeSweepResult = {
    readonly ok: true;
    readonly pkg: OoxmlPackage;
    /** Node ids removed, across every store swept. Empty means there were no orphans. */
    readonly removed: readonly string[];
} | {
    readonly ok: false;
    readonly reason: string;
};
/**
 * Drop every payload no control binds, in the stores whose namespaces a host claims.
 *
 * ON OPEN, NOT ON SAVE. A chip cut to the clipboard is unbound for as long as it sits there, so a
 * save mid-cut would destroy the payload the user is about to paste. On open the only unbound
 * nodes are ones a control genuinely lost — deleted here, or deleted in Word, which is the case
 * nothing else can collect.
 *
 * `namespaces` is the claim, and it is what keeps this off other people's stores: Word's own Cover
 * Page Properties store rides in most templates, and a sweep that walked every customXml part
 * would be deleting from it on the strength of a name collision.
 */
declare function sweepCustomNodePayloads(pkg: OoxmlPackage, storyPartName: string, namespaces: readonly string[]): CustomNodeSweepResult;
/** One control's payload, as the store holds it. Both strings are untrusted file input. */
interface CustomNodePayloadRead {
    /** The store node's own id. */
    readonly nodeId: string;
    /** The text Word paints the control from. */
    readonly label: string;
    /** The payload as authored. JSON by convention, unparsed here. */
    readonly data: string;
}
/**
 * The payload every control in a story binds to, keyed by the CONTROL's canonical node id.
 *
 * Keyed by the control rather than by the store node because that is the question a reader
 * actually has — "what does this chip carry" — and because two stores may each hold a `cx1`.
 * Resolved here rather than by a capability package: the stores are package parts, and a
 * derivation that only gets story parts has no way to reach them.
 *
 * Every store the story relates to, so a document carrying two definitions' payloads answers
 * for both without anyone naming a namespace.
 */
declare function customNodePayloadsByControl(pkg: OoxmlPackage, storyPartName: string): ReadonlyMap<string, CustomNodePayloadRead>;
/** Every payload one store holds, for a caller resolving a control's `data`. */
declare function customNodePayloadsOf(pkg: OoxmlPackage, storyPartName: string, namespaceUri: string): ReadonlyMap<string, {
    readonly label: string;
    readonly data: string;
}>;
/**
 * What the session answers for a sweep: the ids collected, or the reason none were.
 *
 * Narrower than {@link CustomNodeSweepResult}, which also carries the rewritten package — the
 * session has already installed that, and handing it back would invite a caller to install it
 * twice.
 */
type CustomNodeSweepOutcome = {
    readonly ok: true;
    readonly removed: readonly string[];
} | {
    readonly ok: false;
    readonly reason: string;
};

export { customNodePayloadsByControl as $, type ApplyImagePropertiesInput as A, type BookmarkIndex as B, type CustomNodeWriteResult as C, type DocumentTrackingSettings as D, type EmbeddedFont as E, type FontStyleKey as F, type NoteReferenceScanBudget as G, type HeaderFooterLifecycleImpact as H, type InsertCustomNodeWrite as I, type ReadEmbeddedFontsOptions as J, type StoryResolveResult as K, type ListKind as L, MAX_CUSTOM_NODE_LABEL_LENGTH as M, NO_TRACKING_SETTINGS as N, type TreePackageStoreOptions as O, type PackageTransactResult as P, allocateDrawingPropertyId as Q, type ReplaceImageOptions as R, type StoryScope as S, TreePackageStore as T, applyHeaderFooterLifecycleOp as U, applyNoteLifecycleOp as V, buildBookmarkIndex as W, cascadeDeletedNoteReferences as X, collectNoteReferences as Y, collectPackageNoteReferences as Z, createNoteReferenceScanBudget as _, type StoryTargetRejection as a, customNodePayloadsOf as a0, deobfuscateFont as a1, diagnoseNoteReferences as a2, ensureListDefinition as a3, ensureNumberingLevel as a4, insertCustomNodeWrite as a5, isHeaderFooterLifecycleOp as a6, isNoteLifecycleOp as a7, normalNoteIds as a8, notesPartHasId as a9, readEmbeddedFonts as aa, readTrackingSettings as ab, removeCustomNodeWrite as ac, resolveNotesPart as ad, sweepCustomNodePayloads as ae, withBinaryPart as af, withEmbeddedImage as ag, withoutUnreferencedImagePart as ah, type CustomNodeSweepOutcome as b, type InsertImageInput as c, type ImageIntentResult as d, type BookmarkAnchor as e, type CascadeDeletedNoteReferencesOptions as f, type CustomNodePayloadRead as g, type CustomNodePayloadWrite as h, type CustomNodeSweepResult as i, type CustomNodeWriteRejection as j, DEFAULT_MAX_EDITABLE_STORY_PARTS as k, type DrawingPropertyIdResult as l, type HeaderFooterLifecycleOp as m, type HeaderFooterLifecycleRejection as n, type HeaderFooterLifecycleResult as o, MAX_CUSTOM_NODE_PAYLOAD_LENGTH as p, MAX_NOTE_REFERENCE_PARTS as q, MAX_NOTE_REFERENCE_SCAN as r, type NoteDiagnostic as s, type NoteDiagnosticCode as t, type NoteLifecycleImpact as u, type NoteLifecycleOp as v, type NoteLifecycleOptions as w, type NoteLifecycleRejection as x, type NoteLifecycleResult as y, type NoteReferenceHit as z };
