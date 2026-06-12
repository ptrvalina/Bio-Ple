"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type DragEvent,
} from "react";
import type { Layout, Layouts } from "react-grid-layout";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAppStore } from "@/store/appStore";
import { useContainerWidth } from "@/hooks/useContainerWidth";
import { WidgetShell } from "./WidgetShell";
import { DRAG_TYPE } from "@/components/layout/Sidebar";

const DashboardResponsiveGrid = dynamic(
  () =>
    import("./DashboardResponsiveGrid").then((m) => m.DashboardResponsiveGrid),
  { ssr: false }
);

interface DashboardGridProps {
  mode: "view" | "edit";
}

export function DashboardGrid({ mode }: DashboardGridProps) {
  const widgets = useDashboardStore((s) => s.widgets);
  const layouts = useDashboardStore((s) => s.layouts);
  const removingIds = useDashboardStore((s) => s.removingIds);
  const isDraggingFromSidebar = useDashboardStore((s) => s.isDraggingFromSidebar);
  const updateLayouts = useDashboardStore((s) => s.updateLayouts);
  const addWidget = useDashboardStore((s) => s.addWidget);
  const removeWidget = useDashboardStore((s) => s.removeWidget);
  const finishRemoveWidget = useDashboardStore((s) => s.finishRemoveWidget);
  const setWidgetWidth = useDashboardStore((s) => s.setWidgetWidth);
  const setDraggingFromSidebar = useDashboardStore((s) => s.setDraggingFromSidebar);
  const resetConfig = useDashboardStore((s) => s.resetConfig);
  const setView = useAppStore((s) => s.setView);

  const { containerRef, width } = useContainerWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [clientReady, setClientReady] = useState(false);

  const isEdit = mode === "edit";

  useEffect(() => {
    setClientReady(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLayoutChange = useCallback(
    (_current: Layout[], allLayouts: Layouts) => {
      if (isEdit) updateLayouts(allLayouts);
    },
    [isEdit, updateLayouts]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      if (!isEdit) return;
      e.preventDefault();
      const type = e.dataTransfer.getData(DRAG_TYPE);
      if (type) addWidget(type);
      setDraggingFromSidebar(false);
    },
    [isEdit, addWidget, setDraggingFromSidebar]
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      if (!isEdit) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    [isEdit]
  );

  const children = useMemo(
    () =>
      widgets.map((widget) => (
        <div key={widget.id}>
          <WidgetShell
            widget={widget}
            mode={mode}
            isRemoving={removingIds.includes(widget.id)}
            onRemove={removeWidget}
            onRemoveComplete={finishRemoveWidget}
            onWidthChange={setWidgetWidth}
          />
        </div>
      )),
    [
      widgets,
      mode,
      removingIds,
      removeWidget,
      finishRemoveWidget,
      setWidgetWidth,
    ]
  );

  const gridWidth = width > 0 ? width : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[420px] w-full min-w-0 flex-1 overflow-auto p-5 transition ${
        isEdit && isDraggingFromSidebar
          ? "bg-accent/5 ring-2 ring-inset ring-accent/20"
          : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {!clientReady ? (
        <div className="flex min-h-[360px] items-center justify-center text-surface-muted">
          Загрузка рабочего стола...
        </div>
      ) : widgets.length === 0 ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-center">
          <p className="label-caps text-surface-muted">Рабочий стол пуст</p>
          <p className="max-w-sm text-sm text-surface-muted">
            Восстановите раскладку по умолчанию или откройте конструктор
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => resetConfig()} className="btn-primary">
              Восстановить виджеты
            </button>
            <button
              type="button"
              onClick={() => setView("constructor")}
              className="btn-secondary"
            >
              Конструктор
            </button>
          </div>
        </div>
      ) : gridWidth ? (
        <DashboardResponsiveGrid
          width={gridWidth}
          layouts={layouts}
          isEdit={isEdit}
          isMobile={isMobile}
          onLayoutChange={handleLayoutChange}
        >
          {children}
        </DashboardResponsiveGrid>
      ) : (
        <div className="flex min-h-[360px] flex-col gap-4">
          <p className="text-center text-sm text-surface-muted">Загрузка сетки...</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
