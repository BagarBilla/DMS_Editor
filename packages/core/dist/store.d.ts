import { e as ResourceLimits } from './image-resources-C_YnqPhn.js';
export { C as CreateImageResourceCacheOptions, D as DEFAULT_IMAGE_RESOURCE_LIMITS, f as DEFAULT_LIMITS, H as HARD_CEILINGS, g as IMAGE_RESOURCE_HARD_CEILINGS, b as ImageDecodePort, c as ImageResourceLimits, h as ImageResourceLookup, I as ImageResourceState, M as MAX_SVG_SNIFF_BYTES, P as PreservedImageMime, S as SupportedImageMime, i as ValidatedRasterHeader, j as createImageResourceCache, k as hasBoundedSvgRoot, l as imageResourceLookupFor, m as liveDrawingReferenceCount, r as resolveImageResourceLimits, n as resolveLimits, s as sniffImageMime, o as validateGifHeader, p as validateJpegHeader, q as validatePngHeader, v as validateRasterHeader } from './image-resources-C_YnqPhn.js';
import { O as OoxmlPackage, R as RelationshipRecord } from './ooxml-package-D_CtywTW.js';
export { C as ContentTypeError, c as ContentTypeIndex, d as ContentTypeRecords, D as DEFAULT_OOXML_PACKAGE_LIMITS, e as DEFAULT_ZIP_LIMITS, f as DefaultRecord, I as IMAGE_RELATIONSHIP_TYPE, g as ImageRelationshipResolution, h as IndexResult, N as NameRejection, i as NameResult, j as OoxmlExternalTarget, a as OoxmlPackageLimits, b as OoxmlPackageRejection, k as OoxmlPackageResult, l as OverrideRecord, m as RelationshipError, n as RelationshipSetResult, o as ResolveResult, p as ResolvedRelationship, T as TargetMode, Z as ZipLimits, q as ZipReadResult, r as ZipRejection, s as asciiFold, t as buildContentTypeIndex, u as buildRelationshipSet, v as detectDuplicateNames, w as extensionKey, x as isValidMime, y as normalizePartName, z as partNameKey, A as readOoxmlPackage, B as readZip, E as resolveContentType, F as resolveImageRelationship, G as resolveInternalTarget, H as resolveRelationship, J as validateExternalTarget, K as withPart, L as writeOoxmlPackage, M as writeZip } from './ooxml-package-D_CtywTW.js';
import { e as OoxmlPart, O as OoxmlNode, r as OoxmlInvariantResult, a as OoxmlElement, s as OoxmlInvariantIssue, t as OoxmlHardBreakNode, f as OoxmlParagraphNode, u as OoxmlFldCharNode, v as OoxmlFldSimpleNode, w as OoxmlInstrTextNode, x as OoxmlAttribute } from './ooxml-tree-BU0e3DVi.js';
export { y as OOXML_NODE_IDENTITY_RULES, z as OoxmlBodyNode, A as OoxmlBookmarkEndNode, B as OoxmlBookmarkStartNode, C as OoxmlContentControlCalendarNode, D as OoxmlContentControlCheckboxNode, E as OoxmlContentControlCheckedNode, F as OoxmlContentControlCheckedStateNode, G as OoxmlContentControlComboBoxNode, d as OoxmlContentControlContentNode, H as OoxmlContentControlDataBindingNode, I as OoxmlContentControlDateFormatNode, J as OoxmlContentControlDateNode, K as OoxmlContentControlDropDownListNode, p as OoxmlContentControlEndPropertiesNode, L as OoxmlContentControlLidNode, M as OoxmlContentControlListItemNode, b as OoxmlContentControlNode, q as OoxmlContentControlPropertiesNode, N as OoxmlContentControlStoreMappedDataAsNode, P as OoxmlContentControlTextNode, Q as OoxmlContentControlUncheckedStateNode, h as OoxmlContinuationSeparatorNode, R as OoxmlDocumentNode, i as OoxmlEndnotesNode, j as OoxmlFootnotesNode, c as OoxmlGenericElementNode, S as OoxmlGenericExtensionAttribute, T as OoxmlHyperlinkNode, U as OoxmlInvariantIssueCode, V as OoxmlKnownNodeAttribute, W as OoxmlNamespaceBinding, Y as OoxmlNodeId, Z as OoxmlNodeIdentityRules, g as OoxmlNoteNode, k as OoxmlNoteRefNode, l as OoxmlNoteReferenceNode, _ as OoxmlParagraphPropertiesNode, $ as OoxmlPartMetadata, n as OoxmlReadRejection, a0 as OoxmlReadResult, a1 as OoxmlRunNode, a2 as OoxmlRunPropertiesNode, m as OoxmlSeparatorNode, a3 as OoxmlTabNode, a4 as OoxmlTextElementNode, a5 as OoxmlTextNode, a6 as OoxmlWmlValAttribute, a7 as OoxmlXmlSpaceAttribute, a8 as WML_NAMESPACE_URI, a9 as XMLNS_NAMESPACE_URI, aa as XML_NAMESPACE_URI, X as XmlLimits, ab as XmlNode, ac as XmlRejection, ad as XmlResult, ae as childElements, af as findElement, ag as isContentRevisionKind, ah as isRangeMarkerKind, ai as readOnOffChild, aj as readOoxmlPart, ak as readXml, al as textContent } from './ooxml-tree-BU0e3DVi.js';
export { e as BookmarkAnchor, B as BookmarkIndex, f as CascadeDeletedNoteReferencesOptions, g as CustomNodePayloadRead, h as CustomNodePayloadWrite, b as CustomNodeSweepOutcome, i as CustomNodeSweepResult, j as CustomNodeWriteRejection, C as CustomNodeWriteResult, k as DEFAULT_MAX_EDITABLE_STORY_PARTS, D as DocumentTrackingSettings, l as DrawingPropertyIdResult, E as EmbeddedFont, F as FontStyleKey, H as HeaderFooterLifecycleImpact, m as HeaderFooterLifecycleOp, n as HeaderFooterLifecycleRejection, o as HeaderFooterLifecycleResult, I as InsertCustomNodeWrite, L as ListKind, M as MAX_CUSTOM_NODE_LABEL_LENGTH, p as MAX_CUSTOM_NODE_PAYLOAD_LENGTH, q as MAX_NOTE_REFERENCE_PARTS, r as MAX_NOTE_REFERENCE_SCAN, N as NO_TRACKING_SETTINGS, s as NoteDiagnostic, t as NoteDiagnosticCode, u as NoteLifecycleImpact, v as NoteLifecycleOp, w as NoteLifecycleOptions, x as NoteLifecycleRejection, y as NoteLifecycleResult, z as NoteReferenceHit, G as NoteReferenceScanBudget, P as PackageTransactResult, J as ReadEmbeddedFontsOptions, K as StoryResolveResult, S as StoryScope, a as StoryTargetRejection, T as TreePackageStore, O as TreePackageStoreOptions, Q as allocateDrawingPropertyId, U as applyHeaderFooterLifecycleOp, V as applyNoteLifecycleOp, W as buildBookmarkIndex, X as cascadeDeletedNoteReferences, Y as collectNoteReferences, Z as collectPackageNoteReferences, _ as createNoteReferenceScanBudget, $ as customNodePayloadsByControl, a0 as customNodePayloadsOf, a1 as deobfuscateFont, a2 as diagnoseNoteReferences, a3 as ensureListDefinition, a4 as ensureNumberingLevel, a5 as insertCustomNodeWrite, a6 as isHeaderFooterLifecycleOp, a7 as isNoteLifecycleOp, a8 as normalNoteIds, a9 as notesPartHasId, aa as readEmbeddedFonts, ab as readTrackingSettings, ac as removeCustomNodeWrite, ad as resolveNotesPart, ae as sweepCustomNodePayloads, af as withBinaryPart, ag as withEmbeddedImage, ah as withoutUnreferencedImagePart } from './custom-node-writes-ttKuYd0M.js';
export { c as HeaderFooterKind, a as HeaderFooterParts, b as HeaderFooterSectionResolution, d as HeaderFooterSlotMeta, H as HeaderFooterVariant, e as collectSectionPropertyNodes, r as resolveHeaderFooterParts, f as resolveHeaderFooterPartsBySection, g as resolveHeaderFooterResolutionBySection } from './hf-references-BdjsQNE_.js';
export { c as collectFlowBlocks, d as contentControlContentOf, i as isContentControl, b as isContentControlContent, w as walkAllStoryParagraphs, e as walkParagraphInline, f as walkStoryBlocks } from './content-control-walk-D06GijR0.js';
import { T as TreeDocOp, a as TreeOpRejection, q as TreeOpResult, O as OoxmlProperty, m as DrawingTreeDocOp, I as ImpactClass, b as ImageWrapTarget } from './tree-op-types-DWLCllG7.js';
export { A as ACCEPTED_PARAGRAPH_PROPERTIES, r as ACCEPTED_RUN_PROPERTIES, s as CONTENT_CONTROL_ID_MAX, t as CONTENT_CONTROL_PROPERTY_ORDER, u as ContentControlCheckbox, v as ContentControlCheckboxState, p as ContentControlDataBinding, w as ContentControlDateFormat, x as ContentControlEntry, C as ContentControlKind, n as ContentControlLevel, y as ContentControlListItem, o as ContentControlLock, z as ContentControlProperties, c as DrawingKind, e as DrawingLocks, d as DrawingPositionInput, H as HYPERLINK_RELATIONSHIP_TYPE, B as HyperlinkKind, E as HyperlinkTarget, i as IMAGE_WRAP_TARGETS, M as MAX_CONTENT_CONTROLS_PER_PART, F as MAX_CONTENT_CONTROL_NESTING, G as OFFICE_RELATIONSHIP_NAMESPACE_URI, J as RelationshipTargetResolver, R as RevisionAddress, S as SourceCrop, K as TABLE_BORDER_STYLES, L as TREE_DOC_OP_KINDS, l as TableBorderStyle, N as TreeDocOpKind, P as TreeOpEffect, Q as allocateContentControlId, U as contentControlContentChildren, W as contentControlContentNodeOf, X as contentControlEndPropertiesNodeOf, Y as contentControlLevelOf, Z as contentControlPropertiesNodeOf, _ as contentControlPropertiesOf, $ as contentControlTextOf, a0 as contentControlsIn, a1 as findContentControl, a2 as flattenContentControls, a3 as hyperlinkAnchorOf, a4 as hyperlinkRelationshipIdOf, a5 as hyperlinkTargetOf, a6 as isContentControlContentNode, a7 as isContentControlNode, a8 as isContentControlWrapper, a9 as isHyperlinkNode, aa as lockForbidsEdit, ab as lockForbidsRemoval, ac as orderedContentControlProperties, ad as parseContentControlId, ae as projectDrawing, af as resolveContentControlLock } from './tree-op-types-DWLCllG7.js';
export { A as AtomicNoteSpan, M as MAX_NOTES_PER_PART, a as NOTE_ATOM_CHAR, b as NOTE_CONTINUATION_SEPARATOR_ID, c as NOTE_ID_MAX, d as NOTE_ID_MIN, e as NOTE_SEPARATOR_ID, N as NoteKind, f as NoteType, g as allocateNoteId, h as atomicNoteSpansOf, i as customMarkFollows, j as findNoteById, k as formatNoteScopeId, l as isContinuationSeparatorNode, m as isEndnotesNode, o as isFootnotesNode, p as isNormalNote, q as isNoteAtomNode, r as isNoteNode, s as isNoteRefNode, t as isNoteReferenceNode, u as isSeparatorNode, v as noteAtomText, w as noteIdOf, x as noteKindOf, y as noteRefKindOf, z as noteReferenceKindOf, n as noteTypeOf, B as notesOf, C as parseNoteId, D as parseNoteScopeId } from './note-nodes-BPSTVDMr.js';
export { A as AuthoredNoteProperties, C as CommentAnchor, b as CommentPosition, c as CommentRecord, d as CommentThreadState, D as DEFAULT_ENDNOTE_PROPERTIES, e as DEFAULT_FOOTNOTE_PROPERTIES, E as EndnotePosition, F as FootnotePosition, L as LinkableReviewItem, N as NoteNumRestart, a as ResolvedEndnoteProperties, R as ResolvedFootnoteProperties, f as ReviewCommentItem, g as ReviewItem, h as ReviewModelInput, i as ReviewPosition, j as ReviewRange, k as ReviewRevisionItem, l as ReviewRevisionKind, W as W15_NAMESPACE_URI, m as authoredDocumentEndnoteProperties, n as authoredDocumentFootnoteProperties, o as authoredEndnotePropertiesFromSectPr, q as authoredFootnotePropertiesFromSectPr, r as collectReviewItems, s as commentAnchorsOfStory, t as commentBodyText, u as commentInitials, v as commentItemsOf, w as commentsOfPart, x as deepParagraphOrderOfPart, y as firstReviewRange, z as isLegalEndnotePosition, B as isLegalFootnotePosition, G as isLegalNumRestart, H as linkRevisionReplies, p as paragraphOrderOfPart, I as parseAuthoredNoteProperties, J as resolveEndnoteProperties, K as resolveFootnoteProperties, M as reviewItemKey, O as reviewItemRanges, P as revisionItemsOf, Q as settingsPartOf, S as threadStateOfPart } from './review-reads-CMAqdMnE.js';
import { T as TreeModelChange, b as TreeDocumentStore } from './tree-store-BscFPB7x.js';
export { S as SelectionMark, f as TreeDocumentStoreOptions, a as TreeStoryRef, d as TreeTransactOptions, g as TreeTransactResult, c as TreeTransactionContext } from './tree-store-BscFPB7x.js';

/**
 * Every kind of thing the registry gives a stable identity to.
 *
 * Identity is `(kind, id)` plus version and NEVER registration order, so two bundles contributing
 * the same command resolve deterministically regardless of which loaded first.
 */
declare const ID_KINDS: readonly ["extension", "capability", "command", "query", "schema", "dependencyKey", "runtimePort", "result", "origin"];
/** One of {@link ID_KINDS}. */
/** One of {@link ID_KINDS} — which sort of thing an identifier names. */
type IdKind = (typeof ID_KINDS)[number];
/**
 * Whether a string is a well-formed identifier in either accepted grammar.
 *
 * Reverse-domain (`dev.docx-editor.core.command.insert-text`) or package-owned
 * (`@docx-editor.dev/engine-core#command/insert-text`). Ids are opaque once validated.
 */
declare function isValidId(id: string): boolean;
/**
 * Validate an identifier, throwing when it is malformed.
 *
 * Throws rather than returning: a bad id is an author mistake at registration time, not file
 * input, and accepting it would produce a registry whose identities silently collide.
 */
declare function assertValidId(id: string, kind?: IdKind): void;
/** A validated (kind, id, version) triple — the registry's unit of identity. */
interface CapabilityId {
    readonly kind: IdKind;
    readonly id: string;
    readonly version: string;
}

