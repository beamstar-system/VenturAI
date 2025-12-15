export interface SwotItem {
  point: string;
  details: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface AnalysisResult {
  score: number;
  oneLineVerdict: string;
  executiveSummary: string;
  swot: SwotAnalysis;
  marketingHooks: string[];
  estimatedMarketSize: string;
}

export enum AppStep {
  LANDING = 'LANDING',
  ANALYZING = 'ANALYZING',
  PREVIEW = 'PREVIEW',
  LOCKED_DASHBOARD = 'LOCKED_DASHBOARD',
  FULL_DASHBOARD = 'FULL_DASHBOARD'
}

export interface LeadData {
  name: string;
  email: string;
  companyName?: string;
  role?: string;
}