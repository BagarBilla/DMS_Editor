import { describe, expect, test } from 'bun:test';
import {
  type ChartConfig,
  type ChartType,
  CHART_PALETTES,
  createDefaultChartConfig,
  isChartDescription,
  parseChartConfig,
  renderChartSvg,
  serializeChartConfig,
} from '../src/editor/charts/index.js';
import { CHROME_GROUPS, CHROME_MENUS } from '@docx-editor.dev/core/editor';

describe('Chart configuration serialization and parsing', () => {
  test('creates default chart config with column type', () => {
    const config = createDefaultChartConfig('column');
    expect(config.chartType).toBe('column');
    expect(config.categories.length).toBeGreaterThan(0);
    expect(config.series.length).toBeGreaterThan(0);
    expect(config.palette).toBe('vibrant');
    expect(config.options.showLegend).toBe(true);
    expect(config.options.showGrid).toBe(true);
  });

  test('creates default chart config for all 6 chart types', () => {
    const types: ChartType[] = ['column', 'bar', 'line', 'area', 'pie', 'donut'];
    for (const t of types) {
      const config = createDefaultChartConfig(t);
      expect(config.chartType).toBe(t);
      expect(config.title).toBeDefined();
    }
  });

  test('serializes and round-trips chart config accurately', () => {
    const original = createDefaultChartConfig('pie');
    const updated: ChartConfig = {
      ...original,
      title: 'Quarterly Market Share',
      categories: ['Product A', 'Product B', 'Product C'],
      series: [{ name: 'Share %', data: [45, 35, 20] }],
      options: { ...original.options, showValues: true },
    };

    const serialized = serializeChartConfig(updated);
    expect(isChartDescription(serialized)).toBe(true);
    expect(serialized.startsWith('chart:{')).toBe(true);

    const parsed = parseChartConfig(serialized);
    expect(parsed).not.toBeNull();
    expect(parsed?.chartType).toBe('pie');
    expect(parsed?.title).toBe('Quarterly Market Share');
    expect(parsed?.categories).toEqual(['Product A', 'Product B', 'Product C']);
    expect(parsed?.series).toEqual([{ name: 'Share %', data: [45, 35, 20] }]);
    expect(parsed?.options.showValues).toBe(true);
  });

  test('returns null for non-chart descriptions', () => {
    expect(isChartDescription('An image of a cat')).toBe(false);
    expect(parseChartConfig('An image of a cat')).toBeNull();
    expect(parseChartConfig('')).toBeNull();
    expect(parseChartConfig('chart:invalid-json')).toBeNull();
  });
});

describe('Chart SVG rendering', () => {
  const types: ChartType[] = ['column', 'bar', 'line', 'area', 'pie', 'donut'];

  for (const t of types) {
    test(`renders valid SVG string for ${t} chart`, () => {
      const config = createDefaultChartConfig(t);
      const svg = renderChartSvg(config, { width: 600, height: 400 });

      expect(svg).toContain('<svg');
      expect(svg).toContain('viewBox="0 0 600 400"');
      expect(svg).toContain('</svg>');
      // Should include chart title
      if (config.title) {
        expect(svg).toContain(config.title);
      }
      // Should include legend category or series
      if (config.options.showLegend) {
        expect(svg).toContain(t === 'pie' || t === 'donut' ? config.categories[0] : config.series[0].name);
      }
    });
  }

  test('renders column chart with bars and grid lines', () => {
    const config = createDefaultChartConfig('column');
    const updated: ChartConfig = {
      ...config,
      options: { ...config.options, showGrid: true, showValues: true },
    };
    const svg = renderChartSvg(updated, { width: 500, height: 300 });

    expect(svg).toContain('<rect');
    expect(svg).toContain('stroke="#e5e7eb"'); // grid lines
    // Should render category labels
    for (const cat of updated.categories) {
      expect(svg).toContain(cat);
    }
  });

  test('renders bar chart with horizontal bars', () => {
    const config = createDefaultChartConfig('bar');
    const updated: ChartConfig = {
      ...config,
      options: { ...config.options, showGrid: true },
    };
    const svg = renderChartSvg(updated, { width: 500, height: 300 });

    expect(svg).toContain('<rect');
    for (const cat of updated.categories) {
      expect(svg).toContain(cat);
    }
  });

  test('renders line chart with points and lines', () => {
    const config = createDefaultChartConfig('line');
    const svg = renderChartSvg(config, { width: 500, height: 300 });

    expect(svg).toContain('<polyline');
    expect(svg).toContain('<circle');
  });

  test('renders area chart with polygon', () => {
    const config = createDefaultChartConfig('area');
    const svg = renderChartSvg(config, { width: 500, height: 300 });

    expect(svg).toContain('<polygon');
    expect(svg).toContain('fill-opacity="0.25"');
  });

  test('renders pie chart with sector path slices', () => {
    const config = createDefaultChartConfig('pie');
    const svg = renderChartSvg(config, { width: 500, height: 300 });

    expect(svg).toContain('<path');
    expect(svg).toContain('d="M');
  });

  test('renders donut chart with donut hole', () => {
    const config = createDefaultChartConfig('donut');
    const svg = renderChartSvg(config, { width: 500, height: 300 });

    expect(svg).toContain('<path');
    expect(svg).toContain('d="M');
  });

  test('respects palette colors', () => {
    const config = createDefaultChartConfig('column');
    const updated: ChartConfig = {
      ...config,
      palette: 'emerald',
    };
    const svg = renderChartSvg(updated, { width: 500, height: 300 });

    const emeraldColors = CHART_PALETTES.find((p) => p.id === 'emerald')!.colors;
    expect(svg).toContain(emeraldColors[0]);
  });

  test('hides gridlines and legend when disabled', () => {
    const config = createDefaultChartConfig('column');
    const updated: ChartConfig = {
      ...config,
      options: { ...config.options, showGrid: false, showLegend: false },
    };
    const svg = renderChartSvg(updated, { width: 500, height: 300 });

    expect(svg).not.toContain('stroke="#e5e7eb"');
  });
});

describe('Chart menu registration in core chrome', () => {
  test('CHROME_MENUS insert menu contains chart.insert', () => {
    const insertMenu = CHROME_MENUS.find((m) => m.id === 'insert');
    expect(insertMenu).toBeDefined();

    const chartItem = insertMenu?.entries.find(
      (entry) => entry.kind === 'item' && entry.slot === 'chart.insert'
    );
    expect(chartItem).toBeDefined();
  });

  test('CHROME_GROUPS includes chart group with table_chart icon', () => {
    const chartGroup = CHROME_GROUPS['chart'];
    expect(chartGroup).toBeDefined();
    expect(chartGroup.icon).toBe('table_chart');
  });
});
