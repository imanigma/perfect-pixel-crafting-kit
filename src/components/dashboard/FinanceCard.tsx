
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
  // Special premium card titles that should get enhanced neon effects
  const specialCards = ["AI Advisor", "Financial Story", "Finance Journey"];
  const isSpecialCard = specialCards.includes(title);
  
  // Rename "Financial Story" to "Spend Map"
  const displayTitle = title === "Financial Story" ? "Spend Map" : title;
  
  // Define glow color based on the card type
  const glowColor = title === "AI Advisor" ? "#8B5CF6" : 
                    title === "Financial Story" ? "#0EA5E9" : 
                    title === "Finance Journey" ? "#F97316" : 
                    "#2751B9";
  
  return (
    <motion.article 
      className={`
        relative w-[210px] p-6 rounded-xl cursor-pointer transition-all duration-300
        ${variant === "standard" 
          ? "bg-[#151515]/80 border border-[#333333] shadow-md hover:shadow-lg hover:bg-[#202020]/90" 
          : "bg-[#111111]/90 backdrop-blur-sm border border-white/10 hover:bg-[#1A1A1A]/80"}
        ${variant === "premium" && !isSpecialCard && "shadow-[0_4px_25px_rgba(39,81,185,0.15)]"}
        ${isSpecialCard && variant === "premium" && "shadow-[0_8px_32px_rgba(39,81,185,0.3)]"}
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        boxShadow: isSpecialCard && variant === "premium"
          ? `0 0 30px ${glowColor}80`
          : variant === "premium" 
            ? "0 15px 30px rgba(0,0,0,0.25)" 
            : "0 10px 20px rgba(0,0,0,0.2)" 
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {variant === "premium" && (
        <>
          <div className={`absolute -inset-[1px] rounded-xl ${
            isSpecialCard 
              ? `bg-gradient-to-r from-${title === "AI Advisor" ? "purple" : title === "Financial Story" ? "blue" : "orange"}-400/20 via-white/20 to-${title === "AI Advisor" ? "purple" : title === "Financial Story" ? "blue" : "orange"}-400/20` 
              : "bg-gradient-to-r from-white/10 via-white/20 to-white/10"
          } blur-[1.5px] -z-10`} />
          
          <div className={`absolute -inset-[20px] ${
            isSpecialCard 
              ? `bg-${title === "AI Advisor" ? "purple" : title === "Financial Story" ? "blue" : "orange"}-400/5` 
              : "bg-white/5"
          } rounded-full blur-[25px] -z-20`} />
        </>
      )}
      
      {isSpecialCard && variant === "premium" && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-transparent opacity-30 z-[-5]" />
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
        <h2 className={`text-xl font-semibold mb-2 ${
          isSpecialCard && variant === "premium"
            ? `text-transparent bg-clip-text bg-gradient-to-r ${
                title === "AI Advisor" 
                  ? "from-purple-300 to-purple-500"
                  : title === "Financial Story" 
                    ? "from-blue-300 to-blue-500"
                    : "from-orange-300 to-orange-500"
              }`
            : "text-white"
        }`}>{displayTitle}</h2>
        <p className="text-sm text-[#8E9196] leading-relaxed">{description}</p>
      </motion.div>
      {variant === "premium" && (
        <>
          <div className="absolute top-3 right-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill={isSpecialCard ? glowColor : "#FFFFFF"}/>
              <path d="M12 5V3M12 21V19M5 12H3M21 12H19M18.364 18.364L16.95 16.95M18.364 5.636L16.95 7.05M5.636 18.364L7.05 16.95M5.636 5.636L7.05 7.05" stroke={isSpecialCard ? glowColor : "#FFFFFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {isSpecialCard && (
            <motion.div 
              className={`absolute bottom-0 right-0 w-20 h-20 rounded-bl-xl rounded-tr-xl opacity-30`}
              style={{
                background: `radial-gradient(circle at bottom right, ${glowColor}50, transparent 70%)`
              }}
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 3
              }}
            />
          )}
          
          {!isSpecialCard && (
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
          )}
        </>
      )}
    </motion.article>
  );
}
