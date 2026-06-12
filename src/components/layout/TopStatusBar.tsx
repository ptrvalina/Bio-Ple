"use client";

import { useEffect, useState } from "react";
import { Bell, Download, Search, Wifi } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { useDataStore } from "@/store/dataStore";
import { useToastStore } from "@/store/toastStore";
import { downloadReport } from "@/lib/exportReport";

function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function TopStatusBar() {
  const view = useAppStore((s) => s.view);
  const widgets = useDashboardStore((s) => s.widgets);
  const layouts = useDashboardStore((s) => s.layouts);
  const alerts = useDataStore((s) => s.alerts);
  const dataState = useDataStore();
  const addToast = useToastStore((s) => s.addToast);
  const now = useLiveClock();

  const titles: Record<string, string> = {
    dashboard: "Дашборд",
    constructor: "Конструктор",
    settings: "Настройки",
  };

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
    <header className="shrink-0 border-b border-surface-border bg-surface-card/60 px-3 py-2 backdrop-blur-md sm:px-5 sm:py-0">
      <div className="flex h-12 items-center justify-between sm:h-14">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-white sm:text-base">
            {titles[view]}
          </h1>
          {now && (
            <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
              <span className="hidden sm:inline">
                {now.toLocaleDateString("ru-RU", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
                ·{" "}
              </span>
              {now.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-surface-border bg-surface-hover/50 px-3 py-1.5 lg:flex">
            <Search className="h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Поиск..."
              className="w-40 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none xl:w-48"
            />
          </div>

          <div className="hidden items-center gap-1.5 rounded-lg bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent md:flex">
            <Wifi className="h-3 w-3" />
            Онлайн
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="btn-secondary !px-2.5 !py-1.5 !text-xs sm:!px-3"
            aria-label="Скачать отчёт"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Отчёт</span>
          </button>

          <button
            type="button"
            className="relative rounded-xl border border-surface-border bg-surface-hover p-2 text-slate-400"
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
