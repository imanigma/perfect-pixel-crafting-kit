
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
import { Brain, RefreshCw, MessageSquare, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { BuffettPortfolio, AckmanPortfolio, BurryPortfolio } from "@/components/advisors";

const advisors = [
  {
    id: "buffett",
    name: "Warren Buffett",
    description: "Value investing pioneer and CEO of Berkshire Hathaway",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg",
    style: "Focuses on intrinsic value, long-term growth, and companies with strong economic moats"
  },
  {
    id: "ackman",
    name: "Bill Ackman",
    description: "Founder and CEO of Pershing Square Capital Management",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Bill_Ackman_at_Forbes_Summit_2016_%28cropped%29.jpg",
    style: "Activist investor focused on concentrated positions in high-quality businesses"
  },
  {
    id: "burry",
    name: "Michael Burry",
    description: "Founder of Scion Asset Management, known for predicting the 2008 housing crash",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/1/11/Michael_Burry_2010_%28cropped%29.jpg",
    style: "Contrarian value investor focused on deep fundamental analysis"
  }
];

const insights = [
  {
    advisor: "buffett",
    content: "Look for companies with strong economic moats that protect them from competition. In today's market, tech firms with network effects like certain fintech platforms show promise, but be wary of excessive valuations."
  },
  {
    advisor: "ackman",
    content: "I typically invest in simple, high-quality, dominant businesses with pricing power and high barriers to entry. I look for businesses that can survive and thrive in difficult economic environments."
  },
  {
    advisor: "burry",
    content: "Focus on finding deep value situations where market sentiment is overly negative. Pay special attention to complex situations that other investors avoid due to difficult analysis requirements."
  }
];

export default function AIAdvisor() {
  const [selectedAdvisor, setSelectedAdvisor] = useState(advisors[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<{role: string; content: string}[]>([
    { role: 'system', content: insights[0].content }
  ]);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleAdvisorChange = (advisorId: string) => {
    const advisor = advisors.find(a => a.id === advisorId) || advisors[0];
    setSelectedAdvisor(advisor);
    const advisorInsight = insights.find(i => i.advisor === advisorId) || insights[0];
    setMessages([{ role: 'system', content: advisorInsight.content }]);
    // Hide portfolio view when switching advisors
    setShowPortfolio(false);
  };

  const handleGenerateInsight = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let newInsight = "";
      
      if (selectedAdvisor.id === "buffett") {
        newInsight = "Based on recent market developments, I'd recommend focusing on financial services companies with strong digital transformation initiatives. These companies are likely to benefit from the ongoing shift to digital banking and mobile payments.";
      } else if (selectedAdvisor.id === "ackman") {
        newInsight = "In the current environment, I'm particularly interested in companies with pricing power that can pass inflation on to customers. Look for businesses with high returns on invested capital and minimal capital requirements.";
      } else if (selectedAdvisor.id === "burry") {
        newInsight = "I'm seeing warning signs of asset bubbles in multiple markets. Consider raising cash positions and looking at contrarian plays in commodities and select consumer staples that are currently out of favor.";
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: newInsight
      }]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleAskQuestion = () => {
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: "What do you think about investing in fintech startups?" 
    }]);
    
    setIsGenerating(true);
    setTimeout(() => {
      let response = "";
      
      if (selectedAdvisor.id === "buffett") {
        response = "Fintech startups can offer tremendous growth potential but come with significant risks. I'd recommend allocating only a small portion of your portfolio to these speculative investments. Look for startups that solve real problems, have a clear path to profitability, and operate in regulatory-friendly environments.";
      } else if (selectedAdvisor.id === "ackman") {
        response = "I generally avoid early-stage companies without proven business models. If you must invest in fintech, focus on companies with strong unit economics, regulatory compliance capabilities, and a clear competitive advantage. Consider companies disrupting outdated financial systems with more efficient solutions.";
      } else if (selectedAdvisor.id === "burry") {
        response = "Most fintech valuations are detached from fundamentals. I'd be highly selective and look for companies trading below intrinsic value with robust balance sheets. Consider firms addressing real inefficiencies rather than creating incremental improvements to existing systems.";
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response
      }]);
      setIsGenerating(false);
    }, 2000);
  };

  const renderPortfolio = () => {
    if (!showPortfolio) return null;
    
    switch (selectedAdvisor.id) {
      case "buffett":
        return <BuffettPortfolio />;
      case "ackman":
        return <AckmanPortfolio />;
      case "burry":
        return <BurryPortfolio />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-6 w-6 text-[#2751B9]" />
            <h1 className="text-3xl font-semibold text-white">AI Investment Strategist</h1>
          </div>
          <p className="text-[#8E9196] mb-6">Get personalized investment insights from legendary investors</p>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card className="bg-[#151515] border-[#333945] text-white">
              <CardHeader>
                <CardTitle className="text-xl">Select Your Investment Advisor</CardTitle>
                <CardDescription className="text-[#8E9196]">Choose an investment legend to get personalized insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {advisors.map((advisor) => (
                    <div
                      key={advisor.id}
                      onClick={() => handleAdvisorChange(advisor.id)}
                      className={`cursor-pointer p-4 rounded-lg border transition-all ${
                        selectedAdvisor.id === advisor.id
                          ? "border-[#2751B9] bg-[#2751B9]/10"
                          : "border-[#333945] hover:border-[#2751B9]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#2751B9]">
                          <img
                            src={advisor.avatar}
                            alt={advisor.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{advisor.name}</h3>
                          <p className="text-xs text-[#8E9196]">{advisor.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#151515] border-[#333945] text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedAdvisor.name}</CardTitle>
                  <CardDescription className="text-[#8E9196]">{selectedAdvisor.description}</CardDescription>
                </div>
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#2751B9]">
                  <img 
                    src={selectedAdvisor.avatar} 
                    alt={selectedAdvisor.name}
                    className="h-full w-full object-cover" 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-[#8E9196] mb-4">
                  <strong className="text-white">Investment Style:</strong> {selectedAdvisor.style}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button 
                    onClick={handleGenerateInsight} 
                    disabled={isGenerating}
                    className="bg-[#2751B9] hover:bg-[#3962c8]"
                  >
                    {isGenerating ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Generate Daily Insight
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleAskQuestion}
                    className="border-[#333945] text-white hover:bg-[#1c1c1c]"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPortfolio(!showPortfolio)}
                    className="border-[#2751B9] text-white hover:bg-[#1c1c1c]"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    {showPortfolio ? "Hide" : "Show"} Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {renderPortfolio() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {renderPortfolio()}
            </motion.div>
          )}
          
          <Card className="bg-[#151515] border-[#333945] text-white">
            <CardHeader>
              <CardTitle className="text-xl">Investment Insights</CardTitle>
              <CardDescription className="text-[#8E9196]">
                Personalized advice based on {selectedAdvisor.name}'s investment philosophy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-[#2751B9]/20 border border-[#2751B9]/30 ml-12' 
                        : 'bg-[#1c1c1c] border border-[#333945]'
                    }`}
                  >
                    {message.role !== 'system' && (
                      <div className="flex items-center mb-2">
                        {message.role === 'assistant' ? (
                          <div className="h-8 w-8 rounded-full overflow-hidden border border-[#2751B9] mr-2">
                            <img 
                              src={selectedAdvisor.avatar} 
                              alt={selectedAdvisor.name}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-[#2751B9] flex items-center justify-center text-white mr-2">
                            You
                          </div>
                        )}
                        <div className="text-sm font-medium">
                          {message.role === 'assistant' ? selectedAdvisor.name : 'You'}
                        </div>
                      </div>
                    )}
                    <p className="text-[#E8E8E8]">{message.content}</p>
                  </motion.div>
                ))}
                
                {isGenerating && (
                  <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#333945]">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden border border-[#2751B9]">
                        <img 
                          src={selectedAdvisor.avatar} 
                          alt={selectedAdvisor.name}
                          className="h-full w-full object-cover opacity-50" 
                        />
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="h-2 w-2 bg-[#2751B9] rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-[#2751B9] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="h-2 w-2 bg-[#2751B9] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#333945] text-[#8E9196] text-sm">
              AI-generated insights based on historical investment philosophies. Not financial advice.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
