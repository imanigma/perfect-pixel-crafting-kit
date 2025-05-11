
import React from "react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { SimulationResult as SimulationResultType } from "@/types/timeTravel";

interface SimulationResultProps {
  simulation: SimulationResultType | null;
  isLoading: boolean;
}

export function SimulationResult({ simulation, isLoading }: SimulationResultProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!simulation) {
    return <EmptyState />;
  }

  const chartConfig = {
    simulatedValue: {
      label: "Your Portfolio",
      theme: {
        light: "#2751B9",
        dark: "#3962c8",
      },
    },
    marketValue: {
      label: "Market Average",
      theme: {
        light: "#64748b",
        dark: "#94a3b8",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard 
          title="Initial Investment" 
          value={simulation.initialInvestment} 
          change={null} 
        />
        <StatsCard 
          title="Final Value" 
          value={simulation.finalValue} 
          change={{
            value: simulation.percentageGain,
            positive: simulation.percentageGain > 0
          }} 
        />
        <StatsCard 
          title="Time Span" 
          value={simulation.timeSpan} 
          change={null} 
          currency={false}
        />
      </div>

      <Card className="border-border/40 p-6">
        <h3 className="font-medium mb-4">Portfolio Growth Over Time</h3>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <LineChart data={simulation.chartData}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000)}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="simulatedValue" 
                name="simulatedValue" 
                stroke="var(--color-simulatedValue)" 
                strokeWidth={2} 
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="marketValue" 
                name="marketValue" 
                stroke="var(--color-marketValue)" 
                strokeWidth={2} 
                dot={false} 
                strokeDasharray="5 5"
              />
            </LineChart>
            <ChartLegend content={<ChartLegendContent />} />
          </ChartContainer>
        </div>
      </Card>

      <Card className="border-border/40">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Key Insights</h3>
          <div className="space-y-4">
            {simulation.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge variant={insight.type === 'positive' ? 'default' : 'outline'} className="mt-0.5">
                  {insight.type === 'positive' ? '+' : 'i'}
                </Badge>
                <p className="text-sm">{insight.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Transaction Timeline</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="text-right">Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {simulation.events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell className="text-right">
                    <span className={event.impact > 0 ? "text-green-500" : "text-red-500"}>
                      {event.impact > 0 ? '+' : ''}{event.impact}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ 
  title, 
  value, 
  change, 
  currency = true 
}: { 
  title: string;
  value: string;
  change: { value: number; positive: boolean } | null;
  currency?: boolean;
}) {
  return (
    <Card className="border-border/40">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">{title}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-semibold">
              {currency && '$'}{value}
            </span>
            {change && (
              <span className={`text-sm ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
                {change.positive ? '+' : ''}{change.value}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map(i => (
          <Card key={i} className="border-border/40">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="text-lg font-medium mb-2">No Simulation Data</h3>
      <p className="text-muted-foreground text-center">
        Select a scenario and run the simulation to see results
      </p>
    </div>
  );
}
