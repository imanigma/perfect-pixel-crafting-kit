
import React from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface InvestorPerformanceChartProps {
  investorName: string;
}

export function InvestorPerformanceChart({ investorName }: InvestorPerformanceChartProps) {
  // Generate mock data based on investor name
  const data = generateInvestorPerformanceData(investorName);

  return (
    <Card className="bg-[#151515] border-[#333945] text-white mb-6 p-4">
      <h3 className="text-lg font-semibold mb-2">{investorName}'s Performance</h3>
      <p className="text-[#8E9196] mb-4">Historical investment performance</p>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333945" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#8E9196' }}
              axisLine={{ stroke: '#333945' }}
            />
            <YAxis 
              tick={{ fill: '#8E9196' }}
              axisLine={{ stroke: '#333945' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#151515', 
                border: '1px solid #333945',
                borderRadius: '0.5rem',
                color: '#fff' 
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ color: '#8E9196' }} />
            <Line 
              type="monotone" 
              dataKey="returns" 
              name="Returns" 
              stroke="#2751B9" 
              activeDot={{ r: 8, fill: '#9b87f5' }}
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="marketAvg" 
              name="Market Average" 
              stroke="#666" 
              strokeDasharray="5 5"
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

// Mock data generator based on investor name
function generateInvestorPerformanceData(investorName: string) {
  // Base years for all investors
  const baseYears = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  
  // Different performance profiles for different investors
  let returns: number[] = [];
  
  switch(investorName) {
    case 'Warren Buffett':
      returns = [12, 15, 19, 10, -8, 22, 29, 15, 20];
      break;
    case 'Bill Ackman':
      returns = [7, -15, 22, 28, 36, -5, 40, 25, 10];
      break;
    case 'Michael Burry':
      returns = [5, 8, -20, 45, 12, 35, -12, 30, 15];
      break;
    default:
      returns = [10, 12, 14, 8, 15, 18, 22, 16, 19];
  }
  
  // Market average is roughly the same for comparison
  const marketAvg = [8, 10, 9, 6, 9, -3, 15, 8, 12];
  
  // Combine the data
  return baseYears.map((year, index) => ({
    year,
    returns: returns[index],
    marketAvg: marketAvg[index],
  }));
}
