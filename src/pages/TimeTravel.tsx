
import React from "react";
import { DashboardLayout } from "@/components/dashboard";
import { TimeTravel } from "@/components/time-travel";

export default function TimeTravelPage() {
  return (
    <DashboardLayout>
      <div className="w-full">
        <TimeTravel />
      </div>
    </DashboardLayout>
  );
}
