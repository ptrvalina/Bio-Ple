"use client";

import type { ComponentType, ReactNode } from "react";
import type { Layout, Layouts } from "react-grid-layout";
import * as ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";

type ResponsiveComponent = ComponentType<{
  className?: string;
  width: number;
  layouts: Layouts;
  breakpoints: Record<string, number>;
  cols: Record<string, number>;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
  onLayoutChange: (current: Layout[], allLayouts: Layouts) => void;
  draggableHandle?: string;
  isDraggable: boolean;
  isResizable: boolean;
  compactType: "vertical" | "horizontal" | null;
  useCSSTransforms: boolean;
  children: ReactNode;
}>;

type RGLModule = {
  Responsive?: ResponsiveComponent;
  default?: ResponsiveComponent & { Responsive?: ResponsiveComponent };
};

/** CJS interop: Responsive lives on module.exports, not always on default ESM import. */
function resolveResponsive(): ResponsiveComponent {
  const mod = ReactGridLayout as unknown as RGLModule;
  const fromNamespace = mod.Responsive;
  if (fromNamespace) return fromNamespace;

  const fromDefault = mod.default?.Responsive;
  if (fromDefault) return fromDefault;

  throw new Error(
    "[AgroPulse] react-grid-layout Responsive export is missing — check bundler CJS interop"
  );
}

const Responsive = resolveResponsive();

export interface DashboardResponsiveGridProps {
  width: number;
  layouts: Layouts;
  isEdit: boolean;
  isMobile: boolean;
  onLayoutChange: (current: Layout[], allLayouts: Layouts) => void;
  children: ReactNode;
}

const BREAKPOINTS = { lg: 1200, md: 768, sm: 0 };
const COLS = { lg: 12, md: 6, sm: 1 };

export function DashboardResponsiveGrid({
  width,
  layouts,
  isEdit,
  isMobile,
  onLayoutChange,
  children,
}: DashboardResponsiveGridProps) {
  return (
    <Responsive
      className="layout"
      width={width}
      layouts={layouts}
      breakpoints={BREAKPOINTS}
      cols={COLS}
      rowHeight={60}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      onLayoutChange={onLayoutChange}
      draggableHandle={isEdit ? ".widget-drag-handle" : undefined}
      isDraggable={isEdit && !isMobile}
      isResizable={false}
      compactType="vertical"
      useCSSTransforms
    >
      {children}
    </Responsive>
  );
}
