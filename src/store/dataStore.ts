"use client";

import { create } from "zustand";
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

interface DataState {
  fields: Field[];
  weather: WeatherNow;
  forecast: ForecastDay[];
  operations: Operation[];
  alerts: Alert[];
  techMap: TechMapData;
  deviations: PlanFactDeviation[];
  selectedFieldId: string | null;
  selectedOperationId: string | null;

  dismissAlert: (id: string) => void;
  selectField: (id: string | null) => void;
  selectOperation: (id: string | null) => void;
  refreshWeather: () => void;
  startWeatherPolling: () => () => void;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const useDataStore = create<DataState>((set, get) => ({
  fields: MOCK_FIELDS,
  weather: MOCK_WEATHER,
  forecast: MOCK_FORECAST,
  operations: MOCK_OPERATIONS,
  alerts: MOCK_ALERTS,
  techMap: MOCK_TECH_MAP,
  deviations: MOCK_DEVIATIONS,
  selectedFieldId: "field-3",
  selectedOperationId: null,

  dismissAlert: (id: string) => {
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    }));
  },

  selectField: (id: string | null) => {
    const field = get().fields.find((f) => f.id === id);
    if (field) {
      set({
        selectedFieldId: id,
        techMap: {
          field: field.name,
          crop: field.crop,
          nextOperation:
            field.id === "field-3"
              ? "Внесение мочевины"
              : field.id === "field-7"
                ? "Опрыскивание гербицида"
                : "Инсектицидная обработка",
          nextDate:
            field.id === "field-3"
              ? "15.06.2026"
              : field.id === "field-7"
                ? "16.06.2026"
                : "14.06.2026",
          norm:
            field.id === "field-3"
              ? "100 кг/га"
              : field.id === "field-7"
                ? "1.2 л/га"
                : "0.8 л/га",
          status: field.analysis.health === "attention" ? "deviation" : "on-track",
          statusLabel:
            field.analysis.health === "attention" ? "Отклонение" : "По плану",
        },
      });
    } else {
      set({ selectedFieldId: id });
    }
  },

  selectOperation: (id: string | null) => {
    set({ selectedOperationId: id });
  },

  refreshWeather: () => {
    set({
      weather: {
        temperature: randomInt(20, 25),
        wind: randomInt(1, 5),
        humidity: randomInt(55, 75),
        condition: ["Ясно", "Облачно", "Переменная облачность"][
          randomInt(0, 2)
        ],
      },
    });
  },

  startWeatherPolling: () => {
    const interval = setInterval(() => {
      get().refreshWeather();
    }, 30_000);
    return () => clearInterval(interval);
  },
}));
