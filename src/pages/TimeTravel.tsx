
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Layers, Settings, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { 
  ComposedChart,
  Line, 
  Area, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from "recharts";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Timeline } from "@/components/timetravel/Timeline";
import { AlternateRealitySimulator } from "@/components/timetravel/AlternateRealitySimulator";

export default function TimeTravel() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-6 w-6 text-[#9b87f5]" />
            <h1 className="text-3xl font-semibold text-white">Financial Time Travel</h1>
          </div>
          <p className="text-[#8E9196] mb-6">Explore how different investment decisions could have changed your financial future</p>
          
          <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-[#151515] border-[#333945]">
              <TabsTrigger value="timeline" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <Clock className="w-4 h-4 mr-2" />
                Dynamic Time-Travel Map
              </TabsTrigger>
              <TabsTrigger value="simulator" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <Layers className="w-4 h-4 mr-2" />
                Alternate Realities Simulator
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="mt-0">
              <Timeline />
            </TabsContent>
            
            <TabsContent value="simulator" className="mt-0">
              <AlternateRealitySimulator />
            </TabsContent>
          </Tabs>
          
          <Card className="bg-[#151515] border-[#333945] text-white mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Time Travel Insights</CardTitle>
              <CardDescription className="text-[#8E9196]">
                AI-generated analysis of your alternate timeline explorations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30"
                >
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center text-white mr-2">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">
                      Timeline Analysis
                    </div>
                  </div>
                  <p className="text-[#E8E8E8]">
                    Based on your exploration, investing $10,000 in Bitcoin in 2012 would have yielded approximately $2.3M by today. 
                    The most significant missed opportunity was during the 2020 market crash, where an early recovery investment could have doubled returns.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30"
                >
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center text-white mr-2">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">
                      Multi-Scenario Insight
                    </div>
                  </div>
                  <p className="text-[#E8E8E8]">
                    Your conservative alternate timeline shows 68% lower returns but with 84% less volatility. 
                    The high-risk strategy would have provided 3.2x greater returns during bull markets but suffered 58% drawdowns in bear markets.
                  </p>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#333945] text-[#8E9196] text-sm">
              Time Travel visualizations are based on historical market data and are for educational purposes only. Not financial advice.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
