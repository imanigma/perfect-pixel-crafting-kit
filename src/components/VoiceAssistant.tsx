
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

export function VoiceAssistant() {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleAssistant = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Would connect to speech recognition here
      console.log("Voice assistant activated");
    } else {
      setIsListening(false);
      console.log("Voice assistant deactivated");
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    console.log(isListening ? "Stopped listening" : "Started listening");
  };

  return (
    <>
      {/* Fixed voice assistant button */}
      <motion.button
        onClick={toggleAssistant}
        className={`fixed bottom-8 right-8 z-50 rounded-full p-4 shadow-xl
          ${isActive ? "bg-[#2751B9]" : "bg-[#151515]/80 border border-[#2751B9]/30"}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mic className="w-6 h-6 text-white" />
      </motion.button>

      {/* Expanded assistant interface */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 w-80 bg-[#151515]/95 backdrop-blur-md border border-[#2751B9]/30 rounded-2xl p-5 shadow-2xl shadow-[#2751B9]/20 z-40"
          >
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-24 h-24 rounded-full bg-[#151515] border-2 border-[#2751B9]/50 flex items-center justify-center mb-4"
                animate={{ 
                  boxShadow: isListening 
                    ? ['0 0 0 rgba(39,81,185,0.4)', '0 0 20px rgba(39,81,185,0.8)', '0 0 0 rgba(39,81,185,0.4)'] 
                    : '0 0 0 rgba(39,81,185,0.4)'
                }}
                transition={{ 
                  repeat: isListening ? Infinity : 0, 
                  duration: 1.5 
                }}
              >
                <motion.button
                  onClick={toggleListening}
                  className="w-20 h-20 rounded-full bg-[#2751B9]/20 flex items-center justify-center"
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
                {isListening ? "Listening..." : "Trade Republic Assistant"}
              </h3>
              
              <p className="text-[#8E9196] text-sm text-center mb-4">
                {isListening 
                  ? "Speak now. I'm listening to your request..." 
                  : "Ask me anything about your finances or investments."}
              </p>
              
              {!isListening && (
                <div className="w-full">
                  <div className="bg-[#222222] rounded-lg p-3 mb-3">
                    <p className="text-sm text-[#8E9196]">Try saying:</p>
                    <p className="text-sm text-white">"How did my portfolio perform this month?"</p>
                  </div>
                  <div className="bg-[#222222] rounded-lg p-3">
                    <p className="text-sm text-[#8E9196]">Try saying:</p>
                    <p className="text-sm text-white">"What are today's market trends?"</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
