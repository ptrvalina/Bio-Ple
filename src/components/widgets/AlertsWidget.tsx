"use client";

import { AlertTriangle, Check, CloudOff } from "lucide-react";
import { useDataStore } from "@/store/dataStore";
import type { Alert } from "@/types/data";

function AlertIcon({ severity }: { severity: Alert["severity"] }) {
  if (severity === "danger") return <AlertTriangle className="h-4 w-4 text-red-400" />;
  if (severity === "warning") return <CloudOff className="h-4 w-4 text-amber-400" />;
  return <AlertTriangle className="h-4 w-4 text-blue-400" />;
}

/** Алерты с подтверждением (удаление из списка) */
export function AlertsWidget() {
  const alerts = useDataStore((s) => s.alerts);
  const dismissAlert = useDataStore((s) => s.dismissAlert);

  if (alerts.length === 0) {
    return (
      <div className="flex h-full min-h-[100px] flex-col items-center justify-center text-center">
        <Check className="mb-2 h-8 w-8 text-emerald-400" />
        <p className="text-sm text-slate-400">Все алерты обработаны</p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[100px] flex-col gap-2">
      <div className="mb-1 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {alerts.length}
        </span>
        <span className="text-xs text-slate-500">активных предупреждений</span>
      </div>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-2.5 ${
            alert.severity === "danger"
              ? "border-red-500/30 bg-red-500/10"
              : alert.severity === "warning"
                ? "border-amber-500/30 bg-amber-500/10"
                : "border-blue-500/30 bg-blue-500/10"
          }`}
        >
          <div className="flex gap-2">
            <AlertIcon severity={alert.severity} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">{alert.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
                {alert.description}
              </p>
              <button
                type="button"
                onClick={() => void dismissAlert(alert.id)}
                className="mt-2 rounded-md bg-surface-hover px-2 py-1 text-[10px] text-slate-300 transition hover:bg-accent/20 hover:text-accent"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
