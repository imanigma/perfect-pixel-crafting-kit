import React from "react";
import { Sidebar } from "./Sidebar";
import { FinanceHeader } from "./FinanceHeader";
import { FinanceCards } from "./FinanceCards";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#15141D] relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center">
        <FinanceHeader />
        <div className="relative w-full px-[230px] max-md:px-[100px] max-sm:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83976e8b4565311dcceb136f9b0a3bb16111cbe1"
            alt="Dashboard visualization"
            className="w-[713px] h-[609px] mx-auto"
          />
          <FinanceCards />
        </div>
      </div>
    </div>
  );
}
