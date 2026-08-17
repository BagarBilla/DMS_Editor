import { e as OoxmlPart, O as OoxmlNode, a as OoxmlElement } from './ooxml-tree-BU0e3DVi.js';
import { O as OoxmlPackage } from './ooxml-package-D_CtywTW.js';
import { R as RevisionAddress } from './tree-op-types-DWLCllG7.js';

/** `w:pos` — where a section's footnotes are laid out. */
type FootnotePosition = 'pageBottom' | 'beneathText' | 'sectEnd' | 'docEnd';
/** `w:pos` for endnotes — only the two document-level placements are legal. */
type EndnotePosition = 'sectEnd' | 'docEnd';
/** `w:numRestart` — when note numbering starts over. `eachPage` needs the reference's page. */
type NoteNumRestart = 'continuous' | 'eachSect' | 'eachPage';
/** Authored subset — only keys present in the file appear. */
interface AuthoredNoteProperties {
    readonly pos?: string;
    readonly numFmt?: string;
    readonly numStart?: number;
    readonly numRestart?: string;
}
/** Fully resolved footnote properties (defaults filled). */
interface ResolvedFootnoteProperties {
    readonly pos: FootnotePosition;
    readonly numFmt: string;
    readonly numStart: number;
    readonly numRestart: NoteNumRestart;
}
/** Fully resolved endnote properties (defaults filled). */
interface ResolvedEndnoteProperties {
    readonly pos: EndnotePosition;
    readonly numFmt: string;
    readonly numStart: number;
    readonly numRestart: NoteNumRestart;
}
/** Word's own footnote defaults, applied where a section declares no `w:footnotePr`. */
declare const DEFAULT_FOOTNOTE_PROPERTIES: ResolvedFootnoteProperties;
/**
 * Word-compatible defaults. ECMA-376 says omitted endnote `numFmt` is decimal;
 * MS-OE376 / MS-OI29500 document that Word’s default is `lowerRoman` instead.
 * Resolved (not authored) — unedited packages still invent nothing on save.
 */
declare const DEFAULT_ENDNOTE_PROPERTIES: ResolvedEndnoteProperties;
/** Parse authored CT_FtnProps / CT_EdnProps without inventing defaults. */
declare function parseAuthoredNoteProperties(propsNode: OoxmlNode | null | undefined): AuthoredNoteProperties | undefined;
/** Authored footnotePr on a sectPr node. */
declare function authoredFootnotePropertiesFromSectPr(sectPr: OoxmlNode | null | undefined): AuthoredNoteProperties | undefined;
/** Authored endnotePr on a sectPr node. */
declare function authoredEndnotePropertiesFromSectPr(sectPr: OoxmlNode | null | undefined): AuthoredNoteProperties | undefined;
/** Locate settings.xml via the main document relationship when present. */
declare function settingsPartOf(pkg: OoxmlPackage): OoxmlPart | null;
/** Authored document-level footnotePr from settings. */
declare function authoredDocumentFootnoteProperties(settings: OoxmlPart | null | undefined): AuthoredNoteProperties | undefined;
/** Authored document-level endnotePr from settings. */
declare function authoredDocumentEndnoteProperties(settings: OoxmlPart | null | undefined): AuthoredNoteProperties | undefined;
/**
 * Resolve footnote properties: section → document → defaults.
 * Illegal position strings fall through to the next layer / default.
 */
declare function resolveFootnoteProperties(section?: AuthoredNoteProperties, document?: AuthoredNoteProperties): ResolvedFootnoteProperties;
/**
 * Resolve endnote properties: section → document → defaults.
 * `pageBottom` is never a legal endnote position — falls back.
 */
declare function resolveEndnoteProperties(section?: AuthoredNoteProperties, document?: AuthoredNoteProperties): ResolvedEndnoteProperties;
/** Validate an authored endnote position write — refuse `pageBottom`. */
declare function isLegalEndnotePosition(pos: string): pos is EndnotePosition;
/** Validate an authored footnote position write. */
declare function isLegalFootnotePosition(pos: string): pos is FootnotePosition;
/** Whether a file-supplied string is a legal `w:numRestart` value. Narrows the type. */
declare function isLegalNumRestart(value: string): value is NoteNumRestart;

