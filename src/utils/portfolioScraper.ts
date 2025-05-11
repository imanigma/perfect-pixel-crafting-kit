
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface StockPortfolio {
  stock: string;
  symbol: string;
  percentage: number;
}

// Mock data for Warren Buffett's portfolio
const mockBuffettPortfolio: StockPortfolio[] = [
  { stock: "Apple Inc.", symbol: "AAPL", percentage: 37.5 },
  { stock: "Bank of America", symbol: "BAC", percentage: 10.9 },
  { stock: "American Express", symbol: "AXP", percentage: 7.6 },
  { stock: "Coca-Cola", symbol: "KO", percentage: 7.2 },
  { stock: "Chevron", symbol: "CVX", percentage: 5.8 },
  { stock: "Occidental Petroleum", symbol: "OXY", percentage: 4.3 },
  { stock: "Kraft Heinz", symbol: "KHC", percentage: 3.7 },
  { stock: "Moody's Corporation", symbol: "MCO", percentage: 2.4 },
  { stock: "Capital One Financial", symbol: "COF", percentage: 1.9 },
  { stock: "Visa Inc.", symbol: "V", percentage: 1.4 }
];

// Function to get Warren Buffett's portfolio (using mock data)
export async function getWarrenBuffettPortfolio(): Promise<StockPortfolio[]> {
  // For demonstration purposes, we're adding a small delay to simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBuffettPortfolio);
    }, 800);
  });
}

// Function to calculate investment based on portfolio data
export function calculateInvestment(amount: number, portfolio: StockPortfolio[]): { stock: string; investment: number }[] {
  return portfolio.map((stock) => {
    const investment = (stock.percentage / 100) * amount;
    return { stock: stock.stock, investment };
  });
}