/** A parsed semantic version. Only the three numeric components — no pre-release or build. */
interface SemVer {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
}
/**
 * Parse a semantic version, rejecting anything the registry's rules do not need.
 *
 * Deliberately narrow: an unsupported range form is refused rather than accepted, so a malformed
 * range can never masquerade as "compatible".
 */
declare function parseSemVer(input: string): SemVer;
/** Order two versions: negative, zero or positive, by major then minor then patch. */
declare function compareSemVer(a: SemVer, b: SemVer): -1 | 0 | 1;
/**
 * Whether `version` satisfies `range`. Supported range grammar:
 *   - `*`            any version
 *   - `1.2.3`        exact
 *   - `^1.2.3`       caret: same major, and >= the floor (major 0 pins the minor)
 *   - `>=1.2.3 <2.0.0`  a single lower (inclusive) + upper (exclusive) bound pair
 * Any other shape throws — an unparseable range is a registration error, not a pass.
 */
declare function satisfies(version: string, range: string): boolean;

/**
 * Why registry resolution failed.
 *
 * Every code names a declaration conflict a bundle author can fix — a missing dependency, an
 * unsatisfied version range, a duplicate contribution with no replacement policy.
 */
type RegistryErrorCode = 'invalid-id' | 'invalid-version' | 'duplicate-extension' | 'id-collision' | 'replacement-target-missing' | 'unauthorized-replacement' | 'replacement-version-mismatch' | 'ambiguous-replacement' | 'missing-dependency' | 'dependency-cycle' | 'conflict' | 'missing-port';
/**
 * A resolution failure naming every responsible party.
 *
 * Thrown rather than returned: an unresolvable registry is a build-time composition mistake, and
 * an engine running with a half-resolved registry would fail later in ways that do not point back
 * to the bundle that caused it.
 */
declare class RegistryError extends Error {
    readonly code: RegistryErrorCode;
    /** Stable identities responsible for the failure (extensions, ids). */
    readonly responsible: readonly string[];
    constructor(code: RegistryErrorCode, message: string, 
    /** Stable identities responsible for the failure (extensions, ids). */
    responsible?: readonly string[]);
}
/** How a base contribution permits replacement by other bundles. */
type ReplacementPolicy = {
    readonly kind: 'none';
} | {
    readonly kind: 'single';
} | {
    readonly kind: 'priority';
};
/** One thing a bundle contributes: a command, a query, a schema, a port, keyed by `(kind, id)`. */
interface Contribution {
    readonly kind: Exclude<IdKind, 'extension' | 'origin' | 'result'>;
    readonly id: string;
    readonly version: string;
    /** If set, this contribution replaces an existing base contribution. */
    readonly replaces?: {
        readonly targetId: string;
        readonly targetRange: string;
        readonly priority?: number;
    };
    /** Policy this contribution exposes to would-be replacers (default `none`). */
    readonly replaceable?: ReplacementPolicy;
    readonly payload?: unknown;
}
/**
 * A unit of engine functionality: its identity, version, dependencies, conflicts, required ports,
 * and contributions.
 *
 * The registry's whole input. Everything a bundle needs and everything it offers is DECLARED, so
 * resolution can be deterministic and order-independent.
 */
interface FeatureBundle {
    readonly id: string;
    readonly version: string;
    readonly dependencies?: readonly string[];
    readonly conflicts?: readonly string[];
    readonly requiredPorts?: readonly string[];
    readonly contributions: readonly Contribution[];
}
/** The resolved result: every contribution selected, indexed by `(kind, id)`. */
interface ResolvedRegistry {
    readonly extensions: ReadonlyMap<string, FeatureBundle>;
    readonly contributions: ReadonlyMap<string, Contribution>;
    get(kind: Contribution['kind'], id: string): Contribution | undefined;
}
/** How resolution treats optional bundles and replacement policies. */
interface ResolveOptions {
    /** Runtime port ids available in this environment (design D9 / task 0.3). */
    readonly availablePorts?: readonly string[];
}
/**
 * Resolve a set of bundles into one registry, or throw.
 *
 * Deterministic and registration-order independent: selection is by `(kind, id)` plus version,
 * and ties break only on declared policy. Array order never decides anything.
 *
 * @throws RegistryError naming every bundle responsible for the failure.
 */
declare function resolve(bundles: readonly FeatureBundle[], options?: ResolveOptions): ResolvedRegistry;

/**
 * Typed-origin domains (design D5 / ADR-S5). `mutation.*` are the canonical
 * write origins; `projection` and `awareness` MUST NOT enter history, audit,
 * snapshots, or replication.
 */
declare const ORIGIN_IDS: {
    readonly mutationHuman: "dev.docx-editor.core.origin.mutation.human";
    readonly mutationAgent: "dev.docx-editor.core.origin.mutation.agent";
    readonly mutationRemote: "dev.docx-editor.core.origin.mutation.remote";
    readonly mutationUndo: "dev.docx-editor.core.origin.mutation.undo";
    readonly mutationRedo: "dev.docx-editor.core.origin.mutation.redo";
    readonly mutationMigration: "dev.docx-editor.core.origin.mutation.migration";
    readonly mutationRepair: "dev.docx-editor.core.origin.mutation.repair";
    readonly mutationServer: "dev.docx-editor.core.origin.mutation.server";
    readonly projection: "dev.docx-editor.core.origin.projection";
    readonly awareness: "dev.docx-editor.core.origin.awareness";
};
/** Canonical writes carry a mutation origin; these are the undoable-eligibility inputs. */
declare const CANONICAL_MUTATION_ORIGINS: readonly string[];
/** Origins that never enter authored state / history / audit / snapshot / replication. */
declare const NON_CANONICAL_ORIGINS: readonly string[];
/**
 * Result taxonomy (design D8 / task 7.8). A transport/protocol failure that
 * prevents a valid envelope is a typed exception, not a member here.
 */
declare const RESULT_IDS: {
    readonly applied: "dev.docx-editor.core.result.applied";
    readonly validation: "dev.docx-editor.core.result.validation";
    readonly conflict: "dev.docx-editor.core.result.conflict";
    readonly resource: "dev.docx-editor.core.result.resource";
    readonly authorization: "dev.docx-editor.core.result.authorization";
    readonly aborted: "dev.docx-editor.core.result.aborted";
};
/** Runtime ports (extensions-and-runtime-ports spec; design D9). */
declare const RUNTIME_PORT_IDS: {
    readonly fonts: "dev.docx-editor.core.port.fonts";
    readonly shaping: "dev.docx-editor.core.port.shaping";
    readonly images: "dev.docx-editor.core.port.images";
    readonly clock: "dev.docx-editor.core.port.clock";
    readonly identity: "dev.docx-editor.core.port.identity";
    readonly persistence: "dev.docx-editor.core.port.persistence";
    readonly transport: "dev.docx-editor.core.port.transport";
    readonly scheduling: "dev.docx-editor.core.port.scheduling";
    readonly audit: "dev.docx-editor.core.port.audit";
    readonly authorization: "dev.docx-editor.core.port.authorization";
    readonly resourceAccounting: "dev.docx-editor.core.port.resource-accounting";
    readonly cancellation: "dev.docx-editor.core.port.cancellation";
    readonly externalResourceConsent: "dev.docx-editor.core.port.external-resource-consent";
};
/** Layout dependency keys (design D6 / task 8.2). */
declare const DEPENDENCY_KEY_IDS: {
    readonly style: "dev.docx-editor.core.dep.style";
    readonly numbering: "dev.docx-editor.core.dep.numbering";
    readonly section: "dev.docx-editor.core.dep.section";
    readonly story: "dev.docx-editor.core.dep.story";
    readonly font: "dev.docx-editor.core.dep.font";
    readonly image: "dev.docx-editor.core.dep.image";
    readonly table: "dev.docx-editor.core.dep.table";
    readonly field: "dev.docx-editor.core.dep.field";
    readonly note: "dev.docx-editor.core.dep.note";
    readonly headerFooter: "dev.docx-editor.core.dep.header-footer";
    readonly annotation: "dev.docx-editor.core.dep.annotation";
};
/** Every frozen id as a flat list, for the immutability / uniqueness gate. */
declare const ALL_FROZEN_IDS: readonly string[];

/**
 * A counter's limit was reached. Carries the label, the limit, and what was attempted.
 *
 * Thrown at the N → N+1 boundary, so the increment that would have crossed the limit never
 * happens rather than being detected afterwards.
 */
declare class LimitExceededError extends Error {
    readonly label: string;
    readonly limit: number;
    readonly attempted: number;
    constructor(label: string, limit: number, attempted: number);
}
/**
 * Overflow-safe counting against a fixed limit.
 *
 * Never silently wraps: it rejects the increment that would cross its limit AND any arithmetic
 * that would exceed `Number.MAX_SAFE_INTEGER`. That second guard is the point — a file-supplied
 * count must never be trusted into an allocation, and a wrapped counter reads as small.
 */
declare class BoundedCounter {
    readonly label: string;
    readonly limit: number;
    private value;
    constructor(label: string, limit: number);
    get current(): number;
    /** Remaining headroom before the limit. */
    get remaining(): number;
    /**
     * Add `n` (default 1). Throws LimitExceededError if the result would exceed the
     * limit (so `limit` itself is reachable but `limit + 1` is not) or overflow the
     * safe-integer range. On rejection the counter is unchanged.
     */
    add(n?: number): number;
    /** Whether adding `n` would be accepted, without mutating. */
    canAdd(n?: number): boolean;
    release(n: number): void;
}

/** A budget was misused: over-carved, over-reserved, or disposed with children outstanding. */
declare class BudgetError extends Error {
    constructor(message: string);
}
/**
 * Capacity claimed BEFORE it is allocated.
 *
 * Reserve-then-allocate rather than allocate-then-check: discovering the overrun after the
 * allocation has already happened defeats the point of having a budget.
 */
interface Reservation {
    readonly amount: number;
    readonly released: boolean;
    release(): void;
}
/**
 * One node in the hierarchical resource budget tree.
 *
 * An operation owns a root budget; parsers, extensions, workers, layout, transport and output
 * carve children from it, so no subsystem can consume more than the operation as a whole allows.
 *
 * `dispose()` REFUSES while children or reservations are outstanding, then runs registered
 * cleanups LIFO — spill files, worker termination — even if one throws. A leaked child budget is a
 * leaked worker, so the refusal is the diagnostic.
 */
declare class Budget {
    readonly label: string;
    readonly capacity: number;
    private readonly used;
    private readonly children;
    private activeReservations;
    private readonly cleanups;
    private disposed;
    private carveAmount;
    private parent?;
    constructor(label: string, capacity: number);
    get inUse(): number;
    get available(): number;
    get isDisposed(): boolean;
    /** Reserve `amount` from this budget. Throws if it would exceed capacity. */
    reserve(amount: number): Reservation;
    /** Carve a child budget of `capacity` out of this budget's headroom. */
    child(label: string, capacity: number): Budget;
    /** Register cleanup for a spill file, worker, or queue tied to this budget. */
    onRelease(cleanup: () => void): void;
    /**
     * Release this budget. Refuses while any child budget or reservation is
     * outstanding (children must finish first). Runs cleanups LIFO, returns the
     * carve-out to the parent, and marks disposed. Cleanup errors are collected and
     * rethrown after every cleanup has run.
     */
    dispose(): void;
    private assertLive;
}

/**
 * Which side of the point of no return an operation is on.
 *
 * Canonical publication is that point. Cancelling BEFORE it rolls the whole operation back;
 * cancelling after it leaves the commit standing and cancels only derived work — layout, export,
 * caches.
 */
type CancellationPhase = 'pre-publication' | 'post-publication';
/** Thrown from a `checkpoint()` when the operation has been cancelled. */
declare class CancellationError extends Error {
    /** True when the commit is already published and only derived work is cancelled. */
    readonly derivedOnly: boolean;
    constructor(
    /** True when the commit is already published and only derived work is cancelled. */
    derivedOnly: boolean, reason?: string);
}
/**
 * The read side of cancellation, handed to cooperative work.
 *
 * Cooperative rather than pre-emptive: long work calls `checkpoint()` at declared intervals, which
 * is what lets an operation unwind promptly without the engine having to interrupt it mid-mutation.
 */
interface CancellationToken {
    readonly isCancelled: boolean;
    readonly phase: CancellationPhase;
    /** True only when cancelled AND the commit is already published. */
    readonly derivedOnly: boolean;
    /** Throws CancellationError if cancelled; call at declared checkpoint intervals. */
    checkpoint(): void;
}
/**
 * The write side of cancellation, and the owner of the phase.
 *
 * Whoever starts an operation holds this; everything it calls gets only the token.
 */
declare class CancellationController {
    private _cancelled;
    private _phase;
    private _reason?;
    cancel(reason?: string): void;
    /** Mark canonical publication — the point of no return. */
    markPublished(): void;
    get isCancelled(): boolean;
    get phase(): CancellationPhase;
    get isPublished(): boolean;
    /** Cancelled after publication -> full rollback is no longer possible. */
    get derivedOnly(): boolean;
    get token(): CancellationToken;
}

/** Injectable time source — the engine never calls Date.now directly (determinism). */
interface ClockPort {
    now(): number;
}
/** Stable id minting for sessions, commits, and allocator seeds. */
interface IdentityPort {
    newId(): string;
}
/** Cooperative scheduling of deferred work. */
interface SchedulingPort {
    schedule(task: () => void): void;
}
/** Redacted observability sink (raw text never enters here — design D5). */
interface AuditPort {
    record(entry: {
        readonly kind: string;
        readonly at: number;
        readonly meta?: Record<string, unknown>;
    }): void;
}
/** Read/write/export authorization decisions. */
interface AuthorizationPort {
    authorize(action: string, subject?: string): boolean;
}
/** Explicit consent gate for any remote/external resource (no zero-click fetch). */
interface ExternalResourceConsentPort {
    requestConsent(target: string): boolean;
}
/** Cancellation source for the current operation. */
interface CancellationPort {
    readonly token: CancellationToken;
}
/** Where documents are stored and retrieved. Opaque marker until its milestone. */
interface PersistencePort {
    readonly kind: 'persistence';
}
/** How the engine talks to a remote peer. Opaque marker until its milestone. */
interface TransportPort {
    readonly kind: 'transport';
}
/** Where font bytes come from. Opaque marker until its milestone. */
interface FontPort {
    readonly kind: 'font';
}
/** Which shaping backend measures text. Opaque marker until its milestone. */
interface ShapingPort {
    readonly kind: 'shaping';
}
/** How image bytes are decoded. Opaque marker until its milestone. */
interface ImagePort {
    readonly kind: 'image';
}
/** Where resource consumption is reported. Opaque marker until its milestone. */
interface ResourceAccountingPort {
    readonly kind: 'resource-accounting';
}
/**
 * A required port the runtime did not provide.
 *
 * Thrown rather than falling back: silently reaching for a browser global when a worker or server
 * adapter did not supply a port is exactly the coupling ports exist to prevent.
 */
