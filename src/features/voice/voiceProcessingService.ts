
import { pythonBackendService } from '@/services/pythonBackendService';
import { toast } from '@/components/ui/sonner';
import { speechService } from '@/services/voice/speechService';

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
      // Pass the inputText to the backend so it can be used if transcription fails
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('page_text', pageContext);
      formData.append('text_input', inputText); // Add the text input
      formData.append('gen_z_mode', genZMode ? 'unhinged' : 'normal');
      
      return await pythonBackendService.processVoiceInput(
        formData,
        pageContext, 
        genZMode
      );
    } catch (error) {
      console.error("Error processing with Python backend:", error);
      
      // Fallback to our mock implementation if backend is unavailable
      const responseText = await speechService.mockChatCompletion(inputText, pageContext, genZMode);
      
      // Create a synthetic response blob
      // This would normally come from the backend TTS service
      const mimeType = 'audio/mp3'; 
      const blob = new Blob([new Uint8Array(0)], { type: mimeType });
      
      // Use browser's speech synthesis as fallback
      speechService.speakResponse(responseText);
      
      toast.error("Using local speech synthesis due to backend connection issues.");
      return blob;
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
      
      // Create FormData to send directly
      const formData = new FormData();
      formData.append('audio', emptyAudioBlob, 'empty.webm');
      formData.append('page_text', pageContext);
      formData.append('text_input', text); // Add the text input directly
      formData.append('gen_z_mode', genZMode ? 'unhinged' : 'normal');
      
      // Process with Python backend service
      return await pythonBackendService.processVoiceInput(
        formData,
        pageContext, 
        genZMode
      );
    } catch (error) {
      console.error("Error processing text input:", error);
      
      // Fallback to our mock implementation if backend is unavailable
      const responseText = await speechService.mockChatCompletion(text, pageContext, genZMode);
      
      // Create a synthetic response blob
      const mimeType = 'audio/mp3';
      const blob = new Blob([new Uint8Array(0)], { type: mimeType });
      
      // Use browser's speech synthesis as fallback
      speechService.speakResponse(responseText);
      
      toast.warning("Using local speech synthesis due to backend connection issues.");
      return blob;
    }
  },

  /**
   * Get the current page context
   */
  getPageContext(): string {
    return document.title + " - " + window.location.pathname;
  }
};
