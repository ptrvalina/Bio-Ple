"use client";

import { DashboardKPIBar } from "@/components/dashboard/DashboardKPIBar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MobileFieldPicker } from "@/components/mobile/MobileFieldPicker";

export function DashboardView() {
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain">
      <div className="mx-auto max-w-[1600px] space-y-4 p-3 sm:space-y-5 sm:p-5 animate-fade-in">
        <MobileFieldPicker />
        <DashboardKPIBar />
        <DashboardLayout />
      </div>
    </div>
  );
}
