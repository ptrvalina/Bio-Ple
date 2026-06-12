/** Material Symbols mapping for module library cards (Stitch Premier V2) */
export const WIDGET_MATERIAL_ICONS: Record<
  string,
  { symbol: string; iconBg: string; iconColor: string }
> = {
  "field-map": {
    symbol: "map",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  "field-analysis": {
    symbol: "analytics",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  "weather-now": {
    symbol: "thermostat",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-300",
  },
  "weather-forecast": {
    symbol: "cloud",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-300",
  },
  "operations-log": {
    symbol: "inventory_2",
    iconBg: "bg-surface-hover",
    iconColor: "text-surface-muted",
  },
  alerts: {
    symbol: "warning",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
  },
  "tech-map": {
    symbol: "layers",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  "plan-fact": {
    symbol: "compare_arrows",
    iconBg: "bg-secondary/10",
    iconColor: "text-blue-300",
  },
  "activity-timeline": {
    symbol: "timeline",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
};

export function getWidgetMaterialIcon(type: string) {
  return (
    WIDGET_MATERIAL_ICONS[type] ?? {
      symbol: "widgets",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    }
  );
}
