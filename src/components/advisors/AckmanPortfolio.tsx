
import React, { useState } from "react";
import { getBillAckmanPortfolio, calculateInvestment, StockPortfolio } from "@/utils/portfolioScraper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const AckmanPortfolio = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [portfolio, setPortfolio] = useState<StockPortfolio[]>([]);
  const [investmentBreakdown, setInvestmentBreakdown] = useState<{ stock: string; investment: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const portfolioData = await getBillAckmanPortfolio();
      if (portfolioData.length > 0) {
        setPortfolio(portfolioData);
        const breakdown = calculateInvestment(amount, portfolioData);
        setInvestmentBreakdown(breakdown);
        setHasLoaded(true);
        toast.success("Portfolio data loaded successfully");
      } else {
        toast.error("Could not fetch portfolio data. Try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch portfolio data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
    if (portfolio.length > 0) {
      setInvestmentBreakdown(calculateInvestment(newAmount, portfolio));
    }
  };

  return (
    <Card className="bg-[#151515] border-[#333945] text-white w-full">
      <CardHeader>
        <CardTitle className="text-xl">Bill Ackman's Portfolio Analyzer</CardTitle>
        <CardDescription className="text-[#8E9196]">
          See how your investment would be allocated following Ackman's strategy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto flex-1">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-[#8E9196] mr-2" />
                <Input
                  type="number"
                  placeholder="Investment Amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="bg-[#000000] border-[#333945] text-white"
                />
              </div>
            </div>
            <Button 
              onClick={fetchPortfolio} 
              disabled={isLoading} 
              className="bg-[#2751B9] hover:bg-[#3962c8] w-full sm:w-auto"
            >
              {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
              {isLoading ? "Loading..." : hasLoaded ? "Refresh Portfolio" : "Get Portfolio Breakdown"}
            </Button>
          </div>

          {hasLoaded && investmentBreakdown.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-auto"
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-[#333945]">
                    <TableHead className="text-white">Stock</TableHead>
                    <TableHead className="text-white text-right">Allocation %</TableHead>
                    <TableHead className="text-white text-right">Investment ($)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investmentBreakdown.map((item, index) => (
                    <TableRow 
                      key={index} 
                      className="border-[#333945] hover:bg-[#1c1c1c]"
                    >
                      <TableCell className="font-medium text-white">{item.stock}</TableCell>
                      <TableCell className="text-right text-[#8E9196]">
                        {portfolio.find(p => p.stock === item.stock)?.percentage.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right font-semibold text-[#2751B9]">
                        ${item.investment.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-[#333945] text-[#8E9196] text-sm">
        Data based on Pershing Square Capital Management's recent portfolio holdings.
      </CardFooter>
    </Card>
  );
};
