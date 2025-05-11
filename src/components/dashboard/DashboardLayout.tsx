
import React, { useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";
import { VoiceAssistant } from "../VoiceAssistant";
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
    <div className="flex min-h-screen bg-[#000000] relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center">
        <FinanceHeader />
        <div className="relative w-full px-6 flex-1 flex flex-col items-center justify-center">
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
                <div className="absolute inset-0 rounded-full bg-[#151515]/50 backdrop-blur-sm border border-[#2751B9]/20"></div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2751B9]/10 to-transparent opacity-60"></div>
                
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
      
      {/* Add the Voice Assistant component */}
      <VoiceAssistant />
    </div>
  );
}
