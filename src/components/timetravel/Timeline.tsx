
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
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  ReferenceDot
} from "recharts";
import { Clock, TrendingUp, TrendingDown, RefreshCw, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";

// Historical financial events
const historicalEvents = [
  { 
    id: 1, 
    date: '2008-10-01', 
    label: '2008 Financial Crisis', 
    description: 'Global financial markets crashed following the collapse of Lehman Brothers.',
    action: 'Buy S&P 500 at historic low',
    impact: 'Investment would have grown 5x by 2023',
    price: '$735',
    x: '2008',
    y: 735
  },
  { 
    id: 2, 
    date: '2012-01-01', 
    label: 'Early Bitcoin Era', 
    description: 'Bitcoin was trading below $10 per coin with minimal adoption.',
    action: 'Buy Bitcoin at $10',
    impact: 'Investment would have grown 3,800x by 2023',
    price: '$10',
    x: '2012',
    y: 10
  },
  { 
    id: 3, 
    date: '2016-11-01', 
    label: '2016 Market Uncertainty', 
    description: 'Markets faced uncertainty during the 2016 US election period.',
    action: 'Invest in Gold as safe haven',
    impact: 'Would have gained 45% by 2023',
    price: '$1,275/oz',
    x: '2016',
    y: 1275
  },
  { 
    id: 4, 
    date: '2020-03-01', 
    label: '2020 Pandemic Crash', 
    description: 'Global markets crashed at the onset of the COVID-19 pandemic.',
    action: 'Buy tech stocks during crash',
    impact: 'Technology sector grew 150% in following 2 years',
    price: 'NASDAQ: 7,000',
    x: '2020',
    y: 7000
  },
  { 
    id: 5, 
    date: '2022-01-01', 
    label: '2022 Crypto Winter', 
    description: 'Cryptocurrency markets experienced a prolonged bear market.',
    action: 'Accumulate Ethereum at bear market prices',
    impact: 'TBD - Still evolving',
    price: '$2,400',
    x: '2022',
    y: 2400
  }
];

// Portfolio evolution data
const generatePortfolioData = (startYear = 2008, endYear = 2023, selectedEventId = null) => {
  const data = [];
  let value = 10000; // Starting with $10,000
  
  for (let year = startYear; year <= endYear; year++) {
    // Baseline growth (conservative 7% average annual)
    let growthMultiplier = 1.07;
    
    // Add special growth for events
    if (selectedEventId) {
      const event = historicalEvents.find(e => e.id === selectedEventId);
      if (event && parseInt(event.x) === year) {
        // Major boost in the event year
        growthMultiplier = event.id === 2 ? 3.0 : 1.2; // Bitcoin gets special boost
      } else if (event && parseInt(event.x) < year) {
        // Continued growth after event
        if (event.id === 1 && year < 2011) growthMultiplier = 1.15; // Financial crisis recovery
        if (event.id === 2) growthMultiplier = 1.9; // Bitcoin super growth
        if (event.id === 3 && year > 2020) growthMultiplier = 1.1; // Gold modest growth
        if (event.id === 4 && year > 2020) growthMultiplier = 1.25; // Tech stock growth after pandemic
      }
    }
    
    // Market corrections
    if ((year === 2008 || year === 2020) && (!selectedEventId || 
        (selectedEventId !== 1 && year === 2008) || 
        (selectedEventId !== 4 && year === 2020))) {
      growthMultiplier = 0.7; // 30% drop in crisis years unless prepared
    }
    
    value = Math.round(value * growthMultiplier);
    data.push({
      year: year.toString(),
      value: value,
      formattedValue: `$${(value).toLocaleString()}`
    });
  }
  
  return data;
};

export function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [altPortfolioData, setAltPortfolioData] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [sliderValue, setSliderValue] = useState([2008]);
  const [yearRange, setYearRange] = useState({ start: 2008, end: 2023 });

  // Initialize portfolio data
  useEffect(() => {
    setPortfolioData(generatePortfolioData(yearRange.start, yearRange.end));
  }, [yearRange]);

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
    toast(`Selected key event: ${event.label}`);
    
    // Generate alternate timeline
    setIsSimulating(true);
    setTimeout(() => {
      setAltPortfolioData(generatePortfolioData(yearRange.start, yearRange.end, event.id));
      setIsSimulating(false);
    }, 800);
  };

  const handleSliderChange = (values: number[]) => {
    const year = values[0];
    setSliderValue([year]);
    
    if (year > yearRange.start) {
      setYearRange(prev => ({ ...prev, end: Math.max(year, 2010) }));
    } else {
      setYearRange({ start: 2008, end: 2023 });
    }
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setAltPortfolioData([]);
    setSliderValue([2008]);
    setYearRange({ start: 2008, end: 2023 });
    toast("Timeline reset to default view");
  };

  // Calculate the gain or difference if an alternate timeline exists
  const calculateDifference = () => {
    if (!altPortfolioData.length || !portfolioData.length) return null;
    
    const lastPortfolioValue = portfolioData[portfolioData.length - 1]?.value || 0;
    const lastAltValue = altPortfolioData[altPortfolioData.length - 1]?.value || 0;
    const difference = lastAltValue - lastPortfolioValue;
    const percentChange = ((difference / lastPortfolioValue) * 100).toFixed(1);
    
    return {
      value: difference,
      percent: percentChange,
      formatted: `${difference >= 0 ? '+' : ''}$${difference.toLocaleString()} (${percentChange}%)`
    };
  };

  const difference = calculateDifference();

  return (
    <div className="space-y-6">
      <Card className="bg-[#151515] border-[#333945] text-white overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Dynamic Time-Travel Map</CardTitle>
          <CardDescription className="text-[#8E9196]">
            Select a historical event to see how different investment choices would have affected your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timeline slider */}
          <div className="pt-6">
            <Label className="mb-2 block text-[#8E9196]">Time Period: {sliderValue[0]} - {yearRange.end}</Label>
            <Slider 
              defaultValue={[2008]} 
              value={sliderValue}
              min={2008} 
              max={2023} 
              step={1} 
              onValueChange={handleSliderChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-[#8E9196]">
              <span>2008</span>
              <span>2012</span>
              <span>2016</span>
              <span>2020</span>
              <span>2023</span>
            </div>
          </div>

          {/* Main chart area */}
          <div className="h-[300px] w-full mt-6 relative">
            {isSimulating ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#151515]/70 z-10 backdrop-blur-sm rounded-lg">
                <div className="flex flex-col items-center">
                  <RefreshCw className="h-8 w-8 text-[#9b87f5] animate-spin mb-2" />
                  <p className="text-[#E8E8E8]">Simulating alternate timeline...</p>
                </div>
              </div>
            ) : null}
            
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={portfolioData}
                margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333945" />
                <XAxis 
                  dataKey="year" 
                  stroke="#8E9196" 
                  tick={{ fill: '#8E9196' }}
                />
                <YAxis 
                  stroke="#8E9196" 
                  tick={{ fill: '#8E9196' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                  labelFormatter={(label) => `Year: ${label}`}
                  contentStyle={{ backgroundColor: '#1c1c1c', borderColor: '#333945', color: '#E8E8E8' }}
                />
                
                {/* Base timeline */}
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8E9196" 
                  strokeWidth={2}
                  name="Base Timeline"
                  dot={{ r: 4, fill: '#8E9196', stroke: '#151515' }}
                />
                
                {/* Alternate timeline if selected */}
                {altPortfolioData.length > 0 && (
                  <Line 
                    type="monotone" 
                    data={altPortfolioData}
                    dataKey="value" 
                    stroke="#9b87f5" 
                    strokeWidth={3}
                    name="Alternate Timeline" 
                    dot={{ r: 4, fill: '#9b87f5', stroke: '#151515' }}
                    activeDot={{ r: 6, stroke: '#9b87f5', strokeWidth: 2 }}
                  />
                )}
                
                {/* Event markers */}
                {historicalEvents
                  .filter(event => parseInt(event.x) >= yearRange.start && parseInt(event.x) <= yearRange.end)
                  .map((event) => (
                    <ReferenceDot 
                      key={event.id}
                      x={event.x} 
                      y={portfolioData.find(d => d.year === event.x)?.value || 0} 
                      r={6}
                      fill={selectedEvent?.id === event.id ? '#9b87f5' : '#E5DEFF'} 
                      stroke="#151515"
                      strokeWidth={2}
                    />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key events selection */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-white">Key Historical Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {historicalEvents
                .filter(event => parseInt(event.x) >= yearRange.start && parseInt(event.x) <= yearRange.end)
                .map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer p-3 rounded-lg border transition-all ${
                    selectedEvent?.id === event.id
                      ? "border-[#9b87f5] bg-[#9b87f5]/10"
                      : "border-[#333945] hover:border-[#9b87f5]/50"
                  }`}
                  onClick={() => handleEventSelect(event)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      selectedEvent?.id === event.id ? "bg-[#9b87f5]" : "bg-[#333945]"
                    }`}>
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{event.label}</h4>
                      <p className="text-xs text-[#8E9196]">{event.x}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[#8E9196]">{event.description}</p>
                  <div className="mt-2 p-2 bg-[#1c1c1c] rounded border border-[#333945] text-xs">
                    <div className="flex items-center gap-1 text-[#E8E8E8] mb-1">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-medium">{event.action}</span>
                    </div>
                    <div className="text-[#8E9196]">{event.impact}</div>
                    <div className="mt-1 text-[#9b87f5]">{event.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Results section */}
          {selectedEvent && difference && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-[#1c1c1c] rounded-lg border border-[#9b87f5]/30"
            >
              <h3 className="text-lg font-medium mb-2 text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#9b87f5]" />
                Time Travel Outcome
              </h3>
              <p className="text-[#8E9196] mb-2">
                If you had made this investment decision during {selectedEvent.label}:
              </p>
              <div className="flex items-center gap-3 p-3 bg-[#0f0f0f] rounded border border-[#333945]">
                <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                  {difference.value >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-[#8E9196]">Portfolio Difference:</p>
                  <p className={`font-mono text-lg font-semibold ${
                    difference.value >= 0 ? "text-green-400" : "text-red-400"
                  }`}>
                    {difference.formatted}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="border-[#333945] text-[#E8E8E8] hover:bg-[#1c1c1c]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Timeline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
