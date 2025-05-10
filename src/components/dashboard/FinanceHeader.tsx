
import React from "react";

export function FinanceHeader() {
  return (
    <header className="text-center max-w-[600px] mt-[69px] mb-[70px]">
      <div className="inline-block mb-3 px-4 py-2 bg-[#9b87f5]/10 rounded-full">
        <span className="text-[#9b87f5] font-medium text-sm">Trade Republic</span>
      </div>
      <h1 className="text-[42px] text-white font-bold leading-[48px] tracking-[-1.2px] mb-[15px]">
        Rethinking the Future of Fintech
      </h1>
      <p className="text-base text-[#8E9196] leading-6">
        Democratizing wealth through zero-fee investments.
        Access global markets and grow your portfolio with our commission-free platform.
      </p>
      <div className="mt-6 flex gap-3 justify-center">
        <button className="bg-[#9b87f5] hover:bg-[#8a76e4] transition-colors text-white font-medium px-5 py-2.5 rounded-lg">
          Get Started
        </button>
        <button className="bg-[#222832] hover:bg-[#2b323d] transition-colors border border-[#333945] text-white font-medium px-5 py-2.5 rounded-lg">
          Learn More
        </button>
      </div>
    </header>
  );
}
