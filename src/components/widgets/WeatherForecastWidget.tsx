"use client";

import { Cloud, CloudRain, Sun } from "lucide-react";
import { useDataStore } from "@/store/dataStore";
import type { ForecastDay } from "@/types/data";

const ICONS = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
};

const COLORS = {
  sun: "text-amber-400",
  cloud: "text-slate-400",
  rain: "text-blue-400",
};

function ForecastRow({ item }: { item: ForecastDay }) {
  const Icon = ICONS[item.icon];
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-surface-border bg-surface-hover/40 px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <Icon className={`h-5 w-5 shrink-0 ${COLORS[item.icon]}`} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{item.day}</p>
          <p className="truncate text-xs text-slate-400">{item.condition}</p>
        </div>
      </div>
      <span className="shrink-0 text-sm font-semibold text-white">+{item.temp}°</span>
    </div>
  );
}

/** Прогноз погоды на 3 дня */
export function WeatherForecastWidget() {
  const forecast = useDataStore((s) => s.forecast);

  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-2 overflow-hidden">
      {forecast.map((item) => (
        <ForecastRow key={item.id} item={item} />
      ))}
    </div>
  );
}