declare class PortResolutionError extends Error {
    readonly portId: string;
    constructor(portId: string);
}
/**
 * The environment-dependent services an engine instance may reach.
 *
 * Everything outside pure computation — the clock, identity minting, scheduling, fonts, images —
 * is reached only through here, which is what lets browser, worker and server adapters supply
 * only what their runtime actually offers.
 */
declare class PortRegistry {
    private readonly ports;
    provide(portId: string, port: unknown): this;
    has(portId: string): boolean;
    /** Resolve a port by id or throw. */
    resolve<T>(portId: string): T;
    /** Assert every id in `portIds` is present; returns the missing ones (empty if all present). */
    missing(portIds: readonly string[]): string[];
    /** The provided port ids (for bridging to registry.resolve availablePorts). */
    availablePorts(): string[];
    clock(): ClockPort;
    identity(): IdentityPort;
}
/** Deterministic clock: starts at `start` and advances by `step` each call. */
declare class DeterministicClock implements ClockPort {
    private readonly step;
    private t;
    constructor(start?: number, step?: number);
    now(): number;
}
/** Sequential identity for tests and deterministic fixtures. */
declare class SequentialIdentity implements IdentityPort {
    private readonly prefix;
    private n;
    constructor(prefix?: string);
    newId(): string;
}

/** What one operation is started with. Only `ports` is required. */
interface OperationInit {
    readonly ports: PortRegistry;
    readonly limits?: Partial<ResourceLimits>;
    readonly config?: Readonly<Record<string, unknown>>;
    /** Root budget capacity in abstract units (default: the byte decompression limit). */
    readonly capacity?: number;
    /** Operation identity (from IdentityPort in production); defaulted for tests. */
    readonly id?: string;
}
/**
 * The frozen environment of one operation: its limits, config, ports, root budget and
 * cancellation controller.
 *
 * IMMUTABLE for the operation's lifetime, which is what lets cache reuse and replica agreement
 * key on it. A new operation always gets a fresh snapshot rather than observing a mutated one.
 */
interface OperationContext {
    readonly id: string;
    readonly limits: ResourceLimits;
    readonly config: Readonly<Record<string, unknown>>;
    readonly ports: PortRegistry;
    readonly budget: Budget;
    readonly cancellation: CancellationController;
}
/**
 * Begin an operation, capturing its immutable environment snapshot.
 *
 * Resolves and freezes limits and configuration, carves the root budget, and creates the
 * cancellation controller — everything downstream work needs, fixed for the operation's duration.
 */
declare function beginOperation(init: OperationInit): OperationContext;
/** Release the operation's root budget (requires every child/reservation released). */
declare function endOperation(ctx: OperationContext): void;

/** What a limit counts. Typed so a byte cap and a depth cap cannot be compared by accident. */
type LimitUnit = 'bytes' | 'count' | 'depth' | 'ratio' | 'passes';
/**
 * Where a limit is enforced.
 *
 * Declared per limit so enforcement happens at the boundary that can still refuse cheaply — a zip
 * cap checked during layout has already let the bomb decompress.
 */
type EnforcementPhase = 'package-read' | 'xml-parse' | 'layout' | 'output';
/** One limit's unit and enforcement phase — the metadata that makes limits testable uniformly. */
interface LimitSpec {
    readonly unit: LimitUnit;
    readonly phase: EnforcementPhase;
}
/** Unit + enforcement phase for every resource limit. */
declare const LIMIT_SPECS: Readonly<Record<keyof ResourceLimits, LimitSpec>>;
/** Every limit name, for iterating the specs and asserting each has a unit and phase. */
declare const LIMIT_KEYS: (keyof ResourceLimits)[];
/** A phase-scoped overflow-safe counter for one limit. */
declare function makeLimitCounter(limits: ResourceLimits, key: keyof ResourceLimits): BoundedCounter;
/**
 * Deterministic memory substitute. Tracks current and peak "allocated" units
 * against a hard byte ceiling; `allocate` fails closed (LimitExceededError) past
 * the limit. Used in place of process RSS so memory-limit tests are reproducible
 * and cancellation/cleanup can be asserted without a real allocator.
 */
declare class DeterministicMemoryMeter {
    private readonly counter;
    private current;
    private peak;
    constructor(limitBytes: number);
    allocate(bytes: number): void;
    free(bytes: number): void;
    get currentBytes(): number;
    get peakBytes(): number;
    /** Release everything (cancellation/cleanup path). */
    reset(): void;
}
/** Assert the finite-default / hard-ceiling invariant holds for every limit. */
declare function assertLimitInvariants(): void;

/** Any JSON value. The domain canonicalization and stable hashing operate over. */
type Json = null | boolean | number | string | Json[] | {
    [k: string]: Json;
};
/**
 * Produce a canonical string for `value`, dropping any object key whose name is
 * in `ephemera` at any depth. Numbers are emitted losslessly; -0 normalizes to 0;
 * non-finite numbers are rejected (they must never enter a comparator input).
 */
declare function canonicalize(value: unknown, ephemera?: ReadonlySet<string>): string;
/** 64-bit FNV-1a over the canonical form, returned as a 16-char hex string. */
declare function stableHash(value: unknown, ephemera?: ReadonlySet<string>): string;

/**
 * How one artifact class is compared.
 *
 * Frozen per artifact: nothing here invents a tolerance for an artifact the spec requires to
 * match exactly.
 */
type ComparatorMode = 'canonical-exact' | 'exact' | 'tolerance' | 'sync-optimization-only';
/** One artifact class's comparison mode and its declared ephemera — fields excluded from equality. */
interface ComparatorDescriptor {
    readonly id: string;
    readonly mode: ComparatorMode;
    /** Object keys excluded from canonical-exact comparison (declared ephemera). */
    readonly ephemera: readonly string[];
    readonly note: string;
}
/** The frozen artifact comparator set. */
declare const COMPARATORS: {
    readonly authoredState: {
        readonly id: "dev.docx-editor.core.comparator.authored-state";
        readonly mode: "canonical-exact";
        readonly ephemera: readonly ["revision", "provenance", "producedAt", "commitId"];
        readonly note: "canonical normalized authored records; ephemera excluded";
    };
    readonly anchor: {
        readonly id: "dev.docx-editor.core.comparator.anchor";
        readonly mode: "exact";
        readonly ephemera: readonly [];
        readonly note: "internal anchor identity/affinity compares exactly";
    };
    readonly yjsStateVector: {
        readonly id: "dev.docx-editor.core.comparator.yjs-state-vector";
        readonly mode: "sync-optimization-only";
        readonly ephemera: readonly [];
        readonly note: "exchange optimization only; never proves update or delete-set coverage";
    };
    readonly shapedRun: {
        readonly id: "dev.docx-editor.core.comparator.shaped-run";
        readonly mode: "exact";
        readonly ephemera: readonly [];
        readonly note: "glyph ids, clusters, and fixed-point advances compare exactly";
    };
    readonly paginationFingerprint: {
        readonly id: "dev.docx-editor.core.comparator.pagination-fingerprint";
        readonly mode: "exact";
        readonly ephemera: readonly [];
        readonly note: "page/column boundaries, break causes, fixed-point geometry compare exactly";
    };
    readonly semanticTree: {
        readonly id: "dev.docx-editor.core.comparator.semantic-tree";
        readonly mode: "exact";
        readonly ephemera: readonly [];
        readonly note: "reading order, roles, headings, alt text compare exactly";
    };
    readonly hitTest: {
        readonly id: "dev.docx-editor.core.comparator.hit-test";
        readonly mode: "exact";
        readonly ephemera: readonly [];
        readonly note: "resolved hit target and cluster affinity compare exactly";
    };
    readonly pdfSemantics: {
        readonly id: "dev.docx-editor.core.comparator.pdf-semantics";
        readonly mode: "canonical-exact";
        readonly ephemera: readonly ["objectNumber", "producer", "creationDate", "modDate", "subsetTag"];
        readonly note: "canonical semantic PDF objects; container ephemera excluded";
    };
    readonly rasterCheckpoint: {
        readonly id: "dev.docx-editor.core.comparator.raster-checkpoint";
        readonly mode: "tolerance";
        readonly ephemera: readonly [];
        readonly note: "documented unavoidable raster comparison; explicit tolerance only";
    };
    readonly benchmarkEvidence: {
        readonly id: "dev.docx-editor.core.comparator.benchmark-evidence";
        readonly mode: "sync-optimization-only";
        readonly ephemera: readonly [];
        readonly note: "diagnostic evidence, not an equivalence basis";
    };
};
/** Which frozen comparator to use. */
type ComparatorName = keyof typeof COMPARATORS;
/** Whether two artifacts matched, and where they diverged when they did not. */
interface ComparisonResult {
    readonly equal: boolean;
    /** Canonical forms when unequal (diagnostic). */
    readonly left?: string;
    readonly right?: string;
}
/**
 * Compare two artifacts under a named comparator. `canonical-exact` and `exact`
 * compare canonical forms (exact drops no ephemera). `tolerance` requires an
 * epsilon and compares finite numbers structurally. `sync-optimization-only`
 * throws — such artifacts are never an equivalence basis.
 */
declare function compareArtifacts(name: ComparatorName, left: unknown, right: unknown, opts?: {
    epsilon?: number;
}): ComparisonResult;
/** Fingerprint an artifact under a named comparator's canonicalization policy. */
declare function fingerprint(name: ComparatorName, value: unknown): string;

/** Whether a recorded conformance step was expected to commit or be refused. */
type FixtureOutcome = 'applied' | 'aborted' | 'validation' | 'conflict' | 'resource' | 'authorization';
/** The change one step produced, summarized to what a fixture can compare across runtimes. */
interface ModelChangeSummary {
    readonly fromRevision: number;
    readonly toRevision: number;
    readonly origin: string;
    readonly dirty: readonly string[];
    readonly dependencyKeys: readonly string[];
}
/** Where anchors sat after a step — how a fixture proves positions survived an edit. */
interface AnchorSnapshot {
    readonly anchorId: string;
    readonly story: string;
    readonly block: string;
    readonly affinity: 'before' | 'after';
}
/** What one step must produce: its outcome, its change summary, and its authored-state hash. */
interface FixtureExpectation {
    readonly outcome: FixtureOutcome;
    /** Present iff outcome === 'applied'; MUST be > baseRevision. */
    readonly committedRevision?: number;
    readonly modelChange?: ModelChangeSummary;
    /** 16-hex authored-state fingerprint (comparator 0.4). */
    readonly authoredStateHash?: string;
    readonly outputHash?: string;
    readonly anchors?: readonly AnchorSnapshot[];
}
/** One recorded operation and what it was expected to do. */
interface FixtureStep {
    readonly baseRevision: number;
    readonly origin: string;
    /** Opaque DocOp payloads (schema owned by section 4). */
    readonly ops: readonly unknown[];
    readonly expect: FixtureExpectation;
}
/** Opaque encoded backend bytes (snapshot or replication update). */
interface EncodedEnvelope {
    readonly kind: 'snapshot' | 'update';
    readonly protocolVersion: number;
    readonly schemaVersion: number;
    readonly documentId: string;
    readonly byteLength: number;
    /** Hex-encoded opaque bytes; length MUST equal byteLength. */
    readonly bytesHex: string;
}
/** Which implementation recorded a fixture — local store, Yjs, or a binding. */
type FixtureSource = {
    readonly kind: 'create';
} | {
    readonly kind: 'docx';
    readonly sha256: string;
    readonly bytesRef: string;
};
/**
 * The frozen conformance container: revisions, origins, operations, changes, snapshots and
 * hashes.
 *
 * The CONTAINER is what is frozen — field names, origin membership, revision monotonicity, hash
 * format. The op and change payloads travel opaquely, so their schemas can evolve without
 * invalidating every recorded fixture.
 */
interface ConformanceFixture {
    readonly formatVersion: 1;
    readonly documentId: string;
    readonly source: FixtureSource;
    readonly steps: readonly FixtureStep[];
    readonly snapshots?: readonly EncodedEnvelope[];
    readonly updates?: readonly EncodedEnvelope[];
}
/** Whether a fixture is well-formed, listing every structural violation. */
interface ValidationResult {
    readonly valid: boolean;
    readonly errors: readonly string[];
}
/** Structurally validate a fixture against the frozen format rules. */
declare function validateFixture(fixture: ConformanceFixture): ValidationResult;

/** The outcome a store reports for one replayed step. */
interface ReplayOutcome {
    readonly outcome: FixtureOutcome;
    readonly committedRevision?: number;
    /** Canonical authored-state value AFTER the step (hashed via comparator 0.4). */
    readonly authoredState?: unknown;
}
/** The interface a conformance runtime implements so one fixture can drive every backend. */
interface ReplayStore {
    /** Initialize from the fixture source; return the initial revision (0 for create). */
    init(fixture: ConformanceFixture): number;
    /** Apply one step and report what happened. */
    applyStep(step: FixtureStep): ReplayOutcome;
}
/** What replaying a fixture produced: per-step outcomes and where they diverged. */
interface ReplayReport {
    readonly ok: boolean;
    readonly mismatches: readonly string[];
}
/**
 * Replay a fixture against a store and check every step's outcome, committed
 * revision, and authored-state fingerprint against the fixture's expectations.
 */
declare function replayFixture(fixture: ConformanceFixture, store: ReplayStore): ReplayReport;
/** Hash a store's authored state, so two runtimes replaying one fixture can be compared. */
declare function hashAuthored(authoredState: unknown): string;

/**
 * Keys that must never be assigned from file data.
 *
 * XML attribute names become object keys, and a document controls those names — assigning
 * `__proto__` into an ordinary object is the prototype-pollution hazard this engine audits for.
 */
declare const DANGEROUS_KEYS: readonly string[];
/** A file-derived key that would pollute a prototype. Refused, never sanitized-and-accepted. */
declare class DangerousKeyError extends Error {
    readonly key: string;
    readonly path: string;
    constructor(key: string, path: string);
}
/** Whether a key is one of {@link DANGEROUS_KEYS}. */
declare function isDangerousKey(key: string): boolean;
/** A fresh null-prototype record — the only object shape parser intermediates use. */
declare function nullRecord<T = unknown>(): Record<string, T>;
/**
 * Recursively convert `value` into null-prototype records, rejecting any
 * dangerous object key. Arrays and primitives pass through (arrays rebuilt so no
 * inherited prototype pollution survives). Throws DangerousKeyError on the first
 * unsafe key, naming its path. Cyclic inputs are rejected.
 */
declare function toSafeRecord(value: unknown, path?: string): unknown;

/**
 * Serialize normalized XML from a canonical part using repository-controlled
 * prefixes and validated, escaped names and values. This does not yet replace
 * writeDocx; package integration belongs to the subsequent migration pass.
 */
declare function serializeOoxmlPart(part: OoxmlPart): string;
/** Repository-owned namespace-aware semantic XML oracle. */
declare function canonicalOoxmlFingerprint(value: OoxmlPart | OoxmlNode): string;
/**
 * Structural equality of two canonical trees, ignoring node ids.
 *
 * Ids differ between two parses of the same bytes, so comparing them would report every reopen as
 * a change. This compares what the document SAYS.
 */
