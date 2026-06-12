export type FieldHealth = "excellent" | "good" | "attention" | "critical";

export interface FieldAnalysis {
  ndvi: number;
  soilMoisture: number;
  growthStage: string;
  yieldForecast: number;
  health: FieldHealth;
  healthLabel: string;
  lastSurvey: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface Field {
  id: string;
  name: string;
  crop: string;
  area: number;
  color: string;
  /** SVG path для отображения полигона */
  path: string;
  analysis: FieldAnalysis;
}

export interface DashboardKPIs {
  totalArea: number;
  fieldCount: number;
  activeField: string;
  avgNdvi: number;
  alertCount: number;
  deviationCount: number;
  operationsToday: number;
  operationsPlanned: number;
}

export interface WeatherNow {
  temperature: number;
  wind: number;
  humidity: number;
  condition: string;
}

export interface ForecastDay {
  id: string;
  day: string;
  temp: number;
  condition: string;
  icon: "sun" | "cloud" | "rain";
}

export interface Operation {
  id: string;
  date: string;
  field: string;
  product: string;
  amount: string;
  status: "Выполнено" | "Отменено" | "План";
  operator: string;
  area: number;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "warning" | "danger" | "info";
}

export interface TechMapData {
  field: string;
  crop: string;
  nextOperation: string;
  nextDate: string;
  norm: string;
  status: "on-track" | "deviation";
  statusLabel: string;
}

export interface PlanFactDeviation {
  id: string;
  field: string;
  operation: string;
  plan: string;
  fact: string;
  deviation: string;
  deviationPercent: number;
}

export type AppView = "dashboard" | "constructor" | "settings";
