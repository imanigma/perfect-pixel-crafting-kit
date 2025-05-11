
export interface SimulationResult {
  id: string;
  scenarioId: string;
  initialInvestment: string;
  finalValue: string;
  percentageGain: number;
  timeSpan: string;
  chartData: ChartDataPoint[];
  insights: Insight[];
  events: TimelineEvent[];
}

export interface ChartDataPoint {
  date: string;
  simulatedValue: number;
  marketValue: number;
}

export interface Insight {
  type: 'positive' | 'negative' | 'neutral';
  text: string;
}

export interface TimelineEvent {
  date: string;
  description: string;
  impact: number;
}

export interface ScenarioDefinition {
  id: string;
  name: string;
  description: string;
  period: string;
  potential_roi: string;
  icon: string;
}
