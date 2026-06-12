"use client";

import { useEffect, useState } from "react";
import { useActiveField } from "@/hooks/useActiveField";
import { navigateToAlert } from "@/lib/navigation";
import { useDataStore } from "@/store/dataStore";

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnkE_yd42INXvgbuU5kXhqYCXBJXD8URB0PzeA9VIYw0Td1yeOJrlWTTITDH62ZY8KdLOcvteyQzQsEgNVsjyWH9J4kI0iVRDegDUnJfwB3wQoxeNSv6V1eH4-7iRm5pWXY9_0cbjZ6ZzZPag5AbiXfdLJe-fOopdplSbDRPZvEMYzdrllFbFUZnCcxe0a_l3Nlm9vlHba9JMizCdbFNNo3QmT-C9-hx4IbvnqWxQ7u1GNW-vWxadVVR7yqoboazCYtinPBDswjv02";

const SENSOR_FEED = [
  { id: "NODE_014", value: "84.2% HUM", ok: true },
  { id: "NODE_015", value: "79.1% HUM", ok: true },
  { id: "NODE_018", value: "12.4% HUM", ok: false },
  { id: "SOIL_T_01", value: "18.4°C", ok: true },
  { id: "SOIL_T_02", value: "19.2°C", ok: true },
  { id: "LIGHT_E", value: "OPTIMAL", ok: true },
];

const INITIAL_LOGS = [
  "[08:42:01] INITIALIZING AGROPULSE-KERNAL V4.0.2...",
  "[08:42:04] SECTOR ПОЛЕ 3 HANDSHAKE COMPLETE.",
  "[08:42:15] WARNING: MINOR DRIFT DETECTED IN NODE_018.",
  "[08:43:50] UPDATING NDVI HEATMAP FOR SUB-QUADRANT B...",
  "[08:44:12] CRITICAL: FROST THRESHOLD BREACHED AT SENSOR_042.",
  "[08:44:13] AUTOMATED THERMAL MITIGATION QUEUED...",
];

