// Table splitCell command planning, derivation, and execution tests.

import { GlobalRegistrator } from '@happy-dom/global-registrator';
if (!GlobalRegistrator.isRegistered) GlobalRegistrator.register();

import { describe, expect, test } from 'bun:test';
import { zipSync, strToU8 } from 'fflate';
import { createDocxEditor, type DocxEditorInstance } from '../docx-editor.js';
import { paragraphTextOf } from '../../store/store/tree-ops.js';
import { cellSelectionBetween } from '../../layout/semantic-cell-selection.js';
import type { TableCellAddress } from '../../layout/semantic-hit-test.js';
import { readEditableTableTopology } from '../../store/store/tree-op-table-topology.js';
import { tableFragment } from '../docx-editor-derive.js';

const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const CT = 'http://schemas.openxmlformats.org/package/2006/content-types';
const REL = 'http://schemas.openxmlformats.org/package/2006/relationships';
const OD = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument';

function docx(body: string): Uint8Array {
  return zipSync({
    '[Content_Types].xml': strToU8(
      `<Types xmlns="${CT}"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
        `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`
    ),
    '_rels/.rels': strToU8(
      `<Relationships xmlns="${REL}"><Relationship Id="rId1" Type="${OD}" Target="word/document.xml"/></Relationships>`
    ),
    'word/document.xml': strToU8(
      `<w:document xmlns:w="${W}"><w:body>${body}</w:body></w:document>`
    ),
  });
}

const p = (text: string) => `<w:p><w:r><w:t>${text}</w:t></w:r></w:p>`;
const TABLE_2X2 =
  `${p('outside')}` +
  '<w:tbl><w:tblGrid><w:gridCol w:w="2400"/><w:gridCol w:w="3600"/></w:tblGrid>' +
  `<w:tr><w:tc>${p('A1')}</w:tc><w:tc>${p('B1')}</w:tc></w:tr>` +
  `<w:tr><w:tc>${p('A2')}</w:tc><w:tc>${p('B2')}</w:tc></w:tr></w:tbl>`;

function mount(body: string): DocxEditorInstance {
  const container = document.createElement('div');
  document.body.append(container);
  const editor = createDocxEditor({ container, document: docx(body) });
  if (!editor.surface) throw new Error('surface failed to mount');
  return editor;
}

function paragraphByText(
  text: string,
  surface: NonNullable<DocxEditorInstance['surface']>
): string {
  for (const id of surface.session.paragraphIds()) {
    if (paragraphTextOf(surface.session.part(), id) === text) return id;
  }
  throw new Error(`paragraph ${text} not found`);
}

function caret(
  surface: NonNullable<DocxEditorInstance['surface']>,
  paragraphId: string,
  offset = 0
): void {
  surface.setSelection({
    anchor: { paragraphId, offset },
    head: { paragraphId, offset },
  });
}

describe('splitCell command planning and derivation', () => {
  test('splitCell refuses when caret is outside a table', () => {
    const editor = mount(TABLE_2X2);
    const surface = editor.surface!;
    caret(surface, paragraphByText('outside', surface));

    const can = editor.can({ type: 'splitCell' });
    expect(can.ok).toBe(false);
    expect(can.reason).toBe('no table is selected');

    expect(editor.query({ type: 'splitCellConfig' })).toBeUndefined();
    expect(editor.tableContext()?.canSplitCell).toBe(false);
  });

  test('splitCell refuses invalid parameters', () => {
    const editor = mount(TABLE_2X2);
    const surface = editor.surface!;
    caret(surface, paragraphByText('A1', surface));

    expect(editor.can({ type: 'splitCell', cols: 1, rows: 1 }).ok).toBe(false);
    expect(editor.can({ type: 'splitCell', cols: 0, rows: 2 }).ok).toBe(false);
    expect(editor.can({ type: 'splitCell', cols: 2, rows: -1 }).ok).toBe(false);
    expect(editor.can({ type: 'splitCell', cols: 1.5, rows: 2 }).ok).toBe(false);
  });

  test('splitCell refuses when multiple cells are selected', () => {
    const editor = mount(TABLE_2X2);
    const surface = editor.surface!;
    caret(surface, paragraphByText('A1', surface));
    const table = tableFragment(surface);
    const topo = readEditableTableTopology(surface.session.part().root, table.tableId);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const from: TableCellAddress = {
      tableId: table.tableId,
      rowIndex: 0,
      colIndex: 0,
      cellId: topo.topology.rows[0]!.cells[0]!.id,
    };
    const to: TableCellAddress = {
      tableId: table.tableId,
      rowIndex: 0,
      colIndex: 1,
      cellId: topo.topology.rows[0]!.cells[1]!.id,
    };
    const rect = cellSelectionBetween(
      surface.layout(),
      surface.session.part(),
      from,
      to,
      surface.session.revision()
    );
    expect(rect?.cellIds).toHaveLength(2);

    surface.setState({
      selection: surface.state().selection,
      cellSelection: rect ?? undefined,
    });

    const can = editor.can({ type: 'splitCell' });
    expect(can.ok).toBe(false);
    expect(can.reason).toBe('splitting table cells requires a single selected cell');
    expect(editor.query({ type: 'splitCellConfig' })).toBeUndefined();
    expect(editor.tableContext()?.canSplitCell).toBe(false);
  });

  test('splitCell succeeds on a single selected cell', () => {
    const editor = mount(TABLE_2X2);
    const surface = editor.surface!;
    caret(surface, paragraphByText('A1', surface));

    const can = editor.can({ type: 'splitCell', cols: 2 });
    expect(can.ok).toBe(true);

    const config = editor.query({ type: 'splitCellConfig' });
    expect(config).toEqual({ maxRows: 64, maxCols: 63 });
    expect(editor.tableContext()?.canSplitCell).toBe(true);

    const revBefore = surface.session.revision();
    const exec = editor.exec({ type: 'splitCell', cols: 2 });
    expect(exec.ok).toBe(true);
    expect(surface.session.revision()).toBeGreaterThan(revBefore);

    // Undo reverts back to original revision
    editor.exec({ type: 'undo' });
    expect(surface.session.revision()).toBe(revBefore);

    // Redo reapplies the split
    editor.exec({ type: 'redo' });
    expect(surface.session.revision()).toBeGreaterThan(revBefore);
  });
});
