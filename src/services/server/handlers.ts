import {
  buildTechMapForField,
  mockState,
  refreshWeatherState,
} from "@/services/mock/state";
import type {
  Alert,
  Field,
  ForecastDay,
  Operation,
  PlanFactDeviation,
  TechMapData,
  WeatherNow,
} from "@/types/data";

export function getFields(): Field[] {
  return [...mockState.fields];
}

export function getFieldById(id: string): Field | null {
  return mockState.fields.find((f) => f.id === id) ?? null;
}

export function getWeatherCurrent(): WeatherNow {
  return { ...mockState.weather };
}

export function getWeatherForecast(): ForecastDay[] {
  return [...mockState.forecast];
}

export function refreshWeather(): WeatherNow {
  return refreshWeatherState();
}

export function getOperations(fieldName?: string | null): Operation[] {
  if (fieldName) {
    return mockState.operations.filter((o) => o.field === fieldName);
  }
  return [...mockState.operations];
}

export function getActiveAlerts(): Alert[] {
  return [...mockState.alerts];
}

export function acknowledgeAlert(id: string): Alert[] {
  mockState.alerts = mockState.alerts.filter((a) => a.id !== id);
  return [...mockState.alerts];
}

export function getTechMap(fieldId: string): TechMapData {
  return buildTechMapForField(fieldId);
}

export function getDeviations(): PlanFactDeviation[] {
  return [...mockState.deviations];
}
