
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Gauge,
  DollarSign,
  ShieldAlert,
  Sparkles 
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Asset classes with their characteristics
const assetClasses = [
  { id: 'stocks', name: 'Stocks', averageReturn: 10, risk: 7, color: '#3b82f6' },
  { id: 'bonds', name: 'Bonds', averageReturn: 5, risk: 3, color: '#84cc16' },
  { id: 'realestate', name: 'Real Estate', averageReturn: 8, risk: 5, color: '#f97316' },
  { id: 'crypto', name: 'Cryptocurrency', averageReturn: 25, risk: 10, color: '#8b5cf6' },
  { id: 'gold', name: 'Gold', averageReturn: 6, risk: 4, color: '#eab308' },
  { id: 'cash', name: 'Cash', averageReturn: 2, risk: 1, color: '#94a3b8' },
];

// Market conditions that will affect simulations
const marketConditions = [
  { id: 'bull', name: 'Bull Market', multiplier: 1.5, volatility: 0.8 },
  { id: 'bear', name: 'Bear Market', multiplier: 0.6, volatility: 1.3 },
  { id: 'normal', name: 'Normal Market', multiplier: 1.0, volatility: 1.0 },
  { id: 'volatile', name: 'Volatile Market', multiplier: 1.2, volatility: 1.8 },
];

// Helper function to generate timeline data based on parameters
const generateTimelineData = (
  initialInvestment: number,
  years: number,
  assetClass: string,
  riskTolerance: number = 5,
  marketCondition: string = 'normal'
) => {
  const asset = assetClasses.find(a => a.id === assetClass) || assetClasses[0];
  const market = marketConditions.find(m => m.id === marketCondition) || marketConditions[2];
  
  const data = [];
  let currentValue = initialInvestment;
  
  // Calculate base yearly return adjusted for risk and market
  const baseYearlyReturn = (asset.averageReturn * market.multiplier) / 100;
  const volatility = (asset.risk / 10) * market.volatility;
  
  // Generate data for each year
  for (let year = 0; year <= years; year++) {
    // Add some randomness based on volatility
    let yearlyVariance = (Math.random() * 2 - 1) * volatility * 10;
    let yearlyReturn = baseYearlyReturn + yearlyVariance / 100;
    
    // Adjust return based on risk tolerance (1-10 scale)
    yearlyReturn = yearlyReturn * (riskTolerance / 5);
    
    // Ensure minimum return isn't catastrophic
    if (yearlyReturn < -0.5) yearlyReturn = -0.5;
    
    // Calculate new value
    currentValue = currentValue * (1 + yearlyReturn);
    
    // Add data point
    data.push({
      year,
      value: Math.round(currentValue),
      formattedValue: `$${Math.round(currentValue).toLocaleString()}`,
    });
  }
  
  return data;
};

