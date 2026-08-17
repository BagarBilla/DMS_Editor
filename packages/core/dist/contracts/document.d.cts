import { DocxDocument, ExecResult, ContentControlType, DocTarget, RunFormatting, Extent, ContainerRef, ContentControlFilter, DocRange, Revision, DocComment, StyleDefinitions } from './types.cjs';
export { Block, ColorValue, ContentControl, DocAnchor, DocAnchorRange, DocLocation, DocumentBody, ExecErrorCode, HeaderFooterSet, IndentFormatting, Paragraph, RevisionType, Section, SectionProperties, StyleDefinition, Table, Theme, ThemeColorScheme } from './types.cjs';

/**
 * `@docx-editor.dev/core/contracts/document` — the document-level edit and query vocabulary.
 *
 * The subset that means something without a live editor: what an automation host or an LLM tool
 * can ask for and change.
 *
 * A CONTRACT module, not a barrel. `contracts/editor` builds the `Editor` command and query
 * surfaces on top of these, so they cannot live in the package root: the root re-exports
 * runtime from `../editor`, and a contract importing the root would invert the dependency —
 * safe today only because that import is type-only, and one accidental value import away from
 * pulling the painted engine into a server bundle.
 *
 * @packageDocumentation
 * @public
 */

/**
 * The document-executable edit vocabulary.
 *
 * An interface rather than a closed union so extensions can widen it by
 * declaration merging. A sealed union cannot be extended by a plugin, and the
 * runtime dispatch is already registry-backed.
 */
interface DocEdits {
    insertText: {
        target: DocTarget;
        text: string;
    };
    replaceText: {
        target: DocTarget;
        text: string;
    };
    deleteText: {
        target: DocTarget;
    };
    applyFormatting: {
        target: DocTarget;
        marks: RunFormatting;
    };
    setParagraphStyle: {
        target: DocTarget;
        styleId: string;
    };
    insertTable: {
        target: DocTarget;
        rows: number;
        cols: number;
    };
    insertImage: {
        target: DocTarget;
        data: Uint8Array;
        extent?: Extent;
    };
    insertHyperlink: {
        target: DocTarget;
        href: string;
        text?: string;
    };
    removeHyperlink: {
        target: DocTarget;
    };
    insertBreak: {
        target: DocTarget;
        kind: 'page' | 'column' | 'line' | 'section';
    };
    /**
     * Word's Increase/Decrease Indent.
     *
     * A numbered or bulleted paragraph changes LEVEL, so its marker re-resolves from the
     * numbering definition — a bullet becomes a hollow circle, a `1.` becomes an `a.`.
     * Every other paragraph moves its left indent by one default tab stop.
     */
    adjustIndent: {
        target: DocTarget;
        direction: 'increase' | 'decrease';
    };
    /**
     * Word's Bullets and Numbering.
     *
     * Turns the selection into a list, or takes it out of one when it already is. The
     * definition is created on first use, `numbering.xml` included.
     */
    toggleList: {
        target: DocTarget;
        kind: 'bullet' | 'ordered';
    };
    splitParagraph: {
        target: DocTarget;
    };
    mergeParagraphs: {
        target: DocTarget;
    };
    setVariable: {
        name: string;
        value: string;
    };
    applyVariables: {
        values: Record<string, string>;
    };
    /**
     * Authored family. `author` is required: tracked-ness is verb identity, not a
     * boolean flag, so there is no global trackChanges toggle to forget.
     */
    proposeReplacement: {
        target: DocTarget;
        replaceWith: string;
        author: string;
    };
    proposeInsertion: {
        target: DocTarget;
        text: string;
        author: string;
    };
    proposeDeletion: {
        target: DocTarget;
        author: string;
    };
    addComment: {
        target: DocTarget;
        text: string;
        author: string;
    };
    replyComment: {
        commentId: string;
        text: string;
        author: string;
    };
    resolveComment: {
        commentId: string;
    };
    acceptRevision: {
        id: number;
        part?: 'body' | 'footnote' | 'endnote';
        noteId?: number;
    };
    rejectRevision: {
        id: number;
        part?: 'body' | 'footnote' | 'endnote';
        noteId?: number;
    };
    acceptAllRevisions: Record<never, never>;
    rejectAllRevisions: Record<never, never>;
    setContentControlValue: {
        target: DocTarget;
        value: string;
    };
    removeContentControl: {
        target: DocTarget;
    };
    addRepeatingSectionItem: {
        target: DocTarget;
        index?: number;
    };
    removeRepeatingSectionItem: {
        target: DocTarget;
        index: number;
    };
}
/**
 * One edit, as a discriminated union derived from {@link DocEdits}.
 *
 * Adding a key to `DocEdits` — including by declaration merging from a plugin — widens this
 * automatically, so the union never drifts from the vocabulary it is built out of.
 */
type DocEdit = {
    [K in keyof DocEdits]: {
        type: K;
    } & DocEdits[K];
}[keyof DocEdits];
/**
 * What applying a batch of edits produced: the new document, and a per-edit verdict.
 *
 * `results` is positionally aligned with the input, so an edit that failed is identified by its
 * index rather than by anything the caller has to correlate.
 */
interface ApplyResult {
    doc: DocxDocument;
    /** One per edit, positionally aligned with the input. */
    results: ExecResult[];
}
/**
 * The document-readable query vocabulary, keyed identically to {@link DocQueryResults}.
 *
 * An interface rather than a closed union for the same reason {@link DocEdits} is: an extension
 * widens it by declaration merging, and the runtime dispatch is registry-backed.
 */
interface DocQueries {
    paragraphs: {
        container?: ContainerRef;
    };
    findText: {
        text: string;
        container?: ContainerRef;
    };
    contentControls: {
        filter?: ContentControlFilter;
    };
    revisions: {
        part?: 'body' | 'footnote' | 'endnote';
    };
    comments: {
        resolved?: boolean;
    };
    styles: Record<never, never>;
    variables: Record<never, never>;
}
/** One query, as a discriminated union derived from {@link DocQueries}. */
type DocQuery = {
    [K in keyof DocQueries]: {
        type: K;
    } & DocQueries[K];
}[keyof DocQueries];
/** What each query returns. Keyed identically to `DocQueries`. */
interface DocQueryResults {
    paragraphs: readonly ParagraphSummary[];
    findText: readonly DocRange[];
    contentControls: readonly ContentControlSummary[];
    revisions: readonly Revision[];
    comments: readonly DocComment[];
    styles: StyleDefinitions;
    variables: Readonly<Record<string, string>>;
}
/**
 * A paragraph reduced to what a listing needs: its stable handle, its text, and its style.
 *
 * `paraId` is what a follow-up edit addresses, so a summary without one names a paragraph the
 * file gave no `w14:paraId` and that a `DocAnchor` cannot reach.
 */
interface ParagraphSummary {
    readonly paraId?: string;
    readonly text: string;
    readonly styleId?: string;
}
/** A content control reduced to what a listing needs: its identity, kind, and lock state. */
interface ContentControlSummary {
    readonly id: string;
    readonly tag?: string;
    readonly alias?: string;
    readonly controlType: ContentControlType;
    readonly locked?: boolean;
}

export { type ApplyResult, ContainerRef, ContentControlFilter, type ContentControlSummary, ContentControlType, DocComment, type DocEdit, type DocEdits, type DocQueries, type DocQuery, type DocQueryResults, DocRange, DocTarget, DocxDocument, ExecResult, Extent, type ParagraphSummary, Revision, RunFormatting, StyleDefinitions };
