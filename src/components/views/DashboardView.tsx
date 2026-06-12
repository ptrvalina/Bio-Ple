"use client";

import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { PremierDashboardDesktop } from "@/components/views/PremierDashboardDesktop";
import { PremierDashboardMobile } from "@/components/views/PremierDashboardMobile";

export function DashboardView() {
  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        <PremierDashboardDesktop />
      </div>
      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <PremierDashboardMobile />
      </div>
    </>
  );
}

/** Конструктор сохраняет widget grid из прежней реализации */
export function ConstructorDashboardGrid() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-grid-premier bg-surface/50 pb-24 lg:pb-4">
      <DashboardGrid mode="edit" />
    </div>
  );
}
