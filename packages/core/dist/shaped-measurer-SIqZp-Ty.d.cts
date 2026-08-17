import { R as ResolvedRunStyle, T as TextMeasurer } from './semantic-records-DC6V1U3T.cjs';

/**
 * A face, as something asks for it: family plus the two axes this engine admits.
 *
 * Only static weights and slants. Variable-font axes are deliberately outside this vocabulary —
 * the shaper refuses variation axes, and a variable file admitted here would render bold at
 * regular weight.
 */
interface FontRequest {
    readonly family: string;
    readonly weight: number;
    readonly style: 'normal' | 'italic';
}
/**
 * A request that was answered by a DIFFERENT face than the one asked for.
 *
 * Recorded rather than silently applied, because a substitution changes measurement: it is part
 * of the shaping fingerprint, so a cached run shaped against a substitute is never reused for the
 * real face.
 */
interface FontSubstitution {
    readonly requested: FontRequest;
    readonly resolved: FontRequest;
}
declare const RESOLVED_FONT_BRAND: unique symbol;
/**
 * A face that passed admission: the bytes are present, within limits, hash-verified, and parse as
 * a font.
 *
 * Branded, so a `ResolvedFont` cannot be constructed by an object literal. Holding one is proof
 * the checks ran — which is what lets shaping skip re-validating on every call.
 */
interface ResolvedFont {
    readonly [RESOLVED_FONT_BRAND]: true;
    readonly id: string;
    readonly identity: string;
    readonly request: FontRequest;
    readonly family: string;
    /** Owned byte length, available without creating a defensive byte copy. */
    readonly byteLength: number;
    readonly bytes: Uint8Array;
    readonly hash: string;
    readonly faceIndex: number;
    readonly substitution: FontSubstitution | null;
}
/**
 * Largest single face this engine will ever admit, whatever a caller configures.
 *
 * A CEILING, not a default: a host may set a smaller `maxFontBytes`, but nothing can raise it
 * past this. Font bytes come from files, and an unbounded face is a memory-exhaustion vector.
 */
declare const HARD_MAX_FONT_BYTES: number;
/** Most faces one snapshot may hold, whatever a caller configures. */
declare const HARD_MAX_FONT_SOURCES = 256;
/** Most bytes all admitted faces may total, whatever a caller configures. */
declare const HARD_MAX_AGGREGATE_FONT_BYTES: number;
/**
 * Why a face was not admitted.
 *
 * `forbidden` and `hashMismatch` are adversarial signals rather than ordinary failures: the first
 * is a face the host declared off-limits, the second is bytes that are not what their source
 * claimed.
 */
type FontResolutionErrorCode = 'missing' | 'forbidden' | 'overLimit' | 'malformed' | 'hashMismatch';
/**
 * A face that could not be admitted, carrying whatever evidence the refusal produced.
 *
 * RETURNED rather than thrown by `FontResourceSnapshot.resolve`, because a missing face is an
 * ordinary condition — layout falls back and carries on. It extends `Error` so a caller that
 * would rather throw can.
 */
declare class FontResolutionError extends Error {
    readonly name = "FontResolutionError";
    readonly request: FontRequest;
    readonly code: FontResolutionErrorCode;
    readonly limit?: number;
    readonly actual?: number;
    readonly diagnostic?: string;
    readonly expectedHash?: string;
    readonly actualHash?: string;
    constructor(code: FontResolutionErrorCode, request: FontRequest, details?: {
        readonly limit?: number;
        readonly actual?: number;
        readonly diagnostic?: string;
        readonly expectedHash?: string;
        readonly actualHash?: string;
    });
}
/**
 * One face offered to a snapshot, before admission.
 *
 * `hash` is checked against the bytes, so a source cannot claim a face it did not supply. Setting
 * `availability` to `forbidden` declares a face that exists but must not be used, which resolves
 * as a typed refusal rather than as "missing".
 */
