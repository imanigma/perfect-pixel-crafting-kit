
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { toast } from "./ui/sonner";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { VoiceAssistant } from "./VoiceAssistant";

interface VoiceAssistantButtonProps {
  variant?: "fixed" | "inline";
  className?: string;
}

export function VoiceAssistantButton({ variant = "fixed", className = "" }: VoiceAssistantButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { 
    isListening, 
    isSpeaking,
    startListening, 
    stopListening 
  } = useVoiceAssistant({
    onProcessStart: () => toast.success("Processing your request..."),
    onProcessEnd: () => toast.success("Request processed!")
  });

  const toggleAssistant = () => {
    setIsExpanded(!isExpanded);
    if (isListening) {
      stopListening();
    }
  };

  // Base styles for the button
  const baseButtonStyle = `rounded-full p-3 shadow-xl
    ${isExpanded || isListening || isSpeaking
      ? "bg-[#2751B9] shadow-[0_0_20px_rgba(39,81,185,0.4)]" 
      : "bg-[#151515]/80 border border-[#2751B9]/30"}
    ${className}`;

  // Apply positioning based on variant
  const buttonStyle = variant === "fixed" 
    ? `fixed top-6 right-6 z-50 ${baseButtonStyle}`
    : baseButtonStyle;

  return (
    <>
      {/* Voice assistant button with conditional positioning */}
      <motion.button
        onClick={toggleAssistant}
        className={buttonStyle}
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(39,81,185,0.5)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isSpeaking ? (
          <Volume2 className="w-5 h-5 text-white animate-pulse" />
        ) : (
          <Mic className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Show full assistant panel when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <VoiceAssistant onClose={() => setIsExpanded(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
