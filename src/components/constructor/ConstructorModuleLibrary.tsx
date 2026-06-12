"use client";

import { memo, useCallback, useMemo, useState, type DragEvent } from "react";
import { WIDGET_LIST } from "@/config/widgetRegistry";
import { useDashboardStore } from "@/store/dashboardStore";
import { DRAG_TYPE } from "@/components/constructor/dragTypes";
import { getWidgetMaterialIcon } from "@/components/constructor/widgetMaterialIcons";

interface ConstructorModuleLibraryProps {
  variant: "desktop" | "mobile";
  open?: boolean;
  onClose?: () => void;
  onAdd?: (type: string) => void;
  className?: string;
}

interface ModuleCardProps {
  type: string;
  title: string;
  description: string;
  layout: "desktop" | "mobile";
  onAdd: (type: string) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const ModuleCard = memo(function ModuleCard({
  type,
  title,
  description,
  layout,
  onAdd,
  onDragStart,
  onDragEnd,
}: ModuleCardProps) {
  const { symbol, iconBg, iconColor } = getWidgetMaterialIcon(type);

  const handleDragStart = useCallback(
    (e: DragEvent) => {
      e.dataTransfer.setData(DRAG_TYPE, type);
      e.dataTransfer.effectAllowed = "copy";
      onDragStart();
    },
    [type, onDragStart]
  );

  if (layout === "mobile") {
    return (
      <button
        type="button"
        onClick={() => onAdd(type)}
        className="group flex w-full items-center gap-4 rounded-xl border border-white/10 bg-surface-elevated/80 p-4 text-left transition-colors hover:border-accent/40"
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <span className={`material-symbols-outlined ${iconColor}`}>{symbol}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-foreground">{title}</h4>
          <p className="font-data-sm mt-0.5 text-surface-muted">{description}</p>
        </div>
        <span className="material-symbols-outlined text-surface-muted transition-colors group-hover:text-accent">
          add
        </span>
      </button>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className="group glass-panel cursor-grab border border-white/5 p-4 transition-all hover:border-accent/30 active:cursor-grabbing"
    >
      <div className="mb-3 flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center ${iconBg}`}
        >
          <span className={`material-symbols-outlined ${iconColor}`}>{symbol}</span>
        </div>
        <button
          type="button"
          onClick={() => onAdd(type)}
          className="p-1 text-surface-muted transition-colors hover:bg-accent hover:text-[#00210e]"
          aria-label={`Добавить ${title}`}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
      <h4 className="label-caps mb-1 font-bold">{title}</h4>
      <p className="text-[11px] leading-relaxed text-surface-muted">{description}</p>
    </div>
  );
});

export function ConstructorModuleLibrary({
  variant,
  open = false,
  onClose,
  onAdd,
  className = "",
}: ConstructorModuleLibraryProps) {
  const addWidget = useDashboardStore((s) => s.addWidget);
  const setDraggingFromSidebar = useDashboardStore((s) => s.setDraggingFromSidebar);
  const [search, setSearch] = useState("");

  const handleAdd = useCallback(
    (type: string) => {
      if (onAdd) {
        onAdd(type);
      } else {
        addWidget(type);
      }
    },
    [onAdd, addWidget]
  );

  const handleDragStart = useCallback(() => {
    setDraggingFromSidebar(true);
  }, [setDraggingFromSidebar]);

  const handleDragEnd = useCallback(() => {
    setDraggingFromSidebar(false);
  }, [setDraggingFromSidebar]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return WIDGET_LIST;
    return WIDGET_LIST.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.type.toLowerCase().includes(q)
    );
  }, [search]);

  if (variant === "mobile") {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-[60] lg:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Закрыть библиотеку"
        />
        <div
          className={`absolute inset-x-0 bottom-0 mx-auto max-h-[80vh] max-w-lg overflow-hidden rounded-t-3xl border-t border-white/10 bg-surface-elevated shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="mx-auto my-3 block h-1.5 w-12 rounded-full bg-white/20"
            aria-label="Закрыть"
          />
          <div className="overflow-y-auto px-4 pb-32">
            <h2 className="mb-4 text-lg font-semibold text-accent">Библиотека модулей</h2>
            <div className="relative mb-4">
              <input
                className="w-full border border-white/10 bg-surface-hover py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-surface-muted focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/40"
                placeholder="Поиск модулей..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-surface-muted">
                search
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filtered.map((w) => (
                <ModuleCard
                  key={w.type}
                  type={w.type}
                  title={w.title}
                  description={w.description}
                  layout="mobile"
                  onAdd={(type) => {
                    handleAdd(type);
                    onClose?.();
                  }}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-surface-muted">
                  Модули не найдены
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside
      className={`flex w-80 shrink-0 flex-col border-l border-white/10 bg-surface-elevated/95 ${className}`}
    >
      <div className="border-b border-white/10 p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">Библиотека модулей</h3>
        <div className="relative">
          <input
            className="label-caps w-full border-none bg-surface-hover py-3 pl-10 pr-4 text-foreground placeholder:text-surface-muted focus:ring-1 focus:ring-accent"
            placeholder="Поиск модулей..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-surface-muted">
            search
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {filtered.map((w) => (
          <ModuleCard
            key={w.type}
            type={w.type}
            title={w.title}
            description={w.description}
            layout="desktop"
            onAdd={handleAdd}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-surface-muted">Модули не найдены</p>
        )}
      </div>

      <div className="border-t border-white/10 bg-surface-hover/30 p-6">
        <div className="flex items-center justify-between font-data-sm text-[10px] text-surface-muted">
          <span>CORE_LOAD</span>
          <span className="text-accent">12%</span>
        </div>
        <div className="mt-2 h-1 w-full bg-white/10">
          <div className="h-full w-[12%] bg-accent" />
        </div>
      </div>
    </aside>
  );
}
