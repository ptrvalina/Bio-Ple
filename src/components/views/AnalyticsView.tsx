"use client";

import { useActiveField } from "@/hooks/useActiveField";
import { useDataStore } from "@/store/dataStore";

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6WxM3-J6UGp0ft_naWeUQLlPeOuVuCeQ28xqyVvFAllRQUpOBaoa_ZgBFe3vVOIG5aHVDTbraOnnU9dISfXh1Lirc6WjzyygEGEIUlRmgxsNu0OPkXuo1vBH3I0OF27O6ABCf0yIn-J6ofwUnz1YWWE1kyXsSMDtFsXqJoSa9o0aa-Biy5ylngZFpcz0a_cFBCaCvHH1rBx82r6WhEVNAD_p5_55r76RhEZe_c6G1hvIpWjuv9qvJPGRu0i12hKDBwab5EKLZ1P9s";

export function AnalyticsView() {
  const fields = useDataStore((s) => s.fields);
  const deviations = useDataStore((s) => s.deviations);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);
  const selected = useActiveField();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-12 lg:grid-rows-6 lg:gap-px lg:bg-white/10">
      <aside className="hidden flex-col border-r border-white/10 bg-surface/15 p-6 lg:col-span-2 lg:row-span-6 lg:flex">
        <h3 className="label-caps mb-4 text-accent">ACTIVE SECTORS</h3>
        <div className="space-y-3">
          {fields.map((field) => {
            const active = field.id === selectedFieldId;
            return (
              <button
                key={field.id}
                type="button"
                onClick={() => void selectField(field.id)}
                className={`w-full p-3 text-left transition ${
                  active
                    ? "border-l-2 border-accent bg-accent/5"
                    : "border-l-2 border-transparent hover:border-white/20 hover:bg-white/5"
                }`}
              >
                <p className="font-data-sm">{field.name.toUpperCase()}</p>
                <div className="mt-1 flex justify-between">
                  <span className="label-caps text-[10px] text-surface-muted">
                    NDVI: {field.analysis.ndvi.toFixed(2)}
                  </span>
                  <span className="label-caps text-[10px] text-accent">
                    {field.analysis.healthLabel.toUpperCase()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-auto">
          <div className="premier-glass mb-4 p-4">
            <p className="label-caps mb-2 text-surface-muted">SYSTEM LOAD</p>
            <div className="h-1 overflow-hidden rounded-full bg-surface-hover">
              <div className="h-full w-[65%] bg-accent" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-accent">
            <span
              className="material-symbols-outlined animate-pulse text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              circle
            </span>
            <span className="label-caps text-[10px]">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </aside>

      <section className="relative min-h-[280px] overflow-hidden border-b border-white/10 bg-surface/15 lg:col-span-7 lg:row-span-4 lg:min-h-0 lg:border-r">
        <div className="absolute left-4 top-4 z-10 space-y-2">
          <div className="premier-glass flex items-center gap-2 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="label-caps text-[11px]">Layer: NDVI_HEALTH_INDEX</span>
          </div>
        </div>
        <img alt="Analytics map" className="h-full w-full object-cover opacity-50" src={MAP_IMAGE} />
        <div className="premier-scanline" />
        <div className="absolute bottom-4 left-4 right-4 z-10 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {[
            { label: "NDVI", value: selected?.analysis.ndvi.toFixed(2) ?? "—" },
            { label: "N", value: `${selected?.analysis.nitrogen ?? "—"} ppm` },
            { label: "P", value: `${selected?.analysis.phosphorus ?? "—"} ppm` },
            { label: "K", value: `${selected?.analysis.potassium ?? "—"} ppm` },
          ].map((m) => (
            <div key={m.label} className="premier-glass p-3 text-center">
              <p className="label-caps text-[9px] text-surface-muted">{m.label}</p>
              <p className="font-data-lg text-accent">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="flex flex-col gap-px overflow-y-auto bg-surface/15 lg:col-span-3 lg:row-span-4">
        <div className="premier-pulse-accent border-b border-white/10 p-4">
          <p className="label-caps text-surface-muted">YIELD FORECAST</p>
          <p className="font-data-lg text-3xl text-accent">
            {selected?.analysis.yieldForecast ?? "—"} т/га
          </p>
          <p className="font-data-sm mt-1 text-surface-muted">
            {selected?.crop} · {selected?.area} га
          </p>
        </div>
        <div className="flex-1 p-4">
          <p className="label-caps mb-3 text-surface-muted">PLAN / FACT DEVIATIONS</p>
          <div className="space-y-2">
            {deviations
              .filter((d) => !selected || d.field === selected.name)
              .slice(0, 5)
              .map((d) => (
              <div
                key={d.id}
                className="border border-white/10 bg-surface-hover/30 p-3"
              >
                <p className="text-sm">{d.operation}</p>
                <p className="font-data-sm text-[10px] text-surface-muted">
                  {d.field} · {d.deviation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="overflow-x-auto border-t border-white/10 bg-surface/15 p-4 lg:col-span-12 lg:row-span-2">
        <h3 className="label-caps mb-4 text-surface-muted">SPECTRAL ANALYSIS FEED</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => void selectField(f.id)}
              className={`premier-glass p-4 text-left transition ${
                selectedFieldId === f.id ? "ring-1 ring-accent" : "hover:bg-surface-hover/20"
              }`}
            >
              <p className="font-semibold">{f.name}</p>
              <div className="mt-2 flex h-16 items-end gap-1">
                {[40, 55, 80, 65, 90, 75, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-accent/20 hover:bg-accent/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="font-data-sm mt-2 text-accent">
                NDVI trend · {f.analysis.growthStage}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
