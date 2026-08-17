/**
 * Shared locale data, types, and runtime helpers for the @docx-editor.dev
 * editor adapters.
 *
 * Import everything from the package root. `sideEffects: false` lets
 * consumer bundlers tree-shake unused locales.
 *
 * ```ts
 * import {
 *   en, de, pl, tr, he, ptBR, zhCN,    // typed locale data
 *   locales,                            // record keyed by BCP-47 tag
 *   deepMerge, createT,                 // build a t() for custom hosts
 *   type LocaleStrings,                 // shape of `en` (source of truth)
 *   type Translations,                  // shape of a community partial
 *   type TranslationKey,                // every valid `t()` key
 *   type LocaleCode,                    // 'en' | 'de' | 'pt-BR' | ...
 * } from '@docx-editor.dev/i18n';
 * ```
 *
 * The React and Vue adapters wrap `createT` in framework-native bindings
 * (`useTranslation`, `LocaleProvider`, etc.); use those for app code.
 * Reach for `createT` directly when building a non-React/Vue host.
 *
 * @packageDocumentation
 * @public
 */
var _lang = "en";
var common = {
	cancel: "Cancel",
	apply: "Apply",
	close: "Close",
	comment: "Comment",
	dismiss: "Dismiss"
};
var toolbar = {
	ariaLabel: "Formatting toolbar",
	file: "File",
	format: "Format",
	insert: "Insert",
	open: "Open",
	openShortcut: "Ctrl+O",
	save: "Save",
	saveShortcut: "Ctrl+S",
	print: "Print",
	printShortcut: "Ctrl+P",
	pageSetup: "Page setup",
	leftToRight: "Left-to-right text",
	rightToLeft: "Right-to-left text",
	image: "Image",
	table: "Table",
	"break": "Break",
	insertFootnote: "Insert Footnote",
	insertEndnote: "Insert Endnote",
	pageBreak: "Page break",
	sectionBreakNextPage: "Section break (next page)",
	sectionBreakContinuous: "Section break (continuous)",
	tableOfContents: "Table of contents",
	watermark: "Watermark",
	help: "Help",
	reportIssue: "Report issue"
};
var toc = {
	refresh: "Refresh table of contents",
	refreshPageNumbers: "Refresh page numbers"
};
var formattingBar = {
	groups: {
		history: "History",
		zoom: "Zoom",
		styles: "Styles",
		font: "Font",
		textFormatting: "Text formatting",
		script: "Script",
		alignment: "Alignment",
		listFormatting: "List formatting",
		image: "Image",
		table: "Table"
	},
	undo: "Undo",
	undoShortcut: "Undo (Ctrl+Z)",
	redo: "Redo",
	redoShortcut: "Redo (Ctrl+Y)",
	bold: "Bold",
	boldShortcut: "Bold (Ctrl+B)",
	italic: "Italic",
	italicShortcut: "Italic (Ctrl+I)",
	underline: "Underline",
	underlineShortcut: "Underline (Ctrl+U)",
	strikethrough: "Strikethrough",
	fontColor: "Font Color",
	highlightColor: "Text Highlight Color",
	insertLink: "Insert link",
	insertLinkShortcut: "Insert link (Ctrl+K)",
	superscript: "Superscript",
	superscriptShortcut: "Superscript (Ctrl+Shift+=)",
	subscript: "Subscript",
	subscriptShortcut: "Subscript (Ctrl+=)",
	imageProperties: "Image properties",
	imagePropertiesShortcut: "Image properties (alt text, border)...",
	imageWrap: "Wrap text",
	altText: "Alt text",
	clearFormatting: "Clear formatting",
	commentsAndChanges: "Comments & Changes",
	more: "More",
	unavailableInPreview: "Not available in this preview build"
};
var alignment = {
	alignLeft: "Align Left",
	alignLeftShortcut: "Ctrl+L",
	center: "Center",
	centerShortcut: "Ctrl+E",
	alignRight: "Align Right",
	alignRightShortcut: "Ctrl+R",
	justify: "Justify",
	justifyShortcut: "Ctrl+J"
};
var lists = {
	ariaLabel: "List formatting",
	typeAriaLabel: "List type",
	indentationAriaLabel: "List indentation",
	bulletList: "Bullet List",
	numberedList: "Numbered List",
	decreaseIndent: "Decrease Indent",
	increaseIndent: "Increase Indent"
};
var lineSpacing = {
	label: "Line spacing",
	single: "Single",
	double: "Double",
	lineSpacingTitle: "Line spacing: {label}",
	blockSpacingRules: "Paragraph spacing",
	addSpaceBefore: "Add space before paragraph",
	removeSpaceBefore: "Remove space before paragraph",
	addSpaceAfter: "Add space after paragraph",
	removeSpaceAfter: "Remove space after paragraph"
};
var styles = {
	selectAriaLabel: "Select paragraph style",
	normalText: "Normal text",
	title: "Title",
	subtitle: "Subtitle",
	heading1: "Heading 1",
	heading2: "Heading 2",
	heading3: "Heading 3"
};
var font = {
	selectAriaLabel: "Select font family",
	sansSerif: "Sans Serif",
	serif: "Serif",
	monospace: "Monospace",
	documentFonts: "Document fonts"
};
var fontSize = {
	decrease: "Decrease font size",
	increase: "Increase font size",
	label: "Font size",
	listLabel: "Font sizes"
};
var zoom = {
	ariaLabel: "Zoom: {label}",
	zoomOut: "Zoom out",
	zoomIn: "Zoom in",
	zoomLevel: "Zoom level",
	automatic: "Automatic",
	fitWidth: "Fit width"
};
var colorPicker = {
	highlightColors: "Highlight Colors",
	customColor: "Custom Color",
	noColor: "No Color",
	automatic: "Automatic",
	themeColors: "Theme Colors",
	theme: {
		background1: "Background 1",
		text1: "Text 1",
		background2: "Background 2",
		text2: "Text 2",
		accent1: "Accent 1",
		accent2: "Accent 2",
		accent3: "Accent 3",
		accent4: "Accent 4",
		accent5: "Accent 5",
		accent6: "Accent 6"
	},
	standardColors: "Standard Colors",
	colors: {
		black: "Black",
		darkRed: "Dark Red",
		red: "Red",
		orange: "Orange",
		yellow: "Yellow",
		darkYellow: "Dark Yellow",
		green: "Green",
		darkGreen: "Dark Green",
		blue: "Blue",
		darkBlue: "Dark Blue",
		purple: "Purple",
		white: "White",
		lightGreen: "Light Green",
		lightBlue: "Light Blue",
		darkGray: "Dark Gray",
		cyan: "Cyan",
		darkCyan: "Dark Cyan",
		magenta: "Magenta",
		darkMagenta: "Dark Magenta",
		lightGray: "Light Gray",
		brightGreen: "Bright Green"
	},
	apply: "Apply"
};
var dialogs = {
	imageProperties: {
		title: "Image Properties",
		altText: "Alt Text",
		altTextPlaceholder: "Describe this image for accessibility...",
		textWrapping: "Text wrapping",
		dimensions: "Dimensions",
		widthLabel: "Width:",
		heightLabel: "Height:",
		lockAspectRatio: "Lock aspect ratio"
	},
	imagePosition: {
		relativeOptions: {
			page: "Page",
			column: "Column",
			margin: "Margin",
			character: "Character",
			paragraph: "Paragraph",
			line: "Line"
		}
	},
	pageSetup: {
		title: "Page Setup",
		pageSize: "PAGE SIZE",
		sizeLabel: "Size",
		custom: "Custom",
		orientation: "Orientation",
		portrait: "Portrait",
		landscape: "Landscape",
		margins: "MARGINS",
		top: "Top",
		bottom: "Bottom",
		left: "Left",
		right: "Right",
		applyTo: "Apply to",
		applyToDocument: "Whole document",
		applyToSection: "This section",
		pageSizes: {
			letter: "Letter (8.5\" × 11\")",
			a4: "A4 (8.27\" × 11.69\")",
			legal: "Legal (8.5\" × 14\")",
			a3: "A3 (11.69\" × 16.54\")",
			a5: "A5 (5.83\" × 8.27\")",
			b5: "B5 (6.93\" × 9.84\")",
			executive: "Executive (7.25\" × 10.5\")"
		}
	},
	footnoteProperties: {
		title: "Footnote & Endnote Properties",
		footnotes: "Footnotes",
		endnotes: "Endnotes",
		position: "Position",
		numberFormat: "Number format",
		numbering: "Numbering",
		footnotePositions: {
			bottomOfPage: "Bottom of page",
			belowText: "Below text"
		},
		endnotePositions: {
			endOfDocument: "End of document",
			endOfSection: "End of section"
		},
		numberingOptions: {
			continuous: "Continuous",
			restartSection: "Restart each section",
			restartPage: "Restart each page"
		},
		formats: {
			decimal: "1, 2, 3, ...",
			lowerRoman: "i, ii, iii, ...",
			upperRoman: "I, II, III, ..."
		}
	}
};
var comments = {
	unknown: "Unknown",
	addComment: "Add a comment...",
	replyPlaceholder: "Reply or add others with @"
};
var revisions = {
	paragraphMarkInserted: "Inserted paragraph break",
	runPropertiesChanged: "Changed text formatting"
};
var contextMenu = {
	ariaLabel: "Context menu",
	cut: "Cut",
	cutShortcut: "Ctrl+X",
	copy: "Copy",
	copyShortcut: "Ctrl+C",
	paste: "Paste",
	pasteShortcut: "Ctrl+V",
	"delete": "Delete",
	deleteShortcut: "Del",
	selectAll: "Select All",
	selectAllShortcut: "Ctrl+A",
	editCustomNode: "Edit {label}",
	removeCustomNode: "Remove {label}"
};
var documentOutline = {
	ariaLabel: "Document outline",
	closeAriaLabel: "Close outline",
	closeTitle: "Close outline",
	title: "Outline",
	noHeadings: "No headings found. Add headings to your document to see them here."
};
var navigation = {
	ariaLabel: "Document navigation",
	title: "Navigation",
	openAriaLabel: "Open navigation",
	openTitle: "Navigation",
	closeAriaLabel: "Close navigation",
	closeTitle: "Close navigation",
	tabs: {
		headings: "Headings",
		find: "Find"
	},
	headings: {
		noHeadings: "No headings found. Add headings to your document to see them here."
	},
	find: {
		placeholder: "Search document",
		inputAriaLabel: "Search document",
		clearAriaLabel: "Clear search",
		previousAriaLabel: "Previous result",
		nextAriaLabel: "Next result",
		matchCase: "Match case",
		wholeWord: "Whole words only",
		optionsAriaLabel: "Search options",
		resultsAriaLabel: "Search results",
		noResults: "No results",
		searching: "Searching…",
		counter: "Result {current} of {total}",
		counterTruncated: "Result {current} of {total}+",
		total: "{total, plural, one {# result} other {# results}}",
		totalTruncated: "{total, plural, other {#+ results}}"
	}
};
var viewer = {
	pageIndicator: "{current} of {total}"
};
var titleBar = {
	untitled: "Untitled",
	documentNameAriaLabel: "Document name",
	menuBarAriaLabel: "Menu bar"
};
var errors = {
	unableToParse: "Unable to Parse Document",
	somethingWentWrong: "Something went wrong",
	errorDescription: "An error occurred while rendering this component. Please try again or contact support if the problem persists.",
	errorLabel: "Error:",
	componentStack: "Component Stack:",
	tryAgain: "Try Again",
	showDetails: "Show details",
	hideDetails: "Hide details"
};
var table = {
	insertRowAbove: "Insert row above",
	insertRowBelow: "Insert row below",
	insertColumnLeft: "Insert column left",
	insertColumnRight: "Insert column right",
	deleteRow: "Delete row",
	deleteColumn: "Delete column",
	deleteTable: "Delete table",
	selectTable: "Select entire table",
	mergeCells: "Merge cells",
	splitCell: "Split cell",
	editingTools: "Table editing tools",
	label: "Table:",
	cellFillColor: "Cell Fill Color",
	borderColor: "Border Color",
	borderWidth: "Border width",
	clearCellFill: "Clear cell fill",
	borderStyles: {
		single: "Solid",
		dashed: "Dashed",
		dotted: "Dotted",
		double: "Double",
		triple: "Triple",
		thick: "Thick"
	},
	borderWidths: {
		halfPt: "0.5 pt",
		onePt: "1 pt",
		oneHalfPt: "1.5 pt",
		twoPt: "2 pt",
		threePt: "3 pt"
	},
	borders: {
		all: "All borders",
		outside: "Outside borders",
		inside: "Inside borders",
		none: "No borders",
		top: "Top border",
		bottom: "Bottom border",
		left: "Left border",
		right: "Right border",
		styleAriaLabel: "Border style",
		tooltip: "Borders"
	},
	moreOptions: "More table options"
};
var tableAdvanced = {
	verticalAlignment: "Vertical alignment",
	top: "Top",
	middle: "Middle",
	bottom: "Bottom",
	toggleNoWrap: "Toggle no-wrap",
	toggleHeaderRow: "Toggle header row",
	distributeColumns: "Distribute columns evenly",
	autoFit: "Auto-fit to contents",
	tableProperties: "Table properties...",
	tableAlignment: "Table alignment",
	alignTableLeft: "Align table left",
	alignTableCenter: "Align table center",
	alignTableRight: "Align table right"
};
var imageTransform = {
	tooltip: "Transform",
	rotateClockwise: "Rotate clockwise",
	rotateCounterClockwise: "Rotate counter-clockwise",
	flipHorizontal: "Flip horizontal",
	flipVertical: "Flip vertical"
};
var imageWrap = {
	inline: "In Line with Text",
	square: "Square",
	tight: "Tight",
	through: "Through",
	floatLeft: "Square Left",
	floatRight: "Square Right",
	topAndBottom: "Top and Bottom",
	behindText: "Behind Text",
	inFrontOfText: "In Front of Text",
	tooltipPrefix: "Wrap: {label}",
	targets: {
		inline: "In Line with Text",
		square: "Square",
		squareLeft: "Square Left",
		squareRight: "Square Right",
		tight: "Tight",
		through: "Through",
		topAndBottom: "Top and Bottom",
		behind: "Behind Text",
		inFront: "In Front of Text"
	},
	menu: {
		inLineWithText: "In Line with Text",
		squareLeft: "Square Left",
		squareRight: "Square Right",
		ariaLabel: "Image layout options"
	}
};
var imageInsert = {
	errors: {
		emptyFile: "The selected file is empty.",
		invalidSignature: "The file is not a supported PNG, JPEG, or GIF image.",
		unsupportedFormat: "This image format is not supported for insertion.",
		oversize: "The image exceeds the maximum allowed size.",
		refused: "The image could not be inserted."
	}
};
var imageProperties = {
	units: {
		points: "pt"
	},
	hyperlink: "Hyperlink",
	crop: "Crop",
	cropLeft: "Left (%)",
	cropTop: "Top (%)",
	cropRight: "Right (%)",
	cropBottom: "Bottom (%)",
	resetNaturalSize: "Reset to natural size",
	nonPictureHint: "Crop and natural-size reset are available only for pictures.",
	errors: {
		invalidDimensions: "Enter positive width and height values.",
		invalidCrop: "Crop values must be percentages from 0 to 100.",
		invalidPosition: "Enter valid horizontal and vertical position values.",
		refused: "These properties could not be applied."
	},
	position: "Position",
	positionUnavailable: "Position is available only for floating images.",
	positionLocked: "This drawing cannot be moved.",
	horizontalOffset: "Horizontal offset",
	verticalOffset: "Vertical offset",
	relativeToHorizontal: "Relative to (horizontal)",
	relativeToVertical: "Relative to (vertical)"
};
var imageAltText = {
	panelTitle: "Alt text",
	title: "Title",
	description: "Description"
};
var editor = {
	showDocumentOutline: "Show document outline",
	linkCopied: "Link copied to clipboard",
	fontSubstitutionNotice: "Some fonts in this document aren't available, so substitutes are shown: {fonts}"
};
var hyperlinkPopup = {
	displayTextPlaceholder: "Display text",
	urlPlaceholder: "https://example.com",
	urlLabel: "URL",
	copyLink: "Copy link",
	editLink: "Edit link",
	removeLink: "Remove link",
	openLink: "Open link",
	apply: "Apply",
	cancel: "Cancel",
	insertTitle: "Insert link",
	editTitle: "Edit link",
	inertTarget: "This link points somewhere the editor will not open",
	bookmarkTarget: "Goes to a place in this document",
	refused: "That link could not be applied. Check the address and try again."
};
var contentControl = {
	group: "Content controls",
	showAll: "Show content control boundaries",
	formFill: "Form-fill mode",
	inspector: "Content control properties",
	remove: "Remove content control",
	inspectorPanel: {
		title: "Content control",
		alias: "Title",
		tag: "Tag",
		type: "Type",
		lock: "Lock",
		placeholder: "Placeholder",
		bound: "Data bound",
		empty: "—",
		yes: "Yes",
		no: "No",
		boundNote: "This control is bound to external data. Editing is refused.",
		lockedNote: "Content editing is locked on this control."
	},
	types: {
		richText: "Rich text",
		plainText: "Plain text",
		checkbox: "Checkbox",
		dropdown: "Dropdown list",
		comboBox: "Combo box",
		date: "Date",
		picture: "Picture",
		repeatingSection: "Repeating section"
	},
	lock: {
		unlocked: "Unlocked",
		sdtLocked: "Content control locked",
		contentLocked: "Contents locked",
		sdtContentLocked: "Content control and contents locked"
	}
};
var headerFooter = {
	chromeAriaLabel: "Header and footer editing",
	header: "Header",
	footer: "Footer",
	firstPageHeader: "First page header",
	firstPageFooter: "First page footer",
	evenPageHeader: "Even page header",
	evenPageFooter: "Even page footer",
	sameAsPrevious: "Same as previous",
	sameAsPreviousHint: "Edits apply to the preceding section's pages too.",
	options: "Options",
	differentFirstPage: "Different first page",
	differentOddEven: "Different odd and even pages",
	differentOddEvenHint: "Applies to the whole document.",
	linkToPrevious: "Link to previous",
	unlinkFromPrevious: "Unlink from previous",
	headerDistance: "Header distance from edge",
	footerDistance: "Footer distance from edge",
	removeHeader: "Remove header",
	removeFooter: "Remove footer",
	insertPageNumber: "Insert current page number",
	insertTotalPages: "Insert total page count",
	insertSectionPages: "Insert section page count",
	insertPageXofY: "Insert page X of Y"
};
var image = {
	unsupportedFormat: "Unsupported image format ({format})",
	nonPictureGraphic: "Unsupported graphic ({kind})",
	missingResource: "Image missing",
	externalResource: "External image not loaded",
	invalidResource: "Invalid image",
	contentMismatch: "Image content does not match its type",
	decodeFailed: "Image could not be decoded",
	resourceLimit: "Image exceeds size limits",
	pendingResource: "Loading image"
};
var imageOverlay = {
	selection: "Selected image",
	handle: {
		n: "Resize top edge",
		ne: "Resize top-right corner",
		e: "Resize right edge",
		se: "Resize bottom-right corner",
		s: "Resize bottom edge",
		sw: "Resize bottom-left corner",
		w: "Resize left edge",
		nw: "Resize top-left corner"
	}
};
var ruler = {
	horizontal: "Horizontal ruler",
	vertical: "Vertical ruler",
	firstLineIndent: "First line indent",
	hangingIndent: "Hanging indent",
	leftIndent: "Left indent",
	rightIndent: "Right indent",
	topMargin: "Top margin",
	bottomMargin: "Bottom margin"
};
var loading = {
	label: "Loading"
};
var notes = {
	"delete": "Delete note",
	convertToEndnote: "Convert to endnote",
	convertToFootnote: "Convert to footnote",
	scope: "Apply to",
	scopeDocument: "Whole document",
	scopeSection: "This section",
	previewFallback: "Footnote",
	chromeAriaLabel: "Note editing",
	editingRegion: "{kind} {number}",
	footnoteKind: "Footnote",
	endnoteKind: "Endnote",
	convertAllFootnotes: "Convert all footnotes to endnotes",
	convertAllEndnotes: "Convert all endnotes to footnotes",
	inheritedValue: "(inherited)"
};
var editingMode = {
	label: "Editing mode",
	editing: "Editing",
	editingHint: "Edit document directly",
	suggesting: "Suggesting",
	suggestingHint: "Edits become suggestions",
	viewing: "Viewing",
	viewingHint: "Read-only, no edits"
};
var review = {
	ariaLabel: "Review",
	empty: "No changes or comments",
	accept: "Accept",
	reject: "Reject",
	deleteComment: "Delete comment",
	discardChange: "Discard change",
	reply: "Reply",
	inserted: "Added",
	deleted: "Deleted",
	movedFrom: "Moved from here",
	movedTo: "Moved here",
	structural: "Changed the document structure",
	replyRefused: "Could not post the reply",
	showPane: "Show comments",
	replaced: "Replaced",
	replacedWith: "with",
	commentRefused: "Could not add the comment"
};
var enJson = {
	_lang: _lang,
	common: common,
	toolbar: toolbar,
	toc: toc,
	formattingBar: formattingBar,
	alignment: alignment,
	lists: lists,
	lineSpacing: lineSpacing,
	styles: styles,
	font: font,
	fontSize: fontSize,
	zoom: zoom,
	colorPicker: colorPicker,
	dialogs: dialogs,
	comments: comments,
	revisions: revisions,
	contextMenu: contextMenu,
	documentOutline: documentOutline,
	navigation: navigation,
	viewer: viewer,
	titleBar: titleBar,
	errors: errors,
	table: table,
	tableAdvanced: tableAdvanced,
	imageTransform: imageTransform,
	imageWrap: imageWrap,
	imageInsert: imageInsert,
	imageProperties: imageProperties,
	imageAltText: imageAltText,
	editor: editor,
	hyperlinkPopup: hyperlinkPopup,
	contentControl: contentControl,
	headerFooter: headerFooter,
	image: image,
	imageOverlay: imageOverlay,
	ruler: ruler,
	loading: loading,
	notes: notes,
	editingMode: editingMode,
	review: review
};

