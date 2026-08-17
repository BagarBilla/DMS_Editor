import { e as OoxmlPart, X as XmlLimits, n as OoxmlReadRejection } from './ooxml-tree-BU0e3DVi.cjs';

/**
 * Why a part or relationship name was refused.
 *
 * Path traversal is the reason this exists: a name with `..` or a leading `/` is refused rather
 * than normalized, because normalizing is how a crafted package reaches outside itself.
 */
type NameRejection = 'empty' | 'control-char' | 'backslash' | 'drive-or-unc' | 'encoded-separator' | 'encoded-dot' | 'bad-encoding' | 'empty-segment' | 'dot-segment' | 'unsafe-key' | 'segment-trailing-dot' | 'traversal-escape' | 'not-absolute-uri' | 'unsafe-scheme';
/** A validated OPC name, or the typed reason it was refused. */
type NameResult = {
    readonly ok: true;
    readonly partName: string;
} | {
    readonly ok: false;
    readonly reason: NameRejection;
};
/**
 * Normalize a ZIP entry name or OPC part name into a canonical part name
 * (`/word/document.xml`). Accepts leading-slash and no-leading-slash inputs;
 * rejects traversal, dot segments, and the attack surface. Duplicate detection
 * folds ASCII case (OPC part-name equivalence).
 */
declare function normalizePartName(raw: string): NameResult;
/**
 * ASCII-only lowercase fold. OPC part-name/extension equivalence is US-ASCII
 * case-insensitive; a locale `toLowerCase()` mis-folds e.g. Turkish `I`/`İ` and
 * could let two "equivalent" part names evade duplicate detection.
 */
declare function asciiFold(s: string): string;
/** Case-folded key for OPC part-name equivalence / duplicate detection. */
declare function partNameKey(partName: string): string;
/**
 * Detect archive entries that collide after normalization (before inflation).
 * Returns the case-folded keys that more than one raw name maps to.
 */
declare function detectDuplicateNames(rawNames: readonly string[]): {
    readonly duplicates: readonly string[];
    readonly rejected: readonly {
        raw: string;
        reason: NameRejection;
    }[];
};
/**
 * Resolve an internal relationship target against its owner part, without
 * escaping the package root. `ownerPartName` is a canonical part name; the base
 * is its containing folder. A leading "/" target is package-absolute. `.`/`..`
 * segments resolve on a stack; popping above root is `traversal-escape`.
 */
declare function resolveInternalTarget(ownerPartName: string, rawTarget: string): NameResult;
/**
 * Validate an external-mode relationship target. It MUST be an absolute URI, is
 * retained verbatim by the caller, and is NEVER owner-resolved or fetched here.
 * Unsafe schemes (javascript/vbscript/data/file) are rejected for runtime sinks;
 * the raw lexical form is still preserved separately by the authored record.
 */
declare function validateExternalTarget(raw: string): NameResult;

/** One `<Default>`: a file extension mapped to a content type. */
interface DefaultRecord {
    readonly extension: string;
    readonly contentType: string;
    readonly order: number;
}
/** One `<Override>`: a specific part name mapped to a content type. Beats any Default. */
interface OverrideRecord {
    readonly partName: string;
    readonly contentType: string;
    readonly order: number;
}
/**
 * The authored `[Content_Types].xml` records, in significant order.
 *
 * Retained rather than collapsed into a lookup, because the file's lexical form and ordering are
 * part of what a lossless save re-emits.
 */
interface ContentTypeRecords {
    readonly defaults: readonly DefaultRecord[];
    readonly overrides: readonly OverrideRecord[];
}
/**
 * Why content-type records could not be indexed.
 *
 * All fail CLOSED: conflicting Defaults on one extension, duplicate normalized Override names, or
 * invalid MIME syntax are refused rather than resolved by picking one.
 */
