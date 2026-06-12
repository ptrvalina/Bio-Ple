"use client";

import { memo, useCallback, type DragEvent } from "react";
import { motion } from "@/lib/motion";
import {
  Map,
  Sun,
  CloudSun,
  ClipboardList,
  AlertTriangle,
  FileSpreadsheet,
  GitCompare,
  BarChart2,
  RefreshCw,
  GripVertical,
  type LucideIcon,
} from "lucide-react";
import { WIDGET_LIST } from "@/config/widgetRegistry";
import { useDashboardStore } from "@/store/dashboardStore";

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

const DRAG_TYPE = "application/agropulse-widget";

interface SidebarItemProps {
  type: string;
  title: string;
  icon: string;
  description: string;
  onAdd: (type: string) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const SidebarItem = memo(function SidebarItem({
  type,
  title,
  icon,
  description,
  onAdd,
  onDragStart,
  onDragEnd,
}: SidebarItemProps) {
  const Icon = ICON_MAP[icon] ?? AlertTriangle;

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      e.dataTransfer.setData(DRAG_TYPE, type);
      e.dataTransfer.effectAllowed = "copy";
      onDragStart();
    },
    [type, onDragStart]
  );

  return (
    <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onClick={() => onAdd(type)}
        className="group cursor-grab rounded-xl border border-surface-border bg-surface-card/80 p-3 transition hover:border-accent/40 hover:bg-surface-card-hover active:cursor-grabbing"
      >
        <div className="flex items-start gap-3">
          <GripVertical className="mt-1 h-4 w-4 shrink-0 text-slate-700 group-hover:text-slate-500" />
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-4 w-4 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export function Sidebar() {
  const addWidget = useDashboardStore((s) => s.addWidget);
  const setDraggingFromSidebar = useDashboardStore((s) => s.setDraggingFromSidebar);

  const handleDragStart = useCallback(() => {
    setDraggingFromSidebar(true);
  }, [setDraggingFromSidebar]);

  const handleDragEnd = useCallback(() => {
    setDraggingFromSidebar(false);
  }, [setDraggingFromSidebar]);

  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-surface-border bg-surface-elevated/90">
      <div className="border-b border-surface-border px-4 py-4">
        <h2 className="text-sm font-semibold text-white">Библиотека виджетов</h2>
        <p className="mt-1 text-[11px] text-slate-500">
          Перетащите на сетку или нажмите
        </p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {WIDGET_LIST.map((widget) => (
          <SidebarItem
            key={widget.type}
            type={widget.type}
            title={widget.title}
            icon={widget.icon}
            description={widget.description}
            onAdd={addWidget}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </aside>
  );
}

export { DRAG_TYPE };
