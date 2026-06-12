"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MaterialSymbols } from "@/components/ui/MaterialSymbols";

const STEPS = [
  {
    title: "Идентификация Личности",
    desc: "Введите верификационные данные оператора системы.",
  },
  {
    title: "Назначение Сектора",
    desc: "Выберите основную зону ответственности для текущей смены.",
  },
  {
    title: "Уровни Допуска",
    desc: "Настройте привилегии и подтвердите протоколы безопасности.",
  },
];

const SECTORS = [
  { id: "field-3", icon: "potted_plant", name: "Поле 3", desc: "ПШЕНИЦА ОЗИМАЯ", stability: "98%" },
  { id: "field-7", icon: "water_drop", name: "Поле 7", desc: "ЯЧМЕНЬ", stability: "74%" },
  { id: "field-1", icon: "memory", name: "Поле 1", desc: "ПОДСОЛНЕЧНИК", stability: "100%" },
];

export function RegisterPageContent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedSector, setSelectedSector] = useState("field-3");
  const [access, setAccess] = useState({ telemetry: true, climate: true, emergency: false });

  const finish = () => router.push("/");

  return (
    <div className="relative flex min-h-[100dvh] overflow-hidden bg-background">
      <MaterialSymbols />
      <div className="premier-grain" />

      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-surface-elevated/15 py-8 backdrop-blur-xl lg:flex">
        <div className="mb-12 px-6">
          <h1 className="text-4xl font-bold tracking-tighter text-accent">BIOPOLAR</h1>
          <p className="label-caps mt-1 text-surface-muted opacity-60">AgroPulse v4.0.2</p>
        </div>
        <nav className="flex-1 px-4">
          <div className="flex items-center gap-3 rounded border-l-2 border-accent bg-accent/10 p-3 text-accent">
            <span className="material-symbols-outlined">person_add</span>
            <span className="label-caps">Регистрация</span>
          </div>
        </nav>
        <div className="mt-auto border-t border-white/10 px-6 pt-4">
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-surface-hover">
              <span className="material-symbols-outlined text-accent">shield_person</span>
            </div>
            <div>
              <p className="text-xs font-bold">New Operator</p>
              <p className="label-caps text-surface-muted">Status: Pending</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-4 sm:p-8">
        <div className="premier-glass relative w-full max-w-4xl border-t-2 border-t-accent/40 p-6 shadow-panel sm:p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                {STEPS[step - 1].title}
              </h2>
              <p className="mt-1 text-sm text-surface-muted">{STEPS[step - 1].desc}</p>
            </div>
            <div className="text-right">
              <span className="font-data-lg text-accent">
                0{step} / 03
              </span>
              <div className="mt-2 h-1 w-32 overflow-hidden bg-surface-hover">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <label className="block">
                  <span className="label-caps mb-2 block text-surface-muted">Полное Имя</span>
                  <input
                    className="w-full border-b border-white/20 bg-transparent py-2 font-data-lg text-foreground outline-none focus:border-accent"
                    placeholder="ИВАНОВ И.И."
                    type="text"
                  />
                </label>
                <label className="block">
                  <span className="label-caps mb-2 block text-surface-muted">ID Жетона</span>
                  <input
                    className="w-full border-b border-white/20 bg-transparent py-2 font-data-lg text-foreground outline-none focus:border-accent"
                    placeholder="AGRO-992-PX"
                    type="text"
                  />
                </label>
              </div>
              <div className="premier-glass flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-white/20 p-6 transition hover:border-accent/50">
                <span className="material-symbols-outlined mb-2 text-4xl text-surface-muted">
                  fingerprint
                </span>
                <p className="label-caps text-center text-surface-muted">
                  Загрузить биометрический профиль
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {SECTORS.map((sector) => {
                const active = selectedSector === sector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => setSelectedSector(sector.id)}
                    className={`premier-glass relative overflow-hidden p-4 text-left transition ${
                      active ? "border border-accent shadow-glow" : "hover:bg-surface-hover/20"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 h-full w-1 ${active ? "bg-accent" : "bg-white/20"}`}
                    />
                    <span
                      className={`material-symbols-outlined mb-4 block ${active ? "text-accent" : "text-surface-muted"}`}
                    >
                      {sector.icon}
                    </span>
                    <h3 className="text-lg font-semibold">{sector.name}</h3>
                    <p className="font-data-sm text-[10px] text-surface-muted">{sector.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="label-caps opacity-50">STABILITY {sector.stability}</span>
                      {active && (
                        <span
                          className="material-symbols-outlined text-sm text-accent"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="premier-glass border-l-4 border-amber-400 bg-amber-400/5 p-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-amber-400">warning</span>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                      Протокол Допуска Ранг-4
                    </h4>
                    <p className="mt-1 text-xs text-surface-muted">
                      Требуется двухфакторная аутентификация для управления автономными дронами
                      в секторе BioPole.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <h5 className="label-caps text-surface-muted">Уровни доступа</h5>
                  {[
                    { key: "telemetry" as const, label: "Мониторинг телеметрии" },
                    { key: "climate" as const, label: "Коррекция микроклимата" },
                    { key: "emergency" as const, label: "Аварийная деактивация" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-4">
                      <input
                        checked={access[key]}
                        className="h-4 w-4 rounded border-white/20 bg-surface text-accent focus:ring-accent/40"
                        type="checkbox"
                        onChange={(e) =>
                          setAccess((a) => ({ ...a, [key]: e.target.checked }))
                        }
                      />
                      <span className="font-data-sm text-sm">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="relative h-32 overflow-hidden rounded">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-surface" />
                  <div className="absolute inset-0 border border-accent/30" />
                  <div className="absolute left-2 top-2 bg-accent/20 px-2 py-1 backdrop-blur">
                    <span className="label-caps text-accent">SECURE_FEED_01</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={`label-caps flex items-center gap-2 text-surface-muted transition hover:text-foreground ${
                step === 1 ? "invisible" : ""
              }`}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              НАЗАД
            </button>
            <button
              type="button"
              onClick={() => (step < 3 ? setStep((s) => s + 1) : finish())}
              className="label-caps flex items-center gap-3 bg-accent px-8 py-3 font-bold tracking-widest text-[#00210e] transition hover:brightness-110 active:scale-95"
            >
              {step === 3 ? "ЗАВЕРШИТЬ" : "ДАЛЕЕ"}
              <span className="material-symbols-outlined text-sm">trending_flat</span>
            </button>
          </div>
        </div>

        <Link
          href="/login"
          className="label-caps mt-6 text-surface-muted transition hover:text-accent"
        >
          Уже есть доступ? Войти
        </Link>
      </main>
    </div>
  );
}
