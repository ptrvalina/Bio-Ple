"use client";

import { useActiveField } from "@/hooks/useActiveField";
import { navigateToOperations } from "@/lib/navigation";
import { useDataStore } from "@/store/dataStore";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCWJg5RCqgHFmhu9lbFAPlzcQdAaMHDUmC-wgUmH17dRKkCP4XR3R7Gs7ld6qYCTZGAEs9lxJBzfIQMLfFsuigbdEk_vhfSdGRRy6_YV4LxA39qYCg39N_2SyWzfEC3Qcft6-nvQRSwN6sbXxLfr4dWD4YeMtWfe8lDrWir0F4p3IUvQDW01V6UEfePtIH83J4NumSjYWlBlQAEtnTCLPLxe3ji2R_wxrrqxihAcDwquPcNbhDssb_7Moq2mOrb2WW4dHMNqaqwhXQU";

export function PremierDashboardMobile() {
  const fields = useDataStore((s) => s.fields);
  const weather = useDataStore((s) => s.weather);
  const operations = useDataStore((s) => s.operations);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);
  const selectOperation = useDataStore((s) => s.selectOperation);
  const activeField = useActiveField();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-28">
      <section className="group relative mx-4 mt-2 h-[420px] overflow-hidden rounded-lg border border-white/10">
        <div
          className="absolute inset-0 z-[5] opacity-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(0,255,148,0.2), transparent)",
            animation: "premierScan 4s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <img
          alt="Sector scan"
          className="absolute inset-0 h-full w-full scale-100 object-cover opacity-50 transition-transform duration-[10s] group-hover:scale-105"
          src={HERO_IMAGE}
        />

        <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
          <div className="premier-glass-premier border-l-2 border-l-accent px-3 py-2">
            <span className="label-caps text-[9px] text-surface-muted">COORDINATES</span>
            <p className="font-data-sm text-xs text-accent">55°45&apos;N 37°37&apos;E</p>
          </div>
          <div className="premier-glass-premier border-l-2 border-l-accent/40 px-3 py-2">
            <span className="label-caps text-[9px] text-surface-muted">UAV_ALT</span>
            <p className="font-data-sm text-xs">124.5M</p>
          </div>
        </div>

        <div className="absolute bottom-6 left-4 right-4 z-20 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="label-caps rounded bg-accent/10 px-2 py-0.5 text-accent">
                TARGET ACQUIRED
              </span>
              <span className="label-caps text-surface-muted opacity-60">
                ID: {activeField?.id.toUpperCase() ?? "FIELD-3"}
              </span>
            </div>
            <h2 className="premier-text-glow text-5xl font-black tracking-tighter text-accent">
              {activeField?.name?.replace(" ", "-").toUpperCase() ?? "ПОЛЕ-3"}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 font-data-sm text-surface-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                NEURAL SCAN ACTIVE
              </span>
              <span className="opacity-30">|</span>
              <span>CONFIDENCE: 99.8%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <MetricChip
              label="NDVI INDEX"
              value={activeField?.analysis.ndvi.toFixed(2) ?? "0.78"}
              sub="+4.2% OPTIMAL"
              tone="accent"
            />
            <MetricChip
              label="MOISTURE"
              value={`${activeField?.analysis.soilMoisture ?? 42}%`}
              sub="-2.1% CRIT_LOW"
              tone="danger"
            />
            <MetricChip
              label="TEMP_CORE"
              value={`${weather?.temperature ?? 18.5}°C`}
              sub="NOMINAL_STAT"
              tone="neutral"
            />
          </div>
        </div>
      </section>

      <section className="mx-4 mt-6 grid grid-cols-2 gap-3">
        {fields.map((field) => {
          const isSelected = selectedFieldId === field.id;
          return (
          <button
            key={field.id}
            type="button"
            className={`premier-glass-premier p-4 text-left transition ${
              isSelected ? "ring-1 ring-accent shadow-glow" : ""
            }`}
            onClick={() => void selectField(field.id)}
          >
            <span className="label-caps text-[9px] text-surface-muted">{field.crop}</span>
            <p className="mt-1 font-semibold">{field.name}</p>
            <p className="font-data-sm mt-2 text-accent">NDVI {field.analysis.ndvi.toFixed(2)}</p>
            <p className="font-data-sm text-[10px] text-surface-muted">{field.area} га</p>
          </button>
          );
        })}
      </section>

      <section className="mx-4 mt-6 premier-glass p-4">
        <h3 className="label-caps mb-4 text-surface-muted">RECENT OPERATIONS</h3>
        <div className="space-y-3">
          {operations.slice(0, 4).map((op) => (
            <button
              key={op.id}
              type="button"
              onClick={() => {
                selectOperation(op.id);
                navigateToOperations(op.id);
              }}
              className="flex w-full items-center justify-between border-b border-white/5 pb-2 text-left last:border-0 hover:bg-surface-hover/20"
            >
              <div>
                <p className="text-sm">{op.product}</p>
                <p className="font-data-sm text-[10px] text-surface-muted">
                  {op.field} · {op.date}
                </p>
              </div>
              <span className="label-caps text-[9px] text-accent">{op.status}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricChip({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "accent" | "danger" | "neutral";
}) {
  const valueColor =
    tone === "accent" ? "text-accent" : tone === "danger" ? "text-red-400" : "text-foreground";
  const subColor =
    tone === "accent"
      ? "text-accent/60"
      : tone === "danger"
        ? "text-red-400/60"
        : "text-surface-muted/40";

  return (
    <div className="premier-glass-premier relative min-w-[120px] overflow-hidden p-4">
      <span className="label-caps text-[10px] text-surface-muted">{label}</span>
      <div className={`font-data-lg text-2xl ${valueColor}`}>{value}</div>
      <span className={`font-data-sm text-[9px] ${subColor}`}>{sub}</span>
    </div>
  );
}
