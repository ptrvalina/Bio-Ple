import type { ComponentType } from "react";
import { FieldMapWidget } from "./FieldMapWidget";
import { FieldAnalysisWidget } from "./FieldAnalysisWidget";
import { WeatherNowWidget } from "./WeatherNowWidget";
import { WeatherForecastWidget } from "./WeatherForecastWidget";
import { OperationsLogWidget } from "./OperationsLogWidget";
import { AlertsWidget } from "./AlertsWidget";
import { TechMapWidget } from "./TechMapWidget";
import { PlanFactWidget } from "./PlanFactWidget";
import { ActivityTimelineWidget } from "./ActivityTimelineWidget";

/**
 * Маппинг type → компонент.
 * При добавлении нового виджета — импортируйте и зарегистрируйте здесь.
 */
export const WIDGET_COMPONENTS: Record<string, ComponentType> = {
  "field-map": FieldMapWidget,
  "field-analysis": FieldAnalysisWidget,
  "weather-now": WeatherNowWidget,
  "weather-forecast": WeatherForecastWidget,
  "operations-log": OperationsLogWidget,
  alerts: AlertsWidget,
  "tech-map": TechMapWidget,
  "plan-fact": PlanFactWidget,
  "activity-timeline": ActivityTimelineWidget,
};
