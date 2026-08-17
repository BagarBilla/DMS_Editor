import { O as OoxmlNode, f as OoxmlParagraphNode, g as OoxmlNoteNode, h as OoxmlContinuationSeparatorNode, i as OoxmlEndnotesNode, j as OoxmlFootnotesNode, k as OoxmlNoteRefNode, l as OoxmlNoteReferenceNode, m as OoxmlSeparatorNode } from './ooxml-tree-BU0e3DVi.cjs';

/** UTF-16 placeholder for one atomic note unit in `paragraphTextOf` / segments. */
declare const NOTE_ATOM_CHAR = "\uFFFC";
/** Signed 32-bit Word-compatible note id range (positive allocation only). */
declare const NOTE_ID_MIN = 1;
/** Largest note id Word accepts — signed 32-bit. */
declare const NOTE_ID_MAX = 2147483647;
/** Reserved separator / continuation ids — never allocated for normal notes. */
declare const NOTE_SEPARATOR_ID = -1;
/** Reserved id of the continuation-separator entry. Never allocated to a real note. */
declare const NOTE_CONTINUATION_SEPARATOR_ID = 0;
/** Which notes part a note lives in. Decides both placement and numbering rules. */
type NoteKind = 'footnote' | 'endnote';
/** Authored `ST_FtnEdn` including explicit `normal`. Absent means Word default (normal). */
/**
 * What a note entry IS.
 *
 * Only `normal` is a note a reader sees. The others are the furniture Word stores in the same
 * part — the rules and notices drawn around the note area — reached by reserved ids.
 */
type NoteType = 'normal' | 'separator' | 'continuationSeparator' | 'continuationNotice';
/** Parse a signed decimal note id; reject non-integers and out-of-int32 values. */
declare function parseNoteId(raw: string | undefined): number | null;
/**
 * Canonical `EditorScope { kind: 'note'; id }` encoding.
 *
 * Footnote id `1` and endnote id `1` coexist, so the kind is part of the string:
 * `footnote:2` / `endnote:-1`. Do not invent a parallel scope union arm.
 */
declare function formatNoteScopeId(noteKind: NoteKind, noteId: number): string;
/**
 * Parse {@link formatNoteScopeId}. Returns `null` for malformed / out-of-range ids.
 */
declare function parseNoteScopeId(id: string): {
    readonly noteKind: NoteKind;
    readonly noteId: number;
} | null;
/** Whether a node is a `w:footnotes` part root. */
declare function isFootnotesNode(node: OoxmlNode): node is OoxmlFootnotesNode;
/** Whether a node is a `w:endnotes` part root. */
declare function isEndnotesNode(node: OoxmlNode): node is OoxmlEndnotesNode;
/** Whether a node is a `w:footnote` or `w:endnote` body. */
declare function isNoteNode(node: OoxmlNode): node is OoxmlNoteNode;
/** Whether a node is a body-side `w:footnoteReference` / `w:endnoteReference`. */
declare function isNoteReferenceNode(node: OoxmlNode): node is OoxmlNoteReferenceNode;
/** Whether a node is the `w:footnoteRef` / `w:endnoteRef` mark inside a note's own body. */
declare function isNoteRefNode(node: OoxmlNode): node is OoxmlNoteRefNode;
/** Whether a node is the `w:separator` rule drawn above the note area. */
declare function isSeparatorNode(node: OoxmlNode): node is OoxmlSeparatorNode;
/** Whether a node is the `w:continuationSeparator` rule used on continuation pages. */
declare function isContinuationSeparatorNode(node: OoxmlNode): node is OoxmlContinuationSeparatorNode;
/** Typed or generic `w:footnote` / `w:endnote`. */
declare function noteKindOf(node: OoxmlNode): NoteKind | null;
/** Authored `@w:id` on a note or noteReference when parseable. */
declare function noteIdOf(node: OoxmlNode): number | null;
/** Authored `@w:type` (`ST_FtnEdn`) when present and schema-legal; else `undefined`. */
declare function noteTypeOf(node: OoxmlNode): NoteType | undefined;
/** Whether a note is a normal (body) note — absent type and explicit `normal` both count. */
declare function isNormalNote(node: OoxmlNode): boolean;
/** Typed or generic footnote/endnote reference kind. */
declare function noteReferenceKindOf(node: OoxmlNode): NoteKind | null;
/** Typed or generic `w:footnoteRef` / `w:endnoteRef`. */
declare function noteRefKindOf(node: OoxmlNode): NoteKind | null;
/**
 * Read `@w:customMarkFollows` on a note reference.
 * Returns `undefined` when absent; otherwise the OOXML on/off interpretation.
 */
declare function customMarkFollows(node: OoxmlNode): boolean | undefined;
/** Model text contributed by one atomic note unit. */
declare function noteAtomText(): typeof NOTE_ATOM_CHAR;
/**
 * True when a run-inner node is a typed note atom that contributes one UTF-16 unit.
 * Demoted/malformed known locals stay generic and contribute nothing.
 */
declare function isNoteAtomNode(node: OoxmlNode): boolean;
/**
 * One atomic note span inside a paragraph for caret / delete / selection.
 *
 * Each typed note atom is a single-node span (`removeNodeIds` = that node).
 */
interface AtomicNoteSpan {
    readonly kind: 'noteReference' | 'noteRef' | 'separator' | 'continuationSeparator';
    readonly node: OoxmlNode;
    readonly runId: string;
    readonly removeNodeIds: readonly string[];
}
/**
 * Collect typed note atoms in document order (one segment each).
 *
 * Walks the same paragraph-inline surface as `segmentsOf` / `walkParagraphInline`:
 * hyperlinks and content controls flatten; only direct run children contribute atoms.
 * A demoted run-inner SDT husk stays opaque — no phantom addressable hit.
 */
declare function atomicNoteSpansOf(paragraph: OoxmlParagraphNode): readonly AtomicNoteSpan[];
/** Cap on notes scanned when allocating / indexing a notes part. */
declare const MAX_NOTES_PER_PART = 10000;
/**
 * Allocate the next positive signed 32-bit note id for a notes-part root.
 * Seeds from `max(existing)+1`; never returns ≤0; `null` on exhaustion.
 */
declare function allocateNoteId(notesRoot: OoxmlNode): number | null;
/** Collect note bodies from a footnotes/endnotes root, bounded. */
declare function notesOf(root: OoxmlNode): readonly OoxmlNoteNode[];
/** Find a typed note by id inside a notes-part root. */
declare function findNoteById(root: OoxmlNode, noteId: number): OoxmlNoteNode | undefined;

export { type AtomicNoteSpan as A, notesOf as B, parseNoteId as C, parseNoteScopeId as D, MAX_NOTES_PER_PART as M, type NoteKind as N, NOTE_ATOM_CHAR as a, NOTE_CONTINUATION_SEPARATOR_ID as b, NOTE_ID_MAX as c, NOTE_ID_MIN as d, NOTE_SEPARATOR_ID as e, type NoteType as f, allocateNoteId as g, atomicNoteSpansOf as h, customMarkFollows as i, findNoteById as j, formatNoteScopeId as k, isContinuationSeparatorNode as l, isEndnotesNode as m, noteTypeOf as n, isFootnotesNode as o, isNormalNote as p, isNoteAtomNode as q, isNoteNode as r, isNoteRefNode as s, isNoteReferenceNode as t, isSeparatorNode as u, noteAtomText as v, noteIdOf as w, noteKindOf as x, noteRefKindOf as y, noteReferenceKindOf as z };