interface FontResourceDefinition {
    readonly request: FontRequest;
    readonly id: string;
    readonly bytes: Uint8Array;
    readonly hash: string;
    readonly faceIndex: number;
    readonly availability?: 'available' | 'forbidden';
}
/**
 * A host-declared redirect: requests for `from` resolve to `to`.
 *
 * How a metric-compatible substitute is wired in — a document naming Calibri resolves to Carlito
 * without the document being rewritten.
 */
interface DeclaredFontSubstitution {
    readonly from: FontRequest;
    readonly to: FontRequest;
}
/** Whether bytes parse as a usable font, with a diagnostic when they do not. */
type FontValidationResult = {
    readonly valid: true;
} | {
    readonly valid: false;
    readonly diagnostic: string;
};
/**
 * The injected check that bytes really are a font.
 *
 * Injected because it is the shaper that knows — HarfBuzz can open a face and read its tables,
 * and this layer must not duplicate that judgement. Every byte reaching it is file input.
 */
type FontByteValidator = (bytes: Uint8Array, faceIndex: number) => FontValidationResult;
/**
 * An immutable set of admitted faces, and the only way to reach one.
 *
 * `epoch` identifies the snapshot: fonts change by REPLACING it, never by mutation, so a layout
 * pass holds one snapshot for its whole run and cannot observe a face appearing or vanishing
 * midway.
 */
interface FontResourceSnapshot {
    readonly epoch: number;
    /** The admitted face, or a typed refusal. Never throws. */
    resolve(request: FontRequest): ResolvedFont | FontResolutionError;
}
/**
 * How a snapshot is built: which faces, under what limits, validated how.
 *
 * `maxFontBytes` is clamped to {@link HARD_MAX_FONT_BYTES} — a caller may tighten the budget but
 * never widen it past the engine's own ceiling.
 */
interface FontResourceSnapshotOptions {
    readonly epoch: number;
    readonly maxFontBytes: number;
    readonly resources: readonly FontResourceDefinition[];
    readonly substitutions?: readonly DeclaredFontSubstitution[];
    readonly validateFont: FontByteValidator;
    readonly instrumentation?: FontResourceInstrumentation;
}
/**
 * Optional counters for the operations font admission is expected to do RARELY.
 *
 * Exists so tests can assert the absence of work: hashing and byte-copying a 64 MB face on every
 * resolve would not be visible in output, only in a stalled document, so the checks assert these
 * fire once rather than per call.
 */
interface FontResourceInstrumentation {
    readonly onOwnedByteCopy?: () => void;
    readonly onHash?: () => void;
    readonly onTableScan?: () => void;
    readonly onAdmission?: () => void;
}
/**
 * The canonical string identifying one face request.
 *
 * Case- and whitespace-normalized, so `"Times New Roman"` and `"times new roman"` are one key —
 * a document may name a family either way and both must reach the same face.
 */
declare const fontRequestKey: (request: FontRequest) => string;
/** Synchronous platform-neutral SHA-256 used before font bytes cross into a shaping implementation. */
declare const sha256FontBytes: (bytes: Uint8Array) => string;
/** Bounded minimum sfnt/TTC check; Task 4 supplies full parser-backed validation. */
declare const boundedStructuralFontValidator: FontByteValidator;
/**
 * Admit a set of faces and return the immutable snapshot layout resolves against.
 *
 * Admission is the trust boundary for font bytes: counts and sizes are checked against the hard
 * ceilings, each face's hash is re-derived and compared, and the bytes are handed to the injected
 * validator. A face failing any of these is recorded as a typed refusal rather than dropped, so
 * `resolve` can explain itself instead of answering "missing".
 */
declare const createFontResourceSnapshot: (options: FontResourceSnapshotOptions) => FontResourceSnapshot;

