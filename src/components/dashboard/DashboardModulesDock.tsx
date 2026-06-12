"use client";

import { useEffect, useState } from "react";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { useAppStore } from "@/store/appStore";
import { useDashboardStore } from "@/store/dashboardStore";

const DOCK_PREF_KEY = "agropulse-modules-dock-open";

export function DashboardModulesDock() {
  const widgets = useDashboardStore((s) => s.widgets);
  const resetConfig = useDashboardStore((s) => s.resetConfig);
  const setView = useAppStore((s) => s.setView);
  const hasWidgets = widgets.length > 0;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DOCK_PREF_KEY);
      if (saved !== null) {
        setOpen(saved === "true");
      }
    } catch {
      /* ignore — по умолчанию панель свёрнута */
    }
  }, []);

  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      try {
        localStorage.setItem(DOCK_PREF_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col lg:bottom-0 ${
        open ? "pb-0" : "pb-28 lg:pb-4"
      }`}
    >
      <div className="pointer-events-auto mx-auto w-full max-w-[1600px] px-3 lg:px-6">
        <div
          className={`overflow-hidden border border-white/10 bg-surface-elevated/95 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[max-height,border-radius] duration-300 ease-out ${
            open ? "rounded-t-xl" : "rounded-xl"
          }`}
          style={{ maxHeight: open ? "min(52vh, 560px)" : "52px" }}
        >
          <div className="flex h-[52px] shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4">
            <button
              type="button"
              onClick={toggle}
              className="flex min-w-0 flex-1 items-center gap-2 text-left"
            >
              <span
                className={`material-symbols-outlined text-accent transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              >
                expand_less
              </span>
              <span className="label-caps truncate text-xs text-foreground">
                Модули рабочего стола
              </span>
              {hasWidgets && (
                <span className="label-caps shrink-0 rounded bg-accent/15 px-2 py-0.5 text-[10px] text-accent">
                  {widgets.length}
                </span>
              )}
            </button>

            <div className="flex shrink-0 items-center gap-2">
              {!hasWidgets && (
                <button
                  type="button"
                  onClick={() => resetConfig()}
                  className="label-caps hidden text-[10px] text-surface-muted hover:text-accent sm:inline"
                >
                  По умолчанию
                </button>
              )}
              <button
                type="button"
                onClick={() => setView("constructor")}
                className="label-caps rounded border border-accent/30 px-3 py-1 text-[10px] text-accent transition hover:bg-accent/10"
              >
                Конструктор
              </button>
            </div>
          </div>

          {open && (
            <div className="h-[calc(min(52vh,560px)-52px)] min-h-[280px]">
              <DashboardGrid mode="view" embedded />
            </div>
          )}
        </div>

        {!open && !hasWidgets && (
          <p className="pointer-events-none mt-2 hidden text-center text-[10px] text-surface-muted lg:block">
            Настройте виджеты в конструкторе — раскройте панель снизу
          </p>
        )}
      </div>
    </div>
  );
}
