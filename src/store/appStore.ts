"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppView } from "@/types/data";

export type AppTheme = "cyber" | "enterprise";

interface AppState {
  view: AppView;
  theme: AppTheme;
  setView: (view: AppView) => void;
  setTheme: (theme: AppTheme) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      view: "dashboard",
      theme: "cyber",
      setView: (view) => set({ view }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "agropulse-app-store",
      partialize: ({ view, theme }) => ({ view, theme }),
    }
  )
);