/**
 * Shared locale data, types, and runtime helpers for the @docx-editor.dev
 * editor adapters.
 *
 * Import everything from the package root. `sideEffects: false` lets
 * consumer bundlers tree-shake unused locales.
 *
 * ```ts
 * import {
 *   en, de, pl, tr, he, ptBR, zhCN,    // typed locale data
 *   locales,                            // record keyed by BCP-47 tag
 *   deepMerge, createT,                 // build a t() for custom hosts
 *   type LocaleStrings,                 // shape of `en` (source of truth)
 *   type Translations,                  // shape of a community partial
 *   type TranslationKey,                // every valid `t()` key
 *   type LocaleCode,                    // 'en' | 'de' | 'pt-BR' | ...
 * } from '@docx-editor.dev/i18n';
 * ```
 *
 * The React and Vue adapters wrap `createT` in framework-native bindings
 * (`useTranslation`, `LocaleProvider`, etc.); use those for app code.
 * Reach for `createT` directly when building a non-React/Vue host.
 *
 * @packageDocumentation
 * @public
 */

/**
 * Full locale string set, auto-derived from `en.json` (the source of truth).
 * Every other locale is a `PartialLocaleStrings` against this shape.
 *
 * @public
 */
type LocaleStrings = typeof enJson;
/**
 * Every locale code shipped from this package. Pass to `locales[code]`
 * for runtime lookup; assign to `_lang` to drive `Intl.PluralRules`.
 *
 * Custom codes are accepted at runtime ({@link PartialLocaleStrings._lang}
 * widens to any string), but the shipped union is the IDE-completion list.
 *
 * @public
 */
