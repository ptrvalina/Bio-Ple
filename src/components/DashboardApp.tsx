"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Settings, Wrench } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopStatusBar } from "@/components/layout/TopStatusBar";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { DashboardView } from "@/components/views/DashboardView";
import { ConstructorView } from "@/components/views/ConstructorView";
import { SettingsView } from "@/components/views/SettingsView";
import { FieldDetailDrawer } from "@/components/field/FieldDetailDrawer";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAppStore } from "@/store/appStore";
import { useDataStore } from "@/store/dataStore";
import type { AppView } from "@/types/data";

const MOBILE_NAV: { id: AppView; icon: typeof LayoutDashboard; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Дашборд" },
  { id: "constructor", icon: Wrench, label: "Стол" },
  { id: "settings", icon: Settings, label: "Ещё" },
];

function SplashScreen() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-surface">
      <div className="relative mb-8">
        <div className="h-20 w-20 animate-pulse rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-glow" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
          BP
        </div>
      </div>
      <h1 className="text-xl font-bold text-white">BioPole AgroPulse</h1>
      <p className="mt-2 text-sm text-slate-500">Загрузка данных хозяйства...</p>
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-surface-border">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-accent" />
      </div>
    </div>
  );
}

export function DashboardApp() {
  const initialize = useDashboardStore((s) => s.initialize);
  const dashboardReady = useDashboardStore((s) => s.initialized);
  const bootstrap = useDataStore((s) => s.bootstrap);
  const dataReady = useDataStore((s) => s.initialized);
  const dataError = useDataStore((s) => s.error);
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    initialize();
    void bootstrap();
    const timer = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(timer);
  }, [initialize, bootstrap]);

  const ready = dashboardReady && dataReady;

  if (!ready || showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <div className="hidden lg:flex">
        <AppSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopStatusBar />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {view === "dashboard" && <DashboardView />}
          {view === "constructor" && <ConstructorView />}
          {view === "settings" && <SettingsView />}
        </main>

        <nav className="flex border-t border-surface-border bg-surface-elevated pb-safe lg:hidden">
          {MOBILE_NAV.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 pt-2.5 text-[10px] font-medium transition active:scale-95 ${
                view === id ? "text-accent" : "text-slate-500"
              }`}
            >
              <Icon className={`h-5 w-5 ${view === id ? "text-accent" : ""}`} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <FieldDetailDrawer />
      <ToastContainer />

      {dataError && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs text-red-300 lg:bottom-4">
          {dataError}
        </div>
      )}
    </div>
  );
}
