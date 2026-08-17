import { D as DrawingProjection } from './tree-op-types-DWLCllG7.js';
import { O as OoxmlPackage } from './ooxml-package-D_CtywTW.js';

/**
 * The engine's trust-boundary caps: recursion depth, element counts, and the rest.
 *
 * A caller may LOWER any of these but never raise or disable one — an override of `Infinity`,
 * zero, a negative or `NaN` clamps into `(0, ceiling]` rather than turning the limit off. These
 * are security ceilings, not performance budgets.
 */
interface ResourceLimits {
    /** Max nested-structure recursion (tables/shapes/SDT/groups). */
    readonly maxRecursionDepth: number;
    /** Max total parsed element count. */
    readonly maxElementCount: number;
    /** Max package part count. */
    readonly maxPartCount: number;
    /** Max total decompressed bytes (zip-bomb guard). */
    readonly maxDecompressedBytes: number;
    /** Max total compressed input bytes. */
    readonly maxCompressedBytes: number;
    /** Max decompressed:compressed ratio per entry. */
    readonly maxCompressionRatio: number;
    /** In-memory chunk budget for streaming/spooling. */
    readonly maxChunkBytes: number;
    /** Max pagination passes before non-convergence is declared. */
    readonly maxPaginationPasses: number;
    /** Max queued items in any bounded work queue. */
    readonly maxQueueDepth: number;
}
/** Non-disableable hard ceilings: no resolved limit may exceed these. */
declare const HARD_CEILINGS: ResourceLimits;
/** Finite defaults, all <= their hard ceiling. */
declare const DEFAULT_LIMITS: ResourceLimits;
/**
 * Resolve caller overrides into a frozen, always-finite limit set. Each value is
 * `min(override>0 ? override : default, ceiling)`. Infinity/0/negative/NaN can
 * never disable a limit — the hard ceiling always wins.
 */
declare function resolveLimits(overrides?: Partial<ResourceLimits>): ResourceLimits;
/** Bounded image decode limits (typed-drawings-and-images task 4). */
/** Trust-boundary caps specific to image decoding and embedding. */
interface ImageResourceLimits {
    readonly maxEncodedBytes: number;
    readonly maxDecodedBytes: number;
    readonly maxPixels: number;
    readonly maxDimension: number;
    readonly maxPolygonPoints: number;
    readonly maxExternalRedirects: number;
}
/** Image caps nothing can raise past. A caller's override clamps into these. */
declare const IMAGE_RESOURCE_HARD_CEILINGS: ImageResourceLimits;
/** The image caps in force when a host configures none. Conservative and finite. */
declare const DEFAULT_IMAGE_RESOURCE_LIMITS: ImageResourceLimits;
/** Resolve caller overrides into frozen image limits; hard ceilings cannot be raised. */
declare function resolveImageResourceLimits(overrides?: Partial<ImageResourceLimits>): ImageResourceLimits;

/** Opaque handle — bytes are reachable only through {@link mintValidatedImageBytes}. */
interface ValidatedImageBytesHandle {
    readonly registryId: number;
    readonly resourceKey: string;
    readonly contentId: string;
    readonly generation: number;
}

/**
 * Raster media the decode port measures and any authoring path may write.
 *
 * BMP and WebP are here for the same reason the other three are: an `<img>` decodes them
 * natively, so they need a signature and a structural header and nothing else. BMP is what
 * older documents carry; WebP is what current Word writes.
 */
type SupportedImageMime = 'image/png' | 'image/jpeg' | 'image/gif' | 'image/bmp' | 'image/webp';
/**
 * Vector media painted straight from validated bytes. An `<img>` renders SVG in the
 * browser's secure static mode — no script, no external subresource loads — so there is
 * no decode step and no raster buffer sized by a file-supplied number.
 */
type VectorImageMime = 'image/svg+xml';
/** Every mime the painter can hand to an `<img>`. */
type RenderableImageMime = SupportedImageMime | VectorImageMime;
/**
 * Media kept in the package byte-for-byte that the painter cannot hand to an `<img>`.
 * A decode port may rasterize it; without one it paints as a labelled placeholder.
 */
type PreservedImageMime = 'image/tiff' | 'image/x-emf' | 'image/x-wmf';
/**
 * What is known about one embedded image: validated, refused, or still decoding.
 *
 * Content type is a CLAIM. Signature sniffing, structural header validation and the decode port
 * are authoritative, and bytes that fail them never enter public state.
 */
type ImageResourceState = {
    readonly kind: 'ready';
    readonly partName: string;
    readonly contentId: string;
    readonly resourceKey: string;
    readonly validatedHandle: ValidatedImageBytesHandle;
    readonly mime: RenderableImageMime;
    readonly pixelWidth: number;
    readonly pixelHeight: number;
    readonly dpiX: number;
    readonly dpiY: number;
} | {
    readonly kind: 'unrenderable';
    readonly partName: string | null;
    readonly mime: RenderableImageMime | PreservedImageMime | 'unknown';
    readonly reason: 'unsupported-format' | 'non-picture-graphic' | 'signature-mismatch' | 'decode-failed' | 'resource-limit';
} | {
    readonly kind: 'external';
    readonly relationshipId: string;
    readonly sinkSafe: boolean;
} | {
    readonly kind: 'missing';
    readonly relationshipId: string;
} | {
    readonly kind: 'pending';
    readonly resourceKey: string;
};
/**
 * The injected image decoder.
 *
 * A port rather than a direct `Image`/`createImageBitmap` call, so a worker or server runtime
 * supplies its own and the engine never reaches for a browser global.
 */
