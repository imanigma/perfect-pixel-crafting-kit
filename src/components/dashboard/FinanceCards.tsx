import React from "react";
import { FinanceCard } from "./FinanceCard";

export function FinanceCards() {
  const cardIcon = (
    <svg
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[65px] h-[65px]"
    >
      <rect x="10" y="10" width="45" height="45" rx="10" fill="#64CFF6"></rect>
      <path
        d="M27.0069 39.6844C27.0717 40.2329 27.5689 40.625 28.1173 40.5602L37.0551 39.5037C37.6036 39.4389 37.9957 38.9417 37.9308 38.3932C37.866 37.8448 37.3688 37.4527 36.8204 37.5175L28.8757 38.4566L27.9366 30.5119C27.8718 29.9634 27.3746 29.5714 26.8261 29.6362C26.2777 29.701 25.8856 30.1982 25.9504 30.7467L27.0069 39.6844ZM39.1459 25.4331L38.3607 24.8139L27.2147 38.9478L28 39.5671L28.7852 40.1863L39.9311 26.0523L39.1459 25.4331Z"
        fill="white"
      ></path>
    </svg>
  );

  return (
    <div className="absolute left-[236px] top-10 max-md:left-[100px] max-sm:left-5">
      <div className="grid grid-cols-2 gap-[640px] max-md:gap-[300px] max-sm:gap-5 max-sm:grid-cols-1">
        <div className="flex flex-col gap-5">
          <FinanceCard
            title="Stocks"
            description="Stocks overview"
            icon={cardIcon}
          />
          <FinanceCard
            title="Bonds"
            description="Stocks overview"
            icon={cardIcon}
          />
        </div>
        <div className="flex flex-col gap-5">
          <FinanceCard
            title="Dashboard"
            description="Stocks overview"
            icon={cardIcon}
          />
          <FinanceCard
            title="Crypto"
            description="Stocks overview"
            icon={cardIcon}
          />
        </div>
      </div>
    </div>
  );
}
