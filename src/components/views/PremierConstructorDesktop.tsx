"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { ConstructorModuleLibrary } from "@/components/constructor/ConstructorModuleLibrary";
import { useDashboardStore } from "@/store/dashboardStore";
import { useToastStore } from "@/store/toastStore";

const OPERATOR_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDtn7mXa93_WpUG5vKUQBrQFHfNlnu4mdfiMXGo4Qi1S7m15uqcr4AY7en1HCFWIZgdAfULX9zwnO-44ew9N3Hb48MikrR_9gNAu3-KpHOyXLJ0GD0zlAVCtut6P9UG3nYRq3d9ksVGWBRV478u98hmje3AC6Hf4-bzY3xl5Es9XNnyBR8Pj-WReLAcFgzflGe2njFqE3MRML3Kfpawn8iTNIOzQd58yyux1sdIC8y0BsvpvSjYaMDgiO24ThYxhV5xttq9vFWnkfQu";

export function PremierConstructorDesktop() {
  const saveConfig = useDashboardStore((s) => s.saveConfig);
  const resetConfig = useDashboardStore((s) => s.resetConfig);
  const addWidget = useDashboardStore((s) => s.addWidget);
  const addToast = useToastStore((s) => s.addToast);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const handleSave = useCallback(() => {
    saveConfig();
    addToast("Раскладка сохранена — обновится на дашборде", "success");
  }, [saveConfig, addToast]);

  const handleReset = useCallback(() => {
    resetConfig();
    addToast("Восстановлена раскладка по умолчанию", "info");
    setSettingsOpen(false);
  }, [resetConfig, addToast]);

  const handleAdd = useCallback(
    (type: string) => {
      addWidget(type);
      addToast("Виджет добавлен", "success");
    },
    [addWidget, addToast]
  );

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [settingsOpen]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="premier-header sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between px-6 shadow-[0_4px_20px_-2px_rgba(0,227,131,0.1)]">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold tracking-tighter text-accent">
            BIOPOLAR AGROPULSE
          </span>
          <div className="h-4 w-px bg-white/10" />
          <span className="label-caps text-foreground">Конструктор виджетов</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 text-surface-muted transition-colors hover:bg-accent/10 hover:text-foreground"
              aria-label="Датчики"
            >
              <span className="material-symbols-outlined">sensors</span>
            </button>
            <button
              type="button"
              className="p-2 text-surface-muted transition-colors hover:bg-accent/10 hover:text-foreground"
              aria-label="Быстрые действия"
            >
              <span className="material-symbols-outlined">bolt</span>
            </button>
            <div className="relative" ref={settingsRef}>
              <button
                type="button"
                onClick={() => setSettingsOpen((v) => !v)}
                className="p-2 text-surface-muted transition-colors hover:bg-accent/10 hover:text-foreground"
                aria-label="Настройки"
              >
                <span className="material-symbols-outlined">settings</span>
              </button>
              {settingsOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded border border-white/10 bg-surface-elevated py-1 shadow-card">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="label-caps flex w-full items-center gap-2 px-4 py-2.5 text-left text-surface-muted transition hover:bg-surface-hover hover:text-foreground"
                  >
                    <span className="material-symbols-outlined text-sm">restart_alt</span>
                    Сбросить раскладку
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="label-caps flex items-center gap-2 border border-accent px-6 py-2 font-bold text-accent transition-all hover:bg-accent/10 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            Сохранить
          </button>

          <img
            alt="Оператор"
            className="h-8 w-8 rounded-full border border-white/20 object-cover"
            src={OPERATOR_AVATAR}
          />
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 overflow-hidden pr-80">
          <div className="relative h-full min-h-0 bg-grid-premier bg-surface/50">
            <div className="scanline pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-30" />
            <DashboardGrid mode="edit" />
          </div>
        </div>
        <ConstructorModuleLibrary
          variant="desktop"
          onAdd={handleAdd}
          className="absolute right-0 top-0 bottom-0"
        />
      </div>
    </div>
  );
}
