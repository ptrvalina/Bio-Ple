"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  Download,
  LayoutDashboard,
  RefreshCw,
  Settings,
  Wrench,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { useDataStore } from "@/store/dataStore";
import { useThemeStore } from "@/store/themeStore";
import { useToastStore } from "@/store/toastStore";
import { downloadReport } from "@/lib/exportReport";
import type { AppView } from "@/types/data";

function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const NAV: { id: AppView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard },
  { id: "constructor", label: "CONSTRUCTOR", icon: Wrench },
  { id: "settings", label: "SETTINGS", icon: Settings },
];

export function TopStatusBar() {
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const widgets = useDashboardStore((s) => s.widgets);
  const layouts = useDashboardStore((s) => s.layouts);
  const alerts = useDataStore((s) => s.alerts);
  const dataState = useDataStore();
  const isSyncing = useDataStore((s) => s.isSyncing);
  const lastSyncAt = useDataStore((s) => s.lastSyncAt);
  const serviceHealth = useDataStore((s) => s.serviceHealth);
  const refreshAll = useDataStore((s) => s.refreshAll);
  const theme = useThemeStore((s) => s.theme);
  const addToast = useToastStore((s) => s.addToast);
  const now = useLiveClock();

  const onlineServices = serviceHealth.filter((s) => s.status === "online").length;
  const allOnline =
    serviceHealth.length > 0 && onlineServices === serviceHealth.length;

  const handleExport = () => {
    downloadReport(
      { widgets, layouts },
      {
        fields: dataState.fields,
        weather: dataState.weather,
        forecast: dataState.forecast,
        operations: dataState.operations,
        alerts: dataState.alerts,
        techMap: dataState.techMap,
        deviations: dataState.deviations,
      }
    );
    addToast("Отчёт успешно скачан", "success");
  };

  return (
    <header className="premier-header shrink-0 px-4 sm:px-8">
      <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <div className="flex min-w-0 items-center gap-3">
          <span className="material-symbols-outlined text-accent text-2xl">
            monitor_heart
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-tighter text-foreground sm:text-base">
              BIOPOLAR AGROPULSE
            </h1>
            <p className="label-caps hidden text-accent sm:block">
              {theme === "cyber" ? "MISSION CONTROL" : "ENTERPRISE MANAGER"}
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`label-caps transition-colors ${
                view === id
                  ? "text-accent"
                  : "text-surface-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {now && (
            <time className="font-data hidden text-[10px] text-surface-muted lg:block">
              {now.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          )}

          <button
            type="button"
            onClick={() => {
              void refreshAll();
              addToast("Синхронизация с микросервисами...", "info");
            }}
            disabled={isSyncing}
            title={
              lastSyncAt
                ? `Sync: ${new Date(lastSyncAt).toLocaleTimeString("ru-RU")}`
                : "Синхронизировать"
            }
            className={`label-caps hidden items-center gap-1.5 rounded px-2 py-1 md:flex ${
              allOnline
                ? "bg-accent/10 text-accent"
                : "bg-amber-500/10 text-amber-500"
            } disabled:opacity-60`}
          >
            {isSyncing ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <Activity className="h-3 w-3" />
            )}
            {serviceHealth.length > 0
              ? `${onlineServices}/${serviceHealth.length} ONLINE`
              : "SYNC"}
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="btn-secondary !px-2.5 !py-1.5 !text-[10px]"
            aria-label="Скачать отчёт"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">EXPORT</span>
          </button>

          <button
            type="button"
            className="relative rounded border border-surface-border bg-surface-hover p-2 text-surface-muted"
            aria-label="Уведомления"
          >
            <Bell className="h-4 w-4" />
            {alerts.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {alerts.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
