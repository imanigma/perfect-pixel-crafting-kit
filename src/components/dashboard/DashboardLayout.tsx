
import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { toast } from "../ui/sonner";

export function DashboardLayout() {
  const globeRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const recognitionRef = useRef<any>(null);
  
  // SpeechRecognition setup
  useEffect(() => {
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
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          // If we're still supposed to be listening, restart
          recognitionRef.current.start();
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!globeRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate rotation based on mouse position
      const rotateX = (clientY / innerHeight - 0.5) * 10;
      const rotateY = (clientX / innerWidth - 0.5) * 10;
      
      // Apply the rotation to the globe with smoother transitions
      globeRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    
    setIsListening(prevState => {
      const newListeningState = !prevState;
      
      if (newListeningState) {
        setUserInput("");
        recognitionRef.current.start();
        toast.success("Listening... Ask me about your finances");
      } else {
        recognitionRef.current.stop();
        
        if (userInput.trim()) {
          handleUserQuery(userInput);
        }
      }
      
      return newListeningState;
    });
  };

  // Mock function to handle user queries
  const handleUserQuery = (query: string) => {
    // Simple responses based on keywords
    let response = "";
    
    if (query.toLowerCase().includes("portfolio") || query.toLowerCase().includes("earnings") || query.toLowerCase().includes("losses")) {
      response = "Your portfolio has grown by 3.2% in the last month. Your tech investments performed particularly well with a 5.7% gain.";
    }
    else if (query.toLowerCase().includes("market") || query.toLowerCase().includes("trends")) {
      response = "Current market trends show technology and renewable energy sectors outperforming the general market. There's volatility in financial services due to recent regulatory changes.";
    }
    else if (query.toLowerCase().includes("recommend") || query.toLowerCase().includes("invest")) {
      response = "Based on your risk profile and goals, I'd suggest diversifying into index ETFs with a small allocation to emerging markets. Would you like more specific recommendations?";
    }
    else {
      response = "I'm not sure I understood that query. Could you rephrase it? You can ask me about your portfolio performance, market trends, or investment recommendations.";
    }
    
    toast.success(response);
  };
  
  return (
    <div className="flex min-h-screen bg-[#090B18] relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center relative">
        <div className="w-full h-screen flex flex-col items-center justify-center">
          {/* Central voice assistant circle */}
          <motion.div
            className="z-20 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="w-32 h-32 rounded-full bg-[#111111]/80 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: isListening 
                  ? ['0 0 0 rgba(255,255,255,0.1)', '0 0 20px rgba(255,255,255,0.3)', '0 0 0 rgba(255,255,255,0.1)'] 
                  : '0 0 0 rgba(255,255,255,0.1)'
              }}
              transition={{ 
                repeat: isListening ? Infinity : 0, 
                duration: 1.5 
              }}
              onClick={toggleListening}
            >
              <motion.div
                className={`w-24 h-24 rounded-full ${isListening ? 'bg-white/10' : 'bg-black/40'} flex items-center justify-center cursor-pointer`}
                animate={{ 
                  scale: isListening ? [1, 1.1, 1] : 1,
                }}
                transition={{ 
                  repeat: isListening ? Infinity : 0, 
                  duration: 1.5 
                }}
              >
                {isListening ? (
                  <Mic className="w-10 h-10 text-white" />
                ) : (
                  <MicOff className="w-10 h-10 text-white/70" />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
          
          <FinanceHeader />
          
          {/* Globe visualization */}
          <div className="relative w-full mt-16">
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-[100px] opacity-40"></div>
            </motion.div>
            
            <div 
              ref={globeRef}
              className="relative w-full h-[400px] transition-transform duration-200 ease-out"
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <motion.div 
                  className="relative w-full h-full max-w-[700px] max-h-[700px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {/* Grayscale texture overlay */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-90 bottom-[-20%] h-[120%]">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1614852207379-e248281674c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80')] bg-cover grayscale mix-blend-color-dodge opacity-40 animate-slow-spin rounded-[50%_50%_0_0]"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {isListening && userInput && (
            <motion.div 
              className="absolute bottom-48 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-lg border border-white/10 p-4 rounded-xl max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <p className="text-white/70 text-sm mb-1">I heard:</p>
              <p className="text-white text-base">{userInput}</p>
            </motion.div>
          )}
        </div>
        
        <FinanceCards />
      </div>
    </div>
  );
}
