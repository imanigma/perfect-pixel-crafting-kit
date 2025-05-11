
import { dataService } from './voice/dataService';
import { chartService } from './voice/chartService';
import { voiceProcessingService } from './voice/voiceProcessingService';
import { TransactionData, BankData } from './voice/types';

/**
 * Main service for voice assistant functionality
 */
class VoiceAssistantService {
  // Re-export from dataService
  async getUserData(): Promise<{ trade: TransactionData[], bank: BankData[] }> {
    return dataService.getUserData();
  }

  // Re-export from voiceProcessingService
  async processVoiceInput(audioBlob: Blob, pageContext: string, genZMode: boolean = false): Promise<Blob> {
    return voiceProcessingService.processVoiceInput(audioBlob, pageContext, genZMode);
  }

  // Re-export from chartService
  async getChartData(topic: string): Promise<string> {
    return chartService.getChartData(topic);
  }
}

export const voiceAssistantService = new VoiceAssistantService();

// Re-export types for use in other files
export type { TransactionData, BankData, StockPortfolio } from './voice/types';
