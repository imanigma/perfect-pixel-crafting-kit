
import React, { useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const globeRef = useRef<HTMLDivElement>(null);
  
  // Globe effect with mouse tracking
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
    <div className="flex min-h-screen bg-[#090B18] relative overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center relative pb-20">
        <div className="w-full min-h-screen flex flex-col items-center">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-16">
            <FinanceHeader />
          </div>
          
          {/* Globe visualization - reduced size and compact spacing */}
          <div className="relative w-full mt-2">
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-[100px] opacity-40"></div>
            </motion.div>
            
            <div 
              ref={globeRef}
              className="relative w-full h-[180px] sm:h-[200px] transition-transform duration-200 ease-out"
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <motion.div 
                  className="relative w-full h-full max-w-[450px] max-h-[450px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {/* Grayscale texture overlay */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-90 bottom-[-20%] h-[120%]">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1614852207379-e248281674c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80')] bg-cover grayscale mix-blend-color-dodge opacity-40 animate-slow-spin rounded-[50%_50%_0_0]"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Render children if provided, otherwise render FinanceCards with tighter spacing */}
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
          {children || <FinanceCards />}
        </div>
      </div>
    </div>
  );
}