type LocaleCode = 'en' | 'de' | 'fr' | 'he' | 'hi' | 'id' | 'pl' | 'pt-BR' | 'tr' | 'zh-CN';
/** English (`en`) — the source of truth, 100% covered. @public */
declare const en: LocaleStrings;
/** German (`de`). Community-maintained; null leaves fall back to English. @public */
declare const de: PartialLocaleStrings;
/** French (`fr`). Community-maintained; null leaves fall back to English. @public */
declare const fr: PartialLocaleStrings;
/** Hebrew (`he`). Community-maintained; null leaves fall back to English. @public */
declare const he: PartialLocaleStrings;
/** Hindi (`hi`). Community-maintained; null leaves fall back to English. @public */
declare const hi: PartialLocaleStrings;
/** Indonesian (`id`). Community-maintained; null leaves fall back to English. @public */
declare const id: PartialLocaleStrings;
/** Polish (`pl`). Community-maintained; null leaves fall back to English. @public */
declare const pl: PartialLocaleStrings;
/** Portuguese (Brazil) (`pt-BR`). Community-maintained; null leaves fall back to English. @public */
declare const ptBR: PartialLocaleStrings;
/** Turkish (`tr`). Community-maintained; null leaves fall back to English. @public */
declare const tr: PartialLocaleStrings;
/** Simplified Chinese (`zh-CN`). Community-maintained; null leaves fall back to English. @public */
declare const zhCN: PartialLocaleStrings;
/**
 * Every shipped locale, keyed by BCP-47 tag. Use for runtime locale
 * pickers and "look up the locale matching this user preference" code:
 *
 * ```ts
 * <DocxEditor i18n={locales[userLocale]} />
 * ```
 *
 * Importing `locales` defeats the per-locale tree-shake — the bundler
 * sees a static reference to every locale. If you only need one or two,
 * import them by name (`import { en, de } from '...'`) instead.
 *
 * @public
 */
