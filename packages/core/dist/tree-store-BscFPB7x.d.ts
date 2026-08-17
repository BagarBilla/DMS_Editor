import { e as OoxmlPart } from './ooxml-tree-BU0e3DVi.js';
import { O as OoxmlPackage } from './ooxml-package-D_CtywTW.js';
import { I as ImpactClass, T as TreeDocOp, a as TreeOpRejection } from './tree-op-types-DWLCllG7.js';

/** A selection the caller wants restored when an entry is undone or redone. */
/** A selection captured with a transaction, so undo restores where the caret was. */
interface SelectionMark {
    readonly paragraphId: string;
    readonly start: number;
    readonly end: number;
}
/**
 * Which editable story a ModelChange came from.
 *
 * Mirrors `EditorScope` for body and header/footer — `{ kind: 'headerFooter'; rId }` —
 * so package-aware mutation and the public scope contract stay one vocabulary. Body
 * commits omit `rId`; header/footer commits carry the relationship id that addressed
 * the part. Notes parts use `{ kind: 'notesPart'; noteKind }` (one store per part).
 */
/** Which story a transaction targets: the body, a header/footer part, or a notes part. */
type TreeStoryRef = {
    readonly kind: 'body';
    readonly partName: string;
} | {
    readonly kind: 'headerFooter';
    readonly partName: string;
    readonly rId: string;
} | {
    readonly kind: 'notesPart';
    readonly partName: string;
    readonly noteKind: 'footnote' | 'endnote';
};
/**
 * What one committed transaction changed: the revision, the ids touched, and the impact class.
 *
 * The ids are what let layout and paint re-do only the affected blocks instead of the document.
 */
interface TreeModelChange {
    readonly change: 'model-change';
    readonly fromRevision: number;
    readonly toRevision: number;
    readonly commitId: string;
    readonly origin: string;
    readonly dirty: readonly string[];
    readonly created: readonly string[];
    readonly deleted: readonly string[];
    readonly splitJoin: readonly ({
        readonly split: {
            readonly from: string;
            readonly tail: string;
        };
    } | {
        readonly join: {
            readonly kept: string;
            readonly removed: string;
        };
    })[];
    readonly dependencyKeys: readonly string[];
    /** The widest impact among the transaction's ops — what layout must scope to. */
    readonly impact: ImpactClass;
    /**
     * Story that published this change. Absent on body-only store publishes that predate
     * package-aware targeting; `TreePackageStore` always sets it.
     */
    readonly story?: TreeStoryRef;
    /**
     * Committed collapsed caret for this transaction, when one exists.
     * Matches history `selectionAfter` when that mark is collapsed; absent for explicit
     * null, non-collapsed explicit selection, or when no caret was committed.
     */
    readonly caret?: SelectionMark;
}
/** Whether a transaction committed, or the typed reason it was refused. */
type TransactResult = {
    readonly ok: true;
    readonly change: TreeModelChange | null;
} | {
    readonly ok: false;
    readonly reason: TreeOpRejection;
    readonly detail?: string;
};
/** What a transaction body is handed: the working tree, and the means to stage ops against it. */
interface TransactionContext {
    /** Stage one op against the STORY part. Returns false once the transaction has failed. */
    apply(op: TreeDocOp): boolean;
    /**
     * Stage one op against a named part.
     *
     * A comment body lives in `comments.xml` and is edited by the same ops that edit the story,
     * so this is `apply` with the target named rather than a second vocabulary.
     */
    applyTo(partName: string, op: TreeDocOp): boolean;
    /**
     * Stage a whole-package edit: a new part, a relationship, a content-type override.
     *
     * The edit is a pure function of the working package, so a rejected transaction discards it
     * with everything else. Returning the SAME package is a no-op, not a failure — a primitive
     * that finds nothing to do says so that way.
     */
    applyPackage(edit: (pkg: OoxmlPackage) => OoxmlPackage): boolean;
    /** The selection to restore when this entry is undone. */
    selectionBefore(selection: SelectionMark | null): void;
    /** The selection to restore when this entry is redone. */
    selectionAfter(selection: SelectionMark | null): void;
}
/** How one transaction behaves: its story scope, its attribution, and its selection marks. */
interface TransactOptions {
    readonly origin?: string;
    /**
     * A COMMAND is one user intent that may need several ops (a toolbar click applying a
     * property across a multi-run selection). It is still exactly one history entry, which is
     * the same rule a plain transaction follows — the option exists to say so explicitly at
     * the call site rather than leaving it implied.
     */
    readonly scope?: 'transaction' | 'command';
    /**
     * Floor on the published impact. Header/footer story edits use `global` so every page
     * sharing the part invalidates rather than keeping stale furniture.
     */
    readonly minimumImpact?: ImpactClass;
    /** Story identity stamped onto the published ModelChange (package-aware targeting). */
    readonly story?: TreeStoryRef;
}
interface HistoryEntry {
    /**
     * The whole package as it was, not just the story part.
     *
     * Affordable for the same reason a part snapshot was: parts are immutable and deep-frozen, so
     * a package snapshot is a Map of references and every part the transaction did not touch is
     * object-identical to the one before it. Undo stays a pointer swap, and it now reverses every
     * part one intent wrote rather than only the story.
     */
    readonly pkg: OoxmlPackage;
    readonly revision: number;
    readonly selectionBefore: SelectionMark | null;
    readonly selectionAfter: SelectionMark | null;
}
/** How a store is constructed: its limits, its history depth, and its identity source. */
interface TreeDocumentStoreOptions {
    /** Bound on retained history entries. Oldest entries drop first. */
    readonly historyLimit?: number;
}
/**
 * Opaque document+history checkpoint for package-coordinator rollback.
 * Used when a story mutation may promote to a package undo unit (note-ref cascade).
 */
