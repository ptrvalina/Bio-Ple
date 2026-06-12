"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RegisterPayload {
  operatorName: string;
  operatorId: string;
  defaultFieldId: string;
  clearanceLevel: number;
}

interface AuthState {
  isAuthenticated: boolean;
  operatorId: string | null;
  operatorName: string;
  clearanceLevel: number;
  defaultFieldId: string | null;
  login: (operatorId: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (payload: RegisterPayload) => Promise<boolean>;
  setOperatorName: (name: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      operatorId: null,
      operatorName: "ИВАНОВ А.С.",
      clearanceLevel: 4,
      defaultFieldId: null,

      login: async (operatorId, password) => {
        const id = operatorId.trim();
        const key = password.trim();
        if (!id || !key) return false;

        await new Promise((r) => setTimeout(r, 600));

        set({
          isAuthenticated: true,
          operatorId: id,
          operatorName: id.includes("_")
            ? id.replace(/_/g, " ").toUpperCase()
            : "ИВАНОВ А.С.",
          clearanceLevel: 4,
        });
        return true;
      },

      register: async (payload) => {
        const name = payload.operatorName.trim();
        const id = payload.operatorId.trim();
        if (!name || !id) return false;

        await new Promise((r) => setTimeout(r, 800));

        set({
          isAuthenticated: true,
          operatorId: id,
          operatorName: name.toUpperCase(),
          clearanceLevel: payload.clearanceLevel,
          defaultFieldId: payload.defaultFieldId,
        });
        return true;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          operatorId: null,
          operatorName: "ИВАНОВ А.С.",
          clearanceLevel: 4,
          defaultFieldId: null,
        });
      },

      setOperatorName: (name) => set({ operatorName: name }),
    }),
    {
      name: "agropulse-auth-store",
      partialize: ({
        isAuthenticated,
        operatorId,
        operatorName,
        clearanceLevel,
        defaultFieldId,
      }) => ({
        isAuthenticated,
        operatorId,
        operatorName,
        clearanceLevel,
        defaultFieldId,
      }),
    }
  )
);
