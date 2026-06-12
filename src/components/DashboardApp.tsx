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
import { useThemeStore } from "@/store/themeStore";
import type { AppView } from "@/types/data";

const MOBILE_NAV: {
  id: AppView;
  icon: typeof LayoutDashboard;
  symbol: string;
}[] = [
  { id: "dashboard", icon: LayoutDashboard, symbol: "potted_plant" },
  { id: "constructor", icon: Wrench, symbol: "precision_manufacturing" },
  { id: "settings", icon: Settings, symbol: "settings" },
];

function SplashScreen() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-background">
      <div className="relative mb-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-surface-border bg-surface-card shadow-glow">
          <span className="material-symbols-outlined text-4xl text-accent">
            monitor_heart
          </span>
        </div>
      </div>
      <h1 className="text-lg font-bold tracking-tighter text-foreground">
        BIOPOLAR AGROPULSE
      </h1>
      <p className="label-caps mt-2 text-surface-muted">
        Initializing field telemetry...
      </p>
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-surface-border">
        <div className="h-full w-1/2 animate-pulse bg-accent" />
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
  const initTheme = useThemeStore((s) => s.initialize);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    initTheme();
    initialize();
    void bootstrap();
    const timer = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(timer);
  }, [initialize, bootstrap, initTheme]);

  const ready = dashboardReady && dataReady;

  if (!ready || showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background">
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

        {/* Floating pill nav (Premier mobile) */}
        <nav className="mobile-nav-pill fixed bottom-6 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center justify-around rounded-full px-6 py-3 pb-safe lg:hidden">
          {MOBILE_NAV.map(({ id, symbol }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-all active:scale-90 ${
                view === id
                  ? "mobile-nav-active scale-110"
                  : "text-surface-muted hover:text-accent"
              }`}
              aria-label={id}
            >
              <span
                className="material-symbols-outlined"
                style={
                  view === id
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {symbol}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <FieldDetailDrawer />
      <ToastContainer />

      {dataError && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs text-red-400 lg:bottom-4">
          {dataError}
        </div>
      )}
    </div>
  );
}