declare const FIXED_POINT: unique symbol;
/** Fixed-point coordinates are safe integers in units declared by ShapingEnvironment.fixedPointScale. */
type FixedPoint = number & {
    readonly [FIXED_POINT]: true;
};
/**
 * Brand a safe integer as a {@link FixedPoint} coordinate.
 *
 * Fixed point rather than float throughout shaping so that two runs shaped identically compare
 * EQUAL — float accumulation would make the same text measure differently depending on how it was
 * split, and pagination is decided on those measurements.
 *
 * @throws RangeError when the value is not a safe integer.
 */
declare const fixedPoint: (value: number) => FixedPoint;
/** Which way a run reads. The parity projection of its bidi embedding level. */
type TextDirection = 'ltr' | 'rtl';
/** How fixed-point conversion breaks ties. Part of the shaping fingerprint. */
type FixedPointRoundingMode = 'halfAwayFromZero' | 'halfToEven' | 'towardZero';
/** Which Unicode normalization is applied before shaping, if any. */
type NormalizationPolicy = 'none' | 'NFC' | 'NFD' | 'NFKC' | 'NFKD';
/**
 * The shaping library and its exact version.
 *
 * Versioned because a library upgrade can change glyph positioning, and a cached measurement
 * taken under the old one must not be reused under the new one.
 */
interface VersionedShapingLibrary {
    readonly name: string;
    readonly version: string;
}
/**
 * Everything that determines how text shapes — the complete input to a
 * {@link ShapingEnvironment}.
 *
 * Exhaustive on purpose. Any field that could change a glyph's position belongs here, because the
 * environment's fingerprint is what decides whether a cached shaped run may be reused.
 */
interface ShapingEnvironmentInput {
    readonly font: ResolvedFont;
    readonly variationAxes: Readonly<Record<string, number>>;
    readonly shapingLibrary: VersionedShapingLibrary;
    readonly unicodeDataVersion: string;
    readonly normalization: NormalizationPolicy;
    readonly script: string;
    readonly language: string;
    readonly direction: TextDirection;
    readonly features: Readonly<Record<string, number>>;
    readonly fallbackOrder: readonly ResolvedFont[];
    readonly fixedPointScale: number;
    readonly roundingMode: FixedPointRoundingMode;
}
/**
 * A validated {@link ShapingEnvironmentInput} — build one with `createShapingEnvironment`.
 *
 * Structurally identical to its input, but the nominal distinction is the point: holding one
 * means the tags, axes and fonts inside it have already been checked.
 */
interface ShapingEnvironment extends ShapingEnvironmentInput {
}
/** One shaping call: the text, its size, its bidi level, and the environment to shape it in. */
interface ShapeInput {
    readonly text: string;
    readonly fontSizeHalfPoints: number;
    /** Exact UAX #9 embedding/isolate level; direction is its parity projection. */
    readonly bidiLevel: number;
    readonly environment: ShapingEnvironment;
}
/**
 * One positioned glyph.
 *
 * `id` is a glyph index in its FACE, not a character — a ligature is one glyph spanning several
 * characters, and a single character may produce several glyphs. Use `cluster` to get back to
 * text.
 */
interface ShapedGlyph {
    readonly id: number;
    /** UTF-16 text offset identifying the cluster that produced this glyph. */
    readonly cluster: number;
    /** Pen origin before this glyph's shaping offsets, in fixed-point run coordinates. */
    readonly originX: FixedPoint;
    readonly originY: FixedPoint;
    readonly advanceX: FixedPoint;
    readonly advanceY: FixedPoint;
    readonly offsetX: FixedPoint;
    readonly offsetY: FixedPoint;
    /** Exact monochrome outline returned by the admitted HarfBuzz face. */
    readonly outline: GlyphOutline;
}
/** A glyph's outline as SVG path data, in font design units. */
interface GlyphOutline {
    readonly path: string;
    /** Design units per em — divide by this to scale the path to a point size. */
    readonly unitsPerEm: number;
}
/**
 * One cluster: the smallest indivisible text-to-glyph correspondence.
 *
 * The unit the CARET moves by. A cluster may be several characters (a ligature) or several glyphs
 * (a decomposed mark), so neither a character index nor a glyph index is a valid caret position —
 * `caretEdges` is, and it includes both endpoints.
 */
