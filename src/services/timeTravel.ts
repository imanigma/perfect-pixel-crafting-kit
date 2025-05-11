import { SimulationResult } from "@/types/timeTravel";
import { predefinedScenarios, mockSimulationResults } from "@/data/timeTravel";

/**
 * Time Travel Investment Service
 * Simulates alternative investment scenarios based on historical data
 */
export const timeTravel = {
  /**
   * Get all available predefined scenarios
   */
  getScenarios() {
    return predefinedScenarios;
  },

  /**
   * Simulate a specific investment scenario
   * @param scenarioId The ID of the scenario to simulate
   */
  async simulateScenario(scenarioId: string): Promise<SimulationResult> {
    // In a real app, this would call an API or run calculations
    // For now, we'll simulate a delay and return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = mockSimulationResults[scenarioId];
        if (result) {
          resolve(result);
        } else {
          // If no result exists for this ID, generate a random one
          const baseScenarioId = scenarioId.split('-')[0];
          const scenario = predefinedScenarios.find(s => s.id === baseScenarioId);
          if (scenario) {
            resolve(generateMockResultForScenario(scenario, scenarioId));
          } else {
            throw new Error(`No scenario found with ID: ${scenarioId}`);
          }
        }
      }, 1500); // Simulate network delay
    });
  },

  /**
   * Generate risk-based simulation for alternate reality views
   * @param baseScenarioId The base scenario ID
   * @param riskProfile The risk profile (conservative, moderate, aggressive)
   */
  async generateRiskBasedSimulation(baseScenarioId: string, riskProfile: 'conservative' | 'moderate' | 'aggressive'): Promise<SimulationResult> {
    const scenario = predefinedScenarios.find(s => s.id === baseScenarioId);
    if (!scenario) {
      throw new Error(`No scenario found with ID: ${baseScenarioId}`);
    }
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a variant of the scenario based on risk profile
        const result = generateMockResultForScenario(scenario, `${baseScenarioId}-${riskProfile}`, riskProfile);
        resolve(result);
      }, 1000);
    });
  },

  /**
   * Create a custom simulation
   * (To be implemented in the future)
   */
  async createCustomSimulation(params: any): Promise<SimulationResult> {
    // This would be implemented in the future
    throw new Error("Not implemented yet");
  }
};

/**
 * Generate a plausible mock result for any scenario
 * This is used as a fallback when we don't have pre-defined results
 */
