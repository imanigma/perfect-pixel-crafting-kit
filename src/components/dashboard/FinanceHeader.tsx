
import React from "react";
import { motion } from "framer-motion";

export function FinanceHeader() {
  return (
    <header className="text-center w-full max-w-[600px] mt-[40px] mb-[40px] px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-3 px-4 py-2 bg-[#2751B9]/10 rounded-full"
      >
        <span className="text-[#2751B9] font-medium text-sm">Trade Republic</span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-[42px] text-white font-bold leading-[48px] tracking-[-1.2px] mb-[15px]"
      >
        Welcome to the Future of Finance
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base text-[#8E9196] leading-6"
      >
        Democratizing wealth through zero-fee investments.
        Access global markets and grow your portfolio with our AI-powered platform.
      </motion.p>
    </header>
  );
}
