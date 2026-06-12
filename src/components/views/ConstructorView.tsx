"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ConstructorToolbar } from "@/components/layout/ConstructorToolbar";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";

export function ConstructorView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ConstructorToolbar />
      <div className="flex min-h-0 flex-1">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="relative min-w-0 flex-1 bg-grid-premier bg-surface/50 pb-24 lg:pb-0">
          <DashboardGrid mode="edit" />
        </div>
      </div>
    </div>
  );
}
