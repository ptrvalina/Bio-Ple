"use client";

import { useCallback, useState } from "react";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { ConstructorModuleLibrary } from "@/components/constructor/ConstructorModuleLibrary";
import { useDashboardStore } from "@/store/dashboardStore";
import { useToastStore } from "@/store/toastStore";

export function PremierConstructorMobile() {
  const saveConfig = useDashboardStore((s) => s.saveConfig);
  const resetConfig = useDashboardStore((s) => s.resetConfig);
  const addWidget = useDashboardStore((s) => s.addWidget);
  const addToast = useToastStore((s) => s.addToast);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-background/90 px-4 backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-3">
          <span className="material-symbols-outlined shrink-0 text-accent">grid_view</span>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-tight text-accent">
              КОНСТРУКТОР V2
            </h1>
            <p className="label-caps truncate text-[9px] text-surface-muted">BIOPOLAR AGROPULSE</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setSettingsOpen((v) => !v)}
            className="p-2 text-surface-muted"
            aria-label="Настройки"
          >
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="label-caps flex items-center gap-2 rounded-lg bg-accent px-4 py-1.5 text-[#00210e] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Сохранить
          </button>
        </div>
      </header>

      {settingsOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSettingsOpen(false)}
            aria-label="Закрыть меню"
          />
          <div className="absolute right-4 top-16 w-48 rounded border border-white/10 bg-surface-elevated py-1 shadow-card">
            <button
              type="button"
              onClick={handleReset}
              className="label-caps flex w-full items-center gap-2 px-4 py-2.5 text-left text-surface-muted hover:bg-surface-hover"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              Сбросить раскладку
            </button>
          </div>
        </div>
      )}

      <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-grid-premier pt-16 pb-28">
        <div className="premier-grain pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="relative z-10 flex flex-1 flex-col">
          <DashboardGrid mode="edit" />

          <div className="px-4 pb-8 pt-2">
            <button
              type="button"
              onClick={() => setLibraryOpen(true)}
              className="group flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/20 py-4 transition-all hover:border-accent/40 hover:bg-accent/5"
            >
              <span className="material-symbols-outlined text-surface-muted transition-colors group-hover:text-accent">
                add_circle
              </span>
              <span className="label-caps text-surface-muted transition-colors group-hover:text-accent">
                Добавить модуль
              </span>
            </button>
          </div>
        </div>
      </main>

      <ConstructorModuleLibrary
        variant="mobile"
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
