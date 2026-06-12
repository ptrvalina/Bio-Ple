import { withServiceHandler } from "@/services/server/routeHelper";
import type { ServiceHealth, ServiceName } from "@/services/core/types";

const SERVICES: {
  id: ServiceName;
  label: string;
  endpoint: string;
  version: string;
}[] = [
  {
    id: "field-service",
    label: "Field GIS",
    endpoint: "/api/v1/fields",
    version: "1.2.0",
  },
  {
    id: "weather-service",
    label: "Weather Hub",
    endpoint: "/api/v1/weather",
    version: "2.0.1",
  },
  {
    id: "operations-service",
    label: "Operations Log",
    endpoint: "/api/v1/operations",
    version: "1.4.0",
  },
  {
    id: "alerts-service",
    label: "Alerts Engine",
    endpoint: "/api/v1/alerts",
    version: "1.1.0",
  },
  {
    id: "planning-service",
    label: "Planning & TechMap",
    endpoint: "/api/v1/planning",
    version: "1.3.0",
  },
];

export async function GET() {
  return withServiceHandler("field-service", "GET /health", () => {
    const now = new Date().toISOString();
    const health: ServiceHealth[] = SERVICES.map((s) => ({
      ...s,
      status: "online" as const,
      latencyMs: 0,
      lastCheck: now,
    }));
    return health;
  });
}