// Calculate risk metrics
const calculateRiskMetrics = (
  data: any[], 
  initialInvestment: number,
  riskTolerance: number,
  assetId: string
) => {
  const asset = assetClasses.find(a => a.id === assetId) || assetClasses[0];
  const finalValue = data[data.length - 1]?.value || initialInvestment;
  const totalReturn = ((finalValue - initialInvestment) / initialInvestment) * 100;
  
  // Calculate max drawdown
  let maxDrawdown = 0;
  let peak = data[0]?.value || initialInvestment;
  
  for (const point of data) {
    if (point.value > peak) {
      peak = point.value;
    } else {
      const drawdown = (peak - point.value) / peak;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
  }
  
  // Calculate volatility (simplified)
  const volatility = asset.risk * (riskTolerance / 5);
  
  return {
    totalReturn: totalReturn.toFixed(1),
    cagr: ((Math.pow(finalValue / initialInvestment, 1 / data.length) - 1) * 100).toFixed(1),
    maxDrawdown: (maxDrawdown * 100).toFixed(1),
    volatility: volatility.toFixed(1),
    riskReward: (totalReturn / (volatility * maxDrawdown * 100)).toFixed(2),
  };
};

export function AlternateRealitySimulator() {
  // State for form controls
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [investmentYears, setInvestmentYears] = useState(10);
  const [riskTolerance, setRiskTolerance] = useState([5]);
  
  // State for the three timelines
  const [conservativeAsset, setConservativeAsset] = useState('bonds');
  const [balancedAsset, setBalancedAsset] = useState('stocks');
  const [aggressiveAsset, setAggressiveAsset] = useState('crypto');
  
  const [marketCondition, setMarketCondition] = useState('normal');
  
  // State for timeline data
  const [conservativeData, setConservativeData] = useState<any[]>([]);
  const [balancedData, setBalancedData] = useState<any[]>([]);
  const [aggressiveData, setAggressiveData] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Risk metrics for each timeline
  const [metrics, setMetrics] = useState({
    conservative: { totalReturn: '0', cagr: '0', maxDrawdown: '0', volatility: '0', riskReward: '0' },
    balanced: { totalReturn: '0', cagr: '0', maxDrawdown: '0', volatility: '0', riskReward: '0' },
    aggressive: { totalReturn: '0', cagr: '0', maxDrawdown: '0', volatility: '0', riskReward: '0' },
  });
  
  // Run simulation on initial render
  useEffect(() => {
    handleRunSimulation();
  }, []);
  
  // Handle risk slider change
  const handleRiskChange = (values: number[]) => {
    setRiskTolerance(values);
  };
  
  // Handle running the simulation
  const handleRunSimulation = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      // Generate data for each timeline
      const conservative = generateTimelineData(
        initialInvestment, 
        investmentYears, 
        conservativeAsset,
        Math.max(1, riskTolerance[0] - 2),
        marketCondition
      );
      
      const balanced = generateTimelineData(
        initialInvestment,
        investmentYears,
        balancedAsset,
        riskTolerance[0],
        marketCondition
      );
      
      const aggressive = generateTimelineData(
        initialInvestment,
        investmentYears,
        aggressiveAsset,
        Math.min(10, riskTolerance[0] + 2),
        marketCondition
      );
      
      // Update state with new data
      setConservativeData(conservative);
      setBalancedData(balanced);
      setAggressiveData(aggressive);
      
      // Calculate metrics
      setMetrics({
        conservative: calculateRiskMetrics(conservative, initialInvestment, Math.max(1, riskTolerance[0] - 2), conservativeAsset),
        balanced: calculateRiskMetrics(balanced, initialInvestment, riskTolerance[0], balancedAsset),
        aggressive: calculateRiskMetrics(aggressive, initialInvestment, Math.min(10, riskTolerance[0] + 2), aggressiveAsset),
      });
      
      setIsSimulating(false);
      toast.success("Simulation completed successfully");
    }, 1200);
  };
  
  // Combine data for chart
  const combinedChartData = balancedData.map((item, index) => ({
    year: item.year,
    conservative: conservativeData[index]?.value || 0,
    balanced: item.value,
    aggressive: aggressiveData[index]?.value || 0,
  }));
  
  // Get asset colors
  const conservativeColor = assetClasses.find(a => a.id === conservativeAsset)?.color || '#94a3b8';
  const balancedColor = assetClasses.find(a => a.id === balancedAsset)?.color || '#3b82f6';
  const aggressiveColor = assetClasses.find(a => a.id === aggressiveAsset)?.color || '#8b5cf6';
  
  return (
    <div className="space-y-6">
      <Card className="bg-[#151515] border-[#333945] text-white overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Alternate Reality Simulator</CardTitle>
          <CardDescription className="text-[#8E9196]">
            Create and compare multiple investment scenarios based on your risk tolerance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Simulator controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="investment" className="text-[#8E9196]">Initial Investment</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-[#8E9196]" />
                <Input
                  id="investment"
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(parseInt(e.target.value) || 1000)}
                  className="pl-8 bg-[#1c1c1c] border-[#333945] text-white"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="years" className="text-[#8E9196]">Investment Timeline (Years)</Label>
              <Input
                id="years"
                type="number"
                min={1}
                max={30}
                value={investmentYears}
                onChange={(e) => setInvestmentYears(parseInt(e.target.value) || 5)}
                className="mt-1 bg-[#1c1c1c] border-[#333945] text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="market" className="text-[#8E9196]">Market Conditions</Label>
              <Select value={marketCondition} onValueChange={setMarketCondition}>
                <SelectTrigger className="mt-1 bg-[#1c1c1c] border-[#333945] text-white">
                  <SelectValue placeholder="Select market condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {marketConditions.map((market) => (
                      <SelectItem key={market.id} value={market.id}>
                        {market.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="risk" className="text-[#8E9196]">Risk Tolerance</Label>
                <span className="text-xs text-[#8E9196]">{riskTolerance[0]}/10</span>
              </div>
              <div className="mt-3">
                <Slider
                  id="risk"
                  defaultValue={[5]}
                  value={riskTolerance}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={handleRiskChange}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-[#8E9196]">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
          
          {/* Asset allocation selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-[#8E9196]">Conservative Asset</Label>
              <Select value={conservativeAsset} onValueChange={setConservativeAsset}>
                <SelectTrigger className="bg-[#1c1c1c] border-[#333945] text-white">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {assetClasses.filter(a => a.risk <= 5).map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#8E9196]">Balanced Asset</Label>
              <Select value={balancedAsset} onValueChange={setBalancedAsset}>
                <SelectTrigger className="bg-[#1c1c1c] border-[#333945] text-white">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {assetClasses.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#8E9196]">Aggressive Asset</Label>
              <Select value={aggressiveAsset} onValueChange={setAggressiveAsset}>
                <SelectTrigger className="bg-[#1c1c1c] border-[#333945] text-white">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {assetClasses.filter(a => a.risk >= 5).map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleRunSimulation} 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              disabled={isSimulating}
            >
              {isSimulating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Run Simulation
            </Button>
          </div>
          
          {/* Chart area */}
          <div className="h-[350px] w-full mt-6 relative">
            {isSimulating ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#151515]/70 z-10 backdrop-blur-sm rounded-lg">
                <div className="flex flex-col items-center">
                  <RefreshCw className="h-8 w-8 text-[#9b87f5] animate-spin mb-2" />
                  <p className="text-[#E8E8E8]">Simulating alternate realities...</p>
                </div>
              </div>
            ) : null}
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={combinedChartData}
                margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333945" />
                <XAxis 
                  dataKey="year" 
                  stroke="#8E9196" 
                  tick={{ fill: '#8E9196' }}
                  label={{ value: 'Years', position: 'insideBottom', fill: '#8E9196', offset: -5 }}
                />
                <YAxis 
                  stroke="#8E9196" 
                  tick={{ fill: '#8E9196' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  labelFormatter={(label) => `Year: ${label}`}
                  contentStyle={{ backgroundColor: '#1c1c1c', borderColor: '#333945', color: '#E8E8E8' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={(value) => {
                    if (value === 'conservative') return 'Conservative';
                    if (value === 'balanced') return 'Balanced';
                    if (value === 'aggressive') return 'Aggressive';
                    return value;
                  }}
                />
                
                <Area 
                  type="monotone" 
                  dataKey="conservative" 
                  name="conservative"
                  stroke={conservativeColor} 
                  fill={`${conservativeColor}40`}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balanced" 
                  name="balanced"
                  stroke={balancedColor} 
                  fill={`${balancedColor}40`}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="aggressive" 
                  name="aggressive"
                  stroke={aggressiveColor} 
                  fill={`${aggressiveColor}40`}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Results cards */}
          <h3 className="text-lg font-medium mt-4 text-white">Timeline Comparisons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Conservative Timeline Card */}
            <Card className="bg-[#1A1A1A] border-[#333945]">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: conservativeColor }}></div>
                  Conservative
                </CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription className="text-[#8E9196]">
                    {assetClasses.find(a => a.id === conservativeAsset)?.name || 'Bonds'}
                  </CardDescription>
                  <Badge variant="outline" className="bg-[#1c1c1c] border-[#333945] text-[#8E9196]">
                    Low Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Final Value:</span>
                  <span className="font-mono text-[#E8E8E8]">
                    ${conservativeData[conservativeData.length - 1]?.value.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Total Return:</span>
                  <span className={`font-mono ${
                    parseFloat(metrics.conservative.totalReturn) >= 0 
                      ? "text-green-400" : "text-red-400"
                  }`}>
                    {metrics.conservative.totalReturn}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Annual Growth:</span>
                  <span className="font-mono text-[#E8E8E8]">
                    {metrics.conservative.cagr}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#8E9196]">Max Drawdown:</span>
                  <span className="font-mono text-orange-400">
                    {metrics.conservative.maxDrawdown}%
                  </span>
                </div>
                
                <div className="text-xs p-2 bg-[#0f0f0f] rounded border border-[#333945]">
                  <p className="text-[#8E9196]">
                    This conservative approach offers stable growth with minimal volatility. 
                    You sacrifice potential higher returns for increased security and peace of mind.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Balanced Timeline Card */}
            <Card className="bg-[#1A1A1A] border-[#333945]">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: balancedColor }}></div>
                  Balanced
                </CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription className="text-[#8E9196]">
                    {assetClasses.find(a => a.id === balancedAsset)?.name || 'Stocks'}
                  </CardDescription>
                  <Badge variant="outline" className="bg-[#1c1c1c] border-[#333945] text-[#8E9196]">
                    Moderate Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Final Value:</span>
                  <span className="font-mono text-[#E8E8E8]">
                    ${balancedData[balancedData.length - 1]?.value.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Total Return:</span>
                  <span className={`font-mono ${
                    parseFloat(metrics.balanced.totalReturn) >= 0 
                      ? "text-green-400" : "text-red-400"
                  }`}>
                    {metrics.balanced.totalReturn}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Annual Growth:</span>
                  <span className="font-mono text-[#E8E8E8]">
                    {metrics.balanced.cagr}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#8E9196]">Max Drawdown:</span>
                  <span className="font-mono text-orange-400">
                    {metrics.balanced.maxDrawdown}%
                  </span>
                </div>
                
                <div className="text-xs p-2 bg-[#0f0f0f] rounded border border-[#333945]">
                  <p className="text-[#8E9196]">
                    A balanced approach provides good long-term growth potential
                    while managing volatility through diversification. This strategy 
                    balances risk and reward.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Aggressive Timeline Card */}
            <Card className="bg-[#1A1A1A] border-[#333945]">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: aggressiveColor }}></div>
                  Aggressive
                </CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription className="text-[#8E9196]">
                    {assetClasses.find(a => a.id === aggressiveAsset)?.name || 'Crypto'}
                  </CardDescription>
                  <Badge variant="outline" className="bg-[#1c1c1c] border-[#333945] text-[#8E9196]">
                    High Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Final Value:</span>
                  <span className="font-mono text-[#E8E8E8]">
                    ${aggressiveData[aggressiveData.length - 1]?.value.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Total Return:</span>
                  <span className={`font-mono ${
                    parseFloat(metrics.aggressive.totalReturn) >= 0 
                      ? "text-green-400" : "text-red-400"
                  }`}>
                    {metrics.aggressive.totalReturn}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#8E9196]">Annual Growth:</span>
                  <span className="font-mono text-[#E8E8E8]">
                    {metrics.aggressive.cagr}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#8E9196]">Max Drawdown:</span>
                  <span className="font-mono text-orange-400">
                    {metrics.aggressive.maxDrawdown}%
                  </span>
                </div>
                
                <div className="text-xs p-2 bg-[#0f0f0f] rounded border border-[#333945]">
                  <p className="text-[#8E9196]">
                    This high-risk approach aims for maximum growth, accepting
                    significant volatility and potential for large drawdowns in exchange
                    for potentially outsized returns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Risk analysis */}
          <div className="mt-4">
            <Card className="bg-[#1c1c1c] border-[#333945]">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-[#9b87f5]" />
                  <CardTitle className="text-md">Risk Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#8E9196] text-sm mb-4">
                  Based on your simulated scenarios and risk tolerance of {riskTolerance[0]}/10, 
                  here's an analysis of the different investment approaches:
                </p>
                
                <div className="space-y-4">
                  <div className="text-sm">
                    <h4 className="font-medium text-white mb-1">Conservative Approach</h4>
                    <p className="text-[#8E9196]">
                      {parseFloat(metrics.conservative.totalReturn) >= 0 ? 
                        `This approach would have yielded a ${metrics.conservative.totalReturn}% total return with relatively low volatility (${metrics.conservative.volatility}).` :
                        `This approach would have resulted in a ${metrics.conservative.totalReturn}% loss with relatively low volatility (${metrics.conservative.volatility}).`
                      } The maximum drawdown was {metrics.conservative.maxDrawdown}%, making this suitable for risk-averse investors.
                    </p>
                  </div>
                  
                  <div className="text-sm">
                    <h4 className="font-medium text-white mb-1">Balanced Approach</h4>
                    <p className="text-[#8E9196]">
                      {parseFloat(metrics.balanced.totalReturn) >= 0 ? 
                        `The balanced strategy delivered a ${metrics.balanced.totalReturn}% total return with moderate volatility (${metrics.balanced.volatility}).` :
                        `The balanced strategy resulted in a ${metrics.balanced.totalReturn}% loss with moderate volatility (${metrics.balanced.volatility}).`
                      } With a maximum drawdown of {metrics.balanced.maxDrawdown}%, this represents a middle ground between safety and growth.
                    </p>
                  </div>
                  
                  <div className="text-sm">
                    <h4 className="font-medium text-white mb-1">Aggressive Approach</h4>
                    <p className="text-[#8E9196]">
                      {parseFloat(metrics.aggressive.totalReturn) >= 0 ? 
                        `The aggressive approach generated a ${metrics.aggressive.totalReturn}% total return with high volatility (${metrics.aggressive.volatility}).` :
                        `The aggressive approach resulted in a ${metrics.aggressive.totalReturn}% loss with high volatility (${metrics.aggressive.volatility}).`
                      } The significant maximum drawdown of {metrics.aggressive.maxDrawdown}% reflects the higher risk profile of this strategy.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-[#0f0f0f] rounded border border-[#9b87f5]/20">
                  <h4 className="font-medium text-[#9b87f5] mb-1">AI Recommendation</h4>
                  <p className="text-[#E8E8E8] text-sm">
                    {
                      riskTolerance[0] <= 3 ? 
                      `Based on your low risk tolerance, the conservative approach aligns best with your profile, providing steady growth while minimizing volatility.` :
                      riskTolerance[0] <= 7 ?
                      `With your moderate risk tolerance, the balanced approach offers an optimal blend of growth potential and downside protection for your long-term goals.` :
                      `Your high risk tolerance suggests you could benefit from the aggressive approach, maximizing growth potential while being prepared for significant market fluctuations.`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
