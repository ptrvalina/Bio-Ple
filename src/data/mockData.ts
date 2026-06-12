import type {
  Alert,
  DashboardKPIs,
  Field,
  ForecastDay,
  Operation,
  PlanFactDeviation,
  TechMapData,
  WeatherNow,
} from "@/types/data";

export const MOCK_FIELDS: Field[] = [
  {
    id: "field-3",
    name: "Поле 3",
    crop: "Пшеница озимая",
    area: 142.5,
    color: "#22C55E",
    path: "M20,80 L120,40 L180,90 L140,160 L40,140 Z",
    analysis: {
      ndvi: 0.78,
      soilMoisture: 42,
      growthStage: "Колошение",
      yieldForecast: 4.2,
      health: "good",
      healthLabel: "Хорошее",
      lastSurvey: "11.06.2026",
      nitrogen: 85,
      phosphorus: 22,
      potassium: 180,
    },
  },
  {
    id: "field-7",
    name: "Поле 7",
    crop: "Ячмень",
    area: 98.2,
    color: "#3B82F6",
    path: "M200,50 L300,60 L280,150 L190,130 Z",
    analysis: {
      ndvi: 0.71,
      soilMoisture: 38,
      growthStage: "Выход в трубку",
      yieldForecast: 3.6,
      health: "attention",
      healthLabel: "Требует внимания",
      lastSurvey: "10.06.2026",
      nitrogen: 72,
      phosphorus: 18,
      potassium: 155,
    },
  },
  {
    id: "field-1",
    name: "Поле 1",
    crop: "Подсолнечник",
    area: 76.8,
    color: "#F59E0B",
    path: "M320,70 L400,55 L420,140 L310,155 Z",
    analysis: {
      ndvi: 0.68,
      soilMoisture: 35,
      growthStage: "4–6 листьев",
      yieldForecast: 2.8,
      health: "excellent",
      healthLabel: "Отличное",
      lastSurvey: "12.06.2026",
      nitrogen: 90,
      phosphorus: 28,
      potassium: 210,
    },
  },
];

export const MOCK_KPIS: DashboardKPIs = {
  totalArea: 317.5,
  fieldCount: 3,
  activeField: "Поле 3",
  avgNdvi: 0.72,
  alertCount: 2,
  deviationCount: 2,
  operationsToday: 1,
  operationsPlanned: 1,
};

export const MOCK_WEATHER: WeatherNow = {
  temperature: 22,
  wind: 3,
  humidity: 65,
  condition: "Ясно",
};

export const MOCK_FORECAST: ForecastDay[] = [
  { id: "d1", day: "Завтра", temp: 21, condition: "Облачно", icon: "cloud" },
  { id: "d2", day: "Послезавтра", temp: 18, condition: "Дождь", icon: "rain" },
  { id: "d3", day: "Чт", temp: 24, condition: "Солнце", icon: "sun" },
];

export const MOCK_OPERATIONS: Operation[] = [
  {
    id: "op-1",
    date: "12.06.2026",
    field: "Поле 3",
    product: "Мочевина",
    amount: "100 кг/га",
    status: "Выполнено",
    operator: "Иванов А.С.",
    area: 142.5,
  },
  {
    id: "op-2",
    date: "11.06.2026",
    field: "Поле 7",
    product: "Гербицид",
    amount: "1.2 л/га",
    status: "Выполнено",
    operator: "Петров В.И.",
    area: 98.2,
  },
  {
    id: "op-3",
    date: "10.06.2026",
    field: "Поле 1",
    product: "Инсектицид",
    amount: "0.8 л/га",
    status: "План",
    operator: "Сидоров К.М.",
    area: 76.8,
  },
  {
    id: "op-4",
    date: "09.06.2026",
    field: "Поле 3",
    product: "Фунгицид",
    amount: "0.5 л/га",
    status: "Выполнено",
    operator: "Иванов А.С.",
    area: 142.5,
  },
  {
    id: "op-5",
    date: "08.06.2026",
    field: "Поле 7",
    product: "КАС",
    amount: "150 кг/га",
    status: "Отменено",
    operator: "Петров В.И.",
    area: 98.2,
  },
  {
    id: "op-6",
    date: "07.06.2026",
    field: "Поле 1",
    product: "Гербицид",
    amount: "1.0 л/га",
    status: "Выполнено",
    operator: "Сидоров К.М.",
    area: 76.8,
  },
  {
    id: "op-7",
    date: "06.06.2026",
    field: "Поле 3",
    product: "СЗР комплекс",
    amount: "2.1 л/га",
    status: "Выполнено",
    operator: "Иванов А.С.",
    area: 142.5,
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alert-norm",
    title: "Расхождение нормы",
    description: "Поле 3: внесено 80 кг/га вместо 100 кг/га (−20%)",
    severity: "danger",
  },
  {
    id: "alert-drone",
    title: "Дрон не вылетел",
    description: "Миссия DJI-042 отменена — ветер 6.2 м/с",
    severity: "warning",
  },
];

export const MOCK_TECH_MAP: TechMapData = {
  field: "Поле 3",
  crop: "Пшеница озимая",
  nextOperation: "Внесение мочевины",
  nextDate: "15.06.2026",
  norm: "100 кг/га",
  status: "on-track",
  statusLabel: "По плану",
};

export const MOCK_DEVIATIONS: PlanFactDeviation[] = [
  {
    id: "dev-1",
    field: "Поле 3",
    operation: "Мочевина",
    plan: "100 кг",
    fact: "80 кг",
    deviation: "−20%",
    deviationPercent: -20,
  },
  {
    id: "dev-2",
    field: "Поле 7",
    operation: "Гербицид",
    plan: "1.2 л",
    fact: "1.35 л",
    deviation: "+12.5%",
    deviationPercent: 12.5,
  },
];