/** The `w15` namespace: `commentsExtended.xml` — thread parent and resolved state. */
declare const W15_NAMESPACE_URI = "http://schemas.microsoft.com/office/word/2012/wordml";
/** A position in one story: a paragraph node id plus a UTF-16 offset inside it. */
interface CommentPosition {
    readonly paragraphId: string;
    readonly offset: number;
}
/**
 * Where a comment is anchored, as a range.
 *
 * `orphaned` records that the file did not give this comment a usable range — a reference with
 * no range markers, or a start with no end. The comment is still listed, marked orphaned,
 * rather than dropped: a reviewer's remark disappearing silently is worse than one that says
 * it lost its text.
 */
interface CommentAnchor {
    readonly commentId: string;
    /** Canonical name of the part the range lives in, so a header comment is attributable. */
    readonly partName: string;
    readonly start: CommentPosition;
    readonly end: CommentPosition;
    readonly orphaned: boolean;
}
/** One comment as authored in `word/comments.xml`. */
interface CommentRecord {
    readonly id: string;
    readonly author: string;
    readonly initials?: string;
    readonly date?: string;
    /** Body paragraphs, as tree nodes, so the surface renders measured text rather than a string. */
    readonly blocks: readonly OoxmlElement[];
    /** `w14:paraId` of the last body paragraph — the key thread state is stored under. */
    readonly paraId?: string;
    /** `@w16cid:parentId` — the `w:id` of the comment this replies to, when the file names it. */
    readonly parentCommentId?: string;
}
/** Thread state for one comment, read from `commentsExtended.xml`. */
interface CommentThreadState {
    /** `@w15:paraIdParent` — the comment this one replies to, absent for a top-level comment. */
    readonly parentParaId?: string;
    readonly done: boolean;
}
/**
 * Every comment anchor in one story, in document order.
 *
 * Overlapping and nested ranges are supported because each anchor is resolved independently —
 * Word produces both, and a model that assumed ranges nest cleanly would mis-anchor them.
 *
 * A start with no matching end anchors to the end of its own paragraph and is reported orphaned
 * rather than guessed at: extending it to the next end marker would attach a reviewer's remark
 * to text they never saw.
 */
declare function commentAnchorsOfStory(part: OoxmlPart): CommentAnchor[];
/**
 * The comments in `word/comments.xml`, in authored order.
 *
 * Every value here comes from a file an attacker fully controls, so nothing is interpreted:
 * author, initials and date are carried verbatim for a surface that will set them as TEXT.
 */
declare function commentsOfPart(part: OoxmlPart): CommentRecord[];
/**
 * Thread state by `w14:paraId`, from `commentsExtended.xml`.
 *
 * The part being PRESENT is not evidence of threading. `issue-68-large-comments-suggestions.docx`
 * ships it with 212 entries carrying `@w15:done` and not one `@w15:paraIdParent`, so it records
 * resolved state for a flat list. Absent parent means top-level, and that is a fact about the
 * file rather than a default this code chose.
 */
declare function threadStateOfPart(part: OoxmlPart): Map<string, CommentThreadState>;

/** A position in the model offset space of one story. */
interface ReviewPosition {
    readonly paragraphId: string;
    readonly offset: number;
}
/** Where an item is anchored: a range in one story. */
interface ReviewRange {
    readonly partName: string;
    readonly start: ReviewPosition;
    readonly end: ReviewPosition;
}
/**
 * What kind of decision a revision card represents.
 *
 * Wider than the four content wrappers, because a reviewer has to be shown every pending
 * decision, including the ones that decorate no characters. A card the surface cannot show is
 * a change the reviewer never learns about — and `acceptAllRevisions` refuses if ANY revision
 * in the document is one the engine cannot resolve, so an invisible one makes Accept All fail
 * for a reason nothing on screen explains.
 */
type ReviewRevisionKind = 'insert' | 'delete'
/**
 * A deletion and an insertion that are one edit: text typed over a selection.
 *
 * Word shows these as a single `Replaced "x" with "y"` card, and resolving one half
 * without the other is never what the reviewer meant — accepting the deletion alone
 * leaves the replacement text unproposed, rejecting it alone leaves both.
 */
 | 'replace' | 'moveFrom' | 'moveTo'
/** `w:rPrChange` / `w:pPrChange` — the words are unchanged, their formatting is not. */
 | 'format'
