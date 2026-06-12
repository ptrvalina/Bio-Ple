"use client";

import { create } from "zustand";
import {
  alertsApi,
  fieldsApi,
  getServiceHealthList,
  operationsApi,
  planningApi,
  weatherApi,
} from "@/services";
import type { ActivityEvent, ServiceHealth } from "@/services/core/types";
import type {
  Alert,
  Field,
  ForecastDay,
  Operation,
  PlanFactDeviation,
  TechMapData,
  WeatherNow,
} from "@/types/data";

let activityCounter = 0;

function createActivity(
  type: ActivityEvent["type"],
  title: string,
  description: string
): ActivityEvent {
  activityCounter += 1;
  return {
    id: `act-${activityCounter}`,
    timestamp: new Date().toISOString(),
    type,
    title,
    description,
  };
}

function prependActivity(
  activities: ActivityEvent[],
  event: ActivityEvent
): ActivityEvent[] {
  return [event, ...activities].slice(0, 50);
}

interface DataState {
  fields: Field[];
  weather: WeatherNow;
  forecast: ForecastDay[];
  operations: Operation[];
  alerts: Alert[];
  techMap: TechMapData;
  deviations: PlanFactDeviation[];
  fieldOperations: Operation[];

  selectedFieldId: string | null;
  selectedOperationId: string | null;
  fieldDrawerOpen: boolean;

  isLoading: boolean;
  isSyncing: boolean;
  initialized: boolean;
  lastSyncAt: string | null;
  error: string | null;
  serviceHealth: ServiceHealth[];
  activities: ActivityEvent[];

  bootstrap: () => Promise<void>;
  refreshAll: () => Promise<void>;
  dismissAlert: (id: string) => Promise<void>;
  selectField: (id: string | null) => Promise<void>;
  selectOperation: (id: string | null) => void;
  openFieldDrawer: () => void;
  closeFieldDrawer: () => void;
  refreshWeather: () => Promise<void>;
  startWeatherPolling: () => () => void;
}

const EMPTY_TECH_MAP: TechMapData = {
  field: "—",
  crop: "—",
  nextOperation: "—",
  nextDate: "—",
  norm: "—",
  status: "on-track",
  statusLabel: "—",
};

const EMPTY_WEATHER: WeatherNow = {
  temperature: 0,
  wind: 0,
  humidity: 0,
  condition: "—",
};

