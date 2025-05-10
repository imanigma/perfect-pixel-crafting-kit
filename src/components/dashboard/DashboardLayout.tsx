
import React, { useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";

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
      
      // Apply the rotation to the globe
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
          <div 
            ref={globeRef}
            className="relative w-[800px] h-[800px] mx-auto transition-transform duration-200 ease-out"
          >
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#2751B9]/20 via-transparent to-transparent blur-3xl opacity-40 animate-pulse"></div>
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-[600px] h-[600px] animate-float">
                <div className="absolute inset-0 rounded-full bg-[#151515]/50 backdrop-blur-sm border border-[#2751B9]/20"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2751B9]/10 to-transparent opacity-60"></div>
                <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80')] bg-cover opacity-20 animate-slow-spin"></div>
                </div>
                <div className="absolute inset-0 rounded-full border border-[#2751B9]/10"></div>
                <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#2751B9]/30 animate-slow-spin"></div>
                <div className="absolute inset-0 rounded-full border-b border-l border-[#2751B9]/20 animate-reverse-spin"></div>
              </div>
            </div>
          </div>
          <FinanceCards />
        </div>
      </div>
    </div>
  );
}
