"use client";

import {
  AlertTriangle,
  CloudSun,
  Layers,
  Sprout,
  TrendingUp,
  Wind,
} from "lucide-react";
import { useDataStore } from "@/store/dataStore";

export function DashboardKPIBar() {
  const fields = useDataStore((s) => s.fields);
  const weather = useDataStore((s) => s.weather);
  const alerts = useDataStore((s) => s.alerts);
  const deviations = useDataStore((s) => s.deviations);
  const operations = useDataStore((s) => s.operations);

  const totalArea = fields.reduce((sum, f) => sum + f.area, 0);
  const avgNdvi = fields.reduce((sum, f) => sum + f.analysis.ndvi, 0) / fields.length;
  const opsToday = operations.filter((o) => o.date === "12.06.2026").length;

  const stats = [
    {
      icon: Layers,
      label: "Площадь",
      value: `${totalArea.toFixed(1)} га`,
      sub: `${fields.length} поля в работе`,
      color: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-accent",
    },
    {
      icon: TrendingUp,
      label: "NDVI средний",
      value: avgNdvi.toFixed(2),
      sub: avgNdvi >= 0.7 ? "В пределах нормы" : "Ниже нормы",
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
    },
    {
      icon: CloudSun,
      label: "Погода",
      value: `+${weather.temperature}°C`,
      sub: `${weather.condition} · влажн. ${weather.humidity}%`,
      color: "from-sky-500/20 to-sky-500/5",
      iconColor: "text-sky-400",
    },
    {
      icon: Wind,
      label: "Ветер",
      value: `${weather.wind} м/с`,
      sub: weather.wind > 5 ? "Нелётная погода" : "Условия для обработки",
      color: "from-violet-500/20 to-violet-500/5",
      iconColor: weather.wind > 5 ? "text-red-400" : "text-violet-400",
    },
    {
      icon: AlertTriangle,
      label: "Алерты",
      value: String(alerts.length),
      sub: alerts.length ? "Требуют реакции" : "Всё в порядке",
      color: "from-red-500/20 to-red-500/5",
      iconColor: alerts.length ? "text-red-400" : "text-accent",
    },
    {
      icon: Sprout,
      label: "Операции",
      value: `${opsToday} сегодня`,
      sub: `${deviations.length} отклонений план/факт`,
      color: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`glass-card-hover bg-gradient-to-br ${s.color} !p-4`}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="stat-label">{s.label}</span>
            <s.icon className={`h-4 w-4 ${s.iconColor}`} />
          </div>
          <p className="stat-value">{s.value}</p>
          <p className="mt-1 truncate text-[11px] text-slate-500">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