/** `w:pPr/w:rPr/w:ins|w:del` — a paragraph split or merge. */
 | 'paragraphMark'
/** A row, cell, section or grid revision. Supported row revisions are resolvable. */
 | 'structural';
/** One tracked change as the store derives it, keyed per decision rather than per site. */
interface ReviewRevisionItem {
    readonly kind: 'revision';
    /** Stable across renders and unique per DECISION, not per site. */
    readonly id: string;
    /** The payload `acceptRevision` / `rejectRevision` take. */
    readonly address: RevisionAddress;
    /**
     * EVERY address this decision covers, `address` first.
     *
     * More than one only for a replacement, whose halves a foreign editor may have written
     * as two independent revisions. Accept and reject walk all of them in one transaction:
     * resolving one half and leaving the other is a state no reviewer asked for.
     */
    readonly addresses: readonly RevisionAddress[];
    /** The words a replacement removes. Empty for every other kind. */
    readonly replacedText: string;
    readonly revisionKind: ReviewRevisionKind;
    readonly author: string;
    readonly date?: string;
    /** Text the revision covers, for the card summary. Empty for changes with no characters. */
    readonly text: string;
    /** Every site this decision touches, in document order. */
    readonly ranges: readonly ReviewRange[];
    /**
     * How many leading `ranges` are the STRUCK half of a replacement.
     *
     * A replacement's card is one decision but its ranges are two colours — red over what is
     * going, green over what takes its place. ABSENT when the halves do not split at a single
     * point, which is what a file recording both under one revision id can produce; a surface
     * then has no basis for two colours and should paint one neutral band rather than guess.
     */
    readonly replacedRangeCount?: number;
    /**
     * True when the engine cannot resolve this kind, so accept and reject must not be offered.
     *
     * Derived HERE rather than from a caller-supplied predicate: the refusal list is internal,
     * and a surface asked to compute it would have to guess. A card that offers a button the
     * engine will refuse is worse than one that explains why it cannot.
     */
    readonly readOnly: boolean;
    /** The other half of a move, or the other side of a delete/insert replacement. */
    readonly pairedWith?: string;
    /**
     * Comments answering this change, in document order.
     *
     * A reply to a tracked change IS a comment: `w:ins` and `w:del` carry `(@w:id, @w:author,
     * @w:date)` and no body, so `replyToReviewItem` writes the text as a comment over the
     * revision's own range. Nothing recorded the link, so the reply came back as a separate
     * card — the reader saw their answer detach from the change it answered. The range is the
     * link, and it is the same evidence `commentItemsOf` threads coincident comments on.
     */
    readonly replyIds: readonly string[];
}
/** One comment as the store derives it, with its thread links resolved. */
interface ReviewCommentItem {
    readonly kind: 'comment';
    readonly id: string;
    readonly comment: CommentRecord;
    readonly range: ReviewRange | null;
    readonly resolved: boolean;
    /** The comment this replies to, absent for a top-level comment. */
    readonly parentId?: string;
    /**
     * The REVISION this comment answers, when it covers exactly that change's characters.
     *
     * Separate from {@link parentId} rather than folded into it: the two name different item
     * kinds, and a surface resolving one id against the comment index would find nothing.
     */
    readonly parentRevisionId?: string;
    /** Replies to this comment, in document order. Empty for a reply or a childless comment. */
    readonly replyIds: readonly string[];
    /** True when the file gave this comment no usable range. */
    readonly orphaned: boolean;
}
/**
 * One pending decision as the STORE derives it: a tracked change or a comment. Discriminate on
 * `kind`.
 *
 * The layout layer's own `ReviewItem` widens this with the pro custom-node card, which has no
 * store representation.
 */
