// Chart configuration and serialization types for DOCX Editor charts.

export type ChartType = 'column' | 'bar' | 'line' | 'area' | 'pie' | 'donut';

export interface ChartSeries {
  readonly name: string;
  readonly data: number[];
  readonly color?: string;
}

export interface ChartOptions {
  readonly showLegend?: boolean;
  readonly showGrid?: boolean;
  readonly showValues?: boolean;
}

export interface ChartPalette {
  readonly id: string;
  readonly name: string;
  readonly colors: readonly string[];
}

export const CHART_PALETTES: readonly ChartPalette[] = [
  {
    id: 'classic',
    name: 'Classic Modern',
    colors: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
  },
  {
    id: 'vibrant',
    name: 'Vibrant Multi',
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    colors: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
  },
  {
    id: 'sunset',
    name: 'Warm Sunset',
    colors: ['#EA580C', '#F97316', '#FB923C', '#FBBF24', '#FCD34D'],
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    colors: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'],
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: ['#0284C7', '#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD'],
  },
];

export interface ChartConfig {
  readonly version: 1;
  readonly chartType: ChartType;
  readonly title: string;
  readonly categories: readonly string[];
  readonly series: readonly ChartSeries[];
  readonly options: ChartOptions;
  readonly palette: string;
  readonly widthPoints?: number;
  readonly heightPoints?: number;
}

const CHART_PREFIX = 'chart:';

export function serializeChartConfig(config: ChartConfig): string {
  return `${CHART_PREFIX}${JSON.stringify(config)}`;
}

export function parseChartConfig(raw: string | undefined | null): ChartConfig | null {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed.startsWith(CHART_PREFIX)) return null;
  try {
    const json = JSON.parse(trimmed.slice(CHART_PREFIX.length));
    if (json && json.version === 1 && typeof json.chartType === 'string') {
      return json as ChartConfig;
    }
  } catch {
    // Malformed JSON falls through to null
  }
  return null;
}

export function isChartDescription(raw: string | undefined | null): boolean {
  return typeof raw === 'string' && raw.trim().startsWith(CHART_PREFIX);
}

export function createDefaultChartConfig(type: ChartType = 'column'): ChartConfig {
  if (type === 'pie' || type === 'donut') {
    return {
      version: 1,
      chartType: type,
      title: 'Distribution Breakdown',
      categories: ['Direct', 'Referral', 'Social', 'Organic'],
      series: [
        {
          name: 'Traffic Share',
          data: [40, 25, 20, 15],
        },
      ],
      options: {
        showLegend: true,
        showGrid: false,
        showValues: true,
      },
      palette: 'vibrant',
      widthPoints: 400,
      heightPoints: 260,
    };
  }

  return {
    version: 1,
    chartType: type,
    title: 'Quarterly Performance',
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      {
        name: 'Target',
        data: [50, 65, 75, 90],
      },
      {
        name: 'Actual',
        data: [55, 70, 68, 95],
      },
    ],
    options: {
      showLegend: true,
      showGrid: true,
      showValues: false,
    },
    palette: 'vibrant',
    widthPoints: 420,
    heightPoints: 260,
  };
}
