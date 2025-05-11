
import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { VoiceAssistantButton } from "@/components/VoiceAssistantButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, PieChart, Globe, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SustainableFinance() {
  const [activeTab, setActiveTab] = useState("esg");

  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Leaf className="h-6 w-6 text-[#9b87f5]" />
              <h1 className="text-3xl font-semibold text-white">Sustainable Finance</h1>
            </div>
            <VoiceAssistantButton variant="inline" />
          </div>
          <p className="text-[#8E9196] mb-6">Invest in a better future with ESG-focused financial products</p>
          
          <Tabs defaultValue="esg" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 bg-[#151515] border-[#333945]">
              <TabsTrigger value="esg" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <PieChart className="w-4 h-4 mr-2" />
                ESG Investing
              </TabsTrigger>
              <TabsTrigger value="carbon" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <Leaf className="w-4 h-4 mr-2" />
                Carbon Offsets
              </TabsTrigger>
              <TabsTrigger value="bonds" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <LineChart className="w-4 h-4 mr-2" />
                Green Bonds
              </TabsTrigger>
              <TabsTrigger value="themes" className="data-[state=active]:bg-[#2751B9] data-[state=active]:text-white">
                <Globe className="w-4 h-4 mr-2" />
                Impact Themes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="esg" className="mt-6">
              <Card className="bg-[#151515] border-[#333945] text-white mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[#9b87f5]" />
                    ESG Trade Center
                  </CardTitle>
                  <CardDescription className="text-[#8E9196]">
                    Investments considering environmental, social, and governance factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Green Tech ETFs */}
                    <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                          <Leaf className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="font-medium text-lg">Green Tech ETFs</h3>
                      </div>
                      <p className="text-[#8E9196] mb-4">
                        Invest in renewable energy, electric vehicles, and sustainable infrastructure companies.
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Impact Score</span>
                          <span className="text-green-500">85/100</span>
                        </div>
                        <div className="h-2 bg-[#333945] rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                        Explore Green Tech
                      </Button>
                    </div>
                    
                    {/* Social Impact Bonds */}
                    <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <Globe className="h-5 w-5 text-blue-500" />
                        </div>
                        <h3 className="font-medium text-lg">Social Impact Bonds</h3>
                      </div>
                      <p className="text-[#8E9196] mb-4">
                        Support projects in education, affordable housing, and healthcare initiatives.
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Impact Score</span>
                          <span className="text-blue-500">78/100</span>
                        </div>
                        <div className="h-2 bg-[#333945] rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Explore Social Impact
                      </Button>
                    </div>
                    
                    {/* Governance Leaders */}
                    <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#9b87f5]/30">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                          <LineChart className="h-5 w-5 text-purple-500" />
                        </div>
                        <h3 className="font-medium text-lg">Governance Leaders</h3>
                      </div>
                      <p className="text-[#8E9196] mb-4">
                        Companies with exemplary diversity, ethical leadership, and transparent practices.
                      </p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Impact Score</span>
                          <span className="text-purple-500">92/100</span>
                        </div>
                        <div className="h-2 bg-[#333945] rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                        Explore Governance
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#333945] text-sm text-[#8E9196] flex justify-center">
                  ESG ratings are provided by independent third-party research firms
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="carbon" className="mt-6">
              <Card className="bg-[#151515] border-[#333945] text-white mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-[#9b87f5]" />
                    Carbon Credit Marketplace
                  </CardTitle>
                  <CardDescription className="text-[#8E9196]">
                    Invest in carbon credits or ETFs tied to carbon offset projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#1c1c1c] rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-medium mb-3">Your Carbon Footprint Tracker</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[#8E9196]">Carbon Offset Through Investments</p>
                        <p className="text-3xl font-semibold">25.4 tons</p>
                        <p className="text-green-500 text-sm">Equivalent to planting 412 trees</p>
                      </div>
                      <div className="h-24 w-24 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Leaf className="h-12 w-12 text-green-500" />
                      </div>
                    </div>
                    <div className="h-3 bg-[#333945] rounded-full">
                      <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-[#8E9196]">
                      <span>High Carbon</span>
                      <span>Target Zone</span>
                      <span>Carbon Negative</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3">Available Carbon Credit Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: "Amazon Rainforest Protection",
                        description: "Preservation of 50,000 hectares of rainforest in Brazil",
                        price: "€22.50 per ton",
                        impact: "Prevents deforestation and protects biodiversity"
                      },
                      {
                        name: "Wind Farm Development",
                        description: "Construction of wind turbines in coastal regions",
                        price: "€18.75 per ton",
                        impact: "Reduces reliance on fossil fuel energy"
                      },
                      {
                        name: "Methane Capture",
                        description: "Landfill gas capture and energy generation",
                        price: "€15.20 per ton",
                        impact: "Prevents methane release into atmosphere"
                      },
                      {
                        name: "Reforestation Initiative",
                        description: "Planting native trees in degraded landscapes",
                        price: "€24.90 per ton",
                        impact: "Restores ecosystems and captures carbon"
                      }
                    ].map((project, i) => (
                      <Card key={i} className="bg-[#1D1D1D] border-[#333945] overflow-hidden">
                        <div className="h-2 bg-green-500"></div>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{project.name}</h4>
                          <p className="text-sm text-[#8E9196] mb-3">{project.description}</p>
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-green-500">{project.price}</span>
                            <Button size="sm" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                              Invest
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bonds" className="mt-6">
              <Card className="bg-[#151515] border-[#333945] text-white mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-[#9b87f5]" />
                    Green Bond Investment Dashboard
                  </CardTitle>
                  <CardDescription className="text-[#8E9196]">
                    Bonds that finance environmentally-friendly projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Available Green Bonds</h3>
                      <div className="space-y-4">
                        {[
                          {
                            name: "European Green Deal Bond",
                            issuer: "European Investment Bank",
                            yield: "3.2%",
                            term: "5 Year",
                            impact: "Clean Energy"
                          },
                          {
                            name: "Sustainable Water Bond",
                            issuer: "Nordic Investment Bank",
                            yield: "2.8%",
                            term: "7 Year",
                            impact: "Water Management"
                          },
                          {
                            name: "Green Infrastructure Bond",
                            issuer: "German Development Bank",
                            yield: "3.5%",
                            term: "10 Year",
                            impact: "Sustainable Transport"
                          },
                          {
                            name: "Blue Ocean Bond",
                            issuer: "World Bank",
                            yield: "2.6%",
                            term: "3 Year",
                            impact: "Ocean Conservation"
                          }
                        ].map((bond, i) => (
                          <div key={i} className="p-4 rounded-lg bg-[#1c1c1c] border border-[#333945] flex justify-between">
                            <div>
                              <h4 className="font-medium">{bond.name}</h4>
                              <p className="text-sm text-[#8E9196]">{bond.issuer}</p>
                              <div className="mt-2 inline-block px-2 py-1 text-xs rounded-full bg-[#2751B9]/20 text-[#2751B9]">
                                {bond.impact}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-semibold text-green-500">{bond.yield}</p>
                              <p className="text-sm text-[#8E9196]">{bond.term}</p>
                              <Button size="sm" className="mt-2 bg-[#2751B9] hover:bg-[#2751B9]/80">
                                Invest
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Impact Visualization</h3>
                      <Card className="bg-[#1D1D1D] border-[#333945] h-full">
                        <CardContent className="p-6">
                          <h4 className="text-center mb-4">SDG Contribution by Investment</h4>
                          <div className="relative h-[300px] w-full flex items-center justify-center">
                            <PieChart className="h-48 w-48 text-[#2751B9]/30" />
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                              <p className="text-3xl font-bold">7 SDGs</p>
                              <p className="text-[#8E9196]">Supported</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            {['Clean Water', 'Climate Action', 'Sustainable Cities', 'Zero Hunger', 'Clean Energy', 'Life Below Water', 'Good Health'].map((sdg, i) => (
                              <div key={i} className="text-center p-2 rounded-lg bg-[#151515] text-xs">
                                {sdg}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="themes" className="mt-6">
              <Card className="bg-[#151515] border-[#333945] text-white mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#9b87f5]" />
                    Sustainable Megatrends Funds
                  </CardTitle>
                  <CardDescription className="text-[#8E9196]">
                    Curated portfolios focused on emerging ESG themes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    {/* ClimateTech */}
                    <Card className="bg-[#1D1D1D] border-[#333945] overflow-hidden">
                      <div className="h-2 bg-green-500"></div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <Leaf className="h-5 w-5 text-green-500" />
                          </div>
                          <h3 className="font-medium">ClimateTech Fund</h3>
                        </div>
                        <p className="text-sm text-[#8E9196] mb-3">
                          Green technology and decarbonization innovations
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>5 Year Returns</span>
                            <span className="text-green-500">+142%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Risk Level</span>
                            <span className="text-yellow-500">Medium</span>
                          </div>
                        </div>
                        <Button className="w-full bg-green-500 hover:bg-green-600">
                          Simulate Impact
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* Health & Wellness */}
                    <Card className="bg-[#1D1D1D] border-[#333945] overflow-hidden">
                      <div className="h-2 bg-blue-500"></div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            <LineChart className="h-5 w-5 text-blue-500" />
                          </div>
                          <h3 className="font-medium">Health & Wellness</h3>
                        </div>
                        <p className="text-sm text-[#8E9196] mb-3">
                          Accessible healthcare and sustainable food systems
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>5 Year Returns</span>
                            <span className="text-green-500">+97%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Risk Level</span>
                            <span className="text-green-500">Low</span>
                          </div>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600">
                          Simulate Impact
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* Smart Cities */}
                    <Card className="bg-[#1D1D1D] border-[#333945] overflow-hidden">
                      <div className="h-2 bg-purple-500"></div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                            <Globe className="h-5 w-5 text-purple-500" />
                          </div>
                          <h3 className="font-medium">Smart Cities</h3>
                        </div>
                        <p className="text-sm text-[#8E9196] mb-3">
                          Urban infrastructure and electric mobility solutions
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>5 Year Returns</span>
                            <span className="text-green-500">+118%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Risk Level</span>
                            <span className="text-red-500">High</span>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">
                          Simulate Impact
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Future Impact Simulator</h3>
                    <Card className="bg-[#1D1D1D] border-[#333945]">
                      <CardContent className="p-6">
                        <div className="flex justify-between mb-6">
                          <div className="space-y-1">
                            <label className="text-sm text-[#8E9196]">Investment Amount</label>
                            <div className="flex items-center">
                              <span className="text-xl font-medium">€10,000</span>
                              <input type="range" className="ml-4 w-48" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm text-[#8E9196]">Time Horizon</label>
                            <div className="flex items-center">
                              <span className="text-xl font-medium">10 Years</span>
                              <input type="range" className="ml-4 w-48" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-center mb-4">Financial Projections</h4>
                            <div className="bg-[#151515] rounded-lg p-4 h-48 flex items-center justify-center">
                              <LineChart className="h-32 w-32 text-[#2751B9]/40" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-center mb-4">Environmental Impact</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-[#151515] rounded-lg p-4 flex flex-col items-center">
                                <Leaf className="h-8 w-8 text-green-500 mb-2" />
                                <p className="text-xl font-semibold">127 tons</p>
                                <p className="text-xs text-[#8E9196]">CO2 Avoided</p>
                              </div>
                              <div className="bg-[#151515] rounded-lg p-4 flex flex-col items-center">
                                <Globe className="h-8 w-8 text-blue-500 mb-2" />
                                <p className="text-xl font-semibold">€2,450</p>
                                <p className="text-xs text-[#8E9196]">SDG Contribution</p>
                              </div>
                              <div className="bg-[#151515] rounded-lg p-4 flex flex-col items-center">
                                <PieChart className="h-8 w-8 text-purple-500 mb-2" />
                                <p className="text-xl font-semibold">9.2/10</p>
                                <p className="text-xs text-[#8E9196]">ESG Score</p>
                              </div>
                              <div className="bg-[#151515] rounded-lg p-4 flex flex-col items-center">
                                <LineChart className="h-8 w-8 text-yellow-500 mb-2" />
                                <p className="text-xl font-semibold">+215%</p>
                                <p className="text-xs text-[#8E9196]">Est. Return</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
