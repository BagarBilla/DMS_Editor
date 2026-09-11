// Table cell merge ops (table-editing merge functionality).

import { describe, expect, test } from 'bun:test';
import {
  readOoxmlPart,
  WML_NAMESPACE_URI,
  type OoxmlElement,
  type OoxmlNode,
  type OoxmlPart,
  type OoxmlTableCellNode,
  type OoxmlTableRowNode,
} from '../package/ooxml-tree.js';
import { applyTreeOp, validateTreeOp } from '../store/tree-ops.js';
import { validateMergeTableCells } from '../store/tree-op-tables.js';
import { wmlAttributeValue, wmlChildNamed } from '../store/tree-op-table-shared.js';
import { readEditableTableTopology } from '../store/tree-op-table-topology.js';

const W = WML_NAMESPACE_URI;

function load(body: string): OoxmlPart {
  const result = readOoxmlPart(`<w:document xmlns:w="${W}"><w:body>${body}</w:body></w:document>`, {
    name: '/word/document.xml',
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml',
  });
  if (!result.ok) throw new Error(result.reason);
  return result.part;
}

function collectByKind(root: OoxmlNode, kind: OoxmlElement['kind']): OoxmlElement[] {
  const found: OoxmlElement[] = [];
  const visit = (node: OoxmlNode): void => {
    if (node.kind === 'textValue') return;
    if (node.kind === kind) found.push(node);
    for (const child of node.children ?? []) visit(child);
  };
  visit(root);
  return found;
}

function firstTable(part: OoxmlPart): OoxmlElement {
  const tables = collectByKind(part.root, 'table');
  if (tables.length === 0) throw new Error('no table');
  return tables[0]!;
}

function cellParagraphTexts(cell: OoxmlTableCellNode): string[] {
  const texts: string[] = [];
  for (const child of cell.children) {
    if (child.kind === 'paragraph') {
      const visit = (n: OoxmlNode): string => {
        if (n.kind === 'textValue') return n.value;
        return (n.children ?? []).map(visit).join('');
      };
      texts.push(visit(child));
    }
  }
  return texts;
}

const TABLE_2X2_XML = `
<w:tbl>
  <w:tblPr/>
  <w:tblGrid>
    <w:gridCol w:w="2000"/>
    <w:gridCol w:w="3000"/>
  </w:tblGrid>
  <w:tr>
    <w:tc>
      <w:tcPr><w:tcW w:w="2000" w:type="dxa"/></w:tcPr>
      <w:p><w:r><w:t>A1</w:t></w:r></w:p>
    </w:tc>
    <w:tc>
      <w:tcPr><w:tcW w:w="3000" w:type="dxa"/></w:tcPr>
      <w:p><w:r><w:t>B1</w:t></w:r></w:p>
    </w:tc>
  </w:tr>
  <w:tr>
    <w:tc>
      <w:tcPr><w:tcW w:w="2000" w:type="dxa"/></w:tcPr>
      <w:p><w:r><w:t>A2</w:t></w:r></w:p>
    </w:tc>
    <w:tc>
      <w:tcPr><w:tcW w:w="3000" w:type="dxa"/></w:tcPr>
      <w:p><w:r><w:t>B2</w:t></w:r></w:p>
    </w:tc>
  </w:tr>
</w:tbl>
`;

describe('mergeTableCells validation', () => {
  test('refuses empty or single cellIds', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const cell0 = topo.topology.rows[0]!.cells[0]!.id;

    expect(validateTreeOp(part, { op: 'mergeTableCells', tableId: table.id, cellIds: [] })).toBe(
      'invalidArgs'
    );
    expect(
      validateTreeOp(part, { op: 'mergeTableCells', tableId: table.id, cellIds: [cell0] })
    ).toBe('invalidArgs');
  });

  test('refuses duplicate cellIds', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const cell0 = topo.topology.rows[0]!.cells[0]!.id;
    expect(
      validateTreeOp(part, { op: 'mergeTableCells', tableId: table.id, cellIds: [cell0, cell0] })
    ).toBe('invalidArgs');
  });

  test('refuses non-rectangular selection (e.g. 3 cells in 2x2)', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const r0c0 = topo.topology.rows[0]!.cells[0]!.id;
    const r0c1 = topo.topology.rows[0]!.cells[1]!.id;
    const r1c0 = topo.topology.rows[1]!.cells[0]!.id;

    // L-shaped selection (3 cells out of 4) is not a solid rectangle
    expect(
      validateTreeOp(part, {
        op: 'mergeTableCells',
        tableId: table.id,
        cellIds: [r0c0, r0c1, r1c0],
      })
    ).toBe('invalidArgs');
  });
});

