"use client";

import { useEffect, useState } from "react";
import { PremierSidebar } from "@/components/layout/PremierSidebar";
import { PremierTopBar } from "@/components/layout/PremierTopBar";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { MaterialSymbols } from "@/components/ui/MaterialSymbols";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { ConstructorView } from "@/components/views/ConstructorView";
import { DashboardView } from "@/components/views/DashboardView";
import { OperationsView } from "@/components/views/OperationsView";
import { SettingsView } from "@/components/views/SettingsView";
import { FieldDetailDrawer } from "@/components/field/FieldDetailDrawer";
import { PREMIER_MOBILE_NAV, PREMIER_NAV } from "@/config/premierNav";
import { useAuthStore } from "@/store/authStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAppStore } from "@/store/appStore";
import { useDataStore } from "@/store/dataStore";
import { useThemeStore } from "@/store/themeStore";

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
    void bootstrap().then(() => {
      const defaultFieldId = useAuthStore.getState().defaultFieldId;
      if (defaultFieldId) {
        void useDataStore.getState().selectField(defaultFieldId);
      }
    });
    const stopPolling = useDataStore.getState().startWeatherPolling();
    const timer = setTimeout(() => setShowSplash(false), 900);
    return () => {
      clearTimeout(timer);
      stopPolling();
    };
  }, [initialize, bootstrap, initTheme]);

  const ready = dashboardReady && dataReady;

  if (!ready || showSplash) {
    return (
      <>
        <MaterialSymbols />
        <SplashScreen />
      </>
    );
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background">
      <MaterialSymbols />
      <div className="premier-grain pointer-events-none" />

      <div className="hidden lg:block">
        <PremierSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        {view !== "constructor" && <PremierTopBar />}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {view === "dashboard" && <DashboardView />}
          {view === "analytics" && <AnalyticsView />}
          {view === "operations" && <OperationsView />}
          {view === "constructor" && <ConstructorView />}
          {view === "settings" && <SettingsView />}
        </main>

        <nav className="mobile-nav-pill fixed bottom-6 left-1/2 z-50 flex w-[95%] max-w-lg -translate-x-1/2 items-center justify-around rounded-full px-3 py-2 pb-safe lg:hidden">
          {PREMIER_MOBILE_NAV.map((id) => {
            const item = PREMIER_NAV.find((n) => n.id === id)!;
            const active = view === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-90 ${
                  active
                    ? "mobile-nav-active scale-110"
                    : "text-surface-muted hover:text-accent"
                }`}
                aria-label={item.label}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={
                    active ? { fontVariationSettings: "'FILL' 1" } : undefined
                  }
                >
                  {item.mobileSymbol ?? item.symbol}
                </span>
              </button>
            );
          })}
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
