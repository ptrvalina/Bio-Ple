"use client";

import { useDataStore } from "@/store/dataStore";

/** Горизонтальный выбор поля на мобильных (вместо боковой панели) */
export function MobileFieldPicker() {
  const fields = useDataStore((s) => s.fields);
  const selectedFieldId = useDataStore((s) => s.selectedFieldId);
  const selectField = useDataStore((s) => s.selectField);

  return (
    <div className="lg:hidden">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Активное поле
      </p>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
        {fields.map((field) => {
          const active = selectedFieldId === field.id;
          return (
            <button
              key={field.id}
              type="button"
              onClick={() => void selectField(field.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 transition ${
                active
                  ? "border-accent/50 bg-accent/10"
                  : "border-surface-border bg-surface-card"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: field.color }}
              />
              <div className="text-left">
                <p className="whitespace-nowrap text-xs font-semibold text-white">
                  {field.name}
                </p>
                <p className="whitespace-nowrap text-[10px] text-slate-500">
                  NDVI {field.analysis.ndvi.toFixed(2)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
