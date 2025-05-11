
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

// Mock data for Bill Ackman's portfolio
const mockAckmanPortfolio: StockPortfolio[] = [
  { stock: "Hilton Worldwide", symbol: "HLT", percentage: 21.5 },
  { stock: "Restaurant Brands", symbol: "QSR", percentage: 20.1 },
  { stock: "Chipotle Mexican Grill", symbol: "CMG", percentage: 19.8 },
  { stock: "Howard Hughes Corp", symbol: "HHC", percentage: 14.3 },
  { stock: "Alphabet Inc.", symbol: "GOOGL", percentage: 10.8 },
  { stock: "Canadian Pacific", symbol: "CP", percentage: 8.2 },
  { stock: "Lowe's Companies", symbol: "LOW", percentage: 5.3 }
];

// Mock data for Michael Burry's portfolio
const mockBurryPortfolio: StockPortfolio[] = [
  { stock: "JD.com Inc.", symbol: "JD", percentage: 19.4 },
  { stock: "CVS Health Corp", symbol: "CVS", percentage: 18.6 },
  { stock: "Star Bulk Carriers", symbol: "SBLK", percentage: 12.8 },
  { stock: "Stellantis N.V.", symbol: "STLA", percentage: 12.7 },
  { stock: "Nexstar Media Group", symbol: "NXST", percentage: 11.5 },
  { stock: "Booking Holdings", symbol: "BKNG", percentage: 9.8 },
  { stock: "Alphabet Inc.", symbol: "GOOGL", percentage: 8.5 },
  { stock: "Alibaba Group", symbol: "BABA", percentage: 6.7 }
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

// Function to get Bill Ackman's portfolio (using mock data)
export async function getBillAckmanPortfolio(): Promise<StockPortfolio[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAckmanPortfolio);
    }, 800);
  });
}

// Function to get Michael Burry's portfolio (using mock data)
export async function getMichaelBurryPortfolio(): Promise<StockPortfolio[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBurryPortfolio);
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
