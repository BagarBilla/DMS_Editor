"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createT: () => createT,
  de: () => de,
  deepMerge: () => deepMerge,
  en: () => en,
  fr: () => fr,
  he: () => he,
  hi: () => hi,
  id: () => id,
  locales: () => locales,
  pl: () => pl,
  ptBR: () => ptBR,
  tr: () => tr,
  zhCN: () => zhCN
});
module.exports = __toCommonJS(index_exports);

// en.json
var en_default = {
  _lang: "en",
  common: {
    cancel: "Cancel",
    apply: "Apply",
    close: "Close",
    comment: "Comment",
    dismiss: "Dismiss"
  },
  toolbar: {
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
    break: "Break",
    insertFootnote: "Insert Footnote",
    insertEndnote: "Insert Endnote",
    pageBreak: "Page break",
    sectionBreakNextPage: "Section break (next page)",
    sectionBreakContinuous: "Section break (continuous)",
    tableOfContents: "Table of contents",
    watermark: "Watermark",
    help: "Help",
    reportIssue: "Report issue"
  },
  toc: {
    refresh: "Refresh table of contents",
    refreshPageNumbers: "Refresh page numbers"
  },
  formattingBar: {
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
  },
  alignment: {
    alignLeft: "Align Left",
    alignLeftShortcut: "Ctrl+L",
    center: "Center",
    centerShortcut: "Ctrl+E",
    alignRight: "Align Right",
    alignRightShortcut: "Ctrl+R",
    justify: "Justify",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "List formatting",
    typeAriaLabel: "List type",
    indentationAriaLabel: "List indentation",
    bulletList: "Bullet List",
    numberedList: "Numbered List",
    decreaseIndent: "Decrease Indent",
    increaseIndent: "Increase Indent"
  },
  lineSpacing: {
    label: "Line spacing",
    single: "Single",
    double: "Double",
    lineSpacingTitle: "Line spacing: {label}",
    blockSpacingRules: "Paragraph spacing",
    addSpaceBefore: "Add space before paragraph",
    removeSpaceBefore: "Remove space before paragraph",
    addSpaceAfter: "Add space after paragraph",
    removeSpaceAfter: "Remove space after paragraph"
  },
  styles: {
    selectAriaLabel: "Select paragraph style",
    normalText: "Normal text",
    title: "Title",
    subtitle: "Subtitle",
    heading1: "Heading 1",
    heading2: "Heading 2",
    heading3: "Heading 3"
  },
  font: {
    selectAriaLabel: "Select font family",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "Document fonts"
  },
  fontSize: {
    decrease: "Decrease font size",
    increase: "Increase font size",
    label: "Font size",
    listLabel: "Font sizes"
  },
  zoom: {
    ariaLabel: "Zoom: {label}",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    zoomLevel: "Zoom level",
    automatic: "Automatic",
    fitWidth: "Fit width"
  },
  colorPicker: {
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
  },
  dialogs: {
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
        letter: 'Letter (8.5" × 11")',
        a4: 'A4 (8.27" × 11.69")',
        legal: 'Legal (8.5" × 14")',
        a3: 'A3 (11.69" × 16.54")',
        a5: 'A5 (5.83" × 8.27")',
        b5: 'B5 (6.93" × 9.84")',
        executive: 'Executive (7.25" × 10.5")'
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
  },
  comments: {
    unknown: "Unknown",
    addComment: "Add a comment...",
    replyPlaceholder: "Reply or add others with @"
  },
  revisions: {
    paragraphMarkInserted: "Inserted paragraph break",
    runPropertiesChanged: "Changed text formatting"
  },
  contextMenu: {
    ariaLabel: "Context menu",
    cut: "Cut",
    cutShortcut: "Ctrl+X",
    copy: "Copy",
    copyShortcut: "Ctrl+C",
    paste: "Paste",
    pasteShortcut: "Ctrl+V",
    delete: "Delete",
    deleteShortcut: "Del",
    selectAll: "Select All",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "Edit {label}",
    removeCustomNode: "Remove {label}"
  },
  documentOutline: {
    ariaLabel: "Document outline",
    closeAriaLabel: "Close outline",
    closeTitle: "Close outline",
    title: "Outline",
    noHeadings: "No headings found. Add headings to your document to see them here."
  },
  navigation: {
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
  },
  viewer: {
    pageIndicator: "{current} of {total}"
  },
  titleBar: {
    untitled: "Untitled",
    documentNameAriaLabel: "Document name",
    menuBarAriaLabel: "Menu bar"
  },
  errors: {
    unableToParse: "Unable to Parse Document",
    somethingWentWrong: "Something went wrong",
    errorDescription: "An error occurred while rendering this component. Please try again or contact support if the problem persists.",
    errorLabel: "Error:",
    componentStack: "Component Stack:",
    tryAgain: "Try Again",
    showDetails: "Show details",
    hideDetails: "Hide details"
  },
  table: {
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
  },
  tableAdvanced: {
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
  },
  imageTransform: {
    tooltip: "Transform",
    rotateClockwise: "Rotate clockwise",
    rotateCounterClockwise: "Rotate counter-clockwise",
    flipHorizontal: "Flip horizontal",
    flipVertical: "Flip vertical"
  },
  imageWrap: {
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
  },
  imageInsert: {
    errors: {
      emptyFile: "The selected file is empty.",
      invalidSignature: "The file is not a supported PNG, JPEG, or GIF image.",
      unsupportedFormat: "This image format is not supported for insertion.",
      oversize: "The image exceeds the maximum allowed size.",
      refused: "The image could not be inserted."
    }
  },
  imageProperties: {
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
  },
  imageAltText: {
    panelTitle: "Alt text",
    title: "Title",
    description: "Description"
  },
  editor: {
    showDocumentOutline: "Show document outline",
    linkCopied: "Link copied to clipboard",
    fontSubstitutionNotice: "Some fonts in this document aren't available, so substitutes are shown: {fonts}"
  },
  hyperlinkPopup: {
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
  },
  contentControl: {
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
  },
  headerFooter: {
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
  },
  image: {
    unsupportedFormat: "Unsupported image format ({format})",
    nonPictureGraphic: "Unsupported graphic ({kind})",
    missingResource: "Image missing",
    externalResource: "External image not loaded",
    invalidResource: "Invalid image",
    contentMismatch: "Image content does not match its type",
    decodeFailed: "Image could not be decoded",
    resourceLimit: "Image exceeds size limits",
    pendingResource: "Loading image"
  },
  imageOverlay: {
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
  },
  ruler: {
    horizontal: "Horizontal ruler",
    vertical: "Vertical ruler",
    firstLineIndent: "First line indent",
    hangingIndent: "Hanging indent",
    leftIndent: "Left indent",
    rightIndent: "Right indent",
    topMargin: "Top margin",
    bottomMargin: "Bottom margin"
  },
  loading: {
    label: "Loading"
  },
  notes: {
    delete: "Delete note",
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
  },
  editingMode: {
    label: "Editing mode",
    editing: "Editing",
    editingHint: "Edit document directly",
    suggesting: "Suggesting",
    suggestingHint: "Edits become suggestions",
    viewing: "Viewing",
    viewingHint: "Read-only, no edits"
  },
  review: {
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
  }
};

