import { e as OoxmlPart, a as OoxmlElement } from './ooxml-tree-BU0e3DVi.cjs';
import { R as RevisionAddress } from './tree-op-types-UOXlRUqQ.cjs';

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
    /** `w14:paraId` of the first body paragraph — the key thread state is stored under. */
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
/**
 * One tracked change as a review card.
 *
 * Keyed per DECISION rather than per site: a revision spanning three ranges is one card, because
 * accepting it accepts all three.
 */
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
     * Derived by the MODULE rather than from a caller-supplied predicate: the refusal list is
     * internal, and a surface asked to compute it would have to guess. A card that offers a
     * button the engine will refuse is worse than one that explains why it cannot.
     */
    readonly readOnly: boolean;
    /** The other half of a move, or the other side of a delete/insert replacement. */
    readonly pairedWith?: string;
    /**
     * Comments answering this change, in document order.
     *
     * A reply to a tracked change IS a comment: `w:ins` and `w:del` carry no body, so the text
     * is written as a comment over the revision's own range and the range is what links them.
     */
    readonly replyIds: readonly string[];
}
/**
 * One comment as a review card. A reply carries `parentId`; OOXML gives replies no separate
 * element, so threads are reconstructed from that link.
 */
interface ReviewCommentItem {
    readonly kind: 'comment';
    readonly id: string;
    readonly comment: CommentRecord;
    readonly range: ReviewRange | null;
    readonly resolved: boolean;
    /** The comment this replies to, absent for a top-level comment. */
    readonly parentId?: string;
    /** The REVISION this comment answers, when it covers exactly that change's characters. */
    readonly parentRevisionId?: string;
    /** Replies to this comment, in document order. Empty for a reply or a childless comment. */
    readonly replyIds: readonly string[];
    /** True when the file gave this comment no usable range. */
    readonly orphaned: boolean;
}
/**
 * A card contributed by a recognized custom node (`defineCustomNode` with a `reviewCard`
 * hook), anchored at the node's range.
 *
 * Informational, never resolvable: there is nothing to accept or reject, so the engine
 * refuses those verbs on it. `title` and `detail` are HOST-authored (the definition's hook
 * produced them), but `attrs` and `text` originate in a file an attacker controls — a
 * surface renders every one of these as text, never markup.
 */
interface ReviewCustomItem {
    readonly kind: 'custom';
    /** The SDT node's stable id in the canonical tree. */
    readonly id: string;
    /** The definition's `name`. */
    readonly name: string;
    /** The raw `w:tag` the node was recognized from. Untrusted input. */
    readonly tag: string;
    /** Attrs decoded from the tag, after the definition's recognition hook. Untrusted input. */
    readonly attrs: Readonly<Record<string, string>>;
    /** The SDT's literal content text. Untrusted input. */
    readonly text: string;
    /**
     * The payload the node's control binds to, after the definition validated it.
     *
     * Undefined when the node carries none or the payload did not match — see the pro package's
     * `RecognizedCustomNode.data`, which this is carried from.
     */
    readonly data?: unknown;
    /**
     * Whether this node asked for a sidebar card.
     *
     * False for a definition with no `reviewCard`: the item exists so the chip's own surfaces can
     * read `attrs`, `text` and `data` off it, and the rail leaves it out. A surface listing cards
     * filters on this rather than on an empty `title`.
     */
    readonly carded: boolean;
    /** Card title, from the definition's `reviewCard` hook. Empty when `carded` is false. */
    readonly title: string;
    /** Card body, from the definition's `reviewCard` hook. */
    readonly detail?: string;
    /**
     * Glyph for this node in the collapsed rail, as an SVG path in a `0 -960 960 960` viewBox.
     *
     * A PATH rather than a rendered node because this item crosses core, which is DOM-free and
     * React-free — the same reason `title` and `detail` are strings. A host that wants arbitrary
     * markup overrides the `Markers` part's `icon` instead, which lives in the adapter where JSX
     * belongs. Absent falls back to the generic custom-node glyph.
     *
     * HOST-AUTHORED, never file data: it is interpolated into an SVG `d` attribute, and a path
     * taken from a document would be attacker-controlled markup.
     */
    readonly icon?: string;
    readonly range: ReviewRange | null;
}
/**
 * One pending decision in the review queue: a tracked change, a comment thread, or a pro
 * custom-node card. Discriminate on `kind`.
 */
type ReviewItem = ReviewRevisionItem | ReviewCommentItem | ReviewCustomItem;
/** What the review queue derivation reads: one story part plus its comment parts. */
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
    /**
     * Custom node definitions from the module registry, forwarded OPAQUELY.
     *
     * Core carries them the way the registry does — as unknowns — so the definition shape
     * stays a capability-package concern. The pro derivation narrows them and contributes
     * `kind: 'custom'` cards for definitions that opted in.
     */
    readonly customNodes?: readonly unknown[] | undefined;
    /**
     * The payload each of the story's controls binds to, keyed by the control's node id.
     *
     * Resolved by the ENGINE and handed over, because a payload lives in a customXml data part
     * and a derivation that only receives story parts has no way to reach one. Untrusted file
     * input on both members; a capability package validates it against whatever shape it
     * declared before handing it to a host.
     */
    /**
     * Where a capability package reports a node it could not read. Supplied per editor, so a page
     * with two of them keeps their diagnostics apart.
     */
    readonly reportCustomNodeDiagnostic?: ((diagnostic: unknown) => void) | undefined;
    readonly customNodePayloads?: ReadonlyMap<string, {
        readonly nodeId: string;
        readonly label: string;
        readonly data: string;
    }> | undefined;
}
/** The stable key a surface uses for the active item and for a React list. */
declare function reviewItemKey(item: ReviewItem): string;
/** Plain text of a comment's body, so a card never re-implements the run walk. */
declare function commentBodyText(comment: CommentRecord): string;
/** Author initials for an avatar, from `@w:initials` or the name. */
declare function commentInitials(comment: CommentRecord): string;