interface ShapedCluster {
    /** Half-open logical UTF-16 range in ShapedRun.text. */
    readonly textStart: number;
    readonly textEnd: number;
    /** Half-open visual glyph range in ShapedRun.glyphs. */
    readonly glyphStart: number;
    readonly glyphEnd: number;
    readonly advance: FixedPoint;
    /** Fixed-point edges from this cluster's visual origin, including both endpoints. */
    readonly caretEdges: readonly FixedPoint[];
    /** Index into ShapedRun.fontSpans, preserving the exact fallback choice. */
    readonly fontSpan: number;
}
/** A run's vertical metrics, from the face that shaped it. Drives line height and baseline. */
interface ShapedVerticalMetrics {
    readonly ascent: FixedPoint;
    readonly descent: FixedPoint;
    readonly lineGap: FixedPoint;
}
/**
 * A stretch of glyphs that came from ONE face.
 *
 * A run whose text needed fallback has several of these. Recording the exact face per span is
 * what lets a re-shape reproduce the same result rather than re-running fallback selection and
 * possibly choosing differently.
 */
interface ShapedFontSpan {
    readonly glyphStart: number;
    readonly glyphEnd: number;
    readonly font: ResolvedFont;
    /** null denotes the primary font; otherwise this is the environment fallback-order index. */
    readonly fallbackIndex: number | null;
}
/**
 * One shaped run: text turned into positioned glyphs, with everything needed to measure it, paint
 * it, and put a caret in it.
 *
 * The engine's measurement unit. Layout never measures characters — it measures these.
 */
interface ShapedRun {
    readonly text: string;
    readonly direction: TextDirection;
    readonly bidiLevel: number;
    readonly glyphs: readonly ShapedGlyph[];
    readonly clusters: readonly ShapedCluster[];
    readonly fontSpans: readonly ShapedFontSpan[];
    readonly metrics: ShapedVerticalMetrics;
}
/**
 * A {@link ShapedRun} reduced to the fields two shaping results must agree on to be considered
 * identical.
 *
 * Fonts appear as {@link FontFingerprintInputs} rather than whole `ResolvedFont` objects, so the
 * comparison is over VALUES and does not depend on object identity — which is what makes it work
 * across a reload or a worker boundary.
 */
interface ShapedRunComparatorInputs {
    readonly text: string;
    readonly direction: TextDirection;
    readonly script: string;
    readonly language: string;
    readonly bidiLevel: number;
    readonly glyphs: readonly ShapedGlyph[];
    readonly clusters: readonly ShapedCluster[];
    readonly fontSpans: readonly {
        readonly glyphStart: number;
        readonly glyphEnd: number;
        readonly fallbackIndex: number | null;
        readonly font: FontFingerprintInputs;
    }[];
    readonly metrics: ShapedVerticalMetrics;
}
/**
 * The one thing layout needs from a shaping backend.
 *
 * Injected rather than imported, which is what keeps layout DOM-free and testable: a fixed-metric
 * shaper measures deterministically in a test, HarfBuzz measures for real in a browser, and
 * layout cannot tell the difference.
 */
interface TextShaper {
    shape(input: ShapeInput): ShapedRun;
}
/**
 * A font reduced to the values that identify it for fingerprinting.
 *
 * Includes the content `hash` and `faceIndex`, so two faces with the same family name but
 * different bytes fingerprint differently — which is what stops a cached measurement being reused
 * against a substituted face.
 */
interface FontFingerprintInputs {
    readonly identity: string;
    readonly id: string;
    readonly family: string;
    readonly request: FontRequest;
    readonly hash: string;
    readonly faceIndex: number;
    readonly byteLength: number;
    readonly substitution: FontSubstitution | null;
}
/**
 * A {@link ShapingEnvironment} reduced to comparable values.
 *
 * Records and axis maps become SORTED entry arrays, because two environments differing only in
 * key insertion order must fingerprint the same — otherwise a cache would miss on a difference
 * that changes no glyph.
 */