// de.json
var de_default = {
  _lang: "de",
  common: {
    cancel: "Abbrechen",
    apply: "Übernehmen",
    close: "Schließen",
    comment: "Kommentar",
    dismiss: "Verwerfen"
  },
  toolbar: {
    ariaLabel: "Formatierungssymbolleiste",
    file: "Datei",
    format: "Format",
    insert: "Einfügen",
    print: "Drucken",
    printShortcut: "Strg+P",
    pageSetup: "Seite einrichten",
    leftToRight: "Text von links nach rechts",
    rightToLeft: "Text von rechts nach links",
    image: "Grafik",
    table: "Tabelle",
    pageBreak: "Seitenumbruch",
    tableOfContents: "Inhaltsverzeichnis",
    help: "Hilfe",
    reportIssue: "Problem melden",
    open: "Öffnen",
    openShortcut: "Strg+O",
    save: "Speichern",
    saveShortcut: "Strg+S",
    watermark: "Wasserzeichen",
    break: "Umbruch",
    sectionBreakContinuous: "Abschnittsumbruch (fortlaufend)",
    sectionBreakNextPage: "Abschnittsumbruch (nächste Seite)",
    insertFootnote: "Fußnote einfügen",
    insertEndnote: "Endnote einfügen"
  },
  formattingBar: {
    groups: {
      history: "Verlauf",
      zoom: "Zoom",
      styles: "Formatvorlagen",
      font: "Schriftart",
      textFormatting: "Textformatierung",
      script: "Hoch-/Tiefgestellt",
      alignment: "Ausrichtung",
      listFormatting: "Listenformatierung",
      image: "Grafik",
      table: "Tabelle"
    },
    undo: "Rückgängig",
    undoShortcut: "Rückgängig (Strg+Z)",
    redo: "Wiederholen",
    redoShortcut: "Wiederholen (Strg+Y)",
    bold: "Fett",
    boldShortcut: "Fett (Strg+B)",
    italic: "Kursiv",
    italicShortcut: "Kursiv (Strg+I)",
    underline: "Unterstrichen",
    underlineShortcut: "Unterstrichen (Strg+U)",
    strikethrough: "Durchgestrichen",
    fontColor: "Schriftfarbe",
    highlightColor: "Texthervorhebungsfarbe",
    insertLink: "Link einfügen",
    insertLinkShortcut: "Link einfügen (Strg+K)",
    superscript: "Hochgestellt",
    superscriptShortcut: "Hochgestellt (Strg+Umschalt+=)",
    subscript: "Tiefgestellt",
    subscriptShortcut: "Tiefgestellt (Strg+=)",
    imageProperties: "Bildeigenschaften",
    imagePropertiesShortcut: "Bildeigenschaften (Alternativtext, Rahmen)...",
    clearFormatting: "Formatierung löschen",
    commentsAndChanges: "Kommentare & Änderungen",
    unavailableInPreview: "In dieser Vorschauversion nicht verfügbar",
    more: "Mehr",
    altText: "Alternativtext",
    imageWrap: "Textumbruch"
  },
  alignment: {
    alignLeft: "Linksbündig",
    alignLeftShortcut: "Strg+L",
    center: "Zentriert",
    centerShortcut: "Strg+E",
    alignRight: "Rechtsbündig",
    alignRightShortcut: "Strg+R",
    justify: "Blocksatz",
    justifyShortcut: "Strg+J"
  },
  lists: {
    ariaLabel: "Listenformatierung",
    typeAriaLabel: "Listentyp",
    indentationAriaLabel: "Listeneinzug",
    bulletList: "Aufzählungszeichen",
    numberedList: "Nummerierung",
    decreaseIndent: "Einzug verkleinern",
    increaseIndent: "Einzug vergrößern"
  },
  lineSpacing: {
    single: "Einfach",
    double: "Doppelt",
    lineSpacingTitle: "Zeilenabstand: {label}",
    blockSpacingRules: "Absatzabstand",
    label: "Zeilenabstand",
    addSpaceAfter: "Abstand nach Absatz hinzufügen",
    addSpaceBefore: "Abstand vor Absatz hinzufügen",
    removeSpaceAfter: "Abstand nach Absatz entfernen",
    removeSpaceBefore: "Abstand vor Absatz entfernen"
  },
  styles: {
    selectAriaLabel: "Absatzformatvorlage auswählen",
    normalText: "Standard",
    title: "Titel",
    subtitle: "Untertitel",
    heading1: "Überschrift 1",
    heading2: "Überschrift 2",
    heading3: "Überschrift 3"
  },
  font: {
    selectAriaLabel: "Schriftart auswählen",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "Dokumentschriftarten"
  },
  fontSize: {
    decrease: "Schriftgrad verkleinern",
    increase: "Schriftgrad vergrößern",
    label: "Schriftgrad",
    listLabel: "Schriftgrade"
  },
  zoom: {
    ariaLabel: "Zoom: {label}",
    zoomIn: "Vergrößern",
    zoomLevel: "Zoomstufe",
    zoomOut: "Verkleinern",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "Hervorhebungsfarben",
    customColor: "Benutzerdefinierte Farbe",
    noColor: "Keine Farbe",
    automatic: "Automatisch",
    themeColors: "Designfarben",
    standardColors: "Standardfarben",
    colors: {
      black: "Schwarz",
      darkRed: "Dunkelrot",
      red: "Rot",
      orange: "Orange",
      yellow: "Gelb",
      darkYellow: "Dunkelgelb",
      green: "Grün",
      darkGreen: "Dunkelgrün",
      blue: "Blau",
      darkBlue: "Dunkelblau",
      purple: "Lila",
      white: "Weiß",
      lightGreen: "Hellgrün",
      lightBlue: "Hellblau",
      darkGray: "Dunkelgrau",
      cyan: "Cyan",
      magenta: "Magenta",
      brightGreen: "Hellgrün",
      darkCyan: "Dunkelcyan",
      darkMagenta: "Dunkel-Magenta",
      lightGray: "Hellgrau"
    },
    apply: "Übernehmen",
    theme: {
      accent1: "Akzent 1",
      accent2: "Akzent 2",
      accent3: "Akzent 3",
      accent4: "Akzent 4",
      accent5: "Akzent 5",
      accent6: "Akzent 6",
      background1: "Hintergrund 1",
      background2: "Hintergrund 2",
      text1: "Text 1",
      text2: "Text 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "Bildeigenschaften",
      altText: "Alternativtext",
      altTextPlaceholder: "Beschreiben Sie dieses Bild für Barrierefreiheit...",
      dimensions: "Abmessungen",
      heightLabel: "Höhe:",
      lockAspectRatio: "Seitenverhältnis sperren",
      textWrapping: "Textumbruch",
      widthLabel: "Breite:"
    },
    imagePosition: {
      relativeOptions: {
        page: "Seite",
        column: "Spalte",
        margin: "Seitenrand",
        character: "Zeichen",
        paragraph: "Absatz",
        line: "Zeile"
      }
    },
    pageSetup: {
      title: "Seite einrichten",
      pageSize: "PAPIERFORMAT",
      sizeLabel: "Format",
      custom: "Benutzerdefiniert",
      orientation: "Ausrichtung",
      portrait: "Hochformat",
      landscape: "Querformat",
      margins: "SEITENRÄNDER",
      top: "Oben",
      bottom: "Unten",
      left: "Links",
      right: "Rechts",
      pageSizes: {
        letter: 'Letter (8,5" × 11")',
        a4: 'A4 (8,27" × 11,69")',
        legal: 'Legal (8,5" × 14")',
        a3: 'A3 (11,69" × 16,54")',
        a5: 'A5 (5,83" × 8,27")',
        b5: 'B5 (6,93" × 9,84")',
        executive: 'Executive (7,25" × 10,5")'
      },
      applyTo: "Übernehmen für",
      applyToDocument: "Gesamtes Dokument",
      applyToSection: "Aktuellen Abschnitt"
    },
    footnoteProperties: {
      title: "Fuß- und Endnoteneinstellungen",
      footnotes: "Fußnoten",
      endnotes: "Endnoten",
      position: "Position",
      numberFormat: "Zahlenformat",
      numbering: "Nummerierung",
      footnotePositions: {
        bottomOfPage: "Seitenende",
        belowText: "Unter dem Text"
      },
      endnotePositions: {
        endOfDocument: "Dokumentende",
        endOfSection: "Abschnittsende"
      },
      numberingOptions: {
        continuous: "Fortlaufend",
        restartSection: "In jedem Abschnitt neu beginnen",
        restartPage: "Auf jeder Seite neu beginnen"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "Unbekannt",
    addComment: "Kommentar hinzufügen...",
    replyPlaceholder: "Antworten oder andere mit @ erwähnen"
  },
  contextMenu: {
    ariaLabel: "KI-Aktionsmenü",
    cut: "Ausschneiden",
    cutShortcut: "Strg+X",
    copy: "Kopieren",
    copyShortcut: "Strg+C",
    paste: "Einfügen",
    pasteShortcut: "Strg+V",
    delete: "Löschen",
    deleteShortcut: "Entf",
    selectAll: "Alles markieren",
    selectAllShortcut: "Strg+A",
    editCustomNode: "{label} bearbeiten",
    removeCustomNode: "{label} entfernen"
  },
  documentOutline: {
    ariaLabel: "Dokumentgliederung",
    closeAriaLabel: "Gliederung schließen",
    closeTitle: "Gliederung schließen",
    title: "Gliederung",
    noHeadings: "Keine Überschriften gefunden. Fügen Sie Ihrem Dokument Überschriften hinzu, um sie hier anzuzeigen."
  },
  titleBar: {
    untitled: "Unbenannt",
    documentNameAriaLabel: "Dokumentname",
    menuBarAriaLabel: "Menüleiste"
  },
  errors: {
    unableToParse: "Dokument konnte nicht verarbeitet werden",
    somethingWentWrong: "Ein Fehler ist aufgetreten",
    errorDescription: "Beim Rendern dieser Komponente ist ein Fehler aufgetreten. Versuchen Sie es erneut oder wenden Sie sich an den Support, wenn das Problem weiterhin besteht.",
    errorLabel: "Fehler:",
    componentStack: "Komponentenstapel:",
    tryAgain: "Erneut versuchen",
    showDetails: "Details anzeigen",
    hideDetails: "Details ausblenden"
  },
  table: {
    insertRowAbove: "Zeile oberhalb einfügen",
    insertRowBelow: "Zeile unterhalb einfügen",
    insertColumnLeft: "Spalte links einfügen",
    insertColumnRight: "Spalte rechts einfügen",
    deleteRow: "Zeile löschen",
    deleteColumn: "Spalte löschen",
    deleteTable: "Tabelle löschen",
    mergeCells: "Zellen zusammenführen",
    splitCell: "Zelle teilen",
    editingTools: "Tabellenbearbeitungswerkzeuge",
    label: "Tabelle:",
    cellFillColor: "Zellenfüllfarbe",
    borderColor: "Rahmenfarbe",
    borderWidth: "Rahmenbreite",
    borders: {
      all: "Alle Rahmenlinien",
      outside: "Äußere Rahmenlinien",
      inside: "Innere Rahmenlinien",
      none: "Kein Rahmen",
      top: "Oberer Rahmen",
      bottom: "Unterer Rahmen",
      left: "Linker Rahmen",
      right: "Rechter Rahmen",
      styleAriaLabel: "Rahmenart",
      tooltip: "Rahmen"
    },
    moreOptions: "Weitere Tabellenoptionen",
    selectTable: "Gesamte Tabelle auswählen",
    borderStyles: {
      dashed: "Gestrichelt",
      dotted: "Gepunktet",
      double: "Doppelt",
      single: "Durchgezogen",
      thick: "Dick",
      triple: "Dreifach"
    },
    borderWidths: {
      halfPt: "0,5 pt",
      oneHalfPt: "1,5 pt",
      onePt: "1 pt",
      threePt: "3 pt",
      twoPt: "2 pt"
    },
    clearCellFill: "Zellenfüllung entfernen"
  },
  tableAdvanced: {
    verticalAlignment: "Vertikale Ausrichtung",
    top: "Oben",
    middle: "Mitte",
    bottom: "Unten",
    toggleNoWrap: "Textumbruch umschalten",
    toggleHeaderRow: "Überschriftenzeile umschalten",
    distributeColumns: "Spalten gleichmäßig verteilen",
    autoFit: "An Inhalt anpassen",
    tableProperties: "Tabelleneigenschaften...",
    tableAlignment: "Tabellenausrichtung",
    alignTableLeft: "Tabelle links ausrichten",
    alignTableCenter: "Tabelle zentrieren",
    alignTableRight: "Tabelle rechts ausrichten"
  },
  imageTransform: {
    tooltip: "Transformieren",
    rotateClockwise: "Im Uhrzeigersinn drehen",
    rotateCounterClockwise: "Gegen den Uhrzeigersinn drehen",
    flipHorizontal: "Horizontal spiegeln",
    flipVertical: "Vertikal spiegeln"
  },
  imageWrap: {
    inline: "Mit Text in Zeile",
    floatLeft: "Links umfließen (Text rechts)",
    floatRight: "Rechts umfließen (Text links)",
    topAndBottom: "Oben und unten",
    behindText: "Hinter den Text",
    inFrontOfText: "Vor den Text",
    tooltipPrefix: "Textumbruch: {label}",
    menu: {
      ariaLabel: "Bildlayoutoptionen",
      inLineWithText: "Mit Text in Zeile",
      squareLeft: "Quadrat links",
      squareRight: "Quadrat rechts"
    },
    square: "Quadrat",
    targets: {
      behind: "Hinter den Text",
      inFront: "Vor den Text",
      inline: "Mit Text in Zeile",
      square: "Quadrat",
      squareLeft: "Quadrat links",
      squareRight: "Quadrat rechts",
      through: "Transparent",
      tight: "Eng",
      topAndBottom: "Oben und unten"
    },
    through: "Transparent",
    tight: "Eng"
  },
  editor: {
    showDocumentOutline: "Dokumentgliederung anzeigen",
    linkCopied: "Link in Zwischenablage kopiert",
    fontSubstitutionNotice: "Einige Schriftarten in diesem Dokument sind nicht verfügbar, daher werden Ersatzschriftarten angezeigt: {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "Anzuzeigender Text",
    urlPlaceholder: "https://example.com",
    copyLink: "Link kopieren",
    editLink: "Link bearbeiten",
    removeLink: "Link entfernen",
    apply: "Übernehmen",
    bookmarkTarget: "Führt zu einer Stelle in diesem Dokument",
    cancel: "Abbrechen",
    editTitle: "Link bearbeiten",
    inertTarget: "Dieser Link verweist auf ein Ziel, das der Editor nicht öffnet",
    insertTitle: "Link einfügen",
    openLink: "Link öffnen",
    refused: "Der Link konnte nicht übernommen werden. Überprüfen Sie die Adresse, und versuchen Sie es erneut.",
    urlLabel: "URL"
  },
  headerFooter: {
    header: "Kopfzeile",
    footer: "Fußzeile",
    options: "Optionen",
    insertPageNumber: "Aktuelle Seitenzahl einfügen",
    insertTotalPages: "Gesamtseitenzahl einfügen",
    chromeAriaLabel: "Kopf- und Fußzeilenbearbeitung",
    firstPageHeader: "Kopfzeile der ersten Seite",
    firstPageFooter: "Fußzeile der ersten Seite",
    evenPageHeader: "Kopfzeile gerader Seiten",
    evenPageFooter: "Fußzeile gerader Seiten",
    sameAsPrevious: "Wie vorherige",
    sameAsPreviousHint: "Änderungen gelten auch für die Seiten des vorherigen Abschnitts.",
    differentFirstPage: "Erste Seite abweichend",
    differentOddEven: "Gerade und ungerade Seiten abweichend",
    differentOddEvenHint: "Gilt für das gesamte Dokument.",
    linkToPrevious: "Mit vorherigem verknüpfen",
    unlinkFromPrevious: "Verknüpfung mit vorherigem aufheben",
    headerDistance: "Kopfzeilenabstand vom Rand",
    footerDistance: "Fußzeilenabstand vom Rand",
    removeHeader: "Kopfzeile entfernen",
    removeFooter: "Fußzeile entfernen",
    insertSectionPages: "Abschnittsseitenzahl einfügen",
    insertPageXofY: "Seite X von Y einfügen"
  },
  image: {
    contentMismatch: "Der Bildinhalt stimmt nicht mit dem Bildtyp überein",
    decodeFailed: "Das Bild konnte nicht decodiert werden",
    externalResource: "Externes Bild nicht geladen",
    invalidResource: "Ungültiges Bild",
    missingResource: "Bild fehlt",
    nonPictureGraphic: "Nicht unterstützte Grafik ({kind})",
    pendingResource: "Bild wird geladen",
    resourceLimit: "Bild überschreitet die Größenbeschränkung",
    unsupportedFormat: "Nicht unterstütztes Bildformat ({format})"
  },
  ruler: {
    horizontal: "Horizontales Lineal",
    vertical: "Vertikales Lineal",
    firstLineIndent: "Erstzeileneinzug",
    leftIndent: "Linker Einzug",
    rightIndent: "Rechter Einzug",
    topMargin: "Oberer Seitenrand",
    bottomMargin: "Unterer Seitenrand",
    hangingIndent: "Hängender Einzug"
  },
  loading: {
    label: "Wird geladen"
  },
  viewer: {
    pageIndicator: "{current} von {total}"
  },
  imageOverlay: {
    handle: {
      e: "Größe ändern (rechte Kante)",
      n: "Größe ändern (obere Kante)",
      ne: "Größe ändern (obere rechte Ecke)",
      nw: "Größe ändern (obere linke Ecke)",
      s: "Größe ändern (untere Kante)",
      se: "Größe ändern (untere rechte Ecke)",
      sw: "Größe ändern (untere linke Ecke)",
      w: "Größe ändern (linke Kante)"
    },
    selection: "Ausgewähltes Bild"
  },
  revisions: {
    paragraphMarkInserted: "Absatzmarke eingefügt",
    runPropertiesChanged: "Textformatierung geändert"
  },
  toc: {
    refresh: "Gesamtes Verzeichnis aktualisieren",
    refreshPageNumbers: "Nur Seitenzahlen aktualisieren"
  },
  editingMode: {
    editing: "Bearbeiten",
    label: "Bearbeitungsmodus",
    editingHint: "Dokument direkt bearbeiten",
    suggesting: "Vorschlagen",
    suggestingHint: "Änderungen werden zu Vorschlägen",
    viewing: "Anzeigen",
    viewingHint: "Schreibgeschützt, keine Änderungen"
  },
  navigation: {
    ariaLabel: "Dokumentnavigation",
    closeAriaLabel: "Navigation schließen",
    closeTitle: "Navigation schließen",
    find: {
      clearAriaLabel: "Suche löschen",
      counter: "Ergebnis {current} von {total}",
      counterTruncated: "Ergebnis {current} von {total}+",
      inputAriaLabel: "Dokument durchsuchen",
      matchCase: "Groß-/Kleinschreibung beachten",
      nextAriaLabel: "Nächstes Ergebnis",
      noResults: "Keine Ergebnisse",
      optionsAriaLabel: "Suchoptionen",
      placeholder: "Dokument durchsuchen",
      previousAriaLabel: "Vorheriges Ergebnis",
      resultsAriaLabel: "Suchergebnisse",
      searching: "Suche läuft…",
      wholeWord: "Nur ganze Wörter",
      total: "{total, plural, one {# Ergebnis} other {# Ergebnisse}}",
      totalTruncated: "{total, plural, other {#+ Ergebnisse}}"
    },
    headings: {
      noHeadings: "Keine Überschriften gefunden. Fügen Sie dem Dokument Überschriften hinzu, um sie hier zu sehen."
    },
    openAriaLabel: "Navigation öffnen",
    openTitle: "Navigation",
    tabs: {
      find: "Suchen",
      headings: "Überschriften"
    },
    title: "Navigation"
  },
  contentControl: {
    formFill: "Formularfüllmodus",
    group: "Inhaltssteuerelemente",
    inspector: "Eigenschaften des Inhaltssteuerelements",
    inspectorPanel: {
      alias: "Titel",
      bound: "Datenbindung",
      boundNote: "Dieses Steuerelement ist an externe Daten gebunden. Bearbeiten ist nicht möglich.",
      empty: "—",
      lock: "Sperre",
      lockedNote: "Die Inhaltsbearbeitung ist für dieses Steuerelement gesperrt.",
      no: "Nein",
      placeholder: "Platzhaltertext",
      tag: "Tag",
      title: "Inhaltssteuerelement",
      type: "Typ",
      yes: "Ja"
    },
    lock: {
      contentLocked: "Inhalt gesperrt",
      sdtContentLocked: "Inhaltssteuerelement und Inhalt gesperrt",
      sdtLocked: "Inhaltssteuerelement gesperrt",
      unlocked: "Nicht gesperrt"
    },
    remove: "Inhaltssteuerelement entfernen",
    showAll: "Grenzen der Inhaltssteuerelemente anzeigen",
    types: {
      checkbox: "Kontrollkästchen",
      comboBox: "Kombinationsfeld",
      date: "Datum",
      dropdown: "Dropdown-Liste",
      picture: "Bild",
      plainText: "Nur Text",
      repeatingSection: "Wiederholungsabschnitt",
      richText: "Rich Text"
    }
  },
  notes: {
    delete: "Fußnote löschen",
    convertToEndnote: "In Endnote umwandeln",
    convertToFootnote: "In Fußnote umwandeln",
    scope: "Anwenden auf",
    scopeDocument: "Ganzes Dokument",
    scopeSection: "Dieser Abschnitt",
    previewFallback: "Fußnote",
    chromeAriaLabel: "Fußnotenbearbeitung",
    editingRegion: "{kind} {number}",
    footnoteKind: "Fußnote",
    endnoteKind: "Endnote",
    convertAllFootnotes: "Alle Fußnoten in Endnoten umwandeln",
    convertAllEndnotes: "Alle Endnoten in Fußnoten umwandeln",
    inheritedValue: "(geerbt)"
  },
  review: {
    accept: "Annehmen",
    ariaLabel: "Überprüfen",
    commentRefused: "Der Kommentar konnte nicht hinzugefügt werden",
    deleted: "Gelöscht",
    empty: "Keine Änderungen oder Kommentare",
    inserted: "Hinzugefügt",
    movedFrom: "Von hier verschoben",
    movedTo: "Hierhin verschoben",
    reject: "Ablehnen",
    replaced: "Ersetzt",
    replacedWith: "durch",
    reply: "Antworten",
    replyRefused: "Die Antwort konnte nicht gesendet werden",
    showPane: "Kommentare anzeigen",
    structural: "Dokumentstruktur geändert",
    deleteComment: "Kommentar löschen",
    discardChange: "Änderung verwerfen"
  },
  imageAltText: {
    description: "Beschreibung",
    panelTitle: "Alternativtext",
    title: "Titel"
  },
  imageInsert: {
    errors: {
      emptyFile: "Die ausgewählte Datei ist leer.",
      invalidSignature: "Die Datei ist kein unterstütztes PNG-, JPEG- oder GIF-Bild.",
      oversize: "Das Bild überschreitet die maximal zulässige Größe.",
      refused: "Das Bild konnte nicht eingefügt werden.",
      unsupportedFormat: "Dieses Bildformat wird beim Einfügen nicht unterstützt."
    }
  },
  imageProperties: {
    crop: "Zuschneiden",
    cropBottom: "Unten (%)",
    cropLeft: "Links (%)",
    cropRight: "Rechts (%)",
    cropTop: "Oben (%)",
    errors: {
      invalidCrop: "Zuschneidewerte müssen Prozentwerte zwischen 0 und 100 sein.",
      invalidDimensions: "Geben Sie positive Werte für Breite und Höhe ein.",
      refused: "Diese Eigenschaften konnten nicht übernommen werden.",
      invalidPosition: "Geben Sie gültige Werte für die horizontale und vertikale Position ein."
    },
    hyperlink: "Hyperlink",
    nonPictureHint: "Zuschneiden und Zurücksetzen auf Originalgröße sind nur bei Bildern verfügbar.",
    resetNaturalSize: "Auf Originalgröße zurücksetzen",
    units: {
      points: "pt"
    },
    horizontalOffset: "Horizontaler Versatz",
    position: "Position",
    positionLocked: "Diese Zeichnung kann nicht verschoben werden.",
    positionUnavailable: "Die Position ist nur bei frei beweglichen Bildern verfügbar.",
    relativeToHorizontal: "Relativ zu (horizontal)",
    relativeToVertical: "Relativ zu (vertikal)",
    verticalOffset: "Vertikaler Versatz"
  }
};

// fr.json
var fr_default = {
  _lang: "fr",
  common: {
    cancel: "Annuler",
    apply: "Appliquer",
    close: "Fermer",
    comment: "Commenter",
    dismiss: "Ignorer"
  },
  toolbar: {
    ariaLabel: "Outils de mise en forme",
    file: "Fichier",
    format: "Format",
    insert: "Insérer",
    open: "Ouvrir",
    openShortcut: "Ctrl+O",
    save: "Enregistrer",
    saveShortcut: "Ctrl+S",
    print: "Imprimer",
    printShortcut: "Ctrl+P",
    pageSetup: "Mise en page",
    leftToRight: "Texte de gauche à droite",
    rightToLeft: "Texte de droite à gauche",
    image: "Image",
    table: "Tableau",
    pageBreak: "Saut de page",
    tableOfContents: "Table des matières",
    help: "Aide",
    reportIssue: "Signaler un bug",
    watermark: "Filigrane",
    break: "Saut",
    sectionBreakContinuous: "Saut de section (continu)",
    sectionBreakNextPage: "Saut de section (page suivante)",
    insertFootnote: "Insérer une note de bas de page",
    insertEndnote: "Insérer une note de fin"
  },
  formattingBar: {
    groups: {
      history: "Historique",
      zoom: "Zoom",
      styles: "Styles",
      font: "Police",
      textFormatting: "Mise en forme du texte",
      script: "Attributs",
      alignment: "Alignement",
      listFormatting: "Format de liste",
      image: "Image",
      table: "Tableau"
    },
    undo: "Annuler",
    undoShortcut: "Annuler (Ctrl+Z)",
    redo: "Rétablir",
    redoShortcut: "Rétablir (Ctrl+Y)",
    bold: "Gras",
    boldShortcut: "Gras (Ctrl+B)",
    italic: "Italique",
    italicShortcut: "Italique (Ctrl+I)",
    underline: "Souligné",
    underlineShortcut: "Souligné (Ctrl+U)",
    strikethrough: "Barré",
    fontColor: "Couleur du texte",
    highlightColor: "Couleur de surbrillance",
    insertLink: "Insérer un lien",
    insertLinkShortcut: "Insérer un lien (Ctrl+K)",
    superscript: "Exposant",
    superscriptShortcut: "Exposant (Ctrl+Maj+=)",
    subscript: "Indice",
    subscriptShortcut: "Indice (Ctrl+=)",
    imageProperties: "Propriétés de l'image",
    imagePropertiesShortcut: "Propriétés de l'image... (description, bordure)",
    clearFormatting: "Effacer la mise en forme",
    commentsAndChanges: "Commentaires et modifications",
    unavailableInPreview: "Non disponible dans cette version préliminaire",
    more: "Plus",
    altText: "Texte de remplacement",
    imageWrap: "Habillage du texte"
  },
  alignment: {
    alignLeft: "Aligner à gauche",
    alignLeftShortcut: "Ctrl+L",
    center: "Centrer",
    centerShortcut: "Ctrl+E",
    alignRight: "Aligner à droite",
    alignRightShortcut: "Ctrl+R",
    justify: "Justifier",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "Format de liste",
    typeAriaLabel: "Type de liste",
    indentationAriaLabel: "Retrait de la liste",
    bulletList: "Liste à puces",
    numberedList: "Liste numérotée",
    decreaseIndent: "Décaler à gauche",
    increaseIndent: "Décaler à droite"
  },
  lineSpacing: {
    single: "Simple",
    double: "Double",
    lineSpacingTitle: "Interligne : {label}",
    blockSpacingRules: "Espacement des paragraphes",
    label: "Interligne",
    addSpaceAfter: "Ajouter un espace après le paragraphe",
    addSpaceBefore: "Ajouter un espace avant le paragraphe",
    removeSpaceAfter: "Supprimer l'espace après le paragraphe",
    removeSpaceBefore: "Supprimer l'espace avant le paragraphe"
  },
  styles: {
    selectAriaLabel: "Sélectionner le type de paragraphe",
    normalText: "Texte normal",
    title: "Titre",
    subtitle: "Sous-titre",
    heading1: "Titre 1",
    heading2: "Titre 2",
    heading3: "Titre 3"
  },
  font: {
    selectAriaLabel: "Sélectionner une police",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "Polices du document"
  },
  fontSize: {
    decrease: "Diminuer la taille de la police",
    increase: "Augmenter la taille de la police",
    label: "Police",
    listLabel: "Tailles de police"
  },
  zoom: {
    ariaLabel: "Zoom : {label}",
    zoomIn: "Zoom avant",
    zoomLevel: "Niveau de zoom",
    zoomOut: "Zoom arrière",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "Couleurs de surbrillance",
    customColor: "Couleur personnalisée",
    noColor: "Aucune couleur",
    automatic: "Automatique",
    themeColors: "Couleurs du thème",
    standardColors: "Couleurs standards",
    colors: {
      black: "Noir",
      darkRed: "Rouge foncé",
      red: "Rouge",
      orange: "Orange",
      yellow: "Jaune",
      darkYellow: "Jaune foncé",
      green: "Vert",
      darkGreen: "Vert foncé",
      blue: "Bleu",
      darkBlue: "Bleu foncé",
      purple: "Violet",
      white: "Blanc",
      lightGreen: "Vert clair",
      lightBlue: "Bleu clair",
      darkGray: "Gris foncé",
      cyan: "Cyan",
      magenta: "Magenta",
      brightGreen: "Vert vif",
      darkCyan: "Cyan foncé",
      darkMagenta: "Magenta foncé",
      lightGray: "Gris clair"
    },
    apply: "Appliquer",
    theme: {
      accent1: "Accentuation 1",
      accent2: "Accentuation 2",
      accent3: "Accentuation 3",
      accent4: "Accentuation 4",
      accent5: "Accentuation 5",
      accent6: "Accentuation 6",
      background1: "Arrière-plan 1",
      background2: "Arrière-plan 2",
      text1: "Texte 1",
      text2: "Texte 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "Propriétés de l'image",
      altText: "Texte alternatif",
      altTextPlaceholder: "Décrivez l'image pour l'accessibilité...",
      textWrapping: "Retour à la ligne automatique",
      dimensions: "Dimensions",
      widthLabel: "Largeur :",
      heightLabel: "Hauteur :",
      lockAspectRatio: "Verrouiller les proportions"
    },
    imagePosition: {
      relativeOptions: {
        page: "Page",
        column: "Colonne",
        margin: "Marge",
        character: "Caractère",
        paragraph: "Paragraphe",
        line: "Ligne"
      }
    },
    pageSetup: {
      title: "Disposition de la page",
      pageSize: "Taille de la page",
      sizeLabel: "Taille",
      custom: "Personnalisée",
      orientation: "Orientation",
      portrait: "Portrait",
      landscape: "Paysage",
      margins: "MARGES",
      top: "Haut",
      bottom: "Bas",
      left: "Gauche",
      right: "Droite",
      pageSizes: {
        letter: "Lettre US (21,6 × 27,9 cm)",
        a4: "A4 (21 × 29,7 cm)",
        legal: "Standard juridique US (21,6 × 35,6 cm)",
        a3: "A3 (29,7 × 42 cm)",
        a5: "A5 (14,8 × 21 cm)",
        b5: "B5 (17,6 × 25 cm)",
        executive: "Executive (18,4 × 26,7 cm)"
      },
      applyTo: "Appliquer à",
      applyToDocument: "À tout le document",
      applyToSection: "À cette section"
    },
    footnoteProperties: {
      title: "Propriétés des notes de bas de page et de fin",
      footnotes: "Notes de bas de page",
      endnotes: "Notes de fin",
      position: "Position",
      numberFormat: "Format de numérotation",
      numbering: "Numérotation",
      footnotePositions: {
        bottomOfPage: "Bas de page",
        belowText: "Sous le texte"
      },
      endnotePositions: {
        endOfDocument: "Fin du document",
        endOfSection: "Fin de la section"
      },
      numberingOptions: {
        continuous: "Continue",
        restartSection: "Recommencer à chaque section",
        restartPage: "Recommencer à chaque page"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "Inconnu",
    addComment: "Ajouter un commentaire...",
    replyPlaceholder: "Répondre ou mentionner d'autres personnes avec @"
  },
  contextMenu: {
    ariaLabel: "Menu des actions IA",
    cut: "Couper",
    cutShortcut: "Ctrl+X",
    copy: "Copier",
    copyShortcut: "Ctrl+C",
    paste: "Coller",
    pasteShortcut: "Ctrl+V",
    delete: "Supprimer",
    deleteShortcut: "Suppr",
    selectAll: "Tout sélectionner",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "Modifier {label}",
    removeCustomNode: "Supprimer {label}"
  },
  documentOutline: {
    ariaLabel: "Plan du document",
    closeAriaLabel: "Fermer le plan",
    closeTitle: "Fermer le plan",
    title: "Plan",
    noHeadings: "Aucun titre trouvé. Ajoutez des titres à votre document pour les voir apparaître ici."
  },
  viewer: {
    pageIndicator: "{current} sur {total}"
  },
  titleBar: {
    untitled: "Sans titre",
    documentNameAriaLabel: "Nom du document",
    menuBarAriaLabel: "Barre de menus"
  },
  errors: {
    unableToParse: "Impossible d'analyser le document",
    somethingWentWrong: "Une erreur est survenue",
    errorDescription: "Une erreur s'est produite lors du rendu de ce composant. Veuillez réessayer ou contacter le support si le problème persiste.",
    errorLabel: "Erreur :",
    componentStack: "Pile de composants :",
    tryAgain: "Réessayer",
    showDetails: "Afficher les détails",
    hideDetails: "Masquer les détails"
  },
  table: {
    insertRowAbove: "Insérer une ligne au-dessus",
    insertRowBelow: "Insérer une ligne en dessous",
    insertColumnLeft: "Insérer une colonne à gauche",
    insertColumnRight: "Insérer une colonne à droite",
    deleteRow: "Supprimer la ligne",
    deleteColumn: "Supprimer la colonne",
    deleteTable: "Supprimer le tableau",
    mergeCells: "Fusionner les cellules",
    splitCell: "Fractionner la cellule",
    editingTools: "Outils d'édition de tableau",
    label: "Tableau :",
    cellFillColor: "Couleur de remplissage des cellules",
    borderColor: "Couleur de la bordure",
    borderWidth: "Épaisseur de la bordure",
    borders: {
      all: "Toutes les bordures",
      outside: "Bordures extérieures",
      inside: "Bordures intérieures",
      none: "Aucune bordure",
      top: "Bordure supérieure",
      bottom: "Bordure inférieure",
      left: "Bordure gauche",
      right: "Bordure droite",
      styleAriaLabel: "Style de bordure",
      tooltip: "Bordures"
    },
    moreOptions: "Plus d'options de tableau",
    selectTable: "Sélectionner le tableau entier",
    borderStyles: {
      dashed: "Tirets",
      dotted: "Pointillé",
      double: "Double",
      single: "Trait plein",
      thick: "Épais",
      triple: "Triple"
    },
    borderWidths: {
      halfPt: "0,5 pt",
      oneHalfPt: "1,5 pt",
      onePt: "1 pt",
      threePt: "3 pt",
      twoPt: "2 pt"
    },
    clearCellFill: "Effacer le remplissage de la cellule"
  },
  tableAdvanced: {
    verticalAlignment: "Alignement vertical",
    top: "Haut",
    middle: "Milieu",
    bottom: "Bas",
    toggleNoWrap: "Activer/Désactiver le retour à la ligne",
    toggleHeaderRow: "Activer/Désactiver la ligne d'en-tête",
    distributeColumns: "Uniformiser la largeur des colonnes",
    autoFit: "Ajuster automatiquement au contenu",
    tableProperties: "Propriétés du tableau...",
    tableAlignment: "Alignement du tableau",
    alignTableLeft: "Aligner le tableau à gauche",
    alignTableCenter: "Centrer le tableau",
    alignTableRight: "Aligner le tableau à droite"
  },
  imageTransform: {
    tooltip: "Transformer",
    rotateClockwise: "Pivoter vers la droite",
    rotateCounterClockwise: "Pivoter vers la gauche",
    flipHorizontal: "Retourner horizontalement",
    flipVertical: "Retourner verticalement"
  },
  imageWrap: {
    inline: "En ligne avec le texte",
    floatLeft: "Carré à gauche",
    floatRight: "Carré à droite",
    topAndBottom: "Haut et bas",
    behindText: "Derrière le texte",
    inFrontOfText: "Devant le texte",
    tooltipPrefix: "Habillage : {label}",
    menu: {
      inLineWithText: "En ligne avec le texte",
      squareLeft: "Carré à gauche",
      squareRight: "Carré à droite",
      ariaLabel: "Options de disposition de l'image"
    },
    square: "Carré",
    targets: {
      behind: "Derrière le texte",
      inFront: "Devant le texte",
      inline: "Aligné sur le texte",
      square: "Carré",
      squareLeft: "Carré à gauche",
      squareRight: "Carré à droite",
      through: "Au travers",
      tight: "Rapproché",
      topAndBottom: "Haut et bas"
    },
    through: "Au travers",
    tight: "Rapproché"
  },
  editor: {
    showDocumentOutline: "Afficher le plan",
    linkCopied: "Lien copié dans le presse-papiers",
    fontSubstitutionNotice: "Certaines polices de ce document ne sont pas disponibles ; des polices de substitution sont affichées : {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "Texte à afficher",
    urlPlaceholder: "https://exemple.com",
    copyLink: "Copier le lien",
    editLink: "Modifier le lien",
    removeLink: "Supprimer le lien",
    apply: "Appliquer",
    bookmarkTarget: "Renvoie à un emplacement dans ce document",
    cancel: "Annuler",
    editTitle: "Modifier le lien",
    inertTarget: "Ce lien pointe vers une destination que l'éditeur n'ouvrira pas",
    insertTitle: "Insérer un lien",
    openLink: "Ouvrir le lien",
    refused: "Ce lien n'a pas pu être appliqué. Vérifiez l'adresse et réessayez.",
    urlLabel: "URL"
  },
  headerFooter: {
    header: "En-tête",
    footer: "Pied de page",
    options: "Options",
    insertPageNumber: "Insérer le numéro de page",
    insertTotalPages: "Insérer le nombre total de pages",
    chromeAriaLabel: "Édition des en-têtes et pieds de page",
    firstPageHeader: "En-tête de la première page",
    firstPageFooter: "Pied de page de la première page",
    evenPageHeader: "En-tête des pages paires",
    evenPageFooter: "Pied de page des pages paires",
    sameAsPrevious: "Identique au précédent",
    sameAsPreviousHint: "Les modifications s'appliquent aussi aux pages de la section précédente.",
    differentFirstPage: "Première page différente",
    differentOddEven: "Pages paires et impaires différentes",
    differentOddEvenHint: "S'applique à l'ensemble du document.",
    linkToPrevious: "Lier au précédent",
    unlinkFromPrevious: "Dissocier du précédent",
    headerDistance: "Distance de l'en-tête par rapport au bord",
    footerDistance: "Distance du pied de page par rapport au bord",
    removeHeader: "Supprimer l'en-tête",
    removeFooter: "Supprimer le pied de page",
    insertSectionPages: "Insérer le nombre de pages de la section",
    insertPageXofY: "Insérer page X sur Y"
  },
  image: {
    contentMismatch: "Le contenu de l'image ne correspond pas à son type",
    decodeFailed: "L'image n'a pas pu être décodée",
    externalResource: "Image externe non chargée",
    invalidResource: "Image non valide",
    missingResource: "Image manquante",
    nonPictureGraphic: "Graphique non pris en charge ({kind})",
    pendingResource: "Chargement de l'image",
    resourceLimit: "L'image dépasse les limites de taille",
    unsupportedFormat: "Format d'image non pris en charge ({format})"
  },
  imageOverlay: {
    handle: {
      e: "Redimensionner le bord droit",
      n: "Redimensionner le bord supérieur",
      ne: "Redimensionner le coin supérieur droit",
      nw: "Redimensionner le coin supérieur gauche",
      s: "Redimensionner le bord inférieur",
      se: "Redimensionner le coin inférieur droit",
      sw: "Redimensionner le coin inférieur gauche",
      w: "Redimensionner le bord gauche"
    },
    selection: "Image sélectionnée"
  },
  ruler: {
    horizontal: "Règle horizontale",
    vertical: "Règle verticale",
    firstLineIndent: "Indentation de première ligne",
    leftIndent: "Décalage à gauche",
    rightIndent: "Décalage à droite",
    topMargin: "Marge supérieure",
    bottomMargin: "Marge inférieure",
    hangingIndent: "Retrait négatif"
  },
  loading: {
    label: "Chargement"
  },
  revisions: {
    paragraphMarkInserted: "Marque de paragraphe insérée",
    runPropertiesChanged: "Mise en forme du texte modifiée"
  },
  toc: {
    refresh: "Mettre à jour toute la table",
    refreshPageNumbers: "Mettre à jour uniquement les numéros de page"
  },
  editingMode: {
    editing: "Édition",
    label: "Mode d'édition",
    editingHint: "Modifier directement le document",
    suggesting: "Suggestion",
    suggestingHint: "Les modifications deviennent des suggestions",
    viewing: "Affichage",
    viewingHint: "Lecture seule, aucune modification"
  },
  navigation: {
    ariaLabel: "Navigation dans le document",
    closeAriaLabel: "Fermer la navigation",
    closeTitle: "Fermer la navigation",
    find: {
      clearAriaLabel: "Effacer la recherche",
      counter: "Résultat {current} sur {total}",
      counterTruncated: "Résultat {current} sur {total}+",
      inputAriaLabel: "Rechercher dans le document",
      matchCase: "Respecter la casse",
      nextAriaLabel: "Résultat suivant",
      noResults: "Aucun résultat",
      optionsAriaLabel: "Options de recherche",
      placeholder: "Rechercher dans le document",
      previousAriaLabel: "Résultat précédent",
      resultsAriaLabel: "Résultats de la recherche",
      searching: "Recherche…",
      wholeWord: "Mots entiers uniquement",
      total: "{total, plural, one {# résultat} other {# résultats}}",
      totalTruncated: "{total, plural, other {#+ résultats}}"
    },
    headings: {
      noHeadings: "Aucun titre trouvé. Ajoutez des titres à votre document pour les voir ici."
    },
    openAriaLabel: "Ouvrir la navigation",
    openTitle: "Navigation",
    tabs: {
      find: "Rechercher",
      headings: "Titres"
    },
    title: "Navigation"
  },
  contentControl: {
    formFill: "Mode remplissage de formulaire",
    group: "Contrôles de contenu",
    inspector: "Propriétés du contrôle de contenu",
    inspectorPanel: {
      alias: "Titre",
      bound: "Lié aux données",
      boundNote: "Ce contrôle est lié à des données externes. La modification est refusée.",
      empty: "—",
      lock: "Verrouillage",
      lockedNote: "La modification du contenu est verrouillée pour ce contrôle.",
      no: "Non",
      placeholder: "Espace réservé",
      tag: "Balise",
      title: "Contrôle de contenu",
      type: "Type",
      yes: "Oui"
    },
    lock: {
      contentLocked: "Contenu verrouillé",
      sdtContentLocked: "Contrôle de contenu et contenu verrouillés",
      sdtLocked: "Contrôle de contenu verrouillé",
      unlocked: "Déverrouillé"
    },
    remove: "Supprimer le contrôle de contenu",
    showAll: "Afficher les limites des contrôles de contenu",
    types: {
      checkbox: "Case à cocher",
      comboBox: "Zone de liste modifiable",
      date: "Date",
      dropdown: "Liste déroulante",
      picture: "Image",
      plainText: "Texte",
      repeatingSection: "Section répétitive",
      richText: "Texte enrichi"
    }
  },
  notes: {
    delete: "Supprimer la note",
    convertToEndnote: "Convertir en note de fin",
    convertToFootnote: "Convertir en note de bas de page",
    scope: "Appliquer à",
    scopeDocument: "Document entier",
    scopeSection: "Cette section",
    previewFallback: "Note de bas de page",
    chromeAriaLabel: "Édition de note",
    editingRegion: "{kind} {number}",
    footnoteKind: "Note de bas de page",
    endnoteKind: "Note de fin",
    convertAllFootnotes: "Convertir toutes les notes de bas de page en notes de fin",
    convertAllEndnotes: "Convertir toutes les notes de fin en notes de bas de page",
    inheritedValue: "(hérité)"
  },
  review: {
    accept: "Accepter",
    ariaLabel: "Révision",
    commentRefused: "Impossible d'ajouter le commentaire",
    deleted: "Supprimé",
    empty: "Aucune modification ni aucun commentaire",
    inserted: "Ajouté",
    movedFrom: "Déplacé d'ici",
    movedTo: "Déplacé ici",
    reject: "Refuser",
    replaced: "Remplacé",
    replacedWith: "par",
    reply: "Répondre",
    replyRefused: "Impossible de publier la réponse",
    showPane: "Afficher les commentaires",
    structural: "Structure du document modifiée",
    deleteComment: "Supprimer le commentaire",
    discardChange: "Ignorer la modification"
  },
  imageAltText: {
    description: "Description",
    panelTitle: "Texte de remplacement",
    title: "Titre"
  },
  imageInsert: {
    errors: {
      emptyFile: "Le fichier sélectionné est vide.",
      invalidSignature: "Le fichier n'est pas une image PNG, JPEG ou GIF prise en charge.",
      oversize: "L'image dépasse la taille maximale autorisée.",
      refused: "L'image n'a pas pu être insérée.",
      unsupportedFormat: "Ce format d'image n'est pas pris en charge pour l'insertion."
    }
  },
  imageProperties: {
    crop: "Rogner",
    cropBottom: "Bas (%)",
    cropLeft: "Gauche (%)",
    cropRight: "Droite (%)",
    cropTop: "Haut (%)",
    errors: {
      invalidCrop: "Les valeurs de rognage doivent être des pourcentages compris entre 0 et 100.",
      invalidDimensions: "Entrez des valeurs de largeur et de hauteur positives.",
      refused: "Ces propriétés n'ont pas pu être appliquées.",
      invalidPosition: "Entrez des valeurs de position horizontale et verticale valides."
    },
    hyperlink: "Lien hypertexte",
    nonPictureHint: "Le rognage et la réinitialisation à la taille d'origine ne sont disponibles que pour les images.",
    resetNaturalSize: "Rétablir la taille d'origine",
    units: {
      points: "pt"
    },
    horizontalOffset: "Décalage horizontal",
    position: "Position",
    positionLocked: "Ce dessin ne peut pas être déplacé.",
    positionUnavailable: "La position n'est disponible que pour les images flottantes.",
    relativeToHorizontal: "Par rapport à (horizontal)",
    relativeToVertical: "Par rapport à (vertical)",
    verticalOffset: "Décalage vertical"
  }
};

// he.json
var he_default = {
  _lang: "he",
  common: {
    cancel: "ביטול",
    apply: "החלה",
    close: "סגירה",
    comment: "הערה",
    dismiss: "סגירה"
  },
  toolbar: {
    ariaLabel: "סרגל כלים לעיצוב",
    file: "קובץ",
    format: "עצב",
    insert: "הוספה",
    print: "הדפסה",
    printShortcut: "Ctrl+P",
    pageSetup: "הגדרות דף",
    leftToRight: "טקסט משמאל לימין",
    rightToLeft: "טקסט מימין לשמאל",
    image: "תמונה",
    table: "טבלה",
    pageBreak: "מעבר עמוד",
    tableOfContents: "תוכן עניינים",
    help: "עזרה",
    reportIssue: "דיווח בעיה",
    open: "פתיחה",
    openShortcut: "Ctrl+O",
    save: "שמירה",
    saveShortcut: "Ctrl+S",
    watermark: "סימן מים",
    break: "מעבר",
    sectionBreakContinuous: "מעבר מקטע (רציף)",
    sectionBreakNextPage: "מעבר מקטע (עמוד הבא)",
    insertFootnote: "הוסף הערת שוליים",
    insertEndnote: "הוסף הערת סוף"
  },
  formattingBar: {
    groups: {
      history: "היסטוריה",
      zoom: "זום",
      styles: "עיצובים",
      font: "גופן",
      textFormatting: "עיצוב טקסט",
      script: "סקריפט",
      alignment: "יישור טקסט",
      listFormatting: "עיצוב רשימה",
      image: "תמונה",
      table: "טבלה"
    },
    undo: "בטל",
    undoShortcut: "בטל (Ctrl+Z)",
    redo: "בצע שוב",
    redoShortcut: "בצע שוב (Ctrl+Y)",
    bold: "הדגש",
    boldShortcut: "הדגש (Ctrl+B)",
    italic: "הטה",
    italicShortcut: "הטה (Ctrl+I)",
    underline: "קו תחתון",
    underlineShortcut: "קו תחתון (Ctrl+U)",
    strikethrough: "קו חוצה",
    fontColor: "צבע טקסט",
    highlightColor: "צבע הדגשה",
    insertLink: "הוסף קישור",
    insertLinkShortcut: "הוסף קישור (Ctrl+K)",
    superscript: "כתב עילי",
    superscriptShortcut: "כתב עילי",
    subscript: "כתב תחתי",
    subscriptShortcut: "כתב תחתי",
    imageProperties: "מאפייני תמונה",
    imagePropertiesShortcut: "מאפייני תמונה",
    clearFormatting: "נקה עיצוב",
    commentsAndChanges: "הערות ושינויים",
    unavailableInPreview: "לא זמין בגרסת תצוגה מקדימה זו",
    more: "עוד",
    altText: "טקסט חלופי",
    imageWrap: "גלישת טקסט"
  },
  alignment: {
    alignLeft: "יישור לשמאל",
    alignLeftShortcut: "יישור לשמאל (Ctrl+L)",
    center: "יישור למרכז",
    centerShortcut: "יישור למרכז (Ctrl+E)",
    alignRight: "יישור לימין",
    alignRightShortcut: "יישור לימין (Ctrl+R)",
    justify: "יישור מלא",
    justifyShortcut: "יישור מלא (Ctrl+J)"
  },
  lists: {
    ariaLabel: "עיצוב רשימות",
    typeAriaLabel: "סוג רשימה",
    indentationAriaLabel: "הזחת רשימה",
    bulletList: "רשימת תבליטים",
    numberedList: "רשימה ממוספרת",
    decreaseIndent: "הקטן הזחה",
    increaseIndent: "הגדל הזחה"
  },
  lineSpacing: {
    single: "יחיד",
    double: "כפול",
    lineSpacingTitle: "מרחק בין שורות: {label}",
    blockSpacingRules: "מרחק בין פסקאות",
    label: "מרווח בין שורות",
    addSpaceAfter: "הוסף רווח אחרי פסקה",
    addSpaceBefore: "הוסף רווח לפני פסקה",
    removeSpaceAfter: "הסר רווח אחרי פסקה",
    removeSpaceBefore: "הסר רווח לפני פסקה"
  },
  styles: {
    selectAriaLabel: "בחר סגנון פסקה",
    normalText: "טקסט רגיל",
    title: "כותרת",
    subtitle: "כותרת משנה",
    heading1: "כותרת 1",
    heading2: "כותרת 2",
    heading3: "כותרת 3"
  },
  font: {
    selectAriaLabel: "בחר סוג גופן",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "גופני המסמך"
  },
  fontSize: {
    decrease: "הקטנת גופן",
    increase: "הגדלת גופן",
    label: "גודל גופן",
    listLabel: "גדלי גופן"
  },
  zoom: {
    ariaLabel: "זום: {label}",
    zoomIn: "הגדל תצוגה",
    zoomLevel: "רמת זום",
    zoomOut: "הקטן תצוגה",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "צבע סימון",
    customColor: "בהתאמה אישית",
    noColor: "ללא צבע",
    automatic: "אוטומטי",
    themeColors: "צבעי ערכת נושא",
    standardColors: "צבעים סטנדרטיים",
    colors: {
      black: "שחור",
      darkRed: "אדום כהה",
      red: "אדום",
      orange: "כתום",
      yellow: "צהוב",
      darkYellow: "צהוב כהה",
      green: "ירוק",
      darkGreen: "ירוק כהה",
      blue: "כחול",
      darkBlue: "כחול כהה",
      purple: "סגול",
      white: "לבן",
      lightGreen: "ירוק בהיר",
      lightBlue: "כחול בהיר",
      darkGray: "אפור כהה",
      cyan: "ציאן",
      magenta: "מג'נטה",
      brightGreen: "ירוק בהיר",
      darkCyan: "ציאן כהה",
      darkMagenta: "מג'נטה כהה",
      lightGray: "אפור בהיר"
    },
    apply: "החל",
    theme: {
      accent1: "הדגשה 1",
      accent2: "הדגשה 2",
      accent3: "הדגשה 3",
      accent4: "הדגשה 4",
      accent5: "הדגשה 5",
      accent6: "הדגשה 6",
      background1: "רקע 1",
      background2: "רקע 2",
      text1: "טקסט 1",
      text2: "טקסט 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "מאפייני תמונה",
      altText: "טקסט חלופי",
      altTextPlaceholder: "תאר את התמונה לצורכי נגישות...",
      dimensions: "ממדים",
      heightLabel: "גובה:",
      lockAspectRatio: "נעל יחס גובה-רוחב",
      textWrapping: "גלישת טקסט",
      widthLabel: "רוחב:"
    },
    imagePosition: {
      relativeOptions: {
        page: "עמוד",
        column: "עמודה",
        margin: "שוליים",
        character: "תו",
        paragraph: "פסקה",
        line: "שורה"
      }
    },
    pageSetup: {
      title: "הגדרת עמוד",
      pageSize: "גודל עמוד",
      sizeLabel: "גודל",
      custom: "מותאם אישית",
      orientation: "כיוון",
      portrait: "לאורך",
      landscape: "לרוחב",
      margins: "שוליים",
      top: "עליון",
      bottom: "תחתון",
      left: "שמאל",
      right: "ימין",
      pageSizes: {
        letter: 'Letter (8.5" × 11")',
        a4: 'A4 (8.27" × 11.69")',
        legal: 'Legal (8.5" × 14")',
        a3: 'A3 (11.69" × 16.54")',
        a5: 'A5 (5.83" × 8.27")',
        b5: 'B5 (6.93" × 9.84")',
        executive: 'Executive (7.25" × 10.5")'
      },
      applyTo: "החל על",
      applyToDocument: "כל המסמך",
      applyToSection: "מקטע זה"
    },
    footnoteProperties: {
      title: "מאפייני הערות שוליים והערות סיום",
      footnotes: "הערות שוליים",
      endnotes: "הערות סיום",
      position: "מיקום",
      numberFormat: "פורמט מספר",
      numbering: "מספור",
      footnotePositions: {
        bottomOfPage: "בתחתית העמוד",
        belowText: "מתחת לטקסט"
      },
      endnotePositions: {
        endOfDocument: "בסוף המסמך",
        endOfSection: "בסוף מקטע"
      },
      numberingOptions: {
        continuous: "רציף",
        restartSection: "התחל מחדש בכל מקטע",
        restartPage: "התחל מחדש בכל עמוד"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "לא ידוע",
    addComment: "הוסף תגובה...",
    replyPlaceholder: "השב או הוסף אחרים עם @"
  },
  contextMenu: {
    ariaLabel: "תפריט פעולות AI",
    cut: "גזור",
    cutShortcut: "Ctrl+X",
    copy: "העתק",
    copyShortcut: "Ctrl+C",
    paste: "הדבק",
    pasteShortcut: "Ctrl+V",
    delete: "מחק",
    deleteShortcut: "Del",
    selectAll: "בחר הכל",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "ערוך {label}",
    removeCustomNode: "הסר {label}"
  },
  documentOutline: {
    ariaLabel: "מתווה המסמך",
    closeAriaLabel: "סגור מתווה",
    closeTitle: "סגור מתווה",
    title: "מתווה",
    noHeadings: "לא נמצאו כותרות. הוסף כותרות למסמך כדי לראות אותן כאן."
  },
  titleBar: {
    untitled: "ללא שם",
    documentNameAriaLabel: "שם המסמך",
    menuBarAriaLabel: "שורת התפריטים"
  },
  errors: {
    unableToParse: "לא ניתן לעבד את המסמך",
    somethingWentWrong: "משהו השתבש",
    errorDescription: "אירעה שגיאה בעת הצגת רכיב זה. נסה שוב או פנה לתמיכה אם הבעיה נמשכת.",
    errorLabel: "שגיאה:",
    componentStack: "מחסנית רכיבים:",
    tryAgain: "נסה שוב",
    showDetails: "הצג פרטים",
    hideDetails: "הסתר פרטים"
  },
  table: {
    insertRowAbove: "הוסף שורה מעל",
    insertRowBelow: "הוסף שורה מתחת",
    insertColumnLeft: "הוסף עמודה שמאלה",
    insertColumnRight: "הוסף עמודה ימינה",
    deleteRow: "מחק שורה",
    deleteColumn: "מחק עמודה",
    deleteTable: "מחק טבלה",
    mergeCells: "מזג תאים",
    splitCell: "פצל תא",
    editingTools: "כלי עריכת טבלה",
    label: "טבלה:",
    cellFillColor: "צבע מילוי תא",
    borderColor: "צבע מסגרת",
    borderWidth: "עובי מסגרת",
    borders: {
      all: "כל המסגרות",
      outside: "מסגרות חיצוניות",
      inside: "מסגרות פנימיות",
      none: "ללא מסגרות",
      top: "מסגרת עליונה",
      bottom: "מסגרת תחתונה",
      left: "מסגרת שמאלית",
      right: "מסגרת ימנית",
      styleAriaLabel: "סגנון מסגרת",
      tooltip: "מסגרות"
    },
    moreOptions: "אפשרויות טבלה נוספות",
    selectTable: "בחר את הטבלה כולה",
    borderStyles: {
      dashed: "מקווקו",
      dotted: "מנוקד",
      double: "כפול",
      single: "רציף",
      thick: "עבה",
      triple: "משולש"
    },
    borderWidths: {
      halfPt: "0.5 נק'",
      oneHalfPt: "1.5 נק'",
      onePt: "1 נק'",
      threePt: "3 נק'",
      twoPt: "2 נק'"
    },
    clearCellFill: "נקה מילוי תא"
  },
  tableAdvanced: {
    verticalAlignment: "יישור אנכי",
    top: "למעלה",
    middle: "מרכז",
    bottom: "למטה",
    toggleNoWrap: "הפעל/בטל גלישת טקסט",
    toggleHeaderRow: "הפעל/בטל שורת כותרת",
    distributeColumns: "פזר עמודות באופן שווה",
    autoFit: "התאם אוטומטית לתוכן",
    tableProperties: "מאפייני טבלה...",
    tableAlignment: "יישור טבלה",
    alignTableLeft: "יישר טבלה לשמאל",
    alignTableCenter: "יישר טבלה למרכז",
    alignTableRight: "יישר טבלה לימין"
  },
  imageTransform: {
    tooltip: "טרנספורמציה",
    rotateClockwise: "סובב עם כיוון השעון",
    rotateCounterClockwise: "סובב נגד כיוון השעון",
    flipHorizontal: "הפוך אופקית",
    flipVertical: "הפוך אנכית"
  },
  imageWrap: {
    inline: "בתוך שורת הטקסט",
    floatLeft: "צף שמאל (טקסט מימין)",
    floatRight: "צף ימין (טקסט משמאל)",
    topAndBottom: "מעל ומתחת",
    behindText: "מאחורי הטקסט",
    inFrontOfText: "מעל הטקסט",
    tooltipPrefix: "גלישה: {label}",
    menu: {
      ariaLabel: "אפשרויות פריסת תמונה",
      inLineWithText: "בתוך שורת הטקסט",
      squareLeft: "ריבוע משמאל",
      squareRight: "ריבוע מימין"
    },
    square: "ריבוע",
    targets: {
      behind: "מאחורי הטקסט",
      inFront: "לפני הטקסט",
      inline: "בשורה עם הטקסט",
      square: "ריבוע",
      squareLeft: "ריבוע משמאל",
      squareRight: "ריבוע מימין",
      through: "דרך",
      tight: "הדוק",
      topAndBottom: "למעלה ולמטה"
    },
    through: "דרך",
    tight: "הדוק"
  },
  editor: {
    showDocumentOutline: "הצג מתאר מסמך",
    linkCopied: "הקישור הועתק ללוח",
    fontSubstitutionNotice: "חלק מהגופנים במסמך זה אינם זמינים, ולכן מוצגים גופנים חלופיים: {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "טקסט לתצוגה",
    urlPlaceholder: "https://example.com",
    copyLink: "העתק קישור",
    editLink: "ערוך קישור",
    removeLink: "הסר קישור",
    apply: "החל",
    bookmarkTarget: "מוביל למיקום במסמך זה",
    cancel: "ביטול",
    editTitle: "ערוך קישור",
    inertTarget: "קישור זה מצביע על יעד שהעורך לא יפתח",
    insertTitle: "הוסף קישור",
    openLink: "פתח קישור",
    refused: "לא ניתן להחיל את הקישור. בדוק את הכתובת ונסה שוב.",
    urlLabel: "כתובת URL"
  },
  headerFooter: {
    header: "כותרת עליונה",
    footer: "כותרת תחתונה",
    options: "אפשרויות",
    insertPageNumber: "הוסף מספר עמוד נוכחי",
    insertTotalPages: "הוסף סך כל העמודים",
    chromeAriaLabel: "עריכת כותרות עליונה ותחתונה",
    firstPageHeader: "כותרת עליונה של העמוד הראשון",
    firstPageFooter: "כותרת תחתונה של העמוד הראשון",
    evenPageHeader: "כותרת עליונה של עמודים זוגיים",
    evenPageFooter: "כותרת תחתונה של עמודים זוגיים",
    sameAsPrevious: "זהה לקודם",
    sameAsPreviousHint: "עריכות חלות גם על עמודי המקטע הקודם.",
    differentFirstPage: "עמוד ראשון שונה",
    differentOddEven: "עמודים זוגיים ואי-זוגיים שונים",
    differentOddEvenHint: "חל על כל המסמך.",
    linkToPrevious: "קשר לקודם",
    unlinkFromPrevious: "נתק מהקודם",
    headerDistance: "מרחק כותרת עליונה מהקצה",
    footerDistance: "מרחק כותרת תחתונה מהקצה",
    removeHeader: "הסר כותרת עליונה",
    removeFooter: "הסר כותרת תחתונה",
    insertSectionPages: "הוסף מספר עמודים במקטע",
    insertPageXofY: "הוסף עמוד X מתוך Y"
  },
  image: {
    contentMismatch: "תוכן התמונה אינו תואם לסוג שלה",
    decodeFailed: "לא ניתן לפענח את התמונה",
    externalResource: "תמונה חיצונית לא נטענה",
    invalidResource: "תמונה לא חוקית",
    missingResource: "תמונה חסרה",
    nonPictureGraphic: "גרפיקה לא נתמכת ({kind})",
    pendingResource: "טוען תמונה",
    resourceLimit: "התמונה חורגת ממגבלות הגודל",
    unsupportedFormat: "תבנית תמונה לא נתמכת ({format})"
  },
  ruler: {
    horizontal: "סרגל אופקי",
    vertical: "סרגל אנכי",
    firstLineIndent: "כניסת שורה ראשונה",
    leftIndent: "כניסה שמאלית",
    rightIndent: "כניסה ימנית",
    topMargin: "שוליים עליונים",
    bottomMargin: "שוליים תחתונים",
    hangingIndent: "כניסה תלויה"
  },
  loading: {
    label: "טוען"
  },
  viewer: {
    pageIndicator: "{current} מתוך {total}"
  },
  imageOverlay: {
    handle: {
      e: "שנה גודל בקצה הימני",
      n: "שנה גודל בקצה העליון",
      ne: "שנה גודל בפינה הימנית העליונה",
      nw: "שנה גודל בפינה השמאלית העליונה",
      s: "שנה גודל בקצה התחתון",
      se: "שנה גודל בפינה הימנית התחתונה",
      sw: "שנה גודל בפינה השמאלית התחתונה",
      w: "שנה גודל בקצה השמאלי"
    },
    selection: "תמונה נבחרת"
  },
  revisions: {
    paragraphMarkInserted: "סימן פסקה נוסף",
    runPropertiesChanged: "עיצוב הטקסט שונה"
  },
  toc: {
    refresh: "עדכון הטבלה כולה",
    refreshPageNumbers: "עדכון מספרי עמודים בלבד"
  },
  editingMode: {
    editing: "עריכה",
    label: "מצב עריכה",
    editingHint: "ערוך את המסמך ישירות",
    suggesting: "הצעות",
    suggestingHint: "עריכות הופכות להצעות",
    viewing: "תצוגה",
    viewingHint: "לקריאה בלבד, ללא עריכות"
  },
  navigation: {
    ariaLabel: "ניווט במסמך",
    closeAriaLabel: "סגור ניווט",
    closeTitle: "סגור ניווט",
    find: {
      clearAriaLabel: "נקה חיפוש",
      counter: "תוצאה {current} מתוך {total}",
      counterTruncated: "תוצאה {current} מתוך {total}+",
      inputAriaLabel: "חפש במסמך",
      matchCase: "התאם רישיות",
      nextAriaLabel: "התוצאה הבאה",
      noResults: "אין תוצאות",
      optionsAriaLabel: "אפשרויות חיפוש",
      placeholder: "חפש במסמך",
      previousAriaLabel: "התוצאה הקודמת",
      resultsAriaLabel: "תוצאות חיפוש",
      searching: "מחפש…",
      wholeWord: "מילים שלמות בלבד",
      total: "{total, plural, one {תוצאה אחת} other {# תוצאות}}",
      totalTruncated: "{total, plural, other {#+ תוצאות}}"
    },
    headings: {
      noHeadings: "לא נמצאו כותרות. הוסף כותרות למסמך כדי לראות אותן כאן."
    },
    openAriaLabel: "פתח ניווט",
    openTitle: "ניווט",
    tabs: {
      find: "חיפוש",
      headings: "כותרות"
    },
    title: "ניווט"
  },
  contentControl: {
    formFill: "מצב מילוי טפסים",
    group: "מפקדי תוכן",
    inspector: "מאפייני מפקד תוכן",
    inspectorPanel: {
      alias: "כותרת",
      bound: "קשור לנתונים",
      boundNote: "מפקד זה קשור לנתונים חיצוניים. עריכה נדחית.",
      empty: "—",
      lock: "נעילה",
      lockedNote: "עריכת התוכן נעולה במפקד זה.",
      no: "לא",
      placeholder: "טקסט מציין מיקום",
      tag: "תג",
      title: "מפקד תוכן",
      type: "סוג",
      yes: "כן"
    },
    lock: {
      contentLocked: "תוכן נעול",
      sdtContentLocked: "מפקד תוכן ותוכן נעולים",
      sdtLocked: "מפקד תוכן נעול",
      unlocked: "לא נעול"
    },
    remove: "הסר מפקד תוכן",
    showAll: "הצג גבולות מפקדי תוכן",
    types: {
      checkbox: "תיבת סימון",
      comboBox: "תיבה משולבת",
      date: "תאריך",
      dropdown: "רשימה נפתחת",
      picture: "תמונה",
      plainText: "טקסט רגיל",
      repeatingSection: "מקטע חוזר",
      richText: "טקסט מעוצב"
    }
  },
  notes: {
    delete: "מחק הערה",
    convertToEndnote: "המר להערת סוף",
    convertToFootnote: "המר להערת שוליים",
    scope: "החל על",
    scopeDocument: "כל המסמך",
    scopeSection: "מקטע זה",
    previewFallback: "הערת שוליים",
    chromeAriaLabel: "עריכת הערות",
    editingRegion: "{kind} {number}",
    footnoteKind: "הערת שוליים",
    endnoteKind: "הערת סוף",
    convertAllFootnotes: "המר את כל הערות השוליים להערות סוף",
    convertAllEndnotes: "המר את כל הערות הסוף להערות שוליים",
    inheritedValue: "(בירושה)"
  },
  review: {
    accept: "קבל",
    ariaLabel: "סקירה",
    commentRefused: "לא ניתן להוסיף את ההערה",
    deleted: "נמחק",
    empty: "אין שינויים או הערות",
    inserted: "נוסף",
    movedFrom: "הועבר מכאן",
    movedTo: "הועבר לכאן",
    reject: "דחה",
    replaced: "הוחלף",
    replacedWith: "ב-",
    reply: "השב",
    replyRefused: "לא ניתן לפרסם את התשובה",
    showPane: "הצג הערות",
    structural: "מבנה המסמך שונה",
    deleteComment: "מחק הערה",
    discardChange: "בטל שינוי"
  },
  imageAltText: {
    description: "תיאור",
    panelTitle: "טקסט חלופי",
    title: "כותרת"
  },
  imageInsert: {
    errors: {
      emptyFile: "הקובץ שנבחר ריק.",
      invalidSignature: "הקובץ אינו תמונת PNG, JPEG או GIF נתמכת.",
      oversize: "התמונה חורגת מהגודל המרבי המותר.",
      refused: "לא ניתן להוסיף את התמונה.",
      unsupportedFormat: "תבנית תמונה זו אינה נתמכת להוספה."
    }
  },
  imageProperties: {
    crop: "חיתוך",
    cropBottom: "למטה (%)",
    cropLeft: "שמאל (%)",
    cropRight: "ימין (%)",
    cropTop: "למעלה (%)",
    errors: {
      invalidCrop: "ערכי החיתוך חייבים להיות אחוזים בין 0 ל-100.",
      invalidDimensions: "הזן ערכי רוחב וגובה חיוביים.",
      refused: "לא ניתן להחיל מאפיינים אלה.",
      invalidPosition: "הזן ערכי מיקום אופקי ואנכי חוקיים."
    },
    hyperlink: "היפר-קישור",
    nonPictureHint: "חיתוך ואיפוס לגודל המקורי זמינים רק עבור תמונות.",
    resetNaturalSize: "אפס לגודל המקורי",
    units: {
      points: "נק'"
    },
    horizontalOffset: "היסט אופקי",
    position: "מיקום",
    positionLocked: "לא ניתן להזיז ציור זה.",
    positionUnavailable: "מיקום זמין רק עבור תמונות צפות.",
    relativeToHorizontal: "ביחס ל (אופקי)",
    relativeToVertical: "ביחס ל (אנכי)",
    verticalOffset: "היסט אנכי"
  }
};

// hi.json
var hi_default = {
  _lang: "hi",
  common: {
    cancel: "रद्द करें",
    apply: "लागू करें",
    close: "बंद करें",
    comment: "टिप्पणी",
    dismiss: "खारिज करें"
  },
  toolbar: {
    ariaLabel: "प्रारूपण टूलबार",
    file: "फ़ाइल",
    format: "प्रारूप",
    insert: "डालें",
    open: "खोलें",
    openShortcut: "Ctrl+O",
    save: "सहेजें",
    saveShortcut: "Ctrl+S",
    print: "प्रिंट करें",
    printShortcut: "Ctrl+P",
    pageSetup: "पेज सेटअप",
    leftToRight: "बाएं से दाएं टेक्स्ट",
    rightToLeft: "दाएं से बाएं टेक्स्ट",
    image: "चित्र",
    table: "तालिका",
    pageBreak: "पेज ब्रेक",
    tableOfContents: "विषय-सूची",
    help: "सहायता",
    reportIssue: "समस्या की रिपोर्ट करें",
    watermark: "वॉटरमार्क",
    break: "ब्रेक",
    sectionBreakContinuous: "अनुभाग ब्रेक (निरंतर)",
    sectionBreakNextPage: "अनुभाग ब्रेक (अगला पृष्ठ)",
    insertFootnote: "फ़ुटनोट डालें",
    insertEndnote: "एंडनोट डालें"
  },
  formattingBar: {
    groups: {
      history: "इतिहास",
      zoom: "ज़ूम",
      styles: "शैली",
      font: "फ़ॉन्ट",
      textFormatting: "टेक्स्ट प्रारूपण",
      script: "स्क्रिप्ट",
      alignment: "संरेखण",
      listFormatting: "सूची प्रारूपण",
      image: "चित्र",
      table: "तालिका"
    },
    undo: "पूर्ववत करें",
    undoShortcut: "पूर्ववत करें (Ctrl+Z)",
    redo: "पुनः करें",
    redoShortcut: "पुनः करें (Ctrl+Y)",
    bold: "बोल्ड",
    boldShortcut: "बोल्ड (Ctrl+B)",
    italic: "इटैलिक",
    italicShortcut: "इटैलिक (Ctrl+I)",
    underline: "रेखांकित",
    underlineShortcut: "रेखांकित (Ctrl+U)",
    strikethrough: "बीच से काटें",
    fontColor: "फ़ॉन्ट का रंग",
    highlightColor: "टेक्स्ट हाइलाइट का रंग",
    insertLink: "लिंक डालें",
    insertLinkShortcut: "लिंक डालें (Ctrl+K)",
    superscript: "सुपरस्क्रिप्ट",
    superscriptShortcut: "सुपरस्क्रिप्ट (Ctrl+Shift+=)",
    subscript: "सबस्क्रिप्ट",
    subscriptShortcut: "सबस्क्रिप्ट (Ctrl+=)",
    imageProperties: "चित्र की विशेषताएँ",
    imagePropertiesShortcut: "चित्र की विशेषताएँ (ऑल्ट टेक्स्ट, बॉर्डर)...",
    clearFormatting: "प्रारूपण साफ करें",
    commentsAndChanges: "टिप्पणियाँ और परिवर्तन",
    unavailableInPreview: "इस पूर्वावलोकन बिल्ड में उपलब्ध नहीं है",
    more: "अधिक",
    altText: "वैकल्पिक पाठ",
    imageWrap: "पाठ रैप करें"
  },
  alignment: {
    alignLeft: "बाएं संरेखित करें",
    alignLeftShortcut: "Ctrl+L",
    center: "केंद्रित करें",
    centerShortcut: "Ctrl+E",
    alignRight: "दाएं संरेखित करें",
    alignRightShortcut: "Ctrl+R",
    justify: "दोनों ओर संरेखित करें",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "सूची प्रारूपण",
    typeAriaLabel: "सूची का प्रकार",
    indentationAriaLabel: "सूची इंडेंटेशन",
    bulletList: "बुलेट सूची",
    numberedList: "नंबर वाली सूची",
    decreaseIndent: "इंडेंट कम करें",
    increaseIndent: "इंडेंट बढ़ाएं"
  },
  lineSpacing: {
    single: "एकल",
    double: "दुगुना",
    lineSpacingTitle: "लाइन स्पेसिंग: {label}",
    blockSpacingRules: "पैराग्राफ स्पेसिंग",
    label: "पंक्ति रिक्ति",
    addSpaceAfter: "अनुच्छेद के बाद स्थान जोड़ें",
    addSpaceBefore: "अनुच्छेद से पहले स्थान जोड़ें",
    removeSpaceAfter: "अनुच्छेद के बाद स्थान हटाएँ",
    removeSpaceBefore: "अनुच्छेद से पहले स्थान हटाएँ"
  },
  styles: {
    selectAriaLabel: "पैराग्राफ शैली चुनें",
    normalText: "सामान्य टेक्स्ट",
    title: "शीर्षक",
    subtitle: "उपशीर्षक",
    heading1: "शीर्षक 1",
    heading2: "शीर्षक 2",
    heading3: "शीर्षक 3"
  },
  font: {
    selectAriaLabel: "फ़ॉन्ट फैमिली चुनें",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "दस्तावेज़ फ़ॉन्ट"
  },
  fontSize: {
    decrease: "फ़ॉन्ट आकार घटाएं",
    increase: "फ़ॉन्ट आकार बढ़ाएं",
    label: "फ़ॉन्ट का आकार",
    listLabel: "फ़ॉन्ट आकार"
  },
  zoom: {
    ariaLabel: "ज़ूम: {label}",
    zoomIn: "ज़ूम इन",
    zoomLevel: "ज़ूम स्तर",
    zoomOut: "ज़ूम आउट",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "हाइलाइट रंग",
    customColor: "कस्टम रंग",
    noColor: "कोई रंग नहीं",
    automatic: "स्वचालित",
    themeColors: "थीम के रंग",
    standardColors: "मानक रंग",
    colors: {
      black: "काला",
      darkRed: "गहरा लाल",
      red: "लाल",
      orange: "नारंगी",
      yellow: "पीला",
      darkYellow: "गहरा पीला",
      green: "हरा",
      darkGreen: "गहरा हरा",
      blue: "नीला",
      darkBlue: "गहरा नीला",
      purple: "बैंगनी",
      white: "सफ़ेद",
      lightGreen: "हल्का हरा",
      lightBlue: "हल्का नीला",
      darkGray: "गहरा ग्रे",
      cyan: "स्यान",
      magenta: "मैजेंटा",
      brightGreen: "चमकीला हरा",
      darkCyan: "गहरा स्यान",
      darkMagenta: "गहरा मैजेंटा",
      lightGray: "हल्का ग्रे"
    },
    apply: "लागू करें",
    theme: {
      accent1: "एक्सेंट 1",
      accent2: "एक्सेंट 2",
      accent3: "एक्सेंट 3",
      accent4: "एक्सेंट 4",
      accent5: "एक्सेंट 5",
      accent6: "एक्सेंट 6",
      background1: "पृष्ठभूमि 1",
      background2: "पृष्ठभूमि 2",
      text1: "पाठ 1",
      text2: "पाठ 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "चित्र की विशेषताएँ",
      altText: "वैकल्पिक टेक्स्ट",
      altTextPlaceholder: "पहुंच-योग्यता के लिए इस चित्र का वर्णन करें...",
      textWrapping: "टेक्स्ट रैपिंग",
      dimensions: "आयाम",
      widthLabel: "चौड़ाई:",
      heightLabel: "ऊंचाई:",
      lockAspectRatio: "पहलू अनुपात लॉक करें"
    },
    imagePosition: {
      relativeOptions: {
        page: "पेज",
        column: "स्तंभ",
        margin: "हाशिया",
        character: "वर्ण",
        paragraph: "पैराग्राफ",
        line: "लाइन"
      }
    },
    pageSetup: {
      title: "पेज सेटअप",
      pageSize: "पेज का आकार",
      sizeLabel: "आकार",
      custom: "कस्टम",
      orientation: "अभिमुखता",
      portrait: "पोर्ट्रेट",
      landscape: "लैंडस्केप",
      margins: "हाशिया (मार्जिन)",
      top: "ऊपर",
      bottom: "नीचे",
      left: "बाएं",
      right: "दाएं",
      pageSizes: {
        letter: 'Letter (8.5" × 11")',
        a4: 'A4 (8.27" × 11.69")',
        legal: 'Legal (8.5" × 14")',
        a3: 'A3 (11.69" × 16.54")',
        a5: 'A5 (5.83" × 8.27")',
        b5: 'B5 (6.93" × 9.84")',
        executive: 'Executive (7.25" × 10.5")'
      },
      applyTo: "इस पर लागू करें",
      applyToDocument: "संपूर्ण दस्तावेज़",
      applyToSection: "यह अनुभाग"
    },
    footnoteProperties: {
      title: "पाद-टिप्पणी और अंत-टिप्पणी की विशेषताएँ",
      footnotes: "पाद-टिप्पणियाँ",
      endnotes: "अंत-टिप्पणियाँ",
      position: "स्थिति",
      numberFormat: "संख्या प्रारूप",
      numbering: "क्रमांकन",
      footnotePositions: {
        bottomOfPage: "पेज के नीचे",
        belowText: "टेक्स्ट के नीचे"
      },
      endnotePositions: {
        endOfDocument: "दस्तावेज़ के अंत में",
        endOfSection: "अनुभाग के अंत में"
      },
      numberingOptions: {
        continuous: "निरंतर",
        restartSection: "प्रत्येक अनुभाग को पुनरारंभ करें",
        restartPage: "प्रत्येक पृष्ठ को पुनरारंभ करें"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "अज्ञात",
    addComment: "एक टिप्पणी जोड़ें...",
    replyPlaceholder: "जवाब दें या @ के साथ दूसरों को जोड़ें"
  },
  contextMenu: {
    ariaLabel: "AI क्रियाएँ मेनू",
    cut: "काटें",
    cutShortcut: "Ctrl+X",
    copy: "कॉपी करें",
    copyShortcut: "Ctrl+C",
    paste: "पेस्ट करें",
    pasteShortcut: "Ctrl+V",
    delete: "हटाएं",
    deleteShortcut: "Del",
    selectAll: "सभी चुनें",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "{label} संपादित करें",
    removeCustomNode: "{label} निकालें"
  },
  documentOutline: {
    ariaLabel: "दस्तावेज़ की रूपरेखा",
    closeAriaLabel: "रूपरेखा बंद करें",
    closeTitle: "रूपरेखा बंद करें",
    title: "रूपरेखा",
    noHeadings: "कोई शीर्षक नहीं मिला। उन्हें यहाँ देखने के लिए अपने दस्तावेज़ में शीर्षक जोड़ें।"
  },
  viewer: {
    pageIndicator: "{total} में से {current}"
  },
  titleBar: {
    untitled: "बिना शीर्षक वाला",
    documentNameAriaLabel: "दस्तावेज़ का नाम",
    menuBarAriaLabel: "मेनू बार"
  },
  errors: {
    unableToParse: "दस्तावेज़ का विश्लेषण करने में असमर्थ",
    somethingWentWrong: "कुछ गलत हो गया",
    errorDescription: "इस घटक को प्रस्तुत करते समय एक त्रुटि हुई। कृपया पुन: प्रयास करें या समस्या बने रहने पर सहायता से संपर्क करें।",
    errorLabel: "त्रुटि:",
    componentStack: "घटक स्टैक:",
    tryAgain: "पुनः प्रयास करें",
    showDetails: "विवरण दिखाएं",
    hideDetails: "विवरण छिपाएं"
  },
  table: {
    insertRowAbove: "पंक्ति ऊपर डालें",
    insertRowBelow: "पंक्ति नीचे डालें",
    insertColumnLeft: "स्तंभ बाईं ओर डालें",
    insertColumnRight: "स्तंभ दाईं ओर डालें",
    deleteRow: "पंक्ति हटाएं",
    deleteColumn: "स्तंभ हटाएं",
    deleteTable: "तालिका हटाएं",
    mergeCells: "सेल मर्ज करें",
    splitCell: "सेल विभाजित करें",
    editingTools: "तालिका संपादन उपकरण",
    label: "तालिका:",
    cellFillColor: "सेल भरने का रंग",
    borderColor: "बॉर्डर का रंग",
    borderWidth: "बॉर्डर की चौड़ाई",
    borders: {
      all: "सभी बॉर्डर",
      outside: "बाहरी बॉर्डर",
      inside: "आंतरिक बॉर्डर",
      none: "कोई बॉर्डर नहीं",
      top: "शीर्ष बॉर्डर",
      bottom: "तल बॉर्डर",
      left: "बायां बॉर्डर",
      right: "दायां बॉर्डर",
      styleAriaLabel: "बॉर्डर शैली",
      tooltip: "बॉर्डर"
    },
    moreOptions: "अधिक तालिका विकल्प",
    selectTable: "संपूर्ण तालिका चुनें",
    borderStyles: {
      dashed: "डैश",
      dotted: "बिंदीदार",
      double: "दोहरा",
      single: "ठोस",
      thick: "मोटा",
      triple: "तिहरा"
    },
    borderWidths: {
      halfPt: "0.5 pt",
      oneHalfPt: "1.5 pt",
      onePt: "1 pt",
      threePt: "3 pt",
      twoPt: "2 pt"
    },
    clearCellFill: "कक्ष भरण साफ़ करें"
  },
  tableAdvanced: {
    verticalAlignment: "लंबवत संरेखण",
    top: "ऊपर",
    middle: "मध्य",
    bottom: "नीचे",
    toggleNoWrap: "नो-रैप टॉगल करें",
    toggleHeaderRow: "हेडर पंक्ति टॉगल करें",
    distributeColumns: "स्तंभों को समान रूप से वितरित करें",
    autoFit: "सामग्री के अनुसार स्वतः फिट करें",
    tableProperties: "तालिका की विशेषताएँ...",
    tableAlignment: "तालिका संरेखण",
    alignTableLeft: "तालिका को बाएं संरेखित करें",
    alignTableCenter: "तालिका को केंद्रित करें",
    alignTableRight: "तालिका को दाएं संरेखित करें"
  },
  imageTransform: {
    tooltip: "रूपांतरित करें",
    rotateClockwise: "दक्षिणावर्त घुमाएं",
    rotateCounterClockwise: "वामावर्त घुमाएं",
    flipHorizontal: "क्षैतिज रूप से पलटें",
    flipVertical: "लंबवत रूप से पलटें"
  },
  imageWrap: {
    inline: "टेक्स्ट के साथ इनलाइन",
    floatLeft: "स्क्वायर लेफ्ट",
    floatRight: "स्क्वायर राइट",
    topAndBottom: "ऊपर और नीचे",
    behindText: "टेक्स्ट के पीछे",
    inFrontOfText: "टेक्स्ट के सामने",
    tooltipPrefix: "रैप: {label}",
    menu: {
      inLineWithText: "टेक्स्ट के साथ इनलाइन",
      squareLeft: "स्क्वायर लेफ्ट",
      squareRight: "स्क्वायर राइट",
      ariaLabel: "चित्र लेआउट विकल्प"
    },
    square: "वर्गाकार",
    targets: {
      behind: "पाठ के पीछे",
      inFront: "पाठ के सामने",
      inline: "पाठ के साथ पंक्ति में",
      square: "वर्गाकार",
      squareLeft: "वर्गाकार बाएँ",
      squareRight: "वर्गाकार दाएँ",
      through: "आर-पार",
      tight: "सटा हुआ",
      topAndBottom: "ऊपर और नीचे"
    },
    through: "आर-पार",
    tight: "सटा हुआ"
  },
  editor: {
    showDocumentOutline: "दस्तावेज़ की रूपरेखा दिखाएं",
    linkCopied: "लिंक क्लिपबोर्ड पर कॉपी किया गया",
    fontSubstitutionNotice: "इस दस्तावेज़ के कुछ फ़ॉन्ट उपलब्ध नहीं हैं, इसलिए विकल्प दिखाए जा रहे हैं: {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "दिखाया जाने वाला टेक्स्ट",
    urlPlaceholder: "https://example.com",
    copyLink: "लिंक कॉपी करें",
    editLink: "लिंक संपादित करें",
    removeLink: "लिंक हटाएं",
    apply: "लागू करें",
    bookmarkTarget: "इस दस्तावेज़ में किसी स्थान पर ले जाता है",
    cancel: "रद्द करें",
    editTitle: "लिंक संपादित करें",
    inertTarget: "यह लिंक ऐसी जगह ले जाता है जिसे संपादक नहीं खोलेगा",
    insertTitle: "लिंक सम्मिलित करें",
    openLink: "लिंक खोलें",
    refused: "वह लिंक लागू नहीं किया जा सका. पता जाँचें और पुनः प्रयास करें.",
    urlLabel: "URL"
  },
  headerFooter: {
    header: "हेडर",
    footer: "फुटर",
    options: "विकल्प",
    insertPageNumber: "वर्तमान पेज नंबर डालें",
    insertTotalPages: "कुल पेज संख्या डालें",
    chromeAriaLabel: "हेडर और फ़ुटर संपादन",
    firstPageHeader: "पहले पृष्ठ का हेडर",
    firstPageFooter: "पहले पृष्ठ का फ़ुटर",
    evenPageHeader: "सम पृष्ठ का हेडर",
    evenPageFooter: "सम पृष्ठ का फ़ुटर",
    sameAsPrevious: "पिछले जैसा",
    sameAsPreviousHint: "संपादन पिछले अनुभाग के पृष्ठों पर भी लागू होते हैं।",
    differentFirstPage: "अलग पहला पृष्ठ",
    differentOddEven: "अलग विषम और सम पृष्ठ",
    differentOddEvenHint: "पूरे दस्तावेज़ पर लागू होता है।",
    linkToPrevious: "पिछले से लिंक करें",
    unlinkFromPrevious: "पिछले से अनलिंक करें",
    headerDistance: "हेडर की दूरी किनारे से",
    footerDistance: "फ़ुटर की दूरी किनारे से",
    removeHeader: "हेडर हटाएं",
    removeFooter: "फ़ुटर हटाएं",
    insertSectionPages: "अनुभाग पृष्ठ संख्या डालें",
    insertPageXofY: "पृष्ठ X of Y डालें"
  },
  image: {
    contentMismatch: "छवि की सामग्री उसके प्रकार से मेल नहीं खाती",
    decodeFailed: "छवि को डिकोड नहीं किया जा सका",
    externalResource: "बाहरी छवि लोड नहीं की गई",
    invalidResource: "अमान्य छवि",
    missingResource: "छवि अनुपलब्ध",
    nonPictureGraphic: "असमर्थित ग्राफ़िक ({kind})",
    pendingResource: "छवि लोड हो रही है",
    resourceLimit: "छवि आकार सीमा से अधिक है",
    unsupportedFormat: "असमर्थित छवि स्वरूप ({format})"
  },
  imageOverlay: {
    handle: {
      e: "दाएँ किनारे का आकार बदलें",
      n: "ऊपरी किनारे का आकार बदलें",
      ne: "ऊपरी-दाएँ कोने का आकार बदलें",
      nw: "ऊपरी-बाएँ कोने का आकार बदलें",
      s: "निचले किनारे का आकार बदलें",
      se: "निचले-दाएँ कोने का आकार बदलें",
      sw: "निचले-बाएँ कोने का आकार बदलें",
      w: "बाएँ किनारे का आकार बदलें"
    },
    selection: "चयनित छवि"
  },
  ruler: {
    horizontal: "क्षैतिज रूलर",
    vertical: "लंबवत रूलर",
    firstLineIndent: "पहली लाइन का इंडेंट",
    leftIndent: "बायां इंडेंट",
    rightIndent: "दायां इंडेंट",
    topMargin: "शीर्ष मार्जिन",
    bottomMargin: "तल मार्जिन",
    hangingIndent: "हैंगिंग इंडेंट"
  },
  loading: {
    label: "लोड हो रहा है"
  },
  revisions: {
    paragraphMarkInserted: "अनुच्छेद चिह्न सम्मिलित किया गया",
    runPropertiesChanged: "पाठ स्वरूपण बदला गया"
  },
  toc: {
    refresh: "पूरी तालिका अपडेट करें",
    refreshPageNumbers: "केवल पृष्ठ संख्याएँ अपडेट करें"
  },
  editingMode: {
    editing: "संपादन",
    label: "संपादन मोड",
    editingHint: "दस्तावेज़ सीधे संपादित करें",
    suggesting: "सुझाव",
    suggestingHint: "संपादन सुझाव बन जाते हैं",
    viewing: "देखना",
    viewingHint: "केवल पढ़ने के लिए, कोई संपादन नहीं"
  },
  navigation: {
    ariaLabel: "दस्तावेज़ नेविगेशन",
    closeAriaLabel: "नेविगेशन बंद करें",
    closeTitle: "नेविगेशन बंद करें",
    find: {
      clearAriaLabel: "खोज साफ़ करें",
      counter: "{total} में से परिणाम {current}",
      counterTruncated: "{total}+ में से परिणाम {current}",
      inputAriaLabel: "दस्तावेज़ में खोजें",
      matchCase: "केस का मिलान करें",
      nextAriaLabel: "अगला परिणाम",
      noResults: "कोई परिणाम नहीं",
      optionsAriaLabel: "खोज विकल्प",
      placeholder: "दस्तावेज़ में खोजें",
      previousAriaLabel: "पिछला परिणाम",
      resultsAriaLabel: "खोज परिणाम",
      searching: "खोजा जा रहा है…",
      wholeWord: "केवल पूर्ण शब्द",
      total: "{total, plural, one {# परिणाम} other {# परिणाम}}",
      totalTruncated: "{total, plural, other {#+ परिणाम}}"
    },
    headings: {
      noHeadings: "कोई शीर्षक नहीं मिला. उन्हें यहाँ देखने के लिए दस्तावेज़ में शीर्षक जोड़ें."
    },
    openAriaLabel: "नेविगेशन खोलें",
    openTitle: "नेविगेशन",
    tabs: {
      find: "ढूँढें",
      headings: "शीर्षक"
    },
    title: "नेविगेशन"
  },
  contentControl: {
    formFill: "फ़ॉर्म भरने का मोड",
    group: "सामग्री नियंत्रण",
    inspector: "सामग्री नियंत्रण की विशेषताएँ",
    inspectorPanel: {
      alias: "शीर्षक",
      bound: "डेटा बाध्य",
      boundNote: "यह नियंत्रण बाहरी डेटा से बाध्य है। संपादन अस्वीकार कर दिया गया।",
      empty: "—",
      lock: "लॉक",
      lockedNote: "इस नियंत्रण पर सामग्री संपादन लॉक है।",
      no: "नहीं",
      placeholder: "प्लेसहोल्डर",
      tag: "टैग",
      title: "सामग्री नियंत्रण",
      type: "प्रकार",
      yes: "हाँ"
    },
    lock: {
      contentLocked: "सामग्री लॉक है",
      sdtContentLocked: "सामग्री नियंत्रण और सामग्री लॉक हैं",
      sdtLocked: "सामग्री नियंत्रण लॉक है",
      unlocked: "अनलॉक"
    },
    remove: "सामग्री नियंत्रण हटाएँ",
    showAll: "सामग्री नियंत्रण की सीमाएँ दिखाएँ",
    types: {
      checkbox: "चेक बॉक्स",
      comboBox: "कॉम्बो बॉक्स",
      date: "दिनांक",
      dropdown: "ड्रॉपडाउन सूची",
      picture: "चित्र",
      plainText: "सादा पाठ",
      repeatingSection: "दोहराया जाने वाला अनुभाग",
      richText: "रिच टेक्स्ट"
    }
  },
  notes: {
    delete: "नोट हटाएं",
    convertToEndnote: "एंडनोट में बदलें",
    convertToFootnote: "फ़ुटनोट में बदलें",
    scope: "लागू करें",
    scopeDocument: "पूरा दस्तावेज़",
    scopeSection: "यह अनुभाग",
    previewFallback: "फ़ुटनोट",
    chromeAriaLabel: "नोट संपादन",
    editingRegion: "{kind} {number}",
    footnoteKind: "फ़ुटनोट",
    endnoteKind: "एंडनोट",
    convertAllFootnotes: "सभी फ़ुटनोट को एंडनोट में बदलें",
    convertAllEndnotes: "सभी एंडनोट को फ़ुटनोट में बदलें",
    inheritedValue: "(विरासत में)"
  },
  review: {
    accept: "स्वीकार करें",
    ariaLabel: "समीक्षा",
    commentRefused: "टिप्पणी नहीं जोड़ी जा सकी",
    deleted: "हटाया गया",
    empty: "कोई परिवर्तन या टिप्पणी नहीं",
    inserted: "जोड़ा गया",
    movedFrom: "यहाँ से स्थानांतरित किया गया",
    movedTo: "यहाँ स्थानांतरित किया गया",
    reject: "अस्वीकार करें",
    replaced: "प्रतिस्थापित किया गया",
    replacedWith: "इससे:",
    reply: "उत्तर दें",
    replyRefused: "उत्तर पोस्ट नहीं किया जा सका",
    showPane: "टिप्पणियाँ दिखाएँ",
    structural: "दस्तावेज़ संरचना बदली गई",
    deleteComment: "टिप्पणी हटाएँ",
    discardChange: "परिवर्तन छोड़ें"
  },
  imageAltText: {
    description: "विवरण",
    panelTitle: "वैकल्पिक पाठ",
    title: "शीर्षक"
  },
  imageInsert: {
    errors: {
      emptyFile: "चयनित फ़ाइल खाली है.",
      invalidSignature: "फ़ाइल समर्थित PNG, JPEG या GIF छवि नहीं है.",
      oversize: "छवि अधिकतम अनुमत आकार से अधिक है.",
      refused: "छवि सम्मिलित नहीं की जा सकी.",
      unsupportedFormat: "यह छवि स्वरूप सम्मिलन के लिए समर्थित नहीं है."
    }
  },
  imageProperties: {
    crop: "क्रॉप",
    cropBottom: "नीचे (%)",
    cropLeft: "बाएँ (%)",
    cropRight: "दाएँ (%)",
    cropTop: "ऊपर (%)",
    errors: {
      invalidCrop: "क्रॉप मान 0 से 100 तक के प्रतिशत होने चाहिए.",
      invalidDimensions: "धनात्मक चौड़ाई और ऊँचाई मान दर्ज करें.",
      refused: "ये गुण लागू नहीं किए जा सके.",
      invalidPosition: "मान्य क्षैतिज और लंबवत स्थिति मान दर्ज करें."
    },
    hyperlink: "हाइपरलिंक",
    nonPictureHint: "क्रॉप और मूल आकार रीसेट केवल चित्रों के लिए उपलब्ध हैं.",
    resetNaturalSize: "मूल आकार पर रीसेट करें",
    units: {
      points: "pt"
    },
    horizontalOffset: "क्षैतिज ऑफ़सेट",
    position: "स्थिति",
    positionLocked: "यह आरेखण स्थानांतरित नहीं किया जा सकता.",
    positionUnavailable: "स्थिति केवल फ़्लोटिंग छवियों के लिए उपलब्ध है.",
    relativeToHorizontal: "सापेक्ष (क्षैतिज)",
    relativeToVertical: "सापेक्ष (लंबवत)",
    verticalOffset: "लंबवत ऑफ़सेट"
  }
};

// id.json
var id_default = {
  _lang: "id",
  common: {
    cancel: "Batal",
    apply: "Terapkan",
    close: "Tutup",
    comment: "Komentar",
    dismiss: "Abaikan"
  },
  toolbar: {
    ariaLabel: "Bilah alat pemformatan",
    file: "File",
    format: "Format",
    insert: "Sisipkan",
    open: "Buka",
    openShortcut: "Ctrl+O",
    save: "Simpan",
    saveShortcut: "Ctrl+S",
    print: "Cetak",
    printShortcut: "Ctrl+P",
    pageSetup: "Pengaturan Halaman",
    leftToRight: "Kiri ke Kanan",
    rightToLeft: "Kanan ke Kiri",
    image: "Gambar",
    table: "Tabel",
    break: "Batas",
    pageBreak: "Batas Halaman",
    sectionBreakNextPage: "Batas Section Halaman Baru",
    sectionBreakContinuous: "Batas Section Berlanjut",
    tableOfContents: "Daftar Isi",
    watermark: "Tanda Air",
    help: "Bantuan",
    reportIssue: "Laporkan Masalah",
    insertFootnote: "Sisipkan catatan kaki",
    insertEndnote: "Sisipkan catatan akhir"
  },
  formattingBar: {
    groups: {
      history: "Riwayat",
      zoom: "Zoom",
      styles: "Gaya",
      font: "Font",
      textFormatting: "Pemformatan Teks",
      script: "Skrip",
      alignment: "Perataan",
      listFormatting: "Pemformatan Daftar",
      image: "Gambar",
      table: "Tabel"
    },
    undo: "Urungkan",
    undoShortcut: "Urungkan (Ctrl+Z)",
    redo: "Ulangi",
    redoShortcut: "Ulangi (Ctrl+Y)",
    bold: "Tebal",
    boldShortcut: "Tebalkan (Ctrl+B)",
    italic: "Miring",
    italicShortcut: "Miringkan (Ctrl+I)",
    underline: "Garis Bawah",
    underlineShortcut: "Garis bawah (Ctrl+U)",
    strikethrough: "Coret",
    fontColor: "Warna Font",
    highlightColor: "Warna Sorotan",
    insertLink: "Sisipkan Tautan",
    insertLinkShortcut: "Sisipkan tautan (Ctrl+K)",
    superscript: "Superskrip",
    superscriptShortcut: "Superskrip (Ctrl+Shift+=)",
    subscript: "Subskrip",
    subscriptShortcut: "Subskrip (Ctrl+=)",
    imageProperties: "Properti Gambar",
    imagePropertiesShortcut: "Properti gambar (alt text, border)...",
    clearFormatting: "Hapus Pemformatan",
    commentsAndChanges: "Komentar & Perubahan",
    unavailableInPreview: "Tidak tersedia dalam versi pratinjau ini",
    more: "Lainnya",
    altText: "Teks alternatif",
    imageWrap: "Bungkus teks"
  },
  alignment: {
    alignLeft: "Rata Kiri",
    alignLeftShortcut: "Ctrl+L",
    center: "Tengah",
    centerShortcut: "Ctrl+E",
    alignRight: "Rata Kanan",
    alignRightShortcut: "Ctrl+R",
    justify: "Rata Kiri-Kanan",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "Pemformatan daftar",
    typeAriaLabel: "Pilih gaya daftar",
    indentationAriaLabel: "Tingkat lekukan",
    bulletList: "Daftar poin",
    numberedList: "Daftar bernomor",
    decreaseIndent: "Kurangi indentasi",
    increaseIndent: "Tambahkan indentasi"
  },
  lineSpacing: {
    label: "Jarak antar baris",
    single: "1.0",
    double: "2.0",
    lineSpacingTitle: "Jarak antar baris: {label}",
    blockSpacingRules: "Jarak antar paragraf",
    addSpaceAfter: "Tambahkan spasi setelah paragraf",
    addSpaceBefore: "Tambahkan spasi sebelum paragraf",
    removeSpaceAfter: "Hapus spasi setelah paragraf",
    removeSpaceBefore: "Hapus spasi sebelum paragraf"
  },
  styles: {
    selectAriaLabel: "Pilih gaya paragraf",
    normalText: "Teks normal",
    title: "Judul",
    subtitle: "Subjudul",
    heading1: "Judul 1",
    heading2: "Judul 2",
    heading3: "Judul 3"
  },
  font: {
    selectAriaLabel: "Pilih font",
    sansSerif: "Sans serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "Font dokumen"
  },
  fontSize: {
    decrease: "Perkecil ukuran font",
    increase: "Perbesar ukuran font",
    label: "Ukuran font",
    listLabel: "Ukuran font"
  },
  zoom: {
    ariaLabel: "Zoom: {label}",
    zoomOut: "Perkecil",
    zoomIn: "Perbesar",
    zoomLevel: "Tingkat zoom",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "Warna Sorotan",
    customColor: "Warna Kustom",
    noColor: "Tidak ada warna",
    automatic: "Otomatis",
    themeColors: "Warna Tema",
    standardColors: "Warna Standar",
    colors: {
      black: "Hitam",
      darkRed: "Merah Gelap",
      red: "Merah",
      orange: "Jingga",
      yellow: "Kuning",
      darkYellow: "Kuning Gelap",
      green: "Hijau",
      darkGreen: "Hijau Gelap",
      blue: "Biru",
      darkBlue: "Biru Tua",
      purple: "Ungu",
      white: "Putih",
      lightGreen: "Hijau Muda",
      lightBlue: "Biru Muda",
      darkGray: "Abu-abu Tua",
      cyan: "Sian",
      magenta: "Magenta",
      brightGreen: "Hijau Cerah",
      darkCyan: "Sian Tua",
      darkMagenta: "Magenta Tua",
      lightGray: "Abu-abu Muda"
    },
    apply: "Terapkan",
    theme: {
      accent1: "Aksen 1",
      accent2: "Aksen 2",
      accent3: "Aksen 3",
      accent4: "Aksen 4",
      accent5: "Aksen 5",
      accent6: "Aksen 6",
      background1: "Latar Belakang 1",
      background2: "Latar Belakang 2",
      text1: "Teks 1",
      text2: "Teks 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "Properti gambar",
      altText: "Teks alternatif",
      altTextPlaceholder: "Teks deskriptif untuk pembaca layar",
      textWrapping: "Pembungkus teks",
      dimensions: "Dimensi",
      widthLabel: "Lebar:",
      heightLabel: "Tinggi:",
      lockAspectRatio: "Kunci rasio aspek"
    },
    imagePosition: {
      relativeOptions: {
        page: "Halaman",
        column: "Kolom",
        margin: "Margin",
        character: "Karakter",
        paragraph: "Paragraf",
        line: "Baris"
      }
    },
    pageSetup: {
      title: "Pengaturan Halaman",
      pageSize: "Ukuran Halaman",
      sizeLabel: "Ukuran:",
      custom: "Kustom",
      orientation: "Orientasi",
      portrait: "Portrait",
      landscape: "Landscape",
      margins: "Margin",
      top: "Atas",
      bottom: "Bawah",
      left: "Kiri",
      right: "Kanan",
      pageSizes: {
        letter: "Letter (21,59 × 27,94 cm)",
        a4: "A4 (21 × 29,7 cm)",
        legal: "Legal (21,59 × 35,56 cm)",
        a3: "A3 (29,7 × 42 cm)",
        a5: "A5 (14,8 × 21 cm)",
        b5: "B5 (17,6 × 25 cm)",
        executive: "Executive (18,42 × 26,67 cm)"
      },
      applyTo: "Terapkan ke",
      applyToDocument: "Seluruh dokumen",
      applyToSection: "Bagian ini"
    },
    footnoteProperties: {
      title: "Catatan Kaki dan Catatan Akhir",
      footnotes: "Catatan Kaki",
      endnotes: "Catatan Akhir",
      position: "Posisi",
      numberFormat: "Format Angka",
      numbering: "Penomoran",
      footnotePositions: {
        bottomOfPage: "Bawah Halaman",
        belowText: "Di Bawah Teks"
      },
      endnotePositions: {
        endOfDocument: "Akhir Dokumen",
        endOfSection: "Akhir Bagian"
      },
      numberingOptions: {
        continuous: "Berkelanjutan",
        restartSection: "Mulai Ulang Setiap Bagian",
        restartPage: "Mulai Ulang Setiap Halaman"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "Tidak Diketahui",
    addComment: "Tambahkan komentar...",
    replyPlaceholder: "Balas atau tambahkan orang lain dengan @"
  },
  revisions: {
    paragraphMarkInserted: "Menyisipkan tanda paragraf",
    runPropertiesChanged: "Format teks diubah"
  },
  contextMenu: {
    ariaLabel: "Menu tindakan AI",
    cut: "Potong",
    cutShortcut: "Ctrl+X",
    copy: "Salin",
    copyShortcut: "Ctrl+C",
    paste: "Tempel",
    pasteShortcut: "Ctrl+V",
    delete: "Hapus",
    deleteShortcut: "Del",
    selectAll: "Pilih Semua",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "Edit {label}",
    removeCustomNode: "Hapus {label}"
  },
  documentOutline: {
    ariaLabel: "Struktur dokumen",
    closeAriaLabel: "Tutup struktur dokumen",
    closeTitle: "Tutup struktur dokumen",
    title: "Struktur Dokumen",
    noHeadings: "Tidak ditemukan judul. Tambahkan judul ke dokumen Anda untuk melihatnya di sini."
  },
  viewer: {
    pageIndicator: "{current} dari {total}"
  },
  titleBar: {
    untitled: "Tanpa Judul",
    documentNameAriaLabel: "Nama dokumen",
    menuBarAriaLabel: "Bilah menu"
  },
  errors: {
    unableToParse: "Tidak Dapat Membaca Dokumen",
    somethingWentWrong: "Terjadi kesalahan",
    errorDescription: "Terjadi kesalahan saat merender komponen ini. Silakan coba lagi atau hubungi dukungan jika masalah berlanjut.",
    errorLabel: "Kesalahan:",
    componentStack: "Tumpukan Komponen:",
    tryAgain: "Coba Lagi",
    showDetails: "Tampilkan detail",
    hideDetails: "Sembunyikan detail"
  },
  table: {
    insertRowAbove: "Sisipkan Baris di Atas",
    insertRowBelow: "Sisipkan Baris di Bawah",
    insertColumnLeft: "Sisipkan Kolom di Kiri",
    insertColumnRight: "Sisipkan Kolom di Kanan",
    deleteRow: "Hapus Baris",
    deleteColumn: "Hapus Kolom",
    deleteTable: "Hapus Tabel",
    mergeCells: "Gabungkan Sel",
    splitCell: "Pisahkan Sel",
    editingTools: "Alat Pengeditan Tabel",
    label: "Tabel:",
    cellFillColor: "Warna Isian Sel",
    borderColor: "Warna Batas",
    borderWidth: "Lebar Batas",
    borders: {
      all: "Semua Batas",
      outside: "Batas Luar",
      inside: "Batas Dalam",
      none: "Tanpa Batas",
      top: "Batas Atas",
      bottom: "Batas Bawah",
      left: "Batas Kiri",
      right: "Batas Kanan",
      styleAriaLabel: "Gaya Batas",
      tooltip: "Batas"
    },
    moreOptions: "Opsi Tabel Lainnya",
    selectTable: "Pilih seluruh tabel",
    borderStyles: {
      dashed: "Putus-putus",
      dotted: "Bertitik",
      double: "Ganda",
      single: "Solid",
      thick: "Tebal",
      triple: "Rangkap tiga"
    },
    borderWidths: {
      halfPt: "0,5 pt",
      oneHalfPt: "1,5 pt",
      onePt: "1 pt",
      threePt: "3 pt",
      twoPt: "2 pt"
    },
    clearCellFill: "Hapus isian sel"
  },
  tableAdvanced: {
    verticalAlignment: "Perataan Vertikal",
    top: "Atas",
    middle: "Tengah",
    bottom: "Bawah",
    toggleNoWrap: "Aktifkan/Nonaktifkan Bungkus Teks",
    toggleHeaderRow: "Aktifkan/Nonaktifkan Baris Header",
    distributeColumns: "Sebarkan Kolom Secara Merata",
    autoFit: "Sesuaikan Otomatis dengan Isi",
    tableProperties: "Properti Tabel...",
    tableAlignment: "Perataan Tabel",
    alignTableLeft: "Ratakan Tabel ke Kiri",
    alignTableCenter: "Ratakan Tabel ke Tengah",
    alignTableRight: "Ratakan Tabel ke Kanan"
  },
  imageTransform: {
    tooltip: "Putar Gambar",
    rotateClockwise: "Putar Searah Jarum Jam",
    rotateCounterClockwise: "Putar Berlawanan Arah Jarum Jam",
    flipHorizontal: "Balik Horizontal",
    flipVertical: "Balik Vertikal"
  },
  imageWrap: {
    inline: "Sebaris dengan Teks",
    floatLeft: "Teks Mengelilingi (Kiri)",
    floatRight: "Teks Mengelilingi (Kanan)",
    topAndBottom: "Atas dan Bawah",
    behindText: "Di Belakang Teks",
    inFrontOfText: "Di Depan Teks",
    tooltipPrefix: "Tata Letak: {label}",
    menu: {
      inLineWithText: "Sebaris dengan Teks",
      squareLeft: "Teks Mengelilingi (Kiri)",
      squareRight: "Teks Mengelilingi (Kanan)",
      ariaLabel: "Opsi tata letak gambar"
    },
    square: "Persegi",
    targets: {
      behind: "Di belakang teks",
      inFront: "Di depan teks",
      inline: "Sejajar dengan teks",
      square: "Persegi",
      squareLeft: "Persegi kiri",
      squareRight: "Persegi kanan",
      through: "Menembus",
      tight: "Rapat",
      topAndBottom: "Atas dan bawah"
    },
    through: "Menembus",
    tight: "Rapat"
  },
  editor: {
    showDocumentOutline: "Tampilkan Kerangka Dokumen",
    linkCopied: "Tautan disalin ke papan klip",
    fontSubstitutionNotice: "Beberapa font dalam dokumen ini tidak tersedia, jadi font pengganti ditampilkan: {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "Teks yang ditampilkan",
    urlPlaceholder: "https://example.com",
    copyLink: "Salin Tautan",
    editLink: "Edit Tautan",
    removeLink: "Hapus Tautan",
    apply: "Terapkan",
    bookmarkTarget: "Menuju ke suatu tempat dalam dokumen ini",
    cancel: "Batal",
    editTitle: "Edit tautan",
    inertTarget: "Tautan ini menunjuk ke tempat yang tidak akan dibuka oleh editor",
    insertTitle: "Sisipkan tautan",
    openLink: "Buka tautan",
    refused: "Tautan tersebut tidak dapat diterapkan. Periksa alamatnya dan coba lagi.",
    urlLabel: "URL"
  },
  headerFooter: {
    header: "Header",
    footer: "Footer",
    options: "Opsi",
    insertPageNumber: "Sisipkan nomor halaman saat ini",
    insertTotalPages: "Sisipkan jumlah total halaman",
    chromeAriaLabel: "Pengeditan header dan footer",
    firstPageHeader: "Header halaman pertama",
    firstPageFooter: "Footer halaman pertama",
    evenPageHeader: "Header halaman genap",
    evenPageFooter: "Footer halaman genap",
    sameAsPrevious: "Sama dengan sebelumnya",
    sameAsPreviousHint: "Edit juga berlaku untuk halaman bagian sebelumnya.",
    differentFirstPage: "Halaman pertama berbeda",
    differentOddEven: "Halaman ganjil dan genap berbeda",
    differentOddEvenHint: "Berlaku untuk seluruh dokumen.",
    linkToPrevious: "Tautkan ke sebelumnya",
    unlinkFromPrevious: "Putus tautan dari sebelumnya",
    headerDistance: "Jarak header dari tepi",
    footerDistance: "Jarak footer dari tepi",
    removeHeader: "Hapus header",
    removeFooter: "Hapus footer",
    insertSectionPages: "Sisipkan jumlah halaman bagian",
    insertPageXofY: "Sisipkan halaman X dari Y"
  },
  image: {
    contentMismatch: "Konten gambar tidak cocok dengan tipenya",
    decodeFailed: "Gambar tidak dapat didekodekan",
    externalResource: "Gambar eksternal tidak dimuat",
    invalidResource: "Gambar tidak valid",
    missingResource: "Gambar hilang",
    nonPictureGraphic: "Grafik tidak didukung ({kind})",
    pendingResource: "Memuat gambar",
    resourceLimit: "Gambar melebihi batas ukuran",
    unsupportedFormat: "Format gambar tidak didukung ({format})"
  },
  imageOverlay: {
    handle: {
      e: "Ubah ukuran tepi kanan",
      n: "Ubah ukuran tepi atas",
      ne: "Ubah ukuran sudut kanan atas",
      nw: "Ubah ukuran sudut kiri atas",
      s: "Ubah ukuran tepi bawah",
      se: "Ubah ukuran sudut kanan bawah",
      sw: "Ubah ukuran sudut kiri bawah",
      w: "Ubah ukuran tepi kiri"
    },
    selection: "Gambar yang dipilih"
  },
  ruler: {
    horizontal: "Penggaris Horizontal",
    vertical: "Penggaris Vertikal",
    firstLineIndent: "Inden Baris Pertama",
    leftIndent: "Inden Kiri",
    rightIndent: "Inden Kanan",
    topMargin: "Margin Atas",
    bottomMargin: "Margin Bawah",
    hangingIndent: "Indentasi gantung"
  },
  loading: {
    label: "Memuat"
  },
  toc: {
    refresh: "Perbarui seluruh tabel",
    refreshPageNumbers: "Perbarui nomor halaman saja"
  },
  editingMode: {
    editing: "Pengeditan",
    label: "Mode pengeditan",
    editingHint: "Edit dokumen secara langsung",
    suggesting: "Saran",
    suggestingHint: "Pengeditan menjadi saran",
    viewing: "Tampilan",
    viewingHint: "Hanya baca, tanpa pengeditan"
  },
  navigation: {
    ariaLabel: "Navigasi dokumen",
    closeAriaLabel: "Tutup navigasi",
    closeTitle: "Tutup navigasi",
    find: {
      clearAriaLabel: "Hapus pencarian",
      counter: "Hasil {current} dari {total}",
      counterTruncated: "Hasil {current} dari {total}+",
      inputAriaLabel: "Cari di dokumen",
      matchCase: "Cocokkan huruf besar/kecil",
      nextAriaLabel: "Hasil berikutnya",
      noResults: "Tidak ada hasil",
      optionsAriaLabel: "Opsi pencarian",
      placeholder: "Cari di dokumen",
      previousAriaLabel: "Hasil sebelumnya",
      resultsAriaLabel: "Hasil pencarian",
      searching: "Mencari…",
      wholeWord: "Hanya kata utuh",
      total: "{total, plural, other {# hasil}}",
      totalTruncated: "{total, plural, other {#+ hasil}}"
    },
    headings: {
      noHeadings: "Tidak ada judul yang ditemukan. Tambahkan judul ke dokumen untuk melihatnya di sini."
    },
    openAriaLabel: "Buka navigasi",
    openTitle: "Navigasi",
    tabs: {
      find: "Temukan",
      headings: "Judul"
    },
    title: "Navigasi"
  },
  contentControl: {
    formFill: "Mode isi formulir",
    group: "Kontrol konten",
    inspector: "Properti kontrol konten",
    inspectorPanel: {
      alias: "Judul",
      bound: "Terikat data",
      boundNote: "Kontrol ini terikat ke data eksternal. Pengeditan ditolak.",
      empty: "—",
      lock: "Kunci",
      lockedNote: "Pengeditan konten dikunci pada kontrol ini.",
      no: "Tidak",
      placeholder: "Placeholder",
      tag: "Tag",
      title: "Kontrol konten",
      type: "Jenis",
      yes: "Ya"
    },
    lock: {
      contentLocked: "Konten terkunci",
      sdtContentLocked: "Kontrol konten dan konten terkunci",
      sdtLocked: "Kontrol konten terkunci",
      unlocked: "Tidak terkunci"
    },
    remove: "Hapus kontrol konten",
    showAll: "Tampilkan batas kontrol konten",
    types: {
      checkbox: "Kotak centang",
      comboBox: "Kotak kombo",
      date: "Tanggal",
      dropdown: "Daftar drop-down",
      picture: "Gambar",
      plainText: "Teks biasa",
      repeatingSection: "Bagian berulang",
      richText: "Teks kaya"
    }
  },
  notes: {
    delete: "Hapus catatan",
    convertToEndnote: "Konversi ke catatan akhir",
    convertToFootnote: "Konversi ke catatan kaki",
    scope: "Terapkan ke",
    scopeDocument: "Seluruh dokumen",
    scopeSection: "Bagian ini",
    previewFallback: "Catatan kaki",
    chromeAriaLabel: "Pengeditan catatan",
    editingRegion: "{kind} {number}",
    footnoteKind: "Catatan kaki",
    endnoteKind: "Catatan akhir",
    convertAllFootnotes: "Konversi semua catatan kaki ke catatan akhir",
    convertAllEndnotes: "Konversi semua catatan akhir ke catatan kaki",
    inheritedValue: "(diwarisi)"
  },
  review: {
    accept: "Terima",
    ariaLabel: "Tinjau",
    commentRefused: "Tidak dapat menambahkan komentar",
    deleted: "Dihapus",
    empty: "Tidak ada perubahan atau komentar",
    inserted: "Ditambahkan",
    movedFrom: "Dipindahkan dari sini",
    movedTo: "Dipindahkan ke sini",
    reject: "Tolak",
    replaced: "Diganti",
    replacedWith: "dengan",
    reply: "Balas",
    replyRefused: "Tidak dapat mengirim balasan",
    showPane: "Tampilkan komentar",
    structural: "Struktur dokumen diubah",
    deleteComment: "Hapus komentar",
    discardChange: "Buang perubahan"
  },
  imageAltText: {
    description: "Deskripsi",
    panelTitle: "Teks alternatif",
    title: "Judul"
  },
  imageInsert: {
    errors: {
      emptyFile: "File yang dipilih kosong.",
      invalidSignature: "File tersebut bukan gambar PNG, JPEG, atau GIF yang didukung.",
      oversize: "Gambar melebihi ukuran maksimum yang diizinkan.",
      refused: "Gambar tidak dapat disisipkan.",
      unsupportedFormat: "Format gambar ini tidak didukung untuk penyisipan."
    }
  },
  imageProperties: {
    crop: "Pangkas",
    cropBottom: "Bawah (%)",
    cropLeft: "Kiri (%)",
    cropRight: "Kanan (%)",
    cropTop: "Atas (%)",
    errors: {
      invalidCrop: "Nilai pangkas harus berupa persentase dari 0 hingga 100.",
      invalidDimensions: "Masukkan nilai lebar dan tinggi yang positif.",
      refused: "Properti ini tidak dapat diterapkan.",
      invalidPosition: "Masukkan nilai posisi horizontal dan vertikal yang valid."
    },
    hyperlink: "Hyperlink",
    nonPictureHint: "Pangkas dan reset ukuran asli hanya tersedia untuk gambar.",
    resetNaturalSize: "Reset ke ukuran asli",
    units: {
      points: "pt"
    },
    horizontalOffset: "Offset horizontal",
    position: "Posisi",
    positionLocked: "Gambar ini tidak dapat dipindahkan.",
    positionUnavailable: "Posisi hanya tersedia untuk gambar mengambang.",
    relativeToHorizontal: "Relatif terhadap (horizontal)",
    relativeToVertical: "Relatif terhadap (vertikal)",
    verticalOffset: "Offset vertikal"
  }
};

// pl.json
var pl_default = {
  _lang: "pl",
  common: {
    cancel: "Anuluj",
    apply: "Zastosuj",
    close: "Zamknij",
    comment: "Komentarz",
    dismiss: "Odrzuć"
  },
  toolbar: {
    ariaLabel: "Pasek narzędzi formatowania",
    file: "Plik",
    format: "Formatowanie",
    insert: "Wstawianie",
    print: "Drukuj",
    printShortcut: "Ctrl+P",
    pageSetup: "Ustawienia strony",
    leftToRight: "Tekst od lewej do prawej",
    rightToLeft: "Tekst od prawej do lewej",
    image: "Obraz",
    table: "Tabela",
    pageBreak: "Podział strony",
    tableOfContents: "Spis treści",
    help: "Pomoc",
    reportIssue: "Zgłoś problem",
    open: "Otwórz",
    openShortcut: "Ctrl+O",
    save: "Zapisz",
    saveShortcut: "Ctrl+S",
    watermark: "Znak wodny",
    break: "Podział",
    sectionBreakContinuous: "Podział sekcji (ciągły)",
    sectionBreakNextPage: "Podział sekcji (następna strona)",
    insertFootnote: "Wstaw przypis dolny",
    insertEndnote: "Wstaw przypis końcowy"
  },
  formattingBar: {
    groups: {
      history: "Historia",
      zoom: "Powiększenie",
      styles: "Style",
      font: "Czcionka",
      textFormatting: "Formatowanie tekstu",
      script: "Indeks",
      alignment: "Wyrównanie",
      listFormatting: "Formatowanie listy",
      image: "Obraz",
      table: "Tabela"
    },
    undo: "Cofnij",
    undoShortcut: "Cofnij (Ctrl+Z)",
    redo: "Ponów",
    redoShortcut: "Ponów (Ctrl+Y)",
    bold: "Pogrubienie",
    boldShortcut: "Pogrubienie (Ctrl+B)",
    italic: "Kursywa",
    italicShortcut: "Kursywa (Ctrl+I)",
    underline: "Podkreślenie",
    underlineShortcut: "Podkreślenie (Ctrl+U)",
    strikethrough: "Przekreślenie",
    fontColor: "Kolor czcionki",
    highlightColor: "Kolor wyróżnienia tekstu",
    insertLink: "Wstaw link",
    insertLinkShortcut: "Wstaw link (Ctrl+K)",
    superscript: "Indeks górny",
    superscriptShortcut: "Indeks górny (Ctrl+Shift+=)",
    subscript: "Indeks dolny",
    subscriptShortcut: "Indeks dolny (Ctrl+=)",
    imageProperties: "Właściwości obrazu",
    imagePropertiesShortcut: "Właściwości obrazu (tekst alternatywny, obramowanie)...",
    clearFormatting: "Wyczyść formatowanie",
    commentsAndChanges: "Komentarze i zmiany",
    unavailableInPreview: "Niedostępne w tej wersji zapoznawczej",
    more: "Więcej",
    altText: "Tekst alternatywny",
    imageWrap: "Zawijaj tekst"
  },
  alignment: {
    alignLeft: "Wyrównaj do lewej",
    alignLeftShortcut: "Ctrl+L",
    center: "Wyśrodkuj",
    centerShortcut: "Ctrl+E",
    alignRight: "Wyrównaj do prawej",
    alignRightShortcut: "Ctrl+R",
    justify: "Wyjustuj",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "Formatowanie listy",
    typeAriaLabel: "Typ listy",
    indentationAriaLabel: "Wcięcie listy",
    bulletList: "Lista punktowana",
    numberedList: "Lista numerowana",
    decreaseIndent: "Zmniejsz wcięcie",
    increaseIndent: "Zwiększ wcięcie"
  },
  lineSpacing: {
    single: "Pojedyncza",
    double: "Podwójna",
    lineSpacingTitle: "Interlinia: {label}",
    blockSpacingRules: "Odstępy między akapitami",
    label: "Interlinia",
    addSpaceAfter: "Dodaj odstęp po akapicie",
    addSpaceBefore: "Dodaj odstęp przed akapitem",
    removeSpaceAfter: "Usuń odstęp po akapicie",
    removeSpaceBefore: "Usuń odstęp przed akapitem"
  },
  styles: {
    selectAriaLabel: "Wybierz styl akapitu",
    normalText: "Normalny",
    title: "Tytuł",
    subtitle: "Podtytuł",
    heading1: "Nagłówek 1",
    heading2: "Nagłówek 2",
    heading3: "Nagłówek 3"
  },
  font: {
    selectAriaLabel: "Wybierz rodzinę czcionek",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "Czcionki dokumentu"
  },
  fontSize: {
    decrease: "Zmniejsz rozmiar czcionki",
    increase: "Zwiększ rozmiar czcionki",
    label: "Rozmiar czcionki",
    listLabel: "Rozmiary czcionek"
  },
  zoom: {
    ariaLabel: "Powiększenie: {label}",
    zoomIn: "Powiększ",
    zoomLevel: "Poziom powiększenia",
    zoomOut: "Pomniejsz",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "Kolory wyróżnienia",
    customColor: "Kolor niestandardowy",
    noColor: "Brak koloru",
    automatic: "Automatyczny",
    themeColors: "Kolory motywu",
    standardColors: "Kolory standardowe",
    colors: {
      black: "Czarny",
      darkRed: "Ciemnoczerwony",
      red: "Czerwony",
      orange: "Pomarańczowy",
      yellow: "Żółty",
      darkYellow: "Ciemnożółty",
      green: "Zielony",
      darkGreen: "Ciemnozielony",
      blue: "Niebieski",
      darkBlue: "Ciemnoniebieski",
      purple: "Purpurowy",
      white: "Biały",
      lightGreen: "Jasnozielony",
      lightBlue: "Jasnoniebieski",
      darkGray: "Ciemnoszary",
      cyan: "Cyjan",
      magenta: "Magenta",
      brightGreen: "Jasnozielony",
      darkCyan: "Ciemny cyjan",
      darkMagenta: "Ciemna magenta",
      lightGray: "Jasnoszary"
    },
    apply: "Zastosuj",
    theme: {
      accent1: "Akcent 1",
      accent2: "Akcent 2",
      accent3: "Akcent 3",
      accent4: "Akcent 4",
      accent5: "Akcent 5",
      accent6: "Akcent 6",
      background1: "Tło 1",
      background2: "Tło 2",
      text1: "Tekst 1",
      text2: "Tekst 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "Właściwości obrazu",
      altText: "Tekst alternatywny",
      altTextPlaceholder: "Opisz ten obraz na potrzeby dostępności...",
      dimensions: "Wymiary",
      heightLabel: "Wysokość:",
      lockAspectRatio: "Zablokuj proporcje",
      textWrapping: "Zawijanie tekstu",
      widthLabel: "Szerokość:"
    },
    imagePosition: {
      relativeOptions: {
        page: "Strona",
        column: "Kolumna",
        margin: "Margines",
        character: "Znak",
        paragraph: "Akapit",
        line: "Wiersz"
      }
    },
    pageSetup: {
      title: "Ustawienia strony",
      pageSize: "ROZMIAR STRONY",
      sizeLabel: "Rozmiar",
      custom: "Niestandardowy",
      orientation: "Orientacja",
      portrait: "Pionowa",
      landscape: "Pozioma",
      margins: "MARGINESY",
      top: "Górny",
      bottom: "Dolny",
      left: "Lewy",
      right: "Prawy",
      pageSizes: {
        letter: 'Letter (8,5" × 11")',
        a4: 'A4 (8,27" × 11,69")',
        legal: 'Legal (8,5" × 14")',
        a3: 'A3 (11,69" × 16,54")',
        a5: 'A5 (5,83" × 8,27")',
        b5: 'B5 (6,93" × 9,84")',
        executive: 'Executive (7,25" × 10,5")'
      },
      applyTo: "Zastosuj do",
      applyToDocument: "Cały dokument",
      applyToSection: "Ta sekcja"
    },
    footnoteProperties: {
      title: "Właściwości przypisów dolnych i końcowych",
      footnotes: "Przypisy dolne",
      endnotes: "Przypisy końcowe",
      position: "Położenie",
      numberFormat: "Format numeracji",
      numbering: "Numeracja",
      footnotePositions: {
        bottomOfPage: "Dół strony",
        belowText: "Pod tekstem"
      },
      endnotePositions: {
        endOfDocument: "Koniec dokumentu",
        endOfSection: "Koniec sekcji"
      },
      numberingOptions: {
        continuous: "Ciągła",
        restartSection: "W każdej sekcji od nowa",
        restartPage: "Na każdej stronie od nowa"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "Nieznany",
    addComment: "Dodaj komentarz...",
    replyPlaceholder: "Odpowiedz lub dodaj innych za pomocą @"
  },
  contextMenu: {
    ariaLabel: "Menu akcji AI",
    cut: "Wytnij",
    cutShortcut: "Ctrl+X",
    copy: "Kopiuj",
    copyShortcut: "Ctrl+C",
    paste: "Wklej",
    pasteShortcut: "Ctrl+V",
    delete: "Usuń",
    deleteShortcut: "Del",
    selectAll: "Zaznacz wszystko",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "Edytuj {label}",
    removeCustomNode: "Usuń {label}"
  },
  documentOutline: {
    ariaLabel: "Konspekt dokumentu",
    closeAriaLabel: "Zamknij konspekt",
    closeTitle: "Zamknij konspekt",
    title: "Konspekt",
    noHeadings: "Nie znaleziono nagłówków. Dodaj nagłówki do dokumentu, aby wyświetlić je tutaj."
  },
  titleBar: {
    untitled: "Bez tytułu",
    documentNameAriaLabel: "Nazwa dokumentu",
    menuBarAriaLabel: "Pasek menu"
  },
  errors: {
    unableToParse: "Nie można przetworzyć dokumentu",
    somethingWentWrong: "Coś poszło nie tak",
    errorDescription: "Podczas renderowania tego składnika wystąpił błąd. Spróbuj ponownie lub skontaktuj się z pomocą techniczną, jeśli problem się powtarza.",
    errorLabel: "Błąd:",
    componentStack: "Stos składników:",
    tryAgain: "Spróbuj ponownie",
    showDetails: "Pokaż szczegóły",
    hideDetails: "Ukryj szczegóły"
  },
  table: {
    insertRowAbove: "Wstaw wiersz powyżej",
    insertRowBelow: "Wstaw wiersz poniżej",
    insertColumnLeft: "Wstaw kolumnę z lewej",
    insertColumnRight: "Wstaw kolumnę z prawej",
    deleteRow: "Usuń wiersz",
    deleteColumn: "Usuń kolumnę",
    deleteTable: "Usuń tabelę",
    mergeCells: "Scal komórki",
    splitCell: "Podziel komórkę",
    editingTools: "Narzędzia edycji tabeli",
    label: "Tabela:",
    cellFillColor: "Kolor wypełnienia komórki",
    borderColor: "Kolor obramowania",
    borderWidth: "Szerokość obramowania",
    borders: {
      all: "Wszystkie obramowania",
      outside: "Obramowanie zewnętrzne",
      inside: "Obramowanie wewnętrzne",
      none: "Brak obramowania",
      top: "Obramowanie górne",
      bottom: "Obramowanie dolne",
      left: "Obramowanie lewe",
      right: "Obramowanie prawe",
      styleAriaLabel: "Styl obramowania",
      tooltip: "Obramowania"
    },
    moreOptions: "Więcej opcji tabeli",
    selectTable: "Zaznacz całą tabelę",
    borderStyles: {
      dashed: "Kreskowana",
      dotted: "Kropkowana",
      double: "Podwójna",
      single: "Ciągła",
      thick: "Gruba",
      triple: "Potrójna"
    },
    borderWidths: {
      halfPt: "0,5 pkt",
      oneHalfPt: "1,5 pkt",
      onePt: "1 pkt",
      threePt: "3 pkt",
      twoPt: "2 pkt"
    },
    clearCellFill: "Wyczyść wypełnienie komórki"
  },
  tableAdvanced: {
    verticalAlignment: "Wyrównanie pionowe",
    top: "Do góry",
    middle: "Do środka",
    bottom: "Do dołu",
    toggleNoWrap: "Przełącz zawijanie tekstu",
    toggleHeaderRow: "Przełącz wiersz nagłówka",
    distributeColumns: "Rozłóż kolumny równomiernie",
    autoFit: "Autodopasowanie do zawartości",
    tableProperties: "Właściwości tabeli...",
    tableAlignment: "Wyrównanie tabeli",
    alignTableLeft: "Wyrównaj tabelę do lewej",
    alignTableCenter: "Wyśrodkuj tabelę",
    alignTableRight: "Wyrównaj tabelę do prawej"
  },
  imageTransform: {
    tooltip: "Przekształcanie",
    rotateClockwise: "Obróć w prawo",
    rotateCounterClockwise: "Obróć w lewo",
    flipHorizontal: "Przerzuć w poziomie",
    flipVertical: "Przerzuć w pionie"
  },
  imageWrap: {
    inline: "Równo z tekstem",
    floatLeft: "Pływające z lewej (zawijanie z prawej)",
    floatRight: "Pływające z prawej (zawijanie z lewej)",
    topAndBottom: "Góra i dół",
    behindText: "Za tekstem",
    inFrontOfText: "Przed tekstem",
    tooltipPrefix: "Zawijanie: {label}",
    menu: {
      ariaLabel: "Opcje układu obrazu",
      inLineWithText: "Równo z tekstem",
      squareLeft: "Kwadrat z lewej",
      squareRight: "Kwadrat z prawej"
    },
    square: "Ramka",
    targets: {
      behind: "Za tekstem",
      inFront: "Przed tekstem",
      inline: "Równo z tekstem",
      square: "Ramka",
      squareLeft: "Ramka z lewej",
      squareRight: "Ramka z prawej",
      through: "Na wskroś",
      tight: "Przyległe",
      topAndBottom: "Góra i dół"
    },
    through: "Na wskroś",
    tight: "Przyległe"
  },
  editor: {
    showDocumentOutline: "Pokaż konspekt dokumentu",
    linkCopied: "Skopiowano link do schowka",
    fontSubstitutionNotice: "Niektóre czcionki w tym dokumencie są niedostępne, dlatego wyświetlane są czcionki zastępcze: {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "Tekst wyświetlany",
    urlPlaceholder: "https://example.com",
    copyLink: "Kopiuj link",
    editLink: "Edytuj link",
    removeLink: "Usuń link",
    apply: "Zastosuj",
    bookmarkTarget: "Prowadzi do miejsca w tym dokumencie",
    cancel: "Anuluj",
    editTitle: "Edytuj link",
    inertTarget: "Ten link prowadzi do miejsca, którego edytor nie otworzy",
    insertTitle: "Wstaw link",
    openLink: "Otwórz link",
    refused: "Nie można zastosować tego linku. Sprawdź adres i spróbuj ponownie.",
    urlLabel: "Adres URL"
  },
  headerFooter: {
    header: "Nagłówek",
    footer: "Stopka",
    options: "Opcje",
    insertPageNumber: "Wstaw numer bieżącej strony",
    insertTotalPages: "Wstaw łączną liczbę stron",
    chromeAriaLabel: "Edycja nagłówka i stopki",
    firstPageHeader: "Nagłówek pierwszej strony",
    firstPageFooter: "Stopka pierwszej strony",
    evenPageHeader: "Nagłówek stron parzystych",
    evenPageFooter: "Stopka stron parzystych",
    sameAsPrevious: "Taki sam jak poprzedni",
    sameAsPreviousHint: "Edycje dotyczą także stron poprzedniej sekcji.",
    differentFirstPage: "Inna pierwsza strona",
    differentOddEven: "Inne strony parzyste i nieparzyste",
    differentOddEvenHint: "Dotyczy całego dokumentu.",
    linkToPrevious: "Połącz z poprzednim",
    unlinkFromPrevious: "Odłącz od poprzedniego",
    headerDistance: "Odległość nagłówka od krawędzi",
    footerDistance: "Odległość stopki od krawędzi",
    removeHeader: "Usuń nagłówek",
    removeFooter: "Usuń stopkę",
    insertSectionPages: "Wstaw liczbę stron sekcji",
    insertPageXofY: "Wstaw stronę X z Y"
  },
  image: {
    contentMismatch: "Zawartość obrazu nie odpowiada jego typowi",
    decodeFailed: "Nie można zdekodować obrazu",
    externalResource: "Nie załadowano obrazu zewnętrznego",
    invalidResource: "Nieprawidłowy obraz",
    missingResource: "Brak obrazu",
    nonPictureGraphic: "Nieobsługiwana grafika ({kind})",
    pendingResource: "Ładowanie obrazu",
    resourceLimit: "Obraz przekracza limity rozmiaru",
    unsupportedFormat: "Nieobsługiwany format obrazu ({format})"
  },
  ruler: {
    horizontal: "Linijka pozioma",
    vertical: "Linijka pionowa",
    firstLineIndent: "Wcięcie pierwszego wiersza",
    leftIndent: "Wcięcie z lewej",
    rightIndent: "Wcięcie z prawej",
    topMargin: "Margines górny",
    bottomMargin: "Margines dolny",
    hangingIndent: "Wysunięcie"
  },
  loading: {
    label: "Ładowanie"
  },
  viewer: {
    pageIndicator: "{current} z {total}"
  },
  imageOverlay: {
    handle: {
      e: "Zmień rozmiar prawej krawędzi",
      n: "Zmień rozmiar górnej krawędzi",
      ne: "Zmień rozmiar prawego górnego rogu",
      nw: "Zmień rozmiar lewego górnego rogu",
      s: "Zmień rozmiar dolnej krawędzi",
      se: "Zmień rozmiar prawego dolnego rogu",
      sw: "Zmień rozmiar lewego dolnego rogu",
      w: "Zmień rozmiar lewej krawędzi"
    },
    selection: "Zaznaczony obraz"
  },
  revisions: {
    paragraphMarkInserted: "Wstawiono znak akapitu",
    runPropertiesChanged: "Zmieniono formatowanie tekstu"
  },
  toc: {
    refresh: "Aktualizuj cały spis",
    refreshPageNumbers: "Aktualizuj tylko numery stron"
  },
  editingMode: {
    editing: "Edytowanie",
    label: "Tryb edycji",
    editingHint: "Edytuj dokument bezpośrednio",
    suggesting: "Sugerowanie",
    suggestingHint: "Zmiany stają się sugestiami",
    viewing: "Wyświetlanie",
    viewingHint: "Tylko do odczytu, bez zmian"
  },
  navigation: {
    ariaLabel: "Nawigacja po dokumencie",
    closeAriaLabel: "Zamknij nawigację",
    closeTitle: "Zamknij nawigację",
    find: {
      clearAriaLabel: "Wyczyść wyszukiwanie",
      counter: "Wynik {current} z {total}",
      counterTruncated: "Wynik {current} z {total}+",
      inputAriaLabel: "Przeszukaj dokument",
      matchCase: "Uwzględnij wielkość liter",
      nextAriaLabel: "Następny wynik",
      noResults: "Brak wyników",
      optionsAriaLabel: "Opcje wyszukiwania",
      placeholder: "Przeszukaj dokument",
      previousAriaLabel: "Poprzedni wynik",
      resultsAriaLabel: "Wyniki wyszukiwania",
      searching: "Wyszukiwanie…",
      wholeWord: "Tylko całe wyrazy",
      total: "{total, plural, one {# wynik} few {# wyniki} many {# wyników} other {# wyniku}}",
      totalTruncated: "{total, plural, other {#+ wyników}}"
    },
    headings: {
      noHeadings: "Nie znaleziono nagłówków. Dodaj nagłówki do dokumentu, aby zobaczyć je tutaj."
    },
    openAriaLabel: "Otwórz nawigację",
    openTitle: "Nawigacja",
    tabs: {
      find: "Znajdź",
      headings: "Nagłówki"
    },
    title: "Nawigacja"
  },
  contentControl: {
    formFill: "Tryb wypełniania formularza",
    group: "Kontrolki zawartości",
    inspector: "Właściwości kontrolki zawartości",
    inspectorPanel: {
      alias: "Tytuł",
      bound: "Powiązanie z danymi",
      boundNote: "Ta kontrolka jest powiązana z danymi zewnętrznymi. Edycja została odrzucona.",
      empty: "—",
      lock: "Blokada",
      lockedNote: "Edycja zawartości jest zablokowana w tej kontrolce.",
      no: "Nie",
      placeholder: "Symbol zastępczy",
      tag: "Znacznik",
      title: "Kontrolka zawartości",
      type: "Typ",
      yes: "Tak"
    },
    lock: {
      contentLocked: "Zawartość zablokowana",
      sdtContentLocked: "Kontrolka zawartości i zawartość zablokowane",
      sdtLocked: "Kontrolka zawartości zablokowana",
      unlocked: "Odblokowane"
    },
    remove: "Usuń kontrolkę zawartości",
    showAll: "Pokaż obramowania kontrolek zawartości",
    types: {
      checkbox: "Pole wyboru",
      comboBox: "Pole kombi",
      date: "Data",
      dropdown: "Lista rozwijana",
      picture: "Obraz",
      plainText: "Tekst zwykły",
      repeatingSection: "Sekcja powtarzalna",
      richText: "Tekst sformatowany"
    }
  },
  notes: {
    delete: "Usuń przypis",
    convertToEndnote: "Konwertuj na przypis końcowy",
    convertToFootnote: "Konwertuj na przypis dolny",
    scope: "Zastosuj do",
    scopeDocument: "Cały dokument",
    scopeSection: "Ta sekcja",
    previewFallback: "Przypis dolny",
    chromeAriaLabel: "Edycja przypisu",
    editingRegion: "{kind} {number}",
    footnoteKind: "Przypis dolny",
    endnoteKind: "Przypis końcowy",
    convertAllFootnotes: "Konwertuj wszystkie przypisy dolne na przypisy końcowe",
    convertAllEndnotes: "Konwertuj wszystkie przypisy końcowe na przypisy dolne",
    inheritedValue: "(dziedziczone)"
  },
  review: {
    accept: "Zaakceptuj",
    ariaLabel: "Recenzja",
    commentRefused: "Nie można dodać komentarza",
    deleted: "Usunięto",
    empty: "Brak zmian i komentarzy",
    inserted: "Dodano",
    movedFrom: "Przeniesiono stąd",
    movedTo: "Przeniesiono tutaj",
    reject: "Odrzuć",
    replaced: "Zamieniono",
    replacedWith: "na",
    reply: "Odpowiedz",
    replyRefused: "Nie można opublikować odpowiedzi",
    showPane: "Pokaż komentarze",
    structural: "Zmieniono strukturę dokumentu",
    deleteComment: "Usuń komentarz",
    discardChange: "Odrzuć zmianę"
  },
  imageAltText: {
    description: "Opis",
    panelTitle: "Tekst alternatywny",
    title: "Tytuł"
  },
  imageInsert: {
    errors: {
      emptyFile: "Wybrany plik jest pusty.",
      invalidSignature: "Plik nie jest obsługiwanym obrazem PNG, JPEG ani GIF.",
      oversize: "Obraz przekracza maksymalny dozwolony rozmiar.",
      refused: "Nie można wstawić obrazu.",
      unsupportedFormat: "Ten format obrazu nie jest obsługiwany przy wstawianiu."
    }
  },
  imageProperties: {
    crop: "Przytnij",
    cropBottom: "Dół (%)",
    cropLeft: "Lewa (%)",
    cropRight: "Prawa (%)",
    cropTop: "Góra (%)",
    errors: {
      invalidCrop: "Wartości przycięcia muszą być procentami od 0 do 100.",
      invalidDimensions: "Wprowadź dodatnie wartości szerokości i wysokości.",
      refused: "Nie można zastosować tych właściwości.",
      invalidPosition: "Wprowadź prawidłowe wartości położenia w poziomie i w pionie."
    },
    hyperlink: "Hiperłącze",
    nonPictureHint: "Przycinanie i przywracanie naturalnego rozmiaru są dostępne tylko dla obrazów.",
    resetNaturalSize: "Przywróć naturalny rozmiar",
    units: {
      points: "pkt"
    },
    horizontalOffset: "Przesunięcie w poziomie",
    position: "Położenie",
    positionLocked: "Tego rysunku nie można przenieść.",
    positionUnavailable: "Położenie jest dostępne tylko dla obrazów przestawnych.",
    relativeToHorizontal: "Względem (w poziomie)",
    relativeToVertical: "Względem (w pionie)",
    verticalOffset: "Przesunięcie w pionie"
  }
};

// pt-BR.json
var pt_BR_default = {
  _lang: "pt-BR",
  common: {
    cancel: "Cancelar",
    apply: "Aplicar",
    close: "Fechar",
    comment: "Comentário",
    dismiss: "Dispensar"
  },
  toolbar: {
    ariaLabel: "Barra de formatação",
    file: "Arquivo",
    format: "Formatar",
    insert: "Inserir",
    print: "Imprimir",
    printShortcut: "Ctrl+P",
    pageSetup: "Configurar página",
    leftToRight: "Texto da esquerda para a direita",
    rightToLeft: "Texto da direita para a esquerda",
    image: "Imagem",
    table: "Tabela",
    pageBreak: "Quebra de página",
    tableOfContents: "Sumário",
    help: "Ajuda",
    reportIssue: "Reportar problema",
    open: "Abrir",
    openShortcut: "Ctrl+O",
    save: "Salvar",
    saveShortcut: "Ctrl+S",
    watermark: "Marca d'água",
    break: "Quebra",
    sectionBreakContinuous: "Quebra de seção (contínua)",
    sectionBreakNextPage: "Quebra de seção (próxima página)",
    insertFootnote: "Inserir nota de rodapé",
    insertEndnote: "Inserir nota de fim"
  },
  formattingBar: {
    groups: {
      history: "Histórico",
      zoom: "Zoom",
      styles: "Estilos",
      font: "Fonte",
      textFormatting: "Formatação de texto",
      script: "Sobrescrito/Subscrito",
      alignment: "Alinhamento",
      listFormatting: "Formatação de lista",
      image: "Imagem",
      table: "Tabela"
    },
    undo: "Desfazer",
    undoShortcut: "Desfazer (Ctrl+Z)",
    redo: "Refazer",
    redoShortcut: "Refazer (Ctrl+Y)",
    bold: "Negrito",
    boldShortcut: "Negrito (Ctrl+B)",
    italic: "Itálico",
    italicShortcut: "Itálico (Ctrl+I)",
    underline: "Sublinhado",
    underlineShortcut: "Sublinhado (Ctrl+U)",
    strikethrough: "Tachado",
    fontColor: "Cor da fonte",
    highlightColor: "Cor de destaque do texto",
    insertLink: "Inserir link",
    insertLinkShortcut: "Inserir link (Ctrl+K)",
    superscript: "Sobrescrito",
    superscriptShortcut: "Sobrescrito (Ctrl+Shift+=)",
    subscript: "Subscrito",
    subscriptShortcut: "Subscrito (Ctrl+=)",
    imageProperties: "Propriedades da imagem",
    imagePropertiesShortcut: "Propriedades da imagem (texto alternativo, borda)...",
    clearFormatting: "Limpar formatação",
    commentsAndChanges: "Comentários e alterações",
    unavailableInPreview: "Não disponível nesta versão de visualização",
    more: "Mais",
    altText: "Texto alternativo",
    imageWrap: "Quebra de texto automática"
  },
  alignment: {
    alignLeft: "Alinhar à esquerda",
    alignLeftShortcut: "Ctrl+L",
    center: "Centralizar",
    centerShortcut: "Ctrl+E",
    alignRight: "Alinhar à direita",
    alignRightShortcut: "Ctrl+R",
    justify: "Justificar",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "Formatação de lista",
    typeAriaLabel: "Tipo de lista",
    indentationAriaLabel: "Recuo da lista",
    bulletList: "Lista com marcadores",
    numberedList: "Lista numerada",
    decreaseIndent: "Diminuir recuo",
    increaseIndent: "Aumentar recuo"
  },
  lineSpacing: {
    single: "Simples",
    double: "Duplo",
    lineSpacingTitle: "Espaçamento entre linhas: {label}",
    blockSpacingRules: "Espaçamento entre parágrafos",
    label: "Espaçamento entre linhas",
    addSpaceAfter: "Adicionar espaço depois do parágrafo",
    addSpaceBefore: "Adicionar espaço antes do parágrafo",
    removeSpaceAfter: "Remover espaço depois do parágrafo",
    removeSpaceBefore: "Remover espaço antes do parágrafo"
  },
  styles: {
    selectAriaLabel: "Selecionar estilo de parágrafo",
    normalText: "Texto normal",
    title: "Título",
    subtitle: "Subtítulo",
    heading1: "Cabeçalho 1",
    heading2: "Cabeçalho 2",
    heading3: "Cabeçalho 3"
  },
  font: {
    selectAriaLabel: "Selecionar família da fonte",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monoespaçado",
    documentFonts: "Fontes do documento"
  },
  fontSize: {
    decrease: "Diminuir tamanho da fonte",
    increase: "Aumentar tamanho da fonte",
    label: "Tamanho da fonte",
    listLabel: "Tamanhos da fonte"
  },
  zoom: {
    ariaLabel: "Zoom: {label}",
    zoomIn: "Ampliar",
    zoomLevel: "Nível de zoom",
    zoomOut: "Reduzir",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "Cores de destaque",
    customColor: "Cor personalizada",
    noColor: "Sem cor",
    automatic: "Automático",
    themeColors: "Cores do tema",
    standardColors: "Cores padrão",
    colors: {
      black: "Preto",
      darkRed: "Vermelho escuro",
      red: "Vermelho",
      orange: "Laranja",
      yellow: "Amarelo",
      darkYellow: "Amarelo escuro",
      green: "Verde",
      darkGreen: "Verde escuro",
      blue: "Azul",
      darkBlue: "Azul escuro",
      purple: "Roxo",
      white: "Branco",
      lightGreen: "Verde claro",
      lightBlue: "Azul claro",
      darkGray: "Cinza escuro",
      cyan: "Ciano",
      magenta: "Magenta",
      brightGreen: "Verde brilhante",
      darkCyan: "Ciano escuro",
      darkMagenta: "Magenta escuro",
      lightGray: "Cinza claro"
    },
    apply: "Aplicar",
    theme: {
      accent1: "Ênfase 1",
      accent2: "Ênfase 2",
      accent3: "Ênfase 3",
      accent4: "Ênfase 4",
      accent5: "Ênfase 5",
      accent6: "Ênfase 6",
      background1: "Plano de Fundo 1",
      background2: "Plano de Fundo 2",
      text1: "Texto 1",
      text2: "Texto 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "Propriedades da imagem",
      altText: "Texto alternativo",
      altTextPlaceholder: "Descreva esta imagem para acessibilidade...",
      dimensions: "Dimensões",
      heightLabel: "Altura:",
      lockAspectRatio: "Bloquear proporção",
      textWrapping: "Quebra de texto",
      widthLabel: "Largura:"
    },
    imagePosition: {
      relativeOptions: {
        page: "Página",
        column: "Coluna",
        margin: "Margem",
        character: "Caractere",
        paragraph: "Parágrafo",
        line: "Linha"
      }
    },
    pageSetup: {
      title: "Configurar página",
      pageSize: "TAMANHO DA PÁGINA",
      sizeLabel: "Tamanho",
      custom: "Personalizado",
      orientation: "Orientação",
      portrait: "Retrato",
      landscape: "Paisagem",
      margins: "MARGENS",
      top: "Superior",
      bottom: "Inferior",
      left: "Esquerda",
      right: "Direita",
      pageSizes: {
        letter: 'Carta (8,5" × 11")',
        a4: 'A4 (8,27" × 11,69")',
        legal: 'Ofício (8,5" × 14")',
        a3: 'A3 (11,69" × 16,54")',
        a5: 'A5 (5,83" × 8,27")',
        b5: 'B5 (6,93" × 9,84")',
        executive: 'Executivo (7,25" × 10,5")'
      },
      applyTo: "Aplicar a",
      applyToDocument: "Documento inteiro",
      applyToSection: "Esta seção"
    },
    footnoteProperties: {
      title: "Propriedades de notas de rodapé e fim",
      footnotes: "Notas de rodapé",
      endnotes: "Notas de fim",
      position: "Posição",
      numberFormat: "Formato do número",
      numbering: "Numeração",
      footnotePositions: {
        bottomOfPage: "Final da página",
        belowText: "Abaixo do texto"
      },
      endnotePositions: {
        endOfDocument: "Final do documento",
        endOfSection: "Final da seção"
      },
      numberingOptions: {
        continuous: "Contínuo",
        restartSection: "Reiniciar a cada seção",
        restartPage: "Reiniciar a cada página"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "Desconhecido",
    addComment: "Adicionar um comentário...",
    replyPlaceholder: "Responda ou adicione outros com @"
  },
  contextMenu: {
    ariaLabel: "Menu de ações de IA",
    cut: "Recortar",
    cutShortcut: "Ctrl+X",
    copy: "Copiar",
    copyShortcut: "Ctrl+C",
    paste: "Colar",
    pasteShortcut: "Ctrl+V",
    delete: "Excluir",
    deleteShortcut: "Del",
    selectAll: "Selecionar tudo",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "Editar {label}",
    removeCustomNode: "Remover {label}"
  },
  documentOutline: {
    ariaLabel: "Estrutura do documento",
    closeAriaLabel: "Fechar estrutura",
    closeTitle: "Fechar estrutura",
    title: "Estrutura",
    noHeadings: "Nenhum cabeçalho encontrado. Adicione cabeçalhos ao seu documento para vê-los aqui."
  },
  titleBar: {
    untitled: "Sem título",
    documentNameAriaLabel: "Nome do documento",
    menuBarAriaLabel: "Barra de menu"
  },
  errors: {
    unableToParse: "Não foi possível analisar o documento",
    somethingWentWrong: "Algo deu errado",
    errorDescription: "Ocorreu um erro ao renderizar este componente. Tente novamente ou contate o suporte se o problema persistir.",
    errorLabel: "Erro:",
    componentStack: "Pilha de componentes:",
    tryAgain: "Tentar novamente",
    showDetails: "Mostrar detalhes",
    hideDetails: "Ocultar detalhes"
  },
  table: {
    insertRowAbove: "Inserir linha acima",
    insertRowBelow: "Inserir linha abaixo",
    insertColumnLeft: "Inserir coluna à esquerda",
    insertColumnRight: "Inserir coluna à direita",
    deleteRow: "Excluir linha",
    deleteColumn: "Excluir coluna",
    deleteTable: "Excluir tabela",
    mergeCells: "Mesclar células",
    splitCell: "Dividir célula",
    editingTools: "Ferramentas de edição de tabela",
    label: "Tabela:",
    cellFillColor: "Cor de preenchimento da célula",
    borderColor: "Cor da borda",
    borderWidth: "Largura da borda",
    borders: {
      all: "Todas as bordas",
      outside: "Bordas externas",
      inside: "Bordas internas",
      none: "Sem bordas",
      top: "Borda superior",
      bottom: "Borda inferior",
      left: "Borda esquerda",
      right: "Borda direita",
      styleAriaLabel: "Estilo da borda",
      tooltip: "Bordas"
    },
    moreOptions: "Mais opções de tabela",
    selectTable: "Selecionar a tabela inteira",
    borderStyles: {
      dashed: "Tracejada",
      dotted: "Pontilhada",
      double: "Dupla",
      single: "Sólida",
      thick: "Espessa",
      triple: "Tripla"
    },
    borderWidths: {
      halfPt: "0,5 pt",
      oneHalfPt: "1,5 pt",
      onePt: "1 pt",
      threePt: "3 pt",
      twoPt: "2 pt"
    },
    clearCellFill: "Limpar preenchimento da célula"
  },
  tableAdvanced: {
    verticalAlignment: "Alinhamento vertical",
    top: "Superior",
    middle: "Meio",
    bottom: "Inferior",
    toggleNoWrap: "Alternar sem quebra",
    toggleHeaderRow: "Alternar linha de cabeçalho",
    distributeColumns: "Distribuir colunas uniformemente",
    autoFit: "Ajustar automaticamente ao conteúdo",
    tableProperties: "Propriedades da tabela...",
    tableAlignment: "Alinhamento da tabela",
    alignTableLeft: "Alinhar tabela à esquerda",
    alignTableCenter: "Centralizar tabela",
    alignTableRight: "Alinhar tabela à direita"
  },
  imageTransform: {
    tooltip: "Transformar",
    rotateClockwise: "Girar no sentido horário",
    rotateCounterClockwise: "Girar no sentido anti-horário",
    flipHorizontal: "Espelhar horizontalmente",
    flipVertical: "Espelhar verticalmente"
  },
  imageWrap: {
    inline: "Em linha com o texto",
    floatLeft: "Flutuar à esquerda (envolver à direita)",
    floatRight: "Flutuar à direita (envolver à esquerda)",
    topAndBottom: "Acima e abaixo",
    behindText: "Atrás do texto",
    inFrontOfText: "Na frente do texto",
    tooltipPrefix: "Quebra: {label}",
    menu: {
      ariaLabel: "Opções de layout de imagem",
      inLineWithText: "Em linha com o texto",
      squareLeft: "Quadrado à esquerda",
      squareRight: "Quadrado à direita"
    },
    square: "Quadrado",
    targets: {
      behind: "Atrás do texto",
      inFront: "Na frente do texto",
      inline: "Alinhado com o texto",
      square: "Quadrado",
      squareLeft: "Quadrado à esquerda",
      squareRight: "Quadrado à direita",
      through: "Através",
      tight: "Justa",
      topAndBottom: "Superior e inferior"
    },
    through: "Através",
    tight: "Justa"
  },
  editor: {
    showDocumentOutline: "Mostrar estrutura do documento",
    linkCopied: "Link copiado para a área de transferência",
    fontSubstitutionNotice: "Algumas fontes deste documento não estão disponíveis, então substitutas estão sendo exibidas: {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "Texto de exibição",
    urlPlaceholder: "https://example.com",
    copyLink: "Copiar link",
    editLink: "Editar link",
    removeLink: "Remover link",
    apply: "Aplicar",
    bookmarkTarget: "Leva a um local neste documento",
    cancel: "Cancelar",
    editTitle: "Editar link",
    inertTarget: "Este link aponta para um destino que o editor não abrirá",
    insertTitle: "Inserir link",
    openLink: "Abrir link",
    refused: "Não foi possível aplicar o link. Verifique o endereço e tente novamente.",
    urlLabel: "URL"
  },
  headerFooter: {
    header: "Cabeçalho",
    footer: "Rodapé",
    options: "Opções",
    insertPageNumber: "Inserir número da página atual",
    insertTotalPages: "Inserir contagem total de páginas",
    chromeAriaLabel: "Edição de cabeçalho e rodapé",
    firstPageHeader: "Cabeçalho da primeira página",
    firstPageFooter: "Rodapé da primeira página",
    evenPageHeader: "Cabeçalho de páginas pares",
    evenPageFooter: "Rodapé de páginas pares",
    sameAsPrevious: "Igual ao anterior",
    sameAsPreviousHint: "As edições também se aplicam às páginas da seção anterior.",
    differentFirstPage: "Primeira página diferente",
    differentOddEven: "Páginas ímpares e pares diferentes",
    differentOddEvenHint: "Aplica-se a todo o documento.",
    linkToPrevious: "Vincular ao anterior",
    unlinkFromPrevious: "Desvincular do anterior",
    headerDistance: "Distância do cabeçalho da borda",
    footerDistance: "Distância do rodapé da borda",
    removeHeader: "Remover cabeçalho",
    removeFooter: "Remover rodapé",
    insertSectionPages: "Inserir contagem de páginas da seção",
    insertPageXofY: "Inserir página X de Y"
  },
  image: {
    contentMismatch: "O conteúdo da imagem não corresponde ao seu tipo",
    decodeFailed: "Não foi possível decodificar a imagem",
    externalResource: "Imagem externa não carregada",
    invalidResource: "Imagem inválida",
    missingResource: "Imagem ausente",
    nonPictureGraphic: "Elemento gráfico sem suporte ({kind})",
    pendingResource: "Carregando imagem",
    resourceLimit: "A imagem excede os limites de tamanho",
    unsupportedFormat: "Formato de imagem sem suporte ({format})"
  },
  ruler: {
    horizontal: "Régua horizontal",
    vertical: "Régua vertical",
    firstLineIndent: "Recuo da primeira linha",
    leftIndent: "Recuo esquerdo",
    rightIndent: "Recuo direito",
    topMargin: "Margem superior",
    bottomMargin: "Margem inferior",
    hangingIndent: "Deslocamento"
  },
  loading: {
    label: "Carregando"
  },
  viewer: {
    pageIndicator: "{current} de {total}"
  },
  imageOverlay: {
    handle: {
      e: "Redimensionar borda direita",
      n: "Redimensionar borda superior",
      ne: "Redimensionar canto superior direito",
      nw: "Redimensionar canto superior esquerdo",
      s: "Redimensionar borda inferior",
      se: "Redimensionar canto inferior direito",
      sw: "Redimensionar canto inferior esquerdo",
      w: "Redimensionar borda esquerda"
    },
    selection: "Imagem selecionada"
  },
  revisions: {
    paragraphMarkInserted: "Marca de parágrafo inserida",
    runPropertiesChanged: "Formatação do texto alterada"
  },
  toc: {
    refresh: "Atualizar tabela inteira",
    refreshPageNumbers: "Atualizar apenas números de página"
  },
  editingMode: {
    editing: "Edição",
    label: "Modo de edição",
    editingHint: "Editar o documento diretamente",
    suggesting: "Sugestão",
    suggestingHint: "As edições viram sugestões",
    viewing: "Exibição",
    viewingHint: "Somente leitura, sem edições"
  },
  navigation: {
    ariaLabel: "Navegação no documento",
    closeAriaLabel: "Fechar navegação",
    closeTitle: "Fechar navegação",
    find: {
      clearAriaLabel: "Limpar pesquisa",
      counter: "Resultado {current} de {total}",
      counterTruncated: "Resultado {current} de {total}+",
      inputAriaLabel: "Pesquisar no documento",
      matchCase: "Diferenciar maiúsculas de minúsculas",
      nextAriaLabel: "Próximo resultado",
      noResults: "Nenhum resultado",
      optionsAriaLabel: "Opções de pesquisa",
      placeholder: "Pesquisar no documento",
      previousAriaLabel: "Resultado anterior",
      resultsAriaLabel: "Resultados da pesquisa",
      searching: "Pesquisando…",
      wholeWord: "Somente palavras inteiras",
      total: "{total, plural, one {# resultado} other {# resultados}}",
      totalTruncated: "{total, plural, other {#+ resultados}}"
    },
    headings: {
      noHeadings: "Nenhum título encontrado. Adicione títulos ao documento para vê-los aqui."
    },
    openAriaLabel: "Abrir navegação",
    openTitle: "Navegação",
    tabs: {
      find: "Localizar",
      headings: "Títulos"
    },
    title: "Navegação"
  },
  contentControl: {
    formFill: "Modo de preenchimento de formulário",
    group: "Controles de conteúdo",
    inspector: "Propriedades do controle de conteúdo",
    inspectorPanel: {
      alias: "Título",
      bound: "Vinculado a dados",
      boundNote: "Este controle está vinculado a dados externos. A edição foi recusada.",
      empty: "—",
      lock: "Bloqueio",
      lockedNote: "A edição de conteúdo está bloqueada neste controle.",
      no: "Não",
      placeholder: "Marcador de posição",
      tag: "Marca",
      title: "Controle de conteúdo",
      type: "Tipo",
      yes: "Sim"
    },
    lock: {
      contentLocked: "Conteúdo bloqueado",
      sdtContentLocked: "Controle de conteúdo e conteúdo bloqueados",
      sdtLocked: "Controle de conteúdo bloqueado",
      unlocked: "Desbloqueado"
    },
    remove: "Remover controle de conteúdo",
    showAll: "Mostrar limites dos controles de conteúdo",
    types: {
      checkbox: "Caixa de seleção",
      comboBox: "Caixa de combinação",
      date: "Data",
      dropdown: "Lista suspensa",
      picture: "Imagem",
      plainText: "Texto sem formatação",
      repeatingSection: "Seção repetitiva",
      richText: "Rich Text"
    }
  },
  notes: {
    delete: "Excluir nota",
    convertToEndnote: "Converter em nota de fim",
    convertToFootnote: "Converter em nota de rodapé",
    scope: "Aplicar a",
    scopeDocument: "Documento inteiro",
    scopeSection: "Esta seção",
    previewFallback: "Nota de rodapé",
    chromeAriaLabel: "Edição de nota",
    editingRegion: "{kind} {number}",
    footnoteKind: "Nota de rodapé",
    endnoteKind: "Nota de fim",
    convertAllFootnotes: "Converter todas as notas de rodapé em notas de fim",
    convertAllEndnotes: "Converter todas as notas de fim em notas de rodapé",
    inheritedValue: "(herdado)"
  },
  review: {
    accept: "Aceitar",
    ariaLabel: "Revisão",
    commentRefused: "Não foi possível adicionar o comentário",
    deleted: "Excluído",
    empty: "Sem alterações ou comentários",
    inserted: "Adicionado",
    movedFrom: "Movido daqui",
    movedTo: "Movido para cá",
    reject: "Rejeitar",
    replaced: "Substituído",
    replacedWith: "por",
    reply: "Responder",
    replyRefused: "Não foi possível publicar a resposta",
    showPane: "Mostrar comentários",
    structural: "Estrutura do documento alterada",
    deleteComment: "Excluir comentário",
    discardChange: "Descartar alteração"
  },
  imageAltText: {
    description: "Descrição",
    panelTitle: "Texto alternativo",
    title: "Título"
  },
  imageInsert: {
    errors: {
      emptyFile: "O arquivo selecionado está vazio.",
      invalidSignature: "O arquivo não é uma imagem PNG, JPEG ou GIF compatível.",
      oversize: "A imagem excede o tamanho máximo permitido.",
      refused: "Não foi possível inserir a imagem.",
      unsupportedFormat: "Este formato de imagem não é compatível para inserção."
    }
  },
  imageProperties: {
    crop: "Cortar",
    cropBottom: "Inferior (%)",
    cropLeft: "Esquerda (%)",
    cropRight: "Direita (%)",
    cropTop: "Superior (%)",
    errors: {
      invalidCrop: "Os valores de corte devem ser porcentagens de 0 a 100.",
      invalidDimensions: "Insira valores positivos de largura e altura.",
      refused: "Não foi possível aplicar essas propriedades.",
      invalidPosition: "Insira valores válidos de posição horizontal e vertical."
    },
    hyperlink: "Hiperlink",
    nonPictureHint: "Corte e redefinição para o tamanho natural estão disponíveis apenas para imagens.",
    resetNaturalSize: "Redefinir para o tamanho natural",
    units: {
      points: "pt"
    },
    horizontalOffset: "Deslocamento horizontal",
    position: "Posição",
    positionLocked: "Este desenho não pode ser movido.",
    positionUnavailable: "A posição está disponível apenas para imagens flutuantes.",
    relativeToHorizontal: "Em relação a (horizontal)",
    relativeToVertical: "Em relação a (vertical)",
    verticalOffset: "Deslocamento vertical"
  }
};

// tr.json
var tr_default = {
  _lang: "tr",
  common: {
    cancel: "İptal",
    apply: "Uygula",
    close: "Kapat",
    comment: "Yorum",
    dismiss: "Kapat"
  },
  toolbar: {
    ariaLabel: "Biçimlendirme araç çubuğu",
    file: "Dosya",
    format: "Biçim",
    insert: "Ekle",
    open: "Aç",
    openShortcut: "Ctrl+O",
    save: "Kaydet",
    saveShortcut: "Ctrl+S",
    print: "Yazdır",
    printShortcut: "Ctrl+P",
    pageSetup: "Sayfa yapısı",
    leftToRight: "Soldan sağa metin",
    rightToLeft: "Sağdan sola metin",
    image: "Görsel",
    table: "Tablo",
    pageBreak: "Sayfa sonu",
    tableOfContents: "İçindekiler tablosu",
    help: "Yardım",
    reportIssue: "Sorun bildir",
    watermark: "Filigran",
    break: "Kesme",
    sectionBreakContinuous: "Bölüm sonu (sürekli)",
    sectionBreakNextPage: "Bölüm sonu (sonraki sayfa)",
    insertFootnote: "Dipnot ekle",
    insertEndnote: "Sonnot ekle"
  },
  formattingBar: {
    groups: {
      history: "Geçmiş",
      zoom: "Yakınlaştırma",
      styles: "Stiller",
      font: "Yazı tipi",
      textFormatting: "Metin biçimlendirme",
      script: "Komut",
      alignment: "Hizalama",
      listFormatting: "Liste biçimlendirme",
      image: "Görsel",
      table: "Tablo"
    },
    undo: "Geri al",
    undoShortcut: "Geri al (Ctrl+Z)",
    redo: "Yinele",
    redoShortcut: "Yinele (Ctrl+Y)",
    bold: "Kalın",
    boldShortcut: "Kalın (Ctrl+B)",
    italic: "Eğik",
    italicShortcut: "Eğik (Ctrl+I)",
    underline: "Altı çizili",
    underlineShortcut: "Altı çizili (Ctrl+U)",
    strikethrough: "Üstü çizili",
    fontColor: "Yazı rengi",
    highlightColor: "Vurgu rengi",
    insertLink: "Bağlantı ekle",
    insertLinkShortcut: "Bağlantı ekle (Ctrl+K)",
    superscript: "Üst simge",
    superscriptShortcut: "Üst simge (Ctrl+Shift+=)",
    subscript: "Alt simge",
    subscriptShortcut: "Alt simge (Ctrl+=)",
    imageProperties: "Görsel özellikleri",
    imagePropertiesShortcut: "Görsel özellikleri (alternatif metin, kenarlık)...",
    clearFormatting: "Biçimlendirmeyi temizle",
    commentsAndChanges: "Açıklamalar ve değişiklikler",
    unavailableInPreview: "Bu önizleme sürümünde kullanılamaz",
    more: "Diğer",
    altText: "Alternatif metin",
    imageWrap: "Metni kaydır"
  },
  alignment: {
    alignLeft: "Sola hizala",
    alignLeftShortcut: "Ctrl+L",
    center: "Ortala",
    centerShortcut: "Ctrl+E",
    alignRight: "Sağa hizala",
    alignRightShortcut: "Ctrl+R",
    justify: "İki yana yasla",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "Liste biçimlendirme",
    typeAriaLabel: "Liste tipi",
    indentationAriaLabel: "Liste girintilemesi",
    bulletList: "Madde işaretli liste",
    numberedList: "Numaralı liste",
    decreaseIndent: "Girintiyi azalt",
    increaseIndent: "Girintiyi artır"
  },
  lineSpacing: {
    single: "Tek",
    double: "Çift",
    lineSpacingTitle: "Satır aralığı: {label}",
    blockSpacingRules: "Paragraf aralığı",
    label: "Satır aralığı",
    addSpaceAfter: "Paragraftan sonra boşluk ekle",
    addSpaceBefore: "Paragraftan önce boşluk ekle",
    removeSpaceAfter: "Paragraftan sonraki boşluğu kaldır",
    removeSpaceBefore: "Paragraftan önceki boşluğu kaldır"
  },
  styles: {
    selectAriaLabel: "Paragraf stili seç",
    normalText: "Normal metin",
    title: "Başlık",
    subtitle: "Alt başlık",
    heading1: "Başlık 1",
    heading2: "Başlık 2",
    heading3: "Başlık 3"
  },
  font: {
    selectAriaLabel: "Yazı tipi ailesini seç",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Eş aralıklı",
    documentFonts: "Belge yazı tipleri"
  },
  fontSize: {
    decrease: "Yazı tipi boyutunu küçült",
    increase: "Yazı tipi boyutunu büyüt",
    label: "Yazı tipi boyutu",
    listLabel: "Yazı tipi boyutları"
  },
  zoom: {
    ariaLabel: "Yakınlaştırma: {label}",
    zoomIn: "Yakınlaştır",
    zoomLevel: "Yakınlaştırma düzeyi",
    zoomOut: "Uzaklaştır",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "Vurgu renkleri",
    customColor: "Özel renk",
    noColor: "Renk yok",
    automatic: "Otomatik",
    themeColors: "Tema renkleri",
    standardColors: "Standart renkler",
    colors: {
      black: "Siyah",
      darkRed: "Koyu kırmızı",
      red: "Kırmızı",
      orange: "Turuncu",
      yellow: "Sarı",
      darkYellow: "Koyu sarı",
      green: "Yeşil",
      darkGreen: "Koyu yeşil",
      blue: "Mavi",
      darkBlue: "Koyu mavi",
      purple: "Mor",
      white: "Beyaz",
      lightGreen: "Açık yeşil",
      lightBlue: "Açık mavi",
      darkGray: "Koyu gri",
      cyan: "Camgöbeği",
      magenta: "Macenta",
      brightGreen: "Parlak yeşil",
      darkCyan: "Koyu camgöbeği",
      darkMagenta: "Koyu macenta",
      lightGray: "Açık gri"
    },
    apply: "Uygula",
    theme: {
      accent1: "Vurgu 1",
      accent2: "Vurgu 2",
      accent3: "Vurgu 3",
      accent4: "Vurgu 4",
      accent5: "Vurgu 5",
      accent6: "Vurgu 6",
      background1: "Arka Plan 1",
      background2: "Arka Plan 2",
      text1: "Metin 1",
      text2: "Metin 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "Görsel özellikleri",
      altText: "Alternatif metin",
      altTextPlaceholder: "Erişilebilirlik için bu görseli açıkla...",
      dimensions: "Boyutlar",
      heightLabel: "Yükseklik:",
      lockAspectRatio: "En boy oranını kilitle",
      textWrapping: "Metin sarma",
      widthLabel: "Genişlik:"
    },
    imagePosition: {
      relativeOptions: {
        page: "Sayfa",
        column: "Sütun",
        margin: "Kenar boşluğu",
        character: "Karakter",
        paragraph: "Paragraf",
        line: "Satır"
      }
    },
    pageSetup: {
      title: "Sayfa yapısı",
      pageSize: "SAYFA BOYUTU",
      sizeLabel: "Boyut",
      custom: "Özel",
      orientation: "Yön",
      portrait: "Dikey",
      landscape: "Yatay",
      margins: "KENAR BOŞLUKLARI",
      top: "Üst",
      bottom: "Alt",
      left: "Sol",
      right: "Sağ",
      pageSizes: {
        letter: 'Letter (8.5" × 11")',
        a4: 'A4 (8.27" × 11.69")',
        legal: 'Legal (8.5" × 14")',
        a3: 'A3 (11.69" × 16.54")',
        a5: 'A5 (5.83" × 8.27")',
        b5: 'B5 (6.93" × 9.84")',
        executive: 'Executive (7.25" × 10.5")'
      },
      applyTo: "Uygulama yeri",
      applyToDocument: "Tüm belge",
      applyToSection: "Bu bölüm"
    },
    footnoteProperties: {
      title: "Dipnot ve son not özellikleri",
      footnotes: "Dipnotlar",
      endnotes: "Son notlar",
      position: "Konum",
      numberFormat: "Numara biçimi",
      numbering: "Numaralandırma",
      footnotePositions: {
        bottomOfPage: "Sayfa altı",
        belowText: "Metin altı"
      },
      endnotePositions: {
        endOfDocument: "Belge sonu",
        endOfSection: "Bölüm sonu"
      },
      numberingOptions: {
        continuous: "Sürekli",
        restartSection: "Her bölümde yeniden başla",
        restartPage: "Her sayfada yeniden başla"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "Bilinmiyor",
    addComment: "Yorum ekle...",
    replyPlaceholder: "Yanıtla veya @ ile başkalarını ekle"
  },
  contextMenu: {
    ariaLabel: "Yapay zekâ işlemleri menüsü",
    cut: "Kes",
    cutShortcut: "Ctrl+X",
    copy: "Kopyala",
    copyShortcut: "Ctrl+C",
    paste: "Yapıştır",
    pasteShortcut: "Ctrl+V",
    delete: "Sil",
    deleteShortcut: "Del",
    selectAll: "Tümünü seç",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "{label} öğesini düzenle",
    removeCustomNode: "{label} öğesini kaldır"
  },
  documentOutline: {
    ariaLabel: "Belge ana hattı",
    closeAriaLabel: "Ana hattı kapat",
    closeTitle: "Ana hattı kapat",
    title: "Ana hat",
    noHeadings: "Başlık bulunamadı. Burada görünmeleri için belgeye başlık ekle."
  },
  viewer: {
    pageIndicator: "{total} sayfadan {current}."
  },
  titleBar: {
    untitled: "Adsız",
    documentNameAriaLabel: "Belge adı",
    menuBarAriaLabel: "Menü çubuğu"
  },
  errors: {
    unableToParse: "Belge ayrıştırılamadı",
    somethingWentWrong: "Bir şeyler ters gitti",
    errorDescription: "Bu bileşen oluşturulurken bir hata oluştu. Lütfen tekrar dene veya sorun devam ederse destek ile iletişime geç.",
    errorLabel: "Hata:",
    componentStack: "Bileşen yığını:",
    tryAgain: "Tekrar dene",
    showDetails: "Ayrıntıları göster",
    hideDetails: "Ayrıntıları gizle"
  },
  table: {
    insertRowAbove: "Üste satır ekle",
    insertRowBelow: "Alta satır ekle",
    insertColumnLeft: "Sola sütun ekle",
    insertColumnRight: "Sağa sütun ekle",
    deleteRow: "Satırı sil",
    deleteColumn: "Sütunu sil",
    deleteTable: "Tabloyu sil",
    mergeCells: "Hücreleri birleştir",
    splitCell: "Hücreyi böl",
    editingTools: "Tablo düzenleme araçları",
    label: "Tablo:",
    cellFillColor: "Hücre dolgu rengi",
    borderColor: "Kenarlık rengi",
    borderWidth: "Kenarlık kalınlığı",
    borders: {
      all: "Tüm kenarlıklar",
      outside: "Dış kenarlıklar",
      inside: "İç kenarlıklar",
      none: "Kenarlık yok",
      top: "Üst kenarlık",
      bottom: "Alt kenarlık",
      left: "Sol kenarlık",
      right: "Sağ kenarlık",
      styleAriaLabel: "Kenarlık stili",
      tooltip: "Kenarlıklar"
    },
    moreOptions: "Daha fazla tablo seçeneği",
    selectTable: "Tüm tabloyu seç",
    borderStyles: {
      dashed: "Kesik çizgili",
      dotted: "Noktalı",
      double: "Çift",
      single: "Düz",
      thick: "Kalın",
      triple: "Üçlü"
    },
    borderWidths: {
      halfPt: "0,5 nk",
      oneHalfPt: "1,5 nk",
      onePt: "1 nk",
      threePt: "3 nk",
      twoPt: "2 nk"
    },
    clearCellFill: "Hücre dolgusunu temizle"
  },
  tableAdvanced: {
    verticalAlignment: "Dikey hizalama",
    top: "Üst",
    middle: "Orta",
    bottom: "Alt",
    toggleNoWrap: "Sarmamayı aç/kapa",
    toggleHeaderRow: "Başlık satırını aç/kapa",
    distributeColumns: "Sütunları eşit dağıt",
    autoFit: "İçeriğe otomatik sığdır",
    tableProperties: "Tablo özellikleri...",
    tableAlignment: "Tablo hizalaması",
    alignTableLeft: "Tabloyu sola hizala",
    alignTableCenter: "Tabloyu ortala",
    alignTableRight: "Tabloyu sağa hizala"
  },
  imageTransform: {
    tooltip: "Dönüştür",
    rotateClockwise: "Saat yönünde döndür",
    rotateCounterClockwise: "Saat yönünün tersine döndür",
    flipHorizontal: "Yatay çevir",
    flipVertical: "Dikey çevir"
  },
  imageWrap: {
    inline: "Metinle aynı satırda",
    floatLeft: "Sol kareleme",
    floatRight: "Sağ kareleme",
    topAndBottom: "Üst ve alt",
    behindText: "Metnin arkasında",
    inFrontOfText: "Metnin önünde",
    tooltipPrefix: "Sarma: {label}",
    menu: {
      inLineWithText: "Metinle aynı satırda",
      squareLeft: "Sol kareleme",
      squareRight: "Sağ kareleme",
      ariaLabel: "Görsel düzeni seçenekleri"
    },
    square: "Kare",
    targets: {
      behind: "Metin arkasına",
      inFront: "Metin önüne",
      inline: "Metinle aynı hizada",
      square: "Kare",
      squareLeft: "Kare (sol)",
      squareRight: "Kare (sağ)",
      through: "İçinden",
      tight: "Sıkı",
      topAndBottom: "Üst ve alt"
    },
    through: "İçinden",
    tight: "Sıkı"
  },
  editor: {
    showDocumentOutline: "Belge ana hattını göster",
    linkCopied: "Bağlantı panoya kopyalandı",
    fontSubstitutionNotice: "Bu belgedeki bazı yazı tipleri kullanılamıyor; bunların yerine şunlar gösteriliyor: {fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "Görüntülenen metin",
    urlPlaceholder: "https://ornek.com",
    copyLink: "Bağlantıyı kopyala",
    editLink: "Bağlantıyı düzenle",
    removeLink: "Bağlantıyı kaldır",
    apply: "Uygula",
    bookmarkTarget: "Bu belgedeki bir konuma gider",
    cancel: "İptal",
    editTitle: "Bağlantıyı düzenle",
    inertTarget: "Bu bağlantı, düzenleyicinin açmayacağı bir yere işaret ediyor",
    insertTitle: "Bağlantı ekle",
    openLink: "Bağlantıyı aç",
    refused: "Bu bağlantı uygulanamadı. Adresi denetleyip yeniden deneyin.",
    urlLabel: "URL"
  },
  headerFooter: {
    header: "Üstbilgi",
    footer: "Altbilgi",
    options: "Seçenekler",
    insertPageNumber: "Mevcut sayfa numarasını ekle",
    insertTotalPages: "Toplam sayfa sayısını ekle",
    chromeAriaLabel: "Üstbilgi ve altbilgi düzenleme",
    firstPageHeader: "İlk sayfa üstbilgisi",
    firstPageFooter: "İlk sayfa altbilgisi",
    evenPageHeader: "Çift sayfa üstbilgisi",
    evenPageFooter: "Çift sayfa altbilgisi",
    sameAsPrevious: "Öncekiyle aynı",
    sameAsPreviousHint: "Düzenlemeler önceki bölümün sayfalarına da uygulanır.",
    differentFirstPage: "Farklı ilk sayfa",
    differentOddEven: "Farklı tek ve çift sayfalar",
    differentOddEvenHint: "Tüm belgeye uygulanır.",
    linkToPrevious: "Öncekine bağla",
    unlinkFromPrevious: "Öncekinden bağlantıyı kaldır",
    headerDistance: "Üstbilginin kenardan uzaklığı",
    footerDistance: "Altbilginin kenardan uzaklığı",
    removeHeader: "Üstbilgiyi kaldır",
    removeFooter: "Altbilgiyi kaldır",
    insertSectionPages: "Bölüm sayfa sayısını ekle",
    insertPageXofY: "X / Y sayfasını ekle"
  },
  image: {
    contentMismatch: "Görüntü içeriği türüyle eşleşmiyor",
    decodeFailed: "Görüntünün kodu çözülemedi",
    externalResource: "Dış görüntü yüklenmedi",
    invalidResource: "Geçersiz görüntü",
    missingResource: "Görüntü eksik",
    nonPictureGraphic: "Desteklenmeyen grafik ({kind})",
    pendingResource: "Görüntü yükleniyor",
    resourceLimit: "Görüntü boyut sınırlarını aşıyor",
    unsupportedFormat: "Desteklenmeyen görüntü biçimi ({format})"
  },
  ruler: {
    horizontal: "Yatay cetvel",
    vertical: "Dikey cetvel",
    firstLineIndent: "İlk satır girintisi",
    leftIndent: "Sol girinti",
    rightIndent: "Sağ girinti",
    topMargin: "Üst kenar boşluğu",
    bottomMargin: "Alt kenar boşluğu",
    hangingIndent: "Asılı girinti"
  },
  loading: {
    label: "Yükleniyor"
  },
  imageOverlay: {
    handle: {
      e: "Sağ kenarı yeniden boyutlandır",
      n: "Üst kenarı yeniden boyutlandır",
      ne: "Sağ üst köşeyi yeniden boyutlandır",
      nw: "Sol üst köşeyi yeniden boyutlandır",
      s: "Alt kenarı yeniden boyutlandır",
      se: "Sağ alt köşeyi yeniden boyutlandır",
      sw: "Sol alt köşeyi yeniden boyutlandır",
      w: "Sol kenarı yeniden boyutlandır"
    },
    selection: "Seçili görüntü"
  },
  revisions: {
    paragraphMarkInserted: "Paragraf işareti eklendi",
    runPropertiesChanged: "Metin biçimlendirmesi değiştirildi"
  },
  toc: {
    refresh: "Tüm tabloyu güncelle",
    refreshPageNumbers: "Yalnızca sayfa numaralarını güncelle"
  },
  editingMode: {
    editing: "Düzenleme",
    label: "Düzenleme modu",
    editingHint: "Belgeyi doğrudan düzenle",
    suggesting: "Öneri",
    suggestingHint: "Düzenlemeler öneriye dönüşür",
    viewing: "Görüntüleme",
    viewingHint: "Salt okunur, düzenleme yok"
  },
  navigation: {
    ariaLabel: "Belge gezintisi",
    closeAriaLabel: "Gezintiyi kapat",
    closeTitle: "Gezintiyi kapat",
    find: {
      clearAriaLabel: "Aramayı temizle",
      counter: "Sonuç {current}/{total}",
      counterTruncated: "Sonuç {current}/{total}+",
      inputAriaLabel: "Belgede ara",
      matchCase: "Büyük/küçük harf eşleştir",
      nextAriaLabel: "Sonraki sonuç",
      noResults: "Sonuç yok",
      optionsAriaLabel: "Arama seçenekleri",
      placeholder: "Belgede ara",
      previousAriaLabel: "Önceki sonuç",
      resultsAriaLabel: "Arama sonuçları",
      searching: "Aranıyor…",
      wholeWord: "Yalnızca tam sözcükler",
      total: "{total, plural, other {# sonuç}}",
      totalTruncated: "{total, plural, other {#+ sonuç}}"
    },
    headings: {
      noHeadings: "Başlık bulunamadı. Burada görmek için belgenize başlık ekleyin."
    },
    openAriaLabel: "Gezintiyi aç",
    openTitle: "Gezinti",
    tabs: {
      find: "Bul",
      headings: "Başlıklar"
    },
    title: "Gezinti"
  },
  contentControl: {
    formFill: "Form doldurma modu",
    group: "İçerik denetimleri",
    inspector: "İçerik denetimi özellikleri",
    inspectorPanel: {
      alias: "Başlık",
      bound: "Veriye bağlı",
      boundNote: "Bu denetim harici verilere bağlı. Düzenleme reddedildi.",
      empty: "—",
      lock: "Kilit",
      lockedNote: "Bu denetimde içerik düzenleme kilitli.",
      no: "Hayır",
      placeholder: "Yer tutucu",
      tag: "Etiket",
      title: "İçerik denetimi",
      type: "Tür",
      yes: "Evet"
    },
    lock: {
      contentLocked: "İçerik kilitli",
      sdtContentLocked: "İçerik denetimi ve içerik kilitli",
      sdtLocked: "İçerik denetimi kilitli",
      unlocked: "Kilitsiz"
    },
    remove: "İçerik denetimini kaldır",
    showAll: "İçerik denetimi sınırlarını göster",
    types: {
      checkbox: "Onay kutusu",
      comboBox: "Birleşik kutu",
      date: "Tarih",
      dropdown: "Açılan liste",
      picture: "Resim",
      plainText: "Düz metin",
      repeatingSection: "Yinelenen bölüm",
      richText: "Zengin metin"
    }
  },
  notes: {
    delete: "Notu sil",
    convertToEndnote: "Son nota dönüştür",
    convertToFootnote: "Dip nota dönüştür",
    scope: "Uygula",
    scopeDocument: "Tüm belge",
    scopeSection: "Bu bölüm",
    previewFallback: "Dipnot",
    chromeAriaLabel: "Not düzenleme",
    editingRegion: "{kind} {number}",
    footnoteKind: "Dipnot",
    endnoteKind: "Sonnot",
    convertAllFootnotes: "Tüm dip notları son notlara dönüştür",
    convertAllEndnotes: "Tüm son notları dip notlara dönüştür",
    inheritedValue: "(devralınan)"
  },
  review: {
    accept: "Kabul et",
    ariaLabel: "Gözden geçir",
    commentRefused: "Açıklama eklenemedi",
    deleted: "Silindi",
    empty: "Değişiklik veya açıklama yok",
    inserted: "Eklendi",
    movedFrom: "Buradan taşındı",
    movedTo: "Buraya taşındı",
    reject: "Reddet",
    replaced: "Değiştirildi",
    replacedWith: "şununla:",
    reply: "Yanıtla",
    replyRefused: "Yanıt gönderilemedi",
    showPane: "Açıklamaları göster",
    structural: "Belge yapısı değiştirildi",
    deleteComment: "Açıklamayı sil",
    discardChange: "Değişikliği at"
  },
  imageAltText: {
    description: "Açıklama",
    panelTitle: "Alternatif metin",
    title: "Başlık"
  },
  imageInsert: {
    errors: {
      emptyFile: "Seçilen dosya boş.",
      invalidSignature: "Dosya desteklenen bir PNG, JPEG veya GIF görüntüsü değil.",
      oversize: "Görüntü izin verilen en büyük boyutu aşıyor.",
      refused: "Görüntü eklenemedi.",
      unsupportedFormat: "Bu görüntü biçimi ekleme için desteklenmiyor."
    }
  },
  imageProperties: {
    crop: "Kırp",
    cropBottom: "Alt (%)",
    cropLeft: "Sol (%)",
    cropRight: "Sağ (%)",
    cropTop: "Üst (%)",
    errors: {
      invalidCrop: "Kırpma değerleri 0 ile 100 arasında yüzde olmalıdır.",
      invalidDimensions: "Pozitif genişlik ve yükseklik değerleri girin.",
      refused: "Bu özellikler uygulanamadı.",
      invalidPosition: "Geçerli yatay ve dikey konum değerleri girin."
    },
    hyperlink: "Köprü",
    nonPictureHint: "Kırpma ve doğal boyuta sıfırlama yalnızca resimler için kullanılabilir.",
    resetNaturalSize: "Doğal boyuta sıfırla",
    units: {
      points: "nk"
    },
    horizontalOffset: "Yatay uzaklık",
    position: "Konum",
    positionLocked: "Bu çizim taşınamaz.",
    positionUnavailable: "Konum yalnızca kayan görüntüler için kullanılabilir.",
    relativeToHorizontal: "Göreli konum (yatay)",
    relativeToVertical: "Göreli konum (dikey)",
    verticalOffset: "Dikey uzaklık"
  }
};

// zh-CN.json
var zh_CN_default = {
  _lang: "zh-CN",
  common: {
    cancel: "取消",
    apply: "应用",
    close: "关闭",
    comment: "批注",
    dismiss: "忽略"
  },
  toolbar: {
    ariaLabel: "格式工具栏",
    file: "文件",
    format: "格式",
    insert: "插入",
    open: "打开",
    openShortcut: "Ctrl+O",
    save: "保存",
    saveShortcut: "Ctrl+S",
    print: "打印",
    printShortcut: "Ctrl+P",
    pageSetup: "页面设置",
    leftToRight: "文本从左到右",
    rightToLeft: "文本从右到左",
    image: "图片",
    table: "表格",
    pageBreak: "分页符",
    tableOfContents: "目录",
    help: "帮助",
    reportIssue: "反馈问题",
    watermark: "水印",
    break: "分隔符",
    sectionBreakContinuous: "分节符（连续）",
    sectionBreakNextPage: "分节符（下一页）",
    insertFootnote: "插入脚注",
    insertEndnote: "插入尾注"
  },
  formattingBar: {
    groups: {
      history: "历史记录",
      zoom: "缩放",
      styles: "样式",
      font: "字体",
      textFormatting: "文本格式",
      script: "上下标",
      alignment: "对齐",
      listFormatting: "列表格式",
      image: "图片",
      table: "表格"
    },
    undo: "撤销",
    undoShortcut: "撤销(Ctrl+Z)",
    redo: "恢复",
    redoShortcut: "恢复(Ctrl+Y)",
    bold: "加粗",
    boldShortcut: "加粗(Ctrl+B)",
    italic: "倾斜",
    italicShortcut: "倾斜(Ctrl+I)",
    underline: "下划线",
    underlineShortcut: "下划线(Ctrl+U)",
    strikethrough: "删除线",
    fontColor: "字体颜色",
    highlightColor: "文本突出显示颜色",
    insertLink: "插入链接",
    insertLinkShortcut: "插入链接(Ctrl+K)",
    superscript: "上标",
    superscriptShortcut: "上标(Ctrl+Shift+=)",
    subscript: "下标",
    subscriptShortcut: "下标(Ctrl+=)",
    imageProperties: "图片属性",
    imagePropertiesShortcut: "图片属性(替代文本、边框)...",
    clearFormatting: "清除格式",
    commentsAndChanges: "批注和更改",
    unavailableInPreview: "此预览版本中不可用",
    more: "更多",
    altText: "替换文字",
    imageWrap: "环绕文字"
  },
  alignment: {
    alignLeft: "左对齐",
    alignLeftShortcut: "Ctrl+L",
    center: "居中",
    centerShortcut: "Ctrl+E",
    alignRight: "右对齐",
    alignRightShortcut: "Ctrl+R",
    justify: "两端对齐",
    justifyShortcut: "Ctrl+J"
  },
  lists: {
    ariaLabel: "列表格式",
    typeAriaLabel: "列表类型",
    indentationAriaLabel: "列表缩进",
    bulletList: "项目符号",
    numberedList: "编号",
    decreaseIndent: "减少缩进",
    increaseIndent: "增加缩进"
  },
  lineSpacing: {
    single: "单倍行距",
    double: "双倍行距",
    lineSpacingTitle: "行距: {label}",
    blockSpacingRules: "段间距",
    label: "行距",
    addSpaceAfter: "增加段后间距",
    addSpaceBefore: "增加段前间距",
    removeSpaceAfter: "删除段后间距",
    removeSpaceBefore: "删除段前间距"
  },
  styles: {
    selectAriaLabel: "选择段落样式",
    normalText: "正文",
    title: "标题",
    subtitle: "副标题",
    heading1: "标题 1",
    heading2: "标题 2",
    heading3: "标题 3"
  },
  font: {
    selectAriaLabel: "选择字体",
    sansSerif: "Sans Serif",
    serif: "Serif",
    monospace: "Monospace",
    documentFonts: "文档字体"
  },
  fontSize: {
    decrease: "减小字号",
    increase: "增大字号",
    label: "字号",
    listLabel: "字号列表"
  },
  zoom: {
    ariaLabel: "缩放: {label}",
    zoomIn: "放大",
    zoomLevel: "缩放级别",
    zoomOut: "缩小",
    automatic: null,
    fitWidth: null
  },
  colorPicker: {
    highlightColors: "突出显示颜色",
    customColor: "自定义颜色",
    noColor: "无颜色",
    automatic: "自动",
    themeColors: "主题颜色",
    standardColors: "标准颜色",
    colors: {
      black: "黑色",
      darkRed: "深红",
      red: "红色",
      orange: "橙色",
      yellow: "黄色",
      darkYellow: "深黄",
      green: "绿色",
      darkGreen: "深绿",
      blue: "蓝色",
      darkBlue: "深蓝",
      purple: "紫色",
      white: "白色",
      lightGreen: "浅绿",
      lightBlue: "浅蓝",
      darkGray: "深灰",
      cyan: "青色",
      magenta: "品红",
      brightGreen: "亮绿",
      darkCyan: "深青",
      darkMagenta: "深品红",
      lightGray: "浅灰"
    },
    apply: "应用",
    theme: {
      accent1: "着色 1",
      accent2: "着色 2",
      accent3: "着色 3",
      accent4: "着色 4",
      accent5: "着色 5",
      accent6: "着色 6",
      background1: "背景 1",
      background2: "背景 2",
      text1: "文字 1",
      text2: "文字 2"
    }
  },
  dialogs: {
    imageProperties: {
      title: "图片属性",
      altText: "替代文本",
      altTextPlaceholder: "描述图片内容以供无障碍访问...",
      dimensions: "尺寸",
      heightLabel: "高度:",
      lockAspectRatio: "锁定纵横比",
      textWrapping: "文字环绕",
      widthLabel: "宽度:"
    },
    imagePosition: {
      relativeOptions: {
        page: "页面",
        column: "列",
        margin: "页边距",
        character: "字符",
        paragraph: "段落",
        line: "行"
      }
    },
    pageSetup: {
      title: "页面设置",
      pageSize: "纸张大小",
      sizeLabel: "大小",
      custom: "自定义",
      orientation: "方向",
      portrait: "纵向",
      landscape: "横向",
      margins: "页边距",
      top: "上",
      bottom: "下",
      left: "左",
      right: "右",
      pageSizes: {
        letter: '信纸 (8.5" × 11")',
        a4: 'A4 (8.27" × 11.69")',
        legal: '法律专用纸 (8.5" × 14")',
        a3: 'A3 (11.69" × 16.54")',
        a5: 'A5 (5.83" × 8.27")',
        b5: 'B5 (6.93" × 9.84")',
        executive: 'Executive (7.25" × 10.5")'
      },
      applyTo: "应用于",
      applyToDocument: "整篇文档",
      applyToSection: "本节"
    },
    footnoteProperties: {
      title: "脚注和尾注属性",
      footnotes: "脚注",
      endnotes: "尾注",
      position: "位置",
      numberFormat: "编号格式",
      numbering: "编号方式",
      footnotePositions: {
        bottomOfPage: "页面底端",
        belowText: "文本下方"
      },
      endnotePositions: {
        endOfDocument: "文档末尾",
        endOfSection: "节末尾"
      },
      numberingOptions: {
        continuous: "连续",
        restartSection: "每节重新编号",
        restartPage: "每页重新编号"
      },
      formats: {
        decimal: "1, 2, 3, ...",
        lowerRoman: "i, ii, iii, ...",
        upperRoman: "I, II, III, ..."
      }
    }
  },
  comments: {
    unknown: "未知",
    addComment: "添加批注",
    replyPlaceholder: "回复或使用 @ 提及他人..."
  },
  contextMenu: {
    ariaLabel: "AI 操作菜单",
    cut: "剪切",
    cutShortcut: "Ctrl+X",
    copy: "复制",
    copyShortcut: "Ctrl+C",
    paste: "粘贴",
    pasteShortcut: "Ctrl+V",
    delete: "删除",
    deleteShortcut: "Del",
    selectAll: "全选",
    selectAllShortcut: "Ctrl+A",
    editCustomNode: "编辑{label}",
    removeCustomNode: "删除{label}"
  },
  documentOutline: {
    ariaLabel: "文档大纲",
    closeAriaLabel: "关闭大纲",
    closeTitle: "关闭大纲",
    title: "大纲",
    noHeadings: "未找到标题。请在文档中添加标题以在此处显示。"
  },
  titleBar: {
    untitled: "未命名",
    documentNameAriaLabel: "文档名称",
    menuBarAriaLabel: "菜单栏"
  },
  errors: {
    unableToParse: "无法解析文档",
    somethingWentWrong: "发生错误",
    errorDescription: "渲染此组件时发生错误。请重试，如果问题仍然存在，请联系支持人员。",
    errorLabel: "错误:",
    componentStack: "组件堆栈:",
    tryAgain: "请重试",
    showDetails: "显示详情",
    hideDetails: "隐藏详情"
  },
  table: {
    insertRowAbove: "在上方插入行",
    insertRowBelow: "在下方插入行",
    insertColumnLeft: "在左侧插入列",
    insertColumnRight: "在右侧插入列",
    deleteRow: "删除行",
    deleteColumn: "删除列",
    deleteTable: "删除表格",
    mergeCells: "合并单元格",
    splitCell: "拆分单元格",
    editingTools: "表格编辑工具",
    label: "表格",
    cellFillColor: "单元格填充颜色",
    borderColor: "边框颜色",
    borderWidth: "边框宽度",
    borders: {
      all: "所有框线",
      outside: "外侧框线",
      inside: "内侧框线",
      none: "无框线",
      top: "上框线",
      bottom: "下框线",
      left: "左框线",
      right: "右框线",
      styleAriaLabel: "边框样式",
      tooltip: "边框"
    },
    moreOptions: "更多表格选项",
    selectTable: "选择整个表格",
    borderStyles: {
      dashed: "虚线",
      dotted: "点线",
      double: "双线",
      single: "实线",
      thick: "粗线",
      triple: "三线"
    },
    borderWidths: {
      halfPt: "0.5 磅",
      oneHalfPt: "1.5 磅",
      onePt: "1 磅",
      threePt: "3 磅",
      twoPt: "2 磅"
    },
    clearCellFill: "清除单元格填充"
  },
  tableAdvanced: {
    verticalAlignment: "垂直对齐",
    top: "顶端对齐",
    middle: "居中对齐",
    bottom: "底端对齐",
    toggleNoWrap: "切换文本换行",
    toggleHeaderRow: "切换标题行",
    distributeColumns: "平均分布各列",
    autoFit: "根据内容自动调整",
    tableProperties: "表格属性...",
    tableAlignment: "表格对齐方式",
    alignTableLeft: "表格左对齐",
    alignTableCenter: "表格居中对齐",
    alignTableRight: "表格右对齐"
  },
  imageTransform: {
    tooltip: "变换",
    rotateClockwise: "向右旋转",
    rotateCounterClockwise: "向左旋转",
    flipHorizontal: "水平翻转",
    flipVertical: "垂直翻转"
  },
  imageWrap: {
    inline: "嵌入型",
    floatLeft: "浮于左侧(文字环绕右侧)",
    floatRight: "浮于右侧(文字环绕左侧)",
    topAndBottom: "上下型环绕",
    behindText: "衬于文字下方",
    inFrontOfText: "浮于文字上方",
    tooltipPrefix: "环绕方式：{label}",
    menu: {
      ariaLabel: "图像布局选项",
      inLineWithText: "嵌入型",
      squareLeft: "四周型靠左",
      squareRight: "四周型靠右"
    },
    square: "四周型",
    targets: {
      behind: "衬于文字下方",
      inFront: "浮于文字上方",
      inline: "嵌入型",
      square: "四周型",
      squareLeft: "四周型（左）",
      squareRight: "四周型（右）",
      through: "穿越型",
      tight: "紧密型",
      topAndBottom: "上下型"
    },
    through: "穿越型",
    tight: "紧密型"
  },
  editor: {
    showDocumentOutline: "显示文档大纲",
    linkCopied: "链接已复制到剪贴板",
    fontSubstitutionNotice: "此文档中的某些字体不可用，已显示替代字体：{fonts}"
  },
  hyperlinkPopup: {
    displayTextPlaceholder: "显示文本",
    urlPlaceholder: "https://example.com",
    copyLink: "复制链接",
    editLink: "编辑链接",
    removeLink: "删除链接",
    apply: "应用",
    bookmarkTarget: "转到本文档中的某个位置",
    cancel: "取消",
    editTitle: "编辑链接",
    inertTarget: "此链接指向编辑器不会打开的位置",
    insertTitle: "插入链接",
    openLink: "打开链接",
    refused: "无法应用该链接。请检查地址后重试。",
    urlLabel: "URL"
  },
  headerFooter: {
    header: "页眉",
    footer: "页脚",
    options: "选项",
    insertPageNumber: "插入当前页码",
    insertTotalPages: "插入总页数",
    chromeAriaLabel: "页眉页脚编辑",
    firstPageHeader: "首页页眉",
    firstPageFooter: "首页页脚",
    evenPageHeader: "偶数页页眉",
    evenPageFooter: "偶数页页脚",
    sameAsPrevious: "与上一节相同",
    sameAsPreviousHint: "编辑也会应用于上一节的页面。",
    differentFirstPage: "首页不同",
    differentOddEven: "奇偶页不同",
    differentOddEvenHint: "应用于整个文档。",
    linkToPrevious: "链接到上一节",
    unlinkFromPrevious: "取消与上一节的链接",
    headerDistance: "页眉距边缘的距离",
    footerDistance: "页脚距边缘的距离",
    removeHeader: "删除页眉",
    removeFooter: "删除页脚",
    insertSectionPages: "插入本节页数",
    insertPageXofY: "插入第 X 页，共 Y 页"
  },
  image: {
    contentMismatch: "图像内容与其类型不匹配",
    decodeFailed: "无法解码图像",
    externalResource: "未加载外部图像",
    invalidResource: "无效图像",
    missingResource: "缺少图像",
    nonPictureGraphic: "不受支持的图形（{kind}）",
    pendingResource: "正在加载图像",
    resourceLimit: "图像超出大小限制",
    unsupportedFormat: "不受支持的图像格式（{format}）"
  },
  ruler: {
    horizontal: "水平标尺",
    vertical: "垂直标尺",
    firstLineIndent: "首行缩进",
    leftIndent: "左缩进",
    rightIndent: "右缩进",
    topMargin: "上边距",
    bottomMargin: "下边距",
    hangingIndent: "悬挂缩进"
  },
  loading: {
    label: "正在加载"
  },
  viewer: {
    pageIndicator: "第 {current} 页，共 {total} 页"
  },
  imageOverlay: {
    handle: {
      e: "调整右边缘大小",
      n: "调整上边缘大小",
      ne: "调整右上角大小",
      nw: "调整左上角大小",
      s: "调整下边缘大小",
      se: "调整右下角大小",
      sw: "调整左下角大小",
      w: "调整左边缘大小"
    },
    selection: "选定的图像"
  },
  revisions: {
    paragraphMarkInserted: "已插入段落标记",
    runPropertiesChanged: "已更改文本格式"
  },
  toc: {
    refresh: "更新整个目录",
    refreshPageNumbers: "仅更新页码"
  },
  editingMode: {
    editing: "编辑",
    label: "编辑模式",
    editingHint: "直接编辑文档",
    suggesting: "建议",
    suggestingHint: "编辑将成为建议",
    viewing: "查看",
    viewingHint: "只读，不可编辑"
  },
  navigation: {
    ariaLabel: "文档导航",
    closeAriaLabel: "关闭导航",
    closeTitle: "关闭导航",
    find: {
      clearAriaLabel: "清除搜索",
      counter: "第 {current} 个结果，共 {total} 个",
      counterTruncated: "第 {current} 个结果，共 {total}+ 个",
      inputAriaLabel: "搜索文档",
      matchCase: "区分大小写",
      nextAriaLabel: "下一个结果",
      noResults: "无结果",
      optionsAriaLabel: "搜索选项",
      placeholder: "搜索文档",
      previousAriaLabel: "上一个结果",
      resultsAriaLabel: "搜索结果",
      searching: "正在搜索…",
      wholeWord: "全字匹配",
      total: "{total, plural, other {# 个结果}}",
      totalTruncated: "{total, plural, other {#+ 个结果}}"
    },
    headings: {
      noHeadings: "未找到标题。在文档中添加标题即可在此处查看。"
    },
    openAriaLabel: "打开导航",
    openTitle: "导航",
    tabs: {
      find: "查找",
      headings: "标题"
    },
    title: "导航"
  },
  contentControl: {
    formFill: "表单填写模式",
    group: "内容控件",
    inspector: "内容控件属性",
    inspectorPanel: {
      alias: "标题",
      bound: "已绑定数据",
      boundNote: "此控件已绑定外部数据，无法编辑。",
      empty: "—",
      lock: "锁定",
      lockedNote: "此控件已锁定内容编辑。",
      no: "否",
      placeholder: "占位符",
      tag: "标记",
      title: "内容控件",
      type: "类型",
      yes: "是"
    },
    lock: {
      contentLocked: "内容已锁定",
      sdtContentLocked: "内容控件和内容均已锁定",
      sdtLocked: "内容控件已锁定",
      unlocked: "未锁定"
    },
    remove: "删除内容控件",
    showAll: "显示内容控件边框",
    types: {
      checkbox: "复选框",
      comboBox: "组合框",
      date: "日期",
      dropdown: "下拉列表",
      picture: "图片",
      plainText: "纯文本",
      repeatingSection: "重复节",
      richText: "格式文本"
    }
  },
  notes: {
    delete: "删除脚注/尾注",
    convertToEndnote: "转换为尾注",
    convertToFootnote: "转换为脚注",
    scope: "应用于",
    scopeDocument: "整个文档",
    scopeSection: "本节",
    previewFallback: "脚注",
    chromeAriaLabel: "脚注/尾注编辑",
    editingRegion: "{kind} {number}",
    footnoteKind: "脚注",
    endnoteKind: "尾注",
    convertAllFootnotes: "将所有脚注转换为尾注",
    convertAllEndnotes: "将所有尾注转换为脚注",
    inheritedValue: "（继承）"
  },
  review: {
    accept: "接受",
    ariaLabel: "审阅",
    commentRefused: "无法添加批注",
    deleted: "已删除",
    empty: "没有更改或批注",
    inserted: "已添加",
    movedFrom: "从此处移动",
    movedTo: "移动到此处",
    reject: "拒绝",
    replaced: "已替换",
    replacedWith: "为",
    reply: "答复",
    replyRefused: "无法发布答复",
    showPane: "显示批注",
    structural: "已更改文档结构",
    deleteComment: "删除批注",
    discardChange: "放弃更改"
  },
  imageAltText: {
    description: "说明",
    panelTitle: "替换文字",
    title: "标题"
  },
  imageInsert: {
    errors: {
      emptyFile: "所选文件为空。",
      invalidSignature: "该文件不是受支持的 PNG、JPEG 或 GIF 图像。",
      oversize: "图像超过允许的最大大小。",
      refused: "无法插入图像。",
      unsupportedFormat: "不支持插入此图像格式。"
    }
  },
  imageProperties: {
    crop: "裁剪",
    cropBottom: "下（%）",
    cropLeft: "左（%）",
    cropRight: "右（%）",
    cropTop: "上（%）",
    errors: {
      invalidCrop: "裁剪值必须是 0 到 100 之间的百分比。",
      invalidDimensions: "请输入正的宽度和高度值。",
      refused: "无法应用这些属性。",
      invalidPosition: "请输入有效的水平和垂直位置值。"
    },
    hyperlink: "超链接",
    nonPictureHint: "裁剪和恢复原始大小仅适用于图片。",
    resetNaturalSize: "恢复原始大小",
    units: {
      points: "磅"
    },
    horizontalOffset: "水平偏移",
    position: "位置",
    positionLocked: "无法移动此绘图。",
    positionUnavailable: "位置仅适用于浮动图像。",
    relativeToHorizontal: "相对于（水平）",
    relativeToVertical: "相对于（垂直）",
    verticalOffset: "垂直偏移"
  }
};

// src/index.ts
var en = en_default;
var de = de_default;
var fr = fr_default;
var he = he_default;
var hi = hi_default;
var id = id_default;
var pl = pl_default;
var ptBR = pt_BR_default;
var tr = tr_default;
var zhCN = zh_CN_default;
var locales = {
  en,
  de,
  fr,
  he,
  hi,
  id,
  pl,
  "pt-BR": ptBR,
  tr,
  "zh-CN": zhCN
};
function isRecord(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function deepMerge(base, override) {
  if (!override) return base;
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const overVal = override[key];
    if (overVal === null) continue;
    if (isRecord(base[key]) && isRecord(overVal)) {
      result[key] = deepMerge(base[key], overVal);
    } else if (overVal !== void 0) {
      result[key] = overVal;
    }
  }
  return result;
}
function lookupKey(obj, path) {
  let current = obj;
  for (const part of path.split(".")) {
    if (!isRecord(current)) return void 0;
    current = current[part];
  }
  return typeof current === "string" ? current : void 0;
}
function parseBranches(branchStr) {
  const parsed = {};
  const regex = /(=\d+|\w+)\s*\{([^}]*)\}/g;
  let match;
  while ((match = regex.exec(branchStr)) !== null) {
    parsed[match[1]] = match[2];
  }
  return parsed;
}
function formatMessage(template, vars, lang) {
  if (!vars) return template;
  const result = template.replace(
    // Linear on hostile templates: the branch group keeps the single-char
    // `[^{}]` alternative (using `[^{}]+` would form `(X+)*`, an exponential
    // pattern), and there is no `\s*` before the group — that `\s*` overlapped
    // with the group's leading whitespace and let a run of spaces be
    // partitioned many ways (the polynomial-ReDoS source). parseBranches
    // already tolerates the leading whitespace now folded into the capture.
    /\{(\w+),\s*plural,((?:[^{}]|\{[^{}]*\})*)\}/g,
    (full, varName, branchStr) => {
      const count = Number(vars[varName]);
      if (isNaN(count)) return full;
      const parsed = parseBranches(branchStr);
      const exact = parsed[`=${count}`];
      if (exact !== void 0) return exact.replace(/#/g, String(count));
      let category;
      try {
        category = new Intl.PluralRules(lang || "en").select(count);
      } catch {
        category = count === 1 ? "one" : "other";
      }
      const text = parsed[category] ?? parsed["other"] ?? "";
      return text.replace(/#/g, String(count));
    }
  );
  return result.replace(/\{(\w+)\}/g, (_, key) => {
    const val = vars[key];
    return val !== void 0 ? String(val) : `{${key}}`;
  });
}
function createT(strings, lang = "en") {
  return (key, vars) => {
    const value = lookupKey(strings, key);
    return formatMessage(value ?? key, vars, lang);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createT,
  de,
  deepMerge,
  en,
  fr,
  he,
  hi,
  id,
  locales,
  pl,
  ptBR,
  tr,
  zhCN
});
