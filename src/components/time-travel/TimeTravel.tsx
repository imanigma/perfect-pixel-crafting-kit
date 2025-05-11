
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScenarioSelector } from "./ScenarioSelector";
import { SimulationResult } from "./SimulationResult";
import { useTimetravelSimulations } from "@/hooks/useTimeTravelSimulations";
import { toast } from "@/components/ui/sonner";
import { Calendar, ArrowRight } from "lucide-react";

export function TimeTravel() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const { runSimulation, isLoading, simulation } = useTimetravelSimulations();

  const handleScenarioSelect = (scenario: string) => {
    setSelectedScenario(scenario);
    setSimulationStarted(false);
  };

  const handleStartSimulation = () => {
    if (!selectedScenario) {
      toast.error("Please select a scenario first");
      return;
    }
    
    runSimulation(selectedScenario);
    setSimulationStarted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Time-Travel Investment Dashboard</h1>
          <p className="text-muted-foreground">
            Explore how different investment decisions in the past could have affected your portfolio today
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2 tr-card overflow-hidden">
            <CardHeader className="bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Investment Time Machine</CardTitle>
                  <CardDescription>Select a historical scenario or create your own</CardDescription>
                </div>
                <Button 
                  onClick={handleStartSimulation}
                  disabled={!selectedScenario || isLoading}
                  className="bg-accent hover:bg-accent/80"
                >
                  {isLoading ? "Simulating..." : "Run Simulation"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <ScenarioSelector 
                onSelect={handleScenarioSelect} 
                selectedScenario={selectedScenario}
              />
            </CardContent>
          </Card>

          {simulationStarted && (
            <Card className="md:col-span-2 tr-card overflow-hidden">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Simulation Results</CardTitle>
                    <CardDescription>See how your investment would have performed</CardDescription>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Results based on historical data</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <SimulationResult simulation={simulation} isLoading={isLoading} />
              </CardContent>
              <CardFooter className="bg-card/50 backdrop-blur-sm border-t border-border/40 px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  These simulations are for educational purposes only and do not constitute financial advice
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
