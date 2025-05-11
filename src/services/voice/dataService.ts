
import { mockTradeData, mockBankData } from './mockData';
import { TransactionData, BankData } from './types';

/**
 * Service to handle data fetching and processing
 */
export const dataService = {
  // Get user data (transactions and bank data)
  async getUserData(): Promise<{ trade: TransactionData[], bank: BankData[] }> {
    // In a real implementation, this would be an API call
    // return axios.get('/api/data').then(response => response.data);
    
    return {
      trade: mockTradeData,
      bank: mockBankData
    };
  }
};