declare const locales: Record<LocaleCode, PartialLocaleStrings>;
/**
 * Recursive Partial that allows `null` at leaves to signal "not yet
 * translated, fall back to English." Community translations use this shape;
 * `bun run i18n:fix` keeps every locale aligned to `en.json` with `null`
 * placeholders for missing keys.
 *
 * @public
 */
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] | null;
};
/**
 * Partial locale strings — what consumers pass to the editor's `i18n` prop.
 * Missing keys fall back to English. Optional `_lang` carries the BCP-47
 * tag used by `Intl.PluralRules`; shipped codes autocomplete but custom
 * strings are accepted.
 *
 * @public
 */
type PartialLocaleStrings = DeepPartial<LocaleStrings> & {
    _lang?: LocaleCode | (string & {});
};
/**
 * Alias for `PartialLocaleStrings`. Prefer this name when typing the
 * consumer-facing `i18n` prop or function parameter.
 *
 * @public
 */
type Translations = PartialLocaleStrings;
type DotPath<T, Prefix extends string = ''> = {
    [K in keyof T & string]: T[K] extends Record<string, unknown> ? DotPath<T[K], `${Prefix}${K}.`> : `${Prefix}${K}`;
}[keyof T & string];
/**
 * Every valid dot-notation key into `LocaleStrings`, e.g. `'formattingBar.bold'`
 * or `'navigation.find.counter'`. Pass to `t(key, vars?)` for
 * compile-time-checked translation lookup.
 *
 * @public
 */
