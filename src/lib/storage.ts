import type { DashboardPersistedState, Layouts } from "@/types/widget";
import { createDefaultState, generateLayoutsForWidgets } from "@/config/defaultLayout";

const STORAGE_KEY = "agropulse-dashboard-config";
/** Увеличивайте при смене дефолтной раскладки */
const STORAGE_VERSION = 6;

interface StoredConfig extends DashboardPersistedState {
  version: number;
}

const BREAKPOINTS = ["lg", "md", "sm"] as const;

function layoutsAreValid(layouts: Layouts | undefined, widgetIds: string[]): boolean {
  if (!layouts) return false;

  for (const breakpoint of BREAKPOINTS) {
    const layout = layouts[breakpoint];
    if (!Array.isArray(layout) || layout.length === 0) return false;

    const layoutIds = new Set(layout.map((item) => item.i));
    for (const id of widgetIds) {
      if (!layoutIds.has(id)) return false;
    }
  }

  return true;
}

/** Починить сохранённый конфиг: пустые виджеты или раскладки → дефолты / регенерация */
export function repairDashboardConfig(
  saved: DashboardPersistedState | null
): DashboardPersistedState {
  const defaults = createDefaultState();

  if (!saved?.widgets?.length) {
    return defaults;
  }

  const widgetIds = saved.widgets.map((widget) => widget.id);

  if (!layoutsAreValid(saved.layouts, widgetIds)) {
    return {
      widgets: saved.widgets,
      layouts: generateLayoutsForWidgets(saved.widgets),
    };
  }

  return saved;
}

/** Сохранить конфигурацию дашборда в localStorage */
export function saveDashboardConfig(state: DashboardPersistedState): void {
  try {
    const payload: StoredConfig = { ...state, version: STORAGE_VERSION };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error("[AgroPulse] Не удалось сохранить конфигурацию:", error);
  }
}

/** Загрузить конфигурацию из localStorage */
export function loadDashboardConfig(): DashboardPersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredConfig;
    if (!parsed.widgets || !parsed.layouts) return null;
    if (parsed.version !== STORAGE_VERSION) return null;
    if (parsed.widgets.length === 0) return null;

    const before = { widgets: parsed.widgets, layouts: parsed.layouts };
    const repaired = repairDashboardConfig(before);

    if (!layoutsAreValid(before.layouts, before.widgets.map((widget) => widget.id))) {
      saveDashboardConfig(repaired);
    }

    return repaired;
  } catch (error) {
    console.error("[AgroPulse] Не удалось загрузить конфигурацию:", error);
    return null;
  }
}