/** Every range a decision touches. One card can cover several, in different paragraphs. */
declare function reviewItemRanges(item: ReviewItem): readonly ReviewRange[];
/** The first range of an item, in authored order, or null when it has none. */
declare function firstReviewRange(item: ReviewItem): ReviewRange | null;
/**
 * A single comparable number for document order.
 *
 * Paragraph index dominates offset, so a revision spanning paragraphs still sorts by where it
 * STARTS. An item with no resolvable range sorts last rather than to position zero, which is
 * where an orphan used to land — tearing an orphaned reply out of its own thread.
 */
declare function reviewItemPositionRank(item: ReviewItem, order: ReadonlyMap<string, number>): number;
/**
 * Every item covering a position, innermost first.
 *
 * Returning the whole stack rather than one winner is what lets a surface offer cycling, a
 * stacked card, or a "1 of 3" affordance. A comment wrapping a revision used to be unreachable
 * because only the tightest range was ever returned.
 */
declare function reviewItemsAt(items: readonly ReviewItem[], position: ReviewPosition, order: ReadonlyMap<string, number>): ReviewItem[];
/**
 * The item the caret is in, or null.
 *
 * A resolved comment never activates: a settled thread must not reopen itself as the reviewer
 * types near it.
 *
 * A REPLY resolves to the thread it belongs to. A reply is anchored over its parent's range,
 * so both cover the caret — and the reply, being newer, wins the innermost test. It is not a
 * card of its own (it renders inside its parent's), so the thread would have gone active with
 * nothing on screen showing it: the reply box vanished from a comment the moment somebody
 * replied to it.
 */
declare function activeReviewItem(items: readonly ReviewItem[], position: ReviewPosition, order: ReadonlyMap<string, number>): ReviewItem | null;
/**
 * Walk a reply up to the card that heads its thread. Guarded against a cyclic file.
 *
 * The head is not always a comment. A reply to a tracked change renders inside the REVISION's
 * card, so resolving it to itself opened an item nothing on screen was drawing — the reply box
 * vanished the moment somebody answered a change.
 *
 * EXPORTED because the paginated surface answers "which card is open" itself, against its own
 * dismissed-key state, rather than through {@link activeReviewItem}. Two copies of the
 * innermost-wins rule was survivable while a reply could only be a comment — the parent came
 * first in `comments.xml` order and won the tie by accident. It stopped being survivable the
 * moment a reply could answer a revision, which outranks it outright.
 */
declare function reviewThreadRootOf(items: readonly ReviewItem[], comment: ReviewCommentItem): ReviewItem;
/** Where one paragraph sits, resolved once so a card is an O(1) lookup. */
interface ReviewParagraphAnchor {
    readonly pageIndex: number;
    /** Sheet-absolute y of the page's content box. */
    readonly contentY: number;
    /** The fragment's own y, measured from that content box. */
    readonly fragmentY: number;
    readonly lines?: readonly {
        readonly range: {
            readonly end: number;
        };
        readonly box: {
            readonly y: number;
        };
    }[];
}
/**
 * Paragraph id to its place on the page, in ONE pass over the layout.
 *
 * Built once per layout and reused by every card. The straightforward version — scan the
 * pages until the paragraph turns up, per card — is a full-document walk per card, and a
 * contract with two hundred comments walked the document two hundred times every time the
 * caret moved. Toggling the pane was visibly slow for exactly that reason.
 */
declare function reviewAnchorIndex<TPage extends {
    readonly index: number;
    readonly contentBox: {
        readonly y: number;
    };
}>(layout: {
    readonly pages: readonly TPage[];
}, paragraphFragments: (page: TPage) => readonly {
    readonly paragraphId: string;
    readonly box: {
        readonly y: number;
    };
    readonly lines?: readonly {
        readonly range: {
            readonly end: number;
        };
        readonly box: {
            readonly y: number;
        };
    }[];
}[]): Map<string, ReviewParagraphAnchor>;
/**
 * Where a card belongs beside the page, from LAYOUT RECORDS.
 *
 * The one question the tree cannot answer, and the one a surface must not answer for itself:
 * measuring painted DOM puts the sidebar a repaint behind the document and breaks outright
 * while pagination is in flight.
 *
 * Returns null when the item has no resolvable range, or when its paragraph is not in this
 * layout — a comment anchored in a header belongs to a story the body layout never saw.
 */
declare function reviewItemGeometry(item: ReviewItem, index: ReadonlyMap<string, ReviewParagraphAnchor>): {
    readonly pageIndex: number;
    readonly y: number;
} | null;

export { type CommentRecord as C, type ReviewModelInput as R, W15_NAMESPACE_URI as W, type ReviewItem as a, type ReviewRevisionItem as b, type ReviewCommentItem as c, type ReviewCustomItem as d, type ReviewPosition as e, type ReviewRange as f, type ReviewRevisionKind as g, type CommentAnchor as h, type CommentPosition as i, type CommentThreadState as j, type ReviewParagraphAnchor as k, activeReviewItem as l, commentBodyText as m, commentInitials as n, firstReviewRange as o, reviewItemGeometry as p, reviewItemKey as q, reviewAnchorIndex as r, reviewItemPositionRank as s, reviewItemRanges as t, reviewItemsAt as u, reviewThreadRootOf as v };