function generateMockResultForScenario(
  scenario: any, 
  scenarioId: string,
  riskProfile: 'conservative' | 'moderate' | 'aggressive' | null = null
): SimulationResult {
  // Generate random performance data based on scenario and risk profile
  const years = 10;
  const initialValue = 10000;
  
  // Determine multiplier based on scenario and risk profile
  let baseMultiplier = scenario.id.includes("bitcoin") ? 100 : 
                     scenario.id.includes("crash") ? 0.5 :
                     scenario.id.includes("tech") ? 5 : 2;
  
  // Adjust for risk profile if specified
  if (riskProfile) {
    switch (riskProfile) {
      case 'conservative':
        baseMultiplier = Math.max(1.3, baseMultiplier * 0.4);
        break;
      case 'moderate':
        // Moderate uses the base multiplier
        break;
      case 'aggressive':
        baseMultiplier = scenario.id.includes("crash") ? 0.2 : baseMultiplier * 1.8;
        break;
    }
  }
  
  const finalValue = initialValue * baseMultiplier;
  const percentageGain = ((finalValue / initialValue) - 1) * 100;
  
  // Generate chart data with appropriate volatility based on risk profile
  const chartData = [];
  let volatilityFactor = 1;
  
  if (riskProfile === 'conservative') volatilityFactor = 0.5;
  if (riskProfile === 'aggressive') volatilityFactor = 2.5;
  
  // Generate more realistic market movements
  let currentValue = initialValue;
  for (let i = 0; i <= years; i++) {
    const progress = i / years;
    
    // Base growth factor
    let growthFactor;
    if (scenario.id.includes("crash") && progress > 0.6 && progress < 0.8) {
      // Simulate market crash with sharp decline
      growthFactor = 0.6;
    } else {
      // Normal growth pattern
      growthFactor = Math.pow(baseMultiplier, progress);
    }
    
    // Add volatility based on risk profile
    let volatility = 0;
    if (i > 0) {
      volatility = (Math.random() * 0.2 - 0.1) * volatilityFactor;
      // More extreme volatility for aggressive portfolios
      if (riskProfile === 'aggressive' && Math.random() > 0.8) {
        volatility = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 0.4 * volatilityFactor;
      }
    }
    
    // Calculate value with growth and volatility
    currentValue = initialValue * growthFactor * (1 + volatility);
    // Ensure non-negative values
    currentValue = Math.max(currentValue, initialValue * 0.1);
    
    const date = `${2010 + i}`;
    const simulatedValue = Math.round(currentValue);
    const marketValue = Math.round(initialValue * (1 + progress * 0.7));
    
    chartData.push({ date, simulatedValue, marketValue });
  }
  
  // Generate insights based on the scenario and risk profile
  const insights = [];
  if (riskProfile) {
    switch (riskProfile) {
      case 'conservative':
        insights.push({
          type: 'positive',
          text: "This conservative approach provided steady growth with minimal volatility, prioritizing capital preservation."
        });
        insights.push({
          type: 'neutral',
          text: `The conservative strategy would have yielded a ${Math.round(percentageGain)}% return, with significantly lower risk than more aggressive approaches.`
        });
        break;
      case 'moderate':
        insights.push({
          type: 'positive',
          text: "The balanced approach delivered solid returns while managing downside risk during market fluctuations."
        });
        insights.push({
          type: 'neutral',
          text: `This moderate strategy achieved a ${Math.round(percentageGain)}% return, balancing growth potential with reasonable risk tolerance.`
        });
        break;
      case 'aggressive':
        if (percentageGain > 100) {
          insights.push({
            type: 'positive',
            text: `This high-risk strategy generated exceptional returns of ${Math.round(percentageGain)}%, significantly outperforming conservative approaches.`
          });
        } else {
          insights.push({
            type: 'negative',
            text: "The aggressive approach experienced substantial volatility, with dramatic swings in portfolio value."
          });
        }
        insights.push({
          type: 'neutral',
          text: "High-risk strategies can deliver superior returns but require strong conviction and ability to withstand significant drawdowns."
        });
        break;
    }
  } else {
    insights.push({
      type: 'positive',
      text: baseMultiplier > 1 ? 
        `Your investment would have outperformed the market by ${Math.round((baseMultiplier - 1) * 100)}%` : 
        "While this investment didn't perform well, it's a valuable learning opportunity"
    });
    insights.push({
      type: 'neutral',
      text: "Past performance is not indicative of future results. This simulation is for educational purposes only."
    });
  }
  
  // Generate realistic events based on the scenario
  const events = [
    {
      date: "2010",
      description: "Initial Investment",
      impact: 0
    }
  ];
  
  // Add scenario-specific events
  if (scenario.id.includes("bitcoin")) {
    events.push({
      date: "2013",
      description: "Bitcoin price surge",
      impact: 120
    });
    events.push({
      date: "2017",
      description: "Cryptocurrency boom",
      impact: 250
    });
    events.push({
      date: "2018",
      description: "Crypto market crash",
      impact: -70
    });
    events.push({
      date: "2021",
      description: "New all-time highs",
      impact: 180
    });
  } else if (scenario.id.includes("tech")) {
    events.push({
      date: "2013",
      description: "Tech sector growth",
      impact: 45
    });
    events.push({
      date: "2016",
      description: "Cloud computing expansion",
      impact: 60
    });
    events.push({
      date: "2020",
      description: "Pandemic tech acceleration",
      impact: 75
    });
    events.push({
      date: "2022",
      description: "Tech sector correction",
      impact: -30
    });
  } else if (scenario.id.includes("crash")) {
    events.push({
      date: "2007",
      description: "Early warning signs",
      impact: -10
    });
    events.push({
      date: "2008",
      description: "Financial crisis peaks",
      impact: -45
    });
    events.push({
      date: "2009",
      description: "Market bottoms out",
      impact: -20
    });
    events.push({
      date: "2011",
      description: "Recovery begins",
      impact: 30
    });
  } else {
    events.push({
      date: "2013",
      description: "Market rally",
      impact: 25
    });
    events.push({
      date: "2017",
      description: "Economic expansion",
      impact: 30
    });
    events.push({
      date: "2020",
      description: "COVID-19 market impact",
      impact: -35
    });
    events.push({
      date: "2022",
      description: "Inflation concerns",
      impact: -15
    });
  }
  
  // Final value is the last data point from the chart
  const actualFinalValue = chartData[chartData.length - 1].simulatedValue;
  const actualPercentageGain = ((actualFinalValue / initialValue) - 1) * 100;
  
  return {
    id: `sim-${scenarioId}`,
    scenarioId: scenarioId,
    initialInvestment: "$10,000",
    finalValue: `$${actualFinalValue.toLocaleString()}`,
    percentageGain: Math.round(actualPercentageGain),
    timeSpan: "10 years",
    chartData,
    insights,
    events
  };
}
