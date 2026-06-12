"use client";

import { X, MapPin, Droplets, Sprout, Calendar, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useDataStore } from "@/store/dataStore";

const HEALTH_COLORS = {
  excellent: "text-emerald-400",
  good: "text-green-400",
  attention: "text-amber-400",
  critical: "text-red-400",
} as const;

export function FieldDetailDrawer() {
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const fieldDrawerOpen = useDataStore((s) => s.fieldDrawerOpen);
  const closeFieldDrawer = useDataStore((s) => s.closeFieldDrawer);
  const techMap = useDataStore((s) => s.techMap);
  const fieldOperations = useDataStore((s) => s.fieldOperations);

  const field = fields.find((f) => f.id === selectedFieldId);

  return (
    <AnimatePresence>
      {fieldDrawerOpen && field && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={closeFieldDrawer}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-surface-border bg-surface-card shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-surface-border px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Карточка поля
                </p>
                <h2 className="text-lg font-bold text-white">{field.name}</h2>
              </div>
              <button
                type="button"
                onClick={closeFieldDrawer}
                className="rounded-lg border border-surface-border p-2 text-slate-400 hover:text-white"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <section className="rounded-xl border border-surface-border bg-surface-hover/40 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {field.crop} · {field.area} га
                    </p>
                    <p className="text-sm text-slate-400">
                      {field.analysis.growthStage}
                    </p>
                    <p
                      className={`mt-1 text-sm font-semibold ${HEALTH_COLORS[field.analysis.health]}`}
                    >
                      {field.analysis.healthLabel}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Анализ
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Sprout, label: "NDVI", value: field.analysis.ndvi.toFixed(2) },
                    {
                      icon: Droplets,
                      label: "Влажность почвы",
                      value: `${field.analysis.soilMoisture}%`,
                    },
                    {
                      icon: Sprout,
                      label: "Прогноз урожая",
                      value: `${field.analysis.yieldForecast} т/га`,
                    },
                    {
                      icon: Calendar,
                      label: "Съёмка",
                      value: field.analysis.lastSurvey,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="rounded-lg border border-surface-border bg-surface-hover/30 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <Icon className="h-3 w-3" />
                        {label}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-surface-hover px-2 py-2">
                    <p className="text-slate-500">N</p>
                    <p className="font-bold text-white">{field.analysis.nitrogen}</p>
                  </div>
                  <div className="rounded-lg bg-surface-hover px-2 py-2">
                    <p className="text-slate-500">P</p>
                    <p className="font-bold text-white">{field.analysis.phosphorus}</p>
                  </div>
                  <div className="rounded-lg bg-surface-hover px-2 py-2">
                    <p className="text-slate-500">K</p>
                    <p className="font-bold text-white">{field.analysis.potassium}</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Технологическая карта
                </h3>
                <div className="rounded-xl border border-surface-border p-4">
                  <p className="text-sm font-medium text-white">
                    {techMap.nextOperation}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {techMap.nextDate} · норма {techMap.norm}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      techMap.status === "on-track"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {techMap.statusLabel}
                  </span>
                </div>
              </section>

              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <ClipboardList className="h-3.5 w-3.5" />
                  Обработки на поле
                </h3>
                {fieldOperations.length === 0 ? (
                  <p className="text-sm text-slate-500">Нет записей</p>
                ) : (
                  <div className="space-y-2">
                    {fieldOperations.map((op) => (
                      <div
                        key={op.id}
                        className="rounded-lg border border-surface-border bg-surface-hover/30 px-3 py-2"
                      >
                        <div className="flex justify-between gap-2">
                          <p className="text-xs font-medium text-white">
                            {op.product}
                          </p>
                          <span className="text-[10px] text-slate-500">{op.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {op.amount} · {op.status}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
