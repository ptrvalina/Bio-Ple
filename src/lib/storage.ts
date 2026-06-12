import type { DashboardPersistedState } from "@/types/widget";

const STORAGE_KEY = "agropulse-dashboard-config";
/** Увеличивайте при смене дефолтной раскладки */
const STORAGE_VERSION = 4;

interface StoredConfig extends DashboardPersistedState {
  version: number;
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
    return { widgets: parsed.widgets, layouts: parsed.layouts };
  } catch (error) {
    console.error("[AgroPulse] Не удалось загрузить конфигурацию:", error);
    return null;
  }
}
