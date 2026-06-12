"use client";

import { useEffect } from "react";
import { Droplets, Sun, Wind } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useDataStore } from "@/store/dataStore";

export function WeatherNowWidget() {
  const weather = useDataStore((s) => s.weather);
  const startWeatherPolling = useDataStore((s) => s.startWeatherPolling);

  useEffect(() => startWeatherPolling(), [startWeatherPolling]);

  const flyable = weather.wind <= 5;

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-2xl" />
        <Sun className="relative h-14 w-14 text-amber-400" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={weather.temperature}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="text-center"
        >
          <p className="text-5xl font-bold tracking-tight text-white">
            +{weather.temperature}
            <span className="text-2xl text-slate-500">°C</span>
          </p>
          <p className="mt-1 text-sm text-slate-400">{weather.condition}</p>
        </motion.div>
      </AnimatePresence>

      <div className="grid w-full grid-cols-2 gap-2">
        <div className="rounded-xl bg-surface-hover/60 px-3 py-2.5 text-center">
          <Wind className="mx-auto mb-1 h-4 w-4 text-violet-400" />
          <p className="text-lg font-bold text-white">{weather.wind}</p>
          <p className="text-[10px] text-slate-500">м/с ветер</p>
        </div>
        <div className="rounded-xl bg-surface-hover/60 px-3 py-2.5 text-center">
          <Droplets className="mx-auto mb-1 h-4 w-4 text-blue-400" />
          <p className="text-lg font-bold text-white">{weather.humidity}%</p>
          <p className="text-[10px] text-slate-500">влажность</p>
        </div>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
          flyable
            ? "bg-accent/15 text-accent-light"
            : "bg-red-500/15 text-red-400"
        }`}
      >
        {flyable ? "✓ Условия для обработки" : "✗ Нелётная погода"}
      </span>
    </div>
  );
}
