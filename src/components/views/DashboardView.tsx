"use client";

import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { PremierDashboardDesktop } from "@/components/views/PremierDashboardDesktop";
import { PremierDashboardMobile } from "@/components/views/PremierDashboardMobile";

export function DashboardView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:overflow-hidden">
      <div className="hidden shrink-0 overflow-hidden border-b border-white/10 lg:block lg:max-h-[45%]">
        <PremierDashboardDesktop />
      </div>
      <div className="shrink-0 lg:hidden">
        <PremierDashboardMobile />
      </div>

      <section className="relative flex min-h-[420px] flex-1 flex-col lg:min-h-0">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-surface-elevated/40 px-4 py-2 lg:px-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-accent">dashboard</span>
            <span className="label-caps text-xs text-foreground">Модули дашборда</span>
          </div>
          <span className="label-caps hidden text-[10px] text-surface-muted sm:inline">
            Раскладка из конструктора
          </span>
        </div>
        <div className="relative min-h-0 flex-1 bg-grid-premier bg-surface/50 pb-28 lg:pb-4">
          <DashboardGrid mode="view" />
        </div>
      </section>
    </div>
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
