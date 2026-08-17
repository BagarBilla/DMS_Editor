import * as react from 'react';
import react__default, { CSSProperties, ReactNode, ReactElement, ForwardRefExoticComponent, RefAttributes, HTMLAttributes, Ref } from 'react';
import { DocumentSource, FontConfiguration, ZoomMode, Editor, DocumentChange, EditorFontError, TextMatch, ViewScope, DocumentHandle, EditorCommand, EditorScope, ExecResult, EditorSnapshot, EditorEvents, PageSetup, IndentFormatting, ColorValue, Theme } from '@docx-editor.dev/core/contracts/editor';
export { Editor, EditorCommand, EditorFontError, EditorFontErrorCode, EditorQuery, EditorScope, EditorSnapshot, FontConfiguration, FontFaceRequest, FontSource, FontSourceSubstitution, PageSetup } from '@docx-editor.dev/core/contracts/editor';
import { FontConfigurationFragment, FontResolver, EditorModule, ImageDecodePort, ChromeSlotId, SupportedImageMime, TableChromeSlotId, ChromeMenuId, ChromeMenuEntry, DocxEditorInstance, SurfaceHyperlink, ImageWrapTarget, TextMeasurer, PaginatedSurfaceState, NavigationCommand, SurfaceFormatting, SectionProperties, RulerIndent } from '@docx-editor.dev/core/editor';
export { CHROME_GROUPS, CHROME_MENUS, ChromeMenu, ChromeMenuEntry, ChromeMenuId, ChromeMenuItemEntry, ChromeMenuSeparatorEntry, ChromeMenuSubmenuEntry, ChromeSlotId, FontConfigurationBase, FontConfigurationFragment, FontLoadFailure, FontLoadFailureReason, FontResolutionRequest, FontResolver, FontUrlSource, ImageWrapTarget, LoadFontsRequest, LoadFontsResult, MAX_RESOLVER_FAMILIES, PX_PER_CM, PX_PER_INCH, RulerTick, RulerUnit, ToolbarCommandState, WORD_DEFAULT_FONT, chromeMenuSlots, commandForSlot, composeFontConfiguration, createFontSource, generateRulerTicks, loadFonts, rulerPageBox, runToolbarCommand, toolbarCommandState } from '@docx-editor.dev/core/editor';
import { TFunction, Translations } from '@docx-editor.dev/i18n';
import { ContentControlType, ContentControlSummary } from '@docx-editor.dev/core';
export { DocxDocument } from '@docx-editor.dev/core/contracts/types';

/** Props for `DocxEditor.Content`. @public */
interface DocxEditorContentProps {
    /** Appended after the load-bearing `docx-paginated-surface` class. */
    className?: string;
}
/**
 * The element the engine paints pages into. Must render inside a
 * `DocxEditor.Viewport`; the facade attaches here and detaches on unmount (stashing
 * the live document bytes, so remounting elsewhere restores the content).
 *
 * Its centring margin lives in the STYLESHEET, not in an inline style here, and behind
 * `:where()` so it carries no specificity: a host that places the page itself — inside its
 * own stage, beside its own art — overrides it with a plain class and no `!important`. An
 * inline style could not be beaten by a class at all, which is exactly the trap that makes
 * a library feel like something to fight.
 *
 * @public
 */
declare function DocxEditorContent({ className }: DocxEditorContentProps): react.JSX.Element;

/** Props for `DocxEditor.Loading`. @public */
interface DocxEditorLoadingProps {
    /**
     * An extra host-owned condition, OR-ed with the editor's own. OPTIONAL: the default
     * already holds the screen up while the editor has nothing painted, including a
     * `DocxEditor.Root` mounted before its document arrives. Pass this for state the
     * editor cannot see — bytes still downloading, fonts not settled — when you mount the
     * provider only after those resolve.
     */
    when?: boolean;
    /** Appended after the load-bearing `docx-editor docx-editor__loading` classes. */
    className?: string;
    /** Inline styles for the loading container, as on `DocxEditor.Viewport`. */
    style?: CSSProperties;
    /**
     * The loading screen. Omitted, a neutral spinner rendered from the `--doc-*` tokens is
     * used, so the batteries-included path has something to show. Compose your own around
     * `DocxEditor.Loading.Spinner` to keep the packaged indicator beside your own copy.
     */
    children?: ReactNode;
}
/** Props for `DocxEditor.Loading.Spinner`. @public */
interface DocxEditorLoadingSpinnerProps {
    /** Appended after the load-bearing `docx-editor__loading-spinner` class. */
    className?: string;
}
/**
 * The packaged spinner, on its own. Exposed because `children` replaces the default
 * screen wholesale — a host that wants "spinner plus my own label" would otherwise have
 * to hand-copy an internal class name.
 *
 * Decorative: it carries `aria-hidden`, so the surrounding live region needs its own
 * text. `DocxEditor.Loading` supplies a translated one when you pass no children.
 *
 * @public
 */
declare function DocxEditorLoadingSpinner({ className }: DocxEditorLoadingSpinnerProps): react.JSX.Element;
/**
 * The loading part with the packaged spinner attached as a static.
 *
 * @public
 */
interface DocxEditorLoadingComponent {
    /** Renders the loading screen, or nothing once a document is available. */
    (props: DocxEditorLoadingProps): ReactNode;
    /** The packaged indicator, for composing into custom children. */
    readonly Spinner: typeof DocxEditorLoadingSpinner;
}
/**
 * Renders its children while the editor is still waiting for a document, and nothing
 * once one is available. No condition to wire up in the common case:
 *
 * ```tsx
 * <DocxEditor.Root document={bytes}>
 *   <DocxEditor.Loading>
 *     <MySpinner />
 *   </DocxEditor.Loading>
 *   <DocxEditor.Viewport>
 *     <DocxEditor.Content />
 *   </DocxEditor.Viewport>
 * </DocxEditor.Root>
 * ```
 *
 * It clears as soon as bytes are handed over — NOT when pages finish painting — so it is
 * safe to gate a `DocxEditor.Content` on, and an unmounted viewport does not bring it
 * back. A parse failure clears it too, so a broken document never spins forever; report
 * that from `snapshot().parseError` or the `error` event. Add `when` only for async the
 * editor cannot observe, typically a host that mounts the provider after its own fetch.
 *
 * Rendered OUTSIDE a `DocxEditor.Root` it always shows, because there is no editor to
 * report otherwise — the same rule `useEditorState` documents for a null editor. Place
 * it inside the provider unless a permanently-visible placeholder is what you want.
 *
 * Carries its own `docx-editor`, so the theme tokens resolve wherever it is composed.
 *
 * @public
 */
declare const DocxEditorLoading: DocxEditorLoadingComponent;

/**
 * Props for `DocxEditor.Root`. Creation parameters (`document`, `fonts`, `author`,
 * `locale`, and the initial `mode`/`zoom`) are sampled when the instance is created;
 * only `document` and `fonts` identity remount it. Later `mode` and `zoom` changes flow through
 * `Editor.setZoom` so edits, the caret, and the undo history survive.
 *
 * @public
 */
interface DocxEditorRootProps {
    /** A document to load: DOCX bytes or an existing handle. Identity change remounts. */
    document?: DocumentSource;
    /**
     * Font bytes for Word-accurate (HarfBuzz-shaped) wrap and pagination. Omitted, layout
     * uses a fixed-width estimate; fonts embedded in the document are wired automatically
     * either way. Pass `await loadDefaultFonts()` from `@docx-editor.dev/fonts` for
     * Word's default faces — a bare fragment is accepted — or compose several origins
     * with `composeFontConfiguration`. Sampled at mount; identity change remounts;
     * failures degrade to the fixed measurer and report through `onFontError`.
     */
    fonts?: FontConfiguration | FontConfigurationFragment | FontResolver;
    author?: string;
    locale?: string;
    /** Drawing refusal labels for painted placeholders; defaults to the active locale catalogue. */
    translate?: (key: string, params?: Record<string, string | number>) => string;
    /**
     * Capability modules to register (`@docx-editor.dev/pro`'s review module,
     * custom nodes). Sampled at mount only, like `mode`: module registration is
     * construction-time in the engine.
     */
    modules?: readonly EditorModule[];
    /** `'edit'` (default) or `'view'` (read-only). Sampled at mount only. */
    mode?: 'edit' | 'view';
    /**
     * A fixed scale. Supplying one also means the mode is fixed, unless `zoomMode` says
     * otherwise: an app that pinned 100% keeps 100% on every window size.
     */
    zoom?: number;
    /**
     * Where the scale comes from. Defaults to `'auto'`: fit the page width, between 50% and
     * 100%, so a window with room for the sheet renders at 100% and a narrower one shrinks
     * rather than growing a horizontal scrollbar — down to the floor, past which it scrolls.
     *
     * A fit tracks the room beside the page, so opening the comments rail or docking the
     * navigation pane shrinks the document by what it took. Pass `{ type: 'fixed' }` to opt out.
     */
    zoomMode?: ZoomMode | 'auto';
    /** Fired once per instance, after it is published to the tree (and after any
     *  `DocxEditor.Content` in the same commit has attached its mount point). */
    onReady?: (editor: Editor) => void;
    /** Fired when the document changes (revision + identity deltas, not bytes). */
    onChange?: (change: DocumentChange) => void;
    /** Fired with the typed font failure when the shaped-font pipeline rejects. */
    onFontError?: (error: EditorFontError) => void;
    /**
     * Localized labels for table insertion furniture. When omitted, core falls back to
     * bundled English through {@link defaultTableLabel}.
     */
    tableInteractionLabel?: (key: 'table.insertRowBelow' | 'table.insertColumnRight') => string;
    /** Optional decode port for embedded image insertion and paint in tests or custom hosts. */
    imageDecodePort?: ImageDecodePort;
    children?: ReactNode;
}
/**
 * Creates and owns a `DocxEditorInstance` and provides it to the subtree. Renders no
 * DOM — compose it with `DocxEditor.Viewport` + `DocxEditor.Content` for the painted
 * pages, and any hook-built chrome anywhere inside.
 *
 * @public
 */
declare function DocxEditorRoot(props: DocxEditorRootProps): react.JSX.Element;

