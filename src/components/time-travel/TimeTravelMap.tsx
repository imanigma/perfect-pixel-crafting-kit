
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, TrendingUp, TrendingDown, DollarSign, Info } from "lucide-react";
import { motion } from "framer-motion";
import { SimulationResult } from "@/types/timeTravel";
import { timeTravel } from "@/services/timeTravel";

// Define timeline events with financial milestones
const timelineEvents = [
  { 
    year: 2008, 
    event: "Financial Crisis", 
    description: "Global financial crisis triggered by the collapse of the housing market",
    scenarios: ["pre-2008-crash"],
    color: "#EF4444" // red
  },
  { 
    year: 2012, 
    event: "Early Bitcoin", 
    description: "Bitcoin price under $10 before its first major price surge",
    scenarios: ["bitcoin-2013"],
    color: "#F59E0B" // amber
  },
  { 
    year: 2013, 
    event: "Tech Boom Begins", 
    description: "The beginning of a multi-year tech stock rally",
    scenarios: ["tech-pre-boom"],
    color: "#3B82F6" // blue
  },
  { 
    year: 2020, 
    event: "COVID Market Crash", 
    description: "Global pandemic causes major market downturn",
    scenarios: ["2020-covid-dip"],
    color: "#8B5CF6" // purple
  },
  { 
    year: 2021, 
    event: "Crypto Peak", 
    description: "Bitcoin reaches all-time high near $69,000",
    scenarios: ["bitcoin-2013"],
    color: "#10B981" // green
  }
];

export function TimeTravelMap() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Run simulation when selecting an event
  useEffect(() => {
    if (selectedEvent !== null) {
      const event = timelineEvents[selectedEvent];
      if (event && event.scenarios.length > 0) {
        setIsLoading(true);
        timeTravel.simulateScenario(event.scenarios[0])
          .then(result => {
            setSimulation(result);
            setIsLoading(false);
          })
          .catch(error => {
            console.error("Error running simulation:", error);
            setIsLoading(false);
          });
      }
    }
  }, [selectedEvent]);

  // Calculate the timeline position based on year
  const getEventPosition = (year: number) => {
    const minYear = Math.min(...timelineEvents.map(e => e.year));
    const maxYear = Math.max(...timelineEvents.map(e => e.year));
    const range = maxYear - minYear;
    return ((year - minYear) / range) * 100;
  };

  // Get icon for event
  const getEventIcon = (event: typeof timelineEvents[0]) => {
    if (event.event.includes("Crash") || event.event.includes("Crisis")) {
      return <TrendingDown className="w-5 h-5" />;
    } else if (event.event.includes("Bitcoin") || event.event.includes("Crypto")) {
      return <DollarSign className="w-5 h-5" />;
    } else {
      return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <Card className="tr-card overflow-hidden">
      <CardHeader className="bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Investment Timeline Explorer</CardTitle>
            <CardDescription>Navigate through key financial moments in history</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-10 space-y-8">
          {/* Timeline */}
          <div ref={mapRef} className="relative h-20">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full transform -translate-y-1/2" />
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${getEventPosition(event.year)}%` }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline"
                      size="icon"
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedEvent === index 
                          ? `border-[${event.color}] bg-[${event.color}] text-white shadow-[0_0_15px_${event.color}]`
                          : hoveredEvent === index
                            ? `border-[${event.color}] bg-[${event.color}]/10 text-[${event.color}]`
                            : `border-[${event.color}] bg-card hover:bg-[${event.color}]/10 hover:text-[${event.color}]`
                      }`}
                      onClick={() => setSelectedEvent(index)}
                      onMouseEnter={() => setHoveredEvent(index)}
                      onMouseLeave={() => setHoveredEvent(null)}
                    >
                      {getEventIcon(event)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.event} ({event.year})</h3>
                        <Badge 
                          variant="outline"
                          style={{ color: event.color, borderColor: event.color }}
                        >
                          {event.year}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <Button 
                        size="sm" 
                        className="w-full mt-2"
                        style={{ backgroundColor: event.color }}
                        onClick={() => setSelectedEvent(index)}
                      >
                        Explore This Moment
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-medium">{event.year}</span>
                </div>
              </div>
            ))}

            {/* Year indicators */}
            <div className="absolute -bottom-8 left-0 text-xs text-muted-foreground">2008</div>
            <div className="absolute -bottom-8 right-0 text-xs text-muted-foreground">2023</div>
          </div>

          {/* Selected event information */}
          {selectedEvent !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg p-4 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium">{timelineEvents[selectedEvent].event}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{timelineEvents[selectedEvent].description}</p>
                </div>
                <Badge
                  variant="outline"
                  style={{ 
                    color: timelineEvents[selectedEvent].color,
                    borderColor: timelineEvents[selectedEvent].color
                  }}
                >
                  {timelineEvents[selectedEvent].year}
                </Badge>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Investment Opportunities:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {timelineEvents[selectedEvent].scenarios.map((scenarioId, i) => (
                    <div key={i} className="border rounded-md p-3 bg-card/80">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-primary/10">
                          {getEventIcon(timelineEvents[selectedEvent])}
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">
                            {scenarioId === "bitcoin-2013" ? "Invest in Bitcoin" :
                             scenarioId === "pre-2008-crash" ? "Avoid the Financial Crisis" :
                             scenarioId === "tech-pre-boom" ? "Tech Stock Investment" :
                             scenarioId === "2020-covid-dip" ? "COVID Market Opportunity" :
                             "Investment Opportunity"}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {scenarioId === "bitcoin-2013" ? "Early investment in cryptocurrency" :
                             scenarioId === "pre-2008-crash" ? "Selling before the crash" :
                             scenarioId === "tech-pre-boom" ? "Early tech stock positions" :
                             scenarioId === "2020-covid-dip" ? "Buying during market dip" :
                             "Historical investment opportunity"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Selected event simulation results */}
          {selectedEvent !== null && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Simulation Results</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Info className="mr-2 h-4 w-4" />
                  <span>Based on historical market data</span>
                </div>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-[200px] w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                  </div>
                </div>
              ) : simulation ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Initial Investment</p>
                          <p className="text-xl font-bold">{simulation.initialInvestment}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Final Value</p>
                          <div className="flex items-baseline">
                            <p className="text-xl font-bold">{simulation.finalValue}</p>
                            <span className={`ml-2 text-sm ${
                              simulation.percentageGain >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {simulation.percentageGain >= 0 ? '+' : ''}{simulation.percentageGain}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Time Period</p>
                          <p className="text-xl font-bold">{simulation.timeSpan}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4">
                    <h4 className="font-medium mb-3">Key Insights</h4>
                    <div className="space-y-3">
                      {simulation.insights.map((insight, index) => (
                        <div key={index} className="flex items-start">
                          <Badge 
                            variant={insight.type === 'positive' ? 'default' : 'outline'}
                            className={`mt-0.5 ${
                              insight.type === 'positive' 
                                ? 'bg-green-500' 
                                : insight.type === 'negative'
                                  ? 'border-red-500 text-red-500' 
                                  : 'border-amber-500 text-amber-500'
                            }`}
                          >
                            {insight.type === 'positive' ? '+' : insight.type === 'negative' ? '-' : 'i'}
                          </Badge>
                          <p className="ml-2 text-sm">{insight.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>Select a historical event to simulate investment outcomes</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
