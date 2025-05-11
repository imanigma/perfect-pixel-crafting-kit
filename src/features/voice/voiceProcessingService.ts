
import { pythonBackendService } from '@/services/pythonBackendService';
import { toast } from '@/components/ui/sonner';

/**
 * Service for processing voice input with the backend
 */
export const voiceProcessingService = {
  /**
   * Process the recorded audio
   */
  async processAudio(
    audioBlob: Blob, 
    inputText: string, 
    pageContext: string, 
    genZMode: boolean
  ): Promise<Blob> {
    if (!inputText.trim()) {
      throw new Error("No input text to process");
    }
    
    try {
      // Process with Python backend service
      return await pythonBackendService.processVoiceInput(
        audioBlob, 
        pageContext, 
        genZMode
      );
    } catch (error) {
      console.error("Error processing with Python backend:", error);
      toast.error("Error processing your request. Please try again.");
      throw error;
    }
  },

  /**
   * Process text input only (without audio)
   */
  async processTextInput(
    text: string,
    pageContext: string,
    genZMode: boolean
  ): Promise<Blob> {
    if (!text.trim()) {
      throw new Error("No text to process");
    }
    
    try {
      // Create an empty audio blob for consistency with voice API
      const emptyAudioBlob = new Blob([], { type: 'audio/webm' });
      
      // Process with Python backend service
      return await pythonBackendService.processVoiceInput(
        emptyAudioBlob, 
        pageContext, 
        genZMode
      );
    } catch (error) {
      console.error("Error processing text input:", error);
      toast.error("Error processing your request. Please try again.");
      throw error;
    }
  },

  /**
   * Get the current page context
   */
  getPageContext(): string {
    return document.title + " - " + window.location.pathname;
  }
};
