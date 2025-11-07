
export type Strategy = 'mobile' | 'desktop';

interface PageSpeedMetric {
  percentile: number;
  category: 'GOOD' | 'NEEDS IMPROVEMENT' | 'POOR';
}

interface LoadingExperience {
  metrics?: {
    LARGEST_CONTENTFUL_PAINT_MS?: PageSpeedMetric;
    CUMULATIVE_LAYOUT_SHIFT_SCORE?: PageSpeedMetric;
    FIRST_INPUT_DELAY_MS?: PageSpeedMetric;
    INTERACTION_TO_NEXT_PAINT?: PageSpeedMetric;
  };
}

interface LighthouseAudit {
  id: string;
  title: string;
  displayValue: string;
  score: number;
}

interface LighthouseResult {
  categories: {
    performance: {
      score: number;
    };
  };
  audits: {
    [key: string]: LighthouseAudit;
    'first-contentful-paint': LighthouseAudit;
    'interactive': LighthouseAudit;
    'speed-index': LighthouseAudit;
    'total-blocking-time': LighthouseAudit;
  };
}

export interface PageSpeedResponse {
  loadingExperience: LoadingExperience;
  lighthouseResult: LighthouseResult;
}
