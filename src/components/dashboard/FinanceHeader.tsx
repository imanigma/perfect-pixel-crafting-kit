
import React from "react";
import { motion } from "framer-motion";
import { VoiceAssistantButton } from "../VoiceAssistantButton";

export function FinanceHeader() {
  return (
    <div className="w-full max-w-7xl px-6">
      {/* Voice Assistant Button at the top */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center mb-6"
      >
        <VoiceAssistantButton variant="inline" />
      </motion.div>
      
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tight text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Dashboard
          </motion.div>
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-[#8E9196] mb-2 text-center"
        >
          Welcome back! Here is an overview of your financial portfolio.
        </motion.div>
      </div>
    </div>
  );
}
