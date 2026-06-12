"use client";

import { useDataStore } from "@/store/dataStore";

/** Расхождения план/факт по операциям */
export function PlanFactWidget() {
  const deviations = useDataStore((s) => s.deviations);

  return (
    <div className="h-full min-h-0 overflow-auto">
      <table className="w-full min-w-[320px] table-fixed text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border text-xs uppercase text-slate-500">
            <th className="pb-2 pr-2 font-medium">Поле</th>
            <th className="pb-2 pr-2 font-medium">Операция</th>
            <th className="pb-2 pr-2 font-medium">План</th>
            <th className="pb-2 pr-2 font-medium">Факт</th>
            <th className="pb-2 font-medium">Откл.</th>
          </tr>
        </thead>
        <tbody>
          {deviations.map((row) => (
            <tr
              key={row.id}
              className="border-b border-surface-border/40 hover:bg-surface-hover/40"
            >
              <td className="truncate py-2 pr-2 text-slate-300">{row.field}</td>
              <td className="truncate py-2 pr-2 text-slate-300">{row.operation}</td>
              <td className="truncate py-2 pr-2 text-slate-400">{row.plan}</td>
              <td className="truncate py-2 pr-2 text-slate-300">{row.fact}</td>
              <td className="py-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                    row.deviationPercent < 0
                      ? "bg-red-900/50 text-red-400"
                      : "bg-amber-900/50 text-amber-400"
                  }`}
                >
                  {row.deviation}
                  {row.deviationPercent < 0 && " 🔴"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