declare function ooxmlTreesEqual(left: OoxmlPart | OoxmlNode, right: OoxmlPart | OoxmlNode): boolean;

/**
 * Validate a parser-created or copy-modified immutable part before publication.
 * Future tree-edit primitives can retain shared nodes and their IDs, while any
 * replacement chooses explicitly whether to retain or allocate identity.
 */
declare function validateOoxmlPart(part: OoxmlPart): OoxmlInvariantResult;

/** Locate `[Content_Types].xml` bytes regardless of zip key spelling. */
declare function contentTypesPartBytes(pkg: OoxmlPackage): {
    readonly storageKey: string;
    readonly bytes: Uint8Array;
} | null;
/**
 * What a package-level invariant walk found wrong.
 *
 * Package invariants are cross-PART: a relationship pointing at a part that does not exist, or a
 * part no content-type record covers. Neither is visible from inside a single part's tree.
 */
type PackageInvariantCode = 'dangling-relationship' | 'missing-content-type'
/** A part occupies a name OPC reserves for package infrastructure. */
 | 'reserved-part-name'
/** Two parts whose names differ only by case, which OPC treats as one part. */
 | 'duplicate-part-name'
/** A part name the OPC screens refuse; `writeZip` would throw on save. */
 | 'unsafe-part-name';
/** One package invariant violation, located by part name and relationship id. */
interface PackageInvariantIssue {
    readonly code: PackageInvariantCode;
    /** The part the issue is about: the missing target, or the part with no type. */
    readonly partName: string;
    /** For a dangling relationship, the owner that points at nothing. */
    readonly ownerPart?: string;
}
/** Whether a package satisfies its cross-part invariants, listing every violation otherwise. */
type PackageInvariantResult = {
    readonly ok: true;
} | {
    readonly ok: false;
    readonly issues: readonly PackageInvariantIssue[];
};
/** Relationship records owned by one part, in authored order. */
declare function relationshipsOf(pkg: OoxmlPackage, ownerPart: string): readonly RelationshipRecord[];
/** The content type that resolves for a part name, or null when nothing declares one. */
declare function resolveContentTypeOf(pkg: OoxmlPackage, partName: string): string | null;
/** The `.rels` part that owns a part's relationships, by OPC convention. */
declare function relsPartNameFor(partName: string): string;
/**
 * Declare a content type for a part, by upserting an `<Override>` in the content-types tree.
 *
 * A no-op when the part already resolves to the same type, so repeating a write does not append
 * a duplicate entry. Resolving to a DIFFERENT type replaces the existing Override in place.
 * `forceOverride` writes an explicit Override even when a Default already matches.
 */
declare function withContentTypeOverride(pkg: OoxmlPackage, partName: string, contentType: string, options?: {
    readonly forceOverride?: boolean;
}): OoxmlPackage;
/** What {@link withoutPart} answers: `ok: false` leaves the package exactly as it was. */
interface WithoutPartResult {
    readonly pkg: OoxmlPackage;
    readonly ok: boolean;
}
/** Add or replace one relationship on a part, returning a new package. */
declare function withRelationship(pkg: OoxmlPackage, ownerPart: string, type: string, rawTarget: string): {
    readonly pkg: OoxmlPackage;
    readonly relationshipId: string;
    readonly ok: boolean;
};
/**
 * Add a part that does not exist yet, with the content-type override it needs to be openable.
 *
 * Deliberately does NOT create a relationship: a part is reachable because something points at
 * it, and which part points at it is the caller's decision. Creating one here would guess.
 */
declare function withNewPart(pkg: OoxmlPackage, partName: string, root: OoxmlElement, contentType: string): OoxmlPackage;
/**
 * The two invariants a package must satisfy before it is published.
 *
 * Both describe the half-written state that splitting a multi-part write across transactions
 * produces, and both make a package Word refuses to open:
 *
 *  - a relationship pointing at a part nobody created;
 *  - a part with no content type, which is unopenable even though the XML is well formed.
 *
 * Checked at the commit boundary rather than inside each primitive, for the same reason part
 * validation moved there: a transaction is allowed to pass through an inconsistent intermediate
 * as long as nothing can observe it.
 */
declare function validatePackageInvariants(pkg: OoxmlPackage): PackageInvariantResult;

/** Whether a string is a valid XML NCName — a name with no colon. */
declare function isValidNCName(name: string): boolean;
/** A QName is an optional `prefix:` (both NCNames) — never attacker-derived. */
declare function isValidQName(name: string): boolean;
/**
 * Validate a qualified name, throwing when it is malformed.
 *
 * Guards the serializer: an invalid QName written into XML produces a file Word cannot open, so
 * it fails here rather than at save.
 */
declare function assertValidQName(name: string): void;
/**
 * Controlled namespace-prefix allocation: deterministic, collision-free prefixes
 * for namespace URIs. A known URI always yields the same registered prefix; new
 * URIs get a generated `ns{n}` prefix, never one derived from file content.
 */
declare class PrefixAllocator {
    private readonly byUri;
    private readonly usedPrefixes;
    private counter;
    constructor(known?: Readonly<Record<string, string>>);
    prefixFor(namespaceUri: string): string;
    /** The declared bindings, for emitting xmlns declarations. */
    bindings(): {
        prefix: string;
        uri: string;
    }[];
}

/**
 * A hyperlink target projected for a RUNTIME sink, or the reason it was withheld.
 *
 * The authored target stays authored — the record layer keeps it verbatim and escapes it into
 * owned OOXML, which is not a runtime sink. Only this allowlist-sanitized projection reaches DOM,
 * CSS, navigation or fetch, so `javascript:`, `data:` and `vbscript:` never leave the boundary.
 */
type HrefProjection = {
    readonly ok: true;
    readonly href: string;
} | {
    readonly ok: false;
    readonly inert: true;
};
/**
 * Project a file-derived URL for a DOM/navigation sink. Strips embedded
 * tab/LF/CR (used to smuggle `java\nscript:`), allows relative URLs and the
 * scheme allowlist, and renders everything else inert. Never fetches.
 */
declare function sanitizeHref(raw: string): HrefProjection;
/** XML-escape a value for validated serialization back into owned OOXML. */
declare function escapeXml(value: string): string;
/**
 * CSS string-escape a file-derived value (e.g. an `@font-face` family name or an
 * inline style value). Emits `\<hex> ` escapes for quotes, backslash, and
 * controls so the value cannot break out of its CSS string.
 */
declare function escapeCssString(value: string): string;
/** Whether a file-derived CSS fragment contains a `url()` or `@import` (must be rejected). */
declare function containsCssFetch(value: string): boolean;
/**
 * Content that must never execute or auto-resolve: OLE objects, macros, DDE and `INCLUDE*` field
 * instructions.
 *
 * Rendered INERT by default rather than stripped — removing it would be a lossless-preservation
 * failure, so it is carried and never acted on.
 */
declare const INERT_EXECUTABLE_KINDS: readonly ["field-dde", "field-include", "macro", "activex", "ole", "embedded-object", "executable-relationship"];
/** One of {@link INERT_EXECUTABLE_KINDS}. */
/** One of {@link INERT_EXECUTABLE_KINDS} — content carried but never executed. */
type InertExecutableKind = (typeof INERT_EXECUTABLE_KINDS)[number];
/** Whether a content kind is one this engine refuses to execute or auto-resolve. */
declare function isInertExecutable(kind: string): boolean;
/** Whether a field instruction's leading keyword is safe to evaluate. */
declare function isEvaluableField(instruction: string): boolean;
/** One item a scrub pass considers: its kind, and where in the package it sits. */
interface ContentItem {
    readonly id: string;
    readonly kind: string;
}
/**
 * What an explicit scrub removed.
 *
 * A scrub DECLARES ITSELF non-lossless: removing executable content changes the file, which is a
 * choice a caller makes deliberately rather than a default the engine applies.
 */
interface ScrubResult {
    readonly kept: readonly ContentItem[];
    readonly removed: readonly ContentItem[];
    /** A scrub that removes anything is non-lossless by definition. */
    readonly nonLossless: boolean;
}
/** Explicit scrub export: remove inert executable classes, report removals. */
declare function scrubExport(items: readonly ContentItem[]): ScrubResult;

/** An edited part, or the invariant violations that rejected the edit. */
type OoxmlEditResult = {
    readonly ok: true;
    readonly part: OoxmlPart;
} | {
    readonly ok: false;
    readonly issues: readonly OoxmlInvariantIssue[];
};
/**
 * How an edit primitive validates its result.
 *
 * By default every primitive runs the full-part invariant validation before handing its
 * result back — the safe reading for an isolated call. A TRANSACTION applying many ops pays
 * that full-tree walk once per primitive, which is what made a hundred-paragraph paste
 * quadratic; it defers instead, and runs the same validation ONCE on the final tree before
 * anything is published. Deferring is only sound for a caller that owns a commit boundary:
 * nothing may escape between the unvalidated intermediate and the validated result.
 */
interface EditOptions {
    readonly deferValidation?: boolean;
}
/** Every node id currently present in the part. */
declare function collectNodeIds(part: OoxmlPart): Set<string>;
/**
 * Mint ids for nodes an edit introduces.
 *
 * Deterministic and collision-checked against the whole part: a structural-path id from the
 * original parse (`/word/document.xml#0.1.2`) and a minted one (`/word/document.xml#new:3`)
 * can never coincide, and the counter skips anything already taken so repeated edits in one
 * session stay unique.
 *
 * Checks the part's node index directly rather than copying every id into a fresh set: the
 * copy was O(document) per op, and an allocator is created for every op.
 */
declare function createNodeIdAllocator(part: OoxmlPart): () => string;
/** Whether a node id exists in the part. */
declare function hasNode(part: OoxmlPart, nodeId: string): boolean;
/** Read a node back out of a part by id. */
declare function findNode(part: OoxmlPart, nodeId: string): OoxmlNode | null;
/** The element that holds a node, or null for the root and for unknown ids. */
declare function parentNodeOf(part: OoxmlPart, nodeId: string): OoxmlElement | null;
/** Replace one node's children wholesale. */
declare function replaceChildren(part: OoxmlPart, nodeId: string, children: readonly OoxmlNode[], options?: EditOptions): OoxmlEditResult;
/** Insert children into a node at `index` (clamped to the child list). */
declare function insertChildren(part: OoxmlPart, nodeId: string, index: number, children: readonly OoxmlNode[], options?: EditOptions): OoxmlEditResult;
/** Replace one node with another, keeping its position among its siblings. */
declare function replaceNode(part: OoxmlPart, nodeId: string, replacement: OoxmlNode, options?: EditOptions): OoxmlEditResult;
/** Remove a node and its subtree. */
declare function removeNode(part: OoxmlPart, nodeId: string, options?: EditOptions): OoxmlEditResult;
/**
 * Apply several primitives as ONE atomic step.
 *
 * Each edit runs against the result of the previous one, and the whole sequence is
 * validated once at the end. If any step fails, the ORIGINAL part is what the caller keeps
 * — there is no partially-edited intermediate to publish. This is the shape a multi-`DocOp`
 * store transaction needs.
 */
declare function applyEdits(part: OoxmlPart, edits: readonly ((current: OoxmlPart) => OoxmlEditResult)[], options?: EditOptions): OoxmlEditResult;

/** UTF-16 placeholder for a page break in paragraph text projections. */
declare const PAGE_BREAK_CHAR = "\f";
/** What a `w:br` breaks. `other` covers values this engine does not model, kept losslessly. */
type HardBreakKind = 'line' | 'page' | 'column' | 'other';
/** Read the semantic break kind from a typed `w:br` node. */
declare function hardBreakKind(node: OoxmlHardBreakNode): HardBreakKind;
/** Whether a node is a `w:br` with `w:type="page"`. */
declare function isPageBreakNode(node: OoxmlNode): node is OoxmlHardBreakNode;
/** Text projection for a `w:br` node — one UTF-16 code unit per break. */
declare function hardBreakText(node: OoxmlHardBreakNode): string;
/** Attributes for a newly authored `w:br`. */
declare function hardBreakAttributes(kind: 'line' | 'page'): OoxmlHardBreakNode['attributes'];

/** UTF-16 placeholder for one atomic field unit in `paragraphTextOf` / segments. */
declare const FIELD_ATOM_CHAR = "\uFFFC";
/**
 * Which part of a complex field a `w:fldChar` marks.
 *
 * A complex field spans many runs: `begin`, the instruction, `separate`, the cached result, then
 * `end` — which is why a field is one logical unit across several nodes.
 */
type FldCharType = 'begin' | 'separate' | 'end';
/** Read `@w:fldCharType` when present and schema-legal. */
declare function fldCharType(node: OoxmlNode): FldCharType | null;
/** Whether a node is a `w:fldChar` field boundary marker. */
declare function isFldCharNode(node: OoxmlNode): node is OoxmlFldCharNode;
/**
 * Whether a node is `w:instrText` — a field's instruction.
 *
 * Instructions are never EXECUTED or auto-resolved: `DDE` and `INCLUDE*` render inert.
 */
declare function isInstrTextNode(node: OoxmlNode): node is OoxmlInstrTextNode;
/** Whether a node is `w:fldSimple` — a field whose instruction and result are one element. */
declare function isFldSimpleNode(node: OoxmlNode): node is OoxmlFldSimpleNode;
/** Typed or generic `w:fldChar` with the given type. */
declare function isFldChar(node: OoxmlNode, type: FldCharType): boolean;
/** Typed or generic `w:instrText`. */
declare function isInstrText(node: OoxmlNode): boolean;
/** Typed or generic `w:fldSimple`. */
declare function isFldSimple(node: OoxmlNode): boolean;
/** Concatenated text descendants of `w:instrText` (instruction only — never executed). */
declare function instrTextValue(node: OoxmlNode): string;
/** `@w:instr` on `w:fldSimple`, or undefined when absent. */
declare function fldSimpleInstr(node: OoxmlNode): string | undefined;
/**
 * Read an on/off WML attribute (`dirty` / `fldLock`).
 *
 * Returns `undefined` when absent, otherwise the OOXML on/off interpretation
 * (present without val, or val not explicitly off → true).
 */
declare function fieldOnOffAttribute(node: OoxmlNode, localName: 'dirty' | 'fldLock'): boolean | undefined;
/** Model text contributed by one atomic field unit. */
declare function fieldAtomText(): typeof FIELD_ATOM_CHAR;
/**
 * True when a node is field chrome that never contributes its own model text outside
 * an atomic span (markers + instruction). Cached result `w:t` is separate.
 */
declare function isFieldChrome(node: OoxmlNode): boolean;
/**
 * True when a `w:fldChar` carries `w:ffData` — a LEGACY FORM FIELD (§17.16.17).
 *
 * FORMTEXT, FORMCHECKBOX and FORMDROPDOWN are what a fillable Word form is made of, and Word
 * shades them on sight so a reader can find the blanks. That is the only reason to ask: it is a
 * presentation question, answered by the element's presence alone.
 *
 * Presence ONLY. `w:ffData` can carry entry and exit MACRO names, and the canonical tree keeps
 * its whole subtree generic and inert on purpose. Walking into it to read a name or a default
 * would be reading attacker-supplied script references for no gain — the shading does not
 * depend on what the form field says, only on it being one.
 */