type ReviewItem = ReviewRevisionItem | ReviewCommentItem;
/** The stable key a surface uses for the active item and for a React list. */
declare function reviewItemKey(item: ReviewItem): string;
/** Plain text of a comment's body, so a card never re-implements the run walk. */
declare function commentBodyText(comment: CommentRecord): string;
/** Author initials for an avatar, from `@w:initials` or the name. */
declare function commentInitials(comment: CommentRecord): string;
/**
 * Every revision in one story, one card per DECISION.
 *
 * Sites sharing an `(id, author, date)` triple are ONE revision — a tracked row insertion is
 * `w:trPr/w:ins` plus `w:cellIns` on every cell — so they coalesce into one card listing every
 * range it touches. Keying per site would show the reviewer four decisions where there is one,
 * and accepting any of them would make the other three vanish.
 *
 * Memoized per part root like the indexes it reads, and for the same reason: a heavily
 * tracked document produces tens of thousands of cards, and rebuilding them per read cost
 * more than everything the memos above saved. The paragraph-scoped view the local review
 * patch derives (`revisionItemsOfParagraph`'s synthetic paragraph-root part) is NOT cached:
 * each keystroke would insert a fresh root and churn the bounded ring. The instance is
 * SHARED, so the return type is readonly.
 */
declare function revisionItemsOf(part: OoxmlPart): readonly ReviewRevisionItem[];
/**
 * Comment cards, threaded however the file says so and flat when nothing says so.
 *
 * ECMA-376 §17.13.4.2 gives `CT_Comment` no parent pointer, so threading is never something
 * the standard states outright. Three sources, strongest first: `@w15:paraIdParent`, then
 * `@w16cid:parentId` — both in namespaces outside Part 1 — and finally a COINCIDENT anchor, a
 * comment whose `w:commentRangeStart`/`End` cover exactly the characters an earlier comment's
 * cover. The ranges are Part 1's own vocabulary and the only part of a thread that survives a
 * producer dropping the extension parts. Coincidence is the last resort and never overrides a
 * stated link.
 *
 * Deliberately not containment. A remark on one word inside another remark's sentence nests
 * without being a reply, and reading that as a thread would bury an independent comment inside
 * someone else's.
 */
declare function commentItemsOf(comments: readonly CommentRecord[], anchors: readonly {
    commentId: string;
    partName: string;
    start: ReviewPosition;
    end: ReviewPosition;
    orphaned: boolean;
}[], threadState: ReadonlyMap<string, CommentThreadState>): ReviewCommentItem[];
/** What review derivation reads: one story part plus its comment parts. */
interface ReviewModelInput {
    /** The story the ranges live in — the main document, a header, a note. */
    readonly storyPart: OoxmlPart;
    /**
     * Header/footer story parts, in section order. Their revisions and comment anchors join
     * the queue: a tracked change in a header is a pending decision like any other, and a
     * queue that only walked the body silently hid it from the rail AND from Accept All.
     */
    readonly furnitureParts?: readonly OoxmlPart[] | undefined;
    /** `word/comments.xml`, absent when the package has none. */
    readonly commentsPart?: OoxmlPart | undefined;
    /** `word/commentsExtended.xml`, absent when the package has none. */
    readonly commentsExtendedPart?: OoxmlPart | undefined;
}
/**
 * Everything the review surface lists, in document order.
 *
 * Order is by paragraph position within the story, then by offset. A comment and the revision
 * it covers therefore arrive together, which is what lets a surface group them. Furniture
 * stories rank after the body in one merged order — their geometry (the page they first paint
 * on) is a layout question the queue deliberately does not answer.
 */
declare function collectReviewItems(input: ReviewModelInput): ReviewItem[];
/**
 * The shape {@link linkRevisionReplies} needs, stated STRUCTURALLY.
 *
 * The store's queue is revisions and comments; the layout lane's adds a third kind for custom
 * nodes, and neither union is assignable to the other. Both lanes have to run this pass — the
 * store on the full derivation, the session on the locally patched list — so the pass is
 * written against the fields it actually reads rather than against either union, and hands
 * back the caller's own item type.
 */
