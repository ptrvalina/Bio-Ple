import type { DashboardPersistedState } from "@/types/widget";
import type {
  Alert,
  Field,
  ForecastDay,
  Operation,
  PlanFactDeviation,
  TechMapData,
  WeatherNow,
} from "@/types/data";

/** Поля с анализом включаются в отчёт целиком */

interface ReportPayload {
  exportedAt: string;
  product: string;
  version: string;
  agronomist: string;
  dashboard: DashboardPersistedState;
  data: {
    fields: Field[];
    weather: WeatherNow;
    forecast: ForecastDay[];
    operations: Operation[];
    alerts: Alert[];
    techMap: TechMapData;
    deviations: PlanFactDeviation[];
  };
}

/** Генерирует и скачивает JSON-отчёт для аудита */
export function downloadReport(
  dashboard: DashboardPersistedState,
  data: ReportPayload["data"]
): void {
  const payload: ReportPayload = {
    exportedAt: new Date().toISOString(),
    product: "BioPole AgroPulse",
    version: "1.0.0",
    agronomist: "Иванов А.С.",
    dashboard,
    data,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `agropulse-report-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