/** A restorable point in history — one entry of the intent-scoped undo stack. */
interface TreeDocumentCheckpoint {
    /**
     * The whole package, not one part. The store owns the package so a transaction spanning
     * several parts is one publication — a checkpoint of only the story part could not roll
     * back the comment or numbering part the same transaction wrote.
     */
    readonly pkg: OoxmlPackage;
    readonly revision: number;
    readonly undoStack: readonly HistoryEntry[];
    readonly redoStack: readonly HistoryEntry[];
    readonly composition: {
        readonly entry: HistoryEntry;
        readonly committed: boolean;
    } | null;
}
/**
 * The document store: one transaction is one atomic publication and one history entry.
 *
 * `apply` STAGES ops against a working part and nothing is visible until `transact` returns, so a
 * batch rejected halfway leaves the revision, the tree, the indexes and every subscriber exactly
 * as they were. That all-or-nothing property is what lets a caller compose ops without having to
 * reason about partial application.
 */
declare class TreeDocumentStore {
    private current;
    /** The part `apply` targets and `part` returns: the story this store is editing. */
    private readonly storyPartName;
    private rev;
    private commitCounter;
    private readonly undoStack;
    private readonly redoStack;
    private readonly subscribers;
    private readonly historyLimit;
    /** Package-aware story tag applied to publishes (including undo/redo). */
    private storyRef;
    /** Open composition, if any. While set, transactions extend one entry (task 5.5). */
    private composition;
    /**
     * Open a store over a package, editing the named story part.
     *
     * A bare part is accepted and wrapped in a single-part package, so callers that never open a
     * real package — tests, headless tooling — are unaffected by the widening.
     */
    constructor(source: OoxmlPart | OoxmlPackage, storyPartNameOrOptions?: string | TreeDocumentStoreOptions, maybeOptions?: TreeDocumentStoreOptions);
    /**
     * Stamp story identity onto subsequent publishes for this store (including undo/redo).
     * Used by the package coordinator so history navigation keeps the same scope tag.
     */
    setStoryRef(story: TreeStoryRef | null): void;
    /** The story part being edited. Unchanged for every caller that predates the widening. */
    get part(): OoxmlPart;
    /** Every part, including the ones a multi-part transaction wrote. */
    get package(): OoxmlPackage;
    get revision(): number;
    get canUndo(): boolean;
    get canRedo(): boolean;
    /** Retained entries — the unit `undo()` reverses, so tests can assert grouping. */
    get historyDepth(): number;
    get compositionActive(): boolean;
    /**
     * Replace the package OUTSIDE the transaction and history lanes.
     *
     * For package writes that are not a user intent and publish no revision: grafting
     * `numbering.xml` into a document that never had one, which the caller performs as a
     * precondition of the list op that follows. Those edits were previously kept in a package
     * variable beside the store, which meant two owners of one value and, predictably, two
     * values — a graft written to one and a save read from the other.
     *
     * Deliberately narrow and deliberately awkward to reach for: anything a user did belongs in
     * `transact`, where it gets a revision, an undo entry and the invariant checks.
     */
    graftPackage(edit: (pkg: OoxmlPackage) => OoxmlPackage): void;
    /**
     * Replace the current part without recording history, but advance the revision so
     * revision-keyed projections cannot survive a package snapshot install.
     */
    replacePart(part: OoxmlPart): void;
    /**
     * Snapshot part, revision, and undo/redo stacks so the package coordinator can roll
     * back a story transaction that fails after commit (e.g. note-reference cascade) or
     * discard a local history entry when promoting to a package undo unit.
     */
    checkpoint(): TreeDocumentCheckpoint;
    /** Full restore — part, revision, history stacks, and composition. */
    restoreCheckpoint(checkpoint: TreeDocumentCheckpoint): void;
    /**
     * Restore undo/redo stacks only, keeping the current part and revision.
     * Used when a story mutation is promoted to a package history pointer so the local
     * orphan entry does not steal a later undo.
     */
    restoreHistoryStacks(checkpoint: TreeDocumentCheckpoint): void;
    subscribe(listener: (change: TreeModelChange) => void): () => void;
    /**
     * Run one atomic transaction.
     *
     * Ops are staged against a working copy. On the first rejection the whole transaction is
     * abandoned: no revision, no history entry, no notification. On success exactly one
     * revision is published and exactly one history entry is recorded — unless a composition
     * is open, in which case the entry already exists and this transaction joins it.
     */
    transact(build: (ctx: TransactionContext) => void, options?: TransactOptions): TransactResult;
    /**
     * Open one history entry for an IME composition.
     *
     * Everything committed until `endComposition` collapses into this single entry, which is
     * what makes a composed word one undo step rather than one per intermediate transaction.
     */
    beginComposition(selectionBefore?: SelectionMark | null): void;
    /** Close the composition, recording its entry only if anything actually committed. */
    endComposition(): void;
    /**
     * Cancel an open composition without recording an entry, leaving whatever it committed
     * in place. An IME cancel is not an undo request; the caller decides what to revert.
     */
    cancelComposition(): void;
    undo(): TreeModelChange | null;
    redo(): TreeModelChange | null;
    /** The selection to restore for the entry `undo()` would reverse next. */
    selectionForUndo(): SelectionMark | null;
    /** The selection to restore for the entry `redo()` would reapply next. */
    selectionForRedo(): SelectionMark | null;
    private pushUndo;
    private publish;
}

export { type SelectionMark as S, type TreeModelChange as T, type TreeStoryRef as a, TreeDocumentStore as b, type TransactionContext as c, type TransactOptions as d, type TreeDocumentCheckpoint as e, type TreeDocumentStoreOptions as f, type TransactResult as g };
