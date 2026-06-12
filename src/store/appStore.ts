"use client";

import { create } from "zustand";
import type { AppView } from "@/types/data";

interface AppState {
  view: AppView;
  setView: (view: AppView) => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: "dashboard",
  setView: (view) => set({ view }),
}));
