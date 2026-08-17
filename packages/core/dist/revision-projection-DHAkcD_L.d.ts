import { O as OoxmlNode } from './ooxml-tree-BU0e3DVi.js';

/**
 * What a revision wrapper asserts about the content inside it.
 *
 * `moveFrom` / `moveTo` are deliberately distinct from `delete` / `insert`: a move is one
 * decision with two halves, and presenting it as an unrelated deletion and insertion invites
 * resolving one without the other, which duplicates or loses the content.
 */
type RevisionKind = 'insert' | 'delete' | 'moveFrom' | 'moveTo' | 'format';
/**
 * One revision wrapper's provenance, as authored.
 *
 * `id` is the verbatim `@w:id` string rather than a number: `ST_DecimalNumber` restricts
 * `xsd:integer` with no bounds, so a file may carry a value outside the safe integer range, and
 * parsing it to a number would silently merge two distinct revisions.
 *
 * `date` is absent when the file omits it. `@w:date` is optional on `CT_TrackChange`, and
 * inventing one is a silent content change.
 */
interface RevisionAttribution {
    readonly kind: RevisionKind;
    readonly id: string;
    readonly author: string;
    readonly date?: string;
    /** The wrapper's node id, so a surface can address this exact site. */
    readonly nodeId: string;
}
/**
 * Which revisions layout resolves before producing pages.
 *
 * - `all-markup` shows both halves of every change.
 * - `proposed` shows what the document becomes if every change is accepted.
 * - `original` shows what it was before any of them.
 *
 * The last two are specified as equal to accept-all and reject-all OUTPUT, which is what makes
 * them testable, without either applying an op.
 */
type RevisionDisplayMode = 'all-markup' | 'proposed' | 'original';
/**
 * How a document renders tracked changes when nothing says otherwise.
 *
 * `all-markup` matches Word's own default: a reader who opens a document with pending changes
 * sees them, rather than a clean-looking document hiding edits nobody has accepted.
 */
declare const DEFAULT_REVISION_DISPLAY_MODE: RevisionDisplayMode;
/**
 * Whether content under this stack of revisions is laid out in the given mode.
 *
 * Containment governs, so a single enclosing wrapper the mode resolves away suppresses
 * everything inside it regardless of what the inner wrappers say. An insertion inside a
 * deletion does not survive the proposed result: the deletion it sits in was accepted.
 */
declare function revisionsVisible(revisions: readonly RevisionAttribution[], mode: RevisionDisplayMode): boolean;
/**
 * The revision on a paragraph's own MARK, from `w:pPr/w:rPr/w:ins|w:del`.
 *
 * `EG_ParaRPrTrackChanges` records that the pilcrow itself was inserted or deleted, which is how
 * Word writes a paragraph split or merge. It is not content — there is no text to decorate — so
 * a surface shows it as a mark of its own beside the paragraph, the way Word draws a struck-
 * through ¶.
 *
 * Property-position `w:ins`/`w:del` stay `generic` in the tree deliberately, so this reads them
 * by name rather than by kind.
 */
declare function paragraphMarkRevisionOf(paragraph: OoxmlNode): RevisionAttribution | null;
/**
 * The tracked FORMAT change on a property list, from `w:rPrChange` or `w:pPrChange`.
 *
 * A property change alters no characters, so it has no span of its own to strike or underline.
 * Word marks the affected text and says what changed; the minimum a reader needs is to see that
 * this text's formatting is itself a pending decision.
 *
 * Read from the flattened property list because that is what layout already carries — the
 * change wrapper is a `w:rPr`/`w:pPr` child like any other.
 */
declare function formatRevisionOf(properties: readonly {
    readonly localName: string;
    readonly attributes?: Readonly<Record<string, string>>;
}[]): RevisionAttribution | null;
/** True when this stack of revisions marks its content as deleted from the live document. */
declare function revisionsAreDeletion(revisions: readonly RevisionAttribution[]): boolean;

export { DEFAULT_REVISION_DISPLAY_MODE as D, type RevisionDisplayMode as R, type RevisionAttribution as a, type RevisionKind as b, revisionsVisible as c, formatRevisionOf as f, paragraphMarkRevisionOf as p, revisionsAreDeletion as r };