interface ImageDecodePort {
    decode(bytes: Uint8Array, mime: SupportedImageMime, limits: ImageResourceLimits): Promise<Readonly<{
        pixelWidth: number;
        pixelHeight: number;
        dpiX: number;
        dpiY: number;
    }>>;
    /**
     * Optional conversion of media an `<img>` cannot render (EMF/WMF metafiles, TIFF) into a
     * renderable raster. The returned bytes are untrusted and re-enter the full raster
     * validation path (sniff, header, pixel caps, decode) before they can become a ready
     * resource. A null return declines the format and keeps the labelled placeholder; so does
     * a throw, as `decode-failed`.
     */
    convertPreserved?(bytes: Uint8Array, mime: PreservedImageMime, limits: ImageResourceLimits): Promise<Readonly<{
        bytes: Uint8Array;
        mime: SupportedImageMime;
    }> | null>;
}
/** Resolves a relationship id to a validated image resource, or reports why it could not. */
interface ImageResourceLookup {
    readonly resolveEmbedded: (ownerPartName: string, relationshipId: string) => Promise<ImageResourceState>;
    readonly resolveLinked: (ownerPartName: string, relationshipId: string) => ImageResourceState;
    readonly resolveForProjection: (projection: DrawingProjection) => Promise<ImageResourceState>;
    readonly liveReferenceCount: (partName: string) => number;
    readonly dispose: () => void;
}
/** Maximum prefix inspected for SVG root detection (exported for bounded-scan tests). */
declare const MAX_SVG_SNIFF_BYTES = 512;
/** A raster header that passed structural validation: its real MIME type and pixel extent. */
interface ValidatedRasterHeader {
    readonly pixelWidth: number;
    readonly pixelHeight: number;
}
/** Bounded scan for an `<svg` document root (optional `<?xml` prolog only). */
declare function hasBoundedSvgRoot(bytes: Uint8Array): boolean;
/** Signature sniffing — authoritative over declared content type. */
declare function sniffImageMime(bytes: Uint8Array): RenderableImageMime | PreservedImageMime | 'unknown';
/** Structural PNG IHDR validation before decode. */
declare function validatePngHeader(bytes: Uint8Array): ValidatedRasterHeader | null;
/** Structural GIF logical screen descriptor validation before decode. */
declare function validateGifHeader(bytes: Uint8Array): ValidatedRasterHeader | null;
/** Bounded JPEG marker scan through the first supported SOF marker. */
declare function validateJpegHeader(bytes: Uint8Array): ValidatedRasterHeader | null;
/**
 * Intrinsic size of an SVG, resolved the way a browser sizes one: absolute `width`/`height`
 * first, then `viewBox` for the missing axis or ratio, then the CSS 300x150 default.
 *
 * This is metadata for insert and reset-to-natural-size only. Layout uses the authored
 * `wp:extent` and the browser rasterizes into that box, so nothing here sizes an allocation
 * and an out-of-range value is clamped rather than refused.
 */
declare function resolveSvgIntrinsicSize(bytes: Uint8Array, limits: ImageResourceLimits): ValidatedRasterHeader | null;
/**
 * Validate a raster image's header structurally and report its real MIME type and extent.
 *
 * Content type is a CLAIM; this is what makes it a fact. A file declaring `image/png` over JPEG
 * bytes is caught here rather than at decode.
 */
declare function validateRasterHeader(bytes: Uint8Array, mime: SupportedImageMime): ValidatedRasterHeader | null;
/** Package-wide live drawing references to a media part name. */
declare function liveDrawingReferenceCount(pkg: OoxmlPackage, partName: string): number;
/** How the image cache decodes, and what it will spend doing so. */
interface CreateImageResourceCacheOptions {
    readonly limits?: Partial<ImageResourceLimits>;
    readonly decodePort: ImageDecodePort;
}
/**
 * Derived cache for one immutable package snapshot. Registry identity is
 * `(package snapshot, decodePort object, normalized limits)` — the first caller
 * never imposes its decoder or limits on later callers with different options.
 */
declare function imageResourceLookupFor(pkg: OoxmlPackage, options: CreateImageResourceCacheOptions): ImageResourceLookup;
/** @deprecated Prefer {@link imageResourceLookupFor} — registry binds cache to package identity. */
/** Build the per-document image cache. Validated bytes only; refusals are remembered too. */
declare function createImageResourceCache(initialPkg: OoxmlPackage, options: CreateImageResourceCacheOptions): ImageResourceLookup;

export { type CreateImageResourceCacheOptions as C, DEFAULT_IMAGE_RESOURCE_LIMITS as D, HARD_CEILINGS as H, type ImageResourceState as I, MAX_SVG_SNIFF_BYTES as M, type PreservedImageMime as P, type RenderableImageMime as R, type SupportedImageMime as S, type ValidatedImageBytesHandle as V, type VectorImageMime as a, type ImageDecodePort as b, type ImageResourceLimits as c, resolveSvgIntrinsicSize as d, type ResourceLimits as e, DEFAULT_LIMITS as f, IMAGE_RESOURCE_HARD_CEILINGS as g, type ImageResourceLookup as h, type ValidatedRasterHeader as i, createImageResourceCache as j, hasBoundedSvgRoot as k, imageResourceLookupFor as l, liveDrawingReferenceCount as m, resolveLimits as n, validateGifHeader as o, validateJpegHeader as p, validatePngHeader as q, resolveImageResourceLimits as r, sniffImageMime as s, validateRasterHeader as v };
