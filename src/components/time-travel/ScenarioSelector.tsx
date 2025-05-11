
import React from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Bitcoin, 
  TrendingDown, 
  TrendingUp, 
  DollarSign 
} from "lucide-react";
import { predefinedScenarios } from "@/data/timeTravel";

interface ScenarioSelectorProps {
  onSelect: (scenario: string) => void;
  selectedScenario: string | null;
}

export function ScenarioSelector({ onSelect, selectedScenario }: ScenarioSelectorProps) {
  return (
    <Tabs defaultValue="predefined" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="predefined">Predefined Scenarios</TabsTrigger>
        <TabsTrigger value="custom">Custom Scenario</TabsTrigger>
      </TabsList>
      
      <TabsContent value="predefined" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {predefinedScenarios.map((scenario) => (
            <Card 
              key={scenario.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedScenario === scenario.id 
                  ? "border-accent ring-1 ring-accent" 
                  : "border-border/40"
              }`}
              onClick={() => onSelect(scenario.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{scenario.name}</CardTitle>
                  {scenario.icon === "bitcoin" && <Bitcoin className="h-5 w-5 text-amber-500" />}
                  {scenario.icon === "crash" && <TrendingDown className="h-5 w-5 text-red-500" />}
                  {scenario.icon === "boom" && <TrendingUp className="h-5 w-5 text-green-500" />}
                  {scenario.icon === "dollar" && <DollarSign className="h-5 w-5 text-blue-500" />}
                </div>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Period: </span>
                  <span>{scenario.period}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Potential ROI: </span>
                  <span className={`font-medium ${scenario.potential_roi.includes("+") ? "text-green-500" : "text-red-500"}`}>
                    {scenario.potential_roi}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="custom">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Create Custom Scenario</CardTitle>
            <CardDescription>
              Coming soon! You'll be able to create your own custom investment scenarios.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