describe('mergeTableCells application', () => {
  test('horizontal merge across 2 cells in same row', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const a1Id = topo.topology.rows[0]!.cells[0]!.id;
    const b1Id = topo.topology.rows[0]!.cells[1]!.id;

    const result = applyTreeOp(part, {
      op: 'mergeTableCells',
      tableId: table.id,
      cellIds: [a1Id, b1Id],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const newTable = firstTable(result.part);
    const newTopo = readEditableTableTopology(result.part.root, newTable.id);
    expect(newTopo.ok).toBe(true);
    if (!newTopo.ok) return;

    // Row 0 now has only 1 cell
    const row0 = newTopo.topology.rows[0]!;
    expect(row0.cells.length).toBe(1);

    const mergedCell = row0.cells[0]!;
    expect(mergedCell.id).toBe(a1Id);

    const tcPr = wmlChildNamed(mergedCell, 'tcPr');
    expect(tcPr).toBeDefined();

    // gridSpan must be 2
    const gridSpan = tcPr && wmlChildNamed(tcPr, 'gridSpan');
    expect(gridSpan).toBeDefined();
    expect(wmlAttributeValue(gridSpan!, 'val')).toBe('2');

    // vMerge must NOT be present
    const vMerge = tcPr && wmlChildNamed(tcPr, 'vMerge');
    expect(vMerge).toBeUndefined();

    // Width should be summed (2000 + 3000 = 5000)
    const tcW = tcPr && wmlChildNamed(tcPr, 'tcW');
    expect(tcW).toBeDefined();
    expect(wmlAttributeValue(tcW!, 'w')).toBe('5000');

    // Contents should have preserved paragraphs from A1 and B1
    const texts = cellParagraphTexts(mergedCell);
    expect(texts).toEqual(['A1', 'B1']);

    // Row 1 should be untouched (2 cells: A2, B2)
    const row1 = newTopo.topology.rows[1]!;
    expect(row1.cells.length).toBe(2);
    expect(cellParagraphTexts(row1.cells[0]!)).toEqual(['A2']);
    expect(cellParagraphTexts(row1.cells[1]!)).toEqual(['B2']);
  });

  test('vertical merge across 2 cells in same column', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const a1Id = topo.topology.rows[0]!.cells[0]!.id;
    const a2Id = topo.topology.rows[1]!.cells[0]!.id;

    const result = applyTreeOp(part, {
      op: 'mergeTableCells',
      tableId: table.id,
      cellIds: [a1Id, a2Id],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const newTable = firstTable(result.part);
    const newTopo = readEditableTableTopology(result.part.root, newTable.id);
    expect(newTopo.ok).toBe(true);
    if (!newTopo.ok) return;

    // Both rows still have 2 cells
    const row0 = newTopo.topology.rows[0]!;
    const row1 = newTopo.topology.rows[1]!;
    expect(row0.cells.length).toBe(2);
    expect(row1.cells.length).toBe(2);

    // Primary cell (A1): vMerge="restart", no gridSpan
    const primaryCell = row0.cells[0]!;
    const tcPr0 = wmlChildNamed(primaryCell, 'tcPr');
    expect(tcPr0).toBeDefined();

    const vMerge0 = tcPr0 && wmlChildNamed(tcPr0, 'vMerge');
    expect(vMerge0).toBeDefined();
    expect(wmlAttributeValue(vMerge0!, 'val')).toBe('restart');

    const gridSpan0 = tcPr0 && wmlChildNamed(tcPr0, 'gridSpan');
    expect(gridSpan0).toBeUndefined();

    // Primary cell contains merged text
    expect(cellParagraphTexts(primaryCell)).toEqual(['A1', 'A2']);

    // Continuation cell (A2): vMerge="continue", single empty paragraph
    const contCell = row1.cells[0]!;
    const tcPr1 = wmlChildNamed(contCell, 'tcPr');
    expect(tcPr1).toBeDefined();

    const vMerge1 = tcPr1 && wmlChildNamed(tcPr1, 'vMerge');
    expect(vMerge1).toBeDefined();
    expect(wmlAttributeValue(vMerge1!, 'val')).toBe('continue');

    expect(cellParagraphTexts(contCell)).toEqual(['']);

    // Column B is untouched
    expect(cellParagraphTexts(row0.cells[1]!)).toEqual(['B1']);
    expect(cellParagraphTexts(row1.cells[1]!)).toEqual(['B2']);
  });

  test('2D block merge across 2x2 cells', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const a1Id = topo.topology.rows[0]!.cells[0]!.id;
    const b1Id = topo.topology.rows[0]!.cells[1]!.id;
    const a2Id = topo.topology.rows[1]!.cells[0]!.id;
    const b2Id = topo.topology.rows[1]!.cells[1]!.id;

    const result = applyTreeOp(part, {
      op: 'mergeTableCells',
      tableId: table.id,
      cellIds: [a1Id, b1Id, a2Id, b2Id],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const newTable = firstTable(result.part);
    const newTopo = readEditableTableTopology(result.part.root, newTable.id);
    expect(newTopo.ok).toBe(true);
    if (!newTopo.ok) return;

    // Both rows now have exactly 1 cell
    const row0 = newTopo.topology.rows[0]!;
    const row1 = newTopo.topology.rows[1]!;
    expect(row0.cells.length).toBe(1);
    expect(row1.cells.length).toBe(1);

    // Primary cell: gridSpan="2", vMerge="restart"
    const primary = row0.cells[0]!;
    const tcPr0 = wmlChildNamed(primary, 'tcPr');
    expect(wmlAttributeValue(wmlChildNamed(tcPr0!, 'gridSpan')!, 'val')).toBe('2');
    expect(wmlAttributeValue(wmlChildNamed(tcPr0!, 'vMerge')!, 'val')).toBe('restart');
    expect(wmlAttributeValue(wmlChildNamed(tcPr0!, 'tcW')!, 'w')).toBe('5000');

    // Continuation cell: gridSpan="2", vMerge="continue"
    const cont = row1.cells[0]!;
    const tcPr1 = wmlChildNamed(cont, 'tcPr');
    expect(wmlAttributeValue(wmlChildNamed(tcPr1!, 'gridSpan')!, 'val')).toBe('2');
    expect(wmlAttributeValue(wmlChildNamed(tcPr1!, 'vMerge')!, 'val')).toBe('continue');
    expect(wmlAttributeValue(wmlChildNamed(tcPr1!, 'tcW')!, 'w')).toBe('5000');

    // All text preserved in primary in document order: A1, B1, A2, B2
    expect(cellParagraphTexts(primary)).toEqual(['A1', 'B1', 'A2', 'B2']);
    expect(cellParagraphTexts(cont)).toEqual(['']);
  });
});
