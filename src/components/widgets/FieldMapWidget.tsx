"use client";

import { useDataStore } from "@/store/dataStore";

const NDVI_LEGEND = [
  { label: "< 0.5", color: "#EF4444" },
  { label: "0.5–0.7", color: "#F59E0B" },
  { label: "> 0.7", color: "#22C55E" },
];

function ndviColor(ndvi: number): string {
  if (ndvi >= 0.7) return "#22C55E";
  if (ndvi >= 0.5) return "#F59E0B";
  return "#EF4444";
}

/** Карта полей с NDVI-индикацией и анализом по клику */
export function FieldMapWidget() {
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);

  const selected = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="relative flex h-full min-h-[200px] flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-wide text-slate-500">
          Карта полей · NDVI
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {NDVI_LEGEND.map((item) => (
            <span key={item.label} className="flex items-center gap-1 text-[10px] text-slate-500">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 440 200"
        className="flex-1 w-full rounded-lg bg-slate-900/80"
        role="img"
        aria-label="Карта полей"
      >
        {/* Сетка */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 55}
            y1={0}
            x2={i * 55}
            y2={200}
            stroke="#334155"
            strokeWidth={0.5}
            opacity={0.4}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 50}
            x2={440}
            y2={i * 50}
            stroke="#334155"
            strokeWidth={0.5}
            opacity={0.4}
          />
        ))}

        {fields.map((field) => {
          const isSelected = selectedFieldId === field.id;
          const fill = ndviColor(field.analysis.ndvi);
          return (
            <g key={field.id}>
              <path
                d={field.path}
                fill={fill}
                fillOpacity={isSelected ? 0.65 : 0.4}
                stroke={isSelected ? "#fff" : fill}
                strokeWidth={isSelected ? 2.5 : 1.5}
                className="cursor-pointer transition-all hover:fill-opacity-70"
                onClick={() =>
                  selectField(isSelected ? null : field.id)
                }
              />
              <text
                x={
                  field.path.includes("M20")
                    ? 90
                    : field.path.includes("M200")
                      ? 240
                      : 360
                }
                y={field.path.includes("M320") ? 100 : 95}
                fill="white"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                {field.name}
              </text>
              <text
                x={
                  field.path.includes("M20")
                    ? 90
                    : field.path.includes("M200")
                      ? 240
                      : 360
                }
                y={field.path.includes("M320") ? 114 : 109}
                fill="white"
                fontSize="9"
                opacity={0.8}
                textAnchor="middle"
                className="pointer-events-none select-none"
              >
                NDVI {field.analysis.ndvi.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>

      {selected && (
        <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-surface-border bg-surface-card/95 p-3 shadow-xl backdrop-blur-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-white">{selected.name}</p>
              <p className="text-xs text-slate-400">
                {selected.crop} · {selected.area} га · {selected.analysis.growthStage}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-accent">
                {selected.analysis.ndvi.toFixed(2)}
              </p>
              <p className="text-[10px] text-slate-500">NDVI</p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="rounded-md bg-surface-hover px-2 py-1">
              <p className="text-slate-500">Влажн.</p>
              <p className="font-semibold text-blue-400">
                {selected.analysis.soilMoisture}%
              </p>
            </div>
            <div className="rounded-md bg-surface-hover px-2 py-1">
              <p className="text-slate-500">Урожай</p>
              <p className="font-semibold text-white">
                {selected.analysis.yieldForecast} т/га
              </p>
            </div>
            <div className="rounded-md bg-surface-hover px-2 py-1">
              <p className="text-slate-500">Статус</p>
              <p className="font-semibold text-emerald-400">
                {selected.analysis.healthLabel}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
