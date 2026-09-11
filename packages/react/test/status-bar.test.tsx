// MUST be first: happy-dom registration happens on import.
import './dom-setup.js';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

import { afterEach, describe, expect, test } from 'bun:test';
import { cleanup, render } from '@testing-library/react';
import { DocxEditor } from '../src/components/DocxEditor.js';
import { DocxEditorStatusBar } from '../src/editor/DocxEditorStatusBar.js';

afterEach(cleanup);

describe('the packaged bottom status bar', () => {
  test('renders by default under the workspace', () => {
    const { container } = render(<DocxEditor />);
    const bar = container.querySelector('.docx-editor-statusbar');
    expect(bar).not.toBeNull();
    expect(bar?.getAttribute('role')).toBe('status');
  });

  test('statusBar={false} removes the status bar', () => {
    const { container } = render(<DocxEditor statusBar={false} />);
    const bar = container.querySelector('.docx-editor-statusbar');
    expect(bar).toBeNull();
  });

  test('contains page count, line/col, and zoom elements', () => {
    const { container } = render(<DocxEditor />);
    const bar = container.querySelector('.docx-editor-statusbar');
    expect(bar).not.toBeNull();
    const text = bar!.textContent ?? '';
    expect(text).toContain('Page 1 of');
    expect(text).toContain('Line');
    expect(text).toContain('Col');
    expect(text).toContain('words');
    expect(text).toContain('100%');
  });

  test('DocxEditor.StatusBar is accessible on the compound namespace', () => {
    expect(DocxEditor.StatusBar).toBe(DocxEditorStatusBar);
  });
});
