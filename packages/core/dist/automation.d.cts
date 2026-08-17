import { A as AutomationCapabilities, a as AutomationHost } from './protocol-FAz_nPm_.cjs';
export { b as AUTOMATION_COMMAND_OPERATIONS, c as AUTOMATION_QUERY_OPERATIONS, d as AUTOMATION_SOLITARY_OPERATIONS, e as AutomationAlignment, f as AutomationBatchRequest, g as AutomationBatchResponse, h as AutomationChangeEvent, i as AutomationContentControlLock, j as AutomationContentControlRangeLocation, k as AutomationContentControlScope, l as AutomationContentControlSubtype, m as AutomationContentControlValue, n as AutomationError, o as AutomationErrorCode, p as AutomationFontRead, q as AutomationFontWrite, r as AutomationHandle, s as AutomationHandleRef, t as AutomationObjectKind, u as AutomationOperation, v as AutomationOperationKind, w as AutomationOperationResult, x as AutomationPageOrientation, y as AutomationPageSetupRead, z as AutomationPageSetupWrite, B as AutomationParagraphFormatRead, C as AutomationParagraphFormatWrite, D as AutomationParagraphRef, E as AutomationPoint, F as AutomationSaveResult, G as AutomationSearchOptions, H as AutomationSelectionMode, I as AutomationSpan, J as AutomationSpanRef, K as AutomationUnsubscribe, L as AutomationValue, M as isAutomationCommand, N as isSolitaryAutomationCommand } from './protocol-FAz_nPm_.cjs';
import { H as HeaderFooterVariant } from './hf-references-CgEOSw3i.cjs';
import { N as NoteKind } from './note-nodes-C6DLxlvj.cjs';
import { a as OoxmlPackageLimits, b as OoxmlPackageRejection } from './ooxml-package-CR5us6ad.cjs';
import './ooxml-tree-BU0e3DVi.cjs';

/** The variants a section can declare furniture for. */
declare const HEADER_FOOTER_VARIANTS: readonly HeaderFooterVariant[];
/**
 * Which story an operation acts on: the main body, one header/footer variant of one section, or
 * one note.
 *
 * A header is addressed by section INDEX plus variant rather than by relationship id, because
 * that is how a caller thinks about it and because a section inheriting its predecessor's header
 * has no relationship of its own to name.
 */
type AutomationStoryId = {
    readonly kind: 'body';
} | {
    readonly kind: 'header' | 'footer';
    /** Position of the section in the document, from zero. */
    readonly sectionIndex: number;
    readonly variant: HeaderFooterVariant;
} | {
    readonly kind: 'note';
    readonly noteKind: NoteKind;
    readonly noteId: number;
};

/** What a headless host can do. It paints nothing, so it claims nothing about painting. */
declare const SERVER_AUTOMATION_CAPABILITIES: AutomationCapabilities;
/**
 * Why bytes could not be opened as a document: any bounded-reader rejection, plus the package
 * that parsed but carried no main document part.
 */
type ServerAutomationHostRejection = OoxmlPackageRejection | 'no-main-document-part';
/**
 * A host over the opened bytes, or a refusal.
 *
 * A result rather than a throw: these bytes are untrusted input, and a malformed upload should
 * be a value the caller inspects rather than an exception from inside a zip decoder.
 */
type ServerAutomationHostResult = {
    readonly ok: true;
    readonly host: AutomationHost;
} | {
    readonly ok: false;
    readonly reason: ServerAutomationHostRejection;
    readonly detail?: string;
};
/**
 * How a headless host opens a document. Every field is optional.
 *
 * @public
 */
interface ServerAutomationHostOptions {
    /**
     * Tighter budgets for the bounded reader — zip ratio, part count, XML depth.
     *
     * Exposed because a server opening documents it did not author is exactly where a caller
     * may want smaller limits than the defaults. Omitted means the engine's own defaults.
     */
    readonly limits?: OoxmlPackageLimits;
}
/**
 * Open DOCX bytes into a headless automation host.
 *
 * A typed rejection rather than a throw: every failure here is a property of the FILE, and a
 * caller needs to tell "not a package" from "this package is hostile" from "no body".
 */
declare function createServerAutomationHost(bytes: Uint8Array, options?: ServerAutomationHostOptions): ServerAutomationHostResult;

export { AutomationCapabilities, AutomationHost, type AutomationStoryId, HEADER_FOOTER_VARIANTS, SERVER_AUTOMATION_CAPABILITIES, type ServerAutomationHostOptions, type ServerAutomationHostRejection, type ServerAutomationHostResult, createServerAutomationHost };
