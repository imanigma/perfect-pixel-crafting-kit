
// Types for our voice assistant service
export interface StockPortfolio {
  stock: string;
  symbol: string;
  percentage: number;
}

export interface TransactionData {
  id: string;
  userId: string;
  companyName: string;
  ticker: string;
  executedAt: string;
  executionPrice: number;
  transactionType: string;
  shares: number;
}

export interface BankData {
  id: string;
  userId: string;
  transactionDate: string;
  amount: number;
  description: string;
  category: string;
  balance: number;
}
