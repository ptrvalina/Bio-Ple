"use client";

import { useDataStore } from "@/store/dataStore";

const STATUS_STYLES = {
  Выполнено: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  План: "bg-blue-500/15 text-blue-400 ring-blue-500/20",
  Отменено: "bg-red-500/15 text-red-400 ring-red-500/20",
};

export function OperationsLogWidget() {
  const operations = useDataStore((s) => s.operations);
  const selectedOperationId = useDataStore((s) => s.selectedOperationId);
  const selectOperation = useDataStore((s) => s.selectOperation);

  const selected = operations.find((o) => o.id === selectedOperationId);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-surface-border/60">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[38%]" />
            <col className="w-[22%]" />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface-elevated">
            <tr className="text-[10px] uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2.5 font-semibold">Дата</th>
              <th className="px-3 py-2.5 font-semibold">Поле</th>
              <th className="px-3 py-2.5 font-semibold">Препарат</th>
              <th className="px-3 py-2.5 font-semibold">Статус</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((row) => (
              <tr
                key={row.id}
                onClick={() =>
                  selectOperation(selectedOperationId === row.id ? null : row.id)
                }
                className={`cursor-pointer border-t border-surface-border/40 transition ${
                  selectedOperationId === row.id
                    ? "bg-accent/8"
                    : "hover:bg-surface-hover/50"
                }`}
              >
                <td className="truncate px-3 py-2.5 font-mono text-xs text-slate-400">
                  {row.date}
                </td>
                <td className="truncate px-3 py-2.5 font-medium text-white">{row.field}</td>
                <td className="truncate px-3 py-2.5 text-slate-300">{row.product}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={`inline-flex max-w-full truncate rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${STATUS_STYLES[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="animate-slide-up rounded-xl border border-accent/25 bg-accent/5 p-4">
          <p className="font-semibold text-white">
            {selected.product} — {selected.field}
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <div>
              <p className="text-slate-500">Норма</p>
              <p className="font-medium text-white">{selected.amount}</p>
            </div>
            <div>
              <p className="text-slate-500">Площадь</p>
              <p className="font-medium text-white">{selected.area} га</p>
            </div>
            <div>
              <p className="text-slate-500">Оператор</p>
              <p className="font-medium text-white">{selected.operator}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
