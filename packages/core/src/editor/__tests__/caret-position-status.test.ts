import { GlobalRegistrator } from '@happy-dom/global-registrator';
if (!GlobalRegistrator.isRegistered) GlobalRegistrator.register();

import { describe, expect, test } from 'bun:test';
import { zipSync, strToU8 } from 'fflate';
import { createDocxEditor } from '../docx-editor.js';
import { readOoxmlPackage } from '../../store/package/ooxml-package.js';

const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const CT = 'http://schemas.openxmlformats.org/package/2006/content-types';
const REL = 'http://schemas.openxmlformats.org/package/2006/relationships';
const OD = `${R}/officeDocument`;

function blankDoc(): Uint8Array {
  const body = '<w:p><w:r><w:t>Hello World</w:t></w:r></w:p><w:sectPr/>';
  const entries: Record<string, Uint8Array> = {
    '[Content_Types].xml': strToU8(
      `<Types xmlns="${CT}">` +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
        '</Types>'
    ),
    '_rels/.rels': strToU8(
      `<Relationships xmlns="${REL}"><Relationship Id="rId1" Type="${OD}" Target="word/document.xml"/></Relationships>`
    ),
    'word/document.xml': strToU8(
      `<w:document xmlns:w="${W}" xmlns:r="${R}"><w:body>${body}</w:body></w:document>`
    ),
  };
  return zipSync(entries);
}

function mountEditor(bytes: Uint8Array) {
  const host = document.createElement('div');
  document.body.append(host);
  const editor = createDocxEditor({ document: bytes });
  editor.attach(host);
  return { editor, host };
}

describe('caret position metrics and targeted page number insertion', () => {
  test('getCaretPosition returns metrics on mounted editor', () => {
    const { editor, host } = mountEditor(blankDoc());
    const position = editor.getCaretPosition();
    expect(position).not.toBeNull();
    expect(position?.pageNumber).toBe(1);
    expect(position?.totalPages).toBeGreaterThanOrEqual(1);
    expect(position?.lineNumber).toBeGreaterThanOrEqual(1);
    expect(position?.columnNumber).toBeGreaterThanOrEqual(1);
    editor.destroy();
    host.remove();
  });

  test('insertPageField with target: footer succeeds from body scope', async () => {
    const { editor, host } = mountEditor(blankDoc());
    // Normal insertPageField without target still fails from body
    expect(editor.can({ type: 'insertPageField', field: 'PAGE' }).ok).toBe(false);
    expect(editor.exec({ type: 'insertPageField', field: 'PAGE' }).ok).toBe(false);

    // With target: 'footer', can() and exec() succeed
    expect(editor.can({ type: 'insertPageField', field: 'PAGE', target: 'footer' }).ok).toBe(true);
    const result = editor.exec({ type: 'insertPageField', field: 'PAGE', target: 'footer' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.changed).toBe(true);

    const buffer = await editor.save();
    const pkgResult = readOoxmlPackage(new Uint8Array(buffer));
    expect(pkgResult.ok).toBe(true);
    if (!pkgResult.ok) return;

    const footerPart = [...pkgResult.package.parts.values()].find((part) => part.name.includes('footer'));
    expect(footerPart).toBeTruthy();
    const xml = JSON.stringify(footerPart);
    expect(xml).toContain('PAGE');
    expect(xml).toContain('fldChar');

    editor.destroy();
    host.remove();
  });

  test('insertPageField with target: footer inserts PAGE_X_OF_Y', async () => {
    const { editor, host } = mountEditor(blankDoc());
    expect(editor.exec({ type: 'insertPageField', field: 'PAGE_X_OF_Y', target: 'footer' }).ok).toBe(true);

    const buffer = await editor.save();
    const pkgResult = readOoxmlPackage(new Uint8Array(buffer));
    expect(pkgResult.ok).toBe(true);
    if (!pkgResult.ok) return;

    const footerPart = [...pkgResult.package.parts.values()].find((part) => part.name.includes('footer'));
    expect(footerPart).toBeTruthy();
    const xml = JSON.stringify(footerPart);
    expect(xml).toContain('PAGE');
    expect(xml).toContain('NUMPAGES');

    editor.destroy();
    host.remove();
  });
});
