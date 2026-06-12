"use client";

import { PremierDashboardDesktop } from "@/components/views/PremierDashboardDesktop";
import { PremierDashboardMobile } from "@/components/views/PremierDashboardMobile";
import { DashboardModulesDock } from "@/components/dashboard/DashboardModulesDock";

export function DashboardView() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto pb-36 lg:overflow-hidden lg:pb-20">
        <div className="hidden h-full min-h-0 lg:flex">
          <PremierDashboardDesktop />
        </div>
        <div className="lg:hidden">
          <PremierDashboardMobile />
        </div>
      </div>

      <DashboardModulesDock />
    </div>
  );
}

/** Конструктор сохраняет widget grid из прежней реализации */
export function ConstructorDashboardGrid() {
  return null;
}
