// Table cell split ops (table-editing split cell functionality).

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
import { validateSplitTableCell } from '../store/tree-op-tables.js';
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

describe('splitTableCell validation', () => {
  test('refuses invalid cols or rows parameters', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const cell0 = topo.topology.rows[0]!.cells[0]!.id;

    // Both 1 or non-positive
    expect(
      validateTreeOp(part, { op: 'splitTableCell', tableId: table.id, cellId: cell0, cols: 1, rows: 1 })
    ).toBe('invalidArgs');
    expect(
      validateTreeOp(part, { op: 'splitTableCell', tableId: table.id, cellId: cell0, cols: 0, rows: 2 })
    ).toBe('invalidArgs');
    expect(
      validateTreeOp(part, { op: 'splitTableCell', tableId: table.id, cellId: cell0, cols: 2, rows: -1 })
    ).toBe('invalidArgs');
    expect(
      validateTreeOp(part, { op: 'splitTableCell', tableId: table.id, cellId: cell0, cols: 1.5, rows: 2 })
    ).toBe('invalidArgs');
  });

  test('refuses nonexistent cell', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    expect(
      validateTreeOp(part, { op: 'splitTableCell', tableId: table.id, cellId: 'fake-cell-id', cols: 2, rows: 1 })
    ).toBe('cellNotFound');
  });

  test('refuses exceeding column resource limit', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const cell0 = topo.topology.rows[0]!.cells[0]!.id;
    // 64 columns exceeds 63 column limit
    expect(
      validateTreeOp(part, { op: 'splitTableCell', tableId: table.id, cellId: cell0, cols: 64, rows: 1 })
    ).toBe('resourceLimitExceeded');
  });
});

describe('splitTableCell application', () => {
  test('horizontal split of a cell into 2 columns', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const cellA1 = topo.topology.rows[0]!.cells[0]!.id;
    const op = {
      op: 'splitTableCell' as const,
      tableId: table.id,
      cellId: cellA1,
      cols: 2,
      rows: 1,
    };

    expect(validateTreeOp(part, op)).toBe('valid');
    const applied = applyTreeOp(part, op);
    expect(applied.ok).toBe(true);

    // Verify grid cols in tblGrid increased from 2 to 3
    const grid = wmlChildNamed(table, 'tblGrid');
    expect(grid).toBeDefined();
    const cols = (grid?.children ?? []).filter((c) => c.kind === 'gridCol');
    expect(cols).toHaveLength(3);
    // Width 2000 was split into two 1000 twip columns
    expect(wmlAttributeValue(cols[0]!, 'w')).toBe('1000');
    expect(wmlAttributeValue(cols[1]!, 'w')).toBe('1000');
    expect(wmlAttributeValue(cols[2]!, 'w')).toBe('3000');

    // Row 0 now has 3 cells
    const rows = (table.children ?? []).filter((c) => c.kind === 'row') as OoxmlTableRowNode[];
    expect(rows[0]!.children).toHaveLength(3);
    const cell1 = rows[0]!.children[0] as OoxmlTableCellNode;
    const cell2 = rows[0]!.children[1] as OoxmlTableCellNode;
    const cell3 = rows[0]!.children[2] as OoxmlTableCellNode;

    expect(cellParagraphTexts(cell1)).toEqual(['A1']);
    expect(cellParagraphTexts(cell2)).toEqual(['']);
    expect(cellParagraphTexts(cell3)).toEqual(['B1']);

    // Row 1's first cell (A2) should have acquired gridSpan="2" to maintain rectangular geometry
    const r1c0 = rows[1]!.children[0] as OoxmlTableCellNode;
    const r1c0Pr = wmlChildNamed(r1c0, 'tcPr');
    expect(r1c0Pr).toBeDefined();
    const span = wmlChildNamed(r1c0Pr!, 'gridSpan');
    expect(span).toBeDefined();
    expect(wmlAttributeValue(span!, 'val')).toBe('2');

    // Verify new topology is valid and rectangular
    const newTopo = readEditableTableTopology(part.root, table.id);
    expect(newTopo.ok).toBe(true);
  });

  test('vertical split of a cell into 2 rows', () => {
    const part = load(TABLE_2X2_XML);
    const table = firstTable(part);
    const topo = readEditableTableTopology(part.root, table.id);
    expect(topo.ok).toBe(true);
    if (!topo.ok) return;

    const cellA1 = topo.topology.rows[0]!.cells[0]!.id;
    const op = {
      op: 'splitTableCell' as const,
      tableId: table.id,
      cellId: cellA1,
      cols: 1,
      rows: 2,
    };

    expect(validateTreeOp(part, op)).toBe('valid');
    const applied = applyTreeOp(part, op);
    expect(applied.ok).toBe(true);

    // Table now has 3 rows
    const rows = (table.children ?? []).filter((c) => c.kind === 'row') as OoxmlTableRowNode[];
    expect(rows).toHaveLength(3);

    // Row 0 has original A1 and B1 (with B1 having vMerge="restart")
    const r0c1Pr = wmlChildNamed(rows[0]!.children[1] as OoxmlTableCellNode, 'tcPr');
    const r0c1VMerge = wmlChildNamed(r0c1Pr!, 'vMerge');
    expect(r0c1VMerge).toBeDefined();
    expect(wmlAttributeValue(r0c1VMerge!, 'val')).toBe('restart');

    // Row 1 has split counterpart for A1 (independent empty paragraph) and continuation of B1
    const r1c0 = rows[1]!.children[0] as OoxmlTableCellNode;
    const r1c1 = rows[1]!.children[1] as OoxmlTableCellNode;
    expect(cellParagraphTexts(r1c0)).toEqual(['']);

    const r1c1Pr = wmlChildNamed(r1c1, 'tcPr');
    const r1c1VMerge = wmlChildNamed(r1c1Pr!, 'vMerge');
    expect(r1c1VMerge).toBeDefined();
    expect(wmlAttributeValue(r1c1VMerge!, 'val')).toBe('continue');

    // Verify new topology is valid and rectangular
    const newTopo = readEditableTableTopology(part.root, table.id);
    expect(newTopo.ok).toBe(true);
  });
});
