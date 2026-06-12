"use client";

import { useEffect, useState } from "react";
import { viewTitle } from "@/config/premierNav";
import { useAppStore } from "@/store/appStore";
import { useDataStore } from "@/store/dataStore";
import { useToastStore } from "@/store/toastStore";
import { downloadReport } from "@/lib/exportReport";
import { useDashboardStore } from "@/store/dashboardStore";

const OPERATOR_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDtn7mXa93_WpUG5vKUQBrQFHfNlnu4mdfiMXGo4Qi1S7m15uqcr4AY7en1HCFWIZgdAfULX9zwnO-44ew9N3Hb48MikrR_9gNAu3-KpHOyXLJ0GD0zlAVCtut6P9UG3nYRq3d9ksVGWBRV478u98hmje3AC6Hf4-bzY3xl5Es9XNnyBR8Pj-WReLAcFgzflGe2njFqE3MRML3Kfpawn8iTNIOzQd58yyux1sdIC8y0BsvpvSjYaMDgiO24ThYxhV5xttq9vFWnkfQu";

function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function PremierTopBar() {
  const view = useAppStore((s) => s.view);
  const alerts = useDataStore((s) => s.alerts);
  const serviceHealth = useDataStore((s) => s.serviceHealth);
  const isSyncing = useDataStore((s) => s.isSyncing);
  const refreshAll = useDataStore((s) => s.refreshAll);
  const dataState = useDataStore();
  const widgets = useDashboardStore((s) => s.widgets);
  const layouts = useDashboardStore((s) => s.layouts);
  const addToast = useToastStore((s) => s.addToast);
  const now = useLiveClock();

  const onlineServices = serviceHealth.filter((s) => s.status === "online").length;

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
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-background/80 px-4 backdrop-blur-md sm:px-8">
      <div className="flex min-w-0 items-center gap-4 sm:gap-6">
        <span className="hidden truncate text-xl font-bold text-foreground sm:block">
          {viewTitle(view)}
        </span>
        <div className="hidden h-8 w-px bg-white/10 md:block" />
        <div className="flex items-center gap-2 rounded border border-white/10 bg-surface-elevated/50 px-3 py-1.5">
          <span className="material-symbols-outlined text-sm text-accent">search</span>
          <input
            className="w-32 border-none bg-transparent text-[10px] uppercase text-foreground placeholder:text-surface-muted focus:ring-0 sm:w-48"
            placeholder="QUERY COORDINATES..."
            type="text"
          />
        </div>
        {view === "settings" && (
          <div className="hidden items-center rounded border border-white/10 bg-surface-hover px-3 py-1 lg:flex">
            <span
              className="material-symbols-outlined mr-2 text-sm text-accent"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
            <span className="label-caps text-accent">Clearance: Level 4</span>
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-6">
        {now && (
          <time className="font-data hidden text-[10px] text-surface-muted lg:block">
            {now.toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </time>
        )}

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={() => {
              void refreshAll();
              addToast("Синхронизация с микросервисами...", "info");
            }}
            disabled={isSyncing}
            className="label-caps flex items-center gap-1.5 rounded bg-accent/10 px-2 py-1 text-accent disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-sm">
              {isSyncing ? "sync" : "signal_cellular_alt"}
            </span>
            {serviceHealth.length > 0
              ? `${onlineServices}/${serviceHealth.length} ONLINE`
              : "SYNC"}
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="label-caps hidden items-center gap-1 rounded border border-white/10 px-2 py-1 text-surface-muted hover:text-foreground sm:flex"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            EXPORT
          </button>

          <span className="material-symbols-outlined cursor-pointer text-surface-muted transition hover:text-accent">
            home_work
          </span>
          <div className="relative">
            <span className="material-symbols-outlined cursor-pointer text-surface-muted transition hover:text-accent">
              notifications
            </span>
            {alerts.length > 0 && (
              <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-red-400 ring-2 ring-background" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-4 sm:pl-6">
          <div className="hidden text-right sm:block">
            <p className="label-caps text-[10px] leading-none text-foreground">
              ИВАНОВ А.С.
            </p>
            <p className="font-data text-[10px] text-accent">LEAD OPERATOR</p>
          </div>
          <img
            alt="Оператор"
            className="h-8 w-8 rounded-full border border-accent/30 object-cover"
            src={OPERATOR_AVATAR}
          />
        </div>
      </div>
    </header>
  );
}
