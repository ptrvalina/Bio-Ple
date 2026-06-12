"use client";

import { X } from "lucide-react";
import { WIDGET_LIST } from "@/config/widgetRegistry";
import { useDashboardStore } from "@/store/dashboardStore";
import { useToastStore } from "@/store/toastStore";

interface MobileWidgetSheetProps {
  open: boolean;
  onClose: () => void;
}

/** Нижняя панель добавления виджетов на мобильном */
export function MobileWidgetSheet({ open, onClose }: MobileWidgetSheetProps) {
  const addWidget = useDashboardStore((s) => s.addWidget);
  const addToast = useToastStore((s) => s.addToast);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Закрыть"
      />
      <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-hidden rounded-t-2xl border-t border-surface-border bg-surface-elevated pb-safe animate-slide-up">
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <h3 className="font-semibold text-white">Добавить виджет</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-surface-hover"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-3">
          <div className="space-y-2">
            {WIDGET_LIST.map((w) => (
              <button
                key={w.type}
                type="button"
                onClick={() => {
                  addWidget(w.type);
                  addToast(`«${w.title}» добавлен`, "success");
                  onClose();
                }}
                className="w-full rounded-xl border border-surface-border bg-surface-card p-3 text-left active:bg-surface-hover"
              >
                <p className="text-sm font-medium text-white">{w.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{w.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