export const useDataStore = create<DataState>((set, get) => ({
  fields: [],
  weather: EMPTY_WEATHER,
  forecast: [],
  operations: [],
  alerts: [],
  techMap: EMPTY_TECH_MAP,
  deviations: [],
  fieldOperations: [],

  selectedFieldId: null,
  selectedOperationId: null,
  fieldDrawerOpen: false,

  isLoading: true,
  isSyncing: false,
  initialized: false,
  lastSyncAt: null,
  error: null,
  serviceHealth: [],
  activities: [],

  bootstrap: async () => {
    if (get().initialized) return;
    set({ isLoading: true, error: null });

    try {
      const [fieldsRes, weatherRes, forecastRes, opsRes, alertsRes, devRes] =
        await Promise.all([
          fieldsApi.getAll(),
          weatherApi.getCurrent(),
          weatherApi.getForecast(),
          operationsApi.getAll(),
          alertsApi.getActive(),
          planningApi.getDeviations(),
        ]);

      const defaultFieldId = fieldsRes.data[0]?.id ?? null;
      let techMap = EMPTY_TECH_MAP;
      let fieldOps: Operation[] = [];

      if (defaultFieldId) {
        const [techRes, fieldOpsRes] = await Promise.all([
          planningApi.getTechMap(defaultFieldId),
          operationsApi.getByField(fieldsRes.data[0].name),
        ]);
        techMap = techRes.data;
        fieldOps = fieldOpsRes.data;
      }

      const syncEvent = createActivity(
        "sync",
        "Платформа синхронизирована",
        `Загружено ${fieldsRes.data.length} полей, ${alertsRes.data.length} алертов`
      );

      set({
        fields: fieldsRes.data,
        weather: weatherRes.data,
        forecast: forecastRes.data,
        operations: opsRes.data,
        alerts: alertsRes.data,
        deviations: devRes.data,
        techMap,
        fieldOperations: fieldOps,
        selectedFieldId: defaultFieldId,
        isLoading: false,
        initialized: true,
        lastSyncAt: new Date().toISOString(),
        serviceHealth: getServiceHealthList(),
        activities: prependActivity([], syncEvent),
      });
    } catch (err) {
      set({
        isLoading: false,
        error:
          err instanceof Error ? err.message : "Ошибка загрузки данных",
        serviceHealth: getServiceHealthList(),
      });
    }
  },

  refreshAll: async () => {
    set({ isSyncing: true, error: null });
    try {
      const state = get();
      const fieldId = state.selectedFieldId;

      const [fieldsRes, weatherRes, forecastRes, opsRes, alertsRes, devRes] =
        await Promise.all([
          fieldsApi.getAll(),
          weatherApi.getCurrent(),
          weatherApi.getForecast(),
          operationsApi.getAll(),
          alertsApi.getActive(),
          planningApi.getDeviations(),
        ]);

      let techMap = state.techMap;
      let fieldOps = state.fieldOperations;

      if (fieldId) {
        const field = fieldsRes.data.find((f) => f.id === fieldId);
        if (field) {
          const [techRes, fieldOpsRes] = await Promise.all([
            planningApi.getTechMap(fieldId),
            operationsApi.getByField(field.name),
          ]);
          techMap = techRes.data;
          fieldOps = fieldOpsRes.data;
        }
      }

      const syncEvent = createActivity(
        "sync",
        "Данные обновлены",
        `Синхронизация ${new Date().toLocaleTimeString("ru-RU")}`
      );

      set({
        fields: fieldsRes.data,
        weather: weatherRes.data,
        forecast: forecastRes.data,
        operations: opsRes.data,
        alerts: alertsRes.data,
        deviations: devRes.data,
        techMap,
        fieldOperations: fieldOps,
        isSyncing: false,
        lastSyncAt: new Date().toISOString(),
        serviceHealth: getServiceHealthList(),
        activities: prependActivity(get().activities, syncEvent),
      });
    } catch (err) {
      set({
        isSyncing: false,
        error: err instanceof Error ? err.message : "Ошибка синхронизации",
        serviceHealth: getServiceHealthList(),
      });
    }
  },

  dismissAlert: async (id: string) => {
    const alert = get().alerts.find((a) => a.id === id);
    try {
      const res = await alertsApi.acknowledge(id);
      const event = createActivity(
        "alert",
        "Алерт подтверждён",
        alert?.title ?? id
      );
      set({
        alerts: res.data,
        serviceHealth: getServiceHealthList(),
        activities: prependActivity(get().activities, event),
      });
    } catch {
      set({ alerts: get().alerts.filter((a) => a.id !== id) });
    }
  },

  selectField: async (id: string | null) => {
    if (!id) {
      set({ selectedFieldId: null, fieldDrawerOpen: false });
      return;
    }

    const field = get().fields.find((f) => f.id === id);
    if (!field) {
      set({ selectedFieldId: id });
      return;
    }

    set({ selectedFieldId: id, fieldDrawerOpen: true });

    try {
      const [techRes, fieldOpsRes] = await Promise.all([
        planningApi.getTechMap(id),
        operationsApi.getByField(field.name),
      ]);

      const event = createActivity(
        "field",
        `Выбрано поле ${field.name}`,
        `${field.crop} · NDVI ${field.analysis.ndvi.toFixed(2)}`
      );

      set({
        techMap: techRes.data,
        fieldOperations: fieldOpsRes.data,
        serviceHealth: getServiceHealthList(),
        activities: prependActivity(get().activities, event),
      });
    } catch {
      /* поле выбрано, техкарта подтянется при следующей синхронизации */
    }
  },

  selectOperation: (id: string | null) => {
    set({ selectedOperationId: id });
    if (id) {
      const op = get().operations.find((o) => o.id === id);
      if (op) {
        const event = createActivity(
          "operation",
          "Запись в журнале",
          `${op.field} · ${op.product}`
        );
        set({
          activities: prependActivity(get().activities, event),
        });
      }
    }
  },

  openFieldDrawer: () => set({ fieldDrawerOpen: true }),
  closeFieldDrawer: () => set({ fieldDrawerOpen: false }),

  refreshWeather: async () => {
    try {
      const res = await weatherApi.refresh();
      const event = createActivity(
        "weather",
        "Погода обновлена",
        `${res.data.temperature}°C · ${res.data.condition}`
      );
      set({
        weather: res.data,
        serviceHealth: getServiceHealthList(),
        activities: prependActivity(get().activities, event),
      });
    } catch {
      /* polling continues */
    }
  },

  startWeatherPolling: () => {
    const interval = setInterval(() => {
      void get().refreshWeather();
    }, 30_000);
    return () => clearInterval(interval);
  },
}));
