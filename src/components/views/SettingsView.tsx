"use client";

import { useState, type ReactNode } from "react";
import { Bell, Database, Globe, Shield, User } from "lucide-react";
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

function SettingSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof User;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="glass-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-surface-border px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
          <Icon className="h-4 w-4 text-accent" />
        </div>
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>
      <div className="divide-y divide-surface-border/60">{children}</div>
    </section>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </div>
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

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl space-y-5 p-5 animate-fade-in">
        <SettingSection icon={User} title="Профиль">
          <SettingRow label="Агроном" description="Иванов Алексей Сергеевич">
            <span className="rounded-lg bg-surface-hover px-3 py-1.5 text-sm text-slate-300">
              Главный агроном
            </span>
          </SettingRow>
          <SettingRow label="Хозяйство" description="ООО «БиоПоле» · 317.5 га">
            <span className="text-sm text-accent">{fields.length} полей</span>
          </SettingRow>
        </SettingSection>

        <ServiceHealthPanel />

        <SettingSection icon={Bell} title="Уведомления">
          <SettingRow
            label="Алерты по отклонениям"
            description="Расхождения норм и план/факт"
          >
            <Toggle
              enabled={alerts}
              onChange={(v) => {
                setAlerts(v);
                addToast(v ? "Алерты включены" : "Алерты отключены", "info");
              }}
            />
          </SettingRow>
          <SettingRow
            label="Погодные предупреждения"
            description="Нелётная погода, осадки"
          >
            <Toggle enabled={weather} onChange={setWeather} />
          </SettingRow>
        </SettingSection>

        <SettingSection icon={Database} title="Данные и интеграции">
          <SettingRow label="Источник данных" description="REST API · 5 микросервисов">
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
              /api/v1
            </span>
          </SettingRow>
          <SettingRow
            label="Автосохранение дашборда"
            description="Сохранять при каждом изменении"
          >
            <Toggle enabled={autoSave} onChange={setAutoSave} />
          </SettingRow>
        </SettingSection>

        <SettingSection icon={Globe} title="Интерфейс">
          <SettingRow
            label="Тема Cyber Premier"
            description="Тёмная миссионная / светлая enterprise"
          >
            <Toggle
              enabled={theme === "cyber"}
              onChange={(v) => {
                setTheme(v ? "cyber" : "enterprise");
                addToast(
                  v ? "Тема Cyber Premier" : "Тема Enterprise Light",
                  "info"
                );
              }}
            />
          </SettingRow>
          <SettingRow label="Язык">
            <span className="text-sm text-slate-400">Русский</span>
          </SettingRow>
        </SettingSection>

        <SettingSection icon={Shield} title="Безопасность">
          <SettingRow label="Версия" description="BioPole AgroPulse">
            <span className="font-mono text-sm text-slate-500">v1.1.0</span>
          </SettingRow>
        </SettingSection>
      </div>
    </div>
  );
}