interface ShapingEnvironmentFingerprintInputs {
    readonly font: FontFingerprintInputs;
    readonly variationAxes: readonly (readonly [string, number])[];
    readonly shapingLibrary: VersionedShapingLibrary;
    readonly unicodeDataVersion: string;
    readonly normalization: NormalizationPolicy;
    readonly script: string;
    readonly language: string;
    readonly direction: TextDirection;
    readonly features: readonly (readonly [string, number])[];
    readonly fallbackOrder: readonly FontFingerprintInputs[];
    readonly fixedPointScale: number;
    readonly roundingMode: FixedPointRoundingMode;
}
/**
 * Validate and freeze a shaping environment.
 *
 * Checks every field that could silently corrupt a measurement: OpenType tags must be four ASCII
 * bytes, script and language must be non-blank and control-character free, fonts must already be
 * validated. Throws rather than coercing — a bad tag that shapes anyway produces a document that
 * measures wrong everywhere and looks fine.
 *
 * @throws TypeError on a malformed tag, name, or axis value.
 */
declare const createShapingEnvironment: (input: ShapingEnvironmentInput) => ShapingEnvironment;
/**
 * Reduce an environment to its comparable form, with records sorted so key order cannot affect
 * the result.
 */
declare const shapingEnvironmentFingerprintInputs: (input: ShapingEnvironmentInput) => ShapingEnvironmentFingerprintInputs;
/** Canonical serialization of every shaping variable, including byte hash and provenance. */
declare const shapingEnvironmentFingerprint: (environment: ShapingEnvironmentInput) => string;
/**
 * Validate and freeze a shaped run against the environment that produced it.
 *
 * Checks the internal consistency a shaper must satisfy: direction matches the environment,
 * cluster ranges tile the text without gaps or overlap, glyph ranges stay in bounds, font spans
 * cover every glyph, and caret edges are monotonic. A shaper that violates any of these produces
 * a caret that lands in the wrong place, which is far harder to diagnose downstream than here.
 *
 * @throws TypeError when the run and environment disagree, or the run is internally inconsistent.
 */
declare const createShapedRun: (input: ShapedRun, environmentInput: ShapingEnvironmentInput) => ShapedRun;
/**
 * Reduce a shaped run to its comparable form, validating it on the way through.
 *
 * What the D9 determinism oracles compare: two shaping runs of the same text in the same
 * environment must produce byte-identical structures here.
 */
declare const shapedRunComparatorInputs: (input: ShapedRun, environment: ShapingEnvironmentInput) => ShapedRunComparatorInputs;

/** Immutable per-operation environment. Configuration, extension, shaping, and producer changes are
 * coarse gates; resource changes are compared through CacheProvenance.resourceDependencies. */
interface OperationSnapshot {
    readonly resourceEpoch: number;
    readonly configEpoch: number;
    readonly extensionFingerprint: string;
    readonly shapingHash: string;
    readonly producerVersion: number;
}
/**
 * One resource a cached entry consumed, and the fingerprint it had at the time.
 *
 * Per-dependency rather than one global epoch, so updating one font does not evict entries that
 * consumed a different, unchanged font.
 */
interface ResourceDependencyProvenance {
    readonly key: string;
    readonly fingerprint: string;
}
/** Everything recorded with a cache entry: the model revision (provenance only) + the fingerprints
 *  and snapshot that DO gate reuse. */
