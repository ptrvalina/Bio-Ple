"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type DragEvent,
} from "react";
import type { Layout, Layouts } from "react-grid-layout";
import { useDashboardStore } from "@/store/dashboardStore";
import { useContainerWidth } from "@/hooks/useContainerWidth";
import { WidgetShell } from "./WidgetShell";
import { DRAG_TYPE } from "@/components/layout/Sidebar";
import { Responsive } from "@/lib/reactGridLayout";

const BREAKPOINTS = { lg: 1200, md: 768, sm: 0 };
const COLS = { lg: 12, md: 6, sm: 1 };

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

  const [mounted, setMounted] = useState(false);
  const { containerRef, width } = useContainerWidth(mounted);
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isEdit = mode === "edit";

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) {
    return (
      <div className="flex flex-1 items-center justify-center text-slate-500">
        Загрузка рабочего стола...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 overflow-auto p-5 transition ${
        isEdit && isDraggingFromSidebar
          ? "bg-accent/5 ring-2 ring-inset ring-accent/20"
          : ""
      } ${isEdit && isDraggingItem ? "" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {widgets.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20 text-center">
          <p className="label-caps text-surface-muted">Рабочий стол пуст</p>
          <p className="text-sm text-surface-muted">
            Откройте «Constructor» и добавьте виджеты, или нажмите «Сбросить» в
            конструкторе
          </p>
        </div>
      ) : width > 0 ? (
        <Responsive
          className="layout"
          width={width}
          layouts={layouts}
          breakpoints={BREAKPOINTS}
          cols={COLS}
          rowHeight={60}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          onLayoutChange={handleLayoutChange}
          onDragStart={() => setIsDraggingItem(true)}
          onDragStop={() => setIsDraggingItem(false)}
          draggableHandle={isEdit ? ".widget-drag-handle" : ".no-drag"}
          isDraggable={isEdit && !isMobile}
          isResizable={false}
          compactType="vertical"
          useCSSTransforms
        >
          {children}
        </Responsive>
      ) : (
        <div className="flex flex-1 items-center justify-center py-20 text-sm text-surface-muted">
          Загрузка сетки...
        </div>
      )}
    </div>
  );
}
