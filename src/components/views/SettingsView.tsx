"use client";

import { useState } from "react";
import { ServiceHealthPanel } from "@/components/platform/ServiceHealthPanel";
import { useDataStore } from "@/store/dataStore";
import { useThemeStore } from "@/store/themeStore";
import { useToastStore } from "@/store/toastStore";

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled ? "bg-accent" : "bg-surface-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export function SettingsView() {
  const addToast = useToastStore((s) => s.addToast);
  const fields = useDataStore((s) => s.fields);
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const [alerts, setAlerts] = useState(true);
  const [weather, setWeather] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [operatorName, setOperatorName] = useState("ИВАНОВ_А_С");

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl animate-fade-in p-4 sm:p-8 lg:p-12">
        <div className="mb-8 lg:mb-12">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            System Configuration
          </h3>
          <p className="mt-2 max-w-2xl text-surface-muted">
            Настройка протоколов допуска, персистентности и модульных компонентов
            BIOPOLAR AGROPULSE Premier V2.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          <div className="premier-glass premier-pulse-accent relative col-span-12 overflow-hidden p-6 sm:p-8 lg:col-span-8">
            <div className="absolute right-4 top-4 opacity-10">
              <span className="material-symbols-outlined text-9xl">fingerprint</span>
            </div>
            <div className="relative z-10">
              <div className="mb-6 flex items-center sm:mb-8">
                <span className="material-symbols-outlined mr-3 text-accent">verified_user</span>
                <h4 className="label-caps text-base text-foreground">
                  Identity Management & Clearance
                </h4>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="label-caps mb-2 block text-surface-muted opacity-70">
                      Operator Designation
                    </label>
                    <div className="flex items-center border-b border-white/20 py-2">
                      <input
                        className="w-full border-none bg-transparent font-data-sm text-accent focus:ring-0"
                        value={operatorName}
                        onChange={(e) => setOperatorName(e.target.value)}
                      />
                      <span className="material-symbols-outlined text-sm text-surface-muted">
                        edit
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="label-caps mb-2 block text-surface-muted opacity-70">
                      Biometric Sync State
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-hover">
                        <div className="h-full w-4/5 bg-accent shadow-glow" />
                      </div>
                      <span className="font-data-sm text-accent">88% Match</span>
                    </div>
                  </div>
                </div>
                <div className="border border-white/10 bg-surface-hover/50 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <span className="label-caps text-amber-400">Clearance Elevation</span>
                    <span className="material-symbols-outlined text-sm text-amber-400">lock</span>
                  </div>
                  <p className="font-data-sm text-sm leading-relaxed text-surface-muted">
                    Level 5 elevation requires physical key-turn verification at primary hub.
                  </p>
                  <button
                    type="button"
                    className="label-caps mt-4 bg-amber-400 px-4 py-2 text-[#412d00] transition hover:brightness-110"
                  >
                    REQUEST OVERRIDE
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="premier-glass col-span-12 p-6 lg:col-span-4">
            <h4 className="label-caps mb-4 text-surface-muted">Interface Theme</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cyber Premier</p>
                  <p className="text-xs text-surface-muted">Тёмная миссионная тема</p>
                </div>
                <Toggle
                  enabled={theme === "cyber"}
                  onChange={(v) => {
                    setTheme(v ? "cyber" : "enterprise");
                    addToast(v ? "Тема Cyber Premier" : "Тема Enterprise Light", "info");
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Язык</p>
                <span className="font-data-sm text-accent">RU</span>
              </div>
            </div>
          </div>

          <div className="premier-glass col-span-12 p-6 lg:col-span-6">
            <h4 className="label-caps mb-4 text-surface-muted">Notifications</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Алерты по отклонениям</p>
                  <p className="text-xs text-surface-muted">План/факт и нормы</p>
                </div>
                <Toggle
                  enabled={alerts}
                  onChange={(v) => {
                    setAlerts(v);
                    addToast(v ? "Алерты включены" : "Алерты отключены", "info");
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Погодные предупреждения</p>
                <Toggle enabled={weather} onChange={setWeather} />
              </div>
            </div>
          </div>

          <div className="premier-glass col-span-12 p-6 lg:col-span-6">
            <h4 className="label-caps mb-4 text-surface-muted">Data & Integrations</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">REST API</p>
                  <p className="text-xs text-surface-muted">5 микросервисов · {fields.length} полей</p>
                </div>
                <span className="label-caps rounded-full bg-accent/15 px-3 py-1 text-accent">
                  /api/v1
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Автосохранение дашборда</p>
                <Toggle enabled={autoSave} onChange={setAutoSave} />
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <ServiceHealthPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
