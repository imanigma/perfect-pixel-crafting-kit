
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
        relative w-[210px] p-6 rounded-xl cursor-pointer transition-all duration-300
        ${variant === "standard" 
          ? "bg-[#151515]/80 border border-[#333333] hover:bg-[#202020]/90" 
          : "bg-[#111111]/90 backdrop-blur-sm border border-white/10 hover:bg-[#1A1A1A]/80"}
        ${variant === "premium" && "shadow-[0_0_25px_rgba(255,255,255,0.05)]"}
        card-hover
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        boxShadow: variant === "premium" ? "0 15px 30px rgba(0,0,0,0.2)" : "0 10px 20px rgba(0,0,0,0.15)" 
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {variant === "premium" && (
        <>
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-[1.5px] -z-10" />
          <div className="absolute -inset-[20px] bg-white/5 rounded-full blur-[20px] -z-20" />
        </>
      )}
      <motion.div 
        className={`mb-4 ${variant === "premium" ? "text-white" : "text-white"}`}
        whileHover={{ 
          rotate: [0, -5, 5, -5, 0],
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
      <motion.div
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        <h2 className="text-xl text-white font-semibold mb-2">{title}</h2>
        <p className="text-sm text-[#8E9196] leading-relaxed">{description}</p>
      </motion.div>
      {variant === "premium" && (
        <>
          <div className="absolute top-3 right-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#FFFFFF"/>
              <path d="M12 5V3M12 21V19M5 12H3M21 12H19M18.364 18.364L16.95 16.95M18.364 5.636L16.95 7.05M5.636 18.364L7.05 16.95M5.636 5.636L7.05 7.05" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <motion.div 
            className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-tl from-white/10 to-transparent rounded-bl-xl rounded-tr-xl opacity-80"
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
          />
        </>
      )}
    </motion.article>
  );
}
