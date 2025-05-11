
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { TimeTravel } from "@/components/time-travel";

export default function TimeTravelPage() {
  return (
    <DashboardLayout>
      <TimeTravel />
    </DashboardLayout>
  );
}