interface CacheProvenance extends OperationSnapshot {
    /** Model revision the entry was computed at — provenance, NOT compared for reuse. */
    readonly revision: number;
    /** Fingerprint of the transitive dependency closure (see DependencyGraph.fingerprint). */
    readonly dependencyFingerprint: string;
    /** Fingerprint of the unit's own direct inputs (its content). */
    readonly inputFingerprint: string;
    /** Exact operation resources this entry consumed, sorted by key. */
    readonly resourceDependencies: readonly ResourceDependencyProvenance[];
}
/** Why a lookup missed — for cache-instrumentation assertions. */
type CacheMiss = {
    readonly hit: false;
    readonly reason: 'absent';
} | {
    readonly hit: false;
    readonly reason: 'dependency-changed';
} | {
    readonly hit: false;
    readonly reason: 'input-changed';
} | {
    readonly hit: false;
    readonly reason: 'resource-changed';
    readonly resourceKey: string;
} | {
    readonly hit: false;
    readonly reason: 'epoch-changed';
    readonly epoch: keyof OperationSnapshot;
};
/**
 * A cache probe: the value and its provenance on a hit, or the reason it missed.
 *
 * Misses are typed rather than merely absent, so a caller can tell a cold entry from one
 * invalidated by a dependency change.
 */
type CacheLookup<V> = {
    readonly hit: true;
    readonly value: V;
    readonly provenance: CacheProvenance;
} | CacheMiss;
/** Which field of an {@link OperationSnapshot} changed. */
type OperationSnapshotField = keyof OperationSnapshot;
/**
 * Whether the environment is still the one an in-flight operation started under.
 *
 * `restart` names the fields that moved. A long layout pass whose fonts or configuration change
 * midway must restart rather than finish against a mixture of both.
 */
type OperationSnapshotGuard = {
    readonly status: 'current';
} | {
    readonly status: 'restart';
    readonly changed: readonly OperationSnapshotField[];
};
/** Capture, validate, and freeze the environment used throughout one derived operation. */
declare const captureOperationSnapshot: (source: OperationSnapshot) => OperationSnapshot;
/**
 * Compare the current environment against the one an operation captured, naming what changed.
 */
declare const guardOperationSnapshot: (captured: OperationSnapshot, current: OperationSnapshot) => OperationSnapshotGuard;
/**
 * The layout measurement cache, keyed by fingerprint rather than by revision.
 *
 * An entry may be reused ACROSS revisions: the model revision is recorded as PROVENANCE, not as
 * an equality condition. Reuse is proven only when the transitive dependency fingerprint, the
 * unit's own input fingerprint, and every non-model environment input all match — which is what
 * lets an edit in one paragraph leave the rest of a long document measured.
 */
declare class ResolvedCache<V> {
    private readonly entries;
    /** Look up `key` against the CURRENT fingerprints + snapshot (revision excluded from the match).
     *  A hit proves the entry is unaffected; a miss names the reason (absent/dependency/input/epoch). */
    get(key: string, want: Omit<CacheProvenance, 'revision'>): CacheLookup<V>;
    /** Store a freshly computed entry with full provenance. */
    set(key: string, value: V, provenance: CacheProvenance): void;
    /** Drop entries produced against a stale operation epoch — restart affected work on an epoch
     *  change (8.3). Returns the number evicted. */
    evictEpoch(current: OperationSnapshot): number;
    /** Evict only entries whose consumed resource fingerprint changed at the new resource epoch. */
    evictResources(current: OperationSnapshot, resourceFingerprints: ReadonlyMap<string, string>): number;
    get size(): number;
}

/**
 * A fully resolved shaping bundle: fonts, shaper, and the environment they were admitted
 * under. Produced by the editor lane's font configuration (`createLayoutShaping`) and
 * consumed to build shaped measurers. Lived in the legacy `metrics.ts` until the legacy
 * layout lane was deleted; the type is the surviving contract between the two lanes.
 */
