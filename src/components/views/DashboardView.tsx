"use client";

import { DashboardKPIBar } from "@/components/dashboard/DashboardKPIBar";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { MobileFieldPicker } from "@/components/mobile/MobileFieldPicker";

/** Главный дашборд использует ту же раскладку, что и конструктор */
export function DashboardView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 space-y-4 px-3 pt-3 sm:space-y-5 sm:px-5 sm:pt-5">
        <MobileFieldPicker />
        <DashboardKPIBar />
      </div>
      <div className="relative min-h-0 flex-1 bg-grid-premier bg-surface/50 pb-24 lg:pb-0">
        <DashboardGrid mode="view" />
      </div>
    </div>
  );
}
