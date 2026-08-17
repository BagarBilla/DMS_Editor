import { i as FontSource, j as FontSourceSubstitution, F as FontConfiguration, k as FontFaceRequest, I as ImageContext, D as DocumentSource, Z as ZoomMode, E as EditorFontError, l as Editor, a as EditorCommand, C as CanResult, S as SelectedImageState, V as ViewScope, T as TableBorderEdgeTarget, m as TableBorderSpec, n as TableBorderStyle, o as TableContext } from './editor-25RmHnxu.cjs';
import { T as TreeDocOp, d as DrawingPositionInput, k as DrawingTransform, m as DrawingTreeDocOp } from './tree-op-types-UOXlRUqQ.cjs';
import { b as ImageDecodePort, S as SupportedImageMime } from './image-resources-DwpNnTg3.cjs';
import { R as RevisionDisplayMode } from './revision-projection-72ZApe-g.cjs';
import './review-support-rsyGP5-9.cjs';
import { a as SemanticSelection, S as SemanticPosition, N as NavigationCommand } from './semantic-interaction-B4HrJFQ2.cjs';
import { R as ResolvedFootnoteProperties, a as ResolvedEndnoteProperties, A as AuthoredNoteProperties, l as ReviewRevisionKind } from './review-reads-D3r3tnoo.cjs';
import { S as SemanticLayout, C as ContentControlBoundaryRecord, T as TextMeasurer } from './semantic-records-DC6V1U3T.cjs';
import { S as StoryScope, A as ApplyImagePropertiesInput, d as ImageIntentResult, c as InsertImageInput, B as BookmarkIndex } from './custom-node-writes-YqISlSRl.cjs';
import { C as CellSelection, S as SectionProperties } from './semantic-cell-selection-CI3loBKq.cjs';
import { EditorModule, ReviewModuleContribution } from './contracts/modules.cjs';
import { Unsubscribe, ExecResult, IndentFormatting } from './contracts/types.cjs';
import { F as FieldShadingMode, a as DrawingPaintStrings } from './semantic-paint-DdGGra4m.cjs';
import { T as TreeDocxSession, a as TreeApplyResult } from './tree-session-Cow6LjPn.cjs';
import './contracts/document.cjs';

/**
 * A partial font configuration one origin contributes: sources, substitutions, or both.
 * `loadDefaultFonts()` (the substitute package) and `loadFonts()` (the fetch helper) both
 * return this shape, so every origin composes through `composeFontConfiguration` the
 * same way.
 */
interface FontConfigurationFragment {
    readonly sources?: readonly FontSource[];
    readonly substitutions?: readonly FontSourceSubstitution[];
}
/**
 * The base of a composition: everything a `FontConfiguration` carries, all optional.
 * Omitted fields take the documented defaults (`epoch` 0, `maxFontBytes` at the engine
 * hard maximum, `defaultFont` Calibri at 11pt — Word's own default face and size).
 */
interface FontConfigurationBase extends FontConfigurationFragment {
    /**
     * Identity of this configuration's byte set. The engine uses it to tell one resolved
     * font set from another; leave it unset and the editor supplies the load sequence.
     */
    readonly epoch?: number;
    /** Per-face byte ceiling. Defaults to the engine hard maximum; lower it to tighten intake. */
    readonly maxFontBytes?: number;
    /** The face used when a run names no font. Defaults to Word's own: Calibri at 11pt. */
    readonly defaultFont?: FontConfiguration['defaultFont'];
    /** BCP-47 tag passed to the shaper for language-sensitive shaping. */
    readonly language?: string;
}
/**
 * What the document turned out to need, handed to an on-demand resolver.
 *
 * The families are the ones the file actually names — already name-validated and capped,
 * so a resolver may treat them as a list to look up, never as URLs or paths to build.
 */
interface FontResolutionRequest {
    /**
     * Families declared anywhere in the document (body, headers/footers, styles), deduped,
     * sorted, and capped at {@link MAX_RESOLVER_FAMILIES}.
     */
    readonly families: readonly string[];
    /** The face a run naming no font resolves to, so a resolver can cover it too. */
    readonly defaultFamily: string;
}
/**
 * Resolve fonts once the document's needs are known, instead of ahead of them.
 *
 * Called once per load, AFTER the file is parsed and mounted, with the families it
 * declares; whatever it returns composes exactly like a statically supplied fragment.
 * Returning nothing is a valid answer — it means "I cover none of this", and the
 * document stays on the fixed measurer.
 *
 * A resolver that fetches makes opening a document perform network requests. That is a
 * real change in posture and it must stay the APP's decision: the engine never supplies
 * one, and the families here are file-derived, so a resolver must look them up in a set
 * it shipped rather than interpolate them into a URL.
 */
type FontResolver = (request: FontResolutionRequest) => FontConfiguration | FontConfigurationFragment | undefined | Promise<FontConfiguration | FontConfigurationFragment | undefined>;
/**
 * Ceiling on the families one document can put in front of a resolver.
 *
 * A resolver typically turns each family into up to four faces, and the resource snapshot
 * refuses more than `HARD_MAX_FONT_SOURCES` (256) sources — so 64 families is the point
 * past which a document could no longer be served anyway. Capping here means a file
 * declaring thousands of distinct `w:rFonts` cannot fan a resolver out across thousands
 * of lookups (or fetches) before that limit is ever reached.
 */
declare const MAX_RESOLVER_FAMILIES = 64;
/** Word's document default when nothing else says otherwise: Calibri at 11pt. */
declare const WORD_DEFAULT_FONT: FontConfiguration['defaultFont'];
/**
 * Merge a base and any number of fragments into one frozen `FontConfiguration`.
 *
 * A bare fragment IS a valid base, so the single-origin case is one argument:
 * `composeFontConfiguration(await loadDefaultFonts())`. Pass extra fragments to layer
 * origins, and set `epoch`/`maxFontBytes`/`defaultFont` on the base only when you need
 * something other than the documented defaults.
 *
 * - Sources dedupe first-wins by (family, weight, style), in argument order — base
 *   before fragments, earlier fragments before later ones.
 * - Substitutions dedupe first-wins by their `from` face, in the same order, and every
 *   substitution whose `from` face has a direct source anywhere in the composition is
 *   dropped: a real face always beats a stand-in.
 * - The result is frozen (arrays included); the byte arrays themselves are the callers'
 *   and are not copied here — the resource snapshot takes its own defensive copy.
 */
declare function composeFontConfiguration(base: FontConfigurationBase, ...fragments: readonly FontConfigurationFragment[]): FontConfiguration;

/**
 * A Word-faithful blank document, freshly zipped per call (the caller may hand the
 * bytes to a loader that takes ownership). Calibri 11pt and Word's Normal paragraph
 * spacing are authored in `w:docDefaults`, US Letter geometry in the section — a New
 * document behaves like Word's, and saving it produces a file Word opens identically.
 *
 * @public
 */
declare function blankDocumentBytes(): Uint8Array;

/** One URL to fetch and the face it claims to be. */
interface FontUrlSource {
    readonly url: string;
    readonly family: string;
    readonly weight: number;
    readonly style: 'normal' | 'italic';
    /**
     * Expected `sha256:` content hash. When present, mismatching bytes are REFUSED —
     * pin this for any URL not under the app's sole control.
     */
    readonly hash?: string;
    readonly faceIndex?: number;
}
/**
 * What to fetch, and under what limits.
 *
 * Only `sources` is required. Each carries its own expected hash, so bytes are trusted by
 * CONTENT rather than by origin — a swapped asset fails admission even from a trusted host.
 */
interface LoadFontsRequest {
    readonly sources: readonly FontUrlSource[];
    /** Cache API bucket name; default `docx-editor-fonts`. */
    readonly cacheName?: string;
    /** Injectable for tests and CSP-constrained hosts; defaults to global `fetch`. */
    readonly fetcher?: typeof fetch;
    /** Per-font byte ceiling; defaults to the engine hard maximum. */
    readonly maxFontBytes?: number;
}
/**
 * Why one font did not load.
 *
 * Distinguished rather than collapsed to "failed" because the responses differ: `networkError`
 * and `httpError` are worth retrying, while `hashMismatch` and `malformed` mean the bytes were
 * not what the source claimed and retrying will fetch the same wrong thing.
 */
type FontLoadFailureReason = 'networkError' | 'httpError' | 'hashMismatch' | 'overLimit' | 'emptyResponse'
/** The declared face itself is unusable (empty family, out-of-range weight); nothing was fetched. */
 | 'invalidRequest'
/** The bytes are not a font at all — most often an HTML error page served with 200. */
 | 'malformed';
/**
 * One face that did not load, with whatever evidence the failure produced.
 *
 * Non-fatal: {@link LoadFontsResult} still carries every source that succeeded, and the affected
 * family falls back to the engine's fixed measurement.
 */
interface FontLoadFailure {
    readonly url: string;
    readonly request: FontFaceRequest;
    readonly reason: FontLoadFailureReason;
    /** HTTP status for `httpError`; hashes for `hashMismatch`. */
    readonly status?: number;
    readonly expectedHash?: string;
    readonly actualHash?: string;
    readonly diagnostic?: string;
}
/**
 * What one `loadFonts` call produced: the faces that arrived, plus the ones that did not.
 *
 * A `FontConfigurationFragment`, so it composes straight into `composeFontConfiguration`
 * alongside other font sources. Partial success is the normal case — compose it even with
 * failures present.
 */
interface LoadFontsResult extends FontConfigurationFragment {
    readonly sources: readonly FontSource[];
    readonly failures: readonly FontLoadFailure[];
}
/**
 * Fetch app-specified font URLs into verified, cache-backed `FontSource`s.
 *
 * Fetches ONLY the URLs listed — never a default host or engine-chosen CDN — and never
 * rejects for a per-source failure: the result carries every admitted source and a
 * typed entry for every drop. Compose the result with `composeFontConfiguration`.
 */
declare function loadFonts(request: LoadFontsRequest): Promise<LoadFontsResult>;
/**
 * Turn font bytes you ALREADY hold into a `FontSource` — a file input, IndexedDB, a
 * bundler import. `loadFonts` covers URLs; this covers everything else, so no caller has
 * to hand-assemble the record or reach for a hashing helper.
 *
 * Returns a typed failure instead of throwing when the descriptor or the bytes are
 * unusable, matching `loadFonts`: one bad face degrades itself, never its neighbours.
 */
declare function createFontSource(bytes: Uint8Array, request: FontFaceRequest & {
    readonly faceIndex?: number;
}, options?: {
    readonly id?: string;
    readonly maxFontBytes?: number;
}): {
    readonly source: FontSource;
} | {
    readonly failure: FontLoadFailure;
};

/**
 * HOW a control reaches the engine — never WHETHER it is enabled.
 *
 * Enabled state has exactly one source: `toolbarCommandState(editor, slot)`, which
 * asks `Editor.can`. The registry is static data and cannot know what the engine
 * will honour at this selection, in this document, at this moment.
 *
 * There used to be a fourth member, `parityOnly`, meaning "visible but permanently
 * disabled". It was a second, static answer to the question `Editor.can` already
 * answers, and it went stale the moment the engine wired underline, strike, the four
 * alignments, the list commands and the four value slots: the registry still said
 * parity-only, React ignored it and ran them, and Vue believed it and rendered twelve
 * WORKING commands permanently disabled. A slot the engine has not wired needs no
 * registry flag — `commandForSlot` answers null and `toolbarCommandState` disables the
 * control with the engine's own words ("not wired to an editor command").
 */
type ChromeControlState = 
/**
 * Dispatched as one fixed engine command: enabled when
 * `Editor.can(commandForSlot(slot))` succeeds, a click runs
 * `runToolbarCommand(editor, slot)`. The command is resolved from the SLOT id
 * through `commandForSlot` in toolbar-commands.ts — the one command table both
 * adapters share. A slot with no row there is simply not wired YET, and says so
 * through the engine rather than through this descriptor.
 */
{
    readonly kind: 'command';
}
/**
 * Dispatched with a PICKED value: `commandForSlotValue(slot, value)`. Enabled when
 * the engine would honour a well-formed value right now (`toolbarCommandState`
 * probes for exactly that), so the control needs chrome that produces a value — a
 * font list, a size, a colour — before a click means anything.
 *
 * A distinct kind because 'command' cannot describe it: there is no fixed command
 * to hand `Editor.can`, and a bare click has nothing to send.
 */
 | {
    readonly kind: 'value';
}
/** `Editor.save()` — not a command (see `runSave`). */
 | {
    readonly kind: 'save';
}
/**
 * `Editor.load()` — not a command either, and the exact twin of `save`: bytes cross the
 * boundary between the host and the engine, and only the host can produce them. The
 * control needs chrome that reads a file (a picker, a drop target) before a click means
 * anything, so a bare click has nothing to send — the same reason `save` is not `command`.
 *
 * A fourth kind rather than reusing `save` because the two dispatch in opposite
 * directions, and an adapter branching on `kind` must be able to tell them apart. Unlike
 * the deleted `parityOnly`, this one IS named by a control (`file.open`).
 */
 | {
    readonly kind: 'load';
};
/**
 * The SHAPE a control renders as (task M6V.1).
 *
 * The legacy toolbar is not a row of uniform icon buttons: it mixes labelled dropdowns
 * (`Normal`, `Arial`, alignment, line spacing), numeric steppers with visible values
 * (zoom `- 100% +`, size `- 26 +`), split colour controls (a glyph over a colour swatch
 * with its own caret), and a mode pill (`Editing`). Rendering all of them as icon
 * buttons is the difference an owner review called out as "not visual parity" — the
 * regions were all present and it still did not look like the product.
 */
