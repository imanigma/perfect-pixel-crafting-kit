
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/components/ui/sonner';
import { voiceAssistantService } from '@/services/voiceAssistantService';

interface VoiceAssistantMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface UseVoiceAssistantOptions {
  onProcessStart?: () => void;
  onProcessEnd?: () => void;
  genZMode?: boolean;
}

export function useVoiceAssistant(options: UseVoiceAssistantOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<VoiceAssistantMessage[]>([
    { role: "assistant", content: "How can I help with your finances today?" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Setup SpeechRecognition
  useEffect(() => {
    // We define a window-level type declaration to help TypeScript
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join("");
          
          setUserInput(transcript);
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          toast.error("Speech recognition error. Please try again.");
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error("Error stopping recognition:", error);
        }
      }
    };
  }, []);

  // Function to start listening
  const startListening = async () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    try {
      // Request microphone access first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup MediaRecorder for audio capture
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Start recording
      mediaRecorderRef.current.start();
      recognitionRef.current.start();
      setIsListening(true);
      setUserInput("");
      toast.success("Listening... Ask me about your finances");
    } catch (error) {
      console.error("Error starting listening:", error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  // Function to stop listening and process audio
  const stopListening = async () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        // Finalize the recording
        mediaRecorderRef.current.stop();
        
        // Wait for the data to be available
        mediaRecorderRef.current.onstop = async () => {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            // Add user message to conversation
            if (userInput.trim()) {
              setMessages(prev => [...prev, { role: "user", content: userInput }]);
              
              // Process the audio
              await processAudio(audioBlob, userInput);
            }
          }
          
          // Clean up the media stream
          if (mediaRecorderRef.current?.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
          }
        };
      }
      
      setIsListening(false);
    }
  };

  // Process the audio recording
  const processAudio = async (audioBlob: Blob, inputText: string) => {
    if (!inputText.trim()) return;
    
    try {
      setIsProcessing(true);
      if (options.onProcessStart) {
        options.onProcessStart();
      }

      // Get the current page context - in a real app, this would be more dynamic
      const pageContext = document.title + " - " + window.location.pathname;
      
      // Process with our service
      await voiceAssistantService.processVoiceInput(
        audioBlob, 
        pageContext, 
        !!options.genZMode
      );
      
      // Simulate AI response - in a real implementation, this would come from the API
      setTimeout(() => {
        const mockResponses = [
          "Your portfolio has grown by 3.2% in the last month. Your tech investments performed particularly well with a 5.7% gain.",
          "Based on your transaction history, you've been averaging about $1,700 per stock purchase. Your bank balance is currently $4,947.25.",
          "I've analyzed your investment pattern. You seem to favor tech stocks, which make up about 65% of your portfolio.",
          "Current market trends show technology and renewable energy sectors outperforming the general market. Your portfolio is well-positioned."
        ];
        
        const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        
        // Add AI response to conversation
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        setIsSpeaking(true);
        
        // Simulate speaking ending
        setTimeout(() => {
          setIsSpeaking(false);
          setIsProcessing(false);
          if (options.onProcessEnd) {
            options.onProcessEnd();
          }
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error("Error processing audio:", error);
      setIsProcessing(false);
      if (options.onProcessEnd) {
        options.onProcessEnd();
      }
      toast.error("Error processing your request. Please try again.");
    }
  };

  // Handle text input
  const handleTextSubmit = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message to conversation
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setUserInput("");
    
    try {
      setIsProcessing(true);
      if (options.onProcessStart) {
        options.onProcessStart();
      }
      
      // Get the current page context
      const pageContext = document.title + " - " + window.location.pathname;
      
      // Create an empty audio blob for consistency with voice API
      const emptyAudioBlob = new Blob([], { type: 'audio/webm' });
      
      // Process with our service (this is simplified; in a real app we might have a separate text endpoint)
      await voiceAssistantService.processVoiceInput(
        emptyAudioBlob, 
        pageContext, 
        !!options.genZMode
      );
      
      // Simulate AI response
      setTimeout(() => {
        const mockResponses = [
          "Based on your question, I can see that your portfolio has a good balance of growth and value stocks. Your asset allocation is 60% stocks, 30% bonds, and 10% cash.",
          "Looking at your transaction history, your most active trading period was last quarter when you made 15 trades, primarily in technology stocks.",
          "Your investment strategy appears to favor blue-chip companies with strong dividends. This is a relatively conservative approach that should provide steady returns.",
          "I notice you have limited exposure to international markets in your portfolio. Diversifying geographically might help reduce overall risk."
        ];
        
        const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        
        // Add AI response to conversation
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        setIsSpeaking(true);
        
        // Simulate speaking ending
        setTimeout(() => {
          setIsSpeaking(false);
          setIsProcessing(false);
          if (options.onProcessEnd) {
            options.onProcessEnd();
          }
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error("Error processing text input:", error);
      setIsProcessing(false);
      if (options.onProcessEnd) {
        options.onProcessEnd();
      }
      toast.error("Error processing your request. Please try again.");
    }
  };

  return {
    isListening,
    isSpeaking,
    isProcessing,
    userInput,
    messages,
    setUserInput,
    startListening,
    stopListening,
    handleTextSubmit
  };
}
