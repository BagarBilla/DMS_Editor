import { e as OoxmlPart } from '../ooxml-tree-BU0e3DVi.js';
export { R as RevisionAddress } from '../tree-op-types-DWLCllG7.js';
import { R as RevisionDisplayMode } from '../revision-projection-DHAkcD_L.js';
import { R as ReviewModelInput, a as ReviewItem, b as ReviewRevisionItem } from '../review-support-B9ykYpoZ.js';
export { C as CommentRecord, c as ReviewCommentItem, d as ReviewCustomItem, e as ReviewPosition, f as ReviewRange, g as ReviewRevisionKind } from '../review-support-B9ykYpoZ.js';

/**
 * `@docx-editor.dev/core/contracts/modules` — the `EditorModule` seam.
 *
 * How a paid or optional capability contributes to the engine without the free tier importing
 * it: the review module and custom nodes both arrive through here, and their absence leaves the
 * corresponding chrome disabled with the engine's own reason.
 *
 * NOT a plugin system. The shape is closed: every contribution point is named
 * here, core iterates registered modules at its existing dispatch points, and
 * core never imports a capability package. A capability absent from this file
 * is not extendable from outside — deliberately, so the one-pipeline principle
 * survives the packaging boundary.
 * The free engine behaves identically with an empty registry: documents
 * round-trip losslessly, revisions render in their final-state projection, and
 * the review chrome slots stay disabled with the engine's own reason.
 *
 * @packageDocumentation
 * @public
 */

/**
 * Derives the review queue — every pending revision decision and comment
 * thread — from one story part plus its comment parts. Implemented by the pro
 * review module; the free engine has no implementation and reports an empty
 * queue.
 *
 * @public
 */
type CollectReviewItems = (input: ReviewModelInput) => readonly ReviewItem[];
/**
 * What a review module contributes: the queue derivation, and the revision
 * display modes the editor may enter beyond the free tier's final-state
 * projection.
 *
 * @public
 */
interface ReviewModuleContribution {
    /**
     * Display modes this module unlocks (the free engine renders `proposed` only).
     *
     * Currently DECLARATIVE: any registered review module restores the layout
     * default (`all-markup`), and no runtime mode switch exists yet. The list is
     * carried so the future `setRevisionDisplayMode` command can validate against
     * it without a breaking module-shape change.
     */
    readonly displayModes: readonly RevisionDisplayMode[];
    /** The review queue derivation. */
    readonly collectReviewItems: CollectReviewItems;
    /**
     * Revisions wholly inside one paragraph — for the conservative local review
     * patch after a text-local body edit.
     */
    readonly revisionItemsOfParagraph: (part: OoxmlPart, paragraphId: string) => readonly ReviewRevisionItem[];
}
/**
 * One registered capability module. Registration is construction-time
 * (`createDocxEditor({ modules })`) and immutable for the instance's lifetime.
 *
 * @public
 */
interface EditorModule {
    /** Diagnostic identity (`'review'`, `'custom-nodes'`); not a dispatch key. */
    readonly id: string;
    /** Review capability: queue derivation, commands gate, display modes. */
    readonly review?: ReviewModuleContribution;
    /**
     * Custom inline node definitions. Reserved: the definition shape lands with
     * the custom-nodes lane; the registry carries them opaquely until then.
     */
    readonly customNodes?: readonly unknown[];
    /**
     * customXml payload namespaces this module OWNS, swept for orphans when a document opens.
     *
     * A payload lives in a customXml data part, and Word will not delete one when a user deletes
     * the control bound to it — nothing in OOXML asks it to. So a document can arrive holding
     * payloads for chips that no longer exist, and reconciling against what the story actually
     * binds is the only thing that collects them.
     *
     * The claim is what keeps the sweep off other people's stores: Word's own Cover Page
     * Properties store rides in most templates, and a sweep that walked every customXml part
     * would be deleting from it on the strength of a name collision. A namespace no module names
     * is never touched.
     */
    readonly customNodePayloadNamespaces?: readonly string[];
    /**
     * Told when the recognition pass finds something wrong with a node in THIS editor's document.
     *
     * Carried per module rather than kept by the capability package, so two editors on one page
     * hear only their own documents and a detached editor's listener goes with it. The shape is
     * opaque here for the same reason `customNodes` is: what a diagnostic means belongs to the
     * package that raised it.
     */
    readonly onCustomNodeDiagnostic?: (diagnostic: unknown) => void;
}
/**
 * The resolved registry the editor instance holds: at most one review
 * contribution (first registration wins), all custom node definitions in
 * registration order.
 */
interface EditorModuleRegistry {
    readonly review: ReviewModuleContribution | null;
    readonly customNodes: readonly unknown[];
    /** Every claimed payload namespace, deduplicated, in registration order. */
    readonly customNodePayloadNamespaces: readonly string[];
    /** Every registered diagnostic listener, in registration order. */
    readonly customNodeDiagnostics: readonly ((diagnostic: unknown) => void)[];
}
/** Resolve construction-time modules into the registry the instance dispatches over. */
declare function resolveEditorModules(modules: readonly EditorModule[] | undefined): EditorModuleRegistry;

export { type CollectReviewItems, type EditorModule, type EditorModuleRegistry, OoxmlPart, ReviewItem, ReviewModelInput, type ReviewModuleContribution, ReviewRevisionItem, RevisionDisplayMode, resolveEditorModules };