/** `modePill` is deliberately absent. It was declared, never used by any control, and
 *  rendered nothing — the editing-mode control below is a `dropdown`, which is what the
 *  legacy product shows. A shape no descriptor names is a branch adapters must implement
 *  and can never exercise. */
type ChromeControlShape = 'icon' | 'stepper' | 'dropdown' | 'colorSplit';
/**
 * One toolbar control as the registry describes it — what it renders as, never whether it is
 * enabled.
 *
 * Enabled state has exactly ONE source, `toolbarCommandState`, which asks the engine. A
 * descriptor carrying its own disabled flag would be a second answer that goes stale the moment
 * the engine wires the slot.
 *
 * @public
 */
interface ChromeControl<Id extends string = string> {
    /** Stable control id, unique WITHIN its group. Public API; renames are breaking. */
    readonly id: Id;
    /** How it renders. Defaults to `icon`. */
    readonly shape?: ChromeControlShape;
    /** Displayed value for a stepper or dropdown (an i18n key, or a literal for numbers). */
    readonly valueText?: string;
    /** Swatch colour for a `colorSplit` control. */
    readonly swatch?: string;
    /** i18n key for the accessible name and tooltip. Never hardcoded English. */
    readonly labelKey: string;
    /** Material Symbols path data, or null for a non-icon control (a picker). */
    readonly paths: readonly string[] | null;
    /** For pickers: the i18n key of the placeholder value shown. */
    readonly valueKey?: string;
    readonly state: ChromeControlState;
}
/**
 * One toolbar group: the taxonomy both adapters derive their default arrangement FROM.
 *
 * Never hand-list controls in an adapter — a default toolbar is built by walking `CHROME_GROUPS`,
 * so a slot added here appears in React and Vue without either being edited.
 *
 * @public
 */
interface ChromeGroup<Id extends string = string, ControlId extends string = string> {
    /** Stable group id. Public API; renames are breaking. */
    readonly id: Id;
    readonly labelKey: string;
    /**
     * Not part of the DEFAULT toolbar arrangement. The chrome spec shows these
     * controls only in a context the engine does not model yet (an image or table
     * selection), or not at all (save belongs in the host's File menu, never in the
     * bar). Their slots stay public for composition — a host can still place
     * `image.insert` or `file.save` explicitly — but the default chrome is the
     * registry's default bar, which ends at the editing-mode picker.
     */
    readonly contextual?: true;
    readonly controls: readonly ChromeControl<ControlId>[];
}
/**
 * The complete chrome, in bar order. Literal-typed (`as const`) so the slot-id
 * vocabulary below is derived from the data and cannot drift from it.
 *
 * Taxonomy taste: ids are short, lowercaseCamel, and never repeat their group's name
 * (`alignment.left`, not `alignment.alignLeft`; `font.family`, not `font.fontFamily`).
 */
