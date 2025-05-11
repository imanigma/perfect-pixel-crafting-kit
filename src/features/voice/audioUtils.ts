
import { toast } from '@/components/ui/sonner';

/**
 * Utility functions for audio recording and playback
 */
export const audioUtils = {
  /**
   * Creates a MediaRecorder instance and starts recording
   */
  startRecording(): Promise<{
    mediaRecorder: MediaRecorder;
    stream: MediaStream;
  }> {
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        return { mediaRecorder, stream };
      })
      .catch((error) => {
        console.error("Error starting recording:", error);
        toast.error("Could not access microphone. Please check permissions.");
        throw error;
      });
  },

  /**
   * Creates an audio element for playback
   */
  createAudioElement(): HTMLAudioElement {
    const audioElement = new Audio();
    return audioElement;
  },

  /**
   * Clean up the media stream by stopping all tracks
   */
  cleanupMediaStream(stream: MediaStream): void {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }
};

/**
 * Sets up SpeechRecognition
 */
export const setupSpeechRecognition = (): SpeechRecognition | null => {
  if (typeof window !== 'undefined') {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      return recognition;
    }
  }
  return null;
};