/** Props for `DocxEditor.Viewport`. @public */
interface DocxEditorViewportProps {
    /** Appended after the load-bearing viewport classes (e.g. `dark` for chrome theming). */
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
/**
 * The sole scroll container for the painted document. Put `DocxEditor.Content` inside
 * it; the engine discovers this element by class and manages scrolling against it.
 *
 * @public
 */
declare function DocxEditorViewport({ className, style, children }: DocxEditorViewportProps): react.JSX.Element;

/** Resolves an i18n key to display text. @public */
type ToolbarTranslate = (key: string) => string;

/** Props for `DocxEditorToolbar.Button`. @public */
interface ToolbarButtonProps$1 {
    /** The chrome slot this button drives (`'text.bold'`, `'history.undo'`, ...). */
    slot: ChromeSlotId;
    /** Icon override; falls back to `children`, then to the registry's icon paths. */
    icon?: ReactNode;
    /** Merge the button's behavior into the single child element instead of a <button>. */
    asChild?: boolean;
    className?: string;
    children?: ReactNode;
    /** Render nothing — inside the default arrangement this removes the slot. */
    hidden?: boolean;
}
/**
 * One chrome slot as a live toolbar button: enabled/active from the engine's
 * can-before-exec answer, labelled from the registry's i18n key, `data-active` /
 * `data-disabled` presence attributes for styling, `aria-pressed` on toggles.
 *
 * @public
 */
declare function ToolbarButton$1(props: ToolbarButtonProps$1): react.JSX.Element | null;
declare namespace ToolbarButton$1 {
    var docxToolbarPart: true;
}

interface ImageInsertProviderProps {
    children: ReactNode;
}
declare function ImageInsertProvider({ children }: ImageInsertProviderProps): react.JSX.Element;
/** Props for the toolbar/menu insert trigger. @public */
interface ImageInsertTriggerProps {
    className?: string;
    hidden?: boolean;
    asChild?: boolean;
    children?: ReactNode;
}
/** Toolbar insert-image control — opens the shared file picker. @public */
declare function ImageInsertTrigger({ className, hidden, asChild, children, }: ImageInsertTriggerProps): react.JSX.Element | null;
declare namespace ImageInsertTrigger {
    var docxSlot: "image.insert";
}

/** Props for `DocxEditorToolbar.ImageWrap`. @public */
interface ImageWrapProps {
    className?: string;
    hidden?: boolean;
    asChild?: boolean;
    children?: ReactNode;
}
/**
 * Wrap-text dropdown presenting all nine Word choices.
 *
 * @public
 */
declare function ImageWrap({ className, hidden, asChild, children }: ImageWrapProps): react.JSX.Element | null;
declare namespace ImageWrap {
    var docxSlot: "image.wrap";
}
/** @public */
interface ImageWrapPartComponent {
    (props: ImageWrapProps): ReactElement | null;
    readonly docxSlot: 'image.wrap';
}

/** Props for `DocxEditorToolbar.ImageAltText`. @public */
interface ImageAltTextProps {
    className?: string;
    hidden?: boolean;
    asChild?: boolean;
    children?: ReactNode;
}
/**
 * Opens a small panel to edit image description (and optional title).
 *
 * @public
 */
declare function ImageAltText({ className, hidden, asChild, children }: ImageAltTextProps): react.JSX.Element | null;
declare namespace ImageAltText {
    var docxSlot: "image.altText";
}
/** @public */
interface ImageAltTextPartComponent {
    (props: ImageAltTextProps): ReactElement | null;
    readonly docxSlot: 'image.altText';
}

/** Props for `DocxEditor.ImagePropertiesDialog`. @public */
interface DocxEditorImagePropertiesDialogProps {
    open: boolean;
    onClose: () => void;
    className?: string;
    triggerRef?: React.RefObject<HTMLElement | null>;
}
/**
 * Properties dialog for the selected picture.
 *
 * @public
 */
declare function DocxEditorImagePropertiesDialog({ open, onClose, className, triggerRef, }: DocxEditorImagePropertiesDialogProps): react.JSX.Element | null;
/** Props for the toolbar properties trigger. @public */
interface ImagePropertiesTriggerProps {
    className?: string;
    hidden?: boolean;
    asChild?: boolean;
    children?: react.ReactNode;
}
/**
 * Opens the image properties dialog for the selected drawing.
 *
 * @public
 */
declare function ImagePropertiesTrigger({ className, hidden, asChild, children, }: ImagePropertiesTriggerProps): react.JSX.Element | null;
declare namespace ImagePropertiesTrigger {
    var docxSlot: "image.properties";
}

type NormalizedImagePayload = {
    readonly ok: true;
    readonly bytes: Uint8Array;
    readonly mime: SupportedImageMime;
    readonly widthPoints: number;
    readonly heightPoints: number;
} | {
    readonly ok: false;
    /** i18n key under `imageInsert.errors.*` suitable for `t()`. */
    readonly reasonKey: string;
};
/** Preflight raster bytes for insert/replace. Never allocates from file-supplied dimensions alone. */
declare function normalizeImageBytes(bytes: Uint8Array): NormalizedImagePayload;

/** Props for the named parts (`DocxEditorToolbar.Bold`, ...): the slot is pinned. @public */
type ToolbarPartProps = Omit<ToolbarButtonProps$1, 'slot'>;
interface ToolbarPartComponent {
    (props: ToolbarPartProps): ReturnType<typeof ToolbarButton$1>;
    readonly docxSlot: ChromeSlotId;
}
/**
 * Props for the non-button parts (pickers, steppers, color splits, save). @public
 */
interface ToolbarSlotPartProps {
    className?: string;
    /** Render nothing — inside the default arrangement this removes the slot. */
    hidden?: boolean;
}
/** A non-button part pinned to one slot. @public */
interface ToolbarSlotPartComponent {
    (props: ToolbarSlotPartProps): ReturnType<typeof ToolbarButton$1>;
    readonly docxSlot: ChromeSlotId;
}
/** Props for `DocxEditorToolbar.Separator`. @public */
interface ToolbarSeparatorProps {
    className?: string;
}
/** A vertical rule between toolbar groups. @public */
declare function ToolbarSeparator({ className }: ToolbarSeparatorProps): react.JSX.Element;

/**
 * Props for the split colour controls. @public
 *
 * The one addition over a plain slot part is `icon`, and it belongs here rather than on
 * `ToolbarSlotPartProps`: the other slot parts are steppers and pickers with no single glyph
 * to replace, so an icon prop on the shared type would be a promise three of them could not
 * keep.
 */
interface ToolbarColorSplitProps extends ToolbarSlotPartProps {
    /**
     * Replaces the glyph above the colour bar — the registry's red "A" or highlighter pen.
     *
     * The BAR is not replaceable and still paints the live value, so a host swapping the glyph
     * keeps the thing that makes this control readable at a glance.
     */
    icon?: ReactNode;
}
/** A split colour control pinned to one slot. @public */
interface ToolbarColorSplitComponent {
    (props: ToolbarColorSplitProps): ReturnType<typeof ToolbarButton$1>;
    readonly docxSlot: ChromeSlotId;
}

/** The merged part is keyed by its GROUP id — it stands in for all four slots. */
interface ToolbarAlignmentComponent {
    (props: ToolbarSlotPartProps): ReturnType<typeof ToolbarAlignmentImpl>;
    readonly docxSlot: 'alignment';
}
declare function ToolbarAlignmentImpl({ className, hidden }: ToolbarSlotPartProps): react.JSX.Element | null;

/** Props for `DocxEditorToolbar.Action`. @public */
interface ToolbarActionProps {
    /**
     * Accessible name and tooltip. A resolved STRING, not an i18n key: the label belongs to
     * the host's own action, so the host's own catalogue resolves it. (Registry controls go
     * the other way — they carry keys and the toolbar's `t` resolves them.)
     */
    label: string;
    /** Icon content. Inline SVG sized ~18px matches the packaged controls. */
    icon?: ReactNode;
    /** Pressed state, for an action that toggles. Sets `aria-pressed` and `data-active`. */
    active?: boolean;
    disabled?: boolean;
    /** Tooltip when disabled — say why, the way the engine's controls do. */
    disabledReason?: string;
    onSelect?: () => void;
    /** Merge the behavior onto the single child element instead of rendering a `<button>`. */
    asChild?: boolean;
    className?: string;
    children?: ReactNode;
}
/**
 * A host-owned toolbar action, styled and behaved like the packaged controls.
 *
 * Renders inside `<DocxEditor.Toolbar>` after the default arrangement (it drives no slot,
 * so it is an appended child), or anywhere under `preset={false}`.
 *
 * @public
 */
declare function ToolbarAction(props: ToolbarActionProps): react.JSX.Element;

/** What `useFontFamily` answers. @public */
interface UseFontFamilyResult {
    /** The selection's agreed family, or null (mixed selection, or no document). */
    readonly value: string | null;
    /** Apply a family through the can-before-exec path; a refusal is a safe no-op. */
    readonly setValue: (family: string) => void;
    /**
     * The offerable font catalog (validated, deduplicated, sorted): the editor's
     * configured families merged with the document's declared ones.
     */
    readonly options: readonly string[];
    /** Whether the engine would honour a font change right now. */
    readonly isEnabled: boolean;
}
/**
 * The font-family picker's behavior, UI-free.
 *
 * @public
 */
declare function useFontFamily(): UseFontFamilyResult;
/** Props for `DocxEditorToolbar.FontFamily` and its sub-parts. @public */
interface FontFamilyPartProps {
    asChild?: boolean;
    className?: string;
    children?: ReactNode;
}
/** Props for the compound root. @public */
interface FontFamilyProps extends FontFamilyPartProps {
    /** Render nothing — inside the default arrangement this removes the slot. */
    hidden?: boolean;
}
/** Props for `FontFamily.Item`. @public */
interface FontFamilyItemProps extends FontFamilyPartProps {
    /** The family this item applies. */
    value: string;
}
declare function FontFamilyTrigger({ asChild, className, children }: FontFamilyPartProps): react.JSX.Element | null;
declare namespace FontFamilyTrigger {
    var docxToolbarPart: true;
}
declare function FontFamilyContent({ asChild, className, children }: FontFamilyPartProps): react.JSX.Element | null;
declare function FontFamilyItem({ value, asChild, className, children }: FontFamilyItemProps): react.JSX.Element | null;
/** The compound part with its sub-parts attached as statics. @public */
interface FontFamilyNamespace {
    (props: FontFamilyProps): ReactNode;
    readonly docxSlot: 'font.family';
    readonly Trigger: typeof FontFamilyTrigger;
    readonly Content: typeof FontFamilyContent;
    readonly Item: typeof FontFamilyItem;
}
declare const FontFamily: FontFamilyNamespace;

/** One pickable paragraph style, as the document defines it. @public */
interface ParagraphStyleOption {
    readonly styleId: string;
    readonly name: string;
    /**
     * How the style looks, for rendering the row in its own face. Every value arrives
     * already bounded by the engine's derivation (family against the CSS-sink shape, colour
     * against six hex digits), which is what makes it safe to put in a style object.
     */
    readonly preview: {
        readonly fontFamily: string | null;
        readonly fontSizePt: number | null;
        readonly bold: boolean;
        readonly italic: boolean;
        readonly color: string | null;
    };
}
/** What `useParagraphStyle` answers. @public */
interface UseParagraphStyleResult {
    /** The selection's agreed paragraph styleId, or null (unstyled/default, or mixed). */
    readonly value: string | null;
    /** Apply a paragraph style through the can-before-exec path; a refusal is a safe no-op. */
    readonly setValue: (styleId: string) => void;
    /**
     * The document's paragraph styles — validated ids and display names, in the engine's
     * Word-gallery order (Normal, Title, Subtitle, the headings, then everything else in
     * document order), NOT the order `styles.xml` happens to list them in.
     */
    readonly options: readonly ParagraphStyleOption[];
    /** Whether the engine would honour a style change right now. */
    readonly isEnabled: boolean;
}
/**
 * The paragraph-style picker's behavior, UI-free.
 *
 * @public
 */
declare function useParagraphStyle(): UseParagraphStyleResult;
/** Props for `DocxEditorToolbar.StylePicker` and its sub-parts. @public */
interface ParagraphStylePartProps {
    asChild?: boolean;
    className?: string;
    children?: ReactNode;
}
/** Props for the compound root. @public */
interface ParagraphStyleProps extends ParagraphStylePartProps {
    /** Render nothing — inside the default arrangement this removes the slot. */
    hidden?: boolean;
}
/** Props for `ParagraphStyle.Item`. @public */
interface ParagraphStyleItemProps extends ParagraphStylePartProps {
    /** The styleId this item applies. */
    value: string;
}
declare function ParagraphStyleTrigger({ asChild, className, children }: ParagraphStylePartProps): react.JSX.Element | null;
declare namespace ParagraphStyleTrigger {
    var docxToolbarPart: true;
}
declare function ParagraphStyleContent({ asChild, className, children }: ParagraphStylePartProps): react.JSX.Element | null;
declare function ParagraphStyleItem({ value, asChild, className, children }: ParagraphStyleItemProps): react.JSX.Element | null;
/** The compound part with its sub-parts attached as statics. @public */
interface ParagraphStyleNamespace {
    (props: ParagraphStyleProps): ReactNode;
    readonly docxSlot: 'styles.style';
    readonly Trigger: typeof ParagraphStyleTrigger;
    readonly Content: typeof ParagraphStyleContent;
    readonly Item: typeof ParagraphStyleItem;
}
declare const ParagraphStyle: ParagraphStyleNamespace;

/** Props shared by contextual table toolbar compound parts. @public */
interface TableChromePartProps {
    /** Appended to the part root class list. */
    className?: string;
    /** When true, the part renders nothing. */
    hidden?: boolean;
    /** Merge props onto the single child element instead of rendering a default host node. */
    asChild?: boolean;
    /** Custom panel body or trigger label; defaults to the packaged control chrome. */
    children?: ReactNode;
}
/** Props for a value-driven row or swatch inside a table compound menu. @public */
interface TableChromeItemProps extends TableChromePartProps {
    /** The pick value this item dispatches (target id, style name, width size, or hex without `#`). */
    value: string;
}
/**
 * Shared compound contract for menu-style table chrome parts
 * ({@link TableBorderTargetNamespace}, {@link TableBorderStyleNamespace}, {@link TableBorderWidthNamespace}).
 *
 * @public
 */
interface TableChromePartComponent extends ToolbarSlotPartComponent {
    /** The chrome slot this compound drives. */
    readonly docxSlot: TableChromeSlotId;
    /** Opens the picker menu or dialog. */
    readonly Trigger: (props: TableChromePartProps) => ReactNode;
    /** The open menu or dialog panel; omit to use the default item list. */
    readonly Content: (props: TableChromePartProps) => ReactNode;
    /** One selectable value row or swatch inside {@link Content}. */
    readonly Item: (props: TableChromeItemProps) => ReactNode;
}
/**
 * Border-target picker compound (`DocxEditor.Toolbar.TableBorderTarget`).
 *
 * @public
 */
interface TableBorderTargetNamespace extends TableChromePartComponent {
    /** Chrome slot id: `table.borderTarget`. */
    readonly docxSlot: 'table.borderTarget';
    /** Button that opens the border-edge target menu. */
    readonly Trigger: (props: TableChromePartProps) => ReactNode;
    /** Open menu listing edge scopes and clear. */
    readonly Content: (props: TableChromePartProps) => ReactNode;
    /** One edge scope or clear row inside the target menu. */
    readonly Item: (props: TableChromeItemProps) => ReactNode;
}
/**
 * Border-colour split compound with a quick-apply main button and swatch dialog
 * (`DocxEditor.Toolbar.TableBorderColor`).
 *
 * @public
 */
interface TableBorderColorNamespace extends TableChromePartComponent {
    /** Chrome slot id: `table.borderColor`. */
    readonly docxSlot: 'table.borderColor';
    /** Applies the last swatch without opening the dialog. */
    readonly Main: (props: TableChromePartProps) => ReactNode;
    /** Button that opens the border-colour swatch dialog. */
    readonly Trigger: (props: TableChromePartProps) => ReactNode;
    /** Open swatch dialog for the active border target. */
    readonly Content: (props: TableChromePartProps) => ReactNode;
    /** One colour swatch inside the border-colour dialog. */
    readonly Item: (props: TableChromeItemProps) => ReactNode;
}
/**
 * Cell-fill split compound (`DocxEditor.Toolbar.TableCellFill`).
 *
 * @public
 */
interface TableCellFillNamespace extends TableChromePartComponent {
    /** Chrome slot id: `table.cellFill`. */
    readonly docxSlot: 'table.cellFill';
    /** Applies the last swatch without opening the dialog. */
    readonly Main: (props: TableChromePartProps) => ReactNode;
    /** Button that opens the cell-fill swatch dialog. */
    readonly Trigger: (props: TableChromePartProps) => ReactNode;
    /** Open swatch dialog for the selected cell(s). */
    readonly Content: (props: TableChromePartProps) => ReactNode;
    /** One fill swatch inside the cell-fill dialog. */
    readonly Item: (props: TableChromeItemProps) => ReactNode;
}
/**
 * Border-style menu compound (`DocxEditor.Toolbar.TableBorderStyle`).
 *
 * @public
 */
interface TableBorderStyleNamespace extends TableChromePartComponent {
    /** Chrome slot id: `table.borderStyle`. */
    readonly docxSlot: 'table.borderStyle';
    /** Button that opens the border line-style menu. */
    readonly Trigger: (props: TableChromePartProps) => ReactNode;
    /** Open menu listing line styles for the active target. */
    readonly Content: (props: TableChromePartProps) => ReactNode;
    /** One line-style row inside the style menu. */
    readonly Item: (props: TableChromeItemProps) => ReactNode;
}
/**
 * Border-width menu compound (`DocxEditor.Toolbar.TableBorderWidth`).
 *
 * @public
 */
interface TableBorderWidthNamespace extends TableChromePartComponent {
    /** Chrome slot id: `table.borderWidth`. */
    readonly docxSlot: 'table.borderWidth';
    /** Button that opens the border width menu. */
    readonly Trigger: (props: TableChromePartProps) => ReactNode;
    /** Open menu listing width presets for the active target. */
    readonly Content: (props: TableChromePartProps) => ReactNode;
    /** One width preset row inside the width menu. */
    readonly Item: (props: TableChromeItemProps) => ReactNode;
}
/**
 * Resolved label for the active border target in the shared draft.
 *
 * For custom table chrome that shows the current target name outside the packaged picker.
 *
 * @public
 */
declare function useTableBorderTargetLabel(): string;

/** Props for `DocxEditor.Toolbar`. @public */
interface DocxEditorToolbarProps {
    /** Appended after the base `docx-toolbar` class. */
    className?: string;
    /** i18n resolver for control labels; without it the raw keys show (never English). */
    t?: ToolbarTranslate;
    /**
     * Handler for the `file.save` control. Save is not an engine command (`Editor.save()`
     * returns bytes the host must deliver), so without a handler the control renders
     * disabled — same contract as the Vue toolbar's `onSave`.
     */
    onSave?: () => void;
    /**
     * `false` renders children verbatim with no default arrangement. Default `true`:
     * part children override their slots in place, others append.
     */
    preset?: boolean;
    /**
     * `false` lets the bar WRAP to more rows instead of collapsing groups into the "⋯"
     * menu when it runs out of width. Default `true`.
     */
    overflow?: boolean;
    children?: ReactNode;
}
/** The toolbar with its parts attached as statics. @public */
interface DocxEditorToolbarNamespace {
    (props: DocxEditorToolbarProps): ReactNode;
    readonly Button: typeof ToolbarButton$1;
    /** A host-owned action the chrome registry does not describe. */
    readonly Action: typeof ToolbarAction;
    readonly Separator: typeof ToolbarSeparator;
    readonly Undo: ToolbarPartComponent;
    readonly Redo: ToolbarPartComponent;
    readonly Bold: ToolbarPartComponent;
    readonly Italic: ToolbarPartComponent;
    readonly Underline: ToolbarPartComponent;
    readonly Strike: ToolbarPartComponent;
    readonly Link: ToolbarPartComponent;
    readonly ClearFormatting: ToolbarPartComponent;
    readonly Superscript: ToolbarPartComponent;
    readonly Subscript: ToolbarPartComponent;
    readonly Alignment: ToolbarAlignmentComponent;
    readonly AlignLeft: ToolbarPartComponent;
    readonly AlignCenter: ToolbarPartComponent;
    readonly AlignRight: ToolbarPartComponent;
    readonly AlignJustify: ToolbarPartComponent;
    readonly LineSpacing: ToolbarSlotPartComponent;
    readonly BulletList: ToolbarPartComponent;
    readonly NumberedList: ToolbarPartComponent;
    readonly Outdent: ToolbarPartComponent;
    readonly Indent: ToolbarPartComponent;
    readonly ImageInsert: ToolbarPartComponent;
    readonly ImageProperties: ToolbarPartComponent;
    readonly ImageWrap: ImageWrapPartComponent;
    readonly ImageAltText: ImageAltTextPartComponent;
    readonly TableInsert: ToolbarPartComponent;
    /** Border-edge target picker compound for contextual table chrome. */
    readonly TableBorderTarget: TableBorderTargetNamespace;
    /** Border-colour split compound (quick-apply main + swatch dialog). */
    readonly TableBorderColor: TableBorderColorNamespace;
    /** Border line-style menu compound. */
    readonly TableBorderStyle: TableBorderStyleNamespace;
    /** Border width menu compound. */
    readonly TableBorderWidth: TableBorderWidthNamespace;
    /** Cell background fill split compound (quick-apply main + swatch dialog). */
    readonly TableCellFill: TableCellFillNamespace;
    readonly Comments: ToolbarPartComponent;
    readonly FontFamily: typeof FontFamily;
    readonly FontSize: ToolbarSlotPartComponent;
    readonly FontColor: ToolbarColorSplitComponent;
    readonly Highlight: ToolbarColorSplitComponent;
    readonly Zoom: ToolbarSlotPartComponent;
    readonly StylePicker: typeof ParagraphStyle;
    readonly EditingMode: ToolbarSlotPartComponent;
    readonly Save: ToolbarSlotPartComponent;
    readonly ContentControlShowAll: ToolbarPartComponent;
    readonly ContentControlFormFill: ToolbarPartComponent;
    readonly ContentControlInspector: ToolbarPartComponent;
    readonly ContentControlRemove: ToolbarPartComponent;
}
/**
 * The compound toolbar: `<DocxEditor.Toolbar/>` for the full working chrome, parts as
 * statics for composition (`<DocxEditor.Toolbar><DocxEditor.Toolbar.Bold/>...`).
 *
 * @public
 */
declare const DocxEditorToolbar: DocxEditorToolbarNamespace;

/**
 * A menu's identity: one of the registry's four, or a HOST'S OWN.
 *
 * The `(string & {})` arm keeps the registry ids as editor autocomplete while accepting
 * any other string, so a product can add "Review" or "Clauses" without the library having
 * to know about it. Lives here rather than in `parts` because the bar's open/active state
 * is keyed on it and both modules read that state.
 *
 * @public
 */
type MenuId = ChromeMenuId | (string & {});

/** Props for `DocxEditor.Menu.Row`: one presentational menu row. @public */
interface MenuRowProps {
    /** Material Symbols paths, rendered as inline SVG in the row's icon column. */
    icon?: ReactNode;
    /** Right-aligned shortcut text (already resolved). */
    shortcut?: string;
    disabled?: boolean;
    /**
     * Tooltip. Set it for the ENGINE's disabled reason and nothing else — a menu row's text
     * is already visible, so a tooltip repeating it is noise, and inventing a reason for a
     * refusal the engine explained is the thing this codebase does not do.
     */
    title?: string;
    /**
     * Checked state, for a row that TOGGLES (bold on bold text). Leave undefined on a row
     * that just acts: `menuitemcheckbox` with `aria-checked="false"` announces "not
     * selected" on a Page break row, which is a claim about state it does not have.
     */
    active?: boolean;
    /**
     * Present on a row belonging to a MUTUALLY EXCLUSIVE set (the four alignments), which
     * makes it `menuitemradio` rather than `menuitemcheckbox`. Four independent checkboxes
     * is a different claim from one-of-four, and a screen reader reads it as such.
     */
    selected?: true;
    /** Stable marker for hosts, tests and e2e. */
    slot?: string;
    onSelect?: () => void;
    className?: string;
    children?: ReactNode;
}
/**
 * One menu row: icon column, label, shortcut column.
 *
 * The icon column is reserved even when a row has no icon, so labels line up down the
 * panel the way Word's and Docs' menus do.
 *
 * @public
 */
declare function MenuRow(props: MenuRowProps): react.JSX.Element;
/** Props for `DocxEditor.Menu.Group`: a titled section of rows. @public */
interface MenuGroupProps {
    /** Literal heading, already resolved. Wins over {@link labelKey}. */
    label?: string;
    /** i18n key of the heading. */
    labelKey?: string;
    className?: string;
    hidden?: boolean;
    children?: ReactNode;
}
/**
 * A named section inside a panel: a visible heading and the rows under it.
 *
 * A separator says rows are apart; a group says what they are, which is what a panel needs
 * once a product adds rows beside the packaged ones. `role="group"` nests legally inside a
 * menu, keeps its rows owned by it, and takes the heading as its accessible name — so the
 * visible heading is decoration and is hidden from the tree.
 *
 * @public
 */
declare function MenuGroup({ label: literal, labelKey, className, hidden, children, }: MenuGroupProps): react.JSX.Element | null;
/** Props for `DocxEditor.Menu.Item`: one chrome slot as a menu row. @public */
interface MenuItemProps {
    /** The chrome slot this row drives (`'text.bold'`, `'insert.pageBreak'`, …). */
    slot: ChromeSlotId;
    /** Plain-label i18n key, overriding the slot's tooltip-shaped one. */
    labelKey?: string;
    /** i18n key of the shortcut shown in the right column. */
    shortcutKey?: string;
    className?: string;
    /** Render nothing — inside a packaged menu this removes the row. */
    hidden?: boolean;
}
/**
 * One chrome slot as a live menu row: enabled and active from the engine's
 * can-before-exec answer, labelled and iconed from the registry. Selecting it runs the
 * slot's command and closes the menu.
 *
 * @public
 */
declare function MenuItem({ slot, labelKey, shortcutKey, className, hidden }: MenuItemProps): react.JSX.Element | null;
declare namespace MenuItem {
    var docxMenuRow: true;
}
/** Props for the pinned File rows. @public */
interface MenuActionProps {
    className?: string;
    hidden?: boolean;
}
declare const MenuOpen: (({ className, hidden }: MenuActionProps) => react.JSX.Element | null) & {
    docxSlot: ChromeSlotId;
};
declare const MenuSave: (({ className, hidden }: MenuActionProps) => react.JSX.Element | null) & {
    docxSlot: ChromeSlotId;
};
/**
 * Page setup. Unlike open and save, the ENGINE has an opinion here — `setPageSetup` is a
 * real command, it just needs the dialog's values — so the row asks through the slot's
 * probe and is disabled with the engine's own words on a document it cannot rewrite.
 */
declare function MenuPageSetupImpl({ className, hidden }: MenuActionProps): react.JSX.Element | null;
declare const MenuPageSetup: typeof MenuPageSetupImpl & {
    docxSlot: ChromeSlotId;
};
interface MenuSubmenuProps {
    /** i18n key of the parent row's label. */
    labelKey: string;
    /** Material Symbols paths for the parent row's icon. */
    paths?: readonly string[] | null;
    className?: string;
    children?: ReactNode;
}
/**
 * A row that opens a nested panel to its right (Insert › Break).
 *
 * The parent row runs nothing — disclosure is not a command — so it stays interactive
 * regardless of what its children can do, and each child answers for itself. Opening on
 * hover AND on click is what both Word and Docs do; keyboard users get the same panel
 * through focus.
 *
 * @public
 */
declare function MenuSubmenu({ labelKey, paths, className, children }: MenuSubmenuProps): react.JSX.Element;
/** Props for `DocxEditor.Menu.TableGrid`. @public */
interface MenuTableGridProps {
    /** The slot the picked size dispatches through. Defaults to `table.insert`. */
    slot?: ChromeSlotId;
    className?: string;
}
/**
 * Word's insert-table size picker: a 6×6 grid that highlights as the pointer sweeps it
 * and reads back the size underneath.
 *
 * Rendered only when the engine will honour an insert (see `MenuTablePicker`). A panel
 * that opens onto a grid nothing can be picked from is worse than no panel: the row
 * cannot act, so it should not disclose — it should look disabled, like every other row
 * the engine refuses.
 *
 * @public
 */
declare function MenuTableGrid({ slot, className }: MenuTableGridProps): react.JSX.Element;
/** Props for `DocxEditor.Menu.Separator`. @public */
interface MenuSeparatorProps {
    className?: string;
}
/** A horizontal rule between groups of rows. @public */
declare function MenuSeparator({ className }: MenuSeparatorProps): react.JSX.Element;
/**
 * One registry entry as its row.
 *
 * The three host-boundary slots route to their pinned parts rather than to the generic
 * `MenuItem`, because a command-driven row would render them permanently disabled — the
 * engine reports, correctly, that neither open nor save is a command.
 */
declare function MenuEntry({ entry }: {
    entry: ChromeMenuEntry;
}): react.JSX.Element;
/** Props for `DocxEditor.Menu.Menu` and the four pinned menu parts. @public */
interface MenuProps {
    /** Which menu this is. Only one panel in the bar is open at a time, keyed on this. */
    id: MenuId;
    /** i18n key of the trigger label. Defaults to the registry's. */
    labelKey?: string;
    /**
     * Literal trigger label, already resolved. Wins over `labelKey`, and is what a
     * host-defined menu uses — its name is not in our catalogue and never will be.
     */
    label?: string;
    /**
     * Icon shown before the trigger's label.
     *
     * OPT-IN and unset by default, because neither Word nor Docs puts icons on a menu bar and
     * the packaged bar should look like the thing it is imitating. It exists because every
     * other control in this library takes one — toolbar parts, menu rows — and a product with
     * its own visual language should not have to rebuild the trigger to add a glyph to it.
     *
     * Decorative: the label is the accessible name, so the icon is hidden from assistive tech.
     */
    icon?: ReactNode;
    className?: string;
    /** Render nothing — inside the default bar this removes the menu. */
    hidden?: boolean;
    /**
     * `false` renders `children` verbatim as the whole panel. Default `true`: the panel is
     * the registry's rows for this menu, with a row child REPLACING the row it names in
     * place (`hidden` removes it) and any other child appended. Use `false` when the order
     * matters and you want to state it yourself.
     */
    preset?: boolean;
    /** Panel content. */
    children?: ReactNode;
}
/**
 * One menu of the bar: a trigger and the panel it opens.
 *
 * Bar behaviour is Docs': a click opens, a second click closes, and while ANY menu is
 * open, moving the pointer over a different trigger switches to it without a click.
 *
 * @public
 */
declare function Menu({ id, labelKey, label: literal, icon, className, hidden, preset, children, }: MenuProps): react.JSX.Element | null;
/** A menu pinned to one registry id, for `DocxEditor.Menu.File` and friends. @public */
interface MenuPartComponent {
    (props: Omit<MenuProps, 'id'>): ReactNode;
    readonly docxMenu: ChromeMenuId;
}
/** Props for `DocxEditor.Menu.ReportIssue`. @public */
interface MenuReportIssueProps {
    className?: string;
    /** Render nothing — inside the packaged Help menu this removes the row. */
    hidden?: boolean;
    /** Replaces the packaged handler. Falls back to the menu's `onReportIssue`, then to
     *  this project's own tracker. */
    onSelect?: () => void;
}
/**
 * Help › Report issue.
 *
 * A NAMED part rather than anonymous markup inside the Help menu, because it is the one
 * packaged row that reaches OUTSIDE the host's product: it opens this project's issue
 * tracker with the current page URL and user agent prefilled. A host embedding the editor
 * in its own app has every reason to point that somewhere else or drop it, and it should
 * not have to rebuild the menu to do either — `reportIssue={false}` removes it,
 * `onReportIssue` redirects it, and this part composes it back by name.
 *
 * @public
 */
declare function MenuReportIssueImpl({ className, hidden, onSelect }: MenuReportIssueProps): react.JSX.Element | null;
/**
 * The report-issue row, with its row-identity marker.
 *
 * The key is NOT a `ChromeSlotId` — the row is React's, not the shared registry's — but the
 * merge only needs a stable string, and using one here is what lets a host write
 * `<Menu.ReportIssue hidden/>` and have it REPLACE the packaged row rather than render a
 * second, invisible one beside it.
 *
 * @public
 */
declare const MenuReportIssue: typeof MenuReportIssueImpl & {
    docxSlot: string;
};

/** Props for `DocxEditor.Menu`. @public */
interface DocxEditorMenuProps {
    /** Appended after the base `docx-menubar` class. */
    className?: string;
    /** i18n resolver for row labels; without it the raw keys show (never English). */
    t?: ToolbarTranslate;
    /**
     * Name for the file the packaged Save writes, without the extension. Ignored when
     * `onSave` is given.
     */
    fileName?: string;
    /**
     * Replaces File › Open. The default opens a file picker and hands the bytes to
     * `Editor.load` — a user-driven file READ, never a fetch.
     */
    onOpen?: () => void;
    /**
     * Fired when the packaged Open reads a file, before its bytes are loaded — so a host can
     * reflect the file's name in its own title chrome. Not fired when `onOpen` replaced the
     * packaged picker: the host is reading the file itself and already holds the name.
     */
    onOpenFile?: (file: File) => void;
    /** Replaces File › Save. The default runs `Editor.save()` and downloads the bytes. */
    onSave?: () => void;
    /** Replaces File › Page setup. The default opens the packaged Page Setup dialog. */
    onPageSetup?: () => void;
    /**
     * Replaces Help › Report issue. The default opens THIS project's issue tracker,
     * prefilled with the current page URL and user agent — so a host embedding the editor
     * in its own product should point this at its own support channel, or drop the row with
     * `reportIssue={false}`.
     */
    onReportIssue?: () => void;
    /** `false` removes Help › Report issue, and the Help menu with it. Default `true`. */
    reportIssue?: boolean;
    /**
     * `false` renders children verbatim with no default arrangement. Default `true`: menu
     * children override their menu in place, others append.
     */
    preset?: boolean;
    children?: ReactNode;
}
/** The menu bar with its parts attached as statics. @public */
interface DocxEditorMenuNamespace {
    (props: DocxEditorMenuProps): ReactNode;
    /** A menu of the bar, addressed by registry id. */
    readonly Menu: typeof Menu;
    readonly File: MenuPartComponent;
    readonly Format: MenuPartComponent;
    readonly Insert: MenuPartComponent;
    readonly Help: MenuPartComponent;
    /** One chrome slot as a live row. */
    readonly Item: typeof MenuItem;
    /** A presentational row, for a host action that is not a chrome slot. */
    readonly Row: typeof MenuRow;
    /** A named section of rows: a visible heading plus a real ARIA group. */
    readonly Group: typeof MenuGroup;
    readonly Separator: typeof MenuSeparator;
    readonly Submenu: typeof MenuSubmenu;
    /** Word's 6×6 insert-table size picker. */
    readonly TableGrid: typeof MenuTableGrid;
    /** One registry entry as its row, for a host arranging registry data itself. */
    readonly Entry: typeof MenuEntry;
    readonly Open: typeof MenuOpen;
    readonly Save: typeof MenuSave;
    readonly PageSetup: typeof MenuPageSetup;
    /** Help › Report issue, so a host can drop it or point it elsewhere by name. */
    readonly ReportIssue: typeof MenuReportIssue;
}
/**
 * The compound menu bar: `<DocxEditor.Menu/>` for File · Format · Insert · Help, parts as
 * statics for composition.
 *
 * Every actionable row is a chrome slot, so a row and its toolbar twin share one label,
 * one icon, one command and one enabled state. Rows the engine cannot honour yet render
 * present and disabled, carrying the engine's own reason.
 *
 * @public
 */
declare const DocxEditorMenu: DocxEditorMenuNamespace;

/** Props for the context-fed ruler parts. @public */
interface DocxEditorRulerProps {
    /** Measurement unit for tick labels. Defaults to inches. */
    unit?: 'inch' | 'cm';
    className?: string;
    style?: CSSProperties;
}
/**
 * The horizontal ruler as a context-fed part (`DocxEditor.HorizontalRuler`): page
 * width, margins and zoom straight from the editor. Left/right margin handles are
 * draggable when the engine supports page-setup writes; the drag previews locally and
 * commits one undoable step on release.
 *
 * Renders nothing while the editor holds no document — see
 * {@link selectDocumentAbsent}.
 *
 * @public
 */
declare function DocxEditorHorizontalRuler(props: DocxEditorRulerProps): ReactElement | null;
/**
 * The vertical ruler as a context-fed part (`DocxEditor.VerticalRuler`): page height,
 * margins and zoom straight from the editor. Top/bottom margin handles are draggable
 * when the engine supports page-setup writes, committing one undoable step on release.
 *
 * Renders nothing while the editor holds no document — see
 * {@link selectDocumentAbsent}.
 *
 * @public
 */
declare function DocxEditorVerticalRuler(props: DocxEditorRulerProps): ReactElement | null;

/** Props for the context-fed outline part. @public */
interface DocxEditorDocumentOutlineProps {
    /** Close-button handler; without one the panel simply stays open. */
    onClose?: () => void;
    /** Vertical offset (px) inside the panel's positioning container. */
    topOffset?: number;
    /** Left anchor (px) inside the panel's positioning container. */
    leftOffset?: number;
}
/**
 * The document outline as a context-fed part (`DocxEditor.DocumentOutline`): headings
 * from `Editor.getOutline()`, in document order; clicking one moves the caret to that
 * heading. The panel positions absolutely — give it a `position: relative` container.
 *
 * Renders nothing while the editor has no document — a floating panel saying "no
 * headings" about a document that is not there is the same false claim the rulers made.
 *
 * @public
 */
declare function DocxEditorDocumentOutline(props: DocxEditorDocumentOutlineProps): ReactElement | null;

/** The pane's tabs. Word's Replace tab is a later slice; nothing here pretends it exists. */
type NavigationTab$1 = 'headings' | 'find';
/** How `useNavigationPane` is configured. @public */
interface UseNavigationPaneOptions {
    /** Open state for the first render when the pane is uncontrolled. Defaults to closed. */
    defaultOpen?: boolean;
    /** Controlled open state. Pair with `onOpenChange`. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Tab shown first when uncontrolled. Defaults to `'headings'`. */
    defaultTab?: NavigationTab$1;
    /** Controlled tab. Pair with `onTabChange`. */
    tab?: NavigationTab$1;
    onTabChange?: (tab: NavigationTab$1) => void;
    /** Panel width in px. Defaults to {@link NAVIGATION_PANE_WIDTH}. */
    paneWidth?: number;
}
/** What `useNavigationPane` answers. @public */
interface UseNavigationPaneResult {
    readonly open: boolean;
    readonly setOpen: (open: boolean) => void;
    readonly toggle: () => void;
    readonly tab: NavigationTab$1;
    readonly setTab: (tab: NavigationTab$1) => void;
    readonly paneWidth: number;
    /**
     * Px the chrome is displaced by, right now. `0` while the pane is closed AND whenever
     * the left gutter was already wide enough to hold it — which is the point.
     */
    readonly shift: number;
}
/**
 * The navigation pane's behavior, with no UI attached: open state, the active tab, and
 * the document displacement an open pane is entitled to.
 *
 * `DocxEditor.Navigation` calls this and shares the result with its parts. Call it
 * directly to drive a pane of your own.
 *
 * @public
 */
declare function useNavigationPane(options?: UseNavigationPaneOptions): UseNavigationPaneResult;

/** Shared props for the pane's structural parts. @public */
interface NavigationPartProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
/**
 * The pane's title row. With no children it renders the close arrow and the title.
 *
 * @public
 */
declare function NavigationHeader({ className, style, children, }: NavigationPartProps): ReactElement;
/** The back arrow that closes the pane. @public */
declare function NavigationClose({ className, style, children }: NavigationPartProps): ReactElement;
/** The pane's heading text. @public */
declare function NavigationTitle({ className, style, children }: NavigationPartProps): ReactElement;
/**
 * The tab strip. With no children it renders one `Tab` per tab the pane supports.
 *
 * A real `role="tablist"`, so arrow keys move between tabs and a screen reader announces
 * the panel each one controls.
 *
 * @public
 */
declare function NavigationTabs({ className, style, children }: NavigationPartProps): ReactElement;
/** Props for one tab. @public */
interface NavigationTabProps extends NavigationPartProps {
    value: NavigationTab$1;
}
/** One tab button. Children replace the label. @public */
declare function NavigationTab({ value, className, style, children, }: NavigationTabProps): ReactElement;
/**
 * The heading list, indented by outline depth. Clicking a row moves the caret to that
 * heading and brings it into view.
 *
 * The filter box narrows the list CLIENT-SIDE — it hides rows whose text does not contain
 * what you typed. It is deliberately not the document search: filtering an outline and
 * searching a document are different questions, and the Find tab answers the second one.
 *
 * @public
 */
declare function NavigationHeadings({ className, style }: NavigationPartProps): ReactElement;
/**
 * The find panel: a query box, a result counter with previous/next, the match-case and
 * whole-word toggles, and the result list. Selecting a result moves the caret onto the
 * match and reveals its page.
 *
 * @public
 */
declare function NavigationFind({ className, style }: NavigationPartProps): ReactElement;
/**
 * The collapsed pane's disc button. `DocxEditor.Navigation` renders one for you while the
 * pane is closed; place it yourself (a toolbar, a menu) with `toggle={false}` on the root.
 *
 * @public
 */
declare function NavigationToggle({ className, style, children, }: NavigationPartProps): ReactElement;

/** Props for `DocxEditor.Navigation`. @public */
interface DocxEditorNavigationProps extends UseNavigationPaneOptions {
    /**
     * Label resolver. Defaults to the active `LocaleContext` catalogue (bundled English
     * unless a provider swapped it), matching `<DocxEditor>`'s own default.
     */
    t?: (key: string, params?: Record<string, string | number>) => string;
    /**
     * The collapsed disc button. `false` removes it; an OBJECT is props for the packaged one,
     * so a host can give it a class without restyling the library's.
     *
     * It is a prop rather than something you compose through `children` because the disc is
     * rendered OUTSIDE the panel: the panel is `inert` while the pane is shut, which is
     * exactly when the disc has to be clickable.
     */
    toggle?: boolean | NavigationPartProps;
    className?: string;
    style?: CSSProperties;
    /** Replaces the default composition (header, tabs, both panels). */
    children?: ReactNode;
}
/**
 * The document navigation pane — headings and find — over the left gutter.
 *
 * @public
 */
declare function DocxEditorNavigation(props: DocxEditorNavigationProps): ReactElement;
/**
 * `DocxEditor.Navigation` with its parts attached as statics.
 *
 * @public
 */
interface DocxEditorNavigationNamespace {
    (props: DocxEditorNavigationProps): ReactElement;
    readonly Header: typeof NavigationHeader;
    readonly Close: typeof NavigationClose;
    readonly Title: typeof NavigationTitle;
    readonly Tabs: typeof NavigationTabs;
    readonly Tab: typeof NavigationTab;
    readonly Headings: typeof NavigationHeadings;
    readonly Find: typeof NavigationFind;
    readonly Toggle: typeof NavigationToggle;
}
declare const Navigation: DocxEditorNavigationNamespace;

/**
 * One heading of the engine's outline: text, 0-based level, and the block id
 * `Editor.scrollToBlock` accepts.
 *
 * @public
 */
type OutlineHeading$1 = ReturnType<Editor['getOutline']>[number];
/** A heading plus how deep to indent it in a rendered list. @public */
interface OutlineHeadingItem {
    readonly heading: OutlineHeading$1;
    /**
     * Indent depth RELATIVE to the shallowest heading present, not the absolute level. A
     * memo whose top sections are Heading 2 should left-align them at the base instead of
     * carrying a phantom first-level indent.
     */
    readonly depth: number;
}
/** What `useDocumentOutline` answers. @public */
interface UseDocumentOutlineResult {
    /** The document's headings, in document order. Empty when it has none. */
    readonly headings: readonly OutlineHeading$1[];
    /** The same headings with their rendering depth resolved. */
    readonly items: readonly OutlineHeadingItem[];
    /**
     * The heading this pane last navigated to, so a list can show it as current. Tracks the
     * PANE's navigation, not the caret: following the caret would mean walking the document
     * on every selection change, and the engine has no derivation for it yet.
     */
    readonly selectedBlockId: string | null;
    /** Move the caret to a heading and bring it into view. Unknown ids are a safe no-op. */
    readonly goTo: (blockId: string) => void;
    readonly isEmpty: boolean;
}
/**
 * The document outline's behavior, with no UI attached: the headings, their nesting
 * depth, and the jump. `DocxEditor.Navigation.Headings` is this hook plus rows; a host
 * that wants a different list takes the hook and renders its own.
 *
 * @public
 */
declare function useDocumentOutline(): UseDocumentOutlineResult;

/** Milliseconds of quiet before a typed query is run against the document. */
declare const SEARCH_DEBOUNCE_MS = 150;
/**
 * The engine's cap on one search. A full result array means "at least this many"; the
 * hook reports that as {@link UseDocumentSearchResult.truncated}.
 */
declare const SEARCH_MATCH_LIMIT = 2000;
/** What `useDocumentSearch` answers. @public */
interface UseDocumentSearchResult {
    /** The text in the search box, updated synchronously as the user types. */
    readonly query: string;
    readonly setQuery: (query: string) => void;
    readonly matchCase: boolean;
    readonly setMatchCase: (value: boolean) => void;
    readonly wholeWord: boolean;
    readonly setWholeWord: (value: boolean) => void;
    /** Matches for the last RUN query, in document order. */
    readonly matches: readonly TextMatch[];
    /**
     * Whether the engine stopped at its cap with matches still ahead of it, so a count
     * should read "2000+" rather than an exact total. A search that lands on exactly the cap
     * reports true; over-reporting by one is the honest direction.
     */
    readonly truncated: boolean;
    /** Index of the match the caret was last sent to, or `-1` before any navigation. */
    readonly activeIndex: number;
    /** Select a match by index and bring its page into view. Out-of-range is a no-op. */
    readonly goTo: (index: number) => void;
    /** Next / previous match, wrapping at the ends the way Word's arrows do. */
    readonly next: () => void;
    readonly previous: () => void;
    /** Empty the box and drop the results, without touching the selection. */
    readonly clear: () => void;
    /** Whether a typed query is waiting for its debounce to elapse. */
    readonly isPending: boolean;
}
/**
 * The find panel's behavior, with no UI attached.
 *
 * @public
 */
declare function useDocumentSearch(): UseDocumentSearchResult;

/** Panel width, in px, when the host does not choose one. */
declare const NAVIGATION_PANE_WIDTH = 280;
/**
 * Gap between the viewport's left edge and the panel.
 *
 * Clears a vertical ruler: `RULER_WIDTH` is 20px pinned at the viewport's left edge, so
 * anything less puts the panel and its collapsed disc on top of the tick marks.
 */
declare const NAVIGATION_PANE_INSET = 32;
/** Clearance kept between the panel's right edge and the page. */
declare const NAVIGATION_PANE_GAP = 16;
/** Total left space an open pane needs before the page may start. */
declare function navigationPaneReservation(paneWidth?: number): number;
interface NavigationShiftInput {
    /** Client width of the scroll container. */
    readonly viewportWidth: number;
    /** Rendered width of one page, zoom applied. */
    readonly pageWidthPx: number;
    /** Space the open pane needs, from {@link navigationPaneReservation}. */
    readonly reservation: number;
    /** Padding already reserved at the inline end, for example by the review rail. */
    readonly inlineEndReservation?: number;
    /**
     * Whether the page's WIDTH follows the padding right now.
     *
     * This turns the answer binary, and it has to. The proportional branch below assumes a page
     * of fixed width sitting in a shrinking box, so padding P moves it by P/2. Where the page is
     * re-scaled to the padded box instead, a partial shift makes the page narrower, which widens
     * the gutter, which asks for a smaller shift, which makes the page wider — the pane and the
     * document chase each other every frame and never settle. Docked or not is a fixed point;
     * anything in between is not.
     *
     * NOT "a fit mode is selected". The default fit is capped at 100%, and on any container with
     * room for the sheet it sits AT that cap with the page a fixed width — exactly the case the
     * proportional branch was written for. Reading the mode alone docked those containers too
     * and pushed the page up to 128px further right than the pane needed. The question is
     * whether the fit is BINDING, which is `zoom < maxZoom`.
     */
    readonly docked?: boolean;
}
/**
 * The viewport's left padding, in px, that puts the page's left edge exactly at
 * `reservation` — and `0` whenever the gutter is already wide enough.
 *
 * Returns 0 for a degenerate measurement (a viewport that has not been laid out yet, a
 * document with no page setup) rather than guessing: shifting on a zero measurement would
 * make the pane jump on the first frame and settle on the second.
 */
declare function navigationShift({ viewportWidth, pageWidthPx, reservation, inlineEndReservation, docked, }: NavigationShiftInput): number;

/**
 * The px the chrome is currently displaced by an open navigation pane. `0` when no pane
 * is mounted, when it is closed, and whenever the left gutter was already wide enough.
 *
 * @public
 */
declare function useNavigationShift(): number;

/** Props for `DocxEditor.PageSetupDialog`. @public */
interface DocxEditorPageSetupDialogProps {
    /** Whether the dialog is shown. The host owns this state. */
    open: boolean;
    /** Called on Cancel, Escape, overlay click, and after a successful Apply. */
    onClose: () => void;
    className?: string;
}
/**
 * Page Setup dialog: size preset, orientation, margins in inches. Reads the section
 * through `usePageSetup()` and applies the whole form as one undoable command.
 *
 * @public
 */
declare function DocxEditorPageSetupDialog({ open, onClose, className, }: DocxEditorPageSetupDialogProps): ReactElement | null;

/** Props for `DocxEditor.PageNumber`. @public */
interface DocxEditorPageNumberProps {
    /** Appended after the default page-number classes. */
    className?: string;
    /** Inline presentation overrides for the indicator element. */
    style?: CSSProperties;
}
/**
 * Floating localized page readout for the active `DocxEditor.Viewport`.
 *
 * Render it as a sibling of the viewport inside a positioned wrapper. It appears while a
 * multi-page document scrolls and fades after 600 ms of inactivity.
 *
 * @public
 */
declare function DocxEditorPageNumber({ className, style }: DocxEditorPageNumberProps): react.JSX.Element | null;

/** Props for `DocxEditor.FontNotice`. @public */
interface DocxEditorFontNoticeProps {
    /** Appended after the default notice classes. */
    className?: string;
    /** Inline presentation overrides for the notice element. */
    style?: CSSProperties;
    /** Translator override; defaults to the ambient locale context. */
    t?: TFunction;
}
/**
 * Word-style font compatibility notice.
 *
 * Shown when the open document declares font families this platform cannot resolve —
 * not installed, not embedded in the file, not supplied by the app's font
 * configuration — so the text is rendering in a substitute face. Dismissing hides the
 * notice for that set of families; a different document (or a font arriving) changes
 * the set and surfaces it again.
 *
 * @public
 */
declare function DocxEditorFontNotice({ className, style, t: tProp }: DocxEditorFontNoticeProps): react.JSX.Element | null;

/** Props for `DocxEditor.HeaderFooterChrome`. @public */
interface DocxEditorHeaderFooterChromeProps {
    className?: string;
}
/**
 * Thin overlay while a header or footer scope is open: region label and contextual options.
 * Mount beside `DocxEditor.Content`.
 *
 * @public
 */
declare function DocxEditorHeaderFooterChrome({ className, }: DocxEditorHeaderFooterChromeProps): ReactElement | null;

/** Shared props for every part. @public */
interface HyperLinkPartProps {
    className?: string;
    /** Merge this part's wiring onto the single child element instead of the default one. */
    asChild?: boolean;
    /** Render nothing — inside the default arrangement this removes the part. */
    hidden?: boolean;
    children?: ReactNode;
}
/** Props for the action parts, which also take an icon. @public */
interface HyperLinkActionProps extends HyperLinkPartProps {
    /** Icon override; falls back to `children`, then to the part's default glyph. */
    icon?: ReactNode;
}
/** Props for `DocxEditor.HyperLink`. @public */
interface HyperLinkProps extends HyperLinkPartProps {
    /**
     * Render the packaged arrangement. `false` mounts only the popover shell and whatever
     * parts you pass as children — the rung for "I want the wiring, not the layout".
     */
    preset?: boolean;
}
/**
 * The popover panel.
 *
 * Positioned inside the VIEWPORT (the scroll container), so ordinary CSS keeps it attached to
 * the page while the user scrolls — no scroll listener, no per-frame reposition. The
 * coordinates the engine reports are viewport-relative, so they are converted against the
 * container's own rect once, at open.
 */
declare function HyperLinkRoot({ className, asChild, hidden, children, preset }: HyperLinkProps): react.JSX.Element | null;
/** The target readout, and the action that follows it. @public */
declare function HyperLinkUrl({ className, asChild, hidden, children }: HyperLinkPartProps): react.JSX.Element | null;
declare namespace HyperLinkUrl {
    var docxHyperLinkPart: "Url";
}
/** Copy the sanitized target to the clipboard. @public */
declare function HyperLinkCopy({ className, asChild, hidden, children, icon: glyph, }: HyperLinkActionProps): react.JSX.Element | null;
declare namespace HyperLinkCopy {
    var docxHyperLinkPart: "Copy";
}
/** Switch the panel into edit mode. @public */
declare function HyperLinkEdit({ className, asChild, hidden, children, icon: glyph, }: HyperLinkActionProps): react.JSX.Element | null;
declare namespace HyperLinkEdit {
    var docxHyperLinkPart: "Edit";
}
/** Remove the link, keeping its text. @public */
declare function HyperLinkUnlink({ className, asChild, hidden, children, icon: glyph, }: HyperLinkActionProps): react.JSX.Element | null;
declare namespace HyperLinkUnlink {
    var docxHyperLinkPart: "Unlink";
}
/** Display-text and URL fields. @public */
declare function HyperLinkFields({ className, hidden }: HyperLinkPartProps): react.JSX.Element | null;
declare namespace HyperLinkFields {
    var docxHyperLinkPart: "Fields";
}
/** Commit the draft. @public */
declare function HyperLinkApply({ className, asChild, hidden, children }: HyperLinkPartProps): react.JSX.Element | null;
declare namespace HyperLinkApply {
    var docxHyperLinkPart: "Apply";
}
/**
 * Why the last Apply did nothing.
 *
 * A refusal that closes nothing and says nothing is the worst of both: the panel sits open
 * and the user re-presses the same button. The engine already knows the reason (a scheme it
 * will not write, a selection spanning paragraphs, no text to link); this shows it.
 */
declare function HyperLinkError({ className, hidden }: HyperLinkPartProps): react.JSX.Element | null;
declare namespace HyperLinkError {
    var docxHyperLinkPart: "Error";
}
/** Dismiss without applying. @public */
declare function HyperLinkCancel({ className, asChild, hidden, children }: HyperLinkPartProps): react.JSX.Element | null;
declare namespace HyperLinkCancel {
    var docxHyperLinkPart: "Cancel";
}
/**
 * The link popover compound.
 *
 * @public
 */
interface DocxEditorHyperLinkNamespace {
    (props: HyperLinkProps): ReturnType<typeof HyperLinkRoot>;
    readonly Url: typeof HyperLinkUrl;
    readonly Copy: typeof HyperLinkCopy;
    readonly Edit: typeof HyperLinkEdit;
    readonly Unlink: typeof HyperLinkUnlink;
    readonly Fields: typeof HyperLinkFields;
    readonly Error: typeof HyperLinkError;
    readonly Apply: typeof HyperLinkApply;
    readonly Cancel: typeof HyperLinkCancel;
}
declare const DocxEditorHyperLink: DocxEditorHyperLinkNamespace;

/**
 * Subscribe to the active note view scope with reference-stable results when unchanged.
 *
 * @public
 */
declare function useNoteScopeState(): Extract<ViewScope, {
    kind: 'note';
}> | null;
type NotePropertiesState = Exclude<ReturnType<Editor['getNotePropertiesState']>, null>;
/**
 * Subscribe to `getNotePropertiesState()` with reference-stable results when unchanged.
 *
 * @public
 */
declare function useNotePropertiesState(): NotePropertiesState | null;

/** Props for `DocxEditor.NotesChrome`. @public */
interface DocxEditorNotesChromeProps {
    className?: string;
}
declare function DocxEditorNotesChrome({ className, }: DocxEditorNotesChromeProps): ReactElement | null;

/** Props for a packaged context-menu row. @public */
interface ContextMenuCommandProps {
    /** Icon override. Defaults to the row's own Material Symbol. */
    icon?: ReactNode;
    /** i18n key for the label, overriding the packaged one. */
    labelKey?: string;
    /** i18n key for the shortcut column, overriding the packaged one. */
    shortcutKey?: string;
    className?: string;
    /** Render nothing — inside the default set this removes the row. */
    hidden?: boolean;
}
/** Cut the selection to the clipboard. Disabled with the engine's reason when nothing is selected. @public */
declare const ContextMenuCut: (({ icon, labelKey, shortcutKey, className, hidden }: ContextMenuCommandProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Copy the selection. Stays available in a read-only document. @public */
declare const ContextMenuCopy: (({ icon, labelKey, shortcutKey, className, hidden }: ContextMenuCommandProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Delete the selection. @public */
declare const ContextMenuDelete: (({ icon, labelKey, shortcutKey, className, hidden }: ContextMenuCommandProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Select the whole body. @public */
declare const ContextMenuSelectAll: (({ icon, labelKey, shortcutKey, className, hidden }: ContextMenuCommandProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/**
 * Paste the clipboard's text at the selection.
 *
 * THE ROW READS THE CLIPBOARD, not the engine. `exec` is synchronous and clipboard read is
 * not — it prompts in Chrome and is refused outright by Firefox and Safari — so the read
 * happens here, inside the click that asked for it, where the permission gesture belongs,
 * and the text goes to the engine as an argument.
 *
 * Nothing can know whether the read will succeed BEFORE it is attempted, so the row starts
 * enabled (when the engine would accept a paste at all) and disables itself, with the
 * browser's own reason, once a read has actually been refused. Guessing the answer up front
 * would either grey out a working Paste on Chrome or advertise a dead one on Safari.
 *
 * @public
 */
declare function ContextMenuPaste({ icon, labelKey, shortcutKey, className, hidden, }: ContextMenuCommandProps): react.JSX.Element | null;
declare namespace ContextMenuPaste {
    var docxRow: "edit.paste";
}
/** Props for packaged table context-menu rows. @public */
interface ContextMenuTableRowProps extends ContextMenuCommandProps {
    /** When true, the row uses the destructive treatment. */
    destructive?: boolean;
}
/** Insert a row above the current table row. @public */
declare const ContextMenuInsertRowAbove: (({ icon, labelKey, className, hidden, destructive }: ContextMenuTableRowProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Insert a row below the current table row. @public */
declare const ContextMenuInsertRowBelow: (({ icon, labelKey, className, hidden, destructive }: ContextMenuTableRowProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Insert a column to the left of the current column. @public */
declare const ContextMenuInsertColumnLeft: (({ icon, labelKey, className, hidden, destructive }: ContextMenuTableRowProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Insert a column to the right of the current column. @public */
declare const ContextMenuInsertColumnRight: (({ icon, labelKey, className, hidden, destructive }: ContextMenuTableRowProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Delete the current table row. @public */
declare const ContextMenuDeleteTableRow: (({ icon, labelKey, className, hidden, destructive }: ContextMenuTableRowProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Delete the current table column. @public */
declare const ContextMenuDeleteTableColumn: (({ icon, labelKey, className, hidden, destructive }: ContextMenuTableRowProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Delete the entire table. @public */
declare const ContextMenuDeleteTable: (({ icon, labelKey, className, hidden, destructive }: ContextMenuTableRowProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Compact vertical-alignment picker for selected table cells. @public */
declare function ContextMenuCellVerticalAlignment({ hidden }: ContextMenuCommandProps): react.JSX.Element | null;
declare namespace ContextMenuCellVerticalAlignment {
    var docxRow: "table.cellVerticalAlignment";
}
/** Rebuild the pointed-at table of contents from the document's headings. @public */
declare const ContextMenuRefreshToc: (({ icon, labelKey, className, hidden }: ContextMenuCommandProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Re-resolve only the page numbers of the pointed-at table of contents. @public */
declare const ContextMenuRefreshTocPageNumbers: (({ icon, labelKey, className, hidden }: ContextMenuCommandProps) => react.JSX.Element | null) & {
    docxRow: string;
};
/** Props for `DocxEditor.ContextMenu.Item`: a host-owned row. @public */
interface ContextMenuItemProps {
    /**
     * Label, as a resolved STRING rather than an i18n key — the row belongs to the host's own
     * action, so the host's own catalogue resolves it. The packaged rows go the other way.
     */
    label: string;
    icon?: ReactNode;
    /** Right-aligned shortcut text, already resolved. */
    shortcut?: string;
    disabled?: boolean;
    /** Tooltip when disabled. Say why — never invent a reason the engine did not give. */
    disabledReason?: string;
    /** Checked state, for a row that toggles. Leave undefined on a row that just acts. */
    active?: boolean;
    onSelect?: () => void;
    className?: string;
}
/**
 * A host-owned context-menu row, styled and behaved like the packaged ones.
 *
 * The toolbar's `Action` for the right-click surface: no slot, no command, no engine wiring
 * — enabled state and the action are the host's, because the engine has no opinion about an
 * action it does not model. Selecting it closes the menu.
 *
 * @public
 */
declare function ContextMenuItem({ label, icon, shortcut, disabled, disabledReason, active, onSelect, className, }: ContextMenuItemProps): react.JSX.Element;

/** Props for `DocxEditor.ContextMenu`. @public */
interface DocxEditorContextMenuProps {
    /** Appended after the base `docx-contextmenu` class. */
    className?: string;
    /** i18n resolver for row labels; without it the raw keys show (never English). */
    t?: ToolbarTranslate;
    /**
     * `false` renders children verbatim with no default set. Default `true`: a child naming a
     * packaged row overrides it in place, others append.
     */
    preset?: boolean;
    /**
     * `true` suppresses the panel entirely and lets the browser's own menu through. For a
     * host that wants the native menu back on some documents without unmounting the part.
     */
    disabled?: boolean;
    /** Notified whenever the panel opens or closes. */
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
}
/**
 * The packaged right-click menu over the painted document.
 *
 * Mounted by default inside `DocxEditor.Viewport`; `contextMenu={false}` on `DocxEditor`
 * removes it. Rendered as a child of the viewport so it finds its own surface, but
 * positioned in client space, so it is never clipped by the scroller.
 *
 * @public
 */
declare function DocxEditorContextMenu({ className, t, preset, disabled, onOpenChange, children, }: DocxEditorContextMenuProps): react.JSX.Element;
/**
 * `DocxEditor.ContextMenu` with its rows attached as statics.
 *
 * @public
 */
interface DocxEditorContextMenuNamespace {
    (props: DocxEditorContextMenuProps): ReactElement;
    readonly Cut: typeof ContextMenuCut;
    readonly Copy: typeof ContextMenuCopy;
    readonly Paste: typeof ContextMenuPaste;
    readonly Delete: typeof ContextMenuDelete;
    readonly SelectAll: typeof ContextMenuSelectAll;
    readonly InsertRowAbove: typeof ContextMenuInsertRowAbove;
    readonly InsertRowBelow: typeof ContextMenuInsertRowBelow;
    readonly InsertColumnLeft: typeof ContextMenuInsertColumnLeft;
    readonly InsertColumnRight: typeof ContextMenuInsertColumnRight;
    readonly DeleteTableRow: typeof ContextMenuDeleteTableRow;
    readonly DeleteTableColumn: typeof ContextMenuDeleteTableColumn;
    readonly DeleteTable: typeof ContextMenuDeleteTable;
    readonly CellVerticalAlignment: typeof ContextMenuCellVerticalAlignment;
    readonly RefreshToc: typeof ContextMenuRefreshToc;
    readonly RefreshTocPageNumbers: typeof ContextMenuRefreshTocPageNumbers;
    /** A host-owned row: no slot, no command, the host's own label and action. */
    readonly Item: typeof ContextMenuItem;
    /** Any chrome slot as a live row (`<ContextMenu.Slot slot="text.bold" />`). */
    readonly Slot: typeof MenuItem;
    /** Bare row presentation, for a host building something the parts do not cover. */
    readonly Row: typeof MenuRow;
    /** A named section of rows: a visible heading plus a real ARIA group. */
    readonly Group: typeof MenuGroup;
    readonly Separator: typeof MenuSeparator;
    readonly Submenu: typeof MenuSubmenu;
}
declare const ContextMenu: DocxEditorContextMenuNamespace;

/** Where the panel opened, in client coordinates. */
interface ContextMenuAnchor {
    readonly x: number;
    readonly y: number;
}
/**
 * The element the opening right-click landed on, or null while the menu is closed.
 *
 * Public so capability packages can render contextual sections — a row that only exists
 * when the press landed on their own painted chrome — without a second listener.
 *
 * @public
 */
declare function useContextMenuTarget(): HTMLElement | null;

/** Shared props for every part. @public */
interface ContentControlPartProps {
    className?: string;
    asChild?: boolean;
    hidden?: boolean;
    children?: ReactNode;
}
/** Props for action parts that also take an icon. @public */
interface ContentControlActionProps extends ContentControlPartProps {
    icon?: ReactNode;
}
/** Props for `DocxEditor.ContentControl`. @public */
interface ContentControlProps extends ContentControlPartProps {
    /**
     * Render the packaged arrangement. `false` mounts only the shell and whatever parts
     * you pass as children.
     */
    preset?: boolean;
}
declare function ContentControlRoot({ className, asChild, hidden, children, preset, }: ContentControlProps): react.JSX.Element | null;
declare function ContentControlHeader({ className, asChild, hidden, children }: ContentControlPartProps): react.JSX.Element | null;
declare function ContentControlFields({ className, asChild, hidden, children }: ContentControlPartProps): react.JSX.Element | null;
declare function ContentControlRemove({ className, asChild, hidden, icon: iconOverride, children, }: ContentControlActionProps): react.JSX.Element | null;
/**
 * The content-control inspector compound. Parts live on the namespace statics.
 *
 * @public
 */
interface DocxEditorContentControlNamespace {
    (props: ContentControlProps): ReturnType<typeof ContentControlRoot>;
    readonly Header: typeof ContentControlHeader;
    readonly Fields: typeof ContentControlFields;
    readonly Remove: typeof ContentControlRemove;
}
declare const DocxEditorContentControl: DocxEditorContentControlNamespace;

type EditorMode = 'edit' | 'view';
/**
 * Props for the React `DocxEditor`. The adapter is a thin renderer over the
 * `Editor` contract; it holds no editing-engine state of its own and never
 * imports ProseMirror or OOXML feature logic.
 */
interface DocxEditorProps {
    /**
     * Immutable byte-backed font sources sampled at mount. Remount to replace this
     * configuration atomically.
     *
     * Optional, but it decides layout FIDELITY. With it, the engine shapes text through
     * HarfBuzz and measures line and page breaks from real font metrics. Without it, layout
     * runs on a fixed monospace approximation: glyphs still paint in their true faces, so the
     * page looks right, but wrap points and pagination are estimated rather than
     * Word-accurate. Omit it to mount in one line; supply it when breaks must match Word.
     */
    fonts?: FontConfiguration | FontConfigurationFragment | FontResolver;
    /**
     * Title-bar slots. The host owns what goes here — brand lockup, switchers, theme
     * toggle, Open/New/Save controls — and passes them in; the editor renders them
     * verbatim on either side of the document title.
     */
    readonly renderTitleBarLeft?: () => ReactNode;
    readonly renderTitleBarRight?: () => ReactNode;
    /**
     * Chrome colour mode. `'system'` follows the OS and re-resolves when it changes.
     * Only the editor CHROME is themed — the document canvas stays Word-faithful.
     */
    readonly colorMode?: 'light' | 'dark' | 'system';
    /**
     * Resolves i18n keys for the editor chrome.
     *
     * Defaults to the bundled English catalogue, so the chrome is legible with no setup.
     * Strings still come from `packages/i18n/en.json` rather than literals in components;
     * this only chooses who resolves the key. For another language, pass
     * `createT(locale)` from `@docx-editor.dev/i18n`.
     *
     * `params` carries interpolation values for parameterized keys (for example the
     * navigation pane's `{current} of {total}` match counter) — a resolver that ignores
     * them renders the raw placeholders for those labels.
     */
    t?: (key: string, params?: Record<string, string | number>) => string;
    /**
     * The chrome's language: a locale from `@docx-editor.dev/i18n` (or your own partial
     * over English). Keys the locale leaves out fall back to English rather than showing
     * the key.
     *
     * ```tsx
     * import { de } from '@docx-editor.dev/i18n';
     * <DocxEditor i18n={de} />
     * ```
     *
     * Equivalent to wrapping this editor in `<LocaleProvider i18n={de}>`, which is still
     * the way to set one language for several editors at once — this prop overrides such a
     * provider for this editor only. Unlike `locale`, which tells the ENGINE what language
     * the document is in, this decides what the buttons say.
     *
     * Hold it at a stable identity: a catalogue written inline (`i18n={{ toolbar: … }}`) is
     * a new object every render, and the merged catalogue behind it is what the chrome
     * memoizes its labels on — so an inline one re-renders every toolbar control on each
     * render of the host. Put your overrides in a module constant, or memoize them.
     */
    i18n?: Translations;
    /**
     * Renders the packaged chrome — title bar and toolbar — around the document.
     * Default `true`. Set `false` for the painted surface alone when the host supplies
     * its own chrome; the composition primitives (`Root` / `Viewport` / `Content`) are
     * the better starting point if you are replacing more than the frame.
     */
    chrome?: boolean;
    /** Document title shown in the chrome's title bar. */
    title?: string;
    /** Called when the title is edited. Omitting it makes the title read-only. */
    onTitleChange?: (title: string) => void;
    /**
     * Save handler for the chrome's save control and the menu's File › Save row. Runs
     * `Editor.save()` at the host.
     *
     * Without it the title-bar button is absent and File › Save falls back to the packaged
     * behaviour: `Editor.save()` and a download named after `title`.
     */
    onSave?: () => void;
    /**
     * Open handler for the menu's File › Open row.
     *
     * Without it the row falls back to the packaged behaviour: a file picker whose bytes go
     * to `Editor.load`. Supply this to drive the load from your own storage — the row is
     * still a user-initiated file READ either way, never a fetch the document can trigger.
     */
    onOpen?: () => void;
    /**
     * The packaged menu bar — File · Format · Insert · Help — under the document title.
     *
     * `false` removes it. An OBJECT is `DocxEditorMenuProps`, passed straight through, so a
     * host can redirect one row without giving up the bar: `menu={{ reportIssue: false }}`
     * drops the report-an-issue row, `menu={{ onPageSetup: openMine }}` swaps the dialog,
     * and `menu={{ children: <DocxEditor.Menu.File>…</DocxEditor.Menu.File> }}` replaces a
     * whole menu in place. Before this took an object the only way to change any of that was
     * `menu={false}` plus rebuilding the entire title block.
     *
     * Every actionable row is a chrome slot, so it shares its label, icon, command and
     * enabled state with the toolbar control for the same capability.
     */
    menu?: boolean | DocxEditorMenuProps;
    /**
     * Render the packaged hyperlink popover (`false` removes it).
     *
     * The engine's link GESTURES stay wired either way — a click on a link and Ctrl/Cmd+K
     * still reach `useHyperlinkPopup()` — so a host that turns this off to render its own
     * panel loses the packaged UI and nothing else.
     */
    hyperlinkPopup?: boolean;
    /**
     * Render the packaged right-click menu (`false` removes it, restoring the browser's own).
     *
     * An object is passed through to `DocxEditor.ContextMenu` as props, so a host can compose
     * its own rows — `{ children: <DocxEditor.ContextMenu.Item … /> }` — without dropping to
     * the primitives. The engine's selection behavior is the same either way: a right-click
     * never moves the caret, so the menu always acts on the selection the user already had.
     */
    contextMenu?: boolean | DocxEditorContextMenuProps;
    /**
     * Render the packaged navigation pane — headings and find — over the document's left
     * gutter (`false` removes it and its toggle).
     *
     * On by default because an open pane costs the document nothing: it floats over gutter
     * space that is already empty, and only moves the page when the window is genuinely too
     * narrow to hold both. Compose `DocxEditor.Navigation` yourself, or build on
     * `useNavigationPane` / `useDocumentOutline` / `useDocumentSearch`, for a different one.
     */
    navigation?: boolean;
    /**
     * Horizontal and vertical rulers, on by default with the packaged chrome.
     *
     * They are part of the frame rather than an extra: every editor this
     * component is modelled on shows them, and the placement is not something a
     * host can get right from outside. The horizontal ruler applies the
     * navigation shift and the review gutter itself, so it has to sit ABOVE the
     * scroll container — mounted inside it, the gutter is counted twice and the
     * ticks drift off the page. Set `false` for a bare page, or compose
     * `DocxEditor.HorizontalRuler` / `DocxEditor.VerticalRuler` yourself.
     */
    rulers?: boolean;
    /** A document to load: DOCX bytes or an existing handle. */
    document?: DocumentSource;
    /** 'edit' (default) or 'view' (read-only). Applied at mount only — not reactive; remount to change. */
    mode?: EditorMode;
    /** A fixed scale. Supplying one also makes the mode fixed unless `zoomMode` says otherwise. */
    zoom?: number;
    /**
     * Where the scale comes from. Defaults to `'auto'`: fit the page width, between 50% and
     * 100%. A fit tracks the room beside the page, so opening comments shrinks the document
     * instead of pushing it off screen; past the floor it scrolls sideways instead.
     * `{ type: 'fixed' }` opts out.
     */
    zoomMode?: ZoomMode | 'auto';
    locale?: string;
    author?: string;
    /**
     * Capability modules to register (`@docx-editor.dev/pro`'s review module,
     * custom nodes). Applied at mount only, like `mode`.
     */
    modules?: readonly EditorModule[];
    /**
     * Extra chrome rendered INSIDE the viewport, after the painted pages — the
     * slot pro or host chrome mounts into without leaving the sugar (e.g.
     * `DocxEditorReview` from `@docx-editor.dev/pro/react`). For more control,
     * compose `DocxEditor.Root`/`Viewport`/`Content` directly.
     */
    children?: ReactNode;
    className?: string;
    /** Fired after the underlying `Editor` is created. */
    onReady?: (editor: Editor) => void;
    /** Fired with the same typed font failure shown by the accessible alert UI. */
    onFontError?: (error: EditorFontError) => void;
    /** Fired when the document changes (revision + identity deltas, not bytes). */
    onChange?: (change: DocumentChange) => void;
}
/**
 * The imperative handle, identical on both adapters (enforced by
 * `bun run check:parity-contract`). Every member forwards to the `Editor` facade and is
 * safe to call before the editor has mounted — mutations no-op, reads return the honest
 * empty answer (`null`, a `notFound` refusal, a loading snapshot) — so a host can hold
 * the ref from first render without guarding it.
 *
 * The ref deliberately stays small: everything else (zoom, paging, formatting queries,
 * document state) is reachable through the full facade via `getEditor`, so the ref never
 * mirrors capabilities the `Editor` contract already names.
 */
interface DocxEditorRef {
    /** Load a document: DOCX bytes or an existing handle. No-op before mount. */
    load(document: DocumentSource): void;
    /** Serialize the current document; `null` when no editor is mounted. */
    save(): Promise<ArrayBuffer | null>;
    /** Identity and revision of the loaded document; `null` before mount. */
    getDocumentHandle(): DocumentHandle | null;
    /** The full `Editor` facade for advanced callers; `null` before mount. */
    getEditor(): Editor | null;
    focus(): void;
    /** Run a typed command through the facade; refused with `notFound` before mount. */
    exec(command: EditorCommand, options?: {
        scope?: EditorScope;
    }): ExecResult;
    /** The current read model; a loading, non-editable snapshot before mount. */
    snapshot(options?: {
        scope?: EditorScope;
    }): EditorSnapshot;
}

/**
 * The composed editor component with its composition primitives attached as statics,
 * so `<DocxEditor.Root>`, `<DocxEditor.Viewport>`, and `<DocxEditor.Content>` work
 * without extra imports.
 *
 * @public
 */
interface DocxEditorNamespace extends ForwardRefExoticComponent<DocxEditorProps & RefAttributes<DocxEditorRef>> {
    readonly Root: typeof DocxEditorRoot;
    readonly Viewport: typeof DocxEditorViewport;
    readonly Content: typeof DocxEditorContent;
    readonly Toolbar: typeof DocxEditorToolbar;
    /**
     * The menu bar — File · Format · Insert · Help — with its parts as statics (`.File`,
     * `.Format`, `.Insert`, `.Help`, `.Item`, `.Row`, `.Submenu`, `.TableGrid`, …). Mounted
     * by default under the title; `menu={false}` removes it.
     */
    readonly Menu: typeof DocxEditorMenu;
    /** Conditional loading screen: renders while there is no document to paint. */
    readonly Loading: typeof DocxEditorLoading;
    /** Context-fed horizontal ruler with draggable margins (props-driven export stays). */
    readonly HorizontalRuler: typeof DocxEditorHorizontalRuler;
    /** Context-fed vertical ruler with draggable margins (props-driven export stays). */
    readonly VerticalRuler: typeof DocxEditorVerticalRuler;
    /** Context-fed heading outline over `Editor.getOutline()`. */
    readonly DocumentOutline: typeof DocxEditorDocumentOutline;
    /**
     * The navigation pane — Headings and Find — with its parts as statics (`.Header`,
     * `.Close`, `.Title`, `.Tabs`, `.Tab`, `.Headings`, `.Find`, `.Toggle`). Mounted by
     * default; `navigation={false}` removes it.
     */
    readonly Navigation: typeof Navigation;
    /** Page Setup dialog — size, orientation, margins — applied as one undo step. */
    readonly PageSetupDialog: typeof DocxEditorPageSetupDialog;
    /** Floating localized page readout for the active viewport. */
    readonly PageNumber: typeof DocxEditorPageNumber;
    /** Word-style notice when document fonts render in substitute faces. */
    readonly FontNotice: typeof DocxEditorFontNotice;
    /** Header/footer scope chrome while editing page furniture. */
    readonly HeaderFooterChrome: typeof DocxEditorHeaderFooterChrome;
    readonly NotesChrome: typeof DocxEditorNotesChrome;
    /**
     * The link popover — target readout, copy, edit, unlink — and its parts. Mounted by
     * default inside the viewport; `hyperlinkPopup={false}` removes it.
     */
    readonly HyperLink: typeof DocxEditorHyperLink;
    /**
     * The right-click menu over the painted document, with its rows as statics (`.Cut`,
     * `.Copy`, `.Paste`, `.Delete`, `.SelectAll`, `.Item`, `.Slot`, `.Submenu`, …). Mounted
     * by default inside the viewport; `contextMenu={false}` removes it and lets the
     * browser's own menu through.
     */
    readonly ContextMenu: typeof ContextMenu;
    /**
     * The content-control inspector — alias, tag, type, lock, placeholder, bound — and
     * remove-keeping-content. Mounted by default inside the viewport; opens from the
     * `contentControl.inspector` chrome slot.
     */
    readonly ContentControl: typeof DocxEditorContentControl;
}
declare const DocxEditor: DocxEditorNamespace;

/**
 * The editor instance from the nearest `DocxEditor.Root`, or `null` before the Root's
 * mount effect has created it (and outside any Root). Deliberately not a throwing
 * variant: pre-mount is a normal frame every consumer renders through, and the state
 * hooks built on this already answer it with a typed loading snapshot.
 *
 * @public
 */
declare function useDocxEditor(): DocxEditorInstance | null;
/**
 * Whether a review rail is mounted under this Root, and how much room it wants.
 *
 * The GUTTER is the reason this exists. `DocxEditor.Viewport` reserves space beside the
 * page for the pane, and the ruler shifts by the same amount — but neither of them can see
 * whether a rail was actually composed in. Keyed on the pane's open state alone, every
 * consumer of the tier-2 `<DocxEditor>` sugar (which mounts no rail) had its page pushed
 * 158px off centre beside an empty column.
 *
 * A rail registers on mount and unregisters on unmount, so the reservation follows what is
 * really on screen. Count rather than boolean: StrictMode mounts twice, and a host may
 * legitimately compose two rails.
 */
interface ReviewRailRegistry {
    readonly mounted: number;
    readonly register: () => () => void;
}
declare const ReviewRailContext: react.Context<ReviewRailRegistry | null>;

interface SlotProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    /** Fanned out alongside the child's own ref. */
    ref?: Ref<unknown>;
}
/** Renders its single child element with the slot's props merged in. */
declare function Slot({ children, ...slotProps }: SlotProps): ReactElement<unknown, string | react.JSXElementConstructor<any>> | null;

interface LocaleProviderProps {
    i18n?: Translations;
    children: ReactNode;
}
declare function LocaleProvider({ i18n, children }: LocaleProviderProps): react.JSX.Element;
declare function useTranslation(): {
    t: TFunction;
};

/**
 * A chrome-part label resolver: plain string keys, optional interpolation params.
 *
 * This is the shape every packaged part's `t` prop accepts. It takes `string` rather
 * than the `TranslationKey` union so a host can route its own extra keys through the
 * same resolver.
 *
 * @public
 */
type ChromeTranslate = (key: string, params?: Record<string, string | number>) => string;
/**
 * The catalogue-backed resolver for composed chrome, ready to pass as any part's `t`.
 *
 * `useTranslation().t` is keyed by the strict `TranslationKey` union, which does not
 * assign to the parts' plain-`string` `t` props — so before this hook, every composing
 * host hand-wrote the same cast wrapper `<DocxEditor>` builds internally. This is that
 * wrapper, exported: it resolves through the active `LocaleContext` catalogue (bundled
 * English by default), with `overrides` consulted first for key-level renames.
 *
 * ```tsx
 * const MY_LABELS = new Map([['formattingBar.bold', 'Heavy']]); // module-level: stable identity
 *
 * const t = useChromeTranslate(MY_LABELS);
 * <DocxEditor.Toolbar t={t} />
 * ```
 *
 * Keep the `overrides` Map identity stable (module-level or memoized) — the returned
 * resolver is memoized on it, and an inline `new Map(...)` re-creates the resolver, and
 * with it every consuming part's props, on each render.
 *
 * `overrides` is a `Map` on purpose: the key is caller input, and an object literal
 * would answer `constructor` and `toString` off the prototype chain. Parts pass no
 * `params` today for overridden keys, so override values are literal strings.
 *
 * @public
 */
declare function useChromeTranslate(overrides?: ReadonlyMap<string, string>): ChromeTranslate;

/** Live furniture scope state from `Editor.getHeaderFooterState()`. */
type HeaderFooterState = Exclude<ReturnType<Editor['getHeaderFooterState']>, null>;
/**
 * Subscribe to `getHeaderFooterState()` with reference-stable results when unchanged.
 *
 * @public
 */
declare function useHeaderFooterState(): HeaderFooterState | null;

/** Where the popover sits, in viewport coordinates. */
interface HyperlinkPopupAnchor {
    readonly left: number;
    readonly top: number;
}
/** What the popover is showing. @public */
type HyperlinkPopupMode = 
/** Not shown. */
'closed'
/** An existing link: its target, plus copy / edit / unlink. */
 | 'reading'
/** Text + URL fields, for a new link or a change to an existing one. */
 | 'editing';
/** The popover's observable state. @public */
interface HyperlinkPopupState {
    readonly mode: HyperlinkPopupMode;
    /** The link being read or edited, or null while inserting a new one. */
    readonly link: SurfaceHyperlink | null;
    /** Viewport position for the panel; null means "the host places it". */
    readonly anchor: HyperlinkPopupAnchor | null;
    /** Draft display text, in edit mode. */
    readonly text: string;
    /** Draft target, in edit mode. */
    readonly url: string;
    /** True after a copy, until the next state change — for a "Copied" confirmation. */
    readonly copied: boolean;
    /** True when the last Apply was refused, so the panel can say so instead of sitting there. */
    readonly error: boolean;
    /** Whether the document can be edited right now; read-only trims the actions. */
    readonly canEdit: boolean;
}
/** What `useHyperlinkPopup` answers. @public */
interface UseHyperlinkPopupResult {
    readonly state: HyperlinkPopupState;
    /** Open in reading mode over a link, or in editing mode when there is none. */
    open: (link?: SurfaceHyperlink | null, anchor?: HyperlinkPopupAnchor | null) => void;
    /**
     * Open insert-or-edit for the SELECTION — what Ctrl/Cmd+K and the toolbar's link button
     * do. Anchors itself at the caret, seeds the display text from the selection, and opens
     * edit mode pre-filled when the caret is already inside a link.
     */
    openAtCaret: () => void;
    close: () => void;
    /** Copy the sanitized target. Answers false when there is nothing safe to copy. */
    copy: () => Promise<boolean>;
    /** Switch to editing, seeded from the link at the caret. */
    beginEdit: () => void;
    setText: (text: string) => void;
    setUrl: (url: string) => void;
    /** Apply the draft. Answers false when the engine refused it (a bad scheme, no text). */
    commitEdit: () => boolean;
    /** Take the link off, keeping its text. */
    unlink: () => boolean;
    /**
     * Open the target in a new tab, through the engine's single `window.open` gate. Answers
     * false for an inert link — there is nothing to open, and this never invents a URL.
     */
    openTarget: () => boolean;
}
/**
 * The hyperlink popover's behavior.
 *
 * Inside a `DocxEditor.HyperLink` (which the packaged editor mounts by default) this is the
 * SHARED state that compound is driving, so a custom toolbar button and the popover agree.
 * Outside one it is a standalone instance that registers with the engine itself — a host
 * building its own link UI from scratch needs nothing else.
 *
 * @public
 */
declare function useHyperlinkPopup(): UseHyperlinkPopupResult;
/**
 * A popover instance. `active` gates ENGINE REGISTRATION only — an instance created inside
 * a provider still exists, it just does not compete for the surface's chrome handlers.
 *
 * @public
 */
declare function useHyperlinkPopupInstance(active?: boolean): UseHyperlinkPopupResult;

/** A complete configuration, or a fragment this hook composes with the defaults. @public */
type DocxFontsInput = FontConfiguration | FontConfigurationFragment;
/**
 * How a host supplies fonts: a value, a promise, or a function returning either.
 *
 * The function form is the useful one — `{ fonts: defaultFonts }` from
 * `@docx-editor.dev/fonts` — because it defers the work until the hook actually runs it.
 *
 * @public
 */
type DocxFontsSource = DocxFontsInput | Promise<DocxFontsInput> | (() => DocxFontsInput | Promise<DocxFontsInput>);
/** What the document itself can be: a URL to fetch, or bytes already in hand. @public */
type DocxSource = string | URL | Uint8Array | ArrayBuffer;
/** Options for {@link useDocxSource}. @public */
interface UseDocxSourceOptions {
    fonts?: DocxFontsSource;
    /** Passed to `fetch` for a URL source — credentials, headers, an AbortSignal's siblings. */
    fetchOptions?: RequestInit;
}
/** What {@link useDocxSource} reports. @public */
interface UseDocxSourceResult {
    /** Bytes for `DocxEditor`'s `document` prop; undefined until they arrive. */
    readonly document: Uint8Array | undefined;
    /** Composed configuration for the `fonts` prop; undefined until fonts settle. */
    readonly fonts: FontConfiguration | undefined;
    /** Why the DOCUMENT could not be opened. Font failures never land here — see below. */
    readonly error: Error | null;
    /** True until the document either arrives or fails. */
    readonly isLoading: boolean;
}
/**
 * Load a document (and optionally fonts) for `DocxEditor`.
 *
 * ```tsx
 * const { document, fonts, error } = useDocxSource(url, { fonts: defaultFonts });
 * if (error) return <p>{error.message}</p>;
 * return <DocxEditor document={document} fonts={fonts} />;
 * ```
 *
 * FONTS NEVER FAIL THE DOCUMENT. A face that will not load degrades that family to
 * fixed-width measurement — the document still opens, it just paginates less like Word — so
 * a font failure leaves `error` null and is the loader's to report. A document failure is
 * different: there is nothing to show, so it lands on `error`.
 *
 * THE DOCUMENT WAITS FOR THE FONTS. They fetch concurrently, but `document` stays undefined
 * until fonts have settled — resolved OR failed — because layout MEASURES with them. Handing
 * the editor bytes first paginates the whole document on the fixed fallback and then
 * re-paginates when the real faces arrive, which the reader sees as the text jumping. One
 * slightly longer wait beats a visible reflow. Without a `fonts` option there is nothing to
 * wait for and the bytes go straight through.
 *
 * A URL is fetched with the browser's own `fetch`, exactly as the caller wrote it. Validate
 * it first if it came from user input: this hook adds no allowlist of its own, and inventing
 * one would only give callers a false sense of where the trust boundary is.
 *
 * @public
 */
declare function useDocxSource(source: DocxSource | null | undefined, options?: UseDocxSourceOptions): UseDocxSourceResult;

/**
 * Anything that can describe fonts: a resolved configuration, a bare fragment, a promise
 * for either (what a loader like `defaultFonts()` returns), or an on-demand
 * {@link FontResolver}.
 *
 * @public
 */
type FontsInput = FontConfiguration | FontConfigurationFragment | FontResolver | Promise<FontConfiguration | FontConfigurationFragment | undefined> | undefined;
/**
 * Merge font origins into one stable value for `DocxEditor.Root`'s `fonts` prop.
 *
 * ```tsx
 * // On demand: only the families this document names are fetched.
 * const fonts = useFonts(googleFonts());
 *
 * // On demand, plus brand faces you always want.
 * const fonts = useFonts(googleFonts(), brandFragment);
 *
 * // Eager, from the bundled substitutes.
 * const fonts = useFonts(defaultFonts());
 *
 * return <DocxEditor.Root fonts={fonts}>{children}</DocxEditor.Root>;
 * ```
 *
 * Origins compose first-wins in argument order, exactly like `composeFontConfiguration`:
 * the first argument beats later ones, and any of them beats a substitution for a family
 * some origin supplies directly.
 *
 * The returned resolver never changes identity, so the editor is never rebuilt on account
 * of this prop — which also means the arguments are re-read per LOAD rather than per
 * render. Changing them mid-document does not re-resolve fonts; load a document, or
 * remount, for new fonts to take effect.
 *
 * @public
 */
declare function useFonts(source: FontsInput, ...fragments: readonly (FontConfigurationFragment | undefined)[]): FontResolver;

/**
 * OOXML content-control lock axis, mirrored from layout boundary records for the
 * React-only inspector surface — adapters must not import the layout package.
 *
 * @public
 */
type ContentControlLock = 'unlocked' | 'sdtLocked' | 'contentLocked' | 'sdtContentLocked';
/** Chrome slots for the content-control group (design S14). @public */
declare const CONTENT_CONTROL_SLOTS: {
    readonly showAll: "contentControl.showAll";
    readonly formFill: "contentControl.formFill";
    readonly inspector: "contentControl.inspector";
    readonly remove: "contentControl.remove";
};
/** @public */
type ContentControlSlotId = (typeof CONTENT_CONTROL_SLOTS)[keyof typeof CONTENT_CONTROL_SLOTS];
/**
 * Live inspector model for the control at the caret.
 *
 * `locked` is the content-edit axis. Removal lock is reported separately via
 * `removalLocked` from the boundary's effective lock / surface disabled reason.
 *
 * @public
 */
interface ContentControlInspectorState {
    readonly id: string;
    readonly tag: string | null;
    readonly alias: string | null;
    readonly controlType: ContentControlType;
    /** Content-edit locked (`contentLocked` / `sdtContentLocked` union). */
    readonly locked: boolean;
    /** Wrapper removal refused (`sdtLocked` / `sdtContentLocked` union). */
    readonly removalLocked: boolean;
    readonly placeholder: boolean;
    readonly bound: boolean;
    readonly effectiveLock: ContentControlLock | null;
}
/** What `useContentControl` answers. @public */
interface UseContentControlResult {
    /** The control at the caret, or null when the caret is outside every control. */
    readonly control: ContentControlInspectorState | null;
    /** Every control in reading order. */
    readonly controls: readonly ContentControlSummary[];
    /** Whether show-all boundary chrome is on. */
    readonly showAll: boolean;
    /** Whether form-fill Tab navigation is on. */
    readonly formFill: boolean;
    /** Whether the inspector panel is open. */
    readonly inspectorOpen: boolean;
    /** Document is editable and a control at the caret allows value edits. */
    readonly canSetValue: boolean;
    /** Document is editable, a control is at the caret, and removal is not locked. */
    readonly canRemove: boolean;
    /** Engine reason when set-value would be refused, else null. */
    readonly setValueDisabledReason: string | null;
    /** Engine reason when remove would be refused, else null. */
    readonly removeDisabledReason: string | null;
    readonly setShowAll: (show: boolean) => void;
    readonly toggleShowAll: () => void;
    readonly setFormFill: (on: boolean) => void;
    readonly toggleFormFill: () => void;
    readonly openInspector: () => void;
    readonly closeInspector: () => void;
    readonly toggleInspector: () => void;
    /** Unwrap the control at the caret, keeping content. */
    readonly remove: () => ExecResult;
    /** Set the control's value (string mapped by type inside the engine). */
    readonly setValue: (value: string) => ExecResult;
}
/**
 * Headless content-control chrome. Mount under `DocxEditor.Root`.
 *
 * Both the context-provided instance and a local fallback run every render (same order),
 * matching `useHyperlinkPopup`.
 *
 * @public
 */
declare function useContentControl(): UseContentControlResult;
/**
 * Create the content-control chrome state. Used by `DocxEditor.Root` to publish one
 * shared instance; also usable in tests without the provider.
 *
 * @public
 */
declare function useContentControlInstance(): UseContentControlResult;

/** Optional lifecycle hooks for test instrumentation. @internal */
interface UseEditorStateOptions {
    readonly onSubscribe?: () => void;
    readonly onUnsubscribe?: () => void;
}
/**
 * Subscribe to a slice of the editor's read model. Re-renders the component ONLY when
 * `selector`'s result changes (by `isEqual`, default `Object.is`).
 *
 * Before the editor exists — outside a `DocxEditor.Root`, pre-mount, and on the
 * server — the selector receives a frozen loading snapshot (`isLoading: true`,
 * `page: {current: 0, total: 0}`), never `null`.
 *
 * @public
 */
declare function useEditorState<T>(selector: (snapshot: EditorSnapshot) => T, isEqual?: (a: T, b: T) => boolean, options?: UseEditorStateOptions): T;

/** What {@link useZoom} answers. @public */
interface UseZoomResult {
    /** The scale in force, resolved. 1 is 100%. */
    readonly zoom: number;
    /** Where {@link UseZoomResult.zoom} came from. Fixed until an implementation says otherwise. */
    readonly mode: ZoomMode;
    /** Whether the editor is tracking the viewport rather than holding a number. */
    readonly isFit: boolean;
    /** Set a fixed scale. Leaves any fit mode, the same as picking a level in the toolbar. */
    readonly setZoom: (zoom: number) => void;
    readonly setMode: (mode: ZoomMode | 'auto') => void;
    /** Fit the page width and keep fitting: shrink AND grow with the viewport. */
    readonly fitToWidth: () => void;
    /** The default: fit the page width, never past 100%. */
    readonly auto: () => void;
    /** Back to a plain, untracked 100%. */
    readonly reset: () => void;
    readonly zoomIn: () => void;
    readonly zoomOut: () => void;
    readonly canZoomIn: boolean;
    readonly canZoomOut: boolean;
    /** The ladder the steppers walk, so a custom control shows the same levels. */
    readonly levels: readonly number[];
}
/**
 * Read and drive the document's zoom.
 *
 * ```tsx
 * const { zoom, isFit, auto, zoomIn } = useZoom();
 * <button onClick={auto} aria-pressed={isFit}>Fit</button>
 * <span>{Math.round(zoom * 100)}%</span>
 * ```
 *
 * Outside a `DocxEditor.Root` — and before the editor is created — this reports 100% fixed
 * and every action is a no-op, so a control can render unconditionally.
 *
 * @public
 */
declare function useZoom(): UseZoomResult;

/**
 * A caret position: a paragraph and a UTF-16 offset inside it — the shape the write APIs take
 * as their `at`.
 *
 * @public
 */
interface EditorCaret {
    readonly paragraphId: string;
    readonly offset: number;
}
/**
 * The caret's paragraph and offset, or null when nothing is placed.
 *
 * Compared by value, so a consumer re-renders only when the caret actually moves.
 *
 * ```tsx
 * const caret = useEditorCaret();
 * // …later, in a menu row that inserts at where the user was reading:
 * insertCustomNode(editor, citation, attrs, label, caret ? { at: caret } : {});
 * ```
 *
 * @public
 */
declare function useEditorCaret(): EditorCaret | null;

/**
 * The live state of one editor control, plus its action.
 *
 * @public
 */
interface EditorCommandState {
    /**
     * Run the command through the can-before-exec path.
     *
     * @returns `true` when the engine accepted and ran the command; `false` on refusal.
     */
    readonly execute: () => boolean;
    /** Whether the command is currently applied at the selection (bold on bold text). */
    readonly isActive: boolean;
    /** Whether the engine will honour the command right now. */
    readonly isEnabled: boolean;
    /** The engine's reason when disabled — surface it as a tooltip, never invent one. */
    readonly disabledReason: string | null;
}
/**
 * Bind a chrome slot (`'text.bold'`, `'history.undo'`, …) or a raw `EditorCommand`
 * (`{ type: 'selectAll' }`) to the editor. The result object is identity-stable while its
 * fields are unchanged, so it can sit in dependency arrays and `memo` props without churn.
 *
 * @public
 */
declare function useEditorCommand(target: ChromeSlotId | EditorCommand): EditorCommandState;

/**
 * Live state for a value-typed toolbar control.
 *
 * @public
 */
interface EditorValueCommandState<T extends string | number> {
    readonly execute: (value: T) => void;
    readonly value: T | null;
    readonly options: readonly T[];
    readonly isEnabled: boolean;
    readonly disabledReason: string | null;
}
/**
 * Bind a value-typed chrome slot (`image.wrap`, `image.altText`) to the editor.
 *
 * @public
 */
declare function useEditorValueCommand(slotId: 'image.wrap'): EditorValueCommandState<ImageWrapTarget>;
/**
 * @public
 */
declare function useEditorValueCommand(slotId: 'image.altText'): EditorValueCommandState<string>;

/**
 * Subscribe to an editor event (`'change'`, `'selectionChange'`, `'error'`, …) for the
 * lifetime of the component. No-op until the nearest `DocxEditor.Root` has created the
 * editor; resubscribes automatically when the instance is replaced.
 *
 * @public
 */
declare function useEditorEvent<E extends keyof EditorEvents>(event: E, handler: EditorEvents[E]): void;

/**
 * The fields `apply` accepts — twips throughout, like every read shape. Omitted fields
 * are left as authored. `scope` is Word's "Apply to": `'document'` (the default) writes
 * every section, `'section'` only the one the selection is in.
 *
 * @public
 */
interface PageSetupUpdate {
    readonly pageWidthTwips?: number;
    readonly pageHeightTwips?: number;
    readonly orientation?: 'portrait' | 'landscape';
    readonly marginTopTwips?: number;
    readonly marginRightTwips?: number;
    readonly marginBottomTwips?: number;
    readonly marginLeftTwips?: number;
    readonly scope?: 'document' | 'section';
}
/** What `usePageSetup` returns. @public */
interface UsePageSetupReturn {
    /** The CARET section's page setup, or null while nothing is loaded. Reference-stable. */
    readonly pageSetup: PageSetup | null;
    /** Whether the engine can write page setup right now (mounted, editable). */
    readonly isEnabled: boolean;
    /** Write the given fields as one undoable step. Returns whether the engine accepted. */
    readonly apply: (update: PageSetupUpdate) => boolean;
}
/**
 * The section's page setup — size, orientation, margins — plus the command to change it.
 *
 * Reads `snapshot().pageSetup`, which is reference-stable across ticks that did not move
 * the section, so a subscriber re-renders only when the page actually changes shape. In
 * a multi-section document it reflects the CARET's section, as Word's ruler does.
 *
 * @public
 */
declare function usePageSetup(): UsePageSetupReturn;

/**
 * The fields `apply` accepts — twips throughout, like every other read shape here.
 *
 * Omitted fields are left as authored; `null` CLEARS one, so the paragraph falls back to
 * its style. That is a different thing from zero, which blocks the cascade — the same
 * distinction `setParagraphSpacing` draws.
 *
 * `firstLine` is ONE SIGNED offset from the left indent: negative IS the hanging indent.
 * OOXML spells it as two mutually exclusive attributes, and a caller should not have to
 * know which of them wins.
 *
 * @public
 */
interface IndentUpdate {
    readonly left?: number | null;
    readonly right?: number | null;
    readonly firstLine?: number | null;
}
/** What `useParagraphIndent` returns. @public */
interface UseParagraphIndentReturn {
    /**
     * The EFFECTIVE indent at the selection — style and numbering cascade included — or
     * null with no document, and inside a table.
     *
     * The values are the FIRST touched paragraph's, with `mixed` reporting per field
     * whether the rest agree. Unlike the other formatting reads it does not go null on
     * disagreement: a ruler has to draw its handles somewhere, and Word draws them at the
     * first selected paragraph rather than hiding them.
     *
     * Reference-stable across ticks that did not move it, so a subscriber re-renders only
     * when the indent actually changes.
     */
    readonly indent: IndentFormatting | null;
    /** Whether the engine can write indent right now (mounted, editable). */
    readonly isEnabled: boolean;
    /** Write the given fields as one undoable step. Returns whether the engine accepted. */
    readonly apply: (update: IndentUpdate) => boolean;
}
/**
 * The selection's paragraph indent — left, right, and the signed first line — plus the
 * command to change it.
 *
 * This is what `DocxEditor.HorizontalRuler` drives its four handles from. A host that
 * wants its own indent chrome takes the hook and renders whatever it likes; the ruler's
 * drag geometry is separately available as pure functions
 * (`dragIndent` / `handlePosition` from the engine).
 *
 * @public
 */
declare function useParagraphIndent(): UseParagraphIndentReturn;

interface PaginatedDocxEditorProps {
    /** The document to open. Replacing it remounts the surface. */
    readonly source: Uint8Array;
    /** Points to CSS pixels. */
    readonly scale?: number;
    /** Host-supplied font metrics; layout stays DOM-free without it. */
    readonly measurer?: TextMeasurer;
    /** Called on every committed revision and every selection change. */
    readonly onStateChange?: (state: PaginatedSurfaceState) => void;
    /** Called once if the document cannot be opened, with the engine's typed reason. */
    readonly onError?: (reason: string, detail?: string) => void;
    readonly className?: string;
    /**
     * The face runs naming no font are painted in.
     *
     * Applied to the DOCUMENT container only. Setting it on an ancestor leaks the document's
     * face into the surrounding chrome — a measured text face is chosen to match what the
     * shaper measured, and it renders the toolbar and the brand lockup heavier than the UI
     * font they were designed in.
     */
    readonly documentFontFamily?: string;
    readonly ref?: Ref<PaginatedDocxEditorHandle>;
}
/**
 * What a host can drive from outside.
 *
 * Commands only. There is no accessor for the document or the layout, because a caller
 * holding either could act on a revision the model has already left behind.
 */
interface PaginatedDocxEditorHandle {
    focus(): void;
    type(text: string): void;
    undo(): void;
    redo(): void;
    selectAll(): void;
    navigate(command: NavigationCommand, extend?: boolean): void;
    toggleRunProperty(localName: string, attributes?: Record<string, string>): void;
    setRunProperty(localName: string, attributes?: Record<string, string>): void;
    setParagraphProperty(localName: string, attributes?: Record<string, string>): void;
    /** Formatting at the selection, for a toolbar to reflect. */
    formatting(): SurfaceFormatting | null;
    /** The section the document declares — what a ruler is made of. */
    sectionProperties(): SectionProperties | null;
    /** Serialize the current document. */
    save(): Uint8Array | null;
}
declare function PaginatedDocxEditor({ source, scale, measurer, onStateChange, onError, className, documentFontFamily, ref, }: PaginatedDocxEditorProps): react.JSX.Element;

interface PaginatedDocxEditorShellProps {
    readonly source: Uint8Array;
    /** Shown in the title bar. */
    readonly documentName?: string;
    readonly scale?: number;
    readonly measurer?: TextMeasurer;
    readonly onStateChange?: (state: PaginatedSurfaceState) => void;
    readonly onError?: (reason: string, detail?: string) => void;
    /** Called with the serialized document when File ▸ Save is used. */
    readonly onSave?: (bytes: Uint8Array) => void;
    /**
     * Title-bar slots, owned by the HOST.
     *
     * Brand lockup, adapter and example switchers on the left; document actions on the right.
     * They belong to whoever embeds the editor — a demo's switchers are not editor chrome, and
     * baking them in would ship them to every consumer.
     */
    readonly renderTitleBarLeft?: () => ReactNode;
    readonly renderTitleBarRight?: () => ReactNode;
    /** Commands, forwarded from the editor the shell hosts. */
    readonly ref?: Ref<PaginatedDocxEditorHandle>;
    /** Applies the editor's own dark palette; the document canvas stays Word-faithful. */
    readonly colorMode?: 'light' | 'dark';
    /** Reported when the zoom control changes, so the host can re-scale the surface. */
    readonly onZoomChange?: (zoom: number) => void;
    /** The face the document is painted in; never applied to the chrome. */
    readonly documentFontFamily?: string;
    readonly className?: string;
}
declare function PaginatedDocxEditorShell({ source, scale, measurer, documentName, onStateChange, onError, onSave, renderTitleBarLeft, renderTitleBarRight, ref, colorMode, onZoomChange, documentFontFamily, className, }: PaginatedDocxEditorShellProps): react.JSX.Element;

/**
 * The horizontal ruler — page margins plus Word's four indent handles.
 *
 * Margins are the grey zones at either end; dragging the grey/white boundary moves them.
 *
 * The indent handles are Word's, not Google's three:
 *
 *   ▽  first line   at leftMargin + left + firstLine
 *   △  hanging      at leftMargin + left      — drags `left`, PINS the first-line marker
 *   ▭  left box     at leftMargin + left      — drags `left`, TAKES the first line with it
 *   △  right        at pageWidth - rightMargin - right
 *
 * The hanging triangle and the left box are coincident horizontally, as in Word, and are
 * separated vertically instead — the box sits below the strip. They differ only in what a
 * drag takes with them.
 *
 * All the arithmetic lives in the engine (`ruler-indent.ts`), including the snap grid and
 * the clamps, so this file only converts pixels to twips and paints.
 */

/**
 * Section page setup as the engine reports it (`Editor.getPageSetup()`) —
 * page size, orientation, and margins, in twips. Derived from the contract.
 */
type RulerPageSetup = NonNullable<ReturnType<Editor['getPageSetup']>>;
/**
 * A tab stop the ruler paints. `position` is twips from the left margin edge —
 * the same value the `removeTabMark` command takes as `positionTwips`.
 */
interface RulerTabStop {
    position: number;
    alignment: 'left' | 'center' | 'right' | 'decimal' | 'bar';
}
interface HorizontalRulerProps$1 {
    pageSetup?: RulerPageSetup | null;
    zoom?: number;
    /** Whether the MARGIN handles drag. */
    editable?: boolean;
    onLeftMarginChange?: (marginTwips: number) => void;
    onRightMarginChange?: (marginTwips: number) => void;
    /** Fires when a margin drag is released — the moment to commit what the drag previewed. */
    onMarginDragEnd?: () => void;
    /**
     * Paint the four indent handles.
     *
     * Off by default so a ruler with no paragraph context does not show handles pinned at
     * zero. When on they are painted whatever `indentEditable` says: Word shows the markers
     * on a read-only document and simply refuses the drag, and hiding them would remove the
     * only place a reader can see a paragraph's indents.
     */
    showIndentHandles?: boolean;
    /** The paragraph's indent in twips; `firstLine` is SIGNED, negative for a hanging. */
    indent?: RulerIndent | null;
    /** Whether the INDENT handles drag — a different capability from `editable`. */
    indentEditable?: boolean;
    /** Fires continuously through an indent drag, for the host to preview. */
    onIndentChange?: (indent: RulerIndent) => void;
    /** Fires when an indent drag is released — the moment to commit one undoable step. */
    onIndentDragEnd?: () => void;
    unit?: 'inch' | 'cm';
    className?: string;
    style?: CSSProperties;
    tabMarks?: RulerTabStop[] | null;
    onTabMarkRemove?: (positionTwips: number) => void;
}
declare function HorizontalRuler({ pageSetup, zoom, editable, onLeftMarginChange, onRightMarginChange, onMarginDragEnd, showIndentHandles, indent, indentEditable, onIndentChange, onIndentDragEnd, unit, className, style, tabMarks, onTabMarkRemove, }: HorizontalRulerProps$1): react__default.ReactElement;

/**
 * One heading of the engine's outline (`Editor.getOutline()`): text, level,
 * and the block id `Editor.scrollToBlock` accepts. Derived from the contract.
 */
type OutlineHeading = ReturnType<Editor['getOutline']>[number];

/** One tracked change as the engine reports it (`Editor.getTrackedChanges()`). */
type TrackedChangeSummary = ReturnType<Editor['getTrackedChanges']>[number];
interface ScrollPageInfo {
    currentPage: number;
    totalPages: number;
    visible: boolean;
}
interface HorizontalRulerProps {
    pageSetup: RulerPageSetup | undefined;
    zoom: number;
    unit: 'inch' | 'cm';
    editable: boolean;
    onLeftMarginChange: (marginTwips: number) => void;
    onRightMarginChange: (marginTwips: number) => void;
    tabMarks: RulerTabStop[] | null;
    onTabMarkRemove: (positionTwips: number) => void;
}
interface VerticalRulerProps$1 {
    pageSetup: RulerPageSetup | undefined;
    zoom: number;
    unit: 'inch' | 'cm';
    editable: boolean;
    onTopMarginChange: (marginTwips: number) => void;
    onBottomMarginChange: (marginTwips: number) => void;
}
interface OutlineProps {
    headings: readonly OutlineHeading[];
    onHeadingClick: (blockId: string) => void;
    onClose: () => void;
    topOffset: number;
    scrollLeft: number;
}
/**
 * Outer chrome of the editor: i18n + error provider wrappers, the
 * scroll container with its background-click handler, horizontal and
 * vertical rulers, the floating page indicator, document outline panel
 * + toggle button, plus slots for the toolbar, paged-area body,
 * overlays, dialogs, and hidden file inputs.
 *
 * The expanded-sidebar-item highlight styles are computed here from
 * `expandedSidebarItem` + `trackedChanges` because they need to live
 * inside the editor-content `<div>` for proper scoping.
 */
declare function DocxEditorShell({ i18n, isDark, onEditorError, containerRef, scrollContainerRef, editorContentRef, className, containerStyle, mainContentStyle, editorContainerStyle, showRuler, readOnlyProp, showOutline, showOutlineButton, sidebarOpen, minLayoutWidth, toolbarHeight, editorScrollLeft, expandedSidebarItem, trackedChanges, onScrollContainerMouseDown, onEditorBgMouseDown, onEditorContextMenu, horizontalRulerProps, verticalRulerProps, outlineProps, onToggleOutline, scrollPageInfo, toolbar, pagedArea, overlays, dialogs, fileInputs, }: {
    i18n: React.ComponentProps<typeof LocaleProvider>['i18n'];
    isDark?: boolean;
    onEditorError: (error: Error) => void;
    containerRef: React.Ref<HTMLDivElement>;
    scrollContainerRef: React.Ref<HTMLDivElement>;
    editorContentRef: React.Ref<HTMLDivElement>;
    className: string | undefined;
    containerStyle: CSSProperties;
    mainContentStyle: CSSProperties;
    editorContainerStyle: CSSProperties;
    showRuler: boolean;
    readOnlyProp: boolean | undefined;
    showOutline: boolean;
    showOutlineButton: boolean;
    sidebarOpen: boolean;
    minLayoutWidth: number;
    toolbarHeight: number;
    editorScrollLeft: number;
    expandedSidebarItem: string | null;
    trackedChanges: readonly TrackedChangeSummary[];
    onScrollContainerMouseDown: (e: React.MouseEvent) => void;
    onEditorBgMouseDown: (e: React.MouseEvent) => void;
    onEditorContextMenu: (e: React.MouseEvent) => void;
    horizontalRulerProps: HorizontalRulerProps;
    verticalRulerProps: VerticalRulerProps$1;
    outlineProps: OutlineProps;
    onToggleOutline: () => void;
    scrollPageInfo: ScrollPageInfo;
    toolbar: ReactNode;
    pagedArea: ReactNode;
    overlays: ReactNode;
    dialogs: ReactNode;
    fileInputs: ReactNode;
}): react.JSX.Element;

/**
 * Paragraph-style preview + option resolution — shared between the React and
 * Vue toolbars so the style-picker dropdown looks and behaves identically.
 *
 * Pure logic only: no i18n and no framework CSS types. The returned preview is
 * a plain `{ fontSize, lineHeight, fontWeight?, fontStyle?, color? }` object,
 * which is structurally assignable to both React's `CSSProperties` and Vue's
 * inline-style record, so neither adapter needs a cast. Name localization stays
 * in the adapters (they own the i18n `t()` boundary).
 * @packageDocumentation
 * @public
 */

/**
 * One entry of `Editor.getDocumentStyles()` — the engine's document-style
 * summary the picker consumes. Derived from the contract, not re-declared.
 * @public
 */
type DocumentStyleSummary = ReturnType<Editor['getDocumentStyles']>[number];

/**
 * Alignment Dropdown Component (Google Docs style)
 *
 * A single dropdown button for paragraph alignment controls:
 * - Shows current alignment icon + chevron
 * - Opens a floating panel with Left, Center, Right, Justify options
 * - Active option is highlighted
 */

/**
 * The paragraph alignments this control understands, in OOXML `w:jc`
 * vocabulary (`both` is Word's justify; `distribute` renders as justify).
 * Presentation-only: the dropdown emits the first four.
 */
type ParagraphAlignment = 'left' | 'center' | 'right' | 'both' | 'distribute';

/**
 * Shared FontOption shape + normaliser used by FontPicker components
 * in both adapters. Lifted from packages/react/src/components/ui/
 * normalizeFontFamilies.ts so the type definition has a single home.
 * @packageDocumentation
 * @public
 */
interface FontOption {
    name: string;
    fontFamily: string;
    category?: 'sans-serif' | 'serif' | 'monospace' | 'other';
}

/**
 * Pure list-state helpers used by both adapter toolbars to track
 * whether the selection is in a bullet/numbered list and at what
 * indent level. Lifted from packages/react/src/components/ui/
 * ListButtons.tsx so the React + Vue toolbars share identical
 * state-mutation logic.
 * @packageDocumentation
 * @public
 */
type ListType = 'bullet' | 'numbered' | 'none';
interface ListState {
    type: ListType;
    level: number;
    isInList: boolean;
    numId?: number;
}

/**
 * TableToolbar Component
 *
 * Provides controls for editing tables:
 * - Add row above/below
 * - Add column left/right
 * - Delete row/column
 * - Merge cells
 * - Split cell
 *
 * Shows when cursor is in a table.
 */

/**
 * Table editing action types
 */
type TableAction = 'addRowAbove' | 'addRowBelow' | 'addColumnLeft' | 'addColumnRight' | 'deleteRow' | 'deleteColumn' | 'mergeCells' | 'splitCell' | 'deleteTable' | 'selectTable' | 'selectRow' | 'selectColumn' | 'borderAll' | 'borderOutside' | 'borderInside' | 'borderNone' | 'borderTop' | 'borderBottom' | 'borderLeft' | 'borderRight' | {
    type: 'cellFillColor';
    color: string | null;
} | {
    type: 'borderColor';
    color: string;
} | {
    type: 'borderWidth';
    size: number;
} | {
    type: 'cellBorder';
    side: 'top' | 'bottom' | 'left' | 'right' | 'all';
    style: string;
    size: number;
    color: string;
} | {
    type: 'cellVerticalAlign';
    align: 'top' | 'center' | 'bottom';
} | {
    type: 'cellMargins';
    margins: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
} | {
    type: 'cellTextDirection';
    direction: string | null;
} | {
    type: 'toggleNoWrap';
} | {
    type: 'rowHeight';
    height: number | null;
    rule?: 'auto' | 'atLeast' | 'exact';
} | {
    type: 'toggleHeaderRow';
} | {
    type: 'distributeColumns';
} | {
    type: 'autoFitContents';
} | {
    type: 'tableProperties';
    props: {
        width?: number | null;
        widthType?: string | null;
        justification?: 'left' | 'center' | 'right' | null;
    };
} | {
    type: 'openTableProperties';
} | {
    type: 'applyTableStyle';
    styleId: string;
};

/**
 * Toolbar Component
 *
 * The customizable formatting rail — undo/redo, zoom, styles, fonts,
 * bold/italic/underline, colors, alignment, lists, table/image context,
 * clear formatting. Used standalone (`<Toolbar ...props>`), inside
 * `<EditorToolbar>` (reads from context via `EditorToolbar.Toolbar`), or
 * embedded inline. Also the home of the `ToolbarButton` / `ToolbarGroup` /
 * `ToolbarSeparator` primitives and the shared `FormattingAction` /
 * `SelectionFormatting` / `ToolbarProps` types.
 */

/**
 * Current formatting state of the selection
 */
interface SelectionFormatting {
    /** Whether selected text is bold */
    bold?: boolean;
    /** Whether selected text is italic */
    italic?: boolean;
    /** Whether selected text is underlined */
    underline?: boolean;
    /** Whether selected text has strikethrough */
    strike?: boolean;
    /** Whether selected text is superscript */
    superscript?: boolean;
    /** Whether selected text is subscript */
    subscript?: boolean;
    /** Font family of selected text */
    fontFamily?: string;
    /** Font size of selected text (in half-points) */
    fontSize?: number;
    /** Text color */
    color?: string;
    /** Highlight color */
    highlight?: string;
    /** Paragraph alignment */
    alignment?: ParagraphAlignment;
    /** List state of the current paragraph */
    listState?: ListState;
    /** Line spacing in twips (OOXML value, 240 = single spacing) */
    lineSpacing?: number;
    /** Paragraph style ID */
    styleId?: string;
    /** Paragraph left indentation in twips */
    indentLeft?: number;
    /** Whether the paragraph is RTL (bidi) */
    bidi?: boolean;
}
/**
 * Formatting action types
 */
type FormattingAction = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'superscript' | 'subscript' | 'clearFormatting' | 'bulletList' | 'numberedList' | 'indent' | 'outdent' | 'insertLink' | 'setRtl' | 'setLtr' | {
    type: 'fontFamily';
    value: string;
} | {
    type: 'fontSize';
    value: number;
} | {
    type: 'textColor';
    value: ColorValue | string;
} | {
    type: 'highlightColor';
    value: string;
} | {
    type: 'alignment';
    value: ParagraphAlignment;
} | {
    type: 'lineSpacing';
    value: number;
} | {
    type: 'applyStyle';
    value: string;
};
/**
 * Props for the Toolbar (formatting rail) component
 */
interface ToolbarProps {
    /** Current formatting of the selection */
    currentFormatting?: SelectionFormatting;
    /** Callback when a formatting action is triggered */
    onFormat?: (action: FormattingAction) => void;
    /** Callback for undo action */
    onUndo?: () => void;
    /** Callback for redo action */
    onRedo?: () => void;
    /** Whether undo is available */
    canUndo?: boolean;
    /** Whether redo is available */
    canRedo?: boolean;
    /** Whether the toolbar is disabled */
    disabled?: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
    /** Whether to enable keyboard shortcuts (default: true) */
    enableShortcuts?: boolean;
    /** Ref to the editor container for keyboard events */
    editorRef?: react__default.RefObject<HTMLElement>;
    /** Custom toolbar items to render at the end */
    children?: ReactNode;
    /** When true, renders with display:contents so children flow in the parent flex container */
    inline?: boolean;
    /** Whether to show font family picker (default: true) */
    showFontPicker?: boolean;
    /**
     * Custom list of fonts in the toolbar dropdown. When omitted, the built-in
     * 12-font default is used. Strings render in the "Other" group; pass
     * `FontOption[]` for category grouping and CSS fallback chains.
     * An empty array renders an empty (but enabled) dropdown.
     */
    fontFamilies?: ReadonlyArray<string | FontOption>;
    /**
     * Fonts the loaded document references that the browser can render (embedded
     * faces + system-resolved). Rendered in a "Document fonts" group, deduped
     * against `fontFamilies`. Managed by the editor, not a consumer prop.
     */
    documentFonts?: readonly FontOption[];
    /** Whether to show font size picker (default: true) */
    showFontSizePicker?: boolean;
    /** Whether to show text color picker (default: true) */
    showTextColorPicker?: boolean;
    /** Whether to show highlight color picker (default: true) */
    showHighlightColorPicker?: boolean;
    /** Whether to show alignment buttons (default: true) */
    showAlignmentButtons?: boolean;
    /** Whether to show list buttons (default: true) */
    showListButtons?: boolean;
    /** Whether to show line spacing picker (default: true) */
    showLineSpacingPicker?: boolean;
    /** Whether to show style picker (default: true) */
    showStylePicker?: boolean;
    /** Document styles for the style picker (`Editor.getDocumentStyles()`). */
    documentStyles?: readonly DocumentStyleSummary[];
    /** Theme for the style picker / color picker theme matrix */
    theme?: Theme | null;
    /** Callback for print action. Set to enable the File > Print menu entry. */
    onPrint?: () => void;
    /** Callback to open/import a DOCX file (File → Open) */
    onOpen?: () => void;
    /** Callback to save/download the current DOCX (File → Save) */
    onSave?: () => void;
    /** Whether to show zoom control (default: true) */
    showZoomControl?: boolean;
    /** Current zoom level (1.0 = 100%) */
    zoom?: number;
    /** Callback when zoom changes */
    onZoomChange?: (zoom: number) => void;
    /** Callback to refocus the editor after toolbar interactions */
    onRefocusEditor?: () => void;
    /** Callback when a table should be inserted */
    onInsertTable?: (rows: number, columns: number) => void;
    /** Whether to show table insert button (default: true) */
    showTableInsert?: boolean;
    /** Whether to show the Help menu in the menu bar (default: true) */
    showHelpMenu?: boolean;
    /** Callback when user wants to insert an image */
    onInsertImage?: () => void;
    /** Callback when user wants to insert a page break */
    onInsertPageBreak?: () => void;
    /** Callback when user wants to insert a "next page" section break */
    onInsertSectionBreakNextPage?: () => void;
    /** Callback when user wants to insert a "continuous" section break */
    onInsertSectionBreakContinuous?: () => void;
    /** Callback when user wants to insert a table of contents */
    onInsertTOC?: () => void;
    /** Callback when user wants to insert a shape */
    onInsertShape?: (data: {
        shapeType: string;
        width: number;
        height: number;
        fillColor?: string;
        fillType?: string;
        outlineWidth?: number;
        outlineColor?: string;
    }) => void;
    /** Image context when an image is selected */
    imageContext?: {
        wrapType: string;
        displayMode: string;
        cssFloat: string | null;
    } | null;
    /** Callback when image wrap type changes */
    onImageWrapType?: (wrapType: string) => void;
    /** Callback for image transform (rotate/flip) */
    onImageTransform?: (action: 'rotateCW' | 'rotateCCW' | 'flipH' | 'flipV') => void;
    /** Callback to open image properties dialog (alt text + border) */
    onOpenImageProperties?: () => void;
    /** Callback to open page setup dialog */
    onPageSetup?: () => void;
    /** Callback to open the watermark dialog */
    onWatermark?: () => void;
    /** Table context when cursor is in a table */
    tableContext?: {
        isInTable: boolean;
        rowCount?: number;
        columnCount?: number;
        canSplitCell?: boolean;
        hasMultiCellSelection?: boolean;
        cellBorderColor?: ColorValue;
        cellBackgroundColor?: string;
    } | null;
    /** Callback when a table action is triggered */
    onTableAction?: (action: TableAction) => void;
}
/**
 * Props for individual toolbar buttons
 */
interface ToolbarButtonProps {
    /** Whether the button is in active/pressed state */
    active?: boolean;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Button title/tooltip */
    title?: string;
    /** Click handler */
    onClick?: () => void;
    /** Button content */
    children: ReactNode;
    /** Additional CSS class name */
    className?: string;
    /** ARIA label for accessibility */
    ariaLabel?: string;
}
/**
 * Props for toolbar button groups
 */
interface ToolbarGroupProps {
    /** Group label for accessibility */
    label?: string;
    /** Group content */
    children: ReactNode;
    /** Additional CSS class name */
    className?: string;
}
/**
 * Individual toolbar button with shadcn styling
 */
declare function ToolbarButton({ active, disabled, title, onClick, children, className, ariaLabel, }: ToolbarButtonProps): react__default.JSX.Element;
/**
 * Toolbar button group with modern styling
 */
declare function ToolbarGroup({ label, children, className }: ToolbarGroupProps): react__default.JSX.Element;
/**
 * Icon-based formatting toolbar — undo/redo, zoom, styles, fonts,
 * bold/italic/underline, colors, alignment, lists, table/image context, clear formatting.
 */
declare function Toolbar(explicitProps: ToolbarProps): react__default.JSX.Element;

/**
 * TitleBar and sub-components for the Google Docs-style 2-level toolbar.
 *
 * - TitleBar: two-row layout (row 1: logo + doc name + right actions, row 2: menu bar)
 * - Logo: renders custom logo content left-aligned
 * - DocumentName: editable document name input
 * - MenuBar: File/Format/Insert menus (auto-wired from EditorToolbarContext)
 * - TitleBarRight: right-aligned actions slot
 */

interface LogoProps {
    children: ReactNode;
}
declare function Logo({ children }: LogoProps): react__default.JSX.Element;
interface DocumentNameProps {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    editable?: boolean;
}
declare function DocumentName({ value, onChange, placeholder, editable }: DocumentNameProps): react__default.JSX.Element;
interface TitleBarRightProps {
    children: ReactNode;
}
declare function TitleBarRight({ children }: TitleBarRightProps): react__default.JSX.Element;
declare function MenuBar(): react__default.JSX.Element;
interface TitleBarProps {
    children: ReactNode;
}
/**
 * TitleBar layout (Google Docs style):
 *
 *   ┌──────────┬────────────────────────────┬──────────────────┐
 *   │          │ Document Name              │                  │
 *   │  Logo    │                            │  Right Actions   │
 *   │          │ File  Format  Insert       │                  │
 *   └──────────┴────────────────────────────┴──────────────────┘
 *
 * Logo and TitleBarRight span full height. DocumentName + MenuBar
 * stack vertically in the center column.
 */
declare function TitleBar({ children }: TitleBarProps): react__default.JSX.Element;

/**
 * Floating page indicator shown next to the scrollbar while the user
 * scrolls a multi-page document. Wrapped so the `{current} of {total}`
 * template runs through `t()`; `useTranslation()` only works inside
 * `<LocaleProvider>`, which `DocxEditor`'s own body is not.
 */
declare function PageIndicator({ currentPage, totalPages, visible, }: {
    currentPage: number;
    totalPages: number;
    visible: boolean;
}): react.JSX.Element;

/**
 * VerticalRuler Component
 *
 * A vertical ruler that displays alongside the document with:
 * - Page height scale with tick marks
 * - Top and bottom margin indicators
 * - Optional dragging to adjust margins
 * - Support for zoom levels
 *
 * Similar to Google Docs' vertical ruler.
 */

interface VerticalRulerProps {
    /** Section page setup (`Editor.getPageSetup()`), twips throughout */
    pageSetup?: RulerPageSetup | null;
    /** Zoom level (1.0 = 100%) */
    zoom?: number;
    /** Whether margins can be dragged to adjust */
    editable?: boolean;
    /** Callback when top margin changes (in twips) */
    onTopMarginChange?: (marginTwips: number) => void;
    /** Callback when bottom margin changes (in twips) */
    onBottomMarginChange?: (marginTwips: number) => void;
    /** Fires when a margin drag is released — the moment to commit what the drag previewed. */
    onMarginDragEnd?: () => void;
    /** Unit to display (inches or cm) */
    unit?: 'inch' | 'cm';
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const RULER_WIDTH = 20;
declare function VerticalRuler({ pageSetup, zoom, editable, onTopMarginChange, onBottomMarginChange, onMarginDragEnd, unit, className, style, }: VerticalRulerProps): react__default.ReactElement;

/**
 * Re-render the caller whenever the editor commits a change, moves the
 * selection, or republishes display. Returns a counter that changes on each
 * such event, so it can also be used as a dependency.
 */
declare function useEditorSnapshot(editor: Editor | null): number;

/**
 * @docx-editor.dev/react
 *
 * React adapter for the DOCX editor. A thin renderer over the `Editor`
 * contract from `@docx-editor.dev/core`: it supplies DOM and paints
 * the engine's positioned display list, and holds no editing-engine state.
 *
 * @packageDocumentation
 * @public
 */
declare const VERSION = "0.0.2";

export { CONTENT_CONTROL_SLOTS, type ChromeTranslate, type ContentControlActionProps, type ContentControlInspectorState, type ContentControlLock, type ContentControlPartProps, type ContentControlProps, type ContentControlSlotId, type ContextMenuAnchor, ContextMenuCellVerticalAlignment, type ContextMenuCommandProps, ContextMenuCopy, ContextMenuCut, ContextMenuDelete, ContextMenuDeleteTable, ContextMenuDeleteTableColumn, ContextMenuDeleteTableRow, ContextMenuInsertColumnLeft, ContextMenuInsertColumnRight, ContextMenuInsertRowAbove, ContextMenuInsertRowBelow, ContextMenuItem, type ContextMenuItemProps, ContextMenuPaste, ContextMenuSelectAll, type ContextMenuTableRowProps, DocumentName, DocxEditor, DocxEditorContent, DocxEditorContentControl, type DocxEditorContentControlNamespace, type DocxEditorContentProps, DocxEditorContextMenu, type DocxEditorContextMenuNamespace, type DocxEditorContextMenuProps, DocxEditorDocumentOutline, type DocxEditorDocumentOutlineProps, DocxEditorFontNotice, type DocxEditorFontNoticeProps, DocxEditorHeaderFooterChrome, type DocxEditorHeaderFooterChromeProps, DocxEditorHorizontalRuler, DocxEditorHyperLink, type DocxEditorHyperLinkNamespace, DocxEditorImagePropertiesDialog, type DocxEditorImagePropertiesDialogProps, DocxEditorLoading, type DocxEditorLoadingComponent, type DocxEditorLoadingProps, DocxEditorLoadingSpinner, type DocxEditorLoadingSpinnerProps, DocxEditorMenu, type DocxEditorMenuNamespace, type DocxEditorMenuProps, type DocxEditorNamespace, DocxEditorNavigation, type DocxEditorNavigationNamespace, type DocxEditorNavigationProps, DocxEditorNotesChrome, type DocxEditorNotesChromeProps, DocxEditorPageSetupDialog, type DocxEditorPageSetupDialogProps, type DocxEditorProps, type DocxEditorRef, DocxEditorRoot, type DocxEditorRootProps, type DocxEditorRulerProps, DocxEditorShell, DocxEditorToolbar, type DocxEditorToolbarNamespace, type DocxEditorToolbarProps, DocxEditorVerticalRuler, DocxEditorViewport, type DocxEditorViewportProps, type DocxFontsInput, type DocxFontsSource, type DocxSource, type EditorCaret, type EditorCommandState, type EditorMode, type EditorValueCommandState, type FontFamilyItemProps, type FontFamilyNamespace, type FontFamilyPartProps, type FontFamilyProps, type FontsInput, type HeaderFooterState, HorizontalRuler, type HorizontalRulerProps$1 as HorizontalRulerProps, type HyperLinkActionProps, type HyperLinkPartProps, type HyperLinkProps, type HyperlinkPopupAnchor, type HyperlinkPopupMode, type HyperlinkPopupState, ImageAltText, ImageInsertProvider, ImageInsertTrigger, ImagePropertiesTrigger, ImageWrap, type IndentUpdate, LocaleProvider, Logo, type MenuActionProps, MenuBar, type MenuGroupProps, type MenuId, type MenuItemProps, type MenuPartComponent, type MenuProps, type MenuReportIssueProps, type MenuRowProps, type MenuSeparatorProps, type MenuSubmenuProps, type MenuTableGridProps, NAVIGATION_PANE_GAP, NAVIGATION_PANE_INSET, NAVIGATION_PANE_WIDTH, NavigationClose, NavigationFind, NavigationHeader, NavigationHeadings, type NavigationPartProps, type NavigationShiftInput, NavigationTab, type NavigationTabProps, type NavigationTab$1 as NavigationTabValue, NavigationTabs, NavigationTitle, NavigationToggle, type NormalizedImagePayload, type NotePropertiesState, type OutlineHeading$1 as OutlineHeading, type OutlineHeadingItem, PageIndicator, type PageSetupUpdate, PaginatedDocxEditor, type PaginatedDocxEditorHandle as PaginatedDocxEditorExpose, type PaginatedDocxEditorHandle, type PaginatedDocxEditorProps, PaginatedDocxEditorShell, type PaginatedDocxEditorShellProps, type ParagraphStyleItemProps, type ParagraphStyleNamespace, type ParagraphStyleOption, type ParagraphStylePartProps, type ParagraphStyleProps, RULER_WIDTH, ReviewRailContext, type ReviewRailRegistry, SEARCH_DEBOUNCE_MS, SEARCH_MATCH_LIMIT, Slot, type SlotProps, type TableBorderColorNamespace, type TableBorderStyleNamespace, type TableBorderTargetNamespace, type TableBorderWidthNamespace, type TableCellFillNamespace, type TableChromeItemProps, type TableChromePartComponent, type TableChromePartProps, TitleBar, TitleBarRight, Toolbar, type ToolbarActionProps, type ToolbarAlignmentComponent, ToolbarButton, type ToolbarButtonProps$1 as ToolbarButtonProps, ToolbarGroup, type ToolbarPartComponent, type ToolbarPartProps, type ToolbarProps, type ToolbarSeparatorProps, type ToolbarSlotPartComponent, type ToolbarSlotPartProps, type ToolbarTranslate, type UseContentControlResult, type UseDocumentOutlineResult, type UseDocumentSearchResult, type UseDocxSourceOptions, type UseDocxSourceResult, type UseFontFamilyResult, type UseHyperlinkPopupResult, type UseNavigationPaneOptions, type UseNavigationPaneResult, type UsePageSetupReturn, type UseParagraphIndentReturn, type UseParagraphStyleResult, type UseZoomResult, VERSION, VerticalRuler, type VerticalRulerProps, navigationPaneReservation, navigationShift, normalizeImageBytes, useChromeTranslate, useContentControl, useContentControlInstance, useContextMenuTarget, useDocumentOutline, useDocumentSearch, useDocxEditor, useDocxSource, useEditorCaret, useEditorCommand, useEditorEvent, useEditorSnapshot, useEditorState, useEditorValueCommand, useFontFamily, useFonts, useHeaderFooterState, useHyperlinkPopup, useHyperlinkPopupInstance, useNavigationPane, useNavigationShift, useNotePropertiesState, useNoteScopeState, usePageSetup, useParagraphIndent, useParagraphStyle, useTableBorderTargetLabel, useTranslation, useZoom };
