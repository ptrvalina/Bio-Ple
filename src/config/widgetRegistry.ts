import type { WidgetDefinition } from "@/types/widget";

/**
 * Реестр доступных виджетов.
 * Чтобы добавить новый виджет — создайте компонент и добавьте запись сюда.
 */
export const WIDGET_REGISTRY: Record<string, WidgetDefinition> = {
  "field-map": {
    type: "field-map",
    title: "Карта полей",
    icon: "Map",
    description: "Визуализация границ полей и NDVI",
    defaultWidth: 6,
  },
  "field-analysis": {
    type: "field-analysis",
    title: "Анализ поля",
    icon: "BarChart2",
    description: "NDVI, влажность, фаза развития, NPK",
    defaultWidth: 3,
  },
  "weather-now": {
    type: "weather-now",
    title: "Погода сейчас",
    icon: "Sun",
    description: "Текущие метеоусловия на поле",
    defaultWidth: 3,
  },
  "weather-forecast": {
    type: "weather-forecast",
    title: "Прогноз погоды",
    icon: "CloudSun",
    description: "Прогноз на ближайшие дни",
    defaultWidth: 6,
  },
  "operations-log": {
    type: "operations-log",
    title: "Журнал обработок",
    icon: "ClipboardList",
    description: "История опрыскиваний и обработок",
    defaultWidth: 6,
  },
  alerts: {
    type: "alerts",
    title: "Алерты",
    icon: "AlertTriangle",
    description: "Предупреждения и отклонения",
    defaultWidth: 3,
  },
  "tech-map": {
    type: "tech-map",
    title: "Технологическая карта",
    icon: "FileSpreadsheet",
    description: "План работ по активному полю",
    defaultWidth: 4,
  },
  "plan-fact": {
    type: "plan-fact",
    title: "Расхождения план/факт",
    icon: "GitCompare",
    description: "Отклонения по операциям",
    defaultWidth: 6,
  },
  "activity-timeline": {
    type: "activity-timeline",
    title: "Лента активности",
    icon: "RefreshCw",
    description: "Синхронизация, поля, алерты",
    defaultWidth: 3,
  },
};

export const WIDGET_LIST = Object.values(WIDGET_REGISTRY);

export function getWidgetDefinition(type: string): WidgetDefinition | undefined {
  return WIDGET_REGISTRY[type];
}
