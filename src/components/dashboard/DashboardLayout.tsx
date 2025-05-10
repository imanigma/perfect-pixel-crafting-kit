
import React from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#1A1F2C] relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center">
        <FinanceHeader />
        <div className="relative w-full px-[230px] max-md:px-[100px] max-sm:px-5">
          <div className="flex justify-center items-center">
            <div className="w-[713px] h-[609px] mx-auto relative">
              <div className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-[#9b87f5]/20 via-transparent to-transparent blur-3xl opacity-40"></div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/83976e8b4565311dcceb136f9b0a3bb16111cbe1"
                alt="Trade Republic visualization"
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </div>
          <FinanceCards />
        </div>
      </div>
    </div>
  );
}