type ContentTypeError = {
    readonly code: 'invalid-mime';
    readonly value: string;
} | {
    readonly code: 'conflicting-default';
    readonly extension: string;
} | {
    readonly code: 'duplicate-override';
    readonly partName: string;
} | {
    readonly code: 'invalid-override-name';
    readonly partName: string;
} | {
    readonly code: 'too-many-records';
    readonly limit: number;
};
/** Whether a string is syntactically a MIME type. Syntax only — no registry lookup. */
declare function isValidMime(value: string): boolean;
/** ASCII-case-insensitive extension key (leading dot removed; ASCII-only fold). */
declare function extensionKey(extension: string): string;
/** The resolved lookup: Override by case-folded part name, Default by case-insensitive extension. */
interface ContentTypeIndex {
    /** ext key -> single MIME (identical duplicates collapsed). */
    readonly defaults: ReadonlyMap<string, string>;
    /** case-folded part name -> MIME. */
    readonly overrides: ReadonlyMap<string, string>;
}
/** The built index, or the conflict that made it impossible. */
type IndexResult = {
    readonly ok: true;
    readonly index: ContentTypeIndex;
} | {
    readonly ok: false;
    readonly error: ContentTypeError;
};
/**
 * Build a resolved content-type index, failing closed on conflict/duplicate/MIME
 * errors. `maxRecords` bounds the combined record count (N/N+1 gate).
 */
declare function buildContentTypeIndex(records: ContentTypeRecords, maxRecords?: number): IndexResult;
/**
 * A part's content type, or why it has none.
 *
 * An orphan record never determines a part's type — a Default with no matching part is preserved
 * inertly rather than applied.
 */
type ResolveResult = {
    readonly ok: true;
    readonly contentType: string;
    readonly source: 'override' | 'default';
} | {
    readonly ok: false;
    readonly reason: 'unknown';
};
/** Resolve a part's content type: Override wins over Default; else unknown. */
declare function resolveContentType(index: ContentTypeIndex, partName: string): ResolveResult;

/** OOXML image relationship type for embedded or linked media parts. */
declare const IMAGE_RELATIONSHIP_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
/**
 * Whether a relationship points inside the package or out of it.
 *
 * The security-relevant distinction: an `External` target is retained VERBATIM and never
 * owner-resolved or fetched, because auto-loading a file-supplied remote target is a zero-click
 * external fetch.
 */
type TargetMode = 'Internal' | 'External';
/**
 * One authored relationship, with nothing materialized away: owner part, id, type, raw target
 * lexical form, mode, and position.
 */
interface RelationshipRecord {
    readonly ownerPart: string;
    readonly id: string;
    readonly type: string;
    readonly rawTarget: string;
    readonly targetMode: TargetMode;
    readonly order: number;
}
/** Why a relationship set is invalid. Duplicate ids within one owner fail closed. */
type RelationshipError = {
    readonly code: 'duplicate-id';
    readonly ownerPart: string;
    readonly id: string;
};
/** The validated relationship set, or the conflict that rejected it. */
type RelationshipSetResult = {
    readonly ok: true;
    readonly byOwner: ReadonlyMap<string, readonly RelationshipRecord[]>;
} | {
    readonly ok: false;
    readonly error: RelationshipError;
};
/** Group relationships by owner in authored order; reject duplicate ids per owner. */
declare function buildRelationshipSet(records: readonly RelationshipRecord[]): RelationshipSetResult;
/**
 * A relationship resolved to a part, or the reason it could not be.
 *
 * External targets resolve to a refusal by design: they are never followed from a file.
 */
type ResolvedRelationship = {
    readonly mode: 'Internal';
    readonly target: NameResult;
    readonly raw: string;
} | {
    readonly mode: 'External';
    readonly sinkSafe: NameResult;
    readonly raw: string;
};
/**
 * Resolve a relationship to a runtime projection while the raw target stays
 * authored. Internal -> owner-relative part name; External -> sink-safe
 * validation only (never owner-resolved, never fetched). `raw` is always the
 * verbatim authored target.
 */
declare function resolveRelationship(rec: RelationshipRecord): ResolvedRelationship;
/**
 * An image relationship resolved to package bytes, or why it was refused.
 *
 * External-mode image rels are refused rather than fetched — the no-zero-click-external-fetch
 * rule applies to images exactly as it does to links.
 */