interface LayoutShapingOptions {
    readonly fonts: FontResourceSnapshot;
    readonly shaper: TextShaper;
    readonly defaultFont: {
        readonly family: string;
        readonly sizeHalfPoints: number;
    };
    readonly environment: {
        readonly variationAxes: Readonly<Record<string, number>>;
        readonly shapingLibrary: VersionedShapingLibrary;
        readonly unicodeDataVersion: string;
        readonly normalization: NormalizationPolicy;
        readonly language: string;
        readonly features: Readonly<Record<string, number>>;
        readonly fixedPointScale: number;
        readonly roundingMode: FixedPointRoundingMode;
    };
    readonly ligatureCaretPolicy: 'cluster-edges-only';
    readonly operation: OperationSnapshot;
}
/**
 * How the shaped measurer resolves fonts and bounds its work.
 *
 * Font resolution is the HOST's: returning null means "not available" and measurement falls back
 * rather than throwing, because a document naming a font nobody has must still lay out.
 */
interface ShapedMeasurerOptions {
    readonly shaper: TextShaper;
    /**
     * The font a run should be measured with.
     *
     * Returning null means "not available", and measurement falls back rather than throwing:
     * a document naming a font nobody has must still lay out. Resolution is the host's,
     * because which bytes stand in for `Calibri` is a packaging decision, not a layout one.
     */
    readonly resolveFont: (style: ResolvedRunStyle) => ResolvedFont | null;
    /** Used when no font resolves. */
    readonly fallback: TextMeasurer;
    readonly shapingLibrary: VersionedShapingLibrary;
    readonly unicodeDataVersion: string;
    /** Fixed-point units per point in the shaper's output. */
    readonly fixedPointScale?: number;
    /** ISO 15924 script and BCP 47 language for shaping. Latin/English by default. */
    readonly script?: string;
    readonly language?: string;
}
/**
 * A {@link TextMeasurer} that measures through the shaper rather than through a canvas.
 *
 * The accurate path: advances come from the same shaping run that will position the glyphs, so
 * measurement and paint cannot disagree. Falls back per-run when a font is unavailable rather than
 * throwing, because a document naming a font nobody has must still lay out.
 */
declare function createShapedMeasurer(options: ShapedMeasurerOptions): TextMeasurer;

export { shapedRunComparatorInputs as $, type ShapedRunComparatorInputs as A, type ShapedVerticalMetrics as B, type CacheLookup as C, type DeclaredFontSubstitution as D, type ShapingEnvironment as E, type FontByteValidator as F, type GlyphOutline as G, HARD_MAX_AGGREGATE_FONT_BYTES as H, type ShapingEnvironmentFingerprintInputs as I, type ShapingEnvironmentInput as J, boundedStructuralFontValidator as K, type LayoutShapingOptions as L, captureOperationSnapshot as M, type NormalizationPolicy as N, type OperationSnapshot as O, createFontResourceSnapshot as P, createShapedMeasurer as Q, ResolvedCache as R, type ShapedRun as S, type TextShaper as T, createShapedRun as U, type VersionedShapingLibrary as V, createShapingEnvironment as W, fixedPoint as X, fontRequestKey as Y, guardOperationSnapshot as Z, sha256FontBytes as _, type FixedPointRoundingMode as a, shapingEnvironmentFingerprint as a0, shapingEnvironmentFingerprintInputs as a1, type FixedPoint as b, type TextDirection as c, type CacheMiss as d, type CacheProvenance as e, type FontFingerprintInputs as f, type FontRequest as g, FontResolutionError as h, type FontResolutionErrorCode as i, type FontResourceDefinition as j, type FontResourceInstrumentation as k, type FontResourceSnapshot as l, type FontResourceSnapshotOptions as m, type FontSubstitution as n, type FontValidationResult as o, HARD_MAX_FONT_BYTES as p, HARD_MAX_FONT_SOURCES as q, type OperationSnapshotField as r, type OperationSnapshotGuard as s, type ResolvedFont as t, type ResourceDependencyProvenance as u, type ShapeInput as v, type ShapedCluster as w, type ShapedFontSpan as x, type ShapedGlyph as y, type ShapedMeasurerOptions as z };