declare const CHROME_GROUPS: readonly [{
    readonly id: "history";
    readonly labelKey: "formattingBar.groups.history";
    readonly controls: readonly [{
        readonly id: "undo";
        readonly labelKey: "formattingBar.undoShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "redo";
        readonly labelKey: "formattingBar.redoShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "zoom";
    readonly labelKey: "formattingBar.groups.zoom";
    readonly controls: readonly [{
        readonly id: "level";
        readonly shape: "stepper";
        readonly valueText: "100%";
        readonly labelKey: "formattingBar.groups.zoom";
        readonly paths: null;
        readonly valueKey: "zoom.zoomLevel";
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "styles";
    readonly labelKey: "formattingBar.groups.styles";
    readonly controls: readonly [{
        readonly id: "style";
        readonly shape: "dropdown";
        readonly labelKey: "styles.selectAriaLabel";
        readonly paths: null;
        readonly valueKey: "styles.normalText";
        readonly state: {
            readonly kind: "value";
        };
    }];
}, {
    readonly id: "font";
    readonly labelKey: "formattingBar.groups.font";
    readonly controls: readonly [{
        readonly id: "family";
        readonly shape: "dropdown";
        readonly labelKey: "font.selectAriaLabel";
        readonly paths: null;
        readonly valueKey: "font.sansSerif";
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "size";
        readonly shape: "stepper";
        readonly valueText: "11";
        readonly labelKey: "fontSize.listLabel";
        readonly paths: null;
        readonly valueKey: "fontSize.label";
        readonly state: {
            readonly kind: "value";
        };
    }];
}, {
    readonly id: "text";
    readonly labelKey: "formattingBar.groups.textFormatting";
    readonly controls: readonly [{
        readonly id: "bold";
        readonly labelKey: "formattingBar.boldShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "italic";
        readonly labelKey: "formattingBar.italicShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "underline";
        readonly labelKey: "formattingBar.underlineShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "strike";
        readonly labelKey: "formattingBar.strikethrough";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "color";
        readonly shape: "colorSplit";
        readonly swatch: "#ff0000";
        readonly labelKey: "formattingBar.fontColor";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "highlight";
        readonly shape: "colorSplit";
        readonly swatch: "#ffff00";
        readonly labelKey: "formattingBar.highlightColor";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "link";
        readonly labelKey: "formattingBar.insertLinkShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "script";
    readonly labelKey: "formattingBar.groups.script";
    readonly controls: readonly [{
        readonly id: "super";
        readonly labelKey: "formattingBar.superscript";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "sub";
        readonly labelKey: "formattingBar.subscript";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "alignment";
    readonly labelKey: "formattingBar.groups.alignment";
    readonly controls: readonly [{
        readonly id: "left";
        readonly labelKey: "alignment.alignLeft";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "center";
        readonly labelKey: "alignment.center";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "right";
        readonly labelKey: "alignment.alignRight";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "justify";
        readonly labelKey: "alignment.justify";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "list";
    readonly labelKey: "formattingBar.groups.listFormatting";
    readonly controls: readonly [{
        readonly id: "bullet";
        readonly labelKey: "lists.bulletList";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "numbered";
        readonly labelKey: "lists.numberedList";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "outdent";
        readonly labelKey: "lists.decreaseIndent";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "indent";
        readonly labelKey: "lists.increaseIndent";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "lineSpacing";
        readonly shape: "dropdown";
        readonly labelKey: "lineSpacing.label";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "format";
    readonly labelKey: "formattingBar.clearFormatting";
    readonly controls: readonly [{
        readonly id: "clear";
        readonly labelKey: "formattingBar.clearFormatting";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "review";
    readonly labelKey: "formattingBar.commentsAndChanges";
    readonly controls: readonly [{
        readonly id: "comments";
        readonly shape: "icon";
        readonly labelKey: "formattingBar.commentsAndChanges";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "editingMode";
        readonly shape: "dropdown";
        readonly labelKey: "editingMode.label";
        readonly valueKey: "editingMode.editing";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "contentControl";
    readonly labelKey: "contentControl.group";
    readonly contextual: true;
    readonly controls: readonly [{
        readonly id: "showAll";
        readonly labelKey: "contentControl.showAll";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "formFill";
        readonly labelKey: "contentControl.formFill";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "inspector";
        readonly labelKey: "contentControl.inspector";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "remove";
        readonly labelKey: "contentControl.remove";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "image";
    readonly labelKey: "formattingBar.groups.image";
    readonly contextual: true;
    readonly controls: readonly [{
        readonly id: "insert";
        readonly labelKey: "toolbar.image";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "properties";
        readonly labelKey: "formattingBar.imagePropertiesShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "wrap";
        readonly shape: "dropdown";
        readonly labelKey: "formattingBar.imageWrap";
        readonly paths: readonly string[];
        readonly valueKey: "imageWrap.inline";
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "altText";
        readonly shape: "dropdown";
        readonly labelKey: "formattingBar.altText";
        readonly paths: null;
        readonly valueKey: "imageProperties.altText";
        readonly state: {
            readonly kind: "value";
        };
    }];
}, {
    readonly id: "table";
    readonly labelKey: "formattingBar.groups.table";
    readonly contextual: true;
    readonly controls: readonly [{
        readonly id: "insert";
        readonly labelKey: "toolbar.table";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "borderTarget";
        readonly shape: "dropdown";
        readonly labelKey: "table.borders.tooltip";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "borderColor";
        readonly shape: "colorSplit";
        readonly swatch: "#000000";
        readonly labelKey: "table.borderColor";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "borderStyle";
        readonly shape: "dropdown";
        readonly labelKey: "table.borders.styleAriaLabel";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "borderWidth";
        readonly shape: "dropdown";
        readonly labelKey: "table.borderWidth";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "value";
        };
    }, {
        readonly id: "cellFill";
        readonly shape: "colorSplit";
        readonly swatch: "#ffffff";
        readonly labelKey: "table.cellFillColor";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "value";
        };
    }];
}, {
    readonly id: "file";
    readonly labelKey: "toolbar.file";
    readonly contextual: true;
    readonly controls: readonly [{
        readonly id: "open";
        readonly labelKey: "toolbar.open";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "load";
        };
    }, {
        readonly id: "save";
        readonly labelKey: "toolbar.saveShortcut";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "save";
        };
    }, {
        readonly id: "pageSetup";
        readonly labelKey: "toolbar.pageSetup";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}, {
    readonly id: "insert";
    readonly labelKey: "toolbar.insert";
    readonly contextual: true;
    readonly controls: readonly [{
        readonly id: "footnote";
        readonly labelKey: "toolbar.insertFootnote";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "endnote";
        readonly labelKey: "toolbar.insertEndnote";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "pageNumber";
        readonly labelKey: "headerFooter.insertPageNumber";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "totalPages";
        readonly labelKey: "headerFooter.insertTotalPages";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "sectionPages";
        readonly labelKey: "headerFooter.insertSectionPages";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "pageXofY";
        readonly labelKey: "headerFooter.insertPageXofY";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "pageBreak";
        readonly labelKey: "toolbar.pageBreak";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "sectionBreakNextPage";
        readonly labelKey: "toolbar.sectionBreakNextPage";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "sectionBreakContinuous";
        readonly labelKey: "toolbar.sectionBreakContinuous";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }, {
        readonly id: "toc";
        readonly labelKey: "toolbar.tableOfContents";
        readonly paths: readonly string[];
        readonly state: {
            readonly kind: "command";
        };
    }];
}];
/**
 * Every group id in the chrome, as a literal union. Stable public API; renaming a group
 * id is a breaking change.
 *
 * @public
 */
type ChromeGroupId = 'history' | 'zoom' | 'styles' | 'font' | 'text' | 'script' | 'alignment' | 'list' | 'format' | 'review' | 'contentControl' | 'image' | 'table' | 'file' | 'insert';
/**
 * The public slot vocabulary: `${groupId}.${controlId}` for every control that actually
 * exists — `text.bold`, `font.family`, `alignment.left`. THE stable contract a host
 * composes against and `commandForSlot` resolves; renaming a slot is a breaking change.
 *
 * @public
 */
type ChromeSlotId = 'history.undo' | 'history.redo' | 'zoom.level' | 'styles.style' | 'font.family' | 'font.size' | 'text.bold' | 'text.italic' | 'text.underline' | 'text.strike' | 'text.color' | 'text.highlight' | 'text.link' | 'script.super' | 'script.sub' | 'alignment.left' | 'alignment.center' | 'alignment.right' | 'alignment.justify' | 'list.bullet' | 'list.numbered' | 'list.outdent' | 'list.indent' | 'list.lineSpacing' | 'format.clear' | 'review.comments' | 'review.editingMode' | 'contentControl.showAll' | 'contentControl.formFill' | 'contentControl.inspector' | 'contentControl.remove' | 'image.insert' | 'image.properties' | 'image.wrap' | 'image.altText' | 'table.insert' | 'table.borderTarget' | 'table.borderColor' | 'table.borderStyle' | 'table.borderWidth' | 'table.cellFill' | 'file.open' | 'file.save' | 'file.pageSetup' | 'insert.footnote' | 'insert.endnote' | 'insert.pageNumber' | 'insert.totalPages' | 'insert.sectionPages' | 'insert.pageXofY' | 'insert.pageBreak' | 'insert.sectionBreakNextPage' | 'insert.sectionBreakContinuous' | 'insert.toc';
/**
 * Every control id in the chrome, as a literal union. Unique WITHIN a group, not
 * globally (`image.insert` / `table.insert`) — key consumers on {@link ChromeSlotId}.
 *
 * @public
 */
type ChromeControlId = ChromeSlotId extends `${string}.${infer C}` ? C : never;
/**
 * The slot id of one control within its group. Only meaningful for entries of
 * `CHROME_GROUPS` — the cast is sound because every group/control pair in the registry
 * is, by construction, a member of the `ChromeSlotId` union.
 *
 * @public
 */
declare function chromeSlotId(group: {
    readonly id: string;
}, control: {
    readonly id: string;
}): ChromeSlotId;
/**
 * The groups of the DEFAULT toolbar arrangement, in bar order: every group that is
 * not `contextual`. This is the registry's default bar — undo/redo through the
 * editing-mode picker — and what both adapters render when the host composes
 * nothing. Contextual slots (`image.*`, `table.insert`, `file.save`) remain
 * available for explicit composition.
 *
 * @public
 */
declare function defaultChromeGroups(): readonly ChromeGroup[];
/**
 * The formatting-bar groups for one editor snapshot: the default bar, plus the
 * contextual `image` group when a drawing is selected. Insertion without a selection is
 * not in the packaged chrome at all — a host that wants it places `image.insert` itself,
 * through `DocxEditor.Toolbar.ImageInsert` or `DocxEditor.Menu.ImageInsert`.
 *
 * @public
 */
declare function formattingBarChromeGroups(image: ImageContext | null): readonly ChromeGroup[];
/**
 * A row that runs one chrome slot.
 *
 * @public
 */
interface ChromeMenuItemEntry {
    readonly kind: 'item';
    readonly slot: ChromeSlotId;
    /**
     * Plain-label override for this row.
     *
     * A slot's own `labelKey` is a TOOLTIP key, and several of them fold the shortcut into
     * the text (`formattingBar.boldShortcut` is "Bold (Ctrl+B)"). A menu puts the shortcut
     * in its own right-hand column, so the row needs the bare noun. Both keys already exist
     * in the catalogue — this points at the plain one rather than minting a duplicate.
     */
    readonly labelKey?: string;
    /** i18n key of the shortcut shown right-aligned on the row (`toolbar.saveShortcut`). */
    readonly shortcutKey?: string;
    /**
     * The row opens a size PICKER instead of firing on click — Word's insert-table grid.
     * The slot still owns the label, the icon and the enabled state; only the dispatch
     * differs, and the picked size is what the host sends.
     */
    readonly picker?: 'tableGrid';
}
/**
 * A row that opens a nested panel of rows (Insert › Break).
 *
 * It carries its own label and icon rather than a slot, because a submenu PARENT has no
 * command: clicking it opens the panel. Giving it a slot would mint a public id for a
 * control that can never be enabled, and `toolbarCommandState` would have to invent an
 * answer about it.
 *
 * @public
 */
interface ChromeMenuSubmenuEntry {
    readonly kind: 'submenu';
    readonly labelKey: string;
    readonly paths: readonly string[] | null;
    readonly items: readonly ChromeMenuEntry[];
}
/** A horizontal rule between groups of rows. @public */
interface ChromeMenuSeparatorEntry {
    readonly kind: 'separator';
}
/** One row of a chrome menu. @public */
type ChromeMenuEntry = ChromeMenuItemEntry | ChromeMenuSubmenuEntry | ChromeMenuSeparatorEntry;
/**
 * Every menu id, as a literal union. Stable public API; renaming one is a breaking change,
 * exactly like a group or slot id.
 *
 * @public
 */
type ChromeMenuId = 'file' | 'format' | 'insert' | 'help';
/** One menu of the menu bar. @public */
interface ChromeMenu {
    readonly id: ChromeMenuId;
    readonly labelKey: string;
    readonly entries: readonly ChromeMenuEntry[];
}
/**
 * The menu bar the chrome shows above the toolbar, in bar order: File, Format, Insert,
 * Help.
 *
 * @public
 */
declare const CHROME_MENUS: readonly ChromeMenu[];
/**
 * Every slot a menu places, in menu order, submenus flattened. What a parity test asserts
 * against, and what a host enumerates to know which capabilities the menu bar reaches.
 *
 * @public
 */
declare function chromeMenuSlots(): readonly ChromeSlotId[];
/** Total controls, so a parity test can assert none were dropped. */
declare function chromeControlCount(): number;
/**
 * i18n key for the tooltip on a control an ADAPTER renders but cannot drive yet — a
 * value slot in a toolbar that has grown no picker for it, say. It is never the reason
 * a control is disabled: when the ENGINE refuses, the tooltip is the engine's own
 * `disabledReason`, never an adapter paraphrase.
 */
declare const CHROME_UNAVAILABLE_KEY = "formattingBar.unavailableInPreview";

type TableCommandSelectionPolicy = {
    readonly kind: 'preserveSelection';
} | {
    readonly kind: 'adoptCommittedCaret';
};
type TableCommandPlan = {
    readonly ok: true;
    readonly ops: readonly TreeDocOp[];
    readonly selection: TableCommandSelectionPolicy;
} | {
    readonly ok: false;
    readonly code: 'unsupported' | 'invalidArgs' | 'locked';
    readonly reason: string;
};

type NotePropertiesSlice = {
    readonly resolved: ResolvedFootnoteProperties | ResolvedEndnoteProperties;
    readonly documentAuthored?: AuthoredNoteProperties;
    readonly sectionAuthored?: AuthoredNoteProperties;
};
type NotePropertiesStateSnapshot = {
    readonly sectionIndex: number;
    readonly footnote: NotePropertiesSlice;
    readonly endnote: NotePropertiesSlice;
};

/**
 * A hyperlink as the surface reports it: its identity, where it sits, and the SANITIZED
 * target. `href: null` is an inert link — a refused scheme or a dangling relationship — which
 * a UI shows and offers to edit but must never offer to open.
 */
interface SurfaceHyperlink {
    /** Canonical node id of the `w:hyperlink`. */
    readonly id: string;
    readonly paragraphId: string;
    /** UTF-16 range of the link's display text within its paragraph. */
    readonly start: number;
    readonly end: number;
    readonly text: string;
    readonly kind: 'external' | 'internal' | 'unresolved';
    /** Sanitized projection: an absolute URL, `#anchor`, or null when inert. */
    readonly href: string | null;
    /** The authored target, for an editor to seed its input with. */
    readonly authored: string;
    readonly anchor?: string;
    readonly tooltip?: string;
}
/**
 * Reading and writing hyperlinks on the surface.
 *
 * Every href that leaves here has already been through `sanitizeHref` — targets come from files,
 * so `javascript:`, `data:` and `vbscript:` are dropped at the parse boundary rather than trusted
 * to be filtered by whoever renders them.
 */
interface HyperlinkOps {
    /** Every link in the paragraph the caret is in. */
    linksInCaretParagraph(): SurfaceHyperlink[];
    /** The link the caret sits in, or null. */
    linkAtCaret(): SurfaceHyperlink | null;
    /** The link with this node id, or null. */
    linkById(linkId: string): SurfaceHyperlink | null;
    /**
     * Apply a link to the selection, or retarget the one the caret is already in.
     *
     * `text` replaces the display text when supplied. Returns whether anything committed;
     * a refusal leaves the document exactly as it was.
     */
    applyHyperlink(input: {
        readonly url?: string;
        readonly anchor?: string;
        readonly text?: string;
        readonly tooltip?: string;
    }): boolean;
    /** Take the link off the one at the caret (or a named one). Returns whether it committed. */
    removeHyperlink(linkId?: string): boolean;
}

/** A click on a painted link, after native navigation was refused. */
interface HyperlinkActivation {
    readonly link: SurfaceHyperlink;
    /** The clicked line fragment's viewport rect, so a popover can be placed under it. */
    readonly rect: {
        readonly left: number;
        readonly top: number;
        readonly bottom: number;
        readonly right: number;
    };
}
/**
 * Moving the caret and the viewport: to a position, to a bookmark, or out to an external target.
 *
 * {@link SurfaceNavigation.openExternal} is THE external-activation call site, and it refuses
 * anything but an already-sanitized href. Routing an authored target through some other path is
 * how a document gets to choose where a click goes.
 */
interface SurfaceNavigation {
    /** Snap to a semantic position using layout geometry, then place the caret there. */
    goToPosition(position: {
        paragraphId: string;
        offset: number;
    }): boolean;
    /**
     * Scroll a bookmark into view and place the caret at it. Answers false for a name no
     * bookmark declares — an inert click, which is what Word does with a dangling anchor.
     */
    goToBookmark(name: string): boolean;
    /**
     * THE external-activation call site. Refuses anything but a sanitized projection, so a
     * caller cannot route an authored target through it by mistake.
     */
    openExternal(href: string | null): boolean;
    destroy(): void;
}

/**
 * Everything {@link createDocxEditor} accepts. Every field is optional.
 *
 * `container` is the one that changes the shape of the whole lifecycle: omitting it produces an
 * instance that does no DOM work until `attach(el)`, which is what lets a provider own the editor
 * before any component has rendered a mount point.
 *
 * @public
 */
interface DocxEditorConfig {
    /**
     * The element the paginated surface mounts into. The surface owns this subtree.
     *
     * Optional: an instance created WITHOUT a container stashes its document bytes and does
     * no DOM work until `attach(el)` — the provider-first shape, where the editor exists
     * before any component has rendered a mount point. With a container, the document mounts
     * immediately at construction, exactly as before.
     */
    container?: HTMLElement;
    /**
     * A document to load at construction. Bytes only in practice: a `DocumentHandle` cannot
     * be re-opened (the handle is identity, not content), so passing one emits a typed
     * `error` event rather than silently loading nothing.
     */
    document?: DocumentSource;
    /**
     * Font bytes for Word-accurate (HarfBuzz-shaped) line wrap and pagination. Omitted,
     * layout falls back to a fixed-width estimate; fonts embedded in the document are
     * wired in automatically either way. For Word's default faces (Calibri, Times New
     * Roman, …) pass `await loadDefaultFonts()` from `@docx-editor.dev/fonts` — a bare
     * fragment (`{ sources, substitutions }`) is accepted and composed with defaults, or
     * merge several origins yourself with `composeFontConfiguration`. Sampled per load;
     * failures degrade to the fixed measurer and report through `onFontError`.
     *
     * Pass a {@link FontResolver} instead to resolve ON DEMAND: the function is called once
     * per load, after the document is parsed, with the families it actually declares, and
     * only what it returns is loaded. A document naming nothing the resolver covers costs
     * nothing. Note that a fetching resolver makes opening a document perform network
     * requests — the engine never supplies one, so that stays your call.
     */
    fonts?: FontConfiguration | FontConfigurationFragment | FontResolver;
    author?: string;
    locale?: string;
    /** Localized drawing refusal labels; defaults to English when omitted. */
    translate?: (key: string, params?: Record<string, string | number>) => string;
    /**
     * Capability modules to register — the seam `@docx-editor.dev/pro` plugs in
     * through. Omitted, the editor runs the free tier: lossless round-trip,
     * final-state revision rendering, review chrome disabled with the engine's
     * reason. See {@link EditorModule}.
     */
    modules?: readonly EditorModule[];
    /** `'view'` refuses every mutating command through the facade; default `'edit'`. */
    mode?: 'edit' | 'view';
    /** Override raster decode for insert/replace image commands; defaults to browser/headless. */
    imageDecodePort?: ImageDecodePort;
    /**
     * The scale to open at, as a fixed number.
     *
     * Supplying one also picks the mode: an editor given a `zoom` and no `zoomMode` opens
     * FIXED at that value and stays there. An embedder that pinned 100% keeps 100%.
     */
    zoom?: number;
    /**
     * Where the scale comes from. Defaults to `'auto'` — fit the page width, between 50% and
     * 100% — unless {@link DocxEditorConfig.zoom} is supplied, which means fixed.
     *
     * `'auto'` leaves a window wide enough for the sheet exactly where it is today and shrinks
     * a narrower one instead of growing a horizontal scrollbar. Pass `{ type: 'fixed' }` for
     * the old unconditional behaviour.
     */
    zoomMode?: ZoomMode | 'auto';
    onFontError?: (error: EditorFontError) => void;
    /** Localized labels for table insertion furniture on the painted surface. */
    tableInteractionLabel?: (key: 'table.insertRowBelow' | 'table.insertColumnRight') => string;
}
/**
 * Which measurer the current document's layout runs on, and whether shaped resolution is
 * still in flight. Returned by {@link DocxEditorInstance.fontMeasurement}.
 */
interface FontMeasurementState {
    /** `fixed` estimates advance widths; `shaped` measures real font bytes with HarfBuzz. */
    readonly measurer: 'fixed' | 'shaped';
    /** True while font resolution for the current document is still running. */
    readonly resolving: boolean;
    /** The shaped measurer's identity (admitted face hashes); absent while fixed. */
    readonly producer?: string;
}
/**
 * The host chrome that answers the engine's hyperlink gestures.
 *
 * A CLICK on an external link and Ctrl/Cmd+K both mean "the user wants the link UI", and the
 * engine deliberately does not know what that looks like. Registered rather than passed at
 * construction because the chrome mounts after the editor does, and it survives a document
 * reload — the surface is rebuilt, the handlers are not.
 */
interface HyperlinkChromeHandlers {
    /** A plain click on an external or inert link: show the popover at `activation.rect`. */
    readonly onPopover?: (activation: HyperlinkActivation) => void;
    /** Ctrl/Cmd+K: open insert-or-edit for the selection. */
    readonly onRequest?: () => void;
}
/**
 * The concrete facade type: the full `Editor` contract plus the instance-only surface.
 *
 * `surface`, `stateVersion`, `attach` and `detach` live HERE rather than on `Editor`:
 * they are what a store binding and a mounting host need, not what document commands
 * need. Production adapters program against `Editor` for everything else.
 */
interface DocxEditorInstance extends Editor {
    /** Bumps on mount, detach, destroy, and document reload — guards async image intents. */
    readonly mountGeneration: number;
    /**
     * The underlying paginated surface for harnesses and tests that need capabilities the
     * contract does not carry yet (select-all, node-id addressed selection).
     */
    readonly surface: PaginatedSurface | null;
    /**
     * Wire the host's hyperlink chrome to the engine's gestures — a click on an external
     * link, and Ctrl/Cmd+K. Returns an unsubscribe that restores whatever was registered
     * before, so a popover component can register in an effect and clean up in its teardown.
     *
     * Instance-only, like `surface`: it is what a MOUNTING host needs, not what a document
     * command needs.
     */
    setHyperlinkChrome(handlers: HyperlinkChromeHandlers): Unsubscribe;
    /**
     * Monotonic version of the observable editor state. Bumps whenever anything
     * `snapshot()` reports could have moved — a committed change, a selection move, zoom,
     * load success or failure, attach/detach, destroy. An external store (React's
     * `useSyncExternalStore`) uses it as a cheap "did anything change" signal; `snapshot()`
     * itself is cached per version and returns a stable reference between bumps.
     */
    stateVersion(): number;
    /**
     * Which measurer the current document's layout runs on, and whether shaped
     * resolution is still in flight — the honest "are wrap points Word-accurate yet?"
     * readout a host shows instead of guessing. `fixed` with `resolving: false` is the
     * steady state for a document with no usable font source (the documented zero-config
     * fallback); `shaped` means HarfBuzz measurement over real font bytes. Changes bump
     * `stateVersion()`.
     */
    fontMeasurement(): FontMeasurementState;
    /**
     * Mount into `el`. If the instance holds pending document bytes (created without a
     * container, or previously detached), they mount now — under the shaped measurer when
     * fonts have resolved in the meantime. Attaching while already mounted elsewhere moves
     * the live content via `session.save()`.
     *
     * HONEST COSTS: a mount from bytes is a fresh session — the undo stack and the caret do
     * not survive re-attach (the same cost as the async font remount). After `destroy()`
     * this is a no-op that emits a typed `error` event: a destroyed instance never remounts.
     */
    attach(el: HTMLElement): void;
    /**
     * Tear down the painted surface, stashing the CURRENT document bytes
     * (`session.save()`) so a later `attach` restores the content — but not the undo stack
     * or the caret. No-op when already detached or destroyed.
     */
    detach(): void;
}

type ImageMutationPreconditions = Readonly<{
    mountGeneration: number;
    packageRevision: number;
    drawingNodeId: string | null;
    selectionParagraphId: string;
    selectionOffset: number;
}>;
/**
 * The selected image and what may be done to it, or null when nothing image-like is selected.
 *
 * Null covers more than "no selection": a placeholder graphic, a drawing the file marks hidden,
 * and one whose `select` lock is set all read as no selection, because chrome that offered
 * resize handles on them would promise an edit the store is about to refuse.
 */
declare function selectedImageStateOf(surface: PaginatedSurface | null): SelectedImageState | null;
/**
 * Snapshot the state an image mutation was planned against: mount generation, package revision,
 * and the selection anchor.
 *
 * Taken at the START of a drag so the commit can be checked against it with
 * {@link isStaleImageInteractionCommit}. A pointer gesture spans many frames, and a document that
 * moved underneath it must not have the gesture's final coordinates applied to it.
 */
declare function captureImageMutationPreconditions(editor: Pick<DocxEditorInstance, 'surface' | 'mountGeneration'>): ImageMutationPreconditions | null;
/**
 * Whether an insert or replace would be accepted — the `can` half of the can-before-exec pair.
 *
 * Refuses in suggesting mode, since an image property edit has no tracked-change representation.
 */
declare function canExecuteImageCommand(command: Extract<EditorCommand, {
    type: 'insertImage' | 'replaceImage';
}>, surface: PaginatedSurface | null): CanResult;
/**
 * Run an insert or replace, re-checking the same gates {@link canExecuteImageCommand} applies.
 *
 * Async because image bytes must be decoded to derive their natural extent before the drawing can
 * be projected — the one editor command that cannot complete synchronously.
 */
declare function executeImageCommand(editor: DocxEditorInstance, command: Extract<EditorCommand, {
    type: 'insertImage' | 'replaceImage';
}>): Promise<ExecResult>;
/** Which of the eight resize handles a drag started from, by compass direction. */
type ImageResizeHandle = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';
/** How far one arrow-key press nudges a selected image, in points. */
declare const IMAGE_OVERLAY_NUDGE_PT = 1;
/** How far Shift+arrow nudges a selected image, in points. */
declare const IMAGE_OVERLAY_NUDGE_SHIFT_PT = 10;
/** EMUs per point. DrawingML stores extents in EMU; layout works in points. */
declare const EMU_PER_POINT = 12700;
/**
 * One in-flight image drag: where it started, and everything needed to decide at commit time
 * whether the document still describes what the gesture was planned against.
 *
 * Both revisions are captured because they move independently — layout can re-flow without the
 * package changing, and vice versa.
 */
interface ImageInteractionSession {
    readonly drawingNodeId: string;
    readonly startBounds: {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
    };
    readonly startWidthEmu: number;
    readonly startHeightEmu: number;
    readonly startPosition: DrawingPositionInput | null;
    readonly anchorFrameOrigin: {
        readonly x: number;
        readonly y: number;
    } | null;
    readonly transform: DrawingTransform;
    readonly mode: 'move' | 'resize';
    readonly handle: ImageResizeHandle | null;
    readonly preconditions: ImageMutationPreconditions;
    readonly layoutRevision: number;
    readonly packageRevision: number;
    readonly kind: 'inline' | 'anchored';
}
/**
 * How an image drag scrolls the page when it reaches the viewport edge.
 *
 * Returns the delta ACTUALLY applied rather than the one requested, because a drag at the end of
 * the document cannot scroll further and the overlay must not move the image by a distance the
 * page did not travel.
 */
interface ImageOverlayScrollPort {
    /** Scroll by a preview delta and return the actual applied document-space delta in points. */
    scrollBy(deltaY: number): number;
}
/**
 * The painted geometry of the selected drawing, plus what the overlay is allowed to do to it.
 *
 * Carries BOTH the painted rect (points, for hit-testing and handle placement) and the stored
 * extent (EMU, for writing back), so the overlay never has to convert between the two spaces to
 * decide what it is looking at.
 */
interface SelectedDrawingOverlayTarget {
    readonly id: string;
    readonly pageIndex: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly kind: 'inline' | 'anchored';
    readonly widthEmu: number;
    readonly heightEmu: number;
    readonly position: DrawingPositionInput | null;
    readonly anchorFrameOrigin: {
        readonly x: number;
        readonly y: number;
    } | null;
    readonly transform: DrawingTransform;
    readonly canResize: boolean;
    readonly canMove: boolean;
    /** Hard lock from `noChangeAspect` — never overridden by Shift. */
    readonly aspectLocked: boolean;
}
/**
 * The painted geometry of the selected drawing, for the resize/move overlay — or null.
 *
 * Stricter than {@link selectedImageStateOf}: it also requires a COLLAPSED selection, because a
 * range that merely contains a drawing is a text selection, and drawing handles over it would
 * claim an object the user did not single out.
 */
declare function selectedDrawingOverlayTargetOf(surface: PaginatedSurface | null): SelectedDrawingOverlayTarget | null;
/** Points to EMU, rounded — EMUs are integral in the file. */
declare function pointsToEmu(points: number): number;
/** EMU to points. Unrounded, so overlay geometry keeps sub-point precision during a drag. */
declare function emuToOverlayPoints(emu: number): number;
/**
 * The extent a resize drag produces, in EMU.
 *
 * Computed from the drag's START extent rather than the previous frame's, so a drag that reverses
 * direction lands exactly where it began instead of accumulating rounding error.
 *
 * `preserveAspect` behaves the way Word's handles do: a corner handle scales by whichever axis
 * moved further, while an edge handle drives the other axis from the original ratio. Both axes
 * are floored at one point, so a drag past the opposite edge cannot invert the image.
 */
declare function computeResizedImageExtentEmu(startWidthEmu: number, startHeightEmu: number, handle: ImageResizeHandle, deltaWidthPt: number, deltaHeightPt: number, preserveAspect: boolean): {
    readonly cx: number;
    readonly cy: number;
};
/**
 * The position a move drag produces, preserving the anchoring the file already used.
 *
 * A `frame`-mode position keeps its `relativeToH`/`relativeToV` bases and only shifts the offsets
 * it actually had — writing an offset the file omitted would re-anchor the drawing to a different
 * reference and move it somewhere the drag never pointed.
 */
declare function computeMovedImagePosition(start: DrawingPositionInput, deltaXPt: number, deltaYPt: number): DrawingPositionInput;
/**
 * Whether a drag's commit should be refused because the document moved under it — the refusal to
 * return, or null when the commit is still valid.
 *
 * Checks the mount generation and both revisions captured by
 * {@link captureImageMutationPreconditions}. A gesture spans many frames, so this is the one
 * place that decides its coordinates still describe the document they were measured against.
 */
declare function isStaleImageInteractionCommit(editor: Pick<DocxEditorInstance, 'surface' | 'mountGeneration'>, session: ImageInteractionSession): ExecResult | null;

/** Points → CSS pixels at the given zoom (matches `mountPaginatedSurface` / semantic paint). */
declare function surfacePaintScale(zoom: number): number;
/** Layout points to CSS pixels. Pair with {@link surfacePaintScale} for the current zoom. */
declare function layoutPointsToCssPixels(points: number, paintScale: number): number;
/** CSS pixels back to layout points — what a pointer event's coordinates must go through. */
declare function cssPixelsToLayoutPoints(pixels: number, paintScale: number): number;
/**
 * What an overlay needs to place itself over the painted pages: the zoom scale, and where each
 * page sits horizontally.
 *
 * Per-page X offsets rather than one origin, because pages are centred independently and a
 * narrower page in a mixed-size document does not start where its neighbours do.
 */
interface SurfaceOverlayCoordinates {
    readonly paintScale: number;
    readonly pageOffsetX: ReadonlyMap<number, number>;
}
/** A rectangle in one page's content frame, in layout points. */
interface OverlayFrameRect {
    readonly pageIndex: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
/** Page-content frame → sheet-space CSS pixels (matches `paintSelectionOverlay`). */
declare function overlayFrameToSheetCssPixels(layout: SemanticLayout, frame: OverlayFrameRect, coordinates: SurfaceOverlayCoordinates): {
    readonly left: number;
    readonly top: number;
    readonly width: number;
    readonly height: number;
};
/** Whether this handle drag should preserve aspect ratio. */
declare function resizePreservesAspect(handle: ImageResizeHandle, aspectLocked: boolean, shiftKey: boolean): boolean;
/**
 * Where an anchored drawing's positioning frame begins, in layout points.
 *
 * An anchored drawing's offsets are relative to a base the file names (page, margin, column, …),
 * so a move drag needs that base's origin to turn a pointer delta into a stored offset.
 */
interface AnchorFrameOrigin {
    readonly x: number;
    readonly y: number;
}
/**
 * One resize frame: the extent to store, and the box to draw while the pointer is still down.
 *
 * Both, because they are different spaces — the extent is EMU for the file, the preview is
 * points for the overlay — and computing them separately would let the handle drift from the
 * rectangle it is dragging.
 */
interface ImageResizeResult {
    readonly widthEmu: number;
    readonly heightEmu: number;
    readonly previewBounds: {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
    };
    readonly position: DrawingPositionInput | null;
}
/**
 * Resolve one resize frame from the pointer's current position.
 *
 * Handles rotation and flips by mapping the SCREEN-space handle back to the drawing's local axes
 * first: dragging the visually-right handle of a 90°-rotated image must change its stored height,
 * and a flipped image's handles move in the opposite direction from where they appear.
 */
declare function computeImageResizeResult(options: {
    readonly handle: ImageResizeHandle;
    readonly startWidthEmu: number;
    readonly startHeightEmu: number;
    readonly startBounds: {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
    };
    readonly startPosition: DrawingPositionInput | null;
    readonly anchorFrameOrigin?: AnchorFrameOrigin | null;
    readonly deltaXPt: number;
    readonly deltaYPt: number;
    readonly transform: DrawingTransform;
    readonly preserveAspect: boolean;
    readonly kind: 'inline' | 'anchored';
}): ImageResizeResult;
/**
 * An {@link ImageOverlayScrollPort} over a real scroll container.
 *
 * Reports the delta the element ACTUALLY scrolled, converted back to points — at the end of the
 * document that is less than asked for, and the overlay must not move the image further than the
 * page travelled.
 */
declare function createImageOverlayScrollPort(scroller: HTMLElement, paintScale: number): {
    scrollBy(deltaYPoints: number): number;
};
/**
 * The committed result of a whole drag, recomputed from the release coordinates.
 *
 * Recomputed rather than accumulated from the per-frame previews, so rounding applied once per
 * frame cannot add up into a final extent that differs from where the pointer actually stopped.
 */
interface FinalizedImageOverlayInteraction extends ImageResizeResult {
    readonly position: DrawingPositionInput | null;
}
/** Recompute the committed overlay result from release pointer coordinates. */
declare function finalizeImageOverlayInteraction(options: {
    readonly session: ImageInteractionSession;
    readonly deltaXPt: number;
    readonly deltaYPt: number;
    readonly accumulatedScrollPt: number;
    readonly aspectLocked: boolean;
    readonly shiftKey: boolean;
    readonly anchorFrameOrigin: AnchorFrameOrigin | null;
}): FinalizedImageOverlayInteraction;

/**
 * How an edit is written.
 *
 * `'suggest'` is the one that changes what the ops MEAN: the same keystroke becomes a `w:ins`
 * and the same Backspace becomes a `w:del` over the words it would have removed. `'view'`
 * refuses edits outright.
 */
type SurfaceEditingMode = 'edit' | 'suggest' | 'view';
/**
 * Content-control interaction lane on the paginated surface.
 *
 * Chrome toggles are surface state; value / remove commit through tree ops.
 */
interface ContentControlOps {
    /** Toggle show-all boundary chrome. No layout reflow. */
    setShowAll(show: boolean): void;
    /** Toggle form-fill Tab navigation mode. */
    setFormFill(active: boolean): void;
    /** Whether show-all chrome is on. */
    showAll(): boolean;
    /** Whether form-fill navigation is on. */
    formFill(): boolean;
    /** Innermost control at the caret from layout boundary records. */
    atCaret(): ContentControlBoundaryRecord | null;
    /**
     * Move to the next or previous editable control (tabIndex, then document order).
     *
     * Skips content-locked and bound controls. Selects the control's content for replacement.
     * Returns whether navigation landed somewhere.
     */
    navigate(direction: 'next' | 'previous'): boolean;
    /**
     * Set a control's value through `setContentControlValue`. Honours lock / bound refusals.
     * Returns whether the op committed.
     */
    setValue(controlId: string, value: string): boolean;
    /**
     * Unwrap a control keeping its content (`removeContentControl`). Defaults to the control
     * at the caret. Returns whether the op committed.
     */
    remove(controlId?: string): boolean;
    /**
     * Engine reason a widget or remove action is disabled, or null when allowed.
     *
     * `edit` covers content / value changes; `remove` covers unwrap.
     */
    disabledReason(controlId: string, action: 'edit' | 'remove'): string | null;
}
/**
 * How a paginated surface opens. Every field is optional.
 *
 * `measurer` is the injection seam that keeps layout DOM-free — supply one to lay a document out
 * on a server, or leave it off in a browser to get the canvas measurer.
 */
interface PaginatedSurfaceOptions {
    readonly measurer?: TextMeasurer;
    /** Ambient author for tracked edits. Required before suggesting can write anything. */
    readonly author?: string;
    /** Opening mode; changeable at runtime with `setEditingMode`. */
    readonly editingMode?: SurfaceEditingMode;
    /**
     * Identifies the measurer for cache invalidation.
     *
     * Fonts resolve asynchronously, so a host that swaps its measurer must change this or the
     * cached pre-font layout is served for the rest of the session.
     */
    readonly producer?: string;
    /**
     * Maps a document-declared font family to the alias its registered bytes live under, so
     * painted runs can use embedded glyphs without the file's family name entering the
     * page-global CSS font namespace.
     */
    readonly fontAlias?: (family: string) => string | undefined;
    /** Points to CSS pixels. */
    readonly scale?: number;
    /**
     * How revisions project into layout and paint. Omitted keeps the layout default
     * (`all-markup`). The editor facade passes `proposed` when no review module is
     * registered — the free tier's final-state rendering; the machinery below this
     * option is shared either way.
     */
    readonly revisionDisplayMode?: RevisionDisplayMode;
    /**
     * When a field's result wears Word's grey shading. Omitted keeps Word's own default,
     * `when-selected`.
     *
     * Applies to ORDINARY fields only. Legacy form fields follow the document's
     * `w:doNotShadeFormData`, because a form's blanks are the document's own statement about
     * itself rather than a reader's preference.
     *
     * A paint-level option, not a layout one: it changes no geometry, so switching it repaints
     * without remeasuring a single line.
     */
    readonly fieldShading?: FieldShadingMode;
    /**
     * The review module's derivation hooks for this surface's session. Absent,
     * `session.reviewItems()` is the typed empty queue and every review affordance
     * built on it stays inert.
     */
    readonly reviewModel?: ReviewModuleContribution;
    /**
     * The family a run with no authored font is reported as by `formatting()` AND painted
     * in — the face the measurer falls back to. Absent, such a run reports
     * `fontFamily: null` and paints in whatever font the page inherits, which the measurer
     * did not measure: visible glyphs drift from wrap points and caret geometry.
     */
    readonly defaultFontFamily?: string;
    /**
     * Who resolves a pointer to a caret.
     *
     * `'engine'` (the default) answers from the layout records, which is what makes a click in
     * a margin, an indent or a cell's padding land where it was aimed. `'native'` binds no
     * pointer handlers and leaves the browser's own caret placement in charge.
     */
    readonly pointer?: 'engine' | 'native';
    readonly onChange?: (state: PaginatedSurfaceState) => void;
    /**
     * A plain click on an external (or inert) hyperlink, for a host to open its popover with.
     *
     * Absent means such a click does nothing. That is deliberate: a host with no popover
     * mounted must not have clicks silently opening tabs, and the popover is the only path to
     * activation (see the navigation module's single `window.open` gate).
     */
    readonly onHyperlinkPopover?: (activation: HyperlinkActivation) => void;
    /**
     * Ctrl/Cmd+K — Word's Insert Hyperlink. The engine reports the request; the host's chrome
     * decides what a link dialog looks like. A host that passes nothing leaves the key alone
     * rather than doing something surprising with it.
     */
    readonly onRequestHyperlink?: () => void;
    /**
     * Localized accessible names for core-owned table insertion furniture.
     * Defaults to English from `@docx-editor.dev/i18n` when omitted.
     */
    readonly tableInteractionLabel?: (key: 'table.insertRowBelow' | 'table.insertColumnRight') => string;
    /** Localized drawing refusal labels; defaults to English when omitted. */
    readonly drawingStrings?: DrawingPaintStrings;
    /** Override raster decode for package image intents; defaults to browser/headless. */
    readonly imageDecodePort?: ImageDecodePort;
    /**
     * Localized name for a generated TOC, written as the control's `w:alias` on insert.
     *
     * The update ACTIONS are not here: they are rows in the host's context menu, which owns
     * its own labels. The engine paints no menu of its own.
     */
    readonly tocLabels?: {
        readonly title: string;
    };
}
/**
 * What the selection is currently formatted as.
 *
 * A value is present only when EVERY span in the selection agrees on it: a selection running
 * from 11pt into 14pt has no font size, and a toolbar should show a blank rather than pick
 * one of the two and imply the whole selection is that.
 */
interface SurfaceFormatting {
    readonly bold: boolean;
    readonly italic: boolean;
    readonly underline: boolean;
    readonly strikethrough: boolean;
    readonly superscript: boolean;
    readonly subscript: boolean;
    readonly fontFamily: string | null;
    /** Half-points, the unit OOXML stores and the picker expects. */
    readonly fontSizeHalfPoints: number | null;
    readonly color: string | null;
    readonly highlight: string | null;
    readonly alignment: 'left' | 'center' | 'right' | 'both' | null;
    readonly styleId: string | null;
    /**
     * `w:spacing`'s line rule and its value: LINES for `multiple`, points for the other two
     * (`w:line` is 240ths of a line under `auto` and twentieths of a point otherwise).
     * Null when the selection's paragraphs disagree, or state no line spacing at all.
     */
    readonly lineSpacing: {
        readonly rule: 'multiple' | 'exact' | 'atLeast';
        readonly value: number;
    } | null;
    /** `w:spacing/@w:before` and `@w:after` in points, null when the selection disagrees. */
    readonly spaceBeforePt: number | null;
    readonly spaceAfterPt: number | null;
    /**
     * Effective indent at the selection, in twips, or null with no selection or inside a
     * table.
     *
     * The one field here that does NOT go null on disagreement: the values are the FIRST
     * touched paragraph's and `mixed` reports the disagreement per field, because a ruler
     * must draw its handles somewhere and Word draws them at the first selected paragraph.
     */
    readonly indent: IndentFormatting | null;
}
/**
 * Where the last pass spent its time, and how much work it actually did.
 *
 * The durations are the surface's own three phases — layout, paint, selection sync — timed
 * separately because they fail separately: a full relayout, a full repaint and a forced
 * reflow each have a different fix. The counters come free from machinery that already
 * exists: the layout session says how much was re-placed versus reused, and the scheduler
 * says how often work was thrown away as stale. `placed` equal to `total` on every
 * keystroke is the one-glance sign that incremental layout is not engaging.
 */
interface PaginatedSurfacePerf {
    /** Time the last layout pass took, in milliseconds. */
    readonly layoutMs: number;
    /** Time the last paint took — building and swapping the page DOM. */
    readonly paintMs: number;
    /** Time the last selection sync took — writing the model selection into the browser. */
    readonly selectionMs: number;
    /** Paragraphs the last pass re-placed, against the number in the document. */
    readonly placed: number;
    readonly total: number;
    /** Pages carried over from the previous layout without being rebuilt. */
    readonly reusedPages: number;
    /** Passes that could not resume and laid the document out from the top. */
    readonly fullPasses: number;
    /** Layouts discarded because the model had already moved on. */
    readonly staleDiscards: number;
    /** Cooperative runs abandoned mid-flight for a newer revision. */
    readonly cancelledRuns: number;
}
/** How a reveal places its target in the viewport. */
interface RevealOptions {
    /**
     * `'start'` puts the target near the top (a heading the user jumped to), `'center'`
     * centres it, `'nearest'` scrolls only when it is out of view — and only far enough to
     * clear the edge, which parks the target flush against it. `'centerIfNeeded'` is the one
     * a jump-to-next-thing control wants: silent while the target is already on screen, and
     * centred when it has to move, so the reader lands looking AT the thing rather than at
     * the bottom line of the window. Default `'start'`.
     */
    readonly block?: 'start' | 'center' | 'centerIfNeeded' | 'nearest';
    /** Padding above the target, in CSS pixels. Default 24. */
    readonly offsetPx?: number;
    readonly behavior?: ScrollBehavior;
}
/**
 * Everything observable about the surface right now, as one immutable value.
 *
 * `revision` is the change token: it moves whenever anything else here does, which is what lets
 * `snapshot()` hand back the same reference until state actually changes.
 */
interface PaginatedSurfaceState {
    readonly revision: number;
    readonly pageCount: number;
    readonly selection: SemanticSelection;
    /**
     * The rectangle of table cells a drag across cells selected, or null.
     *
     * `selection` always holds the equivalent TEXT range, so a reader that does not care about
     * rectangles needs no branch. This is for the ones that do — the highlight, and table
     * commands that act on cells rather than characters.
     */
    readonly cellSelection: CellSelection | null;
    readonly canUndo: boolean;
    readonly canRedo: boolean;
    readonly lastRejection: string | null;
    /**
     * The typing format armed at the caret (Word's stored marks), or null.
     *
     * NOT document state — nothing is written until the next characters are typed — but it
     * IS observable state: `formatting()` reports it, so a host that reflects the toolbar
     * has to learn when it moves. Reference-stable while unchanged, so a host can compare
     * it to decide whether to re-derive. See `toggleRunProperty` for the lane itself.
     */
    readonly pendingFormat: readonly {
        readonly localName: string;
    }[] | null;
    /**
     * Content-control chrome and form-fill mode.
     *
     * Surface-owned (not document bytes). Updates report through the same `onChange` path as
     * selection moves — hosts must not maintain a parallel channel.
     */
    readonly contentControls: ContentControlSurfaceState;
    /**
     * The TOC the last right-click landed on, or null.
     *
     * A right-click deliberately does not move the caret, and a TOC refuses the caret
     * entirely, so `selection` can never say which table of contents the user is pointing at.
     * This is how a host's context menu learns it. Surface chrome, not document state.
     */
    readonly contextTocId: string | null;
    /** Timing and reuse counters for the last pass. Diagnostics, not document state. */
    readonly perf: PaginatedSurfacePerf;
}
/**
 * Observable content-control interaction state on the paginated surface.
 *
 * Boundary furniture visibility and form-fill navigation are surface chrome, not model
 * bytes — toggling them never reflows layout records.
 */
interface ContentControlSurfaceState {
    /** Show boundary chrome for every control. */
    readonly showAll: boolean;
    /** Tab / Shift+Tab navigate between editable controls. */
    readonly formFill: boolean;
    /** Innermost control containing the caret, or null. */
    readonly activeControlId: string | null;
}
/**
 * The mounted, painted, editable document — the layer `createDocxEditor` builds its contract on.
 *
 * The painted pages ARE the editable surface: they are `contenteditable`, but the DOM is a
 * picture. Browser mutations are prevented and re-expressed as tree ops, and selection maps only
 * through `data-paragraph-id`/`data-start`, never through DOM node identity.
 *
 * Every write goes through the guarded mutation path on this object. Reaching past it into
 * `session` to apply ops directly bypasses the layout invalidation and the caret bookkeeping.
 */
interface PaginatedSurface {
    readonly session: TreeDocxSession;
    storyScope(): StoryScope;
    imageDecodePort(): ImageDecodePort;
    applyDrawingOps(ops: readonly DrawingTreeDocOp[]): ReturnType<TreeDocxSession['applyTreeOps']>;
    applyImageProperties(input: ApplyImagePropertiesInput): ImageIntentResult;
    deleteImage(drawingNodeId: string): ImageIntentResult;
    insertImage(input: Omit<InsertImageInput, 'decodePort'>): Promise<ImageIntentResult>;
    replaceImage(drawingNodeId: string, bytes: Uint8Array, mime: SupportedImageMime, options: {
        readonly expectedPackageRevision: number;
        readonly commitGuard?: () => boolean;
    }): Promise<ImageIntentResult>;
    layout(): SemanticLayout;
    state(): PaginatedSurfaceState;
    /** One-based page at the caret, or at the centre of the mounted viewport. */
    currentPage(mode?: 'viewport' | 'caret'): number;
    type(text: string): void;
    /**
     * Insert text whose newlines are PARAGRAPH BOUNDARIES, in one commit.
     *
     * `type` writes its argument into run text verbatim, so a newline reaching it is a
     * control character the store refuses — which vetoes the whole transaction and makes
     * the insert do nothing at all. This is the lane for text that arrives from outside the
     * editor (a paste, a drop), where line breaks are structure rather than characters.
     *
     * Plain text only, by construction: no markup is parsed and no DOM is built from the
     * payload, whatever its origin.
     */
    insertPlainText(text: string): void;
    deleteBackward(): void;
    /** Delete forward — the Delete key, and `deleteContentForward` from an IME. */
    deleteForward(): void;
    /** Delete to the previous word boundary — Alt/Ctrl+Backspace. */
    deleteWordBackward(): void;
    /** Delete to the next word boundary — Alt/Ctrl+Delete. */
    deleteWordForward(): void;
    splitParagraph(): void;
    /** A tab character as a `w:tab` element, not a literal tab in the run text. */
    insertTab(): void;
    /** A `w:br` — Shift+Enter, a line break inside the same paragraph. */
    insertLineBreak(): void;
    /** A `w:br w:type="page"` — Ctrl+Enter, a hard page break inside the paragraph. */
    insertPageBreak(): void;
    /**
     * Word's Increase/Decrease Indent, over every paragraph the selection touches.
     *
     * A NUMBERED or BULLETED paragraph changes LEVEL: `w:numPr/w:ilvl` moves by one, which
     * re-resolves its marker from `numbering.xml` — so a bullet becomes a hollow circle, a
     * `1.` becomes an `a.`, exactly as Word demotes a list item. A level the definition
     * does not declare is DECLARED on the way, with Word's default format for that depth
     * (its stock bullets and number formats cycle every three levels) — a definition that
     * stops at `ilvl 0` never blocks the press. Everything else moves its `w:ind/@left` by
     * one default tab stop, never past the margin.
     *
     * Answers whether anything changed, so a caller can fall back (Tab inserting a tab
     * where there is no list to demote).
     */
    adjustIndent(direction: 'increase' | 'decrease'): boolean;
    /**
     * Set indent to exact values on every paragraph the selection touches — what a ruler
     * drag and an indent spinner both need, where {@link adjustIndent} only steps.
     *
     * Twips. Omitting a field leaves it as authored; `null` CLEARS it, so the paragraph
     * falls back to its style — distinct from zero, which blocks the cascade.
     *
     * `firstLine` is ONE SIGNED offset, negative for a hanging indent; the two OOXML
     * spellings are written for it, the unused one as an explicit zero. Answers whether
     * anything was committed.
     */
    setIndent(update: {
        readonly left?: number | null;
        readonly right?: number | null;
        readonly firstLine?: number | null;
    }): boolean;
    /**
     * Whether Increase/Decrease Indent would do anything right now.
     *
     * A list item at level 0 cannot outdent and one at level 8 cannot indent — `w:ilvl`
     * has nine levels and Word greys the control out at the ends. A missing level
     * DEFINITION never disables it: `adjustIndent` declares the level as it goes. The one
     * residue: a `w:numStyleLink` definition missing the level refuses the declaration
     * (its levels belong to the linked style), so there the press is a safe no-op rather
     * than a greyed control.
     */
    canAdjustIndent(direction: 'increase' | 'decrease'): boolean;
    /**
     * Enter on an empty list item: outdent a level, or leave the list at level 0.
     *
     * Answers false when the caret is not on an empty list item, so the caller falls
     * through to an ordinary paragraph split.
     */
    exitListOnEmptyItem(): boolean;
    /** Whether the paragraph at the caret is a list item, for Tab's Word-like fallback. */
    isListParagraph(): boolean;
    /**
     * Word's Bullets and Numbering buttons.
     *
     * Turns every paragraph the selection touches into a list of `kind`, or takes them all
     * out when they are already one. The definition is created in `numbering.xml` on first
     * use — a document that has never carried a list has no numbering part at all.
     */
    toggleList(kind: 'bullet' | 'ordered'): boolean;
    /** Whether every paragraph the selection touches is already a list of `kind`. */
    isListActive(kind: 'bullet' | 'ordered'): boolean;
    /** Select the whole document. */
    selectAll(): void;
    /**
     * Turn the browser's editing affordance on the pages layer on or off.
     *
     * The facade's `mode` gates COMMANDS, which stops `exec` but not the keyboard: the pages
     * layer is `contentEditable` and binds `beforeinput` itself, so a document the facade
     * called read-only still accepted typing straight into it. Read-only has to reach the
     * surface to be true.
     */
    setEditable(editable: boolean): void;
    /**
     * Scroll a page, or the page a paragraph sits on, into view. Returns whether it
     * scrolled — false when the target is not laid out, or the surface is not inside a
     * scroll container, so a caller can tell "no such target" from "done".
     *
     * The geometry comes from the LAYOUT, never from the DOM: a page that has not been
     * materialized yet has no element to measure, and that is exactly the page a reveal is
     * usually asked for. `revealParagraph` scrolls to the paragraph's own line rather than
     * the top of its page, so a heading deep in a page lands in view.
     */
    revealPage(pageIndex: number, options?: RevealOptions): boolean;
    revealParagraph(paragraphId: string, options?: RevealOptions): boolean;
    /**
     * Scroll an exact position into view — `revealParagraph` for a caret that is not at
     * offset 0. Focus-independent and virtualization-safe like every reveal: geometry
     * comes from the layout and the target page is materialized on the way. Defaults to
     * `block: 'nearest'`, so an already-visible target never yanks the viewport.
     */
    revealPosition(position: SemanticPosition, options?: RevealOptions): boolean;
    /** Set the selection directly, for a host driving the surface programmatically. */
    setSelection(next: SemanticSelection): void;
    /**
     * Select a rectangle of table cells, or clear one with null.
     *
     * The equivalent text range is installed alongside it, so `state().selection` stays valid
     * for every reader that does not know rectangles exist.
     */
    setCellSelection(next: CellSelection | null): void;
    /**
     * Toggle a run property over the selection, e.g. `b`, `i`, `u`.
     *
     * AT A COLLAPSED CARET this ARMS the property instead of writing it — Word's stored
     * marks. Nothing reaches the document until the next characters are typed there, and
     * those take the armed format; the armed state shows in `formatting()` and in
     * `state().pendingFormat` immediately, so a toolbar reflects the press. It survives the
     * caret-preserving edits (Backspace, Delete, Enter) and IME composition, and is
     * discarded when the caret moves elsewhere or the document is undone. A property the
     * store cannot author is refused at arm time rather than left to poison the keystroke.
     */
    toggleRunProperty(localName: string, attributes?: Record<string, string>): void;
    /**
     * SET a run property over the selection, rather than toggling it.
     *
     * Font family, size and colour are values, not switches: picking Arial twice must leave
     * the text in Arial, which a toggle would not. Arms at a collapsed caret on the same
     * terms as `toggleRunProperty`.
     */
    setRunProperty(localName: string, attributes?: Record<string, string>): void;
    /**
     * Set a property on every paragraph the selection touches — alignment, style, spacing.
     *
     * `mergeAttributes` keeps the attributes the call does not name, for the properties that
     * carry several independent settings in one element: `w:spacing` holds the line rule and
     * the space before and after, so a line-spacing pick must not delete the space-before. A
     * null-valued attribute removes just that one.
     */
    setParagraphProperty(localName: string, attributes?: Record<string, string | null>, options?: {
        readonly mergeAttributes?: boolean;
    }): void;
    /**
     * Word's Clear All Formatting: direct run properties off the selected text, and every
     * paragraph the selection touches back to the default style with its direct paragraph
     * properties and mark dropped.
     *
     * Only what the document states DIRECTLY — formatting inherited from a style survives, so
     * the text falls back to its style rather than to nothing. Properties an op cannot name
     * (`w:rStyle`, `w:lang`, `w:sectPr`, `w:pBdr`) are preserved for the same reason every
     * other write preserves them.
     */
    clearFormatting(): void;
    /**
     * Formatting as it stands at the selection, for a toolbar to reflect.
     *
     * With a typing format armed at the caret this reports what the NEXT characters typed
     * will look like, not what the document holds — which is the answer a toolbar wants and
     * the one Word gives.
     */
    formatting(): SurfaceFormatting;
    /**
     * The section the document declares: page size, margins, columns, orientation.
     *
     * What a ruler is made of, and what pagination is measured against.
     */
    sectionProperties(): SectionProperties;
    /**
     * The section GOVERNING one paragraph — what a ruler or dialog reflects when the
     * caret sits in a multi-section document. Falls back to the body-level section for
     * an unknown id.
     */
    sectionPropertiesAt(paragraphId: string): SectionProperties;
    /**
     * Write section page-setup fields — size, orientation, margins — as ONE undoable
     * transaction. Twips throughout; omitted fields are left as authored. With
     * `anchorParagraphId` only that paragraph's governing section is written (Word's
     * "Apply to: This section"); without it, every section. Returns whether the write
     * committed (a hostile value is refused by the op layer).
     */
    setSectionProperties(update: {
        readonly pageWidthTwips?: number;
        readonly pageHeightTwips?: number;
        readonly orientation?: 'portrait' | 'landscape';
        readonly marginTopTwips?: number;
        readonly marginRightTwips?: number;
        readonly marginBottomTwips?: number;
        readonly marginLeftTwips?: number;
        readonly anchorParagraphId?: string;
    }): boolean;
    /**
     * Insert a next-page section break at the caret: the paragraph splits, and the head
     * ends a new section cloning the governing section's page setup — Word's Layout >
     * Breaks > Next Page. One undoable step. Returns whether the break committed.
     */
    insertSectionBreak(): boolean;
    /** The layout session, so a host or a test can see how much work a pass actually did. */
    layoutSession(): {
        readonly stats: {
            readonly placed: number;
            readonly total: number;
            readonly reusedPages: number;
        };
    };
    /**
     * The hyperlink lane: what link the caret is in, and the insert / retarget / unlink verbs.
     *
     * Every verb is one `transact`, so it is one undo step. Targets going IN are host-supplied
     * and pass the package's own URL allowlist; targets coming OUT are the sanitized
     * projection, so a caller cannot accidentally hand a refused scheme to a sink.
     */
    readonly hyperlinks: HyperlinkOps;
    /**
     * Content-control chrome, form-fill navigation, and value / remove verbs.
     *
     * Value and remove commit through `session.applyTreeOps` — the same write path as typing.
     * Show-all and form-fill are surface chrome and never reflow layout.
     */
    readonly contentControls: ContentControlOps;
    /** Whether a `rows`×`cols` table can be inserted at the caret. */
    canInsertTable(rows: number, cols: number): boolean;
    /**
     * Insert an empty `rows`×`cols` table at the caret, columns evenly dividing the content
     * width of the caret's section, and leave the caret in the first cell.
     */
    insertTable(rows: number, cols: number): boolean;
    /** Whether the addressed (or caret-local) body TOC can be refreshed. */
    canRefreshToc(tocId?: string): boolean;
    /** Whether a generated body TOC can be inserted before the caret paragraph. */
    canInsertToc(): boolean;
    /** Insert and populate a generated body TOC before the caret paragraph. */
    insertToc(): boolean;
    /** Refresh cached TOC entries and/or page numbers through the two-pass layout pipeline. */
    refreshToc(tocId?: string, mode?: 'entire' | 'pageNumbers'): boolean;
    /** Whether a body paragraph belongs to a detected TOC boundary or cached result. */
    isInsideToc(paragraphId: string): boolean;
    /**
     * Bookmark jumps and the ONE external-activation gate. A host's popover "open" action
     * calls `openExternal`; nothing else in the engine may call `window.open`.
     */
    readonly navigation: SurfaceNavigation;
    /**
     * Pin the current selection so it stays VISIBLY selected while focus is elsewhere.
     *
     * A document has one selection: the moment a panel focuses an input of its own the browser
     * takes the highlight off the text, which is when the user most needs to see what the panel
     * is about to act on. This draws the range on the engine's own overlay instead, so it
     * survives the focus move. The MODEL selection is untouched — the op the panel finally runs
     * addresses the same characters it always would.
     *
     * The pin releases itself when the caret leaves the range (either edge counts as inside),
     * which is what lets a host close its panel on "the user clicked somewhere else" without
     * every adapter reimplementing that comparison.
     */
    retainSelection(): void;
    /** Drop the pin and stop drawing it, whether or not the caret ever left. */
    releaseSelection(): void;
    /** The pinned range, or null once it was released or escaped. */
    retainedSelection(): SemanticSelection | null;
    /**
     * How edits are written right now.
     *
     * Lives on the SURFACE, not on the store. The store's write vocabulary stays explicit —
     * an op says whether it is tracked — and the surface is the one thing that knows a
     * keystroke happened, so it is the right place to decide what that keystroke becomes.
     */
    editingMode(): SurfaceEditingMode;
    setEditingMode(mode: SurfaceEditingMode): void;
    /**
     * Commit ops that came from automation, through the gate a keystroke goes through.
     *
     * The narrow entry an automation host writes with, and the reason it needs one: reaching
     * `session.applyTreeOps` past this skips the editing-mode gate entirely — a document open for
     * viewing accepts a scripted edit, and a suggesting document records one as a permanent
     * change with no proposal and no author. Here, viewing refuses, suggesting attributes, the
     * refusal reason is reported like any other, and the pages repaint from the commit.
     *
     * The ops address the story the CALLER named, whatever story the reader is in: the caller
     * identified its target before calling, so following the caret into a header would write
     * somewhere else entirely. They default to the body rather than to the reader's story.
     *
     * They arrive as a BUILDER, given a way to mint the relationship an external hyperlink names.
     * That mint changes the package outside the transaction and outside the undo stack, so it must not
     * happen until the mode has allowed the write — a link minted while the batch was still being
     * planned left its target in a read-only document's `.rels`. A builder answering null means the
     * target is one this engine will not author, and the write is refused having changed nothing.
     */
    applyAutomationOps(staged: (relate: (url: string) => string | null) => readonly TreeDocOp[] | null, scope?: StoryScope): TreeApplyResult;
    /**
     * Commit review ops — accept, reject, a new comment — through the SAME path a keystroke
     * takes: layout, paint, and a caret clamped to what the document now holds.
     *
     * Applying them straight to the session skipped all three. Rejecting an insertion left the
     * pages painting text the tree no longer had, every card anchored where it used to be, and
     * the caret past the end of the paragraph — after which every keystroke was refused with
     * `offset-out-of-range` until the user happened to click somewhere else.
     */
    commitReviewOps(run: () => {
        readonly committed: boolean;
        readonly reason?: unknown;
    }): void;
    /**
     * The layout as last PUBLISHED, without forcing pending work.
     *
     * `layout()` flushes first, which is right for a caller that is about to act on geometry
     * and wrong for one that merely decorates it. The review rail read through `layout()` and
     * so forced a synchronous full pass on every keystroke — eleven seconds per read on a
     * 2432-block document. A card whose anchor is one frame stale is invisible; the paint that
     * follows the flush republishes it.
     */
    publishedLayout(): SemanticLayout;
    /**
     * Paint-scale coordinate context for overlay chrome.
     *
     * Internal seam — not part of the public editor contract. Image overlay uses the same
     * `zoom * 96/72` scale and per-page horizontal offsets the painter applied.
     */
    overlayCoordinates(): SurfaceOverlayCoordinates;
    /**
     * The comment or tracked change the caret is in, as the painted bands report it.
     *
     * ONE source for "which item is open". The band under the text and the card beside it are
     * two views of the same answer, and deriving it twice let them disagree — the card closed
     * while the text stayed highlighted.
     */
    activeReviewKey(): string | null;
    /**
     * Close the open item until the caret next moves.
     *
     * What a click on the canvas means. The caret does not move when someone clicks the grey
     * around the page, so nothing else would ever put the item away.
     */
    dismissActiveReview(): void;
    /**
     * Revision kinds the CARET must not activate, or null for none.
     *
     * The review rail filters what it renders (structural and format cards are hidden by
     * default), but {@link activeReviewKey} used to compute over the unfiltered queue — a
     * click on tracked text under a format change activated a card the rail does not draw,
     * and nothing on screen lit up. A host that filters its list tells the surface, so the
     * band and the visible cards stay one answer.
     */
    setReviewActivationExclusions(kinds: readonly ReviewRevisionKind[] | null): void;
    /**
     * `bookmarkName -> position` over the current revision, for resolving an internal link.
     * First in document order wins a duplicate name, matching Word.
     */
    bookmarks(): BookmarkIndex;
    /** The selected text, for copy and cut. */
    selectedText(): string;
    /** Remove the selection, if any. Returns whether anything was deleted. */
    deleteSelection(): boolean;
    navigate(command: NavigationCommand, extend?: boolean): void;
    /** Reverse the last history entry and put the caret back where it was made. */
    undo(): void;
    redo(): void;
    /**
     * Refresh table insertion furniture labels without remounting or relayout.
     *
     * @public
     */
    refreshTableInteractionLabels(): void;
    focus(): void;
    /**
     * Refresh table insertion furniture labels without remounting the surface.
     *
     * @public
     */
    setTableInteractionLabel(resolver: (key: 'table.insertRowBelow' | 'table.insertColumnRight') => string): void;
    destroy(): void;
    /** Active editing view — body, or an open header/footer story by rId. */
    activeScope(): ViewScope;
    /** Activate a view scope. Returns false when a header/footer rId cannot be opened. */
    setActiveScope(scope: ViewScope): boolean;
    /**
     * Open a header/footer story for editing on the painted surface.
     * Refuses dangling / unknown relationship ids.
     */
    enterHeaderFooter(args: {
        readonly rId: string;
        readonly pageIndex?: number;
        readonly sectionIndex?: number;
        readonly kind?: 'header' | 'footer';
        readonly variant?: 'default' | 'first' | 'even';
        readonly position?: SemanticPosition;
    }): boolean;
    /** Leave furniture editing and restore the prior body selection. */
    exitHeaderFooter(): void;
    /** Chrome read-model for the open furniture scope, or null when editing the body. */
    headerFooterState(): {
        readonly editing: 'header' | 'footer' | null;
        readonly sectionIndex: number;
        readonly variant?: 'default' | 'first' | 'even';
        readonly rId?: string;
        readonly partName?: string;
        readonly inherited?: boolean;
        readonly titlePage?: boolean;
        readonly evenAndOddHeaders?: boolean;
        readonly headerDistanceTwips?: number;
        readonly footerDistanceTwips?: number;
    } | null;
    /**
     * Commit one package-level furniture lifecycle op (create/delete/link/unlink/options).
     * Flushes layout so the next enter/rebind sees the new resolution.
     */
    applyHeaderFooterLifecycle(op: {
        readonly op: 'createHeaderFooter' | 'deleteHeaderFooter' | 'linkToPrevious' | 'unlinkFromPrevious' | 'setSectionFurnitureOptions';
        readonly sectionIndex?: number;
        readonly kind?: 'header' | 'footer';
        readonly variant?: 'default' | 'first' | 'even';
        readonly titlePage?: boolean;
        readonly evenAndOddHeaders?: boolean;
        readonly headerDistanceTwips?: number;
        readonly footerDistanceTwips?: number;
    }): {
        readonly ok: true;
    } | {
        readonly ok: false;
        readonly reason: string;
    };
    /** Insert an allowlisted page field at the caret in the open HF story. */
    insertPageField(field: 'PAGE' | 'NUMPAGES' | 'SECTIONPAGES' | 'PAGE_X_OF_Y'): boolean;
    /** Insert a footnote/endnote at the body caret. */
    insertNote(noteKind: 'footnote' | 'endnote'): boolean;
    deleteNote(noteKind: 'footnote' | 'endnote', noteId: number): boolean;
    convertNote(fromKind: 'footnote' | 'endnote', noteId: number): boolean;
    convertAllNotes(fromKind: 'footnote' | 'endnote'): boolean;
    setNoteProperties(args: {
        readonly scope: 'document' | 'section';
        readonly sectionIndex?: number;
        readonly footnote?: {
            readonly numFmt?: string;
            readonly numRestart?: string;
            readonly position?: string;
            readonly numStart?: number;
        };
        readonly endnote?: {
            readonly numFmt?: string;
            readonly numRestart?: string;
            readonly position?: string;
            readonly numStart?: number;
        };
    }): boolean;
    enterNote(scopeId: string, position?: {
        paragraphId: string;
        offset: number;
    }): boolean;
    exitNote(): void;
    /** Resolved/authored note properties for the caret section — chrome read-model. */
    notePropertiesState(): NotePropertiesStateSnapshot | null;
    /** Plain-text preview for hover chrome — never returns markup. */
    notePreviewText(scopeId: string): string | null;
    /** Commit one table-command plan as a single store transaction. */
    applyTableCommandPlan(plan: TableCommandPlan): ExecResult;
}
/**
 * What opening a document produced: a mounted surface, or a refusal.
 *
 * A result rather than a throw, because every refusal here comes from FILE input — a package the
 * bounded reader rejected, a part that exceeded a limit — and a malformed upload should surface
 * as a message the host can show rather than an exception it has to catch.
 */
type OpenPaginatedResult = {
    readonly ok: true;
    readonly surface: PaginatedSurface;
} | {
    readonly ok: false;
    readonly reason: string;
    readonly detail?: string;
};

/** Material Symbol name → SVG path data (viewBox "0 -960 960 960"). */
declare const GENERATED_ICON_PATHS: Readonly<Record<string, readonly string[]>>;

/** Border target picker value — concrete scopes plus clear (`none`). */
type TableBorderTargetValue = TableBorderEdgeTarget | 'none';
/** UI draft: last active edge scope and the complete border spec to reapply. */
interface TableChromeDraft {
    readonly activeTarget: TableBorderEdgeTarget;
    readonly spec: TableBorderSpec;
}
/** The draft a table's border chrome starts from: a 1pt black single border on every edge. */
declare const DEFAULT_TABLE_CHROME_DRAFT: TableChromeDraft;
/**
 * The chrome slots that only exist while the caret is inside a table.
 *
 * A subset of `ChromeSlotId`, so these names are public API on the same terms — renaming one is
 * a breaking change.
 */
type TableChromeSlotId = 'table.borderTarget' | 'table.borderColor' | 'table.borderStyle' | 'table.borderWidth' | 'table.cellFill';
/** Every {@link TableChromeSlotId}, for iteration and for {@link isTableChromeSlot}. */
declare const TABLE_CHROME_SLOT_IDS: readonly TableChromeSlotId[];
/** Furniture insertion controls (Task 8) share this label seam. */
type TableInteractionLabelKey = 'table.insertRowBelow' | 'table.insertColumnRight';
/**
 * The English label for a furniture-insertion control.
 *
 * The FALLBACK, for a host that has not wired its own translator — adapters pass their
 * `useTranslation` result instead so the control follows the app's locale.
 */
declare function defaultTableLabel(key: TableInteractionLabelKey): string;
/** Whether a chrome slot is one of the table-only ones. Narrows the type. */
declare function isTableChromeSlot(slot: ChromeSlotId): slot is TableChromeSlotId;
/** Contextual table chrome is visible when the engine reports table context. */
declare function tableChromeVisible(table: TableContext | null | undefined): boolean;
/** One entry in the border-target picker: which edges it addresses, its icon, and its label key. */
interface TableBorderTargetOption {
    readonly value: TableBorderTargetValue;
    readonly icon: keyof typeof GENERATED_ICON_PATHS;
    /** i18n key, never a literal string — both adapters translate it themselves. */
    readonly labelKey: string;
}
/** The border-target picker's entries, in Word's own order, ending with clear. */
declare const TABLE_BORDER_TARGET_OPTIONS: readonly TableBorderTargetOption[];
/** One entry in the border-style picker, with the CSS class that draws its preview line. */
interface TableBorderStyleOption {
    readonly value: TableBorderStyle;
    readonly labelKey: string;
    /** Class on the preview swatch. Defined in the core stylesheet, which both adapters import. */
    readonly previewClass: string;
}
/** The border-style picker's entries. */
declare const TABLE_BORDER_STYLE_OPTIONS: readonly TableBorderStyleOption[];
/** One entry in the border-width picker. */
interface TableBorderWidthOption {
    /** `w:sz` — eighths of a point, as OOXML stores border widths. */
    readonly size: number;
    readonly labelKey: string;
    /** Points, for drawing the preview swatch. `size / 8`. */
    readonly previewThickness: number;
}
/** Widths in eighths of a point — Word-like presets. */
declare const TABLE_BORDER_WIDTH_OPTIONS: readonly TableBorderWidthOption[];
/**
 * What one table-chrome selection produced: the command to run, and the draft to remember.
 *
 * Both halves matter. A border picker is stateful — choosing "dashed" and then "outside" must
 * apply a dashed outside border — so each pick returns the COMPLETE spec to execute alongside the
 * draft the next pick builds on.
 */
interface TableChromePick {
    readonly command: EditorCommand;
    readonly nextDraft: TableChromeDraft;
}
/**
 * Build the engine command for one table chrome pick and the draft state after it.
 * Target picks apply the current complete spec; `none` clears the active target only.
 */
declare function applyTableChromePick(draft: TableChromeDraft, slot: TableChromeSlotId, value: unknown): TableChromePick | null;
/** Probe command for `Editor.can` — uses the draft's active target and a well-formed value. */
declare function probeTableChromeCommand(slot: TableChromeSlotId, draft?: TableChromeDraft): EditorCommand | null;
/**
 * The i18n key naming one border target, for a trigger that shows the active scope.
 *
 * Falls back to the "all" key rather than throwing: a label is chrome, and a missing one should
 * not take the toolbar down.
 */
declare function tableChromeLabelKeyForTarget(target: TableBorderEdgeTarget): string;
/** Material Symbol paths for one table chrome icon name. */
declare function tableChromeIconPaths(name: keyof typeof GENERATED_ICON_PATHS): readonly string[];

/**
 * The probe a slot uses to ask "would the engine honour this right now?" when its real
 * command needs an argument the slot itself cannot supply.
 *
 * `text.link` is the case: whether this selection could become a link is the engine's
 * question, but WHICH link is a URL field's. Chrome that owns a link UI (React's
 * `ToolbarLink`) asks with this and dispatches through that UI.
 *
 * DELIBERATELY NOT in `SLOT_COMMANDS`. Enabled state has one source, and putting the probe
 * there would enable the control in EVERY adapter — including Vue, which has grown no link
 * UI, where the result is an enabled button whose click can only be refused. A dead button
 * is the worse lie: `file.save` was a disabled control for a capability that works, and this
 * would be an enabled control for one that is not reachable. Vue's slot therefore keeps
 * reporting the honest "not wired to an editor command" until its popover lands.
 *
 * @public
 */
declare function chromeProbeForSlot(slotId: ChromeSlotId): EditorCommand | null;
/**
 * The public editor command behind one chrome slot, or `null` when the slot is
 * not wired to a command yet (parity-only chrome, or save — which is not a
 * command). The single source of command truth for both adapters.
 *
 * @public
 */
declare function commandForSlot(slotId: ChromeSlotId): EditorCommand | null;

/**
 * Build an engine command for one table chrome slot using the caller's draft state.
 *
 * @public
 */
declare function commandForTableChromeSlotValue(slotId: TableChromeSlotId, value: unknown, draft: TableChromeDraft): EditorCommand | null;
/**
 * The engine command for a VALUE-TYPED slot carrying the picked value, or `null` for a
 * slot that does not take a value.
 *
 * Two families: the run-property pickers (`font.family`, `font.size`, `text.color`,
 * `text.highlight`) resolve to `setMarkAttr`, and `styles.style` resolves to
 * `setParagraphStyle` — a paragraph styleId, not a mark. Either way the value is
 * validated by the engine's own gate (`can` refuses a malformed one with `invalidArgs`;
 * a styleId the document does not define is refused at `exec`), so a host can pass user
 * input through unmodified.
 *
 * @public
 */
declare function commandForSlotValue(slotId: ChromeSlotId, value: unknown): EditorCommand | null;
/**
 * Whether one control is enabled, and the engine's reason when it is not.
 *
 * @public
 */
interface ToolbarCommandState {
    readonly id: ChromeSlotId;
    readonly enabled: boolean;
    /** The engine's reason when disabled — surfaced as a tooltip, never invented. */
    readonly disabledReason: string | null;
    /**
     * What the control currently SHOWS, for the slots whose answer is a value rather than a
     * pressed state — the editing-mode pill, and image wrap when it lands.
     *
     * `active` cannot express this: "the mode is Suggesting" is not a boolean about one
     * command, and a parallel channel for it would be a second place a control could read its
     * own state from. Absent for every slot whose state really is just pressed-or-not.
     */
    readonly value?: string;
    /** Whether the command is currently APPLIED at the selection, from `Editor.isActive` —
     *  derived in the engine for marks and alignment, honest-false elsewhere. */
    readonly active: boolean;
}
/**
 * Enabled state for one table chrome slot using explicit draft state.
 *
 * @public
 */
declare function tableChromeToolbarState(editor: Editor | null, slot: TableChromeSlotId, draft?: TableChromeDraft): ToolbarCommandState;
/**
 * Ask the engine whether one control should be enabled.
 *
 * @public
 */
declare function toolbarCommandState(editor: Editor | null, id: ChromeSlotId): ToolbarCommandState;
/**
 * Enabled state for several controls in one pass.
 *
 * @public
 */
declare function toolbarCommandStates(editor: Editor | null, ids: readonly ChromeSlotId[]): readonly ToolbarCommandState[];
/**
 * Result of {@link runTableChromeCommand}: engine outcome plus post-pick draft on success.
 *
 * @public
 */
interface RunTableChromeCommandResult {
    readonly result: ExecResult;
    readonly nextDraft: TableChromeDraft | null;
}
/**
 * Run one table chrome pick with explicit draft state; returns the post-pick draft on success.
 *
 * @public
 */
declare function runTableChromeCommand(editor: Editor | null, slot: TableChromeSlotId, value: unknown, draft: TableChromeDraft): RunTableChromeCommandResult;
/**
 * Run a toolbar control: `can` first, then `exec` only if it said yes. Returns
 * the engine's refusal untouched when it said no, so a caller cannot mistake a
 * declined command for a no-op.
 *
 * @public
 */
declare function runToolbarCommand(editor: Editor | null, id: ChromeSlotId, 
/** The chosen value, for a slot whose command carries one (the editing-mode pill). */
value?: unknown): ExecResult;
/**
 * Save goes straight to `Editor.save()` — it is not a command.
 *
 * @public
 */
declare function runSave(editor: Editor | null): Promise<ArrayBuffer>;
/**
 * Enabled state for a table command when the caller holds the paginated surface.
 *
 * Uses the same planner-backed `tableCommandState` as `Editor.can`/`gateTableCommand`.
 * Chrome slot mapping for table controls is Task 9 — this helper is the shared
 * can-before-exec seam for arbitrary table commands.
 *
 * @public
 */
declare function tableCommandToolbarState(surface: PaginatedSurface | null, command: EditorCommand): Pick<ToolbarCommandState, 'enabled' | 'disabledReason'>;
/**
 * Run a table command: planner-backed `can` first, then `exec` only when allowed.
 *
 * @public
 */
declare function runTableCommand(editor: Editor | null, command: EditorCommand): ExecResult;

/**
 * Build an editor: the full `Editor` contract over a paginated surface.
 *
 * Construction is separate from mounting. Pass a `container` and the document mounts
 * immediately; omit it and nothing touches the DOM until `attach(el)` — the provider-first
 * shape. `detach()` remounts from the saved bytes, which resets undo and the caret.
 *
 * `snapshot()` is version-cached: the same reference until state actually moves, with
 * reference-stable sub-objects, so it is safe as a `useSyncExternalStore` source.
 *
 * @example
 * ```ts
 * const editor = createDocxEditor({ document: bytes, modules: [reviewModule()] });
 * editor.attach(element);
 * editor.on('change', () => setDirty(true));
 * ```
 *
 * @public
 */
declare function createDocxEditor(config: DocxEditorConfig): DocxEditorInstance;

export { TABLE_BORDER_STYLE_OPTIONS as $, type AnchorFrameOrigin as A, type HyperlinkOps as B, CHROME_GROUPS as C, type DocxEditorInstance as D, EMU_PER_POINT as E, type FinalizedImageOverlayInteraction as F, IMAGE_OVERLAY_NUDGE_SHIFT_PT as G, type HyperlinkActivation as H, IMAGE_OVERLAY_NUDGE_PT as I, type ImageInteractionSession as J, type ImageOverlayScrollPort as K, type ImageResizeHandle as L, type ImageResizeResult as M, type LoadFontsRequest as N, type OpenPaginatedResult as O, type PaginatedSurfaceOptions as P, type LoadFontsResult as Q, MAX_RESOLVER_FAMILIES as R, type OverlayFrameRect as S, type TableCommandPlan as T, type PaginatedSurfaceState as U, type RunTableChromeCommandResult as V, type SelectedDrawingOverlayTarget as W, type SurfaceFormatting as X, type SurfaceHyperlink as Y, type SurfaceNavigation as Z, type SurfaceOverlayCoordinates as _, type PaginatedSurface as a, TABLE_BORDER_TARGET_OPTIONS as a0, TABLE_BORDER_WIDTH_OPTIONS as a1, TABLE_CHROME_SLOT_IDS as a2, type TableBorderStyleOption as a3, type TableBorderTargetOption as a4, type TableBorderTargetValue as a5, type TableBorderWidthOption as a6, type TableChromeDraft as a7, type TableChromePick as a8, type TableChromeSlotId as a9, finalizeImageOverlayInteraction as aA, formattingBarChromeGroups as aB, isStaleImageInteractionCommit as aC, isTableChromeSlot as aD, layoutPointsToCssPixels as aE, loadFonts as aF, overlayFrameToSheetCssPixels as aG, pointsToEmu as aH, probeTableChromeCommand as aI, resizePreservesAspect as aJ, runSave as aK, runTableChromeCommand as aL, runTableCommand as aM, runToolbarCommand as aN, selectedDrawingOverlayTargetOf as aO, selectedImageStateOf as aP, surfacePaintScale as aQ, tableChromeIconPaths as aR, tableChromeLabelKeyForTarget as aS, tableChromeToolbarState as aT, tableChromeVisible as aU, tableCommandToolbarState as aV, toolbarCommandState as aW, toolbarCommandStates as aX, type TableInteractionLabelKey as aa, type ToolbarCommandState as ab, WORD_DEFAULT_FONT as ac, applyTableChromePick as ad, blankDocumentBytes as ae, canExecuteImageCommand as af, captureImageMutationPreconditions as ag, chromeControlCount as ah, chromeMenuSlots as ai, chromeProbeForSlot as aj, chromeSlotId as ak, commandForSlot as al, commandForSlotValue as am, commandForTableChromeSlotValue as an, composeFontConfiguration as ao, computeImageResizeResult as ap, computeMovedImagePosition as aq, computeResizedImageExtentEmu as ar, createDocxEditor as as, createFontSource as at, createImageOverlayScrollPort as au, cssPixelsToLayoutPoints as av, defaultChromeGroups as aw, defaultTableLabel as ax, emuToOverlayPoints as ay, executeImageCommand as az, CHROME_MENUS as b, CHROME_UNAVAILABLE_KEY as c, type ChromeControl as d, type ChromeControlId as e, type ChromeControlState as f, type ChromeGroup as g, type ChromeGroupId as h, type ChromeMenu as i, type ChromeMenuEntry as j, type ChromeMenuId as k, type ChromeMenuItemEntry as l, type ChromeMenuSeparatorEntry as m, type ChromeMenuSubmenuEntry as n, type ChromeSlotId as o, DEFAULT_TABLE_CHROME_DRAFT as p, type DocxEditorConfig as q, type FontConfigurationBase as r, type FontConfigurationFragment as s, type FontLoadFailure as t, type FontLoadFailureReason as u, type FontMeasurementState as v, type FontResolutionRequest as w, type FontResolver as x, type FontUrlSource as y, type HyperlinkChromeHandlers as z };
