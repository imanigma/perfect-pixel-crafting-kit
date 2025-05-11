
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
          const scenario = predefinedScenarios.find(s => s.id === scenarioId);
          if (scenario) {
            resolve(generateMockResultForScenario(scenario));
          } else {
            throw new Error(`No scenario found with ID: ${scenarioId}`);
          }
        }
      }, 1500); // Simulate network delay
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
function generateMockResultForScenario(scenario: any): SimulationResult {
  // Generate random performance data
  const years = 10;
  const initialValue = 10000;
  const finalMultiplier = scenario.id.includes("bitcoin") ? 100 : 
                         scenario.id.includes("crash") ? 0.5 :
                         scenario.id.includes("tech") ? 5 : 2;
  
  const finalValue = initialValue * finalMultiplier;
  const percentageGain = ((finalValue / initialValue) - 1) * 100;
  
  // Generate chart data
  const chartData = [];
  for (let i = 0; i <= years; i++) {
    const progress = i / years;
    const factor = scenario.id.includes("crash") ? 
                  (progress < 0.7 ? 1.5 : 0.5) * (1 + progress) : 
                  Math.pow(finalMultiplier, progress);
    
    const date = `${2010 + i}`;
    const simulatedValue = Math.round(initialValue * factor);
    const marketValue = Math.round(initialValue * (1 + progress * 0.7));
    
    chartData.push({ date, simulatedValue, marketValue });
  }
  
  return {
    id: `sim-${scenario.id}`,
    scenarioId: scenario.id,
    initialInvestment: "$10,000",
    finalValue: `$${finalValue.toLocaleString()}`,
    percentageGain: Math.round(percentageGain),
    timeSpan: "10 years",
    chartData,
    insights: [
      {
        type: "positive",
        text: finalMultiplier > 1 ? 
          `Your investment would have outperformed the market by ${Math.round((finalMultiplier - 1) * 100)}%` : 
          "While this investment didn't perform well, it's a valuable learning opportunity"
      },
      {
        type: "neutral",
        text: "Past performance is not indicative of future results. This simulation is for educational purposes only."
      }
    ],
    events: [
      {
        date: "2010",
        description: "Initial Investment",
        impact: 0
      },
      {
        date: "2013",
        description: scenario.id.includes("bitcoin") ? "Bitcoin price surge" : "Market correction",
        impact: scenario.id.includes("bitcoin") ? 120 : -15
      },
      {
        date: "2017",
        description: scenario.id.includes("tech") ? "Tech sector boom" : "Market rally",
        impact: scenario.id.includes("tech") ? 80 : 25
      },
      {
        date: "2020",
        description: "COVID-19 market impact",
        impact: -35
      }
    ]
  };
}