const EXTRA_LOGS = [
  "SCANNING SUBSURFACE NODES...",
  "RECALIBRATING ATMOSPHERIC SENSORS...",
  "NETWORK HANDSHAKE: NODE_419 OK",
  "MAPPING THERMAL GRADIENTS...",
  "ANALYZING SPECTRAL DATA FOR SECTOR B...",
];

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function PremierDashboardDesktop() {
  const weather = useDataStore((s) => s.weather);
  const alerts = useDataStore((s) => s.alerts);
  const dismissAlert = useDataStore((s) => s.dismissAlert);
  const selectField = useDataStore((s) => s.selectField);
  const activeField = useActiveField();
  const clock = useClock();
  const [logs, setLogs] = useState(INITIAL_LOGS);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const ts = now.toLocaleTimeString("ru-RU", { hour12: false });
      const msg = EXTRA_LOGS[Math.floor(Math.random() * EXTRA_LOGS.length)];
      setLogs((prev) => [...prev.slice(-14), `[${ts}] ${msg}`]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const hasFrostAlert = alerts.some((a) => a.severity === "danger");
  const frostAlert = alerts.find((a) => a.severity === "danger");

  return (
    <div className="flex min-h-0 flex-1 gap-4 overflow-hidden bg-[#05080f] p-4 lg:p-8">
      <div className="flex w-80 shrink-0 flex-col gap-4">
        <TelemetryCard
          label="ATMOSPHERIC PRESSURE"
          icon="compress"
          value="1013.2"
          unit="hPa"
          accent="accent"
          progress={75}
        />
        <TelemetryCard
          label="WIND VELOCITY"
          icon="air"
          value={String(weather?.wind ?? 14.5)}
          unit="km/h"
          accent="secondary"
          bars={[1, 1, 0.3, 0.3]}
        />
        {hasFrostAlert && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => frostAlert && navigateToAlert(frostAlert.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && frostAlert) navigateToAlert(frostAlert.id);
            }}
            className="premier-pulse-border relative cursor-pointer overflow-hidden border border-red-400/30 bg-red-500/10 p-4 backdrop-blur-xl"
          >
            <div className="absolute left-0 top-0 h-full w-0.5 bg-red-400" />
            <div className="mb-2 flex items-start justify-between">
              <span className="label-caps text-red-400">CRITICAL FROST RISK</span>
              <span
                className="material-symbols-outlined text-sm text-red-400"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                ac_unit
              </span>
            </div>
            <p className="font-data-sm leading-tight text-surface-muted">
              Снижение температуры в секторе {activeField?.name ?? "Поле 3"}. Требуется
              термозащита.
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (frostAlert) void dismissAlert(frostAlert.id);
              }}
              className="label-caps mt-4 w-full bg-red-400 py-2 text-[9px] text-red-950 hover:opacity-90"
            >
              ПОДТВЕРДИТЬ АЛЕРТ
            </button>
          </div>
        )}
        <div className="flex flex-1 flex-col overflow-hidden border border-white/10 bg-surface/5">
          <div className="flex items-center justify-between border-b border-white/10 bg-surface-hover/30 p-3">
            <span className="label-caps text-[9px] text-surface-muted">LIVE SENSOR FEED</span>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          </div>
          <div className="flex-1 overflow-y-auto font-data-sm text-[11px]">
            {SENSOR_FEED.map((s) => (
              <div
                key={s.id}
                className="flex justify-between border-b border-white/10 px-3 py-2 hover:bg-surface-hover/10"
              >
                <span className="text-surface-muted">{s.id}</span>
                <span className={s.ok ? "text-accent" : "text-red-400"}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="group relative min-h-0 flex-1 overflow-hidden border border-white/10 bg-surface-elevated">
          <img
            alt="NDVI Map"
            className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale transition-transform duration-[10s] group-hover:scale-105"
            src={MAP_IMAGE}
          />
          <div className="premier-scanline" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

          <div
            role="button"
            tabIndex={0}
            onClick={() => activeField && void selectField(activeField.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && activeField) void selectField(activeField.id);
            }}
            className="absolute left-6 top-6 z-20 cursor-pointer border border-white/20 bg-background/60 p-4 backdrop-blur-md transition hover:border-accent/40"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
              <span className="label-caps">{activeField?.name?.toUpperCase() ?? "ПОЛЕ 3"}</span>
            </div>
            <p className="font-data-sm text-[10px] uppercase text-surface-muted">
              CROP: {activeField?.crop ?? "Пшеница озимая"}
            </p>
            <p className="mt-1 font-data-sm text-[10px] uppercase text-surface-muted">
              NDVI: {activeField?.analysis.ndvi.toFixed(2) ?? "0.78"} · {activeField?.area ?? 142.5} га
            </p>
          </div>

          <div className="pointer-events-none absolute right-4 top-4 z-10 flex gap-4">
            <div className="text-right">
              <p className="label-caps text-[9px] text-surface-muted">LIDAR DELTA</p>
              <p className="font-data-sm text-accent">+0.04m</p>
            </div>
            <div className="text-right">
              <p className="label-caps text-[9px] text-surface-muted">NDVI INDEX</p>
              <p className="font-data-sm text-accent">
                {activeField?.analysis.ndvi.toFixed(2) ?? "0.78"}
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
            <div className="border border-white/20 bg-background/60 p-2 backdrop-blur-md">
              <span className="label-caps text-[9px] text-surface-muted">ZOOM LEVEL</span>
              <div className="mt-1 flex items-center gap-3">
                <span className="font-data-sm text-accent">1.4x</span>
                <div className="h-1 w-24 rounded-full bg-surface-hover">
                  <div className="h-full w-1/3 bg-accent" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {["layers", "gps_fixed"].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className="border border-white/20 bg-background/80 p-2 text-foreground transition hover:border-accent"
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-48 shrink-0 flex-col border border-white/10 bg-surface-elevated/80 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 bg-surface-hover/30 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-accent">terminal</span>
              <span className="label-caps">SYSTEM LOGS [MONITOR_00]</span>
            </div>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-4 font-data-sm text-[11px] text-surface-muted">
            {logs.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-64 shrink-0 flex-col gap-4">
        <div className="flex flex-col items-center border border-white/10 bg-surface/15 p-4 text-center">
          <span className="label-caps mb-4 self-start text-[9px] text-surface-muted">
            ECO-SYSTEM VITALITY
          </span>
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="-rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" fill="none" r="58" stroke="currentColor" strokeWidth="4" className="text-surface-hover" />
              <circle
                cx="64"
                cy="64"
                fill="none"
                r="58"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="364.4"
                strokeDashoffset="36.4"
                className="text-accent drop-shadow-glow"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-data-lg text-2xl">91%</span>
              <span className="label-caps text-[8px] text-accent">STABLE</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col border border-white/10 bg-surface/15 p-4">
          <span className="label-caps mb-4 text-[9px] text-surface-muted">DRONE ASSETS</span>
          <div className="space-y-4">
            {[
              { id: "DRONE_A7_01", status: "IN FLIGHT", progress: 80, active: true },
              { id: "DRONE_A7_02", status: "DOCKING", progress: 20, active: false },
              { id: "DRONE_A7_03", status: "OFFLINE", progress: 0, active: false },
            ].map((d) => (
              <div key={d.id} className={d.active ? "" : "opacity-40"}>
                <div className="flex justify-between font-data-sm text-[10px]">
                  <span>{d.id}</span>
                  <span className={d.active ? "text-accent" : "text-surface-muted"}>{d.status}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-hover">
                  <div
                    className={`h-full ${d.active ? "bg-accent" : "bg-blue-300/60"}`}
                    style={{ width: `${d.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-4">
            <div className="flex items-center justify-between bg-surface-hover/20 p-3">
              <div>
                <span className="label-caps text-[8px] text-surface-muted">NETWORK LOAD</span>
                <p className="font-data-sm text-xs">4.2 GB/S</p>
              </div>
              <span className="material-symbols-outlined text-sm text-blue-300">wifi_tethering</span>
            </div>
          </div>
        </div>

        <div className="border border-accent/20 bg-accent/5 p-4 text-center">
          <p className="font-data-lg text-[22px] text-accent">{clock || "00:00:00"}</p>
          <p className="label-caps mt-1 text-[9px] text-surface-muted">
            GMT+3 | SYSTEM UPTIME: 142H
          </p>
        </div>
      </div>
    </div>
  );
}

function TelemetryCard({
  label,
  icon,
  value,
  unit,
  accent,
  progress,
  bars,
}: {
  label: string;
  icon: string;
  value: string;
  unit: string;
  accent: "accent" | "secondary";
  progress?: number;
  bars?: number[];
}) {
  const color = accent === "accent" ? "text-accent" : "text-blue-300";
  const barColor = accent === "accent" ? "bg-accent" : "bg-blue-300";

  return (
    <div className="relative overflow-hidden border border-white/10 bg-surface/15 p-4 backdrop-blur-xl">
      <div className={`absolute left-0 top-0 h-full w-0.5 ${barColor}`} />
      <div className="mb-4 flex items-start justify-between">
        <span className="label-caps text-surface-muted">{label}</span>
        <span className={`material-symbols-outlined text-sm ${color}`}>{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`font-data-lg text-[32px] ${color}`}>{value}</span>
        <span className="label-caps text-surface-muted">{unit}</span>
      </div>
      {progress !== undefined && (
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-hover">
          <div className={`h-full ${barColor} shadow-glow`} style={{ width: `${progress}%` }} />
        </div>
      )}
      {bars && (
        <div className="mt-2 flex gap-1">
          {bars.map((b, i) => (
            <div
              key={i}
              className={`h-1 flex-1 ${barColor}`}
              style={{ opacity: b }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
