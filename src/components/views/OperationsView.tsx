"use client";

import { useActiveField } from "@/hooks/useActiveField";
import { useDataStore } from "@/store/dataStore";

const SAT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDaU9qkQvldSFaDVfClfWbLoGDNG72bBqvsVpw9ZUCR41UtRhsHySGoq-kDWFji7dmlIqosC7jtYI9IjQLbDPMnP6QTeJn_LzIRlAg6UkCE9L5YQLyYnNE1nkUH9tem5eyD8Ecl2bXTOrbe39wVW6BRJMJY-dN0X6fgk4iHof2oFw9hPq9UQ1sd66ewI53P5UpBo-IUzazCJt0dj2vr1c5XIRYGvQxlIuc2wVNxf4uwsF0yInflx_4w01tpHMoUCsJCRsPIp4QP9gMX";

export function OperationsView() {
  const operations = useDataStore((s) => s.operations);
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectedOperationId = useDataStore((s) => s.selectedOperationId);
  const selectField = useDataStore((s) => s.selectField);
  const selectOperation = useDataStore((s) => s.selectOperation);
  const activeField = useActiveField();

  const filteredOps = activeField
    ? operations.filter((op) => op.field === activeField.name)
    : operations;

  const handleRowClick = (opId: string) => {
    selectOperation(selectedOperationId === opId ? null : opId);
  };

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
      <div className="flex flex-col gap-px border-r border-white/10 lg:col-span-8">
        <section className="relative min-h-[320px] flex-1 overflow-hidden bg-surface-elevated lg:min-h-0">
          <img
            alt="Fleet map"
            className="absolute inset-0 h-full w-full object-cover brightness-50 contrast-125 grayscale opacity-40"
            src={SAT_IMAGE}
          />
          <div className="pointer-events-none absolute inset-0">
            {[800, 600, 400].map((size) => (
              <div
                key={size}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10"
                style={{ width: size, height: size }}
              />
            ))}
            <div className="premier-radar-sweep absolute left-1/2 top-1/2 h-0.5 w-[400px] origin-left bg-gradient-to-r from-accent/40 to-transparent" />
          </div>

          <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
            <div className="premier-glass premier-pulse-accent border border-white/10 p-4 backdrop-blur-md sm:p-6">
              <h3 className="label-caps mb-4 text-surface-muted">FLEET STATUS</h3>
              <div className="flex gap-8 sm:gap-12">
                <div>
                  <p className="font-data-sm text-surface-muted/60">ACTIVE UNITS</p>
                  <p className="font-data-lg text-accent">12 / 12</p>
                </div>
                <div>
                  <p className="font-data-sm text-surface-muted/60">FIELDS</p>
                  <p className="font-data-lg">{fields.length}</p>
                </div>
              </div>
              {activeField && (
                <p className="font-data-sm mt-3 text-accent">
                  Фильтр: {activeField.name}
                </p>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 sm:bottom-8">
            {fields.map((field) => (
              <button
                key={field.id}
                type="button"
                onClick={() => void selectField(field.id)}
                className={`label-caps rounded border px-2 py-1 text-[10px] transition ${
                  selectedFieldId === field.id
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-white/20 bg-background/60 text-surface-muted hover:text-foreground"
                }`}
              >
                {field.name}
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col gap-2 sm:bottom-8 sm:right-8">
            {["add", "remove", "layers"].map((icon) => (
              <button
                key={icon}
                type="button"
                className="flex h-10 w-10 items-center justify-center border border-white/30 bg-surface-hover/80 backdrop-blur transition hover:bg-accent hover:text-[#00210e]"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="h-48 shrink-0 overflow-y-auto border-t border-white/10 bg-surface-elevated/80 p-4">
          <h3 className="label-caps mb-3 text-surface-muted">MISSION QUEUE</h3>
          <div className="space-y-2">
            {filteredOps.slice(0, 5).map((op) => (
              <button
                key={op.id}
                type="button"
                onClick={() => handleRowClick(op.id)}
                className={`flex w-full items-center justify-between border px-4 py-2 text-left transition ${
                  selectedOperationId === op.id
                    ? "border-accent/40 bg-accent/10"
                    : "border-white/10 bg-surface-hover/30 hover:bg-surface-hover/50"
                }`}
              >
                <div>
                  <p className="text-sm">{op.product}</p>
                  <p className="font-data-sm text-[10px] text-surface-muted">
                    {op.field} · {op.operator}
                  </p>
                </div>
                <span className="label-caps text-accent">{op.status}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="flex flex-col gap-4 overflow-y-auto p-4 lg:col-span-4">
        <div className="premier-glass p-4">
          <h3 className="label-caps mb-4 text-surface-muted">EQUIPMENT TELEMETRY</h3>
          {[
            { name: "DRONE_ALPHA_01", alt: "42m", status: "IN FLIGHT" },
            { name: "DRONE_BETA_04", alt: "38m", status: "PATROL" },
            { name: "Automator TR-40", alt: "—", status: "STANDBY" },
          ].map((d) => (
            <div key={d.name} className="mb-4 border-b border-white/10 pb-4 last:mb-0 last:border-0">
              <div className="flex justify-between font-data-sm text-[10px]">
                <span>{d.name}</span>
                <span className="text-accent">{d.status}</span>
              </div>
              {d.alt !== "—" && (
                <p className="font-data-sm mt-1 text-surface-muted">ALT: {d.alt}</p>
              )}
              <div className="mt-2 h-1 bg-surface-hover">
                <div className="h-full w-4/5 bg-accent" />
              </div>
            </div>
          ))}
        </div>

        <div className="premier-glass flex-1 p-4">
          <h3 className="label-caps mb-4 text-surface-muted">OPERATIONS LOG</h3>
          <table className="w-full font-data-sm text-[11px]">
            <thead>
              <tr className="label-caps text-[9px] text-surface-muted">
                <th className="pb-2 text-left">DATE</th>
                <th className="pb-2 text-left">FIELD</th>
                <th className="pb-2 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredOps.map((op) => (
                <tr
                  key={op.id}
                  onClick={() => handleRowClick(op.id)}
                  className={`cursor-pointer hover:bg-surface-hover/20 ${
                    selectedOperationId === op.id ? "bg-accent/10" : ""
                  }`}
                >
                  <td className="py-2">{op.date}</td>
                  <td className="py-2">{op.field}</td>
                  <td className="py-2 text-right text-accent">{op.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
}
