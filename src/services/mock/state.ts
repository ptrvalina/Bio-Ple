import {
  MOCK_ALERTS,
  MOCK_DEVIATIONS,
  MOCK_FIELDS,
  MOCK_FORECAST,
  MOCK_OPERATIONS,
  MOCK_TECH_MAP,
  MOCK_WEATHER,
} from "@/data/mockData";
import type {
  Alert,
  Field,
  ForecastDay,
  Operation,
  PlanFactDeviation,
  TechMapData,
  WeatherNow,
} from "@/types/data";

/** In-memory state микросервисов (имитация backend) */
export const mockState = {
  fields: [...MOCK_FIELDS] as Field[],
  weather: { ...MOCK_WEATHER } as WeatherNow,
  forecast: [...MOCK_FORECAST] as ForecastDay[],
  operations: [...MOCK_OPERATIONS] as Operation[],
  alerts: [...MOCK_ALERTS] as Alert[],
  techMap: { ...MOCK_TECH_MAP } as TechMapData,
  deviations: [...MOCK_DEVIATIONS] as PlanFactDeviation[],
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function refreshWeatherState(): WeatherNow {
  mockState.weather = {
    temperature: randomInt(20, 25),
    wind: randomInt(1, 5),
    humidity: randomInt(55, 75),
    condition: ["Ясно", "Облачно", "Переменная облачность"][randomInt(0, 2)],
  };
  return mockState.weather;
}

export function buildTechMapForField(fieldId: string): TechMapData {
  const field = mockState.fields.find((f) => f.id === fieldId);
  if (!field) return mockState.techMap;

  const plans: Record<string, Partial<TechMapData>> = {
    "field-3": {
      nextOperation: "Внесение мочевины",
      nextDate: "15.06.2026",
      norm: "100 кг/га",
    },
    "field-7": {
      nextOperation: "Опрыскивание гербицида",
      nextDate: "16.06.2026",
      norm: "1.2 л/га",
    },
    "field-1": {
      nextOperation: "Инсектицидная обработка",
      nextDate: "14.06.2026",
      norm: "0.8 л/га",
    },
  };

  const plan = plans[fieldId] ?? {};
  const onTrack = field.analysis.health !== "attention";

  return {
    field: field.name,
    crop: field.crop,
    nextOperation: plan.nextOperation ?? "Осмотр поля",
    nextDate: plan.nextDate ?? "—",
    norm: plan.norm ?? "—",
    status: onTrack ? "on-track" : "deviation",
    statusLabel: onTrack ? "По плану" : "Отклонение",
  };
}
