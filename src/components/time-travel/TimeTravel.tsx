
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScenarioSelector } from "./ScenarioSelector";
import { SimulationResult } from "./SimulationResult";
import { TimeTravelMap } from "./TimeTravelMap";
import { AlternateRealities } from "./AlternateRealities";
import { useTimetravelSimulations } from "@/hooks/useTimeTravelSimulations";
import { toast } from "@/components/ui/sonner";
import { Calendar, ArrowRight, History, GitCompareArrows } from "lucide-react";

export function TimeTravel() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("scenario");
  const { runSimulation, runMultipleSimulations, isLoading, simulation, multipleSimulations } = useTimetravelSimulations();

  const handleScenarioSelect = (scenario: string) => {
    setSelectedScenario(scenario);
    setSimulationStarted(false);
  };

  const handleStartSimulation = () => {
    if (!selectedScenario) {
      toast.error("Please select a scenario first");
      return;
    }
    
    if (activeTab === "scenario") {
      runSimulation(selectedScenario);
    } else if (activeTab === "timeline") {
      // The map handles its own simulations
    } else if (activeTab === "realities") {
      runMultipleSimulations(selectedScenario);
    }
    setSimulationStarted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Time-Travel Investment Dashboard</h1>
          <p className="text-muted-foreground">
            Explore how different investment decisions could have reshaped your financial future
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <TabsList className="md:w-auto">
              <TabsTrigger value="scenario">
                <Calendar className="mr-2 h-4 w-4" />
                Scenario Selector
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <History className="mr-2 h-4 w-4" />
                Timeline Explorer
              </TabsTrigger>
              <TabsTrigger value="realities">
                <GitCompareArrows className="mr-2 h-4 w-4" />
                Alternate Realities
              </TabsTrigger>
            </TabsList>
            
            {activeTab !== "timeline" && (
              <Button 
                onClick={handleStartSimulation}
                disabled={!selectedScenario || isLoading}
                className="bg-accent hover:bg-accent/80"
              >
                {isLoading ? "Simulating..." : "Run Simulation"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            )}
          </div>
          
          <TabsContent value="scenario" className="space-y-6">
            <Card className="tr-card overflow-hidden">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Investment Time Machine</CardTitle>
                    <CardDescription>Select a historical scenario or create your own</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <ScenarioSelector 
                  onSelect={handleScenarioSelect} 
                  selectedScenario={selectedScenario}
                />
              </CardContent>
            </Card>

            {simulationStarted && activeTab === "scenario" && (
              <Card className="tr-card overflow-hidden">
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
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <TimeTravelMap />
          </TabsContent>
          
          <TabsContent value="realities" className="space-y-6">
            <Card className="tr-card overflow-hidden">
              <CardHeader className="bg-card/50 backdrop-blur-sm">
                <div className="flex flex-col">
                  <CardTitle>Alternate Realities Simulator</CardTitle>
                  <CardDescription>Compare multiple investment scenarios side-by-side</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ScenarioSelector 
                  onSelect={handleScenarioSelect} 
                  selectedScenario={selectedScenario}
                />
              </CardContent>
            </Card>
            
            {simulationStarted && activeTab === "realities" && (
              <AlternateRealities 
                simulations={multipleSimulations} 
                isLoading={isLoading} 
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