declare function hasLegacyFormFieldData(node: OoxmlNode): boolean;
/**
 * One atomic field span inside a paragraph for caret / delete / selection.
 *
 * `removeNodeIds` lists every node that must leave with the unit (begin…end chrome and
 * cached-result content for complex fields; the `fldSimple` element for simple fields).
 *
 * `formatRunIds` lists the runs whose `w:rPr` owns displayed result formatting — result-phase
 * runs with measurable cache text for complex fields, child `w:r`s for `fldSimple`, or the
 * separate/begin run when the result is empty. Delete / caret addressing still uses `runId`
 * (the begin / simple node); formatting must not rewrite chrome-only begin runs when the
 * painted glyphs come from a different result run.
 */
interface AtomicFieldSpan {
    readonly kind: 'complex' | 'simple';
    /** Addressable segment node (begin `fldChar` or `fldSimple`). */
    readonly node: OoxmlNode;
    /** Run that owns the begin marker; empty string for paragraph-level `fldSimple`. */
    readonly runId: string;
    readonly removeNodeIds: readonly string[];
    /** Runs that own displayed result formatting (may differ from `runId`). */
    readonly formatRunIds: readonly string[];
}
/** Collect only fields whose cached result is one atomic model unit. */
declare function atomicFieldSpansOf(paragraph: OoxmlParagraphNode, options?: {
    readonly maxNesting?: number;
    readonly maxInstructionChars?: number;
}): readonly AtomicFieldSpan[];
/** Whether `fldCharType` is a legal ST_FldCharType value (used by tests / guards). */
declare function isLegalFldCharType(value: string): boolean;

/** Parsed TOC instruction. Unknown switches are ignored for generation but left on the wire. */
interface TocInstruction {
    readonly keyword: 'TOC';
    /** Include hyperlinks (`\\h`). */
    readonly hyperlink: boolean;
    /** Omit page numbers (`\\n`). */
    readonly omitPageNumbers: boolean;
    /** Inclusive 1-based outline levels from `\\o "n-m"`. Defaults 1–9. */
    readonly outlineStart: number;
    readonly outlineEnd: number;
    readonly raw: string;
}
/** Longest TOC field instruction read. Instructions come from a file; the parse is bounded. */
declare const TOC_MAX_INSTRUCTION_CHARS = 256;
/** Most entries one generated table of contents may hold. */
declare const TOC_MAX_ENTRIES = 512;
/** Most bookmarks minted during one TOC refresh. */
declare const TOC_MAX_BOOKMARKS_PER_REFRESH = 512;
/** Deepest nested field instruction followed. Caps recursion on file-supplied structure. */
declare const TOC_MAX_FIELD_NESTING = 4;
/**
 * Most layout passes a TOC refresh runs before settling.
 *
 * Page numbers change the TOC's own height, which changes page numbers — bounded so a
 * non-converging document stops rather than looping.
 */
declare const TOC_MAX_PAGE_PASSES = 3;
/**
 * Parse a TOC field instruction string.
 *
 * Returns null when the leading keyword is not TOC, the string is over-long, or the
 * outline range is hostile. Does not evaluate or fetch anything.
 */
declare function parseTocInstruction(raw: string): TocInstruction | null;

/** A table of contents found in a document, whether wrapped in an SDT or a bare field. */
interface DetectedToc {
    /** Enclosing control id when it identifies one TOC, otherwise the begin fldChar id. */
    readonly id: string;
    readonly beginNodeId: string;
    readonly beginParagraphId: string;
    readonly endParagraphId: string;
    readonly resultParagraphIds: readonly string[];
    /** Direct parent whose paragraph children delimit the cached result. */
    readonly containerId: string;
    readonly contentControlId?: string;
    readonly instruction: TocInstruction;
}
/** Discover refreshable body TOCs without evaluating any field instruction. */
declare function detectBodyTocs(part: OoxmlPart): readonly DetectedToc[];
/** Locate the table of contents containing a position, or null. */
declare function findDetectedToc(tocs: readonly DetectedToc[], tocId: string): DetectedToc | null;

/** Outline heading shape consumed by TOC planning (mirrors DocumentOutlineEntry). */
interface TocOutlineHeading {
    readonly text: string;
    readonly level: number;
    readonly blockId: string;
}

/** Left-indent step between TOC levels, in twips (matches `scripts/demo-doc/toc-block.xml`). */
declare const TOC_LEVEL_INDENT_TWIPS = 240;
/** Bounded left-indent twips for a TOC entry level (0-based heading depth). */
declare function tocLeftIndentTwips(level: number): number;
/** One planned TOC entry: its level, its text, and the heading it points at. */
interface TocEntryPlan {
    readonly level: number;
    readonly text: string;
    readonly headingParagraphId: string;
    readonly bookmarkName: string;
    readonly pageNumberText: string;
}
/** Build one TOC entry paragraph node. */
declare function buildTocEntryParagraph(mint: () => string, entry: TocEntryPlan, instruction: TocInstruction, paragraphPropertiesTemplate?: OoxmlNode): OoxmlNode;
/** Build an SDT-wrapped complex TOC field with an already planned cached result. */
declare function buildTocContentControl(mint: () => string, entries: readonly TocEntryPlan[], instruction: TocInstruction, alias: string): OoxmlNode;
/**
 * Word flattens manual line/tab breaks from a heading into spaces in its TOC cache.
 * Carrying them verbatim makes a short title wrap even when the row has ample room, and the
 * same normalization is what lets a cached row be matched back to the heading it came from.
 */
declare function tocEntryText(text: string): string;
/**
 * Plan TOC entries from the outline and existing bookmarks.
 */
declare function planTocEntries(part: OoxmlPart, outline: readonly TocOutlineHeading[], instruction: TocInstruction, pageNumberByParagraphId: ReadonlyMap<string, string>, excludeParagraphIds: ReadonlySet<string>): {
    readonly entries: readonly TocEntryPlan[];
    readonly bookmarksToCreate: readonly {
        paragraphId: string;
        name: string;
    }[];
};
/** Create bookmarkStart/End pair nodes for insertion at the start of a paragraph. */
declare function bookmarkPairNodes(mint: () => string, name: string, id: string): {
    readonly start: OoxmlNode;
    readonly end: OoxmlNode;
};

/**
 * The heading each cached result row stands for, aligned with `toc.resultParagraphIds`.
 *
 * `null` for a row that names no heading this document still has — a stale row, or the
 * chrome/blank paragraphs a cached result can carry. Callers leave those alone rather than
 * writing another row's number into them.
 */
declare function resolveTocRowHeadings(part: OoxmlPart, toc: DetectedToc, outline: readonly TocOutlineHeading[], excludeParagraphIds: ReadonlySet<string>): readonly (string | null)[];

/** One paragraph in the index: its node id, its story, and its position. */
interface ParagraphIndexEntry {
    /** Canonical tree node id — the stable identity operations address. */
    readonly nodeId: string;
    /** Position among the story's paragraphs, in document order. */
    readonly ordinal: number;
    /** Concatenated text content, with tabs and breaks mapped as the model reads them. */
    readonly text: string;
    /** Node ids of the paragraph's runs, in order. */
    readonly runIds: readonly string[];
}
/** One story root — body, a header/footer variant, or a note part. */
interface StoryIndexEntry {
    /** The part the story lives in. */
    readonly partName: string;
    /** The `w:body` (or story root) node id. */
    readonly rootId: string;
    readonly paragraphs: readonly ParagraphIndexEntry[];
}
/** One style definition, indexed by the id content references it under. */
interface StyleIndexEntry {
    readonly styleId: string;
    readonly type: string;
    readonly nodeId: string;
    readonly name: string | null;
    readonly basedOn: string | null;
    /** Whether the part marks this the default style for its type (`w:default="1"`). */
    readonly isDefault: boolean;
}
/**
 * The derived lookups over a part: paragraphs, stories and styles by id.
 *
 * Diff-patched on commit rather than rebuilt — rebuilding every index per keystroke is what made
 * typing scale with document length.
 */
interface OoxmlIndexes {
    /** The tree revision these projections were derived from. */
    readonly revision: number;
    /** Body story first, then any other story parts, keyed by part name. */
    readonly stories: ReadonlyMap<string, StoryIndexEntry>;
    /** Every paragraph across every story, keyed by node id. */
    readonly paragraphs: ReadonlyMap<string, ParagraphIndexEntry>;
    readonly relationships: ReadonlyMap<string, readonly RelationshipRecord[]>;
    readonly styles: ReadonlyMap<string, StyleIndexEntry>;
}
/** Style definitions, read out of the generic `w:styles` tree. */
declare function indexStyles(part: OoxmlPart | undefined): Map<string, StyleIndexEntry>;
/** The package's style definitions part, if it has one. */
declare function stylesPartOf(pkg: OoxmlPackage): OoxmlPart | undefined;
/**
 * Derive every index from one canonical package revision.
 *
 * Pure: the same package and revision always produce the same index, which is what makes
 * "rebuild rather than mutate" a safe invalidation strategy.
 */
declare function deriveOoxmlIndexes(pkg: OoxmlPackage, revision: number): OoxmlIndexes;

/** One paragraph's meaning, independent of how it was spelled in XML. */
interface ParagraphDigest {
    /** Ordinal identity within its story. Node ids are NOT used: a reopened package
     *  legitimately re-derives them, and requiring them to match would test the id scheme
     *  rather than the content. */
    readonly ordinal: number;
    /**
     * Where the paragraph SITS: the element path from the story root, so a paragraph that
     * moves out of the table cell it was written in is a difference rather than a paragraph
     * with the same ordinal and the same text.
     */
    readonly path: string;
    /**
     * `w14:paraId`, uppercase-normalized (matching is case-insensitive), or null. This is
     * MANAGED identity — the agent contract anchors on it and comment threading references
     * it — so a serializer silently dropping it must be a digest difference. Other paragraph
     * attributes (`w:rsidR` …) stay deliberately undigested: they are revision noise.
     */
    readonly paraId: string | null;
    /** Text content, including tabs and hard breaks as their characters. */
    readonly text: string;
    /** Accepted paragraph properties, as sorted tokens including nested children. */
    readonly paragraphProperties: readonly string[];
    /** Per-run accepted properties, in run order. */
    readonly runProperties: readonly (readonly string[])[];
    /** Fingerprints of every generic (unknown) subtree, in document order. */
    readonly genericStructure: readonly string[];
}
/** One story reduced to its semantic content, ignoring everything a normalized re-emit changes. */
interface StoryDigest {
    readonly partName: string;
    readonly paragraphs: readonly ParagraphDigest[];
    /**
     * Every block-level element of the part OUTSIDE a paragraph, in document order, as
     * `path name(attributes)` — the tables, rows, cells, sections, content controls and
     * their property children, each at the position that says what contains it.
     *
     * A paragraph's own internals are not here (they are its `ParagraphDigest`), which keeps
     * this list proportional to a document's STRUCTURE rather than its text.
     */
    readonly structure: readonly string[];
}
/**
 * The whole document's semantic content — one of the D9 losslessness oracles.
 *
 * What a save/reopen round-trip is compared on. Byte identity applies only to non-XML parts;
 * modelled parts re-emit normalized, so equality is asserted HERE rather than on bytes.
 */
interface SemanticDigest {
    readonly stories: readonly StoryDigest[];
}
/** Where two digests diverge — the diagnostic when a round-trip loses something. */
type DigestDifference = {
    readonly path: string;
    readonly before: string;
    readonly after: string;
};
/** Digest one part: its paragraphs, and the structure that holds them. */
declare function digestPart(part: OoxmlPart): StoryDigest | null;
/** Digest every part, in the given order. */
declare function semanticDigest(parts: Iterable<OoxmlPart>): SemanticDigest;
/**
 * Every way two digests differ, as readable paths.
 *
 * Returns the differences rather than a boolean because "the round trip lost something" is
 * useless without saying what — the failure this oracle exists to catch is a silent drop,
 * and a bare `false` reproduces the silence.
 */
declare function diffSemanticDigests(before: SemanticDigest, after: SemanticDigest): DigestDifference[];

/** Valid per MS-DOCX: 8 hex digits, non-zero, below 0x80000000. */
declare function isValidParaId(value: string): boolean;
/** The authored `w14:paraId` value of an element, verbatim, or null. */
declare function paraIdOf(node: OoxmlNode): string | null;
/** FNV-1a over UTF-16 code units — the deterministic mint every id derivation shares. */
declare function fnv1a32(value: string): number;
/**
 * Deterministic 8-hex mint in (0x00000000, 0x80000000), collision-free against
 * `used` (uppercase hex). Same seed + same used-set → same value, which is what
 * keeps `splitParagraphMany` byte-identical to its equivalent single splits and
 * a reopened save identical to the session that produced it.
 */
declare function mintParaId(seed: string, used: ReadonlySet<string>): string;
/** Every valid `w14:paraId` in the tree, uppercased. Memoized per root object. */
declare function usedParaIds(root: OoxmlElement): ReadonlySet<string>;
/**
 * The non-empty prefix the part ROOT binds to the w14 namespace, or null.
 *
 * Minted attributes require an in-scope binding (the invariant validator reports
 * `invalid-qname` otherwise, and the serializer would allocate an `nsN` alias).
 * Only the root binding counts: a binding authored on some descendant does not
 * cover paragraphs elsewhere in the tree.
 */
declare function w14RootPrefix(root: OoxmlElement): string | null;
/** The minted `[w14:paraId, w14:textId]` pair. `textId` mirrors `paraId`: it has no uniqueness requirement, no consumer reads it, and one allocator is simpler than two — but Word writes both, so we write both. */
declare function mintedParagraphIdentityAttributes(prefix: string, value: string): readonly OoxmlAttribute[];
/**
 * Load-time paragraph-identity normalization for a session's main part.
 *
 * Keeps every valid, first-seen paraId verbatim; mints (deterministically, seeded
 * by the paragraph's structural node id) for paragraphs whose id is missing,
 * malformed, zero, out of range, or a duplicate. Adds the root `xmlns` binding
 * the minted attributes need. Returns the INPUT PART REFERENCE when there is
 * nothing to do — a document Word saved yesterday re-serializes byte-identical.
 *
 * Attribute-only rebuilds move no child, so every node keeps its structural-path
 * id; the copy respreads only the ancestors of changed paragraphs.
 *
 * Fail-open: if the rebuilt part does not validate (a bug, or a pathology the
 * prefix choice could not defuse), the original part is returned — a document
 * must never become unopenable over an identity enhancement.
 */
declare function normalizeParagraphIdentity(part: OoxmlPart): OoxmlPart;

