"use client";

import { Calendar, CheckCircle2, MapPin, Sprout, AlertTriangle, ArrowRight } from "lucide-react";
import { useDataStore } from "@/store/dataStore";

export function TechMapWidget() {
  const techMap = useDataStore((s) => s.techMap);
  const openFieldDrawer = useDataStore((s) => s.openFieldDrawer);
  const onTrack = techMap.status === "on-track";

  return (
    <div className="h-full min-h-0 space-y-4 overflow-y-auto">
      <div className="flex items-center justify-between rounded-xl bg-surface-hover/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
            <MapPin className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-white">{techMap.field}</p>
            <p className="flex items-center gap-1 text-xs text-slate-400">
              <Sprout className="h-3 w-3" />
              {techMap.crop}
            </p>
          </div>
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            onTrack
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {onTrack ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5" />
          )}
          {techMap.statusLabel}
        </span>
      </div>

      <div className="rounded-xl border border-surface-border p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Ближайшая операция
        </p>
        <p className="mt-2 text-base font-semibold text-white">
          {techMap.nextOperation}
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="h-4 w-4 text-accent" />
            {techMap.nextDate}
          </div>
          <div className="text-sm">
            <span className="text-slate-500">Норма: </span>
            <span className="font-medium text-white">{techMap.norm}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={openFieldDrawer}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-surface-border-light py-2.5 text-xs text-slate-500 transition hover:border-accent/40 hover:text-accent"
      >
        Открыть полную технологическую карту
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
