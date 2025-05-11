
import React from "react";
import { motion } from "framer-motion";
import { VoiceAssistantButton } from "../VoiceAssistantButton";

export function FinanceHeader() {
  return (
    <div className="w-full max-w-7xl px-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Dashboard
          </motion.div>
        </h1>
        
        {/* Voice Assistant Button (inline variant) */}
        <VoiceAssistantButton variant="inline" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-[#8E9196] mb-2"
      >
        Welcome back! Here is an overview of your financial portfolio.
      </motion.div>
    </div>
  );
}
