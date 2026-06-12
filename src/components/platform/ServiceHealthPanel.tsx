"use client";

import { Activity, Server } from "lucide-react";
import { useDataStore } from "@/store/dataStore";
import type { ServiceHealth, ServiceStatus } from "@/services/core/types";

const STATUS_STYLES: Record<
  ServiceStatus,
  { dot: string; label: string; text: string }
> = {
  online: {
    dot: "bg-emerald-400",
    label: "Online",
    text: "text-emerald-400",
  },
  degraded: {
    dot: "bg-amber-400",
    label: "Degraded",
    text: "text-amber-400",
  },
  offline: {
    dot: "bg-red-400",
    label: "Offline",
    text: "text-red-400",
  },
};

function ServiceRow({ service }: { service: ServiceHealth }) {
  const style = STATUS_STYLES[service.status];
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-hover">
          <Server className="h-4 w-4 text-slate-400" />
          <span
            className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface-card ${style.dot}`}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {service.label}
          </p>
          <p className="truncate font-mono text-[10px] text-slate-600">
            {service.endpoint}
          </p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-xs font-semibold ${style.text}`}>{style.label}</p>
        <p className="text-[10px] text-slate-500">
          {service.latencyMs > 0 ? `${service.latencyMs} ms` : "—"}
        </p>
        <p className="text-[10px] text-slate-600">v{service.version}</p>
      </div>
    </div>
  );
}

export function ServiceHealthPanel() {
  const serviceHealth = useDataStore((s) => s.serviceHealth);
  const lastSyncAt = useDataStore((s) => s.lastSyncAt);
  const refreshAll = useDataStore((s) => s.refreshAll);
  const isSyncing = useDataStore((s) => s.isSyncing);

  const onlineCount = serviceHealth.filter((s) => s.status === "online").length;

  return (
    <section className="glass-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
            <Activity className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Микросервисы</h2>
            <p className="text-xs text-slate-500">
              {onlineCount}/{serviceHealth.length} online
              {lastSyncAt &&
                ` · sync ${new Date(lastSyncAt).toLocaleTimeString("ru-RU")}`}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void refreshAll()}
          disabled={isSyncing}
          className="btn-secondary !px-3 !py-1.5 !text-xs disabled:opacity-50"
        >
          {isSyncing ? "Синхр..." : "Проверить"}
        </button>
      </div>
      <div className="divide-y divide-surface-border/60">
        {serviceHealth.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
