
import React, { useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";
import { motion } from "framer-motion";

export function DashboardLayout() {
  const globeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!globeRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate rotation based on mouse position
      const rotateX = (clientY / innerHeight - 0.5) * 10;
      const rotateY = (clientX / innerWidth - 0.5) * 10;
      
      // Apply the rotation to the globe with smoother transitions
      globeRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="flex min-h-screen bg-[#090B18] relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center">
        <FinanceHeader />
        <div className="relative w-full px-6 flex-1 flex flex-col items-center justify-center">
          {/* Central voice assistant circle */}
          <motion.div
            className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-40 h-40 rounded-full bg-[#151530]/30 backdrop-blur-xl flex items-center justify-center border border-[#2751B9]/20 shadow-[0_0_40px_rgba(39,81,185,0.2)]">
              <motion.div 
                className="w-28 h-28 rounded-full bg-[#151530]/70 backdrop-blur-xl flex items-center justify-center border border-[#2751B9]/30"
                animate={{ 
                  boxShadow: ['0 0 0 rgba(39,81,185,0.3)', '0 0 20px rgba(39,81,185,0.6)', '0 0 0 rgba(39,81,185,0.3)'] 
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#2751B9]/20 flex items-center justify-center"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#2751B9]">
                    <path d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.35 9.65V11.35C4.35 15.57 7.78 19 12 19C16.22 19 19.65 15.57 19.65 11.35V9.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.61 6.43C11.51 6.1 12.49 6.1 13.39 6.43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.2 8.55C11.73 8.41 12.28 8.41 12.81 8.55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Voice assistant text */}
            <motion.div 
              className="absolute top-44 left-1/2 transform -translate-x-1/2 text-center w-96"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">All your finances..</h2>
              <p className="text-[#8E9196] text-base leading-relaxed">
                Earn 2.25% interest on unlimited cash with your current account. 
                Get your subscription free card to spend and earn 1% Saveback.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#2751B9]/5 to-transparent blur-[100px] opacity-40"></div>
          </motion.div>
          
          <div 
            ref={globeRef}
            className="relative w-[800px] h-[800px] mx-auto transition-transform duration-200 ease-out"
          >
            {/* Ambient glow effect */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#2751B9]/10 via-transparent to-transparent blur-3xl opacity-40"></div>
            
            <div className="w-full h-full flex items-center justify-center">
              <motion.div 
                className="relative w-[600px] h-[600px]"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut"
                }}
              >
                {/* Base globe layer */}
                <div className="absolute inset-0 rounded-full bg-[#151530]/50 backdrop-blur-sm border border-[#2751B9]/20"></div>
                
                {/* Colorful oil-like texture overlay */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-70">
                  <div className="w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1614852207379-e248281674c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80')] bg-cover mix-blend-color-dodge opacity-40 animate-slow-spin"></div>
                </div>
                
                {/* Digital grid overlay */}
                <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')] bg-cover opacity-20 animate-slow-spin"></div>
                </div>
                
                {/* Border styling */}
                <div className="absolute inset-0 rounded-full border border-[#2751B9]/10"></div>
                
                {/* Animated border rings */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#2751B9]/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                <motion.div 
                  className="absolute inset-0 rounded-full border-b border-l border-[#2751B9]/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                {/* Particle effect */}
                <div className="absolute inset-0">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-[#2751B9]/80 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          
          <FinanceCards />
        </div>
      </div>
    </div>
  );
}