interface LinkableReviewItem {
    readonly kind: string;
    readonly id: string;
    readonly ranges?: readonly ReviewRange[];
    readonly range?: ReviewRange | null;
    readonly parentId?: string;
    readonly parentRevisionId?: string;
    readonly replyIds?: readonly string[];
    readonly orphaned?: boolean;
}
/**
 * Attach each comment that answers a tracked change to the change it answers.
 *
 * The evidence is the RANGE, exactly as it is for a coincident comment thread: replying to a
 * revision writes a comment over that revision's own characters, because OOXML gives `w:ins`
 * and `w:del` nowhere else to put the text. Without this the reply came back as an independent
 * card in the rail, sitting beside the change rather than inside it, and the reader had no way
 * to see which change their answer belonged to.
 *
 * Three things keep it from over-claiming. A ZERO-WIDTH range is evidence of nothing — the same
 * rule the comment threading uses, and a format or paragraph-mark revision decorates no
 * characters at all. A comment already stated to be a REPLY to another comment is not claimed
 * directly, because a stated link always beats an inferred one. And the FIRST revision on a span
 * wins, so a card cannot claim a reply another card already holds.
 *
 * The WHOLE conversation moves, not its head. A change's card renders `replyIds` as a flat list,
 * so linking only the top comment of a thread left every answer to that answer rendered by
 * nobody: reply twice to one change and the second reply existed in `comments.xml` and appeared
 * nowhere on screen. Descendants ride along, in the order they were authored.
 *
 * IDEMPOTENT, and that is load-bearing. The session re-runs this over a list whose comments are
 * ALREADY linked, so a pass that only ever added links left a stale `parentRevisionId` behind
 * when a keystroke shifted the revision's offsets out from under it — the rail filters such a
 * comment out of its roots, and with no revision claiming it any more the card vanished until
 * the next full re-derivation. Every link is rebuilt from the ranges on every pass.
 */
declare function linkRevisionReplies<T extends LinkableReviewItem>(items: readonly T[]): T[];
/**
 * Paragraph node id → document position, from the TREE rather than from a layout.
 *
 * Memoized on the immutable root: one full derivation pass asks this question three times
 * (replacement pairing, the queue's merged order, the session's cached order), and each
 * answer was a fresh full-tree walk. The instance is SHARED, so the return type is
 * ReadonlyMap: a caller mutating it would poison every later reader of this root.
 */
declare function paragraphOrderOfPart(part: OoxmlPart): ReadonlyMap<string, number>;
/**
 * Like {@link paragraphOrderOfPart}, but descends INTO paragraphs, so paragraphs nested
 * in a run's content — a textbox's `w:txbxContent` — rank right after their host.
 *
 * A separate function on purpose: the shallow order feeds the review queue's card
 * ordering, and re-ranking nested paragraphs there would move cards. This one exists for
 * position containment tests ("is the caret inside this range"), where a paragraph the
 * shallow order cannot see is a position that can never match.
 */
declare function deepParagraphOrderOfPart(part: OoxmlPart): ReadonlyMap<string, number>;
/**
 * Every range a decision touches. One card can cover several, in different paragraphs.
 *
 * Exported because the geometry half in the layout lane asks the same question, and a second
 * copy of "which ranges does this item cover" is how a card comes to be painted over one range
 * and activated by another.
 */
declare function reviewItemRanges(item: ReviewItem): readonly ReviewRange[];
/** The range an item is anchored at — where its card belongs and how it sorts. */
declare function firstReviewRange(item: ReviewItem): ReviewRange | null;

export { type AuthoredNoteProperties as A, isLegalFootnotePosition as B, type CommentAnchor as C, DEFAULT_ENDNOTE_PROPERTIES as D, type EndnotePosition as E, type FootnotePosition as F, isLegalNumRestart as G, linkRevisionReplies as H, parseAuthoredNoteProperties as I, resolveEndnoteProperties as J, resolveFootnoteProperties as K, type LinkableReviewItem as L, reviewItemKey as M, type NoteNumRestart as N, reviewItemRanges as O, revisionItemsOf as P, settingsPartOf as Q, type ResolvedFootnoteProperties as R, threadStateOfPart as S, W15_NAMESPACE_URI as W, type ResolvedEndnoteProperties as a, type CommentPosition as b, type CommentRecord as c, type CommentThreadState as d, DEFAULT_FOOTNOTE_PROPERTIES as e, type ReviewCommentItem as f, type ReviewItem as g, type ReviewModelInput as h, type ReviewPosition as i, type ReviewRange as j, type ReviewRevisionItem as k, type ReviewRevisionKind as l, authoredDocumentEndnoteProperties as m, authoredDocumentFootnoteProperties as n, authoredEndnotePropertiesFromSectPr as o, paragraphOrderOfPart as p, authoredFootnotePropertiesFromSectPr as q, collectReviewItems as r, commentAnchorsOfStory as s, commentBodyText as t, commentInitials as u, commentItemsOf as v, commentsOfPart as w, deepParagraphOrderOfPart as x, firstReviewRange as y, isLegalEndnotePosition as z };
