"use client";

import {
  BarChart3,
  Factory,
  Leaf,
  Settings,
  Sprout,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useDataStore } from "@/store/dataStore";
import type { AppView } from "@/types/data";

const NAV: { id: AppView; label: string; icon: typeof BarChart3; short: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, short: "DB" },
  { id: "constructor", label: "Constructor", icon: Factory, short: "CN" },
  { id: "settings", label: "Settings", icon: Settings, short: "ST" },
];

export function AppSidebar() {
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const theme = useAppStore((s) => s.theme);
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);

  const enterprise = theme === "enterprise";

  return (
    <aside
      className={`${
        enterprise
          ? "m-6 mr-0 flex w-64 shrink-0 flex-col overflow-hidden rounded-[2rem] border border-surface-border bg-surface shadow-panel"
          : "m-6 mr-0 flex w-[112px] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-surface-border bg-surface-elevated/90 shadow-panel backdrop-blur-xl"
      }`}
    >
      <div className={`${enterprise ? "px-5 py-5" : "px-4 py-5"} border-b border-surface-border`}>
        <div className={`flex items-center ${enterprise ? "gap-3" : "flex-col gap-3 text-center"}`}>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-glow">
            <Sprout className="h-5 w-5 text-white" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse-soft rounded-full bg-accent-light ring-2 ring-surface-elevated" />
          </div>
          <div className="min-w-0">
            <p className="label-caps">Biopolar</p>
            <p className="mt-1 text-sm font-semibold text-foreground">AgroPulse</p>
            {enterprise ? (
              <p className="mt-1 text-xs text-surface-muted">Premier enterprise suite</p>
            ) : (
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Premier
              </p>
            )}
          </div>
        </div>
      </div>

      <nav className={`${enterprise ? "px-3 py-4" : "px-2 py-4"} space-y-2`}>
        <p className={`label-caps ${enterprise ? "px-3" : "text-center"}`}>Navigation</p>
        {NAV.map(({ id, label, icon: Icon, short }) => {
          const active = view === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`nav-item ${
                enterprise
                  ? active
                    ? "nav-item-active"
                    : ""
                  : `justify-center px-0 py-3 ${active ? "nav-item-active" : ""}`
              }`}
              title={enterprise ? undefined : label}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {enterprise ? (
                <span>{label}</span>
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                  {short}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 overflow-hidden border-t border-surface-border">
        <p className={`label-caps px-4 pb-2 pt-4 ${enterprise ? "" : "text-center"}`}>
          Fields
        </p>
        <div className={`overflow-y-auto pb-4 ${enterprise ? "space-y-1 px-3" : "space-y-2 px-2"}`}>
          {fields.map((field) => {
            const active = selectedFieldId === field.id;
            return (
              <button
                key={field.id}
                type="button"
                onClick={() => void selectField(field.id)}
                className={`w-full rounded-2xl border transition ${
                  active
                    ? "border-accent/40 bg-accent/10 shadow-glow"
                    : "border-transparent hover:border-surface-border hover:bg-surface-hover/70"
                } ${enterprise ? "px-3 py-2.5 text-left" : "flex flex-col items-center gap-1 px-2 py-3 text-center"}`}
              >
                <span
                  className={`shrink-0 rounded-full ${enterprise ? "h-2.5 w-2.5" : "h-3 w-3"}`}
                  style={{ backgroundColor: field.color }}
                />
                {enterprise ? (
                  <div className="mt-0.5 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{field.name}</p>
                    <p className="truncate text-[11px] text-surface-muted">
                      {field.crop} · {field.area} га
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="line-clamp-2 text-[11px] font-semibold text-foreground">
                      {field.name}
                    </p>
                    <p className="font-data-sm text-accent">
                      {field.analysis.ndvi.toFixed(2)}
                    </p>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-surface-border p-4">
        <div
          className={`ghost-panel flex items-center ${
            enterprise ? "gap-3 p-3" : "flex-col gap-2 px-2 py-3 text-center"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/50 to-blue-500/40 text-sm font-bold text-white">
            <Leaf className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">Иванов А.С.</p>
            <p className="truncate text-[11px] text-surface-muted">Главный агроном</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
