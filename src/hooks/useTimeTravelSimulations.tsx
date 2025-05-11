
import { useState } from "react";
import { SimulationResult } from "@/types/timeTravel";
import { timeTravel } from "@/services/timeTravel";
import { toast } from "@/components/ui/sonner";

export function useTimetravelSimulations() {
  const [isLoading, setIsLoading] = useState(false);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);

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

  return {
    isLoading,
    simulation,
    runSimulation
  };
}
