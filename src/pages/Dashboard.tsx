
import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { VoiceAssistantButton } from "@/components/VoiceAssistantButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, CreditCard, PieChart, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#090B18]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white"
              >
                Financial Dashboard
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#8E9196]"
              >
                Complete overview of your financial health
              </motion.p>
            </div>
            <VoiceAssistantButton variant="inline" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 grid grid-cols-4 gap-4"
          >
            {/* Key metrics cards */}
            <Card className="bg-[#151515] border-[#333945] text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#8E9196]">Total Assets</p>
                    <p className="text-2xl font-semibold">€54,892.75</p>
                    <div className="flex items-center gap-1 text-green-500 mt-1">
                      <ArrowUp className="w-3 h-3" />
                      <span className="text-xs">+4.2%</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#2751B9]/20 flex items-center justify-center">
                    <PieChart className="w-6 h-6 text-[#2751B9]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#151515] border-[#333945] text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#8E9196]">Monthly Return</p>
                    <p className="text-2xl font-semibold">€1,249.32</p>
                    <div className="flex items-center gap-1 text-green-500 mt-1">
                      <ArrowUp className="w-3 h-3" />
                      <span className="text-xs">+2.7%</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#2751B9]/20 flex items-center justify-center">
                    <LineChart className="w-6 h-6 text-[#2751B9]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#151515] border-[#333945] text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#8E9196]">Active Cards</p>
                    <p className="text-2xl font-semibold">3</p>
                    <div className="text-[#8E9196] mt-1">
                      <span className="text-xs">2 Credit, 1 Debit</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#2751B9]/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#2751B9]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#151515] border-[#333945] text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#8E9196]">Risk Level</p>
                    <p className="text-2xl font-semibold">Medium</p>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      <span className="text-xs">Balanced</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#2751B9]/20 flex items-center justify-center">
                    <LineChart className="w-6 h-6 text-[#2751B9]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs defaultValue="portfolio" className="w-full">
              <TabsList className="bg-[#151515] border border-[#333945]">
                <TabsTrigger value="portfolio" className="text-white data-[state=active]:bg-[#2751B9]">
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-[#2751B9]">
                  Transactions
                </TabsTrigger>
                <TabsTrigger value="cards" className="text-white data-[state=active]:bg-[#2751B9]">
                  Cards
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio">
                <Card className="bg-[#151515] border-[#333945] text-white mt-6">
                  <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                    <CardDescription className="text-[#8E9196]">
                      Current distribution of your investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col">
                        {/* Pie chart would go here in a real app */}
                        <div className="bg-[#1D1D1D] h-64 rounded-lg flex items-center justify-center mb-4">
                          <PieChart className="w-24 h-24 text-[#2751B9]/50" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-4">Allocation Breakdown</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[#8E9196]">Stocks</span>
                              <span>45%</span>
                            </div>
                            <div className="h-2 bg-[#1D1D1D] rounded-full">
                              <div className="h-2 bg-[#2751B9] rounded-full w-[45%]"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[#8E9196]">ETFs</span>
                              <span>30%</span>
                            </div>
                            <div className="h-2 bg-[#1D1D1D] rounded-full">
                              <div className="h-2 bg-[#9b87f5] rounded-full w-[30%]"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[#8E9196]">Crypto</span>
                              <span>15%</span>
                            </div>
                            <div className="h-2 bg-[#1D1D1D] rounded-full">
                              <div className="h-2 bg-[#6E59A5] rounded-full w-[15%]"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[#8E9196]">Cash</span>
                              <span>10%</span>
                            </div>
                            <div className="h-2 bg-[#1D1D1D] rounded-full">
                              <div className="h-2 bg-[#333945] rounded-full w-[10%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transactions">
                <Card className="bg-[#151515] border-[#333945] text-white mt-6">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription className="text-[#8E9196]">
                      Your latest financial activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { 
                          name: "Apple Inc.", 
                          type: "Buy", 
                          amount: "€2,450.75", 
                          date: "May 10, 2025", 
                          status: "Completed" 
                        },
                        { 
                          name: "Amazon.com", 
                          type: "Sell", 
                          amount: "€1,830.22", 
                          date: "May 8, 2025", 
                          status: "Completed" 
                        },
                        { 
                          name: "Bitcoin", 
                          type: "Buy", 
                          amount: "€500.00", 
                          date: "May 5, 2025", 
                          status: "Completed" 
                        },
                        { 
                          name: "Vanguard ETF", 
                          type: "Buy", 
                          amount: "€1,000.00", 
                          date: "May 1, 2025", 
                          status: "Completed" 
                        },
                      ].map((transaction, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-[#1D1D1D] rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#2751B9]/20 flex items-center justify-center">
                              {transaction.type === "Buy" ? (
                                <ArrowDown className="w-5 h-5 text-green-500" />
                              ) : (
                                <ArrowUp className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.name}</p>
                              <p className="text-sm text-[#8E9196]">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={transaction.type === "Buy" ? "text-green-500" : "text-red-500"}>
                              {transaction.type === "Buy" ? "-" : "+"}{transaction.amount}
                            </p>
                            <p className="text-xs text-[#8E9196]">{transaction.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="cards">
                <Card className="bg-[#151515] border-[#333945] text-white mt-6">
                  <CardHeader>
                    <CardTitle>Payment Cards</CardTitle>
                    <CardDescription className="text-[#8E9196]">
                      Manage your linked payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Credit Card 1 */}
                      <div className="relative h-48 w-full max-w-md rounded-xl bg-gradient-to-br from-[#2751B9] to-[#1A1F2C] p-6 text-white overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                          <div className="absolute -left-4 -top-24 w-40 h-40 rounded-full bg-white/20"></div>
                          <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-white/20"></div>
                        </div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-8">
                            <div>
                              <p className="text-xs opacity-80">Credit Card</p>
                              <p className="font-medium">Premium Visa</p>
                            </div>
                            <CreditCard className="w-8 h-8" />
                          </div>
                          <p className="text-lg tracking-widest mb-4">**** **** **** 4582</p>
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs opacity-80">Card Holder</p>
                              <p className="font-medium">John Doe</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs opacity-80">Expires</p>
                              <p>09/28</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* More cards would be shown here */}
                      <div className="flex items-center justify-center p-4 border border-dashed border-[#333945] rounded-lg text-[#8E9196] cursor-pointer hover:bg-[#151515]/50 transition-colors">
                        <p>+ Add new payment method</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
