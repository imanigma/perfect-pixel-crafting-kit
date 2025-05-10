
import React from "react";
import { motion } from "framer-motion";

interface FinanceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function FinanceCard({ title, description, icon, onClick }: FinanceCardProps) {
  return (
    <motion.article 
      className="bg-[#151515] border border-[#333945] w-[200px] p-6 rounded-xl hover:bg-[#1c1c1c] transition-colors cursor-pointer card-hover"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-3 text-[#2751B9]">{icon}</div>
      <div>
        <h2 className="text-xl text-white font-semibold mb-1">{title}</h2>
        <p className="text-sm text-[#8E9196] leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
}
