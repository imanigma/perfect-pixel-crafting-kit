
import { useState } from "react";
import { SimulationResult } from "@/types/timeTravel";
import { timeTravel } from "@/services/timeTravel";
import { toast } from "@/components/ui/sonner";

export function useTimetravelSimulations() {
  const [isLoading, setIsLoading] = useState(false);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [multipleSimulations, setMultipleSimulations] = useState<{
    conservative: SimulationResult | null;
    moderate: SimulationResult | null;
    aggressive: SimulationResult | null;
  } | null>(null);

  const runSimulation = async (scenarioId: string) => {
    setIsLoading(true);
    try {
      // In a real app, we'd call an API endpoint here
      const result = await timeTravel.simulateScenario(scenarioId);
      setSimulation(result);
      toast.success("Simulation completed successfully");
    } catch (error) {
      console.error("Error running simulation:", error);
      toast.error("Failed to run simulation. Please try again.");
      setSimulation(null);
    } finally {
      setIsLoading(false);
    }
  };

  const runMultipleSimulations = async (baseScenarioId: string) => {
    setIsLoading(true);
    try {
      // Generate multiple simulations with different risk profiles
      const conservativePromise = timeTravel.simulateScenario(`${baseScenarioId}-conservative`);
      const moderatePromise = timeTravel.simulateScenario(baseScenarioId);
      const aggressivePromise = timeTravel.simulateScenario(`${baseScenarioId}-aggressive`);
      
      const [conservative, moderate, aggressive] = await Promise.all([
        conservativePromise.catch(() => timeTravel.generateRiskBasedSimulation(baseScenarioId, 'conservative')),
        moderatePromise,
        aggressivePromise.catch(() => timeTravel.generateRiskBasedSimulation(baseScenarioId, 'aggressive'))
      ]);
      
      setMultipleSimulations({
        conservative,
        moderate,
        aggressive
      });
      
      toast.success("Multiple simulations completed");
    } catch (error) {
      console.error("Error running multiple simulations:", error);
      toast.error("Failed to generate alternate realities. Please try again.");
      setMultipleSimulations(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    simulation,
    multipleSimulations,
    runSimulation,
    runMultipleSimulations
  };
}
