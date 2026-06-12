import type { DashboardWidget, Layouts } from "@/types/widget";
import { WIDGET_REGISTRY } from "./widgetRegistry";

/** Преднастроенный дашборд агронома — все ключевые параметры на главной */
export function createDefaultState(): {
  widgets: DashboardWidget[];
  layouts: Layouts;
} {
  const defs = [
    { id: "default-field-map", type: "field-map" },
    { id: "default-field-analysis", type: "field-analysis" },
    { id: "default-weather-now", type: "weather-now" },
    { id: "default-alerts", type: "alerts" },
    { id: "default-operations-log", type: "operations-log" },
    { id: "default-tech-map", type: "tech-map" },
    { id: "default-plan-fact", type: "plan-fact" },
    { id: "default-activity", type: "activity-timeline" },
    { id: "default-weather-forecast", type: "weather-forecast" },
  ] as const;

  const widgets: DashboardWidget[] = defs.map(({ id, type }) => {
    const reg = WIDGET_REGISTRY[type];
    return {
      id,
      type,
      title: reg.title,
      icon: reg.icon,
      config: { width: reg.defaultWidth },
    };
  });

  const lgLayout = [
    { i: "default-field-map", x: 0, y: 0, w: 6, h: 4, minW: 2, maxW: 12, minH: 2 },
    { i: "default-field-analysis", x: 6, y: 0, w: 3, h: 4, minW: 2, maxW: 12, minH: 2 },
    { i: "default-weather-now", x: 9, y: 0, w: 3, h: 2, minW: 2, maxW: 12, minH: 2 },
    { i: "default-alerts", x: 9, y: 2, w: 3, h: 2, minW: 2, maxW: 12, minH: 2 },
    { i: "default-operations-log", x: 0, y: 4, w: 6, h: 3, minW: 2, maxW: 12, minH: 2 },
    { i: "default-tech-map", x: 6, y: 4, w: 3, h: 3, minW: 2, maxW: 12, minH: 2 },
    { i: "default-plan-fact", x: 9, y: 4, w: 3, h: 3, minW: 2, maxW: 12, minH: 2 },
    { i: "default-activity", x: 0, y: 7, w: 4, h: 2, minW: 2, maxW: 12, minH: 2 },
    { i: "default-weather-forecast", x: 4, y: 7, w: 8, h: 2, minW: 2, maxW: 12, minH: 2 },
  ];

  const mdLayout = [
    { i: "default-field-map", x: 0, y: 0, w: 6, h: 4, minW: 2, maxW: 6, minH: 2 },
    { i: "default-field-analysis", x: 0, y: 4, w: 6, h: 3, minW: 2, maxW: 6, minH: 2 },
    { i: "default-weather-now", x: 0, y: 7, w: 3, h: 2, minW: 2, maxW: 6, minH: 2 },
    { i: "default-alerts", x: 3, y: 7, w: 3, h: 2, minW: 2, maxW: 6, minH: 2 },
    { i: "default-operations-log", x: 0, y: 9, w: 6, h: 3, minW: 2, maxW: 6, minH: 2 },
    { i: "default-tech-map", x: 0, y: 12, w: 6, h: 3, minW: 2, maxW: 6, minH: 2 },
    { i: "default-plan-fact", x: 0, y: 15, w: 6, h: 3, minW: 2, maxW: 6, minH: 2 },
    { i: "default-activity", x: 0, y: 18, w: 6, h: 2, minW: 2, maxW: 6, minH: 2 },
    { i: "default-weather-forecast", x: 0, y: 20, w: 6, h: 2, minW: 2, maxW: 6, minH: 2 },
  ];

  const smLayout = widgets.map((w, index) => ({
    i: w.id,
    x: 0,
    y: index * 3,
    w: 1,
    h: 3,
    minW: 1,
    maxW: 1,
    minH: 2,
  }));

  return {
    widgets,
    layouts: { lg: lgLayout, md: mdLayout, sm: smLayout },
  };
}
