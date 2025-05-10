
import React from "react";

interface FinanceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FinanceCard({ title, description, icon }: FinanceCardProps) {
  return (
    <article className="bg-[#151515] border border-[#333945] w-[180px] p-5 rounded-xl hover:bg-[#1c1c1c] transition-colors cursor-pointer card-hover animate-fade-in">
      <div className="mb-2">{icon}</div>
      <div>
        <h2 className="text-xl text-white font-semibold">{title}</h2>
        <p className="text-sm text-[#8E9196] mt-1">{description}</p>
      </div>
    </article>
  );
}
