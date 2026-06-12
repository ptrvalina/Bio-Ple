import type { AppView } from "@/types/data";

export const PREMIER_NAV: {
  id: AppView;
  label: string;
  symbol: string;
  mobileSymbol?: string;
}[] = [
  { id: "dashboard", label: "Dashboard", symbol: "dashboard", mobileSymbol: "potted_plant" },
  { id: "analytics", label: "Analytics", symbol: "analytics" },
  { id: "operations", label: "Operations", symbol: "precision_manufacturing" },
  { id: "constructor", label: "Constructor", symbol: "grid_view", mobileSymbol: "precision_manufacturing" },
  { id: "settings", label: "Settings", symbol: "settings" },
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
      return "Command Center";
    case "analytics":
      return "Analytics Terminal";
    case "operations":
      return "Operations Deck";
    case "constructor":
      return "Widget Constructor";
    case "settings":
      return "System Configuration";
    default:
      return "Command Center";
  }
}
