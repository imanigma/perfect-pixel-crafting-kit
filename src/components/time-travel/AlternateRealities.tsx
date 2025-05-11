
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { SimulationResult } from "@/types/timeTravel";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface AlternateRealitiesProps {
  simulations: { 
    conservative: SimulationResult | null;
    moderate: SimulationResult | null;
    aggressive: SimulationResult | null;
  } | null;
  isLoading: boolean;
}

export function AlternateRealities({ simulations, isLoading }: AlternateRealitiesProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(value);
  };

  // Prepare combined chart data
  const prepareCombinedChartData = () => {
    if (!simulations) return [];
    
    // Get the first simulation with data to determine the structure
    const referenceSim = simulations.conservative || simulations.moderate || simulations.aggressive;
    if (!referenceSim) return [];
    
    return referenceSim.chartData.map((point, index) => {
      const date = point.date;
      const conservative = simulations.conservative?.chartData[index]?.simulatedValue || 0;
      const moderate = simulations.moderate?.chartData[index]?.simulatedValue || 0;
      const aggressive = simulations.aggressive?.chartData[index]?.simulatedValue || 0;
      const market = point.marketValue;
      
      return { date, conservative, moderate, aggressive, market };
    });
  };

  const combinedChartData = prepareCombinedChartData();

  return (
    <>
      <Card className="tr-card overflow-hidden">
        <CardHeader className="bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alternate Realities</CardTitle>
              <CardDescription>Compare different investment approaches side by side</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-[300px] w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
              </div>
            </div>
          ) : !simulations ? (
            <div className="flex flex-col items-center justify-center py-10">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No simulation data</p>
              <p className="text-muted-foreground text-center mt-1">
                Select a scenario and run the simulation to compare alternate realities
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Combined Chart */}
              <div className="bg-card/50 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Portfolio Value Comparison</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={combinedChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), '']} 
                        labelFormatter={(label) => `Year: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="conservative" 
                        name="Conservative" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="moderate" 
                        name="Moderate" 
                        stroke="#8b5cf6" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="aggressive" 
                        name="Aggressive" 
                        stroke="#ec4899" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        name="Market Average" 
                        stroke="#94a3b8" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Reality Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Conservative Reality */}
                <Card className="border-blue-500/30 bg-gradient-to-b from-blue-500/5 to-transparent">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-500">Conservative</CardTitle>
                      <div className="bg-blue-500/10 p-2 rounded-full">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                    <CardDescription>Lower risk, steady returns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Final Value</p>
                        <div className="flex items-baseline">
                          <p className="text-xl font-bold">
                            {simulations.conservative?.finalValue || "$0"}
                          </p>
                          <span className="ml-2 text-sm text-blue-500">
                            +{simulations.conservative?.percentageGain || 0}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <div className="mt-1 h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Low volatility</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-blue-500/20 text-sm text-muted-foreground">
                    Ideal for preserving capital with modest growth
                  </CardFooter>
                </Card>
                
                {/* Moderate Reality */}
                <Card className="border-purple-500/30 bg-gradient-to-b from-purple-500/5 to-transparent">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-500">Moderate</CardTitle>
                      <div className="bg-purple-500/10 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                      </div>
                    </div>
                    <CardDescription>Balanced risk and return</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Final Value</p>
                        <div className="flex items-baseline">
                          <p className="text-xl font-bold">
                            {simulations.moderate?.finalValue || "$0"}
                          </p>
                          <span className="ml-2 text-sm text-purple-500">
                            +{simulations.moderate?.percentageGain || 0}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <div className="mt-1 h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "60%" }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Medium volatility</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-purple-500/20 text-sm text-muted-foreground">
                    Suitable for long-term growth with manageable risk
                  </CardFooter>
                </Card>
                
                {/* Aggressive Reality */}
                <Card className="border-pink-500/30 bg-gradient-to-b from-pink-500/5 to-transparent">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-pink-500">Aggressive</CardTitle>
                      <div className="bg-pink-500/10 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-pink-500" />
                      </div>
                    </div>
                    <CardDescription>High risk, high potential return</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Final Value</p>
                        <div className="flex items-baseline">
                          <p className="text-xl font-bold">
                            {simulations.aggressive?.finalValue || "$0"}
                          </p>
                          <span className="ml-2 text-sm text-pink-500">
                            +{simulations.aggressive?.percentageGain || 0}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <div className="mt-1 h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-pink-500 rounded-full" style={{ width: "90%" }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">High volatility</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-pink-500/20 text-sm text-muted-foreground">
                    For maximum growth potential with significant volatility
                  </CardFooter>
                </Card>
              </div>
              
              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Investment Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-blue-500/10 p-2 rounded-full">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-500">Conservative Strategy</h4>
                      <p className="text-sm">
                        {simulations.conservative?.insights[0]?.text || 
                        "This approach prioritizes capital preservation with consistent, modest returns. This strategy typically invests in bonds, dividend stocks, and other stable assets."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-purple-500/10 p-2 rounded-full">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-500">Moderate Strategy</h4>
                      <p className="text-sm">
                        {simulations.moderate?.insights[0]?.text || 
                        "A balanced approach that seeks growth while managing downside risk. This strategy typically includes a mix of growth stocks, index funds, and some alternative investments."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-pink-500/10 p-2 rounded-full">
                      <TrendingDown className="h-4 w-4 text-pink-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-pink-500">Aggressive Strategy</h4>
                      <p className="text-sm">
                        {simulations.aggressive?.insights[0]?.text || 
                        "Focused on maximum growth potential, accepting higher volatility and risk. This approach typically invests in growth stocks, emerging markets, cryptocurrencies, and other high-potential assets."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
