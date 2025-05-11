
import axios from 'axios';
import { toast } from "@/components/ui/sonner";
import { speechService } from './speechService';

/**
 * Service to handle voice input processing
 */
export const voiceProcessingService = {
  // Process audio and get a response
  async processVoiceInput(audioBlob: Blob, pageContext: string, genZMode: boolean = false): Promise<Blob> {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('page_text', pageContext);
      formData.append('gen_z_mode', genZMode ? 'unhinged' : 'normal');

      // In a real implementation, this would be:
      // const response = await axios.post('/api/voice', formData, {
      //   responseType: 'blob'
      // });
      // return response.data;
      
      // Mock implementation
      // Instead of making an actual API call, we'll use the OpenAI client directly
      const transcribedText = await speechService.mockTranscription(audioBlob);
      const responseText = await speechService.mockChatCompletion(transcribedText, pageContext, genZMode);
      
      // For demo purposes, we'll use the browser's built-in speech synthesis
      speechService.speakResponse(responseText);
      
      // Return a dummy audio blob
      return new Blob(['audio data would be here'], { type: 'audio/mpeg' });
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast.error('Error processing your voice input. Please try again.');
      throw error;
    }
  }
};
