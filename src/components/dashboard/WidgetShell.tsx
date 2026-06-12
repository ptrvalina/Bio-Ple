"use client";

import { memo, useCallback, useEffect } from "react";
import { motion } from "@/lib/motion";
import {
  X,
  GripHorizontal,
  Map,
  Sun,
  CloudSun,
  ClipboardList,
  AlertTriangle,
  FileSpreadsheet,
  GitCompare,
  BarChart2,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import type { DashboardWidget } from "@/types/widget";
import { WIDTH_PRESETS } from "@/types/widget";
import { WidgetRenderer } from "./WidgetRenderer";

const ICON_MAP: Record<string, LucideIcon> = {
  Map,
  Sun,
  CloudSun,
  ClipboardList,
  AlertTriangle,
  FileSpreadsheet,
  GitCompare,
  BarChart2,
  RefreshCw,
};

interface WidgetShellProps {
  widget: DashboardWidget;
  mode: "view" | "edit";
  isRemoving: boolean;
  onRemove: (id: string) => void;
  onRemoveComplete: (id: string) => void;
  onWidthChange: (id: string, width: number) => void;
}

function WidgetShellComponent({
  widget,
  mode,
  isRemoving,
  onRemove,
  onRemoveComplete,
  onWidthChange,
}: WidgetShellProps) {
  const Icon = ICON_MAP[widget.icon] ?? AlertTriangle;
  const isEdit = mode === "edit";

  const handleRemove = useCallback(() => {
    onRemove(widget.id);
  }, [onRemove, widget.id]);

  useEffect(() => {
    if (!isRemoving) return;
    const timer = setTimeout(() => onRemoveComplete(widget.id), 250);
    return () => clearTimeout(timer);
  }, [isRemoving, onRemoveComplete, widget.id]);

  return (
    <motion.div
      layout={isEdit}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={
        isRemoving ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="glass-panel pulse-accent flex h-full min-h-0 flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-surface-border/80 px-4 py-2.5">
        <div
          className={`flex items-center gap-2.5 ${
            isEdit ? "widget-drag-handle cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          {isEdit && <GripHorizontal className="h-4 w-4 text-slate-600" />}
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-3.5 w-3.5 text-accent" />
          </div>
          <h3 className="text-sm font-semibold text-white">{widget.title}</h3>
        </div>

        {isEdit && (
          <div className="flex items-center gap-1">
            <div className="mr-1 hidden items-center gap-0.5 sm:flex">
              {WIDTH_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  title={`${preset} колонок`}
                  onClick={() => onWidthChange(widget.id, preset)}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition ${
                    widget.config.width === preset
                      ? "bg-accent text-white"
                      : "bg-surface-hover text-slate-500 hover:text-white"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/15 hover:text-red-400"
              aria-label="Удалить виджет"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="widget-content min-h-0">
        <WidgetRenderer widget={widget} onRemove={onRemove} />
      </div>
    </motion.div>
  );
}

export const WidgetShell = memo(WidgetShellComponent);
