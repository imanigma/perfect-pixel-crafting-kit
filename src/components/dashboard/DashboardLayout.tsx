
import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export function DashboardLayout() {
  const globeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Handle globe rotation based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!globeRef.current || scrolled) return;
      
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
  }, [scrolled]);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Check if user has scrolled enough to transition
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.2; // 20% of viewport height
      
      if (scrollPosition > threshold && !scrolled) {
        setScrolled(true);
        
        // After animation completes
        setTimeout(() => {
          setAnimationComplete(true);
        }, 1000);
      } else if (scrollPosition <= threshold && scrolled) {
        setScrolled(false);
        setAnimationComplete(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <div 
      ref={containerRef} 
      className="min-h-[200vh] bg-[#090B18] relative overflow-hidden"
    >
      {/* Initial animation section */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <div className="flex min-h-screen relative overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col items-center relative">
            <div className="w-full h-screen flex flex-col items-center justify-center">
              {/* Globe animation container */}
              <motion.div
                className="w-full h-full absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: scrolled ? 0 : 1,
                  scale: scrolled ? 0.8 : 1
                }}
                transition={{ duration: 0.7 }}
              >
                {/* Globe visualization */}
                <div className="relative w-full">
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#3F51B5]/10 to-transparent blur-[100px] opacity-40"></div>
                  </motion.div>
                  
                  <div 
                    ref={globeRef}
                    className="relative w-full h-[600px] transition-transform duration-200 ease-out"
                  >
                    <motion.div 
                      className="w-full h-full flex items-center justify-center overflow-hidden"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                    >
                      <div className="relative w-full h-full max-w-[700px] max-h-[700px]">
                        {/* Colorful globe texture overlay */}
                        <div className="absolute inset-0 rounded-full overflow-hidden opacity-90 bottom-[-20%] h-[120%]">
                          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1614852207379-e248281674c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80')] bg-cover mix-blend-color-dodge opacity-90 animate-slow-spin rounded-[50%_50%_0_0]"></div>
                        </div>

                        {/* Dynamic globe rings */}
                        <motion.div 
                          className="absolute inset-0 rounded-full border-4 border-[#3F51B5]/20"
                          animate={{ 
                            rotate: 360,
                            borderColor: ['rgba(63,81,181,0.2)', 'rgba(63,81,181,0.4)', 'rgba(63,81,181,0.2)']
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                          className="absolute inset-4 rounded-full border-2 border-[#5C6BC0]/30"
                          animate={{ 
                            rotate: -360,
                            borderColor: ['rgba(92,107,192,0.3)', 'rgba(92,107,192,0.5)', 'rgba(92,107,192,0.3)']
                          }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Scroll indicator */}
                <motion.div 
                  className="absolute bottom-10 flex flex-col items-center text-white"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <p className="text-sm text-[#8E9196] mb-2">Scroll to explore</p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5L12 19" stroke="#8E9196" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 12L12 19L5 12" stroke="#8E9196" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>

              {/* Content that fades in after scrolling */}
              <motion.div 
                className="w-full h-full absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolled ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Central voice assistant circle */}
                <motion.div
                  className="z-20 mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="w-32 h-32 rounded-full bg-[#3F51B5]/30 backdrop-blur-xl flex items-center justify-center border border-[#3F51B5]/30 shadow-[0_0_40px_rgba(63,81,181,0.4)]">
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-[#3F51B5]/20 backdrop-blur-xl flex items-center justify-center border border-[#3F51B5]/30"
                      animate={{ 
                        boxShadow: ['0 0 0 rgba(63,81,181,0.3)', '0 0 20px rgba(63,81,181,0.6)', '0 0 0 rgba(63,81,181,0.3)'] 
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-[#3F51B5]/20 flex items-center justify-center"
                      >
                        <Mic className="w-8 h-8 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
                
                <FinanceHeader />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards section below the fold */}
      <div className={`relative ${animationComplete ? 'block' : 'hidden'}`}>
        <FinanceCards />
      </div>

      {/* Add empty space at the end to allow scrolling */}
      <div className="h-screen"></div>
    </div>
  );
}
