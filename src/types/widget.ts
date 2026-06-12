import type { Layout, Layouts } from "react-grid-layout";

/** Конфигурация отдельного виджета на дашборде */
export interface WidgetConfig {
  /** Ширина в колонках сетки: 2, 3, 4 или 6 */
  width: number;
}

/** Экземпляр виджета, размещённый на рабочем столе */
export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  icon: string;
  config: WidgetConfig;
}

/** Описание типа виджета в реестре (для панели и рендеринга) */
export interface WidgetDefinition {
  type: string;
  title: string;
  icon: string;
  description: string;
  defaultWidth: number;
}

/** Сохранённая конфигурация дашборда */
export interface DashboardPersistedState {
  widgets: DashboardWidget[];
  layouts: Layouts;
}

export type { Layout, Layouts };

/** Допустимые пресеты ширины виджета */
export const WIDTH_PRESETS = [2, 3, 4, 6] as const;
export type WidthPreset = (typeof WIDTH_PRESETS)[number];

export function isValidWidth(width: number): width is WidthPreset {
  return WIDTH_PRESETS.includes(width as WidthPreset);
}
