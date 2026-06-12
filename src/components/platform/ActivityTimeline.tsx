"use client";

import {
  AlertTriangle,
  CloudSun,
  MapPin,
  RefreshCw,
  Settings,
  Tractor,
} from "lucide-react";
import { WidgetCard } from "@/components/ui/WidgetCard";
import { useDataStore } from "@/store/dataStore";
import type { ActivityEvent } from "@/services/core/types";

const TYPE_ICONS = {
  sync: RefreshCw,
  alert: AlertTriangle,
  field: MapPin,
  operation: Tractor,
  weather: CloudSun,
  system: Settings,
} as const;

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function ActivityRow({ event }: { event: ActivityEvent }) {
  const Icon = TYPE_ICONS[event.type];
  return (
    <div className="flex gap-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-hover">
        <Icon className="h-3.5 w-3.5 text-accent" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-xs font-medium text-white">{event.title}</p>
          <time className="shrink-0 text-[10px] text-slate-600">
            {formatTime(event.timestamp)}
          </time>
        </div>
        <p className="mt-0.5 truncate text-[11px] text-slate-500">
          {event.description}
        </p>
      </div>
    </div>
  );
}

/** Лента событий платформы (синхронизация, поля, алерты) */
export function ActivityTimeline() {
  const activities = useDataStore((s) => s.activities);

  return (
    <WidgetCard title="Лента активности" icon={RefreshCw} badge="Live">
      <div className="max-h-[220px] divide-y divide-surface-border/50 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">
            События появятся после синхронизации
          </p>
        ) : (
          activities.map((event) => (
            <ActivityRow key={event.id} event={event} />
          ))
        )}
      </div>
    </WidgetCard>
  );
}
