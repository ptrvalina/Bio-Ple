"use client";

import { create } from "zustand";

export type AppTheme = "cyber" | "enterprise";

const STORAGE_KEY = "agropulse-theme";

interface ThemeState {
  theme: AppTheme;
  initialized: boolean;
  initialize: () => void;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
}

function applyTheme(theme: AppTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "cyber",
  initialized: false,

  initialize: () => {
    if (get().initialized) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as AppTheme | null;
      const theme = saved === "enterprise" ? "enterprise" : "cyber";
      applyTheme(theme);
      set({ theme, initialized: true });
    } catch {
      applyTheme("cyber");
      set({ initialized: true });
    }
  },

  setTheme: (theme) => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === "cyber" ? "enterprise" : "cyber";
    get().setTheme(next);
  },
}));
