"use client";

import Link from "next/link";
import { PREMIER_NAV } from "@/config/premierNav";
import { useAppStore } from "@/store/appStore";
import { useDataStore } from "@/store/dataStore";
import type { AppView } from "@/types/data";

export function PremierSidebar() {
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-surface-elevated/15 py-8 shadow-panel backdrop-blur-xl">
      <div className="mb-10 px-6">
        <h1 className="text-[28px] font-bold tracking-tighter text-accent">
          BIOPOLAR
        </h1>
        <p className="label-caps mt-1 text-surface-muted opacity-60">
          AgroPulse Premier v4.0.2
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {PREMIER_NAV.map(({ id, label, symbol }) => {
          const active = view === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`flex w-full items-center gap-3 px-4 py-3 transition-all duration-200 ${
                active
                  ? "border-l-2 border-accent bg-accent/10 text-accent"
                  : "text-surface-muted hover:bg-surface-hover/20 hover:text-foreground"
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {symbol}
              </span>
              <span className="label-caps">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="space-y-4 px-4">
        <div className="max-h-32 space-y-1 overflow-y-auto border-t border-white/10 pt-4">
          <p className="label-caps mb-2 text-surface-muted">Поля</p>
          {fields.map((field) => (
            <button
              key={field.id}
              type="button"
              onClick={() => void selectField(field.id)}
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
                selectedFieldId === field.id
                  ? "bg-accent/10 text-accent"
                  : "text-surface-muted hover:text-foreground"
              }`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: field.color }}
              />
              <span className="truncate">{field.name}</span>
              <span className="ml-auto font-data text-[10px] text-accent">
                {field.analysis.ndvi.toFixed(2)}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="label-caps flex w-full items-center justify-center gap-2 border border-accent/30 bg-accent/10 py-3 text-accent transition hover:bg-accent/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Mission
        </button>

        <div className="space-y-1 border-t border-white/10 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-2 text-surface-muted transition hover:text-foreground"
          >
            <span className="material-symbols-outlined text-lg">help</span>
            <span className="label-caps">Support</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-2 text-surface-muted transition hover:text-foreground"
          >
            <span className="material-symbols-outlined text-lg">terminal</span>
            <span className="label-caps">Logs</span>
          </button>
          <Link
            href="/login"
            className="flex w-full items-center gap-3 px-4 py-2 text-surface-muted transition hover:text-foreground"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span className="label-caps">Выход</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function usePremierNav() {
  const setView = useAppStore((s) => s.setView);
  return (id: AppView) => setView(id);
}
