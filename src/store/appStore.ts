"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppView } from "@/types/data";

export type AppTheme = "cyber" | "enterprise";

interface AppState {
  view: AppView;
  theme: AppTheme;
  alertsNotifications: boolean;
  weatherNotifications: boolean;
  autoSaveDashboard: boolean;
  setView: (view: AppView) => void;
  setTheme: (theme: AppTheme) => void;
  setAlertsNotifications: (enabled: boolean) => void;
  setWeatherNotifications: (enabled: boolean) => void;
  setAutoSaveDashboard: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      view: "dashboard",
      theme: "cyber",
      alertsNotifications: true,
      weatherNotifications: true,
      autoSaveDashboard: false,
      setView: (view) => set({ view }),
      setTheme: (theme) => set({ theme }),
      setAlertsNotifications: (alertsNotifications) => set({ alertsNotifications }),
      setWeatherNotifications: (weatherNotifications) => set({ weatherNotifications }),
      setAutoSaveDashboard: (autoSaveDashboard) => set({ autoSaveDashboard }),
    }),
    {
      name: "agropulse-app-store",
      partialize: ({
        view,
        theme,
        alertsNotifications,
        weatherNotifications,
        autoSaveDashboard,
      }) => ({
        view,
        theme,
        alertsNotifications,
        weatherNotifications,
        autoSaveDashboard,
      }),
    }
  )
);