/** The package with a hyperlink relationship guaranteed present, and that relationship's id. */
interface EnsuredHyperlinkRelationship {
    readonly pkg: OoxmlPackage;
    readonly relationshipId: string;
}
/**
 * The target this engine would write for `url`, or null when it would write none.
 *
 * The VALIDATION half of {@link ensureHyperlinkRelationship}, exported so a caller that must decide
 * "would this be authored?" before it is allowed to change the package can ask without changing it.
 * A relationship outlives a refusal — it lives beside the trees, outside the undo stack — so a
 * caller planning a batch that may yet be refused has to ask this and mint later.
 *
 * Same rules, one implementation: `sanitizeHref`'s allowlist, a bound on the length, XML-writable
 * text, and the absolute-URI gate the READ side applies. There is no legitimate reason for this
 * engine to author a scheme it would refuse to open.
 */
declare function authorableHyperlinkTarget(url: string): string | null;
/**
 * The external hyperlink relationship for `url` on `ownerPart` (default: main document),
 * reusing an existing one with the same target, or `null` when the URL is not something to
 * write.
 *
 * REUSE IS BY EXACT TARGET, matching Word: linking twice to the same address produces one
 * relationship. It is safe because a hyperlink relationship carries nothing but its target —
 * two links sharing one are indistinguishable from two links with identical targets, and
 * retargeting one always mints rather than rewriting (see the edit op).
 *
 * Ownership follows the story that holds the `w:hyperlink`: a header/footer or notes part
 * mints into that part's `.rels`, never into `document.xml.rels`. Passing an owner the
 * package does not declare fails closed (`null`) so a scoped insert cannot leave a stray
 * body relationship behind.
 *
 * The URL is refused unless `sanitizeHref` admits it. Storing a `javascript:` target that a
 * FILE authored is required — round-tripping never rewrites a document — but AUTHORING one
 * here is not: there is no legitimate reason for this engine to write a scheme it would then
 * refuse to open, and writing it would hand the next reader a live target this reader made.
 */
declare function ensureHyperlinkRelationship(pkg: OoxmlPackage, url: string, ownerPart?: string): EnsuredHyperlinkRelationship | null;
/**
 * What a part's relationships answer for one `r:id`, over both maps.
 *
 * `relationships` holds the internal records and `externalTargets` the external ones, so a
 * resolver reading only the first sees every hyperlink as dangling.
 */
declare function relationshipTargetIn(pkg: OoxmlPackage, ownerPart: string, relationshipId: string): {
    readonly target: string;
    readonly external: boolean;
    readonly sinkSafe?: boolean;
} | null;

/**
 * Delete a comment thread outright: body, thread state and story markers.
 *
 * Returns the package unchanged when the id names no comment, and null when a removal was
 * refused — a caller inside a transaction rolls back rather than committing a package whose
 * comment is half gone.
 */
declare function deleteCommentThread(pkg: OoxmlPackage, commentId: string): OoxmlPackage | null;
/**
 * Delete every comment the edit between `before` and `after` emptied.
 *
 * The shape `cascadeDeletedNoteReferences` established: a before/after diff rather than a rule
 * inside each op, because the ops that can empty a range are several (`deleteText`,
 * `deleteBlock`, a row deletion, accepting a tracked deletion) and a rule written into each one
 * drifts.
 *
 * THE TEST, exactly. A comment dies when the words it covered are gone and nothing still
 * places it: either every marker naming it went with them, or its markers are all still there
 * with no characters left between them. What it deliberately does NOT do is read "no usable
 * range" as "emptied" — a comment whose `w:commentRangeStart` was carried off by a deleted
 * block still has its reference and its end, and Word keeps it, because the reference is the
 * element that anchors a comment. Reaping there deleted a remark whose text was still on
 * screen, which is the one mistake worse than leaving a stale card.
 *
 * SKIPS rather than refuses when the package is too large to scan. Returning null there made
 * `transact` roll the edit back, so on a package past the part cap every keystroke in a
 * commented paragraph was silently refused and the document read as frozen. A skipped reap
 * leaves a stale card — recoverable, visible, and the behaviour before any of this existed.
 * Null is reserved for a removal that actually failed, which the caller must roll back.
 */
declare function cascadeEmptiedComments(before: OoxmlPackage, after: OoxmlPackage): OoxmlPackage | null;
/** Whether the package holds any comment record at all — the cheap gate before a reap. */
declare function hasAnyComment(pkg: OoxmlPackage): boolean;

/** Presentation settings the document itself states. Absence is the answer, never an error. */
interface DocumentViewSettings {
    /**
     * `w:doNotShadeFormData` (§17.15.1.49) — do NOT shade legacy form fields.
     *
     * Word draws a grey block behind every `w:ffData` field so a reader can find the blanks in a
     * form. It is on by DEFAULT, and this element is how a document turns it off, so the absent
     * case means shading. Reading the name as "shade form data" inverts it and blanks the shading
     * on exactly the documents that asked for it loudest.
     *
     * Never printed, by Word or by us: it marks where to type, and a printed form has no blanks
     * to find.
     */
    readonly doNotShadeFormData: boolean;
}
/** The defaults a document with no `settings.xml` gets: everything Word would shade, shaded. */
declare const DEFAULT_VIEW_SETTINGS: DocumentViewSettings;
/** Read the view settings from a `settings.xml` root, or the defaults when it has none. */
declare function readViewSettings(settingsRoot: OoxmlNode | null | undefined): DocumentViewSettings;

/** How deep block-level content controls may nest before the walk stops descending. */
declare const MAX_STORY_SDT_NESTING = 32;
/** Which kind of story a root is. Layout walks all four the same way. */
type OoxmlStoryKind = 'body' | 'header' | 'footer' | 'note';
/** One story root and the blocks under it, with block-level SDTs already flattened. */
interface OoxmlStoryRoot {
    readonly kind: OoxmlStoryKind;
    /** The `w:body` / `w:hdr` / `w:ftr` / `w:footnote` element that holds the blocks. */
    readonly root: OoxmlNode;
}
/**
 * Every story root in a part, in document order.
 *
 * Does not descend INTO a story: a story's blocks are the walk below, and a story root never
 * contains another story root.
 */
declare function storyRootsOf(part: OoxmlPart): readonly OoxmlStoryRoot[];
/** The main body story of a part, or null when the part holds none. */
declare function bodyStoryRoot(part: OoxmlPart): OoxmlNode | null;
/**
 * Every paragraph of one story, in reading order.
 *
 * Descends through tables (rows, cells, nested tables) and flattens block-level content
 * controls. The returned nodes are paragraph elements; a caller addresses them by `id`.
 */
declare function storyParagraphs(root: OoxmlNode): readonly OoxmlNode[];
/**
 * The block walk itself, appending into `out`.
 *
 * Exported so `allParagraphs` in the binding lane is the same traversal rather than a second
 * copy of it.
 */
declare function collectStoryParagraphs(children: readonly OoxmlNode[], out: OoxmlNode[], sdtDepth: number): void;

/** Relationship from the story to one data part. */
declare const CUSTOM_XML_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml";
/** Relationship from a data part to the properties that carry its `ds:itemID`. */
declare const CUSTOM_XML_PROPS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps";
/** `itemPropsN.xml` needs an Override; `itemN.xml` rides the package's `xml` default. */
declare const CUSTOM_XML_PROPS_TYPE = "application/vnd.openxmlformats-officedocument.customXmlProperties+xml";
/** The datastore namespace `ds:datastoreItem` lives in. */
declare const DATASTORE_NAMESPACE_URI = "http://schemas.openxmlformats.org/officeDocument/2006/customXml";
/** A data part located in a package: where it lives, and the GUID an SDT binds to. */
interface CustomXmlDataPart {
    /** Canonical part name, e.g. `/customXml/item1.xml`. */
    readonly partName: string;
    /** Part name of its properties, e.g. `/customXml/itemProps1.xml`. */
    readonly propsPartName: string;
    /** `ds:itemID`, braced and upper-case, as `w:storeItemID` must spell it. */
    readonly itemId: string;
    /** Namespace URI of the payload root, which is what identifies one store among several. */
    readonly namespaceUri: string;
}
/**
 * A `ds:itemID` derived from the seed rather than drawn at random.
 *
 * Exported so a caller that authors a store OUTSIDE a package — a template engine splicing
 * markup it will assemble into a `.docx` later — mints the id the same way this does, rather
 * than inventing a second GUID shape Word has to be tolerant of.
 *
 * The store is a pure function of what it is asked to write: the same document written twice
 * has to produce the same bytes, or a save/reopen/save round trip stops being a fixed point
 * and every digest taken over saved bytes moves. A GUID's job here is uniqueness within one
 * package, not unguessability, so four FNV-1a passes over a salted seed carry it.
 */
declare function datastoreItemIdFor(seed: string): string;
/**
 * The data parts a story relates to, in relationship order.
 *
 * Reads the relationships rather than scanning `/customXml/` by name: a part nothing relates
 * to is not part of the document, and a package from a hostile sender can hold as many
 * plausibly-named files as it likes.
 */
declare function customXmlDataParts(pkg: OoxmlPackage, storyPartName: string): CustomXmlDataPart[];
/** The data part carrying this namespace, or null when the document has none yet. */
declare function findCustomXmlDataPart(pkg: OoxmlPackage, storyPartName: string, namespaceUri: string): CustomXmlDataPart | null;
/** What {@link withCustomXmlDataPart} answers. */
interface CustomXmlDataPartResult {
    readonly pkg: OoxmlPackage;
    /** Null when the part could not be authored; the package then comes back unchanged. */
    readonly part: CustomXmlDataPart | null;
}
/**
 * Ensure the document carries a data part for this namespace, creating it and everything it
 * needs — properties, both relationships, the properties content type — when it does not.
 *
 * Idempotent: a package that already has one for the namespace comes back untouched, so a
 * second node added to the same store does not author a second store.
 *
 * @param storyPartName - Whose relationships the store hangs off. Word enumerates its data
 * store from the MAIN DOCUMENT part, so a store authored off a header or footer is one Word
 * never sees.
 */
declare function withCustomXmlDataPart(pkg: OoxmlPackage, storyPartName: string, namespaceUri: string, rootLocalName: string): CustomXmlDataPartResult;
/**
 * Remove a store from a document: both parts, both relationships, the Override.
 *
 * PACKAGE ONLY. It does not touch the body, so a `w:sdt` bound to the store keeps its
 * `w:dataBinding`, its `w:storeItemID` and its `w:tag`, and Word then opens a control bound to
 * a store that is not there. Stripping those is the export path's job and is not built; this
 * is the half that removes the payload, which is the half a caller can rely on.
 *
 * `ok: false` means nothing was removed and the package is unchanged — most often because an
 * owner's `.rels` was never parsed into a tree, which {@link withoutPart} refuses to work
 * around. A caller exporting a document has to treat that as a failure to export rather than
 * as a document with nothing to strip, or it ships the payload it meant to remove.
 */
declare function withoutCustomXmlDataPart(pkg: OoxmlPackage, storyPartName: string, namespaceUri: string): WithoutPartResult;

/** One node in a store: its id, the bound text, and the payload beside it. */
interface CustomXmlNode {
    readonly id: string;
    /** Text a `w:dataBinding` resolves to. Untrusted file input. */
    readonly label: string;
    /** Payload as authored, JSON by convention and unparsed here. Untrusted file input. */
    readonly data: string;
}
/** Every node a store holds, in document order. */
declare function customXmlNodes(pkg: OoxmlPackage, partName: string): CustomXmlNode[];
/** One node by id, or null. */
declare function readCustomXmlNode(pkg: OoxmlPackage, partName: string, nodeId: string): CustomXmlNode | null;
/**
 * Write a node, replacing one that already has the id.
 *
 * Replace rather than append: a second node with the same id makes the binding xpath ambiguous,
 * and Word resolves an ambiguous xpath to the first match — so an "update" that appended would
 * leave the control showing its old text forever.
 */
declare function withCustomXmlNode(pkg: OoxmlPackage, partName: string, node: CustomXmlNode): OoxmlPackage;
/** Drop one node by id. A store that never held it comes back unchanged. */
declare function withoutCustomXmlNode(pkg: OoxmlPackage, partName: string, nodeId: string): OoxmlPackage;
/**
 * Drop every node no longer referenced, given the ids the document still binds.
 *
 * This is the whole deletion story. Deleting a control in THIS editor can remove its node
 * directly, but a control deleted in Word leaves the node behind — Word has no lifecycle link
 * between the two and no way to run our code. Reconciling against what the story actually binds
 * collects both, and is the only thing that can collect the second.
 *
 * Takes the referenced ids rather than reading the story itself: the caller already walked it,
 * and a sweep that guessed at which controls exist would delete a payload on a mistake.
 */
declare function withoutOrphanCustomXmlNodes(pkg: OoxmlPackage, partName: string, referencedIds: ReadonlySet<string>): {
    readonly pkg: OoxmlPackage;
    readonly removed: readonly string[];
};
/**
 * The `w:xpath` a binding uses to reach a node's label, or null when the id cannot be addressed.
 *
 * Word needs a prefix for the payload namespace even when the store declares it as a default —
 * an unprefixed step in an XPath means "no namespace", so `/docxEditor/node` would match
 * nothing in a namespaced store. The prefix is declared in `w:prefixMappings` beside it.
 */
declare function customXmlLabelXPath(prefix: string, rootLocalName: string, nodeId: string): string | null;
/** The `w:prefixMappings` value declaring that prefix, or null when it cannot be written.
 *  The namespace sits inside single quotes inside a double-quoted attribute, so a namespace
 *  carrying either quote character has no representation here. */
declare function customXmlPrefixMappings(prefix: string, namespaceUri: string): string | null;

/** The prefix every binding this library authors declares and quotes. */
declare const CUSTOM_NODE_XPATH_PREFIX = "ns0";
/** The three attributes a `w:dataBinding` carries. */
interface CustomNodeBinding {
    readonly prefixMappings: string;
    readonly xpath: string;
    readonly storeItemId: string;
}
/**
 * The binding for one node in one store, or null when the id cannot be addressed by an XPath.
 *
 * Refuses rather than escapes: XPath 1.0 has no escape for a quote inside a literal, so an id
 * carrying one could close the predicate and append an expression of the sender's choosing.
 * The ids are minted by a host, so refusing is honest — see `ADDRESSABLE_ID`.
 */
declare function customNodeBinding(part: CustomXmlDataPart, rootLocalName: string, nodeId: string): CustomNodeBinding | null;
/**
 * Every node id the story's controls bind to in one store, in document order.
 *
 * This is the input the orphan sweep takes: a node whose id is not in here is one no control
 * names, whether it was deleted in this editor or in Word. Reading it from the STORY rather than
 * from a host's bookkeeping is what makes the two cases one mechanism.
 */
