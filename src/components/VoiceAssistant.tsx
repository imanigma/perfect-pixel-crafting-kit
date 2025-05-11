
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { toast } from "./ui/sonner";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

export function VoiceAssistant() {
  const [isActive, setIsActive] = useState(false);
  const [genZMode, setGenZMode] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    isListening, 
    isSpeaking, 
    isProcessing,
    userInput, 
    messages, 
    setUserInput, 
    startListening, 
    stopListening, 
    handleTextSubmit 
  } = useVoiceAssistant({
    genZMode,
    onProcessStart: () => console.log("Processing started..."),
    onProcessEnd: () => console.log("Processing complete")
  });

  const toggleAssistant = () => {
    setIsActive(!isActive);
    if (!isActive) {
      console.log("Voice assistant activated");
    } else {
      if (isListening) {
        stopListening();
      }
      console.log("Voice assistant deactivated");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleTextSubmit(userInput);
    }
  };

  return (
    <>
      {/* Fixed voice assistant button */}
      <motion.button
        onClick={toggleAssistant}
        className={`fixed bottom-8 right-8 z-50 rounded-full p-4 shadow-xl
          ${isActive 
            ? "bg-[#2751B9] shadow-[0_0_25px_rgba(39,81,185,0.4)]" 
            : "bg-[#151515]/80 border border-[#2751B9]/30"}`}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(39,81,185,0.5)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isSpeaking ? (
          <Volume2 className="w-6 h-6 text-white animate-pulse" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Expanded assistant interface */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-80 bg-[#151515]/95 backdrop-blur-md border border-[#2751B9]/30 rounded-2xl p-5 shadow-2xl shadow-[#2751B9]/20 z-40"
          >
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-24 h-24 rounded-full bg-[#151515] border-2 border-[#2751B9]/50 flex items-center justify-center mb-4"
                animate={{ 
                  boxShadow: isListening || isSpeaking || isProcessing
                    ? ['0 0 0 rgba(39,81,185,0.4)', '0 0 20px rgba(39,81,185,0.8)', '0 0 0 rgba(39,81,185,0.4)'] 
                    : '0 0 0 rgba(39,81,185,0.4)'
                }}
                transition={{ 
                  repeat: (isListening || isSpeaking || isProcessing) ? Infinity : 0, 
                  duration: 1.5 
                }}
              >
                <motion.button
                  onClick={toggleListening}
                  disabled={isProcessing}
                  className={`w-20 h-20 rounded-full ${isListening ? 'bg-[#2751B9]/40' : 'bg-[#2751B9]/20'} flex items-center justify-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isListening ? (
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: [1, 1.2, 1], 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                      }}
                    >
                      <Mic className="w-10 h-10 text-[#2751B9]" />
                    </motion.div>
                  ) : (
                    <MicOff className="w-10 h-10 text-[#2751B9]/70" />
                  )}
                </motion.button>
              </motion.div>
              
              <h3 className="text-white text-xl font-semibold mb-2">
                {isListening 
                  ? "Listening..." 
                  : isSpeaking 
                    ? "Speaking..." 
                    : isProcessing
                      ? "Processing..." 
                      : "Trade Republic Assistant"}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-[#8E9196]">Gen Z Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={genZMode} 
                    onChange={() => setGenZMode(!genZMode)}
                  />
                  <div className="w-11 h-6 bg-[#222222] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2751B9]"></div>
                </label>
              </div>
              
              {/* Conversation history */}
              <div className="w-full h-48 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-[#2751B9]/20 scrollbar-track-transparent p-2">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-2 p-2 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-[#2751B9]/20 ml-8' 
                        : 'bg-[#222222] mr-8'
                    }`}
                  >
                    <p className="text-sm text-white">{message.content}</p>
                  </div>
                ))}
              </div>
              
              {isListening && userInput && (
                <div className="w-full bg-[#222222] rounded-lg p-2 mb-4">
                  <p className="text-sm text-[#8E9196]">I heard:</p>
                  <p className="text-sm text-white">{userInput || "..."}</p>
                </div>
              )}
              
              {/* Text input as an alternative to voice */}
              <form onSubmit={handleSubmit} className="w-full flex">
                <textarea
                  ref={textAreaRef}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full bg-[#222222] rounded-lg p-3 text-white text-sm resize-none border border-[#333333] focus:border-[#2751B9] focus:outline-none"
                  rows={2}
                  disabled={isListening || isProcessing}
                />
                <button 
                  type="submit" 
                  className="ml-2 bg-[#2751B9] text-white p-2 rounded-lg"
                  disabled={!userInput.trim() || isListening || isProcessing}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
