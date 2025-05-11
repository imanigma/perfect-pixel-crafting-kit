
import { TransactionData, BankData } from './types';

// Simulated user ID (in a real app, this would come from authentication)
export const USER_ID = "0bf3b550-dc5b-4f3e-91f4-162b687b97c6";

// Mock data - in a real app, this would come from your backend
export const mockTradeData: TransactionData[] = [
  {
    id: "1",
    userId: USER_ID,
    companyName: "Apple Inc.",
    ticker: "AAPL",
    executedAt: "2023-05-01",
    executionPrice: 173.50,
    transactionType: "buy",
    shares: 10
  },
  {
    id: "2",
    userId: USER_ID,
    companyName: "Microsoft Corp",
    ticker: "MSFT",
    executedAt: "2023-05-05",
    executionPrice: 332.20,
    transactionType: "buy",
    shares: 5
  },
  {
    id: "3",
    userId: USER_ID,
    companyName: "Amazon.com Inc.",
    ticker: "AMZN",
    executedAt: "2023-05-10",
    executionPrice: 110.45,
    transactionType: "buy",
    shares: 15
  }
];

export const mockBankData: BankData[] = [
  {
    id: "b1",
    userId: USER_ID,
    transactionDate: "2023-05-02",
    amount: -1735.00,
    description: "Stock Purchase - AAPL",
    category: "Investment",
    balance: 8265.00
  },
  {
    id: "b2",
    userId: USER_ID,
    transactionDate: "2023-05-06",
    amount: -1661.00,
    description: "Stock Purchase - MSFT",
    category: "Investment",
    balance: 6604.00
  },
  {
    id: "b3",
    userId: USER_ID,
    transactionDate: "2023-05-11",
    amount: -1656.75,
    description: "Stock Purchase - AMZN",
    category: "Investment",
    balance: 4947.25
  }
];
