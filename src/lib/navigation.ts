"use client";

import { useAppStore } from "@/store/appStore";
import { useDataStore } from "@/store/dataStore";

/** Выбрать поле и перейти на дашборд (drawer открывается в selectField) */
export function navigateToField(fieldId: string): void {
  const { selectField } = useDataStore.getState();
  const { setView } = useAppStore.getState();
  void selectField(fieldId);
  setView("dashboard");
}

/** Перейти в журнал операций и выделить запись */
export function navigateToOperations(operationId?: string): void {
  const { selectOperation } = useDataStore.getState();
  const { setView } = useAppStore.getState();
  setView("operations");
  if (operationId) {
    selectOperation(operationId);
  }
}

/** Перейти к алерту: операции или аналитика + подсветка поля при необходимости */
export function navigateToAlert(alertId: string): void {
  const { alerts, fields, selectField } = useDataStore.getState();
  const { setView } = useAppStore.getState();
  const alert = alerts.find((a) => a.id === alertId);
  if (!alert) return;

  const fieldMatch = fields.find((f) => alert.description.includes(f.name));
  if (fieldMatch) {
    void selectField(fieldMatch.id);
    setView("analytics");
    return;
  }

  setView("operations");
}