declare function boundCustomXmlNodeIds(part: OoxmlPart, storeItemId: string): Set<string>;
/**
 * Every node id ANY story in the package binds, in one store.
 *
 * THE WHOLE PACKAGE, not one story. A payload is reachable from a header as easily as from the
 * body — Word enumerates its data store from the main part, but nothing stops a control
 * elsewhere quoting the same `w:storeItemID` — and the two callers that decide what is an orphan
 * both destroy data when they are wrong. The sweep would collect a payload a header still paints;
 * the export would strip a store a header still names, which is a document Word offers to repair.
 *
 * Costs one walk per story per store, on open and on export. Neither is a keystroke.
 */
declare function boundCustomXmlNodeIdsInPackage(pkg: OoxmlPackage, storeItemId: string): Set<string>;
/** The node id one control binds to in the named store, or null when it binds to nothing there. */
declare function boundCustomXmlNodeIdOf(control: OoxmlNode, storeItemId: string): string | null;

/** What happens to one control when the document is exported. */
type CustomNodeExportPolicy = 'keep' | 'text' | 'remove';
/** How {@link withExportedCustomNodes} decides, and which stores it may tidy afterwards. */
interface CustomNodeExportRequest {
    /** The story whose controls are policed, and whose relationships the stores hang off. */
    readonly storyPartName: string;
    /**
     * Payload namespaces the caller CLAIMS.
     *
     * The store cleanup runs only over these. Word's own Cover Page Properties store rides in most
     * templates, and an export that tidied every customXml part would be deleting from documents it
     * was only asked to strip its own markup from.
     */
    readonly namespaces: readonly string[];
    /** The fate of a control carrying this `w:tag`. A control with no tag is never touched. */
    readonly decide: (tag: string) => CustomNodeExportPolicy;
}
/**
 * The export, or the reason there is no export.
 *
 * A refusal answers no package on purpose. "Stripping failed, here is the document anyway" is the
 * one outcome that must not be possible: a caller would ship the markup it asked to remove and
 * have been told the export succeeded.
 */
type CustomNodeExportResult = {
    readonly ok: true;
    readonly pkg: OoxmlPackage;
    /** Controls unwrapped (`text`) and controls removed (`remove`). */
    readonly unwrapped: number;
    readonly removed: number;
} | {
    readonly ok: false;
    readonly reason: string;
};
/**
 * Apply the policy, then take the payloads and the stores the policy orphaned.
 *
 * Order matters and is the reverse of the write's. The BODY goes first, so the sweep that follows
 * sees the controls that actually survive; the stores go last, once nothing binds them. Doing it
 * the other way would strip a store while a control still quoted its `w:storeItemID`, which is a
 * document Word opens and offers to repair.
 */
declare function withExportedCustomNodes(pkg: OoxmlPackage, request: CustomNodeExportRequest): CustomNodeExportResult;

/** One addressable unit of paragraph text: text, tab, hard break, or atomic field. */
interface Segment {
    readonly runId: string;
    readonly node: OoxmlNode;
    readonly start: number;
    readonly end: number;
    /**
     * When set, deleting this segment removes every listed node id in one step (atomic
     * field begin→end or `fldSimple`). Absent for ordinary text/tab/break segments.
     */
    readonly removeNodeIds?: readonly string[];
    /**
     * When set, run formatting for this atom targets these runs (field result ownership),
     * not necessarily `runId`. Absent for ordinary text/tab/break segments.
     */
    readonly formatRunIds?: readonly string[];
}
/**
 * Flatten a paragraph into UTF-16 addressable segments, in document order.
 *
 * A HYPERLINK's runs are addressed too. `w:hyperlink` is a run container, not a leaf, and
 * the characters inside a link are ordinary paragraph text: the user selects them, types
 * over them and deletes them like any other. Skipping the container — which is what
 * iterating only direct `w:r` children did — left every link's text with no offsets at all,
 * so `paragraphTextOf` read "Visit  or ." for a sentence that says "Visit Example.com or
 * Anthropic's website." and layout, selection and the ops all agreed on the wrong string.
 *
 * Inline CONTENT CONTROLS are the same class of wrapper: their `w:sdtContent` runs join the
 * paragraph's offset stream with no break opportunity at the boundary. Nesting is bounded
 * (`MAX_CONTENT_CONTROL_NESTING`); beyond the bound the wrapper is opaque so recursion
 * cannot exhaust the stack.
 *
 * `runId` stays the id of the run the content actually lives in, at whatever depth: the
 * appliers resolve it with `findNode` and rebuild that run's children, so nesting costs them
 * nothing.
 */
declare function segmentsOf(paragraph: OoxmlParagraphNode): Segment[];
/** Half-open `[start, end)` of one node in its paragraph's model offset space. */
interface OffsetSpan {
    readonly start: number;
    readonly end: number;
}
/**
 * Every node's place in the paragraph's model offset space, from the SAME walk `segmentsOf`
 * uses.
 *
 * The offset model has exactly one authority, and this is how a caller borrows it. Three
 * private walkers used to re-derive it — one in the tracked-change writer, one in the comment
 * anchor reader, one in the review queue — and all three disagreed with `segmentsOf` and with
 * each other: none gave a note reference or an atomic field its length of one, one counted a
 * field's instruction text as visible characters, and one never descended into `w:hyperlink`
 * at all. The consequences were an anchor short by a link's length, two unrelated comments
 * threaded onto one zero-width offset, and a tracked insert landing a character out in any
 * paragraph carrying a footnote. Patching each walker only resets the clock on the next drift.
 *
 * A node the walk never reaches — content under a `generic` container, or past the nesting cap
 * — has NO span, and {@link ParagraphOffsetIndex.lengthOf} reports zero for it. That is the
 * same answer `segmentsOf` gives: it contributes no addressable characters.
 */
interface ParagraphOffsetIndex {
    /** The paragraph's own length, identical to {@link paragraphLength}. */
    readonly length: number;
    readonly segments: readonly Segment[];
    /** Where a node sits, or null when the offset walk never reached it. */
    spanOf(node: OoxmlNode | string): OffsetSpan | null;
    /** A node's model length: `end - start` of its span, and 0 when it has none. */
    lengthOf(node: OoxmlNode | string): number;
}
/**
 * THE paragraph offset authority: maps a paragraph's UTF-16 offsets to the nodes holding them.
 *
 * One authority on purpose. An atomic field spans many nodes but is ONE unit to an offset, and a
 * second implementation that disagreed would place edits inside content that cannot be split.
 */
declare function paragraphOffsetIndex(paragraph: OoxmlParagraphNode): ParagraphOffsetIndex;
/** One inline content control's identity and the UTF-16 span its content covers. */
interface InlineControlSpan {
    readonly controlId: string;
    readonly start: number;
    readonly end: number;
}
/**
 * The innermost inline content control whose content ends exactly at `offset` — the caret
 * at its right outer edge. What Backspace consults to delete the node as ONE unit
 * (pro-review-and-custom-nodes 4.6): deleting its last character from outside would either
 * strip one letter from a content-locked label (refused, so the key looks dead) or leave a
 * half-deleted chip whose tag still claims the full payload.
 */
declare function inlineControlEndingAt(paragraph: OoxmlParagraphNode, offset: number): InlineControlSpan | null;
/** The forward-delete mirror: the control whose content STARTS exactly at `offset`. */
declare function inlineControlStartingAt(paragraph: OoxmlParagraphNode, offset: number): InlineControlSpan | null;

/** Structural validation, run before any tree work so a rejection changes nothing. */
declare function validateTreeOp(part: OoxmlPart, op: TreeDocOp): TreeOpRejection | null;

/**
 * Apply one validated op to a part.
 *
 * Validation runs first and returns before any tree work, so a rejected op is a true no-op:
 * the caller keeps the part it passed in, unchanged and still frozen.
 *
 * `options.deferValidation` passes through to the edit primitives: a transaction applying
 * many ops re-validates the whole part once at its commit boundary rather than after every
 * primitive, which is the difference between a paste that is linear and one that is
 * quadratic in document size.
 */
declare function applyTreeOp(part: OoxmlPart, op: TreeDocOp, options?: EditOptions): TreeOpResult;
/** Paragraph text as the ops address it, for tests and callers computing offsets. */
declare function paragraphTextOf(part: OoxmlPart, paragraphId: string): string | null;

/** Where a comment is anchored, in the model offset space of one story. */
interface CommentAnchorRequest {
    readonly paragraphId: string;
    readonly start: number;
    /** May sit in the same paragraph or a later one; `endParagraphId` names it when it differs. */
    readonly end: number;
    readonly endParagraphId?: string;
}
/**
 * What adding a comment needs: where it anchors, who wrote it, and its body.
 *
 * `author` is required because `CT_Comment` makes `@w:author` mandatory — a comment without one
 * writes invalid XML, so the write is refused rather than filled with an empty attribute.
 */
interface AddCommentRequest {
    readonly anchor: CommentAnchorRequest;
    /** Required by `CT_TrackChange`. A comment without one writes invalid XML. */
    readonly author: string;
    readonly initials?: string;
    /** ISO-8601. Absent writes no `@w:date`, because inventing one is a content change. */
    readonly date?: string;
    readonly text: string;
    /** The comment this replies to. Its thread link is written to `commentsExtended.xml`. */
    readonly replyToCommentId?: string;
}
/** The new comment's id and the story change, or the reason the write was refused. */
type AddCommentResult = {
    readonly ok: true;
    readonly commentId: string;
    /**
     * The story transaction's own change, so the coordinator can publish it.
     *
     * A comment write commits straight on the story store rather than through
     * `applyTreeOps`, and the change is what carries the dirty anchor paragraphs and the
     * `text-local` impact. Dropping it here left the caller with nothing precise to
     * publish and no way to tell a committed write from an identity no-op.
     */
    readonly change: TreeModelChange | null;
} | {
    readonly ok: false;
    readonly reason: TreeOpRejection | 'invalid-author';
};
/**
 * Add a comment, or a reply, in ONE transaction.
 *
 * The comment id and the `w14:paraId` are computed before the transaction opens, because the
 * story markers have to carry the same id the body does and deriving each separately is how the
 * two come to disagree.
 *
 * `w14:paraId` is minted here and only here: on a comment WRITE. Allocating on load would
 * rewrite a document nobody edited and break fingerprint equality on an untouched round trip.
 */
declare function addComment(store: TreeDocumentStore, request: AddCommentRequest): AddCommentResult;
/** Whether resolving a thread applied. Marks the comment AND every reply to it, as Word does. */
type SetCommentResolvedResult = {
    readonly ok: true;
    readonly changed: boolean;
    /** The story transaction's change, for the coordinator to publish — see {@link AddCommentResult}. */
    readonly change: TreeModelChange | null;
} | {
    readonly ok: false;
    readonly reason: TreeOpRejection | 'unknown-comment';
};
/**
 * Mark a comment thread resolved, or reopen it.
 *
 * A THREAD, not one remark: Word resolves a conversation, and its own pane greys the replies with
 * the comment they answer. Resolving only the parent would leave a file whose reply still reads as
 * open under a closed remark — a state Word does not produce and no reader would draw sensibly.
 *
 * `@w15:done` lives in `commentsExtended.xml`, which many documents do not have: a file with no
 * reply has no thread state to record. So the part is created when it is missing, exactly as
 * {@link addComment} creates it, and every comment being resolved gets an entry — a comment with
 * no `w14:paraId` gets one minted, because the state is keyed by it and there is nothing else to
 * key it by.
 *
 * ONE package transaction: the part, its relationship, its content-type override and the entries
 * commit together, so a resolved thread is never half-recorded.
 */
declare function setCommentResolved(store: TreeDocumentStore, commentId: string, resolved: boolean): SetCommentResolvedResult;
/** A comment part exists and declares the comment content type. */
declare function hasCommentPart(pkg: OoxmlPackage, storyPartName: string): boolean;
/** Exposed so a surface can tell "no comment part yet" from "no comments". */
declare function commentPartNameOf(pkg: OoxmlPackage, storyPartName: string): string;
/**
 * The `commentsExtended.xml` a story points at.
 *
 * Exported for the same reason as {@link commentPartNameOf}: the READER has to resolve the
 * same name the writer does. Hardcoding `/word/comments.xml` on one side and following the
 * relationship on the other is a split that shows up as a comment written and never read back.
 */
declare function commentsExtendedPartNameOf(pkg: OoxmlPackage, storyPartName: string): string;

/** The D8 paragraph op vocabulary. */
declare const AUTHORABLE_PARAGRAPH_PROPERTIES: ReadonlySet<string>;
/** The D8 run op vocabulary, for `w:rPr` on a run and on the paragraph mark alike. */
declare const AUTHORABLE_RUN_PROPERTIES: ReadonlySet<string>;
/**
 * Whether an op may name this run property at all.
 *
 * The stored-marks lane needs this AT ARM TIME. Every other write reaches the store in the same
 * turn as the press, so a name the store refuses surfaces immediately; an ARMED property is not
 * applied until the user types, and it rides the keystroke's own transaction — a name outside the
 * vocabulary would take the typed characters down with it, silently, on every keystroke until the
 * caret moved.
 */
declare function isAuthorableRunProperty(localName: string): boolean;
/**
 * A node's own property container (`w:pPr`, `w:rPr`) among its children.
 *
 * A container the canonical read demoted to generic is still the node's own properties —
 * matching only the typed kind lost the whole set.
 */
declare function propertyContainer(parent: OoxmlNode | null | undefined, kind: 'paragraphProperties' | 'runProperties', localName: 'pPr' | 'rPr'): OoxmlNode | undefined;
/** What a container itself authors, narrowed to the names an op is allowed to carry. */
declare function authoredProperties(container: OoxmlNode | undefined, authorable: ReadonlySet<string>): readonly OoxmlProperty[];
/**
 * What a paragraph itself authors: its own `w:pPr`, narrowed to what an op can express.
 *
 * Properties outside the vocabulary are dropped from the OP, not from the paragraph: the applier
 * keeps every `w:pPr` child an op cannot name (the mark, `w:sectPr`, `w:pBdr`, `w:outlineLvl`)
 * exactly as authored.
 */
declare function directParagraphProperties(part: OoxmlPart, paragraphId: string): readonly OoxmlProperty[];
/**
 * What a paragraph MARK itself authors: `w:pPr/w:rPr`, narrowed to the run vocabulary.
 *
 * Same rule as a run's own `w:rPr`, for the same reason — the mark is a run property container,
 * and `setParagraphMarkProperties` rewrites the names its op carries.
 */
declare function directParagraphMarkProperties(part: OoxmlPart, paragraphId: string): readonly OoxmlProperty[];
/**
 * Merge properties into a set, replacing any entry with the same name.
 *
 * `setRunProperties` and `setParagraphProperties` REPLACE the whole container, so sending one
 * property alone deleted every other: pressing Bold stripped a run's font, size and colour, and
 * pressing Centre stripped a paragraph's style, numbering and indents.
 *
 * Takes one property or a list, because a toolbar press carries one and an object-model
 * formatting write carries several at once — and applying several one at a time would be the
 * same fold written at every call site.
 */
