"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "@/lib/motion";
import { useDataStore } from "@/store/dataStore";

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6WxM3-J6UGp0ft_naWeUQLlPeOuVuCeQ28xqyVvFAllRQUpOBaoa_ZgBFe3vVOIG5aHVDTbraOnnU9dISfXh1Lirc6WjzyygEGEIUlRmgxsNu0OPkXuo1vBH3I0OF27O6ABCf0yIn-J6ofwUnz1YWWE1kyXsSMDtFsXqJoSa9o0aa-Biy5ylngZFpcz0a_cFBCaCvHH1rBx82r6WhEVNAD_p5_55r76RhEZe_c6G1hvIpWjuv9qvJPGRu0i12hKDBwab5EKLZ1P9s";

const GROWTH_PHASES = [
  { status: "Завершено", title: "Посев", period: "12 Апр — 18 Апр", done: true },
  { status: "Текущая фаза", title: "Кущение", period: "Прогресс: 62% · Ожид. 14 дней", current: true },
  { status: "Следующая", title: "Выход в трубку", period: "Прогноз: 05 Июн", next: true },
];

export function FieldDetailDrawer() {
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const fieldDrawerOpen = useDataStore((s) => s.fieldDrawerOpen);
  const closeFieldDrawer = useDataStore((s) => s.closeFieldDrawer);
  const fieldOperations = useDataStore((s) => s.fieldOperations);
  const techMap = useDataStore((s) => s.techMap);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!fieldDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fieldDrawerOpen]);

  const field = fields.find((f) => f.id === selectedFieldId);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {fieldDrawerOpen && field && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={closeFieldDrawer}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-0 right-0 top-0 z-[100] flex w-full max-w-2xl flex-col border-l border-white/10 bg-background shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Карточка поля ${field.name}`}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="label-caps text-surface-muted">Карточка поля</p>
                <h2 className="text-xl font-bold text-foreground">{field.name}</h2>
                <p className="font-data-sm text-sm text-surface-muted">
                  {field.crop} · {field.area} га · NDVI {field.analysis.ndvi.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={closeFieldDrawer}
                className="rounded border border-white/10 p-2 text-surface-muted hover:text-foreground"
                aria-label="Закрыть"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-12 gap-1">
                <div className="relative col-span-12 overflow-hidden border border-white/10 bg-surface-elevated lg:col-span-8">
                  <div className="absolute left-4 top-4 z-10">
                    <div className="premier-pulse-accent border border-accent/40 bg-background/90 px-3 py-2 backdrop-blur">
                      <p className="label-caps text-surface-muted">ГЕО-СЛОЙ</p>
                      <p className="font-data-lg text-accent">
                        NDVI: {field.analysis.ndvi.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="relative h-48 sm:h-64">
                    <img
                      alt={field.name}
                      className="h-full w-full object-cover opacity-40 mix-blend-overlay grayscale"
                      src={MAP_IMAGE}
                    />
                    <svg
                      className="absolute inset-0 h-full w-full fill-none stroke-accent/20"
                      viewBox="0 0 800 500"
                    >
                      <path d="M100,100 Q200,150 400,100 T700,200" strokeWidth="0.5" />
                      <circle cx="300" cy="250" r="4" className="fill-accent animate-pulse" />
                    </svg>
                  </div>
                </div>

                <div className="col-span-12 flex flex-col gap-1 lg:col-span-4">
                  <div className="premier-pulse-accent flex-1 border border-white/10 bg-surface-elevated p-4 sm:p-6">
                    <h3 className="label-caps mb-4 flex justify-between text-surface-muted">
                      НУТРИЕНТНЫЕ ИНДЕКСЫ
                      <span className="text-accent">ОБНОВЛЕНО: {field.analysis.lastSurvey}</span>
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Азот (N)", value: `${field.analysis.nitrogen} мг/кг`, pct: 78 },
                        { label: "Фосфор (P)", value: `${field.analysis.phosphorus} мг/кг`, pct: 62 },
                        { label: "Калий (K)", value: `${field.analysis.potassium} мг/кг`, pct: 85 },
                      ].map((n) => (
                        <div key={n.label}>
                          <div className="mb-2 flex justify-between">
                            <span className="font-data-sm">{n.label}</span>
                            <span className="font-data-lg text-accent">{n.value}</span>
                          </div>
                          <div className="h-1 overflow-hidden bg-surface-hover">
                            <div className="h-full bg-accent shadow-glow" style={{ width: `${n.pct}%` }} />
                          </div>
                        </div>
                      ))}
                      <div className="border border-white/10 bg-background/40 p-4">
                        <p className="label-caps text-surface-muted">ВЛАЖНОСТЬ ПОЧВЫ</p>
                        <p className="font-data-lg text-2xl text-foreground">
                          {field.analysis.soilMoisture}%
                        </p>
                        <p className="font-data-sm mt-1 text-accent">{field.analysis.healthLabel}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 border border-white/10 bg-surface-elevated p-4 sm:p-6">
                  <h3 className="label-caps mb-4 text-surface-muted">Технологическая карта</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-data-sm text-surface-muted">Ближайшая операция</p>
                      <p className="text-lg font-semibold">{techMap.nextOperation}</p>
                    </div>
                    <div>
                      <p className="font-data-sm text-surface-muted">Дата / норма</p>
                      <p className="font-data-lg text-accent">
                        {techMap.nextDate} · {techMap.norm}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="label-caps rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-accent">
                        {techMap.statusLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 border border-white/10 bg-surface-elevated p-4 sm:p-6">
                  <h3 className="label-caps mb-6 text-surface-muted">Фазы Роста и Прогресс</h3>
                  <div className="relative px-4">
                    <div className="absolute left-0 top-8 h-px w-full bg-white/20" />
                    <div className="absolute left-0 top-8 h-px w-2/3 bg-accent shadow-glow" />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                      {GROWTH_PHASES.map((phase) => (
                        <div
                          key={phase.title}
                          className={`relative pt-12 ${phase.next ? "opacity-40" : ""}`}
                        >
                          <div
                            className={`absolute left-0 top-6 flex h-4 w-4 items-center justify-center rounded-full ${
                              phase.done
                                ? "bg-accent"
                                : phase.current
                                  ? "border-2 border-accent bg-background"
                                  : "border border-white/30"
                            }`}
                          >
                            {phase.done && (
                              <span className="material-symbols-outlined text-[10px] font-bold text-[#00210e]">
                                check
                              </span>
                            )}
                            {phase.current && (
                              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-accent" />
                            )}
                          </div>
                          <p
                            className={`label-caps mb-1 ${phase.current ? "text-accent" : "text-surface-muted"}`}
                          >
                            {phase.status}
                          </p>
                          <p className="text-lg font-semibold">{phase.title}</p>
                          <p className="font-data-sm mt-2 text-surface-muted">{phase.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-span-12 overflow-hidden border border-white/10 bg-surface-elevated">
                  <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-6">
                    <h3 className="label-caps text-surface-muted">Журнал операций участка</h3>
                    <button type="button" className="font-data-sm flex items-center gap-1 text-accent">
                      ПОЛНЫЙ ОТЧЕТ
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full font-data-sm text-sm">
                      <thead className="bg-surface-hover/30 text-[10px] uppercase text-surface-muted">
                        <tr>
                          <th className="px-4 py-3 text-left sm:px-6">ДАТА</th>
                          <th className="px-4 py-3 text-left sm:px-6">ОПЕРАЦИЯ</th>
                          <th className="px-4 py-3 text-left sm:px-6">СТАТУС</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {(fieldOperations.length > 0 ? fieldOperations : []).map((op) => (
                          <tr key={op.id} className="transition hover:bg-surface-hover/10">
                            <td className="px-4 py-3 sm:px-6">{op.date}</td>
                            <td className="px-4 py-3 sm:px-6">{op.product}</td>
                            <td className="px-4 py-3 sm:px-6">
                              <span className="label-caps rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
                                {op.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {fieldOperations.length === 0 && (
                          <tr>
                            <td colSpan={3} className="px-6 py-8 text-center text-surface-muted">
                              Нет записей по полю
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
