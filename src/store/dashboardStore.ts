"use client";

import { create } from "zustand";
import type { DashboardWidget, Layout, Layouts } from "@/types/widget";
import { isValidWidth } from "@/types/widget";
import { createDefaultState } from "@/config/defaultLayout";
import { getWidgetDefinition } from "@/config/widgetRegistry";
import { loadDashboardConfig, saveDashboardConfig } from "@/lib/storage";

interface DashboardState {
  widgets: DashboardWidget[];
  layouts: Layouts;
  isDraggingFromSidebar: boolean;
  /** ID виджетов, которые сейчас анимируются при удалении */
  removingIds: string[];
  initialized: boolean;

  initialize: () => void;
  addWidget: (type: string) => void;
  removeWidget: (id: string) => void;
  finishRemoveWidget: (id: string) => void;
  setWidgetWidth: (id: string, width: number) => void;
  updateLayouts: (layouts: Layouts) => void;
  setDraggingFromSidebar: (value: boolean) => void;
  saveConfig: () => void;
  resetConfig: () => void;
}

function generateId(): string {
  return `widget-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Найти свободную позицию Y для нового виджета */
function getNextY(layout: Layout[]): number {
  if (layout.length === 0) return 0;
  return Math.max(...layout.map((l) => l.y + l.h));
}

function syncLayoutWidths(
  layouts: Layouts,
  widgets: DashboardWidget[]
): Layouts {
  const widthMap = new Map(widgets.map((w) => [w.id, w.config.width]));
  const result: Layouts = {};

  for (const [breakpoint, layout] of Object.entries(layouts)) {
    const cols = breakpoint === "sm" ? 1 : breakpoint === "md" ? 6 : 12;
    result[breakpoint] = layout.map((item) => {
      const width = widthMap.get(item.i);
      const w =
        breakpoint === "sm"
          ? 1
          : width
            ? Math.min(width, cols)
            : item.w;
      return { ...item, w, minW: breakpoint === "sm" ? 1 : 2, maxW: cols };
    });
  }

  return result;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  ...createDefaultState(),
  isDraggingFromSidebar: false,
  removingIds: [],
  initialized: false,

  initialize: () => {
    if (get().initialized) return;
    const saved = loadDashboardConfig();
    if (saved) {
      set({
        widgets: saved.widgets,
        layouts: saved.layouts,
        initialized: true,
      });
    } else {
      set({ initialized: true });
    }
  },

  addWidget: (type: string) => {
    const definition = getWidgetDefinition(type);
    if (!definition) return;

    const id = generateId();
    const newWidget: DashboardWidget = {
      id,
      type,
      title: definition.title,
      icon: definition.icon,
      config: { width: definition.defaultWidth },
    };

    const { widgets, layouts } = get();
    const newLayouts: Layouts = {};

    for (const [breakpoint, layout] of Object.entries(layouts)) {
      const cols = breakpoint === "sm" ? 1 : breakpoint === "md" ? 6 : 12;
      const w =
        breakpoint === "sm"
          ? 1
          : Math.min(definition.defaultWidth, cols);
      newLayouts[breakpoint] = [
        ...layout,
        {
          i: id,
          x: 0,
          y: getNextY(layout),
          w,
          h: 3,
          minW: breakpoint === "sm" ? 1 : 2,
          maxW: cols,
          minH: 3,
        },
      ];
    }

    set({
      widgets: [...widgets, newWidget],
      layouts: newLayouts,
    });
  },

  removeWidget: (id: string) => {
    set((state) => ({
      removingIds: [...state.removingIds, id],
    }));
  },

  finishRemoveWidget: (id: string) => {
    set((state) => {
      const newLayouts: Layouts = {};
      for (const [breakpoint, layout] of Object.entries(state.layouts)) {
        newLayouts[breakpoint] = layout.filter((l) => l.i !== id);
      }
      return {
        widgets: state.widgets.filter((w) => w.id !== id),
        layouts: newLayouts,
        removingIds: state.removingIds.filter((rid) => rid !== id),
      };
    });
  },

  setWidgetWidth: (id: string, width: number) => {
    if (!isValidWidth(width)) return;

    set((state) => {
      const widgets = state.widgets.map((w) =>
        w.id === id ? { ...w, config: { width } } : w
      );
      const layouts = syncLayoutWidths(state.layouts, widgets);
      return { widgets, layouts };
    });
  },

  updateLayouts: (layouts: Layouts) => {
    set({ layouts });
  },

  setDraggingFromSidebar: (value: boolean) => {
    set({ isDraggingFromSidebar: value });
  },

  saveConfig: () => {
    const { widgets, layouts } = get();
    saveDashboardConfig({ widgets, layouts });
  },

  resetConfig: () => {
    const defaults = createDefaultState();
    set({ ...defaults, removingIds: [] });
    saveDashboardConfig(defaults);
  },
}));