declare function mergedProperties(existing: readonly OoxmlProperty[], incoming: OoxmlProperty | readonly OoxmlProperty[]): OoxmlProperty[];
/** Per-run UTF-16 ranges from `segmentsOf` (fields/notes collapse to one unit on begin). */
declare function runAddressRanges(paragraph: Extract<OoxmlNode, {
    kind: 'paragraph';
}>): Map<string, {
    start: number;
    end: number;
}>;
/** Runs that own field-result formatting for atoms in this paragraph. */
declare function formatOwnedRunIds(paragraph: Extract<OoxmlNode, {
    kind: 'paragraph';
}>): ReadonlySet<string>;
/** One run's share of a range edit: the slice it covers and the properties to write there. */
interface RunPropertyEdit {
    readonly start: number;
    readonly end: number;
    readonly properties: readonly OoxmlProperty[];
    /**
     * When set, `setRunProperties` formats only these runs (field result ownership). Needed when
     * several result runs share one atom offset so each keeps its own merged bag.
     */
    readonly targetRunIds?: readonly string[];
}
/**
 * A range run-property change, split into ONE edit per run it covers, each merged over that
 * run's own `w:rPr`.
 *
 * Neither half of that is optional. The base MUST be the run's own properties (see this file's
 * header). And the split MUST be per run: the op REPLACES the properties it names across its
 * whole range, so one op carrying one run's bag over a mixed selection homogenised it — bolding
 * `hello ` + `Georgia` rewrote the second run's `w:rFonts` with the first's. Runs are addressed by
 * offset rather than by id because these edits apply in sequence and the applier splits runs at
 * the range edges; offsets are unmoved by a property write, ids are not.
 */
declare function runPropertyEdits(part: OoxmlPart, paragraphId: string, start: number, end: number, incoming: OoxmlProperty | readonly OoxmlProperty[]): readonly RunPropertyEdit[];
/**
 * Every run that contributes at least one character of `[start, end)`, in document order.
 *
 * A COLLAPSED range answers the run it sits inside, which is what a caret reads. Callers that
 * want the empty answer for a collapsed range check the offsets themselves.
 */
declare function runsCovering(part: OoxmlPart, paragraphId: string, start: number, end: number): readonly OoxmlNode[];

interface RevisionSite {
    readonly node: OoxmlElement;
    readonly parent: OoxmlElement | null;
    /** True when this site cannot be resolved and the whole op must refuse. */
    readonly refused: boolean;
    /** True for `w:pPr/w:rPr/w:ins|w:del` — the paragraph MARK, not content. */
    readonly paragraphMark: boolean;
    /** True for `w:rPrChange` / `w:pPrChange`. */
    readonly propertyChange: boolean;
}
/**
 * Every revision-bearing element in the part, with the classification that decides whether it
 * can be resolved.
 *
 * One walk, so accept-all does not pay a traversal per revision — and paragraphs the last
 * commit did not touch are answered from {@link paragraphSitesCache} rather than re-walked.
 */
declare function collectRevisionSites(part: OoxmlPart): RevisionSite[];

/** The `w:p` a node sits inside, and the model offset it starts at within that paragraph. */
interface SiteLocation {
    readonly paragraphId: string;
    readonly start: number;
    readonly end: number;
}
/**
 * Locate every revision site in one walk.
 *
 * One walk rather than a lookup per site: `resolveRevisions` learned the same lesson the hard
 * way, where a per-site tree walk inside a per-site loop made accept-all quadratic.
 *
 * Offsets come from `paragraphOffsetIndex`, which is `segmentsOf`'s walk. A private one here
 * measured a run by summing its text and gave a note reference, an atomic field and a field's
 * instruction text the wrong lengths, so every card in a paragraph holding one reported a
 * range the caret and the ops disagreed with.
 */
declare function locateSites(part: OoxmlPart): ReadonlyMap<string, SiteLocation>;

/**
 * Longest accepted query. A query is host input rather than file content, but the scan is
 * proportional to it and there is no legitimate find phrase this long.
 */
declare const SEARCH_QUERY_MAX = 256;
/**
 * Most matches one search returns. A single-character query against a long document would
 * otherwise allocate an entry per character; the scan stops here instead. A caller showing a
 * count treats a full result as "at least this many".
 */
declare const SEARCH_MATCH_LIMIT = 2000;
/** How a text search is narrowed. Options the engine cannot honour are refused, never ignored. */
interface TextMatchOptions {
    readonly matchCase?: boolean;
    readonly wholeWord?: boolean;
    /**
     * Report only matches lying wholly inside `[from, to)`.
     *
     * A WINDOW ON THE TEXT, not a slice of it: the whole-word test still reads the characters on
     * either side of the window, so scanning the first three characters of `category` for `cat`
     * finds nothing when whole words were asked for. Slicing first would answer a match, because
     * the `e` that disqualifies it would have been cut off — the window is where a caller is
     * looking, not what the paragraph says.
     */
    readonly from?: number;
    readonly to?: number;
}
/** One occurrence, as UTF-16 offsets into the text that was scanned. */
interface TextOccurrence {
    readonly start: number;
    readonly length: number;
}
/** Where a phrase occurs in a story, as paragraph-plus-offset ranges. */
interface TextOccurrences {
    readonly matches: readonly TextOccurrence[];
    /** The scan stopped at `limit` with occurrences still ahead of it. */
    readonly truncated: boolean;
}
/**
 * Lower-case `text` WITHOUT changing its length.
 *
 * `String.prototype.toLowerCase` can expand (Turkish dotted capital I lowercases to two code
 * units), and an expansion mid-paragraph would slide every offset after it — the match would
 * be reported at the wrong place. The per-unit fallback folds only the characters that stay
 * one unit, so an expanding character simply compares case-sensitively. That is a real
 * degradation and it is the safe direction: a missed case-insensitive match beats a match
 * reported at an offset an editor then selects.
 */
declare function foldCase(text: string): string;
/** Whether a match at `[start, end)` in `text` stands alone as a word. */
declare function isWholeWord(text: string, start: number, end: number): boolean;
/** Whether a query is one this module will scan for at all. */
declare function isSearchableQuery(query: unknown): query is string;
/**
 * Every occurrence of `query` in `text`, in order, NON-OVERLAPPING.
 *
 * Non-overlapping is what a find dialog counts: `aa` in `aaaa` is two, not three. `limit` is
 * the caller's remaining budget, so a caller scanning many paragraphs enforces ONE global cap
 * rather than one per paragraph.
 */
declare function findOccurrences(text: string, query: string, limit: number, options?: TextMatchOptions): TextOccurrences;

/** Impact class for a drawing op — metadata/locks are text-local; geometry/wrap are flow-structural. */
declare function drawingOpImpact(op: DrawingTreeDocOp): ImpactClass;
/** Validate a drawing op's extents, crops and positions before it reaches the store. */
declare function validateDrawingOp(part: OoxmlPart, op: DrawingTreeDocOp): TreeOpRejection | null;
/** Map the nine wrap targets to anchor wrap element + behindDoc. */
declare function wrapTargetToAnchorSpec(target: ImageWrapTarget): {
    readonly behindDocument: boolean;
    readonly wrapLocalName: 'wrapNone' | 'wrapSquare' | 'wrapTight' | 'wrapThrough' | 'wrapTopAndBottom';
    readonly wrapText?: 'bothSides' | 'left' | 'right' | 'largest';
};
/** Whether an op is one of the drawing ops. Narrows the type. */
declare function isDrawingTreeDocOp(op: TreeDocOp): op is DrawingTreeDocOp;

export { ALL_FROZEN_IDS, AUTHORABLE_PARAGRAPH_PROPERTIES, AUTHORABLE_RUN_PROPERTIES, type AddCommentRequest, type AddCommentResult, type AnchorSnapshot, type AtomicFieldSpan, type AuditPort, type AuthorizationPort, BoundedCounter, Budget, BudgetError, CANONICAL_MUTATION_ORIGINS, COMPARATORS, CUSTOM_NODE_XPATH_PREFIX, CUSTOM_XML_PROPS_REL, CUSTOM_XML_PROPS_TYPE, CUSTOM_XML_REL, CancellationController, CancellationError, type CancellationPhase, type CancellationPort, type CancellationToken, type CapabilityId, type ClockPort, type CommentAnchorRequest, type ComparatorDescriptor, type ComparatorMode, type ComparatorName, type ComparisonResult, type ConformanceFixture, type ContentItem, type Contribution, type CustomNodeBinding, type CustomNodeExportPolicy, type CustomNodeExportRequest, type CustomNodeExportResult, type CustomXmlDataPart, type CustomXmlDataPartResult, type CustomXmlNode, DANGEROUS_KEYS, DATASTORE_NAMESPACE_URI, DEFAULT_VIEW_SETTINGS, DEPENDENCY_KEY_IDS, DangerousKeyError, type DetectedToc, DeterministicClock, DeterministicMemoryMeter, type DigestDifference, type DocumentViewSettings, DrawingTreeDocOp, type EditOptions, type EncodedEnvelope, type EnforcementPhase, type EnsuredHyperlinkRelationship, type ExternalResourceConsentPort, FIELD_ATOM_CHAR, type FeatureBundle, type FixtureExpectation, type FixtureOutcome, type FixtureSource, type FixtureStep, type FldCharType, type FontPort, type HardBreakKind, type HrefProjection, ID_KINDS, INERT_EXECUTABLE_KINDS, type IdKind, type IdentityPort, type ImagePort, ImageWrapTarget, ImpactClass, type InertExecutableKind, type InlineControlSpan, type Json, LIMIT_KEYS, LIMIT_SPECS, LimitExceededError, type LimitSpec, type LimitUnit, MAX_STORY_SDT_NESTING, type ModelChangeSummary, NON_CANONICAL_ORIGINS, ORIGIN_IDS, type OffsetSpan, OoxmlAttribute, type OoxmlEditResult, OoxmlElement, OoxmlFldCharNode, OoxmlFldSimpleNode, OoxmlHardBreakNode, type OoxmlIndexes, OoxmlInstrTextNode, OoxmlInvariantIssue, OoxmlInvariantResult, OoxmlNode, OoxmlPackage, OoxmlParagraphNode, OoxmlPart, OoxmlProperty, type OoxmlStoryKind, type OoxmlStoryRoot, type OperationContext, type OperationInit, PAGE_BREAK_CHAR, type PackageInvariantCode, type PackageInvariantIssue, type PackageInvariantResult, type ParagraphDigest, type ParagraphIndexEntry, type ParagraphOffsetIndex, type PersistencePort, PortRegistry, PortResolutionError, PrefixAllocator, RESULT_IDS, RUNTIME_PORT_IDS, RegistryError, type RegistryErrorCode, RelationshipRecord, type ReplacementPolicy, type ReplayOutcome, type ReplayReport, type ReplayStore, type Reservation, type ResolveOptions, type ResolvedRegistry, type ResourceAccountingPort, ResourceLimits, type RunPropertyEdit, SEARCH_MATCH_LIMIT, SEARCH_QUERY_MAX, type SchedulingPort, type ScrubResult, type Segment, type SemVer, type SemanticDigest, SequentialIdentity, type SetCommentResolvedResult, type ShapingPort, type StoryDigest, type StoryIndexEntry, type StyleIndexEntry, TOC_LEVEL_INDENT_TWIPS, TOC_MAX_BOOKMARKS_PER_REFRESH, TOC_MAX_ENTRIES, TOC_MAX_FIELD_NESTING, TOC_MAX_INSTRUCTION_CHARS, TOC_MAX_PAGE_PASSES, type TextMatchOptions, type TextOccurrence, type TextOccurrences, type TocEntryPlan, type TocInstruction, type TocOutlineHeading, type TransportPort, TreeDocOp, TreeDocumentStore, TreeModelChange, TreeOpRejection, TreeOpResult, type ValidationResult, addComment, applyEdits, applyTreeOp, assertLimitInvariants, assertValidId, assertValidQName, atomicFieldSpansOf, authorableHyperlinkTarget, authoredProperties, beginOperation, bodyStoryRoot, bookmarkPairNodes, boundCustomXmlNodeIdOf, boundCustomXmlNodeIds, boundCustomXmlNodeIdsInPackage, buildTocContentControl, buildTocEntryParagraph, canonicalOoxmlFingerprint, canonicalize, cascadeEmptiedComments, collectNodeIds, collectRevisionSites, collectStoryParagraphs, commentPartNameOf, commentsExtendedPartNameOf, compareArtifacts, compareSemVer, containsCssFetch, contentTypesPartBytes, createNodeIdAllocator, customNodeBinding, customXmlDataParts, customXmlLabelXPath, customXmlNodes, customXmlPrefixMappings, datastoreItemIdFor, deleteCommentThread, deriveOoxmlIndexes, detectBodyTocs, diffSemanticDigests, digestPart, directParagraphMarkProperties, directParagraphProperties, drawingOpImpact, endOperation, ensureHyperlinkRelationship, escapeCssString, escapeXml, fieldAtomText, fieldOnOffAttribute, findCustomXmlDataPart, findDetectedToc, findNode, findOccurrences, fingerprint, fldCharType, fldSimpleInstr, fnv1a32, foldCase, formatOwnedRunIds, hardBreakAttributes, hardBreakKind, hardBreakText, hasAnyComment, hasCommentPart, hasLegacyFormFieldData, hasNode, hashAuthored, indexStyles, inlineControlEndingAt, inlineControlStartingAt, insertChildren, instrTextValue, isAuthorableRunProperty, isDangerousKey, isDrawingTreeDocOp, isEvaluableField, isFieldChrome, isFldChar, isFldCharNode, isFldSimple, isFldSimpleNode, isInertExecutable, isInstrText, isInstrTextNode, isLegalFldCharType, isPageBreakNode, isSearchableQuery, isValidId, isValidNCName, isValidParaId, isValidQName, isWholeWord, locateSites, makeLimitCounter, mergedProperties, mintParaId, mintedParagraphIdentityAttributes, normalizeParagraphIdentity, nullRecord, ooxmlTreesEqual, paraIdOf, paragraphOffsetIndex, paragraphTextOf, parentNodeOf, parseSemVer, parseTocInstruction, planTocEntries, propertyContainer, readCustomXmlNode, readViewSettings, relationshipTargetIn, relationshipsOf, relsPartNameFor, removeNode, replaceChildren, replaceNode, replayFixture, resolve, resolveContentTypeOf, resolveTocRowHeadings, runAddressRanges, runPropertyEdits, runsCovering, sanitizeHref, satisfies, scrubExport, segmentsOf, semanticDigest, serializeOoxmlPart, setCommentResolved, stableHash, storyParagraphs, storyRootsOf, stylesPartOf, toSafeRecord, tocEntryText, tocLeftIndentTwips, usedParaIds, validateDrawingOp, validateFixture, validateOoxmlPart, validatePackageInvariants, validateTreeOp, w14RootPrefix, withContentTypeOverride, withCustomXmlDataPart, withCustomXmlNode, withExportedCustomNodes, withNewPart, withRelationship, withoutCustomXmlDataPart, withoutCustomXmlNode, withoutOrphanCustomXmlNodes, wrapTargetToAnchorSpec };
