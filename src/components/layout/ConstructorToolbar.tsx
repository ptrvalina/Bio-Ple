"use client";

import { useCallback, useState } from "react";
import { Plus, RotateCcw, Save } from "lucide-react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useToastStore } from "@/store/toastStore";
import { WIDGET_LIST } from "@/config/widgetRegistry";
import { MobileWidgetSheet } from "@/components/mobile/MobileWidgetSheet";

export function ConstructorToolbar() {
  const saveConfig = useDashboardStore((s) => s.saveConfig);
  const resetConfig = useDashboardStore((s) => s.resetConfig);
  const addWidget = useDashboardStore((s) => s.addWidget);
  const addToast = useToastStore((s) => s.addToast);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);

  const handleSave = useCallback(() => {
    saveConfig();
    addToast("Конфигурация сохранена", "success");
  }, [saveConfig, addToast]);

  const handleReset = useCallback(() => {
    resetConfig();
    addToast("Восстановлена раскладка по умолчанию", "info");
  }, [resetConfig, addToast]);

  return (
    <>
      <div className="flex flex-col gap-2 border-b border-surface-border bg-surface-card/40 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="hidden text-xs text-slate-500 lg:block">
          Перетащите виджеты из панели слева · размер кнопками 2/3/4/6
        </p>
        <p className="text-xs text-slate-500 lg:hidden">
          Нажмите «+» чтобы добавить виджет · перетаскивание отключено на мобильном
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="btn-secondary flex-1 !py-2 !text-xs sm:flex-none sm:!py-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span className="sm:inline">Сохранить</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary flex-1 !py-2 !text-xs sm:flex-none sm:!py-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Сбросить</span>
          </button>

          {/* Десктоп: выпадающее меню */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setShowAddMenu((v) => !v)}
              className="btn-primary !py-1.5 !text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Добавить
            </button>
            {showAddMenu && (
              <div className="absolute right-0 top-full z-50 mt-2 max-h-80 w-64 overflow-y-auto rounded-2xl border border-surface-border bg-surface-card py-2 shadow-card">
                {WIDGET_LIST.map((w) => (
                  <button
                    key={w.type}
                    type="button"
                    onClick={() => {
                      addWidget(w.type);
                      setShowAddMenu(false);
                      addToast(`Виджет «${w.title}» добавлен`, "success");
                    }}
                    className="block w-full px-4 py-2.5 text-left transition hover:bg-surface-hover"
                  >
                    <p className="text-sm font-medium text-white">{w.title}</p>
                    <p className="text-[11px] text-slate-500">{w.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Мобильный: FAB */}
          <button
            type="button"
            onClick={() => setShowMobileSheet(true)}
            className="btn-primary !px-3 !py-2 lg:hidden"
            aria-label="Добавить виджет"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <MobileWidgetSheet
        open={showMobileSheet}
        onClose={() => setShowMobileSheet(false)}
      />
    </>
  );
}