type ImageRelationshipResolution = {
    readonly mode: 'internal';
    readonly partName: string;
    readonly raw: string;
} | {
    readonly mode: 'external';
    readonly sinkSafe: boolean;
    readonly raw: string;
} | {
    readonly mode: 'missing';
};
/**
 * Resolve an image relationship id from an owner part. Internal targets resolve
 * owner-relative; external targets are never fetched; a missing id is `missing`.
 */
declare function resolveImageRelationship(records: readonly RelationshipRecord[] | undefined, ownerPart: string, relationshipId: string): ImageRelationshipResolution;

/**
 * Why a zip was refused at the trust boundary.
 *
 * `too-large` and `too-many-entries` are the zip-bomb guards; `bad-name` catches path traversal —
 * an entry with `..` or a leading `/` is rejected rather than normalized.
 */
type ZipRejection = 'too-many-entries' | 'too-large' | 'bad-name' | 'inflate-error';
/** Archive caps: entry count, total decompressed bytes, and the decompression ratio. */
interface ZipLimits {
    readonly maxEntries: number;
    /** Max total UNCOMPRESSED bytes across the archive. */
    readonly maxTotalBytes: number;
    /** Max per-entry uncompressed:compressed ratio (zip-bomb guard). */
    readonly maxRatio?: number;
}
/** The archive caps in force when a host configures none. Conservative and finite. */
declare const DEFAULT_ZIP_LIMITS: ZipLimits;
/** The read entries, or the typed refusal. Never throws — the bytes are untrusted. */
type ZipReadResult = {
    readonly ok: true;
    readonly entries: ReadonlyMap<string, Uint8Array>;
} | {
    readonly ok: false;
    readonly reason: ZipRejection;
    readonly detail?: string;
};
/**
 * Inflate a ZIP archive with bounds + OPC name normalization. Entry name, count,
 * compression-ratio, and total-uncompressed-size limits are enforced BEFORE each
 * entry is decompressed (via fflate's pre-inflation filter), so a zip bomb or a
 * traversal name is rejected without ever being inflated. Keys are canonical part
 * names.
 */
declare function readZip(bytes: Uint8Array, limits?: ZipLimits): ZipReadResult;
/** Deflate a set of canonical-part-name -> bytes into a ZIP archive. Every part name
 *  is re-validated through the OPC normalization profile before writing, so a
 *  traversal/encoded/normalized-alias name from an untrusted serialized model can
 *  never be smuggled into a ZIP entry (write-side path-traversal guard). */
declare function writeZip(entries: ReadonlyMap<string, Uint8Array>): Uint8Array;

/** Caps applied while loading a package: zip, XML, part count and relationship count. */
interface OoxmlPackageLimits {
    readonly zip?: ZipLimits;
    readonly xml?: XmlLimits;
    /** Cap on parts converted into canonical trees (N/N+1 gate, not a soft target). */
    readonly maxXmlParts?: number;
    /** Cap on relationship records across every rels part. */
    readonly maxRelationships?: number;
}
/** The limits in force when a host configures none. Conservative and finite. */
declare const DEFAULT_OOXML_PACKAGE_LIMITS: Required<Pick<OoxmlPackageLimits, 'maxXmlParts' | 'maxRelationships'>>;
/**
 * An external relationship target. Retained verbatim as authored evidence, with the
 * sink-safety verdict alongside it. Never resolved against the package, never fetched.
 */
interface OoxmlExternalTarget {
    readonly ownerPart: string;
    readonly id: string;
    readonly type: string;
    readonly rawTarget: string;
    /** False when the target is not a safe sink (javascript:, file:, ...). Still not fetched. */
    readonly sinkSafe: boolean;
}
/**
 * A loaded package: every XML part as a canonical tree, plus the non-XML parts kept verbatim.
 *
 * The preservation model in one value. Modelled parts re-emit normalized; everything else is
 * byte-identical, which is why an unrecognized part never costs a document anything.
 */
