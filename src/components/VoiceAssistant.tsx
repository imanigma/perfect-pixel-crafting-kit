
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      toast.info("Voice assistant stopped listening");
    } else {
      setIsListening(true);
      toast.success("Voice assistant is listening...");
      
      // Simulate processing after 3 seconds
      setTimeout(() => {
        setIsProcessing(true);
        
        // Simulate response after 2 more seconds
        setTimeout(() => {
          setIsProcessing(false);
          setIsListening(false);
          toast.success("Your portfolio gained 2.3% last month with strongest performance in tech stocks");
        }, 2000);
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleListening}
          className={`
            w-12 h-12 rounded-full p-0 flex items-center justify-center
            ${isListening 
              ? 'bg-gradient-to-r from-[#2751B9] to-[#3962c8] shadow-lg shadow-[#2751B9]/20' 
              : 'bg-[#151515] border border-[#333945]'}
          `}
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="listening"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative"
              >
                <MicOff size={20} className="text-white z-10" />
                {isProcessing && (
                  <motion.div 
                    className="absolute inset-[-8px] rounded-full border-2 border-[#3962c8]"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.6, 1]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="not-listening"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Mic size={20} className="text-[#2751B9]" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
      
      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-16 right-0 bg-[#151515] border border-[#333945] p-3 rounded-lg shadow-lg mb-2 w-[280px]"
        >
          <p className="text-xs text-[#8E9196] mb-1">
            {isProcessing ? "Processing..." : "Listening..."}
          </p>
          <p className="text-sm text-white">
            {isProcessing 
              ? "Analyzing your portfolio data..." 
              : "Say something like \"Summarize my portfolio performance\""}
          </p>
          
          {isProcessing && (
            <div className="mt-2 flex gap-1">
              <motion.div 
                className="h-1 w-1 rounded-full bg-[#2751B9]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
              />
              <motion.div 
                className="h-1 w-1 rounded-full bg-[#2751B9]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
              />
              <motion.div 
                className="h-1 w-1 rounded-full bg-[#2751B9]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.1 }}
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
