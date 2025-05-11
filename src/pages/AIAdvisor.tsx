import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Eye, LineChart, TrendingUp } from "lucide-react";
import { 
  BuffettPortfolio, 
  AckmanPortfolio, 
  BurryPortfolio 
} from "@/components/advisors";
import { VoiceAssistantButton } from "@/components/VoiceAssistantButton";

export default function AIAdvisor() {
  const [activeTab, setActiveTab] = useState("buffett");

  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-6 w-6 text-[#9b87f5]" />
              <h1 className="text-3xl font-semibold text-white">AI Investment Advisor</h1>
            </div>
            <VoiceAssistantButton variant="inline" />
          </div>
          <p className="text-[#8E9196] mb-6">Personalized investment strategies based on legendary investors</p>
          
          <Tabs defaultValue="buffett" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-[#151515] border-[#333945]">
              <TabsTrigger value="buffett" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Warren Buffett
              </TabsTrigger>
              <TabsTrigger value="ackman" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <LineChart className="w-4 h-4 mr-2" />
                Bill Ackman
              </TabsTrigger>
              <TabsTrigger value="burry" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <Eye className="w-4 h-4 mr-2" />
                Michael Burry
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buffett" className="mt-0">
              <BuffettPortfolio />
            </TabsContent>
            
            <TabsContent value="ackman" className="mt-0">
              <AckmanPortfolio />
            </TabsContent>
            
            <TabsContent value="burry" className="mt-0">
              <BurryPortfolio />
            </TabsContent>
          </Tabs>
          
          <Card className="bg-[#151515] border-[#333945] text-white mt-6">
            <CardHeader>
              <CardTitle className="text-xl">AI Advisor Insights</CardTitle>
              <CardDescription className="text-[#8E9196]">
                AI-generated analysis of top investment strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center text-white mr-2">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">
                      Buffett's Value Strategy
                    </div>
                  </div>
                  <p className="text-[#E8E8E8]">
                    Warren Buffett's strategy focuses on long-term investments in companies with strong fundamentals. 
                    Our AI analysis suggests that this approach has a 78% success rate over a 10-year period.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center text-white mr-2">
                      <LineChart className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">
                      Ackman's Activist Approach
                    </div>
                  </div>
                  <p className="text-[#E8E8E8]">
                    Bill Ackman's activist investing involves taking significant stakes in undervalued companies and pushing for strategic changes. 
                    AI analysis indicates a higher risk but potential for substantial returns, with a 62% success rate.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center text-white mr-2">
                      <Eye className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">
                      Burry's Contrarian Bets
                    </div>
                  </div>
                  <p className="text-[#E8E8E8]">
                    Michael Burry's contrarian investment strategy involves identifying and capitalizing on market inefficiencies. 
                    AI analysis shows this approach is highly speculative, with a 45% success rate but potential for significant gains.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#333945] text-[#8E9196] text-sm">
              AI-driven investment insights are for informational purposes only and not financial advice.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
