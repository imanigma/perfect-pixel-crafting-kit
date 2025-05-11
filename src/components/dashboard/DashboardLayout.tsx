
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
        <div className="w-full flex flex-col items-center justify-center pt-24 pb-12">
          <FinanceHeader />
          
          {/* Spacer div to control spacing between header and cards */}
          <div className="h-[40px]"></div>
        </div>
        
        {/* Render children if provided, otherwise render FinanceCards */}
        {children || <FinanceCards />}
      </div>
    </div>
  );
}
