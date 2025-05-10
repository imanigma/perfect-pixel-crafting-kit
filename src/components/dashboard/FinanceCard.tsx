import React from "react";

interface FinanceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FinanceCard({ title, description, icon }: FinanceCardProps) {
  return (
    <article className="bg-[#1D1D41] w-[166px] p-4 rounded-3xl">
      <div>{icon}</div>
      <div className="mt-1">
        <h2 className="text-2xl text-white font-bold">{title}</h2>
        <p className="text-base text-[#8C89B4]">{description}</p>
      </div>
    </article>
  );
}
