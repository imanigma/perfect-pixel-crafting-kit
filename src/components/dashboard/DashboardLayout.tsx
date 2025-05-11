
import React from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#090B18] relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center relative">
        <div className="w-full flex flex-col items-center justify-center pt-20 pb-4">
          <FinanceHeader />
          
          {/* Reduced spacer height between header and cards */}
          <div className="h-[16px]"></div>
        </div>
        
        {/* Render children if provided, otherwise render FinanceCards */}
        {children || <FinanceCards />}
      </div>
    </div>
  );
}
