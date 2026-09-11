// High-quality SVG and Canvas renderer for DOCX Editor charts.

import { CHART_PALETTES, type ChartConfig, type ChartPalette } from './types';

export function getPaletteColors(paletteId: string): readonly string[] {
  const palette = CHART_PALETTES.find((p) => p.id === paletteId) ?? CHART_PALETTES[1]!;
  return palette.colors;
}

export interface RenderDimensions {
  readonly width: number;
  readonly height: number;
}

/**
 * Generate an SVG string representing the chart.
 * Dimensions default to 800x500 for crisp rendering.
 */
export function renderChartSvg(config: ChartConfig, dim: RenderDimensions = { width: 800, height: 500 }): string {
  const { width, height } = dim;
  const colors = getPaletteColors(config.palette);
  const title = config.title.trim();
  const showLegend = config.options.showLegend !== false;
  const showGrid = config.options.showGrid !== false;
  const showValues = config.options.showValues ?? false;

  const titleHeight = title ? 48 : 20;
  const legendHeight = showLegend ? 40 : 10;
  const padLeft = 60;
  const padRight = 30;
  const padTop = titleHeight;
  const padBottom = 40 + legendHeight;

  const plotW = Math.max(100, width - padLeft - padRight);
  const plotH = Math.max(100, height - padTop - padBottom);

  let elements = '';

  // Background
  elements += `<rect width="${width}" height="${height}" fill="#ffffff" rx="8"/>`;

  // Title
  if (title) {
    elements += `<text x="${width / 2}" y="32" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#111827">${escapeXml(title)}</text>`;
  }

  if (config.chartType === 'pie' || config.chartType === 'donut') {
    elements += renderPieOrDonut(config, width, height, padTop, legendHeight, colors, showLegend, showValues);
  } else if (config.chartType === 'bar') {
    elements += renderBarChart(config, padLeft, padTop, plotW, plotH, colors, showGrid, showLegend, showValues);
  } else if (config.chartType === 'line' || config.chartType === 'area') {
    elements += renderLineOrAreaChart(config, padLeft, padTop, plotW, plotH, colors, showGrid, showLegend, showValues);
  } else {
    // Default: column chart
    elements += renderColumnChart(config, padLeft, padTop, plotW, plotH, colors, showGrid, showLegend, showValues);
  }

  // Legend at bottom
  if (showLegend) {
    const legendY = height - 20;
    if (config.chartType === 'pie' || config.chartType === 'donut') {
      const cats = config.categories;
      const totalLen = cats.reduce((sum, c) => sum + c.length * 8 + 30, 0);
      let curX = Math.max(20, (width - totalLen) / 2);
      for (let i = 0; i < cats.length; i += 1) {
        const color = colors[i % colors.length]!;
        elements += `<circle cx="${curX + 6}" cy="${legendY - 4}" r="5" fill="${color}"/>`;
        elements += `<text x="${curX + 16}" y="${legendY}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#4B5563">${escapeXml(cats[i]!)}</text>`;
        curX += cats[i]!.length * 8 + 30;
      }
    } else {
      const seriesList = config.series;
      const totalLen = seriesList.reduce((sum, s) => sum + s.name.length * 8 + 30, 0);
      let curX = Math.max(20, (width - totalLen) / 2);
      for (let s = 0; s < seriesList.length; s += 1) {
        const color = seriesList[s]!.color || colors[s % colors.length]!;
        elements += `<rect x="${curX}" y="${legendY - 9}" width="12" height="10" rx="2" fill="${color}"/>`;
        elements += `<text x="${curX + 18}" y="${legendY}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#4B5563">${escapeXml(seriesList[s]!.name)}</text>`;
        curX += seriesList[s]!.name.length * 8 + 30;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${elements}</svg>`;
}

function renderColumnChart(
  config: ChartConfig,
  padLeft: number,
  padTop: number,
  plotW: number,
  plotH: number,
  colors: readonly string[],
  showGrid: boolean,
  showLegend: boolean,
  showValues: boolean
): string {
  let out = '';
  const categories = config.categories;
  const series = config.series;
  const catCount = Math.max(1, categories.length);
  const seriesCount = Math.max(1, series.length);

  // Compute value extent
  let maxVal = 0;
  for (const s of series) {
    for (const v of s.data) {
      if (v > maxVal) maxVal = v;
    }
  }
  if (maxVal <= 0) maxVal = 10;
  // Nice round max
  const niceMax = getNiceScaleMax(maxVal);
  const gridTicks = 5;

  // Gridlines & Y-Axis
  for (let i = 0; i <= gridTicks; i += 1) {
    const yVal = (niceMax / gridTicks) * i;
    const yPos = padTop + plotH - (i / gridTicks) * plotH;

    if (showGrid) {
      out += `<line x1="${padLeft}" y1="${yPos}" x2="${padLeft + plotW}" y2="${yPos}" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="${i === 0 ? 'none' : '3,3'}"/>`;
    }
    out += `<text x="${padLeft - 10}" y="${yPos + 4}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#6B7280">${formatNumber(yVal)}</text>`;
  }

  // Base X axis line
  out += `<line x1="${padLeft}" y1="${padTop + plotH}" x2="${padLeft + plotW}" y2="${padTop + plotH}" stroke="#9CA3AF" stroke-width="1.5"/>`;

  // Bars
  const groupWidth = plotW / catCount;
  const barPadding = 0.25; // padding between groups
  const innerPadding = 0.1; // padding between bars within group
  const usableGroupW = groupWidth * (1 - barPadding);
  const barW = Math.max(4, (usableGroupW - (seriesCount - 1) * innerPadding * usableGroupW) / seriesCount);

  for (let c = 0; c < catCount; c += 1) {
    const groupCenterX = padLeft + (c + 0.5) * groupWidth;
    const startX = groupCenterX - usableGroupW / 2;

    for (let s = 0; s < seriesCount; s += 1) {
      const val = series[s]?.data[c] ?? 0;
      const barH = Math.max(0, (val / niceMax) * plotH);
      const x = startX + s * (barW + innerPadding * usableGroupW);
      const y = padTop + plotH - barH;
      const color = series[s]?.color || colors[s % colors.length]!;

      out += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${color}">`;
      out += `<title>${escapeXml(series[s]?.name ?? '')}: ${val}</title></rect>`;

      if (showValues && barH > 14) {
        out += `<text x="${x + barW / 2}" y="${y - 4}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500" fill="#374151">${formatNumber(val)}</text>`;
      }
    }

    // Category Label
    const catName = categories[c] ?? '';
    out += `<text x="${groupCenterX}" y="${padTop + plotH + 20}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#4B5563">${escapeXml(catName)}</text>`;
  }

  return out;
}

function renderBarChart(
  config: ChartConfig,
  padLeft: number,
  padTop: number,
  plotW: number,
  plotH: number,
  colors: readonly string[],
  showGrid: boolean,
  showLegend: boolean,
  showValues: boolean
): string {
  let out = '';
  const categories = config.categories;
  const series = config.series;
  const catCount = Math.max(1, categories.length);
  const seriesCount = Math.max(1, series.length);

  let maxVal = 0;
  for (const s of series) {
    for (const v of s.data) {
      if (v > maxVal) maxVal = v;
    }
  }
  if (maxVal <= 0) maxVal = 10;
  const niceMax = getNiceScaleMax(maxVal);
  const gridTicks = 5;

  // X Axis Gridlines & Scale
  for (let i = 0; i <= gridTicks; i += 1) {
    const xVal = (niceMax / gridTicks) * i;
    const xPos = padLeft + (i / gridTicks) * plotW;

    if (showGrid) {
      out += `<line x1="${xPos}" y1="${padTop}" x2="${xPos}" y2="${padTop + plotH}" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="${i === 0 ? 'none' : '3,3'}"/>`;
    }
    out += `<text x="${xPos}" y="${padTop + plotH + 18}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#6B7280">${formatNumber(xVal)}</text>`;
  }

  // Base Y axis line
  out += `<line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="#9CA3AF" stroke-width="1.5"/>`;

  const rowHeight = plotH / catCount;
  const rowPadding = 0.25;
  const innerPadding = 0.1;
  const usableRowH = rowHeight * (1 - rowPadding);
  const barH = Math.max(4, (usableRowH - (seriesCount - 1) * innerPadding * usableRowH) / seriesCount);

  for (let c = 0; c < catCount; c += 1) {
    const rowCenterY = padTop + (c + 0.5) * rowHeight;
    const startY = rowCenterY - usableRowH / 2;

    // Y Axis Category Label
    const catName = categories[c] ?? '';
    out += `<text x="${padLeft - 10}" y="${rowCenterY + 4}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#4B5563">${escapeXml(catName)}</text>`;

    for (let s = 0; s < seriesCount; s += 1) {
      const val = series[s]?.data[c] ?? 0;
      const barW = Math.max(0, (val / niceMax) * plotW);
      const y = startY + s * (barH + innerPadding * usableRowH);
      const color = series[s]?.color || colors[s % colors.length]!;

      out += `<rect x="${padLeft}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${color}">`;
      out += `<title>${escapeXml(series[s]?.name ?? '')}: ${val}</title></rect>`;

      if (showValues && barW > 10) {
        out += `<text x="${padLeft + barW + 6}" y="${y + barH / 2 + 4}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500" fill="#374151">${formatNumber(val)}</text>`;
      }
    }
  }

  return out;
}

function renderLineOrAreaChart(
  config: ChartConfig,
  padLeft: number,
  padTop: number,
  plotW: number,
  plotH: number,
  colors: readonly string[],
  showGrid: boolean,
  showLegend: boolean,
  showValues: boolean
): string {
  let out = '';
  const categories = config.categories;
  const series = config.series;
  const catCount = Math.max(1, categories.length);
  const isArea = config.chartType === 'area';

  let maxVal = 0;
  for (const s of series) {
    for (const v of s.data) {
      if (v > maxVal) maxVal = v;
    }
  }
  if (maxVal <= 0) maxVal = 10;
  const niceMax = getNiceScaleMax(maxVal);
  const gridTicks = 5;

  // Gridlines & Y-Axis
  for (let i = 0; i <= gridTicks; i += 1) {
    const yVal = (niceMax / gridTicks) * i;
    const yPos = padTop + plotH - (i / gridTicks) * plotH;

    if (showGrid) {
      out += `<line x1="${padLeft}" y1="${yPos}" x2="${padLeft + plotW}" y2="${yPos}" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="${i === 0 ? 'none' : '3,3'}"/>`;
    }
    out += `<text x="${padLeft - 10}" y="${yPos + 4}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#6B7280">${formatNumber(yVal)}</text>`;
  }

  // Base X axis line
  out += `<line x1="${padLeft}" y1="${padTop + plotH}" x2="${padLeft + plotW}" y2="${padTop + plotH}" stroke="#9CA3AF" stroke-width="1.5"/>`;

  // Compute X positions
  const getX = (c: number) => {
    if (catCount === 1) return padLeft + plotW / 2;
    return padLeft + (c / (catCount - 1)) * plotW;
  };

  // Category labels
  for (let c = 0; c < catCount; c += 1) {
    const x = getX(c);
    out += `<text x="${x}" y="${padTop + plotH + 20}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#4B5563">${escapeXml(categories[c] ?? '')}</text>`;
  }

  // Render Series
  for (let s = 0; s < series.length; s += 1) {
    const sData = series[s]!;
    const color = sData.color || colors[s % colors.length]!;
    const points: { x: number; y: number; val: number }[] = [];

    for (let c = 0; c < catCount; c += 1) {
      const val = sData.data[c] ?? 0;
      const x = getX(c);
      const y = padTop + plotH - Math.max(0, (val / niceMax) * plotH);
      points.push({ x, y, val });
    }

    if (points.length === 0) continue;

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    if (isArea) {
      const areaPath = `${linePath} L ${points[points.length - 1]!.x} ${padTop + plotH} L ${points[0]!.x} ${padTop + plotH} Z`;
      out += `<path d="${areaPath}" fill="${color}" fill-opacity="0.25"/>`;
    }

    out += `<path d="${linePath}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

    // Markers
    for (const pt of points) {
      out += `<circle cx="${pt.x}" cy="${pt.y}" r="4.5" fill="#ffffff" stroke="${color}" stroke-width="2.5">`;
      out += `<title>${escapeXml(sData.name)}: ${pt.val}</title></circle>`;
      if (showValues) {
        out += `<text x="${pt.x}" y="${pt.y - 8}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500" fill="#374151">${formatNumber(pt.val)}</text>`;
      }
    }
  }

  return out;
}

function renderPieOrDonut(
  config: ChartConfig,
  width: number,
  height: number,
  padTop: number,
  legendHeight: number,
  colors: readonly string[],
  showLegend: boolean,
  showValues: boolean
): string {
  let out = '';
  const categories = config.categories;
  const series = config.series[0];
  const data = series?.data ?? [];
  const isDonut = config.chartType === 'donut';

  const total = data.reduce((sum, v) => sum + Math.max(0, v), 0);
  const centerX = width / 2;
  const centerY = padTop + (height - padTop - legendHeight) / 2;
  const radius = Math.min(centerX - 40, centerY - padTop - 20, 150);
  const innerRadius = isDonut ? radius * 0.58 : 0;

  if (total <= 0) {
    out += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="#F3F4F6"/>`;
    out += `<text x="${centerX}" y="${centerY + 5}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#9CA3AF">No Data</text>`;
    return out;
  }

  let curAngle = -Math.PI / 2; // start at top

  for (let i = 0; i < categories.length; i += 1) {
    const val = Math.max(0, data[i] ?? 0);
    const sliceAngle = (val / total) * 2 * Math.PI;
    const endAngle = curAngle + sliceAngle;
    const color = colors[i % colors.length]!;

    const x1 = centerX + radius * Math.cos(curAngle);
    const y1 = centerY + radius * Math.sin(curAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    let path = '';
    if (isDonut) {
      const ix1 = centerX + innerRadius * Math.cos(endAngle);
      const iy1 = centerY + innerRadius * Math.sin(endAngle);
      const ix2 = centerX + innerRadius * Math.cos(curAngle);
      const iy2 = centerY + innerRadius * Math.sin(curAngle);
      path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;
    } else {
      path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    }

    out += `<path d="${path}" fill="${color}" stroke="#ffffff" stroke-width="2">`;
    out += `<title>${escapeXml(categories[i]!)}: ${val} (${Math.round((val / total) * 100)}%)</title></path>`;

    // Slice percentage label
    if (showValues && sliceAngle > 0.3) {
      const midAngle = curAngle + sliceAngle / 2;
      const labelRadius = isDonut ? (radius + innerRadius) / 2 : radius * 0.65;
      const lx = centerX + labelRadius * Math.cos(midAngle);
      const ly = centerY + labelRadius * Math.sin(midAngle);
      const pct = Math.round((val / total) * 100);
      out += `<text x="${lx}" y="${ly + 4}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#ffffff">${pct}%</text>`;
    }

    curAngle = endAngle;
  }

  // Donut center summary
  if (isDonut) {
    out += `<text x="${centerX}" y="${centerY - 4}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#6B7280" font-weight="500">Total</text>`;
    out += `<text x="${centerX}" y="${centerY + 16}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#111827" font-weight="700">${formatNumber(total)}</text>`;
  }

  return out;
}

/**
 * Render chart to an offscreen HTML5 canvas at crisp 2x scale and export PNG bytes.
 */
export async function chartToPngBytes(config: ChartConfig, dim: RenderDimensions = { width: 800, height: 500 }): Promise<Uint8Array> {
  const svgString = renderChartSvg(config, dim);
  const scale = 2; // 2x high-DPI
  const canvas = document.createElement('canvas');
  canvas.width = dim.width * scale;
  canvas.height = dim.height * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas context unavailable');

  ctx.scale(scale, scale);

  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return new Promise<Uint8Array>((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, dim.width, dim.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          reject(new Error('failed to convert canvas to png blob'));
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result instanceof ArrayBuffer) {
            resolve(new Uint8Array(reader.result));
          } else {
            reject(new Error('failed to read png blob as array buffer'));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(pngBlob);
      }, 'image/png');
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load SVG into image: ${e}`));
    };
    img.src = url;
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getNiceScaleMax(max: number): number {
  if (max <= 0) return 10;
  const power = Math.pow(10, Math.floor(Math.log10(max)));
  const fraction = max / power;
  let niceFraction: number;
  if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;
  return niceFraction * power;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`;
  return Number.isInteger(num) ? String(num) : num.toFixed(1);
}
