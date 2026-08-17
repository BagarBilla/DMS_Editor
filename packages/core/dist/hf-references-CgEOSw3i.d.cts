import { e as OoxmlPart, O as OoxmlNode, a as OoxmlElement } from './ooxml-tree-BU0e3DVi.cjs';
import { O as OoxmlPackage } from './ooxml-package-CR5us6ad.cjs';

/** `w:headerReference w:type` vocabulary (ECMA-376 §17.10.5): default, first page, even pages. */
type HeaderFooterVariant = 'default' | 'first' | 'even';
/** Header vs footer region kind for chrome and lifecycle ops. */
type HeaderFooterKind = 'header' | 'footer';
/**
 * A section's resolved header and footer parts, by variant.
 *
 * The `even` variant is only honoured when `w:evenAndOddHeaders` is set in settings.xml —
 * without it Word ignores an authored even header, and so does this.
 */
interface HeaderFooterParts {
    readonly headers: ReadonlyMap<HeaderFooterVariant, OoxmlPart>;
    readonly footers: ReadonlyMap<HeaderFooterVariant, OoxmlPart>;
    /** `w:evenAndOddHeaders` in settings.xml — without it the `even` variant is ignored. */
    readonly evenAndOddHeaders: boolean;
    /** Whether this section enables first-page header/footer furniture (`w:titlePg`). */
    readonly titlePage: boolean;
}
/**
 * One resolved furniture slot with enough metadata for "Same as previous" chrome.
 *
 * `inherited: true` means this section has no declared reference for the slot and the
 * part comes from a predecessor. The first section never reports inherited — omitting a
 * ref there is blank furniture, not inheritance from a later section.
 */
interface HeaderFooterSlotMeta {
    readonly part: OoxmlPart;
    readonly partName: string;
    readonly rId: string;
    readonly inherited: boolean;
}
/** Per-section resolution including declared-vs-inherited metadata. */
interface HeaderFooterSectionResolution {
    readonly headers: ReadonlyMap<HeaderFooterVariant, HeaderFooterSlotMeta>;
    readonly footers: ReadonlyMap<HeaderFooterVariant, HeaderFooterSlotMeta>;
    readonly evenAndOddHeaders: boolean;
    readonly titlePage: boolean;
}
/**
 * `w:sectPr` nodes in section order, aligned with layout's `enumerateDocumentSections`.
 *
 * `null` means a section with no `w:sectPr` node (Word defaults, inherits HF from previous).
 * Paragraph-level breaks first; the final entry covers remaining blocks (body-level or null).
 */
declare function collectSectionPropertyNodes(root: OoxmlNode): Array<OoxmlElement | null>;
/**
 * Resolve header/footer parts for every section with declared-vs-inherited metadata.
 *
 * Index aligns with `enumerateDocumentSections` in the layout package. Existing merged
 * maps stay available via {@link resolveHeaderFooterPartsBySection}.
 */
declare function resolveHeaderFooterResolutionBySection(pkg: OoxmlPackage): readonly HeaderFooterSectionResolution[];
/**
 * Resolve header/footer parts for every section, applying OOXML inheritance.
 *
 * Index aligns with `enumerateDocumentSections` in the layout package.
 */
declare function resolveHeaderFooterPartsBySection(pkg: OoxmlPackage): readonly HeaderFooterParts[];
/**
 * Resolve the main-document header/footer references to their parts, gated by the
 * settings the section actually declares.
 *
 * Returns the FINAL section's effective parts (after inheritance). Multi-section hosts
 * should prefer `resolveHeaderFooterPartsBySection`.
 */
declare function resolveHeaderFooterParts(pkg: OoxmlPackage): HeaderFooterParts;

export { type HeaderFooterVariant as H, type HeaderFooterParts as a, type HeaderFooterSectionResolution as b, type HeaderFooterKind as c, type HeaderFooterSlotMeta as d, collectSectionPropertyNodes as e, resolveHeaderFooterPartsBySection as f, resolveHeaderFooterResolutionBySection as g, resolveHeaderFooterParts as r };
