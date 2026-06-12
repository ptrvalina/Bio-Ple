"use client";

import {
  Activity,
  Droplets,
  Leaf,
  TestTube,
  Wheat,
} from "lucide-react";
import { useDataStore } from "@/store/dataStore";
import type { FieldHealth } from "@/types/data";

const HEALTH_STYLES: Record<FieldHealth, string> = {
  excellent: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  good: "bg-green-500/15 text-green-400 border-green-500/30",
  attention: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
};

function MetricBar({
  label,
  value,
  max,
  unit,
  color,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-medium text-white">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-hover">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Анализ выбранного поля — NDVI, влажность, фаза, урожайность, NPK */
export function FieldAnalysisWidget() {
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);

  const field = fields.find((f) => f.id === selectedFieldId) ?? fields[0];
  const a = field.analysis;

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      {/* Переключатель полей */}
      <div className="flex gap-1">
        {fields.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => void selectField(f.id)}
            className={`rounded-md px-2 py-1 text-[10px] font-medium transition ${
              field.id === f.id
                ? "bg-accent text-white"
                : "bg-surface-hover text-slate-400 hover:text-white"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{field.name}</p>
          <p className="text-xs text-slate-400">
            {field.crop} · {field.area} га
          </p>
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${HEALTH_STYLES[a.health]}`}
        >
          {a.healthLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-surface-border bg-surface-hover/40 p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Activity className="h-3 w-3" />
            NDVI
          </div>
          <p className="mt-1 text-lg font-bold text-accent">{a.ndvi.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-surface-border bg-surface-hover/40 p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Wheat className="h-3 w-3" />
            Урожай
          </div>
          <p className="mt-1 text-lg font-bold text-white">
            {a.yieldForecast}{" "}
            <span className="text-xs font-normal text-slate-400">т/га</span>
          </p>
        </div>
        <div className="rounded-lg border border-surface-border bg-surface-hover/40 p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Droplets className="h-3 w-3" />
            Влажность
          </div>
          <p className="mt-1 text-lg font-bold text-blue-400">{a.soilMoisture}%</p>
        </div>
        <div className="rounded-lg border border-surface-border bg-surface-hover/40 p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Leaf className="h-3 w-3" />
            Фаза
          </div>
          <p className="mt-1 text-xs font-semibold leading-tight text-white">
            {a.growthStage}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-slate-500">
          <TestTube className="h-3 w-3" />
          Почвенный анализ (NPK), мг/кг
        </div>
        <MetricBar label="Азот (N)" value={a.nitrogen} max={120} unit="" color="bg-green-500" />
        <MetricBar label="Фосфор (P)" value={a.phosphorus} max={40} unit="" color="bg-blue-500" />
        <MetricBar label="Калий (K)" value={a.potassium} max={250} unit="" color="bg-amber-500" />
      </div>

      <p className="mt-auto text-[10px] text-slate-500">
        Съёмка: {a.lastSurvey}
      </p>
    </div>
  );
}