type TranslationKey = DotPath<LocaleStrings>;
type AnyRecord = Record<string, unknown>;
/**
 * Deep-merge a partial locale over a base locale. Null leaves in the
 * override are treated as "not translated" and fall back to the base.
 * Adapters call this once when the `i18n` prop changes, then hand the
 * result to {@link createT}.
 *
 * @public
 */
declare function deepMerge(base: AnyRecord, override: AnyRecord | undefined): AnyRecord;
/**
 * The signature of `t()`: look up a translation by dot-notation key,
 * interpolate `{vars}`, and resolve ICU plurals.
 *
 * @public
 */
type TFunction = (key: TranslationKey, vars?: Record<string, string | number>) => string;
/**
 * Build a typed `t(key, vars?)` function from a merged locale.
 *
 * - **Lookup**: dot-notation paths against the locale tree
 *   (`'formattingBar.bold'`, `'navigation.find.counter'`).
 * - **Interpolation**: `{name}` placeholders read from `vars`.
 * - **Plurals**: ICU `{count, plural, =0 {none} one {# item} other {# items}}`
 *   with `Intl.PluralRules` for CLDR categories and `=N` for exact matches.
 * - **Fallback**: missing keys return the key string itself, useful for
 *   spotting un-translated UI in development.
 *
 * The React/Vue adapters wrap this in `useTranslation()`; use it directly
 * when building a non-React/Vue host (server-rendered docs, CLI, etc.).
 *
 * @example
 * ```ts
 * import { deepMerge, createT, en, de } from '@docx-editor.dev/i18n';
 * const merged = deepMerge(en, de) as LocaleStrings;
 * const t = createT(merged, 'de');
 * t('formattingBar.bold');                    // → 'Fett'
 * t('navigation.find.counter', { current: 3, total: 15 });
 * ```
 *
 * @public
 */
declare function createT(strings: LocaleStrings, lang?: string): TFunction;

export { type DeepPartial, type LocaleCode, type LocaleStrings, type PartialLocaleStrings, type TFunction, type TranslationKey, type Translations, createT, de, deepMerge, en, fr, he, hi, id, locales, pl, ptBR, tr, zhCN };
