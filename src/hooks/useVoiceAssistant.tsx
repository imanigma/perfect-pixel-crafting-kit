
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/components/ui/sonner';
import { VoiceAssistantMessage, UseVoiceAssistantOptions } from '@/features/voice/types';
import { audioUtils, setupSpeechRecognition } from '@/features/voice/audioUtils';
import { voiceProcessingService } from '@/features/voice/voiceProcessingService';
import { speechService } from '@/services/voice/speechService';

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const lastResponseRef = useRef<string>("");

  // Create audio element for playback
  useEffect(() => {
    audioRef.current = audioUtils.createAudioElement();
    audioRef.current.onplay = () => setIsSpeaking(true);
    audioRef.current.onended = () => setIsSpeaking(false);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Clean up any active media stream
      if (streamRef.current) {
        audioUtils.cleanupMediaStream(streamRef.current);
      }
    };
  }, []);

  // Setup SpeechRecognition
  useEffect(() => {
    recognitionRef.current = setupSpeechRecognition();
    
    if (recognitionRef.current) {
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
      // Request microphone access and start recording
      const { mediaRecorder, stream } = await audioUtils.startRecording();
      
      mediaRecorderRef.current = mediaRecorder;
      streamRef.current = stream;
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Set up what happens when recording stops
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
        if (streamRef.current) {
          audioUtils.cleanupMediaStream(streamRef.current);
        }
      };
      
      // Start recognition
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
        mediaRecorderRef.current.stop();
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

      // Get the current page context
      const pageContext = voiceProcessingService.getPageContext();
      
      try {
        // Try to get the mock response directly as fallback
        lastResponseRef.current = await speechService.mockChatCompletion(
          inputText,
          pageContext,
          !!options.genZMode
        );
        
        // Process with our backend service
        const responseBlob = await voiceProcessingService.processAudio(
          audioBlob, 
          inputText, 
          pageContext, 
          !!options.genZMode
        );
        
        // Create a URL for the audio blob and play it
        if (audioRef.current) {
          const audioUrl = URL.createObjectURL(responseBlob);
          audioRef.current.src = audioUrl;
          audioRef.current.play();
          setIsSpeaking(true);
        }
        
        // Add AI response to conversation
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: lastResponseRef.current || "I've processed your request." 
          }]);
          
          setIsProcessing(false);
          if (options.onProcessEnd) {
            options.onProcessEnd();
          }
        }, 500);
      } catch (error) {
        handleProcessingError();
      }
    } catch (error) {
      handleProcessingError();
    }
  };

  // Handle text input
  const handleTextSubmit = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message to conversation
    setMessages(prev => [...prev, { role: "user", content: text }]);
    
    try {
      setIsProcessing(true);
      if (options.onProcessStart) {
        options.onProcessStart();
      }
      
      // Get the current page context
      const pageContext = voiceProcessingService.getPageContext();
      
      try {
        // Try to get the mock response directly as fallback
        lastResponseRef.current = await speechService.mockChatCompletion(
          text,
          pageContext,
          !!options.genZMode
        );
        
        // Process with our backend service
        const responseBlob = await voiceProcessingService.processTextInput(
          text,
          pageContext,
          !!options.genZMode
        );
        
        // Play the audio response
        if (audioRef.current) {
          const audioUrl = URL.createObjectURL(responseBlob);
          audioRef.current.src = audioUrl;
          audioRef.current.play();
          setIsSpeaking(true);
        }
        
        // Add AI response to conversation
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: lastResponseRef.current || "I've processed your request." 
          }]);
          
          setUserInput("");
          setIsProcessing(false);
          if (options.onProcessEnd) {
            options.onProcessEnd();
          }
        }, 500);
      } catch (error) {
        handleProcessingError();
        setUserInput("");
      }
    } catch (error) {
      handleProcessingError();
    }
  };

  // Helper function for handling processing errors
  const handleProcessingError = () => {
    console.error("Error processing request");
    setIsProcessing(false);
    if (options.onProcessEnd) {
      options.onProcessEnd();
    }
    toast.error("Error processing your request. Please try again.");
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
