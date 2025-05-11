
import React from "react";
import { motion } from "framer-motion";

interface FinanceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "standard" | "premium";
}

export function FinanceCard({ 
  title, 
  description, 
  icon, 
  onClick, 
  variant = "standard" 
}: FinanceCardProps) {
  return (
    <motion.article 
      className={`
        relative w-[200px] p-6 rounded-xl cursor-pointer transition-all duration-300
        ${variant === "standard" 
          ? "bg-[#151515] border border-[#333945] hover:bg-[#1c1c1c]" 
          : "bg-[#151515]/80 backdrop-blur-sm border border-[#2751B9]/30 hover:bg-[#1c1c1c]/80"}
        ${variant === "premium" && "shadow-[0_0_15px_rgba(39,81,185,0.2)]"}
        card-hover
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        boxShadow: variant === "premium" ? "0 0 20px rgba(39,81,185,0.35)" : "none" 
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {variant === "premium" && (
        <div className="absolute -inset-[0.5px] rounded-xl bg-gradient-to-r from-[#2751B9]/40 via-[#3962c8]/40 to-[#2751B9]/40 blur-[1px] -z-10" />
      )}
      <div className={`mb-3 ${variant === "premium" ? "text-[#3962c8]" : "text-[#2751B9]"}`}>
        {icon}
      </div>
      <div>
        <h2 className="text-xl text-white font-semibold mb-1">{title}</h2>
        <p className="text-sm text-[#8E9196] leading-relaxed">{description}</p>
      </div>
      {variant === "premium" && (
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-[#2751B9]/40 to-transparent rounded-bl-xl rounded-tr-xl opacity-60" />
      )}
    </motion.article>
  );
}