interface OoxmlPackage {
    /** Canonical trees, keyed by canonical part name. Non-XML parts are absent by design. */
    readonly parts: ReadonlyMap<string, OoxmlPart>;
    /** Raw bytes of every entry, including the non-XML parts that have no tree. */
    readonly partBytes: ReadonlyMap<string, Uint8Array>;
    /** Internal relationships by owner part, in authored order. */
    readonly relationships: ReadonlyMap<string, readonly RelationshipRecord[]>;
    readonly externalTargets: readonly OoxmlExternalTarget[];
    readonly contentTypes: ContentTypeIndex;
    /** Canonical name of the part the root `officeDocument` relationship points at. */
    readonly mainDocumentPart: string;
}
/** Why a package could not be loaded. Every code describes the FILE, not the caller. */
type OoxmlPackageRejection = ZipRejection | OoxmlReadRejection | 'no-content-types' | 'bad-content-types' | 'no-main-document' | 'bad-relationship-target' | 'duplicate-relationship-id' | 'too-many-relationships' | 'too-many-xml-parts';
/** A loaded package, or a typed refusal. Never throws. */
type OoxmlPackageResult = {
    readonly ok: true;
    readonly package: OoxmlPackage;
} | {
    readonly ok: false;
    readonly reason: OoxmlPackageRejection;
    readonly detail?: string;
};
/**
 * Load an OPC package into canonical typed/generic OOXML trees.
 *
 * Fails closed on every limit, malformed name, unresolvable internal target, duplicate
 * relationship id, and XML rejection. An external relationship never causes a failure and
 * never causes a fetch: it is recorded with its sink-safety verdict for a later, explicitly
 * user-gated lane.
 */
/**
 * Load DOCX bytes into canonical trees, bounded at every step.
 *
 * THE trust boundary for a document. Composes the hardened primitives — zip limits and OPC name
 * normalization, content-type indexing, relationship validation, entity-free XML — into one
 * loader, and returns a typed rejection rather than throwing from inside a decoder.
 */
declare function readOoxmlPackage(bytes: Uint8Array, limits?: OoxmlPackageLimits): OoxmlPackageResult;
/**
 * Serialize a canonical package back to DOCX bytes.
 *
 * Starts from the ORIGINAL entry bytes and overwrites only the parts held as trees. A part
 * the loader did not model — media, fonts, an XML part outside the modeled set — passes
 * through untouched, so round-tripping a document cannot lose a part the engine never
 * claimed to understand.
 *
 * The modeled parts are re-emitted NORMALIZED from the tree rather than patched as text.
 * That is the whole point of the canonical tree: correctness is judged by the two D9
 * oracles (the namespace-aware fingerprint and the save/reopen semantic digest), not by
 * byte equality, so a different-but-equivalent spelling is not a defect.
 *
 * `writeZip` re-validates every part name, so a name that became unsafe between load and
 * save cannot be smuggled into the archive.
 */
declare function writeOoxmlPackage(pkg: OoxmlPackage): Uint8Array;
/** Replace one part's tree, returning a new package. Pure, like the tree edits themselves. */
declare function withPart(pkg: OoxmlPackage, part: OoxmlPart): OoxmlPackage;

export { readOoxmlPackage as A, readZip as B, type ContentTypeError as C, DEFAULT_OOXML_PACKAGE_LIMITS as D, resolveContentType as E, resolveImageRelationship as F, resolveInternalTarget as G, resolveRelationship as H, IMAGE_RELATIONSHIP_TYPE as I, validateExternalTarget as J, withPart as K, writeOoxmlPackage as L, writeZip as M, type NameRejection as N, type OoxmlPackage as O, type RelationshipRecord as R, type TargetMode as T, type ZipLimits as Z, type OoxmlPackageLimits as a, type OoxmlPackageRejection as b, type ContentTypeIndex as c, type ContentTypeRecords as d, DEFAULT_ZIP_LIMITS as e, type DefaultRecord as f, type ImageRelationshipResolution as g, type IndexResult as h, type NameResult as i, type OoxmlExternalTarget as j, type OoxmlPackageResult as k, type OverrideRecord as l, type RelationshipError as m, type RelationshipSetResult as n, type ResolveResult as o, type ResolvedRelationship as p, type ZipReadResult as q, type ZipRejection as r, asciiFold as s, buildContentTypeIndex as t, buildRelationshipSet as u, detectDuplicateNames as v, extensionKey as w, isValidMime as x, normalizePartName as y, partNameKey as z };
