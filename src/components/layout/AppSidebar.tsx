"use client";

import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  Sprout,
  Wrench,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useDataStore } from "@/store/dataStore";
import type { AppView } from "@/types/data";

const NAV: { id: AppView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Дашборд", icon: LayoutDashboard },
  { id: "constructor", label: "Конструктор", icon: Wrench },
  { id: "settings", label: "Настройки", icon: Settings },
];

export function AppSidebar() {
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-surface-border bg-surface-elevated/80 backdrop-blur-xl">
      {/* Логотип */}
      <div className="border-b border-surface-border px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-lg shadow-accent/25">
            <Sprout className="h-5 w-5 text-white" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse-soft rounded-full bg-accent-light ring-2 ring-surface-elevated" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-white">BioPole</p>
            <p className="text-[11px] font-medium text-accent">AgroPulse</p>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <nav className="space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-surface-muted">
          Меню
        </p>
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className={`nav-item ${view === id ? "nav-item-active" : ""}`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {view === id && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
          </button>
        ))}
      </nav>

      {/* Список полей */}
      <div className="flex-1 overflow-hidden border-t border-surface-border">
        <p className="px-6 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-widest text-surface-muted">
          Поля хозяйства
        </p>
        <div className="space-y-0.5 overflow-y-auto px-3 pb-4">
          {fields.map((field) => (
            <button
              key={field.id}
              type="button"
              onClick={() => selectField(field.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                selectedFieldId === field.id
                  ? "bg-accent/10 ring-1 ring-accent/30"
                  : "hover:bg-surface-hover"
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: field.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{field.name}</p>
                <p className="truncate text-[11px] text-slate-500">
                  {field.crop} · {field.area} га
                </p>
              </div>
              <span className="text-[10px] font-mono text-accent">
                {field.analysis.ndvi.toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Пользователь */}
      <div className="border-t border-surface-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-surface-hover/60 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-blue-500/40 text-sm font-bold text-white">
            И
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">Иванов А.С.</p>
            <p className="truncate text-[11px] text-slate-500">Главный агроном</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
