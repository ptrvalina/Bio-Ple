import type { AppView } from "@/types/data";

export const PREMIER_NAV: {
  id: AppView;
  label: string;
  symbol: string;
  mobileSymbol?: string;
}[] = [
  { id: "dashboard", label: "Главная", symbol: "home", mobileSymbol: "potted_plant" },
  { id: "analytics", label: "Аналитика", symbol: "analytics" },
  { id: "operations", label: "Операции", symbol: "precision_manufacturing" },
  { id: "constructor", label: "Конструктор", symbol: "grid_view", mobileSymbol: "precision_manufacturing" },
  { id: "settings", label: "Настройки", symbol: "settings" },
];

export const PREMIER_MOBILE_NAV: AppView[] = [
  "dashboard",
  "analytics",
  "operations",
  "constructor",
  "settings",
];

export function viewTitle(view: AppView): string {
  switch (view) {
    case "dashboard":
      return "Главная";
    case "analytics":
      return "Analytics Terminal";
    case "operations":
      return "Operations Deck";
    case "constructor":
      return "Конструктор виджетов";
    case "settings":
      return "System Configuration";
    default:
      return "Главная";
  }
}
